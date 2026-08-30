import type { Move } from "./moves";

/**
 * Fairy (18) did not exist before Gen6.
 * Pre-Gen6 those moves were Normal (1) — e.g. Sweet Kiss, Charm, Moonlight.
 */
export function moveTypeIdForGeneration(
  typeId: number,
  rulesGeneration: number,
): number {
  if (rulesGeneration < 6 && typeId === 18) return 1;
  return typeId;
}

export function applyMoveTypesForGeneration(
  moves: Move[],
  rulesGeneration: number,
): Move[] {
  if (rulesGeneration >= 6) return moves;
  return moves.map((move) => {
    const typeId = moveTypeIdForGeneration(move.type_id, rulesGeneration);
    return typeId === move.type_id ? move : { ...move, type_id: typeId };
  });
}

export function applyMoveTypeForGeneration(
  move: Move,
  rulesGeneration: number,
): Move {
  const typeId = moveTypeIdForGeneration(move.type_id, rulesGeneration);
  return typeId === move.type_id ? move : { ...move, type_id: typeId };
}
