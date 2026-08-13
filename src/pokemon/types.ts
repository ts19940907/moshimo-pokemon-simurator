export const REGION_TYPES = {
  ORIGINAL: 0,
  ALOLA: 1,
  GALAR: 2,
  HISUI: 3,
  PALDEA: 4,
} as const;

export type RegionType = (typeof REGION_TYPES)[keyof typeof REGION_TYPES];

export type PokemonCategory =
  | "normal"
  | "restricted_legendary"
  | "mythical";

/** 0 = none (type2 only). 1..18 = type master ids. */
export type TypeId = number;

export const GENDER = {
  NONE: 0,
  BOTH: 1,
  MALE_ONLY: 2,
  FEMALE_ONLY: 3,
} as const;

export type Gender = (typeof GENDER)[keyof typeof GENDER];

export type PokemonSpecies = {
  id: string;
  dex_no: number;
  region_type: RegionType;
  name_ja: string;
  name_en: string;
  category: PokemonCategory;
  /** Debut generation (Hisui forms use 9). */
  introduced_generation: number;
  /** Bitmask of competitive-usable generations. Gen N = 2^(N-1). */
  available_generations: number;
  type1: TypeId;
  /** 0 means single-type. */
  type2: TypeId;
  base_hp: number;
  base_attack: number;
  base_defense: number;
  base_special: number | null;
  base_sp_attack: number | null;
  base_sp_defense: number | null;
  base_speed: number;
  ability1_id: string | null;
  ability2_id: string | null;
  hidden_ability_id: string | null;
  /** 0=none, 1=both, 2=male only, 3=female only */
  gender: Gender;
  is_mega: boolean;
  /** True when no further evolution within this row's generations (Gen1: no Gen1 evolves-to). */
  is_final_evolution: boolean;
  sprite_url: string | null;
};

export const TYPE_NONE = 0;

export const TYPE_BY_ID: Record<number, { nameJa: string; nameEn: string }> = {
  0: { nameJa: "なし", nameEn: "None" },
  1: { nameJa: "ノーマル", nameEn: "Normal" },
  2: { nameJa: "ほのお", nameEn: "Fire" },
  3: { nameJa: "みず", nameEn: "Water" },
  4: { nameJa: "でんき", nameEn: "Electric" },
  5: { nameJa: "くさ", nameEn: "Grass" },
  6: { nameJa: "こおり", nameEn: "Ice" },
  7: { nameJa: "かくとう", nameEn: "Fighting" },
  8: { nameJa: "どく", nameEn: "Poison" },
  9: { nameJa: "じめん", nameEn: "Ground" },
  10: { nameJa: "ひこう", nameEn: "Flying" },
  11: { nameJa: "エスパー", nameEn: "Psychic" },
  12: { nameJa: "むし", nameEn: "Bug" },
  13: { nameJa: "いわ", nameEn: "Rock" },
  14: { nameJa: "ゴースト", nameEn: "Ghost" },
  15: { nameJa: "ドラゴン", nameEn: "Dragon" },
  16: { nameJa: "あく", nameEn: "Dark" },
  17: { nameJa: "はがね", nameEn: "Steel" },
  18: { nameJa: "フェアリー", nameEn: "Fairy" },
};

export {
  ALL_GENERATION_BITS,
  generationBit,
} from "../match-setup/generationFilter";
