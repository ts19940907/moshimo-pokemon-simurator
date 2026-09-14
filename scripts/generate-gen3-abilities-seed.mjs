/**
 * Generate Gen3 ability master + pokemon↔ability junction seeds from PokeAPI.
 *
 * - Abilities: all introduced in generation-iii (skips unused Cacophony)
 * - Links: dex 1–386, non-hidden abilities as of Gen3 (via past_abilities),
 *   available_generations = Gen3–9 (508)
 *
 * Usage: node scripts/generate-gen3-abilities-seed.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { abilitiesForGeneration } from "./lib/pokeapiAbilities.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Gen3–9 bits (abilities did not exist in Gen1–2). */
const GEN3_9 = 508;

const HOENN_DEX_MAX = 386;
const SKIP_ABILITY_NAMES = new Set(["cacophony"]);
/** Resolve links as of Gen3 ADV (not modern ability redistributions). */
const ABILITY_RULES_GENERATION = 3;

function abilityUuid(pokeapiId) {
  return `00000000-0000-4000-8000-${String(pokeapiId).padStart(12, "0")}`;
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

function isJaLanguage(name) {
  const n = String(name ?? "").toLowerCase();
  return n === "ja" || n === "ja-hrkt";
}

function pickName(names, langPref = ["ja-Hrkt", "ja"]) {
  for (const pref of langPref) {
    const hit = names.find((n) => n.language?.name === pref);
    if (hit?.name) return hit.name;
  }
  const anyJa = names.find((n) => isJaLanguage(n.language?.name));
  return anyJa?.name ?? null;
}

function pickJapaneseDescription(ability) {
  const entries = ability.flavor_text_entries ?? [];
  const preferred = [
    "ruby-sapphire",
    "emerald",
    "firered-leafgreen",
    "diamond-pearl",
    "platinum",
    "heartgold-soulsilver",
    "black-white",
    "x-y",
    "omega-ruby-alpha-sapphire",
    "sun-moon",
    "ultra-sun-ultra-moon",
    "sword-shield",
  ];
  for (const vg of preferred) {
    const hit = entries.find(
      (f) => isJaLanguage(f.language?.name) && f.version_group?.name === vg,
    );
    const text = hit?.flavor_text ?? hit?.text;
    if (text) return String(text).replace(/\s+/g, " ").trim();
  }
  const anyJa = entries.find((f) => isJaLanguage(f.language?.name));
  const text = anyJa?.flavor_text ?? anyJa?.text;
  if (text) return String(text).replace(/\s+/g, " ").trim();
  return null;
}

function introducedGeneration(ability) {
  const m = ability.generation?.url?.match(/\/generation\/(\d+)\//);
  return m ? Number(m[1]) : 3;
}

async function mapPool(items, concurrency, mapper) {
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

async function main() {
  const generation = await fetchJson("https://pokeapi.co/api/v2/generation/3/");
  const abilityRefs = (generation.abilities ?? []).filter(
    (a) => !SKIP_ABILITY_NAMES.has(a.name),
  );

  console.log(`Fetching ${abilityRefs.length} Gen3 abilities…`);
  const abilities = (
    await mapPool(abilityRefs, 8, async (ref) => {
      const id = Number(ref.url.match(/\/ability\/(\d+)\//)[1]);
      const detail = await fetchJson(ref.url);
      const nameJa = pickName(detail.names ?? []) ?? detail.name;
      const nameEn =
        pickName(detail.names ?? [], ["en"]) ??
        detail.name
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
      return {
        pokeapi_id: id,
        name_ja: nameJa,
        name_en: nameEn,
        introduced_generation: introducedGeneration(detail),
        available_generations: GEN3_9,
        description: pickJapaneseDescription(detail),
      };
    })
  ).sort((a, b) => a.pokeapi_id - b.pokeapi_id);

  const abilityIdSet = new Set(abilities.map((a) => a.pokeapi_id));

  console.log(`Fetching pokemon ability links for dex 1–${HOENN_DEX_MAX}…`);
  const dexNos = Array.from({ length: HOENN_DEX_MAX }, (_, i) => i + 1);
  const linkRows = [];

  await mapPool(dexNos, 6, async (dexNo) => {
    const pokemon = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${dexNo}/`);
    const entries = abilitiesForGeneration(pokemon, ABILITY_RULES_GENERATION)
      .filter((row) => !row.is_hidden)
      .map((row) => {
        const abilityId = Number(row.ability.url.match(/\/ability\/(\d+)\//)[1]);
        return {
          dex_no: dexNo,
          pokeapi_ability_id: abilityId,
          slot: Number(row.slot),
        };
      })
      .filter((row) => abilityIdSet.has(row.pokeapi_ability_id))
      .filter((row) => row.slot === 1 || row.slot === 2);

    for (const row of entries) linkRows.push(row);
  });

  linkRows.sort(
    (a, b) =>
      a.dex_no - b.dex_no || a.slot - b.slot || a.pokeapi_ability_id - b.pokeapi_ability_id,
  );

  fs.writeFileSync(
    path.join(root, "src/data/gen3-abilities.json"),
    `${JSON.stringify(abilities, null, 2)}\n`,
  );
  fs.writeFileSync(
    path.join(root, "src/data/gen3-pokemon-abilities.json"),
    `${JSON.stringify(linkRows, null, 2)}\n`,
  );

  const abilityValues = abilities
    .map(
      (a) =>
        `(${sqlStr(abilityUuid(a.pokeapi_id))}, ${a.pokeapi_id}, ${sqlStr(a.name_ja)}, ${sqlStr(a.name_en)}, ${a.introduced_generation}, ${a.available_generations}, ${sqlStr(a.description)})`,
    )
    .join(",\n");

  const abilitiesSql = `-- Gen3 ability master (UPSERT). Regenerated by scripts/generate-gen3-abilities-seed.mjs
insert into moshimo.abilities (
  id,
  pokeapi_id,
  name_ja,
  name_en,
  introduced_generation,
  available_generations,
  description
) values
${abilityValues}
on conflict (id) do update set
  pokeapi_id = excluded.pokeapi_id,
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  introduced_generation = excluded.introduced_generation,
  available_generations = excluded.available_generations,
  description = excluded.description;
`;

  const stagingValues = linkRows
    .map(
      (r) =>
        `(${r.dex_no}, ${r.pokeapi_ability_id}, ${r.slot})`,
    )
    .join(",\n");

  const setupSql = `-- 1/3 setup: staging for Gen3 pokemon↔ability links
create table if not exists moshimo._seed_gen3_pokemon_abilities (
  dex_no integer not null,
  pokeapi_ability_id integer not null,
  slot smallint not null check (slot in (1, 2))
);
truncate table moshimo._seed_gen3_pokemon_abilities;
`;

  const valuesSql = `-- 2/3 values
insert into moshimo._seed_gen3_pokemon_abilities (dex_no, pokeapi_ability_id, slot) values
${stagingValues};
`;

  const finalizeSql = `-- 3/3 finalize: link Gen3-usable pokemon ↔ abilities, sync ability*_id, drop staging
-- Drop prior Gen3-bit links so redistributed abilities (e.g. Pelipper Drizzle) do not linger.
delete from moshimo.pokemon_abilities pa
using moshimo.pokemon p
where pa.pokemon_id = p.id
  and (p.available_generations & 4) <> 0
  and (pa.available_generations & 4) <> 0;

insert into moshimo.pokemon_abilities (
  pokemon_id,
  ability_id,
  slot,
  available_generations
)
select distinct
  p.id,
  a.id,
  s.slot,
  ${GEN3_9}
from moshimo._seed_gen3_pokemon_abilities s
join moshimo.pokemon p
  on p.dex_no = s.dex_no
 and (p.available_generations & 4) <> 0
join moshimo.abilities a
  on a.pokeapi_id = s.pokeapi_ability_id
on conflict (pokemon_id, ability_id, slot) do update set
  available_generations = excluded.available_generations;

-- Keep legacy columns in sync for Gen3+ rows (slot 1 / 2 only).
update moshimo.pokemon p
set ability1_id = x.ability_id
from (
  select distinct on (pa.pokemon_id)
    pa.pokemon_id,
    pa.ability_id
  from moshimo.pokemon_abilities pa
  where pa.slot = 1
    and (pa.available_generations & 4) <> 0
  order by pa.pokemon_id, pa.ability_id
) x
where p.id = x.pokemon_id
  and (p.available_generations & 4) <> 0;

update moshimo.pokemon p
set ability2_id = x.ability_id
from (
  select distinct on (pa.pokemon_id)
    pa.pokemon_id,
    pa.ability_id
  from moshimo.pokemon_abilities pa
  where pa.slot = 2
    and (pa.available_generations & 4) <> 0
  order by pa.pokemon_id, pa.ability_id
) x
where p.id = x.pokemon_id
  and (p.available_generations & 4) <> 0;

update moshimo.pokemon p
set ability2_id = null
where (p.available_generations & 4) <> 0
  and not exists (
    select 1
    from moshimo.pokemon_abilities pa
    where pa.pokemon_id = p.id
      and pa.slot = 2
      and (pa.available_generations & 4) <> 0
  );

drop table if exists moshimo._seed_gen3_pokemon_abilities;
`;

  const allSql = `-- Gen3 abilities + pokemon_abilities (run after migration 20260913000100)
-- Regenerated by: node scripts/generate-gen3-abilities-seed.mjs

${abilitiesSql}

${setupSql}
${valuesSql}
${finalizeSql}
`;

  fs.writeFileSync(
    path.join(root, "supabase/seed/gen3_abilities.sql"),
    abilitiesSql,
  );
  fs.writeFileSync(
    path.join(root, "supabase/seed/gen3_pokemon_abilities_00_setup.sql"),
    setupSql,
  );
  fs.writeFileSync(
    path.join(root, "supabase/seed/gen3_pokemon_abilities_01_values.sql"),
    valuesSql,
  );
  fs.writeFileSync(
    path.join(root, "supabase/seed/gen3_pokemon_abilities_99_finalize.sql"),
    finalizeSql,
  );
  fs.writeFileSync(
    path.join(root, "supabase/seed/gen3_abilities_all.sql"),
    allSql,
  );

  console.log(
    `Wrote ${abilities.length} abilities, ${linkRows.length} links → supabase/seed/gen3_*.sql`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
