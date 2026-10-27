import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CARD_ASPECT } from './constants';

interface ShimmerSweepProps {
  width: number;
}

// A band of light sweeping across the card (Epic + Legendary).
// `progress` loops 0 → 1, rests, then jumps back to 0. The interpolation maps it to a
// translateX. Only transform is animated, so useNativeDriver works.
//
// Look at the gradient colors: 'transparent' would show a grey fringe on iOS.
// That is why they fade to rgba(255,255,255,0) instead.
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
