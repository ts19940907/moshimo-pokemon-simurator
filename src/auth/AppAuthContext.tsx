import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  getConfiguredAppPassword,
  isAppAuthRequired,
  readStoredAuthSession,
  verifyAppPassword,
  writeStoredAuthSession,
} from "./appAuth";

type AppAuthContextValue = {
  /** False until session storage has been read. */
  isReady: boolean;
  /** True when gate is off, or user has unlocked this browser tab session. */
  isAuthenticated: boolean;
  /** True when EXPO_PUBLIC_APP_PASSWORD is set. */
  authRequired: boolean;
  login: (password: string) => { ok: true } | { ok: false; message: string };
  logout: () => void;
};

const AppAuthContext = createContext<AppAuthContextValue | null>(null);

export function AppAuthProvider({ children }: { children: ReactNode }) {
  const authRequired = isAppAuthRequired();
  const [isReady, setIsReady] = useState(!authRequired);
  const [isAuthenticated, setIsAuthenticated] = useState(!authRequired);

  useEffect(() => {
    if (!authRequired) {
      setIsAuthenticated(true);
      setIsReady(true);
      return;
    }
    const stored = readStoredAuthSession();
    setIsAuthenticated(stored);
    setIsReady(true);
  }, [authRequired]);

  const value = useMemo<AppAuthContextValue>(
    () => ({
      isReady,
      isAuthenticated,
      authRequired,
      login: (password: string) => {
        if (!authRequired) {
          setIsAuthenticated(true);
          return { ok: true };
        }
        if (!getConfiguredAppPassword()) {
          return {
            ok: false,
            message: "アプリパスワードが設定されていません。",
          };
        }
        if (!verifyAppPassword(password)) {
          return { ok: false, message: "パスワードが正しくありません。" };
        }
        writeStoredAuthSession(true);
        setIsAuthenticated(true);
        return { ok: true };
      },
      logout: () => {
        writeStoredAuthSession(false);
        setIsAuthenticated(!authRequired);
      },
    }),
    [authRequired, isAuthenticated, isReady],
  );

  return (
    <AppAuthContext.Provider value={value}>{children}</AppAuthContext.Provider>
  );
}

export function useAppAuth(): AppAuthContextValue {
  const ctx = useContext(AppAuthContext);
  if (!ctx) {
    throw new Error("useAppAuth must be used within AppAuthProvider");
  }
  return ctx;
}
