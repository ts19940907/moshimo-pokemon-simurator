import { usesSplitSpecial } from "../pokemon/baseStatFilters";
import { calcBattleStats } from "../party/calcBattleStats";
import { getNature, type NatureStatKey } from "../party/natures";
import type { Gen1StatBlock, PartyMemberBuild } from "../party/types";
import type { PokemonSpecies } from "../pokemon/types";
import type { Tool } from "../pokemon/tools";
import type { Move } from "../pokemon/moves";
import gen2Tools from "../data/gen2-tools.json";
import gen4Tools from "../data/gen4-tools.json";
import itemBattleData from "../data/item-battle-data.json";
import type { BattleFighter, BattleStatus, TurnLogLine } from "./types";

const TOOL_NAME_JA_BY_POKEAPI: Record<number, string> = Object.fromEntries(
  [
    ...(gen2Tools as { pokeapi_id: number; name_ja: string }[]),
    ...(gen4Tools as { pokeapi_id: number; name_ja: string }[]),
  ].map((t) => [t.pokeapi_id, t.name_ja]),
);

const ITEM_BATTLE_DATA = itemBattleData as Record<
  string,
  { fling: number | null; naturalGiftType?: number | null; naturalGiftPower?: number | null }
>;

export function toolNameJaByPokeapiId(pokeapiId: number): string | null {
  return TOOL_NAME_JA_BY_POKEAPI[pokeapiId] ?? null;
}

export function heldToolNameJa(
  heldTool: BattleFighter["heldTool"],
): string {
  if (!heldTool) return "どうぐ";
  return (
    heldTool.nameJa ?? TOOL_NAME_JA_BY_POKEAPI[heldTool.pokeapiId] ?? "どうぐ"
  );
}

/** PokeAPI item ids for held tools in this app. */
export const TOOL_POKEAPI = {
  BERRY_JUICE: 43,
  ADAMANT_ORB: 112,
  LUSTROUS_ORB: 113,
  CHERI: 126,
  CHESTO: 127,
  PECHA: 128,
  RAWST: 129,
  ASPEAR: 130,
  LEPPA: 131,
  ORAN: 132,
  PERSIM: 133,
  LUM: 134,
  SITRUS: 135,
  FIGY: 136,
  WIKI: 137,
  MAGO: 138,
  AGUAV: 139,
  IAPAPA: 140,
  LIECHI: 178,
  GANLON: 179,
  SALAC: 180,
  PETAYA: 181,
  APICOT: 182,
  LANSAT: 183,
  STARF: 184,
  MICLE: 186,
  CUSTAP: 187,
  JABOCA: 188,
  ROWAP: 189,
  BRIGHT_POWDER: 190,
  WHITE_HERB: 191,
  MACHO_BRACE: 192,
  QUICK_CLAW: 194,
  MENTAL_HERB: 196,
  CHOICE_BAND: 197,
  KINGS_ROCK: 198,
  SOUL_DEW: 202,
  DEEP_SEA_TOOTH: 203,
  DEEP_SEA_SCALE: 204,
  FOCUS_BAND: 207,
  SCOPE_LENS: 209,
  LEFTOVERS: 211,
  LIGHT_BALL: 213,
  SHELL_BELL: 230,
  SEA_INCENSE: 231,
  LAX_INCENSE: 232,
  LUCKY_PUNCH: 233,
  METAL_POWDER: 234,
  THICK_CLUB: 235,
  LEEK: 236,
  WIDE_LENS: 242,
  MUSCLE_BAND: 243,
  WISE_GLASSES: 244,
  EXPERT_BELT: 245,
  LIGHT_CLAY: 246,
  LIFE_ORB: 247,
  POWER_HERB: 248,
  TOXIC_ORB: 249,
  FLAME_ORB: 250,
  QUICK_POWDER: 251,
  FOCUS_SASH: 252,
  ZOOM_LENS: 253,
  METRONOME: 254,
  IRON_BALL: 255,
  LAGGING_TAIL: 256,
  DESTINY_KNOT: 257,
  BLACK_SLUDGE: 258,
  ICY_ROCK: 259,
  SMOOTH_ROCK: 260,
  HEAT_ROCK: 261,
  DAMP_ROCK: 262,
  GRIP_CLAW: 263,
  CHOICE_SCARF: 264,
  STICKY_BARB: 265,
  POWER_BRACER: 266,
  POWER_ANKLET: 271,
  SHED_SHELL: 272,
  BIG_ROOT: 273,
  CHOICE_SPECS: 274,
  FULL_INCENSE: 293,
  RAZOR_CLAW: 303,
  RAZOR_FANG: 304,
  GRISEOUS_ORB: 442,
} as const;

/** Ability ids read here (kept local: abilityEffects imports this module). */
const ABILITY_GLUTTONY = 82;
const ABILITY_UNBURDEN = 84;
const ABILITY_KLUTZ = 103;

