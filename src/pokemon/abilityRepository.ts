import { supabase } from "../lib/supabase";
import { generationBit } from "../match-setup/generationFilter";

export type Ability = {
  id: string;
  name_ja: string;
  name_en: string;
  pokeapi_id?: number | null;
  description?: string | null;
  slot?: number;
};

export async function fetchAbilitiesByIds(
  ids: readonly (string | null | undefined)[],
): Promise<Ability[]> {
  const unique = [
    ...new Set(
      ids.filter((id): id is string => typeof id === "string" && id.length > 0),
    ),
  ];
  if (unique.length === 0) return [];

  const { data, error } = await supabase
    .from("abilities")
    .select("id, name_ja, name_en, pokeapi_id, description")
    .in("id", unique);

  if (error) {
    throw new Error(`特性データの取得に失敗しました: ${error.message}`);
  }

  const rows = (data as Ability[] | null) ?? [];
  const byId = new Map(rows.map((row) => [row.id, row]));
  return unique
    .map((id) => byId.get(id))
    .filter((row): row is Ability => row != null);
}

type PokemonAbilityJoinRow = {
  slot: number;
  available_generations: number;
  ability:
    | {
        id: string;
        name_ja: string;
        name_en: string;
        pokeapi_id: number | null;
        description: string | null;
        available_generations: number | null;
      }
    | {
        id: string;
        name_ja: string;
        name_en: string;
        pokeapi_id: number | null;
        description: string | null;
        available_generations: number | null;
      }[]
    | null;
};

/**
 * Abilities linked to a pokemon row for the given rules generation.
 * Prefers pokemon_abilities junction; Gen3+ excludes hidden (slot 3).
 */
export async function fetchAbilitiesForPokemon(
  pokemonId: string,
  rulesGeneration: number,
): Promise<Ability[]> {
  const bit = generationBit(rulesGeneration);
  const { data, error } = await supabase
    .from("pokemon_abilities")
    .select(
      "slot, available_generations, ability:abilities(id, name_ja, name_en, pokeapi_id, description, available_generations)",
    )
    .eq("pokemon_id", pokemonId)
    .order("slot", { ascending: true });

  if (error) {
    // Junction may not exist yet on older DBs — caller can fall back.
    throw new Error(`特性の取得に失敗しました: ${error.message}`);
  }

  const rows = (data as PokemonAbilityJoinRow[] | null) ?? [];
  const result: Ability[] = [];
  const seen = new Set<string>();

  for (const row of rows) {
    if ((row.available_generations & bit) === 0) continue;
    // Hidden abilities are Gen5+.
    if (rulesGeneration < 5 && row.slot === 3) continue;
    const ability = Array.isArray(row.ability) ? row.ability[0] : row.ability;
    if (!ability) continue;
    if (
      ability.available_generations != null &&
      (ability.available_generations & bit) === 0
    ) {
      continue;
    }
    if (seen.has(ability.id)) continue;
    seen.add(ability.id);
    result.push({
      id: ability.id,
      name_ja: ability.name_ja,
      name_en: ability.name_en,
      pokeapi_id: ability.pokeapi_id,
      description: ability.description,
      slot: row.slot,
    });
  }

  return result;
}
