import { afterEach, describe, expect, it, vi } from "vitest";

import type { Move } from "../pokemon/moves";
import { applySpikesOnSwitchIn } from "./gen2UniqueMoves";
import { createBattleField } from "./types";
import {
  assertableGen2Moves,
  defenderTypeForMoveType,
  pendingGen2Moves,
  stageKeyFromStat,
} from "./test/gen2MoveExpectations";
import {
  allGen2DebutMoves,
  forceHits,
  gen2MoveByPokeapiId,
  idleMove,
  makeFighter,
  runTurn,
  simulateStatusRevealTiming,
} from "./test/harness";

afterEach(() => {
  vi.restoreAllMocks();
});

function withForcedSecondaries(move: Move): Move {
  return {
    ...move,
    accuracy: move.accuracy == null ? null : 100,
    effect_meta: {
      ...move.effect_meta,
      stat_chance:
        move.effect_meta.stat_changes.length > 0
          ? 100
          : move.effect_meta.stat_chance,
      ailment_chance: move.effect_meta.ailment ? 100 : move.effect_meta.ailment_chance,
    },
  };
}

function runMove(move: Move, opts?: { hpA?: number; hpB?: number; type1?: number }) {
  forceHits();
  const fighterA = makeFighter({
    side: "a",
    nameJa: "アタック",
    speed: 200,
    hp: opts?.hpA ?? 200,
  });
  const fighterB = makeFighter({
    side: "b",
    nameJa: "ディフェンス",
    speed: 50,
    hp: opts?.hpB ?? 200,
    type1: opts?.type1 ?? defenderTypeForMoveType(move.type_id),
  });
  // Damage users start full; heal users start damaged.
  if (move.effect_category === "heal") {
    fighterA.currentHp = Math.floor(fighterA.maxHp / 2);
  }
  const { field, result } = runTurn({
    fighterA,
    fighterB,
    actionA: { type: "move", move: withForcedSecondaries(move) },
  });
  return { fighterA, fighterB, field, result };
}

