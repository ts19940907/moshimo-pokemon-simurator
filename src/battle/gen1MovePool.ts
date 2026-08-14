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

export function pickMetronomeMove(): Move {
  const pool = GEN1_MOVE_POOL.filter((m) => !METRONOME_BAN.has(m.pokeapi_id));
  return pool[Math.floor(Math.random() * pool.length)] ?? GEN1_MOVE_POOL[0];
}

export function getMoveByPokeapiId(id: number): Move | undefined {
  return GEN1_MOVE_POOL.find((m) => m.pokeapi_id === id);
}
