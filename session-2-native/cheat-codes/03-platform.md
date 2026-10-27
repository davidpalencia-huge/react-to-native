# Platform · Glow, shadows and the overflow trap

## 1 · `utils/platformShadow.ts`

```ts
export function glowShadow(color: string, radius: number): ViewStyle {
  if (radius === 0) return {};

  return Platform.select<ViewStyle>({
    android: { elevation: radius, shadowColor: color },
    default: {
      shadowColor: color,
      shadowOpacity: 0.85,
      shadowRadius: radius,
      shadowOffset: { width: 0, height: 0 },
    },
  });
}
```

## 2 · `components/card/CardView.tsx`

`GlowHalo.tsx` is already built. Android cannot draw a colored blur, so it fakes one with stacked translucent rectangles. Read it, then render it here.

Wrap `CardFrame` in an outer View. The outer one owns the shadow, `CardFrame` owns the clipping.

```tsx
import { StyleSheet, View } from 'react-native';
import { glowShadow } from '../../utils/platformShadow';
import { GlowHalo } from './GlowHalo';

// ...

return (
  <View
    style={[
      { width, aspectRatio: CARD_ASPECT, borderRadius: cardRadius, backgroundColor: theme.color },
      glowShadow(theme.color, glowSize / 2),
    ]}
  >
    <GlowHalo color={theme.color} size={glowSize} radius={cardRadius} pulse={theme.effects.pulse && motion} />

    <CardFrame
      style={styles.frame}
      colors={theme.frame}
      body={element.body}
      thickness={frameWidth}
      radius={cardRadius}
      sheen={theme.sheen}
      overlay={<RarityEffects theme={theme} width={width} motion={motion} tilt={tilt} />}
    >
      <CardFace card={card} width={width} animate={motion} />
    </CardFrame>
  </View>
);

const styles = StyleSheet.create({
  frame: { flex: 1 },
});
```

## Why

| Symptom | Cause | Fix |
|---------|-------|-----|
| Glow is missing on iOS | `CardFrame` has `overflow: 'hidden'`, which also clips the view's own shadow | Shadow on an outer View, clipping on the inner `CardFrame` |
| Glow is gray, no blur on Android | `elevation` is the only shadow API; radius and opacity are ignored | Layered halo Views |
| No shadow at all on Android | Elevation needs an opaque `backgroundColor` on the same View | Give the outer View a background color |
