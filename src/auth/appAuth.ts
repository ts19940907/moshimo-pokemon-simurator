import { Platform } from "react-native";

const STORAGE_KEY = "moshimo.appAuth.v1";

function canUseSessionStorage(): boolean {
  try {
    return (
      typeof window !== "undefined" &&
      typeof window.sessionStorage !== "undefined"
    );
  } catch {
    return false;
  }
}

/** Persist unlock only on web. Native re-auths each launch (password + biometrics). */
function canPersistAuthSession(): boolean {
  return Platform.OS === "web" && canUseSessionStorage();
}

/** Expected shared password from Expo public env (baked at build time on web). */
export function getConfiguredAppPassword(): string {
  return (process.env.EXPO_PUBLIC_APP_PASSWORD ?? "").trim();
}

/** When unset, gate is off so local `expo start` keeps working without .env. */
export function isAppAuthRequired(): boolean {
  return getConfiguredAppPassword().length > 0;
}

export function readStoredAuthSession(): boolean {
  if (!canPersistAuthSession()) return false;
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeStoredAuthSession(authenticated: boolean): void {
  if (!canPersistAuthSession()) return;
  try {
    if (authenticated) {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } else {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // ignore quota / private mode
  }
}

export function verifyAppPassword(input: string): boolean {
  const expected = getConfiguredAppPassword();
  if (!expected) return false;
  return input === expected;
}
