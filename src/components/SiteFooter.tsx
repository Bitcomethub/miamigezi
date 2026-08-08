import Link from 'next/link';
import { GUIDES } from '@/content/guides';
import { PUBLISHER, SITE, miamiliUrl } from '@/lib/site';
import { Sunburst } from './Ledge';

export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="fluted mt-band bg-ink text-paper">
      <div className="mx-auto max-w-[78rem] px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <div className="flex items-baseline gap-2 font-display">
              <Sunburst className="h-3 w-5 translate-y-[1px] text-coral" />
              <span
                className="text-[1.32rem] leading-none font-semibold tracking-[-0.02em]"
                style={{ fontStretch: '112%' }}
              >
                miamigezi
              </span>
            </div>
            <p className="mt-4 max-w-[34ch] text-small text-paper/62">
              {SITE.description}
            </p>
            <p className="mt-5 max-w-[38ch] text-[0.8125rem] leading-relaxed text-paper/45">
              Fiyat, saat ve tarih bilgileri sık değişir. Bu sitedeki rakamlar yön
              göstermek içindir; rezervasyon öncesi resmî kaynaktan teyit edin.
            </p>
          </div>

          <nav aria-label="Tüm rehberler">
            <h2 className="font-display text-label font-semibold tracking-[0.16em] text-paper/45 uppercase">
              Rehberler
            </h2>
            <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {GUIDES.map((g) => (
                <li key={g.slug} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="tabular pt-[3px] font-display text-[0.6875rem] text-coral/70"
                  >
                    {g.number}
                  </span>
                  <Link
                    href={`/${g.slug}`}
                    className="text-small text-paper/78 no-underline transition-colors duration-200 hover:text-coral"
                  >
                    {g.navLabel}
                  </Link>
                </li>
              ))}
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="tabular pt-[3px] font-display text-[0.6875rem] text-coral/70"
                >
                  ↗
                </span>
                <Link
                  href="/blog"
                  className="text-small text-paper/78 no-underline transition-colors duration-200 hover:text-coral"
                >
                  Blog
                </Link>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="tabular pt-[3px] font-display text-[0.6875rem] text-coral/70"
                >
                  ↗
                </span>
                <Link
                  href="/hakkinda"
                  className="text-small text-paper/78 no-underline transition-colors duration-200 hover:text-coral"
                >
                  Hakkında
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Künye — sahiplik açık beyanı. Tek satır, gizlenmemiş, utm'li. */}
        <div className="mt-12 flex flex-col gap-2 border-t border-paper/14 pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-display text-small text-paper/62">
            Bir{' '}
            <a
              href={miamiliUrl('/', 'footer-kunye')}
              className="text-paper underline decoration-coral/60 underline-offset-4 transition-colors hover:decoration-coral"
            >
              {PUBLISHER.name}
            </a>{' '}
            yayınıdır.
          </p>
          <p className="text-[0.8125rem] text-paper/40">
            © {year} {PUBLISHER.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
