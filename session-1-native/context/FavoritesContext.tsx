import { createContext, useContext, useState, ReactNode } from 'react';

// ─────────────────────────────────────────────
// MID · Implement this context
// ─────────────────────────────────────────────
// This context tracks which developer IDs the user has starred.
//
// The Provider already wraps the app in App.tsx.
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

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    // TODO
  };

  const isFavorite = (id: number) => {
    // TODO
    return false;
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Already wired — don't change this.
export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
}
