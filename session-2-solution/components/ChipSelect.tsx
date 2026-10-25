import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/tokens';

export interface ChipOption<T extends string> {
  value: T;
  label: string;
  color: string;
}

interface ChipSelectProps<T extends string> {
  label: string;
  options: ChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

// flexWrap: 'wrap' is the closest thing to CSS `flex-wrap` — chips flow onto new lines.
export function ChipSelect<T extends string>({ label, options, value, onChange }: ChipSelectProps<T>) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.chips}>
        {options.map(option => {
          const selected = option.value === value;
          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              // 8-digit hex is #RRGGBBAA in React Native (22 ≈ 13% alpha)
              style={[
                styles.chip,
                { borderColor: selected ? option.color : colors.border },
                selected && { backgroundColor: `${option.color}22` },
              ]}
            >
              <Text style={[styles.chipText, selected && { color: option.color }]}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.sm },
  label: { fontSize: 12, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: 20, borderWidth: 1.5 },
  chipText: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
});
