import type { PokemonSpecies } from "../pokemon/types";
import type { Gen2StatBlock } from "./gen2Stats";
import { gen2BaseForStat } from "./gen2Stats";
import {
  natureMultiplier,
  type NatureId,
  type NatureStatKey,
} from "./natures";
import type { Gen1StatBlock, PartyMemberBuild } from "./types";

/** Gen3+ IV range. */
export const GEN3_IV_MAX = 31;

/** Gen3–5 per-stat EV cap (Gen6+ lowered this to 252). */
export const GEN3_EV_PER_STAT_MAX = 255;

/**
 * Highest EV that still increases floor(EV/4).
 * 253–255 share the same term as 252, so they never change stats alone.
 */
export const GEN3_EV_PER_STAT_EFFECTIVE_MAX = 252;

/** Total EV budget from Gen3 onward. */
export const GEN3_EV_TOTAL_MAX = 510;

export function usesModernIvEv(rulesGeneration: number): boolean {
  return rulesGeneration >= 3;
}

export function ivMaxForRules(rulesGeneration: number): number {
  return usesModernIvEv(rulesGeneration) ? GEN3_IV_MAX : 15;
}

/** Gen3 EV contribution: floor(EV / 4). */
export function gen3EvTerm(ev: number): number {
  const clamped = Math.max(0, Math.min(GEN3_EV_PER_STAT_MAX, Math.floor(ev)));
  return Math.floor(clamped / 4);
}

/** Gen3 non-HP before nature: floor((2*Base + IV + floor(EV/4)) * Level / 100) + 5 */
export function calcGen3OtherStatBeforeNature(
  base: number,
  iv: number,
  ev: number,
  level: number,
): number {
  const term = gen3EvTerm(ev);
  return Math.floor(((base * 2 + iv + term) * level) / 100) + 5;
}

/** Gen3 HP: floor((2*Base + IV + floor(EV/4)) * Level / 100) + Level + 10 */
export function calcGen3Hp(
  base: number,
  iv: number,
  ev: number,
  level: number,
): number {
  const term = gen3EvTerm(ev);
  return Math.floor(((base * 2 + iv + term) * level) / 100) + level + 10;
}

