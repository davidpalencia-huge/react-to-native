import { createContext, useContext, useState, ReactNode } from 'react';
import { Card, Deck, NewCardInput, NewDeckInput } from '../types';
import { seedCards, seedDecks } from '../data/seed';

interface CollectionContextType {
  decks: Deck[];
  getDeck: (id: string) => Deck | undefined;
  getCard: (id: string) => Card | undefined;
  getCardsByDeck: (deckId: string) => Card[];
  createDeck: (input: NewDeckInput) => Deck;
  createCard: (input: NewCardInput) => Card;
}

const CollectionContext = createContext<CollectionContextType | null>(null);

let nextId = 100;
const makeId = (prefix: string) => `${prefix}-${nextId++}`;

// In-memory only — same Context pattern as Workshop 1. Nothing here is about styling.
export function CollectionProvider({ children }: { children: ReactNode }) {
  const [decks, setDecks] = useState<Deck[]>(seedDecks);
  const [cards, setCards] = useState<Card[]>(seedCards);

  const getDeck = (id: string) => decks.find(d => d.id === id);
  const getCard = (id: string) => cards.find(c => c.id === id);
  const getCardsByDeck = (deckId: string) => cards.filter(c => c.deckId === deckId);

  const createDeck = (input: NewDeckInput) => {
    const deck: Deck = { id: makeId('deck'), ...input };
    setDecks(prev => [...prev, deck]);
    return deck;
  };

  const createCard = (input: NewCardInput) => {
    const card: Card = { id: makeId('card'), ...input };
    setCards(prev => [...prev, card]);
    return card;
  };

  return (
    <CollectionContext.Provider
      value={{ decks, getDeck, getCard, getCardsByDeck, createDeck, createCard }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollection(): CollectionContextType {
  const context = useContext(CollectionContext);
  if (!context) throw new Error('useCollection must be used within CollectionProvider');
  return context;
}
