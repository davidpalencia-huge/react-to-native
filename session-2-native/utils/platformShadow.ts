import { Platform, ViewStyle } from 'react-native';

// ─────────────────────────────────────────────
// PLATFORM · colored glow shadow
// ─────────────────────────────────────────────
// There is no `box-shadow` in React Native 0.74. Each OS has its own API:
//
//   iOS      shadowColor, shadowOpacity, shadowRadius, shadowOffset
//   Android  elevation only. No radius, no opacity. shadowColor tints it on API 28+.
//   Web      react-native-web turns the iOS props into a CSS box-shadow.
//
//   1. Return {} when radius is 0
//   2. Platform.select<ViewStyle>({ android: ..., default: ... })
//        android → { elevation: radius, shadowColor: color }
//        default → shadowColor, shadowOpacity 0.85, shadowRadius, shadowOffset { 0, 0 }
//
// Heads up: Android only draws the shadow if the view has an opaque backgroundColor.
export function glowShadow(color: string, radius: number): ViewStyle {
  return {};
}
