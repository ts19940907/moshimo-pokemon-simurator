import type { PartySide } from "../party/types";
import type { Move, MoveEffectMeta } from "../pokemon/moves";
import { EMPTY_EFFECT_META } from "../pokemon/moves";
import { usesSplitSpecial } from "../pokemon/baseStatFilters";
import { applyMoveTypeForGeneration } from "../pokemon/moveTypeByGeneration";
import {
  applyDamageRoll,
  damageBeforeRandom,
  fixedDamageRange,
} from "./calcDamage";
import { GEN1_MOVE_POOL, pickMetronomeMove } from "./gen1MovePool";
import { typeEffectivenessForRules } from "./typeEffectiveness";
import {
  heldItemAccuracyFactor,
  heldItemCritDenomModifier,
  processLeftovers,
  rollFocusBandSurvival,
  rollKingsRockFlinch,
  rollQuickClaw,
  TOOL_POKEAPI,
  tryHpThresholdBerry,
  tryStatusCureBerry,
} from "./toolEffects";
import {
  applyItemMoveAfterHit,
  ITEM_MOVE_POKEAPI,
  tryExecuteTrick,
} from "./itemTransferMoves";
import { moveForUse } from "./moveVariants";
import {
  createStages,
  createVolatiles,
  stagedStat,
  type BattleAction,
  type BattleFieldState,
  type BattleFighter,
  type BattleStatus,
  type SideFieldEffects,
  type TurnLogLine,
  type TurnStep,
} from "./types";
import {
  resolveVariableMovePower,
  tryExecuteAttract,
  tryExecuteBatonPass,
  tryExecuteDestinyBond,
  tryExecuteForesight,
  tryExecuteNightmare,
  tryExecutePainSplit,
  tryExecutePerishSong,
  tryExecutePsychUp,
  tryExecuteSpite,
  tryExecuteSureHit,
  tryExecuteTrapPreventEscape,
} from "./gen2MoveEffects";
import {
  applyCurseResidual,
  applyEndureIfNeeded,
  applyHailResidual,
  applySandstormResidual,
  blockedByProtect,
  safeguardBlocksStatus,
  tickSafeguard,
  tryExecuteBellyDrum,
  tryExecuteCurse,
  tryExecuteHealBell,
  tryExecuteProtectFamily,
  tryExecuteSafeguard,
  tryExecuteSpikes,
  tryExecuteSwagger,
} from "./gen2UniqueMoves";
import {
  setWeather,
  tickWeather,
  weatherAdjustedAccuracy,
  weatherGuaranteesHit,
  weatherHealAmount,
  weatherIdFromMovePokeapi,
  weatherSkipsSolarBeamCharge,
} from "./weather";
import {
  abilitiesEnabled,
  abilityBlocksCrit,
  abilityBlocksFlinch,
  abilityBlocksStatDrop,
  abilityBlocksStatus,
  abilityDamageMultiplier,
  abilityFieldsForBuild,
  abilitySpeedMultiplier,
  announceAbility,
  applyColorChange,
  applyEndOfTurnAbilities,
  applySynchronize,
  dampBlocksMove,
  earlyBirdSleepTurns,
  effectiveWeatherId,
  fighterTypes,
  gutsIgnoresBurnAttackHalving,
  hasAbility,
  isSoundMove,
  levitateBlocksGround,
  liquidOozeOnDrain,
  modifyAccuracyForAbilities,
  onContactAbilityEffects,
  pressureExtraPp,
  refreshForecastForms,
  rockHeadPreventsRecoil,
  secondaryChanceMultiplier,
  shieldDustBlocksSecondary,
  sturdyBlocksOhko,
  toggleTruantAfterAction,
  toggleTruantAtEndOfTurn,
  truantTogglesAtEndOfTurn,
  truantBlocksAction,
  tryAbsorbMove,
  wonderGuardBlocks,
  ABILITY,
  blocksForcedSwitch,
} from "./abilityEffects";

export {
  applyNaturalCureOnSwitchOut,
  applySwitchInAbilities,
  canSwitchAway,
  markTruantSwitchIn,
  switchBlockedLogs,
  blocksForcedSwitch,
  abilitiesEnabled,
} from "./abilityEffects";

function typeThatResists(
  moveTypeId: number,
  rulesGeneration: number,
): number {
  for (let t = 1; t <= 17; t += 1) {
    if (
      typeEffectivenessForRules(rulesGeneration, moveTypeId, t, 0) < 1
    ) {
      return t;
    }
  }
  return 1;
}

function foresightTypeEffectiveness(
  move: Move,
  defender: BattleFighter,
  rulesGeneration: number,
): number {
  const types = fighterTypes(defender);
  let typeEff = typeEffectivenessForRules(
    rulesGeneration,
    move.type_id,
    types.type1,
    types.type2,
  );
  if (levitateBlocksGround(defender, move.type_id)) {
    return 0;
  }
  if (
    defender.volatiles.foresight &&
    typeEff === 0 &&
    (move.type_id === 1 || move.type_id === 7) &&
    (types.type1 === 14 || types.type2 === 14)
  ) {
    typeEff = 1;
  }
  return typeEff;
}

function logNoEffect(
  defender: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
): void {
  if (levitateBlocksGround(defender, move.type_id)) {
    logs.push(announceAbility(defender));
  }
  logs.push(`${defender.member.nameJa}には　効果がないようだ…`);
}

type ExecCtx = {
  forceSwitchSide: PartySide | null;
};


type StageKey = keyof BattleFighter["stages"];

function metaOf(move: Move): MoveEffectMeta {
  const base = move.effect_meta ?? EMPTY_EFFECT_META;
  // Prefer seeded Gen1 meta when DB row is missing multi-hit / turn fields
  if (
    (base.min_hits == null || base.max_hits == null) &&
    move.pokeapi_id > 0
  ) {
    const seeded = GEN1_MOVE_POOL.find((m) => m.pokeapi_id === move.pokeapi_id);
    if (seeded?.effect_meta) {
      return {
        ...EMPTY_EFFECT_META,
        ...seeded.effect_meta,
        ...base,
        min_hits: base.min_hits ?? seeded.effect_meta.min_hits,
        max_hits: base.max_hits ?? seeded.effect_meta.max_hits,
        min_turns: base.min_turns ?? seeded.effect_meta.min_turns,
        max_turns: base.max_turns ?? seeded.effect_meta.max_turns,
        stat_changes: base.stat_changes?.length
          ? base.stat_changes
          : seeded.effect_meta.stat_changes ?? [],
      };
    }
  }
  return base;
}

function randInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function chance(percent: number): boolean {
  if (percent <= 0) return false;
  return randInt(1, 100) <= percent;
}

function rollHits(meta: MoveEffectMeta): number {
  if (meta.min_hits == null || meta.max_hits == null) return 1;
  if (meta.min_hits === meta.max_hits) return meta.min_hits;
  // Gen1 multi-hit distribution approx: 2,3 = 37.5%; 4,5 = 12.5% when 2-5
  if (meta.min_hits === 2 && meta.max_hits === 5) {
    const r = randInt(0, 7);
    if (r < 3) return 2;
    if (r < 6) return 3;
    if (r < 7) return 4;
    return 5;
  }
  return randInt(meta.min_hits, meta.max_hits);
}

function rollTrapTurns(meta: MoveEffectMeta): number {
  const min = meta.min_turns ?? 2;
  const max = meta.max_turns ?? 5;
  if (min === 2 && max === 5) {
    const r = randInt(0, 7);
    if (r < 3) return 2;
    if (r < 6) return 3;
    if (r < 7) return 4;
    return 5;
  }
  return randInt(min, max);
}

/** Gen2 crit chance (/256) by stage: 0 → 17, +1 → 32, +2 → 64, +3 → 85, +4 → 128. */
const GEN2_CRIT_CHANCE = [17, 32, 64, 85, 128];

/**
 * Gen2 crit stage: high-crit move +1, Focus Energy +1, Scope Lens +1,
 * Lucky Punch (Chansey) / Stick (Farfetch'd) +2.
 */
function gen2CritStage(attacker: BattleFighter, move: Move): number {
  let stage = 0;
  if ((metaOf(move).crit_rate ?? 0) > 0) stage += 1;
  if (attacker.volatiles.focusEnergy) stage += 1;
  const toolId =
    attacker.heldTool && !attacker.heldTool.consumed
      ? attacker.heldTool.pokeapiId
      : null;
  if (toolId === TOOL_POKEAPI.SCOPE_LENS) stage += 1;
  if (toolId === TOOL_POKEAPI.LUCKY_PUNCH && attacker.species.dex_no === 113) stage += 2;
  if (toolId === TOOL_POKEAPI.LEEK && attacker.species.dex_no === 83) stage += 2;
  return Math.min(stage, GEN2_CRIT_CHANCE.length - 1);
}

/** Gen3 crit chance (1/n) by stage: 1/16, 1/8, 1/4, 1/3, 1/2. */
const GEN3_CRIT_DENOM = [16, 8, 4, 3, 2];

function rollsCrit(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  rulesGeneration = 1,
): boolean {
  if (abilityBlocksCrit(defender)) return false;
  if (rulesGeneration >= 3) {
    return randInt(1, GEN3_CRIT_DENOM[gen2CritStage(attacker, move)]!) === 1;
  }
  if (rulesGeneration >= 2) {
    return randInt(0, 255) < GEN2_CRIT_CHANCE[gen2CritStage(attacker, move)]!;
  }
  return rollsGen1Crit(attacker, move);
}

/** Gen1 crit: high-crit moves use /64, else /512; Focus Energy quarters (cart glitch). */
function rollsGen1Crit(attacker: BattleFighter, move: Move): boolean {
  const baseSpeed = attacker.species.base_speed;
  let highCrit = (metaOf(move).crit_rate ?? 0) > 0;
  let denom = highCrit ? 64 : 512;
  if (attacker.volatiles.focusEnergy) denom *= 4;
  const toolId =
    attacker.heldTool && !attacker.heldTool.consumed
      ? attacker.heldTool.pokeapiId
      : null;
  const critMod = heldItemCritDenomModifier(attacker, toolId, highCrit);
  highCrit = critMod.highCrit;
  if (critMod.highCrit) denom = 64;
  denom = Math.max(1, Math.floor(denom / critMod.denomFactor));
  const threshold = Math.min(255, Math.floor((baseSpeed * 100) / denom));
  return randInt(0, 255) < threshold;
}

function noteHpDamage(
  target: BattleFighter,
  dealt: number,
  move: Move | undefined,
  logs?: TurnLogLine[],
): void {
  if (dealt <= 0) return;
  if (target.volatiles.bideTurnsLeft > 0) {
    target.volatiles.bideDamage += dealt;
  }
  if (target.volatiles.rageActive) {
    const before = target.stages.attack;
    if (before < 6) {
      target.stages.attack = before + 1;
      logs?.push(
        `${target.member.nameJa}の　いかりで　こうげきが　上がった！`,
      );
    }
  }
  // Gen1 Counter: store damage from physical moves (Attack/Defense category).
  // Cartridge limited to Normal/Fighting; we accept all physical damage_class.
  if (move && move.damage_class === "physical") {
    target.volatiles.physicalDamageTakenThisTurn += dealt;
  }
  if (move && move.damage_class === "special") {
    target.volatiles.specialDamageTakenThisTurn += dealt;
  }
}

function applyDamage(
  target: BattleFighter,
  amount: number,
  opts?: { move?: Move; logs?: TurnLogLine[] },
): { dealt: number; brokeSub: boolean } {
  if (amount <= 0) return { dealt: 0, brokeSub: false };
  if (target.volatiles.protection === "protect") {
    opts?.logs?.push(`${target.member.nameJa}は　攻撃を　守った！`);
    return { dealt: 0, brokeSub: false };
  }
  if (target.volatiles.substituteHp > 0) {
    const sub = target.volatiles.substituteHp;
    if (amount >= sub) {
      target.volatiles.substituteHp = 0;
      return { dealt: sub, brokeSub: true };
    }
    target.volatiles.substituteHp = sub - amount;
    return { dealt: amount, brokeSub: false };
  }
  const before = target.currentHp;
  let nextHp = Math.max(0, target.currentHp - amount);
  nextHp = applyEndureIfNeeded(target, nextHp, opts?.logs);
  const toolId =
    target.heldTool && !target.heldTool.consumed
      ? target.heldTool.pokeapiId
      : null;
  if (nextHp <= 0 && toolId != null && rollFocusBandSurvival(toolId)) {
    nextHp = 1;
    opts?.logs?.push(
      `${target.member.nameJa}は　きあいのハチマキで　耐えた！`,
    );
  }
  target.currentHp = nextHp;
  const dealt = before - target.currentHp;
  // HP berries are applied by the caller after the damage beat is emitted,
  // so the UI can show HP drop then heal.
  noteHpDamage(target, dealt, opts?.move, opts?.logs);
  return { dealt, brokeSub: false };
}

function specialAttackStage(
  fighter: BattleFighter,
  rulesGeneration: number,
): number {
  return usesSplitSpecial(rulesGeneration)
    ? fighter.stages.sp_attack
    : fighter.stages.special;
}

function specialDefenseStage(
  fighter: BattleFighter,
  rulesGeneration: number,
): number {
  return usesSplitSpecial(rulesGeneration)
    ? fighter.stages.sp_defense
    : fighter.stages.special;
}

