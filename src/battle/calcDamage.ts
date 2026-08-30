import type { Gen1StatBlock } from "../party/types";
import type { Move } from "../pokemon/moves";
import type { PokemonSpecies } from "../pokemon/types";
import { gen1TypeEffectiveness } from "./gen1TypeChart";
import { heldItemDamageMultiplier } from "./toolEffects";
import { stagedStat } from "./types";

/** Extensible bag for future weather / items / abilities / terrain. */
export type DamageCalcModifiers = {
  crit: boolean;
  attackerBurn: boolean;
  defenderReflect: boolean;
  defenderLightScreen: boolean;
  /** Reserved — ignored in Gen1 formula for now. */
  weatherId?: string | null;
  terrainId?: string | null;
  attackerItemId?: string | null;
  defenderItemId?: string | null;
  /** PokeAPI held-item id for type-boost damage (Gen2+). */
  attackerItemPokeapiId?: number | null;
  attackerAbilityId?: string | null;
  defenderAbilityId?: string | null;
};

export type DamageCalcSides = {
  attackerLevel: number;
  attackerSpecies: PokemonSpecies;
  attackerStats: Gen1StatBlock;
  attackerAttackStage: number;
  attackerSpecialStage: number;
  defenderSpecies: PokemonSpecies;
  defenderStats: Gen1StatBlock;
  defenderDefenseStage: number;
  defenderSpecialStage: number;
  /** Used for Super Fang; defaults to max HP when omitted. */
  defenderCurrentHp?: number;
};

export type DamageRangeResult = {
  min: number;
  max: number;
  typeEffectiveness: number;
  immune: boolean;
  isFixed: boolean;
  minPercent: number;
  maxPercent: number;
  power: number;
  /** e.g. 確定1発 / 乱数2発. Null when no damage. */
  koLabel: string | null;
};

/**
 * Smallest hit-count KO label.
 * - 確定N発: N × minDamage >= HP
 * - 乱数N発: N × minDamage < HP <= N × maxDamage
 */
export function formatKoCount(
  minDamage: number,
  maxDamage: number,
  maxHp: number,
): string | null {
  if (minDamage <= 0 || maxDamage <= 0 || maxHp <= 0) return null;
  for (let n = 1; n <= 16; n += 1) {
    if (n * minDamage >= maxHp) return `確定${n}発`;
    if (n * maxDamage >= maxHp) return `乱数${n}発`;
  }
  return "16発以上";
}

function stab(moveType: number, species: PokemonSpecies): number {
  if (moveType === species.type1 || moveType === species.type2) return 1.5;
  return 1;
}

function clampStage(stage: number): number {
  return Math.max(-6, Math.min(6, Math.trunc(stage)));
}

/**
 * Fixed-damage moves (Sonic Boom, Dragon Rage, …).
 * Returns a closed range; Psywave is 1..floor(1.5*level).
 */
export function fixedDamageRange(
  move: Move,
  attackerLevel: number,
  defenderCurrentHp: number,
): { min: number; max: number } | null {
  switch (move.pokeapi_id) {
    case 49: // Sonic Boom
      return { min: 20, max: 20 };
    case 82: // Dragon Rage
      return { min: 40, max: 40 };
    case 69: // Seismic Toss
    case 101: // Night Shade
      return { min: attackerLevel, max: attackerLevel };
    case 162: // Super Fang
      return {
        min: Math.max(1, Math.floor(defenderCurrentHp / 2)),
        max: Math.max(1, Math.floor(defenderCurrentHp / 2)),
      };
    case 149: {
      // Psywave Gen1: 1..1.5*level
      const max = Math.max(1, Math.floor((attackerLevel * 3) / 2));
      return { min: 1, max };
    }
    default:
      return null;
  }
}

/**
 * Gen1 damage before the 217–255 random roll (and before min-1 clamp on roll).
 * Returns 0 for immune / zero-power.
 */
