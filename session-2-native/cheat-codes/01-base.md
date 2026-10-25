# Base · Card layout with Flexbox

## `components/card/CardFace.tsx`

Replace the five empty styles inside `makeStyles` (`face` is already provided):

```tsx
header: { flexDirection: 'row', alignItems: 'center', gap: s(8) },
art: { flex: 1 },
metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: s(4) },
attackPanel: {
  padding: s(8),
  gap: s(6),
  borderRadius: s(10),
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.14)',
  backgroundColor: 'rgba(0,0,0,0.3)',
},
attackRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: s(8) },
```

Then add `flex: 1` to two text styles further down, `name` and `attackName`:

```tsx
name: { flex: 1, fontFamily: fonts.heading, /* ...rest unchanged */ },
attackName: { flex: 1, fontSize: f(15), /* ...rest unchanged */ },
```

## Why

| CSS | React Native | Note |
|-----|--------------|------|
| `display: flex; flex-direction: column` | nothing | Every `View` is already a column flex container. |
| `flex-direction: row` | `flexDirection: 'row'` | You have to ask for it. |
| `flex: 1` | `flex: 1` | `art` takes all leftover height, so the card keeps its shape at any width. |
| `gap` | `gap` | Supported since RN 0.71. |
| `justify-content: space-between` | `justifyContent: 'space-between'` | Same name, camelCase. |

| `flex: 1` on a `Text` inside a row | `flex: 1` | The name takes the free space and pushes HP to the right edge. |

Try deleting `flex: 1` from `art` and watch the artwork window collapse to nothing.
