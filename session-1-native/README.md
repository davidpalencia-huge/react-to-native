# Dev Directory · Session 1: JS Patterns → React Native (Snack, TypeScript)

Same exercise as the web version, ported to run on Snack Expo and typed with
TypeScript. Hooks, context, and async data fetching work the same in React
Native — this is proof. One small step added at the end to show where native
actually diverges from web.

---

## Opening in Snack

Upload this folder's files into a new project at [snack.expo.dev](https://snack.expo.dev),
or scan the Snack QR with Expo Go. Snack detects `.ts`/`.tsx` automatically.

---

## What's already built

| File | Status |
|------|--------|
| `App.tsx` | ✅ Complete |
| `components/DevCard.tsx` | ✅ Complete (solution) |
| `components/DevList.tsx` | ✅ Complete (solution) |
| `hooks/useFetch.ts` | ✅ Complete (solution) |
| `context/FavoritesContext.tsx` | ✅ Complete (solution) |
| `types.ts` | ✅ Complete — shared `Dev` interface |

---

## The exercise (recap from web)

### Base
`useFetch<Dev[]>` wired into `DevList` — `useState`, `useEffect`, `fetch()`.
Identical pattern to the web version, only the render target changed:
`div/p/button` → `View/Text/Pressable`, `onClick` → `onPress`, inline style
object → `StyleSheet.create`.

### Mid
`FavoritesContext` — `toggleFavorite` / `isFavorite`. Zero changes from web
beyond typing the context value. Say that out loud to the group.

### Native · the new step
**Goal:** tap a dev's email, device mail app opens.

In web you'd write `<a href={\`mailto:${dev.email}\`}>` and the browser
handles it. React Native has no anchor tag — there's no `href`, nothing
handles links for you. You call the OS directly:

```ts
const openEmail = () => Linking.openURL(`mailto:${dev.email}`);
```

wired to a `<Pressable>` wrapping the email `<Text>` in `DevCard.tsx`.

✓ Done when: tapping the email opens Mail/Gmail (or a prompt on simulator).

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
directly. What changes: what you render, and that some browser-given behavior
(links, hover, scroll) becomes an explicit native API call. TypeScript on top
doesn't change any of that — it's the same JS mental model, with types.
