import { Animated, StyleSheet, View } from 'react-native';
import { usePulse } from '../../hooks/usePulse';

interface GlowHaloProps {
  color: string;
  size: number;   // how far the glow reaches outside the card, in px
  radius: number; // the card's borderRadius
  pulse: boolean;
}

const LAYERS = 10;

// Android cannot do colored blur shadows. So we fake one: stacked rounded
// rectangles, each a bit bigger than the last, all translucent.
// Read it, then render it from CardView (PLATFORM step 7).
export function GlowHalo({ color, size, radius, pulse }: GlowHaloProps) {
  const opacity = usePulse(pulse);

  if (size === 0) return null;

  return (
    <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity }]}>
      {Array.from({ length: LAYERS }, (_, i) => {
        const spread = (size * (i + 1)) / LAYERS;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              top: -spread,
              left: -spread,
              right: -spread,
              bottom: -spread,
              borderRadius: radius + spread,
              backgroundColor: color,
              opacity: 0.085,
            }}
          />
        );
      })}
    </Animated.View>
  );
}
