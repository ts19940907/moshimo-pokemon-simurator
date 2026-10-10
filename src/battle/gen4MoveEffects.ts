/**
 * Gen4 (DPPt / HGSS) move effects and field mechanics.
 * Only active when the rules generation is 4 or later.
 */
import type { Move } from "../pokemon/moves";
import pokemonWeights from "../data/pokemon-weights.json";
import {
  ABILITY,
  abilityBlocksStatDrop,
  abilityBlocksStatus,
  announceAbility,
  forcedGrounded,
  genderRelation,
  hasAbility,
  hasMagicGuard,
  isGrounded,
  simpleStageChange,
} from "./abilityEffects";
import { blockedByProtect } from "./gen2UniqueMoves";
import {
  activeToolPokeapiId,
  consumeHeldTool,
  flingPower,
  heldToolNameJa,
  heldToolPokeapiId,
  naturalGift,
  plateTypeId,
  TOOL_POKEAPI,
} from "./toolEffects";
import { typeEffectivenessForRules } from "./typeEffectiveness";
import type {
  BattleFieldState,
  BattleFighter,
  BattleStatus,
  SideFieldEffects,
  TurnLogLine,
} from "./types";

export const GEN4_MOVE = {
  LOW_KICK: 67,
  ROOST: 355,
  GRAVITY: 356,
  MIRACLE_EYE: 357,
  WAKE_UP_SLAP: 358,
  GYRO_BALL: 360,
  HEALING_WISH: 361,
  BRINE: 362,
  NATURAL_GIFT: 363,
  FEINT: 364,
  PLUCK: 365,
  TAILWIND: 366,
  ACUPRESSURE: 367,
  METAL_BURST: 368,
  U_TURN: 369,
  PAYBACK: 371,
  ASSURANCE: 372,
  EMBARGO: 373,
  FLING: 374,
  PSYCHO_SHIFT: 375,
  TRUMP_CARD: 376,
  HEAL_BLOCK: 377,
  WRING_OUT: 378,
  POWER_TRICK: 379,
  GASTRO_ACID: 380,
  LUCKY_CHANT: 381,
  ME_FIRST: 382,
  COPYCAT: 383,
  POWER_SWAP: 384,
  GUARD_SWAP: 385,
  PUNISHMENT: 386,
  LAST_RESORT: 387,
  WORRY_SEED: 388,
  SUCKER_PUNCH: 389,
  TOXIC_SPIKES: 390,
  HEART_SWAP: 391,
  AQUA_RING: 392,
  MAGNET_RISE: 393,
  GIGA_IMPACT: 416,
  AVALANCHE: 419,
  DEFOG: 432,
  TRICK_ROOM: 433,
  CAPTIVATE: 445,
  STEALTH_ROCK: 446,
  GRASS_KNOT: 447,
  CHATTER: 448,
  JUDGMENT: 449,
  BUG_BITE: 450,
  ROCK_WRECKER: 439,
  ROAR_OF_TIME: 459,
  LUNAR_DANCE: 461,
  CRUSH_GRIP: 462,
  MAGMA_STORM: 463,
  SHADOW_FORCE: 467,
} as const;

const SPIKES_POKEAPI = 191;
const MIST_POKEAPI = 54;
const LIGHT_SCREEN_POKEAPI = 113;
const REFLECT_POKEAPI = 115;
const STRUGGLE_POKEAPI = 165;
const SAND_TOMB_POKEAPI = 328;
const WHIRLPOOL_POKEAPI = 250;
const INSOMNIA = 15;

/** Moves Gravity forbids (Fly, Bounce, Jump Kick, Hi Jump Kick, Splash, Magnet Rise). */
const GRAVITY_BLOCKED_MOVES = new Set([19, 340, 26, 136, 150, GEN4_MOVE.MAGNET_RISE]);

/** Moves that need a recharge turn (Gen4 debut + Gen3 elemental beams). */
const GEN4_RECHARGE_MOVES = new Set([
  307, // Blast Burn
  308, // Hydro Cannon
  338, // Frenzy Plant
  GEN4_MOVE.GIGA_IMPACT,
  GEN4_MOVE.ROCK_WRECKER,
  GEN4_MOVE.ROAR_OF_TIME,
]);

/** Two-turn moves Power Herb can skip. */
const POWER_HERB_CHARGE_MOVES = new Set([13, 19, 76, 91, 130, 143, GEN4_MOVE.SHADOW_FORCE]);

/** Healing moves Heal Block forbids. */
const HEALING_MOVES = new Set([
  105, 135, 156, 208, 234, 235, 236, 256, 273, 303, GEN4_MOVE.ROOST,
  GEN4_MOVE.HEALING_WISH, GEN4_MOVE.LUNAR_DANCE, 456,
]);

const WEIGHTS = pokemonWeights as {
  byDex: Record<string, number>;
  byNameEn: Record<string, number>;
};

export function gen4Rules(rulesGeneration: number): boolean {
  return rulesGeneration >= 4;
}

