export type MoveDamageClass = "physical" | "special" | "status";

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
