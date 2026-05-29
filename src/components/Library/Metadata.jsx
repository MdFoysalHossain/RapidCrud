import React, { useEffect } from 'react';

/**
 * Metadata Component
 * Next.js-inspired SEO Engine for RapidCrud.
 * Handles head tag injections dynamically for both static and dynamic routes.
 * @param {Object} props
 * @param {Object} props.config - Configuration collection
 * @param {string} props.config.title - Tab window title template string
 * @param {string} props.config.description - SEO meta directory description text
 * @param {string[]} props.config.keywords - Array of searchable indexing key strings
 * @param {string} props.config.image - Generic og:image preview URL asset link
 * @param {string} props.config.androidImage - Rel icon launcher asset target link
 * @param {string} props.config.iosImage - Apple touch icon layout link string
 */
export function Metadata({ config }) {
  useEffect(() => {
    if (!config || typeof config !== 'object') return;

    // --- 1. Dynamic Window Tab Title Resolution ---
    if (config.title && typeof config.title === 'string') {
      document.title = config.title;
    }

    // --- 2. Helper Method to Safely Query/Create Meta Elements ---
    const getOrCreateMetaTag = (attribute, attrValue) => {
      let element = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      return element;
    };

    // --- 3. Helper Method to Safely Query/Create Link Elements ---
    const getOrCreateLinkTag = (rel, sizes) => {
      let selector = `link[rel="${rel}"]`;
      if (sizes) selector += `[sizes="${sizes}"]`;
      
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        if (sizes) element.setAttribute('sizes', sizes);
        document.head.appendChild(element);
      }
      return element;
    };

    // --- 4. Description String Mapping ---
    if (config.description && typeof config.description === 'string') {
      const descTag = getOrCreateMetaTag('name', 'description');
      descTag.setAttribute('content', config.description);
      
      const ogDescTag = getOrCreateMetaTag('property', 'og:description');
      ogDescTag.setAttribute('content', config.description);
    }

    // --- 5. Keywords Array Compiling Mapping ---
    if (config.keywords && Array.isArray(config.keywords)) {
      const cleanKeywords = config.keywords.filter(k => typeof k === 'string').join(', ');
      if (cleanKeywords) {
        const keywordsTag = getOrCreateMetaTag('name', 'keywords');
        keywordsTag.setAttribute('content', cleanKeywords);
      }
    }

    // --- 6. Shared Social Channel Previews (og:image / twitter:image) ---
    if (config.image && typeof config.image === 'string') {
      const ogImgTag = getOrCreateMetaTag('property', 'og:image');
      ogImgTag.setAttribute('content', config.image);

      const twImgTag = getOrCreateMetaTag('name', 'twitter:image');
      twImgTag.setAttribute('content', config.image);
    }

    // --- 7. Android Device Specific UI Shortcuts ---
    if (config.androidImage && typeof config.androidImage === 'string') {
      const androidLinkTag = getOrCreateLinkTag('icon', '192x192');
      androidLinkTag.setAttribute('href', config.androidImage);
    }

    // --- 8. iOS Apple-Touch Dynamic Overlays ---
    if (config.iosImage && typeof config.iosImage === 'string') {
      const iosLinkTag = getOrCreateLinkTag('apple-touch-icon');
      iosLinkTag.setAttribute('href', config.iosImage);
    }

  }, [
    config, 
    config?.title, 
    config?.description, 
    config?.keywords, 
    config?.image, 
    config?.androidImage, 
    config?.iosImage
  ]); // Reactively updates instantly if nested data nodes transition or re-render

  return null; // Purely functional render tracking wrapper pipeline
}