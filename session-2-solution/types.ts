export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export type ElementType = 'fire' | 'water' | 'leaf' | 'spark' | 'shadow' | 'mind';

export interface Deck {
  id: string;
  name: string;
  description: string;
}

export interface Card {
  id: string;
  deckId: string;
  name: string;
  emoji: string;
  element: ElementType;
  rarity: Rarity;
  hp: number;
  attackName: string;
  attackDamage: number;
  flavor: string;
}

export type NewDeckInput = Omit<Deck, 'id'>;
export type NewCardInput = Omit<Card, 'id'>;

// expo-linear-gradient needs at least two colors.
export type GradientColors = readonly [string, string, ...string[]];
