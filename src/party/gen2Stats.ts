import type { PokemonSpecies } from "../pokemon/types";
import {
  GEN1_STAT_EXP_MAX,
  gen1StatExpTerm,
} from "./gen1Stats";
import type { Gen1StatBlock, PartyMemberBuild } from "./types";

export type Gen2StatBlock = {
  hp: number;
  attack: number;
  defense: number;
  sp_attack: number;
  sp_defense: number;
  speed: number;
};

const GEN2_STAT_EXP_MAX_TERM = Math.floor(Math.sqrt(GEN1_STAT_EXP_MAX) / 4);

/** Gen2 non-HP: floor((2*Base + IV + StatExpTerm) * Level / 100) + 5 */
export function calcGen2OtherStat(
  base: number,
  iv: number,
  statExp: number,
  level: number,
): number {
  const term = gen1StatExpTerm(statExp);
  return Math.floor(((base * 2 + iv + term) * level) / 100) + 5;
}

/** Gen2 HP: floor((2*Base + IV + StatExpTerm) * Level / 100) + Level + 10 */
export function calcGen2Hp(
  base: number,
  iv: number,
  statExp: number,
  level: number,
): number {
  const term = gen1StatExpTerm(statExp);
  return Math.floor(((base * 2 + iv + term) * level) / 100) + level + 10;
}

export function gen2BaseForStat(
  species: PokemonSpecies,
  key: keyof Gen2StatBlock,
): number {
  switch (key) {
    case "hp":
      return species.base_hp;
    case "attack":
      return species.base_attack;
    case "defense":
      return species.base_defense;
    case "sp_attack":
      return species.base_sp_attack ?? species.base_special ?? 0;
    case "sp_defense":
      return species.base_sp_defense ?? species.base_special ?? 0;
    case "speed":
      return species.base_speed;
  }
}

export function calcGen2StatValue(
  species: PokemonSpecies,
  key: keyof Gen2StatBlock,
  iv: number,
  statExp: number,
  level: number,
): number {
  const base = gen2BaseForStat(species, key);
  return key === "hp"
    ? calcGen2Hp(base, iv, statExp, level)
    : calcGen2OtherStat(base, iv, statExp, level);
}

function statExpRangeForTerm(term: number): { min: number; max: number } {
  const min = (4 * term) ** 2;
  const max = Math.min(GEN1_STAT_EXP_MAX, (4 * (term + 1)) ** 2 - 1);
  return { min, max };
}

/** Find Stat Exp (0–65535) so the Lv50 actual stat becomes current ± 1. */
export function findStatExpForLevel50DeltaGen2(
  species: PokemonSpecies,
  key: keyof Gen2StatBlock,
  iv: number,
  currentStatExp: number,
  delta: 1 | -1,
): number | null {
  const current = calcGen2StatValue(species, key, iv, currentStatExp, 50);
  const target = current + delta;
  let best: number | null = null;

  for (let term = 0; term <= GEN2_STAT_EXP_MAX_TERM; term += 1) {
    const { min, max } = statExpRangeForTerm(term);
    const value = calcGen2StatValue(species, key, iv, min, 50);
    if (value !== target) continue;
    const candidate = delta > 0 ? min : max;
    if (best == null) {
      best = candidate;
      continue;
    }
    if (delta > 0 && candidate < best) best = candidate;
    if (delta < 0 && candidate > best) best = candidate;
  }

  return best;
}

function ivForKey(
  build: Pick<PartyMemberBuild, "iv">,
  key: keyof Gen2StatBlock,
): number {
  if (key === "sp_attack") {
    return build.iv.sp_attack ?? build.iv.special;
  }
  if (key === "sp_defense") {
    return build.iv.sp_defense ?? build.iv.special;
  }
  return build.iv[key as keyof Gen1StatBlock];
}

function statExpForKey(
  build: Pick<PartyMemberBuild, "statExp">,
  key: keyof Gen2StatBlock,
): number {
  if (key === "sp_attack") {
    return build.statExp.sp_attack ?? build.statExp.special;
  }
  if (key === "sp_defense") {
    return build.statExp.sp_defense ?? build.statExp.special;
  }
  return build.statExp[key as keyof Gen1StatBlock];
}

export function calcGen2Stats(
  species: PokemonSpecies,
  build: Pick<PartyMemberBuild, "level" | "iv" | "statExp">,
): Gen2StatBlock {
  const level = Math.max(1, Math.min(100, Math.floor(build.level)));
  return {
    hp: calcGen2StatValue(
      species,
      "hp",
      build.iv.hp,
      build.statExp.hp,
      level,
    ),
    attack: calcGen2StatValue(
      species,
      "attack",
      build.iv.attack,
      build.statExp.attack,
      level,
    ),
    defense: calcGen2StatValue(
      species,
      "defense",
      build.iv.defense,
      build.statExp.defense,
      level,
    ),
    sp_attack: calcGen2StatValue(
      species,
      "sp_attack",
      ivForKey(build, "sp_attack"),
      statExpForKey(build, "sp_attack"),
      level,
    ),
    sp_defense: calcGen2StatValue(
      species,
      "sp_defense",
      ivForKey(build, "sp_defense"),
      statExpForKey(build, "sp_defense"),
      level,
    ),
    speed: calcGen2StatValue(
      species,
      "speed",
      build.iv.speed,
      build.statExp.speed,
      level,
    ),
  };
}
