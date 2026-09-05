import type { BattleFighter } from "./types";

const PROTECT_FAMILY = new Set([182, 197, 203]); // Protect, Detect, Endure

export function isProtectFamilyMove(pokeapiId: number): boolean {
  return PROTECT_FAMILY.has(pokeapiId);
}

/** Gen2: 255, then floor(/3) each consecutive success. */
export function protectSuccessThreshold(streak: number): number {
  let chance = 255;
  for (let i = 0; i < streak; i += 1) {
    chance = Math.floor(chance / 3);
  }
  return chance;
}

export function rollProtectFamilySuccess(
  streak: number,
  rand255: () => number,
): boolean {
  const threshold = protectSuccessThreshold(streak);
  if (threshold <= 0) return false;
  return rand255() < threshold;
}

export function clearTurnProtection(fighter: BattleFighter): void {
  fighter.volatiles.protection = null;
}

export function noteNonProtectMove(fighter: BattleFighter): void {
  if (!fighter.volatiles.usedProtectFamilyThisTurn) {
    fighter.volatiles.protectStreak = 0;
  }
}
