import React, { useEffect } from 'react';

export function Title({ name }) {
  useEffect(() => {
    // 1. Safely guard against empty or non-string values
    if (name && typeof name === 'string') {
      document.title = name;
    }
  }, [name]); // 2. Trigger updates dynamically whenever the string value modifies

  // This component is purely functional for side-effects and renders no markup
  return null;
}