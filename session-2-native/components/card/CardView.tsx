import { Animated, StyleSheet } from 'react-native';
import { Card } from '../../types';
import { elementThemes } from '../../theme/elements';
import { rarityThemes } from '../../theme/rarity';
import { TiltValues } from '../../hooks/useTilt';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { glowShadow } from '../../utils/platformShadow';
import { CARD_ASPECT } from './constants';
import { CardFace } from './CardFace';
import { CardFrame } from './CardFrame';
import { GlowHalo } from './GlowHalo';
import { RarityEffects } from './RarityEffects';

interface CardViewProps {
  card: Card;
  width: number;
  animated?: boolean; // loops + tilt. Off for grid thumbnails.
  tilt?: TiltValues;
}

export function CardView({ card, width, animated = false, tilt }: CardViewProps) {
  const theme = rarityThemes[card.rarity];
  const element = elementThemes[card.element];
  const reduceMotion = useReducedMotion();
  const motion = animated && !reduceMotion;

  const glowSize = animated ? theme.glowRadius : theme.glowRadius / 2;
  const cardRadius = width * 0.05;
  // Frame thickness scales with the card so thumbnails don't get a chunky border.
  const frameWidth = Math.max(2, (theme.borderWidth * width) / 260);

  // Transform order matters: `perspective` must come first or the tilt looks flat.
  const tiltTransform =
    tilt && motion
      ? [
          { perspective: 900 },
          { rotateX: tilt.y.interpolate({ inputRange: [-1, 1], outputRange: ['14deg', '-14deg'] }) },
          { rotateY: tilt.x.interpolate({ inputRange: [-1, 1], outputRange: ['-14deg', '14deg'] }) },
        ]
      : undefined;

  return (
    // TROUBLESHOOTING #2 · two layers on purpose.
    // Outer View: shadow + glow (needs overflow: visible, and an opaque background for Android elevation).
    // CardFrame:  clips the frame and effects to the rounded corners (overflow: hidden).
    // Put the shadow on CardFrame itself and iOS cuts it off.
    <Animated.View
      style={[
        { width, aspectRatio: CARD_ASPECT, borderRadius: cardRadius, backgroundColor: theme.color },
        glowShadow(theme.color, glowSize / 2),
        tiltTransform && { transform: tiltTransform },
      ]}
    >
      <GlowHalo color={theme.color} size={glowSize} radius={cardRadius} pulse={theme.effects.pulse && motion} />

      <CardFrame
        style={styles.frame}
        colors={theme.frame}
        body={element.body}
        thickness={frameWidth}
        radius={cardRadius}
        sheen={theme.sheen}
        overlay={<RarityEffects theme={theme} width={width} motion={motion} tilt={tilt} />}
      >
        <CardFace card={card} width={width} animate={motion} />
      </CardFrame>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  frame: { flex: 1 },
});
