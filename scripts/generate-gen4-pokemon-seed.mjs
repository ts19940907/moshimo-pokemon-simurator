/**
 * Generate Gen4 (Sinnoh, dex 387–493) pokemon JSON + additive SQL seed,
 * including alternate forms as separate rows:
 * Deoxys (Gen3 debut, Gen3–9), Wormadam, Rotom, Giratina, Shaymin, Arceus types.
 *
 * Values are resolved as of Gen4 (past_types / past_stats / past_abilities).
 * Also splits Gen1–3 rows that stop being final evolutions in Gen4
 * (e.g. Electabuzz → Electivire) into a Gen1–3 row and a Gen4+ row.
 *
 * Usage: node scripts/generate-gen4-pokemon-seed.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  DEFAULT_FORM_NAMES,
  FORM_ROWS,
  formDisplayNames,
  GEN3_9,
  GEN4_9,
  SINNOH_FIRST,
  SINNOH_LAST,
  speciesNames,
} from "./lib/gen4Forms.mjs";
import { abilitiesForGeneration } from "./lib/pokeapiAbilities.mjs";
import {
  fetchJson,
  idFromUrl,
  mapPool,
  pickName,
  seedUuid,
  sqlStr,
} from "./lib/pokeapiFetch.mjs";
import { statsForGeneration, typesForGeneration } from "./lib/pokeapiPast.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const RULES_GENERATION = 4;
/** PokeAPI chains Phione → Manaphy, but Phione never evolves in-game. */
const NEVER_EVOLVES = new Set([489]);

function abilityUuid(id) {
  return seedUuid(id);
}

function genderFromRate(rate) {
  if (rate === -1) return 0;
  if (rate === 0) return 2;
  if (rate === 8) return 3;
  return 1;
}

async function evolutionChildren(species) {
  const chain = await fetchJson(species.evolution_chain.url);
  function find(node) {
    if (idFromUrl(node.species.url, "pokemon-species") === species.id) return node;
    for (const child of node.evolves_to ?? []) {
      const hit = find(child);
      if (hit) return hit;
    }
    return null;
  }
  const node = find(chain.chain);
  return (node?.evolves_to ?? []).map((child) =>
    idFromUrl(child.species.url, "pokemon-species"),
  );
}

function categoryOf(species) {
  if (species.is_mythical) return "mythical";
  if (species.is_legendary) return "restricted_legendary";
  return "normal";
}

async function abilitySlots(pokemon, abilityMap) {
  const slots = { 1: null, 2: null };
  for (const a of abilitiesForGeneration(pokemon, RULES_GENERATION)) {
    // Hidden abilities debut Gen5.
    if (a.is_hidden || a.slot === 3) continue;
    const id = idFromUrl(a.ability.url, "ability");
    if (!abilityMap.has(id)) {
      const detail = await fetchJson(a.ability.url);
      abilityMap.set(id, {
        id: abilityUuid(id),
        pokeapi_id: id,
        name_ja: pickName(detail.names) ?? detail.name,
        name_en: pickName(detail.names, ["en"]) ?? detail.name,
      });
    }
    slots[a.slot] = abilityUuid(id);
  }
  return slots;
}

function buildRow({
  dex,
  names,
  species,
  pokemon,
  types,
  slots,
  isFinal,
  sprite,
  introduced = 4,
  mask = GEN4_9,
}) {
  const stats = statsForGeneration(pokemon, RULES_GENERATION);
  return {
    dex_no: dex,
    region_type: 0,
    name_ja: names.ja,
    name_en: names.en,
    category: categoryOf(species),
    introduced_generation: introduced,
    available_generations: mask,
    type1: types[0],
    type2: types[1],
    base_hp: stats.hp,
    base_attack: stats.attack,
    base_defense: stats.defense,
    base_special: null,
    base_sp_attack: stats["special-attack"],
    base_sp_defense: stats["special-defense"],
    base_speed: stats.speed,
    ability1_id: slots[1],
    ability2_id: slots[2],
    hidden_ability_id: null,
    gender: genderFromRate(species.gender_rate),
    is_mega: false,
    is_final_evolution: isFinal,
    sprite_url: sprite,
  };
}

