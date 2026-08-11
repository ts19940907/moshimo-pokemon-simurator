import { Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  opponentOptions,
  restrictionOptions,
  visibilityOptions,
} from "../src/match-setup/options";
import type {
  OpponentType,
  RestrictionMode,
  VisibilityMode,
} from "../src/match-setup/types";

function labelOf<T extends string>(
  value: T,
  options: { value: T; title: string }[],
) {
  return options.find((option) => option.value === value)?.title ?? value;
}

export default function PartyPlaceholderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    restrictionMode?: RestrictionMode;
    opponentType?: OpponentType;
    visibilityMode?: VisibilityMode;
  }>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.kicker}>編成</Text>
        <Text style={styles.title}>編成画面はこれから用意します</Text>
        <Text style={styles.lead}>スタート画面で選んだ内容は次のとおりです。</Text>

        <View style={styles.summary}>
          <Text style={styles.summaryLine}>
            使用ポケモン:{" "}
            {labelOf(params.restrictionMode ?? "standard", restrictionOptions)}
          </Text>
          <Text style={styles.summaryLine}>
            対戦相手:{" "}
            {labelOf(params.opponentType ?? "local_both", opponentOptions)}
          </Text>
          <Text style={styles.summaryLine}>
            相手の情報:{" "}
            {labelOf(
              params.visibilityMode ?? "full",
              visibilityOptions,
            )}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
        >
          <Text style={styles.backButtonText}>スタート画面へ戻る</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f1ea",
  },
  content: {
    padding: 24,
    maxWidth: 560,
    width: "100%",
    alignSelf: "center",
    gap: 12,
  },
  kicker: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6b4f2a",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1d1a16",
  },
  lead: {
    fontSize: 15,
    color: "#5c564c",
  },
  summary: {
    backgroundColor: "#fffdf8",
    borderColor: "#ddd4c4",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  summaryLine: {
    fontSize: 15,
    color: "#1d1a16",
  },
  backButton: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f6b4a",
    paddingVertical: 14,
    alignItems: "center",
  },
  backButtonPressed: {
    backgroundColor: "#eef7f1",
  },
  backButtonText: {
    color: "#1f6b4a",
    fontSize: 16,
    fontWeight: "700",
  },
});
