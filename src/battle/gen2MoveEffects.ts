import type { Move } from "../pokemon/moves";
import type { BattleFighter, BattleFieldState, TurnLogLine } from "./types";
import { blockedByProtect } from "./gen2UniqueMoves";

/** Gen2 Flail / Reversal power from remaining HP fraction. */
export function flailReversalPower(currentHp: number, maxHp: number): number {
  if (maxHp <= 0) return 20;
  const ratio = currentHp / maxHp;
  if (ratio <= 0.0417) return 200;
  if (ratio <= 0.1042) return 150;
  if (ratio <= 0.2083) return 100;
  if (ratio <= 0.3542) return 80;
  if (ratio <= 0.6875) return 40;
  return 20;
}

/** Friendship not modeled: Return assumes 255, Frustration assumes 0. */
export function returnFrustrationPower(pokeapiId: number): number {
  // floor(255 / 2.5) = 102
  if (pokeapiId === 216 || pokeapiId === 218) return 102;
  return 1;
}

/** Gen2 Magnitude: random power table. */
export function rollMagnitudePower(randInt: (min: number, max: number) => number): {
  magnitude: number;
  power: number;
} {
  const roll = randInt(0, 99);
  if (roll < 5) return { magnitude: 4, power: 10 };
  if (roll < 15) return { magnitude: 5, power: 30 };
  if (roll < 35) return { magnitude: 6, power: 50 };
  if (roll < 65) return { magnitude: 7, power: 70 };
  if (roll < 85) return { magnitude: 8, power: 90 };
  if (roll < 95) return { magnitude: 9, power: 110 };
  return { magnitude: 10, power: 150 };
}

export function resolveVariableMovePower(
  move: Move,
  attacker: BattleFighter,
  randInt: (min: number, max: number) => number,
): { power: number | null; log?: string } {
  const id = move.pokeapi_id;
  if (id === 175 || id === 179) {
    return {
      power: flailReversalPower(attacker.currentHp, attacker.maxHp),
    };
  }
  if (id === 216 || id === 218) {
    return { power: returnFrustrationPower(id) };
  }
  if (id === 222) {
    const { magnitude, power } = rollMagnitudePower(randInt);
    return { power, log: `マグニチュード${magnitude}！` };
  }
  if (id === 217) {
    // Present: handled separately (may heal).
    return { power: null };
  }
  return { power: move.power };
}

export function tryExecuteTrapPreventEscape(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
): boolean {
  if (move.pokeapi_id !== 169 && move.pokeapi_id !== 212) return false;
  if (blockedByProtect(defender, logs)) {
    attacker.volatiles.lastMoveUsed = move;
    return true;
  }
  if (defender.volatiles.cannotEscape) {
    logs.push("しかし　うまく　決まらなかった！");
  } else {
    defender.volatiles.cannotEscape = true;
    logs.push(`${defender.member.nameJa}は　もう　逃げられない！`);
  }
  attacker.volatiles.lastMoveUsed = move;
  return true;
}

export function tryExecuteSureHit(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
): boolean {
  if (move.pokeapi_id !== 170 && move.pokeapi_id !== 199) return false;
  if (blockedByProtect(defender, logs)) {
    attacker.volatiles.lastMoveUsed = move;
    return true;
  }
  attacker.volatiles.sureHit = true;
  logs.push(`${attacker.member.nameJa}は　狙を　定めた！`);
  attacker.volatiles.lastMoveUsed = move;
  return true;
}

export function tryExecutePainSplit(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
): boolean {
  if (move.pokeapi_id !== 220) return false;
  if (blockedByProtect(defender, logs)) {
    attacker.volatiles.lastMoveUsed = move;
    return true;
  }
  const avg = Math.floor((attacker.currentHp + defender.currentHp) / 2);
  attacker.currentHp = Math.min(attacker.maxHp, avg);
  defender.currentHp = Math.min(defender.maxHp, avg);
  logs.push("お互いの　体力を　分け合った！");
  attacker.volatiles.lastMoveUsed = move;
  return true;
}

