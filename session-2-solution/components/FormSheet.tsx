import { ReactNode } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../theme/tokens';

interface FormSheetProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

// Bottom sheet built from Modal + plain Views. The dimmed backdrop is
// an rgba color, not an opacity on the whole sheet.
export function FormSheet({ visible, title, onClose, children }: FormSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      {/* Keyboard behavior is another iOS/Android split: iOS needs padding, Android needs the height to shrink. */}
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>{title}</Text>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
            {children}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(5,8,16,0.72)' },
  sheet: {
    maxHeight: '88%',
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg + 8,
    borderTopRightRadius: radius.lg + 8,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.border,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  handle: { alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border, marginBottom: spacing.md },
  title: { fontFamily: fonts.heading, fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: spacing.lg },
  content: { gap: spacing.lg, paddingBottom: spacing.xl * 2 },
});