async function main() {
  const abilityMap = new Map();
  const rows = [];
  const dexNos = Array.from(
    { length: SINNOH_LAST - SINNOH_FIRST + 1 },
    (_, i) => SINNOH_FIRST + i,
  );

  console.log(`fetch Sinnoh species ${SINNOH_FIRST}–${SINNOH_LAST}…`);
  const speciesByDex = new Map();
  const finalByDex = new Map();
  await mapPool(dexNos, 8, async (dex) => {
    const species = await fetchJson(`https://pokeapi.co/api/v2/pokemon-species/${dex}`);
    speciesByDex.set(dex, species);
    const children = await evolutionChildren(species);
    finalByDex.set(
      dex,
      NEVER_EVOLVES.has(dex) || !children.some((id) => id != null && id <= SINNOH_LAST),
    );
  });

  for (const dex of dexNos) {
    process.stdout.write(`\rpokemon ${dex}/${SINNOH_LAST}`);
    const species = speciesByDex.get(dex);
    const pokemon = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${dex}`);
    let names = speciesNames(species);
    const defaultForm = DEFAULT_FORM_NAMES[dex];
    if (defaultForm) {
      const form = await fetchJson(`https://pokeapi.co/api/v2/pokemon-form/${defaultForm}`);
      names = formDisplayNames(names, form);
    }
    rows.push(
      buildRow({
        dex,
        names,
        species,
        pokemon,
        types: typesForGeneration(pokemon.types, pokemon.past_types, RULES_GENERATION),
        slots: await abilitySlots(pokemon, abilityMap),
        isFinal: finalByDex.get(dex),
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex}.png`,
      }),
    );
  }
  console.log("");

  console.log(`fetch ${FORM_ROWS.length} alternate forms…`);
  for (const spec of FORM_ROWS) {
    const species =
      speciesByDex.get(spec.dex) ??
      (await fetchJson(`https://pokeapi.co/api/v2/pokemon-species/${spec.dex}`));
    const pokemon = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${spec.pokemon}`);
    const form = await fetchJson(`https://pokeapi.co/api/v2/pokemon-form/${spec.form}`);
    const names = formDisplayNames(speciesNames(species), form);
    // Arceus type forms share the base pokemon; the form carries the type.
    const types =
      spec.pokemon === spec.dex
        ? typesForGeneration(form.types, form.past_types, RULES_GENERATION)
        : typesForGeneration(pokemon.types, pokemon.past_types, RULES_GENERATION);
    rows.push(
      buildRow({
        dex: spec.dex,
        names,
        species,
        pokemon,
        types,
        slots: await abilitySlots(pokemon, abilityMap),
        isFinal: spec.dex === 386 ? true : finalByDex.get(spec.dex),
        sprite:
          form.sprites?.front_default ??
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${spec.pokemon}.png`,
        introduced: spec.introduced ?? 4,
        mask: spec.mask ?? GEN4_9,
      }),
    );
  }

  console.log("find Gen1–3 species that gain a Gen4 evolution…");
  const oldDex = Array.from({ length: SINNOH_FIRST - 1 }, (_, i) => i + 1);
  const newlyNonFinal = [];
  await mapPool(oldDex, 8, async (dex) => {
    const species = await fetchJson(`https://pokeapi.co/api/v2/pokemon-species/${dex}`);
    const children = await evolutionChildren(species);
    if (children.some((id) => id != null && id >= SINNOH_FIRST && id <= SINNOH_LAST)) {
      newlyNonFinal.push(dex);
    }
  });
  newlyNonFinal.sort((a, b) => a - b);
  console.log(`gain Gen4 evolution: ${newlyNonFinal.join(", ")}`);

  const abilities = [...abilityMap.values()].sort((a, b) => a.pokeapi_id - b.pokeapi_id);

  fs.writeFileSync(
    path.join(root, "src/data/gen4-pokemon.json"),
    `${JSON.stringify(rows, null, 2)}\n`,
  );

  const abilitySql = [
    "-- Abilities used by Gen4-era species (skip existing ids; full rows come from gen4_abilities.sql)",
    "insert into moshimo.abilities (id, pokeapi_id, name_ja, name_en, introduced_generation, available_generations) values",
    abilities
      .map(
        (a) =>
          `(${sqlStr(a.id)}, ${a.pokeapi_id}, ${sqlStr(a.name_ja)}, ${sqlStr(a.name_en)}, ${a.pokeapi_id <= 76 ? 3 : 4}, ${a.pokeapi_id <= 76 ? GEN3_9 : GEN4_9})`,
      )
      .join(",\n"),
    "on conflict (id) do nothing;",
    "",
  ].join("\n");

  const cols = [
    "dex_no",
    "region_type",
    "name_ja",
    "name_en",
    "category",
    "introduced_generation",
    "available_generations",
    "type1",
    "type2",
    "base_hp",
    "base_attack",
    "base_defense",
    "base_special",
    "base_sp_attack",
    "base_sp_defense",
    "base_speed",
    "ability1_id",
    "ability2_id",
    "hidden_ability_id",
    "gender",
    "is_mega",
    "is_final_evolution",
    "sprite_url",
  ];
  const updatable = cols.filter(
    (c) => !["dex_no", "region_type", "is_mega", "name_en", "available_generations"].includes(c),
  );

  const pokemonSql = [
    "-- Gen4 Sinnoh species (dex 387–493) + alternate forms. Additive UPSERT.",
    `insert into moshimo.pokemon (${cols.join(", ")}) values`,
    rows.map((p) => `(${cols.map((c) => sqlStr(p[c])).join(", ")})`).join(",\n"),
    "on conflict (dex_no, region_type, is_mega, name_en, available_generations) do update set",
    updatable.map((c) => `  ${c} = excluded.${c}`).join(",\n") + ";",
    "",
  ].join("\n");

  const splitList = newlyNonFinal.join(", ");
  const finalSplitSql = `-- Gen1–3 species that gain an evolution in Gen4: keep the Gen1–3 row final,
-- add a Gen4+ copy with is_final_evolution = false. Idempotent.
insert into moshimo.pokemon (${cols.join(", ")})
select ${cols
    .map((c) =>
      c === "available_generations"
        ? "p.available_generations & ~7"
        : c === "is_final_evolution"
          ? "false"
          : `p.${c}`,
    )
    .join(", ")}
from moshimo.pokemon p
where p.dex_no in (${splitList})
  and p.is_final_evolution
  and (p.available_generations & 8) <> 0
  and (p.available_generations & 7) <> 0
on conflict (dex_no, region_type, is_mega, name_en, available_generations) do nothing;

update moshimo.pokemon p
set available_generations = p.available_generations & 7
where p.dex_no in (${splitList})
  and p.is_final_evolution
  and (p.available_generations & 8) <> 0
  and (p.available_generations & 7) <> 0;
`;

  const seedDir = path.join(root, "supabase/seed");
  fs.writeFileSync(
    path.join(seedDir, "gen4_pokemon.sql"),
    `-- Gen4 pokemon (run after gen3 seeds). Regenerated by scripts/generate-gen4-pokemon-seed.mjs\n\n${abilitySql}\n${pokemonSql}\n${finalSplitSql}`,
  );
  console.log(
    `wrote src/data/gen4-pokemon.json (${rows.length} rows), supabase/seed/gen4_pokemon.sql (${abilities.length} abilities, ${newlyNonFinal.length} final splits)`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
