import {
  formatGenerationList,
  parseGenerationList,
  type GenerationFilterOptions,
} from "./generationFilter";
import type { Generation } from "./types";

export type MatchGenerationParams = {
  rulesGeneration?: string | string[];
  syncGenerationsWithRules?: string | string[];
  pokemonGenerations?: string | string[];
  moveGenerations?: string | string[];
  /** @deprecated singular form kept for older routes */
  pokemonGeneration?: string | string[];
  /** @deprecated singular form kept for older routes */
  moveGeneration?: string | string[];
};

function firstString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function parseRulesGeneration(
  params: MatchGenerationParams,
): Generation {
  const n = Number(firstString(params.rulesGeneration));
  return n >= 1 && n <= 9 ? (n as Generation) : 1;
}

export function parseSyncWithRules(params: MatchGenerationParams): boolean {
  const raw = firstString(params.syncGenerationsWithRules);
  if (raw == null) return true;
  return raw === "1" || raw === "true";
}

export function parsePokemonGenerations(
  params: MatchGenerationParams,
): Generation[] {
  const list = firstString(params.pokemonGenerations);
  if (list) return parseGenerationList(list);
  return parseGenerationList(firstString(params.pokemonGeneration));
}

export function parseMoveGenerations(
  params: MatchGenerationParams,
): Generation[] {
  const list = firstString(params.moveGenerations);
  if (list) return parseGenerationList(list);
  return parseGenerationList(firstString(params.moveGeneration));
}

export function pokemonGenerationFilterFromParams(
  params: MatchGenerationParams,
): GenerationFilterOptions {
  return {
    syncWithRules: parseSyncWithRules(params),
    rulesGeneration: parseRulesGeneration(params),
    introducedGenerations: parsePokemonGenerations(params),
  };
}

export function moveGenerationFilterFromParams(
  params: MatchGenerationParams,
): GenerationFilterOptions {
  return {
    syncWithRules: parseSyncWithRules(params),
    rulesGeneration: parseRulesGeneration(params),
    introducedGenerations: parseMoveGenerations(params),
  };
}

export function matchGenerationRouteParams(input: {
  rulesGeneration: Generation;
  syncGenerationsWithRules: boolean;
  pokemonGenerations: Generation[];
  moveGenerations: Generation[];
}): Record<string, string> {
  return {
    rulesGeneration: String(input.rulesGeneration),
    syncGenerationsWithRules: input.syncGenerationsWithRules ? "1" : "0",
    pokemonGenerations: formatGenerationList(input.pokemonGenerations),
    moveGenerations: formatGenerationList(input.moveGenerations),
  };
}