export function isGen4RechargeMove(move: Move, rulesGeneration: number): boolean {
  return gen4Rules(rulesGeneration) && GEN4_RECHARGE_MOVES.has(move.pokeapi_id);
}

export function isGen4ChargeMove(move: Move, rulesGeneration: number): boolean {
  return gen4Rules(rulesGeneration) && move.pokeapi_id === GEN4_MOVE.SHADOW_FORCE;
}

export function canPowerHerbSkip(move: Move): boolean {
  return POWER_HERB_CHARGE_MOVES.has(move.pokeapi_id);
}

/** Gen2+ binding moves that use the 1/16 end-of-turn residual. */
export function isPartialTrapMove(move: Move, rulesGeneration: number): boolean {
  if (move.pokeapi_id === WHIRLPOOL_POKEAPI) return true;
  if (!gen4Rules(rulesGeneration)) return false;
  return (
    move.pokeapi_id === GEN4_MOVE.MAGMA_STORM || move.pokeapi_id === SAND_TOMB_POKEAPI
  );
}

export function pokemonWeightKg(fighter: BattleFighter): number | null {
  return (
    WEIGHTS.byNameEn[fighter.species.name_en] ??
    WEIGHTS.byDex[String(fighter.species.dex_no)] ??
    null
  );
}

/** Low Kick / Grass Knot (Gen3+): power by the target's weight. */
export function weightBasedPower(weightKg: number): number {
  if (weightKg < 10) return 20;
  if (weightKg < 25) return 40;
  if (weightKg < 50) return 60;
  if (weightKg < 100) return 80;
  if (weightKg < 200) return 100;
  return 120;
}

/** Type / power adjustments as the move is used (Judgment, Natural Gift, Normalize, Chatter). */
export function gen4MoveForUse(
  move: Move,
  attacker: BattleFighter,
  rulesGeneration: number,
): Move {
  if (!gen4Rules(rulesGeneration)) return move;
  let next = move;
  if (move.pokeapi_id === GEN4_MOVE.JUDGMENT) {
    const plate = plateTypeId(activeToolPokeapiId(attacker));
    if (plate != null) next = { ...next, type_id: plate };
  }
  if (move.pokeapi_id === GEN4_MOVE.NATURAL_GIFT) {
    const gift = naturalGift(activeToolPokeapiId(attacker));
    next = gift
      ? { ...next, type_id: gift.typeId, power: gift.power }
      : { ...next, power: null };
  }
  if (move.pokeapi_id === GEN4_MOVE.CHATTER && next.effect_meta) {
    // Gen4: confusion chance depends on the recorded cry; use the typical 10%.
    next = { ...next, effect_meta: { ...next.effect_meta, ailment_chance: 10 } };
  }
  if (
    hasAbility(attacker, ABILITY.NORMALIZE) &&
    move.pokeapi_id !== STRUGGLE_POKEAPI &&
    next.type_id !== 1
  ) {
    next = { ...next, type_id: 1 };
  }
  return next;
}

export type Gen4PowerContext = {
  rulesGeneration: number;
  /** Effective speeds (Gyro Ball). */
  attackerSpeed: number;
  defenderSpeed: number;
  /** PP left after this use (Trump Card); null when unknown. */
  ppAfterUse: number | null;
};

/** Variable base power of Gen4 moves; null = use the move's power. */
export function gen4VariablePower(
  move: Move,
  attacker: BattleFighter,
  defender: BattleFighter,
  ctx: Gen4PowerContext,
): number | null {
  if (!gen4Rules(ctx.rulesGeneration)) return null;
  const base = move.power ?? 0;
  switch (move.pokeapi_id) {
    case GEN4_MOVE.LOW_KICK:
    case GEN4_MOVE.GRASS_KNOT: {
      const kg = pokemonWeightKg(defender);
      return kg != null ? weightBasedPower(kg) : null;
    }
    case GEN4_MOVE.GYRO_BALL:
      return Math.min(
        150,
        Math.floor((25 * ctx.defenderSpeed) / Math.max(1, ctx.attackerSpeed)) + 1,
      );
    case GEN4_MOVE.BRINE:
      return defender.currentHp <= Math.floor(defender.maxHp / 2) ? base * 2 : base;
    case GEN4_MOVE.WAKE_UP_SLAP:
      return defender.status === "sleep" ? base * 2 : base;
    case GEN4_MOVE.PAYBACK:
      return defender.volatiles.movedThisTurn ? base * 2 : base;
    case GEN4_MOVE.ASSURANCE:
      return defender.volatiles.damagedByFoeThisTurn ? base * 2 : base;
    case GEN4_MOVE.AVALANCHE:
      return attacker.volatiles.damagedByFoeThisTurn ? base * 2 : base;
    case GEN4_MOVE.PUNISHMENT: {
      const boosts = Object.values(defender.stages).reduce(
        (sum, s) => sum + Math.max(0, s),
        0,
      );
      return Math.min(200, 60 + 20 * boosts);
    }
    case GEN4_MOVE.WRING_OUT:
    case GEN4_MOVE.CRUSH_GRIP:
      return Math.floor((120 * defender.currentHp) / Math.max(1, defender.maxHp)) + 1;
    case GEN4_MOVE.TRUMP_CARD: {
      const left = ctx.ppAfterUse ?? 4;
      if (left <= 0) return 200;
      if (left === 1) return 80;
      if (left === 2) return 60;
      if (left === 3) return 50;
      return 40;
    }
    case GEN4_MOVE.FLING: {
      const item = activeToolPokeapiId(attacker);
      return item != null ? flingPower(item) : null;
    }
    default:
      return null;
  }
}

