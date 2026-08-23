/**
 * Gen1 evolution links (dex 1–151). Later-gen evolutions (Crobat, etc.) are ignored.
 * Key = evolved form, value = immediate pre-evolution.
 */
export const GEN1_EVOLVES_FROM: Readonly<Record<number, number>> = {
  2: 1,
  3: 2,
  5: 4,
  6: 5,
  8: 7,
  9: 8,
  11: 10,
  12: 11,
  14: 13,
  15: 14,
  17: 16,
  18: 17,
  20: 19,
  22: 21,
  24: 23,
  26: 25,
  28: 27,
  30: 29,
  31: 30,
  33: 32,
  34: 33,
  36: 35,
  38: 37,
  40: 39,
  42: 41,
  44: 43,
  45: 44,
  47: 46,
  49: 48,
  51: 50,
  53: 52,
  55: 54,
  57: 56,
  59: 58,
  61: 60,
  62: 61,
  64: 63,
  65: 64,
  67: 66,
  68: 67,
  70: 69,
  71: 70,
  73: 72,
  75: 74,
  76: 75,
  78: 77,
  80: 79,
  82: 81,
  85: 84,
  87: 86,
  89: 88,
  91: 90,
  93: 92,
  94: 93,
  97: 96,
  99: 98,
  101: 100,
  103: 102,
  105: 104,
  110: 109,
  112: 111,
  117: 116,
  119: 118,
  121: 120,
  130: 129,
  134: 133,
  135: 133,
  136: 133,
  139: 138,
  141: 140,
  148: 147,
  149: 148,
};

/** Pre-evolutions of `dexNo`, nearest first (does not include self). */
export function gen1PreEvolutionDexNos(dexNo: number): number[] {
  const result: number[] = [];
  let current = GEN1_EVOLVES_FROM[dexNo];
  const seen = new Set<number>();
  while (current != null && !seen.has(current)) {
    seen.add(current);
    result.push(current);
    current = GEN1_EVOLVES_FROM[current];
  }
  return result;
}

/** Self + all Gen1 pre-evolutions (for learnset inheritance). */
export function gen1LearnsetDexNos(dexNo: number): number[] {
  return [dexNo, ...gen1PreEvolutionDexNos(dexNo)];
}

/** Direct and indirect Gen1 evolutions of `dexNo` (does not include self). */
export function gen1EvolutionDexNos(dexNo: number): number[] {
  const result: number[] = [];
  const queue = [dexNo];
  const seen = new Set<number>([dexNo]);
  while (queue.length > 0) {
    const from = queue.shift()!;
    for (const [toStr, pre] of Object.entries(GEN1_EVOLVES_FROM)) {
      if (pre !== from) continue;
      const to = Number(toStr);
      if (seen.has(to)) continue;
      seen.add(to);
      result.push(to);
      queue.push(to);
    }
  }
  return result;
}
