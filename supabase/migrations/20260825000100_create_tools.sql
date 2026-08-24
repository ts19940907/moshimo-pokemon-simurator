-- Held-item / tool master (moshimo schema). Battle holdables from Gen2 onward.

create table if not exists moshimo.tools (
  id uuid primary key default gen_random_uuid(),
  -- Stable id from PokeAPI item id (for seed upsert)
  pokeapi_id integer not null,
  name_ja text not null,
  name_en text not null,
  -- PokeAPI item-category name (held-items, type-enhancement, species-specific, …)
  category text null,
  description text null,
  -- Optional future battle-handler fields (mirrors moves)
  effect_code text null,
  effect_meta jsonb not null default '{}'::jsonb,
  introduced_generation integer not null
    check (introduced_generation > 0),
  available_generations integer not null
    check (available_generations > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (pokeapi_id, available_generations)
);

comment on table moshimo.tools is
  'Held-item (道具) master. Split rows when effects change across generations.';
comment on column moshimo.tools.pokeapi_id is
  'PokeAPI item id.';
comment on column moshimo.tools.category is
  'PokeAPI item-category name used for filtering (e.g. held-items).';
comment on column moshimo.tools.description is
  'Japanese flavor / effect summary when available.';
comment on column moshimo.tools.effect_code is
  'Optional kebab-case handler id for battle simulation.';
comment on column moshimo.tools.effect_meta is
  'Structured effect params for battle simulation.';
comment on column moshimo.tools.introduced_generation is
  'Debut generation of this item row.';
comment on column moshimo.tools.available_generations is
  'Bitmask of generations where this row is usable. Gen N = 2^(N-1).';

create index if not exists tools_pokeapi_id_idx on moshimo.tools (pokeapi_id);
create index if not exists tools_category_idx on moshimo.tools (category);
create index if not exists tools_introduced_generation_idx
  on moshimo.tools (introduced_generation);
create index if not exists tools_available_generations_idx
  on moshimo.tools (available_generations);
create index if not exists tools_name_ja_idx on moshimo.tools (name_ja);
create index if not exists tools_effect_code_idx
  on moshimo.tools (effect_code)
  where effect_code is not null;

grant select on moshimo.tools to anon, authenticated, service_role;

alter table moshimo.tools enable row level security;

drop policy if exists tools_select_all on moshimo.tools;
create policy tools_select_all
  on moshimo.tools for select to anon, authenticated using (true);
