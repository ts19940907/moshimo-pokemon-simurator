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

function escapeIlikePattern(value: string): string {
  return value.replace(/[%_\\]/g, "\\$&");
}

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

/**
 * Search abilities by Japanese or English name for the rules generation (Gen3+).
 */
export async function searchAbilities(
  query: string,
  rulesGeneration: number,
  limit = 8,
): Promise<Ability[]> {
  if (rulesGeneration < 3) return [];
  const trimmed = query.trim();
  if (!trimmed) return [];

  const bit = generationBit(rulesGeneration);
  const pattern = `%${escapeIlikePattern(trimmed)}%`;
  const { data, error } = await supabase
    .from("abilities")
    .select("id, name_ja, name_en, pokeapi_id, description, available_generations")
    .or(`name_ja.ilike.${pattern},name_en.ilike.${pattern}`)
    .order("name_ja", { ascending: true })
    .limit(50);

  if (error) {
    throw new Error(`特性の検索に失敗しました: ${error.message}`);
  }

  const rows =
    (data as
      | (Ability & { available_generations?: number | null })[]
      | null) ?? [];
  const seen = new Set<string>();
  const result: Ability[] = [];

  for (const row of rows) {
    if (
      row.available_generations != null &&
      (row.available_generations & bit) === 0
    ) {
      continue;
    }
    const key =
      row.pokeapi_id != null ? `p:${row.pokeapi_id}` : `id:${row.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({
      id: row.id,
      name_ja: row.name_ja,
      name_en: row.name_en,
      pokeapi_id: row.pokeapi_id,
      description: row.description,
    });
    if (result.length >= limit) break;
  }

  return result;
}

/**
 * Pokemon row ids that can have the given ability under the rules generation.
 * Uses pokemon_abilities when present, and ability1/2(/hidden) columns as fallback.
 */
export async function fetchPokemonIdsForAbility(
  abilityId: string,
  rulesGeneration: number,
): Promise<Set<string>> {
  if (!abilityId || rulesGeneration < 3) {
    return new Set();
  }

  const bit = generationBit(rulesGeneration);
  const ids = new Set<string>();

  const { data: junction, error: junctionError } = await supabase
    .from("pokemon_abilities")
    .select("pokemon_id, slot, available_generations")
    .eq("ability_id", abilityId);

  if (!junctionError && junction) {
    for (const row of junction) {
      const available = row.available_generations as number;
      if ((available & bit) === 0) continue;
      if (rulesGeneration < 5 && (row.slot as number) === 3) continue;
      ids.add(row.pokemon_id as string);
    }
  }

  let columnQuery = supabase
    .from("pokemon")
    .select("id")
    .or(`ability1_id.eq.${abilityId},ability2_id.eq.${abilityId}`);
  if (rulesGeneration >= 5) {
    columnQuery = supabase
      .from("pokemon")
      .select("id")
      .or(
        `ability1_id.eq.${abilityId},ability2_id.eq.${abilityId},hidden_ability_id.eq.${abilityId}`,
      );
  }

  const { data: columnRows, error: columnError } = await columnQuery;
  if (columnError) {
    throw new Error(
      `特性を持つポケモンの取得に失敗しました: ${columnError.message}`,
    );
  }
  for (const row of columnRows ?? []) {
    ids.add(row.id as string);
  }

  return ids;
}
