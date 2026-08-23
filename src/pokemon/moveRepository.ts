import { supabase } from "../lib/supabase";
import type { Move, MoveEffectMeta } from "./moves";
import { EMPTY_EFFECT_META } from "./moves";
import {
  filterByGenerationAvailability,
  type GenerationFilterOptions,
} from "../match-setup/generationFilter";
import {
  gen1EvolutionDexNos,
  gen1LearnsetDexNos,
} from "./gen1Evolution";

const MOVE_SELECT_COLUMNS = [
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
  "effect_category",
  "effect_meta",
  "effect_code",
  "introduced_generation",
  "available_generations",
].join(",");

function normalizeMove(row: Move): Move {
  const meta = (row.effect_meta ?? {}) as Partial<MoveEffectMeta>;
  return {
    ...row,
    effect_category: row.effect_category ?? null,
    effect_code: row.effect_code ?? null,
    effect_meta: {
      ...EMPTY_EFFECT_META,
      ...meta,
      stat_changes: meta.stat_changes ?? [],
    },
  };
}


/**
 * Load moves linked to a resolved pokemon row id (including Gen1
 * pre-evolution learnsets), then apply generation filters on the move master.
 */
export async function fetchMovesForPokemon(
  pokemonId: string,
  generationOptions: GenerationFilterOptions,
): Promise<Move[]> {
  const pokemonIds = await resolveLearnsetPokemonIds(pokemonId);

  const { data: links, error: linkError } = await supabase
    .from("pokemon_moves")
    .select("move_id")
    .in("pokemon_id", pokemonIds);

  if (linkError) {
    throw new Error(`技一覧の取得に失敗しました: ${linkError.message}`);
  }

  const moveIds = [
    ...new Set((links ?? []).map((row) => row.move_id as string)),
  ];
  if (moveIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("moves")
    .select(MOVE_SELECT_COLUMNS)
    .in("id", moveIds)
    .order("name_ja", { ascending: true });

  if (error) {
    throw new Error(`技マスタの取得に失敗しました: ${error.message}`);
  }

  return filterByGenerationAvailability(
    ((data as unknown as Move[]) ?? []).map(normalizeMove),
    generationOptions,
    (move) => String(move.pokeapi_id),
  );
}

/** Pokemon ids whose learnsets should be unioned for this species row. */
async function resolveLearnsetPokemonIds(pokemonId: string): Promise<string[]> {
  const { data: pokemon, error } = await supabase
    .from("pokemon")
    .select("dex_no")
    .eq("id", pokemonId)
    .maybeSingle();

  if (error) {
    throw new Error(`ポケモンの取得に失敗しました: ${error.message}`);
  }
  if (!pokemon) {
    return [pokemonId];
  }

  const dexNos = gen1LearnsetDexNos(pokemon.dex_no as number);
  if (dexNos.length === 1) {
    return [pokemonId];
  }

  const { data: related, error: relatedError } = await supabase
    .from("pokemon")
    .select("id")
    .in("dex_no", dexNos);

  if (relatedError) {
    throw new Error(`進化前ポケモンの取得に失敗しました: ${relatedError.message}`);
  }

  const ids = [...new Set((related ?? []).map((row) => row.id as string))];
  return ids.length > 0 ? ids : [pokemonId];
}
function escapeIlikePattern(value: string): string {
  return value.replace(/[%_\\]/g, "\\$&");
}

/** Search moves by Japanese or English name, then apply generation filters. */
export async function searchMoves(
  query: string,
  generationOptions: GenerationFilterOptions,
  limit = 8,
): Promise<Move[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }

  const pattern = `%${escapeIlikePattern(trimmed)}%`;
  const { data, error } = await supabase
    .from("moves")
    .select(MOVE_SELECT_COLUMNS)
    .or(`name_ja.ilike.${pattern},name_en.ilike.${pattern}`)
    .order("name_ja", { ascending: true })
    .limit(50);

  if (error) {
    throw new Error(`技の検索に失敗しました: ${error.message}`);
  }

  return filterByGenerationAvailability(
    ((data as unknown as Move[]) ?? []).map(normalizeMove),
    generationOptions,
    (move) => String(move.pokeapi_id),
  ).slice(0, limit);
}

/** Pokemon row ids that can learn every selected move (AND), including Gen1 evolutions of learners. */
export async function fetchPokemonIdsForMoves(
  moveIds: string[],
): Promise<Set<string>> {
  if (moveIds.length === 0) {
    return new Set();
  }

  let matched: Set<string> | undefined;
  for (const moveId of moveIds) {
    const { data, error } = await supabase
      .from("pokemon_moves")
      .select("pokemon_id")
      .eq("move_id", moveId);

    if (error) {
      throw new Error(`技で覚えるポケモンの取得に失敗しました: ${error.message}`);
    }

    const ids = new Set<string>(
      (data ?? []).map((row) => row.pokemon_id as string),
    );
    if (matched === undefined) {
      matched = ids;
    } else {
      matched = new Set([...matched].filter((id) => ids.has(id)));
    }
    if (matched.size === 0) {
      break;
    }
  }

  if (!matched || matched.size === 0) {
    return matched ?? new Set();
  }

  return expandPokemonIdsWithGen1Evolutions(matched);
}

/** Include Gen1 evolved forms so pre-evo-only moves still match finals in filters. */
async function expandPokemonIdsWithGen1Evolutions(
  pokemonIds: Set<string>,
): Promise<Set<string>> {
  const { data, error } = await supabase
    .from("pokemon")
    .select("id, dex_no")
    .in("id", [...pokemonIds]);

  if (error) {
    throw new Error(`ポケモンの取得に失敗しました: ${error.message}`);
  }

  const dexNos = new Set<number>();
  for (const row of data ?? []) {
    const dex = row.dex_no as number;
    dexNos.add(dex);
    for (const evo of gen1EvolutionDexNos(dex)) {
      dexNos.add(evo);
    }
  }

  const { data: related, error: relatedError } = await supabase
    .from("pokemon")
    .select("id")
    .in("dex_no", [...dexNos]);

  if (relatedError) {
    throw new Error(`進化後ポケモンの取得に失敗しました: ${relatedError.message}`);
  }

  return new Set((related ?? []).map((row) => row.id as string));
}
/** Fetch move rows by primary key (party-equipped move ids). */
export async function fetchMovesByIds(moveIds: string[]): Promise<Move[]> {
  const unique = [...new Set(moveIds.filter(Boolean))];
  if (unique.length === 0) return [];

  const { data, error } = await supabase
    .from("moves")
    .select(MOVE_SELECT_COLUMNS)
    .in("id", unique);

  if (error) {
    throw new Error(`技マスタの取得に失敗しました: ${error.message}`);
  }

  const byId = new Map(
    ((data as unknown as Move[]) ?? []).map((move) => {
      const normalized = normalizeMove(move);
      return [normalized.id, normalized] as const;
    }),
  );
  return unique
    .map((id) => byId.get(id))
    .filter((move): move is Move => Boolean(move));
}
