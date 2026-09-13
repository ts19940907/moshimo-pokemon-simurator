import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import {
  findStatExpForLevel50Delta,
  GEN1_STAT_EXP_MAX,
} from "./gen1Stats";
import {
  findStatExpForLevel50DeltaGen2,
  type Gen2StatBlock,
} from "./gen2Stats";
import {
  clampEvToMeaningfulAtLevel,
  findEvForLevelDeltaGen3,
  GEN3_EV_PER_STAT_MAX,
  ivMaxForRules,
  maxMeaningfulEvAtLevel,
  usesModernIvEv,
} from "./gen3Stats";
import type { Gen1StatBlock } from "./types";
import type { NatureId } from "./natures";
import type { PokemonSpecies } from "../pokemon/types";
import { usesSplitSpecial } from "../pokemon/baseStatFilters";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function parseIntOr(raw: string, fallback: number) {
  const n = Number.parseInt(raw.replace(/[^\d-]/g, ""), 10);
  return Number.isFinite(n) ? n : fallback;
}

function StatAdjustButton({
  label,
  disabled,
  onPress,
}: {
  label: string;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.statBtn, disabled && styles.statBtnDisabled]}
    >
      <Text style={[styles.statBtnText, disabled && styles.statBtnTextDisabled]}>
        {label}
      </Text>
    </Pressable>
  );
}

/** 個体値: 0 / 最大 / ±1 */
export function IvStatEditor({
  label,
  value,
  onChange,
  rulesGeneration = 1,
}: {
  label: string;
  value: number;
  onChange: (next: number) => void;
  rulesGeneration?: number;
}) {
  const max = ivMaxForRules(rulesGeneration);
  return (
    <View style={styles.statBlock}>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>{label}</Text>
        <TextInput
          style={styles.statInput}
          keyboardType="number-pad"
          value={String(value)}
          onChangeText={(text) =>
            onChange(clamp(parseIntOr(text, value), 0, max))
          }
        />
      </View>
      <View style={styles.statBtnRow}>
        <StatAdjustButton
          label="0"
          disabled={value === 0}
          onPress={() => onChange(0)}
        />
        <StatAdjustButton
          label="最大"
          disabled={value === max}
          onPress={() => onChange(max)}
        />
        <StatAdjustButton
          label="−1"
          disabled={value <= 0}
          onPress={() => onChange(value - 1)}
        />
        <StatAdjustButton
          label="+1"
          disabled={value >= max}
          onPress={() => onChange(value + 1)}
        />
      </View>
    </View>
  );
}

/** 努力値: 0 / 最大 / 実数値 ±1（Gen3は設定レベル基準） */
export function StatExpEditor({
  label,
  value,
  species,
  statKey,
  iv,
  onChange,
  rulesGeneration = 1,
  natureId = null,
  level = 50,
  maxValue,
}: {
  label: string;
  value: number;
  species: PokemonSpecies;
  statKey: keyof Gen1StatBlock | keyof Gen2StatBlock;
  iv: number;
  onChange: (next: number) => void;
  rulesGeneration?: number;
  natureId?: NatureId | null;
  level?: number;
  /** Override max budget (e.g. Gen3 remaining EV budget). */
  maxValue?: number;
}) {
  const modern = usesModernIvEv(rulesGeneration);
  const isGen2 = usesSplitSpecial(rulesGeneration) && !modern;
  const budgetCap = maxValue ?? (modern ? GEN3_EV_PER_STAT_MAX : GEN1_STAT_EXP_MAX);
  const max = modern
    ? maxMeaningfulEvAtLevel(
        species,
        statKey as keyof Gen2StatBlock,
        iv,
        natureId,
        level,
        budgetCap,
      )
    : budgetCap;
  const applyEv = (raw: number) => {
    if (!modern) {
      onChange(clamp(raw, 0, max));
      return;
    }
    onChange(
      clampEvToMeaningfulAtLevel(
        species,
        statKey as keyof Gen2StatBlock,
        iv,
        raw,
        natureId,
        level,
        budgetCap,
      ),
    );
  };
  const downExp = modern
    ? findEvForLevelDeltaGen3(
        species,
        statKey as keyof Gen2StatBlock,
        iv,
        value,
        natureId,
        level,
        budgetCap,
        -1,
      )
    : isGen2
      ? findStatExpForLevel50DeltaGen2(
          species,
          statKey as keyof Gen2StatBlock,
          iv,
          value,
          -1,
        )
      : findStatExpForLevel50Delta(
          species,
          statKey as keyof Gen1StatBlock,
          iv,
          value,
          -1,
        );
  const upExp = modern
    ? findEvForLevelDeltaGen3(
        species,
        statKey as keyof Gen2StatBlock,
        iv,
        value,
        natureId,
        level,
        budgetCap,
        1,
      )
    : isGen2
      ? findStatExpForLevel50DeltaGen2(
          species,
          statKey as keyof Gen2StatBlock,
          iv,
          value,
          1,
        )
      : findStatExpForLevel50Delta(
          species,
          statKey as keyof Gen1StatBlock,
          iv,
          value,
          1,
        );

  return (
    <View style={styles.statBlock}>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>{label}</Text>
        <TextInput
          style={styles.statInput}
          keyboardType="number-pad"
          value={String(value)}
          onChangeText={(text) => applyEv(parseIntOr(text, value))}
        />
      </View>
      <View style={styles.statBtnRow}>
        <StatAdjustButton
          label="0"
          disabled={value === 0}
          onPress={() => applyEv(0)}
        />
        <StatAdjustButton
          label="最大"
          disabled={value === max}
          onPress={() => applyEv(max)}
        />
        <StatAdjustButton
          label={modern ? "実数値 −1" : "Lv50 −1"}
          disabled={downExp == null}
          onPress={() => {
            if (downExp != null) onChange(downExp);
          }}
        />
        <StatAdjustButton
          label={modern ? "実数値 +1" : "Lv50 +1"}
          disabled={upExp == null}
          onPress={() => {
            if (upExp != null) onChange(upExp);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statBlock: {
    gap: 6,
    marginBottom: 4,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statLabel: {
    width: 72,
    fontSize: 13,
    fontWeight: "700",
    color: "#5c564c",
  },
  statInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 15,
    backgroundColor: "#fff",
    color: "#1d1a16",
  },
  statBtnRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    paddingLeft: 80,
  },
  statBtn: {
    borderWidth: 1,
    borderColor: "#cfe3d6",
    borderRadius: 8,
    backgroundColor: "#f3f6ea",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  statBtnDisabled: {
    opacity: 0.35,
  },
  statBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#1f6b4a",
  },
  statBtnTextDisabled: {
    color: "#5c564c",
  },
});