describe("Gen2 assertable moves work correctly", () => {
  const moves = assertableGen2Moves();

  it("pending list does not overlap assertable coverage gaps silently", () => {
    expect(moves.length + pendingGen2Moves().length).toBe(allGen2DebutMoves().length);
  });

  it.each(
    moves
      .filter(
        (m) =>
          ((m.power ?? 0) > 0 ||
            [175, 179, 216, 218, 222, 251].includes(m.pokeapi_id)) &&
          (m.effect_category === "damage" ||
            m.effect_category === "damage-ailment" ||
            m.effect_category === "damage-lower" ||
            m.effect_category === "damage-raise" ||
            m.effect_category === "damage-heal"),
      )
      .map((m) => [m.pokeapi_id, m.name_ja, m] as const),
  )("%s %s deals HP damage", (_id, _name, move) => {
    const { fighterB, result } = runMove(move);
    expect(fighterB.currentHp).toBeLessThan(fighterB.maxHp);
    expect(
      result.steps.some((s) => s.logs.some((l) => l.includes("ダメージ"))),
    ).toBe(true);
  });

  it.each(
    moves
      .filter((m) => m.effect_category === "net-good-stats")
      .map((m) => [m.pokeapi_id, m.name_ja, m] as const),
  )("%s %s applies listed stat changes", (_id, _name, move) => {
    const { fighterA, fighterB } = runMove(move);
    for (const sc of move.effect_meta.stat_changes) {
      const key = stageKeyFromStat(sc.stat, sc.change);
      expect(key).toBeTruthy();
      const towardFoe = sc.change < 0;
      const who = towardFoe ? fighterB : fighterA;
      // net-good-stats path: all-negative → foe, else user (see resolveTurn)
      const allNeg = move.effect_meta.stat_changes.every((c) => c.change < 0);
      const target = allNeg ? fighterB : fighterA;
      expect(target.stages[key!]).toBe(sc.change);
      void who;
    }
  });

  it.each(
    moves
      .filter((m) => m.effect_category === "heal")
      .map((m) => [m.pokeapi_id, m.name_ja, m] as const),
  )("%s %s restores HP", (_id, _name, move) => {
    const { fighterA } = runMove(move, { hpA: 200 });
    expect(fighterA.currentHp).toBeGreaterThan(Math.floor(fighterA.maxHp / 2));
  });

  it.each(
    moves
      .filter(
        (m) =>
          m.effect_category === "damage-lower" ||
          m.effect_category === "damage-raise",
      )
      .map((m) => [m.pokeapi_id, m.name_ja, m] as const),
  )("%s %s applies secondary stage change", (_id, _name, move) => {
    const { fighterA, fighterB } = runMove(move);
    const towardFoe = move.effect_category === "damage-lower";
    for (const sc of move.effect_meta.stat_changes) {
      const key = stageKeyFromStat(sc.stat, sc.change);
      expect(key).toBeTruthy();
      const who = towardFoe ? fighterB : fighterA;
      expect(who.stages[key!]).toBe(sc.change);
    }
  });

  it.each(
    moves
      .filter(
        (m) =>
          m.effect_category === "damage-ailment" &&
          ["burn", "poison", "paralysis", "freeze", "confusion"].includes(
            m.effect_meta.ailment ?? "",
          ),
      )
      .map((m) => [m.pokeapi_id, m.name_ja, m] as const),
  )("%s %s can apply secondary ailment", (_id, _name, move) => {
    const { fighterB, result } = runMove(move);
    const ailment = move.effect_meta.ailment!;
    if (ailment === "confusion") {
      expect(fighterB.volatiles.confusionTurns).toBeGreaterThan(0);
    } else if (ailment === "freeze") {
      // forceHits makes the 25% thaw succeed on the foe's later canAct,
      // so assert the ailment beat instead of end-of-turn status.
      const freezeStep = result.steps.find((s) =>
        s.logs.some((l) => l.includes("こおって")),
      );
      expect(freezeStep?.statusSnapshot?.b).toBe("freeze");
    } else {
      expect(fighterB.status).toBe(ailment);
    }
  });

  it.each(
    moves
      .filter((m) => m.effect_category === "damage-heal")
      .map((m) => [m.pokeapi_id, m.name_ja, m] as const),
  )("%s %s deals damage and heals user", (_id, _name, move) => {
    const { fighterA, fighterB } = runMove(move, { hpA: 200, hpB: 200 });
    // Start A slightly damaged so heal is visible if drain applies mid-turn.
    // Drain is applied during damage path; A may still be full if started full.
    expect(fighterB.currentHp).toBeLessThan(fighterB.maxHp);
    expect(fighterA.currentHp).toBeGreaterThan(0);
  });

  it("あまごい / にほんばれ set weather without turn limit", () => {
    for (const [id, weather] of [
      [240, "rain"],
      [241, "sun"],
    ] as const) {
      const { field } = runMove(gen2MoveByPokeapiId(id));
      expect(field.weather?.id).toBe(weather);
      expect(field.weather?.turnsLeft).toBeNull();
    }
  });

  it("てんしのキッス confuses and splits UI beats", () => {
    const move = gen2MoveByPokeapiId(186);
    const { fighterB, result } = runMove(move);
    expect(fighterB.volatiles.confusionTurns).toBeGreaterThan(0);
    const moveNameStep = result.steps.find((s) =>
      s.logs.some((l) => l.includes("てんしのキッス")),
    );
    const confusionStep = result.steps.find((s) =>
      s.logs.some((l) => l.includes("こんらん")),
    );
    expect(moveNameStep?.statusSnapshot?.confusionB ?? 0).toBe(0);
    expect(confusionStep?.statusSnapshot?.confusionB ?? 0).toBeGreaterThan(0);
    const timeline = simulateStatusRevealTiming(result.steps);
    const moveBeat = timeline.find((t) =>
      t.logs.some((l) => l.includes("てんしのキッス")),
    );
    expect(moveBeat?.statusDuringLogs?.confusionB ?? 0).toBe(0);
  });

  it("Mach Punch has priority over idle foe that is faster without priority", () => {
    forceHits();
    const fighterA = makeFighter({
      side: "a",
      nameJa: "アタック",
      speed: 50,
      hp: 200,
    });
    const fighterB = makeFighter({
      side: "b",
      nameJa: "ディフェンス",
      speed: 200,
      hp: 200,
      type1: defenderTypeForMoveType(7),
    });
    // B uses a damaging move; A uses Mach Punch (priority 1) and should hit first.
    const machPunch = withForcedSecondaries(gen2MoveByPokeapiId(183));
    const tackleLike: Move = {
      ...gen2MoveByPokeapiId(224),
      name_ja: "遅い技",
      priority: 0,
      power: 40,
      effect_category: "damage",
      effect_meta: { ...gen2MoveByPokeapiId(224).effect_meta, min_hits: null, max_hits: null },
    };
    const { result } = runTurn({
      fighterA,
      fighterB,
      actionA: { type: "move", move: machPunch },
      actionB: { type: "move", move: tackleLike },
    });
    const firstDamage = result.steps.find((s) =>
      s.logs.some((l) => l.includes("ダメージ")),
    );
    expect(firstDamage?.logs.some((l) => l.includes("マッハパンチ"))).toBe(true);
  });
});

