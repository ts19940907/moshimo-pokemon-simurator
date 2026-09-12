-- Gen1 rules + Gen2 debut Dark/Steel Pokémon:
-- add available_generations=1 rows with Dark/Steel stripped
-- (mono → Normal; dual → keep the other type only).
-- Apply after gen2_pokemon / gen2_all and gen2 learnsets.

insert into moshimo.pokemon (
  dex_no,
  region_type,
  name_ja,
  name_en,
  category,
  introduced_generation,
  available_generations,
  type1,
  type2,
  base_hp,
  base_attack,
  base_defense,
  base_special,
  base_sp_attack,
  base_sp_defense,
  base_speed,
  ability1_id,
  ability2_id,
  hidden_ability_id,
  gender,
  is_mega,
  is_final_evolution,
  sprite_url
)
select
  p.dex_no,
  p.region_type,
  p.name_ja,
  p.name_en,
  p.category,
  p.introduced_generation,
  1 as available_generations,
  case
    when p.type1 not in (16, 17) then p.type1
    when p.type2 not in (16, 17) and p.type2 <> 0 then p.type2
    else 1
  end as type1,
  case
    when p.type1 not in (16, 17)
      and p.type2 not in (16, 17)
      and p.type2 <> 0 then p.type2
    else 0
  end as type2,
  p.base_hp,
  p.base_attack,
  p.base_defense,
  p.base_special,
  p.base_sp_attack,
  p.base_sp_defense,
  p.base_speed,
  p.ability1_id,
  p.ability2_id,
  p.hidden_ability_id,
  p.gender,
  p.is_mega,
  p.is_final_evolution,
  p.sprite_url
from moshimo.pokemon p
where p.introduced_generation = 2
  and (p.available_generations & 2) <> 0
  and (p.type1 in (16, 17) or p.type2 in (16, 17))
on conflict (dex_no, region_type, is_mega, name_en, available_generations) do update set
  type1 = excluded.type1,
  type2 = excluded.type2,
  base_special = excluded.base_special,
  base_sp_attack = excluded.base_sp_attack,
  base_sp_defense = excluded.base_sp_defense,
  is_final_evolution = excluded.is_final_evolution,
  updated_at = now();

-- Copy Gen2 learnsets onto Gen1-compat rows (same move UUIDs; row pick is client-side).
insert into moshimo.pokemon_moves (pokemon_id, move_id)
select p_new.id, pm.move_id
from moshimo.pokemon p_old
join moshimo.pokemon_moves pm on pm.pokemon_id = p_old.id
join moshimo.pokemon p_new
  on p_new.dex_no = p_old.dex_no
 and p_new.name_en = p_old.name_en
 and p_new.region_type = p_old.region_type
 and p_new.is_mega = p_old.is_mega
 and p_new.available_generations = 1
where p_old.introduced_generation = 2
  and (p_old.available_generations & 2) <> 0
  and (p_old.type1 in (16, 17) or p_old.type2 in (16, 17))
on conflict (pokemon_id, move_id) do nothing;
