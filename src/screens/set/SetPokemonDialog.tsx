import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import type { Move, MoveDamageClass } from "../../pokemon/moves";
import { fetchMovesForPokemon } from "../../pokemon/moveRepository";
import {
  TYPE_BY_ID,
  TYPE_NONE,
  GENDER,
  type PokemonSpecies,
  type TypeId,
} from "../../pokemon/types";
import { TYPE_COLORS, typeNameJa } from "../../pokemon/catalog";
import {
  GEN1_STAT_KEYS,
  GEN1_STAT_LABELS,
  maxLevelForCap,
  type BattleGender,
  type Gen1StatBlock,
  type PartyMemberBuild,
} from "../../party/types";
import {
  calcGen1Stats,
  findStatExpForLevel50Delta,
  GEN1_DV_MAX,
  GEN1_STAT_EXP_MAX,
} from "../../party/gen1Stats";
import type { LevelCapMode } from "../../match-setup/types";
import type { GenerationFilterOptions } from "../../match-setup/generationFilter";

type Props = {
  visible: boolean;
  member: PartyMemberBuild;
  species: PokemonSpecies;
  levelCapMode: LevelCapMode;
  moveGenerationOptions: GenerationFilterOptions;
  onClose: () => void;
  onSave: (build: PartyMemberBuild) => void;
};

const DAMAGE_CLASS_JA: Record<MoveDamageClass, string> = {
  physical: "物理",
  special: "特殊",
  status: "変化",
};

const DAMAGE_CLASS_OPTIONS: MoveDamageClass[] = [
  "physical",
  "special",
  "status",
];

type NumCompareMode = "gte" | "lte";
type NumCompareFilter = { value: string; mode: NumCompareMode };

type MoveFiltersState = {
  typeId: TypeId | null;
  damageClasses: MoveDamageClass[];
  power: NumCompareFilter;
  accuracy: NumCompareFilter;
  priority: NumCompareFilter;
  pp: NumCompareFilter;
};

const EMPTY_NUM: NumCompareFilter = { value: "", mode: "gte" };

const EMPTY_MOVE_FILTERS: MoveFiltersState = {
  typeId: null,
  damageClasses: [],
  power: EMPTY_NUM,
  accuracy: EMPTY_NUM,
  priority: EMPTY_NUM,
  pp: EMPTY_NUM,
};

function clamp(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function StatAdjustButton({
  label,
  disabled,
  onPress,
}: {
  label: string;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.statBtn, disabled && styles.statBtnDisabled]}
    >
      <Text style={[styles.statBtnText, disabled && styles.statBtnTextDisabled]}>
        {label}
      </Text>
    </Pressable>
  );
}

function parseIntOr(value: string, fallback: number) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

function parseThreshold(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

function matchesNumFilter(
  actual: number | null,
  filter: NumCompareFilter,
): boolean {
  const threshold = parseThreshold(filter.value);
  if (threshold == null) return true;
  if (actual == null) return false;
  return filter.mode === "gte" ? actual >= threshold : actual <= threshold;
}

function matchesMoveFilters(move: Move, filters: MoveFiltersState): boolean {
  if (filters.typeId != null && move.type_id !== filters.typeId) {
    return false;
  }
  if (
    filters.damageClasses.length > 0 &&
    !filters.damageClasses.includes(move.damage_class)
  ) {
    return false;
  }
  if (!matchesNumFilter(move.power, filters.power)) return false;
  if (!matchesNumFilter(move.accuracy, filters.accuracy)) return false;
  if (!matchesNumFilter(move.priority, filters.priority)) return false;
  if (!matchesNumFilter(move.pp, filters.pp)) return false;
  return true;
}

function formatMoveStat(value: number | null, empty = "—") {
  return value == null ? empty : String(value);
}

function NumFilterField({
  label,
  filter,
  onChange,
}: {
  label: string;
  filter: NumCompareFilter;
  onChange: (patch: Partial<NumCompareFilter>) => void;
}) {
  return (
    <View style={styles.numFilterField}>
      <Text style={styles.numFilterLabel}>{label}</Text>
      <View style={styles.numModeRow}>
        <Pressable
          onPress={() => onChange({ mode: "gte" })}
          style={[
            styles.numModeChip,
            filter.mode === "gte" && styles.numModeChipSelected,
          ]}
        >
          <Text
            style={[
              styles.numModeChipText,
              filter.mode === "gte" && styles.numModeChipTextSelected,
            ]}
          >
            以上
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onChange({ mode: "lte" })}
          style={[
            styles.numModeChip,
            filter.mode === "lte" && styles.numModeChipSelected,
          ]}
        >
          <Text
            style={[
              styles.numModeChipText,
              filter.mode === "lte" && styles.numModeChipTextSelected,
            ]}
          >
            以下
          </Text>
        </Pressable>
      </View>
      <TextInput
        value={filter.value}
        onChangeText={(value) =>
          onChange({ value: value.replace(/[^\d-]/g, "") })
        }
        keyboardType="numbers-and-punctuation"
        placeholder="—"
        placeholderTextColor="#9a9286"
        style={styles.numFilterInput}
      />
    </View>
  );
}

