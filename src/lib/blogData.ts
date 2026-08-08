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

export type { BlogPost } from '@/content/blog/types';