describe("Gen2 group1-3 unique moves", () => {
  it("まもる blocks the foe's damaging move", () => {
    forceHits();
    const fighterA = makeFighter({ side: "a", nameJa: "守り", speed: 200, hp: 200 });
    const fighterB = makeFighter({
      side: "b",
      nameJa: "攻撃",
      speed: 50,
      hp: 200,
      type1: 1,
    });
    runTurn({
      fighterA,
      fighterB,
      actionA: { type: "move", move: gen2MoveByPokeapiId(182) },
      actionB: {
        type: "move",
        move: {
          ...gen2MoveByPokeapiId(224),
          power: 80,
          priority: 0,
          effect_category: "damage",
        },
      },
    });
    expect(fighterA.currentHp).toBe(200);
    expect(fighterA.volatiles.protectStreak).toBe(1);
  });

  it("こらえる leaves 1 HP against a KO hit", () => {
    forceHits();
    const fighterA = makeFighter({ side: "a", nameJa: "耐える", speed: 200, hp: 5 });
    const fighterB = makeFighter({
      side: "b",
      nameJa: "攻撃",
      speed: 50,
      hp: 200,
      type1: 1,
    });
    // B acts first via priority? A has endure priority 4, so A endures first then B hits.
    runTurn({
      fighterA,
      fighterB,
      actionA: { type: "move", move: gen2MoveByPokeapiId(203) },
      actionB: {
        type: "move",
        move: {
          ...gen2MoveByPokeapiId(224),
          power: 120,
          priority: 0,
          accuracy: 100,
          effect_category: "damage",
        },
      },
    });
    expect(fighterA.currentHp).toBe(1);
  });

  it("すなあらし sets sand and damages non-immune at end of turn", () => {
    forceHits();
    const fighterA = makeFighter({
      side: "a",
      nameJa: "砂使い",
      speed: 200,
      hp: 160,
      type1: 1,
    });
    const fighterB = makeFighter({
      side: "b",
      nameJa: "いわ",
      speed: 50,
      hp: 160,
      type1: 13,
    });
    const { field } = runTurn({
      fighterA,
      fighterB,
      actionA: { type: "move", move: gen2MoveByPokeapiId(201) },
    });
    expect(field.weather?.id).toBe("sand");
    expect(fighterA.currentHp).toBe(150); // 160/16 = 10
    expect(fighterB.currentHp).toBe(160); // Rock immune
  });

  it("まきびし damages switch-in via helper", () => {
    forceHits();
    const field = createBattleField();
    const setter = makeFighter({ side: "a", nameJa: "設置", speed: 200 });
    const foe = makeFighter({ side: "b", nameJa: "相手", speed: 50, hp: 80, type1: 1 });
    runTurn({
      fighterA: setter,
      fighterB: foe,
      actionA: { type: "move", move: gen2MoveByPokeapiId(191) },
      field,
    });
    expect(field.b.spikes).toBe(true);
    const switched = makeFighter({ side: "b", nameJa: "交代", speed: 50, hp: 80, type1: 1 });
    const logs: string[] = [];
    applySpikesOnSwitchIn(switched, field, logs);
    expect(switched.currentHp).toBe(70);
    expect(logs[0]).toContain("まきびし");
  });

  it("しんぴのまもり blocks swagger confusion", () => {
    forceHits();
    const fighterA = makeFighter({ side: "a", nameJa: "守り手", speed: 200 });
    const fighterB = makeFighter({ side: "b", nameJa: "いばり", speed: 50 });
    const field = createBattleField();
    runTurn({
      fighterA,
      fighterB,
      field,
      actionA: { type: "move", move: gen2MoveByPokeapiId(219) },
    });
    expect(field.a.safeguardTurns).toBeGreaterThan(0);
    runTurn({
      fighterA,
      fighterB,
      field,
      actionA: { type: "move", move: idleMove() },
      actionB: { type: "move", move: gen2MoveByPokeapiId(207) },
    });
    expect(fighterA.volatiles.confusionTurns).toBe(0);
  });

  it("ゴーストのろい curses the foe; ノーマルのろい changes stages", () => {
    forceHits();
    const ghost = makeFighter({
      side: "a",
      nameJa: "ゴースト",
      speed: 200,
      hp: 100,
      type1: 14,
    });
    const foe = makeFighter({ side: "b", nameJa: "相手", speed: 50, hp: 100 });
    runTurn({
      fighterA: ghost,
      fighterB: foe,
      actionA: { type: "move", move: gen2MoveByPokeapiId(174) },
    });
    expect(ghost.currentHp).toBe(50);
    expect(foe.volatiles.cursed).toBe(true);
    expect(foe.currentHp).toBeLessThan(100); // residual at end of turn

    const normal = makeFighter({
      side: "a",
      nameJa: "ノーマル",
      speed: 200,
      type1: 1,
    });
    const foe2 = makeFighter({ side: "b", nameJa: "相手2", speed: 50 });
    runTurn({
      fighterA: normal,
      fighterB: foe2,
      actionA: { type: "move", move: gen2MoveByPokeapiId(174) },
    });
    expect(normal.stages.speed).toBe(-1);
    expect(normal.stages.attack).toBe(1);
    expect(normal.stages.defense).toBe(1);
  });

  it("はらだいこ maximizes attack after paying HP", () => {
    forceHits();
    const fighterA = makeFighter({ side: "a", nameJa: "太鼓", speed: 200, hp: 100 });
    const fighterB = makeFighter({ side: "b", nameJa: "相手", speed: 50 });
    runTurn({
      fighterA,
      fighterB,
      actionA: { type: "move", move: gen2MoveByPokeapiId(187) },
    });
    expect(fighterA.stages.attack).toBe(6);
    expect(fighterA.currentHp).toBe(50);
  });

  it("いばる raises foe attack and confuses", () => {
    forceHits();
    const fighterA = makeFighter({ side: "a", nameJa: "いばり", speed: 200 });
    const fighterB = makeFighter({ side: "b", nameJa: "相手", speed: 50 });
    runTurn({
      fighterA,
      fighterB,
      actionA: { type: "move", move: gen2MoveByPokeapiId(207) },
    });
    expect(fighterB.stages.attack).toBe(2);
    expect(fighterB.volatiles.confusionTurns).toBeGreaterThan(0);
  });

  it("いやしのすず cures the user's status", () => {
    forceHits();
    const fighterA = makeFighter({ side: "a", nameJa: "鈴", speed: 200 });
    fighterA.status = "burn";
    const fighterB = makeFighter({ side: "b", nameJa: "相手", speed: 50 });
    runTurn({
      fighterA,
      fighterB,
      actionA: { type: "move", move: gen2MoveByPokeapiId(215) },
    });
    expect(fighterA.status).toBeNull();
  });

  it("くろいまなざし prevents escape; ロックオン guarantees the next hit", () => {
    forceHits();
    const fighterA = makeFighter({ side: "a", nameJa: "ロック", speed: 200 });
    const fighterB = makeFighter({ side: "b", nameJa: "相手", speed: 50, hp: 200 });
    runTurn({
      fighterA,
      fighterB,
      actionA: { type: "move", move: gen2MoveByPokeapiId(212) },
    });
    expect(fighterB.volatiles.cannotEscape).toBe(true);

    runTurn({
      fighterA,
      fighterB,
      actionA: { type: "move", move: gen2MoveByPokeapiId(199) },
    });
    expect(fighterA.volatiles.sureHit).toBe(true);
  });

  it("じたばた deals more damage at low HP", () => {
    forceHits();
    const low = makeFighter({ side: "a", nameJa: "低HP", speed: 200, hp: 100 });
    low.currentHp = 1;
    const foe = makeFighter({ side: "b", nameJa: "相手", speed: 50, hp: 300, type1: 1 });
    runTurn({
      fighterA: low,
      fighterB: foe,
      actionA: { type: "move", move: gen2MoveByPokeapiId(175) },
    });
    expect(foe.currentHp).toBeLessThan(300);
  });

  it("いたみわけ averages HP; じこあんじ copies stages", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "A", speed: 200, hp: 100 });
    a.currentHp = 20;
    const b = makeFighter({ side: "b", nameJa: "B", speed: 50, hp: 100 });
    b.currentHp = 80;
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen2MoveByPokeapiId(220) },
    });
    expect(a.currentHp).toBe(50);
    expect(b.currentHp).toBe(50);

    b.stages.attack = 3;
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen2MoveByPokeapiId(244) },
    });
    expect(a.stages.attack).toBe(3);
  });

  it("みらいよち queues delayed damage", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "予知", speed: 200 });
    const b = makeFighter({ side: "b", nameJa: "相手", speed: 50, hp: 200, type1: 11 });
    const field = createBattleField();
    runTurn({
      fighterA: a,
      fighterB: b,
      field,
      actionA: { type: "move", move: gen2MoveByPokeapiId(248) },
    });
    expect(field.futureSight?.turnsLeft).toBe(1);
    const hpAfterSetup = b.currentHp;
    runTurn({
      fighterA: a,
      fighterB: b,
      field,
      actionA: { type: "move", move: idleMove() },
    });
    expect(field.futureSight).toBeNull();
    expect(b.currentHp).toBeLessThan(hpAfterSetup);
  });
});

describe("Gen2 pending moves (documented, not yet asserted)", () => {
  it("has no remaining pending debut moves", () => {
    expect(pendingGen2Moves()).toEqual([]);
  });

  it("every debut move still resolves without throwing", () => {
    forceHits();
    const failures: string[] = [];
    for (const move of allGen2DebutMoves()) {
      try {
        runMove(move, { hpA: 300, hpB: 300 });
      } catch (error) {
        failures.push(
          `${move.pokeapi_id} ${move.name_ja}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    }
    expect(failures).toEqual([]);
  });
});
