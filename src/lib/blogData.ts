import { SEED_POSTS } from '@/content/blog/seed';
import generated from '@/content/blog/generated-posts.json';
import type { BlogPost } from '@/content/blog/types';

// ─────────────────────────────────────────────────────────────────────────
// Blog SSOT — iki parça:
//   1) seed.ts            → elle yazılan açılış yazıları
//   2) generated-posts.json → günlük üretim hattının append ettiği yazılar
//
// generated-posts.json'u ELLE BÜYÜTME. Hattın (scripts/generate-blog-post.mjs)
// yazma alanıdır; elle eklenen kayıt bir sonraki koşuda çakışma yaratır.
// ─────────────────────────────────────────────────────────────────────────

const GENERATED = generated as unknown as BlogPost[];

/** needs_review bayraklı taslaklar YAYINLANMAZ — insan onayı bekler. */
function isPublished(post: BlogPost): boolean {
  return post.status !== 'needs_review';
}

/** Yeni → eski. ISO tarihler sözlüksel olarak da doğru sıralanır. */
function byDateDesc(a: BlogPost, b: BlogPost): number {
  return b.publishedAt.localeCompare(a.publishedAt);
}

export const ALL_POSTS: BlogPost[] = [...SEED_POSTS, ...GENERATED]
  .filter(isPublished)
  .sort(byDateDesc);

const BY_SLUG = new Map(ALL_POSTS.map((p) => [p.slug, p]));

export function getPost(slug: string): BlogPost | undefined {
  return BY_SLUG.get(slug);
}

export function getRecentPosts(limit: number): BlogPost[] {
  return ALL_POSTS.slice(0, limit);
}

/**
 * İlgili yazılar: ortak anahtar kelime sayısı çoksa önce; eşitlikte yayın
 * sırasında bu yazıdan SONRA gelenler (sona gelince başa sarar), böylece
 * gelen bağlantı tüm yazılara dağılır ve hiçbir yazı yetim kalmaz.
 */
export function getRelatedPosts(slug: string, limit = 4): BlogPost[] {
  const i = ALL_POSTS.findIndex((p) => p.slug === slug);
  if (i < 0) return [];
  const words = new Set(ALL_POSTS[i].keywords.map((k) => k.toLowerCase()));
  const overlap = (p: BlogPost) => p.keywords.filter((k) => words.has(k.toLowerCase())).length;
  const rotated = [...ALL_POSTS.slice(i + 1), ...ALL_POSTS.slice(0, i)];
  return rotated
    .map((p, order) => ({ p, order, score: overlap(p) }))
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, limit)
    .map((x) => x.p);
}

export type { BlogPost } from '@/content/blog/types';