function MoveDetailCard({
  move,
  selected,
  onPress,
}: {
  move: Move;
  selected: boolean;
  onPress: () => void;
}) {
  const typeJa = typeNameJa(move.type_id);
  return (
    <Pressable
      onPress={onPress}
      style={[styles.moveCard, selected && styles.moveCardSelected]}
    >
      <View style={styles.moveCardTop}>
        <Text style={[styles.moveCardName, selected && styles.moveCardNameSelected]}>
          {move.name_ja}
        </Text>
        <View
          style={[
            styles.typeBadge,
            { backgroundColor: TYPE_COLORS[typeJa] ?? "#888" },
          ]}
        >
          <Text style={styles.typeBadgeText}>{typeJa}</Text>
        </View>
        <View style={styles.classBadge}>
          <Text style={styles.classBadgeText}>
            {DAMAGE_CLASS_JA[move.damage_class]}
          </Text>
        </View>
      </View>
      <Text style={[styles.moveMeta, selected && styles.moveMetaSelected]}>
        優先度 {move.priority} ／ 威力 {formatMoveStat(move.power)} ／ 命中{" "}
        {formatMoveStat(move.accuracy)} ／ PP {formatMoveStat(move.pp)}
      </Text>
      {move.description ? (
        <Text style={[styles.moveDesc, selected && styles.moveMetaSelected]}>
          {move.description}
        </Text>
      ) : null}
    </Pressable>
  );
}

