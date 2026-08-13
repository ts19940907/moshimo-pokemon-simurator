/**
 * Regenerate src/data/gen1-pokemon.json SpA/SpD/abilities from PokeAPI
 * and supabase/seed/{abilities,gen1_pokemon,gen1_all}.sql.
 *
 * Keeps Gen1 HP/Atk/Def/Speed/Special from the existing JSON
 * (verified against Gen1 reference tables).
 *
 * Split into two records when Gen6 changes physical stats and/or Fairy typing:
 * - generation_introduced=31  (Gen1-5): Gen1 physical/types + base_special
 * - generation_introduced=480 (Gen6-9): post-change values, base_special=null
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const GEN1_5 = 31;
const GEN6_9 = 480;

/** Gen6 XY physical buffs: field -> post-buff value */
const GEN6_PHYSICAL_BUFFS = {
  15: { base_attack: 90 },
  18: { base_speed: 101 },
  24: { base_attack: 95 },
  25: { base_defense: 40 },
  26: { base_speed: 110 },
  31: { base_attack: 92 },
  34: { base_attack: 102 },
  51: { base_attack: 100 },
  62: { base_attack: 95 },
  76: { base_attack: 120 },
  83: { base_attack: 90 },
  85: { base_speed: 110 },
  101: { base_speed: 150 },
};

/** Gen1-5 types before Fairy was introduced */
const GEN1_TYPES_PRE_FAIRY = {
  35: { type1: 1, type2: 0 },
  36: { type1: 1, type2: 0 },
  39: { type1: 1, type2: 0 },
  40: { type1: 1, type2: 0 },
  122: { type1: 11, type2: 0 },
};

const GEN6_TYPES_FAIRY = {
  35: { type1: 18, type2: 0 },
  36: { type1: 18, type2: 0 },
  39: { type1: 1, type2: 18 },
  40: { type1: 1, type2: 18 },
  122: { type1: 11, type2: 18 },
};

/** Gen1-5 SpA when Gen6 buffed SpA on Fairy changers */
const GEN1_5_SPA = {
  36: 85,
  40: 50,
};

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

