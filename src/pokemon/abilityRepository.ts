import { supabase } from "../lib/supabase";

export type Ability = {
  id: string;
  name_ja: string;
  name_en: string;
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
    .select("id, name_ja, name_en")
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
