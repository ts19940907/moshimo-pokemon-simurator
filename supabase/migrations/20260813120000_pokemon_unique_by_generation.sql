-- Allow multiple rows per species when base data diverges across generations.
-- Unique key includes generation_introduced bitmask so Gen1-5 / Gen6-9 variants can coexist.

alter table moshimo.pokemon
  drop constraint if exists pokemon_dex_no_region_type_is_mega_name_en_key;

alter table moshimo.pokemon
  add constraint pokemon_dex_region_mega_name_gen_key
  unique (dex_no, region_type, is_mega, name_en, generation_introduced);

comment on column moshimo.pokemon.generation_introduced is
  'Bitmask of generations where this row is selectable. Gen N = 2^(N-1). Create a new row only when stats/types/abilities differ across generations; otherwise keep one row covering all applicable gens (e.g. 511 = Gen1..9).';
