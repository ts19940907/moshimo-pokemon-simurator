import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import {
  findStatExpForLevel50Delta,
  GEN1_DV_MAX,
  GEN1_STAT_EXP_MAX,
} from "./gen1Stats";
import type { Gen1StatBlock } from "./types";
import type { PokemonSpecies } from "../pokemon/types";

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
}: {
  label: string;
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <View style={styles.statBlock}>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>{label}</Text>
        <TextInput
          style={styles.statInput}
          keyboardType="number-pad"
          value={String(value)}
          onChangeText={(text) =>
            onChange(clamp(parseIntOr(text, value), 0, GEN1_DV_MAX))
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
          disabled={value === GEN1_DV_MAX}
          onPress={() => onChange(GEN1_DV_MAX)}
        />
        <StatAdjustButton
          label="−1"
          disabled={value <= 0}
          onPress={() => onChange(value - 1)}
        />
        <StatAdjustButton
          label="+1"
          disabled={value >= GEN1_DV_MAX}
          onPress={() => onChange(value + 1)}
        />
      </View>
    </View>
  );
}

/** 努力値: 0 / 最大 / Lv50実数値 ±1 */
export function StatExpEditor({
  label,
  value,
  species,
  statKey,
  iv,
  onChange,
}: {
  label: string;
  value: number;
  species: PokemonSpecies;
  statKey: keyof Gen1StatBlock;
  iv: number;
  onChange: (next: number) => void;
}) {
  const downExp = findStatExpForLevel50Delta(species, statKey, iv, value, -1);
  const upExp = findStatExpForLevel50Delta(species, statKey, iv, value, 1);

  return (
    <View style={styles.statBlock}>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>{label}</Text>
        <TextInput
          style={styles.statInput}
          keyboardType="number-pad"
          value={String(value)}
          onChangeText={(text) =>
            onChange(clamp(parseIntOr(text, value), 0, GEN1_STAT_EXP_MAX))
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
          disabled={value === GEN1_STAT_EXP_MAX}
          onPress={() => onChange(GEN1_STAT_EXP_MAX)}
        />
        <StatAdjustButton
          label="Lv50 −1"
          disabled={downExp == null}
          onPress={() => {
            if (downExp != null) onChange(downExp);
          }}
        />
        <StatAdjustButton
          label="Lv50 +1"
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
