import { afterEach, describe, expect, it, vi } from "vitest";

import gen3Moves from "../data/gen3-moves.json";
import { EMPTY_EFFECT_META, type Move } from "../pokemon/moves";
import { ABILITY, markTruantSwitchIn } from "./abilityEffects";
import { getMoveByPokeapiId } from "./gen1MovePool";
import { moveForUse } from "./moveVariants";
import { weatherAdjustedAccuracy, weatherHealAmount } from "./weather";
import {
  forceHits,
  gen2MoveByPokeapiId,
  idleMove,
  makeFighter,
  runTurn,
} from "./test/harness";
import { createBattleField } from "./types";

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

function damageDealt(input: {
  move: Move;
  attackerStatus?: "poison" | "burn" | "paralysis" | null;
  weather?: "rain" | "sun" | "sand" | "hail" | null;
  defenderType1?: number;
}): number {
  forceHits();
  const a = makeFighter({ side: "a", nameJa: "アタック", hp: 999, type1: 7 });
  const b = makeFighter({
    side: "b",
    nameJa: "マト",
    hp: 999,
    type1: input.defenderType1 ?? 1,
  });
  a.status = input.attackerStatus ?? null;
  const field = createBattleField();
  if (input.weather) field.weather = { id: input.weather, turnsLeft: null };
  runTurn({
    fighterA: a,
    fighterB: b,
    actionA: { type: "move", move: input.move },
    field,
    rulesGeneration: 3,
  });
  vi.restoreAllMocks();
  return b.maxHp - b.currentHp;
}

describe("からげんき", () => {
  it("どく・まひ・やけど状態なら威力が2倍になる", () => {
    const facade = gen3Move(263);
    expect(moveForUse(facade, null, null, 3).power).toBe(70);
    expect(moveForUse(facade, "poison", null, 3).power).toBe(140);
    expect(moveForUse(facade, "paralysis", null, 3).power).toBe(140);
    expect(moveForUse(facade, "burn", null, 3).power).toBe(140);
    expect(moveForUse(facade, "sleep", null, 3).power).toBe(70);
  });

  it("どく状態で実際のダメージがほぼ2倍になる", () => {
    const normal = damageDealt({ move: gen3Move(263) });
    const poisoned = damageDealt({
      move: gen3Move(263),
      attackerStatus: "poison",
    });
    expect(poisoned).toBeGreaterThanOrEqual(normal * 2 - 2);
  });

  it("一度補正した技を再度通しても威力は重ねがけされない", () => {
    const once = moveForUse(gen3Move(263), "poison", null, 3);
    expect(moveForUse(once, "poison", null, 3).power).toBe(140);
  });
});

describe("ウェザーボール", () => {
  it("天候に応じてタイプと威力が変わる", () => {
    const wb = gen3Move(311);
    expect(moveForUse(wb, null, null, 3)).toMatchObject({
      type_id: 1,
      power: 50,
    });
    expect(moveForUse(wb, null, "rain", 3)).toMatchObject({
      type_id: 3,
      power: 100,
      damage_class: "special",
    });
    expect(moveForUse(wb, null, "sun", 3)).toMatchObject({
      type_id: 2,
      power: 100,
      damage_class: "special",
    });
    expect(moveForUse(wb, null, "sand", 3)).toMatchObject({
      type_id: 13,
      power: 100,
      damage_class: "physical",
    });
    expect(moveForUse(wb, null, "hail", 3)).toMatchObject({
      type_id: 6,
      power: 100,
      damage_class: "special",
    });
  });

  it("オウムがえし等で再利用されたときは使う側の天候で計算し直す", () => {
    const rainBall = moveForUse(gen3Move(311), null, "rain", 3);
    expect(moveForUse(rainBall, null, null, 3)).toMatchObject({
      type_id: 1,
      power: 50,
    });
    expect(moveForUse(rainBall, null, "sun", 3)).toMatchObject({
      type_id: 2,
      power: 100,
    });
    const poisonedFacade = moveForUse(gen3Move(263), "poison", null, 3);
    expect(moveForUse(poisonedFacade, null, null, 3).power).toBe(70);
  });

  it("あめの中ではみずタイプとしてほのおタイプに抜群で当たる", () => {
    const plain = damageDealt({ move: gen3Move(311), defenderType1: 2 });
    const rain = damageDealt({
      move: gen3Move(311),
      weather: "rain",
      defenderType1: 2,
    });
    expect(rain).toBeGreaterThan(plain * 5);
  });
});

