import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  generationOptions,
  levelCapOptions,
  opponentOptions,
  restrictionOptions,
  visibilityOptions,
} from "../match-setup/options";
import type {
  Generation,
  LevelCapMode,
  MatchSetup,
  OpponentType,
  RestrictionMode,
  VisibilityMode,
} from "../match-setup/types";
import { implementedGeneration } from "../match-setup/types";

const grassland = require("../../assets/title/title-grassland.png");

const defaultSetup: MatchSetup = {
  rulesGeneration: implementedGeneration,
  pokemonGeneration: implementedGeneration,
  moveGeneration: implementedGeneration,
  restrictionMode: "standard",
  opponentType: "local_both",
  visibilityMode: "full",
  levelCapMode: "max_50",
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
      accessibilityState={{ selected, disabled: Boolean(disabled) }}
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
        {disabled ? <Text style={styles.badge}>準備中</Text> : null}
      </View>
      <Text style={[styles.cardDescription, disabled && styles.disabledText]}>
        {description}
      </Text>
    </Pressable>
  );
}

function labelOf<T extends string | number>(
  value: T,
  options: { value: T; title: string }[],
) {
  return options.find((option) => option.value === value)?.title ?? String(value);
}

type GenerationRadioGroupProps = {
  value: Generation;
  onChange: (value: Generation) => void;
};

function GenerationRadioGroup({ value, onChange }: GenerationRadioGroupProps) {
  return (
    <View style={styles.generationRow}>
      {generationOptions.map((option) => {
        const selected = value === option.value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{
              selected,
              disabled: option.disabled,
            }}
            disabled={option.disabled}
            onPress={() => onChange(option.value)}
            style={({ pressed }) => [
              styles.generationChip,
              selected && styles.generationChipSelected,
              option.disabled && styles.generationChipDisabled,
              pressed && !option.disabled && styles.cardPressed,
            ]}
          >
            <View
              style={[styles.radio, selected && styles.radioSelected]}
              accessibilityElementsHidden
            />
            <Text
              style={[
                styles.generationChipText,
                selected && styles.generationChipTextSelected,
                option.disabled && styles.disabledText,
              ]}
            >
              {option.title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function MenuScreen() {
  const router = useRouter();
  const [rulesGeneration, setRulesGeneration] = useState<Generation>(
    defaultSetup.rulesGeneration,
  );
  const [pokemonGeneration, setPokemonGeneration] = useState<Generation>(
    defaultSetup.pokemonGeneration,
  );
  const [moveGeneration, setMoveGeneration] = useState<Generation>(
    defaultSetup.moveGeneration,
  );
  const [restrictionMode, setRestrictionMode] = useState<RestrictionMode>(
    defaultSetup.restrictionMode,
  );
  const [opponentType, setOpponentType] = useState<OpponentType>(
    defaultSetup.opponentType,
  );
  const [visibilityMode, setVisibilityMode] = useState<VisibilityMode>(
    defaultSetup.visibilityMode,
  );
  const [levelCapMode, setLevelCapMode] = useState<LevelCapMode>(
    defaultSetup.levelCapMode,
  );

  const isLocalBoth = opponentType === "local_both";
  const resolvedVisibility = isLocalBoth ? visibilityMode : "opponent_hidden";

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
        rulesGeneration: String(rulesGeneration),
        pokemonGeneration: String(pokemonGeneration),
        moveGeneration: String(moveGeneration),
        restrictionMode,
        opponentType,
        visibilityMode: resolvedVisibility,
        levelCapMode,
      },
    });
  };

  return (
    <ImageBackground source={grassland} style={styles.background} resizeMode="cover">
      <View style={styles.dim} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.panel}>
            <View style={styles.header}>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.replace("/")}
                style={({ pressed }) => pressed && styles.backPressed}
              >
                <Text style={styles.backText}>タイトルへ戻る</Text>
              </Pressable>
              <Text style={styles.kicker}>メニュー</Text>
              <Text style={styles.title}>対戦設定</Text>
              <Text style={styles.lead}>
                対戦ルール・使えるポケモン・使える技を世代ごとに選べます。いまは初代のみ実装しています。
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>対戦ルール</Text>
              <Text style={styles.sectionHint}>ダメージ計算や状態異常などの世代ルール</Text>
              <GenerationRadioGroup
                value={rulesGeneration}
                onChange={setRulesGeneration}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>使えるポケモン</Text>
              <Text style={styles.sectionHint}>その世代までに登場したポケモン</Text>
              <GenerationRadioGroup
                value={pokemonGeneration}
                onChange={setPokemonGeneration}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>使える技</Text>
              <Text style={styles.sectionHint}>その世代の技データ・習得技</Text>
              <GenerationRadioGroup
                value={moveGeneration}
                onChange={setMoveGeneration}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>禁止制限</Text>
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
              <Text style={styles.sectionTitle}>レベル</Text>
              {levelCapOptions.map((option) => (
                <OptionCard
                  key={option.value}
                  title={option.title}
                  description={option.description}
                  selected={levelCapMode === option.value}
                  onPress={() => setLevelCapMode(option.value)}
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

            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>この対戦</Text>
              <Text style={styles.summaryLine}>
                ルール {labelOf(rulesGeneration, generationOptions)} ／ ポケモン{" "}
                {labelOf(pokemonGeneration, generationOptions)} ／ 技{" "}
                {labelOf(moveGeneration, generationOptions)}
              </Text>
              <Text style={styles.summaryLine}>
                {labelOf(restrictionMode, restrictionOptions)} ／{" "}
                {labelOf(levelCapMode, levelCapOptions)}
              </Text>
              <Text style={styles.summaryLine}>
                {labelOf(opponentType, opponentOptions)} ／{" "}
                {labelOf(resolvedVisibility, visibilityOptions)}
              </Text>
            </View>

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
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#87c6ef",
  },
  dim: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(20, 28, 16, 0.28)",
  },
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 48,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
  },
  panel: {
    backgroundColor: "rgba(255, 252, 245, 0.94)",
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
    shadowColor: "#1d1a16",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
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
  sectionHint: {
    fontSize: 13,
    lineHeight: 18,
    color: "#5c564c",
  },
  generationRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  generationChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fffdf8",
    borderColor: "#ddd4c4",
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  generationChipSelected: {
    borderColor: "#1f6b4a",
    backgroundColor: "#eef7f1",
  },
  generationChipDisabled: {
    opacity: 0.45,
  },
  generationChipText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1d1a16",
  },
  generationChipTextSelected: {
    color: "#1f6b4a",
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
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#1d1a16",
  },
  badge: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6b4f2a",
    backgroundColor: "#f0e4c8",
    overflow: "hidden",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
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
  summary: {
    backgroundColor: "#eef7f1",
    borderRadius: 12,
    padding: 14,
    gap: 4,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1f6b4a",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  summaryLine: {
    fontSize: 14,
    lineHeight: 20,
    color: "#1d1a16",
    fontWeight: "600",
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
