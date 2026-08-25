/**
 * Detect Gen1 Kanto rows that differ from Gen2 specs and emit additive seed SQL.
 *
 * Pokemon (split only when Gen1 ≠ Gen2):
 * - Types via PokeAPI past_types (e.g. Magnemite/Magneton → Electric/Steel)
 * - is_final_evolution when a Gen2 evolution debuts (Golbat, Onix, Scyther)
 *
 * Moves: Gen1 seed JSON vs Gen2 fields reconstructed from past_values.
 * (Typically none — Gen1 overrides already match Gen2 power/type/PP.)
 *
 * Usage: node scripts/generate-gen2-kanto-splits-seed.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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

const GEN_NUM = {
  "generation-i": 1,
  "generation-ii": 2,
  "generation-iii": 3,
  "generation-iv": 4,
  "generation-v": 5,
  "generation-vi": 6,
  "generation-vii": 7,
  "generation-viii": 8,
  "generation-ix": 9,
};

const VERSION_ORDER = [
  "red-blue",
  "yellow",
  "gold-silver",
  "crystal",
  "ruby-sapphire",
  "emerald",
  "firered-leafgreen",
  "diamond-pearl",
  "platinum",
  "heartgold-soulsilver",
  "black-white",
  "black-2-white-2",
  "x-y",
  "omega-ruby-alpha-sapphire",
  "sun-moon",
  "ultra-sun-ultra-moon",
  "lets-go-pikachu-lets-go-eevee",
  "sword-shield",
  "brilliant-diamond-shining-pearl",
  "legends-arceus",
  "scarlet-violet",
];

const GEN1_ONLY = 1;
const GEN2_BIT = 2;
const GEN2_VGS = new Set(["gold-silver", "crystal"]);

/** Dex that gain a Gen2 evolution (no longer final in Gen2+). */
const GEN2_LOSES_FINAL = new Set([42, 95, 123]);

function sqlStr(s) {
  if (s === null || s === undefined) return "NULL";
  if (typeof s === "boolean") return s ? "TRUE" : "FALSE";
  if (typeof s === "number") return String(s);
  if (typeof s === "object") {
    return `'${JSON.stringify(s).replace(/'/g, "''")}'::jsonb`;
  }
  return `'${String(s).replace(/'/g, "''")}'`;
}

function moveUuidGen2Fork(pokeapiId) {
  return `00000000-0000-4000-8002-${String(pokeapiId).padStart(12, "0")}`;
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.json();
}

function parsePokemonSeed(sql) {
  const rows = [];
  for (const line of sql.split("\n")) {
    if (!line.startsWith("(")) continue;
    const m = line.match(
      /^\((\d+), (\d+), '([^']*)', '([^']*)', '([^']*)', (\d+), (\d+), (\d+), (\d+), (\d+), (\d+), (\d+), (NULL|\d+), (NULL|\d+), (NULL|\d+), (\d+), ('[^']*'|NULL), ('[^']*'|NULL), ('[^']*'|NULL), (\d+), (TRUE|FALSE), (TRUE|FALSE), ('[^']*'|NULL)/,
    );
    if (!m) continue;
    rows.push({
      dex_no: Number(m[1]),
      region_type: Number(m[2]),
      name_ja: m[3],
      name_en: m[4],
      category: m[5],
      introduced_generation: Number(m[6]),
      available_generations: Number(m[7]),
      type1: Number(m[8]),
      type2: Number(m[9]),
      base_hp: Number(m[10]),
      base_attack: Number(m[11]),
      base_defense: Number(m[12]),
      base_special: m[13] === "NULL" ? null : Number(m[13]),
      base_sp_attack: m[14] === "NULL" ? null : Number(m[14]),
      base_sp_defense: m[15] === "NULL" ? null : Number(m[15]),
      base_speed: Number(m[16]),
      ability1_id: m[17] === "NULL" ? null : m[17].slice(1, -1),
      ability2_id: m[18] === "NULL" ? null : m[18].slice(1, -1),
      hidden_ability_id: m[19] === "NULL" ? null : m[19].slice(1, -1),
      gender: Number(m[20]),
      is_mega: m[21] === "TRUE",
      is_final_evolution: m[22] === "TRUE",
      sprite_url: m[23] === "NULL" ? null : m[23].slice(1, -1),
      rawLine: line,
    });
  }
  return rows;
}

