import type { Metadata } from 'next';
import Link from 'next/link';
import { Ledge } from '@/components/Ledge';
import { breadcrumbSchema } from '@/lib/schema';
import { sitemapEntries } from '../sitemap';

export const metadata: Metadata = {
  title: 'Site Haritası — Tüm Rehberler ve Yazılar',
  description:
    'miamigezi’deki bütün sayfalar tek listede: Miami rehberleri, blog yazıları ve künye. Liste, XML site haritasıyla aynı kaynaktan üretilir.',
  alternates: { canonical: '/site-haritasi' },
};

/**
 * `/site-haritasi` — `/sitemap.xml`in okunabilir hâli.
 *
 * Liste `sitemapEntries()`ten geliyor; ikinci bir elle yazılmış adres listesi
 * YOK. Yeni rehber ya da yazı eklendiğinde XML ve HTML indeks aynı anda
 * güncellenir.
 */
export default function SiteHaritasiPage() {
  const paths = sitemapEntries().map((entry) => new URL(entry.url).pathname);

  return (
    <section className="mx-auto max-w-[78rem] px-5 pt-12 sm:px-8 sm:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: 'Site Haritası', path: '/site-haritasi' }]),
          ),
        }}
      />

      <header className="rise">
        <p className="font-display text-label font-semibold tracking-[0.22em] text-flamingo-deep uppercase">
          Dizin
        </p>
        <h1 className="mt-5 max-w-[18ch] font-display text-h1 font-semibold tracking-[-0.032em] text-balance">
          Sitedeki bütün sayfalar
        </h1>
        <p className="mt-6 max-w-[56ch] text-body text-ink-2">
          Miami rehberleri, blog yazıları ve künye tek listede. Liste, XML site
          haritasıyla aynı kaynaktan üretilir.
        </p>
      </header>

      <Ledge className="mt-12" tone="flamingo" />

      <ul className="mt-10 grid grid-cols-1 gap-x-14 gap-y-2 sm:grid-cols-2">
        {paths.map((path) => (
          <li key={path}>
            <Link
              href={path}
              className="inline-flex text-body text-ink-2 no-underline transition-colors duration-200 hover:text-flamingo-deep"
            >
              {path}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
