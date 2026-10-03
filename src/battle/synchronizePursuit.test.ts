import { afterEach, describe, expect, it, vi } from "vitest";

import { ABILITY, canSwitchAway, switchBlockedLogs } from "./abilityEffects";
import { getMoveByPokeapiId } from "./gen1MovePool";
import { pursuitSideAgainstSwitch, resolveTurnSteps } from "./resolveTurn";
import { forceHits, gen2MoveByPokeapiId, idleMove, makeFighter, runTurn } from "./test/harness";
import { createBattleField, type BattleAction } from "./types";

afterEach(() => {
  vi.restoreAllMocks();
});

function gen1Move(pokeapiId: number) {
  const found = getMoveByPokeapiId(pokeapiId);
  if (!found) throw new Error(`Gen1 move ${pokeapiId} not found`);
  return { ...found, accuracy: found.accuracy == null ? null : 100 };
}

describe("シンクロ", () => {
  it("でんじはでまひしたら相手もまひする", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "アタック" });
    const b = makeFighter({ side: "b", nameJa: "シンクロン" });
    b.abilityPokeapiId = ABILITY.SYNCHRONIZE;
    b.abilityNameJa = "シンクロ";
    const { result } = runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen1Move(86) },
      rulesGeneration: 3,
    });
    const logs = result.steps.flatMap((s) => s.logs);
    expect(b.status).toBe("paralysis");
    expect(a.status).toBe("paralysis");
    expect(logs).toContain("シンクロンの　シンクロ！");
    expect(logs).toContain("アタックは　まひした！");
  });

  it("ねむり（さいみんじゅつ）はうつさない", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "アタック" });
    const b = makeFighter({ side: "b", nameJa: "シンクロン" });
    b.abilityPokeapiId = ABILITY.SYNCHRONIZE;
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen1Move(95) },
      rulesGeneration: 3,
    });
    expect(b.status).toBe("sleep");
    expect(a.status).toBeNull();
  });
});

describe("交代を封じる特性", () => {
  it("じりょくではがねタイプを捕らえ、特性名と一緒に表示する", () => {
    const self = makeFighter({ side: "a", nameJa: "ハガネ", type1: 17 });
    const foe = makeFighter({ side: "b", nameJa: "コイル" });
    foe.abilityPokeapiId = ABILITY.MAGNET_PULL;
    foe.abilityNameJa = "じりょく";
    expect(canSwitchAway(self, foe)).toBe(false);
    expect(switchBlockedLogs(self, foe)).toEqual([
      "コイルの　じりょく！",
      "ハガネは　逃げられない！",
    ]);
  });

  it("3世代のかげふみは、かげふみ同士でも逃げられない", () => {
    const self = makeFighter({ side: "a", nameJa: "ソーナンス" });
    const foe = makeFighter({ side: "b", nameJa: "ソーナノ" });
    self.abilityPokeapiId = ABILITY.SHADOW_TAG;
    foe.abilityPokeapiId = ABILITY.SHADOW_TAG;
    expect(canSwitchAway(self, foe)).toBe(false);
  });

  it("くろいまなざしは特性名を出さない", () => {
    const self = makeFighter({ side: "a", nameJa: "ツカマリ" });
    const foe = makeFighter({ side: "b", nameJa: "アイテ" });
    self.volatiles.cannotEscape = true;
    expect(switchBlockedLogs(self, foe)).toEqual(["ツカマリは　逃げられない！"]);
  });
});

describe("おいうち", () => {
  it("交代する側を狙ったときだけ交代前に発動する", () => {
    const pursuit: BattleAction = {
      type: "move",
      move: gen2MoveByPokeapiId(228),
    };
    const sw: BattleAction = { type: "switch", index: 1 };
    const idle: BattleAction = { type: "move", move: idleMove() };
    expect(pursuitSideAgainstSwitch(pursuit, sw, 3)).toBe("a");
    expect(pursuitSideAgainstSwitch(sw, pursuit, 3)).toBe("b");
    expect(pursuitSideAgainstSwitch(pursuit, idle, 3)).toBeNull();
  });

  it("交代前の一撃は威力2倍で、本処理では再行動しない", () => {
    forceHits();
    const field = createBattleField();
    const pursuit: BattleAction = {
      type: "move",
      move: gen2MoveByPokeapiId(228),
    };
    const sw: BattleAction = { type: "switch", index: 1 };

    const a1 = makeFighter({ side: "a", nameJa: "オイウチ" });
    const b1 = makeFighter({ side: "b", nameJa: "ニゲル", hp: 999 });
    resolveTurnSteps({
      fighterA: a1,
      fighterB: b1,
      actionA: pursuit,
      actionB: { type: "move", move: idleMove() },
      field,
      rulesGeneration: 3,
    });
    const normal = b1.maxHp - b1.currentHp;

    const a2 = makeFighter({ side: "a", nameJa: "オイウチ" });
    const b2 = makeFighter({ side: "b", nameJa: "ニゲル", hp: 999 });
    const pre = resolveTurnSteps({
      fighterA: a2,
      fighterB: b2,
      actionA: pursuit,
      actionB: sw,
      field: createBattleField(),
      rulesGeneration: 3,
      pursuitSide: "a",
    });
    const doubled = b2.maxHp - b2.currentHp;
    expect(doubled).toBeGreaterThan(normal * 1.8);
    expect(pre.steps.some((s) => s.ppSpent)).toBe(true);

    const b3 = makeFighter({ side: "b", nameJa: "コウタイ", hp: 999 });
    const main = resolveTurnSteps({
      fighterA: a2,
      fighterB: b3,
      actionA: pursuit,
      actionB: sw,
      field: createBattleField(),
      rulesGeneration: 3,
      skipSides: ["a"],
    });
    expect(b3.currentHp).toBe(b3.maxHp);
    expect(main.steps.some((s) => s.logs.includes("オイウチの　おいうち！"))).toBe(false);
  });
});
