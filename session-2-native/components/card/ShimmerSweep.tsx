import { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CARD_ASPECT } from './constants';

interface ShimmerSweepProps {
  width: number;
}

// ─────────────────────────────────────────────
// MOTION · a band of light sweeping across the card (Epic + Legendary)
// ─────────────────────────────────────────────
// The band is already drawn — right now it just sits still.
//
//   1. Add a useEffect that loops `progress` from 0 → 1, rests, then jumps back to 0:
//        Animated.loop(Animated.sequence([
//          Animated.timing(progress, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
//          Animated.delay(1600),
//          Animated.timing(progress, { toValue: 0, duration: 0, useNativeDriver: true }),
//        ]))
//      start it, stop it in the cleanup. (Import useEffect and Easing.)
//   2. Replace `translateX = 0` with an interpolation:
//        progress.interpolate({ inputRange: [0, 1], outputRange: [-width * 0.8, width * 1.3] })
//
// Look at the gradient colors: 'transparent' would show a grey fringe on iOS.
// That is why they fade to rgba(255,255,255,0) instead.
export function ShimmerSweep({ width }: ShimmerSweepProps) {
  const height = width / CARD_ASPECT;
  const progress = useRef(new Animated.Value(0)).current;

  const translateX = 0;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Animated.View
        style={{
          position: 'absolute',
          top: -height * 0.25,
          left: width * 0.3,
          height: height * 1.5,
          width: width * 0.45,
          transform: [{ translateX }, { rotate: '20deg' }],
        }}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.45)', 'rgba(255,255,255,0)']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}
