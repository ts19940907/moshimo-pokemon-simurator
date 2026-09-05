import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useBattleSession } from "../battle/BattleSessionContext";
import {
  chooseCpuAction,
  chooseCpuForcedSwitch,
  noteRevealedMove,
  type CpuKnowledge,
} from "../battle/cpuChooseAction";
import {
  buildFighter,
  getForcedMove,
  resolveTurnSteps,
  applySpikesOnSwitchIn,
} from "../battle/resolveTurn";
import {
  createBattleField,
  type BattleAction,
  type BattleFieldState,
  type BattleFighter,
  type BattleStatus,
} from "../battle/types";
import { getMoveByPokeapiId } from "../battle/gen1MovePool";
import { moveGenerationFilterFromParams, parseRulesGeneration } from "../match-setup/params";
import type { OpponentType } from "../match-setup/types";
import { computeMemberBattleStats, tryLeppaBerry } from "../battle/toolEffects";
import { applyMoveTypesForGeneration } from "../pokemon/moveTypeByGeneration";
import { usePartySetup } from "../party/PartySetupContext";
import {
  GEN1_STAT_KEYS,
  GEN1_STAT_LABELS,
  type PartyMemberBuild,
  type PartySide,
} from "../party/types";
import { formatDexNo, TYPE_COLORS, getTypes, typeNameJa } from "../pokemon/catalog";
import type { Move } from "../pokemon/moves";
import {
  fetchMovesByIds,
  fetchMovesForPokemon,
} from "../pokemon/moveRepository";
import { PokemonSprite } from "../pokemon/PokemonSprite";
import { fetchPokemonSpecies } from "../pokemon/repository";
import { fetchToolsByIds } from "../pokemon/toolRepository";
import type { Tool } from "../pokemon/tools";
import type { PokemonSpecies } from "../pokemon/types";
import { matchBackgroundForRules } from "../match-setup/backgrounds";
import { MatchScreenBackground } from "../match-setup/MatchScreenBackground";
import { formatChampionsHpPercentLabel } from "../battle/hpPercent";

