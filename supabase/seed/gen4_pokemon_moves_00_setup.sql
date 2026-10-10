-- 1/N setup: staging for Gen4 (DPPt/HGSS) learnsets
create table if not exists moshimo._seed_gen4_learnset (
  dex_no integer not null,
  name_en text null,
  pokeapi_move_id integer not null
);
truncate table moshimo._seed_gen4_learnset;
