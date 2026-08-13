import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import type { RestrictionMode } from "../match-setup/types";
import type { Generation } from "../match-setup/types";
import {
  formatDexNo,
  getDisplayBaseStats,
  getSelectableSpeciesFromList,
  getTypes,
  PAGE_SIZE,
  PARTY_SIZE,
  TYPE_COLORS,
} from "../pokemon/catalog";
import { fetchPokemonSpecies } from "../pokemon/repository";
import type { PokemonSpecies } from "../pokemon/types";
import { PokemonSprite } from "../pokemon/PokemonSprite";

const grassland = require("../../assets/title/title-grassland.png");

type MatchParams = {
  rulesGeneration?: string;
  pokemonGeneration?: string;
  moveGeneration?: string;
  restrictionMode?: RestrictionMode;
  opponentType?: string;
  visibilityMode?: string;
};

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statBarTrack}>
        <View
          style={[
            styles.statBarFill,
            { width: `${Math.min(100, (value / 160) * 100)}%` },
          ]}
        />
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function PokemonCard({
  pokemon,
  selected,
  disabled,
  onPress,
}: {
  pokemon: PokemonSpecies;
  selected: boolean;
  disabled: boolean;
  onPress: () => void;
}) {
  const types = getTypes(pokemon);
  const stats = getDisplayBaseStats(pokemon);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      disabled={disabled && !selected}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        disabled && !selected && styles.cardDisabled,
        pressed && !(disabled && !selected) && styles.cardPressed,
      ]}
    >
      <View style={styles.spriteColumn}>
        <PokemonSprite uri={pokemon.sprite_url} />
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          <Text style={styles.dexNo}>{formatDexNo(pokemon.dex_no)}</Text>
          <Text style={styles.name}>{pokemon.name_ja}</Text>
        </View>
        <View style={styles.typeRow}>
          {types.map((type) => (
            <View
              key={type}
              style={[
                styles.typeBadge,
                { backgroundColor: TYPE_COLORS[type] ?? "#888" },
              ]}
            >
              <Text style={styles.typeText}>{type}</Text>
            </View>
          ))}
        </View>
        <StatRow label="HP" value={stats.hp} />
        <StatRow label="こうげき" value={stats.attack} />
        <StatRow label="ぼうぎょ" value={stats.defense} />
        <StatRow label="とくしゅ" value={stats.special} />
        <StatRow label="すばやさ" value={stats.speed} />
      </View>
    </Pressable>
  );
}

function PagePager({
  page,
  totalPages,
  onPrev,
  onNext,
}: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <View style={styles.pager}>
      <Pressable
        accessibilityRole="button"
        disabled={page === 0}
        onPress={onPrev}
        style={({ pressed }) => [
          styles.pageButton,
          page === 0 && styles.pageButtonDisabled,
          pressed && page > 0 && styles.pressed,
        ]}
      >
        <Text style={styles.pageButtonText}>前へ</Text>
      </Pressable>
      <Text style={styles.pageLabel}>
        {page + 1} / {totalPages}（1ページ{PAGE_SIZE}体）
      </Text>
      <Pressable
        accessibilityRole="button"
        disabled={page >= totalPages - 1}
        onPress={onNext}
        style={({ pressed }) => [
          styles.pageButton,
          page >= totalPages - 1 && styles.pageButtonDisabled,
          pressed && page < totalPages - 1 && styles.pressed,
        ]}
      >
        <Text style={styles.pageButtonText}>次へ</Text>
      </Pressable>
    </View>
  );
}

