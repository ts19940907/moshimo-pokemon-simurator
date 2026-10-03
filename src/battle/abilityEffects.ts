/**
 * Gen3 battle abilities (combat-relevant only).
 * Effects follow Gen3 rules; activation log timing follows modern mainline style
 * (announce 「Xの　特性！」 then the effect message).
 */
import type { Move } from "../pokemon/moves";
import { typeNameJa } from "../pokemon/catalog";
import type { PartyMemberBuild } from "../party/types";
import {
  cannotSwitchOut,
  type BattleFighter,
  type BattleFieldState,
  type BattleStatus,
  type TurnLogLine,
} from "./types";
import { setWeather, type WeatherId } from "./weather";
import { pokeapiIdFromSeedToolId } from "./toolEffects";

export const ABILITY = {
  STENCH: 1,
  DRIZZLE: 2,
  SPEED_BOOST: 3,
  BATTLE_ARMOR: 4,
  STURDY: 5,
  DAMP: 6,
  LIMBER: 7,
  SAND_VEIL: 8,
  STATIC: 9,
  VOLT_ABSORB: 10,
  WATER_ABSORB: 11,
  OBLIVIOUS: 12,
  CLOUD_NINE: 13,
  COMPOUND_EYES: 14,
  INSOMNIA: 15,
  COLOR_CHANGE: 16,
  IMMUNITY: 17,
  FLASH_FIRE: 18,
  SHIELD_DUST: 19,
  OWN_TEMPO: 20,
  SUCTION_CUPS: 21,
  INTIMIDATE: 22,
  SHADOW_TAG: 23,
  ROUGH_SKIN: 24,
  WONDER_GUARD: 25,
  LEVITATE: 26,
  EFFECT_SPORE: 27,
  SYNCHRONIZE: 28,
  CLEAR_BODY: 29,
  NATURAL_CURE: 30,
  LIGHTNING_ROD: 31,
  SERENE_GRACE: 32,
  SWIFT_SWIM: 33,
  CHLOROPHYLL: 34,
  // ILLUMINATE 35 — wild only
  TRACE: 36,
  HUGE_POWER: 37,
  POISON_POINT: 38,
  INNER_FOCUS: 39,
  MAGMA_ARMOR: 40,
  WATER_VEIL: 41,
  MAGNET_PULL: 42,
  SOUNDPROOF: 43,
  RAIN_DISH: 44,
  SAND_STREAM: 45,
  PRESSURE: 46,
  THICK_FAT: 47,
  EARLY_BIRD: 48,
  FLAME_BODY: 49,
  // RUN_AWAY 50 — wild only
  KEEN_EYE: 51,
  HYPER_CUTTER: 52,
  // PICKUP 53 — post-battle
  TRUANT: 54,
  HUSTLE: 55,
  CUTE_CHARM: 56,
  // PLUS/MINUS 57/58 — doubles
  FORECAST: 59,
  STICKY_HOLD: 60,
  SHED_SKIN: 61,
  GUTS: 62,
  MARVEL_SCALE: 63,
  LIQUID_OOZE: 64,
  OVERGROW: 65,
  BLAZE: 66,
  TORRENT: 67,
  SWARM: 68,
  ROCK_HEAD: 69,
  DROUGHT: 70,
  ARENA_TRAP: 71,
  VITAL_SPIRIT: 72,
  WHITE_SMOKE: 73,
  PURE_POWER: 74,
  SHELL_ARMOR: 75,
  AIR_LOCK: 76,
} as const;

export const ABILITY_NAME_JA: Record<number, string> = {
  1: "あくしゅう",
  2: "あめふらし",
  3: "かそく",
  4: "カブトアーマー",
  5: "がんじょう",
  6: "しめりけ",
  7: "じゅうなん",
  8: "すながくれ",
  9: "せいでんき",
  10: "ちくでん",
  11: "ちょすい",
  12: "どんかん",
  13: "ノーてんき",
  14: "ふくがん",
  15: "ふみん",
  16: "へんしょく",
  17: "めんえき",
  18: "もらいび",
  19: "りんぷん",
  20: "マイペース",
  21: "きゅうばん",
  22: "いかく",
  23: "かげふみ",
  24: "さめはだ",
  25: "ふしぎなまもり",
  26: "ふゆう",
  27: "ほうし",
  28: "シンクロ",
  29: "クリアボディ",
  30: "しぜんかいふく",
  31: "ひらいしん",
  32: "てんのめぐみ",
  33: "すいすい",
  34: "ようりょくそ",
  35: "はっこう",
  36: "トレース",
  37: "ちからもち",
  38: "どくのトゲ",
  39: "せいしんりょく",
  40: "マグマのよろい",
  41: "みずのベール",
  42: "じりょく",
  43: "ぼうおん",
  44: "あめうけざら",
  45: "すなおこし",
  46: "プレッシャー",
  47: "あついしぼう",
  48: "はやおき",
  49: "ほのおのからだ",
  50: "にげあし",
  51: "するどいめ",
  52: "かいりきバサミ",
  53: "ものひろい",
  54: "なまけ",
  55: "はりきり",
  56: "メロメロボディ",
  57: "プラス",
  58: "マイナス",
  59: "てんきや",
  60: "ねんちゃく",
  61: "だっぴ",
  62: "こんじょう",
  63: "ふしぎなうろこ",
  64: "ヘドロえき",
  65: "しんりょく",
  66: "もうか",
  67: "げきりゅう",
  68: "むしのしらせ",
  69: "いしあたま",
  70: "ひでり",
  71: "ありじごく",
  72: "やるき",
  73: "しろいけむり",
  74: "ヨガパワー",
  75: "シェルアーマー",
  76: "エアロック",
};

