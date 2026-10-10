/**
 * Generate Gen4 move master (debut Gen4) + DPPt/HGSS learnset junctions, and
 * split Gen1–3 move rows whose Gen4 values differ:
 *
 * - New moves: introduced_generation=4, available_generations=504 (Gen4–9),
 *   per-move physical/special, values as of Gen4 (past_values).
 * - Physical/special split: Gen1–3 rows use type-based classes. Rows that also
 *   cover Gen4+ and whose Gen4 class / power / accuracy / PP differ are split
 *   into a Gen1–3 row and a Gen4+ copy with the Gen4 values.
 * - Learnsets: diamond-pearl / platinum / heartgold-soulsilver for dex 1–493
 *   and alternate forms (Deoxys forms also get RSE/FRLG, as they are new rows).
 *
 * Run after gen4_pokemon.sql.
 * Usage: node scripts/generate-gen4-moves-seed.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GEN4_9, gen4StagingTargets } from "./lib/gen4Forms.mjs";
import {
  fetchJson,
  generationFromUrl,
  idFromUrl,
  mapPool,
  pickName,
  seedUuid,
  sqlStr,
  TYPE_NAME_TO_ID,
} from "./lib/pokeapiFetch.mjs";
import {
  moveValuesForGeneration,
  versionGroupGeneration,
} from "./lib/pokeapiPast.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RULES_GENERATION = 4;
const GEN4_VERSION_GROUPS = new Set([
  "diamond-pearl",
  "platinum",
  "heartgold-soulsilver",
]);
const GEN3_VERSION_GROUPS = new Set([
  "ruby-sapphire",
  "emerald",
  "firered-leafgreen",
]);
/** Last Gen3 move id; every id up to here already has DB rows. */
const LAST_GEN3_MOVE = 354;
const VALUES_CHUNK_SIZE = 1200;
/** Power is computed in battle (Hidden Power, Low Kick, …); keep the DB value. */
const VARIABLE_POWER_MOVES = new Set([67, 237]);
/** Gen9 cut these to 5 PP; PokeAPI has no past_values entry for that change. */
const GEN4_PP_OVERRIDES = {
  105: 10, // Recover
  135: 10, // Soft-Boiled
  156: 10, // Rest
  208: 10, // Milk Drink
  303: 10, // Slack Off
  355: 10, // Roost
};

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

function metaFromApi(m) {
  const meta = emptyMeta();
  const api = m.meta;
  if (!api) return meta;
  meta.ailment = api.ailment?.name === "none" ? null : (api.ailment?.name ?? null);
  meta.ailment_chance = api.ailment_chance ?? 0;
  meta.drain = api.drain ?? 0;
  meta.healing = api.healing ?? 0;
  meta.flinch_chance = api.flinch_chance ?? 0;
  meta.crit_rate = api.crit_rate ?? 0;
  meta.min_hits = api.min_hits;
  meta.max_hits = api.max_hits;
  meta.min_turns = api.min_turns;
  meta.max_turns = api.max_turns;
  meta.stat_chance = api.stat_chance ?? 0;
  meta.stat_changes = (m.stat_changes ?? []).map((s) => ({
    stat: s.stat.name,
    change: s.change,
  }));
  return meta;
}

function pickJapaneseDescription(m) {
  const preferred = ["platinum", "diamond-pearl", "heartgold-soulsilver", "black-white"];
  for (const vg of preferred) {
    const hit = m.flavor_text_entries.find(
      (f) => f.language.name === "ja-Hrkt" && f.version_group?.name === vg,
    );
    if (hit?.flavor_text) return String(hit.flavor_text).replace(/\s+/g, " ").trim();
  }
  const anyJa = m.flavor_text_entries.find((f) => f.language.name === "ja-Hrkt");
  return anyJa?.flavor_text ? String(anyJa.flavor_text).replace(/\s+/g, " ").trim() : null;
}

function typeIdPreFairy(typeName) {
  const id = TYPE_NAME_TO_ID[typeName] ?? 1;
  return id === 18 ? 1 : id;
}

