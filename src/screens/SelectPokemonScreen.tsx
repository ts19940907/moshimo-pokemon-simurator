import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import type { RestrictionMode, LevelCapMode, OpponentType } from "../match-setup/types";
import {
  moveGenerationFilterFromParams,
  pokemonGenerationFilterFromParams,
} from "../match-setup/params";
import { usePartySetup } from "../party/PartySetupContext";
import {
  createDefaultBuild,
  genderLabel,
  type PartyMemberBuild,
  type PartySide,
} from "../party/types";
import { calcGen1Stats, summarizeGen1Stats } from "../party/gen1Stats";
import {
  formatDexNo,
  getDisplayBaseStats,
  getSelectableSpeciesFromList,
  getTypes,
  MIN_PARTY_SIZE,
  PAGE_SIZE,
  PARTY_SIZE,
  TYPE_COLORS,
} from "../pokemon/catalog";
import { fetchMovesByIds } from "../pokemon/moveRepository";
import { fetchPokemonSpecies } from "../pokemon/repository";
import {
  TYPE_BY_ID,
  TYPE_NONE,
  type PokemonSpecies,
  type TypeId,
} from "../pokemon/types";
import { PokemonSprite } from "../pokemon/PokemonSprite";
import { SetPokemonDialog } from "./set/SetPokemonDialog";
import { DamageCalcDialog } from "../battle/DamageCalcDialog";
import { SpeedCompareDialog } from "../battle/SpeedCompareDialog";
import { Gen1TypeChartDialog } from "../battle/Gen1TypeChartDialog";
import { generateCpuParty } from "../battle/cpuTeam";

const grassland = require("../../assets/title/title-grassland.png");

type StatKey = "hp" | "attack" | "defense" | "special" | "speed";
type StatCompareMode = "gte" | "lte";
type StatFilterEntry = { value: string; mode: StatCompareMode };
type StatFiltersState = Record<StatKey, StatFilterEntry>;
/** When 2 types are selected: ignore order vs type1/type2 order. */
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

function matchesNameQuery(pokemon: PokemonSpecies, query: string): boolean {
  const trimmed = query.trim();
  if (!trimmed) {
    return true;
  }
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
  if (!trimmed) {
    return null;
  }
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

function matchesStatFilter(
  statValue: number,
  filter: StatFilterEntry,
): boolean {
  const threshold = parseStatThreshold(filter.value);
  if (threshold == null) {
    return true;
  }
  return filter.mode === "gte" ? statValue >= threshold : statValue <= threshold;
}

function matchesTypeFilter(
  pokemon: PokemonSpecies,
  typeFilters: TypeId[],
  singleTypeOnly: boolean,
  dualOrderMode: DualTypeOrderMode,
): boolean {
  if (typeFilters.length === 0) {
    return true;
  }

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
  if (current.length >= MAX_TYPE_FILTERS) {
    return current;
  }
  return [...current, typeId];
}

type MatchParams = {
  side?: string;
  rulesGeneration?: string;
  syncGenerationsWithRules?: string;
  pokemonGenerations?: string;
  moveGenerations?: string;
  pokemonGeneration?: string;
  moveGeneration?: string;
  restrictionMode?: RestrictionMode;
  opponentType?: string;
  visibilityMode?: string;
  levelCapMode?: string;
};

function parseSide(value: string | undefined): PartySide {
  return value === "b" ? "b" : "a";
}

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statBarTrack}>
        <View
          style={[
            styles.statBarFill,
            { width: `${Math.min(100, (value / 160) * 100)}%` },
          ]}
        />
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function PokemonCard({
  pokemon,
  selected,
  disabled,
  onPress,
}: {
  pokemon: PokemonSpecies;
  selected: boolean;
  disabled: boolean;
  onPress: () => void;
}) {
  const types = getTypes(pokemon);
  const stats = getDisplayBaseStats(pokemon);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      disabled={disabled && !selected}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        disabled && !selected && styles.cardDisabled,
        pressed && !(disabled && !selected) && styles.cardPressed,
      ]}
    >
      <View style={styles.spriteColumn}>
        <PokemonSprite uri={pokemon.sprite_url} />
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          <Text style={styles.dexNo}>{formatDexNo(pokemon.dex_no)}</Text>
          <Text style={styles.name}>{pokemon.name_ja}</Text>
        </View>
        <View style={styles.typeRow}>
          {types.map((type) => (
            <View
              key={type}
              style={[
                styles.typeBadge,
                { backgroundColor: TYPE_COLORS[type] ?? "#888" },
              ]}
            >
              <Text style={styles.typeText}>{type}</Text>
            </View>
          ))}
        </View>
        <StatRow label="HP" value={stats.hp} />
        <StatRow label="こうげき" value={stats.attack} />
        <StatRow label="ぼうぎょ" value={stats.defense} />
        <StatRow label="とくしゅ" value={stats.special} />
        <StatRow label="すばやさ" value={stats.speed} />
      </View>
    </Pressable>
  );
}

