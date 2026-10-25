import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

// Breathing value between 0.3 and 1 — the RN version of
//   @keyframes pulse { 0%, 100% { opacity: .3 } 50% { opacity: 1 } }
//   animation: pulse 1.4s ease-in-out infinite;
//
// `useNativeDriver: true` only works for transform and opacity.
// Animating width, height or colors would crash with "not supported by native driver".
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
