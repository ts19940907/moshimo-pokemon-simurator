import type { Gen2StatBlock } from "./gen2Stats";

/** Non-HP stats natures can raise or lower. */
export type NatureStatKey = Exclude<keyof Gen2StatBlock, "hp">;

export type NatureId =
  | "hardy"
  | "lonely"
  | "brave"
  | "adamant"
  | "naughty"
  | "bold"
  | "docile"
  | "relaxed"
  | "impish"
  | "lax"
  | "timid"
  | "hasty"
  | "serious"
  | "jolly"
  | "naive"
  | "modest"
  | "mild"
  | "quiet"
  | "bashful"
  | "rash"
  | "calm"
  | "gentle"
  | "sassy"
  | "careful"
  | "quirky";

export type NatureDef = {
  id: NatureId;
  nameJa: string;
  plus: NatureStatKey | null;
  minus: NatureStatKey | null;
};

/** All 25 natures introduced in Gen3. Neutral natures have plus === minus === null. */
export const NATURES: readonly NatureDef[] = [
  { id: "hardy", nameJa: "がんばりや", plus: null, minus: null },
  { id: "lonely", nameJa: "さみしがり", plus: "attack", minus: "defense" },
  { id: "brave", nameJa: "ゆうかん", plus: "attack", minus: "speed" },
  { id: "adamant", nameJa: "いじっぱり", plus: "attack", minus: "sp_attack" },
  { id: "naughty", nameJa: "やんちゃ", plus: "attack", minus: "sp_defense" },
  { id: "bold", nameJa: "ずぶとい", plus: "defense", minus: "attack" },
  { id: "docile", nameJa: "すなお", plus: null, minus: null },
  { id: "relaxed", nameJa: "のんき", plus: "defense", minus: "speed" },
  { id: "impish", nameJa: "わんぱく", plus: "defense", minus: "sp_attack" },
  { id: "lax", nameJa: "のうてんき", plus: "defense", minus: "sp_defense" },
  { id: "timid", nameJa: "おくびょう", plus: "speed", minus: "attack" },
  { id: "hasty", nameJa: "せっかち", plus: "speed", minus: "defense" },
  { id: "serious", nameJa: "まじめ", plus: null, minus: null },
  { id: "jolly", nameJa: "ようき", plus: "speed", minus: "sp_attack" },
  { id: "naive", nameJa: "むじゃき", plus: "speed", minus: "sp_defense" },
  { id: "modest", nameJa: "ひかえめ", plus: "sp_attack", minus: "attack" },
  { id: "mild", nameJa: "おっとり", plus: "sp_attack", minus: "defense" },
  { id: "quiet", nameJa: "れいせい", plus: "sp_attack", minus: "speed" },
  { id: "bashful", nameJa: "てれや", plus: null, minus: null },
  { id: "rash", nameJa: "うっかりや", plus: "sp_attack", minus: "sp_defense" },
  { id: "calm", nameJa: "おだやか", plus: "sp_defense", minus: "attack" },
  { id: "gentle", nameJa: "おとなしい", plus: "sp_defense", minus: "defense" },
  { id: "sassy", nameJa: "なまいき", plus: "sp_defense", minus: "speed" },
  { id: "careful", nameJa: "しんちょう", plus: "sp_defense", minus: "sp_attack" },
  { id: "quirky", nameJa: "きまぐれ", plus: null, minus: null },
] as const;

export const DEFAULT_NATURE_ID: NatureId = "hardy";

const NATURE_BY_ID = Object.fromEntries(
  NATURES.map((nature) => [nature.id, nature]),
) as Record<NatureId, NatureDef>;

export function getNature(id: NatureId | null | undefined): NatureDef {
  if (id && id in NATURE_BY_ID) return NATURE_BY_ID[id];
  return NATURE_BY_ID[DEFAULT_NATURE_ID];
}

/** Nature multiplier for a non-HP battle stat (1.1 / 1.0 / 0.9). */
export function natureMultiplier(
  natureId: NatureId | null | undefined,
  key: NatureStatKey,
): number {
  const nature = getNature(natureId);
  if (nature.plus === key) return 1.1;
  if (nature.minus === key) return 0.9;
  return 1;
}

export function natureEffectLabel(nature: NatureDef): string {
  if (!nature.plus || !nature.minus) return "補正なし";
  const labels: Record<NatureStatKey, string> = {
    attack: "こうげき",
    defense: "ぼうぎょ",
    sp_attack: "とくこう",
    sp_defense: "とくぼう",
    speed: "すばやさ",
  };
  return `+${labels[nature.plus]} / −${labels[nature.minus]}`;
}
