import { usesSplitSpecial } from "../pokemon/baseStatFilters";
import { usesModernIvEv } from "./gen3Stats";

export function ivStatLabel(
  key: "attack" | "defense" | "special" | "sp_attack" | "sp_defense" | "hp",
  rulesGeneration: number,
): string {
  if (usesSplitSpecial(rulesGeneration)) {
    if (key === "sp_attack" || key === "special") return "とくこう";
    if (key === "sp_defense") return "とくぼう";
  } else if (key === "special") {
    return "とくしゅ";
  }
  const labels: Record<string, string> = {
    hp: "HP",
    attack: "こうげき",
    defense: "ぼうぎょ",
    speed: "すばやさ",
  };
  return labels[key] ?? key;
}

export function ivSectionLabel(rulesGeneration: number): string {
  return usesModernIvEv(rulesGeneration)
    ? "個体値（0〜31）"
    : "個体値（0〜15）";
}

export function effortValueSectionLabel(rulesGeneration: number): string {
  if (usesModernIvEv(rulesGeneration)) {
    return "努力値（実数値に影響する値のみ・合計510）";
  }
  return "努力値 / 基礎ポイント（0〜65535）";
}

export function effortValueHint(rulesGeneration: number): string {
  if (usesModernIvEv(rulesGeneration)) {
    return "設定中のレベルで実数値が変わる努力値だけ選べます（例: 255は252と同じなので252まで）。実数値 ±1 で1段階動かします。";
  }
  return "Lv50 ±1 は、レベル50での実数値が1変わる基礎ポイントに合わせます。";
}