/** Gen4 reasons a chosen move cannot be selected (Choice lock, Gravity, Heal Block). */
export function moveSelectionBlockReason(
  fighter: BattleFighter,
  move: Move,
  field?: BattleFieldState | null,
): string | null {
  if (move.pokeapi_id === STRUGGLE_POKEAPI) return null;
  const lock = fighter.volatiles.choiceLockMoveId;
  if (
    lock &&
    lock !== move.id &&
    isChoiceLockedItem(fighter) &&
    fighter.member.moveIds.includes(lock)
  ) {
    return `${heldToolNameJa(fighter.heldTool)}の　効果で　${move.name_ja}は　出せない！`;
  }
  if (field && field.gravityTurns > 0 && GRAVITY_BLOCKED_MOVES.has(move.pokeapi_id)) {
    return `じゅうりょくで　${move.name_ja}が　出せない！`;
  }
  if (fighter.volatiles.healBlockTurns > 0 && HEALING_MOVES.has(move.pokeapi_id)) {
    return `かいふくふうじで　${move.name_ja}が　出せない！`;
  }
  return null;
}

function isChoiceLockedItem(fighter: BattleFighter): boolean {
  const id = activeToolPokeapiId(fighter);
  return (
    id === TOOL_POKEAPI.CHOICE_BAND ||
    id === TOOL_POKEAPI.CHOICE_SPECS ||
    id === TOOL_POKEAPI.CHOICE_SCARF
  );
}

/** After a move begins: Choice lock and the Metronome (item) counter. */
export function noteMoveBegan(attacker: BattleFighter, move: Move): void {
  if (isChoiceLockedItem(attacker) && !attacker.volatiles.choiceLockMoveId) {
    attacker.volatiles.choiceLockMoveId = move.id;
  }
  if (attacker.volatiles.metronomeMoveId === move.id) {
    attacker.volatiles.metronomeCount += 1;
  } else {
    attacker.volatiles.metronomeMoveId = move.id;
    attacker.volatiles.metronomeCount = 0;
  }
  if (!attacker.volatiles.movesUsedIds.includes(move.id)) {
    attacker.volatiles.movesUsedIds = [...attacker.volatiles.movesUsedIds, move.id];
  }
}

function sideLabel(side: "a" | "b"): string {
  return side === "a" ? "サイドA" : "サイドB";
}

const fail = (logs: TurnLogLine[]) => logs.push("しかし　うまく　決まらなかった！");

export type Gen4StatusDeps = {
  rulesGeneration: number;
  /** Accuracy check against the defender (logs a miss itself). */
  hits: () => boolean;
  /** Apply a major status to `target`; returns whether it landed. */
  applyStatus: (
    target: BattleFighter,
    status: Exclude<BattleStatus, null>,
    badlyPoison?: boolean,
  ) => boolean;
  /** The foe's chosen move this turn (Me First / Sucker Punch). */
  foeSelectedMove: Move | null;
  /** Last move used by anyone before this one (Copycat). */
  previousFieldMove: Move | null;
};

export type Gen4StatusResult =
  | { kind: "none" }
  | { kind: "done" }
  /** Execute another move (Copycat / Me First). */
  | { kind: "call"; move: Move; powerMultiplier?: number };

const STAGE_KEYS = [
  "attack",
  "defense",
  "sp_attack",
  "sp_defense",
  "speed",
  "accuracy",
  "evasion",
] as const;

const STAGE_LABEL: Record<(typeof STAGE_KEYS)[number], string> = {
  attack: "こうげき",
  defense: "ぼうぎょ",
  sp_attack: "とくこう",
  sp_defense: "とくぼう",
  speed: "すばやさ",
  accuracy: "めいちゅう率",
  evasion: "かいひ率",
};

function setTimedScreen(
  side: SideFieldEffects,
  kind: "reflect" | "lightScreen" | "mist",
  attacker: BattleFighter,
  logs: TurnLogLine[],
): void {
  const clay = activeToolPokeapiId(attacker) === TOOL_POKEAPI.LIGHT_CLAY;
  const name = attacker.member.nameJa;
  if (kind === "mist") {
    if (side.mist) return void fail(logs);
    side.mist = true;
    side.mistTurns = 5;
    logs.push(`${name}の　周りを　白い霧が　包んだ！`);
    return;
  }
  const turns = clay ? 8 : 5;
  if (kind === "reflect") {
    if (side.reflect) return void fail(logs);
    side.reflect = true;
    side.reflectTurns = turns;
    logs.push(`${name}の　周りに　反射壁が　現れた！`);
    return;
  }
  if (side.lightScreen) return void fail(logs);
  side.lightScreen = true;
  side.lightScreenTurns = turns;
  logs.push(`${name}の　周りに　光の壁が　現れた！`);
}

