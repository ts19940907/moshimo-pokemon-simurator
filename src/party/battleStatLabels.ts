import { usesSplitSpecial } from "../pokemon/baseStatFilters";

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

export function effortValueSectionLabel(_rulesGeneration: number): string {
  return "努力値 / 基礎ポイント（0〜65535）";
}

export function effortValueHint(_rulesGeneration: number): string {
  return "Lv50 ±1 は、レベル50での実数値が1変わる基礎ポイントに合わせます。";
}
