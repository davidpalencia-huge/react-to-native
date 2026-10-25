import { useMemo, useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

// x and y are normalized to -1..1 so every effect can interpolate them
// into whatever unit it needs (degrees, pixels, opacity).
export interface TiltValues {
  x: Animated.Value;
  y: Animated.Value;
}

const clamp = (n: number) => Math.max(-1, Math.min(1, n));

// Drag anywhere to tilt. `travel` = how many pixels of drag equal a full tilt.
// The web equivalent would be a mousemove listener writing CSS variables.
export function useTilt(travel: number) {
  const x = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(0)).current;

  const panResponder = useMemo(() => {
    const release = () => {
      Animated.spring(x, { toValue: 0, friction: 5, useNativeDriver: true }).start();
      Animated.spring(y, { toValue: 0, friction: 5, useNativeDriver: true }).start();
    };

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        x.setValue(clamp(gesture.dx / travel));
        y.setValue(clamp(gesture.dy / travel));
      },
      onPanResponderRelease: release,
      onPanResponderTerminate: release,
    });
  }, [x, y, travel]);

  const tilt: TiltValues = { x, y };
  return { tilt, panHandlers: panResponder.panHandlers };
}