/** Gen3 sound moves (Soundproof). */
const SOUND_MOVE_IDS = new Set([
  45, // Growl
  46, // Roar
  47, // Sing
  48, // Supersonic
  103, // Screech
  195, // Perish Song
  215, // Heal Bell
  253, // Uproar
  304, // Hyper Voice
  319, // Metal Sound
  336, // Howl
  253, // Uproar
]);

const EXPLOSION_IDS = new Set([120, 153]); // Self-Destruct, Explosion

export function abilitiesEnabled(rulesGeneration: number): boolean {
  return rulesGeneration >= 3;
}

export function resolveAbilityPokeapiId(
  member: Pick<PartyMemberBuild, "abilityId">,
  rulesGeneration: number,
): number | null {
  if (!abilitiesEnabled(rulesGeneration)) return null;
  if (!member.abilityId) return null;
  return pokeapiIdFromSeedToolId(member.abilityId);
}

export function abilityIdOf(fighter: BattleFighter): number | null {
  return fighter.abilityPokeapiId;
}

export function hasAbility(
  fighter: BattleFighter,
  abilityId: number,
): boolean {
  return fighter.abilityPokeapiId === abilityId;
}

/** Modern-style ability announcement. */
export function announceAbility(fighter: BattleFighter): string {
  const name =
    fighter.abilityNameJa ??
    (fighter.abilityPokeapiId != null
      ? ABILITY_NAME_JA[fighter.abilityPokeapiId]
      : null) ??
    "特性";
  return `${fighter.member.nameJa}の　${name}！`;
}

export function fighterTypes(fighter: BattleFighter): {
  type1: number;
  type2: number;
} {
  return { type1: fighter.battleType1, type2: fighter.battleType2 };
}

export function isGrounded(fighter: BattleFighter): boolean {
  if (hasAbility(fighter, ABILITY.LEVITATE)) return false;
  const { type1, type2 } = fighterTypes(fighter);
  return type1 !== 10 && type2 !== 10;
}

export function weatherIsSuppressed(
  field: BattleFieldState,
  a: BattleFighter,
  b: BattleFighter,
): boolean {
  return (
    hasAbility(a, ABILITY.CLOUD_NINE) ||
    hasAbility(a, ABILITY.AIR_LOCK) ||
    hasAbility(b, ABILITY.CLOUD_NINE) ||
    hasAbility(b, ABILITY.AIR_LOCK)
  );
}

export function effectiveWeatherId(
  field: BattleFieldState,
  a: BattleFighter,
  b: BattleFighter,
): string | null {
  if (weatherIsSuppressed(field, a, b)) return null;
  return field.weather?.id ?? null;
}

export function blocksForcedSwitch(fighter: BattleFighter): boolean {
  return (
    hasAbility(fighter, ABILITY.SUCTION_CUPS) ||
    fighter.volatiles.cannotEscape
  );
}

/** Whether the foe's Shadow Tag / Arena Trap / Magnet Pull traps `self`. */
export function trappedByFoeAbility(
  self: BattleFighter,
  foe: BattleFighter,
): boolean {
  // Gen3: Shadow Tag also traps a Shadow Tag holder.
  if (hasAbility(foe, ABILITY.SHADOW_TAG)) return true;
  if (hasAbility(foe, ABILITY.ARENA_TRAP) && isGrounded(self)) return true;
  if (
    hasAbility(foe, ABILITY.MAGNET_PULL) &&
    (self.battleType1 === 17 || self.battleType2 === 17)
  ) {
    return true;
  }
  return false;
}

export function canSwitchAway(
  self: BattleFighter,
  foe: BattleFighter,
): boolean {
  if (cannotSwitchOut(self)) return false;
  return !trappedByFoeAbility(self, foe);
}

