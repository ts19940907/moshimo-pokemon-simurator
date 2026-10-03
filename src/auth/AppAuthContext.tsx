import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthError, Session } from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";

type LoginResult = { ok: true } | { ok: false; message: string };

type AppAuthContextValue = {
  /** False until the stored Supabase session has been read. */
  isReady: boolean;
  isAuthenticated: boolean;
  email: string | null;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
};

const AppAuthContext = createContext<AppAuthContextValue | null>(null);

function loginErrorMessage(error: AuthError): string {
  switch (error.code) {
    case "invalid_credentials":
      return "メールアドレスまたはパスワードが正しくありません。";
    case "email_not_confirmed":
      return "メールアドレスの確認が完了していません。届いたメールのリンクから確認してください。";
    case "user_banned":
      return "このアカウントは利用停止されています。";
    case "over_request_rate_limit":
    case "over_email_send_rate_limit":
      return "試行回数が多すぎます。しばらくしてから再度お試しください。";
    default:
      return `ログインに失敗しました: ${error.message}`;
  }
}

export function AppAuthProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setIsReady(true);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setIsReady(true);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AppAuthContextValue>(
    () => ({
      isReady,
      isAuthenticated: session != null,
      email: session?.user.email ?? null,
      login: async (email: string, password: string): Promise<LoginResult> => {
        const trimmedEmail = email.trim();
        if (!trimmedEmail || !password) {
          return {
            ok: false,
            message: "メールアドレスとパスワードを入力してください。",
          };
        }
        const { error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });
        if (error) {
          return { ok: false, message: loginErrorMessage(error) };
        }
        return { ok: true };
      },
      logout: async () => {
        await supabase.auth.signOut();
      },
    }),
    [isReady, session],
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