/** Type-boost held items (Gen2–3 ×1.1, Gen4 ×1.2) incl. Gen4 plates / incenses. */
const TYPE_BOOST_BY_POKEAPI: Record<number, number> = {
  199: 12, // Silver Powder — Bug
  210: 17, // Metal Coat — Steel
  214: 9, // Soft Sand — Ground
  215: 13, // Hard Stone — Rock
  216: 5, // Miracle Seed — Grass
  217: 16, // Black Glasses — Dark
  218: 7, // Black Belt — Fighting
  219: 4, // Magnet — Electric
  220: 3, // Mystic Water — Water
  221: 10, // Sharp Beak — Flying
  222: 8, // Poison Barb — Poison
  223: 6, // Never-Melt Ice — Ice
  224: 14, // Spell Tag — Ghost
  225: 11, // Twisted Spoon — Psychic
  226: 2, // Charcoal — Fire
  227: 15, // Dragon Fang — Dragon
  228: 1, // Silk Scarf — Normal
  231: 3, // Sea Incense — Water
  275: 2, // Flame Plate
  276: 3, // Splash Plate
  277: 4, // Zap Plate
  278: 5, // Meadow Plate
  279: 6, // Icicle Plate
  280: 7, // Fist Plate
  281: 8, // Toxic Plate
  282: 9, // Earth Plate
  283: 10, // Sky Plate
  284: 11, // Mind Plate
  285: 12, // Insect Plate
  286: 13, // Stone Plate
  287: 14, // Spooky Plate
  288: 15, // Draco Plate
  289: 16, // Dread Plate
  290: 17, // Iron Plate
  291: 11, // Odd Incense — Psychic
  292: 13, // Rock Incense
  294: 3, // Wave Incense — Water
  295: 5, // Rose Incense — Grass
};

const PLATE_POKEAPI_FIRST = 275;
const PLATE_POKEAPI_LAST = 290;

/** Arceus plate → type (Judgment / Multitype). */
export function plateTypeId(toolPokeapiId: number | null): number | null {
  if (
    toolPokeapiId == null ||
    toolPokeapiId < PLATE_POKEAPI_FIRST ||
    toolPokeapiId > PLATE_POKEAPI_LAST
  ) {
    return null;
  }
  return TYPE_BOOST_BY_POKEAPI[toolPokeapiId] ?? null;
}

/** Gen4 type-resist berries → the type they weaken (Chilan: Normal, any effectiveness). */
const RESIST_BERRY_TYPE: Record<number, number> = {
  161: 2, // Occa — Fire
  162: 3, // Passho — Water
  163: 4, // Wacan — Electric
  164: 5, // Rindo — Grass
  165: 6, // Yache — Ice
  166: 7, // Chople — Fighting
  167: 8, // Kebia — Poison
  168: 9, // Shuca — Ground
  169: 10, // Coba — Flying
  170: 11, // Payapa — Psychic
  171: 12, // Tanga — Bug
  172: 13, // Charti — Rock
  173: 14, // Kasib — Ghost
  174: 15, // Haban — Dragon
  175: 16, // Colbur — Dark
  176: 17, // Babiri — Steel
  177: 1, // Chilan — Normal
};

/** Legendary orbs: holder species → boosted types. */
const ORB_BOOST: Record<number, { dex: number; types: number[] }> = {
  [TOOL_POKEAPI.ADAMANT_ORB]: { dex: 483, types: [15, 17] },
  [TOOL_POKEAPI.LUSTROUS_ORB]: { dex: 484, types: [15, 3] },
  [TOOL_POKEAPI.GRISEOUS_ORB]: { dex: 487, types: [15, 14] },
};

const CHOICE_ITEMS = new Set<number>([
  TOOL_POKEAPI.CHOICE_BAND,
  TOOL_POKEAPI.CHOICE_SPECS,
  TOOL_POKEAPI.CHOICE_SCARF,
]);

const HALF_SPEED_ITEMS = new Set<number>([
  TOOL_POKEAPI.MACHO_BRACE,
  TOOL_POKEAPI.IRON_BALL,
  266, // Power Bracer
  267, // Power Belt
  268, // Power Lens
  269, // Power Band
  270, // Power Anklet
  271, // Power Weight
]);

const STATUS_BERRY: Partial<
  Record<number, { status: BattleStatus; nameJa: string }>
> = {
  [TOOL_POKEAPI.CHERI]: { status: "paralysis", nameJa: "クラボのみ" },
  [TOOL_POKEAPI.CHESTO]: { status: "sleep", nameJa: "カゴのみ" },
  [TOOL_POKEAPI.PECHA]: { status: "poison", nameJa: "モモンのみ" },
  [TOOL_POKEAPI.RAWST]: { status: "burn", nameJa: "チーゴのみ" },
  [TOOL_POKEAPI.ASPEAR]: { status: "freeze", nameJa: "ナナシのみ" },
};

/** Figy-family berries: heal 1/8, but confuse natures that lower the paired stat. */
const FLAVOR_BERRY_DISLIKED_STAT: Partial<Record<number, NatureStatKey>> = {
  [TOOL_POKEAPI.FIGY]: "attack",
  [TOOL_POKEAPI.WIKI]: "sp_attack",
  [TOOL_POKEAPI.MAGO]: "speed",
  [TOOL_POKEAPI.AGUAV]: "sp_defense",
  [TOOL_POKEAPI.IAPAPA]: "defense",
};

type PinchStat = "attack" | "defense" | "speed" | "sp_attack" | "sp_defense";

