import type { MetadataRoute } from 'next';
import { GUIDES } from '@/content/guides';
import { ALL_POSTS } from '@/lib/blogData';
import { abs } from '@/lib/site';

// Sitemap tek bir yerden türer: GUIDES + ALL_POSTS. Yeni rehber ya da yeni
// üretilmiş yazı otomatik girer; elle liste tutulmaz.
export default function sitemap(): MetadataRoute.Sitemap {
  const newestGuide = GUIDES.reduce(
    (acc, g) => (g.updated > acc ? g.updated : acc),
    GUIDES[0].updated,
  );

  return [
    {
      url: abs('/'),
      lastModified: newestGuide,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...GUIDES.map((g) => ({
      url: abs(`/${g.slug}`),
      lastModified: g.updated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    {
      url: abs('/blog'),
      lastModified: ALL_POSTS[0]?.publishedAt ?? newestGuide,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    ...ALL_POSTS.map((p) => ({
      url: abs(`/blog/${p.slug}`),
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    {
      url: abs('/hakkinda'),
      lastModified: newestGuide,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
