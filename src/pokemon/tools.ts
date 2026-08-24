export type Tool = {
  id: string;
  pokeapi_id: number;
  name_ja: string;
  name_en: string;
  category: string | null;
  description: string | null;
  effect_code: string | null;
  effect_meta: Record<string, unknown>;
  /** Debut generation of this item. */
  introduced_generation: number;
  /** Bitmask of competitive-usable generations. Gen N = 2^(N-1). */
  available_generations: number;
};

export const TOOL_CATEGORY_JA: Record<string, string> = {
  "held-items": "持たせ道具",
  "type-enhancement": "タイプ強化",
  "species-specific": "専用",
  medicine: "きのみ",
  healing: "回復",
};

export function toolCategoryJa(category: string | null | undefined): string {
  if (!category) return "その他";
  return TOOL_CATEGORY_JA[category] ?? category;
}
