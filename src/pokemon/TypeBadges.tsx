import { StyleSheet, Text, View, type ViewStyle } from "react-native";

import { TYPE_COLORS, getTypes, typeNameJa } from "./catalog";
import type { PokemonSpecies } from "./types";

export function PokemonTypeBadges({
  species,
  style,
}: {
  species: PokemonSpecies;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.row, style]}>
      {getTypes(species).map((nameJa) => (
        <View
          key={nameJa}
          style={[
            styles.badge,
            { backgroundColor: TYPE_COLORS[nameJa] ?? "#888" },
          ]}
        >
          <Text style={styles.badgeText}>{nameJa}</Text>
        </View>
      ))}
    </View>
  );
}

export function MoveTypeBadge({ typeId }: { typeId: number }) {
  const nameJa = typeNameJa(typeId);
  return (
    <View
      style={[styles.badge, { backgroundColor: TYPE_COLORS[nameJa] ?? "#888" }]}
    >
      <Text style={styles.badgeText}>{nameJa}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 4,
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
  },
});
