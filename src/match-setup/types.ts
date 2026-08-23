export const generations = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export type Generation = (typeof generations)[number];

/** Generations selectable in match setup UI. */
export const implementedGenerations: readonly Generation[] = [1, 2];

/** Default rules / pool generation when nothing else is chosen. */
export const implementedGeneration: Generation = 1;

export function isGenerationImplemented(generation: Generation): boolean {
  return implementedGenerations.includes(generation);
}

export const restrictionModes = [
  "standard",
  "restricted_allowed",
  "anything",
] as const;

export type RestrictionMode = (typeof restrictionModes)[number];

export const opponentTypes = ["local_both", "cpu", "ai"] as const;

export type OpponentType = (typeof opponentTypes)[number];

export const visibilityModes = ["full", "opponent_hidden"] as const;

export type VisibilityMode = (typeof visibilityModes)[number];

export const levelCapModes = ["max_50", "unlimited"] as const;

export type LevelCapMode = (typeof levelCapModes)[number];

export type MatchSetup = {
  rulesGeneration: Generation;
  /** When true, pokemon/move pools follow rulesGeneration via availability bits only. */
  syncGenerationsWithRules: boolean;
  /** Debut generations for pokemon pool (used when sync is off). Default [1]. */
  pokemonGenerations: Generation[];
  /** Debut generations for move pool (used when sync is off). Default [1]. */
  moveGenerations: Generation[];
  restrictionMode: RestrictionMode;
  opponentType: OpponentType;
  visibilityMode: VisibilityMode;
  levelCapMode: LevelCapMode;
};
