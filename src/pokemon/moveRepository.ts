import { supabase } from "../lib/supabase";
import type { Move } from "./moves";
import {
  filterByGenerationAvailability,
  type GenerationFilterOptions,
} from "../match-setup/generationFilter";

export async function fetchMovesForPokemon(
  pokemonId: string,
  generationOptions: GenerationFilterOptions,
): Promise<Move[]> {
  const { data: links, error: linkError } = await supabase
    .from("pokemon_moves")
    .select("move_id")
    .eq("pokemon_id", pokemonId);

  if (linkError) {
    throw new Error(`技一覧の取得に失敗しました: ${linkError.message}`);
  }

  const moveIds = (links ?? []).map((row) => row.move_id as string);
  if (moveIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("moves")
    .select(
      [
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
        "introduced_generation",
        "available_generations",
      ].join(","),
    )
    .in("id", moveIds)
    .order("name_ja", { ascending: true });

  if (error) {
    throw new Error(`技マスタの取得に失敗しました: ${error.message}`);
  }

  return filterByGenerationAvailability(
    (data as unknown as Move[]) ?? [],
    generationOptions,
    (move) => String(move.pokeapi_id),
  );
}
