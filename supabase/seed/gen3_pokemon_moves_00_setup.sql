-- 1/N setup: staging for Gen3 (RSE/FRLG) learnsets
create table if not exists moshimo._seed_gen3_learnset (
  dex_no integer not null,
  pokeapi_move_id integer not null
);
truncate table moshimo._seed_gen3_learnset;
