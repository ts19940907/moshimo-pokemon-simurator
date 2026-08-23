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
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import type {
  Generation,
  RestrictionMode,
  LevelCapMode,
  OpponentType,
} from "../match-setup/types";
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
  typeFilterOptions,
} from "../pokemon/catalog";
import type { Move } from "../pokemon/moves";
import {
  fetchMovesByIds,
  fetchPokemonIdsForMoves,
  searchMoves,
} from "../pokemon/moveRepository";
import { fetchPokemonSpecies } from "../pokemon/repository";
import {
  TYPE_NONE,
  type PokemonSpecies,
  type TypeId,
} from "../pokemon/types";
import { PokemonSprite } from "../pokemon/PokemonSprite";
import { MoveTypeBadge } from "../pokemon/TypeBadges";
import { SetPokemonDialog } from "./set/SetPokemonDialog";
import { Gen1TypeChartDialog } from "../battle/Gen1TypeChartDialog";
import { generateCpuParty } from "../battle/cpuTeam";
import { SimulatorScreen } from "./SimulatorScreen";
import { matchBackgroundForRules } from "../match-setup/backgrounds";
import { MatchScreenBackground } from "../match-setup/MatchScreenBackground";
import { parseRulesGeneration } from "../match-setup/params";

type StatKey = "hp" | "attack" | "defense" | "special" | "speed";
type SortKey = "dex" | StatKey;
type SortOrder = "asc" | "desc";
type StatCompareMode = "gte" | "lte";
type StatFilterEntry = { value: string; mode: StatCompareMode };
type StatFiltersState = Record<StatKey, StatFilterEntry>;
/** When 2 types are selected: ignore order vs type1/type2 order. */
type DualTypeOrderMode = "any" | "exact";

const MAX_MOVE_FILTERS = 4;

function formatMoveStat(value: number | null, empty = "—") {
  return value == null ? empty : String(value);
}

const STAT_FILTERS: { key: StatKey; label: string }[] = [
  { key: "hp", label: "HP" },
  { key: "attack", label: "こうげき" },
  { key: "defense", label: "ぼうぎょ" },
  { key: "special", label: "とくしゅ" },
  { key: "speed", label: "すばやさ" },
];

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "dex", label: "図鑑" },
  { key: "hp", label: "HP" },
  { key: "attack", label: "攻撃" },
  { key: "defense", label: "防御" },
  { key: "special", label: "特殊" },
  { key: "speed", label: "素早さ" },
];

const EMPTY_STAT_FILTERS: StatFiltersState = {
  hp: { value: "", mode: "gte" },
  attack: { value: "", mode: "gte" },
  defense: { value: "", mode: "gte" },
  special: { value: "", mode: "gte" },
  speed: { value: "", mode: "gte" },
};

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

function setTypeFilterAt(
  current: TypeId[],
  slot: 0 | 1,
  typeId: TypeId | null,
): TypeId[] {
  if (slot === 0) {
    if (typeId == null) return [];
    const second = current[1];
    if (second != null && second !== typeId) {
      return [typeId, second];
    }
    return [typeId];
  }

  const first = current[0];
  if (first == null) return [];
  if (typeId == null) return [first];
  if (typeId === first) return [first];
  return [first, typeId];
}

function compareSpeciesBySort(
  a: PokemonSpecies,
  b: PokemonSpecies,
  sortKey: SortKey,
  sortOrder: SortOrder,
): number {
  const direction = sortOrder === "asc" ? 1 : -1;
  let diff = 0;

  if (sortKey === "dex") {
    diff = a.dex_no - b.dex_no || a.region_type - b.region_type;
  } else {
    const statsA = getDisplayBaseStats(a);
    const statsB = getDisplayBaseStats(b);
    diff = statsA[sortKey] - statsB[sortKey];
    if (diff === 0) {
      diff = a.dex_no - b.dex_no || a.region_type - b.region_type;
    }
  }

  return diff * direction;
}

function createBuildWithMoveFilters(
  species: PokemonSpecies,
  levelCapMode: LevelCapMode,
  moveFilters: Move[],
): PartyMemberBuild {
  const build = createDefaultBuild(species, levelCapMode);
  if (moveFilters.length === 0) {
    return build;
  }

  const moveIds: PartyMemberBuild["moveIds"] = [null, null, null, null];
  moveFilters.slice(0, MAX_MOVE_FILTERS).forEach((move, index) => {
    moveIds[index] = move.id;
  });
  return { ...build, moveIds };
}

