-- Final evolution flag for party filters (Gen1: no further Gen1 evolution).

alter table moshimo.pokemon
  add column if not exists is_final_evolution boolean not null default true;

comment on column moshimo.pokemon.is_final_evolution is
  'True when this species has no further evolution within the generations this row covers (Gen1: no evolves-to within dex 1-151).';

create index if not exists pokemon_is_final_evolution_idx
  on moshimo.pokemon (is_final_evolution);
