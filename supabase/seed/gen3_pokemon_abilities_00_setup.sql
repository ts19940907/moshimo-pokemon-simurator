-- 1/3 setup: staging for Gen3 pokemon↔ability links
create table if not exists moshimo._seed_gen3_pokemon_abilities (
  dex_no integer not null,
  pokeapi_ability_id integer not null,
  slot smallint not null check (slot in (1, 2))
);
truncate table moshimo._seed_gen3_pokemon_abilities;
