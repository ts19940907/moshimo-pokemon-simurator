import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import type { Move } from "../../pokemon/moves";
import { fetchMovesForPokemon } from "../../pokemon/moveRepository";
import { GENDER, type PokemonSpecies } from "../../pokemon/types";
import { TYPE_COLORS, typeNameJa } from "../../pokemon/catalog";
import {
  GEN1_STAT_KEYS,
  GEN1_STAT_LABELS,
  maxLevelForCap,
  type BattleGender,
  type Gen1StatBlock,
  type PartyMemberBuild,
} from "../../party/types";
import type { LevelCapMode } from "../../match-setup/types";

type Props = {
  visible: boolean;
  member: PartyMemberBuild;
  species: PokemonSpecies;
  levelCapMode: LevelCapMode;
  moveGeneration: number;
  onClose: () => void;
  onSave: (build: PartyMemberBuild) => void;
};

const DAMAGE_CLASS_JA: Record<Move["damage_class"], string> = {
  physical: "物理",
  special: "特殊",
  status: "変化",
};

function clamp(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function parseIntOr(value: string, fallback: number) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

function formatMoveStat(value: number | null, empty = "—") {
  return value == null ? empty : String(value);
}

function MoveDetailCard({
  move,
  selected,
  onPress,
}: {
  move: Move;
  selected: boolean;
  onPress: () => void;
}) {
  const typeJa = typeNameJa(move.type_id);
  return (
    <Pressable
      onPress={onPress}
      style={[styles.moveCard, selected && styles.moveCardSelected]}
    >
      <View style={styles.moveCardTop}>
        <Text style={[styles.moveCardName, selected && styles.moveCardNameSelected]}>
          {move.name_ja}
        </Text>
        <View
          style={[
            styles.typeBadge,
            { backgroundColor: TYPE_COLORS[typeJa] ?? "#888" },
          ]}
        >
          <Text style={styles.typeBadgeText}>{typeJa}</Text>
        </View>
        <View style={styles.classBadge}>
          <Text style={styles.classBadgeText}>
            {DAMAGE_CLASS_JA[move.damage_class]}
          </Text>
        </View>
      </View>
      <Text style={[styles.moveMeta, selected && styles.moveMetaSelected]}>
        優先度 {move.priority} ／ 威力 {formatMoveStat(move.power)} ／ 命中{" "}
        {formatMoveStat(move.accuracy)} ／ PP {formatMoveStat(move.pp)}
      </Text>
      {move.description ? (
        <Text style={[styles.moveDesc, selected && styles.moveMetaSelected]}>
          {move.description}
        </Text>
      ) : null}
    </Pressable>
  );
}

export function SetPokemonDialog({
  visible,
  member,
  species,
  levelCapMode,
  moveGeneration,
  onClose,
  onSave,
}: Props) {
  const [draft, setDraft] = useState<PartyMemberBuild>(member);
  const [moves, setMoves] = useState<Move[]>([]);
  const [loadingMoves, setLoadingMoves] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pickingSlot, setPickingSlot] = useState<number | null>(null);

  const maxLevel = maxLevelForCap(levelCapMode);
  const genderLocked = species.gender !== GENDER.BOTH;

  useEffect(() => {
    if (!visible) return;
    setDraft(member);
    setErrorMessage(null);
    setPickingSlot(null);
  }, [visible, member]);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    (async () => {
      try {
        setLoadingMoves(true);
        setErrorMessage(null);
        const rows = await fetchMovesForPokemon(member.speciesId, moveGeneration);
        if (!cancelled) setMoves(rows);
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(
            error instanceof Error ? error.message : "技の取得に失敗しました。",
          );
        }
      } finally {
        if (!cancelled) setLoadingMoves(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [visible, member.speciesId, moveGeneration]);

  const genderOptions = useMemo(() => {
    if (species.gender === GENDER.NONE) return ["none"] as BattleGender[];
    if (species.gender === GENDER.MALE_ONLY) return ["male"] as BattleGender[];
    if (species.gender === GENDER.FEMALE_ONLY) return ["female"] as BattleGender[];
    return ["male", "female"] as BattleGender[];
  }, [species.gender]);

  const patchIv = (key: keyof Gen1StatBlock, raw: string) => {
    setDraft((current) => ({
      ...current,
      iv: {
        ...current.iv,
        [key]: clamp(parseIntOr(raw, current.iv[key]), 0, 15),
      },
    }));
  };

  const patchStatExp = (key: keyof Gen1StatBlock, raw: string) => {
    setDraft((current) => ({
      ...current,
      statExp: {
        ...current.statExp,
        [key]: clamp(parseIntOr(raw, current.statExp[key]), 0, 65535),
      },
    }));
  };

  const setMoveAt = (index: number, moveId: string | null) => {
    setDraft((current) => {
      const next = [...current.moveIds] as PartyMemberBuild["moveIds"];
      next[index] = moveId;
      return { ...current, moveIds: next };
    });
  };

  const handleSave = () => {
    onSave({
      ...draft,
      level: clamp(draft.level, 1, maxLevel),
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>{member.nameJa} の設定</Text>
          <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
            <Text style={styles.section}>レベル（1〜{maxLevel}）</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={String(draft.level)}
              onChangeText={(text) =>
                setDraft((current) => ({
                  ...current,
                  level: clamp(parseIntOr(text, current.level), 1, maxLevel),
                }))
              }
            />

            <Text style={styles.section}>性別</Text>
            <View style={styles.rowWrap}>
              {genderOptions.map((option) => {
                const selected = draft.gender === option;
                const label =
                  option === "none" ? "なし" : option === "male" ? "オス" : "メス";
                return (
                  <Pressable
                    key={option}
                    disabled={genderLocked && species.gender !== GENDER.BOTH}
                    onPress={() => setDraft((c) => ({ ...c, gender: option }))}
                    style={[styles.chip, selected && styles.chipSelected]}
                  >
                    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.section}>個体値（0〜15）</Text>
            {GEN1_STAT_KEYS.map((key) => (
              <View key={`iv-${key}`} style={styles.statRow}>
                <Text style={styles.statLabel}>{GEN1_STAT_LABELS[key]}</Text>
                <TextInput
                  style={styles.statInput}
                  keyboardType="number-pad"
                  value={String(draft.iv[key])}
                  onChangeText={(text) => patchIv(key, text)}
                />
              </View>
            ))}

            <Text style={styles.section}>努力値 / 基礎ポイント（0〜65535）</Text>
            {GEN1_STAT_KEYS.map((key) => (
              <View key={`ev-${key}`} style={styles.statRow}>
                <Text style={styles.statLabel}>{GEN1_STAT_LABELS[key]}</Text>
                <TextInput
                  style={styles.statInput}
                  keyboardType="number-pad"
                  value={String(draft.statExp[key])}
                  onChangeText={(text) => patchStatExp(key, text)}
                />
              </View>
            ))}

            <Text style={styles.section}>技（最大4つ・詳細を見ながら選択）</Text>
            {loadingMoves ? <ActivityIndicator color="#1f6b4a" /> : null}
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            {draft.moveIds.map((moveId, index) => {
              const selectedMove = moves.find((m) => m.id === moveId) ?? null;
              const picking = pickingSlot === index;
              return (
                <View key={`move-${index}`} style={styles.moveBlock}>
                  <Text style={styles.moveLabel}>技{index + 1}</Text>
                  {selectedMove ? (
                    <MoveDetailCard
                      move={selectedMove}
                      selected
                      onPress={() => setPickingSlot(picking ? null : index)}
                    />
                  ) : (
                    <Text style={styles.moveEmpty}>未選択</Text>
                  )}
                  <View style={styles.rowWrap}>
                    <Pressable
                      onPress={() => setPickingSlot(picking ? null : index)}
                      style={[styles.chip, picking && styles.chipSelected]}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          picking && styles.chipTextSelected,
                        ]}
                      >
                        {picking ? "候補を閉じる" : "候補から選ぶ"}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setMoveAt(index, null);
                        setPickingSlot(null);
                      }}
                      style={styles.chip}
                    >
                      <Text style={styles.chipText}>なしにする</Text>
                    </Pressable>
                  </View>
                  {picking ? (
                    <View style={styles.moveList}>
                      {moves.map((move) => (
                        <MoveDetailCard
                          key={`${index}-${move.id}`}
                          move={move}
                          selected={moveId === move.id}
                          onPress={() => {
                            setMoveAt(index, move.id);
                            setPickingSlot(null);
                          }}
                        />
                      ))}
                    </View>
                  ) : null}
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.footer}>
            <Pressable onPress={onClose} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>キャンセル</Text>
            </Pressable>
            <Pressable onPress={handleSave} style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>決定</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(20,28,16,0.45)",
    justifyContent: "center",
    padding: 16,
  },
  sheet: {
    maxHeight: "92%",
    backgroundColor: "#fffdf8",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1d1a16",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  body: { flexGrow: 0 },
  bodyContent: { paddingHorizontal: 16, paddingBottom: 16, gap: 8 },
  section: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "800",
    color: "#5c564c",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  rowWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: "#cfe3d6",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#f3f6ea",
    marginRight: 6,
  },
  chipSelected: {
    backgroundColor: "#1f6b4a",
    borderColor: "#1f6b4a",
  },
  chipText: { fontSize: 12, fontWeight: "700", color: "#1d1a16" },
  chipTextSelected: { color: "#fff" },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statLabel: { width: 72, fontSize: 12, fontWeight: "700", color: "#5c564c" },
  statInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  moveBlock: { gap: 8, marginBottom: 12 },
  moveLabel: { fontSize: 12, fontWeight: "700", color: "#5c564c" },
  moveEmpty: { fontSize: 12, color: "#8a8276" },
  moveList: { gap: 8 },
  moveCard: {
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    gap: 4,
  },
  moveCardSelected: {
    borderColor: "#1f6b4a",
    backgroundColor: "#eef7f1",
  },
  moveCardTop: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
  },
  moveCardName: { fontSize: 14, fontWeight: "800", color: "#1d1a16" },
  moveCardNameSelected: { color: "#145239" },
  typeBadge: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  typeBadgeText: { color: "#fff", fontSize: 10, fontWeight: "800" },
  classBadge: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "#e8e0d4",
  },
  classBadgeText: { fontSize: 10, fontWeight: "800", color: "#5c564c" },
  moveMeta: { fontSize: 11, color: "#5c564c" },
  moveMetaSelected: { color: "#2f4f3f" },
  moveDesc: { fontSize: 11, lineHeight: 15, color: "#6b6358" },
  error: { color: "#a33", fontSize: 12 },
  footer: {
    flexDirection: "row",
    gap: 10,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee4d6",
  },
  secondaryBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#1f6b4a",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryBtnText: { color: "#1f6b4a", fontWeight: "800" },
  primaryBtn: {
    flex: 1,
    backgroundColor: "#1f6b4a",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "800" },
});