/** Log lines when a switch is refused (trapping ability is named first). */
export function switchBlockedLogs(
  self: BattleFighter,
  foe: BattleFighter,
): string[] {
  if (!cannotSwitchOut(self) && trappedByFoeAbility(self, foe)) {
    return [announceAbility(foe), `${self.member.nameJa}は　逃げられない！`];
  }
  return [`${self.member.nameJa}は　逃げられない！`];
}

export function abilityBlocksStatus(
  target: BattleFighter,
  ailment: string,
): boolean {
  const id = abilityIdOf(target);
  if (!id) return false;
  if (ailment === "paralysis" && id === ABILITY.LIMBER) return true;
  if (
    (ailment === "sleep" || ailment === "yawn") &&
    (id === ABILITY.INSOMNIA || id === ABILITY.VITAL_SPIRIT)
  ) {
    return true;
  }
  if (
    (ailment === "poison" || ailment === "toxic") &&
    id === ABILITY.IMMUNITY
  ) {
    return true;
  }
  if (ailment === "burn" && id === ABILITY.WATER_VEIL) return true;
  if (ailment === "freeze" && id === ABILITY.MAGMA_ARMOR) return true;
  if (ailment === "confusion" && id === ABILITY.OWN_TEMPO) return true;
  if (
    (ailment === "infatuation" || ailment === "attract") &&
    id === ABILITY.OBLIVIOUS
  ) {
    return true;
  }
  return false;
}

export function abilityBlocksFlinch(target: BattleFighter): boolean {
  return hasAbility(target, ABILITY.INNER_FOCUS);
}

export function abilityBlocksCrit(defender: BattleFighter): boolean {
  return (
    hasAbility(defender, ABILITY.BATTLE_ARMOR) ||
    hasAbility(defender, ABILITY.SHELL_ARMOR)
  );
}

export function abilityBlocksStatDrop(
  target: BattleFighter,
  stat: string,
  change: number,
): boolean {
  if (change >= 0) return false;
  if (hasAbility(target, ABILITY.CLEAR_BODY)) return true;
  if (hasAbility(target, ABILITY.WHITE_SMOKE)) return true;
  if (stat === "attack" && hasAbility(target, ABILITY.HYPER_CUTTER)) {
    return true;
  }
  if (stat === "accuracy" && hasAbility(target, ABILITY.KEEN_EYE)) {
    return true;
  }
  return false;
}

/** Gen3 contact moves (PokeAPI ids ≤ 354), per Showdown gen3 flags. */
const GEN3_CONTACT_MOVE_IDS = new Set([
  1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 15, 17, 19, 20, 21, 22, 23, 24, 25, 26,
  27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 44, 64, 65, 66, 67, 68, 69, 70,
  80, 91, 98, 99, 117, 122, 127, 128, 130, 132, 136, 141, 146, 152, 154, 158,
  162, 163, 165, 167, 168, 172, 175, 179, 183, 200, 205, 206, 209, 210, 211,
  216, 218, 223, 224, 228, 229, 231, 232, 233, 238, 242, 245, 246, 249, 263,
  264, 265, 276, 279, 280, 282, 283, 291, 292, 299, 301, 302, 305, 306, 309,
  310, 315, 325, 327, 332, 337, 340, 342, 344, 348,
]);

export function isContactMove(move: Move): boolean {
  return GEN3_CONTACT_MOVE_IDS.has(move.pokeapi_id);
}

export function isSoundMove(move: Move): boolean {
  return SOUND_MOVE_IDS.has(move.pokeapi_id);
}

export function dampBlocksMove(move: Move, a: BattleFighter, b: BattleFighter): boolean {
  if (!EXPLOSION_IDS.has(move.pokeapi_id)) return false;
  return hasAbility(a, ABILITY.DAMP) || hasAbility(b, ABILITY.DAMP);
}

export type AbsorbResult =
  | { kind: "none" }
  | { kind: "heal"; heal: number }
  | { kind: "flash_fire" };

/** Volt/Water Absorb / Flash Fire — short-circuit damaging hits of matching type. */
export function tryAbsorbMove(
  defender: BattleFighter,
  move: Move,
  typeEff: number,
): AbsorbResult {
  // Gen3: Volt Absorb does not absorb Thunder Wave.
  if (
    move.type_id === 4 &&
    move.pokeapi_id !== 86 &&
    hasAbility(defender, ABILITY.VOLT_ABSORB)
  ) {
    return {
      kind: "heal",
      heal: Math.max(1, Math.floor(defender.maxHp / 4)),
    };
  }
  if (move.type_id === 3 && hasAbility(defender, ABILITY.WATER_ABSORB)) {
    return {
      kind: "heal",
      heal: Math.max(1, Math.floor(defender.maxHp / 4)),
    };
  }
  if (move.type_id === 2 && hasAbility(defender, ABILITY.FLASH_FIRE)) {
    // Gen3: a frozen holder does not activate; Will-O-Wisp is only absorbed
    // when it could otherwise have burned the holder.
    if (defender.status === "freeze") return { kind: "none" };
    if (move.pokeapi_id === 261) {
      const t1 = defender.battleType1 ?? defender.species.type1;
      const t2 = defender.battleType2 ?? defender.species.type2;
      if (
        t1 === 2 ||
        t2 === 2 ||
        defender.status ||
        defender.volatiles.substituteHp > 0
      ) {
        return { kind: "none" };
      }
    }
    return { kind: "flash_fire" };
  }
  void typeEff;
  return { kind: "none" };
}

