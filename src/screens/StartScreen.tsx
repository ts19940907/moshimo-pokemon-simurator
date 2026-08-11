import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  opponentOptions,
  restrictionOptions,
  visibilityOptions,
} from "../match-setup/options";
import type {
  MatchSetup,
  OpponentType,
  RestrictionMode,
  VisibilityMode,
} from "../match-setup/types";

const defaultSetup: MatchSetup = {
  restrictionMode: "standard",
  opponentType: "local_both",
  visibilityMode: "full",
};

type OptionCardProps = {
  title: string;
  description: string;
  selected: boolean;
  disabled?: boolean;
  onPress: () => void;
};

function OptionCard({
  title,
  description,
  selected,
  disabled,
  onPress,
}: OptionCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        disabled && styles.cardDisabled,
        pressed && !disabled && styles.cardPressed,
      ]}
    >
      <View style={styles.cardHeader}>
        <View
          style={[styles.radio, selected && styles.radioSelected]}
          accessibilityElementsHidden
        />
        <Text style={[styles.cardTitle, disabled && styles.disabledText]}>
          {title}
        </Text>
      </View>
      <Text style={[styles.cardDescription, disabled && styles.disabledText]}>
        {description}
      </Text>
    </Pressable>
  );
}

export function StartScreen() {
  const router = useRouter();
  const [restrictionMode, setRestrictionMode] = useState<RestrictionMode>(
    defaultSetup.restrictionMode,
  );
  const [opponentType, setOpponentType] = useState<OpponentType>(
    defaultSetup.opponentType,
  );
  const [visibilityMode, setVisibilityMode] = useState<VisibilityMode>(
    defaultSetup.visibilityMode,
  );

  const isLocalBoth = opponentType === "local_both";

  const handleOpponentChange = (value: OpponentType) => {
    setOpponentType(value);
    if (value === "ai") {
      setVisibilityMode("opponent_hidden");
    }
  };

  const handleStart = () => {
    router.push({
      pathname: "/party",
      params: {
        restrictionMode,
        opponentType,
        visibilityMode: isLocalBoth ? visibilityMode : "opponent_hidden",
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            style={({ pressed }) => pressed && styles.backPressed}
          >
            <Text style={styles.backText}>タイトルへ戻る</Text>
          </Pressable>
          <Text style={styles.kicker}>初代・シングルバトル</Text>
          <Text style={styles.title}>対戦設定</Text>
          <Text style={styles.lead}>
            6体見せ・3体選出の対戦設定を選んで、編成へ進みます。
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>使用ポケモン</Text>
          {restrictionOptions.map((option) => (
            <OptionCard
              key={option.value}
              title={option.title}
              description={option.description}
              selected={restrictionMode === option.value}
              onPress={() => setRestrictionMode(option.value)}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>対戦相手</Text>
          {opponentOptions.map((option) => (
            <OptionCard
              key={option.value}
              title={option.title}
              description={option.description}
              selected={opponentType === option.value}
              disabled={option.disabled}
              onPress={() => handleOpponentChange(option.value)}
            />
          ))}
        </View>

        {isLocalBoth ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>相手の情報</Text>
            {visibilityOptions.map((option) => (
              <OptionCard
                key={option.value}
                title={option.title}
                description={option.description}
                selected={visibilityMode === option.value}
                onPress={() => setVisibilityMode(option.value)}
              />
            ))}
          </View>
        ) : null}

        <Pressable
          accessibilityRole="button"
          onPress={handleStart}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
        >
          <Text style={styles.primaryButtonText}>編成へ進む</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f1ea",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 48,
    maxWidth: 560,
    width: "100%",
    alignSelf: "center",
    gap: 24,
  },
  header: {
    gap: 8,
  },
  backText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1f6b4a",
  },
  backPressed: {
    opacity: 0.7,
  },
  kicker: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: "#6b4f2a",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1d1a16",
  },
  lead: {
    fontSize: 15,
    lineHeight: 22,
    color: "#5c564c",
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1d1a16",
  },
  card: {
    backgroundColor: "#fffdf8",
    borderColor: "#ddd4c4",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 6,
  },
  cardSelected: {
    borderColor: "#1f6b4a",
    backgroundColor: "#eef7f1",
  },
  cardDisabled: {
    opacity: 0.55,
  },
  cardPressed: {
    transform: [{ scale: 0.995 }],
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#8a8172",
  },
  radioSelected: {
    borderColor: "#1f6b4a",
    backgroundColor: "#1f6b4a",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1d1a16",
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#5c564c",
    paddingLeft: 26,
  },
  disabledText: {
    color: "#8a8172",
  },
  primaryButton: {
    backgroundColor: "#1f6b4a",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryButtonPressed: {
    backgroundColor: "#18553b",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
});
