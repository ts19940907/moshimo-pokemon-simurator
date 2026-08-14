export type MoveDamageClass = "physical" | "special" | "status";

export type MoveEffectMeta = {
  ailment: string | null;
  ailment_chance: number;
  drain: number;
  healing: number;
  flinch_chance: number;
  crit_rate: number;
  min_hits: number | null;
  max_hits: number | null;
  min_turns: number | null;
  max_turns: number | null;
  stat_chance: number;
  stat_changes: { stat: string; change: number }[];
};

export type Move = {
  id: string;
  pokeapi_id: number;
  name_ja: string;
  name_en: string;
  type_id: number;
  damage_class: MoveDamageClass;
  power: number | null;
  accuracy: number | null;
  pp: number | null;
  priority: number;
  description: string | null;
  effect_category: string | null;
  effect_meta: MoveEffectMeta;
  effect_code: string | null;
  /** Debut generation of this move. */
  introduced_generation: number;
  /** Bitmask of competitive-usable generations. Gen N = 2^(N-1). */
  available_generations: number;
};

export type PokemonMove = {
  id: string;
  pokemon_id: string;
  move_id: string;
};

export const EMPTY_EFFECT_META: MoveEffectMeta = {
  ailment: null,
  ailment_chance: 0,
  drain: 0,
  healing: 0,
  flinch_chance: 0,
  crit_rate: 0,
  min_hits: null,
  max_hits: null,
  min_turns: null,
  max_turns: null,
  stat_chance: 0,
  stat_changes: [],
};
