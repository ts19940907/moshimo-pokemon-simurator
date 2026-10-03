import { afterEach, describe, expect, it, vi } from "vitest";

import type { Move } from "../pokemon/moves";
import { applyMoveTypeForGeneration } from "../pokemon/moveTypeByGeneration";
import { damageBeforeRandom } from "./calcDamage";
import { getMoveByPokeapiId } from "./gen1MovePool";
import { getForcedMove } from "./resolveTurn";
import {
  forceHits,
  gen2MoveByPokeapiId,
  idleMove,
  makeFighter,
  makeSpecies,
  runTurn,
} from "./test/harness";
import { cannotSwitchOut, createBattleField, type BattleFighter } from "./types";

afterEach(() => {
  vi.restoreAllMocks();
});

const idle = idleMove();

function rawGen1Move(pokeapiId: number): Move {
  const found = getMoveByPokeapiId(pokeapiId);
  if (!found) throw new Error(`Gen1 move ${pokeapiId} not found`);
  return found;
}

function moveFor(pokeapiId: number, rulesGeneration: number): Move {
  const move = applyMoveTypeForGeneration(rawGen1Move(pokeapiId), rulesGeneration);
  return { ...move, accuracy: move.accuracy == null ? null : 100 };
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

describe("2世代で変わった技データ", () => {
  it("タイプ・威力・命中・追加効果率が2世代の値になる", () => {
    const g2 = (id: number) => applyMoveTypeForGeneration(rawGen1Move(id), 2);
    expect(g2(44)).toMatchObject({ type_id: 16, damage_class: "special" });
    expect(g2(16).type_id).toBe(10);
    expect(g2(2).type_id).toBe(7);
    expect(g2(28).type_id).toBe(9);
    expect(g2(38).power).toBe(120);
    expect(g2(153).power).toBe(250);
    expect(g2(120).power).toBe(200);
    expect(g2(91).power).toBe(60);
    expect(g2(59).accuracy).toBe(70);
    for (const id of [94, 51, 145, 61, 62, 132]) {
      expect(g2(id).effect_meta?.stat_chance).toBe(10);
    }
  });

  it("初代ルールでは変わらない", () => {
    const g1 = (id: number) => applyMoveTypeForGeneration(rawGen1Move(id), 1);
    expect(g1(44)).toMatchObject({ type_id: 1, damage_class: "physical" });
    expect(g1(38).power).toBe(100);
    expect(g1(59).accuracy).toBe(90);
    expect(g1(94).effect_meta?.stat_chance).toBe(33);
  });
});

describe("2世代のタイプ相性", () => {
  it("あくタイプのかみつくはエスパーに抜群", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "アタック", hp: 999 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 999, type1: 11 });
    const logs = turn(a, b, moveFor(44, 2), idle, 2);
    expect(logs).toContain("効果は　抜群だ！");
  });

  it("ゴースト技はエスパーに抜群（初代は無効）", () => {
    forceHits();
    const lick = moveFor(122, 2);
    const g2 = { a: makeFighter({ side: "a", nameJa: "アタック", hp: 999 }), b: makeFighter({ side: "b", nameJa: "マト", hp: 999, type1: 11 }) };
    expect(turn(g2.a, g2.b, lick, idle, 2)).toContain("効果は　抜群だ！");
    const g1 = { a: makeFighter({ side: "a", nameJa: "アタック", hp: 999 }), b: makeFighter({ side: "b", nameJa: "マト", hp: 999, type1: 11 }) };
    expect(turn(g1.a, g1.b, moveFor(122, 1), idle, 1)).toContain("マトには　効果がないようだ…");
  });
});

describe("はかいこうせんの反動", () => {
  it("2世代は相手を倒しても反動で動けない", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "アタック", hp: 999 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 1 });
    turn(a, b, moveFor(63, 2), idle, 2);
    expect(b.currentHp).toBe(0);
    expect(a.volatiles.recharge).toBe(true);
  });

  it("初代は相手を倒すと反動なし", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "アタック", hp: 999 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 1 });
    turn(a, b, moveFor(63, 1), idle, 1);
    expect(a.volatiles.recharge).toBe(false);
  });
});

