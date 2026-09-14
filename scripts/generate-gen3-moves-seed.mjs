/**
 * Generate Gen3 move master (debut Gen3+) + RSE/FRLG learnset junctions.
 * Additive: does not truncate Gen1/Gen2 moves.
 *
 * - New moves: introduced_generation=3, available_generations=508 (Gen3–9)
 * - Junction: ruby-sapphire / emerald / firered-leafgreen for dex 1–386
 *   linked to existing move rows (Gen1–3) by pokeapi_id
 * - Learnsets written as staging chunks for Supabase SQL Editor limits
 *
 * Usage: node scripts/generate-gen3-moves-seed.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GEN3_VERSION_GROUPS = new Set([
  "ruby-sapphire",
  "emerald",
  "firered-leafgreen",
]);

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

/** Gen3 still uses type-based phys/spec (split is Gen4). */
const GEN3_PHYSICAL_TYPES = new Set([1, 7, 10, 8, 9, 13, 12, 14, 17]);

/** Competitive mask Gen3–9 (no Gen1/2 bits). */
const GEN3_9 = 508;

/** ~1200 value rows per chunk (matches Gen2 SQL Editor split). */
const VALUES_CHUNK_SIZE = 1200;

function moveUuid(pokeapiId) {
  return `00000000-0000-4000-8000-${String(pokeapiId).padStart(12, "0")}`;
}

function sqlStr(s) {
  if (s === null || s === undefined) return "NULL";
  if (typeof s === "boolean") return s ? "TRUE" : "FALSE";
  if (typeof s === "number") return String(s);
  if (typeof s === "object") {
    return `'${JSON.stringify(s).replace(/'/g, "''")}'::jsonb`;
  }
  return `'${String(s).replace(/'/g, "''")}'`;
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.json();
}

function emptyMeta() {
  return {
    ailment: null,
    ailment_chance: 0,
    drain: 0,
    healing: 0,
    flinch_chance: 0,
    crit_rate: 0,
    min_hits: null,
    max_hits: null,
    min_turns: null,
    max_turns: null,
    stat_chance: 0,
    stat_changes: [],
  };
}

function pickJapaneseDescription(m) {
  const preferred = [
    "ruby-sapphire",
    "emerald",
    "firered-leafgreen",
    "heartgold-soulsilver",
    "black-white",
  ];
  for (const vg of preferred) {
    const hit = m.flavor_text_entries.find(
      (f) => f.language.name === "ja-Hrkt" && f.version_group?.name === vg,
    );
    if (hit?.flavor_text) {
      return String(hit.flavor_text).replace(/\s+/g, " ").trim();
    }
  }
  const anyJa = m.flavor_text_entries.find((f) => f.language.name === "ja-Hrkt");
  if (anyJa?.flavor_text) {
    return String(anyJa.flavor_text).replace(/\s+/g, " ").trim();
  }
  return null;
}

/** PokeAPI modern typing may mark Fairy; Gen3 has no Fairy. */
function typeIdForGen3(typeName) {
  const id = TYPE_NAME_TO_ID[typeName] ?? 1;
  return id === 18 ? 1 : id;
}

function loadKnownMoveIds() {
  const known = new Set();
  for (const file of ["gen1-moves.json", "gen2-moves.json"]) {
    const rows = JSON.parse(
      fs.readFileSync(path.join(root, "src/data", file), "utf8"),
    );
    for (const row of rows) known.add(row.pokeapi_id);
  }
  return known;
}

