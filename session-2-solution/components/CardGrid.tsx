import { Pressable, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { Card } from '../types';
import { spacing } from '../theme/tokens';
import { CardView } from './card/CardView';

interface CardGridProps {
  cards: Card[];
  onSelect: (cardId: string) => void;
}

// Two columns with flexWrap. No CSS Grid in RN, and no `vw` unit either:
// the card width comes from useWindowDimensions().
export function CardGrid({ cards, onSelect }: CardGridProps) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - spacing.xl * 2 - spacing.lg) / 2;

  return (
    <ScrollView contentContainerStyle={styles.grid}>
      {cards.map(card => (
        <Pressable
          key={card.id}
          onPress={() => onSelect(card.id)}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <CardView card={card} width={cardWidth} />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xl * 2,
  },
  pressed: { opacity: 0.8, transform: [{ scale: 0.97 }] },
});
