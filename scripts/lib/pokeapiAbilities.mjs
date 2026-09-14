/**
 * Resolve a Pokémon's abilities as they existed in a given generation,
 * using PokeAPI `abilities` + `past_abilities`.
 *
 * `past_abilities[].generation` is the last generation that past slot state
 * applied. For target gen G, apply all past entries with generation >= G
 * (newest first) as slot overrides onto the current ability set.
 */

export function generationNumberFromUrl(url) {
  const m = String(url ?? "").match(/\/generation\/(\d+)\//);
  return m ? Number(m[1]) : null;
}

/**
 * @param {object} pokemon PokeAPI pokemon resource
 * @param {number} targetGeneration e.g. 3
 * @returns {{ slot: number, is_hidden: boolean, ability: { name: string, url: string } }[]}
 */
export function abilitiesForGeneration(pokemon, targetGeneration) {
  /** @type {Map<number, { slot: number, is_hidden: boolean, ability: { name: string, url: string } | null }>} */
  const bySlot = new Map();

  for (const row of pokemon.abilities ?? []) {
    bySlot.set(row.slot, {
      slot: row.slot,
      is_hidden: Boolean(row.is_hidden),
      ability: row.ability ?? null,
    });
  }

  const past = [...(pokemon.past_abilities ?? [])]
    .map((entry) => ({
      generation: generationNumberFromUrl(entry.generation?.url),
      abilities: entry.abilities ?? [],
    }))
    .filter((entry) => entry.generation != null)
    .filter((entry) => entry.generation >= targetGeneration)
    .sort((a, b) => b.generation - a.generation);

  for (const entry of past) {
    for (const row of entry.abilities) {
      const slot = Number(row.slot);
      if (!row.ability) {
        bySlot.delete(slot);
        continue;
      }
      bySlot.set(slot, {
        slot,
        is_hidden: Boolean(row.is_hidden),
        ability: row.ability,
      });
    }
  }

  return [...bySlot.values()]
    .filter((row) => row.ability != null)
    .sort((a, b) => a.slot - b.slot);
}
