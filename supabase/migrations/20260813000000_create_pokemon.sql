-- moshimo schema: UUID PKs, integer type ids (type2=0 means single-type)

create schema if not exists moshimo;
grant usage on schema moshimo to anon, authenticated, service_role;

create extension if not exists pgcrypto;

-- Drop dependent tables in order if recreating
drop table if exists moshimo.pokemon cascade;
drop table if exists moshimo.abilities cascade;
drop table if exists moshimo.types cascade;

create table moshimo.types (
  id integer primary key,
  name_ja text not null unique,
  name_en text not null unique
);

comment on table moshimo.types is
  'Type master. id=0 means none (used only for pokemon.type2).';

create table moshimo.abilities (
  id uuid primary key default gen_random_uuid(),
  name_ja text not null,
  name_en text not null,
  created_at timestamptz not null default now()
);

create table moshimo.pokemon (
  id uuid primary key default gen_random_uuid(),
  dex_no integer not null,
  region_type smallint not null default 0
    check (region_type in (0, 1, 2, 3, 4)),
  name_ja text not null,
  name_en text not null,
  category text not null
    check (category in ('normal', 'restricted_legendary', 'mythical')),
  generation_introduced integer not null
    check (generation_introduced > 0),
  type1 integer not null references moshimo.types (id),
  type2 integer not null default 0 references moshimo.types (id),
  base_hp integer not null check (base_hp >= 0),
  base_attack integer not null check (base_attack >= 0),
  base_defense integer not null check (base_defense >= 0),
  base_special integer null check (base_special is null or base_special >= 0),
  base_sp_attack integer null check (base_sp_attack is null or base_sp_attack >= 0),
  base_sp_defense integer null check (base_sp_defense is null or base_sp_defense >= 0),
  base_speed integer not null check (base_speed >= 0),
  ability1_id uuid null references moshimo.abilities (id),
  ability2_id uuid null references moshimo.abilities (id),
  hidden_ability_id uuid null references moshimo.abilities (id),
  gender smallint not null default 1
    check (gender in (0, 1, 2, 3)),
  is_mega boolean not null default false,
  sprite_url text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (dex_no, region_type, is_mega, name_en, generation_introduced),
  check (type1 <> 0),
  check (type2 <> type1 or type2 = 0)
);

create index pokemon_dex_no_idx on moshimo.pokemon (dex_no);
create index pokemon_region_type_idx on moshimo.pokemon (region_type);
create index pokemon_category_idx on moshimo.pokemon (category);
create index pokemon_generation_introduced_idx on moshimo.pokemon (generation_introduced);
create index pokemon_is_mega_idx on moshimo.pokemon (is_mega);
create index pokemon_type1_idx on moshimo.pokemon (type1);
create index pokemon_type2_idx on moshimo.pokemon (type2);
create index pokemon_gender_idx on moshimo.pokemon (gender);

comment on column moshimo.pokemon.generation_introduced is
  'Bitmask of generations where this row is selectable. Gen N = 2^(N-1). Create a new row only when stats/types/abilities differ across generations; otherwise one row covers all applicable gens (e.g. 511 = Gen1..9).';
comment on column moshimo.pokemon.region_type is
  '0=original, 1=Alola, 2=Galar, 3=Hisui, 4=Paldea';
comment on column moshimo.pokemon.type2 is
  '0 means single-type (no second type).';
comment on column moshimo.pokemon.base_special is
  'Gen1 Special. Null for rows that only use Sp.Atk/Sp.Def.';
comment on column moshimo.pokemon.is_mega is
  'True for Mega Evolution forms.';
comment on column moshimo.pokemon.gender is
  '0=genderless, 1=male and female, 2=male only, 3=female only';

grant select on all tables in schema moshimo to anon, authenticated, service_role;
grant usage, select on all sequences in schema moshimo to anon, authenticated, service_role;
alter default privileges in schema moshimo
  grant select on tables to anon, authenticated, service_role;

alter table moshimo.types enable row level security;
alter table moshimo.abilities enable row level security;
alter table moshimo.pokemon enable row level security;

drop policy if exists types_select_all on moshimo.types;
create policy types_select_all
  on moshimo.types for select to anon, authenticated using (true);

drop policy if exists abilities_select_all on moshimo.abilities;
create policy abilities_select_all
  on moshimo.abilities for select to anon, authenticated using (true);

drop policy if exists pokemon_select_all on moshimo.pokemon;
create policy pokemon_select_all
  on moshimo.pokemon for select to anon, authenticated using (true);

-- Type master seed (0 = none)
insert into moshimo.types (id, name_ja, name_en) values
  (0,  'なし',     'None'),
  (1,  'ノーマル', 'Normal'),
  (2,  'ほのお',   'Fire'),
  (3,  'みず',     'Water'),
  (4,  'でんき',   'Electric'),
  (5,  'くさ',     'Grass'),
  (6,  'こおり',   'Ice'),
  (7,  'かくとう', 'Fighting'),
  (8,  'どく',     'Poison'),
  (9,  'じめん',   'Ground'),
  (10, 'ひこう',   'Flying'),
  (11, 'エスパー', 'Psychic'),
  (12, 'むし',     'Bug'),
  (13, 'いわ',     'Rock'),
  (14, 'ゴースト', 'Ghost'),
  (15, 'ドラゴン', 'Dragon'),
  (16, 'あく',     'Dark'),
  (17, 'はがね',   'Steel'),
  (18, 'フェアリー', 'Fairy')
on conflict (id) do update
set name_ja = excluded.name_ja,
    name_en = excluded.name_en;
