/** Gen2 battle weather ids. */
export type WeatherId = "rain" | "sun" | "sand";

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
};

/** PokeAPI move ids that set weather. */
export const WEATHER_MOVE_POKEAPI = {
  RAIN_DANCE: 240,
  SUNNY_DAY: 241,
  SANDSTORM: 201,
} as const;

export function weatherIdFromMovePokeapi(
  pokeapiId: number,
): WeatherId | null {
  if (pokeapiId === WEATHER_MOVE_POKEAPI.RAIN_DANCE) return "rain";
  if (pokeapiId === WEATHER_MOVE_POKEAPI.SUNNY_DAY) return "sun";
  if (pokeapiId === WEATHER_MOVE_POKEAPI.SANDSTORM) return "sand";
  return null;
}

/** Gen2: weather lasts until replaced by another weather move. */
export function setWeather(
  _current: BattleWeather | null,
  id: WeatherId,
  logs: string[],
): BattleWeather {
  const next: BattleWeather = { id, turnsLeft: null };
  if (id === "rain") {
    logs.push("雨が　降り始めた！");
  } else if (id === "sun") {
    logs.push("日差しが　強くなった！");
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

/** Gen2: Solar Beam (76) skips charge turn in sun. */
export function weatherSkipsSolarBeamCharge(
  weatherId: string | null | undefined,
  movePokeapiId: number,
): boolean {
  return weatherId === "sun" && movePokeapiId === 76;
}

/** Gen2: Solar Beam deals half damage in rain. */
export function weatherSolarBeamMultiplier(
  weatherId: string | null | undefined,
  movePokeapiId: number,
): number {
  if (weatherId === "rain" && movePokeapiId === 76) return 0.5;
  return 1;
}
