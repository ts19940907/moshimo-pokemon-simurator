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
  poolGenerationOptions,
  restrictionOptions,
} from "../match-setup/options";
import { matchGenerationRouteParams } from "../match-setup/params";
import type {
  Generation,
  LevelCapMode,
  MatchSetup,
  OpponentType,
  RestrictionMode,
  VisibilityMode,
} from "../match-setup/types";
import { implementedGeneration } from "../match-setup/types";
import { usePartySetup } from "../party/PartySetupContext";

const grassland = require("../../assets/title/title-grassland.png");

const defaultSetup: MatchSetup = {
  rulesGeneration: implementedGeneration,
  syncGenerationsWithRules: true,
  pokemonGenerations: [implementedGeneration],
  moveGenerations: [implementedGeneration],
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

function labelsOf(
  values: Generation[],
  options: { value: Generation; title: string }[],
) {
  return values
    .slice()
    .sort((a, b) => a - b)
    .map((value) => labelOf(value, options))
    .join("・");
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

type GenerationCheckboxGroupProps = {
  values: Generation[];
  disabled?: boolean;
  onChange: (values: Generation[]) => void;
};

function GenerationCheckboxGroup({
  values,
  disabled,
  onChange,
}: GenerationCheckboxGroupProps) {
  const selected = new Set(values);

  const toggle = (generation: Generation) => {
    if (disabled) return;
    if (selected.has(generation)) {
      if (selected.size <= 1) return;
      onChange(values.filter((value) => value !== generation));
      return;
    }
    onChange([...values, generation]);
  };

  return (
    <View style={styles.generationRow}>
      {poolGenerationOptions.map((option) => {
        const isOn = selected.has(option.value);
        const isDisabled = Boolean(disabled) || option.disabled;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: isOn, disabled: isDisabled }}
            disabled={isDisabled}
            onPress={() => toggle(option.value)}
            style={({ pressed }) => [
              styles.generationChip,
              isOn && styles.generationChipSelected,
              isDisabled && styles.generationChipDisabled,
              pressed && !isDisabled && styles.cardPressed,
            ]}
          >
            <View
              style={[styles.checkbox, isOn && styles.checkboxSelected]}
              accessibilityElementsHidden
            />
            <Text
              style={[
                styles.generationChipText,
                isOn && styles.generationChipTextSelected,
                isDisabled && styles.disabledText,
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
  const { clearAllParties } = usePartySetup();
  const [rulesGeneration, setRulesGeneration] = useState<Generation>(
    defaultSetup.rulesGeneration,
  );
  const [syncGenerationsWithRules, setSyncGenerationsWithRules] = useState(
    defaultSetup.syncGenerationsWithRules,
  );
  const [pokemonGenerations, setPokemonGenerations] = useState<Generation[]>(
    defaultSetup.pokemonGenerations,
  );
  const [moveGenerations, setMoveGenerations] = useState<Generation[]>(
    defaultSetup.moveGenerations,
  );
  const [restrictionMode, setRestrictionMode] = useState<RestrictionMode>(
    defaultSetup.restrictionMode,
  );
  const [opponentType, setOpponentType] = useState<OpponentType>(
    defaultSetup.opponentType,
  );
  const [levelCapMode, setLevelCapMode] = useState<LevelCapMode>(
    defaultSetup.levelCapMode,
  );

  const resolvedVisibility: VisibilityMode = "full";

  const displayedPokemonGens = syncGenerationsWithRules
    ? [rulesGeneration]
    : pokemonGenerations;
  const displayedMoveGens = syncGenerationsWithRules
    ? [rulesGeneration]
    : moveGenerations;

  const handleRulesChange = (value: Generation) => {
    setRulesGeneration(value);
    if (syncGenerationsWithRules) {
      setPokemonGenerations([value]);
      setMoveGenerations([value]);
    }
  };

  const handleSyncChange = (enabled: boolean) => {
    setSyncGenerationsWithRules(enabled);
    if (enabled) {
      setPokemonGenerations([rulesGeneration]);
      setMoveGenerations([rulesGeneration]);
    } else {
      setPokemonGenerations(
        pokemonGenerations.length > 0 ? pokemonGenerations : [1],
      );
      setMoveGenerations(moveGenerations.length > 0 ? moveGenerations : [1]);
    }
  };

  const handleOpponentChange = (value: OpponentType) => {
    setOpponentType(value);
  };

  const handleStart = () => {
    clearAllParties();
    router.push({
      pathname: "/party",
      params: {
        side: "a",
        ...matchGenerationRouteParams({
          rulesGeneration,
          syncGenerationsWithRules,
          pokemonGenerations: displayedPokemonGens,
          moveGenerations: displayedMoveGens,
        }),
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
                対戦ルールは世代ルール、ポケモン／技は初登場世代の複数選択か「対戦ルールに合わせる」で選べます。ダメージ計算はいま初代のみ実装しています。
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>対戦ルール</Text>
              <Text style={styles.sectionHint}>ダメージ計算や状態異常などの世代ルール</Text>
              <GenerationRadioGroup
                value={rulesGeneration}
                onChange={handleRulesChange}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>世代の合わせ方</Text>
              <OptionCard
                title="対戦ルールに合わせる"
                description="使えるポケモン・技を対戦ルール世代の環境（可用性ビット）に自動同期します。"
                selected={syncGenerationsWithRules}
                onPress={() => handleSyncChange(true)}
              />
              <OptionCard
                title="手動で選ぶ"
                description="ポケモンと技の初登場世代をそれぞれ複数選択します。行データはルール世代を優先し、無ければ最新行を使います。"
                selected={!syncGenerationsWithRules}
                onPress={() => handleSyncChange(false)}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>使えるポケモン</Text>
              <Text style={styles.sectionHint}>
                {syncGenerationsWithRules
                  ? "対戦ルール世代で使えるポケモン（自動）"
                  : "初登場世代（複数可）。少なくとも1つ必要です。"}
              </Text>
              <GenerationCheckboxGroup
                values={displayedPokemonGens}
                disabled={syncGenerationsWithRules}
                onChange={setPokemonGenerations}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>使える技</Text>
              <Text style={styles.sectionHint}>
                {syncGenerationsWithRules
                  ? "対戦ルール世代で使える技（自動）"
                  : "初登場世代（複数可）。少なくとも1つ必要です。"}
              </Text>
              <GenerationCheckboxGroup
                values={displayedMoveGens}
                disabled={syncGenerationsWithRules}
                onChange={setMoveGenerations}
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

            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>この対戦</Text>
              <Text style={styles.summaryLine}>
                ルール {labelOf(rulesGeneration, generationOptions)} ／{" "}
                {syncGenerationsWithRules ? "世代合わせ ON" : "手動"}
              </Text>
              <Text style={styles.summaryLine}>
                ポケモン {labelsOf(displayedPokemonGens, poolGenerationOptions)}{" "}
                ／ 技 {labelsOf(displayedMoveGens, poolGenerationOptions)}
              </Text>
              <Text style={styles.summaryLine}>
                {labelOf(restrictionMode, restrictionOptions)} ／{" "}
                {labelOf(levelCapMode, levelCapOptions)}
              </Text>
              <Text style={styles.summaryLine}>
                {labelOf(opponentType, opponentOptions)} ／ フル公開
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
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#8a8172",
  },
  checkboxSelected: {
    borderColor: "#1f6b4a",
    backgroundColor: "#1f6b4a",
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
