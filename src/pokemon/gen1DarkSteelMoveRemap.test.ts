import { describe, expect, it } from "vitest";

import gen2Moves from "../data/gen2-moves.json";
import { filterByGenerationAvailability } from "../match-setup/generationFilter";
import {
  isGen2DarkOrSteelMove,
  remapGen2DarkSteelMoveForGen1,
} from "./gen1DarkSteelMoveRemap";
import { EMPTY_EFFECT_META, type Move } from "./moves";

const GEN2_MOVES = gen2Moves as Move[];

const DARK = 16;
const STEEL = 17;
const NORMAL = 1;

const GEN2_DARK_STEEL_MOVES = GEN2_MOVES.filter(isGen2DarkOrSteelMove);

function withGen1RemapPair(move: Move): Move[] {
  return [move, remapGen2DarkSteelMoveForGen1(move)];
}

describe("gen1 Dark/Steel move remap", () => {
  it("covers every Gen2 debut Dark/Steel move in seed JSON", () => {
    expect(GEN2_DARK_STEEL_MOVES.map((m) => m.pokeapi_id).sort((a, b) => a - b)).toEqual([
      168, // どろぼう
      185, // だましうち
      211, // はがねのつばさ
      228, // おいうち
      231, // アイアンテール
      232, // メタルクロー
      242, // かみくだく
      251, // ふくろだたき
    ]);
  });

  it.each(GEN2_DARK_STEEL_MOVES)(
    "$name_ja → Gen1 row is Normal + physical (status stays status)",
    (move) => {
      const remapped = remapGen2DarkSteelMoveForGen1(move);
      expect(remapped.type_id).toBe(NORMAL);
      expect(remapped.available_generations).toBe(1);
      expect(remapped.introduced_generation).toBe(2);
      expect(remapped.pokeapi_id).toBe(move.pokeapi_id);
      if (move.damage_class === "status") {
        expect(remapped.damage_class).toBe("status");
      } else {
        expect(remapped.damage_class).toBe("physical");
      }
      // Gen2 row stays Dark/Steel
      expect(move.type_id === DARK || move.type_id === STEEL).toBe(true);
      expect(move.available_generations & 2).not.toBe(0);
    },
  );

  it("rewrites special-attack / special-defense stage changes to special on Gen1 row only", () => {
    const base = GEN2_DARK_STEEL_MOVES[0];
    const withSpaSpd: Move = {
      ...base,
      effect_meta: {
        ...EMPTY_EFFECT_META,
        ...base.effect_meta,
        stat_changes: [
          { stat: "special-attack", change: 1 },
          { stat: "special-defense", change: -1 },
          { stat: "defense", change: 1 },
        ],
      },
    };
    const remapped = remapGen2DarkSteelMoveForGen1(withSpaSpd);
    expect(remapped.effect_meta.stat_changes).toEqual([
      { stat: "special", change: 1 },
      { stat: "special", change: -1 },
      { stat: "defense", change: 1 },
    ]);
    expect(withSpaSpd.effect_meta.stat_changes[0]?.stat).toBe("special-attack");
  });
});

describe("filterByGenerationAvailability + Dark/Steel Gen1 remaps", () => {
  const catalog = GEN2_DARK_STEEL_MOVES.flatMap(withGen1RemapPair);

  it("Gen1 rules + Gen2 move pool selects Normal physical remaps", () => {
    const selected = filterByGenerationAvailability(
      catalog,
      {
        syncWithRules: false,
        rulesGeneration: 1,
        introducedGenerations: [1, 2],
      },
      (move) => String(move.pokeapi_id),
    );

    expect(selected).toHaveLength(GEN2_DARK_STEEL_MOVES.length);
    for (const move of selected) {
      expect(move.type_id).toBe(NORMAL);
      expect(move.available_generations).toBe(1);
      if (move.damage_class !== "status") {
        expect(move.damage_class).toBe("physical");
      }
    }
  });

  it("Gen2 rules + Gen2 move pool keeps original Dark/Steel rows", () => {
    const selected = filterByGenerationAvailability(
      catalog,
      {
        syncWithRules: false,
        rulesGeneration: 2,
        introducedGenerations: [2],
      },
      (move) => String(move.pokeapi_id),
    );

    expect(selected).toHaveLength(GEN2_DARK_STEEL_MOVES.length);
    for (const move of selected) {
      expect(move.type_id === DARK || move.type_id === STEEL).toBe(true);
      expect(move.available_generations & 2).not.toBe(0);
    }
  });

  it("sync ON + Gen1 rules excludes Gen2-only Dark/Steel rows (no Gen1 bit)", () => {
    const gen2Only = GEN2_DARK_STEEL_MOVES;
    const selected = filterByGenerationAvailability(
      gen2Only,
      {
        syncWithRules: true,
        rulesGeneration: 1,
        introducedGenerations: [1],
      },
      (move) => String(move.pokeapi_id),
    );
    expect(selected).toHaveLength(0);
  });
});
