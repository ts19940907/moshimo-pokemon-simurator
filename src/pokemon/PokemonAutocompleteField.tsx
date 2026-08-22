import { useEffect, useRef } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type GestureResponderEvent,
} from "react-native";

import { formatDexNo } from "./catalog";
import { PokemonTypeBadges } from "./TypeBadges";
import { PokemonSprite } from "./PokemonSprite";
import type { PokemonSpecies } from "./types";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  suggestions: PokemonSpecies[];
  suggestOpen: boolean;
  onOpenSuggest: () => void;
  onCloseSuggest: () => void;
  onSelect: (pokemon: PokemonSpecies) => void;
  onPressFilter: () => void;
  selectedSpecies: PokemonSpecies | null;
  showSprites?: boolean;
  placeholder?: string;
};

/** Delay so selection can finish before blur closes the list. */
const BLUR_CLOSE_MS = 250;

function asDomElement(node: View | null): HTMLElement | null {
  if (!node || typeof document === "undefined") return null;
  return node as unknown as HTMLElement;
}

export function PokemonAutocompleteField({
  value,
  onChangeText,
  suggestions,
  suggestOpen,
  onOpenSuggest,
  onCloseSuggest,
  onSelect,
  onPressFilter,
  selectedSpecies,
  showSprites = false,
  placeholder = "名前・図鑑番号で検索",
}: Props) {
  const selectingRef = useRef(false);
  const focusedRef = useRef(false);
  const rootRef = useRef<View | null>(null);
  const onCloseSuggestRef = useRef(onCloseSuggest);
  onCloseSuggestRef.current = onCloseSuggest;

  const showSuggestions = suggestOpen && suggestions.length > 0;

  const pick = (pokemon: PokemonSpecies) => {
    selectingRef.current = true;
    onSelect(pokemon);
    onCloseSuggest();
    setTimeout(() => {
      selectingRef.current = false;
    }, BLUR_CLOSE_MS);
  };

  const preventBlurOnWeb = (event: GestureResponderEvent) => {
    if (Platform.OS !== "web") return;
    const native = event.nativeEvent as { preventDefault?: () => void };
    native.preventDefault?.();
    const domEvent = event as unknown as { preventDefault?: () => void };
    domEvent.preventDefault?.();
  };

  const closeIfOutside = () => {
    if (selectingRef.current || focusedRef.current) return;
    const root = asDomElement(rootRef.current);
    if (
      root &&
      typeof document !== "undefined" &&
      document.activeElement instanceof Node &&
      root.contains(document.activeElement)
    ) {
      return;
    }
    onCloseSuggestRef.current();
  };

  useEffect(() => {
    if (!suggestOpen || typeof document === "undefined") return;
    const onPointerDown = (event: MouseEvent) => {
      if (selectingRef.current) return;
      const root = asDomElement(rootRef.current);
      const target = event.target;
      if (root && target instanceof Node && root.contains(target)) return;
      focusedRef.current = false;
      onCloseSuggestRef.current();
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [suggestOpen]);

  return (
    <View ref={rootRef} collapsable={false} style={styles.wrap}>
      <View style={styles.row}>
        <View style={styles.inputWrap}>
          <TextInput
            value={value}
            onChangeText={(text) => {
              onChangeText(text);
              onOpenSuggest();
            }}
            onFocus={() => {
              focusedRef.current = true;
              onOpenSuggest();
            }}
            onBlur={() => {
              focusedRef.current = false;
              setTimeout(closeIfOutside, BLUR_CLOSE_MS);
            }}
            placeholder={placeholder}
            placeholderTextColor="#9a9286"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.input}
          />
          {showSuggestions ? (
            <View
              style={styles.suggestList}
              {...(Platform.OS === "web"
                ? {
                    onMouseDown: (e: { preventDefault: () => void }) => {
                      e.preventDefault();
                    },
                  }
                : {})}
            >
              {suggestions.map((pokemon) => (
                <Pressable
                  key={`${pokemon.dex_no}-${pokemon.region_type}-${pokemon.is_mega}`}
                  onPressIn={(event) => {
                    preventBlurOnWeb(event);
                    pick(pokemon);
                  }}
                  style={({ pressed }) => [
                    styles.suggestItem,
                    pressed && styles.suggestItemPressed,
                  ]}
                >
                  <Text style={styles.suggestDex}>
                    {formatDexNo(pokemon.dex_no)}
                  </Text>
                  <Text style={styles.suggestName}>{pokemon.name_ja}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
        <Pressable onPress={onPressFilter} style={styles.filterBtn}>
          <Text style={styles.filterBtnText}>絞り込み</Text>
        </Pressable>
      </View>

      {/* Hidden while the list is open so it cannot cover suggestions. */}
      {selectedSpecies && !showSuggestions ? (
        <View style={styles.selectedRow}>
          {showSprites ? (
            <PokemonSprite uri={selectedSpecies.sprite_url} size={40} />
          ) : null}
          <View style={styles.selectedText}>
            <Text style={styles.selectedName}>{selectedSpecies.name_ja}</Text>
            <PokemonTypeBadges species={selectedSpecies} />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  // Constant stack above normal column fields; sticky bar is outside ScrollView.
  wrap: {
    gap: 8,
    zIndex: 40,
    elevation: 40,
    position: "relative",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    zIndex: 2,
    position: "relative",
  },
  inputWrap: {
    flex: 1,
    position: "relative",
    zIndex: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 10,
    backgroundColor: "#fffdf8",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: "700",
    color: "#1d1a16",
  },
  suggestList: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "100%",
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#ddd4c4",
    borderRadius: 10,
    backgroundColor: "#fffdf8",
    overflow: "hidden",
    zIndex: 50,
    elevation: 50,
    maxHeight: 220,
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  suggestItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee6d8",
    backgroundColor: "#fffdf8",
  },
  suggestItemPressed: { backgroundColor: "#eef7f1" },
  suggestDex: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8a8276",
  },
  suggestName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#1d1a16",
  },
  filterBtn: {
    borderWidth: 1,
    borderColor: "#1f6b4a",
    backgroundColor: "#1f6b4a",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  filterBtnText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#fffdf8",
  },
  selectedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  selectedText: { flex: 1, gap: 2 },
  selectedName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1d1a16",
  },
});
