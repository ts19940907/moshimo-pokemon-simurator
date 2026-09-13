import { gen1TypeEffectiveness } from "./gen1TypeChart";
import { gen2TypeEffectiveness } from "./gen2TypeChart";

/**
 * Type effectiveness for battle rules generation.
 * Gen1: RBY chart. Gen2–5: GSC chart (Dark/Steel; same through Gen5).
 * Gen6+ Fairy chart is not implemented yet (falls back to Gen2–5).
 */
export function typeEffectivenessForRules(
  rulesGeneration: number,
  moveTypeId: number,
  defenderType1: number,
  defenderType2: number | null | undefined,
): number {
  if (rulesGeneration >= 2) {
    return gen2TypeEffectiveness(moveTypeId, defenderType1, defenderType2);
  }
  return gen1TypeEffectiveness(moveTypeId, defenderType1, defenderType2);
}

/** Display title for the type-chart dialog. */
export function typeChartTitle(rulesGeneration: number): string {
  if (rulesGeneration <= 1) return "初代タイプ相性表";
  if (rulesGeneration === 2) return "第2世代タイプ相性表";
  if (rulesGeneration === 3) return "第3世代タイプ相性表";
  if (rulesGeneration < 6) return `第${rulesGeneration}世代タイプ相性表`;
  return `第${rulesGeneration}世代タイプ相性表`;
}

export function typeChartNote(rulesGeneration: number): string {
  if (rulesGeneration <= 1) {
    return "※むし→どくは抜群。くさ／どくはむし技で4倍になります。";
  }
  if (rulesGeneration === 3) {
    return "※第2世代と同じ相性です。あく・はがねあり。フェアリーなし。ゴースト↔エスパーは抜群。";
  }
  if (rulesGeneration >= 2 && rulesGeneration < 6) {
    return "※あく・はがねが追加。ゴースト↔エスパーは抜群。むし↔どくは今ひとつ。こおり→ほのおは抜群。";
  }
  return "※フェアリーを含む世代の相性表は段階実装中です（暫定で第2世代相当）。";
}

export function typeChartButtonLabel(rulesGeneration: number): string {
  return `${typeChartTitle(rulesGeneration)}を見る`;
}
