# Dev Directory · Session 1: JavaScript → React Native

You're building **Dev Directory** — an app that will grow across all 4 sessions.
Today's focus: the JS layer. Hooks, context, and async data fetching work the same
in React Native. This exercise is proof. One small step at the end shows where
native actually diverges from web.

---

## Opening in Snack

Upload this folder's files into a new project at [snack.expo.dev](https://snack.expo.dev),
or scan the Snack QR with Expo Go.

## If you need help
Paste your Snack link in the call chat and someone will jump in.

---

## What's already built

| File | Status | Your job |
|------|--------|----------|
| `App.js` | ✅ Complete | Nothing |
| `components/DevCard.js` | 🔧 Incomplete | Wire `Linking.openURL` on the email |
| `components/DevList.js` | 🔧 Incomplete | Wire `useFetch` |
| `hooks/useFetch.js` | 🔧 Incomplete | Implement it |
| `context/FavoritesContext.jsx` | 🔧 Incomplete | Implement it |

---

## The exercise

### Base · 10–12 min
**Goal:** get the list of developers loading on screen.

1. Open `hooks/useFetch.js` — read the instructions in the comments and implement the hook
2. Open `components/DevList.js` — replace the hardcoded object with a real `useFetch` call

✓ Done when: you see a list of developer cards on screen.

---

### Mid · 5–8 min
**Goal:** make the ★ button on each card work.

3. Open `context/FavoritesContext.jsx` — implement `toggleFavorite` and `isFavorite`

✓ Done when: tapping ★ highlights a card and tapping again removes it.

---

### Native · 3–5 min
**Goal:** tap a dev's email, device mail app opens.

4. Open `components/DevCard.js` — read the NATIVE comment block, wrap the email
   text in a `Pressable`, call `Linking.openURL`.

In web you'd just write `<a href={\`mailto:${'{dev.email}'}\`}>` and the browser
handles it. React Native has no anchor tag — nothing handles links for you,
you call the OS directly.

✓ Done when: tapping the email opens Mail/Gmail (or a prompt on simulator).

---

### Stretch
5. Add a `retry()` function to `useFetch` — read the Stretch section at the bottom of the hook file
6. Wire `retry` into `DevList` so a failed fetch shows a Retry button instead of just an error message
7. Extract a `useDevs()` custom hook that wraps `useFetch` with the API URL baked in

---

## Discussion
- What felt exactly like React Web?
- What surprised you or didn't work as expected?
- Web gave you `<a href>` for free — native made you call an API for it.
  Where else might "free" browser behavior turn into something explicit?

---

## The point

Every pattern you just used — `useState`, `useEffect`, `useContext`, `fetch()`, custom hooks —
**transfers directly to React Native**. The JS layer doesn't change.
What changes: what you render, and that some browser-given behavior becomes
an explicit native API call. That's your first taste — Sessions 2 and 3 go deeper.
