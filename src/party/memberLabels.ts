import {
  ABILITY_NAME_JA,
  resolveAbilityPokeapiId,
} from "../battle/abilityEffects";
import {
  heldToolNameJa,
  resolveHeldToolPokeapiId,
} from "../battle/toolEffects";
import type { Tool } from "../pokemon/tools";
import { getNature, natureEffectLabel } from "./natures";
import type { PartyMemberBuild } from "./types";

/** Ability name for detail screens (Gen3+). */
export function memberAbilityLabel(
  member: PartyMemberBuild,
  rulesGeneration: number,
): string {
  const id = resolveAbilityPokeapiId(member, rulesGeneration);
  if (id == null) return "—";
  return ABILITY_NAME_JA[id] ?? "—";
}

/** Nature name with its stat effect (Gen3+). */
export function memberNatureLabel(member: PartyMemberBuild): string {
  if (!member.natureId) return "—";
  const nature = getNature(member.natureId);
  return `${nature.nameJa}（${natureEffectLabel(nature)}）`;
}

/** Held item name as set in the party (Gen2+). */
export function memberToolLabel(
  member: PartyMemberBuild,
  rulesGeneration: number,
  toolsById: Record<string, Tool> = {},
): string {
  const id = resolveHeldToolPokeapiId(member, toolsById, rulesGeneration);
  if (id == null) return "なし";
  const fromRow = member.toolId ? toolsById[member.toolId]?.name_ja : null;
  return fromRow ?? heldToolNameJa({ pokeapiId: id, consumed: false });
}
