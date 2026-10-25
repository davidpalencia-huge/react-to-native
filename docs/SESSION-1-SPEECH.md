# Session 1 · Speech

~4–5 min spoken. Three parts: tools, finished app, what to do.

---

## 1. Show the tools (~1.5 min)

"Hi everyone, welcome to Session 1. First, the tools. You don't need to install anything today.

**Snack** a expo web app. It's a browser-based editor for React Native. I'm sharing the Snack link with you now, so open it and you'll have the exercise ready to go.

The second tool, **Expo Go**. Install it on your phone, scan the Snack QR code and with this you will have the app running on your real device.

**Before the session**

- [ ] Share the toolkit (`session1_workshop_toolkit.html`).

---

## 2. Show the finished app (~1.5 min)

Open the Snack link and make sure it loads. Before we code, let me show you where we're going."

"This is the Dev Directory. It's a small app that loads a list of developers from an API. Each card shows an avatar, a name, a username, an email, and a company. You can star a developer to mark them as a favorite. If the request fails, you get a Retry button. And if I tap an email, my phone's mail app opens.

The point of today is this: **you already know most of React Native.** `useState`, `useEffect`, `useContext`, `fetch`, and custom hooks all work exactly the same. We'll see together what actually changes."

**Tips**

- Have the finished app open on your phone and on screen before you start. Keep it ready while the tools section runs.
- Demo the email tap live. Everyone remembers that moment.

---

## 3. Show what they have to do (~1.5 min)

"Now your part. The exercise has steps, and each one adds a layer.

**Base.** Build a `useFetch` hook and plug it into `DevList`. It's the same `useState` and `useEffect` you'd write on the web.

**Mid.** Build the `FavoritesContext` with `toggleFavorite` and `isFavorite`.

**UI.** Add an avatar to each card with the `Image` component. Watch out for two things: `source` is an object, not a string, and remote images need an explicit width and height.

**Native.** Make the email tappable. On the web you'd use `<a href="mailto:">`. In React Native there is no anchor tag, so you call the OS yourself with `Linking.openURL`. This is the first moment where native really diverges from web.

**Stretch.** For those who finish early: add a `retry` function to `useFetch`, a Retry button in the error state, and a `useDevs` hook so `DevList` doesn't need to know the URL.

Any questions? Great, let's start with the Base step."

**Cheat sheet: web → native**

| Web                  | React Native                                        |
| -------------------- | --------------------------------------------------- |
| `<div>`              | `<View>` (flex column by default)                   |
| `<p>`, `<span>`      | `<Text>` (all text must be inside it)               |
| `<img src="...">`    | `<Image source={{ uri }} />` (needs width + height) |
| `<button onClick>`   | `<Pressable onPress>`                               |
| `<a href="mailto:">` | `Linking.openURL('mailto:...')`                     |
| inline style / CSS   | `StyleSheet.create`                                 |
