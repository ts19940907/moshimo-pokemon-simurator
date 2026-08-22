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
import {
  authenticateWithBiometrics,
  getBiometricCapability,
  isBiometricGateEnabled,
  isNativeBiometricGate,
} from "./biometrics";

type LoginResult = { ok: true } | { ok: false; message: string };

type AppAuthContextValue = {
  /** False until session storage has been read. */
  isReady: boolean;
  /** True when gate is off, or user has unlocked this browser tab session. */
  isAuthenticated: boolean;
  /** True when EXPO_PUBLIC_APP_PASSWORD is set. */
  authRequired: boolean;
  /** Native / web require face or fingerprint in addition to the password. */
  biometricRequired: boolean;
  login: (password: string) => Promise<LoginResult>;
  logout: () => void;
};

const AppAuthContext = createContext<AppAuthContextValue | null>(null);

export function AppAuthProvider({ children }: { children: ReactNode }) {
  const authRequired = isAppAuthRequired();
  const biometricRequired = isBiometricGateEnabled();
  const [isReady, setIsReady] = useState(!authRequired);
  const [isAuthenticated, setIsAuthenticated] = useState(!authRequired);

  useEffect(() => {
    if (!authRequired) {
      setIsAuthenticated(true);
      setIsReady(true);
      return;
    }
    // Native never restores — biometrics every launch.
    // Web may restore within the same browser tab after password + WebAuthn.
    const stored = isNativeBiometricGate() ? false : readStoredAuthSession();
    setIsAuthenticated(stored);
    setIsReady(true);
  }, [authRequired]);

  const value = useMemo<AppAuthContextValue>(
    () => ({
      isReady,
      isAuthenticated,
      authRequired,
      biometricRequired,
      login: async (password: string): Promise<LoginResult> => {
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

        if (biometricRequired) {
          const capability = await getBiometricCapability();
          if (!capability.ok) {
            return capability;
          }
          const biometric = await authenticateWithBiometrics(capability.label);
          if (!biometric.ok) {
            return biometric;
          }
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
    [authRequired, biometricRequired, isAuthenticated, isReady],
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
