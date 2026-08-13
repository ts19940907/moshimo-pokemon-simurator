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
  /** Bitmask. Gen1 seed uses 7 (Gen1–3). */
  generation_introduced: number;
};

export type PokemonMove = {
  id: string;
  pokemon_id: string;
  move_id: string;
};
