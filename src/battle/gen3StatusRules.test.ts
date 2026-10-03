import { afterEach, describe, expect, it, vi } from "vitest";

import type { Move } from "../pokemon/moves";
import { ABILITY } from "./abilityEffects";
import { getMoveByPokeapiId } from "./gen1MovePool";
import { forceHits, idleMove, makeFighter, runTurn } from "./test/harness";

const idleMoveA = idleMove();

afterEach(() => {
  vi.restoreAllMocks();
});

function gen1Move(pokeapiId: number): Move {
  const found = getMoveByPokeapiId(pokeapiId);
  if (!found) throw new Error(`Gen1 move ${pokeapiId} not found`);
  return { ...found, accuracy: found.accuracy == null ? null : 100 };
}

function fire(move: Move, setup: (a: ReturnType<typeof makeFighter>, b: ReturnType<typeof makeFighter>) => void) {
  forceHits();
  const a = makeFighter({ side: "a", nameJa: "アタック", hp: 999 });
  const b = makeFighter({ side: "b", nameJa: "マト", hp: 999 });
  setup(a, b);
  const { result } = runTurn({
    fighterA: a,
    fighterB: b,
    actionA: { type: "move", move },
    rulesGeneration: 3,
  });
  return { a, b, logs: result.steps.flatMap((s) => s.logs) };
}

describe("ちくでん（3世代）", () => {
  it("でんじはは吸収せず、まひする", () => {
    const { b, logs } = fire(gen1Move(86), (_a, b) => {
      b.abilityPokeapiId = ABILITY.VOLT_ABSORB;
      b.abilityNameJa = "ちくでん";
    });
    expect(logs).not.toContain("マトの　ちくでん！");
    expect(b.status).toBe("paralysis");
  });

  it("HPが満タンなら回復せず「効果がないようだ」", () => {
    const { logs } = fire(gen1Move(85), (_a, b) => {
      b.abilityPokeapiId = ABILITY.VOLT_ABSORB;
      b.abilityNameJa = "ちくでん";
    });
    expect(logs).toContain("マトの　ちくでん！");
    expect(logs).toContain("マトには　効果がないようだ…");
    expect(logs).not.toContain("マトは　体力を　吸収した！");
  });
});

describe("もらいび（3世代）", () => {
  it("ほのおタイプにおにびを撃っても発動せず失敗する", () => {
    const willOWisp = {
      ...gen1Move(52),
      pokeapi_id: 261,
      name_ja: "おにび",
      power: null,
      damage_class: "status" as const,
      effect_category: "ailment",
      effect_meta: { ...gen1Move(52).effect_meta!, ailment: "burn", ailment_chance: 0 },
    };
    const { b, logs } = fire(willOWisp, (_a, b) => {
      b.battleType1 = 2;
      b.abilityPokeapiId = ABILITY.FLASH_FIRE;
      b.abilityNameJa = "もらいび";
    });
    expect(logs).not.toContain("マトの　もらいび！");
    expect(b.volatiles.flashFireActive).toBeFalsy();
    expect(b.status).toBeNull();
  });

  it("こおり状態だと発動しない", () => {
    const { b, logs } = fire(gen1Move(52), (_a, b) => {
      b.status = "freeze";
      b.abilityPokeapiId = ABILITY.FLASH_FIRE;
      b.abilityNameJa = "もらいび";
    });
    expect(logs).not.toContain("マトの　もらいび！");
    expect(b.volatiles.flashFireActive).toBeFalsy();
  });
});

describe("タイプによる状態異常の無効（3世代）", () => {
  it("はがねタイプはどくにならない", () => {
    const { b } = fire(gen1Move(77), (_a, b) => {
      b.battleType1 = 17;
    });
    expect(b.status).toBeNull();
  });

  it("こおりタイプはこおらない（れいとうビームの追加効果）", () => {
    const { b, logs } = fire(gen1Move(58), (_a, b) => {
      b.battleType1 = 6;
    });
    expect(b.status).toBeNull();
    expect(logs).not.toContain("しかし　うまく　決まらなかった！");
  });
});

describe("追加効果が決まらないときは何も表示しない", () => {
  it("すでにまひしている相手に10まんボルト", () => {
    const { b, logs } = fire(gen1Move(85), (_a, b) => {
      b.status = "paralysis";
    });
    expect(b.status).toBe("paralysis");
    expect(logs).not.toContain("しかし　うまく　決まらなかった！");
  });
});