describe("2世代のしめつけ系", () => {
  it("受けた側は行動でき、交代できず、毎ターン1/16のダメージを受けて解放される", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "アタック", hp: 160 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 160 });
    const tackle = moveFor(33, 2);
    const first = turn(a, b, moveFor(35, 2), tackle, 2);
    expect(first).toContain("マトは　アタックに　まきつかれた！");
    expect(a.currentHp).toBeLessThan(a.maxHp);
    expect(cannotSwitchOut(b)).toBe(true);
    expect(getForcedMove(a)).toBeNull();
    expect(getForcedMove(b)).toBeNull();
    expect(first).toContain("マトは　まきつくの　ダメージを　受けている！");

    const hpBefore = b.currentHp;
    turn(a, b, idle, idle, 2);
    expect(hpBefore - b.currentHp).toBe(10);
    const third = turn(a, b, idle, idle, 2);
    expect(third).toContain("マトは　まきつくから　解放された！");
    expect(cannotSwitchOut(b)).toBe(false);
  });

  it("ゴーストタイプにはまきつくが効かない", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "アタック", hp: 160 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 160, type1: 14 });
    const logs = turn(a, b, moveFor(35, 2), idle, 2);
    expect(logs).toContain("マトには　効果がないようだ…");
    expect(b.volatiles.partialTrap).toBeNull();
  });

  it("こうそくスピンで抜け出せる", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "アタック", hp: 160 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 160 });
    turn(a, b, moveFor(35, 2), idle, 2);
    const spin = { ...applyMoveTypeForGeneration(rawGen1Move(33), 2), pokeapi_id: 229, name_ja: "こうそくスピン" };
    const logs = turn(a, b, idle, spin, 2);
    expect(logs).toContain("マトは　まきつくから　解放された！");
    expect(b.volatiles.partialTrap).toBeNull();
  });

  it("初代は今まで通り受けた側が動けない", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "アタック", hp: 160 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 160 });
    turn(a, b, moveFor(35, 1), moveFor(33, 1), 1);
    expect(a.currentHp).toBe(a.maxHp);
    expect(b.volatiles.trapTurns).toBeGreaterThan(0);
  });
});

describe("2世代の急所", () => {
  function critLogged(random: number, setup?: (a: BattleFighter) => void, moveId = 33) {
    vi.spyOn(Math, "random").mockReturnValue(random);
    const a = makeFighter({ side: "a", nameJa: "アタック", hp: 999 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 999 });
    setup?.(a);
    return turn(a, b, moveFor(moveId, 2), idle, 2).includes("急所に　当たった！");
  }

  it("通常は17/256", () => {
    expect(critLogged(16 / 256)).toBe(true);
    vi.restoreAllMocks();
    expect(critLogged(17 / 256)).toBe(false);
  });

  it("急所に当たりやすい技＋きあいだめで64/256", () => {
    const focus = (a: BattleFighter) => {
      a.volatiles.focusEnergy = true;
    };
    expect(critLogged(63 / 256, focus, 2)).toBe(true);
    vi.restoreAllMocks();
    expect(critLogged(64 / 256, focus, 2)).toBe(false);
  });

  it("急所のダメージは2倍（ランク補正が相手以下なら無視）", () => {
    const sides = {
      attackerLevel: 50,
      attackerSpecies: makeSpecies({ name_ja: "A", type1: 3 }),
      attackerStats: { hp: 150, attack: 100, defense: 100, special: 100, sp_attack: 100, sp_defense: 100, speed: 100 },
      attackerAttackStage: 0,
      attackerSpecialStage: 0,
      defenderSpecies: makeSpecies({ name_ja: "B", type1: 3 }),
      defenderStats: { hp: 150, attack: 100, defense: 100, special: 100, sp_attack: 100, sp_defense: 100, speed: 100 },
      defenderDefenseStage: 2,
      defenderSpecialStage: 0,
    };
    const tackle = rawGen1Move(33);
    const base = { attackerBurn: false, defenderReflect: false, defenderLightScreen: false, rulesGeneration: 2 };
    const noCritNoStages = damageBeforeRandom({ ...sides, defenderDefenseStage: 0 }, tackle, { ...base, crit: false }).damage;
    const crit = damageBeforeRandom(sides, tackle, { ...base, crit: true }).damage;
    expect(crit).toBe((noCritNoStages - 2) * 2 + 2);

    const boosted = { ...sides, attackerAttackStage: 2, defenderDefenseStage: 0 };
    const boostedNoCrit = damageBeforeRandom(boosted, tackle, { ...base, crit: false }).damage;
    const boostedCrit = damageBeforeRandom(boosted, tackle, { ...base, crit: true }).damage;
    expect(boostedCrit).toBe((boostedNoCrit - 2) * 2 + 2);
  });
});

describe("連続技", () => {
  function perHitDamages(rulesGeneration: number): number[] {
    const move = { ...moveFor(31, rulesGeneration), power: 100 };
    const a = makeFighter({ side: "a", nameJa: "アタック", hp: 999 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 999, type1: 3 });
    const logs = turn(a, b, move, idle, rulesGeneration);
    return logs
      .map((line) => /回目！　(\d+)の　ダメージ！/.exec(line)?.[1])
      .filter((v): v is string => v != null)
      .map(Number);
  }

  it("2世代は1発ごとにダメージ・急所を判定する", () => {
    let varied = false;
    for (let i = 0; i < 30 && !varied; i++) {
      varied = new Set(perHitDamages(2)).size > 1;
    }
    expect(varied).toBe(true);
  });

  it("初代は全ての攻撃が同じダメージ", () => {
    for (let i = 0; i < 30; i++) {
      expect(new Set(perHitDamages(1)).size).toBeLessThanOrEqual(1);
    }
  });
});

