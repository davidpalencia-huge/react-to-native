import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCollection } from '../context/CollectionContext';
import { colors, spacing } from '../theme/tokens';
import { Button } from '../components/Button';
import { CardForm } from '../components/CardForm';
import { CardGrid } from '../components/CardGrid';
import { FormSheet } from '../components/FormSheet';
import { ScreenHeader } from '../components/ScreenHeader';

interface DeckScreenProps {
  deckId: string;
  onBack: () => void;
  onOpenCard: (cardId: string) => void;
}

export function DeckScreen({ deckId, onBack, onOpenCard }: DeckScreenProps) {
  const { getDeck, getCardsByDeck, createCard } = useCollection();
  const [formOpen, setFormOpen] = useState(false);

  const deck = getDeck(deckId);
  const cards = getCardsByDeck(deckId);

  if (!deck) return null;

  return (
    <View style={styles.root}>
      <ScreenHeader
        title={deck.name}
        subtitle={`${cards.length} ${cards.length === 1 ? 'card' : 'cards'}`}
        onBack={onBack}
        action={<Button compact label="+ Card" onPress={() => setFormOpen(true)} />}
      />

      {cards.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No cards yet</Text>
          <Text style={styles.emptyText}>Create the first one and pick a rarity.</Text>
        </View>
      ) : (
        <CardGrid cards={cards} onSelect={onOpenCard} />
      )}

      <FormSheet visible={formOpen} title="New card" onClose={() => setFormOpen(false)}>
        <CardForm
          deckId={deckId}
          onSubmit={input => {
            createCard(input);
            setFormOpen(false);
          }}
        />
      </FormSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.xs },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  emptyText: { fontSize: 14, color: colors.textMuted },
});
