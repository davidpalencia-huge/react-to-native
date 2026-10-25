import { ElementType, GradientColors } from '../types';

export interface ElementTheme {
  label: string;
  icon: string;
  art: GradientColors;  // bright gradient behind the creature
  body: GradientColors; // dark gradient of the card itself (light top-left → deep bottom-right)
  base: string;         // flat fallback color (deck fan thumbnails)
}

export const elementThemes: Record<ElementType, ElementTheme> = {
  fire:   { label: 'Fire',   icon: '🔥', art: ['#ffb35c', '#e0481c'], body: ['#7a2a14', '#260c07'], base: '#3a1810' },
  water:  { label: 'Water',  icon: '💧', art: ['#6fd3ff', '#1f66d1'], body: ['#14407e', '#06172e'], base: '#0f2540' },
  leaf:   { label: 'Leaf',   icon: '🍃', art: ['#8ff09b', '#1f8a48'], body: ['#14602f', '#06220e'], base: '#10301c' },
  spark:  { label: 'Spark',  icon: '⚡', art: ['#fff06b', '#e09a00'], body: ['#7a5f0a', '#241b04'], base: '#3a3010' },
  shadow: { label: 'Shadow', icon: '🌙', art: ['#a98aff', '#35238a'], body: ['#3d2a8c', '#0f0a2e'], base: '#1c1540' },
  mind:   { label: 'Mind',   icon: '🔮', art: ['#ff9fe0', '#a0289a'], body: ['#7a1f6c', '#240720'], base: '#3a1035' },
};

export const elementOrder = Object.keys(elementThemes) as ElementType[];
