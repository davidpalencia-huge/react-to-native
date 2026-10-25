import { useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TiltValues } from '../../hooks/useTilt';
import { CARD_ASPECT } from './constants';

interface HoloFoilProps {
  width: number;
  tilt?: TiltValues; // without tilt the foil sits still (grid thumbnails)
}

const RAINBOW = ['#ff5c7a', '#ffc53d', '#3ddc97', '#4cc9f0', '#b46bff', '#ff5c7a'] as const;

// ─────────────────────────────────────────────
// MOTION · holographic foil (Legendary)
// ─────────────────────────────────────────────
// A rainbow gradient twice the card size sits under the card's "window".
// Moving it as you tilt makes the rainbow slide like real foil.
// `x` and `y` are -1..1 (drag left/up = -1, right/down = 1).
//
//   1. Replace the fixed translateX / translateY / opacity below with interpolations:
//        translateX → x.interpolate({ inputRange: [-1, 1], outputRange: [width * 0.6, -width * 0.6] })
//        translateY → y.interpolate({ inputRange: [-1, 1], outputRange: [height * 0.4, -height * 0.4] })
//        opacity    → x.interpolate({ inputRange: [-1, 0, 1], outputRange: [0.5, 0.12, 0.5] })
//
// Grid thumbnails get no `tilt`, so they use the `idle` values and the foil stays put.
export function HoloFoil({ width, tilt }: HoloFoilProps) {
  const height = width / CARD_ASPECT;
  const idle = useRef<TiltValues>({ x: new Animated.Value(0), y: new Animated.Value(0) }).current;
  const { x, y } = tilt ?? idle;

  const translateX = 0;
  const translateY = 0;
  const opacity = 0.3;

  return (
    <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity }]}>
      <Animated.View
        style={{
          position: 'absolute',
          top: -height * 0.5,
          left: -width * 0.5,
          width: width * 2,
          height: height * 2,
          transform: [{ translateX }, { translateY }],
        }}
      >
        <LinearGradient
          colors={RAINBOW}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </Animated.View>
  );
}