function gen2Move(pokeapiId: number): Move {
  const move = applyMoveTypeForGeneration(gen2MoveByPokeapiId(pokeapiId), 2);
  return { ...move, accuracy: move.accuracy == null ? null : 100 };
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

describe("2世代のその他の技", () => {
  it("かみつくのひるみ確率は30%", () => {
    expect(applyMoveTypeForGeneration(rawGen1Move(44), 2).effect_meta?.flinch_chance).toBe(30);
    expect(applyMoveTypeForGeneration(rawGen1Move(44), 1).effect_meta?.flinch_chance).toBe(10);
  });

  it("こうそくスピンは素早さが上がらず、やどりぎのタネとまきびしを外す", () => {
    forceHits();
    const { a, b } = pair();
    a.volatiles.leechSeed = true;
    a.volatiles.leechSeedFrom = "b";
    const startField = createBattleField();
    startField.a.spikes = true;
    const { field, result } = runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen2Move(229) },
      actionB: { type: "move", move: idle },
      rulesGeneration: 2,
      field: startField,
    });
    const logs = result.steps.flatMap((s) => s.logs);
    expect(a.stages.speed).toBe(0);
    expect(a.volatiles.leechSeed).toBe(false);
    expect(field.a.spikes).toBe(false);
    expect(logs).toContain("アタックは　まきびしを　吹き飛ばした！");
  });

  it("かぜおこし・たつまきは空を飛んでいる相手に当たり、威力2倍", () => {
    for (const move of [gen2MoveByPokeapiId(239), moveFor(16, 2)]) {
      vi.restoreAllMocks();
      forceHits();
      const normal = pair({ typeB: 3 });
      turn(normal.a, normal.b, { ...move, accuracy: 100 }, idle, 2);
      const flying = pair({ typeB: 3 });
      flying.b.volatiles.semiInvulnerable = "fly";
      turn(flying.a, flying.b, { ...move, accuracy: 100 }, idle, 2);
      const normalDmg = normal.b.maxHp - normal.b.currentHp;
      const flyingDmg = flying.b.maxHp - flying.b.currentHp;
      expect(flyingDmg).toBeGreaterThan(normalDmg * 1.8);
    }
  });

  it("じしんは穴を掘っている相手に当たり威力2倍、スピードスターは空を飛ぶ相手に当たらない", () => {
    forceHits();
    const normal = pair({ typeB: 3 });
    turn(normal.a, normal.b, moveFor(89, 2), idle, 2);
    const digging = pair({ typeB: 3 });
    digging.b.volatiles.semiInvulnerable = "dig";
    turn(digging.a, digging.b, moveFor(89, 2), idle, 2);
    expect(digging.b.maxHp - digging.b.currentHp).toBeGreaterThan(
      (normal.b.maxHp - normal.b.currentHp) * 1.8,
    );

    const flying = pair();
    flying.b.volatiles.semiInvulnerable = "fly";
    turn(flying.a, flying.b, moveFor(129, 2), idle, 2);
    expect(flying.b.currentHp).toBe(flying.b.maxHp);
  });

  it("わるあがきはタイプなしでゴーストに当たり、与えたダメージの1/4の反動", () => {
    forceHits();
    const { a, b } = pair({ typeB: 14 });
    turn(a, b, rawGen1Move(165), idle, 2);
    const dealt = b.maxHp - b.currentHp;
    expect(dealt).toBeGreaterThan(0);
    expect(a.maxHp - a.currentHp).toBe(Math.floor(dealt / 4));
  });
});

