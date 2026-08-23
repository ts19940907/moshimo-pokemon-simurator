import { useMemo, useRef } from "react";
import {
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { TYPE_BY_ID } from "../pokemon/types";
import { gen1TypeEffectiveness } from "../battle/gen1TypeChart";
import { gen2TypeEffectiveness } from "../battle/gen2TypeChart";

/** Gen1 types only (Normal…Dragon). */
export const GEN1_TYPE_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
] as const;

/** Gen2 types (Normal…Steel). */
export const GEN2_TYPE_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
] as const;

const CELL = 28;
const LABEL = 36;
const FRAME_HEIGHT = 360;

function cellLabel(mult: number): string {
  if (mult === 0) return "×";
  if (mult < 1) return "△";
  if (mult > 1) return "◯";
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
  /** Battle rules generation. Gen2+ uses the GSC chart (Dark/Steel). */
  generation?: number;
};

/**
 * Attack type (row) → Defense type (column).
 * Type name row/column stay fixed while the matrix scrolls both ways.
 */
export function Gen1TypeChartDialog({
  visible,
  onClose,
  generation = 1,
}: Props) {
  const headerHRef = useRef<ScrollView>(null);
  const labelsVRef = useRef<ScrollView>(null);
  const syncing = useRef(false);

  const isGen2Plus = generation >= 2 && generation < 6;
  const typeIds = isGen2Plus ? GEN2_TYPE_IDS : GEN1_TYPE_IDS;
  const effectiveness = isGen2Plus
    ? gen2TypeEffectiveness
    : gen1TypeEffectiveness;
  const title = isGen2Plus ? "第2世代タイプ相性表" : "初代タイプ相性表";
  const note = isGen2Plus
    ? "※あく・はがねが追加。ゴースト↔エスパーは抜群。むし↔どくは今ひとつ。こおり→ほのおは抜群。"
    : "※むし→どくは抜群。くさ／どくはむし技で4倍になります。";

  const bodyWidth = CELL * typeIds.length;
  const bodyHeight = CELL * typeIds.length;

  const syncHeaderX = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (syncing.current) return;
    syncing.current = true;
    headerHRef.current?.scrollTo({
      x: event.nativeEvent.contentOffset.x,
      animated: false,
    });
    requestAnimationFrame(() => {
      syncing.current = false;
    });
  };

  const syncLabelsY = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (syncing.current) return;
    syncing.current = true;
    labelsVRef.current?.scrollTo({
      y: event.nativeEvent.contentOffset.y,
      animated: false,
    });
    requestAnimationFrame(() => {
      syncing.current = false;
    });
  };

  const matrixKey = useMemo(
    () => `chart-gen-${generation}-${typeIds.length}`,
    [generation, typeIds.length],
  );

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
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={8}>
              <Text style={styles.closeBtnText}>×</Text>
            </Pressable>
          </View>
          <Text style={styles.lead}>
            縦＝攻撃タイプ　／　横＝防御タイプ{"\n"}
            ◯＝抜群　△＝今ひとつ　×＝無効　（空白＝等倍）
          </Text>
          <Text style={styles.note}>{note}</Text>

          <View style={styles.matrixFrame} key={matrixKey}>
            <View style={styles.corner} />

            <ScrollView
              ref={headerHRef}
              horizontal
              bounces={false}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              style={styles.headerStrip}
              contentContainerStyle={styles.stripContent}
            >
              {typeIds.map((defId) => (
                <View key={`h-${defId}`} style={styles.headerCell}>
                  <Text style={styles.headerCellText} numberOfLines={2}>
                    {TYPE_BY_ID[defId]?.nameJa ?? defId}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <ScrollView
              ref={labelsVRef}
              bounces={false}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              style={styles.labelStrip}
              contentContainerStyle={styles.stripContent}
            >
              {typeIds.map((atkId) => (
                <View key={`r-${atkId}`} style={styles.rowLabel}>
                  <Text style={styles.rowLabelText} numberOfLines={2}>
                    {TYPE_BY_ID[atkId]?.nameJa ?? atkId}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <ScrollView
              bounces={false}
              nestedScrollEnabled
              style={styles.bodyV}
              onScroll={syncLabelsY}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator
            >
              <ScrollView
                horizontal
                bounces={false}
                nestedScrollEnabled
                onScroll={syncHeaderX}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator
                contentContainerStyle={styles.stripContent}
              >
                <View
                  style={[
                    styles.bodyGrid,
                    { width: bodyWidth, height: bodyHeight },
                  ]}
                >
                  {typeIds.map((atkId) => (
                    <View
                      key={`br-${atkId}`}
                      style={[styles.row, { width: bodyWidth }]}
                    >
                      {typeIds.map((defId) => {
                        const mult = effectiveness(atkId, defId, 0);
                        return (
                          <View
                            key={`c-${atkId}-${defId}`}
                            style={[styles.cell, cellStyle(mult)]}
                          >
                            <Text style={styles.cellText}>
                              {cellLabel(mult)}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  ))}
                </View>
              </ScrollView>
            </ScrollView>
          </View>

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
    width: "100%",
    maxWidth: 520,
    maxHeight: "96%",
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
    backgroundColor: "#c62828",
  },
  closeBtnText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ffffff",
    lineHeight: 22,
  },
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
  matrixFrame: {
    height: FRAME_HEIGHT,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fffdf8",
    position: "relative",
  },
  corner: {
    position: "absolute",
    left: 0,
    top: 0,
    width: LABEL,
    height: LABEL,
    backgroundColor: "#f3efe6",
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd4c4",
    zIndex: 4,
  },
  headerStrip: {
    position: "absolute",
    top: 0,
    left: LABEL,
    right: 0,
    height: LABEL,
    zIndex: 3,
    backgroundColor: "#efe8dc",
  },
  labelStrip: {
    position: "absolute",
    top: LABEL,
    left: 0,
    bottom: 0,
    width: LABEL,
    zIndex: 2,
    backgroundColor: "#efe8dc",
  },
  bodyV: {
    position: "absolute",
    top: LABEL,
    left: LABEL,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  stripContent: {
    flexGrow: 0,
    alignItems: "flex-start",
  },
  bodyGrid: {},
  row: {
    flexDirection: "row",
    height: CELL,
  },
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
    borderColor: "#e5ddd0",
  },
  cellNeutral: { backgroundColor: "#fffdf8" },
  cellStrong: { backgroundColor: "#f8d4c4" },
  cellResist: { backgroundColor: "#dce8f5" },
  cellImmune: { backgroundColor: "#e8e0d4" },
  cellText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#1d1a16",
  },
  primaryBtn: {
    marginTop: 4,
    backgroundColor: "#1f6b4a",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
  },
});
