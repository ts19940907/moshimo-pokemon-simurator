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

import {
  fetchAbilitiesByIds,
  fetchAbilitiesForPokemon,
  type Ability,
} from "../pokemon/abilityRepository";
import type { PokemonSpecies } from "../pokemon/types";
import {
  getNature,
  natureEffectLabel,
  NATURES,
  type NatureId,
} from "./natures";

/** Abilities selectable for a species under Gen3+ rules (empty otherwise). */
export function useSpeciesAbilities(
  species: PokemonSpecies | null,
  rulesGeneration: number,
): { abilities: Ability[]; loading: boolean; error: string | null } {
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const speciesId = species?.id ?? null;
  const ability1Id = species?.ability1_id ?? null;
  const ability2Id = species?.ability2_id ?? null;

  useEffect(() => {
    if (!speciesId || rulesGeneration < 3) {
      setAbilities([]);
      setError(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        let rows: Ability[] = [];
        try {
          rows = await fetchAbilitiesForPokemon(speciesId, rulesGeneration);
        } catch {
          // Fall back when junction is missing / not seeded yet.
          rows = [];
        }
        if (rows.length === 0) {
          rows = await fetchAbilitiesByIds([ability1Id, ability2Id]);
        }
        if (!cancelled) setAbilities(rows);
      } catch (fetchError) {
        if (!cancelled) {
          setAbilities([]);
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "特性の取得に失敗しました。",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [speciesId, ability1Id, ability2Id, rulesGeneration]);

  return { abilities, loading, error };
}

export function AbilityChips({
  abilities,
  loading,
  error,
  value,
  onChange,
}: {
  abilities: Ability[];
  loading: boolean;
  error: string | null;
  value: string | null | undefined;
  onChange: (abilityId: string) => void;
}) {
  return (
    <>
      {loading ? <ActivityIndicator color="#1f6b4a" /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {abilities.length === 0 && !loading ? (
        <Text style={styles.hint}>
          このポケモンに設定できる特性データがありません。
        </Text>
      ) : (
        <View style={styles.rowWrap}>
          {abilities.map((ability) => {
            const selected = value === ability.id;
            return (
              <Pressable
                key={ability.id}
                onPress={() => onChange(ability.id)}
                style={[styles.chip, selected && styles.chipSelected]}
              >
                <Text
                  style={[styles.chipText, selected && styles.chipTextSelected]}
                >
                  {ability.name_ja}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </>
  );
}

export function NatureComboBox({
  value,
  onChange,
}: {
  value: NatureId | null | undefined;
  onChange: (natureId: NatureId) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = getNature(value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NATURES;
    return NATURES.filter((nature) => {
      const effect = natureEffectLabel(nature);
      return (
        nature.nameJa.toLowerCase().includes(q) ||
        nature.id.toLowerCase().includes(q) ||
        effect.toLowerCase().includes(q)
      );
    });
  }, [query]);

  const closeMenu = () => {
    setMenuOpen(false);
    setQuery("");
  };

  return (
    <View style={styles.comboWrap}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="性格を選択"
        onPress={() => setMenuOpen(true)}
        style={styles.comboSelect}
      >
        <Text style={styles.comboSelectText} numberOfLines={1}>
          {selected.nameJa}（{natureEffectLabel(selected)}）
        </Text>
        <Text style={styles.comboCaret}>▾</Text>
      </Pressable>

      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <View style={styles.comboBackdrop}>
          <Pressable style={styles.comboDismiss} onPress={closeMenu} />
          <View style={styles.comboSheet}>
            <Text style={styles.comboTitle}>性格</Text>
            <TextInput
              style={styles.comboSearch}
              value={query}
              onChangeText={setQuery}
              placeholder="性格名・補正で絞り込み"
              placeholderTextColor="#9a9286"
              autoCorrect={false}
              autoCapitalize="none"
            />
            <ScrollView
              style={styles.comboList}
              keyboardShouldPersistTaps="handled"
            >
              {filtered.length === 0 ? (
                <Text style={styles.empty}>該当する性格がありません。</Text>
              ) : (
                filtered.map((nature) => {
                  const isSelected = nature.id === selected.id;
                  return (
                    <Pressable
                      key={nature.id}
                      accessibilityRole="button"
                      onPress={() => {
                        onChange(nature.id);
                        closeMenu();
                      }}
                      style={[
                        styles.comboItem,
                        isSelected && styles.comboItemSelected,
                      ]}
                    >
                      <View style={styles.comboItemBody}>
                        <Text
                          style={[
                            styles.comboItemText,
                            isSelected && styles.comboItemTextSelected,
                          ]}
                        >
                          {nature.nameJa}
                        </Text>
                        <Text style={styles.comboItemMeta}>
                          {natureEffectLabel(nature)}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  error: { fontSize: 12, fontWeight: "700", color: "#a33b2a" },
  hint: { fontSize: 11, fontWeight: "600", color: "#8a8276" },
  rowWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: "#cfe3d6",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#f3f6ea",
  },
  chipSelected: {
    backgroundColor: "#1f6b4a",
    borderColor: "#1f6b4a",
  },
  chipText: { fontSize: 12, fontWeight: "700", color: "#1d1a16" },
  chipTextSelected: { color: "#fff" },
  empty: { fontSize: 12, color: "#8a8276", paddingHorizontal: 16 },
  comboWrap: { gap: 4 },
  comboSelect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    borderWidth: 1,
    borderColor: "#cfc6b6",
    borderRadius: 10,
    backgroundColor: "#eef7f1",
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 42,
  },
  comboSelectText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
    color: "#1d1a16",
  },
  comboCaret: {
    fontSize: 12,
    color: "#5c564c",
  },
  comboBackdrop: {
    flex: 1,
    backgroundColor: "rgba(20,28,16,0.45)",
    justifyContent: "center",
    padding: 24,
  },
  comboDismiss: {
    ...StyleSheet.absoluteFill,
  },
  comboSheet: {
    maxHeight: "70%",
    backgroundColor: "#fffdf8",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    paddingTop: 14,
    overflow: "hidden",
  },
  comboTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1d1a16",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  comboSearch: {
    marginHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#1d1a16",
  },
  comboList: {
    maxHeight: 360,
  },
  comboItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ebe4d8",
  },
  comboItemSelected: {
    backgroundColor: "#eef7f1",
  },
  comboItemBody: {
    flex: 1,
    gap: 2,
  },
  comboItemText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1d1a16",
  },
  comboItemTextSelected: {
    color: "#1f6b4a",
    fontWeight: "800",
  },
  comboItemMeta: {
    fontSize: 11,
    fontWeight: "600",
    color: "#5c564c",
  },
});
