import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ElementType, NewCardInput, Rarity } from '../types';
import { spacing } from '../theme/tokens';
import { elementOrder, elementThemes } from '../theme/elements';
import { rarityOrder, rarityThemes } from '../theme/rarity';
import { Button } from './Button';
import { ChipSelect } from './ChipSelect';
import { Field } from './Field';
import { CardView } from './card/CardView';

interface CardFormProps {
  deckId: string;
  onSubmit: (input: NewCardInput) => void;
}

const elementOptions = elementOrder.map(value => ({
  value,
  label: `${elementThemes[value].icon} ${elementThemes[value].label}`,
  color: elementThemes[value].art[0],
}));

const rarityOptions = rarityOrder.map(value => ({
  value,
  label: rarityThemes[value].label,
  color: rarityThemes[value].color,
}));

export function CardForm({ deckId, onSubmit }: CardFormProps) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('🐾');
  const [element, setElement] = useState<ElementType>('fire');
  const [rarity, setRarity] = useState<Rarity>('common');
  const [hp, setHp] = useState('60');
  const [attackName, setAttackName] = useState('');
  const [attackDamage, setAttackDamage] = useState('20');
  const [flavor, setFlavor] = useState('');

  const draft: NewCardInput = {
    deckId,
    name: name.trim() || 'Your Card',
    emoji: emoji.trim() || '🐾',
    element,
    rarity,
    hp: Number.parseInt(hp, 10) || 0,
    attackName: attackName.trim() || 'Tackle',
    attackDamage: Number.parseInt(attackDamage, 10) || 0,
    flavor: flavor.trim(),
  };

  const canSubmit = name.trim().length > 0;

  return (
    <View style={styles.form}>
      {/* Live preview — pick a rarity and watch the effects change. */}
      <View style={styles.preview}>
        <CardView card={{ id: 'preview', ...draft }} width={170} animated />
      </View>

      <Field label="Name" value={name} onChangeText={setName} placeholder="Emberfox" />
      <Field label="Emoji" value={emoji} onChangeText={setEmoji} maxLength={4} />
      <ChipSelect label="Element" options={elementOptions} value={element} onChange={setElement} />
      <ChipSelect label="Rarity" options={rarityOptions} value={rarity} onChange={setRarity} />

      <View style={styles.row}>
        <View style={styles.half}>
          <Field label="HP" value={hp} onChangeText={setHp} keyboardType="number-pad" />
        </View>
        <View style={styles.half}>
          <Field label="Damage" value={attackDamage} onChangeText={setAttackDamage} keyboardType="number-pad" />
        </View>
      </View>

      <Field label="Attack name" value={attackName} onChangeText={setAttackName} placeholder="Ember Dash" />
      <Field label="Flavor text" value={flavor} onChangeText={setFlavor} placeholder="One line of lore" />

      <Button label="Create card" disabled={!canSubmit} onPress={() => onSubmit(draft)} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.lg },
  // Glow reaches outside the card, so leave room for it.
  preview: { alignItems: 'center', paddingVertical: spacing.xl },
  row: { flexDirection: 'row', gap: spacing.md },
  half: { flex: 1 },
});
