import { Platform, Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost';
  compact?: boolean;
  disabled?: boolean;
}

export function Button({ label, onPress, variant = 'primary', compact = false, disabled = false }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      // Android gets a ripple, iOS gets a dimmed press — each platform's own idiom.
      android_ripple={{ color: 'rgba(255,255,255,0.25)' }}
      style={({ pressed }) => [
        styles.base,
        compact && styles.compact,
        variant === 'primary' ? styles.primary : styles.ghost,
        disabled && styles.disabled,
        Platform.OS !== 'android' && pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, variant === 'ghost' && styles.ghostLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    // Without this the Android ripple spills past the rounded corners.
    overflow: 'hidden',
  },
  compact: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg },
  primary: { backgroundColor: colors.accent },
  ghost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
  disabled: { opacity: 0.4 },
  pressed: { opacity: 0.7 },
  label: { fontSize: 15, fontWeight: '700', color: '#ffffff' },
  ghostLabel: { color: colors.text },
});
