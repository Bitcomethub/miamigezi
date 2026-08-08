// ─────────────────────────────────────────────────────────────────────────
// Rehber içerik modeli (SSOT)
//
// 10 temel rehber sayfası bu şekli paylaşır. Sayfa JSX'i değil VERİ yazılır:
// /[slug] route'u generateStaticParams ile tüm rehberleri prerender eder,
// sitemap ve JSON-LD aynı diziden türer. Yeni rehber = yeni veri dosyası.
// ─────────────────────────────────────────────────────────────────────────

export interface GuideTable {
  /** Tablonun ne anlattığı — <caption> olarak basılır (ekran okuyucu için şart) */
  caption: string;
  columns: string[];
  rows: string[][];
  /** Rakamların ne kadar oynak olduğunu söyleyen çerçeve — tablo altında */
  note?: string;
}

export interface GuideSection {
  /** Soru formatında H2 — kullanıcıların arama kutusuna yazdığı biçim */
  heading: string;
  /** Bağlamsız okunabilir paragraflar (her biri kendi başına alıntılanabilir) */
  body: string[];
  list?: string[];
  table?: GuideTable;
  /** Uyarı / "değişebilir" çerçevesi */
  note?: string;
}

export interface GuideFAQ {
  q: string;
  a: string;
}

export interface GuideFact {
  label: string;
  value: string;
}

export interface GuideSource {
  label: string;
  url: string;
}

/** İçerik içinde bağlamsal olarak geçen MiamiLi bağlantısı (zorunlu değil). */
export interface MiamiliLink {
  /** miamili.com üzerindeki yol — ör. '/rehber' */
  path: string;
  /** Bağlantı metni */
  label: string;
  /** Bağlantının neden burada olduğunu açıklayan cümle */
  context: string;
}

export interface Guide {
  slug: string;
  /** Editoryal içindekiler numarası — '01'…'10' */
  number: string;
  title: string;
  navLabel: string;
  /** Rehberin doğrudan yanıtladığı çekirdek soru */
  question: string;
  excerpt: string;
  keywords: string[];
  /** ISO tarih — sitemap lastModified ve dateModified */
  updated: string;
  /** Answer-first giriş: ilk cümle soruyu doğrudan yanıtlar */
  intro: string[];
  /** Sayfanın en üstündeki almanak bloğu */
  quickFacts: GuideFact[];
  sections: GuideSection[];
  faqs: GuideFAQ[];
  sources?: GuideSource[];
  /** İlgili diğer rehberlerin slug'ları */
  related: string[];
  /** Varsa, bu sayfadaki tek bağlamsal MiamiLi bağlantısı */
  miamili?: MiamiliLink;
}