function MoveFiltersPanel({
  moves,
  filters,
  onChange,
  onClear,
}: {
  moves: Move[];
  filters: MoveFiltersState;
  onChange: (next: MoveFiltersState) => void;
  onClear: () => void;
}) {
  const typeOptions = useMemo(() => {
    const ids = [...new Set(moves.map((move) => move.type_id))]
      .filter((id) => id !== TYPE_NONE)
      .sort((a, b) => a - b);
    return ids.map((id) => ({
      id,
      nameJa: TYPE_BY_ID[id]?.nameJa ?? `タイプ${id}`,
    }));
  }, [moves]);

  const hasFilters =
    filters.typeId != null ||
    filters.damageClasses.length > 0 ||
    parseThreshold(filters.power.value) != null ||
    parseThreshold(filters.accuracy.value) != null ||
    parseThreshold(filters.priority.value) != null ||
    parseThreshold(filters.pp.value) != null;

  const filteredCount = moves.filter((move) =>
    matchesMoveFilters(move, filters),
  ).length;

  return (
    <View style={styles.moveFilterBox}>
      <View style={styles.moveFilterHeader}>
        <Text style={styles.moveFilterTitle}>技の絞り込み</Text>
        {hasFilters ? (
          <Pressable onPress={onClear}>
            <Text style={styles.moveFilterClear}>クリア</Text>
          </Pressable>
        ) : null}
      </View>

      <Text style={styles.moveFilterLabel}>タイプ</Text>
      <View style={styles.rowWrap}>
        {typeOptions.map((type) => {
          const selected = filters.typeId === type.id;
          return (
            <Pressable
              key={type.id}
              onPress={() =>
                onChange({
                  ...filters,
                  typeId: selected ? null : type.id,
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
              ]}
            >
              <Text
                style={[
                  styles.typeChipText,
                  selected && styles.typeChipTextSelected,
                ]}
              >
                {type.nameJa}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.moveFilterLabel}>種別</Text>
      <View style={styles.rowWrap}>
        {DAMAGE_CLASS_OPTIONS.map((damageClass) => {
          const selected = filters.damageClasses.includes(damageClass);
          return (
            <Pressable
              key={damageClass}
              onPress={() =>
                onChange({
                  ...filters,
                  damageClasses: selected
                    ? filters.damageClasses.filter((v) => v !== damageClass)
                    : [...filters.damageClasses, damageClass],
                })
              }
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                {DAMAGE_CLASS_JA[damageClass]}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.moveFilterLabel}>数値条件</Text>
      <View style={styles.numFilterRow}>
        <NumFilterField
          label="威力"
          filter={filters.power}
          onChange={(patch) =>
            onChange({ ...filters, power: { ...filters.power, ...patch } })
          }
        />
        <NumFilterField
          label="命中"
          filter={filters.accuracy}
          onChange={(patch) =>
            onChange({
              ...filters,
              accuracy: { ...filters.accuracy, ...patch },
            })
          }
        />
        <NumFilterField
          label="優先度"
          filter={filters.priority}
          onChange={(patch) =>
            onChange({
              ...filters,
              priority: { ...filters.priority, ...patch },
            })
          }
        />
        <NumFilterField
          label="PP"
          filter={filters.pp}
          onChange={(patch) =>
            onChange({ ...filters, pp: { ...filters.pp, ...patch } })
          }
        />
      </View>

      <Text style={styles.moveFilterResult}>
        {filteredCount}/{moves.length}件
        {hasFilters ? "（絞り込み中）" : ""}
      </Text>
    </View>
  );
}

function MoveComboBox({
  label,
  value,
  selectedMove,
  options,
  disabled,
  onChange,
}: {
  label: string;
  value: string | null;
  selectedMove: Move | null;
  options: Move[];
  disabled?: boolean;
  onChange: (moveId: string | null) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const typeColor = selectedMove
    ? (TYPE_COLORS[typeNameJa(selectedMove.type_id)] ?? "#1f6b4a")
    : null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (move) =>
        move.name_ja.toLowerCase().includes(q) ||
        move.name_en.toLowerCase().includes(q),
    );
  }, [options, query]);

  const closeMenu = () => {
    setMenuOpen(false);
    setQuery("");
  };

  return (
    <View style={styles.moveComboWrap}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}を選択`}
        disabled={disabled}
        onPress={() => setMenuOpen(true)}
        style={[
          styles.moveComboSelect,
          typeColor ? { borderColor: typeColor } : null,
          selectedMove && styles.moveComboSelectFilled,
          disabled && styles.moveComboSelectDisabled,
        ]}
      >
        <Text
          style={[
            styles.moveComboSelectText,
            selectedMove && typeColor ? { color: typeColor } : null,
            !selectedMove && styles.moveComboPlaceholder,
          ]}
          numberOfLines={1}
        >
          {selectedMove?.name_ja ?? "技を選択"}
        </Text>
        <Text style={styles.moveComboCaret}>▾</Text>
      </Pressable>

      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <View style={styles.moveComboBackdrop}>
          <Pressable style={styles.moveComboDismiss} onPress={closeMenu} />
          <View style={styles.moveComboSheet}>
            <Text style={styles.moveComboTitle}>{label}</Text>
            <TextInput
              style={styles.moveComboSearch}
              value={query}
              onChangeText={setQuery}
              placeholder="技名で絞り込み"
              placeholderTextColor="#9a9286"
              autoCorrect={false}
              autoCapitalize="none"
            />
            <ScrollView style={styles.moveComboList} keyboardShouldPersistTaps="handled">
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  onChange(null);
                  closeMenu();
                }}
                style={[
                  styles.moveComboItem,
                  value == null && styles.moveComboItemSelected,
                ]}
              >
                <Text
                  style={[
                    styles.moveComboItemText,
                    value == null && styles.moveComboItemTextSelected,
                  ]}
                >
                  なし
                </Text>
              </Pressable>
              {filtered.length === 0 ? (
                <Text style={styles.moveEmpty}>該当する技がありません。</Text>
              ) : (
                filtered.map((move) => {
                  const isSelected = move.id === value;
                  const moveTypeJa = typeNameJa(move.type_id);
                  const moveTypeColor = TYPE_COLORS[moveTypeJa] ?? "#888";
                  return (
                    <Pressable
                      key={move.id}
                      accessibilityRole="button"
                      onPress={() => {
                        onChange(move.id);
                        closeMenu();
                      }}
                      style={[
                        styles.moveComboItem,
                        isSelected && styles.moveComboItemSelected,
                      ]}
                    >
                      <View
                        style={[
                          styles.moveComboSwatch,
                          { backgroundColor: moveTypeColor },
                        ]}
                      />
                      <View style={styles.moveComboItemBody}>
                        <Text
                          style={[
                            styles.moveComboItemText,
                            isSelected && styles.moveComboItemTextSelected,
                          ]}
                        >
                          {move.name_ja}
                        </Text>
                        <Text style={styles.moveComboItemMeta}>
                          {moveTypeJa} ／ {DAMAGE_CLASS_JA[move.damage_class]} ／
                          威力 {formatMoveStat(move.power)}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export function SetPokemonDialog({
  visible,
  member,
  species,
  levelCapMode,
  moveGenerationOptions,
  onClose,
  onSave,
}: Props) {
  const [draft, setDraft] = useState<PartyMemberBuild>(member);
  const [moves, setMoves] = useState<Move[]>([]);
  const [loadingMoves, setLoadingMoves] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pickingSlot, setPickingSlot] = useState<number | null>(null);
  const [moveFilters, setMoveFilters] =
    useState<MoveFiltersState>(EMPTY_MOVE_FILTERS);

  const maxLevel = maxLevelForCap(levelCapMode);
  const genderLocked = species.gender !== GENDER.BOTH;
  const computedStats = useMemo(
    () => calcGen1Stats(species, draft),
    [species, draft],
  );

  useEffect(() => {
    if (!visible) return;
    setDraft(member);
    setErrorMessage(null);
    setPickingSlot(null);
    setMoveFilters(EMPTY_MOVE_FILTERS);
  }, [visible, member]);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    (async () => {
      try {
        setLoadingMoves(true);
        setErrorMessage(null);
        const rows = await fetchMovesForPokemon(
          member.speciesId,
          moveGenerationOptions,
        );
        if (!cancelled) setMoves(rows);
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(
            error instanceof Error ? error.message : "技の取得に失敗しました。",
          );
        }
      } finally {
        if (!cancelled) setLoadingMoves(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [visible, member.speciesId, moveGenerationOptions]);

  const filteredMoves = useMemo(
    () => moves.filter((move) => matchesMoveFilters(move, moveFilters)),
    [moves, moveFilters],
  );

  const movesForSlot = (slotIndex: number) =>
    moves.filter(
      (move) =>
        !draft.moveIds.some((id, i) => i !== slotIndex && id === move.id),
    );

  const openPicker = (index: number) => {
    setPickingSlot((current) => {
      if (current === index) {
        setMoveFilters(EMPTY_MOVE_FILTERS);
        return null;
      }
      setMoveFilters(EMPTY_MOVE_FILTERS);
      return index;
    });
  };
  const genderOptions = useMemo(() => {
    if (species.gender === GENDER.NONE) return ["none"] as BattleGender[];
    if (species.gender === GENDER.MALE_ONLY) return ["male"] as BattleGender[];
    if (species.gender === GENDER.FEMALE_ONLY) return ["female"] as BattleGender[];
    return ["male", "female"] as BattleGender[];
  }, [species.gender]);

  const setIv = (key: keyof Gen1StatBlock, value: number) => {
    setDraft((current) => ({
      ...current,
      iv: {
        ...current.iv,
        [key]: clamp(value, 0, GEN1_DV_MAX),
      },
    }));
  };

  const patchIv = (key: keyof Gen1StatBlock, raw: string) => {
    setDraft((current) => ({
      ...current,
      iv: {
        ...current.iv,
        [key]: clamp(parseIntOr(raw, current.iv[key]), 0, GEN1_DV_MAX),
      },
    }));
  };

  const setStatExp = (key: keyof Gen1StatBlock, value: number) => {
    setDraft((current) => ({
      ...current,
      statExp: {
        ...current.statExp,
        [key]: clamp(value, 0, GEN1_STAT_EXP_MAX),
      },
    }));
  };

  const patchStatExp = (key: keyof Gen1StatBlock, raw: string) => {
    setDraft((current) => ({
      ...current,
      statExp: {
        ...current.statExp,
        [key]: clamp(parseIntOr(raw, current.statExp[key]), 0, GEN1_STAT_EXP_MAX),
      },
    }));
  };

  const nudgeStatExpForLevel50 = (
    key: keyof Gen1StatBlock,
    delta: 1 | -1,
  ) => {
    const next = findStatExpForLevel50Delta(
      species,
      key,
      draft.iv[key],
      draft.statExp[key],
      delta,
    );
    if (next == null) return;
    setStatExp(key, next);
  };

  const setMoveAt = (index: number, moveId: string | null) => {
    setDraft((current) => {
      if (
        moveId &&
        current.moveIds.some((id, i) => i !== index && id === moveId)
      ) {
        return current;
      }
      const next = [...current.moveIds] as PartyMemberBuild["moveIds"];
      next[index] = moveId;
      return { ...current, moveIds: next };
    });
  };

  const handleSave = () => {
    onSave({
      ...draft,
      level: clamp(draft.level, 1, maxLevel),
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>{member.nameJa} の設定</Text>
          <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
            <Text style={styles.section}>レベル（1〜{maxLevel}）</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={String(draft.level)}
              onChangeText={(text) =>
                setDraft((current) => ({
                  ...current,
                  level: clamp(parseIntOr(text, current.level), 1, maxLevel),
                }))
              }
            />

            <Text style={styles.section}>性別</Text>
            <View style={styles.rowWrap}>
              {genderOptions.map((option) => {
                const selected = draft.gender === option;
                const label =
                  option === "none" ? "なし" : option === "male" ? "オス" : "メス";
                return (
                  <Pressable
                    key={option}
                    disabled={genderLocked && species.gender !== GENDER.BOTH}
                    onPress={() => setDraft((c) => ({ ...c, gender: option }))}
                    style={[styles.chip, selected && styles.chipSelected]}
                  >
                    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.section}>個体値（0〜15）</Text>
            {GEN1_STAT_KEYS.map((key) => {
              const value = draft.iv[key];
              return (
                <View key={`iv-${key}`} style={styles.statBlock}>
                  <View style={styles.statRow}>
                    <Text style={styles.statLabel}>{GEN1_STAT_LABELS[key]}</Text>
                    <TextInput
                      style={styles.statInput}
                      keyboardType="number-pad"
                      value={String(value)}
                      onChangeText={(text) => patchIv(key, text)}
                    />
                  </View>
                  <View style={styles.statBtnRow}>
                    <StatAdjustButton
                      label="0"
                      disabled={value === 0}
                      onPress={() => setIv(key, 0)}
                    />
                    <StatAdjustButton
                      label="最大"
                      disabled={value === GEN1_DV_MAX}
                      onPress={() => setIv(key, GEN1_DV_MAX)}
                    />
                    <StatAdjustButton
                      label="−1"
                      disabled={value <= 0}
                      onPress={() => setIv(key, value - 1)}
                    />
                    <StatAdjustButton
                      label="+1"
                      disabled={value >= GEN1_DV_MAX}
                      onPress={() => setIv(key, value + 1)}
                    />
                  </View>
                </View>
              );
            })}

            <Text style={styles.section}>努力値 / 基礎ポイント（0〜65535）</Text>
            <Text style={styles.sectionHint}>
              Lv50 ±1 は、レベル50での実数値が1変わる基礎ポイントに合わせます。
            </Text>
            {GEN1_STAT_KEYS.map((key) => {
              const value = draft.statExp[key];
              const downExp = findStatExpForLevel50Delta(
                species,
                key,
                draft.iv[key],
                value,
                -1,
              );
              const upExp = findStatExpForLevel50Delta(
                species,
                key,
                draft.iv[key],
                value,
                1,
              );
              return (
                <View key={`ev-${key}`} style={styles.statBlock}>
                  <View style={styles.statRow}>
                    <Text style={styles.statLabel}>{GEN1_STAT_LABELS[key]}</Text>
                    <TextInput
                      style={styles.statInput}
                      keyboardType="number-pad"
                      value={String(value)}
                      onChangeText={(text) => patchStatExp(key, text)}
                    />
                  </View>
                  <View style={styles.statBtnRow}>
                    <StatAdjustButton
                      label="0"
                      disabled={value === 0}
                      onPress={() => setStatExp(key, 0)}
                    />
                    <StatAdjustButton
                      label="最大"
                      disabled={value === GEN1_STAT_EXP_MAX}
                      onPress={() => setStatExp(key, GEN1_STAT_EXP_MAX)}
                    />
                    <StatAdjustButton
                      label="Lv50 −1"
                      disabled={downExp == null}
                      onPress={() => nudgeStatExpForLevel50(key, -1)}
                    />
                    <StatAdjustButton
                      label="Lv50 +1"
                      disabled={upExp == null}
                      onPress={() => nudgeStatExpForLevel50(key, 1)}
                    />
                  </View>
                </View>
              );
            })}

            <Text style={styles.section}>実数値（レベル・個体値・努力値から計算）</Text>
            {GEN1_STAT_KEYS.map((key) => (
              <View key={`real-${key}`} style={styles.statRow}>
                <Text style={styles.statLabel}>{GEN1_STAT_LABELS[key]}</Text>
                <Text style={styles.statValue}>{computedStats[key]}</Text>
              </View>
            ))}

            <Text style={styles.section}>技（最大4つ・詳細を見ながら選択）</Text>
            {loadingMoves ? <ActivityIndicator color="#1f6b4a" /> : null}
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            {draft.moveIds.map((moveId, index) => {
              const selectedMove = moves.find((m) => m.id === moveId) ?? null;
              const picking = pickingSlot === index;
              const slotOptions = movesForSlot(index);
              return (
                <View key={`move-${index}`} style={styles.moveBlock}>
                  <Text style={styles.moveLabel}>技{index + 1}</Text>
                  <MoveComboBox
                    label={`技${index + 1}`}
                    value={moveId}
                    selectedMove={selectedMove}
                    options={slotOptions}
                    disabled={loadingMoves || !!errorMessage}
                    onChange={(nextId) => {
                      setMoveAt(index, nextId);
                      setPickingSlot(null);
                      setMoveFilters(EMPTY_MOVE_FILTERS);
                    }}
                  />
                  {selectedMove ? (
                    <MoveDetailCard
                      move={selectedMove}
                      selected
                      onPress={() => openPicker(index)}
                    />
                  ) : (
                    <Text style={styles.moveEmpty}>未選択</Text>
                  )}
                  <View style={styles.rowWrap}>
                    <Pressable
                      onPress={() => openPicker(index)}
                      style={[styles.chip, picking && styles.chipSelected]}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          picking && styles.chipTextSelected,
                        ]}
                      >
                        {picking ? "候補を閉じる" : "候補から選ぶ"}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setMoveAt(index, null);
                        setPickingSlot(null);
                        setMoveFilters(EMPTY_MOVE_FILTERS);
                      }}
                      style={styles.chip}
                    >
                      <Text style={styles.chipText}>なしにする</Text>
                    </Pressable>
                  </View>
                  {picking ? (
                    <View style={styles.moveList}>
                      <MoveFiltersPanel
                        moves={moves}
                        filters={moveFilters}
                        onChange={setMoveFilters}
                        onClear={() => setMoveFilters(EMPTY_MOVE_FILTERS)}
                      />
                      {filteredMoves.length === 0 ? (
                        <Text style={styles.moveEmpty}>
                          条件に合う技がありません。
                        </Text>
                      ) : (
                        filteredMoves.map((move) => {
                          const usedElsewhere = draft.moveIds.some(
                            (id, i) => i !== index && id === move.id,
                          );
                          if (usedElsewhere) return null;
                          return (
                            <MoveDetailCard
                              key={`${index}-${move.id}`}
                              move={move}
                              selected={moveId === move.id}
                              onPress={() => {
                                setMoveAt(index, move.id);
                                setPickingSlot(null);
                                setMoveFilters(EMPTY_MOVE_FILTERS);
                              }}
                            />
                          );
                        })
                      )}
                    </View>
                  ) : null}
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.footer}>
            <Pressable onPress={onClose} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>キャンセル</Text>
            </Pressable>
            <Pressable onPress={handleSave} style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>決定</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(20,28,16,0.45)",
    justifyContent: "center",
    padding: 16,
  },
  sheet: {
    maxHeight: "92%",
    backgroundColor: "#fffdf8",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1d1a16",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  body: { flexGrow: 0 },
  bodyContent: { paddingHorizontal: 16, paddingBottom: 16, gap: 8 },
  section: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "800",
    color: "#5c564c",
  },
  sectionHint: {
    fontSize: 11,
    fontWeight: "600",
    color: "#8a8276",
    marginTop: -2,
  },
  statBlock: {
    gap: 6,
    marginBottom: 4,
  },
  statBtnRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    paddingLeft: 80,
  },
  statBtn: {
    borderWidth: 1,
    borderColor: "#cfe3d6",
    borderRadius: 8,
    backgroundColor: "#f3f6ea",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  statBtnDisabled: {
    opacity: 0.35,
  },
  statBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#1f6b4a",
  },
  statBtnTextDisabled: {
    color: "#5c564c",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  rowWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: "#cfe3d6",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#f3f6ea",
    marginRight: 6,
  },
  chipSelected: {
    backgroundColor: "#1f6b4a",
    borderColor: "#1f6b4a",
  },
  chipText: { fontSize: 12, fontWeight: "700", color: "#1d1a16" },
  chipTextSelected: { color: "#fff" },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statLabel: { width: 72, fontSize: 12, fontWeight: "700", color: "#5c564c" },
  statInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  statValue: {
    flex: 1,
    fontSize: 15,
    fontWeight: "800",
    color: "#1d1a16",
    paddingVertical: 6,
  },
  moveBlock: { gap: 8, marginBottom: 12 },
  moveLabel: { fontSize: 12, fontWeight: "700", color: "#5c564c" },
  moveEmpty: { fontSize: 12, color: "#8a8276" },
  moveList: { gap: 8 },
  moveComboWrap: { gap: 4 },
  moveComboSelect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    borderWidth: 1,
    borderColor: "#cfc6b6",
    borderRadius: 10,
    backgroundColor: "#fffdf8",
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 42,
  },
  moveComboSelectFilled: {
    backgroundColor: "#eef7f1",
  },
  moveComboSelectDisabled: {
    opacity: 0.45,
    backgroundColor: "#f0ebe3",
  },
  moveComboSelectText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
    color: "#1d1a16",
  },
  moveComboPlaceholder: {
    color: "#9a9286",
    fontWeight: "600",
  },
  moveComboCaret: {
    fontSize: 12,
    color: "#5c564c",
  },
  moveComboBackdrop: {
    flex: 1,
    backgroundColor: "rgba(20,28,16,0.45)",
    justifyContent: "center",
    padding: 24,
  },
  moveComboDismiss: {
    ...StyleSheet.absoluteFill,
  },
  moveComboSheet: {
    maxHeight: "70%",
    backgroundColor: "#fffdf8",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    paddingTop: 14,
    overflow: "hidden",
  },
  moveComboTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1d1a16",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  moveComboSearch: {
    marginHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#1d1a16",
  },
  moveComboList: {
    maxHeight: 360,
  },
  moveComboItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ebe4d8",
  },
  moveComboItemSelected: {
    backgroundColor: "#eef7f1",
  },
  moveComboItemBody: {
    flex: 1,
    gap: 2,
  },
  moveComboItemText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1d1a16",
  },
  moveComboItemTextSelected: {
    color: "#1f6b4a",
    fontWeight: "800",
  },
  moveComboItemMeta: {
    fontSize: 11,
    fontWeight: "600",
    color: "#5c564c",
  },
  moveComboSwatch: {
    width: 14,
    height: 14,
    borderRadius: 4,
  },
  moveFilterBox: {
    backgroundColor: "#f7f3ea",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5dccb",
    padding: 10,
    gap: 8,
  },
  moveFilterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  moveFilterTitle: { fontSize: 12, fontWeight: "800", color: "#1d1a16" },
  moveFilterClear: { fontSize: 12, fontWeight: "800", color: "#1f6b4a" },
  moveFilterLabel: { fontSize: 11, fontWeight: "800", color: "#5c564c" },
  moveFilterResult: { fontSize: 11, fontWeight: "700", color: "#5c564c" },
  typeChip: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  typeChipText: { fontSize: 11, fontWeight: "800", color: "#5c564c" },
  typeChipTextSelected: { color: "#ffffff" },
  numFilterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  numFilterField: {
    width: "22%",
    minWidth: 72,
    flexGrow: 1,
    gap: 4,
  },
  numFilterLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#8a8276",
  },
  numModeRow: { flexDirection: "row", gap: 4 },
  numModeChip: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#cfc6b6",
    borderRadius: 6,
    paddingVertical: 3,
    alignItems: "center",
    backgroundColor: "#fffdf8",
  },
  numModeChipSelected: {
    borderColor: "#1f6b4a",
    backgroundColor: "#eef7f1",
  },
  numModeChipText: { fontSize: 10, fontWeight: "700", color: "#8a8276" },
  numModeChipTextSelected: { color: "#1f6b4a" },
  numFilterInput: {
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
  moveCard: {
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    gap: 4,
  },
  moveCardSelected: {
    borderColor: "#1f6b4a",
    backgroundColor: "#eef7f1",
  },
  moveCardTop: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
  },
  moveCardName: { fontSize: 14, fontWeight: "800", color: "#1d1a16" },
  moveCardNameSelected: { color: "#145239" },
  typeBadge: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  typeBadgeText: { color: "#fff", fontSize: 10, fontWeight: "800" },
  classBadge: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "#e8e0d4",
  },
  classBadgeText: { fontSize: 10, fontWeight: "800", color: "#5c564c" },
  moveMeta: { fontSize: 11, color: "#5c564c" },
  moveMetaSelected: { color: "#2f4f3f" },
  moveDesc: { fontSize: 11, lineHeight: 15, color: "#6b6358" },
  error: { color: "#a33", fontSize: 12 },
  footer: {
    flexDirection: "row",
    gap: 10,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee4d6",
  },
  secondaryBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#1f6b4a",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryBtnText: { color: "#1f6b4a", fontWeight: "800" },
  primaryBtn: {
    flex: 1,
    backgroundColor: "#1f6b4a",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "800" },
});
