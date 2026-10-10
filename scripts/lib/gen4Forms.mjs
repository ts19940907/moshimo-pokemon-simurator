/**
 * Gen4-era alternate forms stored as separate pokemon rows, and the staging
 * targets (dex_no + optional name_en) used by the Gen4 ability / learnset seeds.
 */
import { fetchJson, pickName } from "./pokeapiFetch.mjs";

export const GEN3_9 = 508;
export const GEN4_9 = 504;
export const SINNOH_FIRST = 387;
export const SINNOH_LAST = 493;

const ARCEUS_TYPES = [
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
];

/**
 * `pokemon` = PokeAPI pokemon id (own stats / learnset);
 * `form` = PokeAPI pokemon-form (Arceus types share pokemon 493).
 */
export const FORM_ROWS = [
  { dex: 386, pokemon: 10001, form: "deoxys-attack", mask: GEN3_9, introduced: 3 },
  { dex: 386, pokemon: 10002, form: "deoxys-defense", mask: GEN3_9, introduced: 3 },
  { dex: 386, pokemon: 10003, form: "deoxys-speed", mask: GEN3_9, introduced: 3 },
  { dex: 413, pokemon: 10004, form: "wormadam-sandy" },
  { dex: 413, pokemon: 10005, form: "wormadam-trash" },
  { dex: 479, pokemon: 10008, form: "rotom-heat" },
  { dex: 479, pokemon: 10009, form: "rotom-wash" },
  { dex: 479, pokemon: 10010, form: "rotom-frost" },
  { dex: 479, pokemon: 10011, form: "rotom-fan" },
  { dex: 479, pokemon: 10012, form: "rotom-mow" },
  { dex: 487, pokemon: 10007, form: "giratina-origin" },
  { dex: 492, pokemon: 10006, form: "shaymin-sky" },
  ...ARCEUS_TYPES.map((type) => ({ dex: 493, pokemon: 493, form: `arceus-${type}` })),
];

/** Default forms of Gen4 species that get a form suffix in their name. */
export const DEFAULT_FORM_NAMES = {
  413: "wormadam-plant",
  487: "giratina-altered",
  492: "shaymin-land",
};

/** name_en of the existing Gen3 Deoxys row. */
const DEOXYS_DEFAULT_NAME_EN = "Deoxys";

export function speciesNames(species) {
  return {
    ja: pickName(species.names) ?? species.name,
    en: pickName(species.names, ["en"]) ?? species.name,
  };
}

/** e.g. 「ヒートロトム」 as-is; 「ギラティナ（オリジンフォルム）」 otherwise. */
export function formDisplayNames(speciesName, form) {
  const formJa = pickName(form.form_names) ?? form.name;
  const formEn = pickName(form.form_names, ["en"]) ?? form.name;
  const ja = formJa.includes(speciesName.ja)
    ? formJa
    : `${speciesName.ja}（${formJa}）`;
  const en = formEn.includes(speciesName.en)
    ? formEn
    : `${speciesName.en} (${formEn})`;
  return { ja, en };
}

/**
 * Every Gen4-usable pokemon to stage links for.
 * `nameEn` is null when every row of that dex shares the data (incl. Arceus types).
 * @returns {Promise<{ dex: number, pokemon: number, nameEn: string | null }[]>}
 */
export async function gen4StagingTargets() {
  const targets = [];
  const formDex = new Set(
    FORM_ROWS.filter((f) => f.pokemon !== f.dex).map((f) => f.dex),
  );
  for (let dex = 1; dex <= SINNOH_LAST; dex += 1) {
    let nameEn = null;
    if (formDex.has(dex)) {
      if (dex === 386) {
        nameEn = DEOXYS_DEFAULT_NAME_EN;
      } else {
        const species = await fetchJson(`https://pokeapi.co/api/v2/pokemon-species/${dex}`);
        const names = speciesNames(species);
        const defaultForm = DEFAULT_FORM_NAMES[dex];
        nameEn = defaultForm
          ? formDisplayNames(
              names,
              await fetchJson(`https://pokeapi.co/api/v2/pokemon-form/${defaultForm}`),
            ).en
          : names.en;
      }
    }
    targets.push({ dex, pokemon: dex, nameEn });
  }
  for (const spec of FORM_ROWS) {
    if (spec.pokemon === spec.dex) continue;
    const species = await fetchJson(`https://pokeapi.co/api/v2/pokemon-species/${spec.dex}`);
    const form = await fetchJson(`https://pokeapi.co/api/v2/pokemon-form/${spec.form}`);
    targets.push({
      dex: spec.dex,
      pokemon: spec.pokemon,
      nameEn: formDisplayNames(speciesNames(species), form).en,
    });
  }
  return targets;
}