/** Rough beat between log lines (move-effect pacing). */
const LOG_LINE_DELAY_MS = 800;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type MatchParams = {
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

type CommandMenu = "root" | "fight" | "party";
type PickPhase = "a" | "b";

function formatMoveStat(value: number | null): string {
  return value == null ? "—" : String(value);
}

function ppKey(speciesId: string, moveId: string): string {
  return `${speciesId}:${moveId}`;
}

const STATUS_LABEL: Record<string, string> = {
  paralysis: "まひ",
  sleep: "ねむり",
  freeze: "こおり",
  burn: "やけど",
  poison: "どく",
};

function statusBadges(
  fighter: BattleFighter | null | undefined,
  displayedHp?: number,
  options?: {
    hideDeferred?: boolean;
    statusOverride?: BattleStatus | undefined;
    confusionOverride?: number | undefined;
  },
): string[] {
  if (!fighter) return [];
  const badges: string[] = [];
  const hp = displayedHp ?? fighter.currentHp;
  if (hp <= 0) {
    badges.push("ひんし");
    return badges;
  }
  const status =
    options && "statusOverride" in (options ?? {})
      ? options?.statusOverride
      : fighter.status;
  if (status) {
    badges.push(STATUS_LABEL[status] ?? status);
  }
  const confusionTurns =
    options && "confusionOverride" in (options ?? {})
      ? (options?.confusionOverride ?? 0)
      : fighter.volatiles.confusionTurns;
  if (confusionTurns > 0) badges.push("こんらん");
  if (fighter.volatiles.trapTurns > 0) {
    badges.push(`しめつけ(残り${fighter.volatiles.trapTurns})`);
  }
  if (fighter.volatiles.leechSeed) badges.push("やどりぎ");
  // 「ため」「反動」は交代・ターン演出のあとに出す（解決中は隠す）
  if (fighter.volatiles.recharge && !options?.hideDeferred) {
    badges.push("反動");
  }
  if (fighter.volatiles.focusEnergy) badges.push("きあい");
  if (fighter.volatiles.chargingMove && !options?.hideDeferred) {
    badges.push("ため");
  }
  if (fighter.volatiles.semiInvulnerable === "fly") badges.push("そらをとぶ");
  if (fighter.volatiles.semiInvulnerable === "dig") badges.push("あなをほる");
  if (fighter.volatiles.lockedMove) badges.push("暴走");
  if (fighter.volatiles.bideTurnsLeft > 0) badges.push("がまん");
  if (fighter.volatiles.rageActive) badges.push("いかり");
  if (fighter.volatiles.transformed) badges.push("へんしん");
  if (fighter.volatiles.disableMoveId) badges.push("かなしばり");
  if (fighter.volatiles.substituteHp > 0) badges.push("みがわり");
  if (fighter.volatiles.bindingTurnsLeft > 0) {
    badges.push(`しめつけ中(残り${fighter.volatiles.bindingTurnsLeft + 1})`);
  }
  return badges;
}

function FieldFighter({
  member,
  species,
  align,
  emptyLabel,
  currentHp,
  maxHp,
  badges,
  hpDisplay = "absolute",
}: {
  member: PartyMemberBuild | null;
  species: PokemonSpecies | null;
  align: "opponent" | "own";
  emptyLabel: string;
  currentHp?: number;
  maxHp?: number;
  badges?: string[];
  /** CPU/AI foe: Champions-style percentage. */
  hpDisplay?: "absolute" | "percent";
}) {
  const max = Math.max(1, maxHp ?? 1);
  const current = Math.max(0, Math.min(max, currentHp ?? max));
  const ratio = current / max;
  const widthAnim = useRef(new Animated.Value(ratio * 100)).current;
  const [displayHp, setDisplayHp] = useState(current);
  const memberKey = member?.speciesId ?? "";

  useEffect(() => {
    widthAnim.setValue(ratio * 100);
    setDisplayHp(current);
    // Reset instantly when the active Pokémon changes (switch / faint).
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional reset on species only
  }, [memberKey]);

  useEffect(() => {
    const listenerId = widthAnim.addListener(({ value }) => {
      setDisplayHp(Math.round((value / 100) * max));
    });
    Animated.timing(widthAnim, {
      toValue: ratio * 100,
      duration: 420,
      useNativeDriver: false,
    }).start(() => {
      setDisplayHp(current);
    });
    return () => {
      widthAnim.removeListener(listenerId);
    };
  }, [current, ratio, widthAnim, max]);

  if (!member) {
    return (
      <View
        style={[
          styles.fighter,
          align === "opponent" ? styles.fighterOpponent : styles.fighterOwn,
        ]}
      >
        <Text style={styles.fighterEmpty}>{emptyLabel}</Text>
      </View>
    );
  }

  // Official-style thresholds: yellow/orange at ≤50%, red at ≤20% (1/5)
  const hpColor =
    ratio <= 0.2 ? "#d64545" : ratio <= 0.5 ? "#e09a2b" : "#2f9e5b";
  const hpLabelText =
    hpDisplay === "percent"
      ? `HP ${formatChampionsHpPercentLabel(displayHp, max)}`
      : `HP ${displayHp}/${max}`;

  return (
    <View
      style={[
        styles.fighter,
        align === "opponent" ? styles.fighterOpponent : styles.fighterOwn,
      ]}
    >
      <View style={styles.fighterInfo}>
        <View style={styles.fighterNameRow}>
          <Text style={styles.fighterName} numberOfLines={1}>
            {member.nameJa}
          </Text>
          {badges && badges.length > 0 ? (
            <View style={styles.statusRow}>
              {badges.map((label) => (
                <View key={label} style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>{label}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
        <Text style={styles.fighterMeta}>
          {formatDexNo(member.dexNo)} ／ Lv{member.level}
        </Text>
        <View style={styles.hpTrack}>
          <Animated.View
            style={[
              styles.hpFill,
              {
                width: widthAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
                backgroundColor: hpColor,
              },
            ]}
          />
        </View>
        <Text style={styles.hpLabel}>{hpLabelText}</Text>
      </View>
      <PokemonSprite
        uri={species?.sprite_url}
        size={align === "opponent" ? 96 : 112}
        style={styles.fighterSprite}
      />
    </View>
  );
}

function formatStage(value: number): string {
  if (value > 0) return `+${value}`;
  return String(value);
}

function sideFieldSummary(field: BattleFieldState, side: PartySide): string[] {
  const f = field[side];
  const lines: string[] = [];
  if (f.mist) lines.push("しろいきり：継続（交代まで）");
  if (f.reflect) lines.push("リフレクター：継続（交代まで）");
  if (f.lightScreen) lines.push("ひかりのかべ：継続（交代まで）");
  if (f.spikes) lines.push("まきびし：継続");
  if (f.safeguardTurns > 0) {
    lines.push(`しんぴのまもり：残り${f.safeguardTurns}`);
  }
  if (lines.length === 0) lines.push("場効果：なし");
  return lines;
}


export function BattleScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<MatchParams>();
  const { getSide, clearAllParties } = usePartySetup();
  const {
    lineup,
    activeIndexA,
    activeIndexB,
    switchActive,
    clearBattle,
  } = useBattleSession();

  const opponentType = (params.opponentType ?? "local_both") as OpponentType;
  const isLocalBoth = opponentType === "local_both";
  const isCpu = opponentType === "cpu";
  /** CPU/AI: hide exact foe HP and show Champions-style %. */
  const foeHpAsPercent = opponentType === "cpu" || opponentType === "ai";
  const moveGenerationOptions = useMemo(
    () => moveGenerationFilterFromParams(params),
    [
      params.rulesGeneration,
      params.syncGenerationsWithRules,
      params.moveGenerations,
      params.moveGeneration,
    ],
  );
  const matchBackground = useMemo(
    () => matchBackgroundForRules(parseRulesGeneration(params)),
    [params.rulesGeneration],
  );
  const rulesGeneration = useMemo(() => {
    const fromParams = parseRulesGeneration(params);
    const fromParty =
      getSide("a")?.rulesGeneration ?? getSide("b")?.rulesGeneration;
    // Prefer party-stored generation when params are missing/wrong.
    if (fromParty != null && fromParty >= 1) return fromParty;
    return fromParams;
  }, [params.rulesGeneration, getSide]);

  const [menu, setMenu] = useState<CommandMenu>("root");
  const [pickPhase, setPickPhase] = useState<PickPhase>("a");
  const [actionA, setActionA] = useState<BattleAction | null>(null);
  const [actionB, setActionB] = useState<BattleAction | null>(null);
  const actionARef = useRef<BattleAction | null>(null);
  const [logLines, setLogLines] = useState<string[]>([
    "対戦開始！　サイドAから行動を選んでください。",
  ]);
  const [surrenderOpen, setSurrenderOpen] = useState(false);
  const [endDestOpen, setEndDestOpen] = useState(false);
  const [detailMove, setDetailMove] = useState<Move | null>(null);
  const [inspectTarget, setInspectTarget] = useState<{
    speciesId: string;
    index: number;
  } | null>(null);
  const [partyActionTarget, setPartyActionTarget] = useState<{
    speciesId: string;
    index: number;
  } | null>(null);
  const [inspectMoves, setInspectMoves] = useState<(Move | null)[]>([]);
  const [inspectMovesLoading, setInspectMovesLoading] = useState(false);
  const [equippedMoves, setEquippedMoves] = useState<(Move | null)[]>([]);
  const [movesLoading, setMovesLoading] = useState(false);
  const [ppRemaining, setPpRemaining] = useState<Record<string, number>>({});
  const [speciesById, setSpeciesById] = useState<Record<string, PokemonSpecies>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mustSwitchSide, setMustSwitchSide] = useState<PartySide | null>(null);
  /** When both sides faint (e.g. じばく), switch the other side after the first. */
  const pendingMustSwitchSideRef = useRef<PartySide | null>(null);
  const [logPlaying, setLogPlaying] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [foePartyOpen, setFoePartyOpen] = useState(false);

  const fightersRef = useRef<{ a: BattleFighter | null; b: BattleFighter | null }>(
    { a: null, b: null },
  );
  const fieldRef = useRef<BattleFieldState>(createBattleField());
  /** Persist HP across switches (瀕死維持). */
  const hpBySpeciesIdRef = useRef<Record<string, number>>({});
  /** One-time held items consumed this battle (berries). */
  const consumedToolBySpeciesIdRef = useRef<Record<string, boolean>>({});
  /** Gen1: major status / sleep counter persist on the bench. */
  const statusBySpeciesIdRef = useRef<Record<string, BattleStatus>>({});
  const sleepTurnsBySpeciesIdRef = useRef<Record<string, number>>({});
  /** Species that have appeared on the field at least once. */
  const seenOnFieldRef = useRef<Set<string>>(new Set());
  const [seenOnFieldTick, setSeenOnFieldTick] = useState(0);
  const markSeenOnField = (speciesId: string | undefined) => {
    if (!speciesId || seenOnFieldRef.current.has(speciesId)) return;
    seenOnFieldRef.current.add(speciesId);
    setSeenOnFieldTick((n) => n + 1);
  };
  const cpuKnowledgeRef = useRef<CpuKnowledge>({
    revealedMoveIdsBySpeciesId: {},
  });
  const movesByIdRef = useRef<Record<string, Move>>({});
  const toolsByIdRef = useRef<Record<string, Tool>>({});
  const [toolsById, setToolsById] = useState<Record<string, Tool>>({});
  const learnsetBySpeciesIdRef = useRef<Record<string, Move[]>>({});
  const ppRemainingRef = useRef<Record<string, number>>({});
  const [fighterTick, setFighterTick] = useState(0);
  const bumpFighters = () => setFighterTick((n) => n + 1);
  /** Display HP during step playback (multi-hit snapshots). */
  const [fieldHp, setFieldHp] = useState<{ a: number; b: number } | null>(null);
  /**
   * Status / confusion shown on the field during turn playback.
   * Updated after each step's logs so badges are not ahead of the text.
   * null = use live fighter values (between turns).
   */
  const [statusDisplay, setStatusDisplay] = useState<{
    a: BattleStatus;
    b: BattleStatus;
    confusionA: number;
    confusionB: number;
  } | null>(null);
  /**
   * Hide 「ため」「反動」 while switch / turn logs play.
   * Shown again after those animations finish if still active.
   */
  const [hideDeferredBadges, setHideDeferredBadges] = useState(false);

  const resolveMember = (
    side: PartySide,
    speciesId: string | undefined,
  ): PartyMemberBuild | null => {
    if (!speciesId) return null;
    return (
      getSide(side)?.members.find((member) => member.speciesId === speciesId) ??
      null
    );
  };

  const activeIdA = lineup?.a[activeIndexA];
  const activeIdB = lineup?.b[activeIndexB];
  const memberA = resolveMember("a", activeIdA);
  const memberB = resolveMember("b", activeIdB);

  const controllingSide: PartySide = (() => {
    if (isCpu) {
      // Player always drives side A; CPU auto-handles B forced switches.
      return "a";
    }
    return mustSwitchSide ?? (pickPhase === "b" ? "b" : "a");
  })();
  const controllingLineup = useMemo(() => {
    if (!lineup) return [];
    return controllingSide === "a" ? lineup.a : lineup.b;
  }, [lineup, controllingSide]);
  const controllingActiveIndex =
    controllingSide === "a" ? activeIndexA : activeIndexB;
  const controllingActiveId = controllingLineup[controllingActiveIndex];
  const controllingMember = resolveMember(controllingSide, controllingActiveId);
  // Subscribe to fighter updates (Mimic / Transform rewrite move slots)
  void fighterTick;
  const controllingFighter = fightersRef.current[controllingSide];
  const battleMoveIds =
    controllingFighter?.member.moveIds ?? controllingMember?.moveIds ?? null;
  const battleMoveKey = battleMoveIds?.map((id) => id ?? "").join(",") ?? "";
  const sideLabel = controllingSide === "a" ? "サイドA" : "サイドB";

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setErrorMessage(null);
        if (!lineup) {
          setErrorMessage("対戦データがありません。選出からやり直してください。");
          return;
        }
        const rows = await fetchPokemonSpecies();
        if (cancelled) return;
        const map: Record<string, PokemonSpecies> = {};
        for (const row of rows) map[row.id] = row;
        setSpeciesById(map);

        const toolIds = new Set<string>();
        for (const side of ["a", "b"] as PartySide[]) {
          for (const member of getSide(side)?.members ?? []) {
            if (member.toolId) toolIds.add(member.toolId);
          }
        }
        const toolRows = await fetchToolsByIds([...toolIds]);
        if (cancelled) return;
        const toolMap: Record<string, Tool> = {};
        for (const tool of toolRows) toolMap[tool.id] = tool;
        toolsByIdRef.current = toolMap;
        setToolsById(toolMap);

        // Backfill pokeapi ids onto party members when missing (older builds).
        for (const side of ["a", "b"] as PartySide[]) {
          const party = getSide(side);
          if (!party) continue;
          for (const member of party.members) {
            if (!member.toolId || member.toolPokeapiId != null) continue;
            const fromMap = toolMap[member.toolId]?.pokeapi_id;
            if (fromMap != null) {
              member.toolPokeapiId = Number(fromMap);
            }
          }
        }

        const nextHp: Record<string, number> = {};
        const nextStatus: Record<string, BattleStatus> = {};
        const nextSleep: Record<string, number> = {};
        const buildSide = (side: PartySide, speciesId: string | undefined) => {
          if (!speciesId) return null;
          const member = getSide(side)?.members.find(
            (m) => m.speciesId === speciesId,
          );
          const species = map[speciesId];
          if (!member || !species) return null;
          const { stats, toolPokeapiId } = computeMemberBattleStats(
            species,
            member,
            rulesGeneration,
            toolsByIdRef.current,
          );
          nextHp[speciesId] = stats.hp;
          nextStatus[speciesId] = null;
          nextSleep[speciesId] = 0;
          return buildFighter({
            side,
            member,
            species,
            stats,
            currentHp: stats.hp,
            maxHp: stats.hp,
            status: null,
            sleepTurns: 0,
            toolPokeapiId,
            toolConsumed: consumedToolBySpeciesIdRef.current[speciesId] ?? false,
          });
        };

        // Seed HP for all lineup members (bench included)
        for (const side of ["a", "b"] as PartySide[]) {
          const ids = side === "a" ? lineup.a : lineup.b;
          for (const speciesId of ids) {
            const member = getSide(side)?.members.find(
              (m) => m.speciesId === speciesId,
            );
            const species = map[speciesId];
            if (!member || !species) continue;
            nextHp[speciesId] = computeMemberBattleStats(
              species,
              member,
              rulesGeneration,
              toolsByIdRef.current,
            ).stats.hp;
            nextStatus[speciesId] = null;
            nextSleep[speciesId] = 0;
          }
        }
        hpBySpeciesIdRef.current = nextHp;
        statusBySpeciesIdRef.current = nextStatus;
        sleepTurnsBySpeciesIdRef.current = nextSleep;
        consumedToolBySpeciesIdRef.current = {};
        fieldRef.current = createBattleField();
        cpuKnowledgeRef.current = { revealedMoveIdsBySpeciesId: {} };
        seenOnFieldRef.current = new Set();

        fightersRef.current = {
          a: buildSide("a", lineup.a[0]),
          b: buildSide("b", lineup.b[0]),
        };
        if (lineup.a[0]) seenOnFieldRef.current.add(lineup.a[0]);
        if (lineup.b[0]) seenOnFieldRef.current.add(lineup.b[0]);
        setSeenOnFieldTick((n) => n + 1);
        setFieldHp({
          a: fightersRef.current.a?.currentHp ?? 0,
          b: fightersRef.current.b?.currentHp ?? 0,
        });
        bumpFighters();

        if (isCpu) {
          const allMoveIds = new Set<string>();
          for (const side of ["a", "b"] as PartySide[]) {
            const ids = side === "a" ? lineup.a : lineup.b;
            for (const speciesId of ids) {
              const member = getSide(side)?.members.find(
                (m) => m.speciesId === speciesId,
              );
              for (const moveId of member?.moveIds ?? []) {
                if (moveId) allMoveIds.add(moveId);
              }
            }
          }
          const moveRows = applyMoveTypesForGeneration(
            await fetchMovesByIds([...allMoveIds]),
            rulesGeneration,
          );
          if (cancelled) return;
          const byId: Record<string, Move> = {};
          for (const move of moveRows) byId[move.id] = move;
          movesByIdRef.current = byId;
          setPpRemaining((current) => {
            const next = { ...current };
            for (const side of ["a", "b"] as PartySide[]) {
              const ids = side === "a" ? lineup.a : lineup.b;
              for (const speciesId of ids) {
                const member = getSide(side)?.members.find(
                  (m) => m.speciesId === speciesId,
                );
                for (const moveId of member?.moveIds ?? []) {
                  if (!moveId) continue;
                  const move = byId[moveId];
                  if (!move) continue;
                  const key = ppKey(speciesId, moveId);
                  if (next[key] == null) next[key] = move.pp ?? 0;
                }
              }
            }
            return next;
          });

          const learnsets: Record<string, Move[]> = {};
          for (const speciesId of lineup.a) {
            learnsets[speciesId] = applyMoveTypesForGeneration(
              await fetchMovesForPokemon(speciesId, moveGenerationOptions),
              rulesGeneration,
            );
            if (cancelled) return;
          }
          learnsetBySpeciesIdRef.current = learnsets;
        }
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
  }, [lineup, getSide, isCpu, moveGenerationOptions, rulesGeneration]);

  useEffect(() => {
    if (menu !== "fight" || !controllingMember || !battleMoveIds) {
      setEquippedMoves([]);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setMovesLoading(true);
        const ids = battleMoveIds.filter((id): id is string => Boolean(id));
        const rows = applyMoveTypesForGeneration(
          await fetchMovesByIds(ids),
          rulesGeneration,
        );
        if (cancelled) return;
        const byId = new Map(rows.map((move) => [move.id, move]));
        const slots = battleMoveIds.map((id) =>
          id ? byId.get(id) ?? null : null,
        );
        setEquippedMoves(slots);
        setPpRemaining((current) => {
          const next = { ...current };
          for (const move of rows) {
            const key = ppKey(controllingMember.speciesId, move.id);
            if (next[key] == null) next[key] = move.pp ?? 0;
            movesByIdRef.current[move.id] = move;
          }
          ppRemainingRef.current = { ...ppRemainingRef.current, ...next };
          return next;
        });
      } catch {
        if (!cancelled) setEquippedMoves([]);
      } finally {
        if (!cancelled) setMovesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [menu, controllingMember, battleMoveKey]);

  const inspectMember = inspectTarget
    ? resolveMember(controllingSide, inspectTarget.speciesId)
    : null;
  const inspectSpecies = inspectTarget
    ? speciesById[inspectTarget.speciesId]
    : undefined;
  const inspectIsActive =
    inspectTarget != null &&
    inspectTarget.index === controllingActiveIndex;
  const inspectFighter =
    inspectIsActive ? fightersRef.current[controllingSide] : null;
  const inspectStats =
    inspectFighter?.stats ??
    (inspectMember && inspectSpecies
      ? computeMemberBattleStats(
          inspectSpecies,
          inspectMember,
          rulesGeneration,
          toolsById,
        ).stats
      : null);
  const inspectToolName = inspectMember?.toolId
    ? (toolsById[inspectMember.toolId]?.name_ja ?? "—")
    : "なし";
  const inspectMoveIds =
    inspectFighter?.member.moveIds ?? inspectMember?.moveIds ?? null;
  const inspectMoveKey = inspectMoveIds?.map((id) => id ?? "").join(",") ?? "";

  const partyActionMember = partyActionTarget
    ? resolveMember(controllingSide, partyActionTarget.speciesId)
    : null;
  const partyActionCanSwitch = (() => {
    if (!partyActionTarget) return false;
    const hp =
      hpBySpeciesIdRef.current[partyActionTarget.speciesId] ?? 0;
    if (hp <= 0) return false;
    if (
      partyActionTarget.index === controllingActiveIndex &&
      !mustSwitchSide
    ) {
      return false;
    }
    return true;
  })();

  useEffect(() => {
    if (!inspectTarget || !inspectMoveIds) {
      setInspectMoves([]);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setInspectMovesLoading(true);
        const ids = inspectMoveIds.filter((id): id is string => Boolean(id));
        const rows = applyMoveTypesForGeneration(
          await fetchMovesByIds(ids),
          rulesGeneration,
        );
        if (cancelled) return;
        const byId = new Map(rows.map((move) => [move.id, move]));
        setInspectMoves(
          inspectMoveIds.map((id) => (id ? byId.get(id) ?? null : null)),
        );
      } catch {
        if (!cancelled) setInspectMoves([]);
      } finally {
        if (!cancelled) setInspectMovesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed by inspectMoveKey
  }, [inspectTarget?.speciesId, inspectMoveKey]);

  const setLog = (lines: string[]) => {
    setLogLines(lines);
  };

  const playLog = async (lines: string[]) => {
    setLogPlaying(true);
    setLogLines([]);
    for (const line of lines) {
      setLogLines((current) => [...current, line]);
      await sleep(LOG_LINE_DELAY_MS);
    }
    setLogPlaying(false);
  };

  const persistFighterHp = () => {
    for (const side of ["a", "b"] as const) {
      const f = fightersRef.current[side];
      if (!f) continue;
      hpBySpeciesIdRef.current[f.speciesId] = f.currentHp;
      statusBySpeciesIdRef.current[f.speciesId] = f.status;
      sleepTurnsBySpeciesIdRef.current[f.speciesId] = f.sleepTurns;
    }
  };

  const persistSnapshotHp = (snapshot: { a: number; b: number }) => {
    const fighterA = fightersRef.current.a;
    const fighterB = fightersRef.current.b;
    if (fighterA) {
      hpBySpeciesIdRef.current[fighterA.speciesId] = snapshot.a;
      statusBySpeciesIdRef.current[fighterA.speciesId] = fighterA.status;
      sleepTurnsBySpeciesIdRef.current[fighterA.speciesId] =
        fighterA.sleepTurns;
    }
    if (fighterB) {
      hpBySpeciesIdRef.current[fighterB.speciesId] = snapshot.b;
      statusBySpeciesIdRef.current[fighterB.speciesId] = fighterB.status;
      sleepTurnsBySpeciesIdRef.current[fighterB.speciesId] =
        fighterB.sleepTurns;
    }
  };

  const openEndDestination = () => {
    setEndDestOpen(true);
  };

  const goToDestination = (
    dest: "start" | "party" | "select",
  ) => {
    setEndDestOpen(false);
    clearBattle();
    if (dest === "start") {
      clearAllParties();
      router.replace("/");
      return;
    }
    if (dest === "party") {
      // Keep both parties; reopen 6-mon pick from side A
      router.replace({
        pathname: "/party",
        params: { ...params, side: "a" },
      });
      return;
    }
    // 3-mon select — keep 6-mon parties
    router.replace({
      pathname: "/select",
      params: { ...params },
    });
  };

  const goMenu = () => {
    pendingMustSwitchSideRef.current = null;
    setMustSwitchSide(null);
    openEndDestination();
  };

  useEffect(() => {
    ppRemainingRef.current = ppRemaining;
  }, [ppRemaining]);

  const spendPp = (
    speciesId: string,
    moveId: string,
  ): { restoreAmount: number; log: string | null } => {
    const key = ppKey(speciesId, moveId);
    const remaining = ppRemainingRef.current[key];
    if (remaining == null) return { restoreAmount: 0, log: null };
    // Only consume Leppa when this spend actually empties the move's PP.
    if (remaining <= 0) return { restoreAmount: 0, log: null };
    const after = Math.max(0, remaining - 1);
    const fighter =
      fightersRef.current.a?.speciesId === speciesId
        ? fightersRef.current.a
        : fightersRef.current.b?.speciesId === speciesId
          ? fightersRef.current.b
          : null;
    const move =
      movesByIdRef.current[moveId] ??
      equippedMoves.find((m) => m?.id === moveId) ??
      null;
    const maxPp = Math.max(0, move?.pp ?? remaining);
    const leppaLogs: string[] = [];
    const restoreAmount =
      after === 0 && fighter
        ? tryLeppaBerry(fighter, after, maxPp, leppaLogs)
        : 0;
    const nextValue = after + restoreAmount;
    const next = { ...ppRemainingRef.current, [key]: nextValue };
    ppRemainingRef.current = next;
    setPpRemaining(next);
    if (fighter?.heldTool?.consumed) {
      consumedToolBySpeciesIdRef.current[speciesId] = true;
    }
    return {
      restoreAmount,
      log: leppaLogs[0] ?? null,
    };
  };

  const cpuSwitchOptions = (side: PartySide = "b") => {
    if (!lineup) return [];
    const ids = side === "a" ? lineup.a : lineup.b;
    const active = side === "a" ? activeIndexA : activeIndexB;
    const options: {
      index: number;
      member: PartyMemberBuild;
      species: PokemonSpecies;
    }[] = [];
    ids.forEach((speciesId, index) => {
      if (index === active) return;
      if ((hpBySpeciesIdRef.current[speciesId] ?? 0) <= 0) return;
      const member = resolveMember(side, speciesId);
      const species = speciesById[speciesId];
      if (!member || !species) return;
      options.push({ index, member, species });
    });
    return options;
  };

  const pickCpuBattleAction = (): BattleAction => {
    const self = fightersRef.current.b;
    const foe = fightersRef.current.a;
    if (!self || !foe) return { type: "run" };
    return chooseCpuAction({
      self,
      foe,
      field: fieldRef.current,
      selfMovesById: movesByIdRef.current,
      foeMovesById: movesByIdRef.current,
      ppRemaining: ppRemainingRef.current,
      knowledge: cpuKnowledgeRef.current,
      foeLearnset: learnsetBySpeciesIdRef.current[foe.species.id] ?? [],
      switchOptions: cpuSwitchOptions("b"),
      rulesGeneration,
    });
  };

  const syncFighterFromActive = (side: PartySide, index: number) => {
    if (!lineup) return;
    const speciesId = side === "a" ? lineup.a[index] : lineup.b[index];
    const member = resolveMember(side, speciesId);
    const species = speciesId ? speciesById[speciesId] : null;
    if (!member || !species) return;
    const { stats, toolPokeapiId } = computeMemberBattleStats(
      species,
      member,
      rulesGeneration,
      toolsByIdRef.current,
    );
    const stored = hpBySpeciesIdRef.current[speciesId];
    const hp =
      stored != null ? Math.max(0, Math.min(stats.hp, stored)) : stats.hp;
    const storedStatus = statusBySpeciesIdRef.current[speciesId] ?? null;
    const storedSleep = sleepTurnsBySpeciesIdRef.current[speciesId] ?? 0;
    // Gen1: mist / reflect / light screen end on switch-out.
    // Gen2 spikes / safeguard remain on the side.
    const prevField = fieldRef.current[side];
    fieldRef.current[side] = {
      mist: false,
      reflect: false,
      lightScreen: false,
      spikes: prevField.spikes,
      safeguardTurns: prevField.safeguardTurns,
    };
    // End binding if either side switches
    const prev = fightersRef.current[side];
    const other = fightersRef.current[side === "a" ? "b" : "a"];
    if (prev) {
      statusBySpeciesIdRef.current[prev.speciesId] = prev.status;
      sleepTurnsBySpeciesIdRef.current[prev.speciesId] = prev.sleepTurns;
      hpBySpeciesIdRef.current[prev.speciesId] = prev.currentHp;
      if (prev.heldTool?.consumed) {
        consumedToolBySpeciesIdRef.current[prev.speciesId] = true;
      }
      prev.volatiles.bindingMove = null;
      prev.volatiles.bindingTurnsLeft = 0;
      prev.volatiles.trapTurns = 0;
      prev.volatiles.trapDamage = 0;
    }
    if (other) {
      other.volatiles.bindingMove = null;
      other.volatiles.bindingTurnsLeft = 0;
      other.volatiles.trapTurns = 0;
      other.volatiles.trapDamage = 0;
    }
    const prevFighter = fightersRef.current[side];
    const baton = prevFighter?.volatiles.batonPass
      ? {
          stages: { ...prevFighter.stages },
          focusEnergy: prevFighter.volatiles.focusEnergy,
          cursed: prevFighter.volatiles.cursed,
          perishCount: prevFighter.volatiles.perishCount,
        }
      : null;

    fightersRef.current[side] = buildFighter({
      side,
      member,
      species,
      stats,
      currentHp: hp,
      maxHp: stats.hp,
      status: storedStatus,
      sleepTurns: storedSleep,
      toolPokeapiId,
      toolConsumed: consumedToolBySpeciesIdRef.current[speciesId] ?? false,
    });
    const switched = fightersRef.current[side];
    if (switched) {
      switched.volatiles.knownMoves = member.moveIds
        .map((id) => (id ? movesByIdRef.current[id] : null))
        .filter((m): m is Move => Boolean(m));
      if (baton) {
        switched.stages = baton.stages;
        switched.volatiles.focusEnergy = baton.focusEnergy;
        switched.volatiles.cursed = baton.cursed;
        switched.volatiles.perishCount = baton.perishCount;
      }
      const spikeLogs: string[] = [];
      applySpikesOnSwitchIn(switched, fieldRef.current, spikeLogs);
      if (spikeLogs.length) {
        hpBySpeciesIdRef.current[speciesId] = switched.currentHp;
        setFieldHp({
          a: fightersRef.current.a?.currentHp ?? 0,
          b: fightersRef.current.b?.currentHp ?? 0,
        });
        void playLog(spikeLogs);
      }
    }
    markSeenOnField(speciesId);
    bumpFighters();
  };

  const runResolve = async (nextA: BattleAction, nextB: BattleAction) => {
    const fighterA = fightersRef.current.a;
    const fighterB = fightersRef.current.b;
    if (!fighterA || !fighterB || !lineup) {
      setPickPhase("a");
      return;
    }

    let liveActiveA = activeIndexA;
    let liveActiveB = activeIndexB;

    setActionA(null);
    setActionB(null);
    actionARef.current = null;
    setMenu("root");
    // 交代・行動ログのあいだは「ため」「反動」を出さない
    setHideDeferredBadges(true);
    // Freeze badges at pre-turn status so resolveTurn mutations are not visible yet.
    setStatusDisplay({
      a: fightersRef.current.a?.status ?? null,
      b: fightersRef.current.b?.status ?? null,
      confusionA: fightersRef.current.a?.volatiles.confusionTurns ?? 0,
      confusionB: fightersRef.current.b?.volatiles.confusionTurns ?? 0,
    });
    bumpFighters();

    if (nextA.type === "switch") {
      persistFighterHp();
      switchActive("a", nextA.index);
      liveActiveA = nextA.index;
      syncFighterFromActive("a", nextA.index);
      setFieldHp({
        a: fightersRef.current.a?.currentHp ?? 0,
        b: fightersRef.current.b?.currentHp ?? 0,
      });
      await playLog(["サイドAは　ポケモンを　入れ替えた！"]);
      bumpFighters();
    }
    if (nextB.type === "switch") {
      persistFighterHp();
      switchActive("b", nextB.index);
      liveActiveB = nextB.index;
      syncFighterFromActive("b", nextB.index);
      setFieldHp({
        a: fightersRef.current.a?.currentHp ?? 0,
        b: fightersRef.current.b?.currentHp ?? 0,
      });
      await playLog(["サイドBは　ポケモンを　入れ替えた！"]);
      bumpFighters();
    }

    const result = resolveTurnSteps({
      fighterA: fightersRef.current.a!,
      fighterB: fightersRef.current.b!,
      actionA: nextA,
      actionB: nextB,
      field: fieldRef.current,
      rulesGeneration,
    });

    for (const step of result.steps) {
      const stepLogs = [...step.logs];
      if (step.ppSpent) {
        const leppa = spendPp(step.ppSpent.speciesId, step.ppSpent.moveId);
        if (leppa.log) stepLogs.push(leppa.log);
      }
      // Apply this beat's HP with its logs so bars drop in attack order.
      // Status badges update AFTER the matching log (see below).
      // (Berries: ailment beat then cure beat — badge follows each log.)
      if (step.hpSnapshot) {
        setFieldHp({ a: step.hpSnapshot.a, b: step.hpSnapshot.b });
        persistSnapshotHp(step.hpSnapshot);
      }
      // Persist consumed berries so switch-in does not restore the item.
      for (const side of ["a", "b"] as const) {
        const f = fightersRef.current[side];
        if (f?.heldTool?.consumed) {
          consumedToolBySpeciesIdRef.current[f.speciesId] = true;
        }
      }
      await sleep(0);
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      });
      if (stepLogs.length > 0) {
        await playLog(stepLogs);
      } else {
        await sleep(420);
      }
      // Reveal status / confusion only after the effect lines have played.
      if (step.statusSnapshot) {
        setStatusDisplay(step.statusSnapshot);
      }
      bumpFighters();
      if (step.forceSwitchSide) {
        const side = step.forceSwitchSide;
        const ids = side === "a" ? lineup.a : lineup.b;
        const active = side === "a" ? liveActiveA : liveActiveB;
        const bench = ids
          .map((id, index) => ({ id, index }))
          .filter(
            ({ id, index }) =>
              index !== active && (hpBySpeciesIdRef.current[id] ?? 0) > 0,
          );
        if (bench.length === 0) {
          await playLog([
            "しかし　交代できる　ポケモンが　いない！",
          ]);
        } else {
          const pick = bench[Math.floor(Math.random() * bench.length)]!;
          persistFighterHp();
          switchActive(side, pick.index);
          if (side === "a") liveActiveA = pick.index;
          else liveActiveB = pick.index;
          syncFighterFromActive(side, pick.index);
          setFieldHp({
            a: fightersRef.current.a?.currentHp ?? 0,
            b: fightersRef.current.b?.currentHp ?? 0,
          });
          const member = resolveMember(side, pick.id);
          await playLog([
            `${member?.nameJa ?? "ポケモン"}が　飛び出した！`,
          ]);
          bumpFighters();
        }
      }
    }

    persistFighterHp();
    // 交代・行動演出のあと、溜め／反動中ならバッジを表示
    setStatusDisplay(null);
    setHideDeferredBadges(false);
    bumpFighters();

    if (result.ran) {
      goMenu();
      return;
    }

    if (result.faintedA || result.faintedB) {
      const benchFor = (side: PartySide) => {
        const ids = side === "a" ? lineup.a : lineup.b;
        const active = side === "a" ? liveActiveA : liveActiveB;
        return ids
          .map((id, index) => ({ id, index }))
          .filter(
            ({ id, index }) =>
              index !== active && (hpBySpeciesIdRef.current[id] ?? 0) > 0,
          );
      };

      const needA = result.faintedA;
      const needB = result.faintedB;
      const wipedA = needA && benchFor("a").length === 0;
      const wipedB = needB && benchFor("b").length === 0;

      // じばく／だいばくはつなどで相打ちでも、手持ちが残っていれば交代へ
      if (wipedA && wipedB) {
        await playLog(["相打ちだ！　メニューへ戻ります。"]);
        goMenu();
        return;
      }
      if (wipedA) {
        await playLog(["サイドAの　ポケモンが　全滅した！"]);
        goMenu();
        return;
      }
      if (wipedB) {
        await playLog(["サイドBの　ポケモンが　全滅した！"]);
        goMenu();
        return;
      }

      const switchOrder: PartySide[] = [];
      if (needA) switchOrder.push("a");
      if (needB) switchOrder.push("b");
      const first = switchOrder[0]!;
      pendingMustSwitchSideRef.current = switchOrder[1] ?? null;

      const switchPrompt =
        isCpu && first === "b"
          ? "CPUが　次のポケモンを　選んでいます…"
          : `${first === "a" ? "サイドA" : "サイドB"}は　次のポケモンを　選んでください。`;
      await playLog(
        needA && needB
          ? ["おたがいの　ポケモンが　たおれた！", switchPrompt]
          : [switchPrompt],
      );
      setMustSwitchSide(first);
      setPickPhase(first);
      setMenu(isCpu && first === "b" ? "root" : "party");
      return;
    }

    await playLog(["次のターン。サイドAから行動を選んでください。"]);
    setPickPhase("a");
  };

  const lockAction = (action: BattleAction) => {
    if (logPlaying) return;
    if (mustSwitchSide) {
      if (action.type !== "switch") return;
      const switchingSide = mustSwitchSide;
      const speciesId =
        (switchingSide === "a" ? lineup?.a : lineup?.b)?.[action.index];
      if (speciesId && (hpBySpeciesIdRef.current[speciesId] ?? 0) <= 0) {
        setLog(["そのポケモンは　ひんしだ！"]);
        return;
      }
      const pending = pendingMustSwitchSideRef.current;
      pendingMustSwitchSideRef.current = null;
      // Clear before async work so CPU auto-switch effect cannot re-enter.
      setMustSwitchSide(null);

      persistFighterHp();
      switchActive(switchingSide, action.index);
      syncFighterFromActive(switchingSide, action.index);
      setFieldHp({
        a: fightersRef.current.a?.currentHp ?? 0,
        b: fightersRef.current.b?.currentHp ?? 0,
      });
      const member = resolveMember(switchingSide, speciesId);
      if (pending) {
        void playLog([
          `ゆけ！　${member?.nameJa ?? "ポケモン"}！`,
          isCpu && pending === "b"
            ? "CPUが　次のポケモンを　選んでいます…"
            : `${pending === "a" ? "サイドA" : "サイドB"}は　次のポケモンを　選んでください。`,
        ]).then(() => {
          setMustSwitchSide(pending);
          setPickPhase(pending);
          setMenu(isCpu && pending === "b" ? "root" : "party");
          setActionA(null);
          setActionB(null);
        });
        return;
      }
      void playLog([
        `ゆけ！　${member?.nameJa ?? "ポケモン"}！`,
        "次のターン。サイドAから行動を選んでください。",
      ]).then(() => {
        setMenu("root");
        setPickPhase("a");
        setActionA(null);
        setActionB(null);
      });
      return;
    }

    if (pickPhase === "a") {
      if (
        action.type === "switch" &&
        fightersRef.current.a?.volatiles.cannotEscape
      ) {
        setLog(["逃げられない！"]);
        return;
      }
      actionARef.current = action;
      setActionA(action);
      setMenu("root");
      if (isLocalBoth) {
        setPickPhase("b");
        setLog(["サイドBの行動を選んでください。"]);
      } else if (isCpu) {
        if (action.type === "move") {
          const foe = fightersRef.current.a;
          if (foe) {
            cpuKnowledgeRef.current = noteRevealedMove(
              cpuKnowledgeRef.current,
              foe.species.id,
              action.move.id,
            );
          }
        }
        const cpuAction = pickCpuBattleAction();
        setActionB(cpuAction);
        setLog(["CPUが行動を選んでいます…"]);
        void runResolve(action, cpuAction);
      } else {
        setLog([
          "AI対戦の自動行動は未実装です。local_both で遊んでください。",
        ]);
        actionARef.current = null;
        setActionA(null);
        setPickPhase("a");
      }
      return;
    }

    if (pickPhase === "b") {
      if (
        action.type === "switch" &&
        fightersRef.current.b?.volatiles.cannotEscape
      ) {
        setLog(["逃げられない！"]);
        return;
      }
      setActionB(action);
      setMenu("root");
      const pendingA = actionARef.current;
      if (pendingA) {
        void runResolve(pendingA, action);
      }
      setPickPhase("a");
    }
  };

  // CPU auto-pick when forced to switch after faint
  useEffect(() => {
    if (!isCpu || mustSwitchSide !== "b" || logPlaying || loading) return;
    const foe = fightersRef.current.a;
    if (!foe) return;
    const options = cpuSwitchOptions("b");
    const action = chooseCpuForcedSwitch({
      switchOptions: options,
      foe,
    });
    if (action.type !== "switch") return;
    const t = setTimeout(() => {
      lockAction(action);
    }, 400);
    return () => clearTimeout(t);
    // Intentionally omit fighterTick: bumping fighters during switch must not
    // re-schedule CPU forced switch while mustSwitchSide is still "b".
    // eslint-disable-next-line react-hooks/exhaustive-deps -- auto when B must switch
  }, [isCpu, mustSwitchSide, logPlaying, loading]);

  // Auto-continue charge / thrash locks
  useEffect(() => {
    if (logPlaying || mustSwitchSide || loading || menu !== "root") return;
    const fighter =
      controllingSide === "a" ? fightersRef.current.a : fightersRef.current.b;
    const forced = getForcedMove(fighter);
    if (!forced) return;
    const t = setTimeout(() => {
      lockAction({ type: "move", move: forced });
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- lock when phase/fighter state ready
  }, [pickPhase, logPlaying, mustSwitchSide, loading, menu, controllingSide]);

  const onFight = () => {
    if (mustSwitchSide || logPlaying) return;
    if (isCpu && mustSwitchSide === "b") return;
    if (getForcedMove(fightersRef.current[controllingSide])) return;
    setMenu("fight");
  };

  const onParty = () => {
    if (logPlaying) return;
    if (isCpu && mustSwitchSide === "b") return;
    if (
      !mustSwitchSide &&
      getForcedMove(fightersRef.current[controllingSide])
    ) {
      return;
    }
    setMenu("party");
  };

  const onRun = () => {
    if (mustSwitchSide || logPlaying) return;
    if (getForcedMove(fightersRef.current[controllingSide])) return;
    setSurrenderOpen(true);
  };

  const confirmSurrender = () => {
    setSurrenderOpen(false);
    // Skip resolve; go straight to destination picker
    openEndDestination();
  };

  const onSwitchTo = (index: number) => {
    if (logPlaying) return;
    if (index === controllingActiveIndex && !mustSwitchSide) {
      setLog(["すでに　場に　出ている！"]);
      return;
    }
    const speciesId = controllingLineup[index];
    if (speciesId && (hpBySpeciesIdRef.current[speciesId] ?? 0) <= 0) {
      setLog(["そのポケモンは　ひんしで　戦えない！"]);
      return;
    }
    lockAction({ type: "switch", index });
  };

  const onSelectMove = (move: Move) => {
    if (!controllingMember || mustSwitchSide || logPlaying) return;
    const fighter = fightersRef.current[controllingSide];
    if (move.pokeapi_id !== 165) {
      if (fighter?.volatiles.disableMoveId === move.id) {
        setLog([`${move.name_ja}は　かなしばりで　出せない！`]);
        return;
      }
      const key = ppKey(controllingMember.speciesId, move.id);
      const remaining = ppRemaining[key] ?? move.pp ?? 0;
      if (remaining <= 0) {
        setLog([`${move.name_ja}の　PPが　ない！`]);
        return;
      }
    }
    // PP is spent only when the move actually executes (after sleep/confusion checks)
    lockAction({ type: "move", move });
  };

  const struggleMove = getMoveByPokeapiId(165) ?? null;
  const hasUsableEquippedMove = equippedMoves.some((move) => {
    if (!move || !controllingMember) return false;
    const fighter = fightersRef.current[controllingSide];
    if (fighter?.volatiles.disableMoveId === move.id) return false;
    const key = ppKey(controllingMember.speciesId, move.id);
    const remaining = ppRemaining[key] ?? move.pp ?? 0;
    return remaining > 0;
  });
  const showStruggle = Boolean(struggleMove) && !hasUsableEquippedMove;

  const fighterA = fightersRef.current.a;
  const fighterB = fightersRef.current.b;
  void fighterTick;
  void seenOnFieldTick;

  const opponentSide: PartySide = controllingSide === "a" ? "b" : "a";
  const opponentPartyMembers = getSide(opponentSide)?.members ?? [];
  const opponentPartyLabel =
    isCpu && opponentSide === "b"
      ? "CPUの手持ち"
      : `サイド${opponentSide === "a" ? "A" : "B"}の手持ち`;

  if (!lineup && !loading) {
    return (
      <MatchScreenBackground source={matchBackground}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.panel}>
            <Text style={styles.title}>対戦</Text>
            <Text style={styles.errorText}>
              {errorMessage ?? "対戦データがありません。"}
            </Text>
            <Pressable
              onPress={() => goToDestination("start")}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>スタートへ戻る</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </MatchScreenBackground>
    );
  }

  return (
    <MatchScreenBackground source={matchBackground}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentInner}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.panel}>
            <Text style={styles.kicker}>対戦</Text>
            <Text style={styles.title}>バトル</Text>
            <Text style={styles.lead}>
              {mustSwitchSide
                ? `${mustSwitchSide === "a" ? "サイドA" : "サイドB"}の交代を選んでください。`
                : `行動選択: ${sideLabel}`}
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
                <View style={styles.field}>
                  <FieldFighter
                    member={memberB}
                    species={activeIdB ? speciesById[activeIdB] ?? null : null}
                    align="opponent"
                    emptyLabel={
                      isLocalBoth
                        ? "相手の場が空です"
                        : isCpu
                          ? "CPUの場が空です"
                          : "AIの場は準備中です"
                    }
                    currentHp={fieldHp?.b ?? fighterB?.currentHp}
                    maxHp={fighterB?.maxHp}
                    hpDisplay={foeHpAsPercent ? "percent" : "absolute"}
                    badges={statusBadges(fighterB, fieldHp?.b, {
                      hideDeferred: hideDeferredBadges,
                      ...(statusDisplay
                        ? {
                            statusOverride: statusDisplay.b,
                            confusionOverride: statusDisplay.confusionB,
                          }
                        : {}),
                    })}
                  />
                  <View style={styles.fieldDivider} />
                  <FieldFighter
                    member={memberA}
                    species={activeIdA ? speciesById[activeIdA] ?? null : null}
                    align="own"
                    emptyLabel="自分の場が空です"
                    currentHp={fieldHp?.a ?? fighterA?.currentHp}
                    maxHp={fighterA?.maxHp}
                    badges={statusBadges(fighterA, fieldHp?.a, {
                      hideDeferred: hideDeferredBadges,
                      ...(statusDisplay
                        ? {
                            statusOverride: statusDisplay.a,
                            confusionOverride: statusDisplay.confusionA,
                          }
                        : {}),
                    })}
                  />
                </View>

                <View style={styles.statusButtonRow}>
                  <Pressable
                    onPress={() => setStatusOpen(true)}
                    style={styles.statusButton}
                  >
                    <Text style={styles.statusButtonText}>能力・場を確認</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setFoePartyOpen(true)}
                    style={styles.statusButton}
                  >
                    <Text style={styles.statusButtonText}>相手の手持ち</Text>
                  </Pressable>
                </View>

                <View style={styles.logBox}>
                  {logLines.map((line, index) => (
                    <Text key={`${index}-${line}`} style={styles.logLine}>
                      {line}
                    </Text>
                  ))}
                </View>

                <View
                  style={[
                    styles.commandBox,
                    controllingSide === "a"
                      ? styles.commandBoxSideA
                      : styles.commandBoxSideB,
                  ]}
                >
                  {menu === "root" ? (
                    <>
                      <Text style={styles.commandHint}>
                        {logPlaying
                          ? "…"
                          : mustSwitchSide
                            ? "ポケモンを選んでください"
                            : fightersRef.current[controllingSide]?.volatiles
                                  .recharge
                              ? `${sideLabel}は　反動で　動けない…`
                              : getForcedMove(
                                    fightersRef.current[controllingSide],
                                  )
                                ? `${sideLabel}は　技の効果で　行動中…`
                                : `${sideLabel}のコマンド`}
                      </Text>
                      <View style={styles.commandGrid}>
                        {!mustSwitchSide && !logPlaying ? (
                          <Pressable
                            onPress={onFight}
                            style={({ pressed }) => [
                              styles.commandButton,
                              pressed && styles.commandPressed,
                            ]}
                          >
                            <Text style={styles.commandButtonText}>たたかう</Text>
                          </Pressable>
                        ) : null}
                        {!logPlaying ? (
                          <Pressable
                            onPress={onParty}
                            style={({ pressed }) => [
                              styles.commandButton,
                              pressed && styles.commandPressed,
                            ]}
                          >
                            <Text style={styles.commandButtonText}>ポケモン</Text>
                          </Pressable>
                        ) : null}
                        {!mustSwitchSide && !logPlaying ? (
                          <Pressable
                            onPress={onRun}
                            style={({ pressed }) => [
                              styles.commandButton,
                              styles.commandButtonDanger,
                              pressed && styles.commandPressed,
                            ]}
                          >
                            <Text style={styles.commandButtonText}>にげる</Text>
                          </Pressable>
                        ) : null}
                      </View>
                    </>
                  ) : null}

                  {menu === "fight" ? (
                    <>
                      <Text style={styles.commandHint}>
                        {sideLabel}の技を選んでください
                      </Text>
                      {movesLoading ? (
                        <ActivityIndicator color="#8fd4ad" />
                      ) : null}
                      {!movesLoading &&
                      equippedMoves.every((move) => move == null) ? (
                        <Text style={styles.commandSubHint}>
                          セットされた技がありません。編成で技を設定してください。
                        </Text>
                      ) : null}
                      <View style={styles.moveList}>
                        {equippedMoves.map((move, index) => {
                          if (!move || !controllingMember) {
                            return (
                              <View
                                key={`empty-${index}`}
                                style={styles.moveSlotEmpty}
                              >
                                <Text style={styles.moveSlotEmptyText}>
                                  — 空き —
                                </Text>
                              </View>
                            );
                          }
                          const typeJa = typeNameJa(move.type_id);
                          const typeColor = TYPE_COLORS[typeJa] ?? "#8a8172";
                          const key = ppKey(controllingMember.speciesId, move.id);
                          const remaining = ppRemaining[key] ?? move.pp ?? 0;
                          const maxPp = move.pp ?? 0;
                          const disabled =
                            fightersRef.current[controllingSide]?.volatiles
                              .disableMoveId === move.id;
                          const outOfPp = remaining <= 0 || disabled;
                          return (
                            <View
                              key={move.id}
                              style={[
                                styles.moveSlot,
                                { borderColor: typeColor },
                                outOfPp && styles.moveSlotDisabled,
                              ]}
                            >
                              <Pressable
                                disabled={outOfPp}
                                onPress={() => onSelectMove(move)}
                                style={styles.moveSlotMain}
                              >
                                <View style={styles.moveSlotTop}>
                                  <View
                                    style={[
                                      styles.typeBadge,
                                      { backgroundColor: typeColor },
                                    ]}
                                  >
                                    <Text style={styles.typeBadgeText}>
                                      {typeJa}
                                    </Text>
                                  </View>
                                  <Text style={styles.moveSlotName}>
                                    {move.name_ja}
                                    {disabled ? "（封印）" : ""}
                                  </Text>
                                  <Text style={styles.moveSlotPp}>
                                    {remaining}/{maxPp}
                                  </Text>
                                </View>
                              </Pressable>
                              <Pressable
                                onPress={() => setDetailMove(move)}
                                style={styles.moveDetailButton}
                              >
                                <Text style={styles.moveDetailButtonText}>
                                  詳細
                                </Text>
                              </Pressable>
                            </View>
                          );
                        })}
                        {showStruggle && struggleMove ? (
                          <View
                            style={[
                              styles.moveSlot,
                              {
                                borderColor:
                                  TYPE_COLORS["ノーマル"] ?? "#8a8172",
                              },
                            ]}
                          >
                            <Pressable
                              onPress={() => onSelectMove(struggleMove)}
                              style={styles.moveSlotMain}
                            >
                              <View style={styles.moveSlotTop}>
                                <View
                                  style={[
                                    styles.typeBadge,
                                    {
                                      backgroundColor:
                                        TYPE_COLORS["ノーマル"] ?? "#8a8172",
                                    },
                                  ]}
                                >
                                  <Text style={styles.typeBadgeText}>
                                    ノーマル
                                  </Text>
                                </View>
                                <Text style={styles.moveSlotName}>
                                  {struggleMove.name_ja}
                                </Text>
                                <Text style={styles.moveSlotPp}>—</Text>
                              </View>
                            </Pressable>
                            <Pressable
                              onPress={() => setDetailMove(struggleMove)}
                              style={styles.moveDetailButton}
                            >
                              <Text style={styles.moveDetailButtonText}>
                                詳細
                              </Text>
                            </Pressable>
                          </View>
                        ) : null}
                      </View>
                      <Pressable
                        onPress={() => setMenu("root")}
                        style={styles.secondaryButton}
                      >
                        <Text style={styles.secondaryButtonText}>戻る</Text>
                      </Pressable>
                    </>
                  ) : null}

                  {menu === "party" ? (
                    <>
                      <Text style={styles.commandHint}>
                        {sideLabel}のポケモン
                      </Text>
                      <View style={styles.partyList}>
                        {controllingLineup.map((speciesId, index) => {
                          const member = resolveMember(controllingSide, speciesId);
                          const species = speciesById[speciesId];
                          const isActive = index === controllingActiveIndex;
                          const hp = hpBySpeciesIdRef.current[speciesId];
                          const maxHp =
                            member && species
                              ? computeMemberBattleStats(
                                  species,
                                  member,
                                  rulesGeneration,
                                  toolsByIdRef.current,
                                ).stats.hp
                              : 0;
                          const fainted = (hp ?? 0) <= 0;
                          return (
                            <Pressable
                              key={speciesId}
                              onPress={() =>
                                setPartyActionTarget({ speciesId, index })
                              }
                              style={[
                                styles.partyRow,
                                isActive && styles.partyRowActive,
                                fainted && styles.partyRowFainted,
                              ]}
                            >
                              <View style={styles.partyRowMain}>
                                <PokemonSprite
                                  uri={species?.sprite_url}
                                  size={40}
                                  style={styles.partySprite}
                                />
                                <View style={styles.partyText}>
                                  <Text
                                    style={styles.partyName}
                                    numberOfLines={1}
                                  >
                                    {member?.nameJa ?? "？"}
                                    {isActive ? "（場）" : ""}
                                    {fainted ? "（ひんし）" : ""}
                                  </Text>
                                  <Text style={styles.partyMeta}>
                                    {member
                                      ? `${formatDexNo(member.dexNo)} ／ Lv${member.level} ／ HP ${hp ?? "—"}/${maxHp || "—"}`
                                      : speciesId}
                                  </Text>
                                </View>
                                <Text style={styles.partyAction}>選択</Text>
                              </View>
                            </Pressable>
                          );
                        })}
                      </View>
                      {!mustSwitchSide ? (
                        <Pressable
                          onPress={() => setMenu("root")}
                          style={styles.secondaryButton}
                        >
                          <Text style={styles.secondaryButtonText}>戻る</Text>
                        </Pressable>
                      ) : null}
                    </>
                  ) : null}
                </View>
              </>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal
        visible={endDestOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setEndDestOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>対戦終了</Text>
            <Text style={styles.modalBody}>どこへ戻りますか？</Text>
            <Pressable
              onPress={() => goToDestination("start")}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>スタート画面</Text>
            </Pressable>
            <Pressable
              onPress={() => goToDestination("party")}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>6体選択画面</Text>
            </Pressable>
            <Pressable
              onPress={() => goToDestination("select")}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>3体選出画面</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={surrenderOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setSurrenderOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>降参しますか？</Text>
            <Text style={styles.modalBody}>
              対戦を終了してメニューへ戻ります。パーティ編成もクリアされます。
            </Text>
            <Pressable onPress={confirmSurrender} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>降参する</Text>
            </Pressable>
            <Pressable
              onPress={() => setSurrenderOpen(false)}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>キャンセル</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={partyActionTarget != null}
        transparent
        animationType="fade"
        onRequestClose={() => setPartyActionTarget(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeaderRow}>
              <Text style={[styles.modalTitle, styles.modalHeaderTitle]}>
                {partyActionMember?.nameJa ?? "ポケモン"}
              </Text>
              <Pressable
                onPress={() => setPartyActionTarget(null)}
                style={styles.modalCloseButton}
                hitSlop={8}
              >
                <Text style={styles.modalCloseButtonText}>❌</Text>
              </Pressable>
            </View>
            <Text style={styles.modalBody}>どうしますか？</Text>
            <Pressable
              onPress={() => {
                if (!partyActionTarget) return;
                // Keep party action open under inspect (same as 選出画面).
                setInspectTarget(partyActionTarget);
              }}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>強さを見る</Text>
            </Pressable>
            <Pressable
              disabled={!partyActionCanSwitch}
              onPress={() => {
                if (!partyActionTarget || !partyActionCanSwitch) return;
                const index = partyActionTarget.index;
                setPartyActionTarget(null);
                onSwitchTo(index);
              }}
              style={[
                styles.primaryButton,
                !partyActionCanSwitch && styles.primaryButtonDisabled,
              ]}
            >
              <Text
                style={[
                  styles.primaryButtonText,
                  !partyActionCanSwitch && styles.primaryButtonTextDisabled,
                ]}
              >
                交代する
              </Text>
            </Pressable>
            {!partyActionCanSwitch ? (
              <Text style={styles.modalBody}>
                {partyActionTarget &&
                (hpBySpeciesIdRef.current[partyActionTarget.speciesId] ?? 0) <=
                  0
                  ? "ひんしのため交代できません。"
                  : "すでに場に出ているため交代できません。"}
              </Text>
            ) : null}
          </View>
        </View>
      </Modal>

      <Modal
        visible={inspectTarget != null}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setDetailMove(null);
          setInspectTarget(null);
        }}
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
                  onPress={() => {
                    setDetailMove(null);
                    setInspectTarget(null);
                  }}
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
                    {inspectIsActive ? " ／ 場に出ている" : ""}
                    {inspectFighter?.volatiles.transformed
                      ? " ／ へんしん中"
                      : ""}
                  </Text>
                  {(inspectFighter?.species ?? inspectSpecies) ? (
                    <View style={styles.inspectTypeRow}>
                      {getTypes(
                        inspectFighter?.species ?? inspectSpecies!,
                      ).map((typeJa) => (
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
                <ActivityIndicator color="#8fd4ad" />
              ) : null}
              {!inspectMovesLoading &&
              inspectMoves.every((move) => move == null) ? (
                <Text style={styles.modalBody}>技がセットされていません。</Text>
              ) : null}
              <View style={styles.inspectMoveList}>
                {inspectMoves.map((move, index) => {
                  if (!move || !inspectMember) {
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
                  const key = ppKey(inspectMember.speciesId, move.id);
                  const remaining = ppRemaining[key] ?? move.pp ?? 0;
                  const maxPp = move.pp ?? 0;
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
                            {remaining}/{maxPp}
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
                  {GEN1_STAT_KEYS.map((key) => {
                    const currentHp =
                      inspectTarget != null
                        ? hpBySpeciesIdRef.current[inspectTarget.speciesId]
                        : undefined;
                    const value =
                      key === "hp" && currentHp != null
                        ? `${currentHp}/${inspectStats.hp}`
                        : String(inspectStats[key]);
                    return (
                      <View key={key} style={styles.inspectStatRow}>
                        <Text style={styles.inspectStatLabel}>
                          {GEN1_STAT_LABELS[key]}
                        </Text>
                        <Text style={styles.inspectStatValue}>{value}</Text>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <Text style={styles.modalBody}>実数値が計算できません。</Text>
              )}

              <Text style={styles.inspectSection}>
                特性・性格{rulesGeneration >= 2 ? "・持ち物" : ""}
              </Text>
              <Text style={styles.modalBody}>特性：—（将来対応）</Text>
              <Text style={styles.modalBody}>性格：—（将来対応）</Text>
              {rulesGeneration >= 2 ? (
                <Text style={styles.modalBody}>
                  持ち物：{inspectToolName}
                </Text>
              ) : null}

              <Pressable
                onPress={() => {
                  setDetailMove(null);
                  setInspectTarget(null);
                }}
                style={styles.primaryButton}
              >
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

      <Modal
        visible={foePartyOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setFoePartyOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.detailSheet}>
            <Text style={styles.modalTitle}>{opponentPartyLabel}</Text>
            <Text style={styles.foePartyHint}>
              場に出たポケモンは強調表示されます
            </Text>
            <View style={styles.foePartyList}>
              {opponentPartyMembers.length === 0 ? (
                <Text style={styles.modalBody}>手持ちがありません</Text>
              ) : (
                opponentPartyMembers.map((member, index) => {
                  const species = speciesById[member.speciesId];
                  const seen = seenOnFieldRef.current.has(member.speciesId);
                  const onField =
                    (opponentSide === "a"
                      ? fighterA?.speciesId
                      : fighterB?.speciesId) === member.speciesId;
                  const hp = hpBySpeciesIdRef.current[member.speciesId];
                  const maxHp = species
                    ? computeMemberBattleStats(
                        species,
                        member,
                        rulesGeneration,
                        toolsByIdRef.current,
                      ).stats.hp
                    : 0;
                  const fainted = hp != null && hp <= 0;
                  return (
                    <View
                      key={member.speciesId}
                      style={[
                        styles.foePartyRow,
                        seen && styles.foePartyRowSeen,
                      ]}
                    >
                      <PokemonSprite
                        uri={species?.sprite_url}
                        size={40}
                        style={styles.partySprite}
                      />
                      <View style={styles.partyText}>
                        <Text style={styles.foePartyName} numberOfLines={1}>
                          {index + 1}. {member.nameJa}
                          {onField ? "（場）" : ""}
                          {fainted ? "（ひんし）" : ""}
                          {seen ? "（確認済）" : ""}
                        </Text>
                        <Text style={styles.partyMeta}>
                          {formatDexNo(member.dexNo)} ／ Lv{member.level}
                          {seen
                            ? foeHpAsPercent
                              ? hp != null && maxHp > 0
                                ? ` ／ HP ${formatChampionsHpPercentLabel(hp, maxHp)}`
                                : ""
                              : ` ／ HP ${hp ?? "—"}/${maxHp || "—"}`
                            : ""}
                        </Text>
                      </View>
                    </View>
                  );
                })
              )}
            </View>
            <Pressable
              onPress={() => setFoePartyOpen(false)}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>閉じる</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={statusOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setStatusOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.detailSheet}>
            <Text style={styles.modalTitle}>能力変化・場の状態</Text>
            {(["b", "a"] as PartySide[]).map((side) => {
              const f = fightersRef.current[side];
              const label = side === "a" ? "サイドA" : "サイドB";
              return (
                <View key={side} style={styles.statusBlock}>
                  <Text style={styles.statusBlockTitle}>
                    {label}：{f?.member.nameJa ?? "—"}
                  </Text>
                  {f ? (
                    <>
                      <Text style={styles.detailStat}>
                        こうげき {formatStage(f.stages.attack)} ／ ぼうぎょ{" "}
                        {formatStage(f.stages.defense)}
                      </Text>
                      {rulesGeneration >= 2 ? (
                        <>
                          <Text style={styles.detailStat}>
                            とくこう {formatStage(f.stages.sp_attack)} ／ とくぼう{" "}
                            {formatStage(f.stages.sp_defense)}
                          </Text>
                          <Text style={styles.detailStat}>
                            すばやさ {formatStage(f.stages.speed)}
                          </Text>
                        </>
                      ) : (
                        <Text style={styles.detailStat}>
                          とくしゅ {formatStage(f.stages.special)} ／ すばやさ{" "}
                          {formatStage(f.stages.speed)}
                        </Text>
                      )}
                      <Text style={styles.detailStat}>
                        めいちゅう {formatStage(f.stages.accuracy)} ／ かいひ{" "}
                        {formatStage(f.stages.evasion)}
                      </Text>
                      <Text style={styles.detailStat}>
                        状態{" "}
                        {statusBadges(f).length > 0
                          ? statusBadges(f).join("・")
                          : "なし"}
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.modalBody}>場にいません</Text>
                  )}
                  {sideFieldSummary(fieldRef.current, side).map((line) => (
                    <Text key={line} style={styles.detailStat}>
                      {line}
                    </Text>
                  ))}
                </View>
              );
            })}
            {fieldRef.current.weather ? (
              <Text style={styles.detailStat}>
                天気：
                {fieldRef.current.weather.id === "rain"
                  ? "あめ"
                  : fieldRef.current.weather.id === "sun"
                    ? "はれ"
                    : fieldRef.current.weather.id === "sand"
                      ? "すなあらし"
                      : fieldRef.current.weather.id}
                {fieldRef.current.weather.turnsLeft != null
                  ? `（残り${fieldRef.current.weather.turnsLeft}）`
                  : ""}
              </Text>
            ) : (
              <Text style={styles.detailStat}>天気：なし</Text>
            )}
            {fieldRef.current.terrain ? (
              <Text style={styles.detailStat}>
                フィールド：{fieldRef.current.terrain.id}（残り
                {fieldRef.current.terrain.turnsLeft}）
              </Text>
            ) : (
              <Text style={styles.detailStat}>フィールド：なし（将来対応）</Text>
            )}
            <Pressable
              onPress={() => setStatusOpen(false)}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>閉じる</Text>
            </Pressable>
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
    flex: 1,
    maxWidth: 720,
    width: "100%",
    alignSelf: "center",
  },
  contentInner: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
    flexGrow: 1,
  },
  panel: {
    backgroundColor: "rgba(255, 252, 245, 0.94)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
  },
  kicker: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: "#6b4f2a",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1d1a16",
  },
  lead: {
    fontSize: 14,
    lineHeight: 20,
    color: "#5c564c",
  },
  stateBox: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 24,
  },
  stateText: { fontSize: 14, color: "#5c564c" },
  errorText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#a12b2b",
    fontWeight: "600",
  },
  field: {
    backgroundColor: "#e8f4ec",
    borderRadius: 14,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: "#c5ddce",
  },
  fieldDivider: {
    height: 1,
    backgroundColor: "#c5ddce",
  },
  statusButtonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statusButton: {
    alignSelf: "flex-start",
    backgroundColor: "#fffdf8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  statusButtonText: {
    color: "#1d1a16",
    fontSize: 13,
    fontWeight: "800",
  },
  foePartyHint: {
    fontSize: 12,
    fontWeight: "600",
    color: "#5c564c",
    marginBottom: 4,
  },
  foePartyList: {
    gap: 8,
    marginBottom: 8,
  },
  foePartyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#e5dccb",
    borderRadius: 10,
    backgroundColor: "#fffdf8",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  foePartyRowSeen: {
    borderColor: "#1f6b4a",
    borderWidth: 2,
    backgroundColor: "#eef7f1",
  },
  foePartyName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1d1a16",
  },
  statusBlock: {
    gap: 4,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee6d8",
  },
  statusBlockTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1d1a16",
    marginBottom: 2,
  },
  fighter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 88,
  },
  fighterOpponent: {
    flexDirection: "row-reverse",
  },
  fighterOwn: {},
  fighterInfo: {
    flex: 1,
    gap: 4,
  },
  fighterName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1d1a16",
    flexShrink: 1,
  },
  fighterNameRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
  },
  statusRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  statusBadge: {
    backgroundColor: "#6b4f2a",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  statusBadgeText: {
    color: "#fffdf8",
    fontSize: 10,
    fontWeight: "800",
  },
  fighterMeta: {
    fontSize: 12,
    fontWeight: "600",
    color: "#5c564c",
  },
  hpTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d5e5db",
    overflow: "hidden",
    marginTop: 4,
  },
  hpFill: {
    height: "100%",
  },
  hpLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1f6b4a",
  },
  fighterSprite: {
    backgroundColor: "transparent",
  },
  fighterEmpty: {
    flex: 1,
    textAlign: "center",
    color: "#8a8172",
    fontWeight: "600",
  },
  logBox: {
    backgroundColor: "#fffdf8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    padding: 12,
    gap: 4,
    minHeight: 72,
  },
  logLine: {
    fontSize: 13,
    lineHeight: 18,
    color: "#1d1a16",
    fontWeight: "600",
  },
  commandBox: {
    borderRadius: 14,
    padding: 14,
    gap: 10,
    borderWidth: 2,
  },
  commandBoxSideA: {
    backgroundColor: "#14352c",
    borderColor: "#2f9e5b",
  },
  commandBoxSideB: {
    backgroundColor: "#2c1830",
    borderColor: "#9b6bb8",
  },
  commandHint: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },
  commandSubHint: {
    color: "#cfc7ba",
    fontSize: 12,
    lineHeight: 17,
  },
  commandGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  commandButton: {
    flexGrow: 1,
    minWidth: "30%",
    backgroundColor: "#1f6b4a",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  commandButtonDanger: {
    backgroundColor: "#8a3a2a",
  },
  commandPressed: {
    opacity: 0.85,
  },
  commandButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
  moveList: {
    gap: 8,
  },
  moveSlot: {
    flexDirection: "row",
    alignItems: "stretch",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#2a2620",
    overflow: "hidden",
  },
  moveSlotDisabled: {
    opacity: 0.45,
  },
  moveSlotMain: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 4,
  },
  moveSlotTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  moveSlotName: {
    flex: 1,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
  moveSlotPp: {
    color: "#cfc7ba",
    fontSize: 12,
    fontWeight: "700",
  },
  moveDetailButton: {
    justifyContent: "center",
    paddingHorizontal: 12,
    backgroundColor: "#3a342c",
    borderLeftWidth: 1,
    borderLeftColor: "#4a433a",
  },
  moveDetailButtonText: {
    color: "#8fd4ad",
    fontSize: 12,
    fontWeight: "800",
  },
  moveSlotEmpty: {
    borderWidth: 1,
    borderColor: "#4a433a",
    borderStyle: "dashed",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  moveSlotEmptyText: {
    color: "#8a8172",
    fontSize: 13,
    fontWeight: "600",
  },
  typeBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  typeBadgeText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "800",
  },
  partyList: {
    gap: 8,
  },
  partyRow: {
    backgroundColor: "#2a2620",
    borderRadius: 10,
    padding: 10,
    gap: 8,
  },
  partyRowMain: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  partyRowActive: {
    borderWidth: 1,
    borderColor: "#1f6b4a",
  },
  partyRowFainted: {
    opacity: 0.45,
  },
  partySprite: {
    backgroundColor: "transparent",
  },
  partyText: {
    flex: 1,
    gap: 2,
  },
  modalHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  modalHeaderTitle: {
    flex: 1,
    paddingRight: 4,
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#efe8dc",
  },
  modalCloseButtonText: {
    fontSize: 16,
    lineHeight: 20,
  },
  inspectScroll: {
    maxHeight: 520,
  },
  inspectScrollInner: {
    gap: 10,
    paddingBottom: 4,
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
    marginTop: 6,
    fontSize: 14,
    fontWeight: "800",
    color: "#1d1a16",
  },
  inspectMoveList: {
    gap: 8,
  },
  inspectStatList: {
    gap: 6,
  },
  inspectStatRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f3efe6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inspectStatLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#5c564c",
  },
  inspectStatValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1d1a16",
  },
  partyName: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },
  partyMeta: {
    color: "#cfc7ba",
    fontSize: 11,
    fontWeight: "600",
  },
  partyAction: {
    color: "#8fd4ad",
    fontSize: 12,
    fontWeight: "800",
  },
  primaryButton: {
    backgroundColor: "#1f6b4a",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonDisabled: {
    backgroundColor: "#9aa89f",
    opacity: 0.7,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
  primaryButtonTextDisabled: {
    color: "#e8eee9",
  },
  secondaryButton: {
    backgroundColor: "#fffdf8",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd4c4",
  },
  secondaryButtonText: {
    color: "#1d1a16",
    fontSize: 14,
    fontWeight: "800",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 24,
  },
  modalSheet: {
    backgroundColor: "#fffdf8",
    borderRadius: 16,
    padding: 20,
    gap: 12,
    width: "50%",
    maxWidth: 320,
    alignSelf: "center",
  },
  detailSheet: {
    backgroundColor: "#fffdf8",
    borderRadius: 16,
    padding: 20,
    gap: 10,
    width: "70%",
    maxWidth: 420,
    alignSelf: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1d1a16",
  },
  modalBody: {
    fontSize: 14,
    lineHeight: 20,
    color: "#5c564c",
  },
  detailStat: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1d1a16",
  },
});
