-- Gen1–3 rules + Gen4-debut moves: physical / special decided by type.
-- Physical types: Normal, Fighting, Poison, Ground, Flying, Bug, Rock, Ghost, Steel.
-- - Gen2–3 rows (available_generations=6): moves whose Gen4 class differs from the type-based one.
-- - Gen1 rows (available_generations=1): additionally Dark/Steel → Normal and
--   special-attack / special-defense stage changes → special (first one only,
--   so Special is not raised twice).
-- Apply after gen4_moves / gen4_moves_all.

insert into moshimo.moves (
  id, pokeapi_id, name_ja, name_en, type_id, damage_class, power, accuracy, pp,
  priority, description, effect_category, effect_meta, effect_code,
  introduced_generation, available_generations
)
select
  md5('gen4-type-class:' || m.id::text)::uuid,
  m.pokeapi_id, m.name_ja, m.name_en, m.type_id,
  case when m.type_id in (1, 7, 8, 9, 10, 12, 13, 14, 17) then 'physical' else 'special' end,
  m.power, m.accuracy, m.pp,
  m.priority, m.description, m.effect_category, m.effect_meta, m.effect_code,
  m.introduced_generation, 6
from moshimo.moves m
where m.introduced_generation = 4
  and (m.available_generations & 8) <> 0
  and m.damage_class <> 'status'
  and m.damage_class <>
    case when m.type_id in (1, 7, 8, 9, 10, 12, 13, 14, 17) then 'physical' else 'special' end
on conflict (pokeapi_id, available_generations) do update set
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  type_id = excluded.type_id,
  damage_class = excluded.damage_class,
  power = excluded.power,
  accuracy = excluded.accuracy,
  pp = excluded.pp,
  priority = excluded.priority,
  description = excluded.description,
  effect_category = excluded.effect_category,
  effect_meta = excluded.effect_meta,
  effect_code = excluded.effect_code,
  updated_at = now();

insert into moshimo.moves (
  id, pokeapi_id, name_ja, name_en, type_id, damage_class, power, accuracy, pp,
  priority, description, effect_category, effect_meta, effect_code,
  introduced_generation, available_generations
)
select
  ('00000000-0000-4000-8001-' || substr(m.id::text, 25))::uuid,
  m.pokeapi_id, m.name_ja, m.name_en,
  case when m.type_id in (16, 17) then 1 else m.type_id end,
  case
    when m.damage_class = 'status' then 'status'
    when m.type_id in (1, 7, 8, 9, 10, 12, 13, 14, 16, 17) then 'physical'
    else 'special'
  end,
  m.power, m.accuracy, m.pp,
  m.priority, m.description, m.effect_category,
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
  ),
  m.effect_code,
  m.introduced_generation, 1
from moshimo.moves m
where m.introduced_generation = 4
  and (m.available_generations & 8) <> 0
  and (
    m.type_id in (16, 17)
    or (
      m.damage_class <> 'status'
      and m.damage_class <>
        case when m.type_id in (1, 7, 8, 9, 10, 12, 13, 14, 17) then 'physical' else 'special' end
    )
    or exists (
      select 1
      from jsonb_array_elements(
        coalesce(m.effect_meta->'stat_changes', '[]'::jsonb)
      ) as s(elem)
      where s.elem->>'stat' in ('special-attack', 'special-defense')
    )
  )
on conflict (pokeapi_id, available_generations) do update set
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  type_id = excluded.type_id,
  damage_class = excluded.damage_class,
  power = excluded.power,
  accuracy = excluded.accuracy,
  pp = excluded.pp,
  priority = excluded.priority,
  description = excluded.description,
  effect_category = excluded.effect_category,
  effect_meta = excluded.effect_meta,
  effect_code = excluded.effect_code,
  updated_at = now();
