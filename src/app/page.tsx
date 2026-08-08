import Link from 'next/link';
import type { Metadata } from 'next';
import { GUIDES } from '@/content/guides';
import { getRecentPosts } from '@/lib/blogData';
import { Ledge, Sunburst } from '@/components/Ledge';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: "Miami Seyahat Rehberi — Uçak Bileti, Gezilecek Yerler, Oteller",
  description: SITE.description,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const posts = getRecentPosts(4);

  return (
    <>
      {/* ── Açılış ────────────────────────────────────────────────────────
          Fotoğraf yok — lisanslı görsel yok ve uydurma stok üretmiyoruz.
          Hiyerarşi tamamen tipografiden ve yatay silmelerden geliyor. */}
      <section className="rise mx-auto max-w-[78rem] px-5 pt-14 pb-band sm:px-8 sm:pt-20">
        <p className="flex items-center gap-2.5 font-display text-label font-semibold tracking-[0.22em] text-flamingo-deep uppercase">
          <Sunburst className="h-3 w-5" />
          Türkçe Miami rehberi
        </p>

        <h1 className="mt-6 max-w-[16ch] font-display text-hero font-semibold tracking-[-0.035em] text-balance">
          Miami’yi gitmeden önce anlayın.
        </h1>

        <div className="mt-10 grid gap-x-14 gap-y-6 md:grid-cols-[1.15fr_1fr]">
          <p className="max-w-[46ch] text-body text-ink-2">
            Uçak biletinden otel semtine, plaj bayraklarından bahşiş oranına
            kadar Miami’de işinize yarayacak her şey — pazarlama diliyle değil,
            gerçekten karar vermenizi sağlayacak ayrıntıyla.
          </p>
          <p className="max-w-[42ch] self-end text-small text-mute">
            On temel rehber, sürekli güncellenen bir günlük yazı akışı ve
            oynak bilgilerde açık bir “değişebilir” çerçevesi. Bilet
            satmıyoruz, komisyon almıyoruz.
          </p>
        </div>

        {/* Gün batımı ufku — hero'nun imza gradyanı (pembe→turuncu).
            Metin DEĞİL, zemin şeridi: gradient-text yasağına girmez. */}
        <div
          aria-hidden="true"
          className="mt-12 h-2.5 bg-gradient-to-r from-flamingo to-sunset sm:mt-14"
        />
      </section>

      {/* ── Numaralı içindekiler ──────────────────────────────────────────
          Kart ızgarası DEĞİL: editoryal bir künye listesi. Numaralar
          içeriğin sırasını taşır, dekorasyon değildir. */}
      <section className="mx-auto max-w-[78rem] px-5 sm:px-8" aria-labelledby="rehberler">
        <div className="flex items-baseline justify-between gap-6">
          <h2
            id="rehberler"
            className="font-display text-label font-semibold tracking-[0.2em] text-mute uppercase"
          >
            Rehberler
          </h2>
          <span className="tabular font-display text-label text-mute">
            {GUIDES.length} bölüm
          </span>
        </div>
        <Ledge className="mt-3" />

        <ol className="mt-10">
          {GUIDES.map((guide, i) => (
            <li key={guide.slug}>
              <Link
                href={`/${guide.slug}`}
                className="group grid grid-cols-[2.75rem_1fr] items-baseline gap-x-4 gap-y-2 border-t border-ink/12 py-6 no-underline sm:grid-cols-[3.5rem_minmax(0,20rem)_1fr] sm:gap-x-8 sm:py-7"
                style={{ borderTopWidth: i === 0 ? 0 : undefined }}
              >
                <span
                  aria-hidden="true"
                  className="tabular font-display text-h3 font-semibold text-flamingo-quiet transition-colors duration-300 group-hover:text-flamingo-deep"
                >
                  {guide.number}
                </span>

                <h3 className="font-display text-h2 font-semibold tracking-[-0.025em] text-ink transition-colors duration-300 group-hover:text-flamingo-deep">
                  {guide.navLabel}
                </h3>

                <p className="col-start-2 max-w-[52ch] text-small text-ink-2 sm:col-start-3 sm:max-w-none">
                  {guide.question}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Koyu bant: yöntem beyanı ──────────────────────────────────── */}
      <section className="fluted mt-band bg-lagoon-ink text-paper">
        <div className="mx-auto grid max-w-[78rem] gap-x-14 gap-y-8 px-5 py-band sm:px-8 md:grid-cols-[1fr_1.3fr]">
          <h2 className="max-w-[14ch] font-display text-h1 font-semibold tracking-[-0.03em] text-balance">
            Rakam varsa kaynağı vardır.
          </h2>
          <div className="prose-mg text-small text-paper/72">
            <p>
              Miami’de fiyatlar, saatler ve sezonlar hızlı değişiyor. Bu yüzden
              burada uydurma rakam yok: fiyat aralıkları eğilim olarak veriliyor,
              her tabloda ne kadar oynak olduğunu söyleyen bir not bulunuyor ve
              resmî kaynağa yönlendirme yapılıyor.
            </p>
            <p>
              Bilet, otel veya tur satmıyoruz. Bu sitenin bir şeyi size satmak
              gibi bir işi olmadığı için, en uygun seçeneğin “bizim
              üzerimizden” olması diye bir zorunluluk da yok.
            </p>
          </div>
        </div>
      </section>

      {/* ── Blog akışı ────────────────────────────────────────────────── */}
      {posts.length > 0 ? (
        <section
          className="mx-auto max-w-[78rem] px-5 pt-band sm:px-8"
          aria-labelledby="gunluk"
        >
          <div className="flex items-baseline justify-between gap-6">
            <h2
              id="gunluk"
              className="font-display text-label font-semibold tracking-[0.2em] text-mute uppercase"
            >
              Günlük yazılar
            </h2>
            <Link
              href="/blog"
              className="font-display text-label text-flamingo-deep underline decoration-flamingo/40 underline-offset-4 transition-colors hover:decoration-flamingo"
            >
              Tümü
            </Link>
          </div>
          <Ledge className="mt-3" tone="flamingo" />

          <ul className="mt-9 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {posts.map((post) => (
              <li key={post.slug} className="min-w-0">
                <Link href={`/blog/${post.slug}`} className="group no-underline">
                  <time
                    dateTime={post.publishedAt}
                    className="tabular font-display text-label tracking-[0.12em] text-mute uppercase"
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                  <h3 className="mt-2 font-display text-h3 font-semibold tracking-[-0.015em] text-ink transition-colors duration-300 group-hover:text-flamingo-deep">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 max-w-[46ch] text-small text-ink-2">
                    {post.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}

/** Sunucuda çalışır; ISO string'i parçalayarak biçimlendirir — saat dilimi
 *  okumaz. `new Date()` ile bugünü okumak Vercel'de UTC döner (bilinen tuzak). */
function formatDate(iso: string): string {
  const AYLAR = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
  ];
  const [y, m, d] = iso.slice(0, 10).split('-');
  return `${Number(d)} ${AYLAR[Number(m) - 1]} ${y}`;
}
