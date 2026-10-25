import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientColors } from '../../types';

interface CardFrameProps {
  colors: GradientColors; // metallic frame
  body: GradientColors;   // card background
  thickness: number;
  radius: number;
  style?: StyleProp<ViewStyle>;
  sheen?: number;         // 0–1, strength of the glass reflection
  overlay?: ReactNode;    // drawn above everything, frame included (foil, shimmer, sparkles)
  children: ReactNode;
}

// A CSS `border-image: linear-gradient(...)` does not exist in React Native, so the
// frame is a gradient View with padding, and the card body sits inside it.
//
// This View has `overflow: 'hidden'` (it clips the rounded corners and the effects).
// That means it also clips its own shadow on iOS: never put the glow shadow on it.
export function CardFrame({ colors, body, thickness, radius, sheen = 0.16, style, overlay, children }: CardFrameProps) {
  const innerRadius = Math.max(radius - thickness, 0);

  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ padding: thickness, borderRadius: radius, overflow: 'hidden' }, style]}
    >
      <LinearGradient
        colors={body}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={[styles.body, { borderRadius: innerRadius }]}
      >
        {children}

        {/* Glass reflection across the top-left corner */}
        <LinearGradient
          pointerEvents="none"
          colors={[`rgba(255,255,255,${sheen})`, 'rgba(255,255,255,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.7, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
        {/* Hairline highlight where the body meets the frame */}
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.inset, { borderRadius: innerRadius }]} />
      </LinearGradient>

      {overlay && (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          {overlay}
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, overflow: 'hidden' },
  inset: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)' },
});