export function wonderGuardBlocks(
  defender: BattleFighter,
  typeEff: number,
  move: Move,
): boolean {
  if (!hasAbility(defender, ABILITY.WONDER_GUARD)) return false;
  if ((move.power ?? 0) <= 0 && move.damage_class === "status") return false;
  return typeEff <= 1;
}

export function levitateBlocksGround(
  defender: BattleFighter,
  moveTypeId: number,
): boolean {
  return moveTypeId === 9 && hasAbility(defender, ABILITY.LEVITATE);
}

export function secondaryChanceMultiplier(attacker: BattleFighter): number {
  return hasAbility(attacker, ABILITY.SERENE_GRACE) ? 2 : 1;
}

export function shieldDustBlocksSecondary(defender: BattleFighter): boolean {
  return hasAbility(defender, ABILITY.SHIELD_DUST);
}

export function modifyAccuracyForAbilities(
  accuracy: number,
  attacker: BattleFighter,
  defender: BattleFighter,
  weatherId: string | null,
): number {
  let acc = accuracy;
  if (hasAbility(attacker, ABILITY.COMPOUND_EYES)) {
    acc = Math.floor(acc * 1.3);
  }
  if (hasAbility(attacker, ABILITY.HUSTLE)) {
    acc = Math.floor(acc * 0.8);
  }
  if (hasAbility(defender, ABILITY.SAND_VEIL) && weatherId === "sand") {
    acc = Math.floor(acc * 0.8);
  }
  return acc;
}

/** Inputs for ability damage effects, shared by the battle engine and the damage calculator. */
export type AbilityDamageContext = {
  attackerAbility: number | null;
  defenderAbility: number | null;
  attackerStatused: boolean;
  defenderStatused: boolean;
  /** Attacker HP <= 1/3 (Overgrow / Blaze / Torrent / Swarm). */
  attackerPinch: boolean;
  flashFireActive: boolean;
};

const PINCH_ABILITY_TYPE: Record<number, number> = {
  [ABILITY.OVERGROW]: 5,
  [ABILITY.BLAZE]: 2,
  [ABILITY.TORRENT]: 3,
  [ABILITY.SWARM]: 12,
};

export function pinchAbilityType(abilityId: number | null): number | null {
  return abilityId != null ? (PINCH_ABILITY_TYPE[abilityId] ?? null) : null;
}

function attackerAbilityMultiplier(
  ctx: AbilityDamageContext,
  move: Move,
): number {
  const physical = move.damage_class === "physical";
  const id = ctx.attackerAbility;
  let mult = 1;
  if (physical && (id === ABILITY.HUGE_POWER || id === ABILITY.PURE_POWER)) {
    mult *= 2;
  }
  if (physical && id === ABILITY.HUSTLE) {
    mult *= 1.5;
  }
  if (physical && id === ABILITY.GUTS && ctx.attackerStatused) {
    mult *= 1.5;
  }
  if (move.type_id === 2 && id === ABILITY.FLASH_FIRE && ctx.flashFireActive) {
    mult *= 1.5;
  }
  if (ctx.attackerPinch && pinchAbilityType(id) === move.type_id) {
    mult *= 1.5;
  }
  return mult;
}

function defenderAbilityMultiplier(
  ctx: AbilityDamageContext,
  move: Move,
): number {
  const id = ctx.defenderAbility;
  let mult = 1;
  if (id === ABILITY.THICK_FAT && (move.type_id === 2 || move.type_id === 6)) {
    mult *= 0.5;
  }
  if (
    id === ABILITY.MARVEL_SCALE &&
    ctx.defenderStatused &&
    move.damage_class === "physical"
  ) {
    // Marvel Scale raises Defense; approximate as 2/3 damage taken
    mult *= 2 / 3;
  }
  return mult;
}

/** Damage multiplier from abilities (after type chart), split by side. */
export function abilityDamageMultipliersFor(
  ctx: AbilityDamageContext,
  move: Move,
): { attacker: number; defender: number; total: number } {
  const attacker = attackerAbilityMultiplier(ctx, move);
  const defender = defenderAbilityMultiplier(ctx, move);
  return { attacker, defender, total: attacker * defender };
}

