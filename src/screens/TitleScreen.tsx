import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { FireBreath, PetalTornado, WaterCannons } from "./title/TitleEffects";

const grassland = require("../../assets/title/title-grassland.png");
const greenFox = require("../../assets/title/green-fox.png");
const orangeLizard = require("../../assets/title/orange-lizard.png");
const blueTurtle = require("../../assets/title/blue-turtle.png");

function useIdleBob(offset: number) {
  const value = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(value, {
          toValue: 1,
          duration: 1600 + offset,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          toValue: 0,
          duration: 1600 + offset,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [offset, value]);

  return value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });
}

export function TitleScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const stagePadding = Math.max(8, width * 0.012);
  const gap = Math.max(4, width * 0.008);
  const availableWidth = Math.max(240, width - stagePadding * 2 - gap * 2);
  const sideSize = Math.min(availableWidth * 0.3, height * 0.42, 320);
  const centerSize = Math.min(availableWidth * 0.34, height * 0.48, 360);
  const foxBob = useIdleBob(120);
  const lizardBob = useIdleBob(0);
  const turtleBob = useIdleBob(220);

  return (
    <View style={styles.root}>
      <Image
        source={grassland}
        style={[styles.backgroundImage, { width, height }]}
        resizeMode="cover"
      />
      <View style={styles.skyWash} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.hero}>
          <Text style={styles.kicker}>初代・シングルバトル</Text>
          <Text style={[styles.title, width < 480 && styles.titleCompact]}>
            もしもポケモンシミュレーター
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/menu")}
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.startButtonPressed,
            ]}
          >
            <Text style={styles.startButtonText}>スタート</Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.stage,
            { paddingHorizontal: stagePadding, gap },
          ]}
          pointerEvents="none"
        >
          <Animated.View
            style={[
              styles.slot,
              { width: sideSize, height: sideSize, transform: [{ translateY: foxBob }] },
            ]}
          >
            <PetalTornado />
            <Image source={greenFox} style={styles.creature} resizeMode="contain" />
          </Animated.View>

          <Animated.View
            style={[
              styles.slot,
              styles.centerSlot,
              {
                width: centerSize,
                height: centerSize,
                transform: [{ translateY: lizardBob }],
              },
            ]}
          >
            <FireBreath />
            <Image source={orangeLizard} style={styles.creature} resizeMode="contain" />
          </Animated.View>

          <Animated.View
            style={[
              styles.slot,
              { width: sideSize, height: sideSize, transform: [{ translateY: turtleBob }] },
            ]}
          >
            <WaterCannons />
            <Image source={blueTurtle} style={styles.creature} resizeMode="contain" />
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "#87c6ef",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  skyWash: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  safeArea: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  hero: {
    alignItems: "center",
    paddingTop: 28,
    paddingHorizontal: 24,
    gap: 10,
  },
  kicker: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.4,
    color: "#3d4d1f",
    textShadowColor: "rgba(255,255,255,0.7)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1d1a16",
    textAlign: "center",
    textShadowColor: "rgba(255,255,255,0.85)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  titleCompact: {
    fontSize: 24,
  },
  startButton: {
    marginTop: 10,
    minWidth: 220,
    backgroundColor: "#1f6b4a",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: "center",
    shadowColor: "#0b2a1c",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  startButtonPressed: {
    backgroundColor: "#18553b",
  },
  startButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 2,
  },
  stage: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 12,
  },
  slot: {
    alignItems: "center",
    justifyContent: "flex-end",
    maxWidth: "32%",
  },
  creature: {
    width: "100%",
    height: "100%",
  },
  centerSlot: {
    zIndex: 2,
    maxWidth: "36%",
  },
});
