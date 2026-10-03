import { afterEach, describe, expect, it, vi } from "vitest";

import { ABILITY, isContactMove } from "./abilityEffects";
import { getMoveByPokeapiId } from "./gen1MovePool";
import {
  forceHits,
  gen2MoveByPokeapiId,
  makeFighter,
  runTurn,
} from "./test/harness";
import type { Move } from "../pokemon/moves";

afterEach(() => {
  vi.restoreAllMocks();
});

function gen1Move(pokeapiId: number): Move {
  const found = getMoveByPokeapiId(pokeapiId);
  if (!found) throw new Error(`Gen1 move ${pokeapiId} not found`);
  return found;
}

function hitSporeHolder(move: Move, attackerStatus: "paralysis" | null = null) {
  forceHits();
  const a = makeFighter({ side: "a", nameJa: "アタック", hp: 999 });
  const b = makeFighter({ side: "b", nameJa: "パラセクト", hp: 999 });
  a.status = attackerStatus;
  b.abilityPokeapiId = ABILITY.EFFECT_SPORE;
  b.abilityNameJa = "ほうし";
  const { result } = runTurn({
    fighterA: a,
    fighterB: b,
    actionA: { type: "move", move },
    rulesGeneration: 3,
  });
  return { a, logs: result.steps.flatMap((s) => s.logs) };
}

describe("ほうし（接触で状態異常にする特性）", () => {
  it("接触技を受けると特性名のあとに状態異常にする", () => {
    const { a, logs } = hitSporeHolder(gen2MoveByPokeapiId(242));
    expect(a.status).toBe("poison");
    const idx = logs.indexOf("パラセクトの　ほうし！");
    expect(idx).toBeGreaterThanOrEqual(0);
    expect(logs[idx + 1]).toBe("アタックは　どくを　あびた！");
  });

  it("すでに状態異常なら何も表示しない", () => {
    const { a, logs } = hitSporeHolder(gen2MoveByPokeapiId(242), "paralysis");
    expect(a.status).toBe("paralysis");
    expect(logs).not.toContain("パラセクトの　ほうし！");
    expect(logs).not.toContain("しかし　うまく　決まらなかった！");
  });

  it("接触しない技（じしん）では発動しない", () => {
    const { a, logs } = hitSporeHolder(gen1Move(89));
    expect(a.status).toBeNull();
    expect(logs).not.toContain("パラセクトの　ほうし！");
  });
});

describe("でんきタイプのまひ", () => {
  function thunderWaveOnElectric(rulesGeneration: number) {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "アタック" });
    const b = makeFighter({ side: "b", nameJa: "ピカチュウ", type1: 4 });
    const thunderWave = gen1Move(86);
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: { ...thunderWave, accuracy: 100 } },
      rulesGeneration,
    });
    return b.status;
  }

  it("2・3世代ではでんきタイプもまひする", () => {
    expect(thunderWaveOnElectric(2)).toBe("paralysis");
    expect(thunderWaveOnElectric(3)).toBe("paralysis");
  });

  it("1世代では従来どおりまひしない", () => {
    expect(thunderWaveOnElectric(1)).toBeNull();
  });

  it("せいでんきはでんきタイプの攻撃側もまひさせる", () => {
    forceHits();
    const a = makeFighter({ side: "a", nameJa: "ライボルト", hp: 999, type1: 4 });
    const b = makeFighter({ side: "b", nameJa: "マト", hp: 999 });
    b.abilityPokeapiId = ABILITY.STATIC;
    b.abilityNameJa = "せいでんき";
    runTurn({
      fighterA: a,
      fighterB: b,
      actionA: { type: "move", move: gen2MoveByPokeapiId(242) },
      rulesGeneration: 3,
    });
    expect(a.status).toBe("paralysis");
  });
});

describe("接触判定（3世代）", () => {
  it("特殊扱いでも接触するパンチ・かみくだくは接触、じしん・ねこだましは非接触", () => {
    expect(isContactMove(gen1Move(7))).toBe(true); // ほのおのパンチ
    expect(isContactMove(gen2MoveByPokeapiId(242))).toBe(true); // かみくだく
    expect(isContactMove(gen1Move(89))).toBe(false); // じしん
    expect(isContactMove({ pokeapi_id: 252 } as Move)).toBe(false); // ねこだまし
    expect(isContactMove({ pokeapi_id: 315 } as Move)).toBe(true); // オーバーヒート
  });
});
