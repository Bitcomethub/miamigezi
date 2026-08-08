// ─────────────────────────────────────────────────────────────────────────
// Blog içerik modeli
//
// Bu şekil İKİ yerde birden geçerlidir: elle yazılan seed yazılar
// (src/content/blog/seed.ts) ve günlük üretim hattının append ettiği
// generated-posts.json. Şekli değiştiren, scripts/generate-blog-post.mjs
// içindeki OUTPUT_SCHEMA'yı da AYNI commit'te değiştirmek zorundadır.
// ─────────────────────────────────────────────────────────────────────────

export interface BlogSection {
  heading: string;
  body: string[];
  /**
   * Opsiyonel madde listesi. Kelimeleri bölümün kelime bütçesine DAHİLDİR —
   * kalite kapısı (validatePost) body + list toplamını ölçer, yoksa model
   * gövdeyi boşaltıp listeye kaçarak pasaj uzunluğu kuralını deliyor.
   */
  list?: string[];
}

export interface BlogFAQ {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Yazının doğrudan yanıtladığı soru (H1 altı, GEO için) */
  question: string;
  excerpt: string;
  keywords: string[];
  /** ISO tarih (YYYY-MM-DD) */
  publishedAt: string;
  updatedAt: string;
  /** Answer-first giriş: ilk cümle soruyu doğrudan yanıtlar */
  intro: string[];
  sections: BlogSection[];
  faqs: BlogFAQ[];
  /** Kalite kapısını geçemeyen taslaklar bu bayrakla gelir ve yayınlanmaz */
  status?: 'published' | 'needs_review';
  /** Üretim hattından geldiyse true — künyede belirtilir */
  generated?: boolean;
}
