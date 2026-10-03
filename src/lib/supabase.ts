import "expo-sqlite/localStorage/install";
import { createClient } from "@supabase/supabase-js";
import { AppState, Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase の環境変数 EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY が未設定です。",
  );
}

const isNative = Platform.OS !== "web";

/** App tables live in the `moshimo` schema (not `public`). */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: "moshimo" },
  auth: {
    // Native has no browser storage; web falls back to window.localStorage.
    ...(isNative ? { storage: globalThis.localStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

if (isNative) {
  // Native timers keep running in the background, so refresh only while active.
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}
