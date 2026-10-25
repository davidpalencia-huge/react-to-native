import { StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ElementTheme } from '../../theme/elements';

interface ElementBadgeProps {
  element: ElementTheme;
  size: number;
}

// The round orb next to the card name.
export function ElementBadge({ element, size }: ElementBadgeProps) {
  return (
    <LinearGradient
      colors={element.art}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={[
        styles.orb,
        { width: size, height: size, borderRadius: size / 2, borderWidth: Math.max(1.5, size * 0.07) },
      ]}
    >
      <Text style={[styles.icon, { fontSize: size * 0.5, lineHeight: size * 0.64 }]}>{element.icon}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  orb: { alignItems: 'center', justifyContent: 'center', borderColor: 'rgba(255,255,255,0.85)' },
  icon: { textAlign: 'center', includeFontPadding: false },
});
