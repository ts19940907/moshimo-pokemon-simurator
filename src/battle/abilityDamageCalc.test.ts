import { describe, expect, it } from "vitest";

import type { Move } from "../pokemon/moves";
import {
  ABILITY,
  abilityBlockingDamage,
  abilityDamageMultipliersFor,
  type AbilityDamageContext,
} from "./abilityEffects";

function move(partial: Partial<Move>): Move {
  return {
    id: "m",
    pokeapi_id: 1,
    name_ja: "わざ",
    type_id: 1,
    power: 80,
    accuracy: 100,
    pp: 10,
    damage_class: "physical",
    ...partial,
  } as Move;
}

const base: AbilityDamageContext = {
  attackerAbility: null,
  defenderAbility: null,
  attackerStatused: false,
  defenderStatused: false,
  attackerPinch: false,
  flashFireActive: false,
};

describe("abilityDamageMultipliersFor", () => {
  it("doubles physical damage for Huge Power only", () => {
    const ctx = { ...base, attackerAbility: ABILITY.HUGE_POWER };
    expect(abilityDamageMultipliersFor(ctx, move({})).total).toBe(2);
    expect(
      abilityDamageMultipliersFor(ctx, move({ damage_class: "special" })).total,
    ).toBe(1);
  });

  it("halves Fire / Ice damage against Thick Fat", () => {
    const ctx = { ...base, defenderAbility: ABILITY.THICK_FAT };
    const result = abilityDamageMultipliersFor(ctx, move({ type_id: 2 }));
    expect(result.defender).toBe(0.5);
    expect(result.attacker).toBe(1);
  });

  it("boosts matching type only in a pinch", () => {
    const ctx = { ...base, attackerAbility: ABILITY.BLAZE };
    const fire = move({ type_id: 2, damage_class: "special" });
    expect(abilityDamageMultipliersFor(ctx, fire).total).toBe(1);
    expect(
      abilityDamageMultipliersFor({ ...ctx, attackerPinch: true }, fire).total,
    ).toBe(1.5);
  });

  it("applies Guts only while statused", () => {
    const ctx = { ...base, attackerAbility: ABILITY.GUTS };
    expect(abilityDamageMultipliersFor(ctx, move({})).total).toBe(1);
    expect(
      abilityDamageMultipliersFor({ ...ctx, attackerStatused: true }, move({}))
        .total,
    ).toBe(1.5);
  });
});

describe("abilityBlockingDamage", () => {
  it("blocks Ground moves with Levitate", () => {
    expect(
      abilityBlockingDamage(null, ABILITY.LEVITATE, move({ type_id: 9 }), 1),
    ).toBe(ABILITY.LEVITATE);
  });

  it("lets only super-effective moves through Wonder Guard", () => {
    expect(
      abilityBlockingDamage(null, ABILITY.WONDER_GUARD, move({}), 1),
    ).toBe(ABILITY.WONDER_GUARD);
    expect(
      abilityBlockingDamage(null, ABILITY.WONDER_GUARD, move({}), 2),
    ).toBeNull();
  });

  it("absorbs matching types", () => {
    expect(
      abilityBlockingDamage(null, ABILITY.WATER_ABSORB, move({ type_id: 3 }), 1),
    ).toBe(ABILITY.WATER_ABSORB);
    expect(
      abilityBlockingDamage(null, ABILITY.FLASH_FIRE, move({ type_id: 2 }), 1),
    ).toBe(ABILITY.FLASH_FIRE);
  });

  it("stops Explosion when either side has Damp", () => {
    expect(
      abilityBlockingDamage(ABILITY.DAMP, null, move({ pokeapi_id: 153 }), 1),
    ).toBe(ABILITY.DAMP);
  });
});
