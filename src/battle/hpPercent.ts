/**
 * Pokémon Champions foe HP% display.
 * - Floor fractional percents.
 * - Remaining HP above 0% but below 1% shows as 1% (not 0% while alive).
 * - Exact 0 HP shows 0%; full HP shows 100%.
 */
export function formatChampionsHpPercent(currentHp: number, maxHp: number): number {
  if (maxHp <= 0) return 0;
  if (currentHp <= 0) return 0;
  if (currentHp >= maxHp) return 100;
  const pct = Math.floor((100 * currentHp) / maxHp);
  return Math.max(1, pct);
}

export function formatChampionsHpPercentLabel(
  currentHp: number,
  maxHp: number,
): string {
  return `${formatChampionsHpPercent(currentHp, maxHp)}%`;
}
