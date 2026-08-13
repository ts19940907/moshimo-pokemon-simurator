import type { RestrictionMode } from "../match-setup/types";
import { supabase } from "../lib/supabase";
import type { PokemonSpecies } from "./types";
import {
  filterByGenerationAvailability,
  type GenerationFilterOptions,
} from "../match-setup/generationFilter";

export async function fetchPokemonSpecies(): Promise<PokemonSpecies[]> {
  const { data, error } = await supabase
    .from("pokemon")
    .select(
      [
        "id",
        "dex_no",
        "region_type",
        "name_ja",
        "name_en",
        "category",
        "introduced_generation",
        "available_generations",
        "type1",
        "type2",
        "base_hp",
        "base_attack",
        "base_defense",
        "base_special",
        "base_sp_attack",
        "base_sp_defense",
        "base_speed",
        "ability1_id",
        "ability2_id",
        "hidden_ability_id",
        "gender",
        "is_mega",
        "is_final_evolution",
        "sprite_url",
      ].join(","),
    )
    .order("dex_no", { ascending: true })
    .order("region_type", { ascending: true });

  if (error) {
    throw new Error(`ポケモンデータの取得に失敗しました: ${error.message}`);
  }

  return (data as unknown as PokemonSpecies[]) ?? [];
}

function pokemonIdentityKey(pokemon: PokemonSpecies): string {
  return `${pokemon.dex_no}:${pokemon.region_type}:${pokemon.is_mega}:${pokemon.name_en}`;
}

export function filterSelectableSpecies(
  species: PokemonSpecies[],
  mode: RestrictionMode,
  generationOptions: GenerationFilterOptions,
): PokemonSpecies[] {
  return filterByGenerationAvailability(
    species,
    generationOptions,
    pokemonIdentityKey,
  )
    .filter((pokemon) => !pokemon.is_mega)
    .filter((pokemon) => {
      if (mode === "anything") return true;
      if (mode === "restricted_allowed") return pokemon.category !== "mythical";
      return pokemon.category === "normal";
    })
    .sort((a, b) => a.dex_no - b.dex_no || a.region_type - b.region_type);
}