/**
 * Gen4 status / field moves. Returns `done` when fully handled,
 * `call` to run another move, `none` to fall through to the generic engine.
 */
export function tryExecuteGen4StatusMove(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  field: BattleFieldState,
  logs: TurnLogLine[],
  deps: Gen4StatusDeps,
): Gen4StatusResult {
  if (!gen4Rules(deps.rulesGeneration)) return { kind: "none" };
  const name = attacker.member.nameJa;
  const foeName = defender.member.nameJa;
  const mySide = field[attacker.side];
  const foeSide = field[defender.side];
  const done = (): Gen4StatusResult => {
    attacker.volatiles.lastMoveUsed = move;
    return { kind: "done" };
  };

  switch (move.pokeapi_id) {
    case MIST_POKEAPI:
      setTimedScreen(mySide, "mist", attacker, logs);
      return done();
    case REFLECT_POKEAPI:
      setTimedScreen(mySide, "reflect", attacker, logs);
      return done();
    case LIGHT_SCREEN_POKEAPI:
      setTimedScreen(mySide, "lightScreen", attacker, logs);
      return done();
    case SPIKES_POKEAPI:
      if (foeSide.spikesLayers >= 3) {
        fail(logs);
      } else {
        foeSide.spikesLayers += 1;
        foeSide.spikes = true;
        logs.push(`${sideLabel(defender.side)}の　足元に　まきびしが　散らばった！`);
      }
      return done();
    case GEN4_MOVE.TOXIC_SPIKES:
      if (foeSide.toxicSpikes >= 2) {
        fail(logs);
      } else {
        foeSide.toxicSpikes += 1;
        logs.push(`${sideLabel(defender.side)}の　足元に　どくびしが　散らばった！`);
      }
      return done();
    case GEN4_MOVE.STEALTH_ROCK:
      if (foeSide.stealthRock) {
        fail(logs);
      } else {
        foeSide.stealthRock = true;
        logs.push(`${sideLabel(defender.side)}の　周りに　とがった岩が　ただよい始めた！`);
      }
      return done();
    case GEN4_MOVE.TAILWIND:
      if (mySide.tailwindTurns > 0) {
        fail(logs);
      } else {
        // Gen4: 3 turns including this one.
        mySide.tailwindTurns = 3;
        logs.push(`${sideLabel(attacker.side)}に　追い風が　吹き始めた！`);
      }
      return done();
    case GEN4_MOVE.LUCKY_CHANT:
      if (mySide.luckyChantTurns > 0) {
        fail(logs);
      } else {
        mySide.luckyChantTurns = 5;
        logs.push(`${sideLabel(attacker.side)}は　おまじないで　急所に　当たらなくなった！`);
      }
      return done();
    case GEN4_MOVE.TRICK_ROOM:
      if (field.trickRoomTurns > 0) {
        field.trickRoomTurns = 0;
        logs.push("ゆがんだ　時空が　元に　戻った！");
      } else {
        field.trickRoomTurns = 5;
        logs.push(`${name}は　時空を　ゆがめた！`);
      }
      return done();
    case GEN4_MOVE.GRAVITY:
      if (field.gravityTurns > 0) {
        fail(logs);
      } else {
        field.gravityTurns = 5;
        logs.push("じゅうりょくが　強くなった！");
        for (const f of [attacker, defender]) {
          if (f.volatiles.magnetRiseTurns > 0) f.volatiles.magnetRiseTurns = 0;
          if (f.volatiles.semiInvulnerable === "fly") {
            f.volatiles.semiInvulnerable = null;
            f.volatiles.chargingMove = null;
            logs.push(`${f.member.nameJa}は　じゅうりょくで　落ちてきた！`);
          }
        }
      }
      return done();
    case GEN4_MOVE.ROOST:
      if (attacker.currentHp >= attacker.maxHp) {
        fail(logs);
        return done();
      }
      attacker.currentHp = Math.min(
        attacker.maxHp,
        attacker.currentHp + Math.max(1, Math.floor(attacker.maxHp / 2)),
      );
      attacker.volatiles.roosted = true;
      logs.push(`${name}の　HPが　回復した！`);
      return done();
    case GEN4_MOVE.HEALING_WISH:
    case GEN4_MOVE.LUNAR_DANCE:
      attacker.currentHp = 0;
      mySide.healingWish = true;
      logs.push(
        move.pokeapi_id === GEN4_MOVE.LUNAR_DANCE
          ? `${name}は　みかづきのまいを　舞った！`
          : `${name}は　いやしのねがいを　託した！`,
      );
      return done();
    case GEN4_MOVE.AQUA_RING:
      if (attacker.volatiles.aquaRing) {
        fail(logs);
      } else {
        attacker.volatiles.aquaRing = true;
        logs.push(`${name}は　水の　リングで　身を　包んだ！`);
      }
      return done();
    case GEN4_MOVE.MAGNET_RISE:
      if (attacker.volatiles.magnetRiseTurns > 0 || forcedGrounded(attacker, field)) {
        fail(logs);
      } else {
        attacker.volatiles.magnetRiseTurns = 5;
        logs.push(`${name}は　電磁力で　浮かび上がった！`);
      }
      return done();
    case GEN4_MOVE.ACUPRESSURE: {
      const options = STAGE_KEYS.filter((k) => attacker.stages[k] < 6);
      if (options.length === 0) {
        fail(logs);
        return done();
      }
      const key = options[Math.floor(Math.random() * options.length)]!;
      attacker.stages[key] = Math.min(6, attacker.stages[key] + simpleStageChange(attacker, 2));
      logs.push(`${name}の　${STAGE_LABEL[key]}が　ぐーんと上がった！`);
      return done();
    }
    case GEN4_MOVE.POWER_TRICK: {
      const { attack, defense } = attacker.stats;
      attacker.stats = { ...attacker.stats, attack: defense, defense: attack };
      attacker.volatiles.powerTrick = !attacker.volatiles.powerTrick;
      logs.push(`${name}は　こうげきと　ぼうぎょを　入れ替えた！`);
      return done();
    }
    case GEN4_MOVE.POWER_SWAP:
    case GEN4_MOVE.GUARD_SWAP:
    case GEN4_MOVE.HEART_SWAP: {
      if (blockedByProtect(defender, logs)) return done();
      const keys =
        move.pokeapi_id === GEN4_MOVE.POWER_SWAP
          ? (["attack", "sp_attack"] as const)
          : move.pokeapi_id === GEN4_MOVE.GUARD_SWAP
            ? (["defense", "sp_defense"] as const)
            : STAGE_KEYS;
      for (const k of keys) {
        const mine = attacker.stages[k];
        attacker.stages[k] = defender.stages[k];
        defender.stages[k] = mine;
      }
      logs.push(
        move.pokeapi_id === GEN4_MOVE.POWER_SWAP
          ? `${name}は　相手と　攻撃の　能力変化を　入れ替えた！`
          : move.pokeapi_id === GEN4_MOVE.GUARD_SWAP
            ? `${name}は　相手と　防御の　能力変化を　入れ替えた！`
            : `${name}は　相手と　能力変化を　入れ替えた！`,
      );
      return done();
    }
    case GEN4_MOVE.PSYCHO_SHIFT: {
      if (!deps.hits() || blockedByProtect(defender, logs)) return done();
      const status = attacker.status;
      if (!status || defender.status || defender.volatiles.substituteHp > 0) {
        fail(logs);
        return done();
      }
      const toxic = status === "poison" && attacker.volatiles.toxic;
      if (!deps.applyStatus(defender, status, toxic)) return done();
      attacker.status = null;
      attacker.sleepTurns = 0;
      attacker.volatiles.toxic = false;
      logs.push(`${name}の　状態異常が　治った！`);
      return done();
    }
    case GEN4_MOVE.WORRY_SEED: {
      if (!deps.hits() || blockedByProtect(defender, logs)) return done();
      if (
        hasAbility(defender, ABILITY.TRUANT) ||
        hasAbility(defender, ABILITY.MULTITYPE) ||
        hasAbility(defender, ABILITY.INSOMNIA)
      ) {
        fail(logs);
        return done();
      }
      defender.abilityPokeapiId = INSOMNIA;
      defender.abilityNameJa = "ふみん";
      logs.push(`${foeName}は　ふみんに　なった！`);
      if (defender.status === "sleep") {
        defender.status = null;
        defender.sleepTurns = 0;
        logs.push(`${foeName}は　目を　覚ました！`);
      }
      return done();
    }
    case GEN4_MOVE.GASTRO_ACID:
      if (!deps.hits() || blockedByProtect(defender, logs)) return done();
      // Mold Breaker may have nulled the id temporarily; the name marks a real ability.
      if (hasAbility(defender, ABILITY.MULTITYPE) || defender.abilityNameJa == null) {
        fail(logs);
        return done();
      }
      defender.abilityPokeapiId = null;
      defender.abilityNameJa = null;
      logs.push(`${foeName}の　特性が　消された！`);
      return done();
    case GEN4_MOVE.EMBARGO:
      if (!deps.hits() || blockedByProtect(defender, logs)) return done();
      if (defender.volatiles.embargoTurns > 0) {
        fail(logs);
      } else {
        defender.volatiles.embargoTurns = 5;
        logs.push(`${foeName}は　どうぐが　使えなくなった！`);
      }
      return done();
    case GEN4_MOVE.HEAL_BLOCK:
      if (!deps.hits() || blockedByProtect(defender, logs)) return done();
      if (defender.volatiles.healBlockTurns > 0) {
        fail(logs);
      } else {
        defender.volatiles.healBlockTurns = 5;
        logs.push(`${foeName}は　回復が　できなくなった！`);
      }
      return done();
    case GEN4_MOVE.MIRACLE_EYE:
      if (blockedByProtect(defender, logs)) return done();
      defender.volatiles.miracleEye = true;
      logs.push(`${name}は　${foeName}の　正体を　見破った！`);
      return done();
    case GEN4_MOVE.CAPTIVATE:
      if (genderRelation(attacker, defender) !== "opposite") {
        fail(logs);
        return done();
      }
      return { kind: "none" };
    case GEN4_MOVE.DEFOG: {
      if (blockedByProtect(defender, logs)) return done();
      if (foeSide.mist) {
        logs.push(`${foeName}は　白い霧に　守られている！`);
      } else if (abilityBlocksStatDrop(defender, "evasion", -1)) {
        logs.push(announceAbility(defender));
        logs.push(`${foeName}の　能力は　下がらない！`);
      } else if (defender.stages.evasion > -6) {
        defender.stages.evasion = Math.max(
          -6,
          defender.stages.evasion + simpleStageChange(defender, -1),
        );
        logs.push(`${foeName}の　かいひ率が　下がった！`);
      }
      const hadHazards =
        foeSide.reflect ||
        foeSide.lightScreen ||
        foeSide.safeguardTurns > 0 ||
        foeSide.mist ||
        foeSide.spikesLayers > 0 ||
        foeSide.spikes ||
        foeSide.toxicSpikes > 0 ||
        foeSide.stealthRock;
      Object.assign(foeSide, {
        reflect: false,
        reflectTurns: 0,
        lightScreen: false,
        lightScreenTurns: 0,
        safeguardTurns: 0,
        mist: false,
        mistTurns: 0,
        spikes: false,
        spikesLayers: 0,
        toxicSpikes: 0,
        stealthRock: false,
      } satisfies Partial<SideFieldEffects>);
      if (hadHazards) logs.push(`${sideLabel(defender.side)}の　場の　効果が　吹き飛んだ！`);
      return done();
    }
    case GEN4_MOVE.COPYCAT: {
      const copied = deps.previousFieldMove;
      attacker.volatiles.lastMoveUsed = move;
      if (!copied || copied.pokeapi_id === GEN4_MOVE.COPYCAT || copied.pokeapi_id === STRUGGLE_POKEAPI) {
        fail(logs);
        return { kind: "done" };
      }
      return { kind: "call", move: copied };
    }
    case GEN4_MOVE.ME_FIRST: {
      const foeMove = deps.foeSelectedMove;
      attacker.volatiles.lastMoveUsed = move;
      if (
        defender.volatiles.movedThisTurn ||
        !foeMove ||
        foeMove.damage_class === "status" ||
        foeMove.pokeapi_id === GEN4_MOVE.ME_FIRST ||
        foeMove.pokeapi_id === STRUGGLE_POKEAPI
      ) {
        fail(logs);
        return { kind: "done" };
      }
      return { kind: "call", move: foeMove, powerMultiplier: 1.5 };
    }
    default:
      return { kind: "none" };
  }
}

