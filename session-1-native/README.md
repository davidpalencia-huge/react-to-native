# Dev Directory · Session 1: JavaScript → React Native (TypeScript)

You're building **Dev Directory** — an app that will grow across all 4 sessions.
Today's focus: the JS layer. Hooks, context, and async data fetching work the same
in React Native. This exercise is proof. Two small steps at the end show where
native actually diverges from web: the UI building blocks (`View`, `Text`, `Image`)
and OS-level APIs (`Linking`).

---

## Opening in Snack

Upload this folder's files into a new project at [snack.expo.dev](https://snack.expo.dev),
or scan the Snack QR with Expo Go. Snack detects `.ts`/`.tsx` automatically — no
config needed there.

## If you need help
Paste your Snack link in the call chat and someone will jump in.

Stuck, or just want to see the answer? `cheat-codes/` has copy-paste code for
every step. Open the file for your step (`01-base.md` … `05-stretch.md`).

---

## What's already built

| File | Status | Your job |
|------|--------|----------|
| `App.tsx` | ✅ Complete | Nothing |
| `components/DevCard.tsx` | 🔧 Incomplete | Add avatar `Image`, wire `Linking.openURL` on the email |
| `components/DevList.tsx` | 🔧 Incomplete | Wire `useFetch` |
| `hooks/useFetch.ts` | 🔧 Incomplete | Implement it |
| `context/FavoritesContext.tsx` | 🔧 Incomplete | Implement it |
| `types.ts` | ✅ Complete | Nothing — shared `Dev` type |

---

## The exercise

### Base · 10–12 min
**Goal:** get the list of developers loading on screen.

1. Open `hooks/useFetch.ts` — read the instructions in the comments and implement the hook
2. Open `components/DevList.tsx` — replace the hardcoded object with a real `useFetch<Dev[]>` call

✓ Done when: you see a list of developer cards on screen.

---

### Mid · 5–8 min
**Goal:** make the ★ button on each card work.

3. Open `context/FavoritesContext.tsx` — implement `toggleFavorite` and `isFavorite`

✓ Done when: tapping ★ highlights a card and tapping again removes it.

---

### UI · 5 min
**Goal:** add an avatar next to each dev's name.

4. Open `components/DevCard.tsx` — read the UI comment block, import `Image`,
   and put an `<Image>` beside the name/username inside a row `View`.

| Web | React Native | Note |
|-----|--------------|------|
| `<div>` | `<View>` | Layout container. Flex column by default, not row. |
| `<p>`, `<span>` | `<Text>` | All text **must** be inside `<Text>` — bare strings crash. |
| `<img src="...">` | `<Image source={{ uri }} />` | `source` is an object; remote images need explicit `width` and `height`. |

✓ Done when: each card shows a circular avatar with the dev's initials.

---

### Native · 3–5 min
**Goal:** tap a dev's email, device mail app opens.

5. Open `components/DevCard.tsx` — read the NATIVE comment block, wrap the email
   text in a `Pressable`, call `Linking.openURL`.

In web you'd just write ``<a href={`mailto:${dev.email}`}>`` and the browser
handles it. React Native has no anchor tag — nothing handles links for you,
you call the OS directly.

✓ Done when: tapping the email opens Mail/Gmail (or a prompt on simulator).

---

### Stretch
6. Add a `retry()` function to `useFetch` — read the Stretch section at the bottom of the hook file
7. Wire `retry` into `DevList` so a failed fetch shows a Retry button instead of just an error message
8. Extract a `useDevs()` custom hook that wraps `useFetch<Dev[]>` with the API URL baked in

---

## Discussion
- What felt exactly like React Web?
- What surprised you or didn't work as expected?
- What happened when you removed `width`/`height` from the avatar? Why doesn't
  native size remote images for you?
- Web gave you `<a href>` for free — native made you call an API for it.
  Where else might "free" browser behavior turn into something explicit?
- Did the `Dev` type catch anything you'd have missed in plain JS?

---

## The point

Every pattern you just used — `useState`, `useEffect`, `useContext`, `fetch()`, custom hooks —
**transfers directly to React Native**. The JS layer doesn't change.
What changes: what you render (`View`/`Text`/`Image` instead of `div`/`p`/`img`),
and that some browser-given behavior becomes
an explicit native API call. That's your first taste — Sessions 2 and 3 go deeper.
