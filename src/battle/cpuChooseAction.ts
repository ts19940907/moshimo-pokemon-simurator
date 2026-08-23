import { calcGen1Stats } from "../party/gen1Stats";
import type { PartyMemberBuild } from "../party/types";
import type { Move } from "../pokemon/moves";
import { EMPTY_EFFECT_META } from "../pokemon/moves";
import type { PokemonSpecies } from "../pokemon/types";
import {
  calcDamageRange,
  type DamageCalcModifiers,
} from "./calcDamage";
import { gen1TypeEffectiveness } from "./gen1TypeChart";
import { hypothesizeThreatMoves, randInt } from "./cpuTeam";
import { getForcedMove } from "./resolveTurn";
import { getMoveByPokeapiId } from "./gen1MovePool";
import {
  stagedStat,
  type BattleAction,
  type BattleFieldState,
  type BattleFighter,
} from "./types";

export type MatchupStance = "advantage" | "even" | "disadvantage";

export type CpuKnowledge = {
  /** Moves the human has actually used, keyed by species id. */
  revealedMoveIdsBySpeciesId: Record<string, string[]>;
};

function metaOf(move: Move) {
  return move.effect_meta ?? EMPTY_EFFECT_META;
}

function effectiveSpeed(fighter: BattleFighter): number {
  let spd = stagedStat(fighter.stats.speed, fighter.stages.speed);
  if (fighter.status === "paralysis") {
    spd = Math.max(1, Math.floor(spd / 4));
  }
  return spd;
}

function hpRatio(fighter: BattleFighter): number {
  if (fighter.maxHp <= 0) return 0;
  return fighter.currentHp / fighter.maxHp;
}

function isSetupMove(move: Move): boolean {
  if (move.effect_category === "net-good-stats") return true;
  const changes = metaOf(move).stat_changes ?? [];
  return changes.some((c) => c.change > 0);
}

function isHealMove(move: Move): boolean {
  if (move.effect_category === "heal" || move.effect_category === "unique-rest") {
    return true;
  }
  return (metaOf(move).healing ?? 0) > 0;
}

function isSubstituteMove(move: Move): boolean {
  return (
    move.effect_category === "unique-substitute" || move.pokeapi_id === 164
  );
}

function damageModifiers(
  attacker: BattleFighter,
  defender: BattleFighter,
  field: BattleFieldState,
): DamageCalcModifiers {
  return {
    crit: false,
    attackerBurn: attacker.status === "burn",
    defenderReflect: field[defender.side].reflect,
    defenderLightScreen: field[defender.side].lightScreen,
  };
}

function estimateMoveDamage(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  field: BattleFieldState,
): { min: number; max: number; avg: number; koLabel: string | null } {
  const range = calcDamageRange(
    {
      attackerLevel: attacker.member.level,
      attackerSpecies: attacker.species,
      attackerStats: attacker.stats,
      attackerAttackStage: attacker.stages.attack,
      attackerSpecialStage: attacker.stages.special,
      defenderSpecies: defender.species,
      defenderStats: defender.stats,
      defenderDefenseStage: defender.stages.defense,
      defenderSpecialStage: defender.stages.special,
      defenderCurrentHp: defender.currentHp,
    },
    move,
    damageModifiers(attacker, defender, field),
  );
  return {
    min: range.min,
    max: range.max,
    avg: (range.min + range.max) / 2,
    koLabel: range.koLabel,
  };
}

function bestDamageAmong(
  attacker: BattleFighter,
  defender: BattleFighter,
  moves: Move[],
  field: BattleFieldState,
): number {
  let best = 0;
  for (const move of moves) {
    if ((move.power ?? 0) <= 0) {
      const fixedIds = new Set([49, 82, 69, 101, 162, 149]);
      if (!fixedIds.has(move.pokeapi_id)) continue;
    }
    const { avg } = estimateMoveDamage(attacker, defender, move, field);
    best = Math.max(best, avg);
  }
  return best;
}

