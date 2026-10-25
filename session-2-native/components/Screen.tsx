import { ReactNode } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { colors } from '../theme/tokens';

export function Screen({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    // TROUBLESHOOTING #3 · react-native's SafeAreaView only works on iOS.
    // On Android the content slides under the status bar unless we pad it ourselves.
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0,
  },
});
