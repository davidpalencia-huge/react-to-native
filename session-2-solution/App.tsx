import { useState } from 'react';
import { CollectionProvider } from './context/CollectionContext';
import { Screen } from './components/Screen';
import { DecksScreen } from './screens/DecksScreen';
import { DeckScreen } from './screens/DeckScreen';
import { CardScreen } from './screens/CardScreen';

type Route =
  | { name: 'decks' }
  | { name: 'deck'; deckId: string }
  | { name: 'card'; cardId: string };

// Navigation is just state for now. Workshop 3 swaps this for React Navigation.
export default function App() {
  const [route, setRoute] = useState<Route>({ name: 'decks' });

  return (
    <CollectionProvider>
      <Screen>
        {route.name === 'decks' && (
          <DecksScreen onOpenDeck={deckId => setRoute({ name: 'deck', deckId })} />
        )}
        {route.name === 'deck' && (
          <DeckScreen
            deckId={route.deckId}
            onBack={() => setRoute({ name: 'decks' })}
            onOpenCard={cardId => setRoute({ name: 'card', cardId })}
          />
        )}
        {route.name === 'card' && (
          <CardScreen
            cardId={route.cardId}
            onBack={deckId => setRoute({ name: 'deck', deckId })}
            onOpenCard={cardId => setRoute({ name: 'card', cardId })}
          />
        )}
      </Screen>
    </CollectionProvider>
  );
}
