import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { PartySide } from "../party/types";

export type BattleLineup = {
  /** Ordered species ids (length 3). Index 0 is lead. */
  a: string[];
  b: string[];
};

type BattleSessionContextValue = {
  lineup: BattleLineup | null;
  activeIndexA: number;
  activeIndexB: number;
  /** Whose command menu is shown (local both / own side). */
  controllingSide: PartySide;
  startBattle: (lineup: BattleLineup, controllingSide?: PartySide) => void;
  setControllingSide: (side: PartySide) => void;
  switchActive: (side: PartySide, index: number) => void;
  clearBattle: () => void;
};

const BattleSessionContext = createContext<BattleSessionContextValue | null>(
  null,
);

export function BattleSessionProvider({ children }: { children: ReactNode }) {
  const [lineup, setLineup] = useState<BattleLineup | null>(null);
  const [activeIndexA, setActiveIndexA] = useState(0);
  const [activeIndexB, setActiveIndexB] = useState(0);
  const [controllingSide, setControllingSide] = useState<PartySide>("a");

  const startBattle = useCallback(
    (next: BattleLineup, side: PartySide = "a") => {
      setLineup(next);
      setActiveIndexA(0);
      setActiveIndexB(0);
      setControllingSide(side);
    },
    [],
  );

  const switchActive = useCallback((side: PartySide, index: number) => {
    if (side === "a") setActiveIndexA(index);
    else setActiveIndexB(index);
  }, []);

  const clearBattle = useCallback(() => {
    setLineup(null);
    setActiveIndexA(0);
    setActiveIndexB(0);
    setControllingSide("a");
  }, []);

  const value = useMemo(
    () => ({
      lineup,
      activeIndexA,
      activeIndexB,
      controllingSide,
      startBattle,
      setControllingSide,
      switchActive,
      clearBattle,
    }),
    [
      lineup,
      activeIndexA,
      activeIndexB,
      controllingSide,
      startBattle,
      switchActive,
      clearBattle,
    ],
  );

  return (
    <BattleSessionContext.Provider value={value}>
      {children}
    </BattleSessionContext.Provider>
  );
}

export function useBattleSession(): BattleSessionContextValue {
  const ctx = useContext(BattleSessionContext);
  if (!ctx) {
    throw new Error("useBattleSession must be used within BattleSessionProvider");
  }
  return ctx;
}
