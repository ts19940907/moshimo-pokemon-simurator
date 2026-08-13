import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import type { OpponentType } from "../match-setup/types";
import { usePartySetup } from "../party/PartySetupContext";
import type { PartyMemberBuild, PartySide } from "../party/types";
import { BATTLE_PARTY_SIZE, formatDexNo, PARTY_SIZE } from "../pokemon/catalog";
import { PokemonSprite } from "../pokemon/PokemonSprite";
import { fetchPokemonSpecies } from "../pokemon/repository";
import type { PokemonSpecies } from "../pokemon/types";

const grassland = require("../../assets/title/title-grassland.png");

type MatchParams = {
  side?: string;
  selectSide?: string;
  rulesGeneration?: string;
  pokemonGeneration?: string;
  moveGeneration?: string;
  restrictionMode?: string;
  opponentType?: string;
  visibilityMode?: string;
  levelCapMode?: string;
};

function parseSide(value: string | undefined): PartySide {
  return value === "b" ? "b" : "a";
}

function PartyColumn({
  title,
  members,
  speciesById,
  emptyText,
  selectable,
  pickedIds,
  onToggle,
  tone,
}: {
  title: string;
  members: PartyMemberBuild[];
  speciesById: Record<string, PokemonSpecies>;
  emptyText: string;
  selectable: boolean;
  pickedIds: string[];
  onToggle?: (speciesId: string) => void;
  tone: "own" | "opponent";
}) {
  const full = pickedIds.length >= BATTLE_PARTY_SIZE;
  const slots = Array.from({ length: PARTY_SIZE }, (_, index) => members[index] ?? null);
  const isOwn = tone === "own";

  return (
    <View style={[styles.column, isOwn ? styles.columnOwn : styles.columnOpponent]}>
      <View
        style={[
          styles.columnHeader,
          isOwn ? styles.columnHeaderOwn : styles.columnHeaderOpponent,
        ]}
      >
        <Text style={styles.columnHeaderText}>{title}</Text>
      </View>
      <View
        style={[
          styles.columnBody,
          isOwn ? styles.columnBodyOwn : styles.columnBodyOpponent,
        ]}
      >
        {members.length === 0 ? (
          <Text
            style={[
              styles.columnEmpty,
              isOwn ? styles.columnEmptyOwn : styles.columnEmptyOpponent,
            ]}
          >
            {emptyText}
          </Text>
        ) : (
          slots.map((member, index) => {
            if (!member) {
              return (
                <View
                  key={`empty-${index}`}
                  style={[styles.slot, isOwn ? styles.slotOwn : styles.slotOpponent]}
                >
                  <Text style={styles.slotPlaceholder}>{index + 1}体目</Text>
                </View>
              );
            }

            const species = speciesById[member.speciesId];
            const order = pickedIds.indexOf(member.speciesId);
            const selected = order >= 0;
            const disabled = selectable && full && !selected;

            if (!selectable) {
              return (
                <View
                  key={member.speciesId}
                  style={[styles.slot, styles.slotOpponent]}
                >
                  <PokemonSprite
                    uri={species?.sprite_url}
                    size={40}
                    style={styles.spritePlain}
                  />
                  <View style={styles.slotText}>
                    <Text style={styles.slotDexOpponent}>
                      {formatDexNo(member.dexNo)}
                    </Text>
                    <Text style={styles.slotNameOpponent} numberOfLines={1}>
                      {member.nameJa}
                    </Text>
                    <Text style={styles.slotMetaOpponent}>Lv{member.level}</Text>
                  </View>
                </View>
              );
            }

            return (
              <Pressable
                key={member.speciesId}
                disabled={disabled}
                onPress={() => onToggle?.(member.speciesId)}
                style={[
                  styles.slot,
                  styles.slotOwn,
                  selected && styles.slotSelected,
                  disabled && styles.slotDisabled,
                ]}
              >
                <PokemonSprite
                  uri={species?.sprite_url}
                  size={40}
                  style={styles.spritePlain}
                />
                <View style={styles.slotText}>
                  <Text style={styles.slotDexOwn}>{formatDexNo(member.dexNo)}</Text>
                  <Text
                    style={[styles.slotNameOwn, selected && styles.slotNameSelected]}
                    numberOfLines={1}
                  >
                    {member.nameJa}
                  </Text>
                  <Text
                    style={[styles.slotMetaOwn, selected && styles.slotMetaSelected]}
                  >
                    Lv{member.level}
                    {selected
                      ? ` ／ ${order === 0 ? "初手" : `${order + 1}番手`}`
                      : ""}
                  </Text>
                </View>
              </Pressable>
            );
          })
        )}
      </View>
    </View>
  );
}

