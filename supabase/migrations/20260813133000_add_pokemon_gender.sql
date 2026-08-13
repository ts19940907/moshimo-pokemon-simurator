-- Add gender category to pokemon species.
-- 0=genderless, 1=male&female, 2=male only, 3=female only

alter table moshimo.pokemon
  add column if not exists gender smallint not null default 1
  check (gender in (0, 1, 2, 3));

comment on column moshimo.pokemon.gender is
  '0=genderless, 1=male and female, 2=male only, 3=female only';

create index if not exists pokemon_gender_idx on moshimo.pokemon (gender);
