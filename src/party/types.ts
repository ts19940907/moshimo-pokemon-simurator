import type { LevelCapMode } from "../match-setup/types";
import type { Gender, PokemonSpecies } from "../pokemon/types";
import { GENDER } from "../pokemon/types";
import { DEFAULT_NATURE_ID, type NatureId } from "./natures";
import { usesModernIvEv } from "./gen3Stats";

export type PartySide = "a" | "b";

export type BattleGender = "none" | "male" | "female";

/**
 * Under Gen1 rules, which Gen2 base feeds the unified Special stat.
 * Only meaningful for Gen2-debut species (Gen1 debut always uses base_special).
 */
export type Gen1SpecialSource = "sp_attack" | "sp_defense";

/** Gen1 DV / Stat Exp fields. Gen2+ uses sp_attack / sp_defense instead of special. */
export type Gen1StatBlock = {
  hp: number;
  attack: number;
  defense: number;
  special: number;
  sp_attack: number;
  sp_defense: number;
  speed: number;
};

export type PartyMemberBuild = {
  speciesId: string;
  dexNo: number;
  nameJa: string;
  level: number;
  gender: BattleGender;
  iv: Gen1StatBlock;
  /**
   * Gen1–2: Stat Experience 0–65535.
   * Gen3+: Effort Values 0–255 per stat (total ≤ 510). Same field, rules-dependent meaning.
   */
  statExp: Gen1StatBlock;
  /**
   * Gen1 rules + Gen2-debut species: Special base from SpA or SpD.
   * Default sp_attack. Ignored for Gen1-debut species.
   */
  specialSource?: Gen1SpecialSource;
  /** Selected ability id (UUID). Gen3+ only. */
  abilityId?: string | null;
  /** Nature id. Gen3+ only. */
  natureId?: NatureId | null;
  /** Up to 4 move ids (UUID). Empty slot = null. */
  moveIds: [string | null, string | null, string | null, string | null];
  /** Held item (tool) id (UUID). None = null. Gen1 unused. */
  toolId: string | null;
  /**
   * Cached PokeAPI item id for battle (survives if tool master fetch fails).
   * Prefer this over looking up toolId in toolsById during battle.
   */
  toolPokeapiId?: number | null;
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
  rulesGeneration = 1,
): PartyMemberBuild {
  const ivMax = usesModernIvEv(rulesGeneration) ? 31 : 15;
  const modern = usesModernIvEv(rulesGeneration);
  return {
    speciesId: species.id,
    dexNo: species.dex_no,
    nameJa: species.name_ja,
    level: Math.min(50, maxLevelForCap(levelCapMode)),
    gender: defaultBattleGender(species.gender),
    iv: {
      hp: ivMax,
      attack: ivMax,
      defense: ivMax,
      special: ivMax,
      sp_attack: ivMax,
      sp_defense: ivMax,
      speed: ivMax,
    },
    statExp: {
      hp: 0,
      attack: 0,
      defense: 0,
      special: 0,
      sp_attack: 0,
      sp_defense: 0,
      speed: 0,
    },
    specialSource:
      species.introduced_generation >= 2 ? "sp_attack" : undefined,
    abilityId: modern ? species.ability1_id : null,
    natureId: modern ? DEFAULT_NATURE_ID : null,
    moveIds: [null, null, null, null],
    toolId: null,
    toolPokeapiId: null,
  };
}

export function genderLabel(gender: BattleGender): string {
  if (gender === "none") return "なし";
  if (gender === "male") return "オス";
  return "メス";
}
