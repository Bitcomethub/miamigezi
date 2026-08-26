import manifest from './images.json';

// ─────────────────────────────────────────────────────────────────────────
// Görsel SSOT'u
//
// Kaynak: scripts/fetch-images.mjs (Unsplash → public/images/*.webp).
// images.json ELLE BÜYÜTÜLMEZ; script'in yazma alanıdır. TEK istisna `alt`
// ve `illustrative` alanlarıdır: Türkçe alt metni ve "bu kare gerçekten
// Miami mi" kararı insan işidir, script bunları üzerine yazmaz.
//
// Neden BlogPost/Guide tipine gömülü DEĞİL: blog yazıları her sabah içerik
// hattı tarafından üretiliyor (scripts/generate-blog-post.mjs). Görseli
// zorunlu alan yapmak OUTPUT_SCHEMA'yı ve hattı kırardı. Ayrı manifest
// sayesinde görseli olmayan yeni yazı sorunsuz render olur — Photo bileşeni
// sessizce hiçbir şey basmaz.
// ─────────────────────────────────────────────────────────────────────────

export interface SiteImage {
  /** 'guide:plajlar' · 'blog:<slug>' · 'page:home' */
  key: string;
  /** public/ altındaki yol — /images/guide-plajlar.webp */
  src: string;
  width: number;
  height: number;
  /** next/image blur placeholder (16px WebP, data URI) */
  blurDataURL: string;
  /** Türkçe alt metni — karede GERÇEKTEN ne olduğunu anlatır */
  alt: string;
  /** Unsplash'in kendi açıklaması — alt metninin dayanağı, denetim izi */
  altSource: string;
  photographer: string;
  /** Unsplash profil URL'i (utm_source zorunlu — API şartı) */
  photographerUrl: string;
  unsplashUrl: string;
  unsplashId: string;
  /**
   * Karede ya da Unsplash açıklamasında Miami/Florida kanıtı YOKSA true.
   * Künyede "temsilî" olarak basılır. Varsayılan güvenli taraftadır: bu site
   * uydurma rakam yazmıyorsa, uydurma yer de ima etmez.
   */
  illustrative: boolean;
  /** Hangi arama teriminden geldi — yeniden üretilebilirlik için */
  query: string;
}

const IMAGES = manifest as unknown as Record<string, SiteImage>;

/** Anahtarı olmayan sayfa görselsiz render olur — çağıran yer null kontrolü yapar. */
export function getImage(key: string): SiteImage | undefined {
  return IMAGES[key];
}

export function guideImage(slug: string): SiteImage | undefined {
  return getImage(`guide:${slug}`);
}

export function postImage(slug: string): SiteImage | undefined {
  return getImage(`blog:${slug}`);
}

export function pageImage(name: 'home' | 'blog' | 'hakkinda'): SiteImage | undefined {
  return getImage(`page:${name}`);
}
