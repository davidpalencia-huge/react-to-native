import { StyleSheet, View } from 'react-native';
import { Rarity } from '../../types';
import { rarityOrder, rarityThemes } from '../../theme/rarity';

interface RarityGemsProps {
  rarity: Rarity;
  size: number;
}

// Five diamonds, filled up to the card's rarity: ◆◆◆◇◇
export function RarityGems({ rarity, size }: RarityGemsProps) {
  const level = rarityOrder.indexOf(rarity) + 1;
  const color = rarityThemes[rarity].color;

  return (
    <View style={[styles.row, { gap: size * 0.75 }]}>
      {rarityOrder.map((_, i) => {
        const filled = i < level;
        return (
          <View
            key={i}
            style={[
              styles.gem,
              { width: size, height: size, borderRadius: size * 0.18 },
              filled ? { backgroundColor: color, borderColor: 'rgba(255,255,255,0.85)' } : styles.empty,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  gem: { borderWidth: 1.5, transform: [{ rotate: '45deg' }] },
  empty: { backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.25)' },
});