/**
 * Ability that stops a damaging move outright, in battle-engine order
 * (Damp, Soundproof, absorb abilities, Wonder Guard, Levitate).
 */
export function abilityBlockingDamage(
  attackerAbility: number | null,
  defenderAbility: number | null,
  move: Move,
  typeEffectiveness: number,
): number | null {
  if (EXPLOSION_IDS.has(move.pokeapi_id)) {
    if (attackerAbility === ABILITY.DAMP || defenderAbility === ABILITY.DAMP) {
      return ABILITY.DAMP;
    }
  }
  if (defenderAbility == null) return null;
  if (isSoundMove(move) && defenderAbility === ABILITY.SOUNDPROOF) {
    return ABILITY.SOUNDPROOF;
  }
  if (move.type_id === 4 && defenderAbility === ABILITY.VOLT_ABSORB) {
    return ABILITY.VOLT_ABSORB;
  }
  if (move.type_id === 3 && defenderAbility === ABILITY.WATER_ABSORB) {
    return ABILITY.WATER_ABSORB;
  }
  if (move.type_id === 2 && defenderAbility === ABILITY.FLASH_FIRE) {
    return ABILITY.FLASH_FIRE;
  }
  if (defenderAbility === ABILITY.WONDER_GUARD && typeEffectiveness <= 1) {
    return ABILITY.WONDER_GUARD;
  }
  if (move.type_id === 9 && defenderAbility === ABILITY.LEVITATE) {
    return ABILITY.LEVITATE;
  }
  return null;
}

export function abilitySuppressesWeather(abilityId: number | null): boolean {
  return abilityId === ABILITY.CLOUD_NINE || abilityId === ABILITY.AIR_LOCK;
}

export function abilityPreventsCrit(abilityId: number | null): boolean {
  return abilityId === ABILITY.BATTLE_ARMOR || abilityId === ABILITY.SHELL_ARMOR;
}

function abilityDamageContext(
  attacker: BattleFighter,
  defender: BattleFighter | null,
): AbilityDamageContext {
  return {
    attackerAbility: attacker.abilityPokeapiId,
    defenderAbility: defender?.abilityPokeapiId ?? null,
    attackerStatused: attacker.status != null,
    defenderStatused: defender?.status != null,
    attackerPinch: attacker.currentHp / Math.max(1, attacker.maxHp) <= 1 / 3,
    flashFireActive: attacker.volatiles.flashFireActive,
  };
}

export function attackStatAbilityMultiplier(
  attacker: BattleFighter,
  move: Move,
): number {
  return attackerAbilityMultiplier(abilityDamageContext(attacker, null), move);
}

export function defenseStatAbilityMultiplier(
  defender: BattleFighter,
  move: Move,
): number {
  let mult = 1;
  if (
    hasAbility(defender, ABILITY.MARVEL_SCALE) &&
    defender.status != null &&
    move.damage_class === "physical"
  ) {
    mult *= 1.5;
  }
  if (
    hasAbility(defender, ABILITY.THICK_FAT) &&
    (move.type_id === 2 || move.type_id === 6)
  ) {
    mult *= 2; // halves damage → double defense equivalent; applied as damage / 2 below
  }
  return mult;
}

/** Damage multiplier from abilities (after type chart). */
export function abilityDamageMultiplier(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
): number {
  return abilityDamageMultipliersFor(
    abilityDamageContext(attacker, defender),
    move,
  ).total;
}

export function abilitySpeedMultiplierFor(
  abilityId: number | null,
  weatherId: string | null,
): number {
  if (abilityId === ABILITY.SWIFT_SWIM && weatherId === "rain") return 2;
  if (abilityId === ABILITY.CHLOROPHYLL && weatherId === "sun") return 2;
  return 1;
}

export function abilitySpeedMultiplier(
  fighter: BattleFighter,
  weatherId: string | null,
): number {
  return abilitySpeedMultiplierFor(fighter.abilityPokeapiId, weatherId);
}

/** Gen3 Sturdy: only blocks OHKO moves (not Focus Sash style). */
export function sturdyBlocksOhko(
  defender: BattleFighter,
  move: Move,
): boolean {
  // Fissure 90, Horn Drill 32, Guillotine 12
  const ohko = move.pokeapi_id === 90 || move.pokeapi_id === 32 || move.pokeapi_id === 12;
  return ohko && hasAbility(defender, ABILITY.STURDY);
}

export function applyNaturalCureOnSwitchOut(
  fighter: BattleFighter | null | undefined,
): void {
  if (!fighter) return;
  if (!hasAbility(fighter, ABILITY.NATURAL_CURE)) return;
  fighter.status = null;
  fighter.sleepTurns = 0;
}

