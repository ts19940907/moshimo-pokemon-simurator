import type { Move } from "../pokemon/moves";
import type { PokemonSpecies } from "../pokemon/types";
import type { Gen1StatBlock, PartyMemberBuild, PartySide } from "../party/types";
import type { BattleWeather } from "./weather";

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
  /**
   * Gen2 Wrap / Bind / Fire Spin / Clamp / Whirlpool: the target can still act but
   * cannot switch, taking 1/16 at end of each turn until `turnsLeft` runs out.
   */
  partialTrap: { moveNameJa: string; turnsLeft: number } | null;
  leechSeed: boolean;
  /** Badly poisoned (Toxic). Reverts to regular poison on switch-out (volatiles reset). */
  toxic: boolean;
  /** Toxic residual multiplier (N/16); increases each residual tick. */
  toxicCounter: number;
  /** Whose side planted the seed (heals that side's active). */
  leechSeedFrom: PartySide | null;
  disableMoveId: string | null;
  disableTurns: number;
  /** Two-turn charge (Solar Beam, Fly, …). Set on wind-up turn. */
  chargingMove: Move | null;
  /** Fly / Dig mid-charge: most moves miss. */
  /** Fly / Dig / Shadow Force (Gen4: vanished, nothing reaches it). */
  semiInvulnerable: "fly" | "dig" | "shadow" | null;
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
  /**
   * Gen2 Protect / Detect / Endure for the current turn.
   * Cleared at end of turn.
   */
  protection: null | "protect" | "endure";
  /** Consecutive successful Protect-family uses (for Gen2 success decay). */
  protectStreak: number;
  /** Set when a Protect-family move succeeded this turn (streak bookkeeping). */
  usedProtectFamilyThisTurn: boolean;
  /** Ghost Curse residual (Gen2). */
  cursed: boolean;
  /** Mean Look / Spider Web: cannot switch or be forced out. */
  cannotEscape: boolean;
  /** Lock-On / Mind Reader: next move ignores accuracy / semi-invulnerable. */
  sureHit: boolean;
  /** Foresight: Normal/Fighting can hit Ghost. */
  foresight: boolean;
  /** Destiny Bond active until end of turn. */
  destinyBond: boolean;
  /** Attract: opposite-gender infatuation. */
  infatuated: boolean;
  /** Perish Song counter; null = none. Faint at 0 after decrement. */
  perishCount: number | null;
  /** Nightmare residual while sleeping. */
  nightmare: boolean;
  /** Special damage taken this turn (Mirror Coat). */
  specialDamageTakenThisTurn: number;
  /** Moves known for Sleep Talk / Sketch (filled by battle UI when available). */
  knownMoves: Move[];
  /** Baton Pass pending: next switch keeps stages/some volatiles. */
  batonPass: boolean;
  /** Flash Fire activated this battle (Fire moves boosted). */
  flashFireActive: boolean;
  /**
   * Truant: when true, this Pokémon loafs and skips its next action.
   * Toggled after each attempted action.
   */
  truantIdle: boolean;
  /** Gen4 Roost: loses the Flying type until end of turn. */
  roosted: boolean;
  /** Gen4 Magnet Rise: immune to Ground moves while > 0. */
  magnetRiseTurns: number;
  /** Gen4 Embargo: held item has no effect while > 0. */
  embargoTurns: number;
  /** Gen4 Heal Block: healing moves fail while > 0. */
  healBlockTurns: number;
  /** Gen4 Aqua Ring: heals 1/16 at end of turn. */
  aquaRing: boolean;
  /** Gen4 Power Trick: Attack and Defense are swapped. */
  powerTrick: boolean;
  /** Gen4 Miracle Eye: Psychic hits Dark, evasion boosts ignored. */
  miracleEye: boolean;
  /** Choice Band / Specs / Scarf lock. */
  choiceLockMoveId: string | null;
  /** Gen4 Unburden: held item was used up. */
  unburdenActive: boolean;
  /** Gen4 Slow Start: Attack / Speed halved while > 0. */
  slowStartTurns: number;
  /** Took damage from the foe's move this turn (Assurance / Avalanche). */
  damagedByFoeThisTurn: boolean;
  /** Already acted this turn (Payback / Sucker Punch / Me First). */
  movedThisTurn: boolean;
  /** Metronome (item): consecutive uses of the same move. */
  metronomeMoveId: string | null;
  metronomeCount: number;
  /** Last Resort: moves used since entering. */
  movesUsedIds: string[];
  /** Custap Berry: moves first this turn. */
  custapActive: boolean;
  /** Micle Berry: next move accuracy ×1.2. */
  micleActive: boolean;
  /** Damage taken this turn from the foe (Metal Burst). */
  lastDamageTaken: number;
};

