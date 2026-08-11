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
  restrictionMode: RestrictionMode;
  opponentType: OpponentType;
  visibilityMode: VisibilityMode;
};
