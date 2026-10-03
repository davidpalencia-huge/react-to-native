import { ScrollView, Text, ActivityIndicator } from 'react-native';
import { useFetch } from '../hooks/useFetch';
import { DevCard } from './DevCard';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

// ─────────────────────────────────────────────
// BASE · Wire useFetch into this component
// ─────────────────────────────────────────────
// 1. Call useFetch with API_URL
// 2. Replace the hardcoded { data: null, loading: true, error: null }
//    with the real values from the hook
// ─────────────────────────────────────────────

export function DevList() {
  // TODO: replace this line with useFetch
  const { data: devs, loading, error } = { data: null, loading: true, error: null };

  if (loading) return <ActivityIndicator style={{ marginTop: 48 }} />;

  // STRETCH: pass retry to this error state once you've implemented it
  if (error) return (
    <Text style={styles.state}>
      Error: {error.message}
    </Text>
  );

  return (
    <ScrollView>
      {devs?.map((dev) => (
        <DevCard key={dev.id} dev={dev} />
      ))}
    </ScrollView>
  );
}

const styles = {
  state: { textAlign: 'center', color: '#6b7280', padding: 48, fontSize: 14 },
};
