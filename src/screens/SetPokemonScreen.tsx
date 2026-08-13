import { useEffect, useMemo, useState } from "react";
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

import { usePartySetup } from "../party/PartySetupContext";
import {
  GEN1_STAT_KEYS,
  GEN1_STAT_LABELS,
  genderLabel,
  type PartyMemberBuild,
} from "../party/types";
import { formatDexNo } from "../pokemon/catalog";
import { PokemonSprite } from "../pokemon/PokemonSprite";
import { fetchMovesForPokemon } from "../pokemon/moveRepository";
import { fetchPokemonSpecies } from "../pokemon/repository";
import type { PokemonSpecies } from "../pokemon/types";
import type { LevelCapMode } from "../match-setup/types";
import { SetPokemonDialog } from "./set/SetPokemonDialog";

const grassland = require("../../assets/title/title-grassland.png");

type MatchParams = {
  party?: string;
  rulesGeneration?: string;
  pokemonGeneration?: string;
  moveGeneration?: string;
  restrictionMode?: string;
  opponentType?: string;
  visibilityMode?: string;
  levelCapMode?: string;
};

function summarizeStats(block: PartyMemberBuild["iv"]): string {
  return GEN1_STAT_KEYS.map(
    (key) => `${GEN1_STAT_LABELS[key]}${block[key]}`,
  ).join(" / ");
}

