import type { PokemonSpecies } from "../pokemon/types";
import type {
  Gen1SpecialSource,
  Gen1StatBlock,
  PartyMemberBuild,
} from "./types";
import { GEN1_STAT_KEYS, GEN1_STAT_LABELS } from "./types";

export const GEN1_DV_MAX = 15;
export const GEN1_STAT_EXP_MAX = 65535;
const GEN1_STAT_EXP_MAX_TERM = Math.floor(Math.sqrt(GEN1_STAT_EXP_MAX) / 4);

/** Gen1 Stat Exp contribution: floor(sqrt(statExp) / 4). */
export function gen1StatExpTerm(statExp: number): number {
  const clamped = Math.max(0, Math.min(65535, Math.floor(statExp)));
  return Math.floor(Math.sqrt(clamped) / 4);
}

/** Gen1 non-HP: floor(((Base+DV)*2 + StatExpTerm) * Level / 100) + 5 */
export function calcGen1OtherStat(
  base: number,
  dv: number,
  statExp: number,
  level: number,
): number {
  const term = gen1StatExpTerm(statExp);
  return Math.floor((((base + dv) * 2 + term) * level) / 100) + 5;
}

/** Gen1 HP: floor(((Base+DV)*2 + StatExpTerm) * Level / 100) + Level + 10 */
export function calcGen1Hp(
  base: number,
  dv: number,
  statExp: number,
  level: number,
): number {
  const term = gen1StatExpTerm(statExp);
  return Math.floor((((base + dv) * 2 + term) * level) / 100) + level + 10;
}

export function resolveGen1SpecialSource(
  species: PokemonSpecies,
  source: Gen1SpecialSource | undefined,
): Gen1SpecialSource {
  if (species.introduced_generation < 2) return "sp_attack";
  return source ?? "sp_attack";
}

function baseSpecial(
  species: PokemonSpecies,
  source: Gen1SpecialSource | undefined,
): number {
  if (species.introduced_generation < 2) {
    return species.base_special ?? species.base_sp_attack ?? 0;
  }
  const resolved = resolveGen1SpecialSource(species, source);
  if (resolved === "sp_defense") {
    return (
      species.base_sp_defense ??
      species.base_special ??
      species.base_sp_attack ??
      0
    );
  }
  return (
    species.base_sp_attack ??
    species.base_special ??
    species.base_sp_defense ??
    0
  );
}

export function gen1BaseForStat(
  species: PokemonSpecies,
  key: keyof Gen1StatBlock,
  specialSource?: Gen1SpecialSource,
): number {
  if (key === "hp") return species.base_hp;
  if (key === "attack") return species.base_attack;
  if (key === "defense") return species.base_defense;
  if (key === "special") return baseSpecial(species, specialSource);
  return species.base_speed;
}

export function calcGen1StatValue(
  species: PokemonSpecies,
  key: keyof Gen1StatBlock,
  dv: number,
  statExp: number,
  level: number,
  specialSource?: Gen1SpecialSource,
): number {
  const base = gen1BaseForStat(species, key, specialSource);
  return key === "hp"
    ? calcGen1Hp(base, dv, statExp, level)
    : calcGen1OtherStat(base, dv, statExp, level);
}

function statExpRangeForTerm(term: number): { min: number; max: number } {
  const min = (4 * term) ** 2;
  const max = Math.min(GEN1_STAT_EXP_MAX, (4 * (term + 1)) ** 2 - 1);
  return { min, max };
}

/**
 * Find Stat Exp so the Lv50 actual stat becomes currentLv50 ± 1.
 * +1 uses the smallest matching Exp; -1 uses the largest.
 */
export function findStatExpForLevel50Delta(
  species: PokemonSpecies,
  key: keyof Gen1StatBlock,
  dv: number,
  currentStatExp: number,
  delta: 1 | -1,
  specialSource?: Gen1SpecialSource,
): number | null {
  const current = calcGen1StatValue(
    species,
    key,
    dv,
    currentStatExp,
    50,
    specialSource,
  );
  const target = current + delta;
  let best: number | null = null;

  for (let term = 0; term <= GEN1_STAT_EXP_MAX_TERM; term += 1) {
    const { min, max } = statExpRangeForTerm(term);
    const value = calcGen1StatValue(species, key, dv, min, 50, specialSource);
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

/** Compute Gen1 in-battle stats from species bases + build (IV/DV, Stat Exp, level). */
export function calcGen1Stats(
  species: PokemonSpecies,
  build: Pick<PartyMemberBuild, "level" | "iv" | "statExp" | "specialSource">,
): Gen1StatBlock {
  const level = Math.max(1, Math.min(100, Math.floor(build.level)));
  const special = calcGen1OtherStat(
    baseSpecial(species, build.specialSource),
    build.iv.special,
    build.statExp.special,
    level,
  );
  return {
    hp: calcGen1Hp(species.base_hp, build.iv.hp, build.statExp.hp, level),
    attack: calcGen1OtherStat(
      species.base_attack,
      build.iv.attack,
      build.statExp.attack,
      level,
    ),
    defense: calcGen1OtherStat(
      species.base_defense,
      build.iv.defense,
      build.statExp.defense,
      level,
    ),
    special,
    sp_attack: special,
    sp_defense: special,
    speed: calcGen1OtherStat(
      species.base_speed,
      build.iv.speed,
      build.statExp.speed,
      level,
    ),
  };
}

export function summarizeGen1Stats(stats: Gen1StatBlock): string {
  return GEN1_STAT_KEYS.map(
    (key) => `${GEN1_STAT_LABELS[key]}${stats[key]}`,
  ).join(" / ");
}
