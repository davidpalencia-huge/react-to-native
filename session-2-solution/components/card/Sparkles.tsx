import { useEffect, useRef } from 'react';
import { Animated, DimensionValue, StyleSheet, View } from 'react-native';

interface Spot {
  left: DimensionValue;
  top: DimensionValue;
  delay: number;
}

const SPOTS: Spot[] = [
  { left: '12%', top: '18%', delay: 0 },
  { left: '80%', top: '12%', delay: 400 },
  { left: '66%', top: '46%', delay: 900 },
  { left: '22%', top: '62%', delay: 1300 },
  { left: '86%', top: '74%', delay: 600 },
  { left: '48%', top: '30%', delay: 1100 },
];

// STRETCH · twinkling diamonds. Each sparkle is a tiny rotated square
// running its own staggered loop. Plain Views — no font or emoji differences.
export function Sparkles() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {SPOTS.map((spot, i) => (
        <Sparkle key={i} {...spot} />
      ))}
    </View>
  );
}

function Sparkle({ left, top, delay }: Spot) {
  const t = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(t, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(t, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.delay(900),
      ])
    );
    loop.start();

    return () => loop.stop();
  }, [delay, t]);

  const scale = t.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] });

  return (
    <Animated.View
      style={[styles.sparkle, { left, top, opacity: t, transform: [{ scale }, { rotate: '45deg' }] }]}
    />
  );
}

const styles = StyleSheet.create({
  sparkle: {
    position: 'absolute',
    width: 9,
    height: 9,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
});