function typePressure(attacker: PokemonSpecies, defender: PokemonSpecies): number {
  const types = [attacker.type1, attacker.type2].filter(Boolean);
  let best = 0;
  for (const t of types) {
    best = Math.max(
      best,
      gen1TypeEffectiveness(t, defender.type1, defender.type2),
    );
  }
  return best;
}

export function evaluateMatchup(input: {
  self: BattleFighter;
  foe: BattleFighter;
  selfMoves: Move[];
  foeThreatMoves: Move[];
  field: BattleFieldState;
}): MatchupStance {
  let score = 0;
  const selfSpd = effectiveSpeed(input.self);
  const foeSpd = effectiveSpeed(input.foe);
  if (selfSpd > foeSpd) score += 1;
  else if (selfSpd < foeSpd) score -= 1;

  const off = typePressure(input.self.species, input.foe.species);
  const def = typePressure(input.foe.species, input.self.species);
  if (off >= 2 && def <= 1) score += 1;
  else if (def >= 2 && off <= 1) score -= 1;

  const ourDmg = bestDamageAmong(
    input.self,
    input.foe,
    input.selfMoves,
    input.field,
  );
  const theirDmg = bestDamageAmong(
    input.foe,
    input.self,
    input.foeThreatMoves,
    input.field,
  );

  if (ourDmg >= input.foe.currentHp) score += 2;
  else if (ourDmg * 2 >= input.foe.currentHp) score += 1;

  if (theirDmg >= input.self.currentHp) score -= 2;
  else if (theirDmg * 2 >= input.self.currentHp) score -= 1;

  if (score >= 2) return "advantage";
  if (score <= -2) return "disadvantage";
  return "even";
}

type ScoredAction = { action: BattleAction; score: number; label: string };

/** Floor 10% each, remainder proportional to score. */
export function roulettePick(scored: ScoredAction[]): BattleAction {
  if (scored.length === 0) {
    throw new Error("roulettePick: empty");
  }
  if (scored.length === 1) return scored[0].action;

  const n = scored.length;
  const floor = 0.1;
  const floorTotal = floor * n;
  const remaining = Math.max(0, 1 - floorTotal);
  const raw = scored.map((s) => Math.max(0, s.score));
  const sum = raw.reduce((a, b) => a + b, 0);
  const weights = raw.map((v) =>
    floor + (sum > 0 ? (remaining * v) / sum : remaining / n),
  );
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < scored.length; i += 1) {
    r -= weights[i];
    if (r <= 0) return scored[i].action;
  }
  return scored[scored.length - 1].action;
}

function availableMoves(
  fighter: BattleFighter,
  movesById: Record<string, Move>,
  ppRemaining: Record<string, number>,
): Move[] {
  const out: Move[] = [];
  for (const id of fighter.member.moveIds) {
    if (!id) continue;
    if (fighter.volatiles.disableMoveId === id) continue;
    const move = movesById[id];
    if (!move) continue;
    const pp = ppRemaining[`${fighter.speciesId}:${id}`];
    if (pp != null && pp <= 0) continue;
    out.push(move);
  }
  return out;
}

function foeThreatMoves(input: {
  foe: BattleFighter;
  knowledge: CpuKnowledge;
  movesById: Record<string, Move>;
  foeLearnset: Move[];
}): Move[] {
  const revealed = input.knowledge.revealedMoveIdsBySpeciesId[input.foe.speciesId] ?? [];
  const fromRevealed = revealed
    .map((id) => input.movesById[id])
    .filter((m): m is Move => Boolean(m));
  if (fromRevealed.length > 0) return fromRevealed;
  return hypothesizeThreatMoves(input.foeLearnset, 4);
}

