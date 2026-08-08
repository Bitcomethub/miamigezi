// ─────────────────────────────────────────────────────────────────────────
// JSON-LD üretimi
//
// KURAL (miamili'de bir kez bedeli ödendi): bir özelliği eklemeden önce
// schema.org'daki `domainIncludes` listesi kontrol edilir. `inLanguage`,
// `about`, `isPartOf`, `mainEntityOfPage` → CreativeWork; Organization'a
// veya Service'e YAZILAMAZ. Parse hatası vermez, sessizce ihlal olur.
// ─────────────────────────────────────────────────────────────────────────

import { SITE, PUBLISHER, abs } from './site';
import type { Guide } from '@/content/guides/types';

const ORG_ID = `${SITE.url}/#publisher`;
const SITE_ID = `${SITE.url}/#website`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: PUBLISHER.name,
    url: PUBLISHER.site,
    // Sahiplik açık beyan: miamigezi, MiamiLi Media'nın bir yayını.
    // `subOrganization` yerine `brand` kullanılmıyor — miamigezi bağımsız
    // bir yayın markası, Organization'ın kendisi yayıncı.
    sameAs: [PUBLISHER.site],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'tr-TR',
    description: SITE.description,
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE.url },
      ...trail.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: t.name,
        item: abs(t.path),
      })),
    ],
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function guideArticleSchema(guide: Guide) {
  const url = abs(`/${guide.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: guide.title,
    description: guide.excerpt,
    inLanguage: 'tr-TR',
    datePublished: guide.updated,
    dateModified: guide.updated,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    // `about` CreativeWork üzerinde geçerli; hedef varlık Miami şehri.
    about: {
      '@type': 'Place',
      name: 'Miami',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Miami',
        addressRegion: 'FL',
        addressCountry: 'US',
      },
    },
    keywords: guide.keywords.join(', '),
  };
}

export function blogPostingSchema(post: {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  keywords: string[];
}) {
  const url = abs(`/blog/${post.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#post`,
    headline: post.title,
    description: post.excerpt,
    inLanguage: 'tr-TR',
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: post.keywords.join(', '),
  };
}
