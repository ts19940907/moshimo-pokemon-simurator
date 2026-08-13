import type {
  Generation,
  LevelCapMode,
  OpponentType,
  RestrictionMode,
  VisibilityMode,
} from "./types";
import { generations, implementedGeneration } from "./types";

export const generationOptions: {
  value: Generation;
  title: string;
  disabled: boolean;
}[] = generations.map((generation) => ({
  value: generation,
  title: generation === 1 ? "初代" : `第${generation}世代`,
  disabled: generation !== implementedGeneration,
}));

/** Debut-generation checkboxes (Gen2+ disabled until those seeds exist). */
export const poolGenerationOptions: {
  value: Generation;
  title: string;
  disabled: boolean;
}[] = generations.map((generation) => ({
  value: generation,
  title: generation === 1 ? "初代" : `第${generation}世代`,
  disabled: generation !== implementedGeneration,
}));

export const restrictionOptions: {
  value: RestrictionMode;
  title: string;
  description: string;
}[] = [
  {
    value: "standard",
    title: "禁止伝説なし・幻なし",
    description: "ミュウツーとミュウは使えません。",
  },
  {
    value: "restricted_allowed",
    title: "禁止伝説あり・幻なし",
    description: "ミュウツーは使えます。ミュウは使えません。",
  },
  {
    value: "anything",
    title: "なんでもあり",
    description: "ミュウツーもミュウも使えます。",
  },
];

export const opponentOptions: {
  value: OpponentType;
  title: string;
  description: string;
  disabled?: boolean;
}[] = [
  {
    value: "local_both",
    title: "自分で両方操作",
    description: "同じ端末でサイドAとサイドBを順番に操作します。",
  },
  {
    value: "ai",
    title: "AIと対戦",
    description: "自分の編成後に3体選出へ進みます。AIの選出は裏で同時に行われ、初手だけが見えます。",
  },
];

export const visibilityOptions: {
  value: VisibilityMode;
  title: string;
  description: string;
}[] = [
  {
    value: "full",
    title: "フル公開",
    description: "お互いの技やPPまで見えます。検証向きです。",
  },
  {
    value: "opponent_hidden",
    title: "相手非公開",
    description: "相手の技は出るまで見えません。実戦に近い確認向きです。",
  },
];

export const levelCapOptions: {
  value: LevelCapMode;
  title: string;
  description: string;
}[] = [
  {
    value: "max_50",
    title: "レベル50まで",
    description: "編成・対戦で設定できるレベルは50が上限です。",
  },
  {
    value: "unlimited",
    title: "レベル無制限",
    description: "レベル上限はありません（ゲームと同様に100まで想定）。",
  },
];
