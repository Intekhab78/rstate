/**
 * Helper to build comprehensive SEO props & Schema.org JSON-LD for project pages.
 */
export function buildProjectSEO(project, currentSlug) {
  if (!project) return null;

  const siteUrl = "https://rstate.jtsmiddleeast.com";
  const slug = project.slug || currentSlug || "saffpoll-residences";
  const title = project.name || project.title || "SaffPoll Residences";
  const category = project.category || "Premium Residential Development";
  const location = project.location || "New Delhi, India";
  const overview = project.overview || project.description || "";
  const price = project.price || project.startingPrice;
  const heroImage =
    project.heroImage ||
    project.image_url ||
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85";

  // SEO overrides from admin
  const seo = project.seo || {};

  const seoTitle = seo.title?.trim()
    ? seo.title.trim()
    : `${title} | ${category} in ${location} - SaffPoll`;

  const seoDescription = seo.description?.trim()
    ? seo.description.trim()
    : overview
    ? overview.slice(0, 155) + (overview.length > 155 ? "..." : "")
    : `Explore ${title}, a ${category.toLowerCase()} in ${location} by SaffPoll offering thoughtful planning and enduring quality.`;

  const seoKeywords = seo.keywords?.trim()
    ? seo.keywords.trim()
    : `${title}, ${category}, real estate in ${location}, modern architecture, SaffPoll residences`;

  const canonicalUrl = seo.canonical_url?.trim()
    ? seo.canonical_url.trim()
    : `${siteUrl}/project/${slug}`;

  const ogImage = seo.og_image?.trim() ? seo.og_image.trim() : heroImage;
  const imageAlt = seo.image_alt?.trim() ? seo.image_alt.trim() : `${title} - ${category}`;

  const noindex = Boolean(seo.noindex);
  const nofollow = Boolean(seo.nofollow);
  const schemaType = seo.schema_type || "Accommodation";

  // Construct valid Schema.org Graph
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${siteUrl}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Projects",
            "item": `${siteUrl}/project`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": title,
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": schemaType,
        "@id": `${canonicalUrl}#project`,
        "name": title,
        "description": seoDescription,
        "image": [ogImage],
        "url": canonicalUrl,
        "category": category,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": location,
          "addressCountry": "IN"
        },
        ...(price ? { "offers": { "@type": "Offer", "priceCurrency": "INR", "price": price } } : {})
      }
    ]
  };

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    canonicalUrl,
    ogImage,
    imageAlt,
    ogType: "article",
    noindex,
    nofollow,
    structuredData,
  };
}
