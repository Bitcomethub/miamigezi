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
              {/* Lacivert gece zemininde batan güneş — sarı yalnız burada ve
                  rehber numaralarında, az dozda */}
              <Sunburst className="h-3 w-5 translate-y-[1px] text-sun" />
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
            {/* /56: lacivert zeminde /45 4.45:1'de kalıyor (AA<4.5), /56 → 6.19:1 */}
            <p className="mt-5 max-w-[38ch] text-[0.8125rem] leading-relaxed text-paper/56">
              Fiyat, saat ve tarih bilgileri sık değişir. Bu sitedeki rakamlar yön
              göstermek içindir; rezervasyon öncesi resmî kaynaktan teyit edin.
            </p>
          </div>

          <nav aria-label="Tüm rehberler">
            <h2 className="font-display text-label font-semibold tracking-[0.16em] text-paper/56 uppercase">
              Rehberler
            </h2>
            <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {GUIDES.map((g) => (
                <li key={g.slug} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="tabular pt-[3px] font-display text-[0.6875rem] text-sun/75"
                  >
                    {g.number}
                  </span>
                  <Link
                    href={`/${g.slug}`}
                    className="text-small text-paper/78 no-underline transition-colors duration-200 hover:text-sun"
                  >
                    {g.navLabel}
                  </Link>
                </li>
              ))}
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="tabular pt-[3px] font-display text-[0.6875rem] text-sun/75"
                >
                  ↗
                </span>
                <Link
                  href="/blog"
                  className="text-small text-paper/78 no-underline transition-colors duration-200 hover:text-sun"
                >
                  Blog
                </Link>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="tabular pt-[3px] font-display text-[0.6875rem] text-sun/75"
                >
                  ↗
                </span>
                <Link
                  href="/hakkinda"
                  className="text-small text-paper/78 no-underline transition-colors duration-200 hover:text-sun"
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
              className="text-paper underline decoration-flamingo/60 underline-offset-4 transition-colors hover:decoration-flamingo"
            >
              {PUBLISHER.name}
            </a>{' '}
            yayınıdır.
          </p>
          {/* /52: /40 lacivertte 3.77:1 (AA<4.5), /52 → 5.51:1 */}
          <p className="text-[0.8125rem] text-paper/52">
            © {year} {PUBLISHER.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
