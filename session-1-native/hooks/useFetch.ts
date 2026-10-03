import { useState, useEffect } from 'react';

// ─────────────────────────────────────────────
// BASE · Implement this hook
// ─────────────────────────────────────────────
// Accepts a `url` string.
// Returns: { data, loading, error }
//
// Steps:
//   1. On mount (and whenever `url` changes), fetch data from `url`
//   2. While fetching → loading: true
//   3. On success    → data: <parsed JSON>, loading: false
//   4. On failure    → error: <Error object>, loading: false
//
// Note: useEffect's callback can't be async directly.
//       Declare an async function inside and call it.
// ─────────────────────────────────────────────

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData]       = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<Error | null>(null);

  useEffect(() => {
    // TODO: implement the fetch logic here

  }, [url]);

  return { data, loading, error };
}


// ─────────────────────────────────────────────
// STRETCH · Add retry support
// ─────────────────────────────────────────────
// Modify useFetch so it also returns a retry() function.
// Calling retry() should re-trigger the fetch even if `url` hasn't changed.
//
// Hint: you'll need one extra piece of state to make the effect re-run.
//
// When done, DevList will pass retry to the error state so users
// can recover without reloading.
// ─────────────────────────────────────────────
