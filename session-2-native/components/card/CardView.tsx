import { Card } from '../../types';
import { elementThemes } from '../../theme/elements';
import { rarityThemes } from '../../theme/rarity';
import { TiltValues } from '../../hooks/useTilt';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CARD_ASPECT } from './constants';
import { CardFace } from './CardFace';
import { CardFrame } from './CardFrame';
import { RarityEffects } from './RarityEffects';

interface CardViewProps {
  card: Card;
  width: number;
  animated?: boolean; // loops + tilt. Off for grid thumbnails.
  tilt?: TiltValues;
}

// Every card gets this gray frame until you do the MID step.
const GRAY_FRAME = ['#e6e9f2', '#9aa4bf', '#9aa4bf', '#6b7590', '#e6e9f2'] as const;

export function CardView({ card, width, animated = false, tilt }: CardViewProps) {
  const theme = rarityThemes[card.rarity];
  const element = elementThemes[card.element];
  const reduceMotion = useReducedMotion();
  const motion = animated && !reduceMotion;

  // Halo reach: full size in the viewer, half size on grid thumbnails.
  const glowSize = animated ? theme.glowRadius : theme.glowRadius / 2;
  const cardRadius = width * 0.05;
  // Frame thickness scales with the card so thumbnails don't get a chunky border.
  const frameWidth = Math.max(2, (theme.borderWidth * width) / 260);

  // ─────────────────────────────────────────────
  // MID · style the card by rarity
  // ─────────────────────────────────────────────
  // `theme` is the row for this card's rarity (see theme/rarity.ts):
  //   theme.color, theme.frame, theme.borderWidth, theme.glowRadius, theme.effects
  //
  //   1. In <CardFrame> below, replace `colors={GRAY_FRAME}` with `colors={theme.frame}`
  //      and `thickness={2}` with `thickness={frameWidth}`.
  //   Tip: the component never asks `card.rarity === 'rare'` — it reads a row.
  //
  // ─────────────────────────────────────────────
  // PLATFORM · glow + the shadow trap  (see utils/platformShadow.ts; GlowHalo.tsx is already built)
  // ─────────────────────────────────────────────
  //   2. Add `glowShadow(theme.color, glowSize / 2)` to CardFrame's `style`
  //      (make it an array: style={[{ width, ... }, glowShadow(...)]}).
  //      Test on iOS AND Android. On iOS: where did the shadow go?
  //      (hint: CardFrame clips its content with overflow: 'hidden'. Read CardFrame.tsx.)
  //   3. Fix it with a wrapper: an outer View that owns the size, radius, shadow and
  //      `backgroundColor: theme.color`. CardFrame goes inside it with style={{ flex: 1 }}.
  //   4. Render <GlowHalo color={theme.color} size={glowSize} radius={cardRadius}
  //      pulse={theme.effects.pulse && motion} /> as the first child of the outer View.
  //
  // ─────────────────────────────────────────────
  // MOTION · tilt  (hooks/useTilt.ts is already written)
  // ─────────────────────────────────────────────
  //   5. Turn the outer View into an Animated.View and add a transform:
  //        [{ perspective: 900 }, { rotateX }, { rotateY }]
  //      rotateX / rotateY come from tilt.y / tilt.x with .interpolate()
  //      (input -1..1 → output '14deg'..'-14deg'). Only when `tilt && motion`.
  // ─────────────────────────────────────────────
  return (
    <CardFrame
      style={{ width, aspectRatio: CARD_ASPECT }}
      colors={GRAY_FRAME}
      body={element.body}
      thickness={2}
      radius={cardRadius}
      sheen={theme.sheen}
      overlay={<RarityEffects theme={theme} width={width} motion={motion} tilt={tilt} />}
    >
      <CardFace card={card} width={width} animate={motion} />
    </CardFrame>
  );
}
