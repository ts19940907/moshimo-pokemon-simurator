import { afterEach, describe, expect, it, vi } from "vitest";

import gen3Moves from "../data/gen3-moves.json";
import { EMPTY_EFFECT_META, type Move } from "../pokemon/moves";
import {
  GEN1_MOVE_POOL,
  isMetronomeBanned,
  pickMetronomeMove,
} from "./gen1MovePool";
import { idleMove, makeFighter, runTurn } from "./test/harness";

afterEach(() => {
  vi.restoreAllMocks();
});

function gen3Move(pokeapiId: number): Move {
  const found = (gen3Moves as Move[]).find((m) => m.pokeapi_id === pokeapiId);
  if (!found) throw new Error(`Gen3 move ${pokeapiId} not found`);
  return {
    ...found,
    effect_meta: { ...EMPTY_EFFECT_META, ...(found.effect_meta ?? {}) },
  };
}

function gen1Move(pokeapiId: number): Move {
  const found = GEN1_MOVE_POOL.find((m) => m.pokeapi_id === pokeapiId);
  if (!found) throw new Error(`Gen1 move ${pokeapiId} not found`);
  return found;
}

describe("ゆびをふるの候補", () => {
  it("渡した技リストから選ぶ", () => {
    const blaze = gen3Move(299); // ブレイズキック
    const picks = new Set<number>();
    for (const r of [0, 0.5, 0.99]) {
      vi.spyOn(Math, "random").mockReturnValue(r);
      picks.add(pickMetronomeMove([blaze], 3).pokeapi_id);
    }
    expect([...picks]).toEqual([299]);
  });

  it("世代ごとの除外技は選ばれない", () => {
    expect(isMetronomeBanned(118, 1)).toBe(true); // ゆびをふる
    expect(isMetronomeBanned(182, 1)).toBe(false); // まもる
    expect(isMetronomeBanned(182, 2)).toBe(true); // まもる
    expect(isMetronomeBanned(68, 2)).toBe(true); // カウンター
    expect(isMetronomeBanned(274, 2)).toBe(false); // ねこのて
    expect(isMetronomeBanned(274, 3)).toBe(true); // ねこのて
    expect(isMetronomeBanned(264, 3)).toBe(true); // きあいパンチ
    expect(isMetronomeBanned(299, 3)).toBe(false); // ブレイズキック
  });

  it("除外技しか無いリストからは選ばない", () => {
    const metronome = gen1Move(118);
    const picked = pickMetronomeMove([metronome], 1);
    expect(picked.pokeapi_id).not.toBe(118);
  });

  it("候補が空なら初代の技から選ぶ", () => {
    const picked = pickMetronomeMove([], 1);
    expect(GEN1_MOVE_POOL.some((m) => m.pokeapi_id === picked.pokeapi_id)).toBe(true);
  });

  it("対戦でルールの技リストから3世代の技が出る", () => {
    const a = makeFighter({ side: "a", nameJa: "ピッピ", hp: 999 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 999 });
    const { result } = runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen1Move(118) },
      actionB: { type: "move", move: idleMove("マト待機") },
      rulesGeneration: 3,
      metronomePool: [gen3Move(299)],
    });
    const logs = result.steps.flatMap((step) => step.logs).join("\n");
    expect(logs).toContain("ブレイズキックが　でた！");
  });
});
