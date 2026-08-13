import type { RestrictionMode } from "../match-setup/types";
import {
  generationBit,
  TYPE_BY_ID,
  TYPE_NONE,
  type PokemonSpecies,
} from "./types";

export const PAGE_SIZE = 10;
export const PARTY_SIZE = 6;
export const BATTLE_PARTY_SIZE = 3;

export function isUsableInGeneration(
  pokemon: PokemonSpecies,
  generation: number,
): boolean {
  return (pokemon.generation_introduced & generationBit(generation)) !== 0;
}

export function filterSpeciesByRestriction(
  species: PokemonSpecies[],
  mode: RestrictionMode,
): PokemonSpecies[] {
  return species.filter((pokemon) => {
    if (mode === "anything") {
      return true;
    }
    if (mode === "restricted_allowed") {
      return pokemon.category !== "mythical";
    }
    return pokemon.category === "normal";
  });
}

export function getSelectableSpeciesFromList(
  species: PokemonSpecies[],
  mode: RestrictionMode,
  pokemonGeneration = 1,
): PokemonSpecies[] {
  return filterSpeciesByRestriction(species, mode)
    .filter((pokemon) => isUsableInGeneration(pokemon, pokemonGeneration))
    .filter((pokemon) => !pokemon.is_mega)
    .sort((a, b) => a.dex_no - b.dex_no || a.region_type - b.region_type);
}

export function formatDexNo(dexNo: number): string {
  return `No.${String(dexNo).padStart(3, "0")}`;
}

export function typeNameJa(typeId: number): string {
  return TYPE_BY_ID[typeId]?.nameJa ?? `タイプ${typeId}`;
}

export function getTypes(pokemon: PokemonSpecies): string[] {
  const names = [typeNameJa(pokemon.type1)];
  if (pokemon.type2 !== TYPE_NONE) {
    names.push(typeNameJa(pokemon.type2));
  }
  return names;
}

export function getDisplayBaseStats(pokemon: PokemonSpecies): {
  hp: number;
  attack: number;
  defense: number;
  special: number;
  speed: number;
} {
  return {
    hp: pokemon.base_hp,
    attack: pokemon.base_attack,
    defense: pokemon.base_defense,
    special: pokemon.base_special ?? pokemon.base_sp_attack ?? 0,
    speed: pokemon.base_speed,
  };
}

export const TYPE_COLORS: Record<string, string> = {
  ノーマル: "#A8A878",
  ほのお: "#F08030",
  みず: "#6890F0",
  でんき: "#F8D030",
  くさ: "#78C850",
  こおり: "#98D8D8",
  かくとう: "#C03028",
  どく: "#A040A0",
  じめん: "#E0C068",
  ひこう: "#A890F0",
  エスパー: "#F85888",
  むし: "#A8B820",
  いわ: "#B8A038",
  ゴースト: "#705898",
  ドラゴン: "#7038F8",
  あく: "#705848",
  はがね: "#B8B8D0",
  フェアリー: "#EE99AC",
};