export function SelectPokemonScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<MatchParams>();
  const restrictionMode = (params.restrictionMode ??
    "standard") as RestrictionMode;
  const pokemonGeneration = (Number(params.pokemonGeneration) ||
    1) as Generation;

  const [allSpecies, setAllSpecies] = useState<PokemonSpecies[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [selectedDexNos, setSelectedDexNos] = useState<number[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setErrorMessage(null);
        const rows = await fetchPokemonSpecies();
        if (!cancelled) {
          setAllSpecies(rows);
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
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const species = useMemo(
    () =>
      getSelectableSpeciesFromList(
        allSpecies,
        restrictionMode,
        pokemonGeneration,
      ),
    [allSpecies, restrictionMode, pokemonGeneration],
  );
  const totalPages = Math.max(1, Math.ceil(species.length / PAGE_SIZE));
  const pageItems = species.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const partyFull = selectedDexNos.length >= PARTY_SIZE;

  const togglePokemon = (dexNo: number) => {
    setSelectedDexNos((current) => {
      if (current.includes(dexNo)) {
        return current.filter((id) => id !== dexNo);
      }
      if (current.length >= PARTY_SIZE) {
        return current;
      }
      return [...current, dexNo];
    });
  };

  const selectedPokemon = selectedDexNos
    .map((dexNo) => species.find((pokemon) => pokemon.dex_no === dexNo))
    .filter((pokemon): pokemon is PokemonSpecies => Boolean(pokemon));

  return (
    <ImageBackground source={grassland} style={styles.background} resizeMode="cover">
      <View style={styles.dim} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.panel}>
            <View style={styles.header}>
              <Pressable
                accessibilityRole="button"
                onPress={() =>
                  router.replace({
                    pathname: "/menu",
                    params: {
                      rulesGeneration: params.rulesGeneration,
                      pokemonGeneration: params.pokemonGeneration,
                      moveGeneration: params.moveGeneration,
                      restrictionMode: params.restrictionMode,
                      opponentType: params.opponentType,
                      visibilityMode: params.visibilityMode,
                    },
                  })
                }
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Text style={styles.backText}>メニューへ戻る</Text>
              </Pressable>
              <Text style={styles.kicker}>編成</Text>
              <Text style={styles.title}>ポケモンを選ぶ</Text>
              <Text style={styles.lead}>
                図鑑順に表示しています。6体まで選択できます（同一種族は1体まで）。
              </Text>
            </View>

            {loading ? (
              <View style={styles.stateBox}>
                <ActivityIndicator color="#1f6b4a" />
                <Text style={styles.stateText}>ポケモンデータを読み込み中…</Text>
              </View>
            ) : null}

            {errorMessage ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{errorMessage}</Text>
                <Text style={styles.stateText}>
                  ネットワーク接続と Supabase 設定を確認してください。
                </Text>
              </View>
            ) : null}

            {!loading && !errorMessage ? (
              <>
            <View style={styles.partyBox}>
              <Text style={styles.partyTitle}>
                パーティ {selectedDexNos.length}/{PARTY_SIZE}
              </Text>
              <View style={styles.partySlots}>
                {Array.from({ length: PARTY_SIZE }, (_, index) => {
                  const pokemon = selectedPokemon[index];
                  return (
                    <View key={index} style={styles.partySlot}>
                      {pokemon ? (
                        <>
                          <PokemonSprite
                            uri={pokemon.sprite_url}
                            size={40}
                            style={styles.partySpriteFrame}
                          />
                          <Text style={styles.partyName} numberOfLines={1}>
                            {pokemon.name_ja}
                          </Text>
                        </>
                      ) : (
                        <Text style={styles.partyEmpty}>{index + 1}</Text>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>

            <PagePager
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage((current) => Math.max(0, current - 1))}
              onNext={() =>
                setPage((current) => Math.min(totalPages - 1, current + 1))
              }
            />

            <View style={styles.list}>
              {pageItems.map((pokemon) => {
                const selected = selectedDexNos.includes(pokemon.dex_no);
                return (
                  <PokemonCard
                    key={`${pokemon.dex_no}-${pokemon.region_type}-${pokemon.is_mega}`}
                    pokemon={pokemon}
                    selected={selected}
                    disabled={partyFull && !selected}
                    onPress={() => togglePokemon(pokemon.dex_no)}
                  />
                );
              })}
            </View>

            <PagePager
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage((current) => Math.max(0, current - 1))}
              onNext={() =>
                setPage((current) => Math.min(totalPages - 1, current + 1))
              }
            />

            <Pressable
              accessibilityRole="button"
              disabled={selectedDexNos.length !== PARTY_SIZE}
              onPress={() => {
                router.push({
                  pathname: "/select",
                  params: {
                    ...params,
                    party: selectedDexNos.join(","),
                  },
                });
              }}
              style={({ pressed }) => [
                styles.primaryButton,
                selectedDexNos.length !== PARTY_SIZE && styles.primaryButtonDisabled,
                pressed &&
                  selectedDexNos.length === PARTY_SIZE &&
                  styles.primaryButtonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>
                {selectedDexNos.length === PARTY_SIZE
                  ? "選出へ進む"
                  : `あと${PARTY_SIZE - selectedDexNos.length}体選んでください`}
              </Text>
            </Pressable>
              </>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#87c6ef",
  },
  dim: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(20, 28, 16, 0.28)",
  },
  safeArea: {
    flex: 1,
  },
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
    gap: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
  },
  header: {
    gap: 6,
  },
  backText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1f6b4a",
  },
  pressed: {
    opacity: 0.7,
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
    gap: 10,
    paddingVertical: 24,
  },
  stateText: {
    fontSize: 13,
    color: "#5c564c",
    textAlign: "center",
  },
  errorBox: {
    backgroundColor: "#fdeceb",
    borderRadius: 12,
    padding: 14,
    gap: 6,
  },
  errorText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#a12828",
  },
  partyBox: {
    backgroundColor: "#eef7f1",
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  partyTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1f6b4a",
  },
  partySlots: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  partySlot: {
    width: "31%",
    minWidth: 90,
    flexGrow: 1,
    backgroundColor: "#fffdf8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cfe3d6",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    minHeight: 72,
  },
  partySpriteFrame: {
    backgroundColor: "transparent",
    borderRadius: 0,
  },
  partyName: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1d1a16",
  },
  partyEmpty: {
    fontSize: 18,
    fontWeight: "800",
    color: "#b7c3b0",
  },
  pager: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  pageButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1f6b4a",
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  pageButtonDisabled: {
    opacity: 0.35,
  },
  pageButtonText: {
    color: "#1f6b4a",
    fontWeight: "700",
    fontSize: 14,
  },
  pageLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "700",
    color: "#5c564c",
  },
  list: {
    gap: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 12,
    backgroundColor: "#fffdf8",
    borderColor: "#ddd4c4",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    overflow: "hidden",
  },
  spriteColumn: {
    width: 160,
    flexShrink: 0,
    alignSelf: "stretch",
  },
  cardSelected: {
    borderColor: "#1f6b4a",
    backgroundColor: "#eef7f1",
  },
  cardDisabled: {
    opacity: 0.45,
  },
  cardPressed: {
    transform: [{ scale: 0.995 }],
  },
  cardBody: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  dexNo: {
    fontSize: 12,
    fontWeight: "800",
    color: "#6b4f2a",
  },
  name: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1d1a16",
  },
  typeRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 2,
  },
  typeBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  typeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statLabel: {
    width: 54,
    fontSize: 11,
    fontWeight: "700",
    color: "#5c564c",
  },
  statBarTrack: {
    flex: 1,
    height: 12,
    borderRadius: 3,
    backgroundColor: "#e8e0d4",
    overflow: "hidden",
  },
  statBarFill: {
    height: "100%",
    backgroundColor: "#1f6b4a",
  },
  statValue: {
    width: 28,
    textAlign: "right",
    fontSize: 11,
    fontWeight: "700",
    color: "#1d1a16",
  },
  primaryButton: {
    backgroundColor: "#1f6b4a",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryButtonDisabled: {
    backgroundColor: "#9bb5a8",
  },
  primaryButtonPressed: {
    backgroundColor: "#18553b",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
});
