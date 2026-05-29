import React, { useState, useEffect } from 'react';
import { smartStore } from '../Library/components/store';



// 1. Simultaneously index both isolated routing environments
const staticPages = import.meta.glob('@/pages/**/*.jsx');
const dynamicPages = import.meta.glob('@/dynamicPages/**/*.jsx');

function resolveActiveRoute(currentPath) {
  const cleanPath = currentPath === '/' ? '/home' : currentPath;
  const pathSegments = cleanPath.split('/').filter(Boolean);

  // --- ZONE A: STATIC PAGE LOOKUP ---
  const staticKey = `/src/pages/${pathSegments.join('/')}.jsx`;
  if (staticPages[staticKey]) {
    return {
      importPage: staticPages[staticKey],
      params: {},
      cacheKey: `${pathSegments.join('_')}Data`
    };
  }

  // --- ZONE B: DYNAMIC PARAMETRIC LOOKUP ---
  for (const fileRoute in dynamicPages) {
    // Clean string template mapping: "/src/dynamicPages/profile/[id].jsx" -> "profile/[id]"
    const routePattern = fileRoute
      .replace('/src/dynamicPages/', '')
      .replace('.jsx', '')
      .replace(/\/index$/, '');

    const routeSegments = routePattern.split('/').filter(Boolean);

    // If segments length don't match, this is the wrong file pattern structure
    if (routeSegments.length !== pathSegments.length) continue;

    const params = {};
    const isPatternMatch = routeSegments.every((segment, index) => {
      // Catch bracket parameters like [id]
      if (segment.startsWith('[') && segment.endsWith(']')) {
        const paramName = segment.slice(1, -1);
        params[paramName] = pathSegments[index];
        return true;
      }
      return segment === pathSegments[index];
    });

    if (isPatternMatch) {
      // Build a reliable cache lookup key based on the folder path signature
      const functionalSchema = routeSegments.map(s => s.startsWith('[') ? 'param' : s).join('_');
      return {
        importPage: dynamicPages[fileRoute],
        params,
        cacheKey: `${functionalSchema}Data`
      };
    }
  }

  return null;
}

export function Router() {
  const [currentPath, setCurrentPath] = useState(() => smartStore.getPath());
  const [PageModule, setPageModule] = useState(null);
  const [routeParams, setRouteParams] = useState({});
  const [activeCacheKey, setActiveCacheKey] = useState('');
  const [hasError, setHasError] = useState(false);
  const [globalCache, setGlobalCache] = useState({});

  useEffect(() => {
    return smartStore.subscribe((type, id, value) => {
      if (type === 'path') {
        setCurrentPath(value);
      } else if (type === 'cache') {
        setGlobalCache(prev => ({ ...prev, [id]: value }));
      }
    });
  }, []);

  useEffect(() => {
    const match = resolveActiveRoute(currentPath);

    if (match) {
      setActiveCacheKey(match.cacheKey);
      match.importPage()
        .then((module) => {
          setPageModule(() => module.default);
          setRouteParams(match.params);
          setHasError(false);
        })
        .catch(() => setHasError(true));
    } else {
      setHasError(true);
    }
  }, [currentPath]);

  if (hasError) return <div style={{ padding: '20px' }}>404 - Page view not found inside system directories</div>;
  if (!PageModule) return <div style={{ padding: '20px' }}>Synchronizing layout stream...</div>;

  // Resolve the cached payload matching either standard or calculated identifier
  // Fallback checks both global internal state maps
  const routeData = globalCache[activeCacheKey] || smartStore.get(activeCacheKey);

  return (
    <PageModule 
      params={routeParams}
      smartData={routeData.data} 
      smartState={routeData.state} 
      smartError={routeData.error} 
    />
  );
}