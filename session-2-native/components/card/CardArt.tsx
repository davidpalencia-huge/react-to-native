import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, GradientColors } from '../../types';
import { elementThemes } from '../../theme/elements';

interface CardArtProps {
  card: Card;
  frame: GradientColors; // same metal as the card frame, so the window feels part of it
  unit: number;          // card width / 300 — scales borders and radii
  richness: number; // 0–3, how much decoration to draw (see theme/rarity.ts)
  animate?: boolean;     // the creature breathes
  style?: StyleProp<ViewStyle>;
}

const ICON_SPOTS = [
  { left: '7%', top: '8%' },
  { left: '80%', top: '12%' },
  { left: '9%', top: '72%' },
  { left: '82%', top: '68%' },
] as const;

// The artwork window. No images: depth comes from stacking Views —
// gradient → sunburst rays → glowing discs → ground shadow → creature → gloss.
// The higher the rarity, the more layers are drawn.
export function CardArt({ card, frame, unit, richness, animate = false, style }: CardArtProps) {
  const element = elementThemes[card.element];
  const [box, setBox] = useState({ w: 0, h: 0 });
  const breathe = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animate) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(breathe, { toValue: 0, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    loop.start();

    return () => loop.stop();
  }, [animate, breathe]);

  // `flex: 1` decides the size, so we only know it after layout.
  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setBox({ w: width, h: height });
  };

  const d = Math.min(box.w, box.h);
  const ring = Math.max(1.5, 2.5 * unit);
  const radius = 12 * unit;
  const rays = richness >= 3 ? 16 : richness >= 2 ? 8 : 0;

  return (
    <LinearGradient
      colors={frame}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ padding: ring, borderRadius: radius, overflow: 'hidden', minHeight: 110 * unit }, style]}
    >
      <LinearGradient
        colors={element.art}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        onLayout={onLayout}
        style={[styles.window, { borderRadius: Math.max(radius - ring, 0) }]}
      >
        {d > 0 && (
          <>
            {/* Sunburst: thin translucent bars crossing at the center */}
            {Array.from({ length: rays / 2 }, (_, i) => (
              <View
                key={i}
                style={[
                  styles.ray,
                  { width: d * 0.1, height: Math.hypot(box.w, box.h) * 1.1, transform: [{ rotate: `${(i * 360) / rays}deg` }] },
                ]}
              />
            ))}

            {/* Glowing discs behind the creature */}
            {richness >= 1 && (
              <>
                <View style={[styles.disc, { width: d * 0.98, height: d * 0.98, borderRadius: d, borderWidth: 1.5 }]} />
                <View style={[styles.disc, styles.discFill, { width: d * 0.74, height: d * 0.74, borderRadius: d }]} />
              </>
            )}

            {/* Faint element icons in the corners */}
            {richness >= 2 &&
              ICON_SPOTS.map((spot, i) => (
                <Text key={i} style={[styles.spot, spot, { fontSize: d * 0.14 }]}>{element.icon}</Text>
              ))}

            {/* Ground shadow, then the creature on top of it */}
            <View
              style={[
                styles.ground,
                { bottom: box.h * 0.12, width: d * 0.4, height: d * 0.05, borderRadius: d },
              ]}
            />
            <Animated.Text
              style={[
                styles.creature,
                {
                  fontSize: d * 0.54,
                  lineHeight: d * 0.7,
                  textShadowOffset: { width: 0, height: d * 0.03 },
                  textShadowRadius: d * 0.06,
                  transform: [{ scale: breathe.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] }) }],
                },
              ]}
            >
              {card.emoji}
            </Animated.Text>
          </>
        )}

        {/* Common cards get a dull, washed-out artwork */}
        {richness === 0 && (
          <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.matte]} />
        )}

        {/* Diagonal gloss + bottom vignette */}
        <LinearGradient
          pointerEvents="none"
          colors={['rgba(255,255,255,0.22)', 'rgba(255,255,255,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.55, y: 0.55 }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          pointerEvents="none"
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.32)']}
          start={{ x: 0.5, y: 0.55 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </LinearGradient>
    </LinearGradient>
  );
}

// In React Native, absolutely positioned children with no top/left are centered
// by the parent's alignItems/justifyContent — unlike the web, where they sit top-left.
const styles = StyleSheet.create({
  window: { flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  ray: { position: 'absolute', backgroundColor: 'rgba(255,255,255,0.13)' },
  disc: { position: 'absolute', borderColor: 'rgba(255,255,255,0.28)' },
  discFill: { backgroundColor: 'rgba(255,255,255,0.11)', borderWidth: 0 },
  spot: { position: 'absolute', opacity: 0.3, includeFontPadding: false },
  ground: { position: 'absolute', backgroundColor: 'rgba(0,0,0,0.18)' },
  matte: { backgroundColor: 'rgba(48,54,78,0.3)' },
  creature: {
    textAlign: 'center',
    includeFontPadding: false,
    textShadowColor: 'rgba(0,0,0,0.45)',
  },
});
