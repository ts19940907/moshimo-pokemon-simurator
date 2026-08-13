-- Link Gen1-usable pokemon rows to Gen1 moves (RB/Yellow learnsets)
insert into moshimo.pokemon_moves (pokemon_id, move_id)
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000022'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000073'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000074'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000075'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000077'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000079'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 1 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000022'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000073'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000074'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000075'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000077'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000079'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 2 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000022'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000073'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000074'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000075'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000077'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000079'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 3 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000052'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000053'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000082'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000083'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000163'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 4 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000052'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000053'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000082'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000083'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000163'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 5 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000019'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000052'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000053'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000082'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000083'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000163'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 6 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000110'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000145'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 7 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000110'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000145'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 8 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000110'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000145'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 9 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 10 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000081'::uuid from moshimo.pokemon p where p.dex_no = 10 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 11 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000016'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000048'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000060'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000077'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000078'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000079'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000093'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000040'::uuid from moshimo.pokemon p where p.dex_no = 13 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000081'::uuid from moshimo.pokemon p where p.dex_no = 13 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 14 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000031'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000041'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000042'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000016'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000017'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000019'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000028'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000098'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000119'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000143'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 16 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000016'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000017'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000019'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000028'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000098'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000119'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000143'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 17 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000016'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000017'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000019'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000028'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000098'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000119'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000143'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 18 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000098'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000158'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000162'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 19 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000098'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000158'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000162'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 20 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000019'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000031'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000064'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000065'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000119'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000143'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 21 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000019'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000031'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000064'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000065'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000119'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000143'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 22 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000035'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000040'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000051'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000137'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 23 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000035'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000040'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000051'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000137'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 24 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000021'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000084'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000098'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000113'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 25 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000084'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000028'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000040'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000154'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000163'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 27 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000028'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000040'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000154'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000163'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 28 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000024'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000040'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000154'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 29 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000024'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000040'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000154'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 30 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000024'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000040'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000024'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000030'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000031'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000040'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 32 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000024'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000030'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000031'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000040'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 33 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000024'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000030'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000037'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000040'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000001'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000003'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000047'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000107'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000111'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000113'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 35 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000003'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000047'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000107'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000046'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000052'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000053'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000083'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000098'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000109'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 37 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000046'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000052'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000098'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000001'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000003'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000047'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000050'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000111'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 39 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000003'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000047'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000050'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000111'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000017'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000048'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000109'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000114'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000141'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 41 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000017'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000048'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000109'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000114'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000141'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 42 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000051'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000071'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000077'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000078'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000079'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000080'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 43 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000051'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000071'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000077'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000078'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000079'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000080'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 44 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000051'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000077'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000078'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000079'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000080'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000074'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000078'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000141'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000147'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000163'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 46 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000074'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000078'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000141'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000147'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000163'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 47 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000048'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000050'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000060'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000077'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000078'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000079'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000093'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000141'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 48 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000048'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000050'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000060'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000077'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000078'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000079'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000093'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000141'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 49 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000028'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000163'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 50 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000028'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000163'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 51 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000154'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000163'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 52 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000154'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000163'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 53 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000050'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000093'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000154'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 54 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000050'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000093'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000154'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 55 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000002'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000037'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000067'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000154'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 56 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000002'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000037'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000067'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000154'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 57 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000046'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000052'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000053'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000082'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 58 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000046'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000052'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000082'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000003'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000095'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000133'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000145'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 60 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000003'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000095'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000133'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000145'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 61 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000003'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000095'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 63 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000050'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000060'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000093'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000105'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000134'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 64 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000050'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000060'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000093'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000105'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000134'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 65 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000002'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000067'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 66 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000002'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000067'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 67 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000002'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000067'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 68 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000021'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000022'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000035'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000051'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000074'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000075'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000077'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000078'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000079'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 69 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000021'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000022'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000035'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000051'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000074'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000075'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000077'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000078'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000079'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 70 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000035'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000051'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000075'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000077'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000078'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000079'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000035'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000040'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000048'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000051'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000112'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000132'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 72 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000035'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000040'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000048'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000051'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000112'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000132'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 73 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000088'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000111'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 74 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000088'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000111'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 75 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000088'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000111'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 76 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000023'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000052'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000083'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 77 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000023'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000052'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000083'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 78 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000029'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000050'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000093'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000133'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 79 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000029'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000050'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000093'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000110'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000133'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 80 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000048'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000049'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000084'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 81 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000048'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000049'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000084'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 82 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000019'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000028'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000031'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000064'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000163'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 83 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000019'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000031'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000064'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000065'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000143'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 84 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000019'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000031'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000064'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000065'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000143'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 85 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000029'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000062'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 86 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000029'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000062'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 87 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000001'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000050'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000107'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000124'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000139'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000151'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 88 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000001'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000050'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000107'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000124'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000139'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000151'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 89 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000048'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000062'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000110'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000128'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 90 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000048'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000062'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000110'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000128'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000131'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000095'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000101'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000109'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000122'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000138'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 92 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000095'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000101'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000109'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000122'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000138'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 93 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000095'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000101'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000109'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000122'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000138'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 94 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000020'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000021'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000088'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 95 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000001'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000029'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000050'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000093'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000095'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000096'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000138'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000139'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 96 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000001'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000029'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000050'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000093'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000095'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000096'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000138'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000139'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 97 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000011'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000012'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000023'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000145'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000152'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 98 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000011'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000012'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000023'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000145'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000152'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 99 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000049'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000113'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 100 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000049'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000113'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 101 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000073'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000077'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000078'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000079'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000095'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000121'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000140'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 102 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000023'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000095'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000121'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000140'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000029'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000037'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000125'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000155'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 104 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000029'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000037'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000125'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000155'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 105 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000024'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000026'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000027'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000096'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000136'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 106 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000004'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000007'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000008'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000009'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 107 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000021'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000023'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000035'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000048'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000050'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000111'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 108 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 109 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 109 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 109 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 109 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 109 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 109 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 109 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000108'::uuid from moshimo.pokemon p where p.dex_no = 109 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000114'::uuid from moshimo.pokemon p where p.dex_no = 109 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 109 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 109 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000123'::uuid from moshimo.pokemon p where p.dex_no = 109 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000124'::uuid from moshimo.pokemon p where p.dex_no = 109 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 109 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 109 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 109 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 109 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000108'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000114'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000123'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000124'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 110 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000023'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000030'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000031'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 111 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000023'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000030'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000031'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 112 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000001'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000003'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000047'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000107'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000111'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000113'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000121'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000135'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 113 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000020'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000021'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000022'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000071'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000074'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000077'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000078'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000079'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000132'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 114 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000004'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000146'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 115 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000108'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000145'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 116 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000108'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000145'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 117 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000030'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000031'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000048'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000064'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000127'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 118 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000030'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000031'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000048'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000064'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000127'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 119 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000105'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000107'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000113'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 120 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000003'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000093'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000096'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000112'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000113'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 122 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000017'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000098'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000163'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 123 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000001'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000003'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000008'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000037'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000122'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000142'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 124 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000009'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000084'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000098'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000103'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000113'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 125 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000007'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000052'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000053'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000108'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000109'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000123'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 126 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000011'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000012'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000020'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000163'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 127 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000023'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 128 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 129 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000150'::uuid from moshimo.pokemon p where p.dex_no = 129 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000082'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000047'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000054'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000082'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000109'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 131 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000144'::uuid from moshimo.pokemon p where p.dex_no = 132 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000028'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000098'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 133 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000028'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000054'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000062'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000098'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000114'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000151'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000024'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000028'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000042'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000084'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000098'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000028'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000052'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000053'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000083'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000098'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000123'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000060'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000105'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000159'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000160'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 137 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000030'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000110'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000131'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 138 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000030'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000110'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000131'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 139 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000071'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000163'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 140 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000010'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000071'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000163'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 141 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000017'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000019'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000048'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000082'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000143'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 142 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000029'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000133'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 143 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000019'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000054'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000064'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000143'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 144 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000019'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000065'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000084'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000113'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000143'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 145 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000019'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000064'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000083'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000143'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 146 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000021'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000035'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000082'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 147 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000021'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000035'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000082'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 148 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000021'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000035'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000082'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 149 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000050'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000054'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000093'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000105'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000112'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000133'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 150 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000001'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000005'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000006'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000014'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000015'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000019'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000032'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000055'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000058'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000059'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000061'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000066'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000068'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000069'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000070'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000082'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000085'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000086'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000087'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000089'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000090'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000094'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000100'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000115'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000117'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000118'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000120'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000121'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000126'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000129'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000130'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000135'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000138'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000143'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000144'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000148'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000149'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000153'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000156'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000157'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000161'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000164'::uuid from moshimo.pokemon p where p.dex_no = 151 and (p.available_generations & 1) <> 0;

