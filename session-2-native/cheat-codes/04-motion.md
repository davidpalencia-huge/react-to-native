# Motion · Pulse, shimmer, tilt, holo

## 1 · `hooks/usePulse.ts`

```ts
import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export function usePulse(enabled: boolean, duration = 1400) {
  const value = useRef(new Animated.Value(enabled ? 0.3 : 1)).current;

  useEffect(() => {
    if (!enabled) {
      value.setValue(1);
      return;
    }

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(value, { toValue: 1, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(value, { toValue: 0.3, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    loop.start();

    return () => loop.stop();
  }, [enabled, duration, value]);

  return value;
}
```

Rare, Epic and Legendary cards now breathe.

`ShimmerSweep.tsx` and `HoloFoil.tsx` are already built — read them. Epic and Legendary
cards shimmer once `usePulse` and the glow are in place; on Legendary the foil follows your finger
once the tilt below is applied.

## 2 · `components/card/CardView.tsx`

Import `Animated`:

```tsx
import { Animated, StyleSheet, View } from 'react-native';
```

Add this above the `return`:

```tsx
// Transform order matters: `perspective` must come first or the tilt looks flat.
const tiltTransform =
  tilt && motion
    ? [
        { perspective: 900 },
        { rotateX: tilt.y.interpolate({ inputRange: [-1, 1], outputRange: ['14deg', '-14deg'] }) },
        { rotateY: tilt.x.interpolate({ inputRange: [-1, 1], outputRange: ['-14deg', '14deg'] }) },
      ]
    : undefined;
```

Change the outer `View` to `Animated.View` and add the transform to its style array:

```tsx
<Animated.View
  style={[
    { width, aspectRatio: CARD_ASPECT, borderRadius: cardRadius, backgroundColor: theme.color },
    glowShadow(theme.color, glowSize / 2),
    tiltTransform && { transform: tiltTransform },
  ]}
>
  {/* ...same children: GlowHalo and CardFrame... */}
</Animated.View>
```

## Why

- `useNativeDriver: true` runs the animation on the UI thread — smooth even when JS is busy.
  It only supports `transform` and `opacity`. Animating `width`, `height` or a color throws
  *"Style property 'width' is not supported by native driver"*.
- Every effect is built from `transform` and `opacity` on purpose.
- The CSS version of the tilt would be `transform: perspective(900px) rotateX(...) rotateY(...)`.
  In RN it is an array, and the order is the order of application.
