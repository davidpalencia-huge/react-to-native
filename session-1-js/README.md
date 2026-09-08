# Dev Directory · Session 1: JavaScript

You're building **Dev Directory** — an app that will grow across all 4 sessions.
Today's focus: the JS layer. Hooks, context, and async data fetching work the same
in React Native. This exercise is proof.

---

## If you need help
Paste your StackBlitz link in the call chat and someone will jump in.

---

## What's already built

| File | Status | Your job |
|------|--------|----------|
| `src/App.jsx` | ✅ Complete | Nothing |
| `src/components/DevCard.jsx` | ✅ Complete | Nothing |
| `src/components/DevList.jsx` | 🔧 Incomplete | Wire `useFetch` |
| `src/hooks/useFetch.js` | 🔧 Incomplete | Implement it |
| `src/context/FavoritesContext.jsx` | 🔧 Incomplete | Implement it |

---

## The exercise

### Base · 10–12 min
**Goal:** get the list of developers loading on screen.

1. Open `src/hooks/useFetch.js` — read the instructions in the comments and implement the hook
2. Open `src/components/DevList.jsx` — replace the hardcoded object with a real `useFetch` call

✓ Done when: you see a list of developer cards on screen.

---

### Mid · 5–8 min
**Goal:** make the ★ button on each card work.

3. Open `src/context/FavoritesContext.jsx` — implement `toggleFavorite` and `isFavorite`

✓ Done when: clicking ★ highlights a card and clicking again removes it.

---

### Stretch
4. Add a `retry()` function to `useFetch` — read the Stretch section at the bottom of the hook file
5. Wire `retry` into `DevList` so a failed fetch shows a Retry button instead of just an error message
6. Extract a `useDevs()` custom hook that wraps `useFetch` with the API URL baked in

---

## Discussion
- What felt exactly like React Web?
- What surprised you or didn't work as expected?
- Where did you have to think differently?

---

## The point

Every pattern you just used — `useState`, `useEffect`, `useContext`, `fetch()`, custom hooks —
**transfers directly to React Native**. The JS layer doesn't change.
What changes is what you render. That's Sessions 2 and 3.
