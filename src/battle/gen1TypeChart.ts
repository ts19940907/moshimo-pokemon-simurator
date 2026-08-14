/**
 * Gen1 (RBY cartridge) type effectiveness.
 * Type ids match moshimo.types (1=Normal … 15=Dragon).
 * Dual-type: multiplier = chart[move][t1] * chart[move][t2] (missing = 1).
 *
 * Notable Gen1 quirks vs modern:
 * - Psychic vs Ghost = 0 (programming error; intended SE)
 * - Ghost vs Psychic = 0
 * - Ghost vs Bug = 2
 * - Bug vs Poison = 2, Poison vs Bug = 2
 * - Ice vs Fire = 0.5
 */
const CHART: Record<number, Record<number, number>> = {
  1: { 13: 0.5, 14: 0 }, // Normal
  2: { 2: 0.5, 3: 0.5, 5: 2, 6: 2, 12: 2, 13: 0.5, 15: 0.5 }, // Fire
  3: { 2: 2, 3: 0.5, 5: 0.5, 9: 2, 13: 2, 15: 0.5 }, // Water
  4: { 3: 2, 4: 0.5, 5: 0.5, 9: 0, 10: 2, 15: 0.5 }, // Electric
  5: {
    2: 0.5,
    3: 2,
    5: 0.5,
    8: 0.5,
    9: 2,
    10: 0.5,
    12: 0.5,
    13: 2,
    15: 0.5,
  }, // Grass
  6: { 2: 0.5, 3: 0.5, 5: 2, 6: 0.5, 9: 2, 10: 2, 15: 2 }, // Ice
  7: { 1: 2, 6: 2, 8: 0.5, 10: 0.5, 11: 0.5, 12: 0.5, 13: 2, 14: 0 }, // Fighting
  8: { 5: 2, 8: 0.5, 9: 0.5, 12: 2, 13: 0.5, 14: 0.5 }, // Poison
  9: { 2: 2, 4: 2, 5: 0.5, 8: 2, 10: 0, 12: 0.5, 13: 2 }, // Ground
  10: { 4: 0.5, 5: 2, 7: 2, 12: 2, 13: 0.5 }, // Flying
  11: { 7: 2, 8: 2, 11: 0.5, 14: 0 }, // Psychic (Ghost immune in Gen1)
  12: { 2: 0.5, 5: 2, 7: 0.5, 8: 2, 10: 0.5, 11: 2, 14: 0.5 }, // Bug
  13: { 2: 2, 6: 2, 7: 0.5, 9: 0.5, 10: 2, 12: 2 }, // Rock
  14: { 1: 0, 11: 0, 12: 2, 14: 2 }, // Ghost
  15: { 15: 2 }, // Dragon
};

export function gen1TypeEffectiveness(
  moveTypeId: number,
  defenderType1: number,
  defenderType2: number | null | undefined,
): number {
  const row = CHART[moveTypeId] ?? {};
  const e1 = row[defenderType1] ?? 1;
  if (defenderType2 == null || defenderType2 === 0 || defenderType2 === defenderType1) {
    return e1;
  }
  const e2 = row[defenderType2] ?? 1;
  return e1 * e2;
}
