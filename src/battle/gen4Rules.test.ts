import { afterEach, describe, expect, it, vi } from "vitest";

import gen4MoveValues from "../data/gen4-move-values.json";
import gen4Moves from "../data/gen4-moves.json";
import { EMPTY_EFFECT_META, type Move } from "../pokemon/moves";
import { applyMoveTypeForGeneration } from "../pokemon/moveTypeByGeneration";
import { ABILITY } from "./abilityEffects";
import { getMoveByPokeapiId } from "./gen1MovePool";
import { gen4VariablePower, moveSelectionBlockReason } from "./gen4MoveEffects";
import { applyEntryHazards, resolveTurnSteps } from "./resolveTurn";
import {
  forceHits,
  gen2MoveByPokeapiId,
  idleMove,
  makeFighter,
  runTurn,
} from "./test/harness";
import { TOOL_POKEAPI } from "./toolEffects";
import { createBattleField, type BattleFighter } from "./types";

afterEach(() => {
  vi.restoreAllMocks();
});

function gen4Move(pokeapiId: number): Move {
  const found = (gen4Moves as Move[]).find((m) => m.pokeapi_id === pokeapiId);
  if (!found) throw new Error(`Gen4 move ${pokeapiId} not found`);
  return { ...found, effect_meta: { ...EMPTY_EFFECT_META, ...(found.effect_meta ?? {}) } };
}

function gen1Move(pokeapiId: number): Move {
  const found = getMoveByPokeapiId(pokeapiId);
  if (!found) throw new Error(`Gen1 move ${pokeapiId} not found`);
  return found;
}

function gen4Fighter(input: Parameters<typeof makeFighter>[0]): BattleFighter {
  const f = makeFighter(input);
  f.rulesGeneration = 4;
  return f;
}

function hold(fighter: BattleFighter, pokeapiId: number, nameJa = "どうぐ"): void {
  fighter.heldTool = { pokeapiId, consumed: false, nameJa };
}

function setAbility(fighter: BattleFighter, id: number, nameJa: string): void {
  fighter.abilityPokeapiId = id;
  fighter.abilityNameJa = nameJa;
}

describe("物理・特殊の分離（4世代）", () => {
  const gen4Values: { pokeapi_id: number; damage_class: string }[] =
    gen4MoveValues;
  const gen4ClassOf = (pokeapiId: number) =>
    gen4Values.find((v) => v.pokeapi_id === pokeapiId)?.damage_class;

  it("4世代用の分割データは技ごとの分類になる", () => {
    expect(gen4ClassOf(7)).toBe("physical"); // ほのおのパンチ
    expect(gen4ClassOf(57)).toBe("special"); // なみのり
    expect(gen4ClassOf(247)).toBe("special"); // シャドーボール
    expect(gen4ClassOf(242)).toBe("physical"); // かみくだく
  });

  it("かみつくは3世代まで特殊、4世代用の行では物理のまま", () => {
    const bite = gen1Move(44);
    expect(applyMoveTypeForGeneration(bite, 3).damage_class).toBe("special");
    const gen4Row: Move = { ...bite, damage_class: "physical", available_generations: 504 };
    const adjusted = applyMoveTypeForGeneration(gen4Row, 4);
    expect(adjusted.damage_class).toBe("physical");
    expect(adjusted.type_id).toBe(16);
  });
});

describe("ステルスロック", () => {
  it("ほのお・ひこうタイプは最大HPの1/2を受ける", () => {
    const field = createBattleField();
    field.a.stealthRock = true;
    const f = gen4Fighter({ side: "a", nameJa: "リザ", hp: 160, type1: 2, type2: 10 });
    const logs: string[] = [];
    applyEntryHazards(f, field, logs, 4);
    expect(f.currentHp).toBe(80);
  });

  it("マジックガードならダメージを受けない", () => {
    const field = createBattleField();
    field.a.stealthRock = true;
    const f = gen4Fighter({ side: "a", nameJa: "ピクシー", hp: 160 });
    setAbility(f, ABILITY.MAGIC_GUARD, "マジックガード");
    applyEntryHazards(f, field, [], 4);
    expect(f.currentHp).toBe(160);
  });
});

