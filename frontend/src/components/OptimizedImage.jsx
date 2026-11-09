import React, { useState, useEffect, useRef } from 'react';

/**
 * Elegant inline SVG placeholder used if all retries fail.
 * Prevents the browser's ugly broken image icon from ever showing.
 */
const DEFAULT_FALLBACK_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%" fill="none">
      <rect width="400" height="300" fill="#f8fafc"/>
      <rect x="2" y="2" width="396" height="296" rx="8" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6 6"/>
      <g transform="translate(160, 100)">
        <rect width="80" height="60" rx="8" fill="#e2e8f0"/>
        <path d="M15 48l18-20 14 15 12-13 14 18H15z" fill="#94a3b8"/>
        <circle cx="28" cy="22" r="7" fill="#cbd5e1"/>
      </g>
      <text x="200" y="195" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" font-weight="600" fill="#94a3b8" text-anchor="middle">Image Unavailable</text>
    </svg>`
  );

/**
 * OptimizedImage Component
 * ========================
 * - Automatic retry with exponential backoff on network failure (up to 3 times)
 * - Shimmer skeleton state while loading
 * - Smooth fade-in transition on load
 * - Fallback UI preventing broken image icons
 * - Zero extra DOM wrappers (preserves all CSS selectors, flexbox, and layout)
 * - Pre-check for cached images to prevent layout shift or shimmer flicker
 */
export default function OptimizedImage({
  src,
  alt = '',
  className = '',
  style = {},
  fallbackSrc,
  maxRetries = 3,
  retryDelay = 1000,
  priority = false,
  loading,
  fetchPriority,
  decoding = 'async',
  onLoad,
  onError,
  ...restProps
}) {
  const [currentSrc, setCurrentSrc] = useState(src || DEFAULT_FALLBACK_SVG);
  const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const [retryCount, setRetryCount] = useState(0);
  const isFallbackActiveRef = useRef(false);
  const retryTimerRef = useRef(null);
  const isMountedRef = useRef(true);
  const imgRef = useRef(null);

  // Synchronize when src prop changes
  useEffect(() => {
    isFallbackActiveRef.current = false;
    setRetryCount(0);
    if (!src) {
      setCurrentSrc(fallbackSrc || DEFAULT_FALLBACK_SVG);
      setStatus('error');
    } else {
      setCurrentSrc(src);
      setStatus('loading');
    }
  }, [src, fallbackSrc]);

  // Cleanup timers on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };
  }, []);

  // Pre-check for browser-cached images to avoid flash of shimmer
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setStatus('loaded');
    }
  }, [currentSrc]);

  const handleImageLoad = (e) => {
    if (!isMountedRef.current) return;
    setStatus('loaded');
    if (onLoad) onLoad(e);
  };

  const handleImageError = (e) => {
    if (!isMountedRef.current) return;

    // If fallback is already active, prevent any further retries (anti-infinite loop)
    if (isFallbackActiveRef.current) {
      setStatus('error');
      if (onError) onError(e);
      return;
    }

    // Check if we still have retry attempts remaining
    if (retryCount < maxRetries) {
      const nextAttempt = retryCount + 1;
      // Exponential backoff: ~1000ms, ~2000ms, ~3500ms
      const delay = Math.round(retryDelay * Math.pow(1.5, retryCount));

      retryTimerRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;
        setRetryCount(nextAttempt);

        // Append cache-busting query parameter while preserving existing parameters
        const base = src || '';
        if (base.startsWith('data:') || base.startsWith('blob:')) {
          setCurrentSrc(base);
        } else {
          const sep = base.includes('?') ? '&' : '?';
          setCurrentSrc(`${base}${sep}_retry=${nextAttempt}_${Date.now()}`);
        }
      }, delay);
    } else {
      // Retries exhausted — switch to fallback
      setStatus('error');
      isFallbackActiveRef.current = true;
      setCurrentSrc(fallbackSrc || DEFAULT_FALLBACK_SVG);
      if (onError) onError(e);
    }
  };

  // Performance attributes
  const computedLoading = loading || (priority ? 'eager' : 'lazy');
  const computedFetchPriority = fetchPriority || (priority ? 'high' : 'auto');

  // Dynamic status classes for shimmer and reveal
  const statusClass =
    status === 'loading'
      ? 'opt-img-loading'
      : status === 'loaded'
      ? 'opt-img-loaded'
      : 'opt-img-error';

  const combinedClassName = `opt-img ${statusClass} ${className}`.trim();

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      className={combinedClassName}
      style={style}
      loading={computedLoading}
      fetchpriority={computedFetchPriority}
      decoding={decoding}
      onLoad={handleImageLoad}
      onError={handleImageError}
      {...restProps}
    />
  );
}

