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

  if (loading) return <p style={styles.state}>Loading devs...</p>;

  // STRETCH: pass retry to this error state once you've implemented it
  if (error) return <p style={styles.state}>Error: {error.message}</p>;

  return (
    <div>
      {devs?.map((dev) => (
        <DevCard key={dev.id} dev={dev} />
      ))}
    </div>
  );
}

const styles = {
  state: { textAlign: 'center', color: '#6b7280', padding: '48px 0', fontSize: '14px' },
};
