import type { PartySide } from "../party/types";
import type { Move, MoveEffectMeta } from "../pokemon/moves";
import { EMPTY_EFFECT_META } from "../pokemon/moves";
import { usesSplitSpecial } from "../pokemon/baseStatFilters";
import {
  applyDamageRoll,
  damageBeforeRandom,
  fixedDamageRange,
} from "./calcDamage";
import { GEN1_MOVE_POOL, pickMetronomeMove } from "./gen1MovePool";
import { gen1TypeEffectiveness } from "./gen1TypeChart";
import {
  heldItemAccuracyFactor,
  heldItemCritDenomModifier,
  processLeftovers,
  rollFocusBandSurvival,
  rollKingsRockFlinch,
  rollQuickClaw,
  tryHpThresholdBerry,
  tryStatusCureBerry,
} from "./toolEffects";
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
  weatherGuaranteesHit,
  weatherIdFromMovePokeapi,
  weatherSkipsSolarBeamCharge,
} from "./weather";

function typeThatResists(moveTypeId: number): number {
  for (let t = 1; t <= 17; t += 1) {
    if (gen1TypeEffectiveness(moveTypeId, t, 0) < 1) return t;
  }
  return 1;
}

function foresightTypeEffectiveness(
  move: Move,
  defender: BattleFighter,
): number {
  let typeEff = gen1TypeEffectiveness(
    move.type_id,
    defender.species.type1,
    defender.species.type2,
  );
  if (
    defender.volatiles.foresight &&
    typeEff === 0 &&
    (move.type_id === 1 || move.type_id === 7) &&
    (defender.species.type1 === 14 || defender.species.type2 === 14)
  ) {
    typeEff = 1;
  }
  return typeEff;
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

/** Gen1 crit: high-crit moves use /64, else /512; Focus Energy quarters (cart glitch). */
function rollsCrit(attacker: BattleFighter, move: Move): boolean {
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
  const { damage: before } = damageBeforeRandom(
    {
      attackerLevel: attacker.member.level,
      attackerSpecies: attacker.species,
      attackerStats: attacker.stats,
      attackerAttackStage: attacker.stages.attack,
      attackerSpecialStage: specialAttackStage(attacker, rulesGeneration),
      defenderSpecies: defender.species,
      defenderStats: defender.stats,
      defenderDefenseStage: defender.stages.defense,
      defenderSpecialStage: specialDefenseStage(defender, rulesGeneration),
    },
    move,
    {
      crit,
      attackerBurn: attacker.status === "burn",
      defenderReflect: defenderField.reflect,
      defenderLightScreen: defenderField.lightScreen,
      weatherId,
      attackerItemPokeapiId:
        attacker.heldTool && !attacker.heldTool.consumed
          ? attacker.heldTool.pokeapiId
          : null,
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

function canStatus(
  target: BattleFighter,
  ailment: string,
  weatherId: string | null = null,
  field?: BattleFieldState,
): boolean {
  // Gen1: major status cannot be overwritten (Rest is the exception, handled separately).
  if (target.status) return false;
  if (field && safeguardBlocksStatus(field, target)) return false;
  if (ailment === "paralysis" && target.species.type1 === 4) return false;
  if (ailment === "burn" && target.species.type1 === 2) return false;
  // Gen2: cannot freeze while sunny.
  if (ailment === "freeze" && weatherId === "sun") return false;
  if (
    (ailment === "poison" || ailment === "toxic") &&
    (target.species.type1 === 8 || target.species.type2 === 8)
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
): boolean {
  if (ailment === "confusion") {
    if (field && safeguardBlocksStatus(field, target)) {
      logs.push(`${name}は　しんぴのまもりで　守られている！`);
      return false;
    }
    if (target.volatiles.confusionTurns <= 0) {
      target.volatiles.confusionTurns = randInt(2, 5);
      logs.push(`${name}は　こんらんした！`);
      return true;
    }
    return false;
  }
  if (ailment === "trap") return false;
  if (ailment === "leech-seed") {
    if (
      target.species.type1 === 5 ||
      target.species.type2 === 5
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
  if (!canStatus(target, ailment, weatherId, field)) {
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
    if (ailment === "sleep") target.sleepTurns = randInt(1, 7);
    const ja: Record<string, string> = {
      paralysis: "まひした",
      sleep: "ねむってしまった",
      freeze: "こおってしまった",
      burn: "やけどを　おった",
      poison: "どくを　あびた",
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
  const chancePct = metaOf(move).stat_chance;
  if (chancePct > 0 && !chance(chancePct)) return;

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
): boolean {
  if (attacker.volatiles.sureHit) {
    attacker.volatiles.sureHit = false;
    return true;
  }
  // Gen1: only Swift reliably hits Fly / Dig mid-charge
  if (
    defender.volatiles.semiInvulnerable &&
    move.pokeapi_id !== 129 // Swift
  ) {
    return false;
  }
  if (weatherGuaranteesHit(weatherId, move.pokeapi_id)) return true;
  if (move.accuracy == null) return true; // Swift etc.
  const accStage = attacker.stages.accuracy - defender.stages.evasion;
  const mult = stageMultiplierClamped(accStage);
  const defenderToolId =
    defender.heldTool && !defender.heldTool.consumed
      ? defender.heldTool.pokeapiId
      : null;
  const thresh = Math.floor(
    (move.accuracy * mult * 255 * heldItemAccuracyFactor(defenderToolId)) / 100,
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
): void {
  if (fighter.currentHp <= 0) return;
  if (fighter.status === "burn" || fighter.status === "poison") {
    const dmg = Math.max(1, Math.floor(fighter.maxHp / 16));
    fighter.currentHp = Math.max(0, fighter.currentHp - dmg);
    logs.push(
      `${fighter.member.nameJa}は　${fighter.status === "burn" ? "やけど" : "どく"}の　ダメージを　受けた！`,
    );
  }
  if (fighter.volatiles.leechSeed && fighter.currentHp > 0) {
    const dmg = Math.max(1, Math.floor(fighter.maxHp / 16));
    fighter.currentHp = Math.max(0, fighter.currentHp - dmg);
    logs.push(`${fighter.member.nameJa}は　やどりぎのタネの　ダメージを　受けた！`);
    const from = fighter.volatiles.leechSeedFrom;
    const planter =
      from === other.side ? other : from === fighter.side ? fighter : other;
    if (planter.currentHp > 0) {
      planter.currentHp = Math.min(planter.maxHp, planter.currentHp + dmg);
      logs.push(`${planter.member.nameJa}は　体力を　吸い取った！`);
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

function canAct(
  fighter: BattleFighter,
  logs: TurnLogLine[],
  rulesGeneration = 1,
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
    fighter.volatiles.flinch = false;
    logs.push(`${fighter.member.nameJa}は　ひるんで　動けない！`);
    clearChargeIfAny();
    return false;
  }
  if (fighter.volatiles.infatuated && chance(50)) {
    logs.push(`${fighter.member.nameJa}は　メロメロで　動けない！`);
    clearChargeIfAny();
    return false;
  }
  if (fighter.status === "freeze") {
    if (chance(25)) {
      fighter.status = null;
      logs.push(`${fighter.member.nameJa}の　こおりが　溶けた！`);
    } else {
      logs.push(`${fighter.member.nameJa}は　こおっていて　動けない！`);
      clearChargeIfAny();
      return false;
    }
  }
  if (fighter.status === "sleep") {
    // sleepTurns = remaining asleep turns (must be ≥1 when status is set).
    // Wake only after those turns are consumed — never on the apply turn.
    if (fighter.sleepTurns <= 0) {
      fighter.status = null;
      logs.push(`${fighter.member.nameJa}は　目を　覚ました！`);
      // Gen1: cannot select a move on the turn sleep ends
      clearChargeIfAny();
      return false;
    }
    logs.push(`${fighter.member.nameJa}は　ぐうぐう　眠っている！`);
    fighter.sleepTurns -= 1;
    clearChargeIfAny();
    return false;
  }
  if (fighter.status === "paralysis" && chance(25)) {
    logs.push(`${fighter.member.nameJa}は　まひして　動けない！`);
    clearChargeIfAny();
    return false;
  }
  if (fighter.volatiles.confusionTurns > 0) {
    fighter.volatiles.confusionTurns -= 1;
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
          type_id: 1,
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
  move: Move,
  logs: TurnLogLine[],
  field: BattleFieldState,
  emitBeat?: (lines: TurnLogLine[]) => void,
  fromMirror = false,
  ctx?: ExecCtx,
  rulesGeneration = 1,
): void {
  const code = move.effect_code;
  const category = move.effect_category ?? "damage";
  const meta = metaOf(move);

  // Two-turn charge: wind-up turn (Solar Beam skips charge in sun)
  if (
    code === "unique-charge" &&
    !attacker.volatiles.chargingMove &&
    !weatherSkipsSolarBeamCharge(field.weather?.id ?? null, move.pokeapi_id)
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
      const resistType = typeThatResists(last.type_id);
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
      field.weather?.id ?? null,
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
      field.weather = setWeather(field.weather, weatherId, logs);
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
    if (!checkAccuracy(attacker, defender, move, field.weather?.id ?? null)) {
      logs.push(`しかし　${defender.member.nameJa}には　当たらなかった！`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    logs.push(`${defender.member.nameJa}を　吹き飛ばした！`);
    if (defender.volatiles.cannotEscape) {
      logs.pop();
      logs.push("しかし　うまく　決まらなかった！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
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
    // After Rest: one full asleep turn, then a wake turn that cannot move.
    // Chesto / Lum wake immediately (Gen2 held berry).
    attacker.sleepTurns = 1;
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
    const picked = pickMetronomeMove();
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
    if (!checkAccuracy(attacker, defender, move, field.weather?.id ?? null)) {
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
    const heal = Math.max(1, Math.floor((attacker.maxHp * (meta.healing || 50)) / 100));
    attacker.currentHp = Math.min(attacker.maxHp, attacker.currentHp + heal);
    logs.push(`${attacker.member.nameJa}の　HPが　回復した！`);
    attacker.volatiles.lastMoveUsed = move;
    return;
  }
  if (category === "net-good-stats") {
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
    if (defender.volatiles.substituteHp > 0) {
      logs.push("しかし　身代わりには　効果が　ない！");
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    if (!checkAccuracy(attacker, defender, move, field.weather?.id ?? null)) {
      logs.push(`しかし　${defender.member.nameJa}には　当たらなかった！`);
      attacker.volatiles.lastMoveUsed = move;
      return;
    }
    if (blockedByProtect(defender, logs)) {
      attacker.volatiles.lastMoveUsed = move;
      return;
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
      field.weather?.id ?? null,
      field,
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
    }
    attacker.volatiles.lastMoveUsed = move;
    return;
  }
  if (code === "unique-ohko" || category === "ohko") {
    if (!checkAccuracy(attacker, defender, move, field.weather?.id ?? null)) {
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
    if (!checkAccuracy(attacker, defender, move, field.weather?.id ?? null)) {
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
    if (!checkAccuracy(attacker, defender, move, field.weather?.id ?? null)) {
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
  if (!checkAccuracy(attacker, defender, move, field.weather?.id ?? null)) {
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

  if (code === "unique-explosion") {
    attacker.currentHp = 0;
  }

  let totalDealt = 0;
  let brokeSub = false;
  let typeEff = foresightTypeEffectiveness(move, defender);
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
    effectiveCode !== "unique-fixed-damage" &&
    effectiveCode !== "unique-partial-trap"
  ) {
    logs.push(`${defender.member.nameJa}には　効果がないようだ…`);
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
    const poweredMove: Move = {
      ...move,
      power:
        move.pokeapi_id === 251
          ? 10
          : (presentPower ?? variable.power ?? move.power),
    };
    // Beat Up: one hit per known ally (fallback: self only).
    const beatUpHits =
      move.pokeapi_id === 251
        ? Math.max(1, attacker.volatiles.knownMoves.length || 1)
        : null;
    const hits = beatUpHits ?? rollHits(meta);
    const crit = rollsCrit(attacker, move);
    // Gen1: one crit roll / damage value shared across multi-hit
    let perHit =
      typeEff === 0
        ? 0
        : calcDamage(
            attacker,
            defender,
            poweredMove,
            crit,
            field[defender.side],
            field.weather?.id ?? null,
            rulesGeneration,
          );
    if (code === "unique-explosion" && perHit > 0) {
      perHit = Math.max(1, perHit * 2);
    }
    if (crit && perHit > 0) logs.push("急所に　当たった！");
    let actualHits = 0;
    for (let i = 0; i < hits; i += 1) {
      if (defender.currentHp <= 0 && defender.volatiles.substituteHp <= 0) break;
      const result = applyDamage(defender, perHit, { move, logs });
      if (result.dealt <= 0 && perHit <= 0) break;
      actualHits += 1;
      totalDealt += result.dealt;
      if (result.brokeSub) brokeSub = true;
      if (emitBeat && hits > 1) {
        const beatLogs = [
          ...(i === 0 ? [...logs] : []),
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
    attacker.currentHp = Math.min(attacker.maxHp, attacker.currentHp + heal);
    logs.push(`${attacker.member.nameJa}は　体力を　吸い取った！`);
  }
  if (meta.drain < 0 && totalDealt > 0) {
    const recoil = Math.max(1, Math.floor((totalDealt * Math.abs(meta.drain)) / 100));
    attacker.currentHp = Math.max(0, attacker.currentHp - recoil);
    logs.push(`${attacker.member.nameJa}は　反動を　受けた！`);
    emitDamageThenHpBerry(attacker, logs, emitBeat);
  }

  if (meta.flinch_chance > 0 && chance(meta.flinch_chance)) {
    if (defender.volatiles.substituteHp <= 0) defender.volatiles.flinch = true;
  }
  const attackerToolId =
    attacker.heldTool && !attacker.heldTool.consumed
      ? attacker.heldTool.pokeapiId
      : null;
  if (
    rollKingsRockFlinch(attackerToolId, move, totalDealt) &&
    defender.volatiles.substituteHp <= 0
  ) {
    defender.volatiles.flinch = true;
    logs.push(`${defender.member.nameJa}は　ひるんでいる！`);
  }

  if (meta.ailment && meta.ailment !== "trap") {
    if (defender.volatiles.substituteHp <= 0) {
      const pct = meta.ailment_chance > 0 ? meta.ailment_chance : 100;
      if (chance(pct)) {
        const applied = applyAilment(
          defender,
          meta.ailment,
          logs,
          defender.member.nameJa,
          attacker.side,
          field.weather?.id ?? null,
          field,
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
        }
      }
    }
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

  if (code === "unique-partial-trap" || move.pokeapi_id === 250) {
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

  if (
    code === "unique-hyper-beam" &&
    attacker.currentHp > 0 &&
    totalDealt > 0 &&
    defender.currentHp > 0 &&
    !brokeSub
  ) {
    attacker.volatiles.recharge = true;
  }

  finishThrashLock(attacker, move, logs);
  attacker.volatiles.lastMoveUsed = move;
}

function speedTieBreak(): boolean {
  return Math.random() < 0.5;
}

function effectiveSpeed(fighter: BattleFighter): number {
  let spd = stagedStat(fighter.stats.speed, fighter.stages.speed);
  if (fighter.status === "paralysis") spd = Math.max(1, Math.floor(spd / 4));
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
  toolPokeapiId?: number | null;
  toolConsumed?: boolean;
}): BattleFighter {
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
    volatiles: createVolatiles(),
    heldTool: input.toolPokeapiId
      ? {
          pokeapiId: Number(input.toolPokeapiId),
          consumed: input.toolConsumed ?? false,
        }
      : null,
  };
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
}): {
  steps: TurnStep[];
  faintedA: boolean;
  faintedB: boolean;
  ran: PartySide | null;
} {
  const steps: TurnStep[] = [];
  const { fighterA, fighterB, actionA, actionB, field } = input;
  const rulesGeneration = input.rulesGeneration ?? 1;
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
    const spd =
      effectiveSpeed(slot.fighter) +
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

    const foeIndex = slots.findIndex((s) => s.fighter.side === slot.foe.side);
    const actsBeforeFoe = foeIndex < 0 || slotIndex < foeIndex;
    // Announce whenever Quick Claw rolled this turn and this side moves first.
    if (slot.fighter.volatiles.quickClawActive && actsBeforeFoe) {
      pushStep([
        `${slot.fighter.member.nameJa}の　せんせいのツメが　発動した！`,
      ]);
    }

    const logs: TurnLogLine[] = [];
    if (!canAct(slot.fighter, logs, rulesGeneration)) {
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

    const move = slot.action.move;
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
    if (beats.length === 0) {
      pushStep(
        [],
        skipPp ? null : { speciesId: slot.fighter.speciesId, moveId: move.id },
        ctx.forceSwitchSide,
      );
    } else {
      beats.forEach((beat, index) => {
        pushStep(
          beat.logs,
          index === 0 && !skipPp
            ? { speciesId: slot.fighter.speciesId, moveId: move.id }
            : null,
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
    tryEndTurnStatus(fighterA, fighterB, endLogs);
    tryEndTurnStatus(fighterB, fighterA, endLogs);
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
    applySandstormResidual(fighterA, field, endLogs);
    applySandstormResidual(fighterB, field, endLogs);
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
