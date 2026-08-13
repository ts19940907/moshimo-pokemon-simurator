import type { Generation } from "../match-setup/types";

/** Gen N bit flag: 2^(N-1) */
export function generationBit(generation: number): number {
  return 1 << (generation - 1);
}

/** All of Gen1..Gen9 */
export const ALL_GENERATION_BITS = (1 << 9) - 1;

export function generationsToMask(gens: readonly number[]): number {
  return gens.reduce((mask, generation) => mask | generationBit(generation), 0);
}

export function highestGenerationInMask(mask: number): number {
  let highest = 0;
  for (let generation = 1; generation <= 9; generation += 1) {
    if ((mask & generationBit(generation)) !== 0) {
      highest = generation;
    }
  }
  return highest;
}

export type GenerationAvailability = {
  introduced_generation: number;
  available_generations: number;
};

export type GenerationFilterOptions = {
  /** When true, only available_generations bit for rulesGeneration (no fallback). */
  syncWithRules: boolean;
  rulesGeneration: number;
  /** Debut generations to include when syncWithRules is false. */
  introducedGenerations: readonly number[];
};

/**
 * Pool + row selection for pokemon/moves.
 * - sync ON: available bit for rules gen only
 * - sync OFF: introduced_generation in selected, prefer rules-gen row, else latest row
 */
export function filterByGenerationAvailability<T extends GenerationAvailability>(
  rows: readonly T[],
  options: GenerationFilterOptions,
  identityKey: (row: T) => string,
): T[] {
  if (options.syncWithRules) {
    const bit = generationBit(options.rulesGeneration);
    return rows.filter((row) => (row.available_generations & bit) !== 0);
  }

  const introduced = new Set(
    options.introducedGenerations.length > 0
      ? options.introducedGenerations
      : [1],
  );
  const pool = rows.filter((row) =>
    introduced.has(row.introduced_generation as Generation),
  );

  const groups = new Map<string, T[]>();
  for (const row of pool) {
    const key = identityKey(row);
    const list = groups.get(key);
    if (list) list.push(row);
    else groups.set(key, [row]);
  }

  const rulesBit = generationBit(options.rulesGeneration);
  const selected: T[] = [];
  for (const group of groups.values()) {
    const exact = group.filter(
      (row) => (row.available_generations & rulesBit) !== 0,
    );
    const candidates = exact.length > 0 ? exact : group;
    selected.push(
      candidates.reduce((best, row) =>
        highestGenerationInMask(row.available_generations) >
        highestGenerationInMask(best.available_generations)
          ? row
          : best,
      ),
    );
  }
  return selected;
}

export function parseGenerationList(
  value: string | string[] | undefined,
  fallback: Generation = 1,
): Generation[] {
  const raw = Array.isArray(value) ? value.join(",") : value;
  if (!raw) return [fallback];
  const parsed = raw
    .split(",")
    .map((part) => Number(part.trim()))
    .filter((n): n is Generation => n >= 1 && n <= 9);
  return parsed.length > 0 ? parsed : [fallback];
}

export function formatGenerationList(gens: readonly number[]): string {
  return [...gens].sort((a, b) => a - b).join(",");
}
