import { gen1TypeEffectiveness } from "../gen1TypeChart";
import type { Move } from "../../pokemon/moves";
import { allGen2DebutMoves } from "./harness";

/** Moves whose Gen2-correct behavior is not yet defined/implemented enough to assert. */
export const PENDING_GEN2_MOVE_IDS = new Set<number>([
  // Covered by dedicated effect tests / category assertions once implemented.
]);

export function assertableGen2Moves(): Move[] {
  return allGen2DebutMoves().filter((m) => !PENDING_GEN2_MOVE_IDS.has(m.pokeapi_id));
}

export function pendingGen2Moves(): Move[] {
  return allGen2DebutMoves().filter((m) => PENDING_GEN2_MOVE_IDS.has(m.pokeapi_id));
}

/** Pick a defender type that is not immune under the battle chart currently used. */
export function defenderTypeForMoveType(moveTypeId: number): number {
  const candidates = [1, 5, 3, 2, 12, 13, 4, 9, 10, 11, 7, 8, 6, 15, 16, 17];
  for (const t of candidates) {
    if (gen1TypeEffectiveness(moveTypeId, t, 0) > 0) return t;
  }
  return 1;
}

export function stageKeyFromStat(
  stat: string,
  change: number,
):
  | "attack"
  | "defense"
  | "speed"
  | "accuracy"
  | "evasion"
  | "sp_attack"
  | "sp_defense"
  | null {
  if (stat === "attack") return "attack";
  if (stat === "defense") return "defense";
  if (stat === "speed") return "speed";
  if (stat === "accuracy") return "accuracy";
  if (stat === "evasion") return "evasion";
  if (stat === "special-attack") return "sp_attack";
  if (stat === "special-defense") return "sp_defense";
  if (stat === "special") return change < 0 ? "sp_defense" : "sp_attack";
  return null;
}
