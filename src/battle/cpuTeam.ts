import type { GenerationFilterOptions } from "../match-setup/generationFilter";
import type { LevelCapMode } from "../match-setup/types";
import { BATTLE_PARTY_SIZE, getDisplayBaseStats, PARTY_SIZE } from "../pokemon/catalog";
import type { Move } from "../pokemon/moves";
import { fetchMovesForPokemon } from "../pokemon/moveRepository";
import type { PokemonSpecies } from "../pokemon/types";
import { TYPE_NONE } from "../pokemon/types";
import {
  createDefaultBuild,
  type PartyMemberBuild,
  type PartySetupState,
} from "../party/types";
import { gen1TypeEffectiveness } from "./gen1TypeChart";

function randInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function bst(species: PokemonSpecies): number {
  const s = getDisplayBaseStats(species);
  return s.hp + s.attack + s.defense + s.special + s.speed;
}

function typeMatchupScore(
  attacker: PokemonSpecies,
  defender: PokemonSpecies,
): number {
  const types = [attacker.type1, attacker.type2].filter(
    (t) => t && t !== TYPE_NONE,
  );
  if (types.length === 0) return 1;
  let best = 0;
  for (const typeId of types) {
    const mult = gen1TypeEffectiveness(
      typeId,
      defender.type1,
      defender.type2,
    );
    best = Math.max(best, mult);
  }
  return best;
}

/** Prefer damaging moves; fill remaining with anything. */
function pickMovesForCpu(moves: Move[]): PartyMemberBuild["moveIds"] {
  const damaging = moves
    .filter((m) => (m.power ?? 0) > 0)
    .sort((a, b) => (b.power ?? 0) - (a.power ?? 0));
  const status = moves.filter((m) => (m.power ?? 0) <= 0);
  const picked: string[] = [];
  for (const move of damaging) {
    if (picked.length >= 4) break;
    picked.push(move.id);
  }
  const statusShuffled = shuffle(status);
  for (const move of statusShuffled) {
    if (picked.length >= 4) break;
    if (!picked.includes(move.id)) picked.push(move.id);
  }
  const slots: PartyMemberBuild["moveIds"] = [null, null, null, null];
  for (let i = 0; i < 4; i += 1) {
    slots[i] = picked[i] ?? null;
  }
  return slots;
}

/**
 * Build a CPU box of up to 6: final evolutions preferred, avoid player's dex when possible.
 */
export async function generateCpuParty(input: {
  speciesPool: PokemonSpecies[];
  levelCapMode: LevelCapMode;
  moveGenerationOptions: GenerationFilterOptions;
  playerDexNos: number[];
  rulesGeneration: number;
}): Promise<PartySetupState> {
  const playerDex = new Set(input.playerDexNos);
  const finals = input.speciesPool.filter((s) => s.is_final_evolution);
  const pool = (finals.length >= PARTY_SIZE ? finals : input.speciesPool)
    .slice()
    .sort((a, b) => bst(b) - bst(a));

  const preferred = pool.filter((s) => !playerDex.has(s.dex_no));
  const fallback = pool.filter((s) => playerDex.has(s.dex_no));
  const candidates = [...shuffle(preferred.slice(0, 40)), ...shuffle(fallback)];

  const chosen: PokemonSpecies[] = [];
  const usedDex = new Set<number>();
  for (const species of candidates) {
    if (chosen.length >= PARTY_SIZE) break;
    if (usedDex.has(species.dex_no)) continue;
    usedDex.add(species.dex_no);
    chosen.push(species);
  }

  const members: PartyMemberBuild[] = [];
  await Promise.all(
    chosen.map(async (species) => {
      const build = createDefaultBuild(species, input.levelCapMode);
      try {
        const moves = await fetchMovesForPokemon(
          species.id,
          input.moveGenerationOptions,
        );
        build.moveIds = pickMovesForCpu(moves);
      } catch {
        // leave empty moves — battle UI still requires ≥1; try first damaging from empty
      }
      members.push(build);
    }),
  );

  // Keep stable order by dex for readability
  members.sort((a, b) => a.dexNo - b.dexNo);

  return {
    members,
    levelCapMode: input.levelCapMode,
    rulesGeneration: input.rulesGeneration,
  };
}

function scoreCpuMemberForPlayerTeam(
  cpu: PokemonSpecies,
  playerTeam: PokemonSpecies[],
): number {
  let score = 0;
  const cpuBst = bst(cpu);
  score += cpuBst / 100;
  for (const foe of playerTeam) {
    const offense = typeMatchupScore(cpu, foe);
    const defense = typeMatchupScore(foe, cpu);
    score += offense * 2;
    score -= defense * 1.5;
    // Prefer solid base Speed / bulk vs common threats
    score += getDisplayBaseStats(cpu).speed / 200;
  }
  return score;
}

/**
 * Pick 3 from CPU's 6 after seeing the player's full box (types + base stats).
 * Learnable-move pressure is approximated via type STAB matchups (no async here).
 */
export function pickCpuBattleThree(input: {
  cpuMembers: PartyMemberBuild[];
  playerMembers: PartyMemberBuild[];
  speciesById: Record<string, PokemonSpecies>;
}): string[] {
  const playerSpecies = input.playerMembers
    .map((m) => input.speciesById[m.speciesId])
    .filter((s): s is PokemonSpecies => Boolean(s));

  const ranked = input.cpuMembers
    .map((member) => {
      const species = input.speciesById[member.speciesId];
      const score = species
        ? scoreCpuMemberForPlayerTeam(species, playerSpecies)
        : 0;
      return { member, score };
    })
    .sort((a, b) => b.score - a.score);

  // Soften determinism: shuffle among top half then take weighted top
  const top = ranked.slice(0, Math.max(BATTLE_PARTY_SIZE, Math.ceil(ranked.length * 0.7)));
  const picks: string[] = [];
  const pool = [...top];
  while (picks.length < BATTLE_PARTY_SIZE && pool.length > 0) {
    const weights = pool.map((p) => Math.max(0.1, p.score));
    const sum = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * sum;
    let idx = 0;
    for (let i = 0; i < pool.length; i += 1) {
      r -= weights[i];
      if (r <= 0) {
        idx = i;
        break;
      }
    }
    picks.push(pool[idx].member.speciesId);
    pool.splice(idx, 1);
  }

  // Lead: prefer highest score among picks
  picks.sort((a, b) => {
    const sa = input.speciesById[a];
    const sb = input.speciesById[b];
    if (!sa || !sb) return 0;
    return (
      scoreCpuMemberForPlayerTeam(sb, playerSpecies) -
      scoreCpuMemberForPlayerTeam(sa, playerSpecies)
    );
  });

  return picks.slice(0, BATTLE_PARTY_SIZE);
}

export function hypothesizeThreatMoves(learnset: Move[], max = 4): Move[] {
  return learnset
    .filter((m) => (m.power ?? 0) > 0)
    .sort((a, b) => (b.power ?? 0) - (a.power ?? 0))
    .slice(0, max);
}

export { randInt };
