/**
 * Gen2 (GSC) type effectiveness.
 * Type ids match moshimo.types (1=Normal … 17=Steel).
 * Dual-type: multiplier = chart[move][t1] * chart[move][t2] (missing = 1).
 *
 * Notable Gen2 changes vs Gen1:
 * - Dark / Steel introduced
 * - Psychic vs Ghost = 2 (was 0)
 * - Ghost vs Psychic = 2 (was 0)
 * - Bug vs Poison = 0.5 (was 2)
 * - Poison vs Bug = 0.5 (was 2)
 * - Ice vs Fire = 2 (was 0.5)
 */
const CHART: Record<number, Record<number, number>> = {
  // Normal
  1: { 13: 0.5, 14: 0, 17: 0.5 },
  // Fire
  2: {
    2: 0.5,
    3: 0.5,
    5: 2,
    6: 2,
    12: 2,
    13: 0.5,
    15: 0.5,
    17: 2,
  },
  // Water
  3: { 2: 2, 3: 0.5, 5: 0.5, 9: 2, 13: 2, 15: 0.5 },
  // Electric
  4: { 3: 2, 4: 0.5, 5: 0.5, 9: 0, 10: 2, 15: 0.5 },
  // Grass
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
    17: 0.5,
  },
  // Ice
  6: {
    2: 2,
    3: 0.5,
    5: 2,
    6: 0.5,
    9: 2,
    10: 2,
    15: 2,
    17: 0.5,
  },
  // Fighting
  7: {
    1: 2,
    6: 2,
    8: 0.5,
    10: 0.5,
    11: 0.5,
    12: 0.5,
    13: 2,
    14: 0,
    16: 2,
    17: 2,
  },
  // Poison
  8: {
    5: 2,
    8: 0.5,
    9: 0.5,
    12: 0.5,
    13: 0.5,
    14: 0.5,
    17: 0,
  },
  // Ground
  9: {
    2: 2,
    4: 2,
    5: 0.5,
    8: 2,
    10: 0,
    12: 0.5,
    13: 2,
    17: 2,
  },
  // Flying
  10: { 4: 0.5, 5: 2, 7: 2, 12: 2, 13: 0.5, 17: 0.5 },
  // Psychic
  11: { 7: 2, 8: 2, 11: 0.5, 14: 2, 16: 0, 17: 0.5 },
  // Bug
  12: {
    2: 0.5,
    5: 2,
    7: 0.5,
    8: 0.5,
    10: 0.5,
    11: 2,
    14: 0.5,
    16: 2,
    17: 0.5,
  },
  // Rock
  13: {
    2: 2,
    6: 2,
    7: 0.5,
    9: 0.5,
    10: 2,
    12: 2,
    17: 0.5,
  },
  // Ghost
  14: { 1: 0, 11: 2, 14: 2, 16: 0.5, 17: 0.5 },
  // Dragon
  15: { 15: 2, 17: 0.5 },
  // Dark
  16: { 7: 0.5, 11: 2, 14: 2, 16: 0.5, 17: 0.5 },
  // Steel
  17: {
    2: 0.5,
    3: 0.5,
    4: 0.5,
    6: 2,
    13: 2,
    17: 0.5,
  },
};

export function gen2TypeEffectiveness(
  moveTypeId: number,
  defenderType1: number,
  defenderType2: number | null | undefined,
): number {
  const row = CHART[moveTypeId] ?? {};
  const e1 = row[defenderType1] ?? 1;
  if (
    defenderType2 == null ||
    defenderType2 === 0 ||
    defenderType2 === defenderType1
  ) {
    return e1;
  }
  const e2 = row[defenderType2] ?? 1;
  return e1 * e2;
}
