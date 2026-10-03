-- Gen1 rules + Gen3 debut moves: add available_generations=1 rows.
-- - Dark/Steel moves → Normal (non-status → physical).
-- - Special-attack / special-defense stage changes → special (Gen1 unified Special).
--   When both are changed (Calm Mind, Cosmic Power, Silver Wind …) only the
--   first one is kept so Special is not raised twice.
-- Apply after gen3_moves / gen3_moves_all.

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
  case when m.type_id in (16, 17) then 1 else m.type_id end as type_id,
  case
    when m.type_id in (16, 17) and m.damage_class <> 'status' then 'physical'
    else m.damage_class
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
        select jsonb_agg(deduped.elem order by deduped.ordinality)
        from (
          select distinct on (mapped.elem->>'stat') mapped.elem, mapped.ordinality
          from (
            select
              case
                when elem->>'stat' in ('special-attack', 'special-defense')
                  then jsonb_set(elem, '{stat}', '"special"')
                else elem
              end as elem,
              ordinality
            from jsonb_array_elements(
              coalesce(m.effect_meta->'stat_changes', '[]'::jsonb)
            ) with ordinality as t(elem, ordinality)
          ) mapped
          order by mapped.elem->>'stat', mapped.ordinality
        ) deduped
      ),
      '[]'::jsonb
    )
  ) as effect_meta,
  m.effect_code,
  m.introduced_generation,
  1 as available_generations
from moshimo.moves m
where m.introduced_generation = 3
  and (m.available_generations & 4) <> 0
  and (
    m.type_id in (16, 17)
    or exists (
      select 1
      from jsonb_array_elements(
        coalesce(m.effect_meta->'stat_changes', '[]'::jsonb)
      ) as s(elem)
      where s.elem->>'stat' in ('special-attack', 'special-defense')
    )
  )
on conflict (pokeapi_id, available_generations) do update set
  type_id = excluded.type_id,
  damage_class = excluded.damage_class,
  effect_meta = excluded.effect_meta,
  description = excluded.description,
  updated_at = now();