function calcDamage(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  crit: boolean,
  defenderField: SideFieldEffects,
  weatherId: string | null,
  rulesGeneration: number,
): number {
  const defTypes = fighterTypes(defender);
  const atkTypes = fighterTypes(attacker);
  const { damage: before } = damageBeforeRandom(
    {
      attackerLevel: attacker.member.level,
      attackerSpecies: {
        ...attacker.species,
        type1: atkTypes.type1,
        type2: atkTypes.type2,
      },
      attackerStats: attacker.stats,
      attackerAttackStage: attacker.stages.attack,
      attackerSpecialStage: specialAttackStage(attacker, rulesGeneration),
      defenderSpecies: {
        ...defender.species,
        type1: defTypes.type1,
        type2: defTypes.type2,
      },
      defenderStats: defender.stats,
      defenderDefenseStage: defender.stages.defense,
      defenderSpecialStage: specialDefenseStage(defender, rulesGeneration),
    },
    move,
    {
      crit,
      attackerBurn:
        attacker.status === "burn" && !gutsIgnoresBurnAttackHalving(attacker),
      defenderReflect: defenderField.reflect,
      defenderLightScreen: defenderField.lightScreen,
      weatherId,
      attackerItemPokeapiId:
        attacker.heldTool && !attacker.heldTool.consumed
          ? attacker.heldTool.pokeapiId
          : null,
      attackerAbilityId: attacker.abilityPokeapiId != null
        ? String(attacker.abilityPokeapiId)
        : null,
      defenderAbilityId: defender.abilityPokeapiId != null
        ? String(defender.abilityPokeapiId)
        : null,
      rulesGeneration,
      abilityDamageMult: abilityDamageMultiplier(attacker, defender, move),
    },
  );
  if (before <= 0) return 0;
  return applyDamageRoll(before, randInt(217, 255));
}

function fixedDamage(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
): number | null {
  const range = fixedDamageRange(
    move,
    attacker.member.level,
    defender.currentHp,
  );
  if (!range) return null;
  if (range.min === range.max) return range.min;
  return randInt(range.min, range.max);
}

function partialTrapStartMessage(move: Move, target: string, user: string): string {
  switch (move.pokeapi_id) {
    case 35: // Wrap
      return `${target}は　${user}に　まきつかれた！`;
    case 83: // Fire Spin
      return `${target}は　ほのおのうずに　とじこめられた！`;
    case 128: // Clamp
      return `${target}は　${user}に　はさまれた！`;
    case 250: // Whirlpool
      return `${target}は　うずしおに　とじこめられた！`;
    default:
      return `${target}は　${user}に　しめつけられた！`;
  }
}

/** Gen2 binding residual: 1/16 each end of turn; ends when turns run out or the user leaves. */
function applyPartialTrapResidual(
  trapped: BattleFighter,
  binder: BattleFighter,
  logs: TurnLogLine[],
): void {
  const trap = trapped.volatiles.partialTrap;
  if (!trap || trapped.currentHp <= 0) return;
  if (binder.currentHp <= 0) {
    trapped.volatiles.partialTrap = null;
    return;
  }
  trap.turnsLeft -= 1;
  if (trap.turnsLeft <= 0) {
    trapped.volatiles.partialTrap = null;
    logs.push(`${trapped.member.nameJa}は　${trap.moveNameJa}から　解放された！`);
    return;
  }
  const dmg = Math.max(1, Math.floor(trapped.maxHp / 16));
  trapped.currentHp = Math.max(0, trapped.currentHp - dmg);
  logs.push(`${trapped.member.nameJa}は　${trap.moveNameJa}の　ダメージを　受けている！`);
}

const HITS_FLYING_POKEAPI = new Set([16, 239, 87]); // Gust, Twister, Thunder
const HITS_DIGGING_POKEAPI = new Set([89, 222]); // Earthquake, Magnitude
const DOUBLED_VS_SEMI_INVULNERABLE_POKEAPI = new Set([16, 239, 89, 222]);

function hitsSemiInvulnerable(move: Move, state: "fly" | "dig"): boolean {
  return state === "fly"
    ? HITS_FLYING_POKEAPI.has(move.pokeapi_id)
    : HITS_DIGGING_POKEAPI.has(move.pokeapi_id);
}

/** Gen2: Gust / Twister double on a flying target, Earthquake / Magnitude on a digging one. */
function semiInvulnerablePowerMultiplier(
  move: Move,
  defender: BattleFighter,
  rulesGeneration: number,
): number {
  const state = defender.volatiles.semiInvulnerable;
  if (rulesGeneration < 2 || !state) return 1;
  return hitsSemiInvulnerable(move, state) &&
    DOUBLED_VS_SEMI_INVULNERABLE_POKEAPI.has(move.pokeapi_id)
    ? 2
    : 1;
}

const THUNDER_WAVE_POKEAPI = 86;
const RAPID_SPIN_POKEAPI = 229;
const TOXIC_POKEAPI = 92;

/** Gen1: a damaging move's status secondary cannot affect a target sharing the move's type. */
function secondaryBlockedBySameType(
  move: Move,
  target: BattleFighter,
  ailment: string,
  rulesGeneration: number,
): boolean {
  if (rulesGeneration > 1) return false;
  if (
    ailment !== "paralysis" &&
    ailment !== "burn" &&
    ailment !== "freeze" &&
    ailment !== "poison"
  ) {
    return false;
  }
  return (
    target.species.type1 === move.type_id || target.species.type2 === move.type_id
  );
}

function canStatus(
  target: BattleFighter,
  ailment: string,
  weatherId: string | null = null,
  field?: BattleFieldState,
  rulesGeneration = 1,
): boolean {
  // Gen1: major status cannot be overwritten (Rest is the exception, handled separately).
  if (target.status) return false;
  if (field && safeguardBlocksStatus(field, target)) return false;
  if (abilityBlocksStatus(target, ailment)) return false;
  const types = fighterTypes(target);
  const hasType = (typeId: number) =>
    types.type1 === typeId || types.type2 === typeId;
  if (ailment === "burn" && hasType(2)) return false;
  // Gen2: cannot freeze while sunny; Ice types cannot be frozen.
  if (ailment === "freeze" && weatherId === "sun") return false;
  if (ailment === "freeze" && rulesGeneration >= 2 && hasType(6)) return false;
  if (
    (ailment === "poison" || ailment === "toxic") &&
    (hasType(8) || (rulesGeneration >= 2 && hasType(17)))
  ) {
    return false;
  }
  return true;
}

function applyAilment(
  target: BattleFighter,
  ailment: string,
  logs: TurnLogLine[],
  name: string,
  fromSide?: PartySide,
  weatherId: string | null = null,
  field?: BattleFieldState,
  options: {
    rulesGeneration?: number;
    /** Secondary effects fail without a message. */
    silentFailure?: boolean;
    /** Toxic: badly poisoned. */
    badlyPoison?: boolean;
  } = {},
): boolean {
  const rulesGeneration = options.rulesGeneration ?? 1;
  const silentFailure = options.silentFailure === true;
  if (ailment === "confusion") {
    if (field && safeguardBlocksStatus(field, target)) {
      if (!silentFailure) {
        logs.push(`${name}は　しんぴのまもりで　守られている！`);
      }
      return false;
    }
    if (abilityBlocksStatus(target, "confusion")) {
      if (!silentFailure) {
        logs.push(announceAbility(target));
        logs.push(`${name}は　こんらんしない！`);
      }
      return false;
    }
    if (target.volatiles.confusionTurns <= 0) {
      target.volatiles.confusionTurns = randInt(2, 5);
      logs.push(`${name}は　こんらんした！`);
      return true;
    }
    if (!silentFailure) logs.push("しかし　うまく　決まらなかった！");
    return false;
  }
  if (ailment === "trap") return false;
  if (ailment === "leech-seed") {
    if (
      fighterTypes(target).type1 === 5 ||
      fighterTypes(target).type2 === 5
    ) {
      logs.push("しかし　うまく　決まらなかった！");
      return false;
    }
    if (!target.volatiles.leechSeed) {
      target.volatiles.leechSeed = true;
      target.volatiles.leechSeedFrom = fromSide ?? null;
      logs.push(`${name}に　やどりぎのタネを　植え付けた！`);
      return true;
    }
    return false;
  }
  if (!canStatus(target, ailment, weatherId, field, rulesGeneration)) {
    if (silentFailure) return false;
    if (abilityBlocksStatus(target, ailment)) {
      logs.push(announceAbility(target));
      logs.push(`${name}は　状態異常に　ならない！`);
      return false;
    }
    if (field && safeguardBlocksStatus(field, target) && !target.status) {
      logs.push(`${name}は　しんぴのまもりで　守られている！`);
    } else {
      logs.push("しかし　うまく　決まらなかった！");
    }
    return false;
  }
  if (
    ailment === "paralysis" ||
    ailment === "sleep" ||
    ailment === "freeze" ||
    ailment === "burn" ||
    ailment === "poison"
  ) {
    target.status = ailment as BattleStatus;
    if (ailment === "sleep") {
      // Gen1: 1–7 turns including the wake turn (sleepTurns + 1 turns lost).
      // Gen2: asleep 1–6 turns, Gen3: 1–4 turns, then acts on the turn it wakes.
      target.sleepTurns = earlyBirdSleepTurns(
        rulesGeneration >= 3
          ? randInt(1, 4)
          : rulesGeneration >= 2
            ? randInt(1, 6)
            : randInt(0, 6),
        target,
        rulesGeneration,
      );
    }
    if (ailment === "poison") {
      target.volatiles.toxic = options.badlyPoison === true;
      target.volatiles.toxicCounter = 0;
    }
    const ja: Record<string, string> = {
      paralysis: "まひした",
      sleep: "ねむってしまった",
      freeze: "こおってしまった",
      burn: "やけどを　おった",
      poison: options.badlyPoison ? "もうどくを　あびた" : "どくを　あびた",
    };
    logs.push(`${name}は　${ja[ailment] ?? ailment}！`);
    return true;
  }
  return false;
}

/**
 * After HP dropped: emit current logs (damage), then berry heal on its own beat
 * so the HP bar goes down then up.
 */
function emitDamageThenHpBerry(
  target: BattleFighter,
  logs: TurnLogLine[],
  emitBeat?: (lines: TurnLogLine[]) => void,
): void {
  if (emitBeat) {
    if (logs.length) {
      emitBeat([...logs]);
      logs.length = 0;
    }
    const berryLogs: TurnLogLine[] = [];
    if (tryHpThresholdBerry(target, berryLogs) && berryLogs.length) {
      emitBeat(berryLogs);
    }
    return;
  }
  tryHpThresholdBerry(target, logs);
}

/**
 * After an ailment was applied: flush a beat (so UI shows the status),
 * then apply a curing berry on its own beat.
 */
function emitAilmentThenBerry(
  target: BattleFighter,
  ailment: BattleStatus | "confusion",
  applied: boolean,
  logs: TurnLogLine[],
  emitBeat?: (lines: TurnLogLine[]) => void,
): void {
  if (!applied) return;

  if (emitBeat) {
    if (logs.length) {
      emitBeat([...logs]);
      logs.length = 0;
    }
    const cureLogs: TurnLogLine[] = [];
    if (tryStatusCureBerry(target, ailment, cureLogs) && cureLogs.length) {
      emitBeat(cureLogs);
    }
    return;
  }
  tryStatusCureBerry(target, ailment, logs);
}

const DOUBLE_EDGE_POKEAPI = 38;

/** Recoil from damage dealt. Double-Edge is 1/4 in Gen1–2 (move data) and 1/3 from Gen3. */
function recoilDamage(
  move: Move,
  totalDealt: number,
  rulesGeneration: number,
): number {
  if (move.pokeapi_id === DOUBLE_EDGE_POKEAPI && rulesGeneration >= 3) {
    return Math.max(1, Math.floor(totalDealt / 3));
  }
  const pct = Math.abs(metaOf(move).drain);
  return Math.max(1, Math.floor((totalDealt * pct) / 100));
}

/** Volt / Water Absorb: at full HP the move just has no effect. */
function applyAbsorbHeal(
  defender: BattleFighter,
  heal: number,
  logs: TurnLogLine[],
): void {
  logs.push(announceAbility(defender));
  if (defender.currentHp >= defender.maxHp) {
    logs.push(`${defender.member.nameJa}には　効果がないようだ…`);
    return;
  }
  defender.currentHp = Math.min(defender.maxHp, defender.currentHp + heal);
  logs.push(`${defender.member.nameJa}は　体力を　吸収した！`);
}

/** Synchronize: pass burn / paralysis / poison back to the attacker. */
function synchronizeStatus(
  defender: BattleFighter,
  attacker: BattleFighter,
  ailment: string,
  logs: TurnLogLine[],
  weatherId: string | null,
  field: BattleFieldState,
  rulesGeneration: number,
): boolean {
  let passed = false;
  applySynchronize(
    defender,
    attacker,
    ailment,
    logs,
    (t, ail, n) => {
      passed = applyAilment(
        t,
        ail,
        logs,
        n,
        defender.side,
        weatherId,
        field,
        { rulesGeneration },
      );
      return passed;
    },
    (t, ail) => canStatus(t, ail, weatherId, field, rulesGeneration),
  );
  return passed;
}

function stageChangePhrase(delta: number): string {
  const abs = Math.abs(delta);
  if (delta > 0) {
    if (abs >= 3) return "ぐぐーんと上がった";
    if (abs === 2) return "ぐーんと上がった";
    return "上がった";
  }
  if (abs >= 3) return "ががくっと下がった";
  if (abs === 2) return "がくっと下がった";
  return "下がった";
}

