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
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { usePartySetup } from "../party/PartySetupContext";
import { hasDuplicateTools } from "../party/validatePartySetup";
import {
  GEN1_STAT_KEYS,
  GEN1_STAT_LABELS,
  genderLabel,
  type PartyMemberBuild,
  type PartySide,
} from "../party/types";
import { calcGen1Stats, summarizeGen1Stats } from "../party/gen1Stats";
import { formatDexNo } from "../pokemon/catalog";
import { PokemonSprite } from "../pokemon/PokemonSprite";
import { fetchMovesForPokemon } from "../pokemon/moveRepository";
import { fetchToolsByIds } from "../pokemon/toolRepository";
import { fetchPokemonSpecies, filterSelectableSpecies } from "../pokemon/repository";
import type { PokemonSpecies } from "../pokemon/types";
import type { LevelCapMode, OpponentType } from "../match-setup/types";
import {
  itemGenerationFilterFromParams,
  moveGenerationFilterFromParams,
  parseRulesGeneration,
  pokemonGenerationFilterFromParams,
} from "../match-setup/params";
import { SetPokemonDialog } from "./set/SetPokemonDialog";
import { Gen1TypeChartDialog } from "../battle/Gen1TypeChartDialog";
import { matchBackgroundForRules } from "../match-setup/backgrounds";
import { MatchScreenBackground } from "../match-setup/MatchScreenBackground";

