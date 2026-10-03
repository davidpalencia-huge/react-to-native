import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  retry: () => void;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData]             = useState<T | null>(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

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
  }, [url, retryCount]);

  const retry = () => setRetryCount(c => c + 1);

  return { data, loading, error, retry };
}