describe("とんぼがえり", () => {
  it("攻撃後に交代待ちになり、続きのターンで相手が行動する", () => {
    forceHits();
    const a = gen4Fighter({ side: "a", nameJa: "ハッサム", hp: 300, speed: 200 });
    const b = gen4Fighter({ side: "b", nameJa: "マト", hp: 300, speed: 50 });
    const field = createBattleField();
    const tackle = gen1Move(33);
    const first = resolveTurnSteps({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen4Move(369) },
      actionB: { type: "move", move: tackle },
      field,
      rulesGeneration: 4,
    });
    expect(first.pendingSelfSwitch).toBe("a");
    expect(b.currentHp).toBeLessThan(300);
    expect(a.currentHp).toBe(300);

    const replacement = gen4Fighter({ side: "a", nameJa: "コウタイ", hp: 300 });
    const rest = resolveTurnSteps({
      fighterA: replacement,
      fighterB: b,
      actionA: { type: "move", move: gen4Move(369) },
      actionB: { type: "move", move: tackle },
      field,
      rulesGeneration: 4,
      skipSides: first.actedSides,
      continuation: true,
    });
    expect(rest.pendingSelfSwitch).toBeNull();
    expect(replacement.currentHp).toBeLessThan(300);
  });
});

describe("ふいうち", () => {
  it("相手が変化技を選んでいると失敗する", () => {
    forceHits();
    const a = gen4Fighter({ side: "a", nameJa: "アブソル", hp: 300 });
    const b = gen4Fighter({ side: "b", nameJa: "マト", hp: 300 });
    const { result } = runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen4Move(389) },
      actionB: { type: "move", move: idleMove() },
      rulesGeneration: 4,
    });
    expect(result.steps.flatMap((s) => s.logs)).toContain("しかし　うまく　決まらなかった！");
    expect(b.currentHp).toBe(300);
  });

  it("相手が攻撃技を選んでいれば先制で当たる", () => {
    forceHits();
    const a = gen4Fighter({ side: "a", nameJa: "アブソル", hp: 300, speed: 10 });
    const b = gen4Fighter({ side: "b", nameJa: "マト", hp: 300, speed: 200 });
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen4Move(389) },
      actionB: { type: "move", move: gen1Move(33) },
      rulesGeneration: 4,
    });
    expect(b.currentHp).toBeLessThan(300);
  });
});

describe("トリックルーム", () => {
  it("遅いほうが先に行動する", () => {
    forceHits();
    const a = gen4Fighter({ side: "a", nameJa: "ハヤイ", hp: 300, speed: 200 });
    const b = gen4Fighter({ side: "b", nameJa: "オソイ", hp: 300, speed: 50 });
    const field = createBattleField();
    field.trickRoomTurns = 3;
    const { result } = runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen1Move(33) },
      actionB: { type: "move", move: gen1Move(33) },
      field,
      rulesGeneration: 4,
    });
    const logs = result.steps.flatMap((s) => s.logs);
    const slowIdx = logs.findIndex((l) => l.startsWith("オソイの"));
    const fastIdx = logs.findIndex((l) => l.startsWith("ハヤイの"));
    expect(slowIdx).toBeGreaterThanOrEqual(0);
    expect(slowIdx).toBeLessThan(fastIdx);
    expect(field.trickRoomTurns).toBe(2);
  });
});

describe("いのちのたま", () => {
  it("攻撃後に最大HPの1/10を失う", () => {
    forceHits();
    const a = gen4Fighter({ side: "a", nameJa: "アタック", hp: 200 });
    const b = gen4Fighter({ side: "b", nameJa: "マト", hp: 999 });
    hold(a, TOOL_POKEAPI.LIFE_ORB, "いのちのたま");
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen1Move(33) },
      rulesGeneration: 4,
    });
    expect(a.currentHp).toBe(180);
  });

  it("マジックガードなら反動を受けない", () => {
    forceHits();
    const a = gen4Fighter({ side: "a", nameJa: "アタック", hp: 200 });
    const b = gen4Fighter({ side: "b", nameJa: "マト", hp: 999 });
    hold(a, TOOL_POKEAPI.LIFE_ORB, "いのちのたま");
    setAbility(a, ABILITY.MAGIC_GUARD, "マジックガード");
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen1Move(33) },
      rulesGeneration: 4,
    });
    expect(a.currentHp).toBe(200);
  });
});

describe("きあいのタスキ", () => {
  it("HP満タンなら一撃で倒れずHP1で耐える", () => {
    forceHits();
    const a = gen4Fighter({ side: "a", nameJa: "アタック", hp: 300 });
    const b = gen4Fighter({ side: "b", nameJa: "マト", hp: 5 });
    hold(b, TOOL_POKEAPI.FOCUS_SASH, "きあいのタスキ");
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen1Move(33) },
      rulesGeneration: 4,
    });
    expect(b.currentHp).toBe(1);
    expect(b.heldTool?.consumed).toBe(true);
  });
});