function setWeatherFromAbility(
  field: BattleFieldState,
  id: WeatherId,
  logs: TurnLogLine[],
  fighter: BattleFighter,
): void {
  // Already that weather: do not re-announce (e.g. second Drizzle while raining).
  if (field.weather?.id === id) return;
  logs.push(announceAbility(fighter));
  field.weather = setWeather(field.weather, id, logs);
}

export function applyForecastForm(
  fighter: BattleFighter,
  weatherId: string | null,
  logs: TurnLogLine[],
): void {
  if (!hasAbility(fighter, ABILITY.FORECAST)) return;
  // Castform only meaningfully changes; still apply type for any Forecast holder.
  let t1 = 1;
  let t2 = 0;
  if (weatherId === "rain") t1 = 3;
  else if (weatherId === "sun") t1 = 2;
  else if (weatherId === "hail") t1 = 6;
  // Sand: Castform has no sand form; stays Normal.
  if (fighter.battleType1 === t1 && fighter.battleType2 === t2) return;
  fighter.battleType1 = t1;
  fighter.battleType2 = t2;
  logs.push(announceAbility(fighter));
  logs.push(`${fighter.member.nameJa}の　タイプが　変わった！`);
}

/**
 * Switch-in abilities. Call after entry hazards (modern order).
 * `foe` may be null at battle start before both are out.
 */
export function applySwitchInAbilities(
  fighter: BattleFighter,
  foe: BattleFighter | null,
  field: BattleFieldState,
  logs: TurnLogLine[],
  rulesGeneration: number,
): void {
  if (!abilitiesEnabled(rulesGeneration)) return;
  const id = abilityIdOf(fighter);
  if (!id) return;

  if (id === ABILITY.TRACE && foe && foe.abilityPokeapiId != null) {
    logs.push(announceAbility(fighter));
    fighter.abilityPokeapiId = foe.abilityPokeapiId;
    fighter.abilityNameJa =
      foe.abilityNameJa ?? ABILITY_NAME_JA[foe.abilityPokeapiId] ?? null;
    logs.push(
      `${fighter.member.nameJa}は　${fighter.abilityNameJa ?? "特性"}を　トレースした！`,
    );
    // Re-fire switch-in of copied ability (except Trace).
    if (fighter.abilityPokeapiId !== ABILITY.TRACE) {
      applySwitchInAbilities(fighter, foe, field, logs, rulesGeneration);
    }
    return;
  }

  if (id === ABILITY.DRIZZLE) {
    setWeatherFromAbility(field, "rain", logs, fighter);
  } else if (id === ABILITY.DROUGHT) {
    setWeatherFromAbility(field, "sun", logs, fighter);
  } else if (id === ABILITY.SAND_STREAM) {
    setWeatherFromAbility(field, "sand", logs, fighter);
  } else if (id === ABILITY.INTIMIDATE && foe && foe.currentHp > 0) {
    logs.push(announceAbility(fighter));
    if (
      abilityBlocksStatDrop(foe, "attack", -1) ||
      hasAbility(foe, ABILITY.CLEAR_BODY) ||
      hasAbility(foe, ABILITY.HYPER_CUTTER) ||
      hasAbility(foe, ABILITY.WHITE_SMOKE)
    ) {
      logs.push(`${foe.member.nameJa}の　こうげきは　下がらない！`);
    } else if (foe.stages.attack > -6) {
      foe.stages.attack -= 1;
      logs.push(`${foe.member.nameJa}の　こうげきが　下がった！`);
    }
  } else if (id === ABILITY.PRESSURE) {
    logs.push(announceAbility(fighter));
    logs.push(`${fighter.member.nameJa}は　プレッシャーを　かけている！`);
  } else if (id === ABILITY.AIR_LOCK || id === ABILITY.CLOUD_NINE) {
    logs.push(announceAbility(fighter));
    logs.push("天気の　影響が　なくなった！");
  }

  applyForecastForm(
    fighter,
    effectiveWeatherId(field, fighter, foe ?? fighter),
    logs,
  );
  if (foe) {
    applyForecastForm(
      foe,
      effectiveWeatherId(field, fighter, foe),
      logs,
    );
  }
}

/** After weather is set or suppressed, refresh Forecast types. */
export function refreshForecastForms(
  a: BattleFighter,
  b: BattleFighter,
  field: BattleFieldState,
  logs: TurnLogLine[],
): void {
  const weatherId = effectiveWeatherId(field, a, b);
  applyForecastForm(a, weatherId, logs);
  applyForecastForm(b, weatherId, logs);
}

