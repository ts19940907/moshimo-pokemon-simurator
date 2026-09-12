-- Gen1 rules + Gen2 debut Dark/Steel moves:
-- add available_generations=1 rows as Normal (non-status → physical).
-- Within those rows only, special-attack / special-defense stage changes → special.
-- Apply after gen2_moves / gen2_moves_all.

insert into moshimo.moves (
  id,
  pokeapi_id,
  name_ja,
  name_en,
  type_id,
  damage_class,
  power,
  accuracy,
  pp,
  priority,
  description,
  effect_category,
  effect_meta,
  effect_code,
  introduced_generation,
  available_generations
)
select
  ('00000000-0000-4000-8001-' || substr(m.id::text, 25))::uuid,
  m.pokeapi_id,
  m.name_ja,
  m.name_en,
  1 as type_id,
  case
    when m.damage_class = 'status' then 'status'
    else 'physical'
  end as damage_class,
  m.power,
  m.accuracy,
  m.pp,
  m.priority,
  m.description,
  m.effect_category,
  jsonb_set(
    coalesce(m.effect_meta, '{}'::jsonb),
    '{stat_changes}',
    coalesce(
      (
        select jsonb_agg(
          case
            when elem->>'stat' in ('special-attack', 'special-defense')
              then jsonb_set(elem, '{stat}', '"special"')
            else elem
          end
          order by ordinality
        )
        from jsonb_array_elements(
          coalesce(m.effect_meta->'stat_changes', '[]'::jsonb)
        ) with ordinality as t(elem, ordinality)
      ),
      '[]'::jsonb
    )
  ) as effect_meta,
  m.effect_code,
  m.introduced_generation,
  1 as available_generations
from moshimo.moves m
where m.introduced_generation = 2
  and m.type_id in (16, 17)
  and (m.available_generations & 2) <> 0
on conflict (pokeapi_id, available_generations) do update set
  type_id = excluded.type_id,
  damage_class = excluded.damage_class,
  effect_meta = excluded.effect_meta,
  description = excluded.description,
  updated_at = now();
