import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Enterprise Production SEO Component for Magency Studio
 * - Dynamically manages Document Title, Meta Description, Canonical URLs
 * - Synchronizes Open Graph (Facebook/LinkedIn) and Twitter Cards
 * - Injects Google-compliant JSON-LD structured data (Breadcrumbs & Services)
 * - Dual-layer support: React 19 native element hoisting + active document synchronization
 */
export default function SEO({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = 'https://www.magencystudio.in/images/favicon.png',
  schema,
  breadcrumbs,
}) {
  const location = useLocation();

  // Consistent primary domain: https://www.magencystudio.in
  const baseUrl = 'https://www.magencystudio.in';
  let path = location.pathname;
  if (path !== '/' && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  const computedCanonical = canonical || (path === '/' ? `${baseUrl}/` : `${baseUrl}${path}`);
  const fullTitle = title.includes('Magency Studio') ? title : `${title} | Magency Studio`;

  useEffect(() => {
    // 1. Page Title
    document.title = fullTitle;

    // Helper to set or update meta tags
    const setMeta = (nameAttr, nameVal, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${nameAttr}="${nameVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameAttr, nameVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Meta description and robots
    setMeta('name', 'description', description);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Canonical Link tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', computedCanonical);

    // 4. Open Graph Metadata
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', computedCanonical);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:site_name', 'Magency Studio');
    setMeta('property', 'og:locale', 'en_US');

    // 5. Twitter Card Metadata
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // 6. Structured Data (JSON-LD)
    const scriptId = 'magency-route-schema';
    let scriptEl = document.getElementById(scriptId);
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const schemas = [];

    // Optional route schema (e.g. Service or Article)
    if (schema) {
      schemas.push(schema);
    }

    // BreadcrumbList schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url.startsWith('http') ? crumb.url : `${baseUrl}${crumb.url}`,
        })),
      });
    }

    if (schemas.length > 0) {
      scriptEl.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
    } else {
      scriptEl.textContent = '';
    }
  }, [fullTitle, description, computedCanonical, ogType, ogImage, schema, breadcrumbs]);

  // React 19 native metadata tags (automatically hoisted into <head>)
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={computedCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={computedCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}