describe("あられ", () => {
  it("あられを使うと天候があられになり、こおりタイプ以外がダメージを受ける", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "ユキワラシ", hp: 160, type1: 6 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 160 });
    const { result, field } = runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen3Move(258) },
      rulesGeneration: 3,
    });
    const logs = result.steps.flatMap((s) => s.logs);
    expect(field.weather?.id).toBe("hail");
    expect(logs).toContain("あられが　降り始めた！");
    expect(logs).toContain("マトは　あられで　ダメージを　受けた！");
    expect(b.currentHp).toBe(150);
    expect(a.currentHp).toBe(160);
  });

  it("あられ中にもう一度使うと失敗する", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "ユキワラシ", type1: 6 });
    const b = makeFighter({ side: "b", nameJa: "マト" });
    const field = createBattleField();
    field.weather = { id: "hail", turnsLeft: null };
    const { result } = runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen3Move(258) },
      field,
      rulesGeneration: 3,
    });
    expect(result.steps.flatMap((s) => s.logs)).toContain(
      "しかし　うまく　決まらなかった！",
    );
  });

  it("てんきやはあられでこおりタイプになる", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "ユキワラシ", type1: 6 });
    const b = makeFighter({ side: "b", nameJa: "ポワルン" });
    b.abilityPokeapiId = ABILITY.FORECAST;
    b.abilityNameJa = "てんきや";
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen3Move(258) },
      rulesGeneration: 3,
    });
    expect(b.battleType1).toBe(6);
  });
});

describe("天候で回復量が変わる技（あさのひざし・こうごうせい・つきのひかり）", () => {
  it("3世代: はれ2/3・その他の天候1/4・天候なし1/2", () => {
    expect(weatherHealAmount(300, 234, "sun", 3)).toBe(200);
    expect(weatherHealAmount(300, 235, "rain", 3)).toBe(75);
    expect(weatherHealAmount(300, 236, "sand", 3)).toBe(75);
    expect(weatherHealAmount(300, 234, "hail", 3)).toBe(75);
    expect(weatherHealAmount(300, 234, null, 3)).toBe(150);
    expect(weatherHealAmount(300, 105, "sun", 3)).toBeNull();
  });

  it("2世代: はれでは全回復", () => {
    expect(weatherHealAmount(300, 234, "sun", 2)).toBe(300);
    expect(weatherHealAmount(300, 234, "rain", 2)).toBe(75);
  });

  it("対戦中もはれでは2/3回復する", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "キレイハナ", hp: 300 });
    const b = makeFighter({ side: "b", nameJa: "マト" });
    a.currentHp = 30;
    const field = createBattleField();
    field.weather = { id: "sun", turnsLeft: null };
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen2MoveByPokeapiId(234) },
      field,
      rulesGeneration: 3,
    });
    expect(a.currentHp).toBe(230);
  });

  it("HPが満タンのときは失敗する", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "キレイハナ" });
    const b = makeFighter({ side: "b", nameJa: "マト" });
    const { result } = runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen2MoveByPokeapiId(234) },
      rulesGeneration: 3,
    });
    expect(result.steps.flatMap((s) => s.logs)).toContain(
      "しかし　うまく　決まらなかった！",
    );
  });
});

describe("その他の天候効果", () => {
  it("はれのかみなりは命中50", () => {
    expect(weatherAdjustedAccuracy(70, "sun", 87)).toBe(50);
    expect(weatherAdjustedAccuracy(70, null, 87)).toBe(70);
    expect(weatherAdjustedAccuracy(100, "sun", 85)).toBe(100);
  });

  it("すながくれは砂あらしのダメージを受けない", () => {
    const a = makeFighter({ side: "a", nameJa: "サボネア", hp: 160, type1: 5 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 160 });
    a.abilityPokeapiId = ABILITY.SAND_VEIL;
    a.abilityNameJa = "すながくれ";
    const field = createBattleField();
    field.weather = { id: "sand", turnsLeft: null };
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: idleMove() },
      field,
      rulesGeneration: 3,
    });
    expect(a.currentHp).toBe(160);
    expect(b.currentHp).toBe(150);
  });
});