export function chooseCpuAction(input: {
  self: BattleFighter;
  foe: BattleFighter;
  field: BattleFieldState;
  selfMovesById: Record<string, Move>;
  foeMovesById: Record<string, Move>;
  ppRemaining: Record<string, number>;
  knowledge: CpuKnowledge;
  foeLearnset: Move[];
  /** Bench indices that are alive (not active). */
  switchOptions: { index: number; member: PartyMemberBuild; species: PokemonSpecies }[];
}): BattleAction {
  const forced = getForcedMove(input.self);
  if (forced) return { type: "move", move: forced };

  const selfMoves = availableMoves(
    input.self,
    input.selfMovesById,
    input.ppRemaining,
  );
  const threat = foeThreatMoves({
    foe: input.foe,
    knowledge: input.knowledge,
    movesById: input.foeMovesById,
    foeLearnset: input.foeLearnset,
  });

  const stance = evaluateMatchup({
    self: input.self,
    foe: input.foe,
    selfMoves,
    foeThreatMoves: threat,
    field: input.field,
  });

  const scored: ScoredAction[] = [];
  const hp = hpRatio(input.self);
  const theirThreat = bestDamageAmong(
    input.foe,
    input.self,
    threat,
    input.field,
  );

  for (const move of selfMoves) {
    let score = 1;
    if ((move.power ?? 0) > 0 || [49, 82, 69, 101, 162, 149].includes(move.pokeapi_id)) {
      const { avg, min } = estimateMoveDamage(
        input.self,
        input.foe,
        move,
        input.field,
      );
      score = 8 + avg / Math.max(1, input.foe.maxHp) * 40;
      if (min >= input.foe.currentHp) score += 25;
      else if (avg * 2 >= input.foe.currentHp) score += 12;
      const eff = gen1TypeEffectiveness(
        move.type_id,
        input.foe.species.type1,
        input.foe.species.type2,
      );
      if (eff === 0) score = 0.5;
      else score *= Math.max(0.35, Math.min(2.2, eff));
    } else if (isSetupMove(move)) {
      score = stance === "advantage" && hp >= 0.45 ? 22 : 4;
      if (stance === "disadvantage") score = 2;
    } else if (isHealMove(move)) {
      score = hp <= 0.4 ? 28 : hp <= 0.55 ? 12 : 3;
      if (theirThreat >= input.self.currentHp && hp < 0.7) score += 10;
    } else if (isSubstituteMove(move)) {
      score = hp >= 0.35 && hp <= 0.75 ? 14 : 5;
      if (stance === "disadvantage") score += 4;
    } else {
      score = 3;
    }
    scored.push({ action: { type: "move", move }, score, label: move.name_ja });
  }

  for (const opt of input.switchOptions) {
    let score = stance === "disadvantage" ? 16 : 4;
    const off = typePressure(opt.species, input.foe.species);
    const def = typePressure(input.foe.species, opt.species);
    score += off * 8;
    score -= def * 6;
    if (stance === "advantage") score *= 0.35;
    scored.push({
      action: { type: "switch", index: opt.index },
      score: Math.max(1, score),
      label: `switch:${opt.member.nameJa}`,
    });
  }

  if (scored.length === 0) {
    const struggle = getMoveByPokeapiId(165);
    if (struggle) return { type: "move", move: struggle };
    if (input.switchOptions[0]) {
      return { type: "switch", index: input.switchOptions[0].index };
    }
    return { type: "run" };
  }

  return roulettePick(scored);
}

export function chooseCpuForcedSwitch(input: {
  switchOptions: { index: number; member: PartyMemberBuild; species: PokemonSpecies }[];
  foe: BattleFighter;
}): BattleAction {
  if (input.switchOptions.length === 0) {
    return { type: "run" };
  }
  const scored = input.switchOptions.map((opt) => {
    const off = typePressure(opt.species, input.foe.species);
    const def = typePressure(input.foe.species, opt.species);
    const stats = calcGen1Stats(opt.species, opt.member);
    return {
      action: { type: "switch" as const, index: opt.index },
      score: off * 10 - def * 7 + stats.speed / 50 + 5,
      label: opt.member.nameJa,
    };
  });
  return roulettePick(scored);
}

export function noteRevealedMove(
  knowledge: CpuKnowledge,
  speciesId: string,
  moveId: string,
): CpuKnowledge {
  const prev = knowledge.revealedMoveIdsBySpeciesId[speciesId] ?? [];
  if (prev.includes(moveId)) return knowledge;
  return {
    revealedMoveIdsBySpeciesId: {
      ...knowledge.revealedMoveIdsBySpeciesId,
      [speciesId]: [...prev, moveId],
    },
  };
}
