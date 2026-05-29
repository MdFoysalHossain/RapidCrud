import { useState, useEffect } from 'react'; // Adjust path to your centralized store
import { smartStore } from './store';

export function useLoader(url) {
  const cacheKey = url ? `loader_${btoa(url).slice(0, 8)}` : null;

  const [cacheState, setCacheState] = useState(() => {
    if (!cacheKey) return { state: 'default', data: null, error: null };
    return smartStore.get(cacheKey);
  });

  useEffect(() => {
    if (!cacheKey || !url) return;

    const unsubscribe = smartStore.subscribe((type, updatedId, value) => {
      if (type === 'cache' && updatedId === cacheKey) {
        setCacheState(value);
      }
    });

    const current = smartStore.get(cacheKey);
    if (current.state === 'default') {
      smartStore.executeFetch(cacheKey, url, 'high');
    } else {
      setCacheState(current);
    }

    return () => unsubscribe();
  }, [url, cacheKey]);

  // 🔄 RETURN AN ARRAY: Wraps the state telemetry object inside an array structure
  return [
    {
      state: cacheState.state, // "default" | "loading" | "inPromise" | "loaded" | "error"
      data: cacheState.data,   // null | Array | Object | String | etc.
      error: cacheState.error  // null | Object
    }
  ];
}