# Native · Open email with Linking

## `components/DevCard.tsx`

1. Add the handler above `return`:

```tsx
const openEmail = () => Linking.openURL(`mailto:${dev.email}`);
```

2. Replace the email `<Text>`:

```tsx
<Pressable onPress={openEmail}>
  <Text style={styles.email}>{dev.email}</Text>
</Pressable>
```