describe("きもったま・かたやぶり", () => {
  it("きもったまならノーマル技がゴーストに当たる", () => {
    forceHits();
    const a = gen4Fighter({ side: "a", nameJa: "ケンタロス", hp: 300 });
    const b = gen4Fighter({ side: "b", nameJa: "ゲンガー", hp: 300, type1: 14 });
    setAbility(a, ABILITY.SCRAPPY, "きもったま");
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen1Move(33) },
      rulesGeneration: 4,
    });
    expect(b.currentHp).toBeLessThan(300);
  });

  it("かたやぶりならふゆうの相手にじしんが当たり、特性は元に戻る", () => {
    forceHits();
    const a = gen4Fighter({ side: "a", nameJa: "カイリキー", hp: 300 });
    const b = gen4Fighter({ side: "b", nameJa: "ゲンガー", hp: 300 });
    setAbility(a, ABILITY.MOLD_BREAKER, "かたやぶり");
    setAbility(b, ABILITY.LEVITATE, "ふゆう");
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen1Move(89) },
      rulesGeneration: 4,
    });
    expect(b.currentHp).toBeLessThan(300);
    expect(b.abilityPokeapiId).toBe(ABILITY.LEVITATE);
  });
});

describe("天気の継続ターン（4世代）", () => {
  it("あまごいは5ターン、しめったいわで8ターン", () => {
    const rainDance = gen2MoveByPokeapiId(240);
    const plain = gen4Fighter({ side: "a", nameJa: "ニョロトノ", hp: 300 });
    const { field } = runTurn({
      fighterA: plain,
      fighterB: gen4Fighter({ side: "b", nameJa: "マト", hp: 300 }),
      actionA: { type: "move", move: rainDance },
      rulesGeneration: 4,
    });
    // The turn it was used counts as the first turn.
    expect(field.weather?.turnsLeft).toBe(4);

    const rock = gen4Fighter({ side: "a", nameJa: "ニョロトノ", hp: 300 });
    hold(rock, TOOL_POKEAPI.DAMP_ROCK, "しめったいわ");
    const { field: rockField } = runTurn({
      fighterA: rock,
      fighterB: gen4Fighter({ side: "b", nameJa: "マト", hp: 300 }),
      actionA: { type: "move", move: rainDance },
      rulesGeneration: 4,
    });
    expect(rockField.weather?.turnsLeft).toBe(7);
  });
});

describe("こだわり系の持ち物", () => {
  it("最初に出した技しか選べなくなる", () => {
    forceHits();
    const a = gen4Fighter({ side: "a", nameJa: "アタック", hp: 300 });
    const b = gen4Fighter({ side: "b", nameJa: "マト", hp: 999 });
    hold(a, TOOL_POKEAPI.CHOICE_BAND, "こだわりハチマキ");
    const tackle = gen1Move(33);
    a.member = { ...a.member, moveIds: [tackle.id, gen1Move(89).id, null, null] };
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: tackle },
      rulesGeneration: 4,
    });
    expect(moveSelectionBlockReason(a, tackle)).toBeNull();
    expect(moveSelectionBlockReason(a, gen1Move(89))).not.toBeNull();
  });
});

describe("威力が変わる技", () => {
  it("ジャイロボールは素早さの比で威力が決まる（最大150）", () => {
    const a = gen4Fighter({ side: "a", nameJa: "ドータクン", hp: 300 });
    const b = gen4Fighter({ side: "b", nameJa: "マト", hp: 300 });
    const gyro = gen4Move(360);
    const ctx = { rulesGeneration: 4, ppAfterUse: null };
    expect(gen4VariablePower(gyro, a, b, { ...ctx, attackerSpeed: 50, defenderSpeed: 100 })).toBe(51);
    expect(gen4VariablePower(gyro, a, b, { ...ctx, attackerSpeed: 10, defenderSpeed: 200 })).toBe(150);
  });

  it("きりふだは残りPPが少ないほど強い", () => {
    const a = gen4Fighter({ side: "a", nameJa: "アタック", hp: 300 });
    const b = gen4Fighter({ side: "b", nameJa: "マト", hp: 300 });
    const trumpCard = gen4Move(376);
    const ctx = { rulesGeneration: 4, attackerSpeed: 1, defenderSpeed: 1 };
    expect(gen4VariablePower(trumpCard, a, b, { ...ctx, ppAfterUse: 4 })).toBe(40);
    expect(gen4VariablePower(trumpCard, a, b, { ...ctx, ppAfterUse: 0 })).toBe(200);
  });
});
