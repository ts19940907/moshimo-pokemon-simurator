/**
 * PokeAPI fetch with an on-disk cache (OS temp dir) so the Gen4 generators
 * can be re-run without refetching thousands of resources.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CACHE_DIR = path.join(os.tmpdir(), "moshimo-pokeapi-cache");

export async function fetchJson(url) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const key = crypto.createHash("sha1").update(url).digest("hex");
  const file = path.join(CACHE_DIR, `${key}.json`);
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  }
  let lastError = null;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${url} ${res.status}`);
      const json = await res.json();
      fs.writeFileSync(file, JSON.stringify(json));
      return json;
    } catch (error) {
      lastError = error;
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
    }
  }
  throw lastError;
}

export async function mapPool(items, concurrency, mapper) {
  const results = [];
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await mapper(items[current], current);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
  return results;
}

export function idFromUrl(url, kind) {
  const m = String(url ?? "").match(new RegExp(`/${kind}/(\\d+)/`));
  return m ? Number(m[1]) : null;
}

export function generationFromUrl(url) {
  return idFromUrl(url, "generation");
}

export function pickName(names, langPref = ["ja-Hrkt", "ja"]) {
  for (const pref of langPref) {
    const hit = (names ?? []).find((n) => n.language?.name === pref);
    if (hit?.name) return hit.name;
  }
  return null;
}

export function sqlStr(s) {
  if (s === null || s === undefined) return "NULL";
  if (typeof s === "boolean") return s ? "TRUE" : "FALSE";
  if (typeof s === "number") return String(s);
  if (typeof s === "object") {
    return `'${JSON.stringify(s).replace(/'/g, "''")}'::jsonb`;
  }
  return `'${String(s).replace(/'/g, "''")}'`;
}

export const TYPE_NAME_TO_ID = {
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

export function seedUuid(pokeapiId, group = "8000") {
  return `00000000-0000-4000-${group}-${String(pokeapiId).padStart(12, "0")}`;
}
