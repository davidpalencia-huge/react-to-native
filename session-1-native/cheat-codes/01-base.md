# Base · useFetch + DevList

## `hooks/useFetch.ts`

Replace the `useEffect` block:

```ts
useEffect(() => {
  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, [url]);
```

## `components/DevList.tsx`

Replace the hardcoded `const { data: devs, loading, error } = { ... } as {...};` with:

```tsx
const { data: devs, loading, error } = useFetch<Dev[]>(API_URL);
```