async function main() {
  const jsonPath = path.join(root, "src/data/gen1-pokemon.json");
  const raw = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const byDex = new Map();
  for (const row of raw) {
    if (!byDex.has(row.dex_no) || (row.generation_introduced & 1) !== 0) {
      byDex.set(row.dex_no, {
        ...row,
        generation_introduced: 511,
        base_special: row.base_special,
        // Prefer Gen1 physical/types from Gen1-bit rows
        ...(GEN1_TYPES_PRE_FAIRY[row.dex_no] && (row.generation_introduced & 1)
          ? GEN1_TYPES_PRE_FAIRY[row.dex_no]
          : {}),
      });
    } else if (!byDex.has(row.dex_no)) {
      byDex.set(row.dex_no, row);
    }
  }
  // Fill missing from any row
  for (const row of raw) {
    if (!byDex.has(row.dex_no)) byDex.set(row.dex_no, row);
  }

  const baseline = [...byDex.values()].sort((a, b) => a.dex_no - b.dex_no);
  const abilityMap = new Map();
  const extras = new Map();

  for (let dex = 1; dex <= 151; dex++) {
    process.stdout.write(`\rfetch ${dex}/151`);
    const pokemon = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${dex}`);
    const stats = Object.fromEntries(
      pokemon.stats.map((s) => [s.stat.name, s.base_stat]),
    );
    const slots = { 1: null, 2: null, 3: null };

    for (const a of pokemon.abilities) {
      const id = Number(a.ability.url.match(/\/ability\/(\d+)\//)[1]);
      if (!abilityMap.has(id)) {
        const ad = await fetchJson(a.ability.url);
        const nameJa =
          ad.names.find((n) => n.language.name === "ja-Hrkt")?.name ||
          ad.names.find((n) => n.language.name === "ja")?.name ||
          ad.name;
        const nameEn =
          ad.names.find((n) => n.language.name === "en")?.name || ad.name;
        abilityMap.set(id, {
          id: abilityUuid(id),
          pokeapi_id: id,
          name_ja: nameJa,
          name_en: nameEn,
        });
      }
      if (a.is_hidden) slots[3] = abilityUuid(id);
      else if (a.slot === 1) slots[1] = abilityUuid(id);
      else if (a.slot === 2) slots[2] = abilityUuid(id);
    }

    extras.set(dex, {
      base_sp_attack: stats["special-attack"],
      base_sp_defense: stats["special-defense"],
      ability1_id: slots[1],
      ability2_id: slots[2],
      hidden_ability_id: slots[3],
    });
  }
  console.log("\ndone");

  const abilities = [...abilityMap.values()].sort(
    (a, b) => a.pokeapi_id - b.pokeapi_id,
  );

  const our = [];
  for (const row of baseline) {
    const e = extras.get(row.dex_no);
    const filled = {
      ...row,
      base_sp_attack: e.base_sp_attack,
      base_sp_defense: e.base_sp_defense,
      ability1_id: e.ability1_id,
      ability2_id: e.ability2_id,
      hidden_ability_id: e.hidden_ability_id,
    };
    const buff = GEN6_PHYSICAL_BUFFS[row.dex_no];
    const fairy = GEN1_TYPES_PRE_FAIRY[row.dex_no];
    if (!buff && !fairy) {
      our.push({ ...filled, generation_introduced: 511 });
      continue;
    }

    const pre = {
      ...filled,
      generation_introduced: GEN1_5,
      ...(fairy || {}),
      ...(GEN1_5_SPA[row.dex_no] != null
        ? { base_sp_attack: GEN1_5_SPA[row.dex_no] }
        : {}),
    };
    const post = {
      ...filled,
      ...(buff || {}),
      ...(fairy ? GEN6_TYPES_FAIRY[row.dex_no] : {}),
      generation_introduced: GEN6_9,
      base_special: null,
      base_sp_attack: e.base_sp_attack,
    };
    our.push(pre, post);
  }

  fs.writeFileSync(jsonPath, `${JSON.stringify(our, null, 2)}\n`);

  const abilitySql = [
    "-- Ability master (deterministic UUIDs from PokeAPI ability id)",
    "truncate table moshimo.pokemon cascade;",
    "truncate table moshimo.abilities cascade;",
    "",
    "insert into moshimo.abilities (id, name_ja, name_en) values",
    `${abilities
      .map(
        (a) =>
          `(${sqlStr(a.id)}, ${sqlStr(a.name_ja)}, ${sqlStr(a.name_en)})`,
      )
      .join(",\n")};`,
    "",
  ].join("\n");

  const cols =
    "dex_no, region_type, name_ja, name_en, category, generation_introduced, type1, type2, base_hp, base_attack, base_defense, base_special, base_sp_attack, base_sp_defense, base_speed, ability1_id, ability2_id, hidden_ability_id, is_mega, sprite_url";

  const pokemonSql = [
    "-- Gen1 species seed. Split on Gen6 physical buffs and/or Fairy type changes.",
    `insert into moshimo.pokemon (${cols}) values`,
    `${our
      .map((p) => {
        const vals = [
          p.dex_no,
          p.region_type,
          p.name_ja,
          p.name_en,
          p.category,
          p.generation_introduced,
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
          p.is_mega,
          p.sprite_url,
        ].map(sqlStr);
        return `(${vals.join(", ")})`;
      })
      .join(",\n")};`,
    "",
  ].join("\n");

  const seedDir = path.join(root, "supabase/seed");
  fs.writeFileSync(path.join(seedDir, "abilities.sql"), `${abilitySql}\n`);
  fs.writeFileSync(path.join(seedDir, "gen1_pokemon.sql"), `${pokemonSql}\n`);
  fs.writeFileSync(
    path.join(seedDir, "gen1_all.sql"),
    `${abilitySql}\n${pokemonSql}\n`,
  );
  console.log(`abilities ${abilities.length}, pokemon ${our.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
