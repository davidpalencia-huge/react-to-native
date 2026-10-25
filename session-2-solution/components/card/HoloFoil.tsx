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

// MOTION · holographic foil. A rainbow gradient 2× the card size slides
// underneath the card's window as you tilt — the rainbow "moves" like real foil.
export function HoloFoil({ width, tilt }: HoloFoilProps) {
  const height = width / CARD_ASPECT;
  const idle = useRef<TiltValues>({ x: new Animated.Value(0), y: new Animated.Value(0) }).current;
  const { x, y } = tilt ?? idle;

  const translateX = x.interpolate({ inputRange: [-1, 1], outputRange: [width * 0.6, -width * 0.6] });
  const translateY = y.interpolate({ inputRange: [-1, 1], outputRange: [height * 0.4, -height * 0.4] });
  // Faint at rest, brighter the further you tilt horizontally.
  const opacity = x.interpolate({ inputRange: [-1, 0, 1], outputRange: [0.5, 0.12, 0.5] });

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
