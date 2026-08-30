import type { Move } from "../pokemon/moves";
import type { PokemonSpecies } from "../pokemon/types";
import type { Gen1StatBlock, PartyMemberBuild, PartySide } from "../party/types";

export type BattleStatus =
  | "paralysis"
  | "sleep"
  | "freeze"
  | "burn"
  | "poison"
  | null;

export type VolatileFlags = {
  confusionTurns: number;
  flinch: boolean;
  focusEnergy: boolean;
  recharge: boolean;
  substituteHp: number;
  trapTurns: number;
  trapDamage: number;
  leechSeed: boolean;
  /** Whose side planted the seed (heals that side's active). */
  leechSeedFrom: PartySide | null;
  disableMoveId: string | null;
  disableTurns: number;
  /** Two-turn charge (Solar Beam, Fly, …). Set on wind-up turn. */
  chargingMove: Move | null;
  /** Fly / Dig mid-charge: most moves miss. */
  semiInvulnerable: "fly" | "dig" | null;
  /** Thrash / Petal Dance lock. */
  lockedMove: Move | null;
  /** Remaining forced attacks including the current one after start. Gen1: 3–4. */
  lockTurnsLeft: number;
  /** Last move this fighter successfully began (for Mirror Move / Mimic). */
  lastMoveUsed: Move | null;
  /** Binding (Wrap etc.): attacker locked, deals fixed residual. */
  bindingMove: Move | null;
  bindingTurnsLeft: number;
  bindingDamage: number;
  /** Bide: storing then unleashing. */
  bideTurnsLeft: number;
  bideDamage: number;
  bideMove: Move | null;
  /** Rage: locked and ATK rises when hit. */
  rageActive: boolean;
  /** Physical damage taken this turn (for Counter). */
  physicalDamageTakenThisTurn: number;
  /** Transformed this battle. */
  transformed: boolean;
  /** Quick Claw activated this turn. */
  quickClawActive: boolean;
};

/** Per-side field effects. Gen1 mist/reflect/light screen last until switch-out. */
export type SideFieldEffects = {
  mist: boolean;
  reflect: boolean;
  lightScreen: boolean;
};

export type BattleFieldState = {
  a: SideFieldEffects;
  b: SideFieldEffects;
  /** Reserved for later gens (weather / terrain with turns). */
  weather: { id: string; turnsLeft: number } | null;
  terrain: { id: string; turnsLeft: number } | null;
};

export type BattleFighter = {
  side: PartySide;
  speciesId: string;
  member: PartyMemberBuild;
  species: PokemonSpecies;
  stats: Gen1StatBlock;
  /** In-battle stages: -6..+6 */
  stages: {
    attack: number;
    defense: number;
    special: number;
    speed: number;
    accuracy: number;
    evasion: number;
  };
  currentHp: number;
  maxHp: number;
  status: BattleStatus;
  sleepTurns: number;
  volatiles: VolatileFlags;
  /** Held item pokeapi id; null when none or Gen1 rules. */
  heldTool: { pokeapiId: number; consumed: boolean } | null;
};

export type BattleAction =
  | { type: "move"; move: Move }
  | { type: "switch"; index: number }
  | { type: "run" };

export type TurnLogLine = string;

/** One UI beat: play these logs, then refresh the field. */
export type TurnStep = {
  logs: TurnLogLine[];
  /** PP to spend only if the move actually began. */
  ppSpent: { speciesId: string; moveId: string } | null;
  /** Opponent must switch (Whirlwind / Roar). */
  forceSwitchSide?: PartySide | null;
  /** HP after this beat (for multi-hit bar updates). */
  hpSnapshot?: { a: number; b: number };
  /**
   * Status / confusion as of this beat (for badge timing).
   * Applied after the step's logs so badges appear with the effect text.
   * Also lets berries show the ailment before the cure message.
   */
  statusSnapshot?: {
    a: BattleStatus;
    b: BattleStatus;
    confusionA: number;
    confusionB: number;
  };
  /** Restore PP after spending (Leppa Berry). */
  ppRestore?: { speciesId: string; moveId: string; amount: number } | null;
};

export function createVolatiles(): VolatileFlags {
  return {
    confusionTurns: 0,
    flinch: false,
    focusEnergy: false,
    recharge: false,
    substituteHp: 0,
    trapTurns: 0,
    trapDamage: 0,
    leechSeed: false,
    leechSeedFrom: null,
    disableMoveId: null,
    disableTurns: 0,
    chargingMove: null,
    semiInvulnerable: null,
    lockedMove: null,
    lockTurnsLeft: 0,
    lastMoveUsed: null,
    bindingMove: null,
    bindingTurnsLeft: 0,
    bindingDamage: 0,
    bideTurnsLeft: 0,
    bideDamage: 0,
    bideMove: null,
    rageActive: false,
    physicalDamageTakenThisTurn: 0,
    transformed: false,
    quickClawActive: false,
  };
}

export function createSideField(): SideFieldEffects {
  return { mist: false, reflect: false, lightScreen: false };
}

export function createBattleField(): BattleFieldState {
  return {
    a: createSideField(),
    b: createSideField(),
    weather: null,
    terrain: null,
  };
}

export function createStages(): BattleFighter["stages"] {
  return {
    attack: 0,
    defense: 0,
    special: 0,
    speed: 0,
    accuracy: 0,
    evasion: 0,
  };
}

/** Gen1 stage multipliers (approx table). */
export function stageMultiplier(stage: number): number {
  const s = Math.max(-6, Math.min(6, stage));
  if (s >= 0) return (2 + s) / 2;
  return 2 / (2 - s);
}

export function stagedStat(
  base: number,
  stage: number,
  options?: { crit?: boolean },
): number {
  if (options?.crit) return base;
  return Math.max(1, Math.floor(base * stageMultiplier(stage)));
}
