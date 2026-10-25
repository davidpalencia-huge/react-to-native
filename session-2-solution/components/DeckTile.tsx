import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card, Deck } from '../types';
import { colors, fonts, radius, spacing } from '../theme/tokens';
import { elementThemes } from '../theme/elements';
import { rarityOrder, rarityThemes } from '../theme/rarity';

interface DeckTileProps {
  deck: Deck;
  cards: Card[];
  onPress: () => void;
}

export function DeckTile({ deck, cards, onPress }: DeckTileProps) {
  // Fan out the three rarest cards, rarest on top.
  const preview = [...cards]
    .sort((a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity))
    .slice(-3);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.tile, pressed && styles.pressed]}>
      <View style={styles.fan}>
        {preview.length === 0 && (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderPlus}>+</Text>
          </View>
        )}
        {preview.map((card, i) => (
          <View
            key={card.id}
            style={[
              styles.mini,
              {
                backgroundColor: elementThemes[card.element].base,
                borderColor: rarityThemes[card.rarity].color,
                marginLeft: i === 0 ? 0 : -18,
                zIndex: i,
                transform: [{ rotate: `${(i - 1) * 8}deg` }],
              },
            ]}
          >
            <Text style={styles.miniEmoji}>{card.emoji}</Text>
          </View>
        ))}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{deck.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{deck.description}</Text>
        <Text style={styles.count}>{cards.length} {cards.length === 1 ? 'card' : 'cards'}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
  pressed: { backgroundColor: colors.surfaceAlt },
  fan: { width: 104, height: 76, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  mini: { width: 46, height: 64, borderRadius: 7, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  miniEmoji: { fontSize: 22, lineHeight: 28, textAlign: 'center', includeFontPadding: false },
  // Empty deck: a dashed "ghost" card, like an empty slot in a binder.
  placeholder: {
    width: 46,
    height: 64,
    borderRadius: 7,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderPlus: { fontSize: 22, lineHeight: 26, color: colors.textMuted, includeFontPadding: false },
  info: { flex: 1, gap: 2 },
  name: { fontFamily: fonts.heading, fontSize: 18, fontWeight: '700', color: colors.text },
  description: { fontSize: 13, color: colors.textMuted },
  count: { fontSize: 12, fontWeight: '700', color: colors.accent, marginTop: spacing.xs },
});
