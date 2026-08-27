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

import type { OpponentType } from "../match-setup/types";
import { useBattleSession } from "../battle/BattleSessionContext";
import { pickCpuBattleThree } from "../battle/cpuTeam";
import { calcGen1Stats } from "../party/gen1Stats";
import { usePartySetup } from "../party/PartySetupContext";
import {
  GEN1_STAT_KEYS,
  GEN1_STAT_LABELS,
  type PartyMemberBuild,
} from "../party/types";
import { BATTLE_PARTY_SIZE, formatDexNo, TYPE_COLORS, getTypes, typeNameJa } from "../pokemon/catalog";
import type { Move } from "../pokemon/moves";
import { fetchMovesByIds } from "../pokemon/moveRepository";
import { PokemonSprite } from "../pokemon/PokemonSprite";
import { fetchPokemonSpecies } from "../pokemon/repository";
import type { PokemonSpecies } from "../pokemon/types";
import { matchBackgroundForRules } from "../match-setup/backgrounds";
import { MatchScreenBackground } from "../match-setup/MatchScreenBackground";
import { parseRulesGeneration } from "../match-setup/params";

type MatchParams = {
  side?: string;
  selectSide?: string;
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

function formatMoveStat(value: number | null): string {
  return value == null ? "—" : String(value);
}

function PartyColumn({
  title,
  members,
  speciesById,
  emptyText,
  selectable,
  canInspect,
  pickedIds,
  onPressMember,
  tone,
  compact = false,
  layoutWeight = 1,
}: {
  title: string;
  members: PartyMemberBuild[];
  speciesById: Record<string, PokemonSpecies>;
  emptyText: string;
  selectable: boolean;
  /** When false (CPU/AI opponent), strength cannot be opened. */
  canInspect: boolean;
  pickedIds: string[];
  onPressMember?: (member: PartyMemberBuild) => void;
  tone: "own" | "opponent";
  /** Icon-only narrow column for the inactive side (local_both). */
  compact?: boolean;
  layoutWeight?: number;
}) {
  const full = pickedIds.length >= BATTLE_PARTY_SIZE;
  const slots = Array.from(
    { length: Math.max(members.length, BATTLE_PARTY_SIZE) },
    (_, index) => members[index] ?? null,
  );
  const isOwn = tone === "own";
  const interactive = selectable || canInspect;

  return (
    <View
      style={[
        styles.column,
        isOwn ? styles.columnOwn : styles.columnOpponent,
        { flex: layoutWeight },
        compact && styles.columnCompact,
      ]}
    >
      <View
        style={[
          styles.columnHeader,
          isOwn ? styles.columnHeaderOwn : styles.columnHeaderOpponent,
        ]}
      >
        <Text style={styles.columnHeaderText} numberOfLines={compact ? 2 : 1}>
          {title}
        </Text>
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
            {compact ? "—" : emptyText}
          </Text>
        ) : (
          slots.map((member, index) => {
            if (!member) {
              return (
                <View
                  key={`empty-${index}`}
                  style={[
                    styles.slot,
                    compact && styles.slotCompact,
                    isOwn ? styles.slotOwn : styles.slotOpponent,
                  ]}
                >
                  <Text
                    style={
                      compact ? styles.slotCompactEmpty : styles.slotPlaceholder
                    }
                  >
                    {compact ? String(index + 1) : `${index + 1}体目`}
                  </Text>
                </View>
              );
            }

            const species = speciesById[member.speciesId];
            const order = pickedIds.indexOf(member.speciesId);
            const selected = order >= 0;
            const dimmed = selectable && full && !selected;

            if (compact) {
              return (
                <View
                  key={member.speciesId}
                  style={[
                    styles.slot,
                    styles.slotCompact,
                    isOwn ? styles.slotOwn : styles.slotOpponent,
                    selected && styles.slotSelected,
                  ]}
                >
                  <PokemonSprite
                    uri={species?.sprite_url}
                    size={40}
                    style={styles.spritePlain}
                  />
                  {selected ? (
                    <Text style={styles.slotCompactOrder}>
                      {order === 0 ? "初" : String(order + 1)}
                    </Text>
                  ) : null}
                </View>
              );
            }

            const body = (
              <>
                <PokemonSprite
                  uri={species?.sprite_url}
                  size={40}
                  style={styles.spritePlain}
                />
                <View style={styles.slotText}>
                  <Text style={isOwn ? styles.slotDexOwn : styles.slotDexOpponent}>
                    {formatDexNo(member.dexNo)}
                  </Text>
                  <Text
                    style={[
                      isOwn ? styles.slotNameOwn : styles.slotNameOpponent,
                      selected && styles.slotNameSelected,
                    ]}
                    numberOfLines={1}
                  >
                    {member.nameJa}
                  </Text>
                  <Text
                    style={[
                      isOwn ? styles.slotMetaOwn : styles.slotMetaOpponent,
                      selected && styles.slotMetaSelected,
                    ]}
                  >
                    Lv{member.level}
                    {selected
                      ? ` ／ ${order === 0 ? "初手" : `${order + 1}番手`}`
                      : ""}
                  </Text>
                </View>
              </>
            );

            if (!interactive) {
              return (
                <View
                  key={member.speciesId}
                  style={[styles.slot, styles.slotOpponent]}
                >
                  {body}
                </View>
              );
            }

            return (
              <Pressable
                key={member.speciesId}
                onPress={() => onPressMember?.(member)}
                style={[
                  styles.slot,
                  isOwn || selectable ? styles.slotOwn : styles.slotOpponent,
                  selected && styles.slotSelected,
                  dimmed && styles.slotDisabled,
                ]}
              >
                {body}
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
  const { sideA, sideB } = usePartySetup();
  const { startBattle } = useBattleSession();
  const opponentType = (params.opponentType ?? "local_both") as OpponentType;
  const isLocalBoth = opponentType === "local_both";
  const isCpu = opponentType === "cpu";
  const needsSideB = isLocalBoth || isCpu;
  /** Opponent strength is only visible when both sides are human-controlled. */
  const canInspectOpponent = isLocalBoth;
  const rulesGeneration = Number(params.rulesGeneration) || 1;
  const matchBackground = useMemo(
    () => matchBackgroundForRules(parseRulesGeneration(params)),
    [params.rulesGeneration],
  );

  const [picksA, setPicksA] = useState<string[]>([]);
  const [picksB, setPicksB] = useState<string[]>([]);
  /** Which side is being drafted (local_both only). */
  const [editingSide, setEditingSide] = useState<"a" | "b">("a");
  const [speciesById, setSpeciesById] = useState<Record<string, PokemonSpecies>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inspectMember, setInspectMember] = useState<PartyMemberBuild | null>(
    null,
  );
  const [actionTarget, setActionTarget] = useState<{
    side: "a" | "b";
    member: PartyMemberBuild;
    selectable: boolean;
    canInspect: boolean;
  } | null>(null);
  const [inspectMoves, setInspectMoves] = useState<(Move | null)[]>([]);
  const [inspectMovesLoading, setInspectMovesLoading] = useState(false);
  const [detailMove, setDetailMove] = useState<Move | null>(null);

  const membersA = sideA?.members ?? [];
  const membersB = sideB?.members ?? [];
  /** Expanded (name-visible) side: tabs only switch this for local_both. */
  const focusSide: "a" | "b" = isLocalBoth ? editingSide : "a";

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setErrorMessage(null);
        if (!sideA || (needsSideB && !sideB)) {
          setErrorMessage(
            isLocalBoth
              ? "両方のパーティが揃っていません。編成からやり直してください。"
              : isCpu
                ? "CPUパーティがありません。編成からやり直してください。"
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
  }, [sideA, sideB, needsSideB, isLocalBoth, isCpu]);

  useEffect(() => {
    let cancelled = false;
    if (!inspectMember) {
      setInspectMoves([]);
      setInspectMovesLoading(false);
      return;
    }
    const moveIds = inspectMember.moveIds;
    (async () => {
      try {
        setInspectMovesLoading(true);
        const ids = moveIds.filter((id): id is string => Boolean(id));
        const moves = ids.length > 0 ? await fetchMovesByIds(ids) : [];
        if (cancelled) return;
        const byId = new Map(moves.map((m) => [m.id, m]));
        setInspectMoves(moveIds.map((id) => (id ? byId.get(id) ?? null : null)));
      } catch {
        if (!cancelled) setInspectMoves([null, null, null, null]);
      } finally {
        if (!cancelled) setInspectMovesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [inspectMember]);

  const togglePick = (side: "a" | "b", speciesId: string) => {
    const setter = side === "a" ? setPicksA : setPicksB;
    setter((current) => {
      if (current.includes(speciesId)) {
        return current.filter((id) => id !== speciesId);
      }
      if (current.length >= BATTLE_PARTY_SIZE) return current;
      return [...current, speciesId];
    });
  };

  const backToParty = () => {
    const targetSide = isLocalBoth ? "b" : "a";
    router.replace({
      pathname: "/party",
      params: {
        ...params,
        side: targetSide,
      },
    });
  };

  const bothReady =
    picksA.length === BATTLE_PARTY_SIZE &&
    (!isLocalBoth || picksB.length === BATTLE_PARTY_SIZE);

  const confirmSelection = () => {
    if (!bothReady) return;
    const cpuPicks =
      isCpu && sideB && sideA
        ? pickCpuBattleThree({
            cpuMembers: sideB.members,
            playerMembers: sideA.members,
            speciesById,
            rulesGeneration,
          })
        : [];
    startBattle(
      {
        a: picksA,
        b: isLocalBoth ? picksB : isCpu ? cpuPicks : [],
      },
      "a",
    );
    router.replace({
      pathname: "/battle",
      params: { ...params },
    });
  };

  const pickSummary = (ids: string[], members: PartyMemberBuild[]) => {
    if (ids.length === 0) return "";
    return `（${ids
      .map((id, index) => {
        const member = members.find((m) => m.speciesId === id);
        const label = member?.nameJa ?? "?";
        return index === 0 ? `初手:${label}` : `${index + 1}:${label}`;
      })
      .join(" / ")}）`;
  };

  const inspectSpecies = inspectMember
    ? speciesById[inspectMember.speciesId]
    : null;
  const inspectStats =
    inspectMember && inspectSpecies
      ? calcGen1Stats(inspectSpecies, inspectMember)
      : null;

  const actionPicks =
    actionTarget?.side === "b" ? picksB : picksA;
  const actionSelected =
    actionTarget != null &&
    actionPicks.includes(actionTarget.member.speciesId);
  const actionPickDisabled =
    actionTarget?.selectable === true &&
    !actionSelected &&
    actionPicks.length >= BATTLE_PARTY_SIZE;

  const closeInspect = () => {
    setDetailMove(null);
    setInspectMember(null);
  };

  const closeAction = () => {
    setActionTarget(null);
  };

  const confirmActionPick = () => {
    if (!actionTarget?.selectable || actionPickDisabled) return;
    togglePick(actionTarget.side, actionTarget.member.speciesId);
    setActionTarget(null);
  };

  return (
    <MatchScreenBackground source={matchBackground}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.panel}>
            <Pressable
              onPress={backToParty}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Text style={styles.backText}>編成へ戻る</Text>
            </Pressable>
            <Text style={styles.kicker}>選出</Text>
            <Text style={styles.title}>3体を選出する</Text>
            <Text style={styles.lead}>
              {isLocalBoth
                ? "タブでサイドを切り替えて、それぞれ3体ずつ選びます。選んだ順が並びで、先頭が初手です。ポケモンをタップして選出または強さを確認できます（フル公開）。"
                : isCpu
                  ? "左側から3体を選んでください（先頭が初手）。ポケモンをタップして選出または強さを確認できます。右側はCPUの6体（アイコンのみ・強さ非公開）です。確定後、CPUがこちらの6体を見て3体を選びます。"
                  : "左側から3体を選んでください。選んだ順が並びで、先頭が初手です。ポケモンをタップして選出または強さを確認できます。AIの選出・強さは非公開です。"}
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
                {isLocalBoth ? (
                  <View style={styles.sideTabs}>
                    <Pressable
                      onPress={() => setEditingSide("a")}
                      style={[
                        styles.sideTab,
                        styles.sideTabA,
                        editingSide === "a" && styles.sideTabAActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.sideTabText,
                          editingSide === "a" && styles.sideTabTextActive,
                        ]}
                      >
                        サイドA
                      </Text>
                      <Text
                        style={[
                          styles.sideTabCount,
                          editingSide === "a" && styles.sideTabTextActive,
                        ]}
                      >
                        {picksA.length}/{BATTLE_PARTY_SIZE}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => setEditingSide("b")}
                      style={[
                        styles.sideTab,
                        styles.sideTabB,
                        editingSide === "b" && styles.sideTabBActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.sideTabText,
                          editingSide === "b" && styles.sideTabTextActive,
                        ]}
                      >
                        サイドB
                      </Text>
                      <Text
                        style={[
                          styles.sideTabCount,
                          editingSide === "b" && styles.sideTabTextActive,
                        ]}
                      >
                        {picksB.length}/{BATTLE_PARTY_SIZE}
                      </Text>
                    </Pressable>
                  </View>
                ) : null}

                <Text style={styles.pickStatus}>
                  {isLocalBoth
                    ? editingSide === "a"
                      ? `サイドAを選出中 ${picksA.length}/${BATTLE_PARTY_SIZE}${pickSummary(picksA, membersA)}`
                      : `サイドBを選出中 ${picksB.length}/${BATTLE_PARTY_SIZE}${pickSummary(picksB, membersB)}`
                    : `サイドA ${picksA.length}/${BATTLE_PARTY_SIZE}${pickSummary(picksA, membersA)}`}
                </Text>

                <View style={styles.columns}>
                  <PartyColumn
                    title={
                      focusSide !== "a"
                        ? "A"
                        : `サイドA（${membersA.length}体）`
                    }
                    members={membersA}
                    speciesById={speciesById}
                    emptyText="サイドAのパーティがありません。"
                    selectable={focusSide === "a"}
                    canInspect={focusSide === "a"}
                    pickedIds={picksA}
                    onPressMember={
                      focusSide === "a"
                        ? (member) =>
                            setActionTarget({
                              side: "a",
                              member,
                              selectable: true,
                              canInspect: true,
                            })
                        : undefined
                    }
                    tone="own"
                    compact={focusSide !== "a"}
                    layoutWeight={focusSide === "a" ? 4 : 1}
                  />
                  <PartyColumn
                    title={
                      focusSide === "b"
                        ? `サイドB（${membersB.length}体）`
                        : isLocalBoth
                          ? "B"
                          : isCpu
                            ? "CPU"
                            : "AI"
                    }
                    members={isLocalBoth || isCpu ? membersB : []}
                    speciesById={speciesById}
                    emptyText={
                      isLocalBoth
                        ? "サイドBのパーティがありません。"
                        : isCpu
                          ? "CPUのパーティがありません。"
                          : "AIのパーティは準備中です。"
                    }
                    selectable={isLocalBoth && focusSide === "b"}
                    canInspect={canInspectOpponent && focusSide === "b"}
                    pickedIds={isLocalBoth ? picksB : []}
                    onPressMember={
                      isLocalBoth && focusSide === "b"
                        ? (member) =>
                            setActionTarget({
                              side: "b",
                              member,
                              selectable: true,
                              canInspect: true,
                            })
                        : undefined
                    }
                    tone="opponent"
                    compact={focusSide !== "b"}
                    layoutWeight={focusSide === "b" ? 4 : 1}
                  />
                </View>

                <Pressable
                  disabled={!bothReady}
                  onPress={confirmSelection}
                  style={[
                    styles.primaryButton,
                    !bothReady && styles.primaryButtonDisabled,
                  ]}
                >
                  <Text style={styles.primaryButtonText}>
                    {bothReady
                      ? "選出を確定"
                      : isLocalBoth
                        ? `A ${picksA.length}/${BATTLE_PARTY_SIZE} ／ B ${picksB.length}/${BATTLE_PARTY_SIZE}`
                        : `あと${BATTLE_PARTY_SIZE - picksA.length}体選んでください`}
                  </Text>
                </Pressable>
              </>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal
        visible={actionTarget != null}
        transparent
        animationType="fade"
        onRequestClose={closeAction}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeaderRow}>
              <Text style={[styles.modalTitle, styles.modalHeaderTitle]}>
                {actionTarget?.member.nameJa ?? "ポケモン"}
              </Text>
              <Pressable
                onPress={closeAction}
                style={styles.modalCloseButton}
                hitSlop={8}
              >
                <Text style={styles.modalCloseButtonText}>❌</Text>
              </Pressable>
            </View>
            <Text style={styles.modalBody}>どうしますか？</Text>
            {actionTarget?.selectable ? (
              <Pressable
                disabled={actionPickDisabled}
                onPress={confirmActionPick}
                style={[
                  styles.primaryButton,
                  actionPickDisabled && styles.primaryButtonDisabled,
                ]}
              >
                <Text
                  style={[
                    styles.primaryButtonText,
                    actionPickDisabled && styles.primaryButtonTextDisabled,
                  ]}
                >
                  {actionSelected ? "選択を外す" : "選択する"}
                </Text>
              </Pressable>
            ) : null}
            {actionTarget?.canInspect ? (
              <Pressable
                onPress={() => {
                  if (!actionTarget) return;
                  setInspectMember(actionTarget.member);
                }}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>強さを見る</Text>
              </Pressable>
            ) : null}
            {actionPickDisabled ? (
              <Text style={styles.modalBody}>
                すでに{BATTLE_PARTY_SIZE}体選んでいます。別のポケモンを外してから選んでください。
              </Text>
            ) : null}
          </View>
        </View>
      </Modal>

      <Modal
        visible={inspectMember != null}
        transparent
        animationType="fade"
        onRequestClose={closeInspect}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.detailSheet}>
            <ScrollView
              style={styles.inspectScroll}
              contentContainerStyle={styles.inspectScrollInner}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.modalHeaderRow}>
                <Text style={[styles.modalTitle, styles.modalHeaderTitle]}>
                  {inspectMember?.nameJa ?? "ポケモン"}の強さ
                </Text>
                <Pressable
                  onPress={closeInspect}
                  style={styles.modalCloseButton}
                  hitSlop={8}
                >
                  <Text style={styles.modalCloseButtonText}>❌</Text>
                </Pressable>
              </View>

              {inspectMember ? (
                <View style={styles.inspectMetaBlock}>
                  <Text style={styles.modalBody}>
                    {formatDexNo(inspectMember.dexNo)} ／ Lv
                    {inspectMember.level}
                  </Text>
                  {inspectSpecies ? (
                    <View style={styles.inspectTypeRow}>
                      {getTypes(inspectSpecies).map((typeJa) => (
                        <View
                          key={typeJa}
                          style={[
                            styles.typeBadge,
                            {
                              backgroundColor:
                                TYPE_COLORS[typeJa] ?? "#8a8172",
                            },
                          ]}
                        >
                          <Text style={styles.typeBadgeText}>{typeJa}</Text>
                        </View>
                      ))}
                    </View>
                  ) : null}
                </View>
              ) : (
                <Text style={styles.modalBody}>データがありません。</Text>
              )}

              <Text style={styles.inspectSection}>覚えてる技</Text>
              {inspectMovesLoading ? (
                <ActivityIndicator color="#1f6b4a" />
              ) : null}
              {!inspectMovesLoading &&
              inspectMoves.every((move) => move == null) ? (
                <Text style={styles.modalBody}>技がセットされていません。</Text>
              ) : null}
              <View style={styles.inspectMoveList}>
                {inspectMoves.map((move, index) => {
                  if (!move) {
                    return (
                      <View
                        key={`inspect-empty-${index}`}
                        style={styles.moveSlotEmpty}
                      >
                        <Text style={styles.moveSlotEmptyText}>— 空き —</Text>
                      </View>
                    );
                  }
                  const typeJa = typeNameJa(move.type_id);
                  const typeColor = TYPE_COLORS[typeJa] ?? "#8a8172";
                  return (
                    <View
                      key={`inspect-${move.id}-${index}`}
                      style={[styles.moveSlot, { borderColor: typeColor }]}
                    >
                      <View style={styles.moveSlotMain}>
                        <View style={styles.moveSlotTop}>
                          <View
                            style={[
                              styles.typeBadge,
                              { backgroundColor: typeColor },
                            ]}
                          >
                            <Text style={styles.typeBadgeText}>{typeJa}</Text>
                          </View>
                          <Text style={styles.moveSlotName}>{move.name_ja}</Text>
                          <Text style={styles.moveSlotPp}>
                            PP {move.pp ?? "—"}
                          </Text>
                        </View>
                      </View>
                      <Pressable
                        onPress={() => setDetailMove(move)}
                        style={styles.moveDetailButton}
                      >
                        <Text style={styles.moveDetailButtonText}>詳細</Text>
                      </Pressable>
                    </View>
                  );
                })}
              </View>

              <Text style={styles.inspectSection}>能力の実数値</Text>
              {inspectStats ? (
                <View style={styles.inspectStatList}>
                  {GEN1_STAT_KEYS.map((key) => (
                    <View key={key} style={styles.inspectStatRow}>
                      <Text style={styles.inspectStatLabel}>
                        {GEN1_STAT_LABELS[key]}
                      </Text>
                      <Text style={styles.inspectStatValue}>
                        {String(inspectStats[key])}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.modalBody}>実数値が計算できません。</Text>
              )}

              <Pressable onPress={closeInspect} style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>閉じる</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={detailMove != null}
        transparent
        animationType="fade"
        onRequestClose={() => setDetailMove(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.detailSheet}>
            {detailMove ? (
              <>
                <Text style={styles.modalTitle}>{detailMove.name_ja}</Text>
                <View
                  style={[
                    styles.typeBadge,
                    {
                      backgroundColor:
                        TYPE_COLORS[typeNameJa(detailMove.type_id)] ?? "#888",
                      alignSelf: "flex-start",
                    },
                  ]}
                >
                  <Text style={styles.typeBadgeText}>
                    {typeNameJa(detailMove.type_id)}
                  </Text>
                </View>
                <Text style={styles.detailStat}>
                  威力 {formatMoveStat(detailMove.power)}
                </Text>
                <Text style={styles.detailStat}>
                  命中率 {formatMoveStat(detailMove.accuracy)}
                </Text>
                <Text style={styles.detailStat}>
                  優先度 {detailMove.priority}
                </Text>
                <Text style={styles.detailStat}>
                  PP {formatMoveStat(detailMove.pp)}
                </Text>
                <Text style={styles.modalBody}>
                  {detailMove.description?.trim() || "説明はありません。"}
                </Text>
                <Pressable
                  onPress={() => setDetailMove(null)}
                  style={styles.primaryButton}
                >
                  <Text style={styles.primaryButtonText}>閉じる</Text>
                </Pressable>
              </>
            ) : null}
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
  sideTabs: {
    flexDirection: "row",
    gap: 8,
  },
  sideTab: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    gap: 2,
  },
  sideTabA: {
    borderColor: "#1f6b4a",
    backgroundColor: "#eef6f1",
  },
  sideTabAActive: {
    backgroundColor: "#1f6b4a",
  },
  sideTabB: {
    borderColor: "#3d5a80",
    backgroundColor: "#eef2f7",
  },
  sideTabBActive: {
    backgroundColor: "#3d5a80",
  },
  sideTabText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#3d3830",
  },
  sideTabCount: {
    fontSize: 12,
    fontWeight: "700",
    color: "#5c564c",
  },
  sideTabTextActive: {
    color: "#ffffff",
  },
  stateBox: { alignItems: "center", gap: 8, paddingVertical: 20 },
  stateText: { color: "#5c564c" },
  errorText: { color: "#a33", fontWeight: "700" },
  columns: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 10,
  },
  column: {
    minWidth: 0,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
  },
  columnCompact: {
    maxWidth: 68,
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
  slotCompact: {
    justifyContent: "center",
    position: "relative",
  },
  slotCompactEmpty: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
  },
  slotCompactOrder: {
    position: "absolute",
    right: 4,
    bottom: 4,
    minWidth: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#1d1a16",
    color: "#fff",
    fontSize: 9,
    fontWeight: "800",
    textAlign: "center",
    overflow: "hidden",
    lineHeight: 14,
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
  primaryButtonTextDisabled: { color: "#e8eee9" },
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
  detailSheet: {
    width: "92%",
    maxWidth: 480,
    maxHeight: "88%",
    backgroundColor: "#fffdf8",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    padding: 18,
    gap: 12,
  },
  modalHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  modalHeaderTitle: {
    flex: 1,
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  modalCloseButtonText: {
    fontSize: 18,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1d1a16",
  },
  modalBody: {
    fontSize: 14,
    lineHeight: 20,
    color: "#5c564c",
  },
  inspectScroll: {
    maxHeight: "100%",
  },
  inspectScrollInner: {
    gap: 12,
    paddingBottom: 8,
  },
  inspectMetaBlock: {
    gap: 8,
  },
  inspectTypeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  inspectSection: {
    fontSize: 13,
    fontWeight: "800",
    color: "#6b4f2a",
    marginTop: 4,
  },
  inspectMoveList: {
    gap: 8,
  },
  inspectStatList: {
    gap: 6,
  },
  inspectStatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#f4efe4",
  },
  inspectStatLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5c564c",
  },
  inspectStatValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1d1a16",
  },
  typeBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  typeBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
  },
  moveSlot: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  moveSlotMain: {
    flex: 1,
    minWidth: 0,
  },
  moveSlotTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  moveSlotName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
    color: "#1d1a16",
  },
  moveSlotPp: {
    fontSize: 12,
    fontWeight: "700",
    color: "#5c564c",
  },
  moveSlotEmpty: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderStyle: "dashed",
    paddingVertical: 12,
    alignItems: "center",
  },
  moveSlotEmptyText: {
    color: "#8a8172",
    fontWeight: "700",
  },
  moveDetailButton: {
    borderRadius: 8,
    backgroundColor: "#1f6b4a",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  moveDetailButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },
  detailStat: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3d3830",
  },
});
