/**
 * Generate Gen2 (Johto, dex 152–251) pokemon JSON + additive SQL seed.
 * Does not truncate existing Gen1 rows — INSERT only.
 *
 * Usage: node scripts/generate-gen2-pokemon-seed.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Gen2–9 bits (exclude Gen1-only). Default Johto rows usable Gen2+. */
const GEN2_9 = 510; // 511 & ~1

const TYPE_NAME_TO_ID = {
  normal: 1,
  fire: 2,
  water: 3,
  electric: 4,
  grass: 5,
  ice: 6,
  fighting: 7,
  poison: 8,
  ground: 9,
  flying: 10,
  psychic: 11,
  bug: 12,
  rock: 13,
  ghost: 14,
  dragon: 15,
  dark: 16,
  steel: 17,
  fairy: 18,
};

const RESTRICTED = new Set([243, 244, 245, 249, 250]);
const MYTHICAL = new Set([251]);

function abilityUuid(id) {
  return `00000000-0000-4000-8000-${String(id).padStart(12, "0")}`;
}

function sqlStr(s) {
  if (s === null || s === undefined) return "NULL";
  if (typeof s === "boolean") return s ? "TRUE" : "FALSE";
  if (typeof s === "number") return String(s);
  return `'${String(s).replace(/'/g, "''")}'`;
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.json();
}

function genderFromRate(rate) {
  if (rate === -1) return 0;
  if (rate === 0) return 2;
  if (rate === 8) return 3;
  return 1;
}

async function evolvesFurtherInJohto(speciesUrl, dexNo) {
  const species = await fetchJson(speciesUrl);
  const chain = await fetchJson(species.evolution_chain.url);

  function findNode(node) {
    const id = Number(node.species.url.match(/\/pokemon-species\/(\d+)\//)[1]);
    if (id === dexNo) return node;
    for (const child of node.evolves_to ?? []) {
      const hit = findNode(child);
      if (hit) return hit;
    }
    return null;
  }

  const node = findNode(chain.chain);
  if (!node) return false;
  return (node.evolves_to ?? []).some((child) => {
    const id = Number(child.species.url.match(/\/pokemon-species\/(\d+)\//)[1]);
    return id >= 1 && id <= 251;
  });
}

async function main() {
  const abilityMap = new Map();
  const rows = [];

  for (let dex = 152; dex <= 251; dex += 1) {
    process.stdout.write(`\rfetch ${dex}/251`);
    const pokemon = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${dex}`);
    const species = await fetchJson(pokemon.species.url);

    const nameJa =
      species.names.find((n) => n.language.name === "ja-Hrkt")?.name ||
      species.names.find((n) => n.language.name === "ja")?.name ||
      species.name;
    const nameEn =
      species.names.find((n) => n.language.name === "en")?.name || species.name;

    const stats = Object.fromEntries(
      pokemon.stats.map((s) => [s.stat.name, s.base_stat]),
    );
    const types = [...pokemon.types].sort((a, b) => a.slot - b.slot);
    const type1 = TYPE_NAME_TO_ID[types[0]?.type.name] ?? 1;
    const type2 =
      types[1] != null ? (TYPE_NAME_TO_ID[types[1].type.name] ?? 0) : 0;

    const slots = { 1: null, 2: null, 3: null };
    for (const a of pokemon.abilities) {
      const id = Number(a.ability.url.match(/\/ability\/(\d+)\//)[1]);
      if (!abilityMap.has(id)) {
        const ad = await fetchJson(a.ability.url);
        const aJa =
          ad.names.find((n) => n.language.name === "ja-Hrkt")?.name ||
          ad.names.find((n) => n.language.name === "ja")?.name ||
          ad.name;
        const aEn =
          ad.names.find((n) => n.language.name === "en")?.name || ad.name;
        abilityMap.set(id, {
          id: abilityUuid(id),
          pokeapi_id: id,
          name_ja: aJa,
          name_en: aEn,
        });
      }
      if (a.is_hidden) slots[3] = abilityUuid(id);
      else if (a.slot === 1) slots[1] = abilityUuid(id);
      else if (a.slot === 2) slots[2] = abilityUuid(id);
    }

    const evolves = await evolvesFurtherInJohto(pokemon.species.url, dex);
    let category = "normal";
    if (MYTHICAL.has(dex)) category = "mythical";
    else if (RESTRICTED.has(dex)) category = "restricted_legendary";

    rows.push({
      dex_no: dex,
      region_type: 0,
      name_ja: nameJa,
      name_en: nameEn,
      category,
      introduced_generation: 2,
      available_generations: GEN2_9,
      type1,
      type2,
      base_hp: stats.hp,
      base_attack: stats.attack,
      base_defense: stats.defense,
      base_special: null,
      base_sp_attack: stats["special-attack"],
      base_sp_defense: stats["special-defense"],
      base_speed: stats.speed,
      ability1_id: slots[1],
      ability2_id: slots[2],
      hidden_ability_id: slots[3],
      gender: genderFromRate(species.gender_rate),
      is_mega: false,
      is_final_evolution: !evolves,
      sprite_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex}.png`,
    });
  }
  console.log(`\npokemon ${rows.length}`);

  const abilities = [...abilityMap.values()].sort(
    (a, b) => a.pokeapi_id - b.pokeapi_id,
  );

  fs.writeFileSync(
    path.join(root, "src/data/gen2-pokemon.json"),
    `${JSON.stringify(rows, null, 2)}\n`,
  );

  const abilitySql = [
    "-- Abilities used by Gen2 (Johto) species (skip existing ids)",
    "insert into moshimo.abilities (id, name_ja, name_en) values",
    `${abilities
      .map(
        (a) =>
          `(${sqlStr(a.id)}, ${sqlStr(a.name_ja)}, ${sqlStr(a.name_en)})`,
      )
      .join(",\n")}`,
    "on conflict (id) do nothing;",
    "",
  ].join("\n");

  const cols =
    "dex_no, region_type, name_ja, name_en, category, introduced_generation, available_generations, type1, type2, base_hp, base_attack, base_defense, base_special, base_sp_attack, base_sp_defense, base_speed, ability1_id, ability2_id, hidden_ability_id, gender, is_mega, is_final_evolution, sprite_url";

  const pokemonSql = [
    "-- Gen2 Johto species (dex 152–251). Additive; does not truncate Gen1.",
    "-- Delete prior Johto rows if re-seeding:",
    "-- delete from moshimo.pokemon where introduced_generation = 2 and dex_no between 152 and 251;",
    `insert into moshimo.pokemon (${cols}) values`,
    `${rows
      .map((p) => {
        const vals = [
          p.dex_no,
          p.region_type,
          p.name_ja,
          p.name_en,
          p.category,
          p.introduced_generation,
          p.available_generations,
          p.type1,
          p.type2,
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
          p.sprite_url,
        ].map(sqlStr);
        return `(${vals.join(", ")})`;
      })
      .join(",\n")};`,
    "",
  ].join("\n");

  const seedDir = path.join(root, "supabase/seed");
  fs.writeFileSync(path.join(seedDir, "gen2_pokemon.sql"), `${pokemonSql}\n`);
  fs.writeFileSync(
    path.join(seedDir, "gen2_all.sql"),
    `${abilitySql}\n${pokemonSql}\n`,
  );
  console.log(
    `wrote src/data/gen2-pokemon.json, supabase/seed/gen2_pokemon.sql, gen2_all.sql (${abilities.length} abilities)`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