export function applyEndOfTurnAbilities(
  fighter: BattleFighter,
  field: BattleFieldState,
  ally: BattleFighter,
  foe: BattleFighter,
  logs: TurnLogLine[],
  rulesGeneration: number,
): void {
  if (!abilitiesEnabled(rulesGeneration) || fighter.currentHp <= 0) return;
  const weatherId = effectiveWeatherId(field, ally, foe);

  if (hasAbility(fighter, ABILITY.SPEED_BOOST)) {
    if (fighter.stages.speed < 6) {
      logs.push(announceAbility(fighter));
      fighter.stages.speed += 1;
      logs.push(`${fighter.member.nameJa}の　すばやさが　上がった！`);
    }
  }

  if (
    hasAbility(fighter, ABILITY.RAIN_DISH) &&
    weatherId === "rain"
  ) {
    if (fighter.currentHp < fighter.maxHp) {
      logs.push(announceAbility(fighter));
      const heal = Math.max(1, Math.floor(fighter.maxHp / 16));
      fighter.currentHp = Math.min(fighter.maxHp, fighter.currentHp + heal);
      logs.push(`${fighter.member.nameJa}の　体力が　回復した！`);
    }
  }

  if (hasAbility(fighter, ABILITY.SHED_SKIN) && fighter.status) {
    if (Math.random() < 1 / 3) {
      logs.push(announceAbility(fighter));
      fighter.status = null;
      fighter.sleepTurns = 0;
      logs.push(`${fighter.member.nameJa}の　状態異常が　治った！`);
    }
  }

  // Truant toggles at end of turn after acting — handled in canAct via flag flip after move
}

export function onContactAbilityEffects(
  attacker: BattleFighter,
  defender: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
  applyStatus: (
    target: BattleFighter,
    ailment: string,
    name: string,
  ) => boolean,
  /** Contact abilities stay silent when the status cannot land (already statused, immune, Safeguard). */
  canApplyStatus: (target: BattleFighter, ailment: string) => boolean,
): void {
  if (!isContactMove(move)) return;
  if (defender.volatiles.substituteHp > 0) return;
  if (attacker.currentHp <= 0) return;

  const tryContactStatus = (ailment: string) => {
    if (!canApplyStatus(attacker, ailment)) return;
    logs.push(announceAbility(defender));
    applyStatus(attacker, ailment, attacker.member.nameJa);
  };

  if (hasAbility(defender, ABILITY.STATIC) && Math.random() < 1 / 3) {
    tryContactStatus("paralysis");
  }
  if (hasAbility(defender, ABILITY.POISON_POINT) && Math.random() < 1 / 3) {
    tryContactStatus("poison");
  }
  if (hasAbility(defender, ABILITY.FLAME_BODY) && Math.random() < 1 / 3) {
    tryContactStatus("burn");
  }
  if (hasAbility(defender, ABILITY.EFFECT_SPORE) && Math.random() < 0.1) {
    const roll = Math.random();
    tryContactStatus(
      roll < 1 / 3 ? "poison" : roll < 2 / 3 ? "paralysis" : "sleep",
    );
  }
  if (hasAbility(defender, ABILITY.CUTE_CHARM) && Math.random() < 1 / 3) {
    if (
      !abilityBlocksStatus(attacker, "infatuation") &&
      !attacker.volatiles.infatuated
    ) {
      // Gender check simplified: different gender codes when both known
      const ag = attacker.member.gender;
      const dg = defender.member.gender;
      if (
        ag != null &&
        dg != null &&
        ag !== "none" &&
        dg !== "none" &&
        ag !== dg
      ) {
        logs.push(announceAbility(defender));
        attacker.volatiles.infatuated = true;
        logs.push(`${attacker.member.nameJa}は　メロメロに　なった！`);
      }
    }
  }
  if (hasAbility(defender, ABILITY.ROUGH_SKIN)) {
    logs.push(announceAbility(defender));
    const dmg = Math.max(1, Math.floor(attacker.maxHp / 16));
    attacker.currentHp = Math.max(0, attacker.currentHp - dmg);
    logs.push(`${attacker.member.nameJa}は　ダメージを　受けた！`);
  }
}

export function applyColorChange(
  defender: BattleFighter,
  move: Move,
  dealt: number,
  logs: TurnLogLine[],
): void {
  if (dealt <= 0) return;
  if (!hasAbility(defender, ABILITY.COLOR_CHANGE)) return;
  if (move.type_id <= 0) return;
  if (defender.battleType1 === move.type_id && defender.battleType2 === 0) {
    return;
  }
  logs.push(announceAbility(defender));
  defender.battleType1 = move.type_id;
  defender.battleType2 = 0;
  logs.push(
    `${defender.member.nameJa}は　${typeNameJa(move.type_id)}タイプに　なった！`,
  );
}