/**
 * Pre-damage failure checks for Gen4 damaging moves.
 * Returns true when the move failed (logs included).
 */
export function gen4DamageMoveFails(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
  rulesGeneration: number,
  foeSelectedMove: Move | null,
): boolean {
  if (!gen4Rules(rulesGeneration)) return false;
  switch (move.pokeapi_id) {
    case GEN4_MOVE.SUCKER_PUNCH:
      if (
        defender.volatiles.movedThisTurn ||
        !foeSelectedMove ||
        foeSelectedMove.damage_class === "status"
      ) {
        fail(logs);
        return true;
      }
      return false;
    case GEN4_MOVE.FEINT:
      // Gen4: only works against Protect / Detect.
      if (defender.volatiles.protection !== "protect") {
        fail(logs);
        return true;
      }
      return false;
    case GEN4_MOVE.LAST_RESORT: {
      const others = attacker.volatiles.knownMoves.filter(
        (m) => m.pokeapi_id !== GEN4_MOVE.LAST_RESORT,
      );
      const used = new Set(attacker.volatiles.movesUsedIds);
      if (others.length === 0 || others.some((m) => !used.has(m.id))) {
        fail(logs);
        return true;
      }
      return false;
    }
    case GEN4_MOVE.FLING: {
      const item = activeToolPokeapiId(attacker);
      if (item == null || flingPower(item) == null) {
        fail(logs);
        return true;
      }
      return false;
    }
    case GEN4_MOVE.NATURAL_GIFT:
      if (naturalGift(activeToolPokeapiId(attacker)) == null) {
        fail(logs);
        return true;
      }
      return false;
    case GEN4_MOVE.METAL_BURST:
      if (attacker.volatiles.lastDamageTaken <= 0) {
        fail(logs);
        return true;
      }
      return false;
    default:
      return false;
  }
}

