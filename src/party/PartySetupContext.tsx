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
} from "./types";

type PartySetupContextValue = {
  state: PartySetupState | null;
  isDirty: boolean;
  initParty: (
    speciesList: PokemonSpecies[],
    levelCapMode: LevelCapMode,
    rulesGeneration: number,
  ) => void;
  updateMember: (speciesId: string, patch: Partial<PartyMemberBuild>) => void;
  clearParty: () => void;
};

const PartySetupContext = createContext<PartySetupContextValue | null>(null);

function serializeMembers(members: PartyMemberBuild[]) {
  return JSON.stringify(members);
}

export function PartySetupProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PartySetupState | null>(null);
  const [baseline, setBaseline] = useState<string | null>(null);

  const initParty = useCallback(
    (
      speciesList: PokemonSpecies[],
      levelCapMode: LevelCapMode,
      rulesGeneration: number,
    ) => {
      const members = speciesList.map((species) =>
        createDefaultBuild(species, levelCapMode),
      );
      setState({
        members,
        levelCapMode,
        rulesGeneration,
      });
      setBaseline(serializeMembers(members));
    },
    [],
  );

  const updateMember = useCallback(
    (speciesId: string, patch: Partial<PartyMemberBuild>) => {
      setState((current) => {
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

  const clearParty = useCallback(() => {
    setState(null);
    setBaseline(null);
  }, []);

  const isDirty =
    state != null &&
    baseline != null &&
    serializeMembers(state.members) !== baseline;

  const value = useMemo(
    () => ({ state, isDirty, initParty, updateMember, clearParty }),
    [state, isDirty, initParty, updateMember, clearParty],
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
