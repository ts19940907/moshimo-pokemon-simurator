-- Rename availability bitmask + add debut generation for pokemon and moves.

-- pokemon
alter table moshimo.pokemon
  rename column generation_introduced to available_generations;

alter table moshimo.pokemon
  add column introduced_generation integer;

update moshimo.pokemon
set introduced_generation = 1
where introduced_generation is null
  and (available_generations & 1) <> 0;

update moshimo.pokemon
set introduced_generation = 1
where introduced_generation is null;

alter table moshimo.pokemon
  alter column introduced_generation set not null;

alter table moshimo.pokemon
  add constraint pokemon_introduced_generation_check
  check (introduced_generation > 0);

alter table moshimo.pokemon
  drop constraint if exists pokemon_dex_no_region_type_is_mega_name_en_generation_introduced_key;

alter table moshimo.pokemon
  add constraint pokemon_identity_available_generations_key
  unique (dex_no, region_type, is_mega, name_en, available_generations);

drop index if exists moshimo.pokemon_generation_introduced_idx;
create index pokemon_available_generations_idx
  on moshimo.pokemon (available_generations);
create index pokemon_introduced_generation_idx
  on moshimo.pokemon (introduced_generation);

comment on column moshimo.pokemon.available_generations is
  'Bitmask of generations where this row is usable in that environment''s competitive battles. Gen N = 2^(N-1).';
comment on column moshimo.pokemon.introduced_generation is
  'Debut generation of this species/form (Hisui forms use 9).';

-- moves
alter table moshimo.moves
  rename column generation_introduced to available_generations;

alter table moshimo.moves
  add column introduced_generation integer;

update moshimo.moves
set introduced_generation = 1
where introduced_generation is null;

alter table moshimo.moves
  alter column introduced_generation set not null;

alter table moshimo.moves
  add constraint moves_introduced_generation_check
  check (introduced_generation > 0);

alter table moshimo.moves
  drop constraint if exists moves_pokeapi_id_generation_introduced_key;

alter table moshimo.moves
  add constraint moves_pokeapi_id_available_generations_key
  unique (pokeapi_id, available_generations);

drop index if exists moshimo.moves_generation_introduced_idx;
create index moves_available_generations_idx
  on moshimo.moves (available_generations);
create index moves_introduced_generation_idx
  on moshimo.moves (introduced_generation);

comment on column moshimo.moves.available_generations is
  'Bitmask of generations where this move row is usable in that environment''s competitive battles. Gen N = 2^(N-1).';
comment on column moshimo.moves.introduced_generation is
  'Debut generation of this move.';

-- Gen8/9 competitive availability (regional dex + DLC; Mewtwo/Mew kept for Gen8).
-- Clear Gen8 bit (128) / Gen9 bit (256) when not usable in that environment.
update moshimo.pokemon
set available_generations = available_generations & ~128
where dex_no in (
  13,14,15,16,17,18,19,20,21,22,23,24,46,47,48,49,56,57,69,70,71,74,75,76,
  84,85,86,87,88,89,96,97,100,101
);

update moshimo.pokemon
set available_generations = available_generations & ~256
where dex_no in (
  10,11,12,13,14,15,16,17,18,19,20,21,22,29,30,31,32,33,34,41,42,46,47,
  63,64,65,66,67,68,77,78,83,95,98,99,104,105,108,114,115,118,119,120,121,
  122,124,127,138,139,140,141,142,144,145,146,150,151
);

-- Move rows: Gen1–3 data currently; keep those bits and extend through Gen9 when
-- the move was not removed from Gen8 competitive environments.
-- Gen1 moves removed in Gen8 (pokeapi ids): clear Gen8+Gen9 bits after expand.
update moshimo.moves
set available_generations = available_generations | 504;

update moshimo.moves
set available_generations = available_generations & ~384
where pokeapi_id in (
  3, 4, 13, 26, 27, 32, 35, 66, 67, 99, 112, 117, 119, 121, 125, 128, 131,
  132, 140, 145, 146, 148, 149
);
