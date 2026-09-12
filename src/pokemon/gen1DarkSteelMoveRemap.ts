import type { Move, MoveDamageClass, MoveEffectMeta } from "./moves";

const DARK = 16;
const STEEL = 17;
const NORMAL = 1;

/** True when a Gen2 debut move is Dark or Steel (seed remap target). */
export function isGen2DarkOrSteelMove(move: Pick<Move, "introduced_generation" | "type_id">): boolean {
  return (
    move.introduced_generation === 2 &&
    (move.type_id === DARK || move.type_id === STEEL)
  );
}

/**
 * Mirrors supabase/seed/gen2_moves_gen1_type_remap.sql:
 * Dark/Steel → Normal; non-status → physical; SpA/SpD stage changes → special.
 */
export function remapGen2DarkSteelMoveForGen1(move: Move): Move {
  if (!isGen2DarkOrSteelMove(move)) {
    return move;
  }

  const damage_class: MoveDamageClass =
    move.damage_class === "status" ? "status" : "physical";

  const effect_meta: MoveEffectMeta = {
    ...move.effect_meta,
    stat_changes: move.effect_meta.stat_changes.map((change) =>
      change.stat === "special-attack" || change.stat === "special-defense"
        ? { ...change, stat: "special" }
        : change,
    ),
  };

  return {
    ...move,
    id: move.id.replace(
      "00000000-0000-4000-8000-",
      "00000000-0000-4000-8001-",
    ),
    type_id: NORMAL,
    damage_class,
    effect_meta,
    available_generations: 1,
  };
}
