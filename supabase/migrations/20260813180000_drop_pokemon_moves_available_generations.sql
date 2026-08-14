-- Junction is row-to-row only: resolved pokemon_id × move_id.
-- Learnset generation is expressed by which pokemon/move rows exist, not a column here.

alter table moshimo.pokemon_moves
  drop constraint if exists pokemon_moves_available_generations_check;

drop index if exists moshimo.pokemon_moves_available_generations_idx;

alter table moshimo.pokemon_moves
  drop column if exists available_generations;

comment on table moshimo.pokemon_moves is
  'Which move rows a pokemon row may use. Resolve pokemon/move rows by generation rules first, then join by id. No learn level/method (game design).';