function PagePager({
  page,
  totalPages,
  onChangePage,
}: {
  page: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const atFirst = page <= 0;
  const atLast = page >= totalPages - 1;

  return (
    <View style={styles.pagerBlock}>
      <View style={styles.pager}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="最初のページ"
          disabled={atFirst}
          onPress={() => onChangePage(0)}
          style={({ pressed }) => [
            styles.pageButton,
            atFirst && styles.pageButtonDisabled,
            pressed && !atFirst && styles.pressed,
          ]}
        >
          <Text style={styles.pageButtonText}>最初</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="前のページ"
          disabled={atFirst}
          onPress={() => onChangePage(Math.max(0, page - 1))}
          style={({ pressed }) => [
            styles.pageButton,
            atFirst && styles.pageButtonDisabled,
            pressed && !atFirst && styles.pressed,
          ]}
        >
          <Text style={styles.pageButtonText}>前へ</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="ページを選択"
          onPress={() => setMenuOpen(true)}
          style={({ pressed }) => [
            styles.pageSelect,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.pageSelectText}>
            {page + 1} / {totalPages}
          </Text>
          <Text style={styles.pageSelectCaret}>▾</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="次のページ"
          disabled={atLast}
          onPress={() => onChangePage(Math.min(totalPages - 1, page + 1))}
          style={({ pressed }) => [
            styles.pageButton,
            atLast && styles.pageButtonDisabled,
            pressed && !atLast && styles.pressed,
          ]}
        >
          <Text style={styles.pageButtonText}>次へ</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="最後のページ"
          disabled={atLast}
          onPress={() => onChangePage(totalPages - 1)}
          style={({ pressed }) => [
            styles.pageButton,
            atLast && styles.pageButtonDisabled,
            pressed && !atLast && styles.pressed,
          ]}
        >
          <Text style={styles.pageButtonText}>最後</Text>
        </Pressable>
      </View>
      <Text style={styles.pageHint}>1ページ{PAGE_SIZE}体</Text>

      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <View style={styles.pageMenuBackdrop}>
          <Pressable
            style={styles.pageMenuDismiss}
            onPress={() => setMenuOpen(false)}
          />
          <View style={styles.pageMenuSheet}>
            <Text style={styles.pageMenuTitle}>ページへ移動</Text>
            <ScrollView style={styles.pageMenuList}>
              {Array.from({ length: totalPages }, (_, index) => {
                const selected = index === page;
                return (
                  <Pressable
                    key={index}
                    accessibilityRole="button"
                    onPress={() => {
                      onChangePage(index);
                      setMenuOpen(false);
                    }}
                    style={[
                      styles.pageMenuItem,
                      selected && styles.pageMenuItemSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.pageMenuItemText,
                        selected && styles.pageMenuItemTextSelected,
                      ]}
                    >
                      {index + 1} ページ目
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function SpeciesFilters({
  nameQuery,
  onNameQueryChange,
  suggestions,
  onPickSuggestion,
  typeFilters,
  onToggleTypeFilter,
  singleTypeOnly,
  onSingleTypeOnlyChange,
  dualOrderMode,
  onDualOrderModeChange,
  finalEvolutionOnly,
  onFinalEvolutionOnlyChange,
  statFilters,
  onStatFilterChange,
  resultCount,
  onClear,
}: {
  nameQuery: string;
  onNameQueryChange: (value: string) => void;
  suggestions: PokemonSpecies[];
  onPickSuggestion: (pokemon: PokemonSpecies) => void;
  typeFilters: TypeId[];
  onToggleTypeFilter: (typeId: TypeId) => void;
  singleTypeOnly: boolean;
  onSingleTypeOnlyChange: (value: boolean) => void;
  dualOrderMode: DualTypeOrderMode;
  onDualOrderModeChange: (value: DualTypeOrderMode) => void;
  finalEvolutionOnly: boolean;
  onFinalEvolutionOnlyChange: (value: boolean) => void;
  statFilters: StatFiltersState;
  onStatFilterChange: (
    key: StatKey,
    patch: Partial<StatFilterEntry>,
  ) => void;
  resultCount: number;
  onClear: () => void;
}) {
  const hasFilters =
    nameQuery.trim().length > 0 ||
    typeFilters.length > 0 ||
    singleTypeOnly ||
    !finalEvolutionOnly ||
    STAT_FILTERS.some(
      ({ key }) => parseStatThreshold(statFilters[key].value) != null,
    );

  return (
    <View style={styles.filterBox}>
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>絞り込み</Text>
        {hasFilters ? (
          <Pressable onPress={onClear} style={({ pressed }) => pressed && styles.pressed}>
            <Text style={styles.filterClear}>クリア</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          value={nameQuery}
          onChangeText={onNameQueryChange}
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
                onPress={() => onPickSuggestion(pokemon)}
                style={({ pressed }) => [
                  styles.suggestItem,
                  pressed && styles.suggestItemPressed,
                ]}
              >
                <Text style={styles.suggestDex}>{formatDexNo(pokemon.dex_no)}</Text>
                <Text style={styles.suggestName}>{pokemon.name_ja}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </View>

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
              onPress={() => onToggleTypeFilter(type.id)}
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
                {selected ? `${selectedIndex + 1}.${type.nameJa}` : type.nameJa}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {typeFilters.length === 1 ? (
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: singleTypeOnly }}
          onPress={() => onSingleTypeOnlyChange(!singleTypeOnly)}
          style={styles.checkRow}
        >
          <View
            style={[
              styles.checkbox,
              singleTypeOnly && styles.checkboxChecked,
            ]}
          >
            {singleTypeOnly ? <Text style={styles.checkboxMark}>✓</Text> : null}
          </View>
          <Text style={styles.checkLabel}>単タイプのみ</Text>
        </Pressable>
      ) : null}

      {typeFilters.length === 2 ? (
        <View style={styles.dualOrderRow}>
          <Pressable
            onPress={() => onDualOrderModeChange("any")}
            style={[
              styles.dualOrderChip,
              dualOrderMode === "any" && styles.dualOrderChipSelected,
            ]}
          >
            <Text
              style={[
                styles.dualOrderChipText,
                dualOrderMode === "any" && styles.dualOrderChipTextSelected,
              ]}
            >
              順序を問わない
            </Text>
          </Pressable>
          <Pressable
            onPress={() => onDualOrderModeChange("exact")}
            style={[
              styles.dualOrderChip,
              dualOrderMode === "exact" && styles.dualOrderChipSelected,
            ]}
          >
            <Text
              style={[
                styles.dualOrderChipText,
                dualOrderMode === "exact" && styles.dualOrderChipTextSelected,
              ]}
            >
              順序どおり（1→2）
            </Text>
          </Pressable>
        </View>
      ) : null}

      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: finalEvolutionOnly }}
        onPress={() => onFinalEvolutionOnlyChange(!finalEvolutionOnly)}
        style={styles.checkRow}
      >
        <View
          style={[
            styles.checkbox,
            finalEvolutionOnly && styles.checkboxChecked,
          ]}
        >
          {finalEvolutionOnly ? (
            <Text style={styles.checkboxMark}>✓</Text>
          ) : null}
        </View>
        <Text style={styles.checkLabel}>最終進化のみ</Text>
      </Pressable>

      <Text style={styles.filterLabel}>種族値</Text>
      <View style={styles.statFilterRow}>
        {STAT_FILTERS.map(({ key, label }) => {
          const filter = statFilters[key];
          return (
            <View key={key} style={styles.statFilterField}>
              <Text style={styles.statFilterLabel}>{label}</Text>
              <View style={styles.statModeRow}>
                <Pressable
                  onPress={() => onStatFilterChange(key, { mode: "gte" })}
                  style={[
                    styles.statModeChip,
                    filter.mode === "gte" && styles.statModeChipSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.statModeChipText,
                      filter.mode === "gte" && styles.statModeChipTextSelected,
                    ]}
                  >
                    以上
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => onStatFilterChange(key, { mode: "lte" })}
                  style={[
                    styles.statModeChip,
                    filter.mode === "lte" && styles.statModeChipSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.statModeChipText,
                      filter.mode === "lte" && styles.statModeChipTextSelected,
                    ]}
                  >
                    以下
                  </Text>
                </Pressable>
              </View>
              <TextInput
                value={filter.value}
                onChangeText={(value) =>
                  onStatFilterChange(key, {
                    value: value.replace(/[^\d]/g, ""),
                  })
                }
                keyboardType="number-pad"
                placeholder="—"
                placeholderTextColor="#9a9286"
                style={styles.statFilterInput}
              />
            </View>
          );
        })}
      </View>

      <Text style={styles.filterResult}>
        {resultCount}体表示中
        {hasFilters ? "（絞り込み適用中）" : ""}
      </Text>
    </View>
  );
}

export function SelectPokemonScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<MatchParams>();
  const { getSide, setSideParty } = usePartySetup();
  const side = parseSide(params.side);
  const isOpponentSide = side === "b";
  const opponentType = (params.opponentType ?? "local_both") as OpponentType;
  const levelCapMode = (params.levelCapMode ?? "max_50") as LevelCapMode;
  const rulesGeneration = Number(params.rulesGeneration) || 1;
  const restrictionMode = (params.restrictionMode ??
    "standard") as RestrictionMode;
  const pokemonGenerationOptions = useMemo(
    () => pokemonGenerationFilterFromParams(params),
    [
      params.rulesGeneration,
      params.syncGenerationsWithRules,
      params.pokemonGenerations,
      params.pokemonGeneration,
    ],
  );
  const moveGenerationOptions = useMemo(
    () => moveGenerationFilterFromParams(params),
    [
      params.rulesGeneration,
      params.syncGenerationsWithRules,
      params.moveGenerations,
      params.moveGeneration,
    ],
  );

  const [allSpecies, setAllSpecies] = useState<PokemonSpecies[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [selectedDexNos, setSelectedDexNos] = useState<number[]>([]);
  /** Builds keyed by species id (survives re-select of same dex). */
  const [buildsBySpeciesId, setBuildsBySpeciesId] = useState<
    Record<string, PartyMemberBuild>
  >({});
  const [settingSpeciesId, setSettingSpeciesId] = useState<string | null>(null);
  const [moveNames, setMoveNames] = useState<Record<string, string>>({});
  const [movesRequiredOpen, setMovesRequiredOpen] = useState(false);
  const [partyRequiredOpen, setPartyRequiredOpen] = useState(false);
  const [typeChartOpen, setTypeChartOpen] = useState(false);
  const [damageCalcOpen, setDamageCalcOpen] = useState(false);
  const [speedCompareOpen, setSpeedCompareOpen] = useState(false);
  const [leaveConfirmOpen, setLeaveConfirmOpen] = useState(false);
  const [cpuGenerating, setCpuGenerating] = useState(false);
  const [nameQuery, setNameQuery] = useState("");
  const [typeFilters, setTypeFilters] = useState<TypeId[]>([]);
  const [singleTypeOnly, setSingleTypeOnly] = useState(false);
  const [dualOrderMode, setDualOrderMode] =
    useState<DualTypeOrderMode>("any");
  const [finalEvolutionOnly, setFinalEvolutionOnly] = useState(true);
  const [statFilters, setStatFilters] =
    useState<StatFiltersState>(EMPTY_STAT_FILTERS);
  const [suggestOpen, setSuggestOpen] = useState(false);

  useEffect(() => {
    const existing = getSide(side);
    setSelectedDexNos(existing?.members.map((member) => member.dexNo) ?? []);
    const builds: Record<string, PartyMemberBuild> = {};
    for (const member of existing?.members ?? []) {
      builds[member.speciesId] = member;
    }
    setBuildsBySpeciesId(builds);
    setPage(0);
    setNameQuery("");
    setTypeFilters([]);
    setSingleTypeOnly(false);
    setDualOrderMode("any");
    setFinalEvolutionOnly(true);
    setStatFilters(EMPTY_STAT_FILTERS);
    setSuggestOpen(false);
  }, [side, getSide]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setErrorMessage(null);
        const rows = await fetchPokemonSpecies();
        if (!cancelled) {
          setAllSpecies(rows);
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "ポケモンデータの取得に失敗しました。",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const species = useMemo(
    () =>
      getSelectableSpeciesFromList(
        allSpecies,
        restrictionMode,
        pokemonGenerationOptions,
      ),
    [allSpecies, restrictionMode, pokemonGenerationOptions],
  );

  const filteredSpecies = useMemo(() => {
    return species.filter((pokemon) => {
      if (!matchesNameQuery(pokemon, nameQuery)) {
        return false;
      }
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
      if (finalEvolutionOnly && !pokemon.is_final_evolution) {
        return false;
      }
      const stats = getDisplayBaseStats(pokemon);
      for (const { key } of STAT_FILTERS) {
        if (!matchesStatFilter(stats[key], statFilters[key])) {
          return false;
        }
      }
      return true;
    });
  }, [
    species,
    nameQuery,
    typeFilters,
    singleTypeOnly,
    dualOrderMode,
    finalEvolutionOnly,
    statFilters,
  ]);

  const suggestions = useMemo(() => {
    const trimmed = nameQuery.trim();
    if (!suggestOpen || trimmed.length < 1) {
      return [];
    }
    return species
      .filter((pokemon) => matchesNameQuery(pokemon, trimmed))
      .slice(0, 8);
  }, [species, nameQuery, suggestOpen]);

  const totalPages = Math.max(1, Math.ceil(filteredSpecies.length / PAGE_SIZE));
  const pageItems = filteredSpecies.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );
  const partyFull = selectedDexNos.length >= PARTY_SIZE;

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

  const clearFilters = () => {
    setNameQuery("");
    setTypeFilters([]);
    setSingleTypeOnly(false);
    setDualOrderMode("any");
    setFinalEvolutionOnly(true);
    setStatFilters(EMPTY_STAT_FILTERS);
    setSuggestOpen(false);
  };

  const handleToggleTypeFilter = (typeId: TypeId) => {
    setTypeFilters((current) => {
      const next = toggleTypeFilter(current, typeId);
      if (next.length !== 1) {
        setSingleTypeOnly(false);
      }
      return next;
    });
  };

  const togglePokemon = (dexNo: number) => {
    const pokemon = species.find((row) => row.dex_no === dexNo);
    if (!pokemon) return;

    const isSelected = selectedDexNos.includes(dexNo);
    if (isSelected) {
      setSelectedDexNos((current) => current.filter((id) => id !== dexNo));
      setBuildsBySpeciesId((current) => {
        const next = { ...current };
        delete next[pokemon.id];
        for (const [id, member] of Object.entries(next)) {
          if (member.dexNo === dexNo) delete next[id];
        }
        return next;
      });
      if (settingSpeciesId === pokemon.id) setSettingSpeciesId(null);
      return;
    }

    if (selectedDexNos.length >= PARTY_SIZE) return;

    setSelectedDexNos((current) => [...current, dexNo]);
    setBuildsBySpeciesId((current) => {
      if (current[pokemon.id]) return current;
      return {
        ...current,
        [pokemon.id]: createDefaultBuild(pokemon, levelCapMode),
      };
    });
  };

  const selectedPokemon = selectedDexNos
    .map((dexNo) => species.find((pokemon) => pokemon.dex_no === dexNo))
    .filter((pokemon): pokemon is PokemonSpecies => Boolean(pokemon));

  const orderedMembers = selectedPokemon
    .map((pokemon) => buildsBySpeciesId[pokemon.id])
    .filter((member): member is PartyMemberBuild => Boolean(member));

  const settingPokemon = settingSpeciesId
    ? selectedPokemon.find((p) => p.id === settingSpeciesId) ?? null
    : null;
  const settingBuild = settingSpeciesId
    ? buildsBySpeciesId[settingSpeciesId] ?? null
    : null;

  useEffect(() => {
    const ids = new Set<string>();
    for (const member of Object.values(buildsBySpeciesId)) {
      for (const moveId of member.moveIds) {
        if (moveId) ids.add(moveId);
      }
    }
    if (ids.size === 0) {
      setMoveNames({});
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const moves = await fetchMovesByIds([...ids]);
        if (cancelled) return;
        const map: Record<string, string> = {};
        for (const move of moves) map[move.id] = move.name_ja;
        setMoveNames(map);
      } catch {
        if (!cancelled) setMoveNames({});
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [buildsBySpeciesId]);

  const matchParams = useMemo(() => {
    const { side: _side, ...rest } = params;
    return rest;
  }, [params]);

  const continueAfterSelect = async () => {
    if (orderedMembers.length < MIN_PARTY_SIZE) {
      setPartyRequiredOpen(true);
      return;
    }
    if (orderedMembers.length > PARTY_SIZE) return;

    const missingMoves = orderedMembers.filter(
      (member) => !member.moveIds.some((moveId) => Boolean(moveId)),
    );
    if (missingMoves.length > 0) {
      setMovesRequiredOpen(true);
      return;
    }

    setSideParty(side, {
      members: orderedMembers,
      levelCapMode,
      rulesGeneration,
    });

    if (opponentType === "local_both" && side === "a") {
      router.push({
        pathname: "/party",
        params: {
          ...matchParams,
          side: "b",
        },
      });
      return;
    }

    if (opponentType === "cpu" && side === "a") {
      try {
        setCpuGenerating(true);
        setErrorMessage(null);
        const cpuParty = await generateCpuParty({
          speciesPool: species,
          levelCapMode,
          moveGenerationOptions,
          playerDexNos: orderedMembers.map((m) => m.dexNo),
          rulesGeneration,
        });
        const missingCpuMoves = cpuParty.members.filter(
          (member) => !member.moveIds.some((moveId) => Boolean(moveId)),
        );
        if (missingCpuMoves.length > 0) {
          setErrorMessage(
            "CPUパーティの技取得に失敗しました。通信を確認して再試行してください。",
          );
          return;
        }
        setSideParty("b", cpuParty);
        router.push({
          pathname: "/select",
          params: {
            ...matchParams,
            selectSide: "a",
          },
        });
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "CPUパーティの作成に失敗しました。",
        );
      } finally {
        setCpuGenerating(false);
      }
      return;
    }

    router.push({
      pathname: "/select",
      params: {
        ...matchParams,
        selectSide: "a",
      },
    });
  };

  const continueLabel =
    opponentType === "local_both" && side === "a"
      ? "相手の編成へ進む"
      : opponentType === "cpu"
        ? "CPU編成のあと3体選出へ"
        : "3体選出へ進む";

  const leaveBack = () => {
    if (isOpponentSide) {
      router.replace({
        pathname: "/party",
        params: {
          ...matchParams,
          side: "a",
        },
      });
      return;
    }
    router.replace({
      pathname: "/menu",
      params: {
        rulesGeneration: params.rulesGeneration,
        syncGenerationsWithRules: params.syncGenerationsWithRules,
        pokemonGenerations: params.pokemonGenerations,
        moveGenerations: params.moveGenerations,
        pokemonGeneration: params.pokemonGeneration,
        moveGeneration: params.moveGeneration,
        restrictionMode: params.restrictionMode,
        opponentType: params.opponentType,
        visibilityMode: params.visibilityMode,
        levelCapMode: params.levelCapMode,
      },
    });
  };

  const requestLeave = () => {
    if (selectedDexNos.length > 0) {
      setLeaveConfirmOpen(true);
      return;
    }
    leaveBack();
  };

  return (
    <ImageBackground source={grassland} style={styles.background} resizeMode="cover">
      <View style={styles.dim} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.panel}>
            <View style={styles.header}>
              <Pressable
                accessibilityRole="button"
                onPress={requestLeave}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Text style={styles.backText}>
                  {isOpponentSide ? "自分の編成へ戻る" : "メニューへ戻る"}
                </Text>
              </Pressable>
              <Text style={styles.kicker}>
                {isOpponentSide ? "相手の編成" : "編成"}
              </Text>
              <Text style={styles.title}>
                {isOpponentSide ? "相手のポケモンを選ぶ" : "ポケモンを選ぶ"}
              </Text>
              <Text style={styles.lead}>
                {isOpponentSide
                  ? `サイドBを${MIN_PARTY_SIZE}〜${PARTY_SIZE}体選び、その場で個体・技も設定します。同一種族は1体までです。`
                  : `図鑑順に表示しています。${MIN_PARTY_SIZE}〜${PARTY_SIZE}体選択でき、その場で個体・技を設定できます（同一種族は1体まで）。`}
              </Text>
              <Pressable
                onPress={() => setTypeChartOpen(true)}
                style={({ pressed }) => [
                  styles.typeChartButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.typeChartButtonText}>
                  初代タイプ相性表を見る
                </Text>
              </Pressable>
            </View>

            {loading ? (
              <View style={styles.stateBox}>
                <ActivityIndicator color="#1f6b4a" />
                <Text style={styles.stateText}>ポケモンデータを読み込み中…</Text>
              </View>
            ) : null}

            {errorMessage ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{errorMessage}</Text>
                <Text style={styles.stateText}>
                  ネットワーク接続と Supabase 設定を確認してください。
                </Text>
              </View>
            ) : null}

            {!loading && !errorMessage ? (
              <>
            <View style={styles.partyBox}>
              <Text style={styles.partyTitle}>
                パーティ {selectedDexNos.length}/{PARTY_SIZE}
              </Text>
              <Text style={styles.partyHint}>
                「設定」で個体値・努力値・技を編集、「解除」で選択を外せます。
              </Text>
              <View style={styles.partySlots}>
                {selectedPokemon.map((pokemon) => {
                  const build = buildsBySpeciesId[pokemon.id];
                  const stats = build
                    ? calcGen1Stats(pokemon, build)
                    : null;
                  const moveLabel = build
                    ? build.moveIds
                        .map((id, i) =>
                          id
                            ? moveNames[id] ?? "…"
                            : `技${i + 1}:なし`,
                        )
                        .join(" ／ ")
                    : "—";
                  return (
                    <View
                      key={pokemon.id}
                      style={[styles.partySlot, styles.partySlotFilled]}
                    >
                      <View style={styles.partySlotHeader}>
                        <PokemonSprite
                          uri={pokemon.sprite_url}
                          size={48}
                          style={styles.partySpriteFrame}
                        />
                        <View style={styles.partySlotHeaderText}>
                          <Text style={styles.partyName} numberOfLines={1}>
                            {pokemon.name_ja}
                          </Text>
                          <Text style={styles.partyMeta}>
                            {build
                              ? `Lv${build.level} ／ ${genderLabel(build.gender)}`
                              : formatDexNo(pokemon.dex_no)}
                          </Text>
                        </View>
                      </View>
                      {stats ? (
                        <Text style={styles.partyStats} numberOfLines={2}>
                          {summarizeGen1Stats(stats)}
                        </Text>
                      ) : null}
                      <Text style={styles.partyMoves} numberOfLines={2}>
                        {moveLabel}
                      </Text>
                      <View style={styles.partyActions}>
                        <Pressable
                          accessibilityRole="button"
                          accessibilityLabel={`${pokemon.name_ja}を設定`}
                          onPress={() => setSettingSpeciesId(pokemon.id)}
                          hitSlop={6}
                          style={({ pressed }) => [
                            styles.partyActionButton,
                            styles.partySetButton,
                            pressed && styles.pressed,
                          ]}
                        >
                          <Text style={styles.partySet}>設定</Text>
                        </Pressable>
                        <Pressable
                          accessibilityRole="button"
                          accessibilityLabel={`${pokemon.name_ja}を解除`}
                          onPress={() => togglePokemon(pokemon.dex_no)}
                          hitSlop={6}
                          style={({ pressed }) => [
                            styles.partyActionButton,
                            styles.partyRemoveButton,
                            pressed && styles.pressed,
                          ]}
                        >
                          <Text style={styles.partyRemove}>解除</Text>
                        </Pressable>
                      </View>
                    </View>
                  );
                })}
                {selectedDexNos.length < PARTY_SIZE ? (
                  <View style={styles.partyEmptyRow}>
                    {Array.from(
                      { length: PARTY_SIZE - selectedDexNos.length },
                      (_, index) => (
                        <View
                          key={`empty-${index}`}
                          style={styles.partySlotEmpty}
                        >
                          <Text style={styles.partyEmpty}>
                            {selectedDexNos.length + index + 1}
                          </Text>
                        </View>
                      ),
                    )}
                  </View>
                ) : null}
              </View>
            </View>

            <View style={styles.toolButtonRow}>
              <Pressable
                accessibilityRole="button"
                onPress={() => setDamageCalcOpen(true)}
                style={({ pressed }) => [
                  styles.toolButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.toolButtonText}>ダメージ計算</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => setSpeedCompareOpen(true)}
                style={({ pressed }) => [
                  styles.toolButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.toolButtonText}>素早さ比較</Text>
              </Pressable>
            </View>

            <SpeciesFilters
              nameQuery={nameQuery}
              onNameQueryChange={(value) => {
                setNameQuery(value);
                setSuggestOpen(true);
              }}
              suggestions={suggestions}
              onPickSuggestion={(pokemon) => {
                setNameQuery(pokemon.name_ja);
                setSuggestOpen(false);
              }}
              typeFilters={typeFilters}
              onToggleTypeFilter={handleToggleTypeFilter}
              singleTypeOnly={singleTypeOnly}
              onSingleTypeOnlyChange={setSingleTypeOnly}
              dualOrderMode={dualOrderMode}
              onDualOrderModeChange={setDualOrderMode}
              finalEvolutionOnly={finalEvolutionOnly}
              onFinalEvolutionOnlyChange={setFinalEvolutionOnly}
              statFilters={statFilters}
              onStatFilterChange={(key, patch) =>
                setStatFilters((current) => ({
                  ...current,
                  [key]: { ...current[key], ...patch },
                }))
              }
              resultCount={filteredSpecies.length}
              onClear={clearFilters}
            />

            <PagePager
              page={page}
              totalPages={totalPages}
              onChangePage={setPage}
            />

            <View style={styles.list}>
              {pageItems.length === 0 ? (
                <View style={styles.emptyBox}>
                  <Text style={styles.emptyText}>
                    条件に合うポケモンが見つかりません。
                  </Text>
                </View>
              ) : (
                pageItems.map((pokemon) => {
                  const selected = selectedDexNos.includes(pokemon.dex_no);
                  return (
                    <PokemonCard
                      key={`${pokemon.dex_no}-${pokemon.region_type}-${pokemon.is_mega}`}
                      pokemon={pokemon}
                      selected={selected}
                      disabled={partyFull && !selected}
                      onPress={() => togglePokemon(pokemon.dex_no)}
                    />
                  );
                })
              )}
            </View>

            <PagePager
              page={page}
              totalPages={totalPages}
              onChangePage={setPage}
            />
              </>
            ) : null}
          </View>
        </ScrollView>

        {!loading ? (
          <View style={styles.continueBar}>
            <Pressable
              accessibilityRole="button"
              disabled={cpuGenerating}
              onPress={() => {
                void continueAfterSelect();
              }}
              style={({ pressed }) => [
                styles.primaryButton,
                (pressed || cpuGenerating) && styles.primaryButtonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>
                {cpuGenerating
                  ? "CPU編成を準備中…"
                  : selectedDexNos.length >= MIN_PARTY_SIZE
                    ? continueLabel
                    : `あと${MIN_PARTY_SIZE - selectedDexNos.length}体以上選んでください`}
              </Text>
            </Pressable>
          </View>
        ) : null}
      </SafeAreaView>

      {settingPokemon && settingBuild ? (
        <SetPokemonDialog
          visible
          member={settingBuild}
          species={settingPokemon}
          levelCapMode={levelCapMode}
          moveGenerationOptions={moveGenerationOptions}
          onClose={() => setSettingSpeciesId(null)}
          onSave={(build) => {
            setBuildsBySpeciesId((current) => ({
              ...current,
              [build.speciesId]: build,
            }));
            setSettingSpeciesId(null);
          }}
        />
      ) : null}

      <Gen1TypeChartDialog
        visible={typeChartOpen}
        onClose={() => setTypeChartOpen(false)}
      />

      <DamageCalcDialog
        visible={damageCalcOpen}
        speciesPool={species}
        levelCapMode={levelCapMode}
        moveGenerationOptions={moveGenerationOptions}
        partyBuildsBySpeciesId={buildsBySpeciesId}
        partyDexNos={selectedDexNos}
        onClose={() => setDamageCalcOpen(false)}
        onApplyToParty={(build) => {
          const alreadyInParty = selectedDexNos.includes(build.dexNo);
          if (!alreadyInParty) {
            if (selectedDexNos.length >= PARTY_SIZE) return;
            setSelectedDexNos((current) => [...current, build.dexNo]);
          }
          setBuildsBySpeciesId((current) => ({
            ...current,
            [build.speciesId]: build,
          }));
        }}
      />

      <SpeedCompareDialog
        visible={speedCompareOpen}
        speciesPool={species}
        levelCapMode={levelCapMode}
        partyBuildsBySpeciesId={buildsBySpeciesId}
        partyDexNos={selectedDexNos}
        onClose={() => setSpeedCompareOpen(false)}
        onApplyToParty={(build) => {
          const alreadyInParty = selectedDexNos.includes(build.dexNo);
          if (!alreadyInParty) {
            if (selectedDexNos.length >= PARTY_SIZE) return;
            setSelectedDexNos((current) => [...current, build.dexNo]);
          }
          setBuildsBySpeciesId((current) => ({
            ...current,
            [build.speciesId]: build,
          }));
        }}
      />

      <Modal
        visible={partyRequiredOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setPartyRequiredOpen(false)}
      >
        <View style={styles.confirmBackdrop}>
          <View style={styles.confirmSheet}>
            <Text style={styles.confirmTitle}>選出が足りません</Text>
            <Text style={styles.confirmBody}>
              ポケモンを{MIN_PARTY_SIZE}体以上選んでから進んでください。
              {"\n\n"}
              現在: {orderedMembers.length}体
            </Text>
            <Pressable
              onPress={() => setPartyRequiredOpen(false)}
              style={styles.confirmPrimary}
            >
              <Text style={styles.confirmPrimaryText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={movesRequiredOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMovesRequiredOpen(false)}
      >
        <View style={styles.confirmBackdrop}>
          <View style={styles.confirmSheet}>
            <Text style={styles.confirmTitle}>技が未設定です</Text>
            <Text style={styles.confirmBody}>
              技を1つも設定していないポケモンがいます。すべてのポケモンに1つ以上の技を設定してから進んでください。
              {"\n\n"}
              未設定:{" "}
              {orderedMembers
                .filter(
                  (member) => !member.moveIds.some((moveId) => Boolean(moveId)),
                )
                .map((member) => member.nameJa)
                .join("、")}
            </Text>
            <Pressable
              onPress={() => setMovesRequiredOpen(false)}
              style={styles.confirmPrimary}
            >
              <Text style={styles.confirmPrimaryText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={leaveConfirmOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setLeaveConfirmOpen(false)}
      >
        <View style={styles.confirmBackdrop}>
          <View style={styles.confirmSheet}>
            <Text style={styles.confirmTitle}>選択の破棄</Text>
            <Text style={styles.confirmBody}>
              {isOpponentSide
                ? "相手のポケモンが選択されています。このまま戻ると、選択内容は破棄されます。よろしいですか？"
                : "ポケモンが選択されています。このままメニューへ戻ると、選択内容は破棄されます。よろしいですか？"}
            </Text>
            <View style={styles.confirmActions}>
              <Pressable
                onPress={() => setLeaveConfirmOpen(false)}
                style={styles.confirmSecondary}
              >
                <Text style={styles.confirmSecondaryText}>キャンセル</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setLeaveConfirmOpen(false);
                  leaveBack();
                }}
                style={styles.confirmPrimary}
              >
                <Text style={styles.confirmPrimaryText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#87c6ef",
  },
  dim: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(20, 28, 16, 0.28)",
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    maxWidth: 720,
    width: "100%",
    alignSelf: "center",
  },
  continueBar: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    maxWidth: 720,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "rgba(255, 252, 245, 0.96)",
    borderTopWidth: 1,
    borderTopColor: "rgba(31, 107, 74, 0.18)",
  },
  panel: {
    backgroundColor: "rgba(255, 252, 245, 0.94)",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 22,
    gap: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
  },
  header: {
    gap: 6,
  },
  backText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1f6b4a",
  },
  pressed: {
    opacity: 0.7,
  },
  kicker: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: "#6b4f2a",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1d1a16",
  },
  lead: {
    fontSize: 14,
    lineHeight: 20,
    color: "#5c564c",
  },
  stateBox: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 24,
  },
  stateText: {
    fontSize: 13,
    color: "#5c564c",
    textAlign: "center",
  },
  errorBox: {
    backgroundColor: "#fdeceb",
    borderRadius: 12,
    padding: 14,
    gap: 6,
  },
  errorText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#a12828",
  },
  partyBox: {
    backgroundColor: "#eef7f1",
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  toolButtonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  toolButton: {
    backgroundColor: "#1f6b4a",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  toolButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#fffdf8",
  },
  partyTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1f6b4a",
  },
  partyHint: {
    fontSize: 12,
    fontWeight: "600",
    color: "#5c564c",
  },
  partySlots: {
    gap: 8,
  },
  partyEmptyRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  partySlotEmpty: {
    width: 48,
    height: 48,
    backgroundColor: "#fffdf8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cfe3d6",
    alignItems: "center",
    justifyContent: "center",
  },
  partySlot: {
    width: "100%",
    backgroundColor: "#fffdf8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cfe3d6",
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 6,
  },
  partySlotFilled: {
    borderColor: "#1f6b4a",
    backgroundColor: "#eef7f1",
  },
  partySlotHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  partySlotHeaderText: {
    flex: 1,
    gap: 2,
  },
  partySpriteFrame: {
    backgroundColor: "transparent",
    borderRadius: 0,
  },
  partyName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1d1a16",
  },
  partyMeta: {
    fontSize: 11,
    fontWeight: "600",
    color: "#5c564c",
  },
  partyStats: {
    fontSize: 11,
    fontWeight: "600",
    color: "#1f6b4a",
    lineHeight: 15,
  },
  partyMoves: {
    fontSize: 11,
    fontWeight: "600",
    color: "#5c564c",
    lineHeight: 15,
  },
  partyActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
  },
  partyActionButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  partySetButton: {
    borderColor: "#1f6b4a",
    backgroundColor: "#1f6b4a",
  },
  partySet: {
    fontSize: 11,
    fontWeight: "800",
    color: "#fffdf8",
  },
  partyRemoveButton: {
    borderColor: "#1f6b4a",
    backgroundColor: "#fffdf8",
  },
  partyRemove: {
    fontSize: 11,
    fontWeight: "800",
    color: "#1f6b4a",
  },
  typeChartButton: {
    alignSelf: "flex-start",
    backgroundColor: "#efe8dc",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d9cbb6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
  },
  typeChartButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6b4f2a",
  },
  partyEmpty: {
    fontSize: 18,
    fontWeight: "800",
    color: "#b7c3b0",
  },
  pager: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    flexWrap: "wrap",
  },
  pagerBlock: {
    gap: 6,
  },
  pageButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1f6b4a",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  pageButtonDisabled: {
    opacity: 0.35,
  },
  pageButtonText: {
    color: "#1f6b4a",
    fontWeight: "700",
    fontSize: 13,
  },
  pageSelect: {
    flexGrow: 1,
    minWidth: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1f6b4a",
    backgroundColor: "#eef7f1",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  pageSelectText: {
    color: "#1f6b4a",
    fontWeight: "800",
    fontSize: 13,
  },
  pageSelectCaret: {
    color: "#1f6b4a",
    fontSize: 12,
    fontWeight: "700",
  },
  pageHint: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: "#8a8276",
  },
  pageMenuBackdrop: {
    flex: 1,
    backgroundColor: "rgba(20,28,16,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  pageMenuDismiss: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  pageMenuSheet: {
    width: "50%",
    maxWidth: 360,
    minWidth: 240,
    maxHeight: "70%",
    backgroundColor: "#fffdf8",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    padding: 14,
    gap: 10,
  },
  pageMenuTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1d1a16",
  },
  pageMenuList: {
    maxHeight: 320,
  },
  pageMenuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  pageMenuItemSelected: {
    backgroundColor: "#eef7f1",
  },
  pageMenuItemText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5c564c",
  },
  pageMenuItemTextSelected: {
    color: "#1f6b4a",
  },
  filterBox: {
    backgroundColor: "#f7f3ea",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5dccb",
    padding: 12,
    gap: 10,
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1d1a16",
  },
  filterClear: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1f6b4a",
  },
  searchWrap: {
    position: "relative",
    zIndex: 2,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 10,
    backgroundColor: "#fffdf8",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1d1a16",
  },
  suggestList: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 10,
    backgroundColor: "#fffdf8",
    overflow: "hidden",
  },
  suggestItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e8e0d4",
  },
  suggestItemPressed: {
    backgroundColor: "#eef7f1",
  },
  suggestDex: {
    fontSize: 12,
    fontWeight: "800",
    color: "#6b4f2a",
  },
  suggestName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1d1a16",
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#5c564c",
  },
  typeChipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  typeChip: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  typeChipText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#5c564c",
  },
  typeChipTextSelected: {
    color: "#ffffff",
  },
  typeChipBlocked: {
    opacity: 0.35,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#1f6b4a",
    backgroundColor: "#fffdf8",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#1f6b4a",
  },
  checkboxMark: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 14,
  },
  checkLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1d1a16",
  },
  dualOrderRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  dualOrderChip: {
    borderWidth: 1,
    borderColor: "#cfc6b6",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#fffdf8",
  },
  dualOrderChipSelected: {
    borderColor: "#1f6b4a",
    backgroundColor: "#eef7f1",
  },
  dualOrderChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8a8276",
  },
  dualOrderChipTextSelected: {
    color: "#1f6b4a",
  },
  statFilterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statFilterField: {
    width: "18%",
    minWidth: 72,
    flexGrow: 1,
    gap: 4,
  },
  statFilterLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#8a8276",
  },
  statModeRow: {
    flexDirection: "row",
    gap: 4,
  },
  statModeChip: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#cfc6b6",
    borderRadius: 6,
    paddingVertical: 3,
    alignItems: "center",
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
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 8,
    backgroundColor: "#fffdf8",
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#1d1a16",
    textAlign: "center",
  },
  filterResult: {
    fontSize: 12,
    fontWeight: "700",
    color: "#5c564c",
  },
  emptyBox: {
    paddingVertical: 28,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8a8276",
  },
  list: {
    gap: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 12,
    backgroundColor: "#fffdf8",
    borderColor: "#ddd4c4",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    overflow: "hidden",
  },
  spriteColumn: {
    width: 160,
    flexShrink: 0,
    alignSelf: "stretch",
  },
  cardSelected: {
    borderColor: "#1f6b4a",
    backgroundColor: "#eef7f1",
  },
  cardDisabled: {
    opacity: 0.45,
  },
  cardPressed: {
    transform: [{ scale: 0.995 }],
  },
  cardBody: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  dexNo: {
    fontSize: 12,
    fontWeight: "800",
    color: "#6b4f2a",
  },
  name: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1d1a16",
  },
  typeRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 2,
  },
  typeBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  typeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statLabel: {
    width: 54,
    fontSize: 11,
    fontWeight: "700",
    color: "#5c564c",
  },
  statBarTrack: {
    flex: 1,
    height: 12,
    borderRadius: 3,
    backgroundColor: "#e8e0d4",
    overflow: "hidden",
  },
  statBarFill: {
    height: "100%",
    backgroundColor: "#1f6b4a",
  },
  statValue: {
    width: 28,
    textAlign: "right",
    fontSize: 11,
    fontWeight: "700",
    color: "#1d1a16",
  },
  primaryButton: {
    backgroundColor: "#1f6b4a",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryButtonDisabled: {
    backgroundColor: "#9bb5a8",
  },
  primaryButtonPressed: {
    backgroundColor: "#18553b",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  confirmBackdrop: {
    flex: 1,
    backgroundColor: "rgba(20,28,16,0.45)",
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
  confirmTitle: { fontSize: 17, fontWeight: "800", color: "#1d1a16" },
  confirmBody: { fontSize: 14, lineHeight: 20, color: "#5c564c" },
  confirmActions: { flexDirection: "row", gap: 10, marginTop: 4 },
  confirmSecondary: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#1f6b4a",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  confirmSecondaryText: { color: "#1f6b4a", fontWeight: "800" },
  confirmPrimary: {
    flex: 1,
    backgroundColor: "#1f6b4a",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  confirmPrimaryText: { color: "#fff", fontWeight: "800" },
});
