import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GUIDES, getGuide, getGuides } from '@/content/guides';
import type { GuideSection } from '@/content/guides/types';
import { Ledge, Sunburst } from '@/components/Ledge';
import { abs, miamiliUrl } from '@/lib/site';
import {
  breadcrumbSchema,
  faqSchema,
  guideArticleSchema,
} from '@/lib/schema';

// Kök seviyedeki dinamik segment. /blog ve /hakkinda gibi STATİK segmentler
// eşleştiricide bunun önüne geçer, o yüzden çakışmaz. dynamicParams=false:
// listede olmayan bir slug 404 döner, ISR ile sessizce üretilmez.
export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.excerpt,
    keywords: guide.keywords,
    alternates: { canonical: `/${guide.slug}` },
    openGraph: {
      type: 'article',
      title: guide.title,
      description: guide.excerpt,
      url: abs(`/${guide.slug}`),
      locale: 'tr_TR',
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = getGuides(guide.related);
  const schema = [
    guideArticleSchema(guide),
    faqSchema(guide.faqs),
    breadcrumbSchema([{ name: guide.navLabel, path: `/${guide.slug}` }]),
  ];

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── Başlık bloğu ─────────────────────────────────────────────── */}
      <header className="rise mx-auto max-w-[78rem] px-5 pt-12 sm:px-8 sm:pt-16">
        <p className="flex items-center gap-3 font-display text-label font-semibold tracking-[0.2em] text-mute uppercase">
          <Link
            href="/"
            className="text-mute no-underline transition-colors hover:text-coral-deep"
          >
            Rehberler
          </Link>
          <span aria-hidden="true" className="text-coral-quiet">
            /
          </span>
          <span className="tabular text-coral-deep">{guide.number}</span>
        </p>

        <h1 className="mt-5 max-w-[20ch] font-display text-h1 font-semibold tracking-[-0.032em] text-balance">
          {guide.title}
        </h1>

        <p className="mt-6 max-w-[54ch] font-display text-h3 text-ink-2">
          {guide.question}
        </p>
      </header>

      {/* ── Almanak: hızlı bilgiler ──────────────────────────────────── */}
      <section
        className="mx-auto mt-12 max-w-[78rem] px-5 sm:px-8"
        aria-label="Özet bilgiler"
      >
        <Ledge tone="coral" />
        <dl className="mt-7 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {guide.quickFacts.map((fact) => (
            <div key={fact.label} className="min-w-0">
              <dt className="font-display text-label font-semibold tracking-[0.14em] text-mute uppercase">
                {fact.label}
              </dt>
              <dd className="tabular mt-1 font-display text-h3 font-medium text-ink">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
        <Ledge className="mt-8" />
      </section>

      {/* ── Gövde ────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[78rem] px-5 sm:px-8">
        <div className="prose-mg mt-12">
          {guide.intro.map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? 'text-body leading-relaxed text-ink'
                  : 'mt-4 text-body leading-relaxed text-ink-2'
              }
            >
              {para}
            </p>
          ))}
        </div>

        {guide.sections.map((section, i) => (
          <Section key={section.heading} section={section} index={i} />
        ))}

        {guide.miamili ? (
          <aside className="mt-stack max-w-[68rem] border border-ink/14 bg-paper-2 px-6 py-6 sm:px-8">
            <p className="flex items-center gap-2.5 font-display text-label font-semibold tracking-[0.18em] text-coral-deep uppercase">
              <Sunburst className="h-3 w-5" />
              Aynı ağdan
            </p>
            <p className="mt-3 max-w-[62ch] text-small text-ink-2">
              {guide.miamili.context}{' '}
              <a
                href={miamiliUrl(guide.miamili.path, `rehber-${guide.slug}`)}
                className="font-medium text-coral-deep underline decoration-coral/45 underline-offset-4 transition-colors hover:decoration-coral"
              >
                {guide.miamili.label}
              </a>{' '}
              işinizi görebilir.
            </p>
          </aside>
        ) : null}

        {/* ── SSS ─────────────────────────────────────────────────────── */}
        <section className="mt-band" aria-labelledby="sss">
          <h2
            id="sss"
            className="font-display text-label font-semibold tracking-[0.2em] text-mute uppercase"
          >
            Sık sorulanlar
          </h2>
          <Ledge className="mt-3" />

          <dl className="mt-8 max-w-[72ch]">
            {guide.faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="border-t border-ink/12 py-6 first:border-t-0 first:pt-0"
              >
                <dt className="font-display text-h3 font-semibold tracking-[-0.015em] text-ink">
                  <span
                    aria-hidden="true"
                    className="tabular mr-3 text-coral-quiet"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {faq.q}
                </dt>
                <dd className="mt-2.5 text-small leading-relaxed text-ink-2">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {guide.sources && guide.sources.length > 0 ? (
          <section className="mt-stack" aria-labelledby="kaynaklar">
            <h2
              id="kaynaklar"
              className="font-display text-label font-semibold tracking-[0.2em] text-mute uppercase"
            >
              Resmî kaynaklar
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {guide.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    rel="nofollow noopener"
                    className="text-small text-coral-deep underline decoration-coral/35 underline-offset-4 transition-colors hover:decoration-coral"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="mt-stack text-small text-mute">
          Son güncelleme:{' '}
          <time dateTime={guide.updated} className="tabular">
            {formatDate(guide.updated)}
          </time>
        </p>
      </div>

      {/* ── İlgili rehberler ─────────────────────────────────────────── */}
      {related.length > 0 ? (
        <nav
          className="mx-auto mt-band max-w-[78rem] px-5 sm:px-8"
          aria-labelledby="ilgili"
        >
          <h2
            id="ilgili"
            className="font-display text-label font-semibold tracking-[0.2em] text-mute uppercase"
          >
            Sıradaki
          </h2>
          <Ledge className="mt-3" tone="coral" />
          <ul className="mt-8">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/${r.slug}`}
                  className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-t border-ink/12 py-5 no-underline first:border-t-0 sm:grid-cols-[3rem_1fr]"
                >
                  <span
                    aria-hidden="true"
                    className="tabular font-display text-small font-semibold text-coral-quiet transition-colors group-hover:text-coral-deep"
                  >
                    {r.number}
                  </span>
                  <span>
                    <span className="block font-display text-h3 font-semibold text-ink transition-colors group-hover:text-coral-deep">
                      {r.navLabel}
                    </span>
                    <span className="mt-1 block max-w-[58ch] text-small text-ink-2">
                      {r.question}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </article>
  );
}

function Section({ section, index }: { section: GuideSection; index: number }) {
  return (
    <section className="mt-band">
      <h2 className="max-w-[24ch] font-display text-h2 font-semibold tracking-[-0.028em] text-balance">
        <span
          aria-hidden="true"
          className="tabular mr-3.5 align-[0.18em] text-h3 font-medium text-coral-quiet"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        {section.heading}
      </h2>

      <div className="prose-mg mt-6">
        {section.body.map((para, i) => (
          <p key={i} className="text-body leading-relaxed text-ink-2">
            {para}
          </p>
        ))}
      </div>

      {section.list ? (
        <ul className="mt-7 max-w-[68ch]">
          {section.list.map((item) => (
            <li
              key={item}
              className="grid grid-cols-[1.35rem_1fr] items-baseline gap-x-2 border-t border-ink/10 py-3 first:border-t-0"
            >
              <span aria-hidden="true" className="text-small text-coral-quiet">
                —
              </span>
              <span className="text-small text-ink-2">{item}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {section.table ? (
        <figure className="mt-8">
          <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">{section.table.caption}</caption>
              <thead>
                <tr>
                  {section.table.columns.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="border-b border-ink/25 pt-0 pb-2.5 pr-5 font-display text-label font-semibold tracking-[0.13em] text-mute uppercase"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.table.rows.map((row) => (
                  <tr key={row.join('|')}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`border-b border-ink/10 py-3 pr-5 text-small ${
                          ci === 0 ? 'font-medium text-ink' : 'text-ink-2'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figcaption className="mt-3 max-w-[62ch] text-[0.8125rem] leading-relaxed text-mute">
            <span className="font-display font-semibold text-ink-2">
              {section.table.caption}.
            </span>{' '}
            {section.table.note}
          </figcaption>
        </figure>
      ) : null}

      {section.note ? (
        <p className="mt-7 max-w-[64ch] border border-coral/30 bg-coral-wash px-5 py-4 text-small leading-relaxed text-ink-2">
          <span className="font-display text-label font-semibold tracking-[0.16em] text-coral-deep uppercase">
            Dikkat
          </span>
          <span className="mt-1.5 block">{section.note}</span>
        </p>
      ) : null}
    </section>
  );
}

function formatDate(iso: string): string {
  const AYLAR = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
  ];
  const [y, m, d] = iso.slice(0, 10).split('-');
  return `${Number(d)} ${AYLAR[Number(m) - 1]} ${y}`;
}
