# Dev Directory · Session 1: JavaScript → React Native (TypeScript) — SOLUTION

Solved version of the Session 1 exercise. The exercise branch is `main`;
this branch has every step completed, including the stretch goals.

Hooks, context, and async data fetching work the same in React Native —
this is proof. Two small steps show where native actually diverges from web:
the UI primitives (`View`, `Text`, `Image`) and OS-level APIs (`Linking`).

---

## Opening in Snack

Upload this folder's files into a new project at [snack.expo.dev](https://snack.expo.dev),
or scan the Snack QR with Expo Go. Snack detects `.ts`/`.tsx` automatically.

---

## What's built

| File | Step |
|------|------|
| `App.tsx` | Provided |
| `types.ts` | Provided — shared `Dev` interface |
| `hooks/useFetch.ts` | Base + Stretch (`retry`) |
| `hooks/useDevs.ts` | Stretch — `useFetch<Dev[]>` with the API URL baked in |
| `components/DevList.tsx` | Base + Stretch (Retry button) |
| `context/FavoritesContext.tsx` | Mid |
| `components/DevCard.tsx` | UI (avatar `Image`) + Native (`Linking`) |

---

## Walkthrough

### Base
`useFetch<Dev[]>` wired into `DevList` — `useState`, `useEffect`, `fetch()`.
Identical to React web; only the render target changed:
`div/p/button` → `View/Text/Pressable`, `onClick` → `onPress`, inline style
object → `StyleSheet.create`.

### Mid
`FavoritesContext` — `toggleFavorite` / `isFavorite`. Zero changes from web
beyond typing the context value. Say that out loud to the group.

### UI · the building blocks
**Goal:** add an avatar next to each dev's name.

| Web | React Native | Note |
|-----|--------------|------|
| `<div>` | `<View>` | Layout container. Flex column by default, not row. |
| `<p>`, `<span>` | `<Text>` | All text **must** be inside `<Text>` — bare strings crash. |
| `<img src="...">` | `<Image source={{ uri }} />` | `source` is an object, and remote images need an explicit `width` and `height`. |

```tsx
const avatarUrl = `https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(dev.name)}&size=96`;

<View style={styles.identity}>
  <Image source={{ uri: avatarUrl }} style={styles.avatar} />
  <View>
    <Text style={styles.name}>{dev.name}</Text>
    <Text style={styles.username}>@{dev.username}</Text>
  </View>
</View>
```

### Native · OS APIs
**Goal:** tap a dev's email, device mail app opens.

In web you'd write ``<a href={`mailto:${dev.email}`}>`` and the browser
handles it. React Native has no anchor tag — there's no `href`, nothing
handles links for you. You call the OS directly:

```ts
const openEmail = () => Linking.openURL(`mailto:${dev.email}`);
```

wired to a `<Pressable>` wrapping the email `<Text>` in `DevCard.tsx`.

### Stretch
- `useFetch` returns `retry()` — a counter in state added to the effect's
  dependency array re-triggers the fetch.
- `DevList` shows a Retry `Pressable` on the error state.
- `useDevs()` wraps `useFetch<Dev[]>` so `DevList` no longer knows the URL.

---

## Discussion
- Web gave you `<a href>` for free — native made you call an API for it.
  Where else might "free" browser behavior turn into something explicit?
- What else felt exactly like React Web?
- What was the first thing that *didn't* transfer?
- Did typing `Dev` / `useFetch<T>` catch anything you'd have missed in plain JS?

---

## The point

`useState`, `useEffect`, `useContext`, `fetch()`, custom hooks — all transfer
directly. What changes: what you render (`View`/`Text`/`Image` instead of
`div`/`p`/`img`), and that some browser-given behavior (links, hover, scroll)
becomes an explicit native API call. TypeScript on top doesn't change any of
that — it's the same JS mental model, with types.
