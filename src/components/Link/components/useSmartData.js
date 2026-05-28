import { useState, useEffect } from 'react';
import { smartStore } from './store';

export function useSmartData(id) {
  const [dataState, setDataState] = useState(() => smartStore.get(id));

  useEffect(() => {
    return smartStore.subscribe((type, updatedId, newCacheState) => {
      if (type === 'cache' && updatedId === id) {
        setDataState(newCacheState);
      }
    });
  }, [id]);

  return dataState;
}