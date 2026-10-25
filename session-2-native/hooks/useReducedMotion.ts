// ─────────────────────────────────────────────
// STRETCH · respect "Reduce Motion"
// ─────────────────────────────────────────────
// The RN version of `@media (prefers-reduced-motion: reduce)`.
// CardView already calls this hook and turns off pulse, shimmer, sparkles and tilt
// when it returns true — you only have to make it return the real value.
//
//   1. useState(false) → `reduced`
//   2. useEffect: AccessibilityInfo.isReduceMotionEnabled().then(setReduced)
//   3. Subscribe: AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced)
//      and remove the subscription in the cleanup (subscription.remove())
//   4. Return `reduced`
//
// Turn it on to test:
//   iOS      Settings → Accessibility → Motion → Reduce Motion
//   Android  Settings → Accessibility → Remove animations
export function useReducedMotion() {
  return false;
}
