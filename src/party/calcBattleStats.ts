import { usesSplitSpecial } from "../pokemon/baseStatFilters";
import { calcGen1Stats } from "./gen1Stats";
import { calcGen2Stats, type Gen2StatBlock } from "./gen2Stats";
import type { Gen1StatBlock, PartyMemberBuild } from "./types";
import type { PokemonSpecies } from "../pokemon/types";

export type BattleStatBlock = Gen1StatBlock | Gen2StatBlock;

export function calcBattleStats(
  species: PokemonSpecies,
  build: Pick<PartyMemberBuild, "level" | "iv" | "statExp">,
  rulesGeneration: number,
): BattleStatBlock {
  if (usesSplitSpecial(rulesGeneration)) {
    return calcGen2Stats(species, build);
  }
  return calcGen1Stats(species, build);
}

export function battleStatsForDamage(
  stats: BattleStatBlock,
  role: "attacker-special" | "defender-special" | "physical",
  rulesGeneration: number,
): Gen1StatBlock {
  if (!usesSplitSpecial(rulesGeneration)) {
    return stats as Gen1StatBlock;
  }
  const gen2 = stats as Gen2StatBlock;
  return {
    hp: gen2.hp,
    attack: gen2.attack,
    defense: gen2.defense,
    special:
      role === "defender-special" ? gen2.sp_defense : gen2.sp_attack,
    sp_attack: gen2.sp_attack,
    sp_defense: gen2.sp_defense,
    speed: gen2.speed,
  };
}

/** One-line stat summary for party review / build preview. */
export function summarizeBattleStats(
  stats: BattleStatBlock,
  rulesGeneration: number,
): string {
  if (usesSplitSpecial(rulesGeneration)) {
    const gen2 = stats as Gen2StatBlock;
    return [
      `HP${gen2.hp}`,
      `こうげき${gen2.attack}`,
      `ぼうぎょ${gen2.defense}`,
      `とくこう${gen2.sp_attack}`,
      `とくぼう${gen2.sp_defense}`,
      `すばやさ${gen2.speed}`,
    ].join(" / ");
  }
  const gen1 = stats as Gen1StatBlock;
  return [
    `HP${gen1.hp}`,
    `こうげき${gen1.attack}`,
    `ぼうぎょ${gen1.defense}`,
    `とくしゅ${gen1.special}`,
    `すばやさ${gen1.speed}`,
  ].join(" / ");
}
