-- Gen2 weather move descriptions (indefinite weather)
UPDATE moshimo.moves
SET description = '雨を降らせる。みずタイプのわざが強くなり、ほのおタイプのわざが弱くなる。',
    effect_code = 'unique-weather-rain'
WHERE pokeapi_id = 240 AND name_ja = 'あまごい';

UPDATE moshimo.moves
SET description = '日差しを強くする。ほのおタイプのわざが強くなり、みずタイプのわざが弱くなる。',
    effect_code = 'unique-weather-sun'
WHERE pokeapi_id = 241 AND name_ja = 'にほんばれ';
