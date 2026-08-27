import { usesSplitSpecial } from "../pokemon/baseStatFilters";
import type { BattleStatBlock } from "./calcBattleStats";
import type { Gen2StatBlock } from "./gen2Stats";
import {
  GEN1_STAT_KEYS,
  GEN1_STAT_LABELS,
  type Gen1StatBlock,
} from "./types";

export type StatEditorKey =
  | "hp"
  | "attack"
  | "defense"
  | "special"
  | "sp_attack"
  | "sp_defense"
  | "speed";

export function statEditorKeys(rulesGeneration: number): Array<{
  key: StatEditorKey;
  label: string;
}> {
  if (usesSplitSpecial(rulesGeneration)) {
    return [
      { key: "hp", label: "HP" },
      { key: "attack", label: "こうげき" },
      { key: "defense", label: "ぼうぎょ" },
      { key: "sp_attack", label: "とくこう" },
      { key: "sp_defense", label: "とくぼう" },
      { key: "speed", label: "すばやさ" },
    ];
  }
  return GEN1_STAT_KEYS.map((key) => ({
    key,
    label: GEN1_STAT_LABELS[key],
  }));
}

export function readStatBlockValue(
  block: Gen1StatBlock,
  key: StatEditorKey,
): number {
  if (key === "sp_attack") {
    return block.sp_attack ?? block.special;
  }
  if (key === "sp_defense") {
    return block.sp_defense ?? block.special;
  }
  return block[key];
}

export function computedStatValue(
  stats: BattleStatBlock,
  key: StatEditorKey,
  rulesGeneration: number,
): number {
  if (usesSplitSpecial(rulesGeneration)) {
    const gen2 = stats as Gen2StatBlock;
    switch (key) {
      case "hp":
        return gen2.hp;
      case "attack":
        return gen2.attack;
      case "defense":
        return gen2.defense;
      case "sp_attack":
      case "special":
        return gen2.sp_attack;
      case "sp_defense":
        return gen2.sp_defense;
      case "speed":
        return gen2.speed;
    }
  }
  const gen1 = stats as Gen1StatBlock;
  if (key === "sp_attack" || key === "sp_defense") {
    return gen1.special;
  }
  return gen1[key];
}
