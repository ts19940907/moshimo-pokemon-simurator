import { afterEach, describe, expect, it, vi } from "vitest";

import gen3Moves from "../data/gen3-moves.json";
import { EMPTY_EFFECT_META, type Move } from "../pokemon/moves";
import { applyMoveTypeForGeneration } from "../pokemon/moveTypeByGeneration";
import { isMoveUsableInRules, isToolUsableInRules } from "../pokemon/rulesExclusions";
import { moveForUse } from "./moveVariants";
import { forceHits, idleMove, makeFighter, runTurn } from "./test/harness";

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

describe("2世代以前で除外する3世代の技・道具", () => {
  const excludedMoves = [272, 285, 266, 270, 258, 293];
  const excludedTools = [136, 137, 138, 139, 140];

  it("なりきり・スキルスワップ・このゆびとまれ・てだすけ・あられ・ほごしょくは2世代以前では使えない", () => {
    for (const id of excludedMoves) {
      expect(isMoveUsableInRules(id, 1)).toBe(false);
      expect(isMoveUsableInRules(id, 2)).toBe(false);
      expect(isMoveUsableInRules(id, 3)).toBe(true);
    }
    expect(isMoveUsableInRules(311, 2)).toBe(true); // ウェザーボール
    expect(isMoveUsableInRules(267, 2)).toBe(true); // しぜんのちから
    expect(isMoveUsableInRules(290, 2)).toBe(true); // ひみつのちから
  });

  it("フィラ・ウイ・マゴ・バンジ・イアのみは2世代以前では使えない", () => {
    for (const id of excludedTools) {
      expect(isToolUsableInRules(id, 1)).toBe(false);
      expect(isToolUsableInRules(id, 2)).toBe(false);
      expect(isToolUsableInRules(id, 3)).toBe(true);
    }
    expect(isToolUsableInRules(135, 2)).toBe(true); // オボンのみ
  });

  it("トリック・リサイクルは初代ルールでのみ使えない", () => {
    for (const id of [271, 278]) {
      expect(isMoveUsableInRules(id, 1)).toBe(false);
      expect(isMoveUsableInRules(id, 2)).toBe(true);
      expect(isMoveUsableInRules(id, 3)).toBe(true);
    }
    expect(isMoveUsableInRules(282, 1)).toBe(true); // はたきおとす
    expect(isMoveUsableInRules(343, 1)).toBe(true); // ほしがる
    expect(isMoveUsableInRules(168, 1)).toBe(true); // どろぼう
  });
});

describe("初代ルールのウェザーボール", () => {
  it("天気に関係なく威力50のノーマル技のまま", () => {
    const ball = applyMoveTypeForGeneration(gen3Move(311), 1);
    for (const weather of ["rain", "sun", "sand", null]) {
      expect(moveForUse(ball, null, weather, 1)).toMatchObject({ type_id: 1, power: 50 });
    }
  });
});

describe("2世代ルールのウェザーボール", () => {
  it("あめ・はれ・すなあらしでタイプが変わり、威力が2倍になる", () => {
    const ball = applyMoveTypeForGeneration(gen3Move(311), 2);
    expect(moveForUse(ball, null, "rain", 2)).toMatchObject({ type_id: 3, power: 100 });
    expect(moveForUse(ball, null, "sun", 2)).toMatchObject({ type_id: 2, power: 100 });
    expect(moveForUse(ball, null, "sand", 2)).toMatchObject({ type_id: 13, power: 100 });
    expect(moveForUse(ball, null, null, 2)).toMatchObject({ type_id: 1, power: 50 });
  });
});

describe("2世代以前のしぜんのちから・ひみつのちから", () => {
  it("しぜんのちからは威力60・必中のノーマル技になる", () => {
    for (const gen of [1, 2]) {
      expect(applyMoveTypeForGeneration(gen3Move(267), gen)).toMatchObject({
        type_id: 1,
        damage_class: "physical",
        power: 60,
        accuracy: null,
        effect_category: "damage",
      });
    }
    expect(applyMoveTypeForGeneration(gen3Move(267), 3).power).toBeNull();
  });

  it("しぜんのちからで相手にダメージを与えられる", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "アタック", hp: 999 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 999 });
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: applyMoveTypeForGeneration(gen3Move(267), 2) },
      actionB: { type: "move", move: idleMove("マト待機") },
      rulesGeneration: 2,
    });
    expect(b.currentHp).toBeLessThan(b.maxHp);
    expect(b.status).toBeNull();
  });

  it("ひみつのちからは追加効果がない", () => {
    const secret = applyMoveTypeForGeneration(gen3Move(290), 2);
    expect(secret).toMatchObject({ type_id: 1, power: 70 });
    expect(secret.effect_meta?.ailment).toBeNull();
    expect(secret.effect_meta?.ailment_chance).toBe(0);
    expect(secret.effect_meta?.stat_chance).toBe(0);
  });
});
