# Stretch · retry + useDevs

## `hooks/useFetch.ts`

Full hook with `retry`:

```ts
import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  retry: () => void;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData]             = useState<T | null>(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url, retryCount]);

  const retry = () => setRetryCount(c => c + 1);

  return { data, loading, error, retry };
}
```

## `hooks/useDevs.ts` (new file)

```ts
import { useFetch } from './useFetch';
import { Dev } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export function useDevs() {
  return useFetch<Dev[]>(API_URL);
}
```

## `components/DevList.tsx`

Full component using `useDevs` and a Retry button:

```tsx
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
```
