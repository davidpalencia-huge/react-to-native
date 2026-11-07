# Live · Add the Legendary rarity

Each stage = one visible change. Stages 2–5 only edit the `legendary` row in `theme/rarity.ts`.

## Stage 1 · Make it exist (~2 min)

`types.ts`
```ts
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
```

`theme/rarity.ts` → `rarityOrder` (gems row grows to 5, new chip in + Card)
```ts
export const rarityOrder: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
```

`theme/rarity.ts` → add after `epic` (plain on purpose: it looks like Common)
```ts
  legendary: {
    label: 'Legendary', color: '#9aa4bf', borderWidth: 2, glowRadius: 0, sheen: 0.04, richness: 0, float: 0,
    entrance: { translateY: 0, scale: 0.8, rotateY: 0, spring: false },
    frame: ['#a3abc2', '#8d97b3', '#8d97b3', '#7c86a2', '#a3abc2'],
    effects: none,
  },
```

`data/seed.ts` → after card-4 (Rarity Showcase) and after card-13 (Deep Tide)
```ts
  { id: 'card-5',  deckId: 'deck-1', name: 'Drakoflare', emoji: '🐉', element: 'fire',   rarity: 'legendary', hp: 150, attackName: 'Inferno Crown', attackDamage: 120, flavor: 'Rumored to have lit the first star.' },
```
```ts
  { id: 'card-14', deckId: 'deck-3', name: 'Aquarion',   emoji: '🐋', element: 'water',  rarity: 'legendary', hp: 160, attackName: 'Tidal Verdict', attackDamage: 130, flavor: 'The ocean answers to its song.' },
```

## Stage 2 · Metal + glow

Replace the `label` line and the `frame` line:
```ts
    label: 'Legendary', color: '#ffc53d', borderWidth: 5, glowRadius: 24, sheen: 0.04, richness: 0, float: 0,
```
```ts
    frame: ['#fff8d6', '#ffd978', '#b9770e', '#ffc53d', '#fff6c2'],
```

## Stage 3 · Depth

Replace the `label` line:
```ts
    label: 'Legendary', color: '#ffc53d', borderWidth: 5, glowRadius: 24, sheen: 0.24, richness: 3, float: 15,
```

## Stage 4 · Effects

Replace the `effects` line:
```ts
    effects: { pulse: true, shimmer: true, holo: true, sparkles: true },
```
Open the card and drag it: tilt + rainbow foil.

## Stage 5 · Entrance

Replace the `entrance` line:
```ts
    entrance: { translateY: 90, scale: 0.4, rotateY: 180, spring: true },
```
Press Prev / Next to replay the flip.

## All at once (final row)

Replace the whole `legendary` row from Stage 1 with:
```ts
  legendary: {
    label: 'Legendary', color: '#ffc53d', borderWidth: 5, glowRadius: 24, sheen: 0.24, richness: 3, float: 15,
    entrance: { translateY: 90, scale: 0.4, rotateY: 180, spring: true },
    frame: ['#fff8d6', '#ffd978', '#b9770e', '#ffc53d', '#fff6c2'],
    effects: { pulse: true, shimmer: true, holo: true, sparkles: true },
  },
```
