-- 1/3 setup: staging for Gen4 pokemon↔ability links
create table if not exists moshimo._seed_gen4_pokemon_abilities (
  dex_no integer not null,
  name_en text null,
  pokeapi_ability_id integer not null,
  slot smallint not null check (slot in (1, 2))
);
truncate table moshimo._seed_gen4_pokemon_abilities;
