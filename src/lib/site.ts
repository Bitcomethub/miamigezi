// ─────────────────────────────────────────────────────────────────────────
// Site sabitleri ve MiamiLi bağlantı disiplini (SSOT)
//
// miamigezi, MiamiLi Media'nın Türkçe Miami seyahat rehberi yayınıdır.
// Sahiplik AÇIK: footer'da tek satır künye + bağlamsal (zorlanmamış) içerik
// bağlantıları. Gizli link ağı DEĞİL — bu yüzden bağlantılar `rel="nofollow"`
// ile gizlenmez, ama attribution için HER miamili linki utm taşır.
// ─────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: 'miamigezi',
  legalName: 'MiamiLi Media',
  url: 'https://miamigezi.com',
  locale: 'tr_TR',
  lang: 'tr',
  tagline: 'Miami seyahat rehberi',
  description:
    "Miami’ye gidecekler için Türkçe seyahat rehberi: uçak bileti, gezilecek yerler, otel bölgeleri, plajlar, ulaşım ve aylara göre hava durumu.",
} as const;

export const PUBLISHER = {
  name: 'MiamiLi Media',
  site: 'https://miamili.com',
} as const;

/**
 * MiamiLi'ye giden HER bağlantı buradan üretilir.
 *
 * Neden tek fonksiyon: attribution panelde `utm_source=miamigezi` ile
 * ölçülüyor. İki yerde elle yazılan URL, ilk gün aynı, ikinci gün farklı
 * olur ve kaynak etiketi sessizce düşer.
 *
 * @param path   miamili.com üzerindeki yol — '/rehber', '/rapor' gibi.
 * @param campaign  Bağlantının çıktığı sayfa (utm_campaign) — hangi rehberin
 *                  trafik gönderdiği panelde ayrışsın diye.
 */
export function miamiliUrl(path: string, campaign: string): string {
  const url = new URL(path, PUBLISHER.site);
  url.searchParams.set('utm_source', 'miamigezi');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', campaign);
  return url.toString();
}

/** Mutlak URL üretimi — metadata, sitemap ve JSON-LD tek yerden beslensin. */
export function abs(path: string): string {
  return new URL(path, SITE.url).toString();
}
