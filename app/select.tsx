import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { formatDexNo } from "../src/pokemon/catalog";
import { fetchPokemonSpecies } from "../src/pokemon/repository";
import type { PokemonSpecies } from "../src/pokemon/types";

export default function SelectPlaceholderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    party?: string;
    rulesGeneration?: string;
    pokemonGeneration?: string;
    moveGeneration?: string;
    restrictionMode?: string;
    opponentType?: string;
    visibilityMode?: string;
  }>();
  const partyIds = (params.party ?? "")
    .split(",")
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0);

  const [species, setSpecies] = useState<PokemonSpecies[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchPokemonSpecies();
        if (!cancelled) {
          setSpecies(rows);
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

  const party = partyIds
    .map((dexNo) => species.find((pokemon) => pokemon.dex_no === dexNo))
    .filter(Boolean);

  const backToParty = () => {
    const { party: _party, ...rest } = params;
    router.replace({
      pathname: "/party",
      params: rest,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.kicker}>選出</Text>
        <Text style={styles.title}>6体見せ・3体選出はこれから用意します</Text>
        <Text style={styles.lead}>選んだ6体は次のとおりです。</Text>
        {loading ? <ActivityIndicator color="#1f6b4a" /> : null}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <View style={styles.summary}>
          {party.map((pokemon) =>
            pokemon ? (
              <Text key={pokemon.dex_no} style={styles.summaryLine}>
                {formatDexNo(pokemon.dex_no)} {pokemon.name_ja}
              </Text>
            ) : null,
          )}
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={backToParty}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
        >
          <Text style={styles.backButtonText}>編成へ戻る</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f1ea",
  },
  content: {
    padding: 24,
    maxWidth: 560,
    width: "100%",
    alignSelf: "center",
    gap: 12,
  },
  kicker: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6b4f2a",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1d1a16",
  },
  lead: {
    fontSize: 15,
    color: "#5c564c",
  },
  errorText: {
    color: "#a12828",
    fontWeight: "700",
  },
  summary: {
    backgroundColor: "#fffdf8",
    borderColor: "#ddd4c4",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  summaryLine: {
    fontSize: 15,
    color: "#1d1a16",
  },
  backButton: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f6b4a",
    paddingVertical: 14,
    alignItems: "center",
  },
  backButtonPressed: {
    backgroundColor: "#eef7f1",
  },
  backButtonText: {
    color: "#1f6b4a",
    fontSize: 16,
    fontWeight: "700",
  },
});