describe("2世代の状態異常", () => {
  it("眠るターン数は1〜6", () => {
    const seen = new Set<number>();
    for (let i = 0; i < 400; i++) {
      const { a, b } = pair({ speedB: 300 });
      turn(a, b, moveFor(95, 2), idle, 2);
      if (b.status === "sleep") seen.add(b.sleepTurns);
    }
    expect([...seen].sort((x, y) => x - y)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("目を覚ましたターンに行動できる", () => {
    forceHits();
    const { a, b } = pair();
    b.status = "sleep";
    b.sleepTurns = 1;
    const tackle = moveFor(33, 2);
    turn(a, b, idle, tackle, 2);
    expect(a.currentHp).toBe(a.maxHp);
    const logs = turn(a, b, idle, tackle, 2);
    expect(logs).toContain("マトは　目を　覚ました！");
    expect(a.currentHp).toBeLessThan(a.maxHp);
  });

  it("ねむるは2ターン眠り、3ターン目に行動する", () => {
    forceHits();
    const { a, b } = pair();
    b.currentHp = 500;
    turn(a, b, idle, moveFor(156, 2), 2);
    expect(b.status).toBe("sleep");
    const actedOn: number[] = [];
    for (let t = 1; t <= 3; t++) {
      const before = a.currentHp;
      turn(a, b, idle, moveFor(33, 2), 2);
      if (a.currentHp < before) actedOn.push(t);
    }
    expect(actedOn).toEqual([3]);
  });

  it("いびきは眠っている間だけ使え、起きていると失敗する", () => {
    forceHits();
    const asleep = pair();
    asleep.b.status = "sleep";
    asleep.b.sleepTurns = 3;
    turn(asleep.a, asleep.b, idle, gen2Move(173), 2);
    expect(asleep.a.currentHp).toBeLessThan(asleep.a.maxHp);

    const awake = pair();
    const logs = turn(awake.a, awake.b, idle, gen2Move(173), 2);
    expect(logs).toContain("しかし　うまく　決まらなかった！");
    expect(awake.a.currentHp).toBe(awake.a.maxHp);
  });

  it("ねごとは眠っている間に覚えている技を出す", () => {
    forceHits();
    const { a, b } = pair();
    b.status = "sleep";
    b.sleepTurns = 3;
    b.volatiles.knownMoves = [moveFor(33, 2), gen2Move(214)];
    const logs = turn(a, b, idle, gen2Move(214), 2);
    expect(logs).toContain("たいあたりが　でた！");
    expect(a.currentHp).toBeLessThan(a.maxHp);
  });

  it("こおりは行動前には溶けず、ターン終了時に溶けることがある", () => {
    forceHits();
    const { a, b } = pair();
    b.status = "freeze";
    const logs = turn(a, b, idle, moveFor(33, 2), 2);
    expect(logs).toContain("マトは　こおっていて　動けない！");
    expect(a.currentHp).toBe(a.maxHp);
    expect(logs).toContain("マトの　こおりが　溶けた！");
    expect(b.status).toBeNull();
  });

  it("ターン終了時にこおりが溶ける確率は10%", () => {
    for (const [random, thawed] of [
      [0.099, true],
      [0.1, false],
    ] as const) {
      vi.spyOn(Math, "random").mockReturnValue(random);
      const { a, b } = pair();
      b.status = "freeze";
      turn(a, b, idle, idle, 2);
      expect(b.status).toBe(thawed ? null : "freeze");
      vi.restoreAllMocks();
    }
  });

  it("こおっていてもかえんぐるまは溶かして使える", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const { a, b } = pair();
    b.status = "freeze";
    const logs = turn(a, b, idle, gen2Move(172), 2);
    expect(logs).toContain("マトの　こおりが　溶けた！");
    expect(a.currentHp).toBeLessThan(a.maxHp);
  });

  it("やけど・どく・やどりぎのタネは1/8", () => {
    forceHits();
    for (const status of ["burn", "poison"] as const) {
      const { a, b } = pair({ hp: 160 });
      b.status = status;
      turn(a, b, idle, idle, 2);
      expect(b.currentHp).toBe(140);
    }
    const { a, b } = pair({ hp: 160 });
    b.volatiles.leechSeed = true;
    b.volatiles.leechSeedFrom = "a";
    turn(a, b, idle, idle, 2);
    expect(b.currentHp).toBe(140);
  });

  it("こおりタイプはこおらず、はがねタイプはどくにならない", () => {
    forceHits();
    const ice = pair({ typeB: 6 });
    turn(ice.a, ice.b, moveFor(58, 2), idle, 2);
    expect(ice.b.status).toBeNull();
    const steel = pair({ typeB: 17 });
    turn(steel.a, steel.b, moveFor(92, 2), idle, 2);
    expect(steel.b.status).toBeNull();
  });

  it("まひで動けない確率は63/256", () => {
    const run = (random: number) => {
      vi.restoreAllMocks();
      vi.spyOn(Math, "random").mockReturnValue(random);
      const { a, b } = pair();
      b.status = "paralysis";
      return turn(a, b, idle, moveFor(33, 2), 2).includes("マトは　まひして　動けない！");
    };
    expect(run(62 / 256)).toBe(true);
    expect(run(63 / 256)).toBe(false);
  });

  it("こんらんの自滅はタイプなしなのでゴーストにもダメージ", () => {
    forceHits();
    const { a, b } = pair({ typeB: 14 });
    b.volatiles.confusionTurns = 3;
    turn(a, b, idle, moveFor(33, 2), 2);
    expect(b.currentHp).toBeLessThan(b.maxHp);
  });
});
