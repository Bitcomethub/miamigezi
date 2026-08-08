import Link from 'next/link';
import type { Metadata } from 'next';
import { ALL_POSTS } from '@/lib/blogData';
import { Ledge } from '@/components/Ledge';
import { abs } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Miami Yazıları',
  description:
    "Miami'ye gidenler için güncel notlar: pratik sorular, kısa cevaplar ve düzenli olarak eklenen yeni yazılar.",
  alternates: { canonical: '/blog' },
  openGraph: { url: abs('/blog'), locale: 'tr_TR' },
};

export default function BlogIndexPage() {
  return (
    <section className="mx-auto max-w-[78rem] px-5 pt-12 sm:px-8 sm:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: 'Yazılar', path: '/blog' }]),
          ),
        }}
      />

      <header className="rise">
        <p className="font-display text-label font-semibold tracking-[0.22em] text-coral-deep uppercase">
          Günlük akış
        </p>
        <h1 className="mt-5 max-w-[18ch] font-display text-h1 font-semibold tracking-[-0.032em] text-balance">
          Miami yazıları
        </h1>
        <p className="mt-5 max-w-[52ch] text-body text-ink-2">
          On temel rehberin dışında kalan, daha dar ve daha güncel sorular.
          Rehberler değişmeyen bilgiyi tutar; burası değişeni takip eder.
        </p>
      </header>

      <Ledge className="mt-12" tone="coral" />

      <ol className="mt-10">
        {ALL_POSTS.map((post, i) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group grid gap-x-10 gap-y-2 border-t border-ink/12 py-7 no-underline sm:grid-cols-[9rem_1fr]"
              style={{ borderTopWidth: i === 0 ? 0 : undefined }}
            >
              <time
                dateTime={post.publishedAt}
                className="tabular font-display text-label tracking-[0.12em] text-mute uppercase sm:pt-1.5"
              >
                {formatDate(post.publishedAt)}
              </time>
              <div className="min-w-0">
                <h2 className="max-w-[34ch] font-display text-h2 font-semibold tracking-[-0.025em] text-ink transition-colors duration-300 group-hover:text-coral-deep">
                  {post.title}
                </h2>
                <p className="mt-2 max-w-[58ch] text-small text-ink-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      {ALL_POSTS.length === 0 ? (
        <p className="mt-10 text-body text-ink-2">
          Henüz yazı yok. İlk yazılar yayınlandığında burada listelenecek.
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
