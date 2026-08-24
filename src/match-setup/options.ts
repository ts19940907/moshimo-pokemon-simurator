import type {
  Generation,
  LevelCapMode,
  OpponentType,
  RestrictionMode,
  VisibilityMode,
} from "./types";
import {
  generations,
  isGenerationImplemented,
  itemPoolGenerations,
} from "./types";

export type GenerationOption = {
  value: Generation;
  title: string;
  disabled: boolean;
};

export const generationOptions: GenerationOption[] = generations.map(
  (generation) => ({
    value: generation,
    title: generation === 1 ? "初代" : `第${generation}世代`,
    disabled: !isGenerationImplemented(generation),
  }),
);

/** Debut-generation checkboxes (unimplemented gens stay disabled). */
export const poolGenerationOptions: GenerationOption[] = generations.map(
  (generation) => ({
    value: generation,
    title: generation === 1 ? "初代" : `第${generation}世代`,
    disabled: !isGenerationImplemented(generation),
  }),
);

/** Held-item debut generations (Gen 2–9). */
export const itemPoolGenerationOptions: GenerationOption[] =
  itemPoolGenerations.map((generation) => ({
    value: generation,
    title: `第${generation}世代`,
    disabled: false,
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
    value: "cpu",
    title: "CPUと対戦",
    description:
      "自分の6体編成後、CPUが6体を自動編成します。3体選出では相手の6体が見え、確定後にCPUが3体を選びます（選出内容は非公開）。行動は乱数つきの重み付けで決まります。",
  },
  {
    value: "ai",
    title: "AIと対戦",
    description: "高度なAI対戦（未実装）。",
    disabled: true,
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
