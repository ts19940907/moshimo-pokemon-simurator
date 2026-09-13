-- Gen3+: enrich abilities master + pokemon↔ability junction (slot-aware)

alter table moshimo.abilities
  add column if not exists pokeapi_id integer,
  add column if not exists introduced_generation integer,
  add column if not exists available_generations integer,
  add column if not exists description text;

comment on column moshimo.abilities.pokeapi_id is
  'Stable id from PokeAPI ability id (for seed upsert / junction wiring).';
comment on column moshimo.abilities.introduced_generation is
  'Generation when the ability debuted (abilities start at Gen3).';
comment on column moshimo.abilities.available_generations is
  'Bitmask of generations where this ability row is usable. Gen N = 2^(N-1).';
comment on column moshimo.abilities.description is
  'Japanese flavor / effect summary.';

-- Backfill pokeapi_id from deterministic UUID suffix when missing.
-- Suffix is zero-padded decimal (not hex): …000000000065 → 65.
update moshimo.abilities
set pokeapi_id = right(id::text, 12)::integer
where pokeapi_id is null
  and id::text ~ '^00000000-0000-4000-8000-[0-9]{12}$';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'abilities_pokeapi_id_key'
      and conrelid = 'moshimo.abilities'::regclass
  ) then
    alter table moshimo.abilities
      add constraint abilities_pokeapi_id_key unique (pokeapi_id);
  end if;
end $$;

create index if not exists abilities_pokeapi_id_idx
  on moshimo.abilities (pokeapi_id);
create index if not exists abilities_introduced_generation_idx
  on moshimo.abilities (introduced_generation);
create index if not exists abilities_available_generations_idx
  on moshimo.abilities (available_generations);

create table if not exists moshimo.pokemon_abilities (
  id uuid primary key default gen_random_uuid(),
  pokemon_id uuid not null references moshimo.pokemon (id) on delete cascade,
  ability_id uuid not null references moshimo.abilities (id) on delete cascade,
  -- 1 = ability1, 2 = ability2, 3 = hidden (Gen5+)
  slot smallint not null check (slot in (1, 2, 3)),
  available_generations integer not null
    check (available_generations > 0),
  created_at timestamptz not null default now(),
  unique (pokemon_id, ability_id, slot)
);

comment on table moshimo.pokemon_abilities is
  'Which ability rows a pokemon row may use. slot 1/2 = normal, 3 = hidden.';
comment on column moshimo.pokemon_abilities.slot is
  '1 = first ability, 2 = second ability, 3 = hidden ability (Gen5+).';
comment on column moshimo.pokemon_abilities.available_generations is
  'Bitmask of generations where this link applies. Gen N = 2^(N-1).';

create index if not exists pokemon_abilities_pokemon_id_idx
  on moshimo.pokemon_abilities (pokemon_id);
create index if not exists pokemon_abilities_ability_id_idx
  on moshimo.pokemon_abilities (ability_id);
create index if not exists pokemon_abilities_slot_idx
  on moshimo.pokemon_abilities (slot);
create index if not exists pokemon_abilities_available_generations_idx
  on moshimo.pokemon_abilities (available_generations);

grant select on moshimo.pokemon_abilities to anon, authenticated, service_role;

alter table moshimo.pokemon_abilities enable row level security;

drop policy if exists pokemon_abilities_select_all on moshimo.pokemon_abilities;
create policy pokemon_abilities_select_all
  on moshimo.pokemon_abilities for select to anon, authenticated using (true);