function resolveStageKey(
  stat: string,
  change: number,
  rulesGeneration: number,
): StageKey | null {
  const split = usesSplitSpecial(rulesGeneration);
  if (stat === "special-attack") return split ? "sp_attack" : "special";
  if (stat === "special-defense") return split ? "sp_defense" : "special";
  if (stat === "special") {
    if (!split) return "special";
    // Gen1 meta still uses "special"; Gen2 Growth raises SpA, Psychic lowers SpD.
    return change < 0 ? "sp_defense" : "sp_attack";
  }
  if (
    stat === "attack" ||
    stat === "defense" ||
    stat === "speed" ||
    stat === "accuracy" ||
    stat === "evasion"
  ) {
    return stat;
  }
  return null;
}

function stageLabel(key: StageKey, rulesGeneration: number): string {
  const labels: Record<StageKey, string> = {
    attack: "こうげき",
    defense: "ぼうぎょ",
    special: "とくしゅ",
    sp_attack: usesSplitSpecial(rulesGeneration) ? "とくこう" : "とくしゅ",
    sp_defense: usesSplitSpecial(rulesGeneration) ? "とくぼう" : "とくしゅ",
    speed: "すばやさ",
    accuracy: "めいちゅう率",
    evasion: "かいひ率",
  };
  return labels[key];
}

function applyStageDelta(
  who: BattleFighter,
  key: StageKey,
  change: number,
): number {
  const before = who.stages[key];
  who.stages[key] = Math.max(-6, Math.min(6, before + change));
  const delta = who.stages[key] - before;
  // Gen1: keep SpA/SpD mirrors in sync with unified Special.
  if (key === "special") {
    who.stages.sp_attack = who.stages.special;
    who.stages.sp_defense = who.stages.special;
  }
  return delta;
}

function applyStatChanges(
  user: BattleFighter,
  target: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
  towardTarget: boolean,
  field: BattleFieldState,
  rulesGeneration: number,
): void {
  const changes = metaOf(move).stat_changes;
  if (!changes.length) return;
  if (towardTarget && shieldDustBlocksSecondary(target)) return;
  const chancePct =
    metaOf(move).stat_chance * secondaryChanceMultiplier(user);
  if (chancePct > 0 && !chance(Math.min(100, chancePct))) return;

  const mistBlocks =
    towardTarget &&
    changes.some((sc) => sc.change < 0) &&
    field[target.side].mist;

  if (mistBlocks) {
    logs.push(`${target.member.nameJa}は　白い霧に　守られている！`);
    return;
  }

  if (towardTarget && blockedByProtect(target, logs)) {
    return;
  }

  for (const sc of changes) {
    const who = towardTarget ? target : user;
    const whoName = who.member.nameJa;
    const key = resolveStageKey(sc.stat, sc.change, rulesGeneration);
    if (!key) continue;
    if (abilityBlocksStatDrop(who, sc.stat, sc.change)) {
      logs.push(announceAbility(who));
      logs.push(`${whoName}の　能力は　下がらない！`);
      continue;
    }
    const delta = applyStageDelta(who, key, sc.change);
    if (delta === 0) {
      logs.push(`${whoName}の　能力は　もう　変わらない！`);
      continue;
    }
    logs.push(
      `${whoName}の　${stageLabel(key, rulesGeneration)}が　${stageChangePhrase(delta)}！`,
    );
  }
}

function checkAccuracy(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  weatherId: string | null = null,
  rulesGeneration = 1,
): boolean {
  if (attacker.volatiles.sureHit) {
    attacker.volatiles.sureHit = false;
    return true;
  }
  if (defender.volatiles.semiInvulnerable) {
    if (rulesGeneration >= 2) {
      // Gen2: Gust / Twister / Thunder reach Fly; Earthquake / Magnitude reach Dig.
      if (!hitsSemiInvulnerable(move, defender.volatiles.semiInvulnerable)) return false;
    } else if (move.pokeapi_id !== 129) {
      // Gen1: only Swift reliably hits Fly / Dig mid-charge
      return false;
    }
  }
  if (weatherGuaranteesHit(weatherId, move.pokeapi_id)) return true;
  if (move.accuracy == null) return true; // Swift etc.
  const accStage = attacker.stages.accuracy - defender.stages.evasion;
  const mult = stageMultiplierClamped(accStage);
  const defenderToolId =
    defender.heldTool && !defender.heldTool.consumed
      ? defender.heldTool.pokeapiId
      : null;
  const adjustedAcc = modifyAccuracyForAbilities(
    weatherAdjustedAccuracy(move.accuracy, weatherId, move.pokeapi_id),
    attacker,
    defender,
    weatherId,
  );
  const thresh = Math.floor(
    (adjustedAcc * mult * 255 * heldItemAccuracyFactor(defenderToolId)) / 100,
  );
  return randInt(0, 255) < Math.min(255, thresh);
}

function stageMultiplierClamped(stage: number): number {
  const s = Math.max(-6, Math.min(6, stage));
  if (s >= 0) return (3 + s) / 3;
  return 3 / (3 - s);
}

function tryEndTurnStatus(
  fighter: BattleFighter,
  other: BattleFighter,
  logs: TurnLogLine[],
  rulesGeneration = 1,
): void {
  if (fighter.currentHp <= 0) return;
  const badlyPoisoned = fighter.status === "poison" && fighter.volatiles.toxic;
  if (badlyPoisoned) {
    fighter.volatiles.toxicCounter = Math.min(15, fighter.volatiles.toxicCounter + 1);
  }
  const sixteenth = Math.max(1, Math.floor(fighter.maxHp / 16));
  // Gen1: burn / poison / Leech Seed deal 1/16. Gen2: 1/8 (Toxic stays N/16).
  const residual =
    rulesGeneration >= 2 ? Math.max(1, Math.floor(fighter.maxHp / 8)) : sixteenth;
  if (fighter.status === "burn" || fighter.status === "poison") {
    const dmg = badlyPoisoned ? sixteenth * fighter.volatiles.toxicCounter : residual;
    fighter.currentHp = Math.max(0, fighter.currentHp - dmg);
    logs.push(
      `${fighter.member.nameJa}は　${fighter.status === "burn" ? "やけど" : "どく"}の　ダメージを　受けた！`,
    );
  }
  if (fighter.volatiles.leechSeed && fighter.currentHp > 0) {
    // Gen1: the Toxic counter also multiplies Leech Seed damage.
    const dmg =
      rulesGeneration <= 1 && badlyPoisoned
        ? sixteenth * fighter.volatiles.toxicCounter
        : residual;
    fighter.currentHp = Math.max(0, fighter.currentHp - dmg);
    logs.push(`${fighter.member.nameJa}は　やどりぎのタネの　ダメージを　受けた！`);
    const from = fighter.volatiles.leechSeedFrom;
    const planter =
      from === other.side ? other : from === fighter.side ? fighter : other;
    if (planter.currentHp > 0) {
      const ooze = liquidOozeOnDrain(fighter, dmg);
      if (ooze.damageAttacker) {
        logs.push(announceAbility(fighter));
        planter.currentHp = Math.max(0, planter.currentHp - ooze.amount);
        logs.push(`${planter.member.nameJa}は　ダメージを　受けた！`);
      } else {
        planter.currentHp = Math.min(planter.maxHp, planter.currentHp + dmg);
        logs.push(`${planter.member.nameJa}は　体力を　吸い取った！`);
      }
    }
  }
  if (fighter.volatiles.disableTurns > 0) {
    fighter.volatiles.disableTurns -= 1;
    if (fighter.volatiles.disableTurns <= 0) {
      fighter.volatiles.disableMoveId = null;
      logs.push(`${fighter.member.nameJa}の　かなしばりが　解けた！`);
    }
  }
}

const DEFROST_MOVE_POKEAPI = new Set([172, 221]); // Flame Wheel, Sacred Fire
const SLEEP_USABLE_POKEAPI = new Set([173, 214]); // Snore, Sleep Talk
const STRUGGLE_POKEAPI = 165;

function canAct(
  fighter: BattleFighter,
  logs: TurnLogLine[],
  rulesGeneration = 1,
  selectedMove?: Move | null,
): boolean {
  const clearChargeIfAny = () => {
    if (fighter.volatiles.chargingMove) {
      const name = fighter.volatiles.chargingMove.name_ja;
      fighter.volatiles.chargingMove = null;
      fighter.volatiles.semiInvulnerable = null;
      logs.push(
        `${fighter.member.nameJa}の　ためていた　${name}は　解除された！`,
      );
    }
  };

  if (truantBlocksAction(fighter, logs)) {
    // Gen3: the loafing turn also serves as the Hyper Beam recharge turn.
    fighter.volatiles.recharge = false;
    clearChargeIfAny();
    return false;
  }

  if (fighter.volatiles.recharge) {
    fighter.volatiles.recharge = false;
    logs.push(`${fighter.member.nameJa}は　反動で　動けない！`);
    clearChargeIfAny();
    return false;
  }
  if (fighter.volatiles.trapTurns > 0) {
    logs.push(`${fighter.member.nameJa}は　しめられて　動けない！`);
    clearChargeIfAny();
    return false;
  }
  if (fighter.volatiles.flinch) {
    if (abilityBlocksFlinch(fighter)) {
      fighter.volatiles.flinch = false;
    } else {
      fighter.volatiles.flinch = false;
      logs.push(`${fighter.member.nameJa}は　ひるんで　動けない！`);
      clearChargeIfAny();
      return false;
    }
  }
  if (fighter.volatiles.infatuated && chance(50)) {
    logs.push(`${fighter.member.nameJa}は　メロメロで　動けない！`);
    clearChargeIfAny();
    return false;
  }
  if (fighter.status === "freeze") {
    // Gen1: never thaws on its own. Gen2: thaws only at end of turn,
    // but Flame Wheel / Sacred Fire thaw the user and go off. Gen3: 25% before acting.
    if (
      (rulesGeneration >= 2 &&
        selectedMove != null &&
        DEFROST_MOVE_POKEAPI.has(selectedMove.pokeapi_id)) ||
      (rulesGeneration >= 3 && chance(25))
    ) {
      fighter.status = null;
      logs.push(`${fighter.member.nameJa}の　こおりが　溶けた！`);
    } else {
      logs.push(`${fighter.member.nameJa}は　こおっていて　動けない！`);
      clearChargeIfAny();
      return false;
    }
  }
  if (fighter.status === "sleep") {
    // sleepTurns = remaining asleep turns. Gen1: the wake turn is also lost. Gen2+: acts that turn.
    if (fighter.sleepTurns <= 0) {
      fighter.status = null;
      logs.push(`${fighter.member.nameJa}は　目を　覚ました！`);
      if (rulesGeneration < 2) {
        clearChargeIfAny();
        return false;
      }
    } else {
      fighter.sleepTurns -= 1;
      // Gen2+: Snore / Sleep Talk work while asleep.
      if (
        rulesGeneration >= 2 &&
        selectedMove != null &&
        SLEEP_USABLE_POKEAPI.has(selectedMove.pokeapi_id)
      ) {
        return true;
      }
      logs.push(`${fighter.member.nameJa}は　ぐうぐう　眠っている！`);
      clearChargeIfAny();
      return false;
    }
  }
  // Gen1–2 full paralysis: 63/256. Gen3: 25%.
  if (
    fighter.status === "paralysis" &&
    (rulesGeneration >= 3 ? chance(25) : randInt(0, 255) < 63)
  ) {
    logs.push(`${fighter.member.nameJa}は　まひして　動けない！`);
    clearChargeIfAny();
    return false;
  }
  if (fighter.volatiles.confusionTurns > 0) {
    // Counter 2–5: confused for 1–4 turns, then snaps out and acts normally.
    fighter.volatiles.confusionTurns -= 1;
    if (fighter.volatiles.confusionTurns <= 0) {
      logs.push(`${fighter.member.nameJa}の　こんらんが　とけた！`);
      return true;
    }
    logs.push(`${fighter.member.nameJa}は　こんらんしている！`);
    if (chance(50)) {
      const dmg = calcDamage(
        fighter,
        fighter,
        {
          id: "confusion",
          pokeapi_id: 0,
          name_ja: "こんらん",
          name_en: "confusion",
          // Gen2: typeless self-hit (no STAB, hits Ghost types).
          type_id: rulesGeneration >= 2 ? 0 : 1,
          damage_class: "physical",
          power: 40,
          accuracy: null,
          pp: null,
          priority: 0,
          description: null,
          effect_category: "damage",
          effect_meta: EMPTY_EFFECT_META,
          effect_code: null,
          introduced_generation: 1,
          available_generations: 1,
        },
        false,
        { mist: false, reflect: false, lightScreen: false, spikes: false, safeguardTurns: 0 },
        null,
        rulesGeneration,
      );
      fighter.currentHp = Math.max(0, fighter.currentHp - dmg);
      logs.push(`わけも　わからず　自分を　攻撃した！`);
      clearChargeIfAny();
      return false;
    }
  }
  return true;
}

function chargePrepMessage(move: Move): string {
  switch (move.pokeapi_id) {
    case 76: // Solar Beam
      return "光を　吸収した";
    case 19: // Fly
      return "空高く　舞い上がった";
    case 91: // Dig
      return "地中に　潜った";
    case 130: // Skull Bash
      return "頭を　引っ込めた";
    case 143: // Sky Attack
      return "激しい　光を　まとっている";
    case 13: // Razor Wind
      return "風を　巻き起こしている";
    default:
      return "力を　ためている";
  }
}

