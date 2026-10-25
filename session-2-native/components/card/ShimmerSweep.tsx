import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CARD_ASPECT } from './constants';

interface ShimmerSweepProps {
  width: number;
}

// MOTION · a diagonal band of light that sweeps across the card, rests, repeats.
// Must live inside the card's `overflow: hidden` view so the band is clipped
// to the rounded corners.
export function ShimmerSweep({ width }: ShimmerSweepProps) {
  const height = width / CARD_ASPECT;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.delay(1600),
        Animated.timing(progress, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    );
    loop.start();

    return () => loop.stop();
  }, [progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.8, width * 1.3],
  });

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Animated.View
        style={{
          position: 'absolute',
          top: -height * 0.25,
          height: height * 1.5,
          width: width * 0.45,
          transform: [{ translateX }, { rotate: '20deg' }],
        }}
      >
        {/* TROUBLESHOOTING #5 · 'transparent' means transparent BLACK on iOS → grey fringe.
            Fade to the same color with alpha 0 instead. */}
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
