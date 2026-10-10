-- 3/3 finalize: Gen4 links. Existing links keep their Gen1–3 bits only,
-- then Gen4–9 links are OR'ed in (unchanged abilities end up Gen3–9 again).
delete from moshimo.pokemon_abilities pa
using moshimo.pokemon p
where pa.pokemon_id = p.id
  and (p.available_generations & 8) <> 0
  and (pa.available_generations & 7) = 0;

update moshimo.pokemon_abilities pa
set available_generations = pa.available_generations & 7
from moshimo.pokemon p
where pa.pokemon_id = p.id
  and (p.available_generations & 8) <> 0
  and (pa.available_generations & 8) <> 0;

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
  504
from moshimo._seed_gen4_pokemon_abilities s
join moshimo.pokemon p
  on p.dex_no = s.dex_no
 and (s.name_en is null or p.name_en = s.name_en)
 and (p.available_generations & 8) <> 0
join moshimo.abilities a
  on a.pokeapi_id = s.pokeapi_ability_id
on conflict (pokemon_id, ability_id, slot) do update set
  available_generations =
    moshimo.pokemon_abilities.available_generations | excluded.available_generations;

-- Gen3+ rows added here (Deoxys forms) reuse their Gen4 links for Gen3.
update moshimo.pokemon_abilities pa
set available_generations = pa.available_generations | 4
from moshimo.pokemon p
where pa.pokemon_id = p.id
  and (p.available_generations & 4) <> 0
  and (pa.available_generations & 8) <> 0
  and not exists (
    select 1
    from moshimo.pokemon_abilities x
    where x.pokemon_id = p.id
      and (x.available_generations & 4) <> 0
  );

-- Legacy ability columns on Gen4+-only rows (shared Gen3 rows keep Gen3 values).
update moshimo.pokemon p
set ability1_id = x.ability_id
from (
  select distinct on (pa.pokemon_id) pa.pokemon_id, pa.ability_id
  from moshimo.pokemon_abilities pa
  where pa.slot = 1 and (pa.available_generations & 8) <> 0
  order by pa.pokemon_id, pa.ability_id
) x
where p.id = x.pokemon_id
  and (p.available_generations & 8) <> 0
  and (p.available_generations & 7) = 0;

update moshimo.pokemon p
set ability2_id = x.ability_id
from (
  select distinct on (pa.pokemon_id) pa.pokemon_id, pa.ability_id
  from moshimo.pokemon_abilities pa
  where pa.slot = 2 and (pa.available_generations & 8) <> 0
  order by pa.pokemon_id, pa.ability_id
) x
where p.id = x.pokemon_id
  and (p.available_generations & 8) <> 0
  and (p.available_generations & 7) = 0;

drop table if exists moshimo._seed_gen4_pokemon_abilities;
