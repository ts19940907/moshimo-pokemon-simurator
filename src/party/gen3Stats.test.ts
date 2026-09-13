import { describe, expect, it } from "vitest";

import type { PokemonSpecies } from "../pokemon/types";
import {
  calcGen3Hp,
  calcGen3OtherStatBeforeNature,
  calcGen3StatValue,
  calcGen3Stats,
  clampEvToMeaningfulAtLevel,
  GEN3_EV_PER_STAT_MAX,
  GEN3_EV_TOTAL_MAX,
  gen3EvTerm,
  maxEvForKey,
  maxMeaningfulEvAtLevel,
  meaningfulEvsAtLevel,
  snapEvToMeaningful,
} from "./gen3Stats";
import type { Gen1StatBlock } from "./types";

const bulbasaur = {
  base_hp: 45,
  base_attack: 49,
  base_defense: 49,
  base_special: 65,
  base_sp_attack: 65,
  base_sp_defense: 65,
  base_speed: 45,
} as PokemonSpecies;

describe("gen3Stats", () => {
  it("uses floor(EV/4) as the EV term", () => {
    expect(gen3EvTerm(0)).toBe(0);
    expect(gen3EvTerm(3)).toBe(0);
    expect(gen3EvTerm(4)).toBe(1);
    expect(gen3EvTerm(252)).toBe(63);
    expect(gen3EvTerm(255)).toBe(63);
  });

  it("matches Gen3 HP formula at Lv50 with 31 IV / 0 EV", () => {
    // floor((2*45 + 31 + 0) * 50 / 100) + 50 + 10 = floor(60.5) + 60 = 120
    expect(calcGen3Hp(45, 31, 0, 50)).toBe(120);
  });

  it("applies nature after the +5 step", () => {
    const before = calcGen3OtherStatBeforeNature(49, 31, 0, 50);
    // floor((2*49 + 31 + 0) * 50 / 100) + 5 = floor(64.5) + 5 = 69
    expect(before).toBe(69);
    expect(calcGen3StatValue(bulbasaur, "attack", 31, 0, 50, "adamant")).toBe(
      Math.floor(69 * 1.1),
    );
    expect(calcGen3StatValue(bulbasaur, "attack", 31, 0, 50, "modest")).toBe(
      Math.floor(69 * 0.9),
    );
  });

  it("caps a single EV by remaining total budget", () => {
    const block: Gen1StatBlock = {
      hp: 252,
      attack: 252,
      defense: 0,
      special: 0,
      sp_attack: 0,
      sp_defense: 0,
      speed: 0,
    };
    expect(maxEvForKey(block, "speed")).toBe(GEN3_EV_TOTAL_MAX - 504);
    expect(maxEvForKey(block, "speed")).toBeLessThanOrEqual(
      GEN3_EV_PER_STAT_MAX,
    );
  });

  it("excludes wasteful EVs like 253–255 at Lv50", () => {
    const meaningful = meaningfulEvsAtLevel(
      bulbasaur,
      "attack",
      31,
      "hardy",
      50,
      255,
    );
    expect(meaningful).not.toContain(253);
    expect(meaningful).not.toContain(255);
    expect(meaningful[meaningful.length - 1]).toBe(252);
    expect(snapEvToMeaningful(255, meaningful)).toBe(252);
    expect(snapEvToMeaningful(250, meaningful)).toBeLessThanOrEqual(250);
    expect(meaningful).toContain(snapEvToMeaningful(250, meaningful));
    // Intermediate values that don't change the real stat are snapped down.
    expect(snapEvToMeaningful(250, meaningful)).toBe(
      [...meaningful].reverse().find((ev) => ev <= 250),
    );
    expect(
      clampEvToMeaningfulAtLevel(bulbasaur, "attack", 31, 255, "hardy", 50, 255),
    ).toBe(252);
    expect(
      maxMeaningfulEvAtLevel(bulbasaur, "attack", 31, "hardy", 50, 255),
    ).toBe(252);
  });

  it("calcGen3Stats returns all six battle stats", () => {
    const stats = calcGen3Stats(bulbasaur, {
      level: 50,
      iv: {
        hp: 31,
        attack: 31,
        defense: 31,
        special: 31,
        sp_attack: 31,
        sp_defense: 31,
        speed: 31,
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
      natureId: "hardy",
    });
    expect(stats.hp).toBe(120);
    expect(stats.attack).toBe(69);
    expect(stats.defense).toBe(69);
    expect(stats.sp_attack).toBe(85);
    expect(stats.sp_defense).toBe(85);
    expect(stats.speed).toBe(65);
  });
});
