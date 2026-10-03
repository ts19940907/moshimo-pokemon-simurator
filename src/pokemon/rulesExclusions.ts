/**
 * Gen3 moves / items that only work with Gen3+ mechanics
 * (abilities, double battles, hail, battle terrain, natures).
 * Hidden from selection under Gen1–2 rules.
 */
const GEN3_MECHANIC_MOVE_POKEAPI = new Set([
  258, // Hail
  266, // Follow Me
  270, // Helping Hand
  272, // Role Play
  285, // Skill Swap
  293, // Camouflage
]);

/** Nature-dependent confusion berries. */
const GEN3_MECHANIC_TOOL_POKEAPI = new Set([
  136, // Figy Berry
  137, // Wiki Berry
  138, // Mago Berry
  139, // Aguav Berry
  140, // Iapapa Berry
]);

export function isMoveUsableInRules(
  pokeapiId: number,
  rulesGeneration: number,
): boolean {
  return rulesGeneration >= 3 || !GEN3_MECHANIC_MOVE_POKEAPI.has(pokeapiId);
}

export function isToolUsableInRules(
  pokeapiId: number,
  rulesGeneration: number,
): boolean {
  return rulesGeneration >= 3 || !GEN3_MECHANIC_TOOL_POKEAPI.has(pokeapiId);
}
