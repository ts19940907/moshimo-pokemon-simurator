-- Gen1–3 move master + pokemon↔move junction (moshimo schema)

create table if not exists moshimo.moves (
  id uuid primary key default gen_random_uuid(),
  -- Stable id from PokeAPI move id (for seed upsert / junction wiring)
  pokeapi_id integer not null,
  name_ja text not null,
  name_en text not null,
  type_id integer not null references moshimo.types (id),
  damage_class text not null
    check (damage_class in ('physical', 'special', 'status')),
  power integer null check (power is null or power >= 0),
  accuracy integer null check (accuracy is null or (accuracy >= 0 and accuracy <= 100)),
  pp integer null check (pp is null or pp >= 0),
  priority integer not null default 0,
  description text null,
  generation_introduced integer not null
    check (generation_introduced > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (pokeapi_id, generation_introduced),
  check (type_id <> 0)
);

comment on table moshimo.moves is
  'Move master. Split rows when power/accuracy/pp/damage_class/etc. change across generations.';
comment on column moshimo.moves.generation_introduced is
  'Bitmask of generations where this move row applies. Gen N = 2^(N-1). Gen1 seed uses 7 (Gen1–3).';
comment on column moshimo.moves.description is
  'Japanese description including secondary effects and complex move rules.';
comment on column moshimo.moves.damage_class is
  'physical | special | status. Gen1–3 attack moves use type-based physical/special.';

create index if not exists moves_pokeapi_id_idx on moshimo.moves (pokeapi_id);
create index if not exists moves_type_id_idx on moshimo.moves (type_id);
create index if not exists moves_generation_introduced_idx on moshimo.moves (generation_introduced);
create index if not exists moves_name_ja_idx on moshimo.moves (name_ja);

create table if not exists moshimo.pokemon_moves (
  id uuid primary key default gen_random_uuid(),
  pokemon_id uuid not null references moshimo.pokemon (id) on delete cascade,
  move_id uuid not null references moshimo.moves (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (pokemon_id, move_id)
);

comment on table moshimo.pokemon_moves is
  'Which move rows a pokemon row may use. No learn level/method (game design).';

create index if not exists pokemon_moves_pokemon_id_idx on moshimo.pokemon_moves (pokemon_id);
create index if not exists pokemon_moves_move_id_idx on moshimo.pokemon_moves (move_id);

grant select on moshimo.moves to anon, authenticated, service_role;
grant select on moshimo.pokemon_moves to anon, authenticated, service_role;

alter table moshimo.moves enable row level security;
alter table moshimo.pokemon_moves enable row level security;

drop policy if exists moves_select_all on moshimo.moves;
create policy moves_select_all
  on moshimo.moves for select to anon, authenticated using (true);

drop policy if exists pokemon_moves_select_all on moshimo.pokemon_moves;
create policy pokemon_moves_select_all
  on moshimo.pokemon_moves for select to anon, authenticated using (true);