function isThrashLike(move: Move): boolean {
  // Gen1 Thrash / Petal Dance (Rage is different)
  return move.pokeapi_id === 37 || move.pokeapi_id === 80;
}

/** Forced move while charging, thrashing, trapped, etc.; null if free to choose. */
export function getForcedMove(fighter: BattleFighter | null): Move | null {
  if (!fighter || fighter.currentHp <= 0) return null;
  // Hyper Beam etc.: must skip the recharge turn (UI auto-locks, canAct consumes it)
  if (fighter.volatiles.recharge) {
    return (
      fighter.volatiles.lastMoveUsed ?? {
        id: "recharge",
        pokeapi_id: 0,
        name_ja: "反動",
        name_en: "recharge",
        type_id: 1,
        damage_class: "status",
        power: null,
        accuracy: null,
        pp: null,
        priority: 0,
        description: null,
        effect_category: "unique",
        effect_meta: EMPTY_EFFECT_META,
        effect_code: null,
        introduced_generation: 1,
        available_generations: 1,
      }
    );
  }
  // Partial-trap victim: cannot choose a move (auto-lock a stub; canAct blocks)
  if (fighter.volatiles.trapTurns > 0) {
    return {
      id: "trapped",
      pokeapi_id: 0,
      name_ja: "しめつけ",
      name_en: "trapped",
      type_id: 1,
      damage_class: "status",
      power: null,
      accuracy: null,
      pp: null,
      priority: 0,
      description: null,
      effect_category: "unique",
      effect_meta: EMPTY_EFFECT_META,
      effect_code: null,
      introduced_generation: 1,
      available_generations: 1,
    };
  }
  if (fighter.volatiles.chargingMove) return fighter.volatiles.chargingMove;
  if (fighter.volatiles.bindingMove && fighter.volatiles.bindingTurnsLeft > 0) {
    return fighter.volatiles.bindingMove;
  }
  if (fighter.volatiles.bideTurnsLeft > 0 && fighter.volatiles.bideMove) {
    return fighter.volatiles.bideMove;
  }
  if (fighter.volatiles.rageActive && fighter.volatiles.lockedMove) {
    return fighter.volatiles.lockedMove;
  }
  if (fighter.volatiles.lockedMove && fighter.volatiles.lockTurnsLeft > 0) {
    return fighter.volatiles.lockedMove;
  }
  return null;
}

function finishThrashLock(
  attacker: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
): void {
  if (attacker.volatiles.lockedMove?.id !== move.id) return;

  // Rage: ends after lockTurnsLeft forced uses (seed text); ATK still rises when hit.
  if (move.pokeapi_id === 99) {
    attacker.volatiles.lockTurnsLeft -= 1;
    if (attacker.volatiles.lockTurnsLeft <= 0) {
      attacker.volatiles.lockedMove = null;
      attacker.volatiles.lockTurnsLeft = 0;
      attacker.volatiles.rageActive = false;
      logs.push(`${attacker.member.nameJa}の　いかりが　収まった！`);
    }
    return;
  }

  if (
    move.effect_code === "unique-lock" &&
    isThrashLike(move)
  ) {
    attacker.volatiles.lockTurnsLeft -= 1;
    if (attacker.volatiles.lockTurnsLeft <= 0) {
      attacker.volatiles.lockedMove = null;
      attacker.volatiles.lockTurnsLeft = 0;
      if (attacker.volatiles.confusionTurns <= 0) {
        attacker.volatiles.confusionTurns = randInt(2, 5);
        logs.push(`${attacker.member.nameJa}は　疲れ果てて　こんらんした！`);
        tryStatusCureBerry(attacker, "confusion", logs);
      } else {
        logs.push(`${attacker.member.nameJa}は　疲れ果てて　こんらんした！`);
      }
    }
  }
}

