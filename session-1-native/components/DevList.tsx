import { View, ScrollView, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { useDevs } from '../hooks/useDevs';
import { DevCard } from './DevCard';

export function DevList() {
  const { data: devs, loading, error, retry } = useDevs();

  if (loading) return <ActivityIndicator style={{ marginTop: 48 }} />;

  if (error) return (
    <View style={styles.state}>
      <Text style={styles.stateText}>Error: {error.message}</Text>
      <Pressable style={styles.retryBtn} onPress={retry}>
        <Text style={styles.retryText}>Retry</Text>
      </Pressable>
    </View>
  );

  return (
    <ScrollView>
      {devs?.map((dev) => (
        <DevCard key={dev.id} dev={dev} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  state: { alignItems: 'center', padding: 48 },
  stateText: { textAlign: 'center', color: '#6b7280', fontSize: 14, marginBottom: 16 },
  retryBtn: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6, paddingVertical: 8, paddingHorizontal: 16 },
  retryText: { fontSize: 14, color: '#374151' },
});