export function applySynchronize(
  defender: BattleFighter,
  attacker: BattleFighter,
  ailment: string,
  logs: TurnLogLine[],
  applyStatus: (
    target: BattleFighter,
    ailment: string,
    name: string,
  ) => boolean,
  canApplyStatus: (target: BattleFighter, ailment: string) => boolean,
): void {
  if (!hasAbility(defender, ABILITY.SYNCHRONIZE)) return;
  if (
    ailment !== "paralysis" &&
    ailment !== "burn" &&
    ailment !== "poison"
  ) {
    return;
  }
  if (!canApplyStatus(attacker, ailment)) return;
  logs.push(announceAbility(defender));
  applyStatus(attacker, ailment, attacker.member.nameJa);
}

export function liquidOozeOnDrain(
  defender: BattleFighter,
  healAmount: number,
): { damageAttacker: boolean; amount: number } {
  if (hasAbility(defender, ABILITY.LIQUID_OOZE)) {
    return { damageAttacker: true, amount: healAmount };
  }
  return { damageAttacker: false, amount: healAmount };
}

export function rockHeadPreventsRecoil(attacker: BattleFighter): boolean {
  return hasAbility(attacker, ABILITY.ROCK_HEAD);
}

export function pressureExtraPp(foe: BattleFighter): number {
  return hasAbility(foe, ABILITY.PRESSURE) ? 1 : 0;
}

/**
 * Gen3+: the sleep counter drops twice per turn, so it can reach 0 before the first move (wake and act).
 * Gen1–2 keep at least one asleep turn.
 */
export function earlyBirdSleepTurns(
  turns: number,
  fighter: BattleFighter,
  rulesGeneration = 1,
): number {
  if (!hasAbility(fighter, ABILITY.EARLY_BIRD)) return turns;
  if (rulesGeneration >= 3) return Math.floor(turns / 2);
  return Math.max(1, Math.ceil(turns / 2));
}

/** Gen3 flips Truant at end of turn; Gen4+ flips it when the holder tries to move. */
export function truantTogglesAtEndOfTurn(rulesGeneration: number): boolean {
  return rulesGeneration <= 3;
}

/** Gen4+: Truant alternates every turn the holder tries to move, even if it is then blocked. */
export function toggleTruantAfterAction(
  fighter: BattleFighter,
  wasLoafing: boolean,
): void {
  if (!hasAbility(fighter, ABILITY.TRUANT)) return;
  fighter.volatiles.truantIdle = !wasLoafing;
}

/** Gen3: Truant alternates at the end of every turn while the holder is on the field. */
export function toggleTruantAtEndOfTurn(fighter: BattleFighter): void {
  if (!hasAbility(fighter, ABILITY.TRUANT) || fighter.currentHp <= 0) return;
  fighter.volatiles.truantIdle = !fighter.volatiles.truantIdle;
}

/**
 * Gen3: a Truant holder entering after the battle has started begins on a loafing turn.
 * A switch made as the turn's action is flipped back by that turn's end-of-turn toggle.
 */
export function markTruantSwitchIn(
  fighter: BattleFighter,
  rulesGeneration: number,
): void {
  if (!abilitiesEnabled(rulesGeneration)) return;
  if (!truantTogglesAtEndOfTurn(rulesGeneration)) return;
  if (!hasAbility(fighter, ABILITY.TRUANT)) return;
  fighter.volatiles.truantIdle = true;
}

export function truantBlocksAction(
  fighter: BattleFighter,
  logs: TurnLogLine[],
): boolean {
  if (!hasAbility(fighter, ABILITY.TRUANT)) return false;
  if (!fighter.volatiles.truantIdle) return false;
  logs.push(announceAbility(fighter));
  logs.push(`${fighter.member.nameJa}は　なまけている！`);
  return true;
}

export type AbilityInit = {
  abilityPokeapiId: number | null;
  abilityNameJa: string | null;
  battleType1: number;
  battleType2: number;
};

export function abilityFieldsForBuild(
  member: PartyMemberBuild,
  type1: number,
  type2: number,
  rulesGeneration: number,
): AbilityInit {
  const abilityPokeapiId = resolveAbilityPokeapiId(member, rulesGeneration);
  return {
    abilityPokeapiId,
    abilityNameJa:
      abilityPokeapiId != null
        ? (ABILITY_NAME_JA[abilityPokeapiId] ?? null)
        : null,
    battleType1: type1,
    battleType2: type2 ?? 0,
  };
}

/** Sticky Hold: block item theft (Thief). */
export function stickyHoldBlocksTheft(defender: BattleFighter): boolean {
  return hasAbility(defender, ABILITY.STICKY_HOLD);
}

export function gutsIgnoresBurnAttackHalving(attacker: BattleFighter): boolean {
  return hasAbility(attacker, ABILITY.GUTS);
}
