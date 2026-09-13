-- 3/3 finalize: link Gen3-usable pokemon ↔ abilities, sync ability*_id, drop staging
insert into moshimo.pokemon_abilities (
  pokemon_id,
  ability_id,
  slot,
  available_generations
)
select distinct
  p.id,
  a.id,
  s.slot,
  508
from moshimo._seed_gen3_pokemon_abilities s
join moshimo.pokemon p
  on p.dex_no = s.dex_no
 and (p.available_generations & 4) <> 0
join moshimo.abilities a
  on a.pokeapi_id = s.pokeapi_ability_id
on conflict (pokemon_id, ability_id, slot) do update set
  available_generations = excluded.available_generations;

-- Keep legacy columns in sync for Gen3+ rows (slot 1 / 2 only).
update moshimo.pokemon p
set ability1_id = x.ability_id
from (
  select distinct on (pa.pokemon_id)
    pa.pokemon_id,
    pa.ability_id
  from moshimo.pokemon_abilities pa
  where pa.slot = 1
    and (pa.available_generations & 4) <> 0
  order by pa.pokemon_id, pa.ability_id
) x
where p.id = x.pokemon_id
  and (p.available_generations & 4) <> 0;

update moshimo.pokemon p
set ability2_id = x.ability_id
from (
  select distinct on (pa.pokemon_id)
    pa.pokemon_id,
    pa.ability_id
  from moshimo.pokemon_abilities pa
  where pa.slot = 2
    and (pa.available_generations & 4) <> 0
  order by pa.pokemon_id, pa.ability_id
) x
where p.id = x.pokemon_id
  and (p.available_generations & 4) <> 0;

update moshimo.pokemon p
set ability2_id = null
where (p.available_generations & 4) <> 0
  and not exists (
    select 1
    from moshimo.pokemon_abilities pa
    where pa.pokemon_id = p.id
      and pa.slot = 2
      and (pa.available_generations & 4) <> 0
  );

drop table if exists moshimo._seed_gen3_pokemon_abilities;