export function calcGen3StatValue(
  species: PokemonSpecies,
  key: keyof Gen2StatBlock,
  iv: number,
  ev: number,
  level: number,
  natureId: NatureId | null | undefined,
): number {
  const base = gen2BaseForStat(species, key);
  if (key === "hp") {
    return calcGen3Hp(base, iv, ev, level);
  }
  const before = calcGen3OtherStatBeforeNature(base, iv, ev, level);
  return Math.floor(before * natureMultiplier(natureId, key as NatureStatKey));
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

function evForKey(
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

export function calcGen3Stats(
  species: PokemonSpecies,
  build: Pick<PartyMemberBuild, "level" | "iv" | "statExp" | "natureId">,
): Gen2StatBlock {
  const level = Math.max(1, Math.min(100, Math.floor(build.level)));
  return {
    hp: calcGen3StatValue(
      species,
      "hp",
      build.iv.hp,
      build.statExp.hp,
      level,
      build.natureId,
    ),
    attack: calcGen3StatValue(
      species,
      "attack",
      build.iv.attack,
      build.statExp.attack,
      level,
      build.natureId,
    ),
    defense: calcGen3StatValue(
      species,
      "defense",
      build.iv.defense,
      build.statExp.defense,
      level,
      build.natureId,
    ),
    sp_attack: calcGen3StatValue(
      species,
      "sp_attack",
      ivForKey(build, "sp_attack"),
      evForKey(build, "sp_attack"),
      level,
      build.natureId,
    ),
    sp_defense: calcGen3StatValue(
      species,
      "sp_defense",
      ivForKey(build, "sp_defense"),
      evForKey(build, "sp_defense"),
      level,
      build.natureId,
    ),
    speed: calcGen3StatValue(
      species,
      "speed",
      build.iv.speed,
      build.statExp.speed,
      level,
      build.natureId,
    ),
  };
}

const GEN3_STAT_KEYS: (keyof Gen2StatBlock)[] = [
  "hp",
  "attack",
  "defense",
  "sp_attack",
  "sp_defense",
  "speed",
];

export function totalEffortValues(
  block: Pick<
    Gen1StatBlock,
    "hp" | "attack" | "defense" | "sp_attack" | "sp_defense" | "speed" | "special"
  >,
  splitSpecial: boolean,
): number {
  if (!splitSpecial) {
    return (
      block.hp + block.attack + block.defense + block.special + block.speed
    );
  }
  return (
    block.hp +
    block.attack +
    block.defense +
    (block.sp_attack ?? block.special) +
    (block.sp_defense ?? block.special) +
    block.speed
  );
}

/** Max EV allowed for one key given other stats' current values. */
export function maxEvForKey(
  block: Gen1StatBlock,
  key: keyof Gen2StatBlock,
): number {
  const others = GEN3_STAT_KEYS.reduce((sum, k) => {
    if (k === key) return sum;
    return sum + evForKey({ statExp: block }, k);
  }, 0);
  return Math.min(GEN3_EV_PER_STAT_MAX, GEN3_EV_TOTAL_MAX - others);
}

/**
 * Minimum EVs that produce each distinct actual-stat step at `level`.
 * Wasteful values (e.g. 253–255 vs 252) are excluded.
 */
export function meaningfulEvsAtLevel(
  species: PokemonSpecies,
  key: keyof Gen2StatBlock,
  iv: number,
  natureId: NatureId | null | undefined,
  level: number,
  maxAllowed: number,
): number[] {
  const capped = Math.max(
    0,
    Math.min(maxAllowed, GEN3_EV_PER_STAT_EFFECTIVE_MAX),
  );
  const meaningful: number[] = [];
  let lastStat: number | null = null;
  for (let ev = 0; ev <= capped; ev += 1) {
    const value = calcGen3StatValue(species, key, iv, ev, level, natureId);
    if (lastStat == null || value !== lastStat) {
      meaningful.push(ev);
      lastStat = value;
    }
  }
  return meaningful;
}

/** Snap a requested EV to a value that actually changes the real stat at level. */
export function snapEvToMeaningful(
  requested: number,
  meaningful: readonly number[],
): number {
  if (meaningful.length === 0) return 0;
  const target = Math.max(0, Math.floor(requested));
  if (meaningful.includes(target)) return target;
  let best = meaningful[0]!;
  for (const ev of meaningful) {
    if (ev <= target) best = ev;
    else break;
  }
  return best;
}

export function maxMeaningfulEvAtLevel(
  species: PokemonSpecies,
  key: keyof Gen2StatBlock,
  iv: number,
  natureId: NatureId | null | undefined,
  level: number,
  maxAllowed: number,
): number {
  const meaningful = meaningfulEvsAtLevel(
    species,
    key,
    iv,
    natureId,
    level,
    maxAllowed,
  );
  return meaningful.length > 0 ? meaningful[meaningful.length - 1]! : 0;
}

/** Clamp/snap a requested EV into a meaningful value at the given level. */
export function clampEvToMeaningfulAtLevel(
  species: PokemonSpecies,
  key: keyof Gen2StatBlock,
  iv: number,
  requestedEv: number,
  natureId: NatureId | null | undefined,
  level: number,
  maxAllowed: number,
): number {
  return snapEvToMeaningful(
    requestedEv,
    meaningfulEvsAtLevel(species, key, iv, natureId, level, maxAllowed),
  );
}

/** Find EV so the actual at `level` becomes current ± 1, respecting budget. */
export function findEvForLevelDeltaGen3(
  species: PokemonSpecies,
  key: keyof Gen2StatBlock,
  iv: number,
  currentEv: number,
  natureId: NatureId | null | undefined,
  level: number,
  maxAllowed: number,
  delta: 1 | -1,
): number | null {
  const current = calcGen3StatValue(
    species,
    key,
    iv,
    currentEv,
    level,
    natureId,
  );
  const target = current + delta;
  const meaningful = meaningfulEvsAtLevel(
    species,
    key,
    iv,
    natureId,
    level,
    maxAllowed,
  );
  let best: number | null = null;
  for (const ev of meaningful) {
    const value = calcGen3StatValue(species, key, iv, ev, level, natureId);
    if (value !== target) continue;
    if (best == null) {
      best = ev;
      continue;
    }
    if (delta > 0 && ev < best) best = ev;
    if (delta < 0 && ev > best) best = ev;
  }
  return best;
}

/** @deprecated Prefer findEvForLevelDeltaGen3 with an explicit level. */
export function findEvForLevel50DeltaGen3(
  species: PokemonSpecies,
  key: keyof Gen2StatBlock,
  iv: number,
  currentEv: number,
  natureId: NatureId | null | undefined,
  maxAllowed: number,
  delta: 1 | -1,
): number | null {
  return findEvForLevelDeltaGen3(
    species,
    key,
    iv,
    currentEv,
    natureId,
    50,
    maxAllowed,
    delta,
  );
}