export function damageBeforeRandom(
  sides: DamageCalcSides,
  move: Move,
  modifiers: DamageCalcModifiers,
): { damage: number; typeEffectiveness: number } {
  const power = move.power ?? 0;
  if (power <= 0) {
    return { damage: 0, typeEffectiveness: 1 };
  }

  const typeEffectiveness = gen1TypeEffectiveness(
    move.type_id,
    sides.defenderSpecies.type1,
    sides.defenderSpecies.type2,
  );
  if (typeEffectiveness === 0) {
    return { damage: 0, typeEffectiveness: 0 };
  }

  const isPhysical = move.damage_class === "physical";
  const atkStat = isPhysical
    ? sides.attackerStats.attack
    : (sides.attackerStats.sp_attack ?? sides.attackerStats.special);
  const defStat = isPhysical
    ? sides.defenderStats.defense
    : (sides.defenderStats.sp_defense ?? sides.defenderStats.special);
  const atkStage = clampStage(
    isPhysical ? sides.attackerAttackStage : sides.attackerSpecialStage,
  );
  const defStage = clampStage(
    isPhysical ? sides.defenderDefenseStage : sides.defenderSpecialStage,
  );

  let A = stagedStat(atkStat, atkStage, { crit: modifiers.crit });
  let D = stagedStat(defStat, defStage, { crit: modifiers.crit });
  if (modifiers.attackerBurn && isPhysical) {
    A = Math.max(1, Math.floor(A / 2));
  }

  const level = modifiers.crit
    ? sides.attackerLevel * 2
    : sides.attackerLevel;

  let damage = Math.floor(
    Math.floor(
      (Math.floor((2 * level) / 5 + 2) * power * A) / Math.max(1, D),
    ) /
      50 +
      2,
  );
  damage = Math.floor(damage * stab(move.type_id, sides.attackerSpecies));
  damage = Math.floor(damage * typeEffectiveness);
  damage = Math.floor(
    damage *
      heldItemDamageMultiplier(
        move.type_id,
        modifiers.attackerItemPokeapiId ?? null,
      ),
  );

  if (!modifiers.crit) {
    if (isPhysical && modifiers.defenderReflect) {
      damage = Math.max(1, Math.floor(damage / 2));
    }
    if (
      !isPhysical &&
      move.damage_class === "special" &&
      modifiers.defenderLightScreen
    ) {
      damage = Math.max(1, Math.floor(damage / 2));
    }
  }

  return { damage, typeEffectiveness };
}

export function applyDamageRoll(beforeRandom: number, rand217to255: number): number {
  if (beforeRandom <= 0) return 0;
  return Math.max(1, Math.floor((beforeRandom * rand217to255) / 255));
}

function percentOf(damage: number, maxHp: number): number {
  if (maxHp <= 0) return 0;
  return Math.round((damage / maxHp) * 1000) / 10;
}

export function calcDamageRange(
  sides: DamageCalcSides,
  move: Move,
  modifiers: DamageCalcModifiers,
): DamageRangeResult {
  const defenderMaxHp = Math.max(1, sides.defenderStats.hp);
  const defenderCurrentHp = sides.defenderCurrentHp ?? defenderMaxHp;

  const fixed = fixedDamageRange(move, sides.attackerLevel, defenderCurrentHp);
  if (fixed) {
    return {
      min: fixed.min,
      max: fixed.max,
      typeEffectiveness: 1,
      immune: false,
      isFixed: true,
      minPercent: percentOf(fixed.min, defenderMaxHp),
      maxPercent: percentOf(fixed.max, defenderMaxHp),
      power: move.power ?? 0,
      koLabel: formatKoCount(fixed.min, fixed.max, defenderMaxHp),
    };
  }

  const power = move.power ?? 0;
  const { damage: before, typeEffectiveness } = damageBeforeRandom(
    sides,
    move,
    modifiers,
  );

  if (typeEffectiveness === 0) {
    return {
      min: 0,
      max: 0,
      typeEffectiveness: 0,
      immune: true,
      isFixed: false,
      minPercent: 0,
      maxPercent: 0,
      power,
      koLabel: null,
    };
  }

  if (before <= 0) {
    return {
      min: 0,
      max: 0,
      typeEffectiveness,
      immune: false,
      isFixed: false,
      minPercent: 0,
      maxPercent: 0,
      power,
      koLabel: null,
    };
  }

  const min = applyDamageRoll(before, 217);
  const max = applyDamageRoll(before, 255);
  return {
    min,
    max,
    typeEffectiveness,
    immune: false,
    isFixed: false,
    minPercent: percentOf(min, defenderMaxHp),
    maxPercent: percentOf(max, defenderMaxHp),
    power,
    koLabel: formatKoCount(min, max, defenderMaxHp),
  };
}
