import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ALL_POSTS, getPost } from '@/lib/blogData';
import { Ledge } from '@/components/Ledge';
import { abs } from '@/lib/site';
import { blogPostingSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: abs(`/blog/${post.slug}`),
      locale: 'tr_TR',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const schema = [
    blogPostingSchema(post),
    faqSchema(post.faqs),
    breadcrumbSchema([
      { name: 'Yazılar', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];

  return (
    <article className="mx-auto max-w-[78rem] px-5 pt-12 sm:px-8 sm:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="rise">
        <p className="flex items-center gap-3 font-display text-label font-semibold tracking-[0.2em] text-mute uppercase">
          <Link
            href="/blog"
            className="text-mute no-underline transition-colors hover:text-coral-deep"
          >
            Yazılar
          </Link>
          <span aria-hidden="true" className="text-coral/60">
            /
          </span>
          <time dateTime={post.publishedAt} className="tabular text-coral">
            {formatDate(post.publishedAt)}
          </time>
        </p>

        <h1 className="mt-5 max-w-[20ch] font-display text-h1 font-semibold tracking-[-0.032em] text-balance">
          {post.title}
        </h1>

        <p className="mt-6 max-w-[54ch] font-display text-h3 text-ink-2">
          {post.question}
        </p>
      </header>

      <Ledge className="mt-10" tone="coral" />

      <div className="prose-mg mt-10">
        {post.intro.map((para, i) => (
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

      {post.sections.map((section, i) => (
        <section key={section.heading} className="mt-stack">
          <h2 className="max-w-[26ch] font-display text-h2 font-semibold tracking-[-0.028em] text-balance">
            <span
              aria-hidden="true"
              className="tabular mr-3.5 align-[0.18em] text-h3 font-medium text-coral/55"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            {section.heading}
          </h2>
          <div className="prose-mg mt-5">
            {section.body.map((para, pi) => (
              <p key={pi} className="text-body leading-relaxed text-ink-2">
                {para}
              </p>
            ))}
          </div>

          {section.list?.length ? (
            <ul className="mt-5 max-w-[68ch] space-y-2.5">
              {section.list.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[0.85rem_1fr] gap-x-3 text-small leading-relaxed text-ink-2"
                >
                  <span aria-hidden="true" className="pt-2 text-coral">
                    <svg viewBox="0 0 8 8" className="h-[0.4rem] w-[0.4rem]">
                      <rect width="8" height="8" fill="currentColor" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      <section className="mt-band" aria-labelledby="sss">
        <h2
          id="sss"
          className="font-display text-label font-semibold tracking-[0.2em] text-mute uppercase"
        >
          Sık sorulanlar
        </h2>
        <Ledge className="mt-3" />
        <dl className="mt-8 max-w-[72ch]">
          {post.faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="border-t border-ink/12 py-6 first:border-t-0 first:pt-0"
            >
              <dt className="font-display text-h3 font-semibold tracking-[-0.015em] text-ink">
                <span aria-hidden="true" className="tabular mr-3 text-coral/60">
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

      <p className="mt-stack text-small text-mute">
        Son güncelleme:{' '}
        <time dateTime={post.updatedAt} className="tabular">
          {formatDate(post.updatedAt)}
        </time>
        {post.generated ? ' · Bu yazı MiamiLi Media içerik hattı tarafından hazırlanıp yayın öncesi kalite kontrolünden geçirildi.' : null}
      </p>

      <p className="mt-8">
        <Link
          href="/blog"
          className="font-display text-small text-coral-deep underline decoration-coral/40 underline-offset-4 transition-colors hover:decoration-coral"
        >
          ← Tüm yazılar
        </Link>
      </p>
    </article>
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
