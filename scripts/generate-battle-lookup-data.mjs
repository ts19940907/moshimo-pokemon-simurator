/**
 * Static battle lookup tables that the DB rows do not carry:
 * - src/data/pokemon-weights.json: weight (kg) for Grass Knot / Low Kick (dex 1–493 + forms)
 * - src/data/item-battle-data.json: Fling power and Natural Gift type / power (PokeAPI keeps Gen4 powers)
 *
 * Usage: node scripts/generate-battle-lookup-data.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gen4StagingTargets } from "./lib/gen4Forms.mjs";
import { TYPE_NAME_TO_ID, fetchJson, mapPool } from "./lib/pokeapiFetch.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function buildWeights() {
  const byDex = {};
  const byNameEn = {};
  const targets = await gen4StagingTargets();
  await mapPool(targets, 8, async ({ dex, pokemon, nameEn }) => {
    const p = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const kg = p.weight / 10;
    if (pokemon === dex) byDex[dex] = kg;
    if (nameEn) byNameEn[nameEn] = kg;
  });
  return { byDex, byNameEn };
}

function toolIds() {
  const files = ["gen2-tools.json", "gen4-tools.json"];
  return files.flatMap((file) =>
    JSON.parse(fs.readFileSync(path.join(root, "src/data", file), "utf8")).map(
      (t) => t.pokeapi_id,
    ),
  );
}

async function buildItems() {
  const items = {};
  await mapPool([...new Set(toolIds())], 8, async (id) => {
    const item = await fetchJson(`https://pokeapi.co/api/v2/item/${id}`);
    const entry = { fling: item.fling_power ?? null };
    const berryName = item.name.endsWith("-berry")
      ? item.name.replace(/-berry$/, "")
      : null;
    if (berryName) {
      const berry = await fetchJson(`https://pokeapi.co/api/v2/berry/${berryName}`);
      entry.naturalGiftType = TYPE_NAME_TO_ID[berry.natural_gift_type?.name] ?? null;
      entry.naturalGiftPower = berry.natural_gift_power ?? null;
    }
    items[id] = entry;
  });
  return Object.fromEntries(
    Object.entries(items).sort(([a], [b]) => Number(a) - Number(b)),
  );
}

async function main() {
  const weights = await buildWeights();
  fs.writeFileSync(
    path.join(root, "src/data/pokemon-weights.json"),
    `${JSON.stringify(weights, null, 2)}\n`,
  );
  const items = await buildItems();
  fs.writeFileSync(
    path.join(root, "src/data/item-battle-data.json"),
    `${JSON.stringify(items, null, 2)}\n`,
  );
  console.log(
    `wrote pokemon-weights.json (${Object.keys(weights.byDex).length} dex, ${Object.keys(weights.byNameEn).length} names), item-battle-data.json (${Object.keys(items).length} items)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