type MatchParams = {
  side?: string;
  party?: string;
  rulesGeneration?: string;
  syncGenerationsWithRules?: string;
  pokemonGenerations?: string;
  moveGenerations?: string;
  itemGenerations?: string;
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

function summarizeStats(block: PartyMemberBuild["iv"]): string {
  return GEN1_STAT_KEYS.map(
    (key) => `${GEN1_STAT_LABELS[key]}${block[key]}`,
  ).join(" / ");
}

export function SetPokemonScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<MatchParams>();
  const {
    editing,
    isDirty,
    initEditingParty,
    updateMember,
    commitEditingParty,
    clearEditingParty,
  } = usePartySetup();

  const side = parseSide(params.side);
  const isOpponentSide = side === "b";
  const opponentType = (params.opponentType ?? "local_both") as OpponentType;

  const [speciesById, setSpeciesById] = useState<Record<string, PokemonSpecies>>(
    {},
  );
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [typeChartOpen, setTypeChartOpen] = useState(false);
  const [leaveConfirmOpen, setLeaveConfirmOpen] = useState(false);
  const [movesRequiredOpen, setMovesRequiredOpen] = useState(false);
  const [duplicateToolsOpen, setDuplicateToolsOpen] = useState(false);
  const [moveNames, setMoveNames] = useState<Record<string, string>>({});
  const [toolName, setToolName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const levelCapMode = (params.levelCapMode ?? "max_50") as LevelCapMode;
  const rulesGeneration = Number(params.rulesGeneration) || 1;
  const matchBackground = useMemo(
    () => matchBackgroundForRules(parseRulesGeneration(params)),
    [params.rulesGeneration],
  );
  const pokemonGenerationOptions = useMemo(
    () => pokemonGenerationFilterFromParams(params),
    [
      params.rulesGeneration,
      params.syncGenerationsWithRules,
      params.pokemonGenerations,
      params.pokemonGeneration,
    ],
  );
  const moveGenerationOptions = useMemo(
    () => moveGenerationFilterFromParams(params),
    [
      params.rulesGeneration,
      params.syncGenerationsWithRules,
      params.moveGenerations,
      params.moveGeneration,
    ],
  );
  const itemGenerationOptions = useMemo(
    () => itemGenerationFilterFromParams(params),
    [
      params.rulesGeneration,
      params.syncGenerationsWithRules,
      params.itemGenerations,
    ],
  );
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

        const usable = filterSelectableSpecies(
          rows,
          "anything",
          pokemonGenerationOptions,
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

        initEditingParty(side, picked, levelCapMode, rulesGeneration);
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
  }, [
    params.party,
    side,
    rulesGeneration,
    levelCapMode,
    initEditingParty,
    pokemonGenerationOptions,
  ]);

  const members = editing?.members ?? [];
  const focused = members.find((m) => m.speciesId === focusedId) ?? null;
  const focusedSpecies = focused ? speciesById[focused.speciesId] : null;

  useEffect(() => {
    if (!focused) return;
    let cancelled = false;
    (async () => {
      try {
        const moves = await fetchMovesForPokemon(
          focused.speciesId,
          moveGenerationOptions,
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
  }, [focused?.speciesId, moveGenerationOptions]);

  useEffect(() => {
    if (!focused?.toolId) {
      setToolName(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const tools = await fetchToolsByIds([focused.toolId!]);
        if (cancelled) return;
        setToolName(tools[0]?.name_ja ?? null);
      } catch {
        if (!cancelled) setToolName(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [focused?.toolId]);

  const excludedToolIds = useMemo(
    () =>
      members
        .filter((member) => member.speciesId !== focused?.speciesId)
        .map((member) => member.toolId)
        .filter((id): id is string => Boolean(id)),
    [members, focused?.speciesId],
  );

  const matchParams = useMemo(() => {
    const { party: _party, ...rest } = params;
    return rest;
  }, [params]);

  const leaveToParty = () => {
    clearEditingParty();
    router.replace({
      pathname: "/party",
      params: {
        ...matchParams,
        side,
      },
    });
  };

  const requestBackToParty = () => {
    if (isDirty) {
      setLeaveConfirmOpen(true);
      return;
    }
    leaveToParty();
  };

  const continueAfterSet = () => {
    const missingMoves = members.filter(
      (member) => !member.moveIds.some((moveId) => Boolean(moveId)),
    );
    if (missingMoves.length > 0) {
      setMovesRequiredOpen(true);
      return;
    }

    if (rulesGeneration >= 2 && hasDuplicateTools(members)) {
      setDuplicateToolsOpen(true);
      return;
    }

    commitEditingParty();
    clearEditingParty();

    if (opponentType === "local_both" && side === "a") {
      router.push({
        pathname: "/party",
        params: {
          ...matchParams,
          side: "b",
        },
      });
      return;
    }

    router.push({
      pathname: "/select",
      params: {
        ...matchParams,
        selectSide: "a",
      },
    });
  };

  const continueLabel =
    opponentType === "local_both" && side === "a"
      ? "相手の編成へ進む"
      : "3体選出へ進む";

  return (
    <MatchScreenBackground source={matchBackground}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.panel}>
            <Pressable
              onPress={requestBackToParty}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Text style={styles.backText}>編成へ戻る</Text>
            </Pressable>
            <Text style={styles.kicker}>
              {isOpponentSide ? "相手のセット" : "セット"}
            </Text>
            <Text style={styles.title}>
              {isOpponentSide ? "相手の個体を設定する" : "個体を設定する"}
            </Text>
            <Text style={styles.lead}>
              ポケモンを選んでフォーカスし、「設定する」からレベル・性別・個体値・努力値・技
              {rulesGeneration >= 2 ? "・持ち物" : ""}
              を編集します。
            </Text>
            <Pressable
              onPress={() => setTypeChartOpen(true)}
              style={({ pressed }) => [
                styles.typeChartButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.typeChartButtonText}>
                {rulesGeneration >= 2
                  ? "第2世代タイプ相性表を見る"
                  : "初代タイプ相性表を見る"}
              </Text>
            </Pressable>

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
                    <Text style={styles.blockTitle}>実数値</Text>
                    <Text style={styles.blockBody}>
                      {summarizeGen1Stats(
                        calcGen1Stats(focusedSpecies, focused),
                      )}
                    </Text>
                    <Text style={styles.blockTitle}>技</Text>
                    <Text style={styles.blockBody}>
                      {focused.moveIds
                        .map((id, i) =>
                          id ? moveNames[id] ?? "（読込中）" : `技${i + 1}: なし`,
                        )
                        .join(" ／ ")}
                    </Text>
                    {rulesGeneration >= 2 ? (
                      <>
                        <Text style={styles.blockTitle}>持ち物</Text>
                        <Text style={styles.blockBody}>
                          {focused.toolId
                            ? (toolName ?? "（読込中）")
                            : "なし"}
                        </Text>
                      </>
                    ) : null}

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
                  onPress={continueAfterSet}
                  style={({ pressed }) => [
                    styles.secondaryButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.secondaryButtonText}>{continueLabel}</Text>
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
          moveGenerationOptions={moveGenerationOptions}
          itemGenerationOptions={itemGenerationOptions}
          rulesGeneration={rulesGeneration}
          excludedToolIds={excludedToolIds}
          onClose={() => setDialogOpen(false)}
          onSave={(build) => updateMember(build.speciesId, build)}
        />
      ) : null}

      <Gen1TypeChartDialog
        visible={typeChartOpen}
        onClose={() => setTypeChartOpen(false)}
        generation={rulesGeneration}
      />

      <Modal
        visible={movesRequiredOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMovesRequiredOpen(false)}
      >
        <View style={styles.confirmBackdrop}>
          <View style={styles.confirmSheet}>
            <Text style={styles.confirmTitle}>技が未設定です</Text>
            <Text style={styles.confirmBody}>
              技を1つも設定していないポケモンがいます。すべてのポケモンに1つ以上の技を設定してから進んでください。
              {"\n\n"}
              未設定:{" "}
              {members
                .filter(
                  (member) => !member.moveIds.some((moveId) => Boolean(moveId)),
                )
                .map((member) => member.nameJa)
                .join("、")}
            </Text>
            <Pressable
              onPress={() => setMovesRequiredOpen(false)}
              style={styles.confirmPrimary}
            >
              <Text style={styles.confirmPrimaryText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={duplicateToolsOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDuplicateToolsOpen(false)}
      >
        <View style={styles.confirmBackdrop}>
          <View style={styles.confirmSheet}>
            <Text style={styles.confirmTitle}>持ち物が重複しています</Text>
            <Text style={styles.confirmBody}>
              同じ持ち物を複数のポケモンに持たせることはできません。重複している持ち物を変更してください。
            </Text>
            <Pressable
              onPress={() => setDuplicateToolsOpen(false)}
              style={styles.confirmPrimary}
            >
              <Text style={styles.confirmPrimaryText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
    </MatchScreenBackground>
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
  typeChartButton: {
    alignSelf: "flex-start",
    backgroundColor: "#efe8dc",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  typeChartButtonText: {
    color: "#1f6b4a",
    fontSize: 13,
    fontWeight: "800",
  },
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
    backgroundColor: "#eef7f1",
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
