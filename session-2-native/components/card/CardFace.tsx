import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../../types';
import { colors, fonts } from '../../theme/tokens';
import { elementThemes } from '../../theme/elements';
import { rarityThemes } from '../../theme/rarity';
import { CardArt } from './CardArt';
import { ElementBadge } from './ElementBadge';
import { RarityGems } from './RarityGems';

interface CardFaceProps {
  card: Card;
  width: number;
  animate?: boolean; // the creature breathes
}

// BASE · the card layout. Pure Flexbox — no rarity effects in here.
// The same component renders the 165px grid thumbnail and the 340px viewer,
// so every size is derived from `width`.
export function CardFace({ card, width, animate = false }: CardFaceProps) {
  const unit = width / 300;
  const styles = useMemo(() => makeStyles(width), [width]);
  const compact = width < 220;
  const rarity = rarityThemes[card.rarity];
  const element = elementThemes[card.element];

  return (
    <View style={styles.face}>
      <View style={styles.header}>
        <ElementBadge element={element} size={32 * unit} />
        <Text style={styles.name} numberOfLines={1}>{card.name}</Text>
        {/* Nested <Text> is the one place styles DO inherit (color, font) */}
        <Text style={styles.hp}>
          <Text style={[styles.hpLabel, { color: element.art[0] }]}>HP </Text>
          {card.hp}
        </Text>
      </View>

      <CardArt
        card={card}
        frame={rarity.frame}
        unit={unit}
        richness={rarity.richness}
        animate={animate}
        style={styles.art}
      />

      <View style={styles.metaRow}>
        <RarityGems rarity={card.rarity} size={8 * unit} />
        <Text style={[styles.rarityLabel, { color: rarity.color }]}>{rarity.label}</Text>
      </View>

      <View style={styles.attackPanel}>
        <View style={styles.attackRow}>
          <Text style={styles.attackName} numberOfLines={1}>{card.attackName}</Text>
          <View style={[styles.damage, { backgroundColor: rarity.color }]}>
            <Text style={styles.damageText}>{card.attackDamage}</Text>
          </View>
        </View>
        {!compact && <Text style={styles.flavor} numberOfLines={2}>{card.flavor}</Text>}
      </View>
    </View>
  );
}

function makeStyles(width: number) {
  const u = width / 300;
  const s = (n: number) => n * u;
  const f = (n: number) => Math.max(9, Math.round(n * u));

  return StyleSheet.create({
    face: { flex: 1, padding: s(10), gap: s(8), justifyContent: 'space-between' },

    header: { flexDirection: 'row', alignItems: 'center', gap: s(8) },
    name: {
      flex: 1,
      fontFamily: fonts.heading,
      fontSize: f(20),
      fontWeight: '700',
      color: colors.text,
      textShadowColor: 'rgba(0,0,0,0.55)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 3,
    },
    hp: { fontFamily: fonts.mono, fontSize: f(19), fontWeight: '700', color: colors.text },
    hpLabel: { fontSize: f(10), fontWeight: '700', letterSpacing: 0.5 },

    art: { flex: 1 },

    metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: s(4) },
    rarityLabel: { fontSize: f(10), fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase' },

    attackPanel: {
      padding: s(8),
      gap: s(6),
      borderRadius: s(10),
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.14)',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    attackRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: s(8) },
    attackName: { flex: 1, fontSize: f(15), fontWeight: '700', color: colors.text },
    damage: {
      minWidth: s(40),
      paddingVertical: s(2),
      paddingHorizontal: s(10),
      borderRadius: s(20),
      alignItems: 'center',
    },
    damageText: { fontFamily: fonts.mono, fontSize: f(17), fontWeight: '700', color: '#10131f' },
    flavor: {
      paddingTop: s(6),
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: 'rgba(255,255,255,0.25)',
      fontSize: f(11),
      fontStyle: 'italic',
      color: colors.textMuted,
    },
  });
}
