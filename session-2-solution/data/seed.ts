import { Card, Deck } from '../types';

export const seedDecks: Deck[] = [
  { id: 'deck-1', name: 'Rarity Showcase', description: 'One card of every rarity. Start here for the demo.' },
  { id: 'deck-2', name: 'Ember Legion', description: 'Fire and spark creatures that hit first and ask later.' },
  { id: 'deck-3', name: 'Deep Tide', description: 'Water, shadow and mind creatures from below the surface.' },
];

export const seedCards: Card[] = [
  // ── Rarity Showcase ──────────────────────────────────────────
  { id: 'card-1',  deckId: 'deck-1', name: 'Pebblepup',  emoji: '🐕', element: 'leaf',   rarity: 'common',    hp: 40,  attackName: 'Nibble',        attackDamage: 10,  flavor: 'Always carries a favorite rock.' },
  { id: 'card-2',  deckId: 'deck-1', name: 'Sprigfawn',  emoji: '🦌', element: 'leaf',   rarity: 'uncommon',  hp: 60,  attackName: 'Bramble Kick',  attackDamage: 20,  flavor: 'Flowers bloom where it sleeps.' },
  { id: 'card-3',  deckId: 'deck-1', name: 'Tidecrab',   emoji: '🦀', element: 'water',  rarity: 'rare',      hp: 80,  attackName: 'Claw Surge',    attackDamage: 40,  flavor: 'Its shell hums with the sea.' },
  { id: 'card-4',  deckId: 'deck-1', name: 'Voltmoth',   emoji: '🦋', element: 'spark',  rarity: 'epic',      hp: 100, attackName: 'Static Storm',  attackDamage: 70,  flavor: 'Every wingbeat charges the air.' },
  { id: 'card-5',  deckId: 'deck-1', name: 'Drakoflare', emoji: '🐉', element: 'fire',   rarity: 'legendary', hp: 150, attackName: 'Inferno Crown', attackDamage: 120, flavor: 'Rumored to have lit the first star.' },

  // ── Ember Legion ─────────────────────────────────────────────
  { id: 'card-6',  deckId: 'deck-2', name: 'Emberfox',   emoji: '🦊', element: 'fire',   rarity: 'common',    hp: 50,  attackName: 'Ember Dash',    attackDamage: 20,  flavor: 'Leaves a trail of warm footprints.' },
  { id: 'card-7',  deckId: 'deck-2', name: 'Cinderboar', emoji: '🐗', element: 'fire',   rarity: 'uncommon',  hp: 70,  attackName: 'Ash Charge',    attackDamage: 30,  flavor: 'Never stops, never cools down.' },
  { id: 'card-8',  deckId: 'deck-2', name: 'Blazehawk',  emoji: '🦅', element: 'fire',   rarity: 'rare',      hp: 90,  attackName: 'Sun Dive',      attackDamage: 50,  flavor: 'Hunts in the glare of noon.' },
  { id: 'card-9',  deckId: 'deck-2', name: 'Pyrelion',   emoji: '🦁', element: 'fire',   rarity: 'epic',      hp: 110, attackName: 'Wildfire Roar', attackDamage: 80,  flavor: 'Its mane is a bonfire at dusk.' },

  // ── Deep Tide ────────────────────────────────────────────────
  { id: 'card-10', deckId: 'deck-3', name: 'Ripplefrog', emoji: '🐸', element: 'water',  rarity: 'common',    hp: 45,  attackName: 'Splash',        attackDamage: 10,  flavor: 'Sings only when it rains.' },
  { id: 'card-11', deckId: 'deck-3', name: 'Mindfin',    emoji: '🐬', element: 'mind',   rarity: 'uncommon',  hp: 65,  attackName: 'Echo Pulse',    attackDamage: 25,  flavor: 'Hears thoughts before words.' },
  { id: 'card-12', deckId: 'deck-3', name: 'Duskowl',    emoji: '🦉', element: 'shadow', rarity: 'rare',      hp: 85,  attackName: 'Night Glide',   attackDamage: 45,  flavor: 'Blinks once per eclipse.' },
  { id: 'card-13', deckId: 'deck-3', name: 'Abyssquid',  emoji: '🦑', element: 'shadow', rarity: 'epic',      hp: 105, attackName: 'Ink Eclipse',   attackDamage: 75,  flavor: 'Swallows light for a living.' },
  { id: 'card-14', deckId: 'deck-3', name: 'Aquarion',   emoji: '🐋', element: 'water',  rarity: 'legendary', hp: 160, attackName: 'Tidal Verdict', attackDamage: 130, flavor: 'The ocean answers to its song.' },
];
