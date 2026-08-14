import type { PokemonSpecies } from "../pokemon/types";
import type { Gen1StatBlock, PartyMemberBuild } from "./types";
import { GEN1_STAT_KEYS, GEN1_STAT_LABELS } from "./types";

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

function baseSpecial(species: PokemonSpecies): number {
  return species.base_special ?? species.base_sp_attack ?? 0;
}

/** Compute Gen1 in-battle stats from species bases + build (IV/DV, Stat Exp, level). */
export function calcGen1Stats(
  species: PokemonSpecies,
  build: Pick<PartyMemberBuild, "level" | "iv" | "statExp">,
): Gen1StatBlock {
  const level = Math.max(1, Math.min(100, Math.floor(build.level)));
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
    special: calcGen1OtherStat(
      baseSpecial(species),
      build.iv.special,
      build.statExp.special,
      level,
    ),
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
