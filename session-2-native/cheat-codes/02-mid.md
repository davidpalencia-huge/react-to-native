# Mid · Style by rarity

## `components/card/CardView.tsx`

In the `<CardFrame>` at the bottom, swap the two hardcoded values for the rarity theme:

```tsx
return (
  <CardFrame
    style={{ width, aspectRatio: CARD_ASPECT }}
    colors={theme.frame}
    body={element.body}
    thickness={frameWidth}
    radius={cardRadius}
    sheen={theme.sheen}
    overlay={<RarityEffects theme={theme} width={width} motion={motion} tilt={tilt} />}
  >
    <CardFace card={card} width={width} animate={motion} />
  </CardFrame>
);
```

You can now delete the `GRAY_FRAME` constant.

## Why

`theme/rarity.ts` is the one table that decides how every rarity looks:
the metal of the frame, its thickness, the glow, the effects.
The component never writes `if (card.rarity === 'rare')` — it reads a row.
Adding a sixth rarity later means adding one row, not touching any component.

A CSS `border-image: linear-gradient(...)` does not exist in React Native, so `CardFrame`
fakes it: a gradient View with padding, and the card body inside. Open it and read.

When values are static, keep them in `StyleSheet.create`.
When they depend on props, use a style array:

```tsx
style={[styles.card, { borderColor: theme.color }]}
```
