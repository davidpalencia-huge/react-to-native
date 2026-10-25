# Stretch · Sparkles and Reduce Motion

## 1 · `components/card/Sparkles.tsx`

Replace the whole file:

```tsx
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
```

A sparkle is a rotated square, not a `✦` character — plain Views look the same on every device.

## 2 · `hooks/useReducedMotion.ts`

Replace the whole file:

```ts
import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    let mounted = true;

    AccessibilityInfo.isReduceMotionEnabled().then(enabled => {
      if (mounted) setReduced(enabled);
    });
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced);

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  return reduced;
}
```

## Why

Motion effects are decoration. Some people get dizzy from them. The web gives you
`@media (prefers-reduced-motion: reduce)`; React Native gives you `AccessibilityInfo`.
`CardView` already reads this hook: with Reduce Motion on, the glow stays still and the card does not tilt.

## More ideas

- Flip the card with `rotateY` and `backfaceVisibility: 'hidden'` on both faces.
- Make the shimmer faster for Legendary.
- Add a new rarity row to `theme/rarity.ts` — no component changes needed.
