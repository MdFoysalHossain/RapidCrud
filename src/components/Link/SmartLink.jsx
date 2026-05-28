import React from 'react';
import { smartStore } from './components/store';

export function SmartLink({ 
  to, 
  fetch: url, 
  id, 
  prefetchOn = 'hover', 
  priority = 'low', 
  children, 
  ...props 
}) {

  const triggerFetch = () => {
    if (url && id) smartStore.executeFetch(id, url, priority);
  };

  return (
    <a 
      href={to} 
      onMouseEnter={() => prefetchOn === 'hover' && triggerFetch()}
      onClick={(e) => {
        e.preventDefault();
        if (prefetchOn === 'click') triggerFetch();
        window.history.pushState({}, '', to);
        smartStore.setPath(to);
      }}
      {...props}
    >
      {children}
    </a>
  );
}