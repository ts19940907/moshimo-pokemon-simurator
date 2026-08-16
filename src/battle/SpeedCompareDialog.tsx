import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import type { LevelCapMode } from "../match-setup/types";
import { calcGen1Stats } from "../party/gen1Stats";
import {
  createDefaultBuild,
  GEN1_STAT_LABELS,
  maxLevelForCap,
  type PartyMemberBuild,
} from "../party/types";
import {
  formatDexNo,
  getDisplayBaseStats,
  PAGE_SIZE,
  PARTY_SIZE,
  TYPE_COLORS,
} from "../pokemon/catalog";
import { PokemonSprite } from "../pokemon/PokemonSprite";
import {
  TYPE_BY_ID,
  TYPE_NONE,
  type PokemonSpecies,
  type TypeId,
} from "../pokemon/types";
import {
  canBeParalyzed,
  compareSpeeds,
  type SpeedCompareResult,
} from "./calcSpeedCompare";

type PickSide = "self" | "foe";

type SideDraft = {
  species: PokemonSpecies | null;
  build: PartyMemberBuild | null;
  speedStage: number;
  paralyzed: boolean;
};

type Props = {
  visible: boolean;
  speciesPool: PokemonSpecies[];
  levelCapMode: LevelCapMode;
  partyBuildsBySpeciesId: Record<string, PartyMemberBuild>;
  partyDexNos: number[];
  onClose: () => void;
  onApplyToParty: (build: PartyMemberBuild) => void;
};

type StatKey = "hp" | "attack" | "defense" | "special" | "speed";
type StatCompareMode = "gte" | "lte";
type StatFilterEntry = { value: string; mode: StatCompareMode };
type StatFiltersState = Record<StatKey, StatFilterEntry>;
type DualTypeOrderMode = "any" | "exact";

const MAX_TYPE_FILTERS = 2;

const STAT_FILTERS: { key: StatKey; label: string }[] = [
  { key: "hp", label: "HP" },
  { key: "attack", label: "こうげき" },
  { key: "defense", label: "ぼうぎょ" },
  { key: "special", label: "とくしゅ" },
  { key: "speed", label: "すばやさ" },
];

const EMPTY_STAT_FILTERS: StatFiltersState = {
  hp: { value: "", mode: "gte" },
  attack: { value: "", mode: "gte" },
  defense: { value: "", mode: "gte" },
  special: { value: "", mode: "gte" },
  speed: { value: "", mode: "gte" },
};

const TYPE_OPTIONS = Object.entries(TYPE_BY_ID)
  .filter(([id]) => Number(id) > 0)
  .map(([id, type]) => ({
    id: Number(id) as TypeId,
    nameJa: type.nameJa,
  }));

function emptySide(): SideDraft {
  return {
    species: null,
    build: null,
    speedStage: 0,
    paralyzed: false,
  };
}

function partyBuildsEqual(a: PartyMemberBuild, b: PartyMemberBuild): boolean {
  if (
    a.speciesId !== b.speciesId ||
    a.level !== b.level ||
    a.gender !== b.gender
  ) {
    return false;
  }
  for (const key of [
    "hp",
    "attack",
    "defense",
    "special",
    "speed",
  ] as const) {
    if (a.iv[key] !== b.iv[key] || a.statExp[key] !== b.statExp[key]) {
      return false;
    }
  }
  for (let i = 0; i < 4; i += 1) {
    if (a.moveIds[i] !== b.moveIds[i]) return false;
  }
  return true;
}

/** Add: full draft. Update: merge level + speed IV/StatExp into existing. */
function makeSelfApplyBuild(
  draft: PartyMemberBuild,
  existing: PartyMemberBuild | null,
): PartyMemberBuild {
  if (!existing) {
    return { ...draft };
  }
  return {
    ...existing,
    level: draft.level,
    iv: { ...existing.iv, speed: draft.iv.speed },
    statExp: { ...existing.statExp, speed: draft.statExp.speed },
  };
}

type PartyApplyAction = {
  mode: "add" | "update" | "disabled";
  label: string;
  reason: string | null;
  applyBuild: PartyMemberBuild | null;
};

