import type { LevelCapMode } from "../match-setup/types";
import type { Gender, PokemonSpecies } from "../pokemon/types";
import { GENDER } from "../pokemon/types";

export type BattleGender = "none" | "male" | "female";

/** Gen1 DV / Stat Exp fields (Special is single). */
export type Gen1StatBlock = {
  hp: number;
  attack: number;
  defense: number;
  special: number;
  speed: number;
};

export type PartyMemberBuild = {
  speciesId: string;
  dexNo: number;
  nameJa: string;
  level: number;
  gender: BattleGender;
  iv: Gen1StatBlock;
  /** Gen1 Stat Experience 0–65535 */
  statExp: Gen1StatBlock;
  /** Up to 4 move ids (UUID). Empty slot = null. */
  moveIds: [string | null, string | null, string | null, string | null];
};

export type PartySetupState = {
  members: PartyMemberBuild[];
  levelCapMode: LevelCapMode;
  rulesGeneration: number;
};

export const GEN1_STAT_KEYS = [
  "hp",
  "attack",
  "defense",
  "special",
  "speed",
] as const;

export const GEN1_STAT_LABELS: Record<(typeof GEN1_STAT_KEYS)[number], string> =
  {
    hp: "HP",
    attack: "こうげき",
    defense: "ぼうぎょ",
    special: "とくしゅ",
    speed: "すばやさ",
  };

export function maxLevelForCap(mode: LevelCapMode): number {
  return mode === "max_50" ? 50 : 100;
}

export function defaultBattleGender(speciesGender: Gender): BattleGender {
  if (speciesGender === GENDER.NONE) return "none";
  if (speciesGender === GENDER.MALE_ONLY) return "male";
  if (speciesGender === GENDER.FEMALE_ONLY) return "female";
  return "male";
}

export function createDefaultBuild(
  species: PokemonSpecies,
  levelCapMode: LevelCapMode,
): PartyMemberBuild {
  return {
    speciesId: species.id,
    dexNo: species.dex_no,
    nameJa: species.name_ja,
    level: Math.min(50, maxLevelForCap(levelCapMode)),
    gender: defaultBattleGender(species.gender),
    iv: { hp: 15, attack: 15, defense: 15, special: 15, speed: 15 },
    statExp: { hp: 0, attack: 0, defense: 0, special: 0, speed: 0 },
    moveIds: [null, null, null, null],
  };
}

export function genderLabel(gender: BattleGender): string {
  if (gender === "none") return "なし";
  if (gender === "male") return "オス";
  return "メス";
}