function loadKnownMoveIds() {
  const known = new Set();
  for (const file of ["gen1-moves.json", "gen2-moves.json", "gen3-moves.json"]) {
    const rows = JSON.parse(fs.readFileSync(path.join(root, "src/data", file), "utf8"));
    for (const row of rows) known.add(row.pokeapi_id);
  }
  return known;
}

function learnsetKey(target) {
  return target.nameEn ? `${target.dex}:${target.nameEn}` : String(target.dex);
}

function writeLearnsetChunks(seedDir, rows) {
  const setupSql = [
    "-- 1/N setup: staging for Gen4 (DPPt/HGSS) learnsets",
    "create table if not exists moshimo._seed_gen4_learnset (",
    "  dex_no integer not null,",
    "  name_en text null,",
    "  pokeapi_move_id integer not null",
    ");",
    "truncate table moshimo._seed_gen4_learnset;",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(seedDir, "gen4_pokemon_moves_00_setup.sql"), setupSql);

  const chunkCount = Math.max(1, Math.ceil(rows.length / VALUES_CHUNK_SIZE));
  for (let c = 0; c < chunkCount; c += 1) {
    const slice = rows.slice(c * VALUES_CHUNK_SIZE, (c + 1) * VALUES_CHUNK_SIZE);
    const n = String(c + 1).padStart(2, "0");
    fs.writeFileSync(
      path.join(seedDir, `gen4_pokemon_moves_${n}_values.sql`),
      [
        `-- learnset values ${c + 1}/${chunkCount}`,
        "insert into moshimo._seed_gen4_learnset (dex_no, name_en, pokeapi_move_id) values",
        `${slice.map((r) => `(${r.dex}, ${sqlStr(r.nameEn)}, ${r.moveId})`).join(",\n")};`,
        "",
      ].join("\n"),
    );
  }

  const finalizeSql = [
    "-- finalize: link Gen4-usable pokemon ↔ moves, then drop staging",
    "insert into moshimo.pokemon_moves (pokemon_id, move_id)",
    "select distinct p.id, m.id",
    "from moshimo._seed_gen4_learnset l",
    "join moshimo.pokemon p",
    "  on p.dex_no = l.dex_no",
    " and (l.name_en is null or p.name_en = l.name_en)",
    " and (p.available_generations & 8) <> 0",
    "join moshimo.moves m",
    "  on m.pokeapi_id = l.pokeapi_move_id",
    " and (m.available_generations & 8) <> 0",
    "on conflict (pokemon_id, move_id) do nothing;",
    "",
    "drop table if exists moshimo._seed_gen4_learnset;",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(seedDir, "gen4_pokemon_moves_99_finalize.sql"), finalizeSql);
  return chunkCount;
}

function splitSql(values) {
  const changed = `(
    (m.damage_class <> 'status' and m.damage_class <> v.damage_class)
    or (v.power is not null and m.power is distinct from v.power)
    or (v.accuracy is not null and m.accuracy is distinct from v.accuracy)
    or (v.pp is not null and m.pp is distinct from v.pp)
  )`;
  return `-- Gen4 physical/special split + Gen4 value changes for Gen1–3 moves.
-- Rows covering Gen1–3 and Gen4+ are split; Gen4+-only rows are updated in place.
-- NULL power / accuracy / pp = unchanged in Gen4 (keep the row's value).
create table if not exists moshimo._seed_gen4_move_values (
  pokeapi_id integer primary key,
  damage_class text not null,
  power integer null,
  accuracy integer null,
  pp integer null
);
truncate table moshimo._seed_gen4_move_values;

insert into moshimo._seed_gen4_move_values (pokeapi_id, damage_class, power, accuracy, pp) values
${values
  .map(
    (v) =>
      `(${v.pokeapi_id}, ${sqlStr(v.damage_class)}, ${sqlStr(v.power)}, ${sqlStr(v.accuracy)}, ${sqlStr(v.pp)})`,
  )
  .join(",\n")};

insert into moshimo.moves (
  id, pokeapi_id, name_ja, name_en, type_id, damage_class, power, accuracy, pp,
  priority, description, effect_category, effect_meta, effect_code,
  introduced_generation, available_generations
)
select
  md5('gen4-split:' || m.id::text)::uuid,
  m.pokeapi_id, m.name_ja, m.name_en, m.type_id,
  case when m.damage_class = 'status' then m.damage_class else v.damage_class end,
  coalesce(v.power, m.power), coalesce(v.accuracy, m.accuracy), coalesce(v.pp, m.pp),
  m.priority, m.description, m.effect_category, m.effect_meta, m.effect_code,
  m.introduced_generation, m.available_generations & ~7
from moshimo.moves m
join moshimo._seed_gen4_move_values v on v.pokeapi_id = m.pokeapi_id
where (m.available_generations & 8) <> 0
  and (m.available_generations & 7) <> 0
  and ${changed}
on conflict (pokeapi_id, available_generations) do nothing;

update moshimo.moves m
set available_generations = m.available_generations & 7,
    updated_at = now()
from moshimo._seed_gen4_move_values v
where v.pokeapi_id = m.pokeapi_id
  and (m.available_generations & 8) <> 0
  and (m.available_generations & 7) <> 0
  and ${changed};

update moshimo.moves m
set damage_class = case when m.damage_class = 'status' then m.damage_class else v.damage_class end,
    power = coalesce(v.power, m.power),
    accuracy = coalesce(v.accuracy, m.accuracy),
    pp = coalesce(v.pp, m.pp),
    updated_at = now()
from moshimo._seed_gen4_move_values v
where v.pokeapi_id = m.pokeapi_id
  and (m.available_generations & 8) <> 0
  and (m.available_generations & 7) = 0
  and ${changed};

drop table if exists moshimo._seed_gen4_move_values;
`;
}

