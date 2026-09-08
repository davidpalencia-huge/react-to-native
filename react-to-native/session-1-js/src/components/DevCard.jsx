import { useFavorites } from '../context/FavoritesContext';

// This component is fully provided — no changes needed here.
// Once you implement FavoritesContext, the ★ button will work automatically.

export function DevCard({ dev }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(dev.id);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <p style={styles.name}>{dev.name}</p>
          <p style={styles.username}>@{dev.username}</p>
        </div>
        <button
          style={{ ...styles.favBtn, ...(fav ? styles.favActive : {}) }}
          onClick={() => toggleFavorite(dev.id)}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          {fav ? '★' : '☆'}
        </button>
      </div>
      <p style={styles.email}>{dev.email}</p>
      <p style={styles.company}>{dev.company.name}</p>
    </div>
  );
}

const styles = {
  card: {
    padding: '18px 20px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    marginBottom: '12px',
    background: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,.06)',
    transition: 'box-shadow .15s',
  },
  header:    { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' },
  name:      { fontSize: '15px', fontWeight: '600', color: '#111827', margin: '0 0 2px' },
  username:  { fontSize: '12px', color: '#9ca3af', margin: 0 },
  email:     { fontSize: '13px', color: '#374151', margin: '0 0 4px' },
  company:   { fontSize: '12px', color: '#9ca3af', margin: 0 },
  favBtn:    { background: 'none', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '18px', color: '#d1d5db', lineHeight: 1 },
  favActive: { color: '#f59e0b', borderColor: '#fcd34d', background: '#fffbeb' },
};
