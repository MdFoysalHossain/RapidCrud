import React, { useState, useEffect } from 'react';

/**
 * Image Component - Zero CSS Dependency
 * High-performance media optimization engine.
 */
export function Image({ 
  src, 
  alt = "", 
  width, 
  height, 
  quality = 75, 
  className = "", 
  ...rest 
}) {
  const [optimizedSrc, setOptimizedSrc] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    // ⚡ SUPPRESSION STRATEGY: Strip metadata, scale server-side, and enforce webp formatting
    const isUrlWithParams = src.includes('?');
    const paramSeparator = isUrlWithParams ? '&' : '?';
    
    let suppressionParams = `format=webp`;
    if (width) suppressionParams += `&w=${width}`;
    if (height) suppressionParams += `&h=${height}`;
    
    const secureQuality = Math.min(Math.max(quality, 60), 85);
    suppressionParams += `&q=${secureQuality}`;

    setOptimizedSrc(`${src}${paramSeparator}${suppressionParams}`);
  }, [src, width, height, quality]);

  // Rigid inline style layout boxes ensuring sizes never distort or alter document flow
  const containerStyle = {
    position: 'relative',
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : '100%',
    maxWidth: width ? `${width}px` : '100%',
    maxHeight: height ? `${height}px` : '100%',
    overflow: 'hidden',
    backgroundColor: '#1e293b', // Tailwind slate-800 dark fallback color
  };

  const loaderStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    color: '#64748b',
    fontSize: '14px',
    fontFamily: 'sans-serif',
    zIndex: 2,
    opacity: isLoaded ? 0 : 1,
    transition: 'opacity 0.2s ease-in-out',
    pointerEvents: 'none',
  };

  const imageStyle = {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover', 
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.15s ease-in-out', 
    ...rest.style
  };

  return (
    <div className={className} style={containerStyle}>
      {/* 🚀 Pure Inline JS Loading Overlay State Indicator */}
      {!isLoaded && (
        <div style={loaderStyle}>
          <span>Loading...</span>
        </div>
      )}

      {/* Embedded Native Image Element Tag */}
      <img
        src={optimizedSrc || src}
        alt={alt}
        loading="lazy" 
        onLoad={() => setIsLoaded(true)}
        className={className}
        style={imageStyle}
        {...rest}
      />
    </div>
  );
}