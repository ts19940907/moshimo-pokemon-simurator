-- 1/3 setup: staging table for GSC learnsets (persistent across SQL Editor runs)
create table if not exists moshimo._seed_gen2_learnset (
  dex_no integer not null,
  pokeapi_move_id integer not null
);
truncate table moshimo._seed_gen2_learnset;

