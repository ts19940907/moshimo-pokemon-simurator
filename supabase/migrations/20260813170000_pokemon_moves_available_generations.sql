-- Learnset validity by generation on pokemon↔move junction.

alter table moshimo.pokemon_moves
  add column if not exists available_generations integer;

update moshimo.pokemon_moves
set available_generations = 1
where available_generations is null;

alter table moshimo.pokemon_moves
  alter column available_generations set not null;

alter table moshimo.pokemon_moves
  drop constraint if exists pokemon_moves_available_generations_check;

alter table moshimo.pokemon_moves
  add constraint pokemon_moves_available_generations_check
  check (available_generations > 0);

create index if not exists pokemon_moves_available_generations_idx
  on moshimo.pokemon_moves (available_generations);

comment on column moshimo.pokemon_moves.available_generations is
  'Bitmask of generations where this pokemon row may use this move row (learnset). Gen N = 2^(N-1). Gen1 RB/Yellow seed uses 1.';

comment on table moshimo.pokemon_moves is
  'Which move rows a pokemon row may use in which generations. No learn level/method (game design).';

-- Gen1: Dark / Steel / Fairy did not exist (e.g. Bite → Normal physical).
update moshimo.moves
set
  type_id = 1,
  damage_class = case
    when damage_class = 'status' then 'status'
    else 'physical'
  end,
  updated_at = now()
where introduced_generation = 1
  and type_id in (16, 17, 18);
