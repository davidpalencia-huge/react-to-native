import { GradientColors, Rarity } from '../types';

export interface EffectFlags {
  pulse: boolean;    // breathing glow
  shimmer: boolean;  // light band sweeping across the card
  holo: boolean;     // rainbow foil that follows the tilt
  sparkles: boolean; // twinkling diamonds
}

// How the card arrives on the viewer screen. Every value is the START state;
// the card animates from here to its normal position, size and angle.
export interface Entrance {
  translateY: number; // px below its final position
  scale: number;      // 1 = full size
  rotateY: number;    // degrees; 180 = shows its back first, then flips
  spring: boolean;    // bouncy spring instead of a smooth ease-out
}

export interface RarityTheme {
  label: string;
  color: string;         // glow + accents
  frame: GradientColors; // metallic frame: light → dark → light, like polished metal
  borderWidth: number;   // frame thickness at the 260px design size
  glowRadius: number;    // 0 = no glow
  sheen: number;         // 0–1, strength of the glass reflection over the card
  richness: 0 | 1 | 2 | 3; // how much decoration the artwork window gets
  float: number;         // px the card bobs up and down in the viewer. 0 = still
  entrance: Entrance;
  effects: EffectFlags;
}

const none: EffectFlags = { pulse: false, shimmer: false, holo: false, sparkles: false };

// One place decides what each rarity looks like and how it behaves.
// Components never check `card.rarity === 'rare'` — they read this table.
//
//   richness  0 plain artwork · 1 + glowing discs · 2 + sunburst rays and corner icons · 3 + double rays
export const rarityThemes: Record<Rarity, RarityTheme> = {
  common: {
    label: 'Common', color: '#9aa4bf', borderWidth: 2, glowRadius: 0, sheen: 0.04, richness: 0, float: 0,
    entrance: { translateY: 0, scale: 0.8, rotateY: 0, spring: false },
    // Almost flat: a matte frame, no polished-metal gradient.
    frame: ['#a3abc2', '#8d97b3', '#8d97b3', '#7c86a2', '#a3abc2'],
    effects: none,
  },
  uncommon: {
    label: 'Uncommon', color: '#3ddc97', borderWidth: 3, glowRadius: 8, sheen: 0.1, richness: 1, float: 0,
    entrance: { translateY: 90, scale: 0.95, rotateY: 0, spring: false },
    frame: ['#bff5da', '#5fe0a8', '#2aa571', '#4dd69c', '#bff5da'],
    effects: none,
  },
  rare: {
    label: 'Rare', color: '#4cc9f0', borderWidth: 4, glowRadius: 14, sheen: 0.16, richness: 2, float: 9,
    entrance: { translateY: 130, scale: 0.8, rotateY: 0, spring: true },
    frame: ['#dcf7ff', '#7adcf7', '#1e7fb0', '#4cc9f0', '#dcf7ff'],
    effects: { ...none, pulse: true },
  },
  epic: {
    label: 'Epic', color: '#b46bff', borderWidth: 4, glowRadius: 18, sheen: 0.2, richness: 2, float: 12,
    entrance: { translateY: 0, scale: 0.25, rotateY: 0, spring: true },
    frame: ['#f3e3ff', '#cf9bff', '#6a2fc2', '#b46bff', '#f3e3ff'],
    effects: { ...none, pulse: true, shimmer: true },
  },
  legendary: {
    label: 'Legendary', color: '#ffc53d', borderWidth: 5, glowRadius: 24, sheen: 0.24, richness: 3, float: 15,
    entrance: { translateY: 90, scale: 0.4, rotateY: 180, spring: true },
    frame: ['#fff8d6', '#ffd978', '#b9770e', '#ffc53d', '#fff6c2'],
    effects: { pulse: true, shimmer: true, holo: true, sparkles: true },
  },
};

export const rarityOrder: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
