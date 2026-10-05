# Mid · FavoritesContext

## `context/FavoritesContext.tsx`

Replace `toggleFavorite` and `isFavorite` inside `FavoritesProvider`:

```tsx
const toggleFavorite = (id: number) => {
  setFavorites(prev =>
    prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
  );
};

const isFavorite = (id: number) => favorites.includes(id);
```
