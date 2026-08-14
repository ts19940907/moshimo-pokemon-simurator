import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { BattleSessionProvider } from "../src/battle/BattleSessionContext";
import { PartySetupProvider } from "../src/party/PartySetupContext";

export default function RootLayout() {
  return (
    <PartySetupProvider>
      <BattleSessionProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#87c6ef", flex: 1, width: "100%" },
          }}
        />
      </BattleSessionProvider>
    </PartySetupProvider>
  );
}
