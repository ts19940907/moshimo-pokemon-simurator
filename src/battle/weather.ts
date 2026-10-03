import type { Move } from "../pokemon/moves";

/** Battle weather ids (hail is Gen3+). */
export type WeatherId = "rain" | "sun" | "sand" | "hail";

export type BattleWeather = {
  id: WeatherId;
  /**
   * Remaining turns. `null` = no limit (Gen2 weather moves).
   * Later gens can use a positive number.
   */
  turnsLeft: number | null;
};

export const WEATHER_LABEL_JA: Record<WeatherId, string> = {
  rain: "あめ",
  sun: "はれ",
  sand: "すなあらし",
  hail: "あられ",
};

/** PokeAPI move ids that set weather. */
export const WEATHER_MOVE_POKEAPI = {
  RAIN_DANCE: 240,
  SUNNY_DAY: 241,
  SANDSTORM: 201,
  HAIL: 258,
} as const;

export function weatherIdFromMovePokeapi(
  pokeapiId: number,
): WeatherId | null {
  if (pokeapiId === WEATHER_MOVE_POKEAPI.RAIN_DANCE) return "rain";
  if (pokeapiId === WEATHER_MOVE_POKEAPI.SUNNY_DAY) return "sun";
  if (pokeapiId === WEATHER_MOVE_POKEAPI.SANDSTORM) return "sand";
  if (pokeapiId === WEATHER_MOVE_POKEAPI.HAIL) return "hail";
  return null;
}

export const WEATHER_BALL_POKEAPI = 311;

const WEATHER_BALL_TYPE: Record<WeatherId, number> = {
  sun: 2, // Fire
  rain: 3, // Water
  sand: 13, // Rock
  hail: 6, // Ice
};

/** Gen1–3: physical / special is decided by type. */
const TYPE_BASED_PHYSICAL_TYPES = new Set([1, 7, 8, 9, 10, 12, 13, 14, 17]);

/**
 * Weather Ball: type follows the weather and power doubles (Gen2+ rules).
 * Gen1 has no weather, so it stays a 50-power Normal move.
 */
export function weatherBallVariant(
  move: Move,
  weatherId: string | null | undefined,
  rulesGeneration: number,
): Move {
  if (move.pokeapi_id !== WEATHER_BALL_POKEAPI || rulesGeneration <= 1) return move;
  const typeId = weatherId ? WEATHER_BALL_TYPE[weatherId as WeatherId] : undefined;
  if (typeId == null) return move;
  return {
    ...move,
    type_id: typeId,
    power: (move.power ?? 50) * 2,
    damage_class:
      rulesGeneration <= 3
        ? TYPE_BASED_PHYSICAL_TYPES.has(typeId)
          ? "physical"
          : "special"
        : "special",
  };
}

/** Gen2: weather lasts until replaced by another weather move. */
export function setWeather(
  current: BattleWeather | null,
  id: WeatherId,
  logs: string[],
): BattleWeather {
  // Same weather already active: no message / no reset.
  if (current?.id === id) {
    return current;
  }
  const next: BattleWeather = { id, turnsLeft: null };
  if (id === "rain") {
    logs.push("雨が　降り始めた！");
  } else if (id === "sun") {
    logs.push("日差しが　強くなった！");
  } else if (id === "hail") {
    logs.push("あられが　降り始めた！");
  } else {
    logs.push("砂あらしが　吹き始めた！");
  }
  return next;
}

/**
 * End-of-turn weather tick.
 * Gen2 indefinite weather (`turnsLeft == null`) is unchanged.
 */
export function tickWeather(
  weather: BattleWeather | null,
  logs: string[],
): BattleWeather | null {
  if (!weather) return null;
  if (weather.turnsLeft == null) return weather;
  const left = weather.turnsLeft - 1;
  if (left <= 0) {
    if (weather.id === "rain") {
      logs.push("雨が　降り止んだ！");
    } else if (weather.id === "sun") {
      logs.push("日差しが　弱まった！");
    } else if (weather.id === "hail") {
      logs.push("あられが　止んだ！");
    } else {
      logs.push("砂あらしが　おさまった！");
    }
    return null;
  }
  return { id: weather.id, turnsLeft: left };
}

/** Gen2: Rock / Ground / Steel are immune to sand residual. */
export function isSandstormImmune(type1: number, type2: number): boolean {
  const types = [type1, type2].filter((t) => t > 0);
  return types.some((t) => t === 13 || t === 9 || t === 17);
}

/** Ice types take no hail residual. */
export function isHailImmune(type1: number, type2: number): boolean {
  return type1 === 6 || type2 === 6;
}

/**
 * Gen2 type damage weather modifier (applied after STAB / type chart).
 * Rain: Water ×1.5, Fire ×0.5. Sun: Fire ×1.5, Water ×0.5.
 * Sand: no offensive multiplier in Gen2.
 */
export function weatherTypeDamageMultiplier(
  weatherId: string | null | undefined,
  moveTypeId: number,
): number {
  if (weatherId === "rain") {
    if (moveTypeId === 3) return 1.5; // Water
    if (moveTypeId === 2) return 0.5; // Fire
  }
  if (weatherId === "sun") {
    if (moveTypeId === 2) return 1.5; // Fire
    if (moveTypeId === 3) return 0.5; // Water
  }
  return 1;
}

/** Gen2: Thunder (87) never misses in rain. */
export function weatherGuaranteesHit(
  weatherId: string | null | undefined,
  movePokeapiId: number,
): boolean {
  return weatherId === "rain" && movePokeapiId === 87;
}

/** Gen2+: Thunder (87) accuracy drops to 50% in sun. */
export function weatherAdjustedAccuracy(
  accuracy: number,
  weatherId: string | null | undefined,
  movePokeapiId: number,
): number {
  if (weatherId === "sun" && movePokeapiId === 87) return 50;
  return accuracy;
}

/** Morning Sun (234) / Synthesis (235) / Moonlight (236). */
const WEATHER_HEAL_MOVE_IDS = new Set([234, 235, 236]);

/**
 * HP restored by weather-dependent healing moves, or null for other moves.
 * Sun: full HP (Gen2) / 2/3 (Gen3). Other weather: 1/4. Clear: 1/2.
 */
export function weatherHealAmount(
  maxHp: number,
  movePokeapiId: number,
  weatherId: string | null | undefined,
  rulesGeneration: number,
): number | null {
  if (!WEATHER_HEAL_MOVE_IDS.has(movePokeapiId)) return null;
  if (weatherId === "sun") {
    return rulesGeneration <= 2 ? maxHp : Math.floor((maxHp * 2) / 3);
  }
  if (weatherId) return Math.max(1, Math.floor(maxHp / 4));
  return Math.max(1, Math.floor(maxHp / 2));
}

/** Gen2: Solar Beam (76) skips charge turn in sun. */
export function weatherSkipsSolarBeamCharge(
  weatherId: string | null | undefined,
  movePokeapiId: number,
): boolean {
  return weatherId === "sun" && movePokeapiId === 76;
}

/** Solar Beam deals half damage in rain (Gen2), also sand / hail (Gen3+). */
export function weatherSolarBeamMultiplier(
  weatherId: string | null | undefined,
  movePokeapiId: number,
  rulesGeneration = 2,
): number {
  if (movePokeapiId !== 76) return 1;
  if (weatherId === "rain") return 0.5;
  if (rulesGeneration >= 3 && (weatherId === "sand" || weatherId === "hail")) {
    return 0.5;
  }
  return 1;
}
