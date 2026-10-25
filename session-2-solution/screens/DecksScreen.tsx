import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useCollection } from '../context/CollectionContext';
import { spacing } from '../theme/tokens';
import { Button } from '../components/Button';
import { DeckForm } from '../components/DeckForm';
import { DeckTile } from '../components/DeckTile';
import { FormSheet } from '../components/FormSheet';
import { ScreenHeader } from '../components/ScreenHeader';

interface DecksScreenProps {
  onOpenDeck: (deckId: string) => void;
}

export function DecksScreen({ onOpenDeck }: DecksScreenProps) {
  const { decks, getCardsByDeck, createDeck } = useCollection();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <View style={styles.root}>
      <ScreenHeader
        title="Card Vault"
        subtitle="Styles & CSS · Workshop 2"
        action={<Button compact label="+ Deck" onPress={() => setFormOpen(true)} />}
      />

      <ScrollView contentContainerStyle={styles.list}>
        {decks.map(deck => (
          <DeckTile
            key={deck.id}
            deck={deck}
            cards={getCardsByDeck(deck.id)}
            onPress={() => onOpenDeck(deck.id)}
          />
        ))}
      </ScrollView>

      <FormSheet visible={formOpen} title="New deck" onClose={() => setFormOpen(false)}>
        <DeckForm
          onSubmit={input => {
            createDeck(input);
            setFormOpen(false);
          }}
        />
      </FormSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  list: { gap: spacing.md, padding: spacing.xl, paddingTop: spacing.md },
});