export function tryExecutePsychUp(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
): boolean {
  if (move.pokeapi_id !== 244) return false;
  attacker.stages = { ...defender.stages };
  logs.push(`${attacker.member.nameJa}は　能力変化を　コピーした！`);
  attacker.volatiles.lastMoveUsed = move;
  return true;
}

export function tryExecuteDestinyBond(
  attacker: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
): boolean {
  if (move.pokeapi_id !== 194) return false;
  attacker.volatiles.destinyBond = true;
  logs.push(`${attacker.member.nameJa}は　相手を　道連れに　しようとしている！`);
  attacker.volatiles.lastMoveUsed = move;
  return true;
}

export function tryExecuteForesight(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
): boolean {
  if (move.pokeapi_id !== 193) return false;
  if (blockedByProtect(defender, logs)) {
    attacker.volatiles.lastMoveUsed = move;
    return true;
  }
  defender.volatiles.foresight = true;
  logs.push(`${defender.member.nameJa}の　正体を　見破った！`);
  attacker.volatiles.lastMoveUsed = move;
  return true;
}

export function tryExecutePerishSong(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
): boolean {
  if (move.pokeapi_id !== 195) return false;
  attacker.volatiles.perishCount = 3;
  defender.volatiles.perishCount = 3;
  logs.push("滅びの歌を　口ずさんだ！");
  attacker.volatiles.lastMoveUsed = move;
  return true;
}

export function tryExecuteAttract(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
  field: BattleFieldState,
): boolean {
  if (move.pokeapi_id !== 213) return false;
  if (blockedByProtect(defender, logs)) {
    attacker.volatiles.lastMoveUsed = move;
    return true;
  }
  if (field[defender.side].safeguardTurns > 0) {
    logs.push(`${defender.member.nameJa}は　しんぴのまもりで　守られている！`);
    attacker.volatiles.lastMoveUsed = move;
    return true;
  }
  const ag = attacker.member.gender;
  const dg = defender.member.gender;
  const opposite =
    (ag === "male" && dg === "female") || (ag === "female" && dg === "male");
  if (!opposite) {
    logs.push("しかし　うまく　決まらなかった！");
  } else {
    defender.volatiles.infatuated = true;
    logs.push(`${defender.member.nameJa}は　メロメロに　なった！`);
  }
  attacker.volatiles.lastMoveUsed = move;
  return true;
}

export function tryExecuteNightmare(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
): boolean {
  if (move.pokeapi_id !== 171) return false;
  if (blockedByProtect(defender, logs)) {
    attacker.volatiles.lastMoveUsed = move;
    return true;
  }
  if (defender.status !== "sleep") {
    logs.push("しかし　うまく　決まらなかった！");
  } else {
    defender.volatiles.nightmare = true;
    logs.push(`${defender.member.nameJa}は　悪夢を　見始めた！`);
  }
  attacker.volatiles.lastMoveUsed = move;
  return true;
}

export function tryExecuteBatonPass(
  attacker: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
  ctx?: { forceSwitchSide?: "a" | "b" | null },
): boolean {
  if (move.pokeapi_id !== 226) return false;
  attacker.volatiles.batonPass = true;
  logs.push(`${attacker.member.nameJa}は　バトンを　触れた！`);
  if (ctx) ctx.forceSwitchSide = attacker.side;
  attacker.volatiles.lastMoveUsed = move;
  return true;
}

export function tryExecuteSpite(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
): boolean {
  if (move.pokeapi_id !== 180) return false;
  if (blockedByProtect(defender, logs)) {
    attacker.volatiles.lastMoveUsed = move;
    return true;
  }
  // PP system lives in the UI; battle engine only announces the effect.
  if (!defender.volatiles.lastMoveUsed) {
    logs.push("しかし　うまく　決まらなかった！");
  } else {
    logs.push(
      `${defender.member.nameJa}の　${defender.volatiles.lastMoveUsed.name_ja}の　PPが　減った！`,
    );
  }
  attacker.volatiles.lastMoveUsed = move;
  return true;
}
