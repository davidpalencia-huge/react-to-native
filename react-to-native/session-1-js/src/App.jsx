import { FavoritesProvider } from './context/FavoritesContext';
import { DevList } from './components/DevList';

export default function App() {
  return (
    <FavoritesProvider>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Dev Directory</h1>
          <p style={styles.sub}>React → React Native · Session 1</p>
        </div>
        <DevList />
      </div>
    </FavoritesProvider>
  );
}

const styles = {
  container: { maxWidth: '600px', margin: '0 auto', padding: '32px 16px' },
  header:    { marginBottom: '28px' },
  title:     { fontSize: '26px', fontWeight: '700', color: '#111827', marginBottom: '4px' },
  sub:       { fontSize: '13px', color: '#9ca3af' },
};
