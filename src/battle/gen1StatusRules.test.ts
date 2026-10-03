import { afterEach, describe, expect, it, vi } from "vitest";

import type { Move } from "../pokemon/moves";
import { getMoveByPokeapiId } from "./gen1MovePool";
import { forceHits, idleMove, makeFighter, runTurn } from "./test/harness";
import type { BattleFighter } from "./types";

afterEach(() => {
  vi.restoreAllMocks();
});

const idle = idleMove();

function gen1Move(pokeapiId: number): Move {
  const found = getMoveByPokeapiId(pokeapiId);
  if (!found) throw new Error(`Gen1 move ${pokeapiId} not found`);
  return { ...found, accuracy: found.accuracy == null ? null : 100 };
}

function turn(
  a: BattleFighter,
  b: BattleFighter,
  moveA: Move,
  moveB: Move,
  rulesGeneration: number,
) {
  const { result } = runTurn({
    fighterA: a,
    fighterB: b,
    actionA: { type: "move", move: moveA },
    actionB: { type: "move", move: moveB },
    rulesGeneration,
  });
  return result.steps.flatMap((s) => s.logs);
}

function pair(opts: { typeB?: number; speedB?: number; hp?: number } = {}) {
  const a = makeFighter({ side: "a", nameJa: "アタック", hp: opts.hp ?? 999 });
  const b = makeFighter({
    side: "b",
    nameJa: "マト",
    hp: opts.hp ?? 999,
    type1: opts.typeB,
    speed: opts.speedB,
  });
  return { a, b };
}

describe("でんじは", () => {
  it("じめんタイプには効果がない（1・2世代）", () => {
    for (const gen of [1, 2]) {
      vi.restoreAllMocks();
      forceHits();
      const { a, b } = pair({ typeB: 9 });
      const logs = turn(a, b, gen1Move(86), idle, gen);
      expect(logs).toContain("マトには　効果がないようだ…");
      expect(b.status).toBeNull();
    }
  });

  it("でんきタイプはまひする（1・2世代）", () => {
    for (const gen of [1, 2]) {
      vi.restoreAllMocks();
      forceHits();
      const { a, b } = pair({ typeB: 4 });
      turn(a, b, gen1Move(86), idle, gen);
      expect(b.status).toBe("paralysis");
    }
  });
});

describe("初代：攻撃技の追加効果は同じタイプに効かない", () => {
  it("のしかかりはノーマルタイプをまひさせない（失敗表示もなし）", () => {
    forceHits();
    const { a, b } = pair({ typeB: 1 });
    const logs = turn(a, b, gen1Move(34), idle, 1);
    expect(b.status).toBeNull();
    expect(logs).not.toContain("しかし　うまく　決まらなかった！");
  });

  it("のしかかりはみずタイプならまひする", () => {
    forceHits();
    const { a, b } = pair({ typeB: 3 });
    turn(a, b, gen1Move(34), idle, 1);
    expect(b.status).toBe("paralysis");
  });

  it("10まんボルトは初代ではでんきタイプをまひさせず、2世代ではまひさせる", () => {
    forceHits();
    const gen1 = pair({ typeB: 4 });
    turn(gen1.a, gen1.b, gen1Move(85), idle, 1);
    expect(gen1.b.status).toBeNull();

    const gen2 = pair({ typeB: 4 });
    turn(gen2.a, gen2.b, gen1Move(85), idle, 2);
    expect(gen2.b.status).toBe("paralysis");
  });
});

describe("もうどく", () => {
  it("ダメージが1/16ずつ増えていく（1・2世代）", () => {
    for (const gen of [1, 2]) {
      vi.restoreAllMocks();
      forceHits();
      const { a, b } = pair({ hp: 160 });
      const logs = turn(a, b, gen1Move(92), idle, gen);
      expect(logs).toContain("マトは　もうどくを　あびた！");
      expect(b.volatiles.toxic).toBe(true);
      expect(b.currentHp).toBe(150);
      turn(a, b, idle, idle, gen);
      expect(b.currentHp).toBe(130);
      turn(a, b, idle, idle, gen);
      expect(b.currentHp).toBe(100);
    }
  });

  it("初代はもうどくの段階がやどりぎのタネにも掛かる", () => {
    forceHits();
    const { a, b } = pair({ hp: 160 });
    turn(a, b, gen1Move(92), idle, 1);
    b.volatiles.leechSeed = true;
    b.volatiles.leechSeedFrom = "a";
    const before = b.currentHp;
    turn(a, b, idle, idle, 1);
    expect(before - b.currentHp).toBe(20 + 20);
  });

  it("普通のどくは1/16のまま", () => {
    forceHits();
    const { a, b } = pair({ hp: 160 });
    b.status = "poison";
    turn(a, b, idle, idle, 1);
    turn(a, b, idle, idle, 1);
    expect(b.currentHp).toBe(140);
  });
});

describe("初代のねむり", () => {
  it("起きるターンを含めて1〜7ターン動けない", () => {
    const seen = new Set<number>();
    for (let i = 0; i < 400; i++) {
      const { a, b } = pair({ speedB: 300 });
      turn(a, b, gen1Move(95), idle, 1);
      if (b.status === "sleep") seen.add(b.sleepTurns + 1);
    }
    expect([...seen].sort((x, y) => x - y)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("眠り1ターンなら次のターンに目を覚まして動けず、その次に動ける", () => {
    forceHits();
    const { a, b } = pair();
    b.status = "sleep";
    b.sleepTurns = 0;
    const tackle = gen1Move(33);
    const logs = turn(a, b, idle, tackle, 1);
    expect(logs).toContain("マトは　目を　覚ました！");
    expect(a.currentHp).toBe(a.maxHp);
    turn(a, b, idle, tackle, 1);
    expect(a.currentHp).toBeLessThan(a.maxHp);
  });
});

describe("こおり", () => {
  it("初代は自然には溶けない", () => {
    forceHits();
    const { a, b } = pair();
    b.status = "freeze";
    for (let i = 0; i < 5; i++) turn(a, b, idle, gen1Move(33), 1);
    expect(b.status).toBe("freeze");
    expect(a.currentHp).toBe(a.maxHp);
  });

  it("やけどの追加効果がある炎技を受けると溶ける（やけどにはならない）", () => {
    for (const gen of [1, 2]) {
      vi.restoreAllMocks();
      forceHits();
      const { a, b } = pair();
      b.status = "freeze";
      const logs = turn(a, b, gen1Move(52), idle, gen);
      expect(logs).toContain("マトの　こおりが　溶けた！");
      expect(b.status).toBeNull();
    }
  });

  it("初代のほのおのうずでは溶けない", () => {
    forceHits();
    const { a, b } = pair();
    b.status = "freeze";
    turn(a, b, gen1Move(83), idle, 1);
    expect(b.status).toBe("freeze");
  });
});

describe("こんらん", () => {
  it("解けたターンは普通に行動できる（1・2世代）", () => {
    for (const gen of [1, 2]) {
      vi.restoreAllMocks();
      forceHits();
      const { a, b } = pair();
      b.volatiles.confusionTurns = 2;
      const tackle = gen1Move(33);
      const first = turn(a, b, idle, tackle, gen);
      expect(first).toContain("マトは　こんらんしている！");
      expect(a.currentHp).toBe(a.maxHp);
      const second = turn(a, b, idle, tackle, gen);
      expect(second).toContain("マトの　こんらんが　とけた！");
      expect(second).not.toContain("マトは　こんらんしている！");
      expect(a.currentHp).toBeLessThan(a.maxHp);
    }
  });
});
