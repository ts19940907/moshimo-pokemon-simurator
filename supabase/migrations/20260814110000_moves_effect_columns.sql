-- Move battle-effect fields (PokeAPI meta hybrid + unique codes).

alter table moshimo.moves
  add column if not exists effect_category text,
  add column if not exists effect_meta jsonb not null default '{}'::jsonb,
  add column if not exists effect_code text;

comment on column moshimo.moves.effect_category is
  'PokeAPI move-category name (damage, ailment, unique, …). Common handler dispatch.';
comment on column moshimo.moves.effect_meta is
  'Structured effect params (ailment, chances, drain, healing, hits, flinch, stat_changes, …).';
comment on column moshimo.moves.effect_code is
  'Optional kebab-case handler id for unique / Gen1-special moves (e.g. unique-transform).';

create index if not exists moves_effect_category_idx
  on moshimo.moves (effect_category);

create index if not exists moves_effect_code_idx
  on moshimo.moves (effect_code)
  where effect_code is not null;
