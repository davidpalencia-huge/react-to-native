# Card Vault · Workshop 2: Styles & CSS in React Native — SOLUTION

Solved version of the Workshop 2 exercise. The exercise branch is `session-2`;
this branch has every step completed, including the stretch goals.

---

## Opening in Snack

Upload this folder's files into a new project at [snack.expo.dev](https://snack.expo.dev),
or scan the Snack QR with Expo Go. `expo-linear-gradient` is the only extra dependency.

---

## What the app does

| Screen | What you can do |
|--------|-----------------|
| **Decks** | List decks (fanned preview of the three rarest cards) · create a deck |
| **Deck** | List the deck's cards in a 2-column grid · create a card with a live preview |
| **Card** | View one card full size · drag to tilt · Prev / Next through the deck |

Navigation is a `useState` route in `App.tsx`. Workshop 3 replaces it with React Navigation.

---

## Rarity → effects

Everything is driven by `theme/rarity.ts`. No component checks the rarity name.

| Rarity | Frame | Artwork | Glow | Entrance | Loops |
|--------|-------|---------|------|----------|-------|
| Common | matte gray, thin | plain, washed out | — | soft fade-in | creature breathes |
| Uncommon | polished emerald | + glowing discs | 8px, still | fade + slide up | creature breathes |
| Rare | sapphire metal, thick | + sunburst rays, corner icons | 14px | slides up with a bounce | pulse · float 4px |
| Epic | amethyst metal | same as Rare | 18px | pops in from half size, bouncy | pulse · shimmer · float 6px |
| Legendary | gold metal, thickest | double rays | 24px | flips around like a pack reveal | pulse · shimmer · holo foil · sparkles · float 8px |

Common, Uncommon and Rare differ in more than color: each step adds layers to the artwork
(`richness` in the table), the frame goes from matte to polished metal, and the glass sheen gets stronger.

Grid thumbnails get a half-size static glow and a still foil — no loops, no entrance.
Only the viewer animates (`animated` prop on `CardView`, `CardEntrance` on `CardScreen`).

The entrance and the float are data too: `entrance` and `float` in `theme/rarity.ts`.
Press Prev / Next in the viewer to replay them. With Reduce Motion on, the card just appears.

---

## Map: step → file

| File | Step |
|------|------|
| `components/card/CardFace.tsx` | Base — Flexbox layout, scales from `width` |
| `components/card/CardEntrance.tsx` | Provided — entrance + idle float, read from the rarity table |
| `components/card/CardFrame.tsx` | Provided — metallic gradient frame + card body, clips with `overflow: 'hidden'` |
| `components/card/CardArt.tsx` | Provided — artwork window built from stacked Views (rays, discs, shadow, gloss) |
| `components/card/ElementBadge.tsx`, `RarityGems.tsx` | Provided — element orb and rarity diamonds |
| `components/card/CardView.tsx` | Mid (rarity frame) · Platform (outer shadow View) · Motion (tilt transform) |
| `utils/platformShadow.ts` | Platform — `Platform.select` for iOS / Android / web |
| `components/card/GlowHalo.tsx` | Platform — layered halo, same glow everywhere |
| `hooks/usePulse.ts` | Motion — `Animated.loop` on opacity |
| `components/card/ShimmerSweep.tsx` | Motion — gradient band, `translateX` |
| `components/card/HoloFoil.tsx` | Motion — rainbow gradient moved by tilt |
| `hooks/useTilt.ts` | Provided — `PanResponder` → values from -1 to 1 |
| `components/card/Sparkles.tsx` | Stretch |
| `hooks/useReducedMotion.ts` | Stretch |

---

## Troubleshooting cheat sheet (for the live demo)

| # | Looks like | Why | Fix |
|---|-----------|-----|-----|
| 1 | Colored glow on iOS, gray smudge on Android | No `box-shadow`. iOS: `shadow*`. Android: `elevation` only | `glowShadow()` + layered `GlowHalo` |
| 2 | Shadow disappears on iOS after adding rounded corners | `overflow: 'hidden'` clips the view's own shadow. Android also needs an opaque background | Outer View = shadow, `CardFrame` = clip |
| 3 | Header hidden under the Android status bar | RN's `SafeAreaView` is iOS-only | `paddingTop: StatusBar.currentHeight` on Android (`components/Screen.tsx`) |
| 4 | Fonts look different, big emoji cut off on Android | Font family names are per-OS; Android adds font padding | `Platform.select` in `theme/tokens.ts`, `lineHeight` + `includeFontPadding: false` |
| 5 | Grey fringe on the shimmer · crash "not supported by native driver" | `'transparent'` is black-transparent on iOS · only `transform` and `opacity` run natively | `rgba(255,255,255,0)` · animate transform/opacity |

Quick demo recipe: break each one on purpose, show the difference on both platforms, then restore.

---

## Discussion
- What did you expect `box-shadow` to be? What did you get instead?
- Why did the shadow vanish on iOS when you added `overflow: 'hidden'`?
- Which effect would you have built differently in CSS? (`@keyframes`, `:hover`, `mix-blend-mode`)
- Why are all the animations built from `transform` and `opacity`?
- What would break if a designer asked for a sixth rarity?

---

## The point

Layout transfers almost directly. What changes is everything the browser hid from you:
two shadow APIs, per-OS fonts, no cascade, no `@keyframes`, no CSS variables.
Put decisions in data (`theme/*`), keep components dumb, and the platform differences
stay in a handful of small files.
