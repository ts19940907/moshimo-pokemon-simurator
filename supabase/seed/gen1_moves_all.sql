-- Gen1 move master (introduced_generation=1)
-- Stats/effects aligned to Generation I (@pkmn/dex + Bulbapedia corrections).
truncate table moshimo.pokemon_moves cascade;
truncate table moshimo.moves cascade;

insert into moshimo.moves (id, pokeapi_id, name_ja, name_en, type_id, damage_class, power, accuracy, pp, priority, description, effect_category, effect_meta, effect_code, introduced_generation, available_generations) values
('00000000-0000-4000-8001-000000000001', 1, 'はたく', 'Pound', 1, 'physical', 40, 100, 35, 0, '威力40の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000002', 2, 'からてチョップ', 'Karate Chop', 1, 'physical', 50, 100, 25, 0, '威力50の攻撃。急所に当たりやすい。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":1,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000003', 3, 'おうふくビンタ', 'Double Slap', 1, 'physical', 15, 85, 10, 0, '威力15の攻撃。2〜5回連続で攻撃する。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":2,"max_hits":5,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 127),
('00000000-0000-4000-8001-000000000004', 4, 'れんぞくパンチ', 'Comet Punch', 1, 'physical', 18, 85, 15, 0, '威力18の攻撃。2〜5回連続で攻撃する。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":2,"max_hits":5,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 127),
('00000000-0000-4000-8001-000000000005', 5, 'メガトンパンチ', 'Mega Punch', 1, 'physical', 80, 85, 20, 0, '威力80の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000006', 6, 'ネコにこばん', 'Pay Day', 1, 'physical', 40, 100, 20, 0, '威力40の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000007', 7, 'ほのおのパンチ', 'Fire Punch', 2, 'special', 75, 100, 15, 0, '威力75の攻撃。10%の確率でやけど状態にする。', 'damage-ailment', '{"ailment":"burn","ailment_chance":10,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000008', 8, 'れいとうパンチ', 'Ice Punch', 6, 'special', 75, 100, 15, 0, '威力75の攻撃。10%の確率でこおり状態にする。', 'damage-ailment', '{"ailment":"freeze","ailment_chance":10,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000009', 9, 'かみなりパンチ', 'Thunder Punch', 4, 'special', 75, 100, 15, 0, '威力75の攻撃。10%の確率でまひ状態にする。', 'damage-ailment', '{"ailment":"paralysis","ailment_chance":10,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000010', 10, 'ひっかく', 'Scratch', 1, 'physical', 40, 100, 35, 0, '威力40の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000011', 11, 'はさむ', 'Vise Grip', 1, 'physical', 55, 100, 30, 0, '威力55の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000012', 12, 'ハサミギロチン', 'Guillotine', 1, 'physical', NULL, 30, 5, 0, '相手のHPを0にする一撃必殺技。', 'ohko', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-ohko', 1, 511),
('00000000-0000-4000-8001-000000000013', 13, 'かまいたち', 'Razor Wind', 1, 'physical', 80, 75, 10, 0, '1ターンためてから攻撃する。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":1,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-charge', 1, 127),
('00000000-0000-4000-8001-000000000014', 14, 'つるぎのまい', 'Swords Dance', 1, 'status', NULL, NULL, 30, 0, '能力変化を起こす。こうげきが2段階上がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"attack","change":2}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000015', 15, 'いあいぎり', 'Cut', 1, 'physical', 50, 95, 30, 0, '威力50の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000016', 16, 'かぜおこし', 'Gust', 1, 'physical', 40, 100, 35, 0, '威力40の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000017', 17, 'つばさでうつ', 'Wing Attack', 10, 'physical', 35, 100, 35, 0, '威力35の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000018', 18, 'ふきとばし', 'Whirlwind', 1, 'status', NULL, 85, 20, -6, '変化技。', 'force-switch', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000019', 19, 'そらをとぶ', 'Fly', 10, 'physical', 70, 95, 15, 0, '1ターンためてから攻撃する。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-charge', 1, 511),
('00000000-0000-4000-8001-000000000020', 20, 'しめつける', 'Bind', 1, 'physical', 15, 75, 20, 0, '相手を2〜5ターン行動不能にし、毎ターンダメージを与える。', 'damage-ailment', '{"ailment":"trap","ailment_chance":100,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":2,"max_turns":5,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-partial-trap', 1, 511),
('00000000-0000-4000-8001-000000000021', 21, 'たたきつける', 'Slam', 1, 'physical', 80, 75, 20, 0, '威力80の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000022', 22, 'つるのムチ', 'Vine Whip', 5, 'special', 35, 100, 10, 0, '威力35の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000023', 23, 'ふみつけ', 'Stomp', 1, 'physical', 65, 100, 20, 0, '威力65の攻撃。30%の確率でひるませる。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":30,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000024', 24, 'にどげり', 'Double Kick', 7, 'physical', 30, 100, 30, 0, '威力30の攻撃。2回連続で攻撃する。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":2,"max_hits":2,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000025', 25, 'メガトンキック', 'Mega Kick', 1, 'physical', 120, 75, 5, 0, '威力120の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000026', 26, 'とびげり', 'Jump Kick', 7, 'physical', 70, 95, 25, 0, '攻撃技。外すと自分も少しダメージを受ける。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-crash', 1, 127),
('00000000-0000-4000-8001-000000000027', 27, 'まわしげり', 'Rolling Kick', 7, 'physical', 60, 85, 15, 0, '威力60の攻撃。30%の確率でひるませる。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":30,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 127),
('00000000-0000-4000-8001-000000000028', 28, 'すなかけ', 'Sand Attack', 1, 'status', NULL, 100, 15, 0, '能力を変化させる。めいちゅうが1段階下がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"accuracy","change":-1}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000029', 29, 'ずつき', 'Headbutt', 1, 'physical', 70, 100, 15, 0, '威力70の攻撃。30%の確率でひるませる。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":30,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000030', 30, 'つのでつく', 'Horn Attack', 1, 'physical', 65, 100, 25, 0, '威力65の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000031', 31, 'みだれづき', 'Fury Attack', 1, 'physical', 15, 85, 20, 0, '威力15の攻撃。2〜5回連続で攻撃する。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":2,"max_hits":5,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000032', 32, 'つのドリル', 'Horn Drill', 1, 'physical', NULL, 30, 5, 0, '相手のHPを0にする一撃必殺技。', 'ohko', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-ohko', 1, 127),
('00000000-0000-4000-8001-000000000033', 33, 'たいあたり', 'Tackle', 1, 'physical', 35, 95, 35, 0, '威力35の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000034', 34, 'のしかかり', 'Body Slam', 1, 'physical', 85, 100, 15, 0, '威力85の攻撃。30%の確率でまひ状態にする。', 'damage-ailment', '{"ailment":"paralysis","ailment_chance":30,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000035', 35, 'まきつく', 'Wrap', 1, 'physical', 15, 85, 20, 0, '相手を2〜5ターン行動不能にし、毎ターンダメージを与える。', 'damage-ailment', '{"ailment":"trap","ailment_chance":100,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":2,"max_turns":5,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-partial-trap', 1, 127),
('00000000-0000-4000-8001-000000000036', 36, 'とっしん', 'Take Down', 1, 'physical', 90, 85, 20, 0, '威力90の攻撃。与えたダメージの25%を反動で受ける。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":-25,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000037', 37, 'あばれる', 'Thrash', 1, 'physical', 90, 100, 20, 0, '2〜3ターン連続で攻撃し、その後こんらんする。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-lock', 1, 511),
('00000000-0000-4000-8001-000000000038', 38, 'すてみタックル', 'Double-Edge', 1, 'physical', 100, 100, 15, 0, '威力100の攻撃。与えたダメージの25%を自分も受ける。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":-25,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000039', 39, 'しっぽをふる', 'Tail Whip', 1, 'status', NULL, 100, 30, 0, '能力を変化させる。ぼうぎょが1段階下がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"defense","change":-1}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000040', 40, 'どくばり', 'Poison Sting', 8, 'physical', 15, 100, 35, 0, '威力15の攻撃。20%の確率でどく状態にする。', 'damage-ailment', '{"ailment":"poison","ailment_chance":20,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000041', 41, 'ダブルニードル', 'Twineedle', 12, 'physical', 25, 100, 20, 0, '威力25の攻撃。20%の確率でどく状態にする。2回連続で攻撃する。', 'damage-ailment', '{"ailment":"poison","ailment_chance":20,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":2,"max_hits":2,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000042', 42, 'ミサイルばり', 'Pin Missile', 12, 'physical', 14, 85, 20, 0, '威力14の攻撃。2〜5回連続で攻撃する。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":2,"max_hits":5,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000043', 43, 'にらみつける', 'Leer', 1, 'status', NULL, 100, 30, 0, '能力を変化させる。ぼうぎょが1段階下がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":100,"stat_changes":[{"stat":"defense","change":-1}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000044', 44, 'かみつく', 'Bite', 1, 'physical', 60, 100, 25, 0, '威力60の攻撃。10%の確率でひるませる。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":10,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000045', 45, 'なきごえ', 'Growl', 1, 'status', NULL, 100, 40, 0, '能力を変化させる。こうげきが1段階下がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"attack","change":-1}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000046', 46, 'ほえる', 'Roar', 1, 'status', NULL, 100, 20, -6, '変化技。', 'force-switch', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000047', 47, 'うたう', 'Sing', 1, 'status', NULL, 55, 15, 0, '相手をねむり状態にする。', 'ailment', '{"ailment":"sleep","ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":2,"max_turns":4,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000048', 48, 'ちょうおんぱ', 'Supersonic', 1, 'status', NULL, 55, 20, 0, '相手をこんらん状態にする。', 'ailment', '{"ailment":"confusion","ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":2,"max_turns":5,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000049', 49, 'ソニックブーム', 'Sonic Boom', 1, 'physical', NULL, 90, 20, 0, '固定ダメージを与える。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-fixed-damage', 1, 511),
('00000000-0000-4000-8001-000000000050', 50, 'かなしばり', 'Disable', 1, 'status', NULL, 55, 20, 0, '相手の技のひとつを使えなくする。', 'unique', '{"ailment":"disable","ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":4,"max_turns":4,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-disable', 1, 511),
('00000000-0000-4000-8001-000000000051', 51, 'ようかいえき', 'Acid', 8, 'physical', 40, 100, 30, 0, '威力40の攻撃。33%の確率でぼうぎょが1段階下がる。', 'damage-lower', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":33,"stat_changes":[{"stat":"defense","change":-1}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000052', 52, 'ひのこ', 'Ember', 2, 'special', 40, 100, 25, 0, '威力40の攻撃。10%の確率でやけど状態にする。', 'damage-ailment', '{"ailment":"burn","ailment_chance":10,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000053', 53, 'かえんほうしゃ', 'Flamethrower', 2, 'special', 95, 100, 15, 0, '威力95の攻撃。10%の確率でやけど状態にする。', 'damage-ailment', '{"ailment":"burn","ailment_chance":10,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000054', 54, 'しろいきり', 'Mist', 6, 'status', NULL, NULL, 30, 0, '変化技。', 'field-effect', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000055', 55, 'みずでっぽう', 'Water Gun', 3, 'special', 40, 100, 25, 0, '威力40の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000056', 56, 'ハイドロポンプ', 'Hydro Pump', 3, 'special', 120, 80, 5, 0, '威力120の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000057', 57, 'なみのり', 'Surf', 3, 'special', 95, 100, 15, 0, '威力95の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000058', 58, 'れいとうビーム', 'Ice Beam', 6, 'special', 95, 100, 10, 0, '威力95の攻撃。10%の確率でこおり状態にする。', 'damage-ailment', '{"ailment":"freeze","ailment_chance":10,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000059', 59, 'ふぶき', 'Blizzard', 6, 'special', 120, 90, 5, 0, '威力120の攻撃。10%の確率でこおり状態にする。', 'damage-ailment', '{"ailment":"freeze","ailment_chance":10,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000060', 60, 'サイケこうせん', 'Psybeam', 11, 'special', 65, 100, 20, 0, '威力65の攻撃。10%の確率でこんらんにする。', 'damage-ailment', '{"ailment":"confusion","ailment_chance":10,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":2,"max_turns":5,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000061', 61, 'バブルこうせん', 'Bubble Beam', 3, 'special', 65, 100, 20, 0, '威力65の攻撃。33%の確率ですばやさが1段階下がる。', 'damage-lower', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":33,"stat_changes":[{"stat":"speed","change":-1}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000062', 62, 'オーロラビーム', 'Aurora Beam', 6, 'special', 65, 100, 20, 0, '威力65の攻撃。33%の確率でこうげきが1段階下がる。', 'damage-lower', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":33,"stat_changes":[{"stat":"attack","change":-1}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000063', 63, 'はかいこうせん', 'Hyper Beam', 1, 'physical', 150, 90, 5, 0, '強いダメージを与える。命中し相手を倒し切れないと次のターン動けない。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-hyper-beam', 1, 511),
('00000000-0000-4000-8001-000000000064', 64, 'つつく', 'Peck', 10, 'physical', 35, 100, 35, 0, '威力35の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000065', 65, 'ドリルくちばし', 'Drill Peck', 10, 'physical', 80, 100, 20, 0, '威力80の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000066', 66, 'じごくぐるま', 'Submission', 7, 'physical', 80, 80, 25, 0, '威力80の攻撃。与えたダメージの25%を自分も受ける。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":-25,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 127),
('00000000-0000-4000-8001-000000000067', 67, 'けたぐり', 'Low Kick', 7, 'physical', 50, 90, 20, 0, '威力50の攻撃。30%の確率でひるませる。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":30,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 127),
('00000000-0000-4000-8001-000000000068', 68, 'カウンター', 'Counter', 7, 'physical', NULL, 100, 20, -5, '固定ダメージを与える。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-fixed-damage', 1, 511),
('00000000-0000-4000-8001-000000000069', 69, 'ちきゅうなげ', 'Seismic Toss', 7, 'physical', NULL, 100, 20, 0, '固定ダメージを与える。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-fixed-damage', 1, 511),
('00000000-0000-4000-8001-000000000070', 70, 'かいりき', 'Strength', 1, 'physical', 80, 100, 15, 0, '威力80の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000071', 71, 'すいとる', 'Absorb', 5, 'special', 20, 100, 20, 0, '威力20の攻撃。与えたダメージの50%を回復する。', 'damage-heal', '{"ailment":null,"ailment_chance":0,"drain":50,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000072', 72, 'メガドレイン', 'Mega Drain', 5, 'special', 40, 100, 10, 0, '威力40の攻撃。与えたダメージの50%を回復する。', 'damage-heal', '{"ailment":null,"ailment_chance":0,"drain":50,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000073', 73, 'やどりぎのタネ', 'Leech Seed', 5, 'status', NULL, 90, 10, 0, '相手をleech-seed状態にする。', 'ailment', '{"ailment":"leech-seed","ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000074', 74, 'せいちょう', 'Growth', 1, 'status', NULL, NULL, 40, 0, '能力変化を起こす。とくしゅが1段階上がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"special","change":1}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000075', 75, 'はっぱカッター', 'Razor Leaf', 5, 'special', 55, 95, 25, 0, '威力55の攻撃。急所に当たりやすい。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":1,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000076', 76, 'ソーラービーム', 'Solar Beam', 5, 'special', 120, 100, 10, 0, '1ターンためてから攻撃する。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-charge', 1, 511),
('00000000-0000-4000-8001-000000000077', 77, 'どくのこな', 'Poison Powder', 8, 'status', NULL, 75, 35, 0, '相手をどく状態にする。', 'ailment', '{"ailment":"poison","ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000078', 78, 'しびれごな', 'Stun Spore', 5, 'status', NULL, 75, 30, 0, '相手をまひ状態にする。', 'ailment', '{"ailment":"paralysis","ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000079', 79, 'ねむりごな', 'Sleep Powder', 5, 'status', NULL, 75, 15, 0, '相手をねむり状態にする。', 'ailment', '{"ailment":"sleep","ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":2,"max_turns":4,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000080', 80, 'はなびらのまい', 'Petal Dance', 5, 'special', 70, 100, 20, 0, '2〜3ターン連続で攻撃し、その後こんらんする。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-lock', 1, 511),
('00000000-0000-4000-8001-000000000081', 81, 'いとをはく', 'String Shot', 12, 'status', NULL, 95, 40, 0, '能力を変化させる。すばやさが2段階下がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"speed","change":-2}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000082', 82, 'りゅうのいかり', 'Dragon Rage', 15, 'special', NULL, 100, 10, 0, '固定ダメージを与える。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-fixed-damage', 1, 511),
('00000000-0000-4000-8001-000000000083', 83, 'ほのおのうず', 'Fire Spin', 2, 'special', 15, 70, 15, 0, '相手を2〜5ターン行動不能にし、毎ターンダメージを与える。', 'damage-ailment', '{"ailment":"trap","ailment_chance":100,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":2,"max_turns":5,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-partial-trap', 1, 511),
('00000000-0000-4000-8001-000000000084', 84, 'でんきショック', 'Thunder Shock', 4, 'special', 40, 100, 30, 0, '威力40の攻撃。10%の確率でまひ状態にする。', 'damage-ailment', '{"ailment":"paralysis","ailment_chance":10,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000085', 85, '１０まんボルト', 'Thunderbolt', 4, 'special', 95, 100, 15, 0, '威力95の攻撃。10%の確率でまひ状態にする。', 'damage-ailment', '{"ailment":"paralysis","ailment_chance":10,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000086', 86, 'でんじは', 'Thunder Wave', 4, 'status', NULL, 100, 20, 0, 'まひ状態にする。', 'ailment', '{"ailment":"paralysis","ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000087', 87, 'かみなり', 'Thunder', 4, 'special', 120, 70, 10, 0, '威力120の攻撃。10%の確率でまひ状態にする。', 'damage-ailment', '{"ailment":"paralysis","ailment_chance":10,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000088', 88, 'いわおとし', 'Rock Throw', 13, 'physical', 50, 65, 15, 0, '威力50の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000089', 89, 'じしん', 'Earthquake', 9, 'physical', 100, 100, 10, 0, '威力100の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000090', 90, 'じわれ', 'Fissure', 9, 'physical', NULL, 30, 5, 0, '相手のHPを0にする一撃必殺技。', 'ohko', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-ohko', 1, 511),
('00000000-0000-4000-8001-000000000091', 91, 'あなをほる', 'Dig', 9, 'physical', 100, 100, 10, 0, '1ターンためてから攻撃する。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-charge', 1, 511),
('00000000-0000-4000-8001-000000000092', 92, 'どくどく', 'Toxic', 8, 'status', NULL, 85, 10, 0, 'どく状態にする。', 'ailment', '{"ailment":"poison","ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":15,"max_turns":15,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000093', 93, 'ねんりき', 'Confusion', 11, 'special', 50, 100, 25, 0, '威力50の攻撃。10%の確率でこんらんにする。', 'damage-ailment', '{"ailment":"confusion","ailment_chance":10,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":2,"max_turns":5,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000094', 94, 'サイコキネシス', 'Psychic', 11, 'special', 90, 100, 10, 0, '威力90の攻撃。33%の確率でとくしゅが1段階下がる。', 'damage-lower', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":33,"stat_changes":[{"stat":"special","change":-1}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000095', 95, 'さいみんじゅつ', 'Hypnosis', 11, 'status', NULL, 60, 20, 0, '相手をねむり状態にする。', 'ailment', '{"ailment":"sleep","ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":2,"max_turns":4,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000096', 96, 'ヨガのポーズ', 'Meditate', 11, 'status', NULL, NULL, 40, 0, '能力を変化させる。こうげきが1段階上がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"attack","change":1}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000097', 97, 'こうそくいどう', 'Agility', 11, 'status', NULL, NULL, 30, 0, '能力を変化させる。すばやさが2段階上がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"speed","change":2}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000098', 98, 'でんこうせっか', 'Quick Attack', 1, 'physical', 40, 100, 30, 1, '威力40の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000099', 99, 'いかり', 'Rage', 1, 'physical', 20, 100, 20, 0, '数ターンいかりをくりだす。攻撃を受けるたびこうげきが上がる。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-lock', 1, 127),
('00000000-0000-4000-8001-000000000100', 100, 'テレポート', 'Teleport', 11, 'status', NULL, NULL, 20, -6, '戦闘から脱出する。トレーナー戦では失敗する。', 'unique', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-teleport', 1, 511),
('00000000-0000-4000-8001-000000000101', 101, 'ナイトヘッド', 'Night Shade', 14, 'physical', NULL, 100, 15, 0, '固定ダメージを与える。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-fixed-damage', 1, 511),
('00000000-0000-4000-8001-000000000102', 102, 'ものまね', 'Mimic', 1, 'status', NULL, NULL, 10, 0, '相手の技をコピーして自分のものにする。', 'unique', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-mimic', 1, 511),
('00000000-0000-4000-8001-000000000103', 103, 'いやなおと', 'Screech', 1, 'status', NULL, 85, 40, 0, '能力を変化させる。ぼうぎょが2段階下がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"defense","change":-2}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000104', 104, 'かげぶんしん', 'Double Team', 1, 'status', NULL, NULL, 15, 0, '能力を変化させる。かいひが1段階上がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"evasion","change":1}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000105', 105, 'じこさいせい', 'Recover', 1, 'status', NULL, NULL, 20, 0, 'HPを50%回復する。', 'heal', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":50,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000106', 106, 'かたくなる', 'Harden', 1, 'status', NULL, NULL, 30, 0, '能力を変化させる。ぼうぎょが1段階上がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"defense","change":1}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000107', 107, 'ちいさくなる', 'Minimize', 1, 'status', NULL, NULL, 20, 0, '能力変化を起こす。かいひが2段階上がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"evasion","change":2}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000108', 108, 'えんまく', 'Smokescreen', 1, 'status', NULL, 100, 20, 0, '能力を変化させる。めいちゅうが1段階下がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"accuracy","change":-1}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000109', 109, 'あやしいひかり', 'Confuse Ray', 14, 'status', NULL, 100, 10, 0, '相手をこんらん状態にする。', 'ailment', '{"ailment":"confusion","ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":2,"max_turns":5,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000110', 110, 'からにこもる', 'Withdraw', 3, 'status', NULL, NULL, 40, 0, '能力を変化させる。ぼうぎょが1段階上がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"defense","change":1}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000111', 111, 'まるくなる', 'Defense Curl', 1, 'status', NULL, NULL, 40, 0, '能力を変化させる。ぼうぎょが1段階上がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"defense","change":1}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000112', 112, 'バリアー', 'Barrier', 11, 'status', NULL, NULL, 30, 0, '能力変化を起こす。ぼうぎょが2段階上がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"defense","change":2}]}'::jsonb, NULL, 1, 127),
('00000000-0000-4000-8001-000000000113', 113, 'ひかりのかべ', 'Light Screen', 11, 'status', NULL, NULL, 30, 0, '変化技。', 'field-effect', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000114', 114, 'くろいきり', 'Haze', 6, 'status', NULL, NULL, 30, 0, '変化技。', 'whole-field-effect', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000115', 115, 'リフレクター', 'Reflect', 11, 'status', NULL, NULL, 20, 0, '変化技。', 'field-effect', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000116', 116, 'きあいだめ', 'Focus Energy', 1, 'status', NULL, NULL, 30, 0, '気合をためる。初代カセットでは急所率が下がる。', 'unique', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-focus-energy', 1, 511),
('00000000-0000-4000-8001-000000000117', 117, 'がまん', 'Bide', 1, 'physical', NULL, 100, 10, 1, '2〜3ターン耐え、受けたダメージの2倍を返す。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-bide', 1, 127),
('00000000-0000-4000-8001-000000000118', 118, 'ゆびをふる', 'Metronome', 1, 'status', NULL, NULL, 10, 0, 'ランダムな技をくりだす。', 'unique', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-metronome', 1, 511),
('00000000-0000-4000-8001-000000000119', 119, 'オウムがえし', 'Mirror Move', 10, 'status', NULL, NULL, 20, 0, '相手が最後に使った技をまねる。', 'unique', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-mirror-move', 1, 127),
('00000000-0000-4000-8001-000000000120', 120, 'じばく', 'Self-Destruct', 1, 'physical', 130, 100, 5, 0, '自分のHPを0にして大ダメージを与える。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-explosion', 1, 511),
('00000000-0000-4000-8001-000000000121', 121, 'タマゴばくだん', 'Egg Bomb', 1, 'physical', 100, 75, 10, 0, '威力100の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 127),
('00000000-0000-4000-8001-000000000122', 122, 'したでなめる', 'Lick', 14, 'physical', 20, 100, 30, 0, '威力20の攻撃。30%の確率でまひ状態にする。', 'damage-ailment', '{"ailment":"paralysis","ailment_chance":30,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000123', 123, 'スモッグ', 'Smog', 8, 'physical', 20, 70, 20, 0, '威力20の攻撃。40%の確率でどく状態にする。', 'damage-ailment', '{"ailment":"poison","ailment_chance":40,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000124', 124, 'ヘドロこうげき', 'Sludge', 8, 'physical', 65, 100, 20, 0, '威力65の攻撃。40%の確率でどく状態にする。', 'damage-ailment', '{"ailment":"poison","ailment_chance":40,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000125', 125, 'ホネこんぼう', 'Bone Club', 9, 'physical', 65, 85, 20, 0, '威力65の攻撃。10%の確率でひるませる。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":10,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 127),
('00000000-0000-4000-8001-000000000126', 126, 'だいもんじ', 'Fire Blast', 2, 'special', 120, 85, 5, 0, '威力120の攻撃。30%の確率でやけど状態にする。', 'damage-ailment', '{"ailment":"burn","ailment_chance":30,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000127', 127, 'たきのぼり', 'Waterfall', 3, 'special', 80, 100, 15, 0, '威力80の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000128', 128, 'からではさむ', 'Clamp', 3, 'special', 35, 75, 10, 0, '相手を2〜5ターン行動不能にし、毎ターンダメージを与える。', 'damage-ailment', '{"ailment":"trap","ailment_chance":100,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":2,"max_turns":5,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-partial-trap', 1, 127),
('00000000-0000-4000-8001-000000000129', 129, 'スピードスター', 'Swift', 1, 'physical', 60, 100, 20, 0, '威力60の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000130', 130, 'ロケットずつき', 'Skull Bash', 1, 'physical', 100, 100, 15, 0, '1ターンためてから攻撃する。', 'damage', '{"ailment":null,"ailment_chance":100,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-charge', 1, 511),
('00000000-0000-4000-8001-000000000131', 131, 'とげキャノン', 'Spike Cannon', 1, 'physical', 20, 100, 15, 0, '威力20の攻撃。2〜5回連続で攻撃する。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":2,"max_hits":5,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 127),
('00000000-0000-4000-8001-000000000132', 132, 'からみつく', 'Constrict', 1, 'physical', 10, 100, 35, 0, '威力10の攻撃。33%の確率ですばやさが1段階下がる。', 'damage-lower', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":33,"stat_changes":[{"stat":"speed","change":-1}]}'::jsonb, NULL, 1, 127),
('00000000-0000-4000-8001-000000000133', 133, 'ドわすれ', 'Amnesia', 11, 'status', NULL, NULL, 20, 0, '能力を変化させる。とくぼうが2段階上がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"special-defense","change":2}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000134', 134, 'スプーンまげ', 'Kinesis', 11, 'status', NULL, 80, 15, 0, '能力を変化させる。めいちゅうが1段階下がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"accuracy","change":-1}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000135', 135, 'タマゴうみ', 'Soft-Boiled', 1, 'status', NULL, NULL, 10, 0, 'HPを50%回復する。', 'heal', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":50,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000136', 136, 'とびひざげり', 'High Jump Kick', 7, 'physical', 85, 90, 20, 0, '攻撃技。外すと自分も少しダメージを受ける。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-crash', 1, 511),
('00000000-0000-4000-8001-000000000137', 137, 'へびにらみ', 'Glare', 1, 'status', NULL, 75, 30, 0, 'まひ状態にする。', 'ailment', '{"ailment":"paralysis","ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000138', 138, 'ゆめくい', 'Dream Eater', 11, 'special', 100, 100, 15, 0, '威力100の攻撃。与えたダメージの50%を回復する。', 'damage-heal', '{"ailment":null,"ailment_chance":0,"drain":50,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000139', 139, 'どくガス', 'Poison Gas', 8, 'status', NULL, 55, 40, 0, 'どく状態にする。', 'ailment', '{"ailment":"poison","ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000140', 140, 'たまなげ', 'Barrage', 1, 'physical', 15, 85, 20, 0, '威力15の攻撃。2〜5回連続で攻撃する。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":2,"max_hits":5,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 127),
('00000000-0000-4000-8001-000000000141', 141, 'きゅうけつ', 'Leech Life', 12, 'physical', 20, 100, 15, 0, '威力20の攻撃。与えたダメージの50%を回復する。', 'damage-heal', '{"ailment":null,"ailment_chance":0,"drain":50,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000142', 142, 'あくまのキッス', 'Lovely Kiss', 1, 'status', NULL, 75, 10, 0, '相手をねむり状態にする。', 'ailment', '{"ailment":"sleep","ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":2,"max_turns":4,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000143', 143, 'ゴッドバード', 'Sky Attack', 10, 'physical', 140, 90, 5, 0, '1ターンためてから攻撃する。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":1,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-charge', 1, 511),
('00000000-0000-4000-8001-000000000144', 144, 'へんしん', 'Transform', 1, 'status', NULL, NULL, 10, 0, '相手と同じポケモンにへんしんする。', 'unique', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-transform', 1, 511),
('00000000-0000-4000-8001-000000000145', 145, 'あわ', 'Bubble', 3, 'special', 20, 100, 30, 0, '威力20の攻撃。33%の確率ですばやさが1段階下がる。', 'damage-lower', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":33,"stat_changes":[{"stat":"speed","change":-1}]}'::jsonb, NULL, 1, 127),
('00000000-0000-4000-8001-000000000146', 146, 'ピヨピヨパンチ', 'Dizzy Punch', 1, 'physical', 70, 100, 10, 0, '威力70の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 127),
('00000000-0000-4000-8001-000000000147', 147, 'キノコのほうし', 'Spore', 5, 'status', NULL, 100, 15, 0, '相手をねむり状態にする。', 'ailment', '{"ailment":"sleep","ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":2,"max_turns":4,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000148', 148, 'フラッシュ', 'Flash', 1, 'status', NULL, 70, 20, 0, '能力変化を起こす。めいちゅうが1段階下がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"accuracy","change":-1}]}'::jsonb, NULL, 1, 127),
('00000000-0000-4000-8001-000000000149', 149, 'サイコウェーブ', 'Psywave', 11, 'special', NULL, 80, 15, 0, '固定ダメージを与える。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-fixed-damage', 1, 127),
('00000000-0000-4000-8001-000000000150', 150, 'はねる', 'Splash', 1, 'status', NULL, NULL, 40, 0, '何も起こらない。', 'unique', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-splash', 1, 511),
('00000000-0000-4000-8001-000000000151', 151, 'とける', 'Acid Armor', 8, 'status', NULL, NULL, 40, 0, '能力変化を起こす。ぼうぎょが2段階上がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"defense","change":2}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000152', 152, 'クラブハンマー', 'Crabhammer', 3, 'special', 90, 85, 10, 0, '威力90の攻撃。急所に当たりやすい。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":1,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000153', 153, 'だいばくはつ', 'Explosion', 1, 'physical', 170, 100, 5, 0, '自分のHPを0にして大ダメージを与える。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-explosion', 1, 511),
('00000000-0000-4000-8001-000000000154', 154, 'みだれひっかき', 'Fury Swipes', 1, 'physical', 18, 80, 15, 0, '威力18の攻撃。2〜5回連続で攻撃する。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":2,"max_hits":5,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000155', 155, 'ホネブーメラン', 'Bonemerang', 9, 'physical', 50, 90, 10, 0, '威力50の攻撃。2回連続で攻撃する。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":2,"max_hits":2,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000156', 156, 'ねむる', 'Rest', 11, 'status', NULL, NULL, 10, 0, 'HPを全回復し、2ターンのねむり状態になる。', 'unique', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-rest', 1, 511),
('00000000-0000-4000-8001-000000000157', 157, 'いわなだれ', 'Rock Slide', 13, 'physical', 75, 90, 10, 0, '威力75の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000158', 158, 'ひっさつまえば', 'Hyper Fang', 1, 'physical', 80, 90, 15, 0, '威力80の攻撃。10%の確率でひるませる。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":10,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000159', 159, 'かくばる', 'Sharpen', 1, 'status', NULL, NULL, 30, 0, '能力を変化させる。こうげきが1段階上がる。', 'net-good-stats', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[{"stat":"attack","change":1}]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000160', 160, 'テクスチャー', 'Conversion', 1, 'status', NULL, NULL, 30, 0, '自分のタイプを技のタイプに変える。', 'unique', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-conversion', 1, 511),
('00000000-0000-4000-8001-000000000161', 161, 'トライアタック', 'Tri Attack', 1, 'physical', 80, 100, 10, 0, '威力80の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000162', 162, 'いかりのまえば', 'Super Fang', 1, 'physical', NULL, 90, 10, 0, '固定ダメージを与える。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-fixed-damage', 1, 511),
('00000000-0000-4000-8001-000000000163', 163, 'きりさく', 'Slash', 1, 'physical', 70, 100, 20, 0, '威力70の攻撃。急所に当たりやすい。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":1,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511),
('00000000-0000-4000-8001-000000000164', 164, 'みがわり', 'Substitute', 1, 'status', NULL, NULL, 10, 0, 'HPを少し削ってみがわりを出し、攻撃を引き受ける。', 'unique', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":0,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, 'unique-substitute', 1, 511),
('00000000-0000-4000-8001-000000000165', 165, 'わるあがき', 'Struggle', 1, 'physical', 50, 100, 10, 0, '威力50の攻撃。', 'damage', '{"ailment":null,"ailment_chance":0,"drain":0,"healing":-25,"flinch_chance":0,"crit_rate":0,"min_hits":null,"max_hits":null,"min_turns":null,"max_turns":null,"stat_chance":0,"stat_changes":[]}'::jsonb, NULL, 1, 511);

-- Link Gen1-usable pokemon rows to Gen1 moves (RB/Yellow learnsets)
-- Includes Gen1 pre-evolution learnsets on evolved forms.
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
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 11 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000081'::uuid from moshimo.pokemon p where p.dex_no = 11 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 11 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000013'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000016'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000018'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000081'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 12 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000040'::uuid from moshimo.pokemon p where p.dex_no = 14 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000081'::uuid from moshimo.pokemon p where p.dex_no = 14 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000040'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000041'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000042'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000072'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000081'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 15 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000021'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000025'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000034'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000039'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000057'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000098'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000099'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000102'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000104'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000113'::uuid from moshimo.pokemon p where p.dex_no = 26 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000154'::uuid from moshimo.pokemon p where p.dex_no = 31 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000031'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 34 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000001'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000111'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000113'::uuid from moshimo.pokemon p where p.dex_no = 36 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000053'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000083'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000109'::uuid from moshimo.pokemon p where p.dex_no = 38 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000001'::uuid from moshimo.pokemon p where p.dex_no = 40 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000071'::uuid from moshimo.pokemon p where p.dex_no = 45 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000046'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000052'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000053'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000063'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000082'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000091'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000092'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000097'::uuid from moshimo.pokemon p where p.dex_no = 59 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000133'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000145'::uuid from moshimo.pokemon p where p.dex_no = 62 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000021'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000022'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000074'::uuid from moshimo.pokemon p where p.dex_no = 71 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000033'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000036'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000038'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000043'::uuid from moshimo.pokemon p where p.dex_no = 91 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000073'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000076'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000077'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000078'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000079'::uuid from moshimo.pokemon p where p.dex_no = 103 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000056'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000105'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000106'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000107'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000113'::uuid from moshimo.pokemon p where p.dex_no = 121 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000150'::uuid from moshimo.pokemon p where p.dex_no = 130 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 134 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000044'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
union all
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 135 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000045'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
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
select p.id, '00000000-0000-4000-8001-000000000116'::uuid from moshimo.pokemon p where p.dex_no = 136 and (p.available_generations & 1) <> 0
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


