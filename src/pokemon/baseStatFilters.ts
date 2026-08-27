import type { PokemonSpecies } from "./types";

export type StatCompareMode = "gte" | "lte";
export type StatFilterEntry = { value: string; mode: StatCompareMode };

export type Gen1BaseStatKey = "hp" | "attack" | "defense" | "special" | "speed";
export type Gen2BaseStatKey =
  | "hp"
  | "attack"
  | "defense"
  | "sp_attack"
  | "sp_defense"
  | "speed";
export type BaseStatFilterKey = Gen1BaseStatKey | Gen2BaseStatKey;
export type SortKey = "dex" | BaseStatFilterKey;

export type StatFiltersState = Record<BaseStatFilterKey, StatFilterEntry>;

export type DisplayBaseStats = {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  special: number | null;
  sp_attack: number | null;
  sp_defense: number | null;
};

export function usesSplitSpecial(rulesGeneration: number): boolean {
  return rulesGeneration >= 2;
}

export function getDisplayBaseStats(
  pokemon: PokemonSpecies,
  rulesGeneration = 1,
): DisplayBaseStats {
  const base = {
    hp: pokemon.base_hp,
    attack: pokemon.base_attack,
    defense: pokemon.base_defense,
    speed: pokemon.base_speed,
  };
  if (usesSplitSpecial(rulesGeneration)) {
    return {
      ...base,
      special: null,
      sp_attack: pokemon.base_sp_attack ?? pokemon.base_special ?? 0,
      sp_defense: pokemon.base_sp_defense ?? pokemon.base_special ?? 0,
    };
  }
  return {
    ...base,
    special: pokemon.base_special ?? pokemon.base_sp_attack ?? 0,
    sp_attack: null,
    sp_defense: null,
  };
}

export function getStatValue(
  stats: DisplayBaseStats,
  key: BaseStatFilterKey,
): number {
  switch (key) {
    case "hp":
      return stats.hp;
    case "attack":
      return stats.attack;
    case "defense":
      return stats.defense;
    case "speed":
      return stats.speed;
    case "special":
      return stats.special ?? 0;
    case "sp_attack":
      return stats.sp_attack ?? 0;
    case "sp_defense":
      return stats.sp_defense ?? 0;
  }
}

export function getBaseStatTotal(
  stats: DisplayBaseStats,
  rulesGeneration: number,
): number {
  if (usesSplitSpecial(rulesGeneration)) {
    return (
      stats.hp +
      stats.attack +
      stats.defense +
      (stats.sp_attack ?? 0) +
      (stats.sp_defense ?? 0) +
      stats.speed
    );
  }
  return (
    stats.hp +
    stats.attack +
    stats.defense +
    (stats.special ?? 0) +
    stats.speed
  );
}

export function baseStatFilterOptions(
  rulesGeneration: number,
): { key: BaseStatFilterKey; label: string }[] {
  const common = [
    { key: "hp" as const, label: "HP" },
    { key: "attack" as const, label: "こうげき" },
    { key: "defense" as const, label: "ぼうぎょ" },
  ];
  if (usesSplitSpecial(rulesGeneration)) {
    return [
      ...common,
      { key: "sp_attack", label: "とくこう" },
      { key: "sp_defense", label: "とくぼう" },
      { key: "speed", label: "すばやさ" },
    ];
  }
  return [
    ...common,
    { key: "special", label: "とくしゅ" },
    { key: "speed", label: "すばやさ" },
  ];
}

export function baseStatSortOptions(
  rulesGeneration: number,
): { key: SortKey; label: string }[] {
  const common = [
    { key: "dex" as const, label: "図鑑" },
    { key: "hp" as const, label: "HP" },
    { key: "attack" as const, label: "攻撃" },
    { key: "defense" as const, label: "防御" },
  ];
  if (usesSplitSpecial(rulesGeneration)) {
    return [
      ...common,
      { key: "sp_attack", label: "特攻" },
      { key: "sp_defense", label: "特防" },
      { key: "speed", label: "素早さ" },
    ];
  }
  return [
    ...common,
    { key: "special", label: "特殊" },
    { key: "speed", label: "素早さ" },
  ];
}

export function emptyStatFilters(): StatFiltersState {
  const entry = (): StatFilterEntry => ({ value: "", mode: "gte" });
  return {
    hp: entry(),
    attack: entry(),
    defense: entry(),
    special: entry(),
    sp_attack: entry(),
    sp_defense: entry(),
    speed: entry(),
  };
}

export function parseStatThreshold(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

export function matchesStatFilter(
  statValue: number,
  filter: StatFilterEntry,
): boolean {
  const threshold = parseStatThreshold(filter.value);
  if (threshold == null) {
    return true;
  }
  return filter.mode === "gte" ? statValue >= threshold : statValue <= threshold;
}

export function hasActiveStatFilters(
  statFilters: StatFiltersState,
  rulesGeneration: number,
): boolean {
  return baseStatFilterOptions(rulesGeneration).some(
    ({ key }) => parseStatThreshold(statFilters[key].value) != null,
  );
}

export function speciesMatchesStatFilters(
  pokemon: PokemonSpecies,
  statFilters: StatFiltersState,
  rulesGeneration: number,
): boolean {
  const stats = getDisplayBaseStats(pokemon, rulesGeneration);
  for (const { key } of baseStatFilterOptions(rulesGeneration)) {
    if (!matchesStatFilter(getStatValue(stats, key), statFilters[key])) {
      return false;
    }
  }
  return true;
}

export function normalizeSortKey(
  sortKey: SortKey,
  rulesGeneration: number,
): SortKey {
  if (sortKey === "special" && usesSplitSpecial(rulesGeneration)) {
    return "sp_attack";
  }
  if (
    (sortKey === "sp_attack" || sortKey === "sp_defense") &&
    !usesSplitSpecial(rulesGeneration)
  ) {
    return "special";
  }
  return sortKey;
}

export function compareSpeciesByBaseStatSort(
  a: PokemonSpecies,
  b: PokemonSpecies,
  sortKey: SortKey,
  sortOrder: "asc" | "desc",
  rulesGeneration: number,
): number {
  const direction = sortOrder === "asc" ? 1 : -1;
  let diff = 0;

  if (sortKey === "dex") {
    diff = a.dex_no - b.dex_no || a.region_type - b.region_type;
  } else {
    const statsA = getDisplayBaseStats(a, rulesGeneration);
    const statsB = getDisplayBaseStats(b, rulesGeneration);
    diff = getStatValue(statsA, sortKey) - getStatValue(statsB, sortKey);
    if (diff === 0) {
      diff = a.dex_no - b.dex_no || a.region_type - b.region_type;
    }
  }

  return diff * direction;
}
