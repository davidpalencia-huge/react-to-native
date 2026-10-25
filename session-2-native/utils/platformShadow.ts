import { Platform, ViewStyle } from 'react-native';

// TROUBLESHOOTING #1 · there is no `box-shadow` in React Native 0.74.
//
//   iOS      shadowColor + shadowOpacity + shadowRadius + shadowOffset
//   Android  elevation only. No radius, no opacity. shadowColor tints it on API 28+ only.
//   Web      react-native-web turns the iOS props into a CSS box-shadow.
//
// On Android the shadow is also only drawn when the view has an opaque backgroundColor.
export function glowShadow(color: string, radius: number): ViewStyle {
  if (radius === 0) return {};

  return Platform.select<ViewStyle>({
    android: { elevation: radius, shadowColor: color },
    default: {
      shadowColor: color,
      shadowOpacity: 0.85,
      shadowRadius: radius,
      shadowOffset: { width: 0, height: 0 },
    },
  });
}