export function SetPokemonScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<MatchParams>();
  const { state, isDirty, initParty, updateMember, clearParty } = usePartySetup();

  const [speciesById, setSpeciesById] = useState<Record<string, PokemonSpecies>>(
    {},
  );
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [leaveConfirmOpen, setLeaveConfirmOpen] = useState(false);
  const [moveNames, setMoveNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const levelCapMode = (params.levelCapMode ?? "max_50") as LevelCapMode;
  const rulesGeneration = Number(params.rulesGeneration) || 1;
  const moveGeneration = Number(params.moveGeneration) || 1;
  const partyDexNos = useMemo(
    () =>
      (params.party ?? "")
        .split(",")
        .map((v) => Number(v))
        .filter((v) => Number.isFinite(v) && v > 0),
    [params.party],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setErrorMessage(null);
        const rows = await fetchPokemonSpecies();
        if (cancelled) return;

        const bit = 1 << (rulesGeneration - 1);
        const usable = rows.filter(
          (row) => (row.generation_introduced & bit) !== 0 && !row.is_mega,
        );
        const picked = partyDexNos
          .map((dex) => usable.find((row) => row.dex_no === dex))
          .filter((row): row is PokemonSpecies => Boolean(row));

        if (picked.length !== 6) {
          setErrorMessage("パーティ6体のデータを取得できませんでした。");
          return;
        }

        const map: Record<string, PokemonSpecies> = {};
        for (const row of picked) map[row.id] = row;
        setSpeciesById(map);

        initParty(picked, levelCapMode, rulesGeneration);
        setFocusedId(picked[0]?.id ?? null);
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "データの取得に失敗しました。",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params.party, rulesGeneration, levelCapMode, initParty]);

  const members = state?.members ?? [];
  const focused = members.find((m) => m.speciesId === focusedId) ?? null;
  const focusedSpecies = focused ? speciesById[focused.speciesId] : null;

  useEffect(() => {
    if (!focused) return;
    let cancelled = false;
    (async () => {
      try {
        const moves = await fetchMovesForPokemon(
          focused.speciesId,
          moveGeneration,
        );
        if (cancelled) return;
        const map: Record<string, string> = {};
        for (const move of moves) map[move.id] = move.name_ja;
        setMoveNames(map);
      } catch {
        if (!cancelled) setMoveNames({});
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [focused?.speciesId, moveGeneration]);

  const leaveToParty = () => {
    clearParty();
    const { party: _party, ...rest } = params;
    router.replace({ pathname: "/party", params: rest });
  };

  const requestBackToParty = () => {
    if (isDirty) {
      setLeaveConfirmOpen(true);
      return;
    }
    leaveToParty();
  };

  return (
    <ImageBackground source={grassland} style={styles.background} resizeMode="cover">
      <View style={styles.dim} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.panel}>
            <Pressable
              onPress={requestBackToParty}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Text style={styles.backText}>編成へ戻る</Text>
            </Pressable>
            <Text style={styles.kicker}>セット</Text>
            <Text style={styles.title}>個体を設定する</Text>
            <Text style={styles.lead}>
              ポケモンを選んでフォーカスし、「設定する」からレベル・性別・個体値・努力値・技を編集します。
            </Text>

            {loading ? (
              <View style={styles.stateBox}>
                <ActivityIndicator color="#1f6b4a" />
                <Text style={styles.stateText}>読み込み中…</Text>
              </View>
            ) : null}
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            {!loading && !errorMessage ? (
              <>
                <View style={styles.partyRow}>
                  {members.map((member) => {
                    const selected = member.speciesId === focusedId;
                    const species = speciesById[member.speciesId];
                    return (
                      <Pressable
                        key={member.speciesId}
                        onPress={() => setFocusedId(member.speciesId)}
                        style={[styles.partyCard, selected && styles.partyCardSelected]}
                      >
                        <PokemonSprite
                          uri={species?.sprite_url}
                          size={56}
                          style={styles.partySprite}
                        />
                        <Text style={styles.partyName} numberOfLines={1}>
                          {member.nameJa}
                        </Text>
                        <Text style={styles.partyMeta}>Lv{member.level}</Text>
                      </Pressable>
                    );
                  })}
                </View>

                {focused && focusedSpecies ? (
                  <View style={styles.detail}>
                    <View style={styles.detailHeader}>
                      <PokemonSprite uri={focusedSpecies.sprite_url} size={96} />
                      <View style={styles.detailText}>
                        <Text style={styles.detailDex}>
                          {formatDexNo(focused.dexNo)}
                        </Text>
                        <Text style={styles.detailName}>{focused.nameJa}</Text>
                        <Text style={styles.detailLine}>
                          Lv{focused.level} ／ {genderLabel(focused.gender)}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.blockTitle}>個体値</Text>
                    <Text style={styles.blockBody}>
                      {summarizeStats(focused.iv)}
                    </Text>
                    <Text style={styles.blockTitle}>努力値（基礎ポイント）</Text>
                    <Text style={styles.blockBody}>
                      {summarizeStats(focused.statExp)}
                    </Text>
                    <Text style={styles.blockTitle}>技</Text>
                    <Text style={styles.blockBody}>
                      {focused.moveIds
                        .map((id, i) =>
                          id ? moveNames[id] ?? "（読込中）" : `技${i + 1}: なし`,
                        )
                        .join(" ／ ")}
                    </Text>

                    <Pressable
                      onPress={() => setDialogOpen(true)}
                      style={({ pressed }) => [
                        styles.primaryButton,
                        pressed && styles.primaryButtonPressed,
                      ]}
                    >
                      <Text style={styles.primaryButtonText}>設定する</Text>
                    </Pressable>
                  </View>
                ) : null}

                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/select",
                      params: { ...params },
                    })
                  }
                  style={({ pressed }) => [
                    styles.secondaryButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.secondaryButtonText}>
                    選出へ進む（準備中画面）
                  </Text>
                </Pressable>
              </>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>

      {focused && focusedSpecies ? (
        <SetPokemonDialog
          visible={dialogOpen}
          member={focused}
          species={focusedSpecies}
          levelCapMode={levelCapMode}
          moveGeneration={moveGeneration}
          onClose={() => setDialogOpen(false)}
          onSave={(build) => updateMember(build.speciesId, build)}
        />
      ) : null}

      <Modal
        visible={leaveConfirmOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setLeaveConfirmOpen(false)}
      >
        <View style={styles.confirmBackdrop}>
          <View style={styles.confirmSheet}>
            <Text style={styles.confirmTitle}>変更の破棄</Text>
            <Text style={styles.confirmBody}>
              セット内容に変更があります。このまま編成画面へ戻ると、変更は破棄されます。よろしいですか？
            </Text>
            <View style={styles.confirmActions}>
              <Pressable
                onPress={() => setLeaveConfirmOpen(false)}
                style={styles.confirmSecondary}
              >
                <Text style={styles.confirmSecondaryText}>キャンセル</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setLeaveConfirmOpen(false);
                  leaveToParty();
                }}
                style={styles.confirmPrimary}
              >
                <Text style={styles.confirmPrimaryText}>OK</Text>
              </Pressable>
            </View>
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
    maxWidth: 720,
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
  stateBox: { alignItems: "center", gap: 8, paddingVertical: 20 },
  stateText: { color: "#5c564c" },
  errorText: { color: "#a33", fontWeight: "700" },
  partyRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  partyCard: {
    width: "31%",
    minWidth: 96,
    flexGrow: 1,
    alignItems: "center",
    gap: 4,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    backgroundColor: "#fffdf8",
  },
  partyCardSelected: {
    borderColor: "#1f6b4a",
    backgroundColor: "#eef7f1",
  },
  partySprite: { backgroundColor: "transparent" },
  partyName: { fontSize: 12, fontWeight: "800", color: "#1d1a16" },
  partyMeta: { fontSize: 11, color: "#5c564c" },
  detail: {
    gap: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    backgroundColor: "#fff",
  },
  detailHeader: { flexDirection: "row", gap: 12, alignItems: "center" },
  detailText: { flex: 1, gap: 2 },
  detailDex: { fontSize: 12, fontWeight: "800", color: "#6b4f2a" },
  detailName: { fontSize: 20, fontWeight: "800", color: "#1d1a16" },
  detailLine: { fontSize: 13, color: "#5c564c" },
  blockTitle: { marginTop: 6, fontSize: 12, fontWeight: "800", color: "#5c564c" },
  blockBody: { fontSize: 13, lineHeight: 18, color: "#1d1a16" },
  primaryButton: {
    marginTop: 8,
    backgroundColor: "#1f6b4a",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonPressed: { backgroundColor: "#18553b" },
  primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "800" },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#1f6b4a",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonText: { color: "#1f6b4a", fontWeight: "800" },
  confirmBackdrop: {
    flex: 1,
    backgroundColor: "rgba(20,28,16,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  confirmSheet: {
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
  confirmTitle: { fontSize: 17, fontWeight: "800", color: "#1d1a16" },
  confirmBody: { fontSize: 14, lineHeight: 20, color: "#5c564c" },
  confirmActions: { flexDirection: "row", gap: 10, marginTop: 4 },
  confirmSecondary: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#1f6b4a",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  confirmSecondaryText: { color: "#1f6b4a", fontWeight: "800" },
  confirmPrimary: {
    flex: 1,
    backgroundColor: "#1f6b4a",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  confirmPrimaryText: { color: "#fff", fontWeight: "800" },
});
