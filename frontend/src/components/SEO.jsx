import React, { useEffect } from "react";

const SITE_URL = "https://rstate.jtsmiddleeast.com";
const DEFAULT_TITLE = "SaffPoll | Engineering, Architecture & Premium Developments";
const DEFAULT_DESC =
  "SaffPoll delivers contemporary architectural excellence, functional residential spaces, and premium developments built with enduring quality.";
const DEFAULT_OG_IMAGE =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85";

/**
 * Universal SEO Component
 * Supports React 19 native head element hoisting and synchronous DOM meta synchronization.
 */
export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  imageAlt,
  ogType = "website",
  noindex = false,
  nofollow = false,
  structuredData = null,
}) {
  // Compute resolved metadata with safe fallbacks
  const resolvedTitle = title ? `${title}` : DEFAULT_TITLE;
  const resolvedDesc = description || DEFAULT_DESC;
  const resolvedOgImage = ogImage || DEFAULT_OG_IMAGE;
  const resolvedAlt = imageAlt || resolvedTitle;

  // Resolve robots directive
  let robotsDirective = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  if (noindex && nofollow) {
    robotsDirective = "noindex, nofollow";
  } else if (noindex) {
    robotsDirective = "noindex, follow";
  } else if (nofollow) {
    robotsDirective = "index, nofollow";
  }

  // Resolve canonical URL
  let resolvedCanonical = canonicalUrl;
  if (!resolvedCanonical && typeof window !== "undefined") {
    resolvedCanonical = `${SITE_URL}${window.location.pathname}`;
  } else if (resolvedCanonical && resolvedCanonical.startsWith("/")) {
    resolvedCanonical = `${SITE_URL}${resolvedCanonical}`;
  } else if (!resolvedCanonical) {
    resolvedCanonical = SITE_URL;
  }
  // Remove trailing slash if not root
  if (resolvedCanonical.length > SITE_URL.length && resolvedCanonical.endsWith("/")) {
    resolvedCanonical = resolvedCanonical.slice(0, -1);
  }

  // Synchronous DOM synchronization for maximum crawler and browser compatibility
  useEffect(() => {
    // 1. Update Title
    document.title = resolvedTitle;

    // Helper function to update or create a meta tag
    const setMetaTag = (attribute, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attribute, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 2. Standard Meta Tags
    setMetaTag("name", "description", resolvedDesc);
    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    }
    setMetaTag("name", "robots", robotsDirective);

    // 3. Open Graph Meta Tags
    setMetaTag("property", "og:title", resolvedTitle);
    setMetaTag("property", "og:description", resolvedDesc);
    setMetaTag("property", "og:url", resolvedCanonical);
    setMetaTag("property", "og:image", resolvedOgImage);
    setMetaTag("property", "og:image:alt", resolvedAlt);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:site_name", "SaffPoll Developments");

    // 4. Twitter Card Meta Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", resolvedTitle);
    setMetaTag("name", "twitter:description", resolvedDesc);
    setMetaTag("name", "twitter:image", resolvedOgImage);
    setMetaTag("name", "twitter:url", resolvedCanonical);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", resolvedCanonical);

    // 6. Structured Data (JSON-LD)
    const scriptId = "dynamic-seo-schema";
    let scriptTag = document.getElementById(scriptId);
    if (structuredData) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = scriptId;
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Optional cleanup on unmount
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [
    resolvedTitle,
    resolvedDesc,
    keywords,
    robotsDirective,
    resolvedCanonical,
    resolvedOgImage,
    resolvedAlt,
    ogType,
    structuredData,
  ]);

  return (
    <>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsDirective} />
      <link rel="canonical" href={resolvedCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:alt" content={resolvedAlt} />
      <meta property="og:type" content={ogType} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDesc} />
      <meta name="twitter:image" content={resolvedOgImage} />

      {/* JSON-LD Script tag for React 19 hydration */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </>
  );
}
