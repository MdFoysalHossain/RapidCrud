import React, { useState, useEffect } from 'react';
import { smartStore } from './components/store';

export function SmartLoad({ fetch: url, id, children, onSuccess }) {
  const cacheKey = id || `auto_${btoa(url).slice(0, 8)}`;
  const [cacheState, setCacheState] = useState(() => smartStore.get(cacheKey));

  useEffect(() => {
    const unsubscribe = smartStore.subscribe((type, updatedId, value) => {
      if (type === 'cache' && updatedId === cacheKey) {
        setCacheState(value);
      }
    });

    const current = smartStore.get(cacheKey);
    if (current.state === 'default') {
      smartStore.executeFetch(cacheKey, url, 'high');
    }

    return () => unsubscribe();
  }, [url, cacheKey]);

  const statePayload = cacheState.state;
  const dataPayload = cacheState.data;
  const errorPayload = cacheState.error;

  // Render onSuccess wrapper ONLY if data successfully fetched
  if (statePayload === 'loaded' && onSuccess && dataPayload) {
    return <>{onSuccess(dataPayload)}</>;
  }

  // Pass control straight down to inline child templates
  if (typeof children === 'function') {
    return <>{children({ state: statePayload, data: dataPayload, error: errorPayload })}</>;
  }

  return null;
}