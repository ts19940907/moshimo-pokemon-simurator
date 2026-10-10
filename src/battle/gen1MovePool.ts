import gen1MovesJson from "../data/gen1-moves.json";
import type { Move } from "../pokemon/moves";
import { EMPTY_EFFECT_META } from "../pokemon/moves";

function normalize(raw: (typeof gen1MovesJson)[number]): Move {
  return {
    ...(raw as Move),
    effect_meta: {
      ...EMPTY_EFFECT_META,
      ...(raw.effect_meta as Move["effect_meta"]),
      stat_changes: (raw.effect_meta as Move["effect_meta"])?.stat_changes ?? [],
    },
  };
}

/** All Gen1 seeded moves (for Metronome). */
export const GEN1_MOVE_POOL: Move[] = (gen1MovesJson as typeof gen1MovesJson).map(
  normalize,
);

/** Gen1 Metronome cannot call these (approx cartridge exclusions). */
const METRONOME_BAN = new Set([
  118, // Metronome
  165, // Struggle
  119, // Mirror Move
  102, // Mimic
  144, // Transform
  166, // Sketch (n/a)
]);

/** Added to the Metronome exclusions from Gen2 rules on. */
const METRONOME_BAN_GEN2 = [
  68, // Counter
  194, // Destiny Bond
  197, // Detect
  203, // Endure
  243, // Mirror Coat
  182, // Protect
  214, // Sleep Talk
  168, // Thief
];

/** Added to the Metronome exclusions from Gen3 rules on. */
const METRONOME_BAN_GEN3 = [
  274, // Assist
  343, // Covet
  264, // Focus Punch
  266, // Follow Me
  270, // Helping Hand
  289, // Snatch
  271, // Trick
];

export function isMetronomeBanned(
  pokeapiId: number,
  rulesGeneration: number,
): boolean {
  if (METRONOME_BAN.has(pokeapiId)) return true;
  if (rulesGeneration >= 2 && METRONOME_BAN_GEN2.includes(pokeapiId)) return true;
  return rulesGeneration >= 3 && METRONOME_BAN_GEN3.includes(pokeapiId);
}

/**
 * Picks from `pool` (moves usable under the match rules); falls back to the
 * seeded Gen1 moves when the pool is not loaded.
 */
export function pickMetronomeMove(
  pool: readonly Move[] = [],
  rulesGeneration = 1,
): Move {
  const source = pool.length > 0 ? pool : GEN1_MOVE_POOL;
  const candidates = source.filter(
    (m) => !isMetronomeBanned(m.pokeapi_id, rulesGeneration),
  );
  return candidates[Math.floor(Math.random() * candidates.length)] ?? GEN1_MOVE_POOL[0];
}

export function getMoveByPokeapiId(id: number): Move | undefined {
  return GEN1_MOVE_POOL.find((m) => m.pokeapi_id === id);
}