/** Merge filter moves into an existing build. Returns overflow moves that need a slot. */
function mergeMoveFiltersIntoBuild(
  build: PartyMemberBuild,
  moveFilters: Move[],
): { build: PartyMemberBuild; overflow: Move[] } {
  if (moveFilters.length === 0) {
    return { build, overflow: [] };
  }

  const moveIds = [...build.moveIds] as PartyMemberBuild["moveIds"];
  const overflow: Move[] = [];

  for (const move of moveFilters) {
    if (moveIds.includes(move.id)) continue;
    const emptyIndex = moveIds.findIndex((id) => id == null);
    if (emptyIndex >= 0) {
      moveIds[emptyIndex] = move.id;
    } else {
      overflow.push(move);
    }
  }

  return { build: { ...build, moveIds }, overflow };
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

function TypeFilterComboBox({
  label,
  value,
  options,
  disabled,
  onChange,
}: {
  label: string;
  value: TypeId | null;
  options: { id: TypeId; nameJa: string }[];
  disabled?: boolean;
  onChange: (typeId: TypeId | null) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const selected = value != null ? options.find((row) => row.id === value) : null;
  const color = selected ? (TYPE_COLORS[selected.nameJa] ?? "#1f6b4a") : null;

  return (
    <View style={styles.typeComboWrap}>
      <Text style={styles.typeComboLabel}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}を選択`}
        disabled={disabled}
        onPress={() => setMenuOpen(true)}
        style={({ pressed }) => [
          styles.typeComboSelect,
          color ? { borderColor: color } : null,
          selected && styles.typeComboSelectFilled,
          disabled && styles.typeComboSelectDisabled,
          pressed && !disabled && styles.pressed,
        ]}
      >
        <Text
          style={[
            styles.typeComboSelectText,
            selected && color ? { color } : null,
            !selected && styles.typeComboPlaceholder,
          ]}
          numberOfLines={1}
        >
          {selected?.nameJa ?? "指定なし"}
        </Text>
        <Text style={styles.typeComboCaret}>▾</Text>
      </Pressable>

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
            <Text style={styles.pageMenuTitle}>{label}</Text>
            <ScrollView style={styles.pageMenuList}>
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  onChange(null);
                  setMenuOpen(false);
                }}
                style={[
                  styles.pageMenuItem,
                  value == null && styles.pageMenuItemSelected,
                ]}
              >
                <Text
                  style={[
                    styles.pageMenuItemText,
                    value == null && styles.pageMenuItemTextSelected,
                  ]}
                >
                  指定なし
                </Text>
              </Pressable>
              {options.map((type) => {
                const isSelected = type.id === value;
                const typeColor = TYPE_COLORS[type.nameJa] ?? "#888";
                return (
                  <Pressable
                    key={type.id}
                    accessibilityRole="button"
                    onPress={() => {
                      onChange(type.id);
                      setMenuOpen(false);
                    }}
                    style={[
                      styles.pageMenuItem,
                      styles.typeComboMenuItem,
                      isSelected && styles.pageMenuItemSelected,
                    ]}
                  >
                    <View
                      style={[
                        styles.typeComboSwatch,
                        { backgroundColor: typeColor },
                      ]}
                    />
                    <Text
                      style={[
                        styles.pageMenuItemText,
                        isSelected && styles.pageMenuItemTextSelected,
                      ]}
                    >
                      {type.nameJa}
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
  typeFilters,
  onSetTypeFilter,
  typeOptions,
  singleTypeOnly,
  onSingleTypeOnlyChange,
  dualOrderMode,
  onDualOrderModeChange,
  finalEvolutionOnly,
  onFinalEvolutionOnlyChange,
  statFilters,
  onStatFilterChange,
  moveFilters,
  moveQuery,
  onMoveQueryChange,
  moveSuggestions,
  moveSearchLoading,
  onPickMoveSuggestion,
  onRemoveMoveFilter,
  moveFilterLoading,
  resultCount,
  onClear,
}: {
  typeFilters: TypeId[];
  onSetTypeFilter: (slot: 0 | 1, typeId: TypeId | null) => void;
  typeOptions: { id: TypeId; nameJa: string }[];
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
  moveFilters: Move[];
  moveQuery: string;
  onMoveQueryChange: (value: string) => void;
  moveSuggestions: Move[];
  moveSearchLoading: boolean;
  onPickMoveSuggestion: (move: Move) => void;
  onRemoveMoveFilter: (moveId: string) => void;
  moveFilterLoading: boolean;
  resultCount: number;
  onClear: () => void;
}) {
  const hasFilters =
    typeFilters.length > 0 ||
    moveFilters.length > 0 ||
    singleTypeOnly ||
    !finalEvolutionOnly ||
    STAT_FILTERS.some(
      ({ key }) => parseStatThreshold(statFilters[key].value) != null,
    );

  const type1 = typeFilters[0] ?? null;
  const type2 = typeFilters[1] ?? null;
  const type1Options = typeOptions;
  const type2Options = typeOptions.filter((type) => type.id !== type1);

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

      <Text style={styles.filterLabel}>
        タイプ（最大2つ・タイプ1→タイプ2）
      </Text>
      <View style={styles.typeComboRow}>
        <TypeFilterComboBox
          label="タイプ1"
          value={type1}
          options={type1Options}
          onChange={(typeId) => onSetTypeFilter(0, typeId)}
        />
        <TypeFilterComboBox
          label="タイプ2"
          value={type2}
          options={type2Options}
          disabled={type1 == null}
          onChange={(typeId) => onSetTypeFilter(1, typeId)}
        />
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

      <Text style={styles.filterLabel}>
        覚える技（最大{MAX_MOVE_FILTERS}つ・すべて覚えるポケモンに絞り込み）
      </Text>
      <View style={styles.searchWrap}>
        <TextInput
          value={moveQuery}
          onChangeText={onMoveQueryChange}
          placeholder="技名で検索"
          placeholderTextColor="#9a9286"
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.searchInput}
        />
        {moveSearchLoading ? (
          <View style={styles.moveSearchLoading}>
            <ActivityIndicator size="small" color="#1f6b4a" />
          </View>
        ) : null}
        {moveSuggestions.length > 0 ? (
          <View style={styles.suggestList}>
            {moveSuggestions.map((move) => {
              const selected = moveFilters.some((entry) => entry.id === move.id);
              const blocked =
                !selected && moveFilters.length >= MAX_MOVE_FILTERS;
              return (
                <Pressable
                  key={move.id}
                  disabled={blocked || selected}
                  onPress={() => onPickMoveSuggestion(move)}
                  style={({ pressed }) => [
                    styles.suggestItem,
                    (pressed || blocked || selected) && styles.suggestItemPressed,
                    (blocked || selected) && styles.suggestItemDisabled,
                  ]}
                >
                  <Text style={styles.suggestName}>{move.name_ja}</Text>
                  {selected ? (
                    <Text style={styles.suggestMoveMeta}>選択済み</Text>
                  ) : blocked ? (
                    <Text style={styles.suggestMoveMeta}>上限</Text>
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </View>
      {moveFilters.length > 0 ? (
        <View style={styles.moveFilterChipRow}>
          {moveFilters.map((move) => (
            <Pressable
              key={move.id}
              onPress={() => onRemoveMoveFilter(move.id)}
              style={styles.moveFilterChip}
            >
              <Text style={styles.moveFilterChipText}>{move.name_ja}</Text>
              <Text style={styles.moveFilterChipRemove}>×</Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      <Text style={styles.filterResult}>
        {resultCount}体表示中
        {moveFilterLoading ? "（技絞り込み中…）" : ""}
        {!moveFilterLoading && hasFilters ? "（絞り込み適用中）" : ""}
      </Text>
    </View>
  );
}

function SpeciesSortBar({
  sortKey,
  sortOrder,
  onSortChange,
}: {
  sortKey: SortKey;
  sortOrder: SortOrder;
  onSortChange: (key: SortKey, order: SortOrder) => void;
}) {
  return (
    <View style={styles.sortBox}>
      <Text style={styles.filterLabel}>並び替え（タップで昇順・降順）</Text>
      <View style={styles.sortChipRow}>
        {SORT_OPTIONS.map(({ key, label }) => {
          const active = sortKey === key;
          const arrow = active ? (sortOrder === "asc" ? " ↑" : " ↓") : "";
          return (
            <Pressable
              key={key}
              onPress={() => {
                if (active) {
                  onSortChange(key, sortOrder === "asc" ? "desc" : "asc");
                } else {
                  onSortChange(key, "asc");
                }
              }}
              style={[
                styles.sortChip,
                active && styles.sortChipSelected,
              ]}
            >
              <Text
                style={[
                  styles.sortChipText,
                  active && styles.sortChipTextSelected,
                ]}
              >
                {label}
                {arrow}
              </Text>
            </Pressable>
          );
        })}
      </View>
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
  const typeOptions = useMemo(
    () => typeFilterOptions(rulesGeneration),
    [rulesGeneration],
  );
  const matchBackground = useMemo(
    () => matchBackgroundForRules(parseRulesGeneration(params)),
    [params.rulesGeneration],
  );
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
  const [movesById, setMovesById] = useState<Record<string, Move>>({});
  const [movesRequiredOpen, setMovesRequiredOpen] = useState(false);
  const [partyRequiredOpen, setPartyRequiredOpen] = useState(false);
  const [typeChartOpen, setTypeChartOpen] = useState(false);
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [leaveConfirmOpen, setLeaveConfirmOpen] = useState(false);
  const [partyReviewOpen, setPartyReviewOpen] = useState(false);
  const [cpuGenerating, setCpuGenerating] = useState(false);
  const [nameQuery, setNameQuery] = useState("");
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [typeFilters, setTypeFilters] = useState<TypeId[]>([]);
  const [singleTypeOnly, setSingleTypeOnly] = useState(false);
  const [dualOrderMode, setDualOrderMode] =
    useState<DualTypeOrderMode>("any");
  const [finalEvolutionOnly, setFinalEvolutionOnly] = useState(true);
  const [statFilters, setStatFilters] =
    useState<StatFiltersState>(EMPTY_STAT_FILTERS);
  const [sortKey, setSortKey] = useState<SortKey>("dex");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [moveFilters, setMoveFilters] = useState<Move[]>([]);
  const [moveQuery, setMoveQuery] = useState("");
  const [moveSuggestOpen, setMoveSuggestOpen] = useState(false);
  const [moveSuggestions, setMoveSuggestions] = useState<Move[]>([]);
  const [moveSearchLoading, setMoveSearchLoading] = useState(false);
  const [moveFilterPokemonIds, setMoveFilterPokemonIds] =
    useState<Set<string> | null>(null);
  const [moveFilterLoading, setMoveFilterLoading] = useState(false);
  const [moveReplacePrompt, setMoveReplacePrompt] = useState<{
    speciesId: string;
    nameJa: string;
    incoming: Move[];
  } | null>(null);

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
    setSortKey("dex");
    setSortOrder("asc");
    setSuggestOpen(false);
    setMoveFilters([]);
    setMoveQuery("");
    setMoveSuggestOpen(false);
    setMoveSuggestions([]);
    setMoveFilterPokemonIds(null);
    setMoveFilterLoading(false);
  }, [side, getSide]);

  useEffect(() => {
    const trimmed = moveQuery.trim();
    if (!moveSuggestOpen || trimmed.length < 1) {
      setMoveSuggestions([]);
      setMoveSearchLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setMoveSearchLoading(true);
      try {
        const moves = await searchMoves(trimmed, moveGenerationOptions);
        if (!cancelled) {
          setMoveSuggestions(moves);
        }
      } catch {
        if (!cancelled) {
          setMoveSuggestions([]);
        }
      } finally {
        if (!cancelled) {
          setMoveSearchLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [moveQuery, moveSuggestOpen, moveGenerationOptions]);

  useEffect(() => {
    if (moveFilters.length === 0) {
      setMoveFilterPokemonIds(null);
      setMoveFilterLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setMoveFilterLoading(true);
      try {
        const ids = await fetchPokemonIdsForMoves(
          moveFilters.map((move) => move.id),
        );
        if (!cancelled) {
          setMoveFilterPokemonIds(ids);
        }
      } catch {
        if (!cancelled) {
          setMoveFilterPokemonIds(new Set());
        }
      } finally {
        if (!cancelled) {
          setMoveFilterLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [moveFilters]);

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
      if (
        moveFilters.length > 0 &&
        moveFilterPokemonIds != null &&
        !moveFilterLoading &&
        !moveFilterPokemonIds.has(pokemon.id)
      ) {
        return false;
      }
      return true;
    });
  }, [
    species,
    typeFilters,
    singleTypeOnly,
    dualOrderMode,
    finalEvolutionOnly,
    statFilters,
    moveFilters,
    moveFilterPokemonIds,
    moveFilterLoading,
  ]);

  const sortedSpecies = useMemo(() => {
    return [...filteredSpecies].sort((a, b) =>
      compareSpeciesBySort(a, b, sortKey, sortOrder),
    );
  }, [filteredSpecies, sortKey, sortOrder]);

  const partyFull = selectedDexNos.length >= PARTY_SIZE;

  const suggestions = useMemo(() => {
    if (partyFull) return [] as PokemonSpecies[];
    const trimmed = nameQuery.trim();
    if (!suggestOpen || trimmed.length < 1) {
      return [];
    }
    return species
      .filter((pokemon) => matchesNameQuery(pokemon, trimmed))
      .slice(0, 8);
  }, [species, nameQuery, suggestOpen, partyFull]);

  const totalPages = Math.max(1, Math.ceil(sortedSpecies.length / PAGE_SIZE));
  const pageItems = sortedSpecies.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );

  useEffect(() => {
    setPage(0);
  }, [
    typeFilters,
    singleTypeOnly,
    dualOrderMode,
    finalEvolutionOnly,
    statFilters,
    moveFilters,
    sortKey,
    sortOrder,
  ]);

  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(0, totalPages - 1)));
  }, [totalPages]);

  const clearFilters = () => {
    setTypeFilters([]);
    setSingleTypeOnly(false);
    setDualOrderMode("any");
    setFinalEvolutionOnly(true);
    setStatFilters(EMPTY_STAT_FILTERS);
    setMoveFilters([]);
    setMoveQuery("");
    setMoveSuggestOpen(false);
    setMoveSuggestions([]);
    setMoveReplacePrompt(null);
  };

  const handleSetTypeFilter = (slot: 0 | 1, typeId: TypeId | null) => {
    setTypeFilters((current) => {
      const next = setTypeFilterAt(current, slot, typeId);
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
      const remaining = selectedDexNos.length - 1;
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
      if (remaining <= 0) setPartyReviewOpen(false);
      return;
    }

    if (selectedDexNos.length >= PARTY_SIZE) return;

    setSelectedDexNos((current) => [...current, dexNo]);
    setBuildsBySpeciesId((current) => {
      if (current[pokemon.id]) return current;
      return {
        ...current,
        [pokemon.id]: createBuildWithMoveFilters(
          pokemon,
          levelCapMode,
          moveFilters,
        ),
      };
    });
  };

  /** List tap: add if new; if already selected, apply move filters (never deselect). */
  const handleListPokemonPress = (pokemon: PokemonSpecies) => {
    const isSelected = selectedDexNos.includes(pokemon.dex_no);

    if (!isSelected) {
      if (partyFull) return;
      setSelectedDexNos((current) => [...current, pokemon.dex_no]);
      setBuildsBySpeciesId((current) => {
        if (current[pokemon.id]) return current;
        return {
          ...current,
          [pokemon.id]: createBuildWithMoveFilters(
            pokemon,
            levelCapMode,
            moveFilters,
          ),
        };
      });
      return;
    }

    if (moveFilters.length === 0) return;

    const existing =
      buildsBySpeciesId[pokemon.id] ??
      createDefaultBuild(pokemon, levelCapMode);
    const { build: merged, overflow } = mergeMoveFiltersIntoBuild(
      existing,
      moveFilters,
    );
    setBuildsBySpeciesId((current) => ({
      ...current,
      [pokemon.id]: merged,
    }));

    if (overflow.length > 0) {
      setMoveReplacePrompt({
        speciesId: pokemon.id,
        nameJa: pokemon.name_ja,
        incoming: overflow,
      });
    }
  };

  const resolveMoveReplace = (slotIndex: number) => {
    if (!moveReplacePrompt) return;
    const { speciesId, incoming } = moveReplacePrompt;
    const [nextMove, ...rest] = incoming;
    if (!nextMove) {
      setMoveReplacePrompt(null);
      return;
    }

    setBuildsBySpeciesId((current) => {
      const build = current[speciesId];
      if (!build) return current;
      const moveIds = [...build.moveIds] as PartyMemberBuild["moveIds"];
      moveIds[slotIndex] = nextMove.id;
      return { ...current, [speciesId]: { ...build, moveIds } };
    });

    if (rest.length > 0) {
      setMoveReplacePrompt({
        speciesId,
        nameJa: moveReplacePrompt.nameJa,
        incoming: rest,
      });
    } else {
      setMoveReplacePrompt(null);
    }
  };

  const addPokemonFromSuggest = (pokemon: PokemonSpecies) => {
    if (partyFull) return;
    if (!selectedDexNos.includes(pokemon.dex_no)) {
      setSelectedDexNos((current) => [...current, pokemon.dex_no]);
      setBuildsBySpeciesId((current) => {
        if (current[pokemon.id]) return current;
        return {
          ...current,
          [pokemon.id]: createBuildWithMoveFilters(
            pokemon,
            levelCapMode,
            moveFilters,
          ),
        };
      });
    }
    setNameQuery("");
    setSuggestOpen(false);
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
      setMovesById({});
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const moves = await fetchMovesByIds([...ids]);
        if (cancelled) return;
        const map: Record<string, Move> = {};
        for (const move of moves) map[move.id] = move;
        setMovesById(map);
      } catch {
        if (!cancelled) setMovesById({});
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

  const discardOpponentSelectionAndLeave = () => {
    setSideParty("b", null);
    setSelectedDexNos([]);
    setBuildsBySpeciesId({});
    setLeaveConfirmOpen(false);
    leaveBack();
  };

  const keepOpponentSelectionAndLeave = () => {
    if (orderedMembers.length > 0) {
      setSideParty("b", {
        members: orderedMembers,
        levelCapMode,
        rulesGeneration,
      });
    } else {
      setSideParty("b", null);
    }
    setLeaveConfirmOpen(false);
    leaveBack();
  };

  const requestLeave = () => {
    if (isOpponentSide) {
      if (selectedDexNos.length > 0) {
        setLeaveConfirmOpen(true);
        return;
      }
      // 手持ちが空なら相手サイドの保持分も破棄して戻る
      setSideParty("b", null);
      leaveBack();
      return;
    }

    if (selectedDexNos.length > 0) {
      setLeaveConfirmOpen(true);
      return;
    }
    leaveBack();
  };

  return (
    <MatchScreenBackground source={matchBackground}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topFixedBar}>
          <Pressable
            accessibilityRole="button"
            onPress={requestLeave}
            style={({ pressed }) => [
              styles.topNavBack,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.backText}>
              {isOpponentSide ? "自分の編成へ戻る" : "メニューへ戻る"}
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`手持ちを確認 ${selectedDexNos.length}/${PARTY_SIZE}`}
            accessibilityState={{ disabled: selectedDexNos.length === 0 }}
            disabled={selectedDexNos.length === 0}
            onPress={() => setPartyReviewOpen(true)}
            style={({ pressed }) => [
              styles.partyReviewButton,
              selectedDexNos.length === 0 && styles.partyReviewButtonDisabled,
              pressed && selectedDexNos.length > 0 && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.partyReviewButtonText,
                selectedDexNos.length === 0 &&
                  styles.partyReviewButtonTextDisabled,
              ]}
            >
              手持ちを確認
            </Text>
            <Text
              style={[
                styles.partyReviewButtonCount,
                selectedDexNos.length === 0 &&
                  styles.partyReviewButtonCountDisabled,
              ]}
            >
              {selectedDexNos.length}/{PARTY_SIZE}
            </Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.panel}>
            <View style={styles.header}>
              <Text style={styles.kicker}>
                {isOpponentSide ? "相手の編成" : "編成"}
              </Text>
              <Text style={styles.title}>
                {isOpponentSide ? "相手のポケモンを選ぶ" : "ポケモンを選ぶ"}
              </Text>
              <Text style={styles.lead}>
                {isOpponentSide
                  ? `サイドBを${MIN_PARTY_SIZE}〜${PARTY_SIZE}体選びます。手持ちの確認・設定・解除は「手持ちを確認」から行えます。同一種族は1体までです。`
                  : `図鑑順に表示しています。${MIN_PARTY_SIZE}〜${PARTY_SIZE}体選択できます。手持ちの確認・設定・解除は「手持ちを確認」から行えます（同一種族は1体まで）。`}
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
            <View style={styles.toolButtonRow}>
              <Pressable
                accessibilityRole="button"
                onPress={() => setSimulatorOpen(true)}
                style={({ pressed }) => [
                  styles.toolButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.toolButtonText}>
                  ダメージ計算と素早さ比較
                </Text>
              </Pressable>
            </View>

            <View
              style={[
                styles.partyAddBox,
                partyFull && styles.partyAddBoxDisabled,
              ]}
            >
              <Text style={styles.partyAddLabel}>名前・図鑑番号で追加</Text>
              <View style={styles.searchWrap}>
                <TextInput
                  value={nameQuery}
                  editable={!partyFull}
                  onChangeText={(value) => {
                    if (partyFull) return;
                    setNameQuery(value);
                    setSuggestOpen(true);
                  }}
                  onFocus={() => {
                    if (!partyFull) setSuggestOpen(true);
                  }}
                  placeholder={
                    partyFull
                      ? "パーティが満員です"
                      : "名前・図鑑番号で検索して追加"
                  }
                  placeholderTextColor="#9a9286"
                  autoCorrect={false}
                  autoCapitalize="none"
                  style={[
                    styles.searchInput,
                    partyFull && styles.searchInputDisabled,
                  ]}
                />
                {!partyFull && suggestions.length > 0 ? (
                  <View style={styles.suggestList}>
                    {suggestions.map((pokemon) => {
                      const alreadyIn =
                        selectedDexNos.includes(pokemon.dex_no);
                      return (
                        <Pressable
                          key={`${pokemon.dex_no}-${pokemon.region_type}`}
                          disabled={alreadyIn}
                          onPress={() => addPokemonFromSuggest(pokemon)}
                          style={({ pressed }) => [
                            styles.suggestItem,
                            pressed && !alreadyIn && styles.suggestItemPressed,
                            alreadyIn && styles.suggestItemDisabled,
                          ]}
                        >
                          <Text style={styles.suggestDex}>
                            {formatDexNo(pokemon.dex_no)}
                          </Text>
                          <Text style={styles.suggestName}>
                            {pokemon.name_ja}
                          </Text>
                          {alreadyIn ? (
                            <Text style={styles.suggestMoveMeta}>選出中</Text>
                          ) : null}
                        </Pressable>
                      );
                    })}
                  </View>
                ) : null}
              </View>
            </View>

            <SpeciesFilters
              typeFilters={typeFilters}
              onSetTypeFilter={handleSetTypeFilter}
              typeOptions={typeOptions}
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
              moveFilters={moveFilters}
              moveQuery={moveQuery}
              onMoveQueryChange={(value) => {
                setMoveQuery(value);
                setMoveSuggestOpen(true);
              }}
              moveSuggestions={moveSuggestions}
              moveSearchLoading={moveSearchLoading}
              onPickMoveSuggestion={(move) => {
                setMoveFilters((current) => {
                  if (current.some((entry) => entry.id === move.id)) {
                    return current;
                  }
                  if (current.length >= MAX_MOVE_FILTERS) {
                    return current;
                  }
                  return [...current, move];
                });
                setMoveQuery("");
                setMoveSuggestOpen(false);
                setMoveSuggestions([]);
              }}
              onRemoveMoveFilter={(moveId) => {
                setMoveFilters((current) =>
                  current.filter((move) => move.id !== moveId),
                );
              }}
              moveFilterLoading={moveFilterLoading}
              resultCount={sortedSpecies.length}
              onClear={clearFilters}
            />

            <SpeciesSortBar
              sortKey={sortKey}
              sortOrder={sortOrder}
              onSortChange={(key, order) => {
                setSortKey(key);
                setSortOrder(order);
              }}
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
                      onPress={() => handleListPokemonPress(pokemon)}
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

      <Modal
        visible={partyReviewOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setPartyReviewOpen(false)}
      >
        <View style={styles.partyReviewBackdrop}>
          <View style={styles.partyReviewSheet}>
            <View style={styles.partyReviewHeader}>
              <Text style={styles.partyReviewTitle}>
                手持ち {selectedDexNos.length}/{PARTY_SIZE}
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setPartyReviewOpen(false)}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Text style={styles.partyReviewClose}>閉じる</Text>
              </Pressable>
            </View>
            <Text style={styles.partyHint}>
              「設定」で個体値・努力値・技を編集、「解除」で選択を外せます。図鑑一覧を再タップしても解除されません（技絞り込み中は技を反映します）。
            </Text>
            <ScrollView
              style={styles.partyReviewScroll}
              contentContainerStyle={styles.partyReviewScrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.partySlots}>
                {selectedPokemon.length === 0 ? (
                  <View style={styles.partyReviewEmpty}>
                    <Text style={styles.partyReviewEmptyText}>
                      まだポケモンが選ばれていません。
                    </Text>
                  </View>
                ) : null}
                {selectedPokemon.map((pokemon) => {
                  const build = buildsBySpeciesId[pokemon.id];
                  const stats = build
                    ? calcGen1Stats(pokemon, build)
                    : null;
                  const moveLabel = build
                    ? build.moveIds
                        .map((id, i) =>
                          id
                            ? movesById[id]?.name_ja ?? "…"
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
                {selectedDexNos.length > 0 &&
                selectedDexNos.length < PARTY_SIZE ? (
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
            </ScrollView>
          </View>
        </View>
      </Modal>

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

      <Modal
        visible={moveReplacePrompt != null}
        transparent
        animationType="fade"
        onRequestClose={() => setMoveReplacePrompt(null)}
      >
        <View style={styles.confirmBackdrop}>
          <View style={styles.confirmSheet}>
            <Text style={styles.confirmTitle}>技スロットを選択</Text>
            <Text style={styles.confirmBody}>
              {moveReplacePrompt?.nameJa ?? "このポケモン"}
              の技が4つ埋まっています。{"\n"}「
              {moveReplacePrompt?.incoming[0]?.name_ja ?? "技"}
              」に入れ替えるスロットを選んでください。
              {(moveReplacePrompt?.incoming.length ?? 0) > 1
                ? `\n（残り${(moveReplacePrompt?.incoming.length ?? 1) - 1}件）`
                : ""}
            </Text>
            <View style={styles.moveReplaceList}>
              {(
                moveReplacePrompt
                  ? buildsBySpeciesId[moveReplacePrompt.speciesId]?.moveIds
                  : null
              )?.map((moveId, index) => {
                const move = moveId ? movesById[moveId] : null;
                return (
                  <Pressable
                    key={`replace-slot-${index}`}
                    onPress={() => resolveMoveReplace(index)}
                    style={({ pressed }) => [
                      styles.moveReplaceSlot,
                      pressed && styles.pressed,
                    ]}
                  >
                    <View style={styles.moveReplaceSlotTop}>
                      <Text style={styles.moveReplaceSlotLabel}>
                        技{index + 1}
                      </Text>
                      {move ? <MoveTypeBadge typeId={move.type_id} /> : null}
                    </View>
                    <Text style={styles.moveReplaceSlotName}>
                      {moveId
                        ? move?.name_ja ?? "（読み込み中…）"
                        : "（空）"}
                    </Text>
                    {move ? (
                      <Text style={styles.moveReplaceSlotMeta}>
                        威力 {formatMoveStat(move.power)} ／ 命中{" "}
                        {formatMoveStat(move.accuracy)} ／ PP{" "}
                        {formatMoveStat(move.pp)}
                      </Text>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              onPress={() => setMoveReplacePrompt(null)}
              style={styles.confirmSecondary}
            >
              <Text style={styles.confirmSecondaryText}>キャンセル</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Gen1TypeChartDialog
        visible={typeChartOpen}
        onClose={() => setTypeChartOpen(false)}
      />

      <SimulatorScreen
        presentation="dialog"
        visible={simulatorOpen}
        showSprites
        showPartyActions
        levelCapMode={levelCapMode}
        initialRulesGeneration={(Number(params.rulesGeneration) || 1) as Generation}
        partyBuildsBySpeciesId={buildsBySpeciesId}
        partyDexNos={selectedDexNos}
        onClose={() => setSimulatorOpen(false)}
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
            <Text style={styles.confirmTitle}>
              {isOpponentSide ? "相手の選択" : "選択の破棄"}
            </Text>
            <Text style={styles.confirmBody}>
              {isOpponentSide
                ? "相手のポケモンが選択されています。自分の編成へ戻る前に、相手の選択をどうしますか？"
                : "ポケモンが選択されています。このままメニューへ戻ると、選択内容は破棄されます。よろしいですか？"}
            </Text>
            {isOpponentSide ? (
              <View style={styles.confirmActionsColumn}>
                <Pressable
                  onPress={keepOpponentSelectionAndLeave}
                  style={styles.confirmPrimary}
                >
                  <Text style={styles.confirmPrimaryText}>保持して戻る</Text>
                </Pressable>
                <Pressable
                  onPress={discardOpponentSelectionAndLeave}
                  style={styles.confirmDanger}
                >
                  <Text style={styles.confirmDangerText}>破棄して戻る</Text>
                </Pressable>
                <Pressable
                  onPress={() => setLeaveConfirmOpen(false)}
                  style={styles.confirmSecondary}
                >
                  <Text style={styles.confirmSecondaryText}>キャンセル</Text>
                </Pressable>
              </View>
            ) : (
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
            )}
          </View>
        </View>
      </Modal>
    </MatchScreenBackground>
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
  topFixedBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    maxWidth: 720,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "rgba(255, 252, 245, 0.96)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(31, 107, 74, 0.18)",
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
  topNavBack: {
    flexShrink: 1,
  },
  partyReviewButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#1f6b4a",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  partyReviewButtonDisabled: {
    backgroundColor: "#9bb5a8",
  },
  partyReviewButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#fffdf8",
  },
  partyReviewButtonTextDisabled: {
    color: "#e8efe9",
  },
  partyReviewButtonCount: {
    fontSize: 12,
    fontWeight: "800",
    color: "#cfe3d6",
  },
  partyReviewButtonCountDisabled: {
    color: "#d7e3db",
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
  partyReviewBackdrop: {
    flex: 1,
    backgroundColor: "rgba(20, 18, 14, 0.45)",
    justifyContent: "flex-end",
  },
  partyReviewSheet: {
    maxHeight: "88%",
    backgroundColor: "#fffdf8",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 28,
    gap: 10,
    borderWidth: 1,
    borderColor: "#ddd4c4",
  },
  partyReviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  partyReviewTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1d1a16",
  },
  partyReviewClose: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1f6b4a",
  },
  partyReviewScroll: {
    flexGrow: 0,
  },
  partyReviewScrollContent: {
    paddingBottom: 8,
  },
  partyReviewEmpty: {
    backgroundColor: "#eef7f1",
    borderRadius: 10,
    paddingVertical: 24,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  partyReviewEmptyText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5c564c",
    textAlign: "center",
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
  partyAddBox: {
    backgroundColor: "#fffdf8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5dccb",
    padding: 12,
    gap: 8,
    zIndex: 4,
  },
  partyAddBoxDisabled: {
    opacity: 0.55,
  },
  partyAddLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1f6b4a",
  },
  searchInputDisabled: {
    backgroundColor: "#f0ebe3",
    color: "#8a8276",
  },
  sortBox: {
    backgroundColor: "#f7f3ea",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5dccb",
    padding: 12,
    gap: 8,
  },
  sortChipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  sortChip: {
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 8,
    backgroundColor: "#fffdf8",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sortChipSelected: {
    borderColor: "#1f6b4a",
    backgroundColor: "#eef7f1",
  },
  sortChipText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#5c564c",
  },
  sortChipTextSelected: {
    color: "#1f6b4a",
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
  suggestItemDisabled: {
    opacity: 0.45,
  },
  suggestMoveMeta: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6b4f2a",
  },
  moveSearchLoading: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  moveFilterChipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  moveFilterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#1f6b4a",
    borderRadius: 8,
    backgroundColor: "#eef7f1",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  moveFilterChipText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#1f6b4a",
  },
  moveFilterChipRemove: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1f6b4a",
    lineHeight: 14,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#5c564c",
  },
  typeComboRow: {
    flexDirection: "row",
    gap: 10,
  },
  typeComboWrap: {
    flex: 1,
    gap: 4,
  },
  typeComboLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#5c564c",
  },
  typeComboSelect: {
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
  typeComboSelectFilled: {
    backgroundColor: "#eef7f1",
  },
  typeComboSelectDisabled: {
    opacity: 0.45,
    backgroundColor: "#f0ebe3",
  },
  typeComboSelectText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
    color: "#1d1a16",
  },
  typeComboPlaceholder: {
    color: "#9a9286",
    fontWeight: "600",
  },
  typeComboCaret: {
    fontSize: 12,
    color: "#5c564c",
  },
  typeComboMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  typeComboSwatch: {
    width: 14,
    height: 14,
    borderRadius: 4,
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
  moveReplaceList: { gap: 8, marginTop: 4 },
  moveReplaceSlot: {
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f7f3ea",
    gap: 4,
  },
  moveReplaceSlotTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  moveReplaceSlotLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#5c564c",
  },
  moveReplaceSlotName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1d1a16",
  },
  moveReplaceSlotMeta: {
    fontSize: 12,
    fontWeight: "600",
    color: "#5c564c",
  },
  confirmActions: { flexDirection: "row", gap: 10, marginTop: 4 },
  confirmActionsColumn: { gap: 10, marginTop: 4 },
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
  confirmDanger: {
    flex: 1,
    backgroundColor: "#a13d3d",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  confirmDangerText: { color: "#fff", fontWeight: "800" },
});
