import { Redirect, Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { AppAuthProvider, useAppAuth } from "../src/auth/AppAuthContext";
import { BattleSessionProvider } from "../src/battle/BattleSessionContext";
import { PartySetupProvider } from "../src/party/PartySetupContext";

const stackScreenOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: "#87c6ef",
    flex: 1,
    width: "100%" as const,
  },
};

function isLoginPath(pathname: string): boolean {
  return pathname === "/login" || pathname.endsWith("/login");
}

function isPublicPath(pathname: string): boolean {
  return (
    pathname === "/simulator" ||
    pathname.endsWith("/simulator") ||
    isLoginPath(pathname)
  );
}

function AuthRoot() {
  const { isReady, isAuthenticated, authRequired } = useAppAuth();
  const pathname = usePathname();

  if (!isReady) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator color="#1f6b4a" />
      </View>
    );
  }

  // Password unset → gate off. Password set → must unlock.
  const unlocked = !authRequired || isAuthenticated;

  // Always keep `login` mounted. Protect only the app screens so that when
  // locked, Expo falls back to login instead of showing index under /login.
  // `/simulator` stays public (no auth redirect).
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={stackScreenOptions}>
        <Stack.Protected guard={unlocked}>
          <Stack.Screen name="index" />
          <Stack.Screen name="menu" />
          <Stack.Screen name="party" />
          <Stack.Screen name="select" />
          <Stack.Screen name="set" />
          <Stack.Screen name="battle" />
        </Stack.Protected>
        <Stack.Screen name="simulator" />
        <Stack.Screen name="login" />
      </Stack>
      {authRequired && unlocked && isLoginPath(pathname) ? (
        <Redirect href="/" />
      ) : null}
      {authRequired && !unlocked && !isPublicPath(pathname) ? (
        <Redirect href="/login" />
      ) : null}
    </>
  );
}

export default function RootLayout() {
  return (
    <AppAuthProvider>
      <PartySetupProvider>
        <BattleSessionProvider>
          <AuthRoot />
        </BattleSessionProvider>
      </PartySetupProvider>
    </AppAuthProvider>
  );
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#87c6ef",
  },
});