describe("なまけ", () => {
  function truantFighter() {
    const a = makeFighter({ side: "a", nameJa: "ケッキング", hp: 999 });
    a.abilityPokeapiId = ABILITY.TRUANT;
    a.abilityNameJa = "なまけ";
    return a;
  }

  function loafedEachTurn(moves: Move[]): boolean[] {
    forceHits();
    const a = truantFighter();
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 999 });
    const field = createBattleField();
    return moves.map((move) => {
      const { result } = runTurn({
        fighterA: a,
        fighterB: b,
        actionA: { type: "move", move },
        field,
        rulesGeneration: 3,
      });
      return result.steps
        .flatMap((s) => s.logs)
        .includes("ケッキングは　なまけている！");
    });
  }

  it("攻撃技でも変化技でも1ターンおきになまける", () => {
    expect(loafedEachTurn([idleMove(), idleMove(), idleMove(), idleMove()]))
      .toEqual([false, true, false, true]);
    expect(
      loafedEachTurn([
        gen2MoveByPokeapiId(242),
        gen2MoveByPokeapiId(242),
        gen2MoveByPokeapiId(242),
      ]),
    ).toEqual([false, true, false]);
  });

  it("なまけるターンは特性名から表示する", () => {
    forceHits();
    const a = truantFighter();
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 999 });
    const field = createBattleField();
    runTurn({ fighterA: a, fighterB: b, actionA: { type: "move", move: idleMove() }, field, rulesGeneration: 3 });
    const { result } = runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: idleMove() },
      field,
      rulesGeneration: 3,
    });
    const logs = result.steps.flatMap((s) => s.logs);
    const idx = logs.indexOf("ケッキングの　なまけ！");
    expect(idx).toBeGreaterThanOrEqual(0);
    expect(logs[idx + 1]).toBe("ケッキングは　なまけている！");
  });

  it("3世代: ひんし後に繰り出されたターンはなまける", () => {
    forceHits();
    const a = truantFighter();
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 999 });
    markTruantSwitchIn(a, 3);
    const { result } = runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: idleMove() },
      rulesGeneration: 3,
    });
    expect(result.steps.flatMap((s) => s.logs)).toContain(
      "ケッキングは　なまけている！",
    );
  });

  it("3世代: 行動として交代で出た次のターンは動ける", () => {
    forceHits();
    const a = truantFighter();
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 999 });
    const field = createBattleField();
    markTruantSwitchIn(a, 3);
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "switch", index: 1 },
      field,
      rulesGeneration: 3,
    });
    const { result } = runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: idleMove() },
      field,
      rulesGeneration: 3,
    });
    expect(result.steps.flatMap((s) => s.logs)).not.toContain(
      "ケッキングは　なまけている！",
    );
  });

  it("はかいこうせんの反動はなまけるターンと重なる", () => {
    forceHits();
    const a = truantFighter();
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 999 });
    const field = createBattleField();
    const hyperBeam = getMoveByPokeapiId(63);
    if (!hyperBeam) throw new Error("Hyper Beam not found");
    const turnLogs = [hyperBeam, idleMove(), idleMove()].map(
      (move) =>
        runTurn({
          fighterA: a,
          fighterB: b,
          actionA: { type: "move", move },
          field,
          rulesGeneration: 3,
        }).result.steps.flatMap((s) => s.logs),
    );
    expect(turnLogs[1]).toContain("ケッキングは　なまけている！");
    expect(turnLogs[1]).not.toContain("ケッキングは　反動で　動けない！");
    expect(turnLogs[2]).not.toContain("ケッキングは　なまけている！");
    expect(turnLogs[2]).not.toContain("ケッキングは　反動で　動けない！");
  });
});
