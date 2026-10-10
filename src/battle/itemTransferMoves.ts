/**
 * Moves that move or remove held items: Thief (Gen2+), Trick / Knock Off (Gen3).
 */
import type { Move } from "../pokemon/moves";
import { ABILITY, announceAbility, hasAbility } from "./abilityEffects";
import {
  adjustHeldItemStatsForSwap,
  heldToolNameJa,
  heldToolPokeapiId,
  tryHpThresholdBerry,
} from "./toolEffects";
import type { BattleFighter, TurnLogLine } from "./types";

export const ITEM_MOVE_POKEAPI = {
  THIEF: 168,
  TRICK: 271,
  KNOCK_OFF: 282,
  /** Gen4 Switcheroo: same as Trick. */
  SWITCHEROO: 415,
} as const;

type HeldItem = { pokeapiId: number; nameJa: string };

function usableItem(fighter: BattleFighter): HeldItem | null {
  const id = heldToolPokeapiId(fighter);
  if (id == null) return null;
  return { pokeapiId: id, nameJa: heldToolNameJa(fighter.heldTool) };
}

function noteItemLost(fighter: BattleFighter): void {
  if (hasAbility(fighter, ABILITY.UNBURDEN)) fighter.volatiles.unburdenActive = true;
  fighter.volatiles.choiceLockMoveId = null;
}

function canReceiveItem(fighter: BattleFighter): boolean {
  return !fighter.heldTool?.knockedOff;
}

function setHeldItem(
  fighter: BattleFighter,
  item: HeldItem | null,
  rulesGeneration: number,
): void {
  const before = heldToolPokeapiId(fighter);
  fighter.heldTool = item
    ? { pokeapiId: item.pokeapiId, consumed: false, nameJa: item.nameJa }
    : null;
  if (before != null && !item) noteItemLost(fighter);
  fighter.volatiles.choiceLockMoveId = null;
  adjustHeldItemStatsForSwap(
    fighter,
    before,
    item?.pokeapiId ?? null,
    rulesGeneration,
  );
}

function stickyHoldBlocks(
  holder: BattleFighter,
  logs: TurnLogLine[],
): boolean {
  if (!hasAbility(holder, ABILITY.STICKY_HOLD)) return false;
  logs.push(announceAbility(holder));
  return true;
}

/**
 * Trick: swap held items. Accuracy / Protect are checked by the caller.
 * Returns false when the move is not Trick.
 */
export function tryExecuteTrick(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
  rulesGeneration: number,
): boolean {
  if (
    move.pokeapi_id !== ITEM_MOVE_POKEAPI.TRICK &&
    move.pokeapi_id !== ITEM_MOVE_POKEAPI.SWITCHEROO
  ) {
    return false;
  }
  attacker.volatiles.lastMoveUsed = move;
  const fail = () => logs.push("しかし　うまく　決まらなかった！");

  if (defender.volatiles.substituteHp > 0) {
    fail();
    return true;
  }
  const mine = usableItem(attacker);
  const theirs = usableItem(defender);
  if (
    (!mine && !theirs) ||
    !canReceiveItem(attacker) ||
    !canReceiveItem(defender)
  ) {
    fail();
    return true;
  }
  if (stickyHoldBlocks(defender, logs)) {
    fail();
    return true;
  }

  setHeldItem(attacker, theirs, rulesGeneration);
  setHeldItem(defender, mine, rulesGeneration);
  logs.push(`${attacker.member.nameJa}は　どうぐを　すりかえた！`);
  if (theirs) {
    logs.push(`${attacker.member.nameJa}は　${theirs.nameJa}を　手に入れた！`);
  }
  if (mine) {
    logs.push(`${defender.member.nameJa}は　${mine.nameJa}を　手に入れた！`);
  }
  tryHpThresholdBerry(attacker, logs);
  tryHpThresholdBerry(defender, logs);
  return true;
}

/**
 * Thief / Knock Off item effect after a damaging hit.
 * `hitSubstitute` = the hit landed on a substitute (no item effect).
 */
export function applyItemMoveAfterHit(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  hitSubstitute: boolean,
  logs: TurnLogLine[],
  rulesGeneration: number,
): void {
  if (hitSubstitute || attacker.currentHp <= 0) return;

  if (move.pokeapi_id === ITEM_MOVE_POKEAPI.THIEF) {
    const theirs = usableItem(defender);
    if (!theirs || usableItem(attacker)) return;
    if (!canReceiveItem(attacker)) {
      logs.push(
        `${attacker.member.nameJa}は　はたき落とされた　${heldToolNameJa(attacker.heldTool)}を　持っているので　奪えなかった！`,
      );
      return;
    }
    if (stickyHoldBlocks(defender, logs)) return;
    setHeldItem(defender, null, rulesGeneration);
    setHeldItem(attacker, theirs, rulesGeneration);
    logs.push(
      `${attacker.member.nameJa}は　${defender.member.nameJa}から　${theirs.nameJa}を　奪い取った！`,
    );
    tryHpThresholdBerry(attacker, logs);
    return;
  }

  if (move.pokeapi_id === ITEM_MOVE_POKEAPI.KNOCK_OFF) {
    const theirs = usableItem(defender);
    if (!theirs) return;
    if (stickyHoldBlocks(defender, logs)) return;
    adjustHeldItemStatsForSwap(
      defender,
      theirs.pokeapiId,
      null,
      rulesGeneration,
    );
    defender.heldTool = {
      pokeapiId: theirs.pokeapiId,
      consumed: true,
      nameJa: theirs.nameJa,
      knockedOff: true,
    };
    noteItemLost(defender);
    logs.push(
      `${attacker.member.nameJa}は　${defender.member.nameJa}の　${theirs.nameJa}を　はたき落とした！`,
    );
  }
}