/** Types as of generation G (past_types = last generation that used the old typing). */
function typesAtGeneration(apiPokemon, generation) {
  let types = apiPokemon.types
    .slice()
    .sort((a, b) => a.slot - b.slot)
    .map((t) => TYPE_NAME_TO_ID[t.type.name]);
  const past = [...(apiPokemon.past_types ?? [])].sort(
    (a, b) => GEN_NUM[b.generation.name] - GEN_NUM[a.generation.name],
  );
  for (const entry of past) {
    if (GEN_NUM[entry.generation.name] >= generation) {
      types = entry.types
        .slice()
        .sort((a, b) => a.slot - b.slot)
        .map((t) => TYPE_NAME_TO_ID[t.type.name]);
    }
  }
  return { type1: types[0], type2: types[1] ?? 0 };
}

/**
 * Reconstruct move fields for a set of version groups.
 * past_values non-null fields are the values used in that VG (vs current).
 */
function reconstructMoveFields(apiMove, targetVgs) {
  const targetMax = Math.max(
    ...[...targetVgs].map((v) => VERSION_ORDER.indexOf(v)),
  );
  const state = {
    power: apiMove.power,
    accuracy: apiMove.accuracy,
    pp: apiMove.pp,
    type: apiMove.type?.name ?? null,
    effect_chance: apiMove.effect_chance,
  };
  const past = [...(apiMove.past_values ?? [])].sort(
    (a, b) =>
      VERSION_ORDER.indexOf(b.version_group.name) -
      VERSION_ORDER.indexOf(a.version_group.name),
  );
  for (const entry of past) {
    const idx = VERSION_ORDER.indexOf(entry.version_group.name);
    if (idx > targetMax) {
      if (entry.power != null) state.power = entry.power;
      if (entry.accuracy != null) state.accuracy = entry.accuracy;
      if (entry.pp != null) state.pp = entry.pp;
      if (entry.type != null) state.type = entry.type.name;
      if (entry.effect_chance != null) state.effect_chance = entry.effect_chance;
    }
  }
  for (const entry of past) {
    if (!targetVgs.has(entry.version_group.name)) continue;
    if (entry.power != null) state.power = entry.power;
    if (entry.accuracy != null) state.accuracy = entry.accuracy;
    if (entry.pp != null) state.pp = entry.pp;
    if (entry.type != null) state.type = entry.type.name;
    if (entry.effect_chance != null) state.effect_chance = entry.effect_chance;
  }
  return state;
}

function damageClassForGen2(typeId, apiClass) {
  if (apiClass === "status") return "status";
  const physical = new Set([1, 7, 10, 8, 9, 13, 12, 14, 17]);
  return physical.has(typeId) ? "physical" : "special";
}

function pickCoveringGen2Row(rows, dex) {
  const candidates = rows.filter(
    (r) => r.dex_no === dex && (r.available_generations & GEN2_BIT) !== 0,
  );
  if (candidates.length === 0) return null;
  // Prefer the earliest-era row that still covers Gen2 (Gen1 bit / smaller mask).
  return candidates.reduce((best, row) => {
    const score = (x) =>
      ((x.available_generations & GEN1_ONLY) !== 0 ? 1000 : 0) +
      (512 - x.available_generations);
    return score(row) > score(best) ? row : best;
  });
}

function formatPokemonValue(p) {
  const cols = [
    p.dex_no,
    p.region_type,
    sqlStr(p.name_ja),
    sqlStr(p.name_en),
    sqlStr(p.category),
    p.introduced_generation,
    p.available_generations,
    p.type1,
    p.type2,
    p.base_hp,
    p.base_attack,
    p.base_defense,
    sqlStr(p.base_special),
    sqlStr(p.base_sp_attack),
    sqlStr(p.base_sp_defense),
    p.base_speed,
    p.ability1_id ? sqlStr(p.ability1_id) : "NULL",
    p.ability2_id ? sqlStr(p.ability2_id) : "NULL",
    p.hidden_ability_id ? sqlStr(p.hidden_ability_id) : "NULL",
    p.gender,
    p.is_mega ? "TRUE" : "FALSE",
    p.is_final_evolution ? "TRUE" : "FALSE",
    sqlStr(p.sprite_url),
  ];
  return `(${cols.join(", ")})`;
}

