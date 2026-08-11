import { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

type ParticleProps = {
  delay: number;
  duration: number;
};

function useLoop(delay: number, duration: number) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(progress, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [delay, duration, progress]);

  return progress;
}

function Petal({ delay, duration, hue }: ParticleProps & { hue: "pink" | "green" }) {
  const progress = useLoop(delay, duration);
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [spin]);

  const rotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const lift = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [8, -110],
  });
  const radius = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 54],
  });
  const opacity = progress.interpolate({
    inputRange: [0, 0.12, 0.72, 1],
    outputRange: [0, 1, 1, 0],
  });
  const selfSpin = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.orbit, { opacity, transform: [{ rotate }] }]}
    >
      <Animated.View
        style={{
          transform: [
            {
              translateY: radius.interpolate({
                inputRange: [10, 54],
                outputRange: [-10, -54],
              }),
            },
          ],
        }}
      >
        <Animated.View
          style={[
            styles.petal,
            hue === "green" ? styles.petalGreen : styles.petalPink,
            { transform: [{ translateY: lift }, { rotate: selfSpin }] },
          ]}
        />
      </Animated.View>
    </Animated.View>
  );
}

function Flame({ delay, duration, drift }: ParticleProps & { drift: number }) {
  const progress = useLoop(delay, duration);
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 92 + drift],
  });
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -18 - Math.abs(drift)],
  });
  const scale = progress.interpolate({
    inputRange: [0, 0.25, 1],
    outputRange: [0.35, 1.15, 1.6],
  });
  const opacity = progress.interpolate({
    inputRange: [0, 0.15, 0.7, 1],
    outputRange: [0, 1, 0.7, 0],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.flame,
        {
          opacity,
          transform: [{ translateX }, { translateY }, { scale }],
        },
      ]}
    />
  );
}

function Droplet({
  delay,
  duration,
  direction,
  lift,
}: ParticleProps & { direction: number; lift: number }) {
  const progress = useLoop(delay, duration);
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, direction],
  });
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, lift],
  });
  const scaleX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1.6],
  });
  const opacity = progress.interpolate({
    inputRange: [0, 0.1, 0.75, 1],
    outputRange: [0, 1, 0.8, 0],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.droplet,
        {
          opacity,
          transform: [{ translateX }, { translateY }, { scaleX }],
        },
      ]}
    />
  );
}

export function PetalTornado() {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        delay: index * 120,
        duration: 2200 + (index % 4) * 180,
        hue: index % 3 === 0 ? ("green" as const) : ("pink" as const),
      })),
    [],
  );

  return (
    <View pointerEvents="none" style={styles.venusaurFx}>
      {petals.map((petal, index) => (
        <Petal key={index} {...petal} />
      ))}
    </View>
  );
}

export function FireBreath() {
  const flames = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        delay: index * 90,
        duration: 720 + (index % 3) * 80,
        drift: (index - 6) * 4,
      })),
    [],
  );

  return (
    <View pointerEvents="none" style={styles.charizardFx}>
      {flames.map((flame, index) => (
        <Flame key={index} {...flame} />
      ))}
    </View>
  );
}

export function WaterCannons() {
  const left = useMemo(
    () =>
      Array.from({ length: 9 }, (_, index) => ({
        delay: index * 95,
        duration: 740 + (index % 3) * 60,
        direction: -88 - (index % 4) * 7,
        lift: -8 - (index % 5) * 3,
      })),
    [],
  );
  const right = useMemo(
    () =>
      Array.from({ length: 9 }, (_, index) => ({
        delay: index * 95 + 40,
        duration: 740 + (index % 3) * 60,
        direction: 88 + (index % 4) * 7,
        lift: -8 - (index % 5) * 3,
      })),
    [],
  );

  return (
    <>
      <View pointerEvents="none" style={styles.turtleLeftFx}>
        {left.map((drop, index) => (
          <Droplet key={`l-${index}`} {...drop} />
        ))}
      </View>
      <View pointerEvents="none" style={styles.turtleRightFx}>
        {right.map((drop, index) => (
          <Droplet key={`r-${index}`} {...drop} />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  orbit: {
    position: "absolute",
    left: "52%",
    top: "34%",
    width: 12,
    height: 12,
    marginLeft: -6,
    marginTop: -6,
  },
  petal: {
    width: 12,
    height: 18,
    borderRadius: 12,
  },
  petalPink: {
    backgroundColor: "#f08aa3",
  },
  petalGreen: {
    backgroundColor: "#6ec36a",
  },
  flame: {
    position: "absolute",
    width: 22,
    height: 16,
    borderRadius: 10,
    backgroundColor: "#ff8a1f",
    shadowColor: "#ffd36a",
    shadowOpacity: 0.9,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  droplet: {
    position: "absolute",
    width: 28,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#7fd4ff",
    shadowColor: "#dff6ff",
    shadowOpacity: 0.85,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
  venusaurFx: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 3,
  },
  charizardFx: {
    position: "absolute",
    left: "68%",
    top: "32%",
    width: 20,
    height: 20,
    zIndex: 3,
  },
  turtleLeftFx: {
    position: "absolute",
    left: "18%",
    top: "30%",
    width: 16,
    height: 16,
    zIndex: 3,
  },
  turtleRightFx: {
    position: "absolute",
    left: "78%",
    top: "30%",
    width: 16,
    height: 16,
    zIndex: 3,
  },
});