function executeMove(
  attacker: BattleFighter,
  defender: BattleFighter,
  selectedMove: Move,
  logs: TurnLogLine[],
  field: BattleFieldState,
  emitBeat?: (lines: TurnLogLine[]) => void,
  fromMirror = false,
  ctx?: ExecCtx,
  rulesGeneration = 1,
): void {
  const activeWeather = effectiveWeatherId(field, attacker, defender);
  let move = moveForUse(
    selectedMove,
    attacker.status,
    activeWeather,
    rulesGeneration,
  );
  // Gen2+ Struggle is typeless (hits Ghost types, no STAB).
  if (move.pokeapi_id === STRUGGLE_POKEAPI && rulesGeneration >= 2) {
    move = { ...move, type_id: 0 };
  }
  const code = move.effect_code;
  const category = move.effect_category ?? "damage";
  const meta = metaOf(move);

  // Two-turn charge: wind-up turn (Solar Beam skips charge in sun)
  if (
    code === "unique-charge" &&
    !attacker.volatiles.chargingMove &&
    !weatherSkipsSolarBeamCharge(activeWeather, move.pokeapi_id)
  ) {
    attacker.volatiles.chargingMove = move;
    if (move.pokeapi_id === 19) attacker.volatiles.semiInvulnerable = "fly";
    if (move.pokeapi_id === 91) attacker.volatiles.semiInvulnerable = "dig";
    logs.push(
      `${attacker.member.nameJa}は　${chargePrepMessage(move)}！`,
    );
    if (!fromMirror) attacker.volatiles.lastMoveUsed = move;
    return;
  }
  if (
    code === "unique-charge" &&
    attacker.volatiles.chargingMove &&
    attacker.volatiles.chargingMove.id === move.id
  ) {
    attacker.volatiles.chargingMove = null;
    attacker.volatiles.semiInvulnerable = null;
  }

  // Thrash / Petal Dance: start lock (Gen1 = 3–4 turns total)
  if (code === "unique-lock" && isThrashLike(move) && !attacker.volatiles.lockedMove) {
    attacker.volatiles.lockedMove = move;
    attacker.volatiles.lockTurnsLeft = randInt(3, 4);
  }

  // Rage: lock for a few turns (ATK rises when hit). Not infinite.
  if (move.pokeapi_id === 99 && !attacker.volatiles.rageActive) {
    attacker.volatiles.rageActive = true;
    attacker.volatiles.lockedMove = move;
    attacker.volatiles.lockTurnsLeft = randInt(2, 3);
  }

  if (!fromMirror || code !== "unique-mirror-move") {
    logs.push(`${attacker.member.nameJa}の　${move.name_ja}！`);
  }

  // Gen2 Protect / Detect / Endure
  if (tryExecuteProtectFamily(attacker, move, logs)) {
    return;
  }
  // Using any other move breaks the Protect-family success streak.
  attacker.volatiles.protectStreak = 0;

  if (tryExecuteCurse(attacker, defender, move, logs)) return;
  if (tryExecuteBellyDrum(attacker, move, logs)) return;
  if (tryExecuteSwagger(attacker, defender, move, logs, field)) return;
  if (tryExecuteHealBell(attacker, move, logs)) return;
  if (tryExecuteSpikes(attacker, defender, move, field, logs)) return;
  if (tryExecuteSafeguard(attacker, move, field, logs)) return;
  if (tryExecuteTrapPreventEscape(attacker, defender, move, logs)) return;
  if (tryExecuteSureHit(attacker, defender, move, logs)) return;
  if (tryExecutePainSplit(attacker, defender, move, logs)) return;
  if (tryExecutePsychUp(attacker, defender, move, logs)) return;
  if (tryExecuteDestinyBond(attacker, move, logs)) return;
  if (tryExecuteForesight(attacker, defender, move, logs)) return;
  if (tryExecutePerishSong(attacker, defender, move, logs)) return;
  if (tryExecuteAttract(attacker, defender, move, logs, field)) return;
  if (tryExecuteNightmare(attacker, defender, move, logs)) return;
  if (tryExecuteBatonPass(attacker, move, logs, ctx)) return;
  if (tryExecuteSpite(attacker, defender, move, logs)) return;

  if (move.pokeapi_id === ITEM_MOVE_POKEAPI.TRICK) {
    if (!checkAccuracy(attacker, defender, move, activeWeather, rulesGeneration)) {
      logs.push(`しかし　${defender.member.nameJa}には　当たらなかった！`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    if (blockedByProtect(defender, logs)) {
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    tryExecuteTrick(attacker, defender, move, logs, rulesGeneration);
    return;
  }

  // Snore: only works while asleep.
  if (move.pokeapi_id === 173) {
    if (attacker.status !== "sleep") {
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
  }

  // Sleep Talk (Gen2): while asleep, use a random other known move.
  if (move.pokeapi_id === 214) {
    if (attacker.status !== "sleep") {
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    const pool = attacker.volatiles.knownMoves.filter(
      (m) => m.pokeapi_id !== 214 && m.pokeapi_id !== 165,
    );
    if (pool.length === 0) {
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    const picked = pool[randInt(0, pool.length - 1)]!;
    logs.push(`${picked.name_ja}が　でた！`);
    attacker.volatiles.lastMoveUsed = move;
    executeMove(
      attacker,
      defender,
      picked,
      logs,
      field,
      emitBeat,
      true,
      ctx,
      rulesGeneration,
    );
    return;
  }

  // Sketch: copy the foe's last move into knownMoves (battle memory only).
  if (move.pokeapi_id === 166) {
    const copied = defender.volatiles.lastMoveUsed;
    if (!copied || copied.pokeapi_id === 166) {
      logs.push("しかし　うまく　決まらなかった！");
    } else {
      attacker.volatiles.knownMoves = [copied, ...attacker.volatiles.knownMoves.filter((m) => m.id !== copied.id)].slice(0, 4);
      logs.push(`${attacker.member.nameJa}は　${copied.name_ja}を　スケッチした！`);
    }
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  // Encore: lock foe into last move for 2–5 turns.
  if (move.pokeapi_id === 227) {
    if (blockedByProtect(defender, logs)) {
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    const last = defender.volatiles.lastMoveUsed;
    if (!last || last.pokeapi_id === 227 || last.pokeapi_id === 165) {
      logs.push("しかし　うまく　決まらなかった！");
    } else {
      defender.volatiles.lockedMove = last;
      defender.volatiles.lockTurnsLeft = randInt(2, 5);
      logs.push(`${defender.member.nameJa}は　アンコールを　受けた！`);
    }
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  // Conversion 2: become a type that resists the foe's last move type.
  if (move.pokeapi_id === 176) {
    const last = defender.volatiles.lastMoveUsed;
    if (!last) {
      logs.push("しかし　うまく　決まらなかった！");
    } else {
      const resistType = typeThatResists(last.type_id, rulesGeneration);
      attacker.species = {
        ...attacker.species,
        type1: resistType,
        type2: 0,
      };
      logs.push(`${attacker.member.nameJa}の　タイプが　変わった！`);
    }
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  // Future Sight: delay damage two turns.
  if (move.pokeapi_id === 248) {
    if (field.futureSight) {
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    const foresightMove = { ...move, effect_category: "damage", power: 80 };
    const dmg = calcDamage(
      attacker,
      defender,
      foresightMove,
      false,
      field[defender.side],
      activeWeather,
      rulesGeneration,
    );
    field.futureSight = {
      targetSide: defender.side,
      damage: Math.max(1, dmg),
      turnsLeft: 2,
      sourceName: attacker.member.nameJa,
    };
    logs.push(`${attacker.member.nameJa}は　未来に　攻撃を　予告した！`);
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  // Field effects (Mist / Reflect / Light Screen)
  if (category === "field-effect" || move.pokeapi_id === 54 || move.pokeapi_id === 113 || move.pokeapi_id === 115) {
    const side = field[attacker.side];
    if (move.pokeapi_id === 54) {
      side.mist = true;
      logs.push(`${attacker.member.nameJa}の　周りを　白い霧が　包んだ！`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    if (move.pokeapi_id === 113) {
      side.lightScreen = true;
      logs.push(`${attacker.member.nameJa}の　周りに　光の壁が　現れた！`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    if (move.pokeapi_id === 115) {
      side.reflect = true;
      logs.push(`${attacker.member.nameJa}の　周りに　反射壁が　現れた！`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
  }
  // Gen2 weather (Rain Dance / Sunny Day / Sandstorm)
  {
    const weatherId = weatherIdFromMovePokeapi(move.pokeapi_id);
    if (weatherId) {
      if (field.weather?.id === weatherId) {
        logs.push("しかし　うまく　決まらなかった！");
        attacker.volatiles.lastMoveUsed = move;
        return;
      }
      field.weather = setWeather(field.weather, weatherId, logs);
      refreshForecastForms(attacker, defender, field, logs);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
  }
  // Haze: reset all stat stages (must not catch weather moves)
  if (move.pokeapi_id === 114 || code === "unique-haze") {
    for (const f of [attacker, defender]) {
      f.stages = createStages();
    }
    logs.push("全ての　能力変化が　元に　戻った！");
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  // Whirlwind / Roar
  if (
    category === "force-switch" ||
    move.pokeapi_id === 18 ||
    move.pokeapi_id === 46
  ) {
    if (
      !checkAccuracy(
        attacker,
        defender,
        move,
        effectiveWeatherId(field, attacker, defender),
        rulesGeneration,
      )
    ) {
      logs.push(`しかし　${defender.member.nameJa}には　当たらなかった！`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    if (isSoundMove(move) && hasAbility(defender, ABILITY.SOUNDPROOF)) {
      logs.push(announceAbility(defender));
      logs.push(`${defender.member.nameJa}には　効果がないようだ…`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    if (
      defender.volatiles.cannotEscape ||
      blocksForcedSwitch(defender)
    ) {
      if (blocksForcedSwitch(defender) && hasAbility(defender, ABILITY.SUCTION_CUPS)) {
        logs.push(announceAbility(defender));
      }
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    logs.push(`${defender.member.nameJa}を　吹き飛ばした！`);
    if (ctx) ctx.forceSwitchSide = defender.side;
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  if (code === "unique-splash") {
    logs.push("しかし　何も　起こらなかった！");
    attacker.volatiles.lastMoveUsed = move;
    return;
  }
  if (code === "unique-teleport") {
    logs.push("しかし　うまく　決まらなかった！");
    attacker.volatiles.lastMoveUsed = move;
    return;
  }
  if (code === "unique-focus-energy") {
    attacker.volatiles.focusEnergy = true;
    logs.push(`${attacker.member.nameJa}は　気合を　ためた！`);
    attacker.volatiles.lastMoveUsed = move;
    return;
  }
  if (code === "unique-rest") {
    if (emitBeat && logs.length) {
      emitBeat([...logs]);
      logs.length = 0;
    }
    attacker.currentHp = attacker.maxHp;
    attacker.status = "sleep";
    // Gen1: one asleep turn, then a wake turn that cannot move.
    // Gen2+: two asleep turns, then it wakes and acts.
    // Chesto / Lum wake immediately (Gen2 held berry).
    attacker.sleepTurns =
      rulesGeneration >= 2 ? earlyBirdSleepTurns(2, attacker, rulesGeneration) : 1;
    logs.push(`${attacker.member.nameJa}は　眠って　HPを　回復した！`);
    emitAilmentThenBerry(attacker, "sleep", true, logs, emitBeat);
    attacker.volatiles.lastMoveUsed = move;
    return;
  }
  if (code === "unique-substitute") {
    if (attacker.volatiles.substituteHp > 0) {
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    const cost = Math.max(1, Math.floor(attacker.maxHp / 4));
    if (attacker.currentHp <= cost) {
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    attacker.currentHp -= cost;
    attacker.volatiles.substituteHp = cost;
    logs.push(
      `${attacker.member.nameJa}の　HPが　${cost}減った！`,
      `${attacker.member.nameJa}の　身代わりが　現れた！`,
    );
    attacker.volatiles.lastMoveUsed = move;
    return;
  }
  if (code === "unique-mimic") {
    const copied = defender.volatiles.lastMoveUsed;
    if (!copied || copied.effect_code === "unique-mimic") {
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    // Replace Mimic slot in battle move list with a copy (usable from next turn)
    const idx = attacker.member.moveIds.findIndex((id) => id === move.id);
    if (idx >= 0) {
      const next = [...attacker.member.moveIds] as typeof attacker.member.moveIds;
      next[idx] = copied.id;
      attacker.member = { ...attacker.member, moveIds: next };
    }
    logs.push(
      `${attacker.member.nameJa}は　${copied.name_ja}を　ものまねした！`,
    );
    attacker.volatiles.lastMoveUsed = move;
    return;
  }
  if (code === "unique-mirror-move") {
    const mirrored = defender.volatiles.lastMoveUsed;
    if (
      !mirrored ||
      mirrored.effect_code === "unique-mirror-move" ||
      mirrored.pokeapi_id === 165 // Struggle
    ) {
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    logs.push(`${attacker.member.nameJa}は　オウムがえしをした！`);
    attacker.volatiles.lastMoveUsed = move;
    executeMove(
      attacker,
      defender,
      mirrored,
      logs,
      field,
      emitBeat,
      true,
      ctx,
      rulesGeneration,
    );
    return;
  }
  if (code === "unique-metronome") {
    const picked = applyMoveTypeForGeneration(pickMetronomeMove(), rulesGeneration);
    logs.push(`${picked.name_ja}が　でた！`);
    attacker.volatiles.lastMoveUsed = move;
    executeMove(
      attacker,
      defender,
      picked,
      logs,
      field,
      emitBeat,
      true,
      ctx,
      rulesGeneration,
    );
    return;
  }
  if (code === "unique-bide") {
    if (attacker.volatiles.bideTurnsLeft <= 0) {
      attacker.volatiles.bideTurnsLeft = randInt(2, 3);
      attacker.volatiles.bideDamage = 0;
      attacker.volatiles.bideMove = move;
      logs.push(`${attacker.member.nameJa}は　がまんを　始めた！`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    attacker.volatiles.bideTurnsLeft -= 1;
    if (attacker.volatiles.bideTurnsLeft > 0) {
      logs.push(`${attacker.member.nameJa}は　がまんしている！`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    const stored = attacker.volatiles.bideDamage;
    attacker.volatiles.bideDamage = 0;
    attacker.volatiles.bideMove = null;
    const unleashed = stored * 2;
    if (unleashed <= 0) {
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    const result = applyDamage(defender, unleashed, { move, logs });
    logs.push(
      `${defender.member.nameJa}に　${result.dealt}の　ダメージを　返した！`,
    );
    if (result.brokeSub) {
      logs.push(`${defender.member.nameJa}の　みがわりが　消えた！`);
    }
    emitDamageThenHpBerry(defender, logs, emitBeat);
    attacker.volatiles.lastMoveUsed = move;
    return;
  }
  if (code === "unique-transform") {
    if (defender.volatiles.transformed || attacker.volatiles.transformed) {
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    attacker.stats = { ...defender.stats, hp: attacker.stats.hp };
    attacker.stages = { ...defender.stages };
    attacker.species = {
      ...defender.species,
      id: attacker.species.id,
      name_ja: attacker.species.name_ja,
      name_en: attacker.species.name_en,
      dex_no: attacker.species.dex_no,
    };
    attacker.member = {
      ...attacker.member,
      moveIds: [...defender.member.moveIds] as typeof attacker.member.moveIds,
    };
    if (abilitiesEnabled(rulesGeneration)) {
      attacker.abilityPokeapiId = defender.abilityPokeapiId;
      attacker.abilityNameJa = defender.abilityNameJa;
      attacker.battleType1 = defender.battleType1;
      attacker.battleType2 = defender.battleType2;
    }
    attacker.volatiles.transformed = true;
    logs.push(
      `${attacker.member.nameJa}は　${defender.member.nameJa}に　へんしんした！`,
    );
    attacker.volatiles.lastMoveUsed = move;
    return;
  }
  if (code === "unique-conversion") {
    // Gen1 Conversion: copy the target's current type(s).
    if (
      defender.species.type1 === attacker.species.type1 &&
      defender.species.type2 === attacker.species.type2
    ) {
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    attacker.species = {
      ...attacker.species,
      type1: defender.species.type1,
      type2: defender.species.type2,
    };
    logs.push(
      `${attacker.member.nameJa}は　${defender.member.nameJa}と　同じタイプに　なった！`,
    );
    attacker.volatiles.lastMoveUsed = move;
    return;
  }
  if (code === "unique-disable") {
    if (defender.volatiles.substituteHp > 0) {
      logs.push("しかし　身代わりには　効果が　ない！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    if (!checkAccuracy(attacker, defender, move, activeWeather, rulesGeneration)) {
      logs.push(`しかし　${defender.member.nameJa}には　当たらなかった！`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    if (defender.volatiles.disableMoveId) {
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    const foeMoves = defender.member.moveIds.filter((id): id is string => !!id);
    if (foeMoves.length === 0) {
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    const disabled = foeMoves[randInt(0, foeMoves.length - 1)];
    defender.volatiles.disableMoveId = disabled;
    defender.volatiles.disableTurns = randInt(2, 5);
    const named = GEN1_MOVE_POOL.find((m) => m.id === disabled);
    logs.push(
      `${defender.member.nameJa}の　${named?.name_ja ?? "技"}を　かなしばりした！`,
    );
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  // Gen1 Wrap / Fire Spin continuation: fixed damage from first hit (no re-roll)
  if (
    code === "unique-partial-trap" &&
    attacker.volatiles.bindingMove?.id === move.id &&
    attacker.volatiles.bindingTurnsLeft > 0
  ) {
    const fixed = Math.max(1, attacker.volatiles.bindingDamage);
    const result = applyDamage(defender, fixed, { move, logs });
    logs.push(`${defender.member.nameJa}に　${result.dealt}の　ダメージ！`);
    if (result.brokeSub) {
      logs.push(`${defender.member.nameJa}の　みがわりが　消えた！`);
    }
    attacker.volatiles.bindingTurnsLeft -= 1;
    const left = attacker.volatiles.bindingTurnsLeft;
    if (left <= 0) {
      attacker.volatiles.bindingMove = null;
      attacker.volatiles.bindingTurnsLeft = 0;
      attacker.volatiles.bindingDamage = 0;
      defender.volatiles.trapTurns = 0;
      defender.volatiles.trapDamage = 0;
      logs.push(`${defender.member.nameJa}は　しめつけから　解放された！`);
    } else {
      defender.volatiles.trapTurns = left + 1;
      logs.push(`しめつけが　続いている！（残り${left + 1}ターン）`);
    }
    emitDamageThenHpBerry(defender, logs, emitBeat);
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  if (category === "heal" || meta.healing > 0) {
    if (attacker.currentHp >= attacker.maxHp) {
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    const heal =
      weatherHealAmount(
        attacker.maxHp,
        move.pokeapi_id,
        activeWeather,
        rulesGeneration,
      ) ??
      Math.max(1, Math.floor((attacker.maxHp * (meta.healing || 50)) / 100));
    attacker.currentHp = Math.min(attacker.maxHp, attacker.currentHp + heal);
    logs.push(`${attacker.member.nameJa}の　HPが　回復した！`);
    attacker.volatiles.lastMoveUsed = move;
    return;
  }
  if (category === "net-good-stats") {
    if (isSoundMove(move) && hasAbility(defender, ABILITY.SOUNDPROOF)) {
      const towardFoe =
        meta.stat_changes.length > 0 &&
        meta.stat_changes.every((sc) => sc.change < 0);
      if (towardFoe) {
        logs.push(announceAbility(defender));
        logs.push(`${defender.member.nameJa}には　効果がないようだ…`);
        attacker.volatiles.lastMoveUsed = move;
        return;
      }
    }
    const towardFoe =
      meta.stat_changes.length > 0 &&
      meta.stat_changes.every((sc) => sc.change < 0);
    applyStatChanges(
      attacker,
      defender,
      move,
      logs,
      towardFoe,
      field,
      rulesGeneration,
    );
    attacker.volatiles.lastMoveUsed = move;
    return;
  }
  if (category === "ailment" && meta.ailment) {
    if (
      move.pokeapi_id === THUNDER_WAVE_POKEAPI &&
      foresightTypeEffectiveness(move, defender, rulesGeneration) === 0
    ) {
      logs.push(`${defender.member.nameJa}には　効果がないようだ…`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    if (defender.volatiles.substituteHp > 0) {
      logs.push("しかし　身代わりには　効果が　ない！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    if (!checkAccuracy(attacker, defender, move, activeWeather, rulesGeneration)) {
      logs.push(`しかし　${defender.member.nameJa}には　当たらなかった！`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    if (blockedByProtect(defender, logs)) {
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    if (isSoundMove(move) && hasAbility(defender, ABILITY.SOUNDPROOF)) {
      logs.push(announceAbility(defender));
      logs.push(`${defender.member.nameJa}には　効果がないようだ…`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    {
      const absorb = tryAbsorbMove(defender, move, 1);
      if (absorb.kind === "heal") {
        applyAbsorbHeal(defender, absorb.heal, logs);
        attacker.volatiles.lastMoveUsed = move;
        return;
      }
      if (absorb.kind === "flash_fire") {
        logs.push(announceAbility(defender));
        defender.volatiles.flashFireActive = true;
        logs.push(`${defender.member.nameJa}は　ほのおを　吸収した！`);
        attacker.volatiles.lastMoveUsed = move;
        return;
      }
    }
    // Flush the move-name beat first so the status badge is not shown early.
    if (emitBeat && logs.length) {
      emitBeat([...logs]);
      logs.length = 0;
    }
    const applied = applyAilment(
      defender,
      meta.ailment,
      logs,
      defender.member.nameJa,
      attacker.side,
      activeWeather,
      field,
      { rulesGeneration, badlyPoison: move.pokeapi_id === TOXIC_POKEAPI },
    );
    const synced =
      applied &&
      synchronizeStatus(
        defender,
        attacker,
        meta.ailment,
        logs,
        activeWeather,
        field,
        rulesGeneration,
      );
    if (
      meta.ailment === "paralysis" ||
      meta.ailment === "sleep" ||
      meta.ailment === "freeze" ||
      meta.ailment === "burn" ||
      meta.ailment === "poison" ||
      meta.ailment === "confusion"
    ) {
      emitAilmentThenBerry(
        defender,
        meta.ailment as BattleStatus | "confusion",
        applied,
        logs,
        emitBeat,
      );
      emitAilmentThenBerry(
        attacker,
        meta.ailment as BattleStatus,
        synced,
        logs,
        emitBeat,
      );
    }
    attacker.volatiles.lastMoveUsed = move;
    return;
  }
  if (code === "unique-ohko" || category === "ohko") {
    if (foresightTypeEffectiveness(move, defender, rulesGeneration) === 0) {
      logNoEffect(defender, move, logs);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    if (sturdyBlocksOhko(defender, move)) {
      logs.push(announceAbility(defender));
      logs.push(`${defender.member.nameJa}は　がんじょうで　耐えた！`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    if (!checkAccuracy(attacker, defender, move, activeWeather, rulesGeneration)) {
      logs.push(`しかし　${defender.member.nameJa}には　当たらなかった！`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    applyDamage(defender, defender.currentHp + defender.volatiles.substituteHp, {
      move,
      logs,
    });
    logs.push("一撃必殺！");
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  // Dream Eater only works on sleeping targets
  if (move.pokeapi_id === 138 && defender.status !== "sleep") {
    logs.push("しかし　うまく　決まらなかった！");
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  // Gen1 Counter: 2× physical damage taken this turn
  if (move.pokeapi_id === 68) {
    if (!checkAccuracy(attacker, defender, move, activeWeather, rulesGeneration)) {
      logs.push(`しかし　${defender.member.nameJa}には　当たらなかった！`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    if (blockedByProtect(defender, logs)) {
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    const stored = attacker.volatiles.physicalDamageTakenThisTurn;
    if (stored <= 0) {
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    const result = applyDamage(defender, stored * 2, { move, logs });
    logs.push(`${defender.member.nameJa}に　${result.dealt}の　ダメージ！`);
    if (result.brokeSub) {
      logs.push(`${defender.member.nameJa}の　みがわりが　消えた！`);
    }
    emitDamageThenHpBerry(defender, logs, emitBeat);
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  // Gen2 Mirror Coat: 2× special damage taken this turn
  if (move.pokeapi_id === 243) {
    if (!checkAccuracy(attacker, defender, move, activeWeather, rulesGeneration)) {
      logs.push(`しかし　${defender.member.nameJa}には　当たらなかった！`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    if (blockedByProtect(defender, logs)) {
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    const stored = attacker.volatiles.specialDamageTakenThisTurn;
    if (stored <= 0) {
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    const result = applyDamage(defender, stored * 2, { move, logs });
    logs.push(`${defender.member.nameJa}に　${result.dealt}の　ダメージ！`);
    emitDamageThenHpBerry(defender, logs, emitBeat);
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  // Damage-dealing path (including partial trap / hyper beam / fixed / explosion)
  if (!checkAccuracy(attacker, defender, move, activeWeather, rulesGeneration)) {
    logs.push(`しかし　${defender.member.nameJa}には　当たらなかった！`);
    if (code === "unique-crash") {
      attacker.currentHp = Math.max(0, attacker.currentHp - 1);
      logs.push(`${attacker.member.nameJa}は　激しく　地面に　ぶつかった！`);
      emitDamageThenHpBerry(attacker, logs, emitBeat);
    }
    finishThrashLock(attacker, move, logs);
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  if (blockedByProtect(defender, logs)) {
    finishThrashLock(attacker, move, logs);
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  if (dampBlocksMove(move, attacker, defender)) {
    const dampUser = hasAbility(attacker, ABILITY.DAMP) ? attacker : defender;
    logs.push(announceAbility(dampUser));
    logs.push("しめりけで　技が　出せない！");
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  if (code === "unique-explosion") {
    attacker.currentHp = 0;
  }

  let totalDealt = 0;
  let brokeSub = false;
  const hitSubstitute = defender.volatiles.substituteHp > 0;
  let typeEff = foresightTypeEffectiveness(move, defender, rulesGeneration);

  if (isSoundMove(move) && hasAbility(defender, ABILITY.SOUNDPROOF)) {
    logs.push(announceAbility(defender));
    logs.push(`${defender.member.nameJa}には　効果がないようだ…`);
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  if (sturdyBlocksOhko(defender, move)) {
    logs.push(announceAbility(defender));
    logs.push(`${defender.member.nameJa}は　がんじょうで　耐えた！`);
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  const absorb = tryAbsorbMove(defender, move, typeEff);
  if (absorb.kind === "heal") {
    applyAbsorbHeal(defender, absorb.heal, logs);
    attacker.volatiles.lastMoveUsed = move;
    return;
  }
  if (absorb.kind === "flash_fire") {
    logs.push(announceAbility(defender));
    defender.volatiles.flashFireActive = true;
    logs.push(`${defender.member.nameJa}は　ほのおを　吸収した！`);
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  if (wonderGuardBlocks(defender, typeEff, move)) {
    logs.push(announceAbility(defender));
    logs.push(`${defender.member.nameJa}には　効果がないようだ…`);
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  // Whirlpool uses partial-trap residual like Wrap.
  const effectiveCode =
    move.pokeapi_id === 250 ? "unique-partial-trap" : code;

  // Present may heal instead of damaging.
  let presentPower: number | null = null;
  if (move.pokeapi_id === 217) {
    const roll = randInt(1, 100);
    if (roll <= 20) {
      const heal = Math.max(1, Math.floor(defender.maxHp / 4));
      defender.currentHp = Math.min(defender.maxHp, defender.currentHp + heal);
      logs.push(`${defender.member.nameJa}の　HPが　回復した！`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    presentPower = roll <= 60 ? 40 : roll <= 90 ? 80 : 120;
  }

  // Partial trap can still immobilize on immunity (Gen1), but deals 0 damage
  if (
    typeEff === 0 &&
    (levitateBlocksGround(defender, move.type_id) ||
      (effectiveCode !== "unique-fixed-damage" &&
        (effectiveCode !== "unique-partial-trap" || rulesGeneration >= 2)))
  ) {
    logNoEffect(defender, move, logs);
    attacker.volatiles.lastMoveUsed = move;
    return;
  }

  if (effectiveCode === "unique-fixed-damage") {
    const fixed = fixedDamage(attacker, defender, move);
    if (fixed == null) {
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    const result = applyDamage(defender, fixed, { move, logs });
    totalDealt = result.dealt;
    brokeSub = result.brokeSub;
    if (emitBeat) {
      logs.push(
        `${defender.member.nameJa}に　${result.dealt}の　ダメージ！`,
      );
      emitDamageThenHpBerry(defender, logs, emitBeat);
    } else {
      tryHpThresholdBerry(defender, logs);
    }
  } else {
    const variable = resolveVariableMovePower(move, attacker, randInt);
    if (variable.log) logs.push(variable.log);
    const basePower =
      move.pokeapi_id === 251
        ? 10
        : (presentPower ?? variable.power ?? move.power);
    const poweredMove: Move = {
      ...move,
      power:
        basePower == null
          ? basePower
          : basePower * semiInvulnerablePowerMultiplier(move, defender, rulesGeneration),
    };
    // Beat Up: one hit per known ally (fallback: self only).
    const beatUpHits =
      move.pokeapi_id === 251
        ? Math.max(1, attacker.volatiles.knownMoves.length || 1)
        : null;
    const hits = beatUpHits ?? rollHits(meta);
    const weatherId = effectiveWeatherId(field, attacker, defender);
    const rollHit = (): { damage: number; crit: boolean } => {
      const crit = rollsCrit(attacker, defender, move, rulesGeneration);
      let damage =
        typeEff === 0
          ? 0
          : calcDamage(
              attacker,
              defender,
              poweredMove,
              crit,
              field[defender.side],
              weatherId,
              rulesGeneration,
            );
      if (code === "unique-explosion" && damage > 0) {
        damage = Math.max(1, damage * 2);
      }
      return { damage, crit: crit && damage > 0 };
    };
    // Gen1: one crit roll / damage value shared across multi-hit. Gen2+: rolled per hit.
    const rollsPerHit = rulesGeneration >= 2 && hits > 1;
    const firstHit = rollHit();
    let perHit = firstHit.damage;
    if (firstHit.crit && !rollsPerHit) logs.push("急所に　当たった！");
    let actualHits = 0;
    for (let i = 0; i < hits; i += 1) {
      if (defender.currentHp <= 0 && defender.volatiles.substituteHp <= 0) break;
      const hit = !rollsPerHit || i === 0 ? firstHit : rollHit();
      perHit = hit.damage;
      const result = applyDamage(defender, perHit, { move, logs });
      if (result.dealt <= 0 && perHit <= 0) break;
      actualHits += 1;
      totalDealt += result.dealt;
      if (result.brokeSub) brokeSub = true;
      if (rollsPerHit && hit.crit && !emitBeat) logs.push("急所に　当たった！");
      if (emitBeat && hits > 1) {
        const beatLogs = [
          ...(i === 0 ? [...logs] : []),
          ...(rollsPerHit && hit.crit ? ["急所に　当たった！"] : []),
          `${actualHits}回目！　${result.dealt}の　ダメージ！`,
        ];
        logs.length = 0;
        emitBeat(beatLogs);
        const berryLogs: TurnLogLine[] = [];
        if (tryHpThresholdBerry(defender, berryLogs) && berryLogs.length) {
          emitBeat(berryLogs);
        }
      }
    }
    if (hits > 1) {
      const hitMsg = `${actualHits}回　当たった！`;
      if (!emitBeat) logs.push(hitMsg);
      else if (actualHits > 0) {
        // Own beat so HP bar already refreshed per hit; announce count after
        emitBeat([hitMsg]);
      }
    } else if (emitBeat) {
      logs.push(
        perHit > 0
          ? `${defender.member.nameJa}に　${totalDealt}の　ダメージ！`
          : `${defender.member.nameJa}には　効果がないようだ…`,
      );
      emitDamageThenHpBerry(defender, logs, emitBeat);
    } else {
      tryHpThresholdBerry(defender, logs);
    }
  }

  if (typeEff > 1) {
    const msg = "効果は　抜群だ！";
    if (emitBeat) emitBeat([msg]);
    else logs.push(msg);
  } else if (typeEff > 0 && typeEff < 1) {
    const msg = "効果は　今ひとつの　ようだ…";
    if (emitBeat) emitBeat([msg]);
    else logs.push(msg);
  } else if (typeEff === 0 && code === "unique-partial-trap") {
    logs.push(`${defender.member.nameJa}には　ダメージが　ないが　しめつけた！`);
  }

  if (brokeSub) logs.push(`${defender.member.nameJa}の　みがわりが　消えた！`);

  if (meta.drain > 0 && totalDealt > 0) {
    const heal = Math.max(1, Math.floor((totalDealt * meta.drain) / 100));
    const ooze = liquidOozeOnDrain(defender, heal);
    if (ooze.damageAttacker) {
      logs.push(announceAbility(defender));
      attacker.currentHp = Math.max(0, attacker.currentHp - ooze.amount);
      logs.push(`${attacker.member.nameJa}は　ダメージを　受けた！`);
      emitDamageThenHpBerry(attacker, logs, emitBeat);
    } else {
      attacker.currentHp = Math.min(attacker.maxHp, attacker.currentHp + heal);
      logs.push(`${attacker.member.nameJa}は　体力を　吸い取った！`);
    }
  }
  if (meta.drain < 0 && totalDealt > 0 && !rockHeadPreventsRecoil(attacker)) {
    const recoil = recoilDamage(move, totalDealt, rulesGeneration);
    attacker.currentHp = Math.max(0, attacker.currentHp - recoil);
    logs.push(`${attacker.member.nameJa}は　反動を　受けた！`);
    emitDamageThenHpBerry(attacker, logs, emitBeat);
  } else if (meta.drain < 0 && totalDealt > 0 && rockHeadPreventsRecoil(attacker)) {
    logs.push(announceAbility(attacker));
  }
  // Gen2 Struggle: recoil is 1/4 of the damage dealt.
  if (move.pokeapi_id === STRUGGLE_POKEAPI && rulesGeneration >= 2 && totalDealt > 0) {
    const recoil = Math.max(1, Math.floor(totalDealt / 4));
    attacker.currentHp = Math.max(0, attacker.currentHp - recoil);
    logs.push(`${attacker.member.nameJa}は　反動を　受けた！`);
    emitDamageThenHpBerry(attacker, logs, emitBeat);
  }

  const grace = secondaryChanceMultiplier(attacker);
  const dust = shieldDustBlocksSecondary(defender);

  if (meta.flinch_chance > 0 && !dust && chance(Math.min(100, meta.flinch_chance * grace))) {
    if (
      defender.volatiles.substituteHp <= 0 &&
      !abilityBlocksFlinch(defender)
    ) {
      defender.volatiles.flinch = true;
    }
  }
  const attackerToolId =
    attacker.heldTool && !attacker.heldTool.consumed
      ? attacker.heldTool.pokeapiId
      : null;
  if (
    !dust &&
    rollKingsRockFlinch(attackerToolId, move, totalDealt) &&
    defender.volatiles.substituteHp <= 0 &&
    !abilityBlocksFlinch(defender)
  ) {
    defender.volatiles.flinch = true;
    logs.push(`${defender.member.nameJa}は　ひるんでいる！`);
  }

  const hitFrozenTarget =
    defender.status === "freeze" &&
    totalDealt > 0 &&
    !brokeSub &&
    defender.volatiles.substituteHp <= 0;

  if (meta.ailment && meta.ailment !== "trap" && !dust) {
    if (
      defender.volatiles.substituteHp <= 0 &&
      !secondaryBlockedBySameType(move, defender, meta.ailment, rulesGeneration)
    ) {
      const pct =
        (meta.ailment_chance > 0 ? meta.ailment_chance : 100) * grace;
      if (chance(Math.min(100, pct))) {
        const applied = applyAilment(
          defender,
          meta.ailment,
          logs,
          defender.member.nameJa,
          attacker.side,
          effectiveWeatherId(field, attacker, defender),
          field,
          { rulesGeneration, silentFailure: true },
        );
        const synced =
          applied &&
          synchronizeStatus(
            defender,
            attacker,
            meta.ailment,
            logs,
            effectiveWeatherId(field, attacker, defender),
            field,
            rulesGeneration,
          );
        if (
          meta.ailment === "paralysis" ||
          meta.ailment === "sleep" ||
          meta.ailment === "freeze" ||
          meta.ailment === "burn" ||
          meta.ailment === "poison" ||
          meta.ailment === "confusion"
        ) {
          emitAilmentThenBerry(
            defender,
            meta.ailment as BattleStatus | "confusion",
            applied,
            logs,
            emitBeat,
          );
          emitAilmentThenBerry(
            attacker,
            meta.ailment as BattleStatus,
            synced,
            logs,
            emitBeat,
          );
        }
      }
    }
  } else if (meta.ailment && meta.ailment !== "trap" && dust) {
    // Shield Dust: blocked
  }

  // A Fire move with a burn chance thaws a frozen target, after the secondary roll (Gen1–2).
  if (hitFrozenTarget && meta.ailment === "burn" && defender.status === "freeze") {
    defender.status = null;
    logs.push(`${defender.member.nameJa}の　こおりが　溶けた！`);
  }

  if (category === "damage-lower" || category === "damage-raise") {
    applyStatChanges(
      attacker,
      defender,
      move,
      logs,
      category === "damage-lower",
      field,
      rulesGeneration,
    );
  } else if (meta.stat_changes.length && meta.stat_chance > 0) {
    applyStatChanges(
      attacker,
      defender,
      move,
      logs,
      true,
      field,
      rulesGeneration,
    );
  }

  // Rapid Spin: frees the user from binding, Leech Seed and Spikes.
  if (move.pokeapi_id === RAPID_SPIN_POKEAPI && attacker.currentHp > 0 && totalDealt > 0) {
    if (attacker.volatiles.partialTrap) {
      logs.push(
        `${attacker.member.nameJa}は　${attacker.volatiles.partialTrap.moveNameJa}から　解放された！`,
      );
      attacker.volatiles.partialTrap = null;
    }
    if (attacker.volatiles.leechSeed) {
      attacker.volatiles.leechSeed = false;
      attacker.volatiles.leechSeedFrom = null;
      logs.push(`${attacker.member.nameJa}は　やどりぎのタネを　吹き飛ばした！`);
    }
    if (field[attacker.side].spikes) {
      field[attacker.side].spikes = false;
      logs.push(`${attacker.member.nameJa}は　まきびしを　吹き飛ばした！`);
    }
  }

  if (
    (code === "unique-partial-trap" || move.pokeapi_id === 250) &&
    rulesGeneration >= 2
  ) {
    // Gen2: the target keeps acting but cannot switch; 1/16 at end of turn.
    if (
      totalDealt > 0 &&
      !brokeSub &&
      defender.volatiles.substituteHp <= 0 &&
      defender.currentHp > 0 &&
      !defender.volatiles.partialTrap
    ) {
      defender.volatiles.partialTrap = {
        moveNameJa: move.name_ja,
        turnsLeft: randInt(3, 5),
      };
      logs.push(partialTrapStartMessage(move, defender.member.nameJa, attacker.member.nameJa));
    }
  } else if (code === "unique-partial-trap" || move.pokeapi_id === 250) {
    // Gen1: duration 2–5 includes this turn; remaining turns force the same move.
    const duration = rollTrapTurns(meta);
    const fixed = Math.max(1, totalDealt || 1);
    defender.volatiles.trapTurns = duration;
    defender.volatiles.trapDamage = fixed;
    attacker.volatiles.bindingMove = move;
    attacker.volatiles.bindingTurnsLeft = duration - 1;
    attacker.volatiles.bindingDamage = fixed;
    logs.push(
      `${defender.member.nameJa}を　${duration}ターン　しめつけた！`,
    );
  }

  if (
    defender.currentHp <= 0 &&
    defender.volatiles.destinyBond &&
    attacker.currentHp > 0
  ) {
    attacker.currentHp = 0;
    logs.push(`${defender.member.nameJa}は　相手を　道連れにした！`);
  }

  // Gen1: no recharge after a KO or breaking a substitute. Gen2: always recharges once it hits.
  if (
    code === "unique-hyper-beam" &&
    attacker.currentHp > 0 &&
    (rulesGeneration >= 2 ||
      (totalDealt > 0 && defender.currentHp > 0 && !brokeSub))
  ) {
    attacker.volatiles.recharge = true;
  }

  if (totalDealt > 0) {
    onContactAbilityEffects(
      attacker,
      defender,
      move,
      logs,
      (t, ail, n) =>
        applyAilment(
          t,
          ail,
          logs,
          n,
          defender.side,
          effectiveWeatherId(field, attacker, defender),
          field,
          { rulesGeneration },
        ),
      (t, ail) =>
        canStatus(
          t,
          ail,
          effectiveWeatherId(field, attacker, defender),
          field,
          rulesGeneration,
        ),
    );
    applyColorChange(defender, move, totalDealt, logs);
    applyItemMoveAfterHit(
      attacker,
      defender,
      move,
      hitSubstitute,
      logs,
      rulesGeneration,
    );
  }
  finishThrashLock(attacker, move, logs);
  attacker.volatiles.lastMoveUsed = move;
}

function speedTieBreak(): boolean {
  return Math.random() < 0.5;
}

function effectiveSpeed(
  fighter: BattleFighter,
  weatherId: string | null = null,
): number {
  let spd = stagedStat(fighter.stats.speed, fighter.stages.speed);
  if (fighter.status === "paralysis") spd = Math.max(1, Math.floor(spd / 4));
  spd = Math.max(1, Math.floor(spd * abilitySpeedMultiplier(fighter, weatherId)));
  return spd;
}

function actionPriority(action: BattleAction): number {
  if (action.type === "move") return action.move.priority;
  if (action.type === "switch") return 6;
  return 0;
}

export function buildFighter(input: {
  side: BattleFighter["side"];
  member: BattleFighter["member"];
  species: BattleFighter["species"];
  stats: BattleFighter["stats"];
  currentHp: number;
  maxHp: number;
  /** Gen1: major status persists on the bench. */
  status?: BattleStatus;
  sleepTurns?: number;
  /** Was badly poisoned when it switched out. */
  badlyPoisoned?: boolean;
  toolPokeapiId?: number | null;
  toolConsumed?: boolean;
  toolNameJa?: string | null;
  /** Item state carried over from earlier in the battle (Trick / Thief / Knock Off). */
  heldTool?: BattleFighter["heldTool"];
  rulesGeneration?: number;
}): BattleFighter {
  const rulesGeneration = input.rulesGeneration ?? 1;
  const ability = abilityFieldsForBuild(
    input.member,
    input.species.type1,
    input.species.type2 ?? 0,
    rulesGeneration,
  );
  const volatiles = createVolatiles();
  // Gen1–2: Toxic reverts to regular poison on switch-out.
  // Gen3: stays badly poisoned, but the counter restarts from 1/16.
  if (rulesGeneration >= 3 && input.status === "poison" && input.badlyPoisoned) {
    volatiles.toxic = true;
    volatiles.toxicCounter = 0;
  }
  return {
    side: input.side,
    speciesId: input.member.speciesId,
    member: input.member,
    species: input.species,
    stats: input.stats,
    stages: createStages(),
    currentHp: input.currentHp,
    maxHp: input.maxHp,
    status: input.status ?? null,
    sleepTurns: input.sleepTurns ?? 0,
    volatiles,
    heldTool:
      input.heldTool !== undefined
        ? input.heldTool && { ...input.heldTool }
        : input.toolPokeapiId
          ? {
              pokeapiId: Number(input.toolPokeapiId),
              consumed: input.toolConsumed ?? false,
              nameJa: input.toolNameJa ?? null,
            }
          : null,
    abilityPokeapiId: ability.abilityPokeapiId,
    abilityNameJa: ability.abilityNameJa,
    battleType1: ability.battleType1,
    battleType2: ability.battleType2,
  };
}

export const PURSUIT_POKEAPI_ID = 228;

/** Side whose Pursuit hits the foe before it switches out (Gen2+). */
export function pursuitSideAgainstSwitch(
  actionA: BattleAction,
  actionB: BattleAction,
  rulesGeneration: number,
): PartySide | null {
  if (rulesGeneration < 2) return null;
  const uses = (action: BattleAction) =>
    action.type === "move" && action.move.pokeapi_id === PURSUIT_POKEAPI_ID;
  if (uses(actionA) && actionB.type === "switch") return "a";
  if (uses(actionB) && actionA.type === "switch") return "b";
  return null;
}

/**
 * Resolve one turn as ordered steps so the UI can refresh between movers.
 * Mutates fighters / field in place.
 */
export function resolveTurnSteps(input: {
  fighterA: BattleFighter;
  fighterB: BattleFighter;
  actionA: BattleAction;
  actionB: BattleAction;
  field: BattleFieldState;
  rulesGeneration?: number;
  /** Only this side acts (Pursuit before the foe switches); no end-of-turn. */
  pursuitSide?: PartySide;
  /** Sides that already acted this turn (e.g. Pursuit). */
  skipSides?: PartySide[];
}): {
  steps: TurnStep[];
  faintedA: boolean;
  faintedB: boolean;
  ran: PartySide | null;
} {
  const steps: TurnStep[] = [];
  const { fighterA, fighterB, actionA, actionB, field } = input;
  const rulesGeneration = input.rulesGeneration ?? 1;
  const pursuitSide = input.pursuitSide ?? null;
  const skipSides = input.skipSides ?? [];
  fighterA.volatiles.physicalDamageTakenThisTurn = 0;
  fighterB.volatiles.physicalDamageTakenThisTurn = 0;
  fighterA.volatiles.specialDamageTakenThisTurn = 0;
  fighterB.volatiles.specialDamageTakenThisTurn = 0;
  fighterA.volatiles.destinyBond = false;
  fighterB.volatiles.destinyBond = false;
  fighterA.volatiles.quickClawActive = rollQuickClaw(
    fighterA.heldTool && !fighterA.heldTool.consumed
      ? fighterA.heldTool.pokeapiId
      : null,
  );
  fighterB.volatiles.quickClawActive = rollQuickClaw(
    fighterB.heldTool && !fighterB.heldTool.consumed
      ? fighterB.heldTool.pokeapiId
      : null,
  );

  const pushStep = (
    logs: TurnLogLine[],
    ppSpent: TurnStep["ppSpent"] = null,
    forceSwitchSide: PartySide | null = null,
    hpSnapshot?: { a: number; b: number },
    statusSnapshot?: TurnStep["statusSnapshot"],
  ) => {
    if (logs.length === 0 && !ppSpent && !forceSwitchSide) return;
    steps.push({
      logs,
      ppSpent,
      forceSwitchSide,
      hpSnapshot: hpSnapshot ?? {
        a: fighterA.currentHp,
        b: fighterB.currentHp,
      },
      statusSnapshot: statusSnapshot ?? {
        a: fighterA.status,
        b: fighterB.status,
        confusionA: fighterA.volatiles.confusionTurns,
        confusionB: fighterB.volatiles.confusionTurns,
      },
    });
  };

  if (actionA.type === "run" || actionB.type === "run") {
    const side = actionA.type === "run" ? "a" : "b";
    pushStep([
      `${side === "a" ? fighterA.member.nameJa : fighterB.member.nameJa}側は　降参した！`,
    ]);
    return { steps, faintedA: false, faintedB: false, ran: side };
  }

  type Slot = { fighter: BattleFighter; foe: BattleFighter; action: BattleAction };
  const slots: Slot[] = [
    { fighter: fighterA, foe: fighterB, action: actionA },
    { fighter: fighterB, foe: fighterA, action: actionB },
  ];

  const orderKey = (slot: Slot, useClaw: boolean) => {
    const pri = actionPriority(slot.action);
    const weatherId = effectiveWeatherId(field, fighterA, fighterB);
    const spd =
      effectiveSpeed(slot.fighter, weatherId) +
      (useClaw && slot.fighter.volatiles.quickClawActive ? 100000 : 0);
    return { pri, spd };
  };

  const compareSlots = (x: Slot, y: Slot, useClaw: boolean): number => {
    const kx = orderKey(x, useClaw);
    const ky = orderKey(y, useClaw);
    if (ky.pri !== kx.pri) return ky.pri - kx.pri;
    if (ky.spd !== kx.spd) return ky.spd - kx.spd;
    return 0;
  };

  slots.sort((x, y) => {
    const c = compareSlots(x, y, true);
    if (c !== 0) return c;
    return speedTieBreak() ? -1 : 1;
  });

  for (let slotIndex = 0; slotIndex < slots.length; slotIndex += 1) {
    const slot = slots[slotIndex]!;
    if (slot.fighter.currentHp <= 0) continue;
    if (slot.action.type === "switch") continue;
    if (slot.action.type !== "move") continue;
    if (pursuitSide && slot.fighter.side !== pursuitSide) continue;
    if (skipSides.includes(slot.fighter.side)) continue;

    const foeIndex = slots.findIndex((s) => s.fighter.side === slot.foe.side);
    const actsBeforeFoe = foeIndex < 0 || slotIndex < foeIndex;
    // Announce whenever Quick Claw rolled this turn and this side moves first.
    if (
      !pursuitSide &&
      slot.fighter.volatiles.quickClawActive &&
      actsBeforeFoe
    ) {
      pushStep([
        `${slot.fighter.member.nameJa}の　せんせいのツメが　発動した！`,
      ]);
    }

    const logs: TurnLogLine[] = [];
    const wasLoafing = slot.fighter.volatiles.truantIdle;
    const acted = canAct(slot.fighter, logs, rulesGeneration, slot.action.move);
    if (
      abilitiesEnabled(rulesGeneration) &&
      !truantTogglesAtEndOfTurn(rulesGeneration)
    ) {
      toggleTruantAfterAction(slot.fighter, wasLoafing);
    }
    if (!acted) {
      if (slot.fighter.volatiles.bindingMove) {
        const foe = slot.foe;
        slot.fighter.volatiles.bindingMove = null;
        slot.fighter.volatiles.bindingTurnsLeft = 0;
        slot.fighter.volatiles.bindingDamage = 0;
        foe.volatiles.trapTurns = 0;
        foe.volatiles.trapDamage = 0;
        logs.push("しめつけが　解けた！");
      }
      if (slot.fighter.volatiles.bideMove) {
        slot.fighter.volatiles.bideMove = null;
        slot.fighter.volatiles.bideTurnsLeft = 0;
        slot.fighter.volatiles.bideDamage = 0;
        logs.push("がまんが　解けた！");
      }
      if (slot.fighter.currentHp <= 0) {
        logs.push(`${slot.fighter.member.nameJa}は　たおれた！`);
        // Confusion / residual self-KO: clear locks so battle can go to switch
        slot.fighter.volatiles.rageActive = false;
        slot.fighter.volatiles.lockedMove = null;
        slot.fighter.volatiles.lockTurnsLeft = 0;
      }
      pushStep(logs);
      {
        const berryLogs: TurnLogLine[] = [];
        tryHpThresholdBerry(slot.fighter, berryLogs);
        if (berryLogs.length) pushStep(berryLogs);
      }
      continue;
    }
    if (slot.foe.currentHp <= 0 && slot.action.move.damage_class !== "status") {
      const cat = slot.action.move.effect_category;
      if (
        cat !== "net-good-stats" &&
        cat !== "heal" &&
        cat !== "field-effect" &&
        slot.action.move.effect_code !== "unique-rest" &&
        slot.action.move.effect_code !== "unique-substitute"
      ) {
        continue;
      }
    }

    const move =
      pursuitSide && slot.action.move.pokeapi_id === PURSUIT_POKEAPI_ID
        ? {
            ...slot.action.move,
            power: (slot.action.move.power ?? 40) * 2,
          }
        : slot.action.move;
    const continuingCharge =
      !!slot.fighter.volatiles.chargingMove &&
      move.effect_code === "unique-charge";
    const continuingLock =
      !!slot.fighter.volatiles.lockedMove && isThrashLike(move);
    const continuingBind =
      !!slot.fighter.volatiles.bindingMove &&
      slot.fighter.volatiles.bindingTurnsLeft > 0 &&
      move.effect_code === "unique-partial-trap";
    const continuingBide =
      !!slot.fighter.volatiles.bideMove &&
      slot.fighter.volatiles.bideTurnsLeft > 0 &&
      move.effect_code === "unique-bide";
    const continuingRage =
      slot.fighter.volatiles.rageActive &&
      move.pokeapi_id === 99 &&
      slot.fighter.volatiles.lockTurnsLeft > 0;

    const beats: {
      logs: TurnLogLine[];
      hpA: number;
      hpB: number;
      statusA: BattleStatus;
      statusB: BattleStatus;
      confusionA: number;
      confusionB: number;
    }[] = [];
    const captureStatus = () => ({
      statusA: fighterA.status,
      statusB: fighterB.status,
      confusionA: fighterA.volatiles.confusionTurns,
      confusionB: fighterB.volatiles.confusionTurns,
    });
    const emitBeat = (lines: TurnLogLine[]) => {
      if (lines.length) {
        beats.push({
          logs: lines,
          hpA: fighterA.currentHp,
          hpB: fighterB.currentHp,
          ...captureStatus(),
        });
      }
    };

    const ctx: ExecCtx = { forceSwitchSide: null };
    executeMove(
      slot.fighter,
      slot.foe,
      move,
      logs,
      field,
      emitBeat,
      false,
      ctx,
      rulesGeneration,
    );
    if (logs.length) {
      beats.push({
        logs: [...logs],
        hpA: fighterA.currentHp,
        hpB: fighterB.currentHp,
        ...captureStatus(),
      });
    }

    if (slot.foe.currentHp <= 0) {
      const faintLine = `${slot.foe.member.nameJa}は　たおれた！`;
      if (beats.length) beats[beats.length - 1].logs.push(faintLine);
      else {
        beats.push({
          logs: [faintLine],
          hpA: fighterA.currentHp,
          hpB: fighterB.currentHp,
          ...captureStatus(),
        });
      }
    }
    if (slot.fighter.currentHp <= 0) {
      const faintLine = `${slot.fighter.member.nameJa}は　たおれた！`;
      if (beats.length) beats[beats.length - 1].logs.push(faintLine);
      else {
        beats.push({
          logs: [faintLine],
          hpA: fighterA.currentHp,
          hpB: fighterB.currentHp,
          ...captureStatus(),
        });
      }
    }

    const skipPp =
      continuingCharge ||
      continuingLock ||
      continuingBind ||
      continuingBide ||
      continuingRage;
    const ppPayload = skipPp
      ? null
      : {
          speciesId: slot.fighter.speciesId,
          moveId: move.id,
          amount:
            1 +
            (abilitiesEnabled(rulesGeneration)
              ? pressureExtraPp(slot.foe)
              : 0),
        };
    if (beats.length === 0) {
      pushStep([], ppPayload, ctx.forceSwitchSide);
    } else {
      beats.forEach((beat, index) => {
        pushStep(
          beat.logs,
          index === 0 ? ppPayload : null,
          index === beats.length - 1 ? ctx.forceSwitchSide : null,
          { a: beat.hpA, b: beat.hpB },
          {
            a: beat.statusA,
            b: beat.statusB,
            confusionA: beat.confusionA,
            confusionB: beat.confusionB,
          },
        );
      });
    }

    if (ctx.forceSwitchSide) break;
  }

  if (pursuitSide) {
    fighterA.volatiles.flinch = false;
    fighterB.volatiles.flinch = false;
    return {
      steps,
      faintedA: fighterA.currentHp <= 0,
      faintedB: fighterB.currentHp <= 0,
      ran: null,
    };
  }

  {
    const endLogs: TurnLogLine[] = [];
    // Keep foe trapTurns in sync with binder's remaining lock (for UI / canAct)
    for (const [trapped, binder] of [
      [fighterA, fighterB],
      [fighterB, fighterA],
    ] as const) {
      if (
        binder.volatiles.bindingMove &&
        binder.volatiles.bindingTurnsLeft > 0
      ) {
        trapped.volatiles.trapTurns = binder.volatiles.bindingTurnsLeft + 1;
      } else if (
        !binder.volatiles.bindingMove &&
        trapped.volatiles.trapTurns > 0 &&
        trapped.volatiles.trapDamage > 0
      ) {
        // Binder finished or interrupted; ensure clear
        trapped.volatiles.trapTurns = 0;
        trapped.volatiles.trapDamage = 0;
      }
    }
    tryEndTurnStatus(fighterA, fighterB, endLogs, rulesGeneration);
    tryEndTurnStatus(fighterB, fighterA, endLogs, rulesGeneration);
    applyPartialTrapResidual(fighterA, fighterB, endLogs);
    applyPartialTrapResidual(fighterB, fighterA, endLogs);
    if (rulesGeneration === 2) {
      for (const fighter of [fighterA, fighterB]) {
        if (fighter.status === "freeze" && fighter.currentHp > 0 && randInt(0, 99) < 10) {
          fighter.status = null;
          endLogs.push(`${fighter.member.nameJa}の　こおりが　溶けた！`);
        }
      }
    }
    applyCurseResidual(fighterA, endLogs);
    applyCurseResidual(fighterB, endLogs);
    for (const fighter of [fighterA, fighterB]) {
      if (fighter.volatiles.nightmare && fighter.status === "sleep" && fighter.currentHp > 0) {
        const dmg = Math.max(1, Math.floor(fighter.maxHp / 4));
        fighter.currentHp = Math.max(0, fighter.currentHp - dmg);
        endLogs.push(`${fighter.member.nameJa}は　悪夢に　うなされている！`);
      }
      if (fighter.volatiles.perishCount != null && fighter.currentHp > 0) {
        fighter.volatiles.perishCount -= 1;
        endLogs.push(
          `${fighter.member.nameJa}の　滅びのカウントが　${fighter.volatiles.perishCount}に　なった！`,
        );
        if (fighter.volatiles.perishCount <= 0) {
          fighter.currentHp = 0;
          endLogs.push(`${fighter.member.nameJa}の　残りHPが　なくなった！`);
        }
      }
    }
    {
      const residualWeather = effectiveWeatherId(field, fighterA, fighterB);
      for (const fighter of [fighterA, fighterB]) {
        applySandstormResidual(
          fighter,
          field,
          endLogs,
          residualWeather === "sand" &&
            !(
              abilitiesEnabled(rulesGeneration) &&
              hasAbility(fighter, ABILITY.SAND_VEIL)
            ),
        );
        applyHailResidual(fighter, field, endLogs, residualWeather === "hail");
      }
    }
    applyEndOfTurnAbilities(
      fighterA,
      field,
      fighterA,
      fighterB,
      endLogs,
      rulesGeneration,
    );
    applyEndOfTurnAbilities(
      fighterB,
      field,
      fighterB,
      fighterA,
      endLogs,
      rulesGeneration,
    );
    if (field.futureSight) {
      field.futureSight.turnsLeft -= 1;
      if (field.futureSight.turnsLeft <= 0) {
        const target =
          field.futureSight.targetSide === "a" ? fighterA : fighterB;
        if (target.currentHp > 0) {
          const dealt = Math.min(target.currentHp, field.futureSight.damage);
          target.currentHp -= dealt;
          endLogs.push(
            `${target.member.nameJa}は　未来予知の　攻撃を　受けた！`,
          );
        }
        field.futureSight = null;
      }
    }
    if (endLogs.length) pushStep(endLogs);

    {
      const weatherLogs: TurnLogLine[] = [];
      field.weather = tickWeather(field.weather, weatherLogs);
      if (weatherLogs.length) pushStep(weatherLogs);
    }

    {
      const safeguardLogs: TurnLogLine[] = [];
      tickSafeguard(field, safeguardLogs);
      if (safeguardLogs.length) pushStep(safeguardLogs);
    }

    for (const fighter of [fighterA, fighterB]) {
      fighter.volatiles.protection = null;
      fighter.volatiles.usedProtectFamilyThisTurn = false;
      if (
        abilitiesEnabled(rulesGeneration) &&
        truantTogglesAtEndOfTurn(rulesGeneration)
      ) {
        toggleTruantAtEndOfTurn(fighter);
      }
    }

    for (const fighter of [fighterA, fighterB]) {
      const berryLogs: TurnLogLine[] = [];
      tryHpThresholdBerry(fighter, berryLogs);
      if (berryLogs.length) pushStep(berryLogs);
    }

    const leftoverLogs: TurnLogLine[] = [];
    processLeftovers(fighterA, leftoverLogs);
    processLeftovers(fighterB, leftoverLogs);
    if (leftoverLogs.length) pushStep(leftoverLogs);

    const faintLogs: TurnLogLine[] = [];
    if (
      fighterA.currentHp <= 0 &&
      !faintLogs.some((l) => l.includes(`${fighterA.member.nameJa}は　たおれた`)) &&
      !steps.some((s) =>
        s.logs.some((l) => l.includes(`${fighterA.member.nameJa}は　たおれた`)),
      )
    ) {
      faintLogs.push(`${fighterA.member.nameJa}は　たおれた！`);
    }
    if (
      fighterB.currentHp <= 0 &&
      !faintLogs.some((l) => l.includes(`${fighterB.member.nameJa}は　たおれた`)) &&
      !steps.some((s) =>
        s.logs.some((l) => l.includes(`${fighterB.member.nameJa}は　たおれた`)),
      )
    ) {
      faintLogs.push(`${fighterB.member.nameJa}は　たおれた！`);
    }
    if (faintLogs.length) pushStep(faintLogs);
  }

  fighterA.volatiles.flinch = false;
  fighterB.volatiles.flinch = false;
  fighterA.volatiles.quickClawActive = false;
  fighterB.volatiles.quickClawActive = false;

  return {
    steps,
    faintedA: fighterA.currentHp <= 0,
    faintedB: fighterB.currentHp <= 0,
    ran: null,
  };
}

/** @deprecated Prefer resolveTurnSteps for UI pacing. */
export function resolveTurn(input: {
  fighterA: BattleFighter;
  fighterB: BattleFighter;
  actionA: BattleAction;
  actionB: BattleAction;
  field: BattleFieldState;
  rulesGeneration?: number;
}): {
  logs: TurnLogLine[];
  faintedA: boolean;
  faintedB: boolean;
  ran: PartySide | null;
} {
  const result = resolveTurnSteps(input);
  return {
    logs: result.steps.flatMap((s) => s.logs),
    faintedA: result.faintedA,
    faintedB: result.faintedB,
    ran: result.ran,
  };
}

export { applySpikesOnSwitchIn } from "./gen2UniqueMoves";