async function main() {
  const pokemonSqlPath = path.join(root, "supabase/seed/gen1_pokemon.sql");
  const pokemonSql = fs.readFileSync(pokemonSqlPath, "utf8");
  const seedPokemon = parsePokemonSeed(pokemonSql);
  const gen1Moves = JSON.parse(
    fs.readFileSync(path.join(root, "src/data/gen1-moves.json"), "utf8"),
  );
  const gen1PokemonJsonPath = path.join(root, "src/data/gen1-pokemon.json");
  const gen1PokemonJson = JSON.parse(
    fs.readFileSync(gen1PokemonJsonPath, "utf8"),
  );

  console.log("scanning pokemon…");
  const splits = [];

  for (let dex = 1; dex <= 151; dex += 1) {
    process.stdout.write(`\rpokemon ${dex}/151`);
    const seed = pickCoveringGen2Row(seedPokemon, dex);
    if (!seed) continue;
    if ((seed.available_generations & GEN1_ONLY) === 0) continue;

    const api = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${dex}`);
    const gen1Types = typesAtGeneration(api, 1);
    const gen2Types = typesAtGeneration(api, 2);

    const typeDiff =
      gen1Types.type1 !== gen2Types.type1 ||
      gen1Types.type2 !== gen2Types.type2;
    const finalDiff =
      GEN2_LOSES_FINAL.has(dex) && seed.is_final_evolution === true;

    if (!typeDiff && !finalDiff) continue;

    const gen1Mask = GEN1_ONLY;
    const gen2Mask = seed.available_generations & ~GEN1_ONLY;
    if (gen2Mask === 0) continue;

    splits.push({
      seed,
      gen1Mask,
      gen2Mask,
      type1: typeDiff ? gen2Types.type1 : seed.type1,
      type2: typeDiff ? gen2Types.type2 : seed.type2,
      is_final_evolution: finalDiff ? false : seed.is_final_evolution,
      reasons: {
        typeDiff,
        finalDiff,
        gen1Types,
        gen2Types,
      },
    });
  }
  console.log(`\npokemon splits (pending): ${splits.length}`);

  // If seed already patched, rebuild additive SQL from Gen1-only + Gen2+ sibling pairs.
  let additive = [...splits];
  if (additive.length === 0) {
    const byDex = new Map();
    for (const row of seedPokemon) {
      if (row.dex_no > 151) continue;
      const list = byDex.get(row.dex_no) ?? [];
      list.push(row);
      byDex.set(row.dex_no, list);
    }
    for (const [dex, rows] of byDex) {
      const gen1Row = rows.find(
        (r) => r.available_generations === GEN1_ONLY,
      );
      const gen2Row = rows.find(
        (r) =>
          (r.available_generations & GEN2_BIT) !== 0 &&
          (r.available_generations & GEN1_ONLY) === 0,
      );
      if (!gen1Row || !gen2Row) continue;
      const typeDiff =
        gen1Row.type1 !== gen2Row.type1 || gen1Row.type2 !== gen2Row.type2;
      const finalDiff =
        gen1Row.is_final_evolution !== gen2Row.is_final_evolution;
      if (!typeDiff && !finalDiff) continue;
      // Recover fromMask for UPDATE targeting pre-split DBs
      const fromMask = gen2Row.available_generations | GEN1_ONLY;
      additive.push({
        seed: { ...gen1Row, available_generations: fromMask },
        gen1Mask: GEN1_ONLY,
        gen2Mask: gen2Row.available_generations,
        type1: gen2Row.type1,
        type2: gen2Row.type2,
        is_final_evolution: gen2Row.is_final_evolution,
        reasons: { typeDiff, finalDiff, alreadyPatched: true },
        gen2Seed: gen2Row,
      });
    }
    console.log(`pokemon splits (from patched seed): ${additive.length}`);
  }

  console.log("scanning moves…");
  const GEN1_VGS = new Set(["red-blue", "yellow"]);
  const moveSplits = [];
  for (let i = 0; i < gen1Moves.length; i += 1) {
    const gen1 = gen1Moves[i];
    process.stdout.write(
      `\rmove ${i + 1}/${gen1Moves.length} (#${gen1.pokeapi_id})`,
    );
    const api = await fetchJson(
      `https://pokeapi.co/api/v2/move/${gen1.pokeapi_id}`,
    );
    // Only split when PokeAPI era reconstruction itself differs Gen1↔Gen2.
    // (Comparing seed↔API catches missing past_values as false positives, e.g. Soft-Boiled PP.)
    const g1 = reconstructMoveFields(api, GEN1_VGS);
    const g2 = reconstructMoveFields(api, GEN2_VGS);
    const type1 = TYPE_NAME_TO_ID[g1.type] ?? gen1.type_id;
    const type2 = TYPE_NAME_TO_ID[g2.type] ?? gen1.type_id;
    const class1 = damageClassForGen2(type1, api.damage_class?.name);
    const class2 = damageClassForGen2(type2, api.damage_class?.name);

    const eraDiff =
      (g1.power ?? null) !== (g2.power ?? null) ||
      (g1.accuracy ?? null) !== (g2.accuracy ?? null) ||
      (g1.pp ?? null) !== (g2.pp ?? null) ||
      type1 !== type2 ||
      class1 !== class2;

    if (!eraDiff) continue;

    const oldMask = gen1.available_generations ?? 511;
    moveSplits.push({
      gen1,
      gen1Mask: (oldMask & GEN1_ONLY) || GEN1_ONLY,
      gen2Mask: (oldMask & ~GEN1_ONLY) || 510,
      typeId: type2,
      damageClass: class2,
      power: g2.power,
      accuracy: g2.accuracy ?? gen1.accuracy,
      pp: g2.pp,
    });
  }
  console.log(`\nmove splits: ${moveSplits.length}`);

  // --- SQL ---
  const lines = [];
  lines.push("-- Gen1→Gen2 Kanto splits (only where Gen1 values ≠ Gen2 values).");
  lines.push("-- Generated by scripts/generate-gen2-kanto-splits-seed.mjs");
  lines.push("-- Apply after gen1_pokemon / gen1_moves when DB still has shared Gen1+ masks.");
  lines.push("-- Fresh reseeds from gen1_pokemon.sql already include these rows.");
  lines.push("");

  for (const s of additive) {
    lines.push(
      `update moshimo.pokemon set available_generations = ${s.gen1Mask}, updated_at = now() where dex_no = ${s.seed.dex_no} and name_en = ${sqlStr(s.seed.name_en)} and available_generations = ${s.seed.available_generations};`,
    );
  }
  lines.push("");

  if (additive.length > 0) {
    lines.push(
      "insert into moshimo.pokemon (dex_no, region_type, name_ja, name_en, category, introduced_generation, available_generations, type1, type2, base_hp, base_attack, base_defense, base_special, base_sp_attack, base_sp_defense, base_speed, ability1_id, ability2_id, hidden_ability_id, gender, is_mega, is_final_evolution, sprite_url) values",
    );
    const vals = additive.map((s) => {
      const base = s.gen2Seed ?? s.seed;
      return formatPokemonValue({
        ...base,
        available_generations: s.gen2Mask,
        type1: s.type1,
        type2: s.type2,
        base_special: null,
        is_final_evolution: s.is_final_evolution,
      });
    });
    lines.push(
      vals.join(",\n") +
        "\non conflict (dex_no, region_type, is_mega, name_en, available_generations) do update set\n" +
        "  type1 = excluded.type1,\n" +
        "  type2 = excluded.type2,\n" +
        "  base_special = excluded.base_special,\n" +
        "  is_final_evolution = excluded.is_final_evolution,\n" +
        "  updated_at = now();",
    );
    lines.push("");

    const dexList = additive.map((s) => s.seed.dex_no).join(", ");
    lines.push(
      "-- Copy existing junctions onto Gen2+ rows (learned while shared Gen1+ mask).",
    );
    lines.push(`insert into moshimo.pokemon_moves (pokemon_id, move_id)
select p_new.id, pm.move_id
from moshimo.pokemon p_old
join moshimo.pokemon_moves pm on pm.pokemon_id = p_old.id
join moshimo.pokemon p_new
  on p_new.dex_no = p_old.dex_no
 and p_new.name_en = p_old.name_en
 and p_new.region_type = p_old.region_type
 and p_new.is_mega = p_old.is_mega
 and (p_new.available_generations & ${GEN2_BIT}) <> 0
where p_old.dex_no in (${dexList})
  and p_old.available_generations = ${GEN1_ONLY}
on conflict (pokemon_id, move_id) do nothing;`);
    lines.push("");
  }

  if (moveSplits.length === 0) {
    lines.push(
      "-- Moves: no Gen1≠Gen2 power/accuracy/PP/type splits detected.",
    );
    lines.push("");
  } else {
    for (const s of moveSplits) {
      lines.push(
        `update moshimo.moves set available_generations = ${s.gen1Mask}, updated_at = now() where pokeapi_id = ${s.gen1.pokeapi_id} and available_generations = ${s.gen1.available_generations ?? 511};`,
      );
    }
    lines.push("");
    lines.push(
      "insert into moshimo.moves (id, pokeapi_id, name_ja, name_en, type_id, damage_class, power, accuracy, pp, priority, description, effect_category, effect_meta, effect_code, introduced_generation, available_generations) values",
    );
    const vals = moveSplits.map((s) => {
      const cols = [
        sqlStr(moveUuidGen2Fork(s.gen1.pokeapi_id)),
        s.gen1.pokeapi_id,
        sqlStr(s.gen1.name_ja),
        sqlStr(s.gen1.name_en),
        s.typeId,
        sqlStr(s.damageClass),
        sqlStr(s.power),
        sqlStr(s.accuracy),
        sqlStr(s.pp),
        s.gen1.priority ?? 0,
        sqlStr(s.gen1.description),
        sqlStr(s.gen1.effect_category),
        sqlStr(s.gen1.effect_meta ?? {}),
        sqlStr(s.gen1.effect_code),
        1,
        s.gen2Mask,
      ];
      return `(${cols.join(", ")})`;
    });
    lines.push(
      vals.join(",\n") +
        "\non conflict (pokeapi_id, available_generations) do update set\n" +
        "  type_id = excluded.type_id,\n" +
        "  damage_class = excluded.damage_class,\n" +
        "  power = excluded.power,\n" +
        "  accuracy = excluded.accuracy,\n" +
        "  pp = excluded.pp,\n" +
        "  updated_at = now();",
    );
    lines.push("");
  }

  const outPath = path.join(root, "supabase/seed/gen2_kanto_splits.sql");
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log(`wrote ${outPath}`);

  // --- Patch gen1_pokemon.sql (source of truth, same pattern as Gen6 splits) ---
  let patchedSql = pokemonSql;
  for (const s of splits) {
    const oldLine = s.seed.rawLine;
    const endsWithSemicolon = /;\s*$/.test(oldLine);
    const gen1Row = {
      ...s.seed,
      available_generations: s.gen1Mask,
    };
    const gen2Row = {
      ...s.seed,
      available_generations: s.gen2Mask,
      type1: s.type1,
      type2: s.type2,
      base_special: null,
      is_final_evolution: s.is_final_evolution,
    };
    const replacement = endsWithSemicolon
      ? `${formatPokemonValue(gen1Row)},\n${formatPokemonValue(gen2Row)};`
      : `${formatPokemonValue(gen1Row)},\n${formatPokemonValue(gen2Row)},`;
    if (!patchedSql.includes(oldLine)) {
      console.warn(`warn: could not find seed line for dex ${s.seed.dex_no}`);
      continue;
    }
    patchedSql = patchedSql.replace(oldLine, replacement);
  }
  if (patchedSql !== pokemonSql) {
    // Fix trailing commas before semicolon on last values line if needed
    fs.writeFileSync(pokemonSqlPath, patchedSql, "utf8");
    console.log("patched supabase/seed/gen1_pokemon.sql");
  }

  // --- Patch gen1-pokemon.json ---
  let jsonChanged = false;
  const nextJson = [];
  const splitByDex = new Map(splits.map((s) => [s.seed.dex_no, s]));
  for (const row of gen1PokemonJson) {
    const split = splitByDex.get(row.dex_no);
    if (
      !split ||
      row.available_generations !== split.seed.available_generations
    ) {
      nextJson.push(row);
      continue;
    }
    jsonChanged = true;
    nextJson.push({
      ...row,
      available_generations: split.gen1Mask,
    });
    nextJson.push({
      ...row,
      available_generations: split.gen2Mask,
      type1: split.type1,
      type2: split.type2,
      base_special: null,
      is_final_evolution: split.is_final_evolution,
    });
  }
  if (jsonChanged) {
    fs.writeFileSync(
      gen1PokemonJsonPath,
      JSON.stringify(nextJson, null, 2) + "\n",
      "utf8",
    );
    console.log("patched src/data/gen1-pokemon.json");
  }

  const report = {
    pokemonSplits: additive.map((s) => ({
      dex_no: s.seed.dex_no,
      name_ja: s.seed.name_ja,
      fromMask: s.seed.available_generations,
      gen1Mask: s.gen1Mask,
      gen2Mask: s.gen2Mask,
      type1: s.type1,
      type2: s.type2,
      is_final_evolution: s.is_final_evolution,
      reasons: s.reasons,
    })),
    moveSplits: moveSplits.map((s) => ({
      pokeapi_id: s.gen1.pokeapi_id,
      name_ja: s.gen1.name_ja,
      gen1Mask: s.gen1Mask,
      gen2Mask: s.gen2Mask,
      to: {
        power: s.power,
        accuracy: s.accuracy,
        pp: s.pp,
        type_id: s.typeId,
        damage_class: s.damageClass,
      },
    })),
  };
  fs.writeFileSync(
    path.join(root, "src/data/gen2-kanto-splits-report.json"),
    JSON.stringify(report, null, 2) + "\n",
    "utf8",
  );
  console.log("wrote src/data/gen2-kanto-splits-report.json");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