/** Feint / Shadow Force lift Protect / Detect before hitting. */
export function breaksProtect(move: Move, defender: BattleFighter, logs: TurnLogLine[]): void {
  if (
    move.pokeapi_id !== GEN4_MOVE.FEINT &&
    move.pokeapi_id !== GEN4_MOVE.SHADOW_FORCE
  ) {
    return;
  }
  if (defender.volatiles.protection !== "protect") return;
  defender.volatiles.protection = null;
  logs.push(`${defender.member.nameJa}の　守りを　崩した！`);
}

/** Effects after a Gen4 damaging move hits (U-turn, Pluck, Fling, Natural Gift, Wake-Up Slap). */
export function applyGen4AfterHit(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  dealt: number,
  logs: TurnLogLine[],
  rulesGeneration: number,
  eatBerry: (eater: BattleFighter, berryId: number) => void,
): { selfSwitch: boolean } {
  if (!gen4Rules(rulesGeneration) || dealt <= 0) return { selfSwitch: false };
  switch (move.pokeapi_id) {
    case GEN4_MOVE.WAKE_UP_SLAP:
      if (defender.status === "sleep" && defender.currentHp > 0) {
        defender.status = null;
        defender.sleepTurns = 0;
        logs.push(`${defender.member.nameJa}は　目を　覚ました！`);
      }
      break;
    case GEN4_MOVE.PLUCK:
    case GEN4_MOVE.BUG_BITE: {
      const berry = heldToolPokeapiId(defender);
      if (
        berry != null &&
        naturalGift(berry) != null &&
        !hasAbility(defender, ABILITY.STICKY_HOLD) &&
        defender.volatiles.substituteHp <= 0
      ) {
        logs.push(
          `${attacker.member.nameJa}は　${defender.member.nameJa}の　${heldToolNameJa(defender.heldTool)}を　食べた！`,
        );
        consumeHeldTool(defender);
        eatBerry(attacker, berry);
      }
      break;
    }
    case GEN4_MOVE.FLING:
    case GEN4_MOVE.NATURAL_GIFT:
      consumeHeldTool(attacker);
      break;
    case GEN4_MOVE.U_TURN:
      if (attacker.currentHp > 0) return { selfSwitch: true };
      break;
    default:
      break;
  }
  return { selfSwitch: false };
}

