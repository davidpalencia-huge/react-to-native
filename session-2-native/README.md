# Card Vault · Workshop 2: Styles & CSS in React Native

You're building **Card Vault** — a trading card app. Create decks, create cards, and
open any card in a viewer where **rarity decides how the card looks and moves**.

Today's focus: styling. `StyleSheet`, Flexbox, shadows, transforms and animation —
and the places where iOS and Android disagree.

---

## Opening in Snack

Upload this folder's files into a new project at [snack.expo.dev](https://snack.expo.dev),
or scan the Snack QR with Expo Go. Snack detects `.ts`/`.tsx` automatically.
`expo-linear-gradient` is the only extra dependency — Snack offers to add it when it sees the import (click "Add dependency").

Test on **both** iOS and Android (Snack lets you switch the preview platform).
Half of today is about what looks different.

## If you need help
Paste your Snack link in the call chat and someone will jump in.

Stuck, or just want to see the answer? `cheat-codes/` has copy-paste code for
every step. Open the file for your step (`01-base.md` … `05-stretch.md`).

---

## What's already built

Decks, cards, forms, grid, navigation and data all work. You only touch the styling layer.

| File | Status | Your job |
|------|--------|----------|
| `App.tsx`, `screens/*`, `context/*`, `data/*` | ✅ Complete | Nothing — app logic |
| `components/*` (buttons, fields, sheet, grid, deck tile) | ✅ Complete | Read them — they use everything you'll learn |
| `theme/*` | ✅ Complete | Read `rarity.ts` — it drives every effect |
| `hooks/useTilt.ts` | ✅ Complete | Nothing — drag gesture |
| `components/card/CardFrame.tsx`, `CardArt.tsx`, `ElementBadge.tsx`, `RarityGems.tsx` | ✅ Complete | Read them — the polished look lives here |
| `components/card/CardEntrance.tsx` | ✅ Complete | Read it — entrance + float animation, driven by `theme/rarity.ts` |
| `components/card/CardFace.tsx` | 🔧 Incomplete | **Base** — Flexbox layout |
| `components/card/CardView.tsx` | 🔧 Incomplete | **Mid** + **Platform** + **Motion** |
| `utils/platformShadow.ts` | 🔧 Incomplete | **Platform** |
| `components/card/GlowHalo.tsx` | 🔧 Incomplete | **Platform** |
| `hooks/usePulse.ts` | 🔧 Incomplete | **Motion** |
| `components/card/ShimmerSweep.tsx` | 🔧 Incomplete | **Motion** |
| `components/card/HoloFoil.tsx` | 🔧 Incomplete | **Motion** |
| `components/card/Sparkles.tsx` | 🔧 Incomplete | **Stretch** |
| `hooks/useReducedMotion.ts` | 🔧 Incomplete | **Stretch** |

Run the app first. Open the **Rarity Showcase** deck. The cards are an unstyled column,
and every rarity looks the same. That's your starting point.

---

## The exercise

### Base · 10–12 min
**Goal:** lay out the card with Flexbox.

1. Open `components/card/CardFace.tsx` — read the BASE comment block
2. Fill in the five empty styles: `header`, `art`, `metaRow`, `attackPanel`, `attackRow`, then add `flex: 1` to `name` and `attackName`

| CSS | React Native | Note |
|-----|--------------|------|
| `display: flex` | nothing | Every `View` is a flex container already. |
| `flex-direction` | `flexDirection` | Default is `column`, not `row`. |
| `flex: 1` | `flex: 1` | Takes all leftover space. |
| `gap` | `gap` | Works since RN 0.71. |

✓ Done when: the card looks like a trading card — badge, name and HP on one line, artwork filling the middle, attack panel at the bottom.

---

### Mid · 5–8 min
**Goal:** make each rarity look different.

3. Open `components/card/CardView.tsx` — read the MID comment
4. In `<CardFrame>`, replace `GRAY_FRAME` and `thickness={2}` with `theme.frame` and `frameWidth`

✓ Done when: the five cards in Rarity Showcase have five different metallic frames.

---

### Platform · 10 min
**Goal:** add a glow that works on iOS **and** Android.

5. `utils/platformShadow.ts` — implement `glowShadow` with `Platform.select`
6. `components/card/CardView.tsx` — spread it into the card's style. **Check iOS.** Where did the shadow go?
7. Wrap `CardFrame` in an outer View that owns the shadow. `CardFrame` keeps the clipping (`overflow: 'hidden'`)
8. `components/card/GlowHalo.tsx` — build the layered halo, render it inside the outer View

| Symptom | Cause |
|---------|-------|
| No glow on iOS | `overflow: 'hidden'` clips the view's own shadow |
| Gray shadow on Android | `elevation` ignores radius and opacity |
| No shadow at all on Android | Elevation needs an opaque `backgroundColor` |

✓ Done when: Uncommon and above glow in their rarity color on both platforms.

---

### Motion · 12–15 min
**Goal:** Rare breathes, Epic shimmers, Legendary reacts to your finger.

9. `hooks/usePulse.ts` — loop an opacity value with `Animated.loop`
10. `components/card/ShimmerSweep.tsx` — animate the band with `translateX`
11. `components/card/HoloFoil.tsx` — interpolate the tilt values into the foil position
12. `components/card/CardView.tsx` — apply the tilt as a `transform` (`perspective` first!)

✓ Done when: open the Legendary card and drag — the card tilts and the rainbow foil slides across it.

---

### Stretch
13. Build `Sparkles.tsx` — six twinkling diamonds on Legendary cards
14. Implement `useReducedMotion` — turn the effects off when the OS asks for less motion
15. Create a new card in the app and watch the live preview change as you pick a rarity
16. Open `theme/rarity.ts` and change the `entrance` of a rarity (try `rotateY: 180` on Rare). Press Prev / Next to replay it
17. Add a sixth rarity row — no component should need to change

---

## Discussion
- What did you expect `box-shadow` to be? What did you get instead?
- Why did the shadow vanish on iOS when you added `overflow: 'hidden'`?
- Which effect would you have built differently in CSS? (`@keyframes`, `:hover`, `mix-blend-mode`)
- Why are all the animations built from `transform` and `opacity`?
- What would break if a designer asked for a sixth rarity? (Spoiler: one row.)

---

## The point

Layout transfers almost directly — Flexbox, `gap`, `flexWrap`, percentages, `aspectRatio`, `overflow`.
What changes is everything that browsers hid from you: shadows are two different APIs,
fonts are different per OS, there is no cascade and no `@keyframes`.
Rarity-driven styling works the same as on the web: put the decisions in data,
and let components read it.
