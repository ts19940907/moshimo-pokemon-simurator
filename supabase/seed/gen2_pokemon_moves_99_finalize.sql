-- finalize: link Gen2-usable pokemon ↔ moves, then drop staging
insert into moshimo.pokemon_moves (pokemon_id, move_id)
select distinct p.id, m.id
from moshimo._seed_gen2_learnset l
join moshimo.pokemon p
  on p.dex_no = l.dex_no
 and (p.available_generations & 2) <> 0
join moshimo.moves m
  on m.pokeapi_id = l.pokeapi_move_id
 and (m.available_generations & 2) <> 0
on conflict (pokemon_id, move_id) do nothing;

drop table if exists moshimo._seed_gen2_learnset;

