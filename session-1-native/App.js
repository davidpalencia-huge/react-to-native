import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { FavoritesProvider } from './context/FavoritesContext';
import { DevList } from './components/DevList';

export default function App() {
  return (
    <FavoritesProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Dev Directory</Text>
        <Text style={styles.sub}>React → React Native · Session 1</Text>
        <DevList />
      </SafeAreaView>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 26, fontWeight: '700', color: '#111827' },
  sub: { fontSize: 13, color: '#9ca3af', marginBottom: 16 },
});
