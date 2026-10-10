import { EMPTY_EFFECT_META, type Move } from "./moves";

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

type MoveDataChange = {
  type_id?: number;
  damage_class?: Move["damage_class"];
  power?: number;
  accuracy?: number;
  stat_chance?: number;
  flinch_chance?: number;
};

/**
 * Gen1 move rows (shared with Gen2 in the DB) whose values changed in Gen2 (GSC).
 * Gen2 physical/special is decided by type, so Dark moves are special.
 */
const GEN2_MOVE_CHANGES: Record<number, MoveDataChange> = {
  44: { type_id: 16, damage_class: "special", flinch_chance: 30 }, // Bite: Normal → Dark
  16: { type_id: 10 }, // Gust: Normal → Flying
  2: { type_id: 7 }, // Karate Chop: Normal → Fighting
  28: { type_id: 9 }, // Sand Attack: Normal → Ground
  38: { power: 120 }, // Double-Edge
  153: { power: 250 }, // Explosion
  120: { power: 200 }, // Self-Destruct
  91: { power: 60 }, // Dig
  59: { accuracy: 70 }, // Blizzard
  94: { stat_chance: 10 }, // Psychic (Sp. Def drop)
  51: { stat_chance: 10 }, // Acid
  145: { stat_chance: 10 }, // Bubble
  61: { stat_chance: 10 }, // Bubble Beam
  62: { stat_chance: 10 }, // Aurora Beam
  132: { stat_chance: 10 }, // Constrict
};

const RAPID_SPIN_POKEAPI = 229;

/** Gen1–3 bits. Rows without them were split off for Gen4+ and carry Gen4 values. */
const PRE_GEN4_GENERATION_BITS = 0b111;

function applyGen2MoveChanges(move: Move, rulesGeneration: number): Move {
  // Only Gen1-debut rows carry the old values.
  if (move.introduced_generation !== 1) return move;
  const change = GEN2_MOVE_CHANGES[move.pokeapi_id];
  if (!change) return move;
  const { stat_chance, flinch_chance, damage_class, power, accuracy, ...fields } =
    change;
  const gen4Row = (move.available_generations & PRE_GEN4_GENERATION_BITS) === 0;
  return {
    ...move,
    ...fields,
    // Gen4+: physical / special is per move (Bite stays physical).
    ...(damage_class != null && rulesGeneration < 4 ? { damage_class } : {}),
    ...(power != null && !gen4Row ? { power } : {}),
    ...(accuracy != null && !gen4Row ? { accuracy } : {}),
    effect_meta: move.effect_meta
      ? {
          ...move.effect_meta,
          ...(stat_chance != null ? { stat_chance } : {}),
          ...(flinch_chance != null ? { flinch_chance } : {}),
        }
      : move.effect_meta,
  };
}

/** Rapid Spin only raises Speed from Gen8; the seeded row has the modern effect. */
function applyPreGen8RapidSpin(move: Move): Move {
  if (move.pokeapi_id !== RAPID_SPIN_POKEAPI) return move;
  return {
    ...move,
    effect_category: "damage",
    effect_meta: move.effect_meta
      ? { ...move.effect_meta, stat_chance: 0, stat_changes: [] }
      : move.effect_meta,
  };
}

const NATURE_POWER_POKEAPI = 267;
const SECRET_POWER_POKEAPI = 290;

/**
 * Gen1–2 rules have no battle terrain: Nature Power becomes a plain Normal attack
 * (60, never misses — the indoor Swift) and Secret Power loses its secondary effect.
 */
function applyPreGen3TerrainMoves(move: Move): Move {
  if (move.pokeapi_id === NATURE_POWER_POKEAPI) {
    return {
      ...move,
      type_id: 1,
      damage_class: "physical",
      power: 60,
      accuracy: null,
      description: "威力60の攻撃。必ず命中する。",
      effect_category: "damage",
      effect_code: null,
      effect_meta: { ...EMPTY_EFFECT_META, stat_changes: [] },
    };
  }
  if (move.pokeapi_id === SECRET_POWER_POKEAPI) {
    return {
      ...move,
      effect_meta: move.effect_meta
        ? { ...move.effect_meta, ailment: null, ailment_chance: 0, stat_chance: 0, stat_changes: [] }
        : move.effect_meta,
    };
  }
  return move;
}

export function applyMoveTypeForGeneration(
  move: Move,
  rulesGeneration: number,
): Move {
  let adjusted =
    rulesGeneration >= 2 ? applyGen2MoveChanges(move, rulesGeneration) : move;
  if (rulesGeneration <= 2) adjusted = applyPreGen3TerrainMoves(adjusted);
  if (rulesGeneration < 8) adjusted = applyPreGen8RapidSpin(adjusted);
  const typeId = moveTypeIdForGeneration(adjusted.type_id, rulesGeneration);
  return typeId === adjusted.type_id ? adjusted : { ...adjusted, type_id: typeId };
}

export function applyMoveTypesForGeneration(
  moves: Move[],
  rulesGeneration: number,
): Move[] {
  return moves.map((move) => applyMoveTypeForGeneration(move, rulesGeneration));
}
