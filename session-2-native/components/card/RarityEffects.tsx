import { RarityTheme } from '../../theme/rarity';
import { TiltValues } from '../../hooks/useTilt';
import { HoloFoil } from './HoloFoil';
import { ShimmerSweep } from './ShimmerSweep';
import { Sparkles } from './Sparkles';

interface RarityEffectsProps {
  theme: RarityTheme;
  width: number;
  motion: boolean;   // false in grid thumbnails and when Reduce Motion is on
  tilt?: TiltValues;
}

// Overlay layer drawn on top of the card face. Which effects show up
// is decided by the rarity table, not by this component.
export function RarityEffects({ theme, width, motion, tilt }: RarityEffectsProps) {
  const { shimmer, holo, sparkles } = theme.effects;

  return (
    <>
      {holo && <HoloFoil width={width} tilt={motion ? tilt : undefined} />}
      {shimmer && motion && <ShimmerSweep width={width} />}
      {sparkles && motion && <Sparkles />}
    </>
  );
}
