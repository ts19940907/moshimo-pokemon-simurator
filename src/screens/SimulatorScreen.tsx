import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DamageCalcDialog } from "../battle/DamageCalcDialog";
import { SpeedCompareDialog } from "../battle/SpeedCompareDialog";
import { defaultMatchBackground } from "../match-setup/backgrounds";
import { MatchScreenBackground } from "../match-setup/MatchScreenBackground";
import {
  generationOptions,
  poolGenerationOptions,
} from "../match-setup/options";
import type { GenerationFilterOptions } from "../match-setup/generationFilter";
import type { Generation, LevelCapMode } from "../match-setup/types";
import { implementedGeneration } from "../match-setup/types";
import { getSelectableSpeciesFromList } from "../pokemon/catalog";
import { fetchPokemonSpecies } from "../pokemon/repository";
import type { PokemonSpecies } from "../pokemon/types";

type SimulatorTab = "damage" | "speed";

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

function OptionCard({
  title,
  description,
  selected,
  disabled,
  onPress,
}: {
  title: string;
  description: string;
  selected: boolean;
  disabled?: boolean;
  onPress: () => void;
}) {
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

function GenerationRadioGroup({
  value,
  onChange,
}: {
  value: Generation;
  onChange: (value: Generation) => void;
}) {
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

function GenerationCheckboxGroup({
  values,
  disabled,
  onChange,
}: {
  values: Generation[];
  disabled?: boolean;
  onChange: (values: Generation[]) => void;
}) {
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

export function SimulatorScreen() {
  const [tab, setTab] = useState<SimulatorTab>("damage");
  const [rulesGeneration, setRulesGeneration] = useState<Generation>(
    implementedGeneration,
  );
  const [syncGenerationsWithRules, setSyncGenerationsWithRules] =
    useState(true);
  const [pokemonGenerations, setPokemonGenerations] = useState<Generation[]>([
    implementedGeneration,
  ]);
  const [moveGenerations, setMoveGenerations] = useState<Generation[]>([
    implementedGeneration,
  ]);
  const levelCapMode: LevelCapMode = "max_50";

  const [allSpecies, setAllSpecies] = useState<PokemonSpecies[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generationDialogOpen, setGenerationDialogOpen] = useState(false);

  const displayedPokemonGens = syncGenerationsWithRules
    ? [rulesGeneration]
    : pokemonGenerations;
  const displayedMoveGens = syncGenerationsWithRules
    ? [rulesGeneration]
    : moveGenerations;

  const generationSummary = syncGenerationsWithRules
    ? `ルール ${labelOf(rulesGeneration, generationOptions)}（世代合わせ ON）`
    : `ルール ${labelOf(rulesGeneration, generationOptions)} ／ ポケモン ${labelsOf(displayedPokemonGens, poolGenerationOptions)} ／ 技 ${labelsOf(displayedMoveGens, poolGenerationOptions)}`;

  const pokemonGenerationOptions: GenerationFilterOptions = useMemo(
    () => ({
      syncWithRules: syncGenerationsWithRules,
      rulesGeneration,
      introducedGenerations: displayedPokemonGens,
    }),
    [syncGenerationsWithRules, rulesGeneration, displayedPokemonGens],
  );

  const moveGenerationOptions: GenerationFilterOptions = useMemo(
    () => ({
      syncWithRules: syncGenerationsWithRules,
      rulesGeneration,
      introducedGenerations: displayedMoveGens,
    }),
    [syncGenerationsWithRules, rulesGeneration, displayedMoveGens],
  );

  const speciesPool = useMemo(
    () =>
      getSelectableSpeciesFromList(
        allSpecies,
        "anything",
        pokemonGenerationOptions,
      ),
    [allSpecies, pokemonGenerationOptions],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setErrorMessage(null);
        const rows = await fetchPokemonSpecies();
        if (!cancelled) setAllSpecies(rows);
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "ポケモンデータの取得に失敗しました。",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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

  return (
    <MatchScreenBackground source={defaultMatchBackground}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.layout}>
          <View style={styles.headerPanel}>
            <View style={styles.headerTextCol}>
              <Text style={styles.kicker}>TOOLS</Text>
              <Text style={styles.title}>シミュレーター</Text>
              <Text style={styles.generationSummary}>{generationSummary}</Text>
            </View>
            <Pressable
              onPress={() => setGenerationDialogOpen(true)}
              style={({ pressed }) => [
                styles.generationButton,
                pressed && styles.generationButtonPressed,
              ]}
            >
              <Text style={styles.generationButtonText}>世代を設定</Text>
            </Pressable>
          </View>

          <View style={styles.toolPane}>
            <View style={styles.tabRow}>
              <Pressable
                onPress={() => setTab("damage")}
                style={[styles.tab, tab === "damage" && styles.tabSelected]}
              >
                <Text
                  style={[
                    styles.tabText,
                    tab === "damage" && styles.tabTextSelected,
                  ]}
                >
                  ダメージ計算
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setTab("speed")}
                style={[styles.tab, tab === "speed" && styles.tabSelected]}
              >
                <Text
                  style={[
                    styles.tabText,
                    tab === "speed" && styles.tabTextSelected,
                  ]}
                >
                  素早さ比較
                </Text>
              </Pressable>
            </View>

            <View style={styles.toolBody}>
              {loading ? (
                <View style={styles.centerBox}>
                  <ActivityIndicator color="#1f6b4a" />
                </View>
              ) : errorMessage ? (
                <View style={styles.centerBox}>
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
              ) : tab === "damage" ? (
                <DamageCalcDialog
                  visible
                  presentation="embedded"
                  showSprites={false}
                  showPartyActions={false}
                  speciesPool={speciesPool}
                  levelCapMode={levelCapMode}
                  moveGenerationOptions={moveGenerationOptions}
                  partyBuildsBySpeciesId={{}}
                  partyDexNos={[]}
                  rulesGeneration={rulesGeneration}
                  onClose={() => undefined}
                  onApplyToParty={() => undefined}
                />
              ) : (
                <SpeedCompareDialog
                  visible
                  presentation="embedded"
                  showSprites={false}
                  showPartyActions={false}
                  speciesPool={speciesPool}
                  levelCapMode={levelCapMode}
                  partyBuildsBySpeciesId={{}}
                  partyDexNos={[]}
                  rulesGeneration={rulesGeneration}
                  onClose={() => undefined}
                  onApplyToParty={() => undefined}
                />
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>

      <Modal
        visible={generationDialogOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setGenerationDialogOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>世代を設定</Text>
              <Pressable
                onPress={() => setGenerationDialogOpen(false)}
                style={({ pressed }) => pressed && styles.cardPressed}
              >
                <Text style={styles.modalClose}>閉じる</Text>
              </Pressable>
            </View>
            <ScrollView
              contentContainerStyle={styles.modalBody}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>対戦ルール世代</Text>
                <GenerationRadioGroup
                  value={rulesGeneration}
                  onChange={handleRulesChange}
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>世代合わせ</Text>
                <OptionCard
                  title="ルールに合わせる"
                  description="ポケモン・技の世代をルール世代に同期します。"
                  selected={syncGenerationsWithRules}
                  onPress={() => handleSyncChange(true)}
                />
                <OptionCard
                  title="手動で選ぶ"
                  description="ポケモンと技の世代を別々に選べます。"
                  selected={!syncGenerationsWithRules}
                  onPress={() => handleSyncChange(false)}
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>ポケモン世代</Text>
                <GenerationCheckboxGroup
                  values={displayedPokemonGens}
                  disabled={syncGenerationsWithRules}
                  onChange={setPokemonGenerations}
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>技世代</Text>
                <GenerationCheckboxGroup
                  values={displayedMoveGens}
                  disabled={syncGenerationsWithRules}
                  onChange={setMoveGenerations}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </MatchScreenBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  layout: {
    flex: 1,
    maxWidth: 1100,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 10,
  },
  headerPanel: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "rgba(255, 252, 245, 0.94)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
  },
  headerTextCol: {
    flex: 1,
    gap: 4,
    minWidth: 0,
  },
  kicker: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: "#6b4f2a",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1d1a16",
  },
  generationSummary: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
    color: "#1f6b4a",
  },
  generationButton: {
    borderWidth: 1,
    borderColor: "#1f6b4a",
    backgroundColor: "#1f6b4a",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  generationButtonPressed: { opacity: 0.85 },
  generationButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#fffdf8",
  },
  section: { gap: 8 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
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
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 10,
    backgroundColor: "#fffdf8",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  generationChipSelected: {
    borderColor: "#1f6b4a",
    backgroundColor: "#eef7f1",
  },
  generationChipDisabled: { opacity: 0.45 },
  generationChipText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#5c564c",
  },
  generationChipTextSelected: { color: "#1f6b4a" },
  card: {
    backgroundColor: "#fffdf8",
    borderColor: "#ddd4c4",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  cardSelected: {
    borderColor: "#1f6b4a",
    backgroundColor: "#eef7f1",
  },
  cardDisabled: { opacity: 0.55 },
  cardPressed: { transform: [{ scale: 0.995 }] },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radio: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#8a8172",
  },
  radioSelected: {
    borderColor: "#1f6b4a",
    backgroundColor: "#1f6b4a",
  },
  cardTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#1d1a16",
  },
  badge: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6b4f2a",
    backgroundColor: "#f0e4c8",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    overflow: "hidden",
  },
  cardDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: "#5c564c",
    paddingLeft: 22,
  },
  disabledText: { color: "#8a8172" },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(28, 36, 24, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  modalSheet: {
    maxWidth: 1100,
    width: "100%",
    maxHeight: "88%",
    backgroundColor: "#fffdf8",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee6d8",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1d1a16",
  },
  modalClose: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1f6b4a",
  },
  modalBody: {
    padding: 16,
    gap: 16,
    paddingBottom: 28,
  },
  toolPane: {
    flex: 1,
    minHeight: 0,
    backgroundColor: "rgba(255, 252, 245, 0.94)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
    overflow: "hidden",
  },
  tabRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5dccb",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#f7f3ea",
  },
  tabSelected: {
    backgroundColor: "#fffdf8",
    borderBottomWidth: 3,
    borderBottomColor: "#1f6b4a",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5c564c",
  },
  tabTextSelected: { color: "#1f6b4a" },
  toolBody: {
    flex: 1,
    minHeight: 0,
  },
  centerBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  errorText: {
    color: "#a33",
    fontWeight: "700",
    textAlign: "center",
  },
});
