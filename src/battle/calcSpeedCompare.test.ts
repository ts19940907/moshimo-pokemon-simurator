import { describe, expect, it } from "vitest";

import type { PartyMemberBuild } from "../party/types";
import type { PokemonSpecies } from "../pokemon/types";
import { compareSpeeds, type SpeedSideInput } from "./calcSpeedCompare";

const bulbasaur = {
  type1: 12,
  base_hp: 45,
  base_attack: 49,
  base_defense: 49,
  base_special: 65,
  base_sp_attack: 65,
  base_sp_defense: 65,
  base_speed: 45,
} as PokemonSpecies;

function side(
  build: Partial<PartyMemberBuild>,
  rulesGeneration: number,
): SpeedSideInput {
  const zero = {
    hp: 0,
    attack: 0,
    defense: 0,
    special: 0,
    sp_attack: 0,
    sp_defense: 0,
    speed: 0,
  };
  return {
    species: bulbasaur,
    build: {
      dexNo: 1,
      level: 50,
      iv: { ...zero, speed: 31 },
      statExp: { ...zero },
      moveIds: [],
      ...build,
    } as PartyMemberBuild,
    speedStage: 0,
    paralyzed: false,
    rulesGeneration,
  };
}

describe("compareSpeeds", () => {
  it("applies the Gen3 formula and nature under Gen3 rules", () => {
    const result = compareSpeeds(
      side({ natureId: "jolly" }, 3),
      side({ natureId: "hardy" }, 3),
    );
    // floor((2*45 + 31) * 50 / 100) + 5 = 65, jolly: floor(65 * 1.1) = 71
    expect(result.selfSpeed).toBe(71);
    expect(result.foeSpeed).toBe(65);
    expect(result.verdict).toBe("outspeed");
  });

  it("doubles speed with Chlorophyll only in sun, after paralysis", () => {
    const chlorophyll = 34;
    const sunny = compareSpeeds(
      { ...side({}, 3), abilityId: chlorophyll, weatherId: "sun" },
      side({}, 3),
    );
    expect(sunny.selfSpeed).toBe(130);
    const rainy = compareSpeeds(
      { ...side({}, 3), abilityId: chlorophyll, weatherId: "rain" },
      side({}, 3),
    );
    expect(rainy.selfSpeed).toBe(65);
    const paralyzed = compareSpeeds(
      {
        ...side({}, 3),
        paralyzed: true,
        abilityId: chlorophyll,
        weatherId: "sun",
      },
      side({}, 3),
    );
    // floor(65 / 4) = 16, then ×2
    expect(paralyzed.selfSpeed).toBe(32);
  });

  it("applies Choice Scarf and Quick Feet under Gen4 rules", () => {
    const scarf = compareSpeeds(side({ toolPokeapiId: 264 }, 4), side({}, 4));
    // 65 × 1.5
    expect(scarf.selfSpeed).toBe(97);
    const quickFeet = compareSpeeds(
      { ...side({}, 4), paralyzed: true, abilityId: 95 },
      side({}, 4),
    );
    // Paralysis drop ignored, ×1.5 while statused
    expect(quickFeet.selfSpeed).toBe(97);
  });

  it("suggests Gen3 IV / EV values within Gen3 caps", () => {
    const self = side({ iv: { ...side({}, 3).build.iv, speed: 20 } }, 3);
    const foe = side({ statExp: { ...side({}, 3).build.statExp, speed: 4 } }, 3);
    const result = compareSpeeds(self, foe);
    expect(result.verdict).toBe("underspeed");
    const evTip = result.tips.find((tip) => tip.id === "self-stat-exp");
    expect(evTip?.label).toMatch(/すばやさ努力値を \d+ 以上/);
    const needed = Number(evTip?.label.match(/(\d+) 以上/)?.[1]);
    expect(needed).toBeLessThanOrEqual(255);
  });
});
