import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { TYPE_BY_ID } from "../pokemon/types";
import { gen1TypeEffectiveness } from "../battle/gen1TypeChart";

/** Gen1 types only (Normal…Dragon). */
export const GEN1_TYPE_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
] as const;

const CELL = 28;
const LABEL = 36;
const MATRIX_WIDTH = LABEL + CELL * GEN1_TYPE_IDS.length;
const MATRIX_HEIGHT = LABEL + CELL * GEN1_TYPE_IDS.length;

function cellLabel(mult: number): string {
  if (mult === 0) return "×";
  if (mult === 0.5) return "½";
  if (mult === 2) return "2";
  if (mult === 4) return "4";
  return "";
}

function cellStyle(mult: number) {
  if (mult === 0) return styles.cellImmune;
  if (mult < 1) return styles.cellResist;
  if (mult > 1) return styles.cellStrong;
  return styles.cellNeutral;
}

type Props = {
  visible: boolean;
  onClose: () => void;
};

/**
 * Attack type (row) → Defense type (column) for Gen1 cartridge chart.
 */
export function Gen1TypeChartDialog({ visible, onClose }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>初代タイプ相性表</Text>
            <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={8}>
              <Text style={styles.closeBtnText}>❌</Text>
            </Pressable>
          </View>
          <Text style={styles.lead}>
            縦＝攻撃タイプ　／　横＝防御タイプ{"\n"}
            2＝抜群　½＝今ひとつ　×＝無効　（空白＝等倍）
          </Text>
          <Text style={styles.note}>
            ※むし→どくは抜群（2倍）。くさ／どくはむし技で4倍になります。
          </Text>
          <ScrollView
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            style={styles.matrixScroll}
            contentContainerStyle={styles.matrixScrollInner}
          >
            <View style={{ width: MATRIX_WIDTH, height: MATRIX_HEIGHT }}>
              <View style={styles.row}>
                <View style={[styles.corner, { width: LABEL, height: LABEL }]} />
                {GEN1_TYPE_IDS.map((defId) => (
                  <View key={`h-${defId}`} style={styles.headerCell}>
                    <Text style={styles.headerCellText} numberOfLines={2}>
                      {TYPE_BY_ID[defId]?.nameJa ?? defId}
                    </Text>
                  </View>
                ))}
              </View>
              {GEN1_TYPE_IDS.map((atkId) => (
                <View key={`r-${atkId}`} style={styles.row}>
                  <View style={styles.rowLabel}>
                    <Text style={styles.rowLabelText} numberOfLines={2}>
                      {TYPE_BY_ID[atkId]?.nameJa ?? atkId}
                    </Text>
                  </View>
                  {GEN1_TYPE_IDS.map((defId) => {
                    const mult = gen1TypeEffectiveness(atkId, defId, 0);
                    return (
                      <View
                        key={`c-${atkId}-${defId}`}
                        style={[styles.cell, cellStyle(mult)]}
                      >
                        <Text style={styles.cellText}>{cellLabel(mult)}</Text>
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </ScrollView>
          <Pressable onPress={onClose} style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>閉じる</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  sheet: {
    backgroundColor: "#fffdf8",
    borderRadius: 16,
    padding: 12,
    gap: 8,
    width: MATRIX_WIDTH + 24,
    maxWidth: "100%",
    // Tall enough to show the full matrix without an inner vertical scrollbar
    maxHeight: "98%",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "800",
    color: "#1d1a16",
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#efe8dc",
  },
  closeBtnText: { fontSize: 16 },
  lead: {
    fontSize: 11,
    lineHeight: 15,
    color: "#5c564c",
    fontWeight: "600",
  },
  note: {
    fontSize: 10,
    lineHeight: 14,
    color: "#8a5a2a",
    fontWeight: "700",
  },
  matrixScroll: {
    // Fixed to matrix height so vertical scrollbar does not appear by default
    height: MATRIX_HEIGHT,
    flexGrow: 0,
  },
  matrixScrollInner: {
    flexGrow: 1,
  },
  row: { flexDirection: "row", alignItems: "stretch" },
  corner: { backgroundColor: "#f3efe6" },
  headerCell: {
    width: CELL,
    height: LABEL,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 1,
    backgroundColor: "#efe8dc",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd4c4",
  },
  headerCellText: {
    fontSize: 8,
    fontWeight: "800",
    color: "#5c564c",
    textAlign: "center",
  },
  rowLabel: {
    width: LABEL,
    height: CELL,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 1,
    backgroundColor: "#efe8dc",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd4c4",
  },
  rowLabelText: {
    fontSize: 8,
    fontWeight: "800",
    color: "#5c564c",
    textAlign: "center",
  },
  cell: {
    width: CELL,
    height: CELL,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd4c4",
  },
  cellNeutral: { backgroundColor: "#fffdf8" },
  cellStrong: { backgroundColor: "#f5c4b8" },
  cellResist: { backgroundColor: "#c5d8f0" },
  cellImmune: { backgroundColor: "#cfc7ba" },
  cellText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#1d1a16",
  },
  primaryBtn: {
    backgroundColor: "#1f6b4a",
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
});