const PINCH_STAT_BERRY: Partial<Record<number, PinchStat>> = {
  [TOOL_POKEAPI.LIECHI]: "attack",
  [TOOL_POKEAPI.GANLON]: "defense",
  [TOOL_POKEAPI.SALAC]: "speed",
  [TOOL_POKEAPI.PETAYA]: "sp_attack",
  [TOOL_POKEAPI.APICOT]: "sp_defense",
};

const PINCH_STAT_LABEL: Record<PinchStat, string> = {
  attack: "こうげき",
  defense: "ぼうぎょ",
  speed: "すばやさ",
  sp_attack: "とくこう",
  sp_defense: "とくぼう",
};

export function itemsEnabledInBattle(rulesGeneration: number): boolean {
  return rulesGeneration >= 2;
}

/** Parse pokeapi id from deterministic seed UUIDs (…-000000000194 → 194). */
export function pokeapiIdFromSeedToolId(
  toolId: string | null | undefined,
): number | null {
  if (!toolId) return null;
  const prefix = "00000000-0000-4000-8000-";
  if (!toolId.toLowerCase().startsWith(prefix)) return null;
  const n = Number.parseInt(toolId.slice(prefix.length), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/**
 * Resolve held-item pokeapi id for battle.
 * Order: member.toolPokeapiId → toolsById[toolId] → seed UUID parse.
 */
export function resolveHeldToolPokeapiId(
  member: Pick<PartyMemberBuild, "toolId" | "toolPokeapiId">,
  toolsById: Record<string, Tool>,
  rulesGeneration: number,
): number | null {
  if (!itemsEnabledInBattle(rulesGeneration)) return null;
  if (!member.toolId && member.toolPokeapiId == null) return null;

  if (member.toolPokeapiId != null) {
    const n = Number(member.toolPokeapiId);
    if (Number.isFinite(n) && n > 0) return n;
  }

  if (member.toolId) {
    const raw = toolsById[member.toolId]?.pokeapi_id;
    if (raw != null) {
      const n = Number(raw);
      if (Number.isFinite(n) && n > 0) return n;
    }
    return pokeapiIdFromSeedToolId(member.toolId);
  }

  return null;
}

/** @deprecated Prefer resolveHeldToolPokeapiId */
export function resolveToolPokeapiId(
  toolId: string | null | undefined,
  toolsById: Record<string, Tool>,
  rulesGeneration: number,
): number | null {
  return resolveHeldToolPokeapiId(
    { toolId: toolId ?? null, toolPokeapiId: null },
    toolsById,
    rulesGeneration,
  );
}

export function toFighterStatBlock(
  stats: ReturnType<typeof calcBattleStats>,
  rulesGeneration: number,
): Gen1StatBlock {
  if (usesSplitSpecial(rulesGeneration)) {
    const gen2 = stats as Gen1StatBlock & {
      sp_attack: number;
      sp_defense: number;
    };
    return {
      hp: gen2.hp,
      attack: gen2.attack,
      defense: gen2.defense,
      special: gen2.sp_attack,
      sp_attack: gen2.sp_attack,
      sp_defense: gen2.sp_defense,
      speed: gen2.speed,
    };
  }
  return stats as Gen1StatBlock;
}

type StatFactors = {
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
};

function heldItemStatFactors(
  species: Pick<PokemonSpecies, "dex_no">,
  toolPokeapiId: number | null,
  rulesGeneration: number,
): StatFactors {
  const f: StatFactors = { attack: 1, defense: 1, spAttack: 1, spDefense: 1 };
  const dex = species.dex_no;
  switch (toolPokeapiId) {
    case TOOL_POKEAPI.LIGHT_BALL:
      if (dex === 25) {
        f.spAttack = 2;
        // Gen4: Attack is doubled as well.
        if (rulesGeneration >= 4) f.attack = 2;
      }
      break;
    case TOOL_POKEAPI.METAL_POWDER:
      if (dex === 132) f.defense = 2;
      break;
    case TOOL_POKEAPI.THICK_CLUB:
      if (dex === 104 || dex === 105) f.attack = 2;
      break;
    case TOOL_POKEAPI.SOUL_DEW:
      if (dex === 380 || dex === 381) {
        f.spAttack = 1.5;
        f.spDefense = 1.5;
      }
      break;
    case TOOL_POKEAPI.DEEP_SEA_TOOTH:
      if (dex === 366) f.spAttack = 2;
      break;
    case TOOL_POKEAPI.DEEP_SEA_SCALE:
      if (dex === 366) f.spDefense = 2;
      break;
    case TOOL_POKEAPI.CHOICE_BAND:
      f.attack = 1.5;
      break;
    case TOOL_POKEAPI.CHOICE_SPECS:
      f.spAttack = 1.5;
      break;
    default:
      break;
  }
  return f;
}

function applyStatFactors(
  stats: Gen1StatBlock,
  f: StatFactors,
  mode: "apply" | "remove",
): Gen1StatBlock {
  const op = (value: number, factor: number) =>
    mode === "apply" ? Math.floor(value * factor) : Math.round(value / factor);
  const next = { ...stats };
  next.attack = op(next.attack, f.attack);
  next.defense = op(next.defense, f.defense);
  if (next.sp_attack != null) {
    next.sp_attack = op(next.sp_attack, f.spAttack);
    next.special = next.sp_attack;
  } else {
    next.special = op(next.special, f.spAttack);
  }
  if (next.sp_defense != null) next.sp_defense = op(next.sp_defense, f.spDefense);
  return next;
}

/** Stat modifiers from species-specific / Choice held items (applied at send-out). */
export function applyHeldItemStats(
  stats: Gen1StatBlock,
  species: PokemonSpecies,
  toolPokeapiId: number | null,
  rulesGeneration: number,
): Gen1StatBlock {
  if (!itemsEnabledInBattle(rulesGeneration) || !toolPokeapiId) return stats;
  return applyStatFactors(
    stats,
    heldItemStatFactors(species, toolPokeapiId, rulesGeneration),
    "apply",
  );
}

/** Re-apply species stat items after the held item changes mid-battle. */
export function adjustHeldItemStatsForSwap(
  fighter: BattleFighter,
  fromPokeapiId: number | null,
  toPokeapiId: number | null,
  rulesGeneration: number,
): void {
  if (!itemsEnabledInBattle(rulesGeneration)) return;
  const removed = applyStatFactors(
    fighter.stats,
    heldItemStatFactors(fighter.species, fromPokeapiId, rulesGeneration),
    "remove",
  );
  fighter.stats = applyStatFactors(
    removed,
    heldItemStatFactors(fighter.species, toPokeapiId, rulesGeneration),
    "apply",
  );
}

export function computeMemberBattleStats(
  species: PokemonSpecies,
  member: PartyMemberBuild,
  rulesGeneration: number,
  toolsById: Record<string, Tool>,
): { stats: Gen1StatBlock; toolPokeapiId: number | null } {
  const raw = calcBattleStats(species, member, rulesGeneration);
  let stats = toFighterStatBlock(raw, rulesGeneration);
  const toolPokeapiId = resolveHeldToolPokeapiId(
    member,
    toolsById,
    rulesGeneration,
  );
  stats = applyHeldItemStats(stats, species, toolPokeapiId, rulesGeneration);
  return { stats, toolPokeapiId };
}

/**
 * Base-power multiplier from held items: type boosters / plates / incenses,
 * legendary orbs, Muscle Band, Wise Glasses.
 */
export function heldItemDamageMultiplier(
  moveTypeId: number,
  toolPokeapiId: number | null,
  rulesGeneration = 2,
  attackerDexNo?: number | null,
  damageClass?: Move["damage_class"],
): number {
  if (!toolPokeapiId) return 1;
  let mult = 1;
  const boostedType = TYPE_BOOST_BY_POKEAPI[toolPokeapiId];
  if (boostedType != null && boostedType === moveTypeId) {
    if (toolPokeapiId === TOOL_POKEAPI.SEA_INCENSE && rulesGeneration <= 3) {
      mult *= 1.05;
    } else {
      mult *= rulesGeneration >= 4 ? 1.2 : 1.1;
    }
  }
  const orb = ORB_BOOST[toolPokeapiId];
  if (orb && attackerDexNo === orb.dex && orb.types.includes(moveTypeId)) {
    mult *= 1.2;
  }
  if (toolPokeapiId === TOOL_POKEAPI.MUSCLE_BAND && damageClass === "physical") {
    mult *= 1.1;
  }
  if (toolPokeapiId === TOOL_POKEAPI.WISE_GLASSES && damageClass === "special") {
    mult *= 1.1;
  }
  return mult;
}

/** Final damage multiplier: Life Orb, Expert Belt, Metronome (Gen4). */
export function heldItemFinalDamageMultiplier(
  toolPokeapiId: number | null,
  typeEffectiveness: number,
  metronomeCount = 0,
): number {
  if (!toolPokeapiId) return 1;
  if (toolPokeapiId === TOOL_POKEAPI.LIFE_ORB) return 1.3;
  if (toolPokeapiId === TOOL_POKEAPI.EXPERT_BELT && typeEffectiveness > 1) return 1.2;
  if (toolPokeapiId === TOOL_POKEAPI.METRONOME && metronomeCount > 0) {
    return Math.min(2, 1 + metronomeCount * 0.1);
  }
  return 1;
}

/** Accuracy factor from the defender's item (Bright Powder / Lax Incense). */
export function heldItemAccuracyFactor(
  defenderToolPokeapiId: number | null,
  rulesGeneration = 2,
): number {
  if (defenderToolPokeapiId === TOOL_POKEAPI.BRIGHT_POWDER) return 0.9;
  if (defenderToolPokeapiId === TOOL_POKEAPI.LAX_INCENSE) {
    return rulesGeneration >= 4 ? 0.9 : 0.95;
  }
  return 1;
}

/** Accuracy factor from the attacker's item (Wide Lens / Zoom Lens). */
export function attackerItemAccuracyFactor(
  attackerToolPokeapiId: number | null,
  movesAfterTarget: boolean,
): number {
  if (attackerToolPokeapiId === TOOL_POKEAPI.WIDE_LENS) return 1.1;
  if (attackerToolPokeapiId === TOOL_POKEAPI.ZOOM_LENS && movesAfterTarget) return 1.2;
  return 1;
}

export function heldItemCritDenomModifier(
  attacker: BattleFighter,
  toolPokeapiId: number | null,
  highCrit: boolean,
): { highCrit: boolean; denomFactor: number } {
  let nextHighCrit = highCrit;
  let denomFactor = 1;

  if (!toolPokeapiId || attacker.heldTool?.consumed) {
    return { highCrit: nextHighCrit, denomFactor };
  }

  if (toolPokeapiId === TOOL_POKEAPI.SCOPE_LENS) {
    denomFactor *= 2;
  }
  if (toolPokeapiId === TOOL_POKEAPI.LUCKY_PUNCH && attacker.species.dex_no === 113) {
    nextHighCrit = true;
  }
  if (toolPokeapiId === TOOL_POKEAPI.LEEK && attacker.species.dex_no === 83) {
    nextHighCrit = true;
  }

  return { highCrit: nextHighCrit, denomFactor };
}

export function rollQuickClaw(toolPokeapiId: number | null): boolean {
  if (toolPokeapiId !== TOOL_POKEAPI.QUICK_CLAW) return false;
  return Math.random() < 0.2;
}

/** King's Rock / Razor Fang: 10% flinch on damaging moves. */
export function rollKingsRockFlinch(
  toolPokeapiId: number | null,
  move: Move,
  dealt: number,
): boolean {
  if (
    toolPokeapiId !== TOOL_POKEAPI.KINGS_ROCK &&
    toolPokeapiId !== TOOL_POKEAPI.RAZOR_FANG
  ) {
    return false;
  }
  if (dealt <= 0 || move.damage_class === "status") return false;
  return Math.random() < 0.1;
}

export function rollFocusBandSurvival(toolPokeapiId: number | null): boolean {
  if (toolPokeapiId !== TOOL_POKEAPI.FOCUS_BAND) return false;
  return Math.random() < 0.1;
}

/** Held item id while it still exists (even if Klutz / Embargo stop its effect). */
export function heldToolPokeapiId(fighter: BattleFighter): number | null {
  if (!fighter.heldTool || fighter.heldTool.consumed) return null;
  return fighter.heldTool.pokeapiId;
}

/** Held item id whose effect is active (Klutz / Embargo suppress it). */
export function activeToolPokeapiId(fighter: BattleFighter): number | null {
  if (fighter.abilityPokeapiId === ABILITY_KLUTZ) return null;
  if (fighter.volatiles.embargoTurns > 0) return null;
  return heldToolPokeapiId(fighter);
}

export function consumeHeldTool(fighter: BattleFighter): void {
  if (!fighter.heldTool) return;
  fighter.heldTool.consumed = true;
  if (fighter.abilityPokeapiId === ABILITY_UNBURDEN) {
    fighter.volatiles.unburdenActive = true;
  }
}

export function isChoiceItem(toolPokeapiId: number | null): boolean {
  return toolPokeapiId != null && CHOICE_ITEMS.has(toolPokeapiId);
}

/** Speed multiplier from held items (Choice Scarf, Iron Ball, Macho Brace / Power items, Quick Powder). */
export function heldItemSpeedMultiplier(
  toolPokeapiId: number | null,
  dexNo: number,
  rulesGeneration: number,
): number {
  if (!toolPokeapiId) return 1;
  if (toolPokeapiId === TOOL_POKEAPI.CHOICE_SCARF) return 1.5;
  if (HALF_SPEED_ITEMS.has(toolPokeapiId)) return 0.5;
  if (
    toolPokeapiId === TOOL_POKEAPI.QUICK_POWDER &&
    dexNo === 132 &&
    rulesGeneration >= 4
  ) {
    return 2;
  }
  return 1;
}

/** Lagging Tail / Full Incense: always move last within the same priority. */
export function heldItemMovesLast(toolPokeapiId: number | null): boolean {
  return (
    toolPokeapiId === TOOL_POKEAPI.LAGGING_TAIL ||
    toolPokeapiId === TOOL_POKEAPI.FULL_INCENSE
  );
}

export function resistBerryType(toolPokeapiId: number | null): number | null {
  return toolPokeapiId != null ? (RESIST_BERRY_TYPE[toolPokeapiId] ?? null) : null;
}

/**
 * Gen4 type-resist berry: halves a super-effective hit of its type (Chilan: any Normal hit).
 * Consumes the berry and logs. Returns the damage multiplier to apply.
 */
export function tryResistBerry(
  defender: BattleFighter,
  moveTypeId: number,
  typeEffectiveness: number,
  logs: TurnLogLine[],
): number {
  const toolId = activeToolPokeapiId(defender);
  const type = resistBerryType(toolId);
  if (type == null || type !== moveTypeId) return 1;
  if (type !== 1 && typeEffectiveness <= 1) return 1;
  logs.push(
    `${defender.member.nameJa}は　${heldToolNameJa(defender.heldTool)}で　ダメージを　弱めた！`,
  );
  consumeHeldTool(defender);
  return 0.5;
}

export function flingPower(toolPokeapiId: number): number | null {
  return ITEM_BATTLE_DATA[String(toolPokeapiId)]?.fling ?? null;
}

export function naturalGift(
  toolPokeapiId: number | null,
): { typeId: number; power: number } | null {
  if (toolPokeapiId == null) return null;
  const data = ITEM_BATTLE_DATA[String(toolPokeapiId)];
  if (!data?.naturalGiftType || !data.naturalGiftPower) return null;
  return { typeId: data.naturalGiftType, power: data.naturalGiftPower };
}

export function isBerry(toolPokeapiId: number | null): boolean {
  return naturalGift(toolPokeapiId) != null;
}

function healFighter(
  fighter: BattleFighter,
  amount: number,
  logs: TurnLogLine[] | undefined,
  message: string,
): void {
  if (amount <= 0 || fighter.currentHp <= 0) return;
  if (fighter.volatiles.healBlockTurns > 0) return;
  const before = fighter.currentHp;
  fighter.currentHp = Math.min(fighter.maxHp, fighter.currentHp + amount);
  if (fighter.currentHp > before) {
    logs?.push(message);
  }
}

function raisePinchStat(
  fighter: BattleFighter,
  stat: PinchStat,
  amount: number,
  logs: TurnLogLine[] | undefined,
): void {
  const name = fighter.member.nameJa;
  const berry = heldToolNameJa(fighter.heldTool);
  const before = fighter.stages[stat];
  fighter.stages[stat] = Math.min(6, before + amount);
  if (stat === "sp_attack" && !usesSplitSpecial(fighter.rulesGeneration)) {
    fighter.stages.special = fighter.stages.sp_attack;
  }
  logs?.push(
    `${name}は　${berry}で　${PINCH_STAT_LABEL[stat]}が　${amount >= 2 ? "ぐーんと" : ""}上がった！`,
  );
}

/**
 * Pinch berries (Gen3+): Liechi / Ganlon / Salac / Petaya / Apicot / Lansat / Starf,
 * Gen4 Micle / Custap. Activate at ≤ 1/4 HP (Gluttony: ≤ 1/2).
 */
function tryPinchBerry(
  fighter: BattleFighter,
  toolId: number,
  logs: TurnLogLine[] | undefined,
): boolean {
  const gluttony = fighter.abilityPokeapiId === ABILITY_GLUTTONY;
  if (fighter.currentHp > Math.floor(fighter.maxHp / (gluttony ? 2 : 4))) return false;
  const name = fighter.member.nameJa;
  const berry = heldToolNameJa(fighter.heldTool);
  const stat = PINCH_STAT_BERRY[toolId];
  if (stat) {
    if (fighter.stages[stat] >= 6) return false;
    raisePinchStat(fighter, stat, 1, logs);
    consumeHeldTool(fighter);
    return true;
  }
  if (toolId === TOOL_POKEAPI.LANSAT) {
    if (fighter.volatiles.focusEnergy) return false;
    fighter.volatiles.focusEnergy = true;
    logs?.push(`${name}は　${berry}で　はりきっている！`);
    consumeHeldTool(fighter);
    return true;
  }
  if (toolId === TOOL_POKEAPI.STARF) {
    const options = (Object.keys(PINCH_STAT_LABEL) as PinchStat[]).filter(
      (s) => fighter.stages[s] < 6,
    );
    if (options.length === 0) return false;
    const pick = options[Math.floor(Math.random() * options.length)]!;
    raisePinchStat(fighter, pick, 2, logs);
    consumeHeldTool(fighter);
    return true;
  }
  if (fighter.rulesGeneration < 4) return false;
  if (toolId === TOOL_POKEAPI.MICLE) {
    fighter.volatiles.micleActive = true;
    logs?.push(`${name}は　${berry}で　次の　技が　当たりやすくなった！`);
    consumeHeldTool(fighter);
    return true;
  }
  if (toolId === TOOL_POKEAPI.CUSTAP) {
    fighter.volatiles.custapActive = true;
    logs?.push(`${name}は　${berry}で　行動が　はやくなった！`);
    consumeHeldTool(fighter);
    return true;
  }
  return false;
}

/**
 * Call after any HP loss so Oran / Sitrus / Berry Juice / pinch berries can trigger.
 * HP berries activate when current HP ≤ 50% of max.
 */
export function tryHpThresholdBerry(
  fighter: BattleFighter,
  logs?: TurnLogLine[],
): boolean {
  const toolId = activeToolPokeapiId(fighter);
  if (!toolId) return false;
  if (fighter.currentHp <= 0) return false;
  if (fighter.rulesGeneration >= 3 && tryPinchBerry(fighter, toolId, logs)) {
    return true;
  }
  if (fighter.currentHp > Math.floor(fighter.maxHp / 2)) return false;
  // Heal Block keeps healing berries unused.
  if (fighter.volatiles.healBlockTurns > 0) return false;

  const name = fighter.member.nameJa;
  switch (toolId) {
    case TOOL_POKEAPI.BERRY_JUICE:
      consumeHeldTool(fighter);
      healFighter(fighter, 20, logs, `${name}は　きのみジュースで　HPを　回復した！`);
      return true;
    case TOOL_POKEAPI.ORAN:
      consumeHeldTool(fighter);
      healFighter(fighter, 10, logs, `${name}は　オレンのみで　HPを　回復した！`);
      return true;
    case TOOL_POKEAPI.SITRUS: {
      // Gen2–3: 30 HP. Gen4: 1/4 of max HP.
      const heal =
        fighter.rulesGeneration >= 4 ? Math.max(1, Math.floor(fighter.maxHp / 4)) : 30;
      consumeHeldTool(fighter);
      healFighter(fighter, heal, logs, `${name}は　オボンのみで　HPを　回復した！`);
      return true;
    }
    default:
      break;
  }

  const disliked = FLAVOR_BERRY_DISLIKED_STAT[toolId];
  if (disliked && fighter.rulesGeneration >= 3) {
    const berry = heldToolNameJa(fighter.heldTool);
    consumeHeldTool(fighter);
    healFighter(
      fighter,
      Math.max(1, Math.floor(fighter.maxHp / 8)),
      logs,
      `${name}は　${berry}で　HPを　回復した！`,
    );
    if (
      getNature(fighter.member.natureId).minus === disliked &&
      fighter.volatiles.confusionTurns <= 0
    ) {
      fighter.volatiles.confusionTurns = 2 + Math.floor(Math.random() * 4);
      logs?.push(`${name}は　にがい味で　こんらんした！`);
    }
    return true;
  }
  return false;
}

/**
 * Status / confusion cure berries.
 * Caller should emit a beat with the ailment message BEFORE calling this,
 * so the UI can show the status badge, then emit the cure logs.
 */
export function tryStatusCureBerry(
  fighter: BattleFighter,
  ailment: BattleStatus | "confusion",
  logs?: TurnLogLine[],
): boolean {
  const toolId = activeToolPokeapiId(fighter);
  if (!toolId) return false;

  if (toolId === TOOL_POKEAPI.LUM) {
    if (ailment === "confusion") {
      if (fighter.volatiles.confusionTurns <= 0) return false;
      fighter.volatiles.confusionTurns = 0;
      consumeHeldTool(fighter);
      logs?.push(`${fighter.member.nameJa}は　ラムのみで　こんらんを　治した！`);
      return true;
    }
    if (!fighter.status) return false;
    fighter.status = null;
    fighter.sleepTurns = 0;
    consumeHeldTool(fighter);
    logs?.push(`${fighter.member.nameJa}は　ラムのみで　状態異常を　治した！`);
    return true;
  }

  if (toolId === TOOL_POKEAPI.PERSIM && ailment === "confusion") {
    if (fighter.volatiles.confusionTurns <= 0) return false;
    fighter.volatiles.confusionTurns = 0;
    consumeHeldTool(fighter);
    logs?.push(`${fighter.member.nameJa}は　キーのみで　こんらんを　治した！`);
    return true;
  }

  if (ailment === "confusion") return false;
  const berry = STATUS_BERRY[toolId];
  if (!berry || fighter.status !== berry.status) return false;
  fighter.status = null;
  fighter.sleepTurns = 0;
  consumeHeldTool(fighter);
  logs?.push(
    `${fighter.member.nameJa}は　${berry.nameJa}で　状態異常を　治した！`,
  );
  return true;
}

/**
 * Pluck / Bug Bite: the eater gets the stolen berry's effect immediately,
 * regardless of its HP threshold.
 */
export function eatBerryEffect(
  eater: BattleFighter,
  berryId: number,
  logs: TurnLogLine[],
): void {
  const name = eater.member.nameJa;
  const berry = TOOL_NAME_JA_BY_POKEAPI[berryId] ?? "きのみ";
  const heal = (amount: number) =>
    healFighter(eater, amount, logs, `${name}は　${berry}で　HPを　回復した！`);
  if (berryId === TOOL_POKEAPI.SITRUS) {
    heal(Math.max(1, Math.floor(eater.maxHp / 4)));
    return;
  }
  if (berryId === TOOL_POKEAPI.ORAN) {
    heal(10);
    return;
  }
  const disliked = FLAVOR_BERRY_DISLIKED_STAT[berryId];
  if (disliked) {
    heal(Math.max(1, Math.floor(eater.maxHp / 8)));
    if (
      getNature(eater.member.natureId).minus === disliked &&
      eater.volatiles.confusionTurns <= 0
    ) {
      eater.volatiles.confusionTurns = 2 + Math.floor(Math.random() * 4);
      logs.push(`${name}は　にがい味で　こんらんした！`);
    }
    return;
  }
  const status = STATUS_BERRY[berryId];
  if (status) {
    if (eater.status === status.status) {
      eater.status = null;
      eater.sleepTurns = 0;
      logs.push(`${name}は　${berry}で　状態異常を　治した！`);
    }
    return;
  }
  if (berryId === TOOL_POKEAPI.LUM) {
    if (eater.status || eater.volatiles.confusionTurns > 0) {
      eater.status = null;
      eater.sleepTurns = 0;
      eater.volatiles.confusionTurns = 0;
      logs.push(`${name}は　${berry}で　状態異常を　治した！`);
    }
    return;
  }
  if (berryId === TOOL_POKEAPI.PERSIM) {
    if (eater.volatiles.confusionTurns > 0) {
      eater.volatiles.confusionTurns = 0;
      logs.push(`${name}は　${berry}で　こんらんを　治した！`);
    }
    return;
  }
  const stat = PINCH_STAT_BERRY[berryId];
  if (stat && eater.stages[stat] < 6) {
    eater.stages[stat] += 1;
    logs.push(`${name}は　${berry}で　${PINCH_STAT_LABEL[stat]}が　上がった！`);
    return;
  }
  if (berryId === TOOL_POKEAPI.LANSAT && !eater.volatiles.focusEnergy) {
    eater.volatiles.focusEnergy = true;
    logs.push(`${name}は　${berry}で　はりきっている！`);
    return;
  }
  if (berryId === TOOL_POKEAPI.STARF) {
    const options = (Object.keys(PINCH_STAT_LABEL) as PinchStat[]).filter(
      (s) => eater.stages[s] < 6,
    );
    const pick = options[Math.floor(Math.random() * options.length)];
    if (pick) {
      eater.stages[pick] = Math.min(6, eater.stages[pick] + 2);
      logs.push(`${name}は　${berry}で　${PINCH_STAT_LABEL[pick]}が　ぐーんと上がった！`);
    }
    return;
  }
  if (berryId === TOOL_POKEAPI.MICLE) {
    eater.volatiles.micleActive = true;
    return;
  }
  if (berryId === TOOL_POKEAPI.CUSTAP) {
    eater.volatiles.custapActive = true;
  }
}

/** Jaboca / Rowap: a physical / special hit makes the attacker lose 1/8. */
export function tryRetaliationBerry(
  defender: BattleFighter,
  attacker: BattleFighter,
  move: Move,
  logs: TurnLogLine[],
): boolean {
  const toolId = activeToolPokeapiId(defender);
  const matches =
    (toolId === TOOL_POKEAPI.JABOCA && move.damage_class === "physical") ||
    (toolId === TOOL_POKEAPI.ROWAP && move.damage_class === "special");
  if (!matches || attacker.currentHp <= 0) return false;
  const berry = heldToolNameJa(defender.heldTool);
  consumeHeldTool(defender);
  if (attacker.abilityPokeapiId !== 98) {
    attacker.currentHp = Math.max(
      0,
      attacker.currentHp - Math.max(1, Math.floor(attacker.maxHp / 8)),
    );
    logs.push(`${attacker.member.nameJa}は　${defender.member.nameJa}の　${berry}で　ダメージを　受けた！`);
  }
  return true;
}

/** White Herb: restore lowered stat stages once. */
export function tryWhiteHerb(fighter: BattleFighter, logs: TurnLogLine[]): boolean {
  if (activeToolPokeapiId(fighter) !== TOOL_POKEAPI.WHITE_HERB) return false;
  const keys = Object.keys(fighter.stages) as (keyof BattleFighter["stages"])[];
  if (!keys.some((k) => fighter.stages[k] < 0)) return false;
  for (const k of keys) {
    if (fighter.stages[k] < 0) fighter.stages[k] = 0;
  }
  consumeHeldTool(fighter);
  logs.push(`${fighter.member.nameJa}は　しろいハーブで　能力を　元に　戻した！`);
  return true;
}

/** Mental Herb (Gen3–4): cures infatuation once. */
export function tryMentalHerb(fighter: BattleFighter, logs: TurnLogLine[]): boolean {
  if (activeToolPokeapiId(fighter) !== TOOL_POKEAPI.MENTAL_HERB) return false;
  if (!fighter.volatiles.infatuated) return false;
  fighter.volatiles.infatuated = false;
  consumeHeldTool(fighter);
  logs.push(`${fighter.member.nameJa}は　メンタルハーブで　メロメロが　解けた！`);
  return true;
}

/**
 * Leppa Berry: when a move's PP hits 0, restore up to 10 PP (capped at max PP).
 * Returns the restore amount, or 0 if not applicable.
 */
export function tryLeppaBerry(
  fighter: BattleFighter,
  remainingPpAfterSpend: number,
  maxPp: number,
  logs?: TurnLogLine[],
): number {
  if (remainingPpAfterSpend > 0) return 0;
  const toolId = activeToolPokeapiId(fighter);
  if (toolId !== TOOL_POKEAPI.LEPPA) return 0;
  const restore = Math.min(10, Math.max(0, Math.floor(maxPp)));
  if (restore <= 0) return 0;
  consumeHeldTool(fighter);
  logs?.push(
    `${fighter.member.nameJa}は　ヒメリのみで　PPを　回復した！`,
  );
  return restore;
}

export function processLeftovers(
  fighter: BattleFighter,
  logs: TurnLogLine[],
): void {
  const toolId = activeToolPokeapiId(fighter);
  if (fighter.currentHp <= 0) return;
  const name = fighter.member.nameJa;
  if (toolId === TOOL_POKEAPI.LEFTOVERS) {
    if (fighter.currentHp >= fighter.maxHp) return;
    healFighter(
      fighter,
      Math.max(1, Math.floor(fighter.maxHp / 16)),
      logs,
      `${name}は　たべのこしで　HPを　回復した！`,
    );
    return;
  }
  if (toolId === TOOL_POKEAPI.BLACK_SLUDGE) {
    const poison = fighter.battleType1 === 8 || fighter.battleType2 === 8;
    if (poison) {
      if (fighter.currentHp >= fighter.maxHp) return;
      healFighter(
        fighter,
        Math.max(1, Math.floor(fighter.maxHp / 16)),
        logs,
        `${name}は　くろいヘドロで　HPを　回復した！`,
      );
    } else if (fighter.abilityPokeapiId !== 98) {
      fighter.currentHp = Math.max(
        0,
        fighter.currentHp - Math.max(1, Math.floor(fighter.maxHp / 8)),
      );
      logs.push(`${name}は　くろいヘドロで　ダメージを　受けた！`);
    }
  }
}
