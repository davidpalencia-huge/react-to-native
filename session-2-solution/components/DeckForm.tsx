import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NewDeckInput } from '../types';
import { spacing } from '../theme/tokens';
import { Button } from './Button';
import { Field } from './Field';

export function DeckForm({ onSubmit }: { onSubmit: (input: NewDeckInput) => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const canSubmit = name.trim().length > 0;

  return (
    <View style={styles.form}>
      <Field label="Name" value={name} onChangeText={setName} placeholder="Ember Legion" />
      <Field
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="What is this deck about?"
      />
      <Button
        label="Create deck"
        disabled={!canSubmit}
        onPress={() => onSubmit({ name: name.trim(), description: description.trim() })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.lg },
});
