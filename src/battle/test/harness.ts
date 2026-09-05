import { vi } from "vitest";

import gen2Moves from "../../data/gen2-moves.json";
import type { PartyMemberBuild } from "../../party/types";
import { EMPTY_EFFECT_META, type Move } from "../../pokemon/moves";
import type { PokemonSpecies } from "../../pokemon/types";
import { GENDER, REGION_TYPES } from "../../pokemon/types";
import { buildFighter, resolveTurnSteps } from "../resolveTurn";
import {
  createBattleField,
  type BattleAction,
  type BattleFighter,
  type BattleFieldState,
  type TurnStep,
} from "../types";

const GEN2_MOVES = gen2Moves as Move[];

export function forceHits(): void {
  // randInt(1, 100) → 1 so accuracy / secondary chances succeed.
  vi.spyOn(Math, "random").mockReturnValue(0);
}

export function makeSpecies(
  overrides: Partial<PokemonSpecies> & Pick<PokemonSpecies, "name_ja">,
): PokemonSpecies {
  return {
    id: overrides.id ?? `species-${overrides.name_ja}`,
    dex_no: overrides.dex_no ?? 1,
    region_type: overrides.region_type ?? REGION_TYPES.ORIGINAL,
    name_ja: overrides.name_ja,
    name_en: overrides.name_en ?? overrides.name_ja,
    category: overrides.category ?? "normal",
    introduced_generation: overrides.introduced_generation ?? 2,
    available_generations: overrides.available_generations ?? 510,
    type1: overrides.type1 ?? 1,
    type2: overrides.type2 ?? 0,
    base_hp: overrides.base_hp ?? 80,
    base_attack: overrides.base_attack ?? 80,
    base_defense: overrides.base_defense ?? 80,
    base_special: overrides.base_special ?? 80,
    base_sp_attack: overrides.base_sp_attack ?? 80,
    base_sp_defense: overrides.base_sp_defense ?? 80,
    base_speed: overrides.base_speed ?? 80,
    ability1_id: null,
    ability2_id: null,
    hidden_ability_id: null,
    gender: overrides.gender ?? GENDER.BOTH,
    is_mega: false,
    is_final_evolution: true,
    sprite_url: null,
  };
}

export function makeMember(
  species: PokemonSpecies,
  overrides: Partial<PartyMemberBuild> = {},
): PartyMemberBuild {
  return {
    speciesId: species.id,
    dexNo: species.dex_no,
    nameJa: species.name_ja,
    level: overrides.level ?? 50,
    gender: overrides.gender ?? "male",
    iv: {
      hp: 15,
      attack: 15,
      defense: 15,
      special: 15,
      sp_attack: 15,
      sp_defense: 15,
      speed: 15,
      ...(overrides.iv ?? {}),
    },
    statExp: {
      hp: 0,
      attack: 0,
      defense: 0,
      special: 0,
      sp_attack: 0,
      sp_defense: 0,
      speed: 0,
      ...(overrides.statExp ?? {}),
    },
    moveIds: overrides.moveIds ?? [null, null, null, null],
    toolId: overrides.toolId ?? null,
    toolPokeapiId: overrides.toolPokeapiId ?? null,
  };
}

export function makeFighter(input: {
  side: "a" | "b";
  nameJa: string;
  speed?: number;
  hp?: number;
  type1?: number;
  type2?: number;
}): BattleFighter {
  const species = makeSpecies({
    id: `${input.side}-${input.nameJa}`,
    name_ja: input.nameJa,
    type1: input.type1 ?? 1,
    type2: input.type2 ?? 0,
  });
  const member = makeMember(species);
  const hp = input.hp ?? 200;
  const speed = input.speed ?? (input.side === "a" ? 200 : 50);
  return buildFighter({
    side: input.side,
    member,
    species,
    stats: {
      hp,
      attack: 100,
      defense: 100,
      special: 100,
      sp_attack: 100,
      sp_defense: 100,
      speed,
    },
    currentHp: hp,
    maxHp: hp,
  });
}

/** Harmless action so the foe does not interfere with assertions. */
export function idleMove(nameJa = "待機"): Move {
  return {
    id: `idle-${nameJa}`,
    pokeapi_id: 0,
    name_ja: nameJa,
    name_en: "Idle",
    type_id: 1,
    damage_class: "status",
    power: null,
    accuracy: null,
    pp: 40,
    priority: 0,
    description: null,
    effect_category: "net-good-stats",
    effect_meta: { ...EMPTY_EFFECT_META },
    effect_code: null,
    introduced_generation: 2,
    available_generations: 510,
  };
}

export function gen2MoveByPokeapiId(pokeapiId: number): Move {
  const found = GEN2_MOVES.find((m) => m.pokeapi_id === pokeapiId);
  if (!found) {
    throw new Error(`Gen2 move pokeapi_id=${pokeapiId} not found`);
  }
  return {
    ...found,
    effect_meta: {
      ...EMPTY_EFFECT_META,
      ...(found.effect_meta ?? {}),
      stat_changes: [...(found.effect_meta?.stat_changes ?? [])],
    },
  };
}

export function allGen2DebutMoves(): Move[] {
  return GEN2_MOVES.map((m) => ({
    ...m,
    effect_meta: {
      ...EMPTY_EFFECT_META,
      ...(m.effect_meta ?? {}),
      stat_changes: [...(m.effect_meta?.stat_changes ?? [])],
    },
  }));
}

export function runTurn(input: {
  fighterA: BattleFighter;
  fighterB: BattleFighter;
  actionA: BattleAction;
  actionB?: BattleAction;
  field?: BattleFieldState;
  rulesGeneration?: number;
}) {
  const field = input.field ?? createBattleField();
  return {
    field,
    result: resolveTurnSteps({
      fighterA: input.fighterA,
      fighterB: input.fighterB,
      actionA: input.actionA,
      actionB: input.actionB ?? { type: "move", move: idleMove() },
      field,
      rulesGeneration: input.rulesGeneration ?? 2,
    }),
  };
}

/**
 * Mirrors BattleScreen: HP/status snapshots are applied around log playback.
 * Status badges update only after each step's logs finish.
 */
export function simulateStatusRevealTiming(steps: TurnStep[]) {
  let display: TurnStep["statusSnapshot"] | null = null;
  return steps.map((step) => {
    const duringLogs = display;
    const afterLogs = step.statusSnapshot ?? display;
    display = afterLogs;
    return {
      logs: step.logs,
      hpSnapshot: step.hpSnapshot ?? null,
      statusDuringLogs: duringLogs,
      statusAfterLogs: afterLogs,
    };
  });
}