export function SelectBattlePokemonScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<MatchParams>();
  const { sideA, sideB, getSide } = usePartySetup();
  const opponentType = (params.opponentType ?? "local_both") as OpponentType;
  const isLocalBoth = opponentType === "local_both";

  const [selectSide, setSelectSide] = useState<PartySide>(
    parseSide(params.selectSide),
  );
  const [pickedIds, setPickedIds] = useState<string[]>([]);
  const [picksA, setPicksA] = useState<string[]>([]);
  const [handoffOpen, setHandoffOpen] = useState(false);
  const [doneOpen, setDoneOpen] = useState(false);
  const [speciesById, setSpeciesById] = useState<Record<string, PokemonSpecies>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeParty = getSide(selectSide);
  const members = activeParty?.members ?? [];
  const opponentSide: PartySide = selectSide === "a" ? "b" : "a";
  const opponentMembers = getSide(opponentSide)?.members ?? [];
  const ownTitle = selectSide === "a" ? "自分の6体" : "サイドBの6体";
  const sideLabel = selectSide === "a" ? "サイドA（自分）" : "サイドB（相手）";

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setErrorMessage(null);
        if (!sideA || (isLocalBoth && !sideB)) {
          setErrorMessage(
            isLocalBoth
              ? "両方のパーティが揃っていません。編成からやり直してください。"
              : "自分のパーティがありません。編成からやり直してください。",
          );
          return;
        }
        const rows = await fetchPokemonSpecies();
        if (cancelled) return;
        const map: Record<string, PokemonSpecies> = {};
        for (const row of rows) map[row.id] = row;
        setSpeciesById(map);
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
  }, [sideA, sideB, isLocalBoth]);

  const togglePick = (speciesId: string) => {
    setPickedIds((current) => {
      if (current.includes(speciesId)) {
        return current.filter((id) => id !== speciesId);
      }
      if (current.length >= BATTLE_PARTY_SIZE) {
        return current;
      }
      return [...current, speciesId];
    });
  };

  const backToSet = () => {
    const targetSide: PartySide = isLocalBoth ? "b" : "a";
    const party = getSide(targetSide);
    const partyParam =
      party?.members.map((member) => member.dexNo).join(",") ?? "";
    router.replace({
      pathname: "/set",
      params: {
        ...params,
        side: targetSide,
        party: partyParam,
      },
    });
  };

  const confirmSelection = () => {
    if (pickedIds.length !== BATTLE_PARTY_SIZE) return;

    if (isLocalBoth && selectSide === "a") {
      setPicksA(pickedIds);
      setHandoffOpen(true);
      return;
    }

    setDoneOpen(true);
  };

  const startSideBSelect = () => {
    setHandoffOpen(false);
    setSelectSide("b");
    setPickedIds([]);
  };

  return (
    <ImageBackground source={grassland} style={styles.background} resizeMode="cover">
      <View style={styles.dim} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.panel}>
            <Pressable
              onPress={backToSet}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Text style={styles.backText}>セットへ戻る</Text>
            </Pressable>
            <Text style={styles.kicker}>選出</Text>
            <Text style={styles.title}>3体を選出する</Text>
            <Text style={styles.lead}>
              {isLocalBoth
                ? `${sideLabel}の選出です。左右で6体を見比べ、左側から3体を選んでください。選んだ順が並びで、先頭が初手です。`
                : "左右で6体を見比べ、左側から3体を選んでください。選んだ順が並びで、先頭が初手です。AIの選出は裏で進行しています。"}
            </Text>

            {loading ? (
              <View style={styles.stateBox}>
                <ActivityIndicator color="#1f6b4a" />
                <Text style={styles.stateText}>読み込み中…</Text>
              </View>
            ) : null}
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            {!loading && !errorMessage ? (
              <>
                <Text style={styles.pickStatus}>
                  選出 {pickedIds.length}/{BATTLE_PARTY_SIZE}
                  {pickedIds.length > 0
                    ? `（${pickedIds
                        .map((id, index) => {
                          const member = members.find((m) => m.speciesId === id);
                          const label = member?.nameJa ?? "?";
                          return index === 0 ? `初手:${label}` : `${index + 1}:${label}`;
                        })
                        .join(" / ")}）`
                    : ""}
                </Text>

                <View style={styles.columns}>
                  <PartyColumn
                    title={ownTitle}
                    members={members}
                    speciesById={speciesById}
                    emptyText="自分のパーティがありません。"
                    selectable
                    pickedIds={pickedIds}
                    onToggle={togglePick}
                    tone="own"
                  />
                  <PartyColumn
                    title="相手の6体"
                    members={opponentMembers}
                    speciesById={speciesById}
                    emptyText={
                      isLocalBoth
                        ? "相手のパーティがありません。"
                        : "AIのパーティは準備中です。"
                    }
                    selectable={false}
                    pickedIds={[]}
                    tone="opponent"
                  />
                </View>

                <Pressable
                  disabled={pickedIds.length !== BATTLE_PARTY_SIZE}
                  onPress={confirmSelection}
                  style={[
                    styles.primaryButton,
                    pickedIds.length !== BATTLE_PARTY_SIZE &&
                      styles.primaryButtonDisabled,
                  ]}
                >
                  <Text style={styles.primaryButtonText}>
                    {pickedIds.length === BATTLE_PARTY_SIZE
                      ? isLocalBoth && selectSide === "a"
                        ? "サイドBの選出へ"
                        : "選出を確定"
                      : `あと${BATTLE_PARTY_SIZE - pickedIds.length}体選んでください`}
                  </Text>
                </Pressable>
              </>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal
        visible={handoffOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setHandoffOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>サイド交代</Text>
            <Text style={styles.modalBody}>
              サイドAの選出を隠しました。端末を渡して、サイドBの3体選出を行ってください。
            </Text>
            <Pressable onPress={startSideBSelect} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>サイドBの選出を開始</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={doneOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDoneOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>選出完了</Text>
            <Text style={styles.modalBody}>
              {isLocalBoth
                ? `サイドA ${picksA.length}体・サイドB ${pickedIds.length}体の選出が完了しました。対戦画面はこれから用意します。`
                : "自分の選出が完了しました。対戦画面はこれから用意します。"}
            </Text>
            <Pressable
              onPress={() => setDoneOpen(false)}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>閉じる</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: "#87c6ef" },
  dim: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(20, 28, 16, 0.28)",
  },
  safeArea: { flex: 1 },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    maxWidth: 860,
    width: "100%",
    alignSelf: "center",
  },
  panel: {
    backgroundColor: "rgba(255, 252, 245, 0.94)",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 22,
    gap: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
  },
  backText: { fontSize: 14, fontWeight: "700", color: "#1f6b4a" },
  pressed: { opacity: 0.7 },
  kicker: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: "#6b4f2a",
  },
  title: { fontSize: 26, fontWeight: "800", color: "#1d1a16" },
  lead: { fontSize: 14, lineHeight: 20, color: "#5c564c" },
  pickStatus: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1f6b4a",
  },
  stateBox: { alignItems: "center", gap: 8, paddingVertical: 20 },
  stateText: { color: "#5c564c" },
  errorText: { color: "#a33", fontWeight: "700" },
  columns: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 12,
  },
  column: {
    flex: 1,
    minWidth: 0,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
  },
  columnOwn: {
    borderColor: "#cfe0d6",
    backgroundColor: "#1f6b4a",
  },
  columnOpponent: {
    borderColor: "#c9d3e3",
    backgroundColor: "#3d5a80",
  },
  columnHeader: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  columnHeaderOwn: {
    backgroundColor: "#1f6b4a",
  },
  columnHeaderOpponent: {
    backgroundColor: "#3d5a80",
  },
  columnHeaderText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
  columnBody: {
    gap: 8,
    padding: 8,
  },
  columnBodyOwn: {
    backgroundColor: "#1f6b4a",
  },
  columnBodyOpponent: {
    backgroundColor: "#3d5a80",
  },
  columnEmpty: {
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: 24,
  },
  columnEmptyOwn: {
    color: "#d7ebe0",
  },
  columnEmptyOpponent: {
    color: "#d5e0ef",
  },
  slot: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minHeight: 64,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  slotOwn: {
    backgroundColor: "#e8a045",
  },
  slotOpponent: {
    backgroundColor: "#7ea0c9",
  },
  slotSelected: {
    backgroundColor: "#fffdf8",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  slotDisabled: {
    opacity: 0.45,
  },
  slotPlaceholder: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
  },
  spritePlain: { backgroundColor: "transparent" },
  slotText: { flex: 1, minWidth: 0, gap: 1 },
  slotDexOwn: { fontSize: 10, fontWeight: "800", color: "#5c3a12" },
  slotDexOpponent: { fontSize: 10, fontWeight: "800", color: "#243447" },
  slotNameOwn: { fontSize: 14, fontWeight: "800", color: "#ffffff" },
  slotNameOpponent: { fontSize: 14, fontWeight: "800", color: "#ffffff" },
  slotNameSelected: { color: "#1d1a16" },
  slotMetaOwn: { fontSize: 11, fontWeight: "700", color: "#fff4e4" },
  slotMetaOpponent: { fontSize: 11, fontWeight: "700", color: "#eaf1f9" },
  slotMetaSelected: { color: "#1f6b4a" },
  primaryButton: {
    backgroundColor: "#1f6b4a",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonDisabled: { backgroundColor: "#9bb5a8" },
  primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "800" },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#1f6b4a",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonText: { color: "#1f6b4a", fontWeight: "800" },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(20,28,16,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalSheet: {
    width: "50%",
    maxWidth: 420,
    minWidth: 280,
    backgroundColor: "#fffdf8",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    padding: 18,
    gap: 12,
  },
  modalTitle: { fontSize: 17, fontWeight: "800", color: "#1d1a16" },
  modalBody: { fontSize: 14, lineHeight: 20, color: "#5c564c" },
});
