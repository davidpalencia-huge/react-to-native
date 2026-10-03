import { ScrollView, Text, ActivityIndicator } from 'react-native';
import { useFetch } from '../hooks/useFetch';
import { DevCard } from './DevCard';
import { Dev } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export function DevList() {
  const { data: devs, loading, error } = useFetch<Dev[]>(API_URL);

  if (loading) return <ActivityIndicator style={{ marginTop: 48 }} />;

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
  state: { textAlign: 'center' as const, color: '#6b7280', padding: 48, fontSize: 14 },
};
