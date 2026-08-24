import { supabase } from "../lib/supabase";
import type { Tool } from "./tools";
import {
  filterByGenerationAvailability,
  type GenerationFilterOptions,
} from "../match-setup/generationFilter";

const TOOL_SELECT_COLUMNS = [
  "id",
  "pokeapi_id",
  "name_ja",
  "name_en",
  "category",
  "description",
  "effect_code",
  "effect_meta",
  "introduced_generation",
  "available_generations",
].join(",");

function normalizeTool(row: Tool): Tool {
  return {
    ...row,
    category: row.category ?? null,
    description: row.description ?? null,
    effect_code: row.effect_code ?? null,
    effect_meta: (row.effect_meta ?? {}) as Record<string, unknown>,
  };
}

/**
 * Load held-item (tool) master rows for the match item-generation filter.
 * Empty introduced list (manual / Gen1) → no tools.
 */
export async function fetchTools(
  generationOptions: GenerationFilterOptions,
): Promise<Tool[]> {
  if (
    !generationOptions.syncWithRules &&
    generationOptions.introducedGenerations.length === 0
  ) {
    return [];
  }

  const { data, error } = await supabase
    .from("tools")
    .select(TOOL_SELECT_COLUMNS)
    .order("name_ja", { ascending: true });

  if (error) {
    throw new Error(`持ち物マスタの取得に失敗しました: ${error.message}`);
  }

  return filterByGenerationAvailability(
    ((data as unknown as Tool[]) ?? []).map(normalizeTool),
    generationOptions,
    (tool) => String(tool.pokeapi_id),
  );
}

export async function fetchToolsByIds(toolIds: string[]): Promise<Tool[]> {
  const unique = [...new Set(toolIds.filter(Boolean))];
  if (unique.length === 0) return [];

  const { data, error } = await supabase
    .from("tools")
    .select(TOOL_SELECT_COLUMNS)
    .in("id", unique);

  if (error) {
    throw new Error(`持ち物マスタの取得に失敗しました: ${error.message}`);
  }

  const byId = new Map(
    ((data as unknown as Tool[]) ?? []).map((tool) => {
      const normalized = normalizeTool(tool);
      return [normalized.id, normalized] as const;
    }),
  );
  return unique
    .map((id) => byId.get(id))
    .filter((tool): tool is Tool => Boolean(tool));
}
