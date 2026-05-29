const cache = {};
const listeners = new Set();
let currentPath = window.location.pathname;

export const smartStore = {
  get: (id) => cache[id] || { data: null, state: 'default', error: null },
  
  set: (id, nextState) => {
    cache[id] = { ...smartStore.get(id), ...nextState };
    listeners.forEach((callback) => callback('cache', id, cache[id]));
  },

  getPath: () => currentPath,
  setPath: (nextPath) => {
    currentPath = nextPath;
    listeners.forEach((callback) => callback('path', null, currentPath));
  },

  subscribe: (callback) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },

  executeFetch: async (id, url, priority = 'low') => {
    const current = smartStore.get(id);
    if (current.state === 'loading' || current.state === 'inPromise') return;

    smartStore.set(id, { state: 'loading', error: null });
    try {
      const priorityMap = { low: 'low', medium: 'auto', high: 'high' };
      const response = await fetch(url, { priority: priorityMap[priority] || 'low' });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      
      smartStore.set(id, { state: 'inPromise' });
      const data = await response.json();
      smartStore.set(id, { state: 'loaded', data });
    } catch (error) {
      smartStore.set(id, { state: 'error', error: error.message });
    }
  }
};

window.addEventListener('popstate', () => {
  smartStore.setPath(window.location.pathname);
});