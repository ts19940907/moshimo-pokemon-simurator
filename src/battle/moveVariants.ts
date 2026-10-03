import type { Move } from "../pokemon/moves";
import type { BattleStatus } from "./types";
import { weatherBallVariant } from "./weather";

export const FACADE_POKEAPI = 263;

/** Facade: power doubles while burned / paralyzed / poisoned. */
export function facadeVariant(move: Move, status: BattleStatus): Move {
  if (move.pokeapi_id !== FACADE_POKEAPI) return move;
  if (status !== "burn" && status !== "paralysis" && status !== "poison") {
    return move;
  }
  return { ...move, power: (move.power ?? 70) * 2 };
}

/**
 * Adjusted move → original move. Adjusted moves can come back in via lastMoveUsed
 * (e.g. Mirror Move), and must be recomputed for the new user and weather.
 */
const BASE_OF = new WeakMap<Move, Move>();

/** Move as it is actually used this turn (Facade / Weather Ball). */
export function moveForUse(
  move: Move,
  attackerStatus: BattleStatus,
  weatherId: string | null,
  rulesGeneration: number,
): Move {
  const base = BASE_OF.get(move) ?? move;
  const next = weatherBallVariant(
    facadeVariant(base, attackerStatus),
    weatherId,
    rulesGeneration,
  );
  if (next !== base) BASE_OF.set(next, base);
  return next;
}