async function main() {
  const knownIds = loadKnownMoveIds();
  console.log(`known Gen1–3 move ids: ${knownIds.size}`);

  const targets = await gen4StagingTargets();
  console.log(`collect DPPt/HGSS learnsets for ${targets.length} pokemon…`);
  const learnsets = new Map();
  const neededMoveIds = new Set();
  await mapPool(targets, 6, async (target) => {
    const p = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${target.pokemon}`);
    const includeGen3 = target.pokemon >= 10001 && target.pokemon <= 10003;
    const ids = new Set();
    for (const entry of p.moves) {
      const ok = entry.version_group_details.some(
        (d) =>
          GEN4_VERSION_GROUPS.has(d.version_group.name) ||
          (includeGen3 && GEN3_VERSION_GROUPS.has(d.version_group.name)),
      );
      if (!ok) continue;
      const moveId = idFromUrl(entry.move.url, "move");
      ids.add(moveId);
      neededMoveIds.add(moveId);
    }
    learnsets.set(learnsetKey(target), { target, ids });
  });
  console.log(`unique moves in Gen4 learnsets: ${neededMoveIds.size}`);

  const newMoveIds = [...neededMoveIds].filter((id) => !knownIds.has(id)).sort((a, b) => a - b);
  console.log(`new Gen4 moves to insert: ${newMoveIds.length}`);

  const moves = (
    await mapPool(newMoveIds, 8, async (pokeapiId) => {
      const m = await fetchJson(`https://pokeapi.co/api/v2/move/${pokeapiId}`);
      const values = moveValuesForGeneration(m, RULES_GENERATION);
      const description =
        pickJapaneseDescription(m) ||
        (values.power != null ? `威力${values.power}の攻撃。` : "技効果。");
      return {
        id: seedUuid(pokeapiId),
        pokeapi_id: pokeapiId,
        name_ja: pickName(m.names) ?? m.name,
        name_en: pickName(m.names, ["en"]) ?? m.name,
        type_id: typeIdPreFairy(values.type),
        damage_class: m.damage_class?.name ?? "status",
        power: values.power,
        accuracy: values.accuracy,
        pp: GEN4_PP_OVERRIDES[pokeapiId] ?? values.pp,
        priority: m.priority ?? 0,
        description,
        effect_category: m.meta?.category?.name ?? "damage",
        effect_meta: metaFromApi(m),
        effect_code: null,
        introduced_generation: Math.max(4, generationFromUrl(m.generation?.url) ?? 4),
        available_generations: GEN4_9,
      };
    })
  ).sort((a, b) => a.pokeapi_id - b.pokeapi_id);

  console.log(`fetch Gen4 values for moves 1–${LAST_GEN3_MOVE}…`);
  const oldIds = Array.from({ length: LAST_GEN3_MOVE }, (_, i) => i + 1);
  const splitValues = (
    await mapPool(oldIds, 8, async (pokeapiId) => {
      const m = await fetchJson(`https://pokeapi.co/api/v2/move/${pokeapiId}`);
      // PokeAPI's current values can include later changes it has no past_values
      // for, so only take power / accuracy / PP that changed in Gen4 itself.
      const changedInGen4 = (m.past_values ?? []).filter(
        (entry) => versionGroupGeneration(entry.version_group?.name) === RULES_GENERATION,
      );
      const values = moveValuesForGeneration(m, RULES_GENERATION);
      const changed = (field) => changedInGen4.some((entry) => entry[field] != null);
      return {
        pokeapi_id: pokeapiId,
        damage_class: m.damage_class?.name ?? "status",
        power: changed("power") && !VARIABLE_POWER_MOVES.has(pokeapiId) ? values.power : null,
        accuracy: changed("accuracy") ? values.accuracy : null,
        pp: GEN4_PP_OVERRIDES[pokeapiId] ?? (changed("pp") ? values.pp : null),
      };
    })
  ).sort((a, b) => a.pokeapi_id - b.pokeapi_id);

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
    "-- Gen4-debut moves (additive UPSERT). Per-move physical / special.",
    `insert into moshimo.moves (${columns.join(", ")}) values`,
    moves.map((row) => `(${columns.map((col) => sqlStr(row[col])).join(", ")})`).join(",\n"),
    "on conflict (pokeapi_id, available_generations) do update set",
    columns
      .filter((c) => !["pokeapi_id", "available_generations"].includes(c))
      .map((c) => `  ${c} = excluded.${c}`)
      .join(",\n") + ",",
    "  updated_at = now();",
    "",
  ].join("\n");

  const pairs = [];
  for (const { target, ids } of [...learnsets.values()].sort(
    (a, b) =>
      a.target.dex - b.target.dex ||
      String(a.target.nameEn).localeCompare(String(b.target.nameEn)),
  )) {
    for (const moveId of [...ids].sort((a, b) => a - b)) {
      pairs.push({ dex: target.dex, nameEn: target.nameEn, moveId });
    }
  }

  const seedDir = path.join(root, "supabase/seed");
  fs.writeFileSync(path.join(seedDir, "gen4_moves.sql"), `${movesSql}\n`);
  const split = splitSql(splitValues);
  fs.writeFileSync(path.join(seedDir, "gen4_moves_physical_special_split.sql"), split);
  const chunkCount = writeLearnsetChunks(seedDir, pairs);

  const allParts = [movesSql, split];
  allParts.push(fs.readFileSync(path.join(seedDir, "gen4_pokemon_moves_00_setup.sql"), "utf8"));
  for (let c = 1; c <= chunkCount; c += 1) {
    const n = String(c).padStart(2, "0");
    allParts.push(fs.readFileSync(path.join(seedDir, `gen4_pokemon_moves_${n}_values.sql`), "utf8"));
  }
  allParts.push(fs.readFileSync(path.join(seedDir, "gen4_pokemon_moves_99_finalize.sql"), "utf8"));
  fs.writeFileSync(path.join(seedDir, "gen4_moves_all.sql"), `${allParts.join("\n")}\n`);

  fs.writeFileSync(path.join(root, "src/data/gen4-moves.json"), `${JSON.stringify(moves, null, 2)}\n`);
  fs.writeFileSync(
    path.join(root, "src/data/gen4-move-values.json"),
    `${JSON.stringify(splitValues, null, 2)}\n`,
  );
  fs.writeFileSync(
    path.join(root, "src/data/gen4-learnsets.json"),
    `${JSON.stringify(
      Object.fromEntries(
        [...learnsets.entries()].map(([key, { ids }]) => [key, [...ids].sort((a, b) => a - b)]),
      ),
      null,
      2,
    )}\n`,
  );

  console.log(`learnset pairs ${pairs.length} → ${chunkCount} value chunks`);
  console.log(
    "wrote gen4_moves.sql, gen4_moves_physical_special_split.sql, gen4_pokemon_moves_*, gen4_moves_all.sql, src/data/gen4-*.json",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
