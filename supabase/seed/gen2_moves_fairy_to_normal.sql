-- Gen2: Fairy did not exist; remap Sweet Kiss / Charm / Moonlight to Normal.
update moshimo.moves
set type_id = 1
where pokeapi_id in (186, 204, 236)
  and type_id = 18;
