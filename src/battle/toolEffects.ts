import { usesSplitSpecial } from "../pokemon/baseStatFilters";
import { calcBattleStats } from "../party/calcBattleStats";
import type { Gen1StatBlock, PartyMemberBuild } from "../party/types";
import type { PokemonSpecies } from "../pokemon/types";
import type { Tool } from "../pokemon/tools";
import type { Move } from "../pokemon/moves";
import type { BattleFighter, BattleStatus, TurnLogLine } from "./types";

/** PokeAPI item ids for Gen2 held tools in this app. */
export const TOOL_POKEAPI = {
  BERRY_JUICE: 43,
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
  BRIGHT_POWDER: 190,
  QUICK_CLAW: 194,
  KINGS_ROCK: 198,
  FOCUS_BAND: 207,
  SCOPE_LENS: 209,
  LEFTOVERS: 211,
  LIGHT_BALL: 213,
  LUCKY_PUNCH: 233,
  METAL_POWDER: 234,
  THICK_CLUB: 235,
  LEEK: 236,
} as const;

/** Type-boost held items (+10% when move type matches). */
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
};

const STATUS_BERRY: Partial<
  Record<number, { status: BattleStatus; nameJa: string }>
> = {
  [TOOL_POKEAPI.CHERI]: { status: "paralysis", nameJa: "クラボのみ" },
  [TOOL_POKEAPI.CHESTO]: { status: "sleep", nameJa: "カゴのみ" },
  [TOOL_POKEAPI.PECHA]: { status: "poison", nameJa: "モモンのみ" },
  [TOOL_POKEAPI.RAWST]: { status: "burn", nameJa: "チーゴのみ" },
  [TOOL_POKEAPI.ASPEAR]: { status: "freeze", nameJa: "ナナシのみ" },
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

/** Stat modifiers from species-specific held items (applied at send-out). */
export function applyHeldItemStats(
  stats: Gen1StatBlock,
  species: PokemonSpecies,
  toolPokeapiId: number | null,
  rulesGeneration: number,
): Gen1StatBlock {
  if (!itemsEnabledInBattle(rulesGeneration) || !toolPokeapiId) return stats;
  const next = { ...stats };

  if (toolPokeapiId === TOOL_POKEAPI.LIGHT_BALL && species.dex_no === 25) {
    if (next.sp_attack != null) next.sp_attack *= 2;
    else next.special *= 2;
  }
  if (toolPokeapiId === TOOL_POKEAPI.METAL_POWDER && species.dex_no === 132) {
    next.defense *= 2;
  }
  if (
    toolPokeapiId === TOOL_POKEAPI.THICK_CLUB &&
    (species.dex_no === 104 || species.dex_no === 105)
  ) {
    next.attack *= 2;
  }

  return next;
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

export function heldItemDamageMultiplier(
  moveTypeId: number,
  toolPokeapiId: number | null,
): number {
  if (!toolPokeapiId) return 1;
  const boostedType = TYPE_BOOST_BY_POKEAPI[toolPokeapiId];
  if (boostedType != null && boostedType === moveTypeId) return 1.1;
  return 1;
}

export function heldItemAccuracyFactor(
  defenderToolPokeapiId: number | null,
): number {
  if (defenderToolPokeapiId === TOOL_POKEAPI.BRIGHT_POWDER) return 0.9;
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

export function rollKingsRockFlinch(
  toolPokeapiId: number | null,
  move: Move,
  dealt: number,
): boolean {
  if (toolPokeapiId !== TOOL_POKEAPI.KINGS_ROCK) return false;
  if (dealt <= 0 || move.damage_class === "status") return false;
  return Math.random() < 0.1;
}

export function rollFocusBandSurvival(toolPokeapiId: number | null): boolean {
  if (toolPokeapiId !== TOOL_POKEAPI.FOCUS_BAND) return false;
  return Math.random() < 0.1;
}

export function activeToolPokeapiId(fighter: BattleFighter): number | null {
  if (!fighter.heldTool || fighter.heldTool.consumed) return null;
  return fighter.heldTool.pokeapiId;
}

function consumeHeldTool(fighter: BattleFighter): void {
  if (fighter.heldTool) fighter.heldTool.consumed = true;
}

function healFighter(
  fighter: BattleFighter,
  amount: number,
  logs: TurnLogLine[] | undefined,
  message: string,
): void {
  if (amount <= 0 || fighter.currentHp <= 0) return;
  const before = fighter.currentHp;
  fighter.currentHp = Math.min(fighter.maxHp, fighter.currentHp + amount);
  if (fighter.currentHp > before) {
    logs?.push(message);
  }
}

/**
 * Call after any HP loss so Oran / Sitrus / Berry Juice can trigger.
 * Gen2: activates when current HP ≤ 50% of max.
 */
export function tryHpThresholdBerry(
  fighter: BattleFighter,
  logs?: TurnLogLine[],
): boolean {
  const toolId = activeToolPokeapiId(fighter);
  if (!toolId) return false;
  if (fighter.currentHp <= 0) return false;
  // Gen2: at or below half max HP (integer floor).
  if (fighter.currentHp > Math.floor(fighter.maxHp / 2)) return false;

  switch (toolId) {
    case TOOL_POKEAPI.BERRY_JUICE:
      consumeHeldTool(fighter);
      healFighter(
        fighter,
        20,
        logs,
        `${fighter.member.nameJa}は　きのみジュースで　HPを　回復した！`,
      );
      return true;
    case TOOL_POKEAPI.ORAN:
      consumeHeldTool(fighter);
      healFighter(
        fighter,
        10,
        logs,
        `${fighter.member.nameJa}は　オレンのみで　HPを　回復した！`,
      );
      return true;
    case TOOL_POKEAPI.SITRUS: {
      // Gen2 Sitrus restores 30 HP (not 1/4).
      consumeHeldTool(fighter);
      healFighter(
        fighter,
        30,
        logs,
        `${fighter.member.nameJa}は　オボンのみで　HPを　回復した！`,
      );
      return true;
    }
    default:
      return false;
  }
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
  if (toolId !== TOOL_POKEAPI.LEFTOVERS) return;
  if (fighter.currentHp <= 0 || fighter.currentHp >= fighter.maxHp) return;
  const heal = Math.max(1, Math.floor(fighter.maxHp / 16));
  healFighter(
    fighter,
    heal,
    logs,
    `${fighter.member.nameJa}は　たべのこしで　HPを　回復した！`,
  );
}