function clamp(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function parseIntOr(value: string, fallback: number) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

function clampStage(n: number) {
  return clamp(n, -6, 6);
}

function matchesNameQuery(pokemon: PokemonSpecies, query: string): boolean {
  const trimmed = query.trim();
  if (!trimmed) return true;
  const lower = trimmed.toLowerCase();
  return (
    pokemon.name_ja.includes(trimmed) ||
    pokemon.name_en.toLowerCase().includes(lower) ||
    String(pokemon.dex_no).includes(trimmed) ||
    formatDexNo(pokemon.dex_no).toLowerCase().includes(lower)
  );
}

function parseStatThreshold(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

function matchesStatFilter(
  statValue: number,
  filter: StatFilterEntry,
): boolean {
  const threshold = parseStatThreshold(filter.value);
  if (threshold == null) return true;
  return filter.mode === "gte" ? statValue >= threshold : statValue <= threshold;
}

function matchesTypeFilter(
  pokemon: PokemonSpecies,
  typeFilters: TypeId[],
  singleTypeOnly: boolean,
  dualOrderMode: DualTypeOrderMode,
): boolean {
  if (typeFilters.length === 0) return true;
  if (typeFilters.length === 1) {
    const typeId = typeFilters[0];
    if (singleTypeOnly) {
      return pokemon.type1 === typeId && pokemon.type2 === TYPE_NONE;
    }
    return pokemon.type1 === typeId || pokemon.type2 === typeId;
  }
  const [first, second] = typeFilters;
  if (dualOrderMode === "exact") {
    return pokemon.type1 === first && pokemon.type2 === second;
  }
  const hasFirst = pokemon.type1 === first || pokemon.type2 === first;
  const hasSecond = pokemon.type1 === second || pokemon.type2 === second;
  return (
    pokemon.type2 !== TYPE_NONE &&
    hasFirst &&
    hasSecond &&
    first !== second
  );
}

function toggleTypeFilter(current: TypeId[], typeId: TypeId): TypeId[] {
  if (current.includes(typeId)) {
    return current.filter((id) => id !== typeId);
  }
  if (current.length >= MAX_TYPE_FILTERS) return current;
  return [...current, typeId];
}

function StageStepper({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <View style={styles.stageRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.stageControls}>
        <Pressable
          onPress={() => onChange(clampStage(value - 1))}
          style={styles.stageBtn}
        >
          <Text style={styles.stageBtnText}>−</Text>
        </Pressable>
        <Text style={styles.stageValue}>
          {value > 0 ? `+${value}` : String(value)}
        </Text>
        <Pressable
          onPress={() => onChange(clampStage(value + 1))}
          style={styles.stageBtn}
        >
          <Text style={styles.stageBtnText}>＋</Text>
        </Pressable>
      </View>
    </View>
  );
}

function StatField({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: number;
  onChangeText: (text: string) => void;
}) {
  return (
    <View style={styles.statField}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.statInput}
        keyboardType="number-pad"
        value={String(value)}
        onChangeText={onChangeText}
      />
    </View>
  );
}

function CheckRow({
  label,
  checked,
  onToggle,
  disabled,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled: Boolean(disabled) }}
      disabled={disabled}
      onPress={onToggle}
      style={[styles.checkRow, disabled && styles.checkRowDisabled]}
    >
      <View style={[styles.checkbox, checked && styles.checkboxOn]}>
        {checked ? <Text style={styles.checkboxMark}>✓</Text> : null}
      </View>
      <Text style={styles.checkLabel}>{label}</Text>
    </Pressable>
  );
}