function writeLearnsetChunks(seedDir, pairs) {
  const setupSql = [
    "-- 1/N setup: staging for Gen3 (RSE/FRLG) learnsets",
    "create table if not exists moshimo._seed_gen3_learnset (",
    "  dex_no integer not null,",
    "  pokeapi_move_id integer not null",
    ");",
    "truncate table moshimo._seed_gen3_learnset;",
    "",
  ].join("\n");
  fs.writeFileSync(
    path.join(seedDir, "gen3_pokemon_moves_00_setup.sql"),
    setupSql,
  );

  const chunkCount = Math.max(1, Math.ceil(pairs.length / VALUES_CHUNK_SIZE));
  for (let c = 0; c < chunkCount; c += 1) {
    const slice = pairs.slice(
      c * VALUES_CHUNK_SIZE,
      (c + 1) * VALUES_CHUNK_SIZE,
    );
    const n = String(c + 1).padStart(2, "0");
    const body = [
      `-- learnset values ${c + 1}/${chunkCount}`,
      "insert into moshimo._seed_gen3_learnset (dex_no, pokeapi_move_id) values",
      `${slice.map(([dex, moveId]) => `(${dex}, ${moveId})`).join(",\n")};`,
      "",
    ].join("\n");
    fs.writeFileSync(
      path.join(seedDir, `gen3_pokemon_moves_${n}_values.sql`),
      body,
    );
  }

  const finalizeSql = [
    "-- finalize: link Gen3-usable pokemon ↔ moves, then drop staging",
    "insert into moshimo.pokemon_moves (pokemon_id, move_id)",
    "select distinct p.id, m.id",
    "from moshimo._seed_gen3_learnset l",
    "join moshimo.pokemon p",
    "  on p.dex_no = l.dex_no",
    " and (p.available_generations & 4) <> 0",
    "join moshimo.moves m",
    "  on m.pokeapi_id = l.pokeapi_move_id",
    " and (m.available_generations & 4) <> 0",
    "on conflict (pokemon_id, move_id) do nothing;",
    "",
    "drop table if exists moshimo._seed_gen3_learnset;",
    "",
  ].join("\n");
  fs.writeFileSync(
    path.join(seedDir, "gen3_pokemon_moves_99_finalize.sql"),
    finalizeSql,
  );

  return chunkCount;
}

