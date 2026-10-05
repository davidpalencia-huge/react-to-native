import { View, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { Dev } from '../types';

// Favorites wiring below is fully provided — no changes needed.
// Once you implement FavoritesContext, the ★ button will work automatically.

interface DevCardProps {
  dev: Dev;
}

export function DevCard({ dev }: DevCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(dev.id);

  // ─────────────────────────────────────────────
  // UI · Add an avatar with <Image>
  // ─────────────────────────────────────────────
  // Web → Native building blocks:
  //   <div>  → <View>   (layout container; column by default)
  //   <p>    → <Text>   (all text MUST live inside <Text>)
  //   <img>  → <Image>  (source is an object, needs width + height)
  //
  //   1. Add `Image` to the react-native import at the top
  //   2. Below, wrap the name/username <View> and a new <Image>
  //      in a <View style={styles.identity}>
  //   3. Image props: source={{ uri: avatarUrl }} style={styles.avatar}
  //
  // `identity` and `avatar` styles are already defined at the bottom.
  // Try deleting width/height from `avatar` and see what happens.
  // ─────────────────────────────────────────────
  const avatarUrl = `https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(dev.name)}&size=96`;

  // ─────────────────────────────────────────────
  // NATIVE · Open the email in the device's mail app
  // ─────────────────────────────────────────────
  // In web you'd just write <a href={`mailto:${dev.email}`}>.
  // RN has no anchor tag — there's no href, no browser handling
  // links for you. You call the OS directly.
  //
  //   1. Write a function that calls Linking.openURL(`mailto:${dev.email}`)
  //   2. Wrap the email <Text> below in a <Pressable> that calls it onPress
  // ─────────────────────────────────────────────

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
      <Text style={styles.email}>{dev.email}</Text>
      <Text style={styles.company}>{dev.company.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 18, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 12, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  identity: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#e5e7eb' },
  name: { fontSize: 15, fontWeight: '600', color: '#111827' },
  username: { fontSize: 12, color: '#9ca3af' },
  email: { fontSize: 13, color: '#374151', marginBottom: 4 },
  company: { fontSize: 12, color: '#9ca3af' },
  favBtn: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6, paddingVertical: 4, paddingHorizontal: 10 },
  favActive: { borderColor: '#fcd34d', backgroundColor: '#fffbeb' },
});
