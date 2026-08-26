/**
 * Generate Gen2 move master (debut Gen2+) + GSC learnset junctions.
 * Additive: does not truncate Gen1 moves.
 *
 * - New moves: introduced_generation=2
 * - Junction: gold-silver / crystal learnsets for dex 1–251
 *   linked to existing move rows (Gen1 or Gen2) by pokeapi_id
 *
 * Usage: node scripts/generate-gen2-moves-seed.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GEN2_VERSION_GROUPS = new Set(["gold-silver", "crystal"]);

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

const GEN2_PHYSICAL_TYPES = new Set([1, 7, 10, 8, 9, 13, 12, 14, 17]);

/** Competitive mask Gen2–9 (no Gen1 bit). */
const GEN2_9 = 510;

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

function damageClassOf(m, typeId) {
  const api = m.damage_class?.name;
  if (api === "status") return "status";
  if (api === "physical" || api === "special") {
    // Gen2 still uses type-based phys/spec for most attacks
    if (api === "status") return "status";
  }
  if (m.power == null && m.damage_class?.name === "status") return "status";
  if (m.power == null && (m.meta?.category?.name ?? "").includes("damage") === false) {
    const cat = m.meta?.category?.name ?? "";
    if (cat && !cat.includes("damage") && cat !== "unique") {
      // keep fallthrough
    }
  }
  if (m.power == null && m.damage_class?.name === "status") return "status";
  if (GEN2_PHYSICAL_TYPES.has(typeId)) return "physical";
  return "special";
}

function pickJapaneseDescription(m) {
  const preferred = [
    "gold-silver",
    "crystal",
    "heartgold-soulsilver",
    "firered-leafgreen",
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

async function main() {
  const gen1Moves = JSON.parse(
    fs.readFileSync(path.join(root, "src/data/gen1-moves.json"), "utf8"),
  );
  const gen1Ids = new Set(gen1Moves.map((m) => m.pokeapi_id));

  console.log("collect GSC learnsets dex 1–251…");
  const learnsets = new Map();
  const neededMoveIds = new Set();

  for (let dex = 1; dex <= 251; dex += 1) {
    process.stdout.write(`\rpokemon ${dex}/251`);
    const p = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${dex}`);
    const ids = new Set();
    for (const entry of p.moves) {
      const ok = entry.version_group_details.some((d) =>
        GEN2_VERSION_GROUPS.has(d.version_group.name),
      );
      if (!ok) continue;
      const moveId = Number(entry.move.url.match(/\/move\/(\d+)\//)[1]);
      ids.add(moveId);
      neededMoveIds.add(moveId);
    }
    learnsets.set(dex, ids);
  }
  console.log(`\nunique moves in GSC learnsets: ${neededMoveIds.size}`);

  const newMoveIds = [...neededMoveIds]
    .filter((id) => !gen1Ids.has(id))
    .sort((a, b) => a - b);
  console.log(`new Gen2+ moves to insert: ${newMoveIds.length}`);

  const moves = [];
  for (let i = 0; i < newMoveIds.length; i += 1) {
    const pokeapiId = newMoveIds[i];
    process.stdout.write(`\rmove ${i + 1}/${newMoveIds.length} (#${pokeapiId})`);
    const m = await fetchJson(`https://pokeapi.co/api/v2/move/${pokeapiId}`);
    const typeId = TYPE_NAME_TO_ID[m.type.name] ?? 1;
    const nameJa =
      m.names.find((n) => n.language.name === "ja-Hrkt")?.name ||
      m.names.find((n) => n.language.name === "ja")?.name ||
      m.name;
    const nameEn =
      m.names.find((n) => n.language.name === "en")?.name || m.name;

    const metaApi = m.meta;
    const meta = emptyMeta();
    if (metaApi) {
      meta.ailment = metaApi.ailment?.name === "none" ? null : metaApi.ailment?.name ?? null;
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
        : GEN2_PHYSICAL_TYPES.has(typeId)
          ? "physical"
          : "special";

    const description =
      pickJapaneseDescription(m) ||
      (m.power != null ? `威力${m.power}の攻撃。` : "技効果。");

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
      introduced_generation: Math.max(2, m.generation?.url
        ? Number(m.generation.url.match(/\/generation\/(\d+)\//)?.[1] ?? 2)
        : 2),
      available_generations: GEN2_9,
    });
  }
  console.log(`\nbuilt ${moves.length} move rows`);

  // Ensure introduced_generation stays 2 for this seed file's purpose
  for (const row of moves) {
    if (row.introduced_generation < 2) row.introduced_generation = 2;
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
    "-- Gen2-debut moves (additive UPSERT).",
    "-- Safe for existing DB. Does not touch Gen1 move rows.",
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

  // If unique key was renamed, also try pokeapi_id-only conflict via comment
  const junctionLines = [];
  for (const [dex, moveIds] of learnsets) {
    for (const moveId of moveIds) {
      junctionLines.push(
        `select p.id, m.id from moshimo.pokemon p join moshimo.moves m on m.pokeapi_id = ${moveId} where p.dex_no = ${dex} and (p.available_generations & 2) <> 0 and (m.available_generations & 2) <> 0`,
      );
    }
  }

  const junctionSql = [
    "-- GSC learnsets → pokemon_moves (Gen2-usable rows only)",
    "-- Re-run safe: ignores duplicates via ON CONFLICT",
    "insert into moshimo.pokemon_moves (pokemon_id, move_id)",
    `${junctionLines.join("\nunion all\n")}`,
    "on conflict (pokemon_id, move_id) do nothing;",
    "",
  ].join("\n");

  const seedDir = path.join(root, "supabase/seed");
  fs.writeFileSync(path.join(seedDir, "gen2_moves.sql"), `${movesSql}\n`);
  fs.writeFileSync(
    path.join(seedDir, "gen2_pokemon_moves.sql"),
    `${junctionSql}\n`,
  );
  fs.writeFileSync(
    path.join(seedDir, "gen2_moves_all.sql"),
    `${movesSql}\n${junctionSql}\n`,
  );

  fs.writeFileSync(
    path.join(root, "src/data/gen2-moves.json"),
    `${JSON.stringify(moves, null, 2)}\n`,
  );
  const learnsetObj = Object.fromEntries(
    [...learnsets.entries()].map(([dex, set]) => [
      String(dex),
      [...set].sort((a, b) => a - b),
    ]),
  );
  fs.writeFileSync(
    path.join(root, "src/data/gen2-learnsets.json"),
    `${JSON.stringify(learnsetObj, null, 2)}\n`,
  );

  console.log(`junction arms ${junctionLines.length}`);
  console.log(
    "wrote supabase/seed/gen2_moves.sql, gen2_pokemon_moves.sql, gen2_moves_all.sql",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
