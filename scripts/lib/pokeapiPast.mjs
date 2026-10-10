/**
 * Resolve PokeAPI "current" values back to a target generation using the
 * `past_*` arrays.
 *
 * - pokemon.past_types / past_stats: `generation` is the LAST generation the
 *   past value applied. For target G, use the entry with the smallest
 *   generation >= G.
 * - move.past_values: `version_group` is the FIRST version group where the
 *   change took effect, i.e. the entry holds values used before it. For
 *   target G, apply entries whose version group generation > G, newest first,
 *   so the earliest change after G wins.
 */
import { generationFromUrl, TYPE_NAME_TO_ID } from "./pokeapiFetch.mjs";

const VERSION_GROUP_GENERATION = {
  "red-blue": 1,
  yellow: 1,
  "gold-silver": 2,
  crystal: 2,
  "ruby-sapphire": 3,
  emerald: 3,
  "firered-leafgreen": 3,
  colosseum: 3,
  xd: 3,
  "diamond-pearl": 4,
  platinum: 4,
  "heartgold-soulsilver": 4,
  "black-white": 5,
  "black-2-white-2": 5,
  "x-y": 6,
  "omega-ruby-alpha-sapphire": 6,
  "sun-moon": 7,
  "ultra-sun-ultra-moon": 7,
  "lets-go-pikachu-lets-go-eevee": 7,
  "sword-shield": 8,
  "the-isle-of-armor": 8,
  "the-crown-tundra": 8,
  "brilliant-diamond-and-shining-pearl": 8,
  "legends-arceus": 8,
  "scarlet-violet": 9,
  "the-teal-mask": 9,
  "the-indigo-disk": 9,
};

export function versionGroupGeneration(name) {
  return VERSION_GROUP_GENERATION[name] ?? 99;
}

function pastEntryFor(entries, targetGeneration) {
  return [...(entries ?? [])]
    .map((entry) => ({ ...entry, gen: generationFromUrl(entry.generation?.url) }))
    .filter((entry) => entry.gen != null && entry.gen >= targetGeneration)
    .sort((a, b) => a.gen - b.gen)[0];
}

/** [type1, type2] ids as of the target generation (Fairy stripped pre-Gen6). */
export function typesForGeneration(typeRows, pastTypes, targetGeneration) {
  const past = pastEntryFor(pastTypes, targetGeneration);
  const rows = [...(past?.types ?? typeRows ?? [])].sort((a, b) => a.slot - b.slot);
  let type1 = TYPE_NAME_TO_ID[rows[0]?.type.name] ?? 1;
  let type2 = rows[1] != null ? (TYPE_NAME_TO_ID[rows[1].type.name] ?? 0) : 0;
  if (targetGeneration < 6) {
    if (type2 === 18) type2 = 0;
    if (type1 === 18) {
      type1 = type2 || 1;
      type2 = 0;
    }
  }
  return [type1, type2];
}

/** { hp, attack, defense, "special-attack", "special-defense", speed } as of the target generation. */
export function statsForGeneration(pokemon, targetGeneration) {
  const stats = Object.fromEntries(
    pokemon.stats.map((s) => [s.stat.name, s.base_stat]),
  );
  // Several entries can apply (e.g. Gen1 special + Gen5 attack); apply all
  // entries at/after the target, newest first so the earliest wins.
  const entries = [...(pokemon.past_stats ?? [])]
    .map((entry) => ({ ...entry, gen: generationFromUrl(entry.generation?.url) }))
    .filter((entry) => entry.gen != null && entry.gen >= targetGeneration)
    .sort((a, b) => b.gen - a.gen);
  for (const entry of entries) {
    for (const s of entry.stats ?? []) {
      if (s.stat?.name && s.stat.name !== "special") stats[s.stat.name] = s.base_stat;
    }
  }
  return stats;
}

/** { power, accuracy, pp, type } of a move as of the target generation. */
export function moveValuesForGeneration(move, targetGeneration) {
  const values = {
    power: move.power,
    accuracy: move.accuracy,
    pp: move.pp,
    type: move.type?.name ?? null,
  };
  const entries = [...(move.past_values ?? [])]
    .map((entry) => ({
      ...entry,
      gen: versionGroupGeneration(entry.version_group?.name),
    }))
    .filter((entry) => entry.gen > targetGeneration)
    .sort((a, b) => b.gen - a.gen);
  for (const entry of entries) {
    if (entry.power != null) values.power = entry.power;
    if (entry.accuracy != null) values.accuracy = entry.accuracy;
    if (entry.pp != null) values.pp = entry.pp;
    if (entry.type?.name) values.type = entry.type.name;
  }
  return values;
}