export function SpeedCompareDialog({
  visible,
  speciesPool,
  levelCapMode,
  partyBuildsBySpeciesId,
  partyDexNos,
  onClose,
  onApplyToParty,
}: Props) {
  const maxLevel = maxLevelForCap(levelCapMode);
  const [self, setSelf] = useState<SideDraft>(emptySide);
  const [foe, setFoe] = useState<SideDraft>(emptySide);

  const [pickingSide, setPickingSide] = useState<PickSide | null>(null);
  const [pendingSpecies, setPendingSpecies] = useState<PokemonSpecies | null>(
    null,
  );
  const [importConfirmOpen, setImportConfirmOpen] = useState(false);
  const [discardConfirmOpen, setDiscardConfirmOpen] = useState(false);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
  const [updateConfirmOpen, setUpdateConfirmOpen] = useState(false);

  const [nameQuery, setNameQuery] = useState("");
  const [typeFilters, setTypeFilters] = useState<TypeId[]>([]);
  const [singleTypeOnly, setSingleTypeOnly] = useState(false);
  const [dualOrderMode, setDualOrderMode] =
    useState<DualTypeOrderMode>("any");
  const [finalEvolutionOnly, setFinalEvolutionOnly] = useState(true);
  const [statFilters, setStatFilters] =
    useState<StatFiltersState>(EMPTY_STAT_FILTERS);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [page, setPage] = useState(0);

  const isDirty =
    self.species != null ||
    foe.species != null ||
    self.speedStage !== 0 ||
    foe.speedStage !== 0 ||
    self.paralyzed ||
    foe.paralyzed;

  const resetAll = () => {
    setSelf(emptySide());
    setFoe(emptySide());
    setPickingSide(null);
    setPendingSpecies(null);
  };

  const clearPickerFilters = () => {
    setNameQuery("");
    setTypeFilters([]);
    setSingleTypeOnly(false);
    setDualOrderMode("any");
    setFinalEvolutionOnly(true);
    setStatFilters(EMPTY_STAT_FILTERS);
    setSuggestOpen(false);
    setPage(0);
  };

  const openPicker = (side: PickSide) => {
    clearPickerFilters();
    setPickingSide(side);
  };

  useEffect(() => {
    if (!visible) {
      resetAll();
      clearPickerFilters();
      setDiscardConfirmOpen(false);
      setClearConfirmOpen(false);
      setImportConfirmOpen(false);
      setUpdateConfirmOpen(false);
    }
  }, [visible]);

  const filteredSpecies = useMemo(() => {
    return speciesPool.filter((pokemon) => {
      if (!matchesNameQuery(pokemon, nameQuery)) return false;
      if (
        !matchesTypeFilter(
          pokemon,
          typeFilters,
          singleTypeOnly,
          dualOrderMode,
        )
      ) {
        return false;
      }
      if (finalEvolutionOnly && !pokemon.is_final_evolution) return false;
      const stats = getDisplayBaseStats(pokemon);
      for (const { key } of STAT_FILTERS) {
        if (!matchesStatFilter(stats[key], statFilters[key])) return false;
      }
      return true;
    });
  }, [
    speciesPool,
    nameQuery,
    typeFilters,
    singleTypeOnly,
    dualOrderMode,
    finalEvolutionOnly,
    statFilters,
  ]);

  const suggestions = useMemo(() => {
    const trimmed = nameQuery.trim();
    if (!suggestOpen || trimmed.length < 1) return [];
    return speciesPool
      .filter((pokemon) => matchesNameQuery(pokemon, trimmed))
      .slice(0, 8);
  }, [speciesPool, nameQuery, suggestOpen]);

  const totalPages = Math.max(1, Math.ceil(filteredSpecies.length / PAGE_SIZE));
  const pageItems = filteredSpecies.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );

  useEffect(() => {
    setPage(0);
  }, [
    nameQuery,
    typeFilters,
    singleTypeOnly,
    dualOrderMode,
    finalEvolutionOnly,
    statFilters,
  ]);

  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(0, totalPages - 1)));
  }, [totalPages]);

  const applySpecies = (
    side: PickSide,
    pokemon: PokemonSpecies,
    importBuild: boolean,
  ) => {
    const existing = partyBuildsBySpeciesId[pokemon.id];
    const build =
      importBuild && existing
        ? {
            ...existing,
            moveIds: [...existing.moveIds] as PartyMemberBuild["moveIds"],
          }
        : createDefaultBuild(pokemon, levelCapMode);

    const next: SideDraft = {
      species: pokemon,
      build,
      speedStage: 0,
      paralyzed: false,
    };
    if (side === "self") setSelf(next);
    else setFoe(next);
    setPickingSide(null);
    setPendingSpecies(null);
    setImportConfirmOpen(false);
  };

  const handlePickSpecies = (pokemon: PokemonSpecies) => {
    if (!pickingSide) return;
    const existing = partyBuildsBySpeciesId[pokemon.id];
    if (existing) {
      setPendingSpecies(pokemon);
      setImportConfirmOpen(true);
      return;
    }
    applySpecies(pickingSide, pokemon, false);
  };

  const patchSelfBuild = (
    patch: (current: PartyMemberBuild) => PartyMemberBuild,
  ) => {
    setSelf((current) => {
      if (!current.build) return current;
      return { ...current, build: patch(current.build) };
    });
  };

  const patchFoeBuild = (
    patch: (current: PartyMemberBuild) => PartyMemberBuild,
  ) => {
    setFoe((current) => {
      if (!current.build) return current;
      return { ...current, build: patch(current.build) };
    });
  };

  const compareResult: SpeedCompareResult | null = useMemo(() => {
    if (!self.species || !self.build || !foe.species || !foe.build) return null;
    return compareSpeeds(
      {
        species: self.species,
        build: self.build,
        speedStage: self.speedStage,
        paralyzed: self.paralyzed,
      },
      {
        species: foe.species,
        build: foe.build,
        speedStage: foe.speedStage,
        paralyzed: foe.paralyzed,
      },
    );
  }, [self, foe]);

  const partyFull = partyDexNos.length >= PARTY_SIZE;

  const selfPartyAction = useMemo((): PartyApplyAction => {
    const labelAdd = "このポケモンをパーティに入れる";
    const labelUpdate = "変更した値を反映";
    if (!self.species || !self.build) {
      return {
        mode: "disabled",
        label: labelAdd,
        reason: "ポケモン未選択",
        applyBuild: null,
      };
    }
    const existing = partyBuildsBySpeciesId[self.species.id] ?? null;
    const inParty = partyDexNos.includes(self.species.dex_no);
    const applyBuild = makeSelfApplyBuild(
      self.build,
      inParty ? existing : null,
    );

    if (!inParty) {
      if (partyFull) {
        return {
          mode: "disabled",
          label: labelAdd,
          reason: "パーティが6体です",
          applyBuild: null,
        };
      }
      return { mode: "add", label: labelAdd, reason: null, applyBuild };
    }

    if (!existing || partyBuildsEqual(existing, applyBuild)) {
      return {
        mode: "disabled",
        label: labelAdd,
        reason: "パーティと同じ内容です",
        applyBuild: null,
      };
    }

    return {
      mode: "update",
      label: labelUpdate,
      reason: null,
      applyBuild,
    };
  }, [
    self.species,
    self.build,
    partyBuildsBySpeciesId,
    partyDexNos,
    partyFull,
  ]);

  const handleSelfPartyPress = () => {
    if (selfPartyAction.mode === "add" && selfPartyAction.applyBuild) {
      onApplyToParty(selfPartyAction.applyBuild);
      return;
    }
    if (selfPartyAction.mode === "update") {
      setUpdateConfirmOpen(true);
    }
  };

  const confirmUpdateParty = () => {
    if (selfPartyAction.mode === "update" && selfPartyAction.applyBuild) {
      onApplyToParty(selfPartyAction.applyBuild);
    }
    setUpdateConfirmOpen(false);
  };

  const requestClose = () => {
    if (pickingSide) {
      setPickingSide(null);
      return;
    }
    if (isDirty) {
      setDiscardConfirmOpen(true);
      return;
    }
    onClose();
  };

  const selfStats =
    self.species && self.build ? calcGen1Stats(self.species, self.build) : null;
  const foeStats =
    foe.species && foe.build ? calcGen1Stats(foe.species, foe.build) : null;

  const renderSideColumn = (
    side: PickSide,
    draft: SideDraft,
    stats: ReturnType<typeof calcGen1Stats> | null,
    setDraft: typeof setSelf,
    patchBuild: typeof patchSelfBuild,
  ) => {
    const title = side === "self" ? "自分" : "相手";
    const paraDisabled =
      draft.species != null && !canBeParalyzed(draft.species);

    return (
      <View style={styles.column}>
        <Text style={styles.columnTitle}>{title}</Text>
        <Pressable
          onPress={() => openPicker(side)}
          style={styles.selectPokemonBtn}
        >
          {draft.species ? (
            <View style={styles.selectedPokemon}>
              <PokemonSprite uri={draft.species.sprite_url} size={48} />
              <Text style={styles.selectedName}>{draft.species.name_ja}</Text>
            </View>
          ) : (
            <Text style={styles.selectPokemonText}>ポケモンを選ぶ</Text>
          )}
        </Pressable>

        {draft.build && draft.species ? (
          <>
            <Text style={styles.section}>レベル（1〜{maxLevel}）</Text>
            <TextInput
              style={styles.levelInput}
              keyboardType="number-pad"
              value={String(draft.build.level)}
              onChangeText={(text) =>
                patchBuild((b) => ({
                  ...b,
                  level: clamp(parseIntOr(text, b.level), 1, maxLevel),
                }))
              }
            />

            <Text style={styles.section}>個体値（0〜15）</Text>
            <StatField
              label={GEN1_STAT_LABELS.speed}
              value={draft.build.iv.speed}
              onChangeText={(t) =>
                patchBuild((b) => ({
                  ...b,
                  iv: {
                    ...b.iv,
                    speed: clamp(parseIntOr(t, b.iv.speed), 0, 15),
                  },
                }))
              }
            />

            <Text style={styles.section}>努力値（0〜65535）</Text>
            <StatField
              label={GEN1_STAT_LABELS.speed}
              value={draft.build.statExp.speed}
              onChangeText={(t) =>
                patchBuild((b) => ({
                  ...b,
                  statExp: {
                    ...b.statExp,
                    speed: clamp(parseIntOr(t, b.statExp.speed), 0, 65535),
                  },
                }))
              }
            />

            {stats ? (
              <>
                <Text style={styles.section}>実数値</Text>
                <Text style={styles.computed}>すばやさ {stats.speed}</Text>
              </>
            ) : null}

            <Text style={styles.section}>ランク</Text>
            <StageStepper
              label="すばやさ"
              value={draft.speedStage}
              onChange={(v) => setDraft((c) => ({ ...c, speedStage: v }))}
            />

            <CheckRow
              label={
                paraDisabled
                  ? "まひ（でんきタイプは不可）"
                  : "まひ"
              }
              checked={draft.paralyzed}
              disabled={paraDisabled}
              onToggle={() =>
                setDraft((c) => ({ ...c, paralyzed: !c.paralyzed }))
              }
            />

            {side === "self" ? (
              <>
                <Pressable
                  disabled={selfPartyAction.mode === "disabled"}
                  onPress={handleSelfPartyPress}
                  style={[
                    styles.addPartyBtn,
                    selfPartyAction.mode === "disabled" &&
                      styles.addPartyBtnDisabled,
                  ]}
                >
                  <Text
                    style={[
                      styles.addPartyBtnText,
                      selfPartyAction.mode === "disabled" &&
                        styles.addPartyBtnTextDisabled,
                    ]}
                  >
                    {selfPartyAction.label}
                  </Text>
                </Pressable>
                {selfPartyAction.reason ? (
                  <Text style={styles.disabledHint}>
                    {selfPartyAction.reason}
                  </Text>
                ) : null}
              </>
            ) : null}
          </>
        ) : null}
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={requestClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>素早さ比較</Text>
            <View style={styles.headerActions}>
              <Pressable
                onPress={() => {
                  if (isDirty) setClearConfirmOpen(true);
                  else resetAll();
                }}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Text style={styles.headerLink}>クリア</Text>
              </Pressable>
              <Pressable
                onPress={requestClose}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Text style={styles.headerLink}>閉じる</Text>
              </Pressable>
            </View>
          </View>

          {pickingSide ? (
            <ScrollView
              style={styles.body}
              contentContainerStyle={styles.bodyContent}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.pickTitle}>
                {pickingSide === "self"
                  ? "自分のポケモンを選ぶ"
                  : "相手のポケモンを選ぶ"}
              </Text>
              <Pressable
                onPress={() => setPickingSide(null)}
                style={styles.backPick}
              >
                <Text style={styles.backPickText}>← 比較画面へ戻る</Text>
              </Pressable>

              <View style={styles.filterBox}>
                <View style={styles.filterHeader}>
                  <Text style={styles.filterTitle}>絞り込み</Text>
                  <Pressable onPress={clearPickerFilters}>
                    <Text style={styles.filterClear}>クリア</Text>
                  </Pressable>
                </View>
                <TextInput
                  value={nameQuery}
                  onChangeText={(value) => {
                    setNameQuery(value);
                    setSuggestOpen(true);
                  }}
                  placeholder="名前・図鑑番号で検索"
                  placeholderTextColor="#9a9286"
                  autoCorrect={false}
                  autoCapitalize="none"
                  style={styles.searchInput}
                />
                {suggestions.length > 0 ? (
                  <View style={styles.suggestList}>
                    {suggestions.map((pokemon) => (
                      <Pressable
                        key={`${pokemon.dex_no}-${pokemon.region_type}`}
                        onPress={() => {
                          setNameQuery(pokemon.name_ja);
                          setSuggestOpen(false);
                        }}
                        style={styles.suggestItem}
                      >
                        <Text style={styles.suggestDex}>
                          {formatDexNo(pokemon.dex_no)}
                        </Text>
                        <Text style={styles.suggestName}>{pokemon.name_ja}</Text>
                      </Pressable>
                    ))}
                  </View>
                ) : null}

                <Text style={styles.filterLabel}>
                  タイプ（最大2つ・選んだ順がタイプ1→タイプ2）
                </Text>
                <View style={styles.typeChipRow}>
                  {TYPE_OPTIONS.map((type) => {
                    const selectedIndex = typeFilters.indexOf(type.id);
                    const selected = selectedIndex >= 0;
                    const blocked =
                      !selected && typeFilters.length >= MAX_TYPE_FILTERS;
                    return (
                      <Pressable
                        key={type.id}
                        disabled={blocked}
                        onPress={() =>
                          setTypeFilters((current) => {
                            const next = toggleTypeFilter(current, type.id);
                            if (next.length !== 1) setSingleTypeOnly(false);
                            return next;
                          })
                        }
                        style={[
                          styles.typeChip,
                          {
                            backgroundColor: selected
                              ? (TYPE_COLORS[type.nameJa] ?? "#888")
                              : "#fffdf8",
                            borderColor: TYPE_COLORS[type.nameJa] ?? "#888",
                          },
                          blocked && styles.typeChipBlocked,
                        ]}
                      >
                        <Text
                          style={[
                            styles.typeChipText,
                            selected && styles.typeChipTextSelected,
                          ]}
                        >
                          {selected
                            ? `${selectedIndex + 1}.${type.nameJa}`
                            : type.nameJa}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                {typeFilters.length === 1 ? (
                  <CheckRow
                    label="単タイプのみ"
                    checked={singleTypeOnly}
                    onToggle={() => setSingleTypeOnly((v) => !v)}
                  />
                ) : null}
                {typeFilters.length === 2 ? (
                  <CheckRow
                    label="タイプ順どおり（タイプ1→タイプ2）"
                    checked={dualOrderMode === "exact"}
                    onToggle={() =>
                      setDualOrderMode((m) =>
                        m === "exact" ? "any" : "exact",
                      )
                    }
                  />
                ) : null}
                <CheckRow
                  label="最終進化のみ"
                  checked={finalEvolutionOnly}
                  onToggle={() => setFinalEvolutionOnly((v) => !v)}
                />

                <Text style={styles.filterLabel}>種族値</Text>
                {STAT_FILTERS.map(({ key, label }) => (
                  <View key={key} style={styles.statFilterRow}>
                    <Text style={styles.statFilterLabel}>{label}</Text>
                    <View style={styles.statModeRow}>
                      {(["gte", "lte"] as const).map((mode) => (
                        <Pressable
                          key={mode}
                          onPress={() =>
                            setStatFilters((current) => ({
                              ...current,
                              [key]: { ...current[key], mode },
                            }))
                          }
                          style={[
                            styles.statModeChip,
                            statFilters[key].mode === mode &&
                              styles.statModeChipSelected,
                          ]}
                        >
                          <Text
                            style={[
                              styles.statModeChipText,
                              statFilters[key].mode === mode &&
                                styles.statModeChipTextSelected,
                            ]}
                          >
                            {mode === "gte" ? "以上" : "以下"}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                    <TextInput
                      value={statFilters[key].value}
                      onChangeText={(value) =>
                        setStatFilters((current) => ({
                          ...current,
                          [key]: {
                            ...current[key],
                            value: value.replace(/[^\d]/g, ""),
                          },
                        }))
                      }
                      keyboardType="number-pad"
                      placeholder="—"
                      placeholderTextColor="#9a9286"
                      style={styles.statFilterInput}
                    />
                  </View>
                ))}
                <Text style={styles.filterResult}>
                  {filteredSpecies.length}体
                </Text>
              </View>

              <View style={styles.pager}>
                <Pressable
                  disabled={page <= 0}
                  onPress={() => setPage((p) => Math.max(0, p - 1))}
                  style={[styles.pageBtn, page <= 0 && styles.pageBtnDisabled]}
                >
                  <Text style={styles.pageBtnText}>前へ</Text>
                </Pressable>
                <Text style={styles.pageLabel}>
                  {page + 1} / {totalPages}
                </Text>
                <Pressable
                  disabled={page >= totalPages - 1}
                  onPress={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                  style={[
                    styles.pageBtn,
                    page >= totalPages - 1 && styles.pageBtnDisabled,
                  ]}
                >
                  <Text style={styles.pageBtnText}>次へ</Text>
                </Pressable>
              </View>

              <View style={styles.pickList}>
                {pageItems.map((pokemon) => {
                  const inParty = partyDexNos.includes(pokemon.dex_no);
                  return (
                    <Pressable
                      key={`${pokemon.dex_no}-${pokemon.region_type}-${pokemon.is_mega}`}
                      onPress={() => handlePickSpecies(pokemon)}
                      style={({ pressed }) => [
                        styles.pickCard,
                        inParty && styles.pickCardInParty,
                        pressed && styles.pressed,
                      ]}
                    >
                      <PokemonSprite uri={pokemon.sprite_url} size={56} />
                      <View style={styles.pickCardBody}>
                        <Text style={styles.pickDex}>
                          {formatDexNo(pokemon.dex_no)}
                        </Text>
                        <Text style={styles.pickName}>{pokemon.name_ja}</Text>
                        {inParty ? (
                          <Text style={styles.inPartyBadge}>選出中</Text>
                        ) : null}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <ScrollView
              style={styles.body}
              contentContainerStyle={styles.bodyContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.columns}>
                {renderSideColumn(
                  "self",
                  self,
                  selfStats,
                  setSelf,
                  patchSelfBuild,
                )}
                {renderSideColumn("foe", foe, foeStats, setFoe, patchFoeBuild)}
              </View>

              <View style={styles.resultBox}>
                <Text style={styles.columnTitle}>比較結果</Text>
                {!self.species || !foe.species ? (
                  <Text style={styles.muted}>
                    自分と相手のポケモンを選ぶと結果が表示されます。
                  </Text>
                ) : compareResult ? (
                  <>
                    <Text
                      style={[
                        styles.verdict,
                        compareResult.verdict === "outspeed" &&
                          styles.verdictWin,
                        compareResult.verdict === "underspeed" &&
                          styles.verdictLose,
                        compareResult.verdict === "tie" && styles.verdictTie,
                      ]}
                    >
                      {compareResult.verdictLabel}
                    </Text>
                    <Text style={styles.speedLine}>
                      自分 {compareResult.selfSpeed} ／ 相手{" "}
                      {compareResult.foeSpeed}
                      （実効すばやさ）
                    </Text>
                    {compareResult.tips.length > 0 ? (
                      <View style={styles.tipsBox}>
                        <Text style={styles.tipsTitle}>
                          先制できる条件（簡単な順・最大3つ）
                        </Text>
                        {compareResult.tips.map((tip, index) => (
                          <Text key={tip.id} style={styles.tipItem}>
                            {index + 1}. {tip.label}
                          </Text>
                        ))}
                      </View>
                    ) : null}
                  </>
                ) : null}
              </View>
            </ScrollView>
          )}
        </View>
      </View>

      <Modal
        visible={importConfirmOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setImportConfirmOpen(false)}
      >
        <View style={styles.confirmBackdrop}>
          <View style={styles.confirmSheet}>
            <Text style={styles.confirmTitle}>選出中の設定を読み込みますか？</Text>
            <Text style={styles.confirmBody}>
              {pendingSpecies?.name_ja ?? "このポケモン"}
              はパーティに選出済みです。レベル・個体値・努力値を反映しますか？
            </Text>
            <View style={styles.confirmRow}>
              <Pressable
                onPress={() => {
                  if (pendingSpecies && pickingSide) {
                    applySpecies(pickingSide, pendingSpecies, false);
                  }
                }}
                style={styles.confirmSecondary}
              >
                <Text style={styles.confirmSecondaryText}>しない</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  if (pendingSpecies && pickingSide) {
                    applySpecies(pickingSide, pendingSpecies, true);
                  }
                }}
                style={styles.confirmPrimary}
              >
                <Text style={styles.confirmPrimaryText}>読み込む</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={updateConfirmOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setUpdateConfirmOpen(false)}
      >
        <View style={styles.confirmBackdrop}>
          <View style={styles.confirmSheet}>
            <Text style={styles.confirmTitle}>パーティの設定を更新しますか？</Text>
            <Text style={styles.confirmBody}>
              {self.species?.name_ja ?? "このポケモン"}
              のパーティ設定を、素早さ比較で変更した内容（レベル・すばやさ個体値・努力値）で上書きします。よろしいですか？
            </Text>
            <View style={styles.confirmRow}>
              <Pressable
                onPress={() => setUpdateConfirmOpen(false)}
                style={styles.confirmSecondary}
              >
                <Text style={styles.confirmSecondaryText}>キャンセル</Text>
              </Pressable>
              <Pressable
                onPress={confirmUpdateParty}
                style={styles.confirmPrimary}
              >
                <Text style={styles.confirmPrimaryText}>更新する</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={discardConfirmOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDiscardConfirmOpen(false)}
      >
        <View style={styles.confirmBackdrop}>
          <View style={styles.confirmSheet}>
            <Text style={styles.confirmTitle}>入力を破棄しますか？</Text>
            <Text style={styles.confirmBody}>
              閉じると素早さ比較の設定は破棄されます。
            </Text>
            <View style={styles.confirmRow}>
              <Pressable
                onPress={() => setDiscardConfirmOpen(false)}
                style={styles.confirmSecondary}
              >
                <Text style={styles.confirmSecondaryText}>キャンセル</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setDiscardConfirmOpen(false);
                  resetAll();
                  onClose();
                }}
                style={styles.confirmPrimary}
              >
                <Text style={styles.confirmPrimaryText}>破棄して閉じる</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={clearConfirmOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setClearConfirmOpen(false)}
      >
        <View style={styles.confirmBackdrop}>
          <View style={styles.confirmSheet}>
            <Text style={styles.confirmTitle}>設定をクリアしますか？</Text>
            <Text style={styles.confirmBody}>
              自分・相手・補正の入力をすべてリセットします。
            </Text>
            <View style={styles.confirmRow}>
              <Pressable
                onPress={() => setClearConfirmOpen(false)}
                style={styles.confirmSecondary}
              >
                <Text style={styles.confirmSecondaryText}>キャンセル</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setClearConfirmOpen(false);
                  resetAll();
                }}
                style={styles.confirmPrimary}
              >
                <Text style={styles.confirmPrimaryText}>クリア</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(28, 36, 24, 0.55)",
    justifyContent: "center",
    padding: 12,
  },
  sheet: {
    backgroundColor: "#fffdf8",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    maxHeight: "92%",
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee6d8",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1d1a16",
  },
  headerActions: {
    flexDirection: "row",
    gap: 16,
  },
  headerLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1f6b4a",
  },
  body: {
    maxHeight: 640,
  },
  bodyContent: {
    padding: 14,
    gap: 12,
    paddingBottom: 28,
  },
  columns: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  column: {
    flexGrow: 1,
    flexBasis: 280,
    minWidth: 260,
    gap: 8,
    backgroundColor: "#f7f3ea",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5dccb",
    padding: 12,
  },
  columnTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1f6b4a",
  },
  selectPokemonBtn: {
    borderWidth: 1,
    borderColor: "#cfc6b6",
    borderRadius: 10,
    backgroundColor: "#fffdf8",
    padding: 10,
    minHeight: 56,
    justifyContent: "center",
  },
  selectPokemonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8a8276",
    textAlign: "center",
  },
  selectedPokemon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  selectedName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1d1a16",
  },
  section: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "800",
    color: "#5c564c",
  },
  levelInput: {
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 8,
    backgroundColor: "#fffdf8",
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    fontWeight: "700",
    color: "#1d1a16",
  },
  statField: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fieldLabel: {
    width: 72,
    fontSize: 12,
    fontWeight: "700",
    color: "#5c564c",
  },
  statInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 8,
    backgroundColor: "#fffdf8",
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 13,
    fontWeight: "700",
    color: "#1d1a16",
  },
  computed: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1d1a16",
  },
  stageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stageControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stageBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cfc6b6",
    backgroundColor: "#fffdf8",
    alignItems: "center",
    justifyContent: "center",
  },
  stageBtnText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1f6b4a",
  },
  stageValue: {
    minWidth: 36,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "800",
    color: "#1d1a16",
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
  },
  checkRowDisabled: {
    opacity: 0.45,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#9a9286",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fffdf8",
  },
  checkboxOn: {
    borderColor: "#1f6b4a",
    backgroundColor: "#eef7f1",
  },
  checkboxMark: {
    fontSize: 12,
    fontWeight: "900",
    color: "#1f6b4a",
  },
  checkLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1d1a16",
  },
  addPartyBtn: {
    marginTop: 8,
    backgroundColor: "#1f6b4a",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  addPartyBtnDisabled: {
    backgroundColor: "#cfc6b6",
  },
  addPartyBtnText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#fffdf8",
  },
  addPartyBtnTextDisabled: {
    color: "#f5f0e6",
  },
  disabledHint: {
    fontSize: 11,
    fontWeight: "600",
    color: "#8a8276",
  },
  resultBox: {
    gap: 8,
    backgroundColor: "#eef7f1",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#b7d4c4",
    padding: 14,
  },
  verdict: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1d1a16",
  },
  verdictWin: {
    color: "#1f6b4a",
  },
  verdictLose: {
    color: "#a33b2a",
  },
  verdictTie: {
    color: "#6b5a2a",
  },
  speedLine: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5c564c",
  },
  tipsBox: {
    marginTop: 4,
    gap: 4,
  },
  tipsTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#5c564c",
  },
  tipItem: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1d1a16",
    lineHeight: 20,
  },
  muted: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8a8276",
  },
  pickTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1d1a16",
  },
  backPick: {
    alignSelf: "flex-start",
  },
  backPickText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1f6b4a",
  },
  filterBox: {
    gap: 8,
    borderWidth: 1,
    borderColor: "#e5dccb",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#f7f3ea",
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1d1a16",
  },
  filterClear: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1f6b4a",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 8,
    backgroundColor: "#fffdf8",
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: "#1d1a16",
  },
  suggestList: {
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fffdf8",
  },
  suggestItem: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee6d8",
  },
  suggestDex: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8a8276",
  },
  suggestName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1d1a16",
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#5c564c",
  },
  typeChipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  typeChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  typeChipBlocked: {
    opacity: 0.35,
  },
  typeChipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1d1a16",
  },
  typeChipTextSelected: {
    color: "#fff",
  },
  statFilterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statFilterLabel: {
    width: 56,
    fontSize: 11,
    fontWeight: "700",
    color: "#5c564c",
  },
  statModeRow: {
    flexDirection: "row",
    gap: 4,
  },
  statModeChip: {
    borderWidth: 1,
    borderColor: "#cfc6b6",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    backgroundColor: "#fffdf8",
  },
  statModeChipSelected: {
    borderColor: "#1f6b4a",
    backgroundColor: "#eef7f1",
  },
  statModeChipText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#8a8276",
  },
  statModeChipTextSelected: {
    color: "#1f6b4a",
  },
  statFilterInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 8,
    backgroundColor: "#fffdf8",
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: "700",
    color: "#1d1a16",
    textAlign: "center",
  },
  filterResult: {
    fontSize: 12,
    fontWeight: "700",
    color: "#5c564c",
  },
  pager: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pageBtn: {
    borderWidth: 1,
    borderColor: "#cfc6b6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#fffdf8",
  },
  pageBtnDisabled: {
    opacity: 0.4,
  },
  pageBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1f6b4a",
  },
  pageLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#5c564c",
  },
  pickList: {
    gap: 8,
  },
  pickCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fffdf8",
  },
  pickCardInParty: {
    borderColor: "#1f6b4a",
    backgroundColor: "#eef7f1",
  },
  pickCardBody: {
    flex: 1,
    gap: 2,
  },
  pickDex: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8a8276",
  },
  pickName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1d1a16",
  },
  inPartyBadge: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1f6b4a",
  },
  pressed: {
    opacity: 0.75,
  },
  confirmBackdrop: {
    flex: 1,
    backgroundColor: "rgba(28, 36, 24, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  confirmSheet: {
    width: "50%",
    maxWidth: 420,
    minWidth: 280,
    backgroundColor: "#fffdf8",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    padding: 18,
    gap: 12,
  },
  confirmTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1d1a16",
  },
  confirmBody: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5c564c",
    lineHeight: 20,
  },
  confirmRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
  },
  confirmSecondary: {
    borderWidth: 1,
    borderColor: "#cfc6b6",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#fffdf8",
  },
  confirmSecondaryText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#5c564c",
  },
  confirmPrimary: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#1f6b4a",
  },
  confirmPrimaryText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#fffdf8",
  },
});
