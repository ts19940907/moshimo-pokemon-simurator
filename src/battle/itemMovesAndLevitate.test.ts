import { afterEach, describe, expect, it, vi } from "vitest";

import gen3Moves from "../data/gen3-moves.json";
import { EMPTY_EFFECT_META, type Move } from "../pokemon/moves";
import { ABILITY } from "./abilityEffects";
import { getMoveByPokeapiId } from "./gen1MovePool";
import { forceHits, gen2MoveByPokeapiId, makeFighter, runTurn } from "./test/harness";
import type { BattleFighter, TurnStep } from "./types";

const LEFTOVERS = 211;
const QUICK_CLAW = 194;

afterEach(() => {
  vi.restoreAllMocks();
});

function gen3Move(pokeapiId: number): Move {
  const found = (gen3Moves as Move[]).find((m) => m.pokeapi_id === pokeapiId);
  if (!found) throw new Error(`Gen3 move ${pokeapiId} not found`);
  return { ...found, effect_meta: { ...EMPTY_EFFECT_META, ...found.effect_meta } };
}

function gen1Move(pokeapiId: number): Move {
  const found = getMoveByPokeapiId(pokeapiId);
  if (!found) throw new Error(`Gen1 move ${pokeapiId} not found`);
  return { ...found, accuracy: found.accuracy == null ? null : 100 };
}

function fighters(): { a: BattleFighter; b: BattleFighter } {
  const a = makeFighter({ side: "a", nameJa: "アタック" });
  const b = makeFighter({ side: "b", nameJa: "ディフェンス" });
  return { a, b };
}

function hold(fighter: BattleFighter, pokeapiId: number): void {
  fighter.heldTool = { pokeapiId, consumed: false };
}

function allLogs(steps: TurnStep[]): string[] {
  return steps.flatMap((s) => s.logs);
}

function useMove(a: BattleFighter, b: BattleFighter, move: Move) {
  forceHits();
  return runTurn({
    fighterA: a,
    fighterB: b,
    actionA: { type: "move", move },
    rulesGeneration: 3,
  }).result;
}

describe("ふゆう", () => {
  it("じしんが無効のとき、ふゆうの発動を表示する", () => {
    const { a, b } = fighters();
    b.abilityPokeapiId = ABILITY.LEVITATE;
    b.abilityNameJa = "ふゆう";
    const logs = allLogs(useMove(a, b, gen1Move(89)).steps);
    expect(b.currentHp).toBe(b.maxHp);
    expect(logs).toContain("ディフェンスの　ふゆう！");
    expect(logs).toContain("ディフェンスには　効果がないようだ…");
  });

  it("じわれ（一撃必殺）もふゆうで無効になる", () => {
    const { a, b } = fighters();
    b.abilityPokeapiId = ABILITY.LEVITATE;
    b.abilityNameJa = "ふゆう";
    const logs = allLogs(useMove(a, b, gen1Move(90)).steps);
    expect(b.currentHp).toBe(b.maxHp);
    expect(logs).toContain("ディフェンスの　ふゆう！");
  });
});

describe("トリック", () => {
  it("持ち物を入れ替える", () => {
    const { a, b } = fighters();
    hold(a, QUICK_CLAW);
    hold(b, LEFTOVERS);
    const logs = allLogs(useMove(a, b, gen3Move(271)).steps);
    expect(a.heldTool?.pokeapiId).toBe(LEFTOVERS);
    expect(b.heldTool?.pokeapiId).toBe(QUICK_CLAW);
    expect(logs).toContain("アタックは　どうぐを　すりかえた！");
    expect(logs).toContain("アタックは　たべのこしを　手に入れた！");
  });

  it("相手がねんちゃくなら失敗する", () => {
    const { a, b } = fighters();
    hold(a, QUICK_CLAW);
    hold(b, LEFTOVERS);
    b.abilityPokeapiId = ABILITY.STICKY_HOLD;
    useMove(a, b, gen3Move(271));
    expect(a.heldTool?.pokeapiId).toBe(QUICK_CLAW);
    expect(b.heldTool?.pokeapiId).toBe(LEFTOVERS);
  });

  it("お互い持ち物がなければ失敗する", () => {
    const { a, b } = fighters();
    const logs = allLogs(useMove(a, b, gen3Move(271)).steps);
    expect(logs).toContain("しかし　うまく　決まらなかった！");
  });
});

describe("どろぼう", () => {
  it("自分が持ち物なしなら相手の持ち物を奪う", () => {
    const { a, b } = fighters();
    hold(b, LEFTOVERS);
    const logs = allLogs(useMove(a, b, gen2MoveByPokeapiId(168)).steps);
    expect(a.heldTool?.pokeapiId).toBe(LEFTOVERS);
    expect(b.heldTool).toBeNull();
    expect(logs).toContain(
      "アタックは　ディフェンスから　たべのこしを　奪い取った！",
    );
  });

  it("自分が持ち物を持っていれば奪わない", () => {
    const { a, b } = fighters();
    hold(a, QUICK_CLAW);
    hold(b, LEFTOVERS);
    useMove(a, b, gen2MoveByPokeapiId(168));
    expect(a.heldTool?.pokeapiId).toBe(QUICK_CLAW);
    expect(b.heldTool?.pokeapiId).toBe(LEFTOVERS);
  });

  it("相手がねんちゃくなら奪えない", () => {
    const { a, b } = fighters();
    hold(b, LEFTOVERS);
    b.abilityPokeapiId = ABILITY.STICKY_HOLD;
    useMove(a, b, gen2MoveByPokeapiId(168));
    expect(a.heldTool).toBeNull();
    expect(b.heldTool?.pokeapiId).toBe(LEFTOVERS);
  });

  it("はたき落とされていれば奪えず、理由を表示する", () => {
    const { a, b } = fighters();
    a.heldTool = {
      pokeapiId: QUICK_CLAW,
      consumed: true,
      nameJa: "せんせいのツメ",
      knockedOff: true,
    };
    hold(b, LEFTOVERS);
    const logs = allLogs(useMove(a, b, gen2MoveByPokeapiId(168)).steps);
    expect(a.heldTool?.knockedOff).toBe(true);
    expect(b.heldTool?.pokeapiId).toBe(LEFTOVERS);
    expect(logs).toContain(
      "アタックは　はたき落とされた　せんせいのツメを　持っているので　奪えなかった！",
    );
  });
});

describe("はたきおとす", () => {
  it("相手の持ち物を使えなくし、以後持ち物を受け取れない", () => {
    const { a, b } = fighters();
    hold(b, LEFTOVERS);
    const logs = allLogs(useMove(a, b, gen3Move(282)).steps);
    expect(b.heldTool?.consumed).toBe(true);
    expect(b.heldTool?.knockedOff).toBe(true);
    expect(logs).toContain(
      "アタックは　ディフェンスの　たべのこしを　はたき落とした！",
    );
    expect(logs.some((l) => l.includes("たべのこしで　HPを　回復"))).toBe(false);

    hold(a, QUICK_CLAW);
    useMove(a, b, gen3Move(271));
    expect(a.heldTool?.pokeapiId).toBe(QUICK_CLAW);
    expect(b.heldTool?.knockedOff).toBe(true);
  });
});