/** Fling side effects by item (status / flinch). */
export function flingSecondary(
  itemPokeapiId: number | null,
): { ailment?: Exclude<BattleStatus, null>; toxic?: boolean; flinch?: boolean } {
  switch (itemPokeapiId) {
    case TOOL_POKEAPI.FLAME_ORB:
      return { ailment: "burn" };
    case TOOL_POKEAPI.TOXIC_ORB:
      return { ailment: "poison", toxic: true };
    case TOOL_POKEAPI.LIGHT_BALL:
      return { ailment: "paralysis" };
    case 222: // Poison Barb
      return { ailment: "poison" };
    case TOOL_POKEAPI.KINGS_ROCK:
    case TOOL_POKEAPI.RAZOR_FANG:
      return { flinch: true };
    default:
      return {};
  }
}

/** Gen4 entry hazards and Healing Wish, in order. */
export function applyGen4EntryEffects(
  fighter: BattleFighter,
  field: BattleFieldState,
  logs: TurnLogLine[],
  applyStatus: (target: BattleFighter, status: "poison", badlyPoison: boolean) => boolean,
): void {
  const side = field[fighter.side];
  const name = fighter.member.nameJa;
  const hurt = (amount: number, message: string) => {
    if (fighter.currentHp <= 0 || amount <= 0) return;
    fighter.currentHp = Math.max(0, fighter.currentHp - Math.max(1, amount));
    logs.push(message);
  };
  if (!hasMagicGuard(fighter)) {
    if (side.stealthRock) {
      const eff = typeEffectivenessForRules(
        fighter.rulesGeneration,
        13,
        fighter.battleType1,
        fighter.battleType2,
      );
      hurt(
        Math.floor((fighter.maxHp * eff) / 8),
        `${name}に　とがった岩が　食い込んだ！`,
      );
    }
    if (side.spikesLayers > 0 && isGrounded(fighter, field)) {
      const denom = side.spikesLayers >= 3 ? 4 : side.spikesLayers === 2 ? 6 : 8;
      hurt(Math.floor(fighter.maxHp / denom), `${name}は　まきびしで　ダメージを　受けた！`);
    }
  }
  if (side.toxicSpikes > 0 && fighter.currentHp > 0 && isGrounded(fighter, field)) {
    const poisonType = fighter.battleType1 === 8 || fighter.battleType2 === 8;
    if (poisonType) {
      side.toxicSpikes = 0;
      logs.push(`${name}は　どくびしを　取り除いた！`);
    } else if (!fighter.status && !abilityBlocksStatus(fighter, "poison")) {
      applyStatus(fighter, "poison", side.toxicSpikes >= 2);
    }
  }
  if (side.healingWish && fighter.currentHp > 0) {
    side.healingWish = false;
    fighter.currentHp = fighter.maxHp;
    fighter.status = null;
    fighter.sleepTurns = 0;
    fighter.volatiles.toxic = false;
    logs.push(`${name}は　ねがいを　受け取って　元気に　なった！`);
  }
}

/** Gen4 Rapid Spin also clears Stealth Rock / Toxic Spikes / Spikes layers. */
export function clearGen4Hazards(side: SideFieldEffects): boolean {
  const had = side.stealthRock || side.toxicSpikes > 0 || side.spikesLayers > 0;
  side.stealthRock = false;
  side.toxicSpikes = 0;
  side.spikesLayers = 0;
  return had;
}

