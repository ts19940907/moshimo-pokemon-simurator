import type { Move } from "../pokemon/moves";
import {
  isProtectFamilyMove,
  rollProtectFamilySuccess,
} from "./gen2Protection";
import type { BattleFieldState, BattleFighter, TurnLogLine } from "./types";
import { isSandstormImmune } from "./weather";

function rand255(): number {
  return Math.floor(Math.random() * 256);
}

function randInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function tryExecuteProtectFamily(
  attacker: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
): boolean {
  if (!isProtectFamilyMove(move.pokeapi_id)) return false;

  const ok = rollProtectFamilySuccess(
    attacker.volatiles.protectStreak,
    rand255,
  );
  if (!ok) {
    attacker.volatiles.protectStreak = 0;
    logs.push("しかし　うまく　決まらなかった！");
    attacker.volatiles.lastMoveUsed = move;
    return true;
  }

  attacker.volatiles.protectStreak += 1;
  attacker.volatiles.usedProtectFamilyThisTurn = true;
  if (move.pokeapi_id === 203) {
    attacker.volatiles.protection = "endure";
    logs.push(`${attacker.member.nameJa}は　攻撃に　こらえる体勢に　なった！`);
  } else {
    attacker.volatiles.protection = "protect";
    logs.push(`${attacker.member.nameJa}は　守りの　体勢に　入った！`);
  }
  attacker.volatiles.lastMoveUsed = move;
  return true;
}

/** Returns true when Protect blocked the interaction. */
export function blockedByProtect(
  target: BattleFighter,
  logs: TurnLogLine[],
): boolean {
  if (target.volatiles.protection !== "protect") return false;
  logs.push(`${target.member.nameJa}は　攻撃を　守った！`);
  return true;
}

export function applyEndureIfNeeded(
  target: BattleFighter,
  nextHp: number,
  logs?: TurnLogLine[],
): number {
  if (
    target.volatiles.protection === "endure" &&
    nextHp <= 0 &&
    target.currentHp > 0
  ) {
    logs?.push(`${target.member.nameJa}は　攻撃を　こらえた！`);
    return 1;
  }
  return nextHp;
}

export function tryExecuteCurse(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
): boolean {
  if (move.pokeapi_id !== 174) return false;
  const isGhost =
    attacker.species.type1 === 14 || attacker.species.type2 === 14;
  if (isGhost) {
    if (blockedByProtect(defender, logs)) {
      attacker.volatiles.lastMoveUsed = move;
      return true;
    }
    const cost = Math.max(1, Math.floor(attacker.maxHp / 2));
    attacker.currentHp = Math.max(0, attacker.currentHp - cost);
    defender.volatiles.cursed = true;
    logs.push(`${defender.member.nameJa}は　のろいを　かけられた！`);
  } else {
    attacker.stages.speed = Math.max(-6, attacker.stages.speed - 1);
    attacker.stages.attack = Math.min(6, attacker.stages.attack + 1);
    attacker.stages.defense = Math.min(6, attacker.stages.defense + 1);
    logs.push(`${attacker.member.nameJa}の　すばやさが　下がった！`);
    logs.push(`${attacker.member.nameJa}の　こうげきが　上がった！`);
    logs.push(`${attacker.member.nameJa}の　ぼうぎょが　上がった！`);
  }
  attacker.volatiles.lastMoveUsed = move;
  return true;
}

export function tryExecuteBellyDrum(
  attacker: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
): boolean {
  if (move.pokeapi_id !== 187) return false;
  const cost = Math.floor(attacker.maxHp / 2);
  if (attacker.currentHp <= cost) {
    logs.push("しかし　うまく　決まらなかった！");
    attacker.volatiles.lastMoveUsed = move;
    return true;
  }
  attacker.currentHp = Math.max(1, attacker.currentHp - cost);
  attacker.stages.attack = 6;
  logs.push(`${attacker.member.nameJa}は　自分の体力を　削って　全パワーを　出した！`);
  attacker.volatiles.lastMoveUsed = move;
  return true;
}

