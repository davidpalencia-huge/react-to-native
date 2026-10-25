// ─────────────────────────────────────────────
// STRETCH · twinkling diamonds (Legendary)
// ─────────────────────────────────────────────
// Peek at cheat-codes/05-stretch.md if you get stuck.
//
//   1. Define 5–6 spots: { left: '12%', top: '18%', delay: 0 } (type the values as DimensionValue)
//   2. <Sparkles> renders a View with StyleSheet.absoluteFill + pointerEvents="none",
//      and one <Sparkle> per spot
//   3. <Sparkle> is a 9×9 white View rotated 45deg (a diamond) inside an Animated.View.
//      One Animated.Value `t` drives both opacity (0 → 1 → 0) and scale (0.2 → 1).
//      Loop it with Animated.sequence([delay(spot.delay), timing → 1, timing → 0, delay(900)])
//      so each sparkle twinkles at a different moment.
export function Sparkles() {
  return null;
}