/** Per-side field effects. Gen1 mist/reflect/light screen last until switch-out. */
export type SideFieldEffects = {
  mist: boolean;
  reflect: boolean;
  lightScreen: boolean;
  /** Gen2 Spikes (single layer). */
  spikes: boolean;
  /** Gen2 Safeguard remaining turns (including this turn's end tick). */
  safeguardTurns: number;
  /** Gen4: Reflect / Light Screen / Mist turns (0 = until switch-out in older rules). */
  reflectTurns: number;
  lightScreenTurns: number;
  mistTurns: number;
  /** Gen4 Spikes layers (1–3). */
  spikesLayers: number;
  /** Gen4 Toxic Spikes layers (1–2). */
  toxicSpikes: number;
  stealthRock: boolean;
  tailwindTurns: number;
  luckyChantTurns: number;
  /** Healing Wish / Lunar Dance: the next Pokémon sent out is fully restored. */
  healingWish: boolean;
};

export type BattleFieldState = {
  a: SideFieldEffects;
  b: SideFieldEffects;
  /** Active weather (Gen2+: Rain Dance / Sunny Day / …). */
  weather: BattleWeather | null;
  terrain: { id: string; turnsLeft: number } | null;
  /** Gen4 Trick Room remaining turns. */
  trickRoomTurns: number;
  /** Gen4 Gravity remaining turns. */
  gravityTurns: number;
  /** Last move used by either side (Copycat). */
  lastMoveUsed: Move | null;
  /**
   * Future Sight / similar delayed attacks.
   * `turnsLeft` counts down each end-of-turn; hits when it reaches 0.
   */
  futureSight: {
    targetSide: PartySide;
    damage: number;
    turnsLeft: number;
    sourceName: string;
  } | null;
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
    /** Gen1 unified Special. Gen2 prefers sp_attack / sp_defense. */
    special: number;
    sp_attack: number;
    sp_defense: number;
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
  heldTool: {
    pokeapiId: number;
    consumed: boolean;
    nameJa?: string | null;
    /** Gen3: once knocked off, this Pokémon cannot receive an item this battle. */
    knockedOff?: boolean;
  } | null;
  /** Active ability pokeapi id (Gen3+); null when none / older rules. */
  abilityPokeapiId: number | null;
  abilityNameJa: string | null;
  /** Mutable battle types (Color Change / Forecast). */
  battleType1: number;
  battleType2: number;
  /** Battle rules generation (item / ability behavior differs by generation). */
  rulesGeneration: number;
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
  ppSpent: { speciesId: string; moveId: string; amount?: number } | null;
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
    partialTrap: null,
    leechSeed: false,
    toxic: false,
    toxicCounter: 0,
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
    protection: null,
    protectStreak: 0,
    usedProtectFamilyThisTurn: false,
    cursed: false,
    cannotEscape: false,
    sureHit: false,
    foresight: false,
    destinyBond: false,
    infatuated: false,
    perishCount: null,
    nightmare: false,
    specialDamageTakenThisTurn: 0,
    knownMoves: [],
    batonPass: false,
    flashFireActive: false,
    truantIdle: false,
    roosted: false,
    magnetRiseTurns: 0,
    embargoTurns: 0,
    healBlockTurns: 0,
    aquaRing: false,
    powerTrick: false,
    miracleEye: false,
    choiceLockMoveId: null,
    unburdenActive: false,
    slowStartTurns: 0,
    damagedByFoeThisTurn: false,
    movedThisTurn: false,
    metronomeMoveId: null,
    metronomeCount: 0,
    movesUsedIds: [],
    custapActive: false,
    micleActive: false,
    lastDamageTaken: 0,
  };
}

/** Mean Look / Spider Web, or Gen2 binding moves. */
export function cannotSwitchOut(fighter: BattleFighter | null | undefined): boolean {
  if (!fighter) return false;
  return fighter.volatiles.cannotEscape || fighter.volatiles.partialTrap != null;
}

export function createSideField(): SideFieldEffects {
  return {
    mist: false,
    reflect: false,
    lightScreen: false,
    spikes: false,
    safeguardTurns: 0,
    reflectTurns: 0,
    lightScreenTurns: 0,
    mistTurns: 0,
    spikesLayers: 0,
    toxicSpikes: 0,
    stealthRock: false,
    tailwindTurns: 0,
    luckyChantTurns: 0,
    healingWish: false,
  };
}

export function createBattleField(): BattleFieldState {
  return {
    a: createSideField(),
    b: createSideField(),
    weather: null,
    terrain: null,
    trickRoomTurns: 0,
    gravityTurns: 0,
    lastMoveUsed: null,
    futureSight: null,
  };
}

export function createStages(): BattleFighter["stages"] {
  return {
    attack: 0,
    defense: 0,
    special: 0,
    sp_attack: 0,
    sp_defense: 0,
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
