# Workshop 2 · Speech

~10 min spoken. Three parts: finished app, troubleshooting, what to do.

**Before the session**

- [ ] Share the toolkit (`session2_workshop_toolkit.html`).
- [ ] Open the **solution** in Snack on screen, and in Expo Go on your phone. Know which OS your phone is.
- [ ] Open the same Snack with the other platform selected in the preview (iOS ↔ Android), so you can compare side by side.
- [ ] Share the **exercise** Snack link (`session-2-native/`) in the chat.
- [ ] Reduce Motion is OFF on your phone.

---

## 1. Show the finished app (~3 min)

"Hi everyone, welcome to Workshop 2. Last time we learned that the JS layer transfers. Today is the CSS layer. Before we code, let me show you where we're going."

Open the Snack. You are on the Decks screen.

"This is Card Vault. A small trading card app. I can list decks, and I can create a new one. Each deck is a set of cards. Look at the fan on the left — that's just three small Views, rotated, with negative margins."

Open **Rarity Showcase**.

"Here's the deck. I can list the cards, and I can create new ones. Now look at the borders. Every card has a rarity, and **rarity decides how the card looks and moves**."

Tap through the cards, one by one. Say one line for each.

| Card | Say |
|------|-----|
| Common | "Common: matte gray frame, plain artwork. It just fades in." |
| Uncommon | "Uncommon: polished frame, glowing discs behind the creature, and it slides up." |
| Rare | "Rare: sunburst rays, a thicker metal frame, the glow breathes, the card floats, and it bounces in." |
| Epic | "Epic: a band of light sweeps across, and it pops in." |
| Legendary | "Legendary: everything. It flips over like opening a pack. Watch." — drag the card. "It tilts in 3D, the rainbow foil slides with my finger, and there are sparkles." |

"Everything you just saw is one table: `theme/rarity.ts` — the frame, the glow, even how the card arrives. Components never ask 'is this card rare?'. They read a row. Press Prev and Next to replay the entrances."

Tap **+ Card**. Change the rarity chips.

"And this is a live preview. Pick a rarity, the effects change."

"The point of today: **layout transfers almost directly. Everything the browser did for you — shadows, fonts, keyframes — you now do yourself.** And iOS and Android don't always agree."

**Tips**

- Do the Legendary drag slowly. It's the moment everyone remembers.
- Tell them the app is standalone. It is not the Dev Directory.
- Don't explain code yet. Just show.

---

## 2. Troubleshooting (~4 min)

"Now the part that will save you hours. Five things that work on one platform and need your help on the other."

For each one: break it on purpose, show both platforms, restore.

**1 · Shadows (`utils/platformShadow.ts`)**

"On the web: `box-shadow: 0 0 24px gold`. Done. In React Native 0.74 there is no `box-shadow`. iOS has four `shadow` props. Android has one: `elevation`, and it ignores radius and opacity."

Show the Legendary card with only `shadowColor` and `shadowRadius`. Glow on iOS. Gray smudge on Android.

"The fix: `Platform.select` for the real shadow, plus a halo built from stacked translucent Views that looks the same everywhere."

**2 · `overflow: 'hidden'` eats the shadow (`CardView.tsx`)**

"The card frame has `overflow: 'hidden'` so the shine respects the rounded corners. If I put the glow on that same View, on iOS it disappears. Overflow clips the view's own shadow."

"Fix: wrap it. The outer View has the shadow, the frame inside it clips. And on Android, the outer View needs an opaque background or elevation draws nothing."

**3 · Status bar (`components/Screen.tsx`)**

"React Native's `SafeAreaView` only works on iOS. On Android my title is under the status bar. I pad with `StatusBar.currentHeight`."

**4 · Fonts and emoji (`theme/tokens.ts`, `CardFace.tsx`)**

"Font names are per OS. `Avenir Next` doesn't exist on Android. `Platform.select` again. And on Android, big emoji get cut off unless you set `lineHeight` and `includeFontPadding: false`."

**5 · Animation limits (`ShimmerSweep.tsx`)**

"Two small ones. `'transparent'` in a gradient means transparent black on iOS, so you get a gray fringe. Fade to `rgba(255,255,255,0)` instead."

"And `useNativeDriver: true` only works for `transform` and `opacity`. Try animating `width` and you'll get this error." Show it. "So every effect today is built from those two."

"Rule of thumb: when something looks different on the other platform, it's almost always shadows, fonts, or safe areas."

---

## 3. Show what they have to do (~3 min)

"Now your part. Open the exercise Snack. Run it on **both** platforms. Open the Rarity Showcase deck. Right now every card is an unstyled column and every rarity looks the same. You will fix that in layers."

"**Base.** Lay out the card with Flexbox. Five empty styles in `CardFace.tsx`. Remember: every View is already a column. If you want a row, ask for it."

"**Mid.** Make each rarity look different. Replace two hardcoded values with the theme. That's the one-table idea from the demo."

"**Platform.** Build the glow. `Platform.select` for the shadow, then check iOS. The shadow is gone. Why? Split the View in two. Then build the halo so Android gets a glow too."

"**Motion.** Make Rare breathe, Epic shimmer, Legendary follow your finger. `Animated.loop`, `interpolate`, and a `transform` array. Remember: `perspective` goes first."

"**Stretch.** Sparkles, and respecting the OS Reduce Motion setting."

"If you're stuck, `cheat-codes/` has the answer for every step. Try first, then peek. Paste your Snack link in the chat if you need a hand. Any questions? Great, let's start with Base."

**Cheat sheet: web → native**

| Web | React Native |
|-----|--------------|
| `class` / `className` | `style` (array of objects) |
| CSS file | `StyleSheet.create` |
| `display: flex` | every `View` already |
| `flex-direction` default `row` | default is `column` — ask for `row` |
| `box-shadow` | `shadow*` (iOS) + `elevation` (Android) |
| `linear-gradient()` | `expo-linear-gradient` |
| `@keyframes` | `Animated.loop` + `interpolate` |
| `transform: rotateY(10deg)` | `transform: [{ rotateY: '10deg' }]` |
| `:hover` / `:active` | `Pressable` `pressed` state |
| `@media (prefers-reduced-motion)` | `AccessibilityInfo` |
| `rem` / `vw` | numbers + `useWindowDimensions` |
| CSS variables | JS constants (`theme/tokens.ts`) |
