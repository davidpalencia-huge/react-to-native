import { Platform } from 'react-native';

// No CSS variables in React Native — design tokens are plain JS constants.
// There is also no cascade: every component imports what it needs.

export const colors = {
  bg: '#0b0f1a',
  surface: '#151b2e',
  surfaceAlt: '#1d2540',
  border: '#2a3354',
  text: '#f4f6ff',
  textMuted: '#8b94b8',
  accent: '#7c5cff',
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };

export const radius = { sm: 8, md: 12, lg: 16 };

// TROUBLESHOOTING #4 · system font names differ per OS.
// 'Avenir Next' does not exist on Android, 'sans-serif-condensed' does not exist on iOS.
export const fonts = {
  heading: Platform.select({ ios: 'Avenir Next', android: 'sans-serif-condensed', default: 'System' }),
  mono: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
};
