import { createContext, useContext, useState } from 'react';

// ─────────────────────────────────────────────
// MID · Implement this context
// ─────────────────────────────────────────────
// This context tracks which developer IDs the user has starred.
//
// The Provider already wraps the app in App.jsx.
// DevCard already calls useFavorites() — you just need to make it work.
//
// Steps:
//   1. Implement toggleFavorite(id)
//      → if id is already in favorites: remove it
//      → if id is not in favorites: add it
//
//   2. Implement isFavorite(id)
//      → returns true if id is in the favorites array
//
// Tip: treat favorites as an array of IDs (numbers).
// ─────────────────────────────────────────────

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]); // array of dev IDs

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Already wired — don't change this.
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
}
