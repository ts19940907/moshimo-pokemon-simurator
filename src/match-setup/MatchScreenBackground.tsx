import type { ReactNode } from "react";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
  type ViewStyle,
} from "react-native";

type Props = {
  source: ImageSourcePropType;
  children: ReactNode;
  /** Defaults to match screen dim. Pass `null` to hide overlay. */
  overlayColor?: string | null;
};

const webImageStyle: StyleProp<ImageStyle> =
  Platform.OS === "web"
    ? ({
        width: "100%",
        height: "100%",
        objectFit: "cover",
      } as ImageStyle)
    : undefined;

export function MatchScreenBackground({
  source,
  children,
  overlayColor,
}: Props) {
  const dimColor =
    overlayColor === null
      ? null
      : (overlayColor ?? "rgba(20, 28, 16, 0.28)");

  return (
    <View style={styles.root}>
      <ImageBackground
        source={source}
        style={StyleSheet.absoluteFill}
        imageStyle={webImageStyle}
        resizeMode="cover"
      />
      {dimColor != null ? (
        <View
          style={[styles.dim, { backgroundColor: dimColor }]}
          pointerEvents="none"
        />
      ) : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    alignSelf: "stretch",
    backgroundColor: "#87c6ef",
    // Fill the document root. On web, +html.tsx sizes #root with 100dvh so
    // this stays within the visible viewport (not under browser chrome).
    ...(Platform.OS === "web"
      ? ({ height: "100%", maxHeight: "100%" } as unknown as ViewStyle)
      : null),
  },
  dim: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  content: {
    flex: 1,
    width: "100%",
    minHeight: 0,
  },
});
