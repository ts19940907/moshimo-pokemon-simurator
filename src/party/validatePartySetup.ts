import type { PartyMemberBuild } from "./types";

/** Tool ids held by more than one party member. */
export function findDuplicateToolIds(
  members: PartyMemberBuild[],
): string[] {
  const counts = new Map<string, number>();
  for (const member of members) {
    if (!member.toolId) continue;
    counts.set(member.toolId, (counts.get(member.toolId) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([toolId]) => toolId);
}

export function hasDuplicateTools(members: PartyMemberBuild[]): boolean {
  return findDuplicateToolIds(members).length > 0;
}