describe("すてみタックルの反動", () => {
  function recoilOf(rulesGeneration: number) {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "アタック", hp: 999 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 999 });
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen1Move(38) },
      rulesGeneration,
    });
    return { dealt: b.maxHp - b.currentHp, recoil: a.maxHp - a.currentHp };
  }

  it("3世代は与えたダメージの1/3", () => {
    const { dealt, recoil } = recoilOf(3);
    expect(dealt).toBeGreaterThan(0);
    expect(recoil).toBe(Math.floor(dealt / 3));
  });

  it("1・2世代は与えたダメージの1/4", () => {
    for (const gen of [1, 2]) {
      vi.restoreAllMocks();
      const { dealt, recoil } = recoilOf(gen);
      expect(recoil).toBe(Math.floor(dealt / 4));
    }
  });
});

describe("ねむり（3世代）", () => {
  it("さいみんじゅつで眠るターン数は1〜4", () => {
    const seen = new Set<number>();
    for (let i = 0; i < 300; i++) {
      const a = makeFighter({ side: "a", nameJa: "アタック", hp: 999 });
      const b = makeFighter({ side: "b", nameJa: "マト", hp: 999, speed: 300 });
      runTurn({
        fighterA: a,
        fighterB: b,
        actionA: { type: "move", move: gen1Move(95) },
        rulesGeneration: 3,
      });
      if (b.status === "sleep") seen.add(b.sleepTurns);
    }
    expect([...seen].sort()).toEqual([1, 2, 3, 4]);
  });

  /** Turns (1-based) until the sleeper lands a Tackle, starting asleep with `sleepTurns`. */
  function turnsUntilActs(rulesGeneration: number, sleepTurns: number) {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "アタック", hp: 999 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 999 });
    b.status = "sleep";
    b.sleepTurns = sleepTurns;
    for (let turn = 1; turn <= 10; turn++) {
      runTurn({
        fighterA: a,
        fighterB: b,
        actionA: { type: "move", move: idleMoveA },
        actionB: { type: "move", move: gen1Move(33) },
        rulesGeneration,
      });
      if (a.currentHp < a.maxHp) return turn;
    }
    return -1;
  }

  it("3世代は目を覚ましたターンに行動できる", () => {
    expect(turnsUntilActs(3, 1)).toBe(2);
    expect(turnsUntilActs(3, 4)).toBe(5);
  });

  it("1世代は目を覚ましたターンは行動できず、2世代は行動できる", () => {
    expect(turnsUntilActs(1, 1)).toBe(3);
    vi.restoreAllMocks();
    expect(turnsUntilActs(2, 1)).toBe(2);
  });

  it("3世代のねむるは2ターン眠り、3ターン目に行動する", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "アタック", hp: 999 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 999 });
    b.currentHp = 500;
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: idleMoveA },
      actionB: { type: "move", move: gen1Move(156) },
      rulesGeneration: 3,
    });
    expect(b.status).toBe("sleep");
    const actedOn: number[] = [];
    for (let turn = 1; turn <= 3; turn++) {
      const before = a.currentHp;
      runTurn({
        fighterA: a,
        fighterB: b,
        actionA: { type: "move", move: idleMoveA },
        actionB: { type: "move", move: gen1Move(33) },
        rulesGeneration: 3,
      });
      if (a.currentHp < before) actedOn.push(turn);
    }
    expect(actedOn).toEqual([3]);
  });

  it("3世代のはやおきは眠り1ターンなら次の行動で目を覚まして動ける", () => {
    // Random 0 rolls 1 asleep turn; Early Bird halves it to 0.
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "アタック", hp: 999 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 999, speed: 300 });
    b.abilityPokeapiId = ABILITY.EARLY_BIRD;
    b.abilityNameJa = "はやおき";
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen1Move(95) },
      rulesGeneration: 3,
    });
    expect(b.status).toBe("sleep");
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: idleMoveA },
      actionB: { type: "move", move: gen1Move(33) },
      rulesGeneration: 3,
    });
    expect(b.status).toBeNull();
    expect(a.currentHp).toBeLessThan(a.maxHp);
  });
});

describe("シンクロ", () => {
  it("攻撃側がすでに状態異常なら特性を表示しない", () => {
    const { a, logs } = fire(gen1Move(86), (a, b) => {
      a.status = "burn";
      b.abilityPokeapiId = ABILITY.SYNCHRONIZE;
      b.abilityNameJa = "シンクロ";
    });
    expect(a.status).toBe("burn");
    expect(logs).not.toContain("マトの　シンクロ！");
    expect(logs).not.toContain("しかし　うまく　決まらなかった！");
  });
});
