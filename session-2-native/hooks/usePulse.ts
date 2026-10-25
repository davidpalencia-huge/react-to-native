import { useRef } from 'react';
import { Animated } from 'react-native';

// ─────────────────────────────────────────────
// MOTION · breathing glow
// ─────────────────────────────────────────────
// The RN version of:
//   @keyframes pulse { 0%, 100% { opacity: .3 } 50% { opacity: 1 } }
//   animation: pulse 1.4s ease-in-out infinite;
//
//   1. Add a useEffect that depends on [enabled, duration, value]
//   2. When !enabled → value.setValue(1) and return
//   3. Otherwise build:
//        Animated.loop(
//          Animated.sequence([
//            Animated.timing(value, { toValue: 1,    duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
//            Animated.timing(value, { toValue: 0.3, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
//          ])
//        )
//      call .start(), and return a cleanup that calls .stop()
//
// useNativeDriver: true only works for transform and opacity.
// Try animating `width` with it and read the error.
export function usePulse(enabled: boolean, duration = 1400) {
  const value = useRef(new Animated.Value(enabled ? 0.3 : 1)).current;

  return value;
}