/** End-of-turn per-fighter Gen4 effects (Aqua Ring, orbs, Sticky Barb, counters). */
export function applyGen4EndOfTurnFighter(
  fighter: BattleFighter,
  logs: TurnLogLine[],
  applyStatus: (
    target: BattleFighter,
    status: "burn" | "poison",
    badlyPoison: boolean,
  ) => boolean,
): void {
  const v = fighter.volatiles;
  const name = fighter.member.nameJa;
  if (fighter.currentHp > 0) {
    if (v.aquaRing && fighter.currentHp < fighter.maxHp && v.healBlockTurns <= 0) {
      let heal = Math.max(1, Math.floor(fighter.maxHp / 16));
      if (activeToolPokeapiId(fighter) === TOOL_POKEAPI.BIG_ROOT) {
        heal = Math.floor(heal * 1.3);
      }
      fighter.currentHp = Math.min(fighter.maxHp, fighter.currentHp + heal);
      logs.push(`${name}は　水の　リングで　HPを　回復した！`);
    }
    const tool = activeToolPokeapiId(fighter);
    const orb =
      tool === TOOL_POKEAPI.TOXIC_ORB
        ? ({ status: "poison", toxic: true } as const)
        : tool === TOOL_POKEAPI.FLAME_ORB
          ? ({ status: "burn", toxic: false } as const)
          : null;
    if (orb && !fighter.status) {
      logs.push(`${name}の　${heldToolNameJa(fighter.heldTool)}が　発動した！`);
      if (!applyStatus(fighter, orb.status, orb.toxic)) logs.pop();
    } else if (tool === TOOL_POKEAPI.STICKY_BARB && !hasMagicGuard(fighter)) {
      fighter.currentHp = Math.max(
        0,
        fighter.currentHp - Math.max(1, Math.floor(fighter.maxHp / 8)),
      );
      logs.push(`${name}は　くっつきバリで　ダメージを　受けた！`);
    }
  }
  const countDown = (
    key: "magnetRiseTurns" | "embargoTurns" | "healBlockTurns",
    endMessage: string,
  ) => {
    if (v[key] <= 0) return;
    v[key] -= 1;
    if (v[key] === 0 && fighter.currentHp > 0) logs.push(endMessage);
  };
  countDown("magnetRiseTurns", `${name}の　電磁浮遊が　なくなった！`);
  countDown("embargoTurns", `${name}は　どうぐが　使えるように　なった！`);
  countDown("healBlockTurns", `${name}の　かいふくふうじが　解けた！`);
  v.roosted = false;
}

/** End-of-turn countdown for Gen4 side / field timers. */
export function tickGen4Field(field: BattleFieldState, logs: TurnLogLine[]): void {
  for (const side of ["a", "b"] as const) {
    const f = field[side];
    const label = sideLabel(side);
    const tick = (
      key: "reflectTurns" | "lightScreenTurns" | "mistTurns" | "tailwindTurns" | "luckyChantTurns",
      onEnd: () => void,
    ) => {
      if (f[key] <= 0) return;
      f[key] -= 1;
      if (f[key] === 0) onEnd();
    };
    tick("reflectTurns", () => {
      f.reflect = false;
      logs.push(`${label}の　リフレクターが　消えた！`);
    });
    tick("lightScreenTurns", () => {
      f.lightScreen = false;
      logs.push(`${label}の　ひかりのかべが　消えた！`);
    });
    tick("mistTurns", () => {
      f.mist = false;
      logs.push(`${label}の　しろいきりが　消えた！`);
    });
    tick("tailwindTurns", () => logs.push(`${label}の　追い風が　止んだ！`));
    tick("luckyChantTurns", () => logs.push(`${label}の　おまじないが　解けた！`));
  }
  if (field.trickRoomTurns > 0) {
    field.trickRoomTurns -= 1;
    if (field.trickRoomTurns === 0) logs.push("ゆがんだ　時空が　元に　戻った！");
  }
  if (field.gravityTurns > 0) {
    field.gravityTurns -= 1;
    if (field.gravityTurns === 0) logs.push("じゅうりょくが　元に　戻った！");
  }
}

/** Gen4 weather moves last 5 turns (8 with the matching rock). */
export function gen4WeatherTurns(
  attacker: BattleFighter,
  weatherId: string,
): number {
  const tool = activeToolPokeapiId(attacker);
  const rock =
    (weatherId === "rain" && tool === TOOL_POKEAPI.DAMP_ROCK) ||
    (weatherId === "sun" && tool === TOOL_POKEAPI.HEAT_ROCK) ||
    (weatherId === "sand" && tool === TOOL_POKEAPI.SMOOTH_ROCK) ||
    (weatherId === "hail" && tool === TOOL_POKEAPI.ICY_ROCK);
  return rock ? 8 : 5;
}

export function isHealingMove(move: Move): boolean {
  return HEALING_MOVES.has(move.pokeapi_id);
}
