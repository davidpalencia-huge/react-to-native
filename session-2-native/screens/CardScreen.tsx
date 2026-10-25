import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useCollection } from '../context/CollectionContext';
import { useTilt } from '../hooks/useTilt';
import { colors, spacing } from '../theme/tokens';
import { rarityThemes, EffectFlags } from '../theme/rarity';
import { Button } from '../components/Button';
import { ScreenHeader } from '../components/ScreenHeader';
import { CardEntrance } from '../components/card/CardEntrance';
import { CardView } from '../components/card/CardView';
import { CARD_ASPECT } from '../components/card/constants';

interface CardScreenProps {
  cardId: string;
  onBack: (deckId: string) => void;
  onOpenCard: (cardId: string) => void;
}

const effectLabels: Record<keyof EffectFlags, string> = {
  pulse: 'Glow pulse',
  shimmer: 'Shimmer sweep',
  holo: 'Holo foil · drag the card',
  sparkles: 'Sparkles',
};

export function CardScreen({ cardId, onBack, onOpenCard }: CardScreenProps) {
  const { getCard, getCardsByDeck } = useCollection();
  const { width, height } = useWindowDimensions();

  // Fit the card to the screen: limited by width AND by the height left under the header and footer.
  const cardWidth = Math.max(180, Math.min(width - spacing.xl * 2, 340, (height - 340) * CARD_ASPECT));
  const { tilt, panHandlers } = useTilt(cardWidth / 2);

  const card = getCard(cardId);
  if (!card) return null;

  const theme = rarityThemes[card.rarity];
  const siblings = getCardsByDeck(card.deckId);
  const index = siblings.findIndex(c => c.id === card.id);
  const activeEffects = (Object.keys(theme.effects) as (keyof EffectFlags)[]).filter(key => theme.effects[key]);

  return (
    <View style={styles.root}>
      <ScreenHeader title={card.name} subtitle={theme.label} onBack={() => onBack(card.deckId)} />

      <View style={styles.stage} {...panHandlers}>
        {/* key = card.id → the entrance replays every time you press Prev / Next */}
        <CardEntrance key={card.id} theme={theme}>
          <CardView card={card} width={cardWidth} animated tilt={tilt} />
        </CardEntrance>
      </View>

      <View style={styles.footer}>
        <View style={styles.effects}>
          {activeEffects.length === 0 ? (
            <Text style={styles.noEffects}>No effects — it's a common card.</Text>
          ) : (
            activeEffects.map(key => (
              <View key={key} style={[styles.effectChip, { borderColor: theme.color }]}>
                <Text style={[styles.effectText, { color: theme.color }]}>{effectLabels[key]}</Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.pager}>
          <Button
            variant="ghost"
            compact
            label="‹ Prev"
            disabled={index <= 0}
            onPress={() => onOpenCard(siblings[index - 1].id)}
          />
          <Text style={styles.counter}>{index + 1} / {siblings.length}</Text>
          <Button
            variant="ghost"
            compact
            label="Next ›"
            disabled={index >= siblings.length - 1}
            onPress={() => onOpenCard(siblings[index + 1].id)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  stage: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  footer: { gap: spacing.lg, paddingHorizontal: spacing.xl, paddingBottom: spacing.xl },
  effects: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.sm },
  effectChip: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md, borderRadius: 20, borderWidth: 1 },
  effectText: { fontSize: 12, fontWeight: '700' },
  noEffects: { fontSize: 13, color: colors.textMuted },
  pager: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  counter: { fontSize: 13, fontWeight: '700', color: colors.textMuted },
});
