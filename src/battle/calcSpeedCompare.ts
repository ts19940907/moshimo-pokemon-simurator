import { calcGen1OtherStat, calcGen1Stats } from "../party/gen1Stats";
import type { PartyMemberBuild } from "../party/types";
import type { PokemonSpecies } from "../pokemon/types";
import { stagedStat } from "./types";

export type SpeedSideInput = {
  species: PokemonSpecies;
  build: PartyMemberBuild;
  speedStage: number;
  paralyzed: boolean;
};

export type SpeedVerdict = "outspeed" | "tie" | "underspeed";

export type SpeedCompareTip = {
  id: string;
  label: string;
};

export type SpeedCompareResult = {
  selfSpeed: number;
  foeSpeed: number;
  verdict: SpeedVerdict;
  verdictLabel: string;
  tips: SpeedCompareTip[];
};

/** Gen1: Electric (type1 === 4) cannot be paralyzed. */
export function canBeParalyzed(species: PokemonSpecies): boolean {
  return species.type1 !== 4;
}

export function calcEffectiveSpeed(side: SpeedSideInput): number {
  const stats = calcGen1Stats(side.species, side.build);
  let spd = stagedStat(stats.speed, side.speedStage);
  if (side.paralyzed) {
    spd = Math.max(1, Math.floor(spd / 4));
  }
  return spd;
}

function clampStage(stage: number): number {
  return Math.max(-6, Math.min(6, Math.trunc(stage)));
}

function withSpeedIv(side: SpeedSideInput, iv: number): SpeedSideInput {
  return {
    ...side,
    build: {
      ...side.build,
      iv: { ...side.build.iv, speed: iv },
    },
  };
}

function withSpeedStatExp(side: SpeedSideInput, statExp: number): SpeedSideInput {
  return {
    ...side,
    build: {
      ...side.build,
      statExp: { ...side.build.statExp, speed: statExp },
    },
  };
}

function withStage(side: SpeedSideInput, stage: number): SpeedSideInput {
  return { ...side, speedStage: clampStage(stage) };
}

function beats(self: SpeedSideInput, foe: SpeedSideInput): boolean {
  return calcEffectiveSpeed(self) > calcEffectiveSpeed(foe);
}

function minSpeedIvToOutspeed(
  self: SpeedSideInput,
  foe: SpeedSideInput,
): number | null {
  const current = self.build.iv.speed;
  for (let iv = current + 1; iv <= 15; iv += 1) {
    if (beats(withSpeedIv(self, iv), foe)) return iv;
  }
  return null;
}

/** Smallest Stat Exp (0–65535) that outspeeds; null if impossible. */
function minSpeedStatExpToOutspeed(
  self: SpeedSideInput,
  foe: SpeedSideInput,
): number | null {
  const current = self.build.statExp.speed;
  if (beats(withSpeedStatExp(self, 65535), foe) === false) return null;

  // Stat Exp only changes the floor(sqrt(x)/4) term — search minimal x > current.
  let lo = current + 1;
  let hi = 65535;
  let found: number | null = null;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (beats(withSpeedStatExp(self, mid), foe)) {
      found = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  return found;
}

function minSelfStageDeltaToOutspeed(
  self: SpeedSideInput,
  foe: SpeedSideInput,
): number | null {
  const current = clampStage(self.speedStage);
  for (let stage = current + 1; stage <= 6; stage += 1) {
    if (beats(withStage(self, stage), foe)) return stage - current;
  }
  return null;
}

function minFoeStageDropToOutspeed(
  self: SpeedSideInput,
  foe: SpeedSideInput,
): number | null {
  const current = clampStage(foe.speedStage);
  for (let stage = current - 1; stage >= -6; stage -= 1) {
    if (beats(self, withStage(foe, stage))) return current - stage;
  }
  return null;
}

/**
 * Tips when not outspeeding, in agreed priority order (max 3):
 * IV → StatExp → self stage up → foe stage down → foe paralysis
 */
export function buildSpeedOutspeedTips(
  self: SpeedSideInput,
  foe: SpeedSideInput,
  maxTips = 3,
): SpeedCompareTip[] {
  if (beats(self, foe)) return [];

  const tips: SpeedCompareTip[] = [];

  const needIv = minSpeedIvToOutspeed(self, foe);
  if (needIv != null) {
    tips.push({
      id: "self-iv",
      label: `すばやさ個体値を ${needIv} 以上にする（現在 ${self.build.iv.speed}）`,
    });
  }

  const needExp = minSpeedStatExpToOutspeed(self, foe);
  if (needExp != null) {
    tips.push({
      id: "self-stat-exp",
      label: `すばやさ努力値を ${needExp} 以上にする（現在 ${self.build.statExp.speed}）`,
    });
  }

  const stageUp = minSelfStageDeltaToOutspeed(self, foe);
  if (stageUp != null) {
    tips.push({
      id: "self-stage",
      label: `自分のすばやさランクを +${stageUp} する（現在 ${formatStage(self.speedStage)}）`,
    });
  }

  const stageDown = minFoeStageDropToOutspeed(self, foe);
  if (stageDown != null) {
    tips.push({
      id: "foe-stage",
      label: `相手のすばやさランクを -${stageDown} する（現在 ${formatStage(foe.speedStage)}）`,
    });
  }

  if (!foe.paralyzed && canBeParalyzed(foe.species)) {
    const paralyzedFoe = { ...foe, paralyzed: true };
    if (beats(self, paralyzedFoe)) {
      tips.push({
        id: "foe-para",
        label: "相手をまひにする",
      });
    }
  }

  return tips.slice(0, maxTips);
}

function formatStage(stage: number): string {
  const s = clampStage(stage);
  return s > 0 ? `+${s}` : String(s);
}

export function compareSpeeds(
  self: SpeedSideInput,
  foe: SpeedSideInput,
): SpeedCompareResult {
  const selfSpeed = calcEffectiveSpeed(self);
  const foeSpeed = calcEffectiveSpeed(foe);
  let verdict: SpeedVerdict;
  let verdictLabel: string;
  if (selfSpeed > foeSpeed) {
    verdict = "outspeed";
    verdictLabel = "先制できる";
  } else if (selfSpeed === foeSpeed) {
    verdict = "tie";
    verdictLabel = "同速（乱数）";
  } else {
    verdict = "underspeed";
    verdictLabel = "先制できない";
  }

  const tips =
    verdict === "outspeed" ? [] : buildSpeedOutspeedTips(self, foe, 3);

  return { selfSpeed, foeSpeed, verdict, verdictLabel, tips };
}

/** Base speed stat only (no stage / paralysis) — useful for display helpers. */
export function calcBaseSpeedStat(
  species: PokemonSpecies,
  build: PartyMemberBuild,
): number {
  return calcGen1OtherStat(
    species.base_speed,
    build.iv.speed,
    build.statExp.speed,
    build.level,
  );
}
