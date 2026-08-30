import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { LevelCapMode } from "../match-setup/types";
import type { PokemonSpecies } from "../pokemon/types";
import {
  createDefaultBuild,
  type PartyMemberBuild,
  type PartySetupState,
  type PartySide,
} from "./types";

type PartySetupContextValue = {
  sideA: PartySetupState | null;
  sideB: PartySetupState | null;
  editing: PartySetupState | null;
  editingSide: PartySide | null;
  isDirty: boolean;
  initEditingParty: (
    side: PartySide,
    speciesList: PokemonSpecies[],
    levelCapMode: LevelCapMode,
    rulesGeneration: number,
  ) => void;
  updateMember: (speciesId: string, patch: Partial<PartyMemberBuild>) => void;
  commitEditingParty: () => void;
  clearEditingParty: () => void;
  clearAllParties: () => void;
  /** Replace a side's committed party (e.g. from party select + set). */
  setSideParty: (side: PartySide, party: PartySetupState) => void;
  getSide: (side: PartySide) => PartySetupState | null;
};

const PartySetupContext = createContext<PartySetupContextValue | null>(null);

function serializeMembers(members: PartyMemberBuild[]) {
  return JSON.stringify(members);
}

function buildMembersFromSpecies(
  speciesList: PokemonSpecies[],
  levelCapMode: LevelCapMode,
  previous: PartySetupState | null,
): PartyMemberBuild[] {
  return speciesList.map((species) => {
    const existing = previous?.members.find(
      (member) =>
        member.speciesId === species.id || member.dexNo === species.dex_no,
    );
    if (existing) {
      return {
        ...existing,
        speciesId: species.id,
        dexNo: species.dex_no,
        nameJa: species.name_ja,
        toolId: existing.toolId ?? null,
        toolPokeapiId: existing.toolPokeapiId ?? null,
      };
    }
    return createDefaultBuild(species, levelCapMode);
  });
}

export function PartySetupProvider({ children }: { children: ReactNode }) {
  const [sideA, setSideA] = useState<PartySetupState | null>(null);
  const [sideB, setSideB] = useState<PartySetupState | null>(null);
  const [editing, setEditing] = useState<PartySetupState | null>(null);
  const [editingSide, setEditingSide] = useState<PartySide | null>(null);
  const [baseline, setBaseline] = useState<string | null>(null);

  const getSide = useCallback(
    (side: PartySide) => (side === "a" ? sideA : sideB),
    [sideA, sideB],
  );

  const initEditingParty = useCallback(
    (
      side: PartySide,
      speciesList: PokemonSpecies[],
      levelCapMode: LevelCapMode,
      rulesGeneration: number,
    ) => {
      const previous = side === "a" ? sideA : sideB;
      const members = buildMembersFromSpecies(
        speciesList,
        levelCapMode,
        previous,
      );
      const next: PartySetupState = {
        members,
        levelCapMode,
        rulesGeneration,
      };
      setEditing(next);
      setEditingSide(side);
      setBaseline(serializeMembers(members));
    },
    [sideA, sideB],
  );

  const updateMember = useCallback(
    (speciesId: string, patch: Partial<PartyMemberBuild>) => {
      setEditing((current) => {
        if (!current) return current;
        return {
          ...current,
          members: current.members.map((member) =>
            member.speciesId === speciesId ? { ...member, ...patch } : member,
          ),
        };
      });
    },
    [],
  );

  const commitEditingParty = useCallback(() => {
    if (!editing || !editingSide) return;
    if (editingSide === "a") {
      setSideA(editing);
    } else {
      setSideB(editing);
    }
    setBaseline(serializeMembers(editing.members));
  }, [editing, editingSide]);

  const clearEditingParty = useCallback(() => {
    setEditing(null);
    setEditingSide(null);
    setBaseline(null);
  }, []);

  const clearAllParties = useCallback(() => {
    setSideA(null);
    setSideB(null);
    setEditing(null);
    setEditingSide(null);
    setBaseline(null);
  }, []);

  const setSideParty = useCallback((side: PartySide, party: PartySetupState) => {
    if (side === "a") setSideA(party);
    else setSideB(party);
  }, []);

  const isDirty =
    editing != null &&
    baseline != null &&
    serializeMembers(editing.members) !== baseline;

  const value = useMemo(
    () => ({
      sideA,
      sideB,
      editing,
      editingSide,
      isDirty,
      initEditingParty,
      updateMember,
      commitEditingParty,
      clearEditingParty,
      clearAllParties,
      setSideParty,
      getSide,
    }),
    [
      sideA,
      sideB,
      editing,
      editingSide,
      isDirty,
      initEditingParty,
      updateMember,
      commitEditingParty,
      clearEditingParty,
      clearAllParties,
      setSideParty,
      getSide,
    ],
  );

  return (
    <PartySetupContext.Provider value={value}>
      {children}
    </PartySetupContext.Provider>
  );
}

export function usePartySetup(): PartySetupContextValue {
  const ctx = useContext(PartySetupContext);
  if (!ctx) {
    throw new Error("usePartySetup must be used within PartySetupProvider");
  }
  return ctx;
}