export function tryExecuteSwagger(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
  field: BattleFieldState,
): boolean {
  if (move.pokeapi_id !== 207) return false;
  if (blockedByProtect(defender, logs)) {
    attacker.volatiles.lastMoveUsed = move;
    return true;
  }
  if (field[defender.side].safeguardTurns > 0) {
    logs.push(`${defender.member.nameJa}は　しんぴのまもりで　守られている！`);
    attacker.volatiles.lastMoveUsed = move;
    return true;
  }
  defender.stages.attack = Math.min(6, defender.stages.attack + 2);
  logs.push(`${defender.member.nameJa}の　こうげきが　ぐーんと上がった！`);
  if (defender.volatiles.confusionTurns <= 0) {
    defender.volatiles.confusionTurns = randInt(2, 5);
    logs.push(`${defender.member.nameJa}は　こんらんした！`);
  }
  attacker.volatiles.lastMoveUsed = move;
  return true;
}

export function tryExecuteHealBell(
  attacker: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
): boolean {
  if (move.pokeapi_id !== 215) return false;
  // Singles / active-only: cure the user. Full party cure needs party context.
  attacker.status = null;
  attacker.sleepTurns = 0;
  attacker.volatiles.confusionTurns = 0;
  logs.push("鈴の音が　響き渡った！");
  attacker.volatiles.lastMoveUsed = move;
  return true;
}

export function tryExecuteSpikes(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  field: BattleFieldState,
  logs: TurnLogLine[],
): boolean {
  if (move.pokeapi_id !== 191) return false;
  const foeSide = field[defender.side];
  if (foeSide.spikes) {
    logs.push("しかし　うまく　決まらなかった！");
  } else {
    foeSide.spikes = true;
    logs.push(`${defender.side === "a" ? "サイドA" : "サイドB"}の　足元に　まきびしが　散らばった！`);
  }
  attacker.volatiles.lastMoveUsed = move;
  return true;
}

export function tryExecuteSafeguard(
  attacker: BattleFighter,
  move: Move,
  field: BattleFieldState,
  logs: TurnLogLine[],
): boolean {
  if (move.pokeapi_id !== 219) return false;
  const side = field[attacker.side];
  if (side.safeguardTurns > 0) {
    logs.push("しかし　うまく　決まらなかった！");
  } else {
    side.safeguardTurns = 5;
    logs.push(`${attacker.member.nameJa}の　味方は　しんぴのまもりに　守られた！`);
  }
  attacker.volatiles.lastMoveUsed = move;
  return true;
}

export function applySpikesOnSwitchIn(
  fighter: BattleFighter,
  field: BattleFieldState,
  logs: TurnLogLine[],
): void {
  if (!field[fighter.side].spikes) return;
  if (fighter.species.type1 === 10 || fighter.species.type2 === 10) return; // Flying
  const dmg = Math.max(1, Math.floor(fighter.maxHp / 8));
  fighter.currentHp = Math.max(0, fighter.currentHp - dmg);
  logs.push(`${fighter.member.nameJa}は　まきびしで　ダメージを　受けた！`);
}

export function applySandstormResidual(
  fighter: BattleFighter,
  field: BattleFieldState,
  logs: TurnLogLine[],
): void {
  if (field.weather?.id !== "sand") return;
  if (fighter.currentHp <= 0) return;
  if (isSandstormImmune(fighter.species.type1, fighter.species.type2)) return;
  const dmg = Math.max(1, Math.floor(fighter.maxHp / 16));
  fighter.currentHp = Math.max(0, fighter.currentHp - dmg);
  logs.push(`${fighter.member.nameJa}は　砂あらしで　ダメージを　受けた！`);
}

export function applyCurseResidual(
  fighter: BattleFighter,
  logs: TurnLogLine[],
): void {
  if (!fighter.volatiles.cursed || fighter.currentHp <= 0) return;
  const dmg = Math.max(1, Math.floor(fighter.maxHp / 4));
  fighter.currentHp = Math.max(0, fighter.currentHp - dmg);
  logs.push(`${fighter.member.nameJa}は　のろいで　ダメージを　受けた！`);
}

export function tickSafeguard(field: BattleFieldState, logs: TurnLogLine[]): void {
  for (const side of ["a", "b"] as const) {
    if (field[side].safeguardTurns <= 0) continue;
    field[side].safeguardTurns -= 1;
    if (field[side].safeguardTurns <= 0) {
      logs.push(
        `${side === "a" ? "サイドA" : "サイドB"}の　しんぴのまもりが　消えた！`,
      );
    }
  }
}

export function safeguardBlocksStatus(
  field: BattleFieldState,
  target: BattleFighter,
): boolean {
  return field[target.side].safeguardTurns > 0;
}
