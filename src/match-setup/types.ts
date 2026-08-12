export const generations = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export type Generation = (typeof generations)[number];

export const implementedGeneration: Generation = 1;

export const restrictionModes = [
  "standard",
  "restricted_allowed",
  "anything",
] as const;

export type RestrictionMode = (typeof restrictionModes)[number];

export const opponentTypes = ["local_both", "ai"] as const;

export type OpponentType = (typeof opponentTypes)[number];

export const visibilityModes = ["full", "opponent_hidden"] as const;

export type VisibilityMode = (typeof visibilityModes)[number];

export type MatchSetup = {
  rulesGeneration: Generation;
  pokemonGeneration: Generation;
  moveGeneration: Generation;
  restrictionMode: RestrictionMode;
  opponentType: OpponentType;
  visibilityMode: VisibilityMode;
};
