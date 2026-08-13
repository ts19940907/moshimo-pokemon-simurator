/**
 * Build Gen1 move master + pokemon_moves seed SQL from PokeAPI.
 *
 * - introduced_generation=1; available_generations includes competitive gens
 * - damage_class: status from API meta, else Gen1 type-based physical/special
 * - junction: Gen1-usable pokemon rows (bit 0 set) × RB/Yellow learnset (level-up/TM/HM)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GEN1_3_BITS = 7;
const GEN1_VERSION_GROUPS = new Set(["red-blue", "yellow"]);

/** Our type ids match national dex type order used in moshimo.types */
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

const GEN1_PHYSICAL_TYPES = new Set([
  1, 7, 10, 8, 9, 13, 12, 14, 17,
]);

function moveUuid(pokeapiId) {
  return `00000000-0000-4000-8001-${String(pokeapiId).padStart(12, "0")}`;
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

function gen1DamageClass(typeId, apiDamageClass) {
  if (apiDamageClass === "status") return "status";
  return GEN1_PHYSICAL_TYPES.has(typeId) ? "physical" : "special";
}

async function main() {
  console.log("fetch generation 1 moves…");
  const generation = await fetchJson("https://pokeapi.co/api/v2/generation/1/");
  const moveRefs = generation.moves;
  const moves = [];

  for (let i = 0; i < moveRefs.length; i += 1) {
    const ref = moveRefs[i];
    process.stdout.write(`\rmove ${i + 1}/${moveRefs.length} ${ref.name}          `);
    const m = await fetchJson(ref.url);
    const pokeapiId = m.id;
    const typeName = m.type.name;
    const typeId = TYPE_NAME_TO_ID[typeName];
    if (!typeId) throw new Error(`unknown type ${typeName} for move ${m.name}`);

    const nameJa =
      m.names.find((n) => n.language.name === "ja-Hrkt")?.name ||
      m.names.find((n) => n.language.name === "ja")?.name ||
      m.name;
    const nameEn =
      m.names.find((n) => n.language.name === "en")?.name || m.name;

    const effectJa =
      m.effect_entries.find((e) => e.language.name === "ja")?.effect ||
      m.flavor_text_entries.find(
        (f) =>
          f.language.name === "ja-Hrkt" &&
          (f.version_group?.name === "red-blue" ||
            f.version_group?.name === "yellow" ||
            f.version_group?.name === "firered-leafgreen"),
      )?.flavor_text ||
      m.flavor_text_entries.find((f) => f.language.name === "ja-Hrkt")
        ?.flavor_text ||
      m.effect_entries.find((e) => e.language.name === "en")?.short_effect ||
      null;

    const description = effectJa
      ? String(effectJa).replace(/\s+/g, " ").trim()
      : null;

    const apiClass = m.damage_class?.name ?? "status";
    const damageClass = gen1DamageClass(typeId, apiClass);

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
      introduced_generation: 1,
      available_generations: GEN1_3_BITS,
    });
  }
  console.log(`\nmoves ${moves.length}`);

  console.log("fetch pokemon learnsets (RB/Yellow)…");
  /** @type {Map<number, Set<number>>} dex -> pokeapi move ids */
  const learnsets = new Map();
  for (let dex = 1; dex <= 151; dex += 1) {
    process.stdout.write(`\rpokemon ${dex}/151`);
    const p = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${dex}`);
    const ids = new Set();
    for (const entry of p.moves) {
      const ok = entry.version_group_details.some((d) =>
        GEN1_VERSION_GROUPS.has(d.version_group.name),
      );
      if (!ok) continue;
      const moveId = Number(entry.move.url.match(/\/move\/(\d+)\//)[1]);
      ids.add(moveId);
    }
    learnsets.set(dex, ids);
  }
  console.log("\nlearnsets done");

  const moveByPokeapi = new Map(moves.map((m) => [m.pokeapi_id, m]));

  const movesSql = [
    "-- Gen1 move master (introduced_generation=1)",
    "truncate table moshimo.pokemon_moves cascade;",
    "truncate table moshimo.moves cascade;",
    "",
    "insert into moshimo.moves (id, pokeapi_id, name_ja, name_en, type_id, damage_class, power, accuracy, pp, priority, description, introduced_generation, available_generations) values",
    `${moves
      .map(
        (m) =>
          `(${[
            m.id,
            m.pokeapi_id,
            m.name_ja,
            m.name_en,
            m.type_id,
            m.damage_class,
            m.power,
            m.accuracy,
            m.pp,
            m.priority,
            m.description,
            m.introduced_generation,
            m.available_generations,
          ]
            .map(sqlStr)
            .join(", ")})`,
      )
      .join(",\n")};`,
    "",
  ].join("\n");

  // Junction via dex_no + Gen1 bit, so it works with live UUIDs.
  const junctionLines = [];
  for (const [dex, moveIds] of learnsets) {
    for (const moveId of moveIds) {
      if (!moveByPokeapi.has(moveId)) continue;
      junctionLines.push(
        `select p.id, ${sqlStr(moveUuid(moveId))}::uuid from moshimo.pokemon p where p.dex_no = ${dex} and (p.available_generations & 1) <> 0`,
      );
    }
  }

  const junctionSql = [
    "-- Link Gen1-usable pokemon rows to Gen1 moves (RB/Yellow learnsets)",
    "insert into moshimo.pokemon_moves (pokemon_id, move_id)",
    junctionLines.join("\nunion all\n") + ";",
    "",
  ].join("\n");

  const seedDir = path.join(root, "supabase/seed");
  fs.writeFileSync(path.join(seedDir, "gen1_moves.sql"), `${movesSql}\n`);
  fs.writeFileSync(
    path.join(seedDir, "gen1_pokemon_moves.sql"),
    `${junctionSql}\n`,
  );
  fs.writeFileSync(
    path.join(seedDir, "gen1_moves_all.sql"),
    `${movesSql}\n${junctionSql}\n`,
  );

  // JSON snapshot for app/debug
  fs.writeFileSync(
    path.join(root, "src/data/gen1-moves.json"),
    `${JSON.stringify(moves, null, 2)}\n`,
  );
  const learnsetObj = Object.fromEntries(
    [...learnsets.entries()].map(([dex, set]) => [dex, [...set].sort((a, b) => a - b)]),
  );
  fs.writeFileSync(
    path.join(root, "src/data/gen1-learnsets.json"),
    `${JSON.stringify(learnsetObj, null, 2)}\n`,
  );

  console.log(`junction select-arms ${junctionLines.length}`);
  console.log("wrote supabase/seed/gen1_moves.sql, gen1_pokemon_moves.sql, gen1_moves_all.sql");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
