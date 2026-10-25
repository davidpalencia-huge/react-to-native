import { usePulse } from '../../hooks/usePulse';

interface GlowHaloProps {
  color: string;
  size: number;   // how far the glow reaches outside the card, in px
  radius: number; // the card's borderRadius
  pulse: boolean;
}

// ─────────────────────────────────────────────
// PLATFORM · a glow that looks the same on iOS, Android and web
// ─────────────────────────────────────────────
// Android cannot do colored blur shadows. So we fake one: stacked rounded
// rectangles, each a bit bigger than the last, all translucent.
//
//   1. Return null when size is 0
//   2. Render an <Animated.View> that fills the card (StyleSheet.absoluteFill),
//      pointerEvents="none", with style opacity = the value from usePulse(pulse)
//   3. Inside it, render 10 plain <View>s (Array.from({ length: 10 })). For layer i:
//        spread = (size * (i + 1)) / 10
//        position 'absolute', top/left/right/bottom: -spread
//        borderRadius: radius + spread
//        backgroundColor: color, opacity: 0.085
//   4. Import Animated, StyleSheet and View from 'react-native'
//
// Then in CardView, render <GlowHalo color={theme.color} size={glowSize}
//   radius={cardRadius} pulse={theme.effects.pulse && motion} />
export function GlowHalo({ color, size, radius, pulse }: GlowHaloProps) {
  const opacity = usePulse(pulse);

  return null;
}