async function main() {
  const knownIds = loadKnownMoveIds();
  console.log(`known Gen1+Gen2 move ids: ${knownIds.size}`);

  console.log("collect RSE/FRLG learnsets dex 1–386…");
  const learnsets = new Map();
  const neededMoveIds = new Set();

  for (let dex = 1; dex <= 386; dex += 1) {
    process.stdout.write(`\rpokemon ${dex}/386`);
    const p = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${dex}`);
    const ids = new Set();
    for (const entry of p.moves) {
      const ok = entry.version_group_details.some((d) =>
        GEN3_VERSION_GROUPS.has(d.version_group.name),
      );
      if (!ok) continue;
      const moveId = Number(entry.move.url.match(/\/move\/(\d+)\//)[1]);
      ids.add(moveId);
      neededMoveIds.add(moveId);
    }
    learnsets.set(dex, ids);
  }
  console.log(`\nunique moves in Gen3 learnsets: ${neededMoveIds.size}`);

  const newMoveIds = [...neededMoveIds]
    .filter((id) => !knownIds.has(id))
    .sort((a, b) => a - b);
  console.log(`new Gen3+ moves to insert: ${newMoveIds.length}`);

  const moves = [];
  for (let i = 0; i < newMoveIds.length; i += 1) {
    const pokeapiId = newMoveIds[i];
    process.stdout.write(`\rmove ${i + 1}/${newMoveIds.length} (#${pokeapiId})`);
    const m = await fetchJson(`https://pokeapi.co/api/v2/move/${pokeapiId}`);
    const typeId = typeIdForGen3(m.type.name);
    const nameJa =
      m.names.find((n) => n.language.name === "ja-Hrkt")?.name ||
      m.names.find((n) => n.language.name === "ja")?.name ||
      m.name;
    const nameEn =
      m.names.find((n) => n.language.name === "en")?.name || m.name;

    const metaApi = m.meta;
    const meta = emptyMeta();
    if (metaApi) {
      meta.ailment =
        metaApi.ailment?.name === "none" ? null : (metaApi.ailment?.name ?? null);
      meta.ailment_chance = metaApi.ailment_chance ?? 0;
      meta.drain = metaApi.drain ?? 0;
      meta.healing = metaApi.healing ?? 0;
      meta.flinch_chance = metaApi.flinch_chance ?? 0;
      meta.crit_rate = metaApi.crit_rate ?? 0;
      meta.min_hits = metaApi.min_hits;
      meta.max_hits = metaApi.max_hits;
      meta.min_turns = metaApi.min_turns;
      meta.max_turns = metaApi.max_turns;
      meta.stat_chance = metaApi.stat_chance ?? 0;
      meta.stat_changes = (m.stat_changes ?? []).map((s) => ({
        stat: s.stat.name,
        change: s.change,
      }));
    }

    const category = metaApi?.category?.name ?? "damage";
    const damageClass =
      m.damage_class?.name === "status"
        ? "status"
        : GEN3_PHYSICAL_TYPES.has(typeId)
          ? "physical"
          : "special";

    const description =
      pickJapaneseDescription(m) ||
      (m.power != null ? `威力${m.power}の攻撃。` : "技効果。");

    const apiGen = m.generation?.url
      ? Number(m.generation.url.match(/\/generation\/(\d+)\//)?.[1] ?? 3)
      : 3;

    moves.push({
      id: moveUuid(pokeapiId),
      pokeapi_id: pokeapiId,
      name_ja: nameJa,
      name_en: nameEn,
      type_id: typeId,
      damage_class: damageClass,
      power: m.power,
      accuracy: m.accuracy,
      pp: m.pp,
      priority: m.priority ?? 0,
      description,
      effect_category: category,
      effect_meta: meta,
      effect_code: null,
      introduced_generation: Math.max(3, apiGen),
      available_generations: GEN3_9,
    });
  }
  console.log(`\nbuilt ${moves.length} move rows`);

  for (const row of moves) {
    if (row.introduced_generation < 3) row.introduced_generation = 3;
  }

  const columns = [
    "id",
    "pokeapi_id",
    "name_ja",
    "name_en",
    "type_id",
    "damage_class",
    "power",
    "accuracy",
    "pp",
    "priority",
    "description",
    "effect_category",
    "effect_meta",
    "effect_code",
    "introduced_generation",
    "available_generations",
  ];

  const movesSql = [
    "-- Gen3-debut moves (additive UPSERT).",
    "-- Safe for existing DB. Does not touch Gen1/Gen2 move rows.",
    `insert into moshimo.moves (${columns.join(", ")}) values`,
    `${moves
      .map(
        (row) =>
          `(${columns
            .map((col) => {
              if (col === "effect_meta") return sqlStr(row.effect_meta);
              return sqlStr(row[col]);
            })
            .join(", ")})`,
      )
      .join(",\n")}`,
    "on conflict (pokeapi_id, available_generations) do update set",
    "  id = excluded.id,",
    "  name_ja = excluded.name_ja,",
    "  name_en = excluded.name_en,",
    "  type_id = excluded.type_id,",
    "  damage_class = excluded.damage_class,",
    "  power = excluded.power,",
    "  accuracy = excluded.accuracy,",
    "  pp = excluded.pp,",
    "  priority = excluded.priority,",
    "  description = excluded.description,",
    "  effect_category = excluded.effect_category,",
    "  effect_meta = excluded.effect_meta,",
    "  effect_code = excluded.effect_code,",
    "  introduced_generation = excluded.introduced_generation,",
    "  updated_at = now();",
    "",
  ].join("\n");

  const pairs = [];
  for (const [dex, moveIds] of [...learnsets.entries()].sort(
    (a, b) => a[0] - b[0],
  )) {
    for (const moveId of [...moveIds].sort((a, b) => a - b)) {
      pairs.push([dex, moveId]);
    }
  }

  const seedDir = path.join(root, "supabase/seed");
  fs.writeFileSync(path.join(seedDir, "gen3_moves.sql"), `${movesSql}\n`);

  const chunkCount = writeLearnsetChunks(seedDir, pairs);

  const allParts = [movesSql, ""];
  allParts.push(fs.readFileSync(path.join(seedDir, "gen3_pokemon_moves_00_setup.sql"), "utf8"));
  for (let c = 1; c <= chunkCount; c += 1) {
    const n = String(c).padStart(2, "0");
    allParts.push(
      fs.readFileSync(
        path.join(seedDir, `gen3_pokemon_moves_${n}_values.sql`),
        "utf8",
      ),
    );
  }
  allParts.push(
    fs.readFileSync(
      path.join(seedDir, "gen3_pokemon_moves_99_finalize.sql"),
      "utf8",
    ),
  );
  fs.writeFileSync(
    path.join(seedDir, "gen3_moves_all.sql"),
    `${allParts.join("\n")}\n`,
  );

  fs.writeFileSync(
    path.join(root, "src/data/gen3-moves.json"),
    `${JSON.stringify(moves, null, 2)}\n`,
  );
  const learnsetObj = Object.fromEntries(
    [...learnsets.entries()].map(([dex, set]) => [
      String(dex),
      [...set].sort((a, b) => a - b),
    ]),
  );
  fs.writeFileSync(
    path.join(root, "src/data/gen3-learnsets.json"),
    `${JSON.stringify(learnsetObj, null, 2)}\n`,
  );

  console.log(`learnset pairs ${pairs.length} → ${chunkCount} value chunks`);
  console.log(
    "wrote gen3_moves.sql, gen3_pokemon_moves_* , gen3_moves_all.sql, src/data/gen3-moves.json, gen3-learnsets.json",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
