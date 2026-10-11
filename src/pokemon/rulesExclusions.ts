/**
 * Moves / items that only work with Gen3+ mechanics
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
  380, // Gastro Acid
  388, // Worry Seed
]);

/** Moves whose only effect is on held items (no held items in Gen1). */
const ITEM_ONLY_MOVE_POKEAPI = new Set([
  271, // Trick
  278, // Recycle
  363, // Natural Gift
  373, // Embargo
  374, // Fling
  415, // Switcheroo
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
  if (rulesGeneration <= 1 && ITEM_ONLY_MOVE_POKEAPI.has(pokeapiId)) return false;
  return rulesGeneration >= 3 || !GEN3_MECHANIC_MOVE_POKEAPI.has(pokeapiId);
}

/**
 * Weather rocks only lengthen timed (Gen4+) weather; older weather lasts until
 * replaced, so they do nothing. Hidden from selection under Gen1–3 rules.
 */
const GEN4_MECHANIC_TOOL_POKEAPI = new Set([
  259, // Icy Rock
  260, // Smooth Rock
  261, // Heat Rock
  262, // Damp Rock
]);

export function isToolUsableInRules(
  pokeapiId: number,
  rulesGeneration: number,
): boolean {
  if (rulesGeneration <= 3 && GEN4_MECHANIC_TOOL_POKEAPI.has(pokeapiId)) return false;
  return rulesGeneration >= 3 || !GEN3_MECHANIC_TOOL_POKEAPI.has(pokeapiId);
}
