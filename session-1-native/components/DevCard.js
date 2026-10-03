import { View, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

export function DevCard({ dev }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(dev.id);

  const openEmail = () => Linking.openURL(`mailto:${dev.email}`);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{dev.name}</Text>
          <Text style={styles.username}>@{dev.username}</Text>
        </View>
        <Pressable
          style={[styles.favBtn, fav && styles.favActive]}
          onPress={() => toggleFavorite(dev.id)}
        >
          <Text style={{ fontSize: 18, color: fav ? '#f59e0b' : '#d1d5db' }}>
            {fav ? '★' : '☆'}
          </Text>
        </Pressable>
      </View>
      <Pressable onPress={openEmail}>
        <Text style={styles.email}>{dev.email}</Text>
      </Pressable>
      <Text style={styles.company}>{dev.company.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 18, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 12, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  name: { fontSize: 15, fontWeight: '600', color: '#111827' },
  username: { fontSize: 12, color: '#9ca3af' },
  email: { fontSize: 13, color: '#374151', marginBottom: 4 },
  company: { fontSize: 12, color: '#9ca3af' },
  favBtn: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6, paddingVertical: 4, paddingHorizontal: 10 },
  favActive: { borderColor: '#fcd34d', backgroundColor: '#fffbeb' },
});
