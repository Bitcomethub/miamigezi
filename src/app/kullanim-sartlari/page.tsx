import type { Metadata } from 'next';
import { Ledge } from '@/components/Ledge';
import { PUBLISHER, SITE, abs } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Kullanım Şartları',
  description:
    'miamigezi içeriğini kimin yayınladığı, bilgilerin hangi sınırlar içinde sunulduğu ve izinsiz kullanımda ne olduğu: kısa kullanım şartları.',
  alternates: { canonical: '/kullanim-sartlari' },
  openGraph: { url: abs('/kullanim-sartlari'), locale: 'tr_TR' },
};

export default function KullanimSartlariPage() {
  return (
    <section className="mx-auto max-w-[78rem] px-5 pt-12 sm:px-8 sm:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: 'Kullanım Şartları', path: '/kullanim-sartlari' }]),
          ),
        }}
      />

      <header className="rise">
        <p className="font-display text-label font-semibold tracking-[0.22em] text-flamingo-deep uppercase">
          Şartlar
        </p>
        <h1 className="mt-5 max-w-[20ch] font-display text-h1 font-semibold tracking-[-0.032em] text-balance">
          Bu siteyi kullanırken neyi kabul ediyorsunuz?
        </h1>
        <p className="mt-6 max-w-[56ch] text-body text-ink-2">
          Siteyi kullanmak bu şartları kabul etmek anlamına gelir. Şartlar
          sade ve maddeler hâlinde: kim yayınlıyor, bilgi ne kadar bağlayıcı,
          içerik nasıl kullanılabilir.
        </p>
      </header>

      <Ledge className="mt-10" tone="flamingo" />

      <div className="prose-mg mt-12">
        <h2 className="font-display text-h2 font-semibold tracking-[-0.028em]">
          Yayıncı
        </h2>
        <p className="mt-4 text-body text-ink-2">
          {SITE.name}, {PUBLISHER.name} tarafından yayınlanan bağımsız bir
          Türkçe seyahat rehberidir. Sitede mülk satışı, ilan yayını ya da
          yatırım danışmanlığı yapılmaz.
        </p>

        <h2 className="mt-stack font-display text-h2 font-semibold tracking-[-0.028em]">
          Bilginin sınırı
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Fiyat, çalışma saati, sezon ve kural bilgileri hızla değişir. Bu
          sitedeki bilgiler yayın tarihindeki en iyi kanaatimizi yansıtır,
          kesin taahhüt değildir. Vize, gümrük, sağlık ve güvenlik gibi bağlayıcı
          konularda her zaman resmî kaynağı esas alın. Seyahat kararlarınızın
          sonuçlarından yayıncı sorumlu tutulamaz.
        </p>

        <h2 className="mt-stack font-display text-h2 font-semibold tracking-[-0.028em]">
          İçeriğin kullanımı
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Metinlerin ve fotoğrafların hakkı {PUBLISHER.name} ve ilgili
          sahiplerine aittir. Kısa alıntı, kaynak gösterilerek ve bağlantı
          verilerek yapılabilir. İçeriğin bütün olarak kopyalanması, başka bir
          sitede yayınlanması veya eğitim materyaline dönüştürülmesi yazılı izin
          gerektirir.
        </p>

        <h2 className="mt-stack font-display text-h2 font-semibold tracking-[-0.028em]">
          Dış bağlantılar
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Siteden başka sitelere bağlantı verilebilir. Bu sitelerin içeriği ve
          kuralları bizim denetimimizde değildir; onlara ilişkin bir sorumluluk
          üstlenmiyoruz.
        </p>

        <h2 className="mt-stack font-display text-h2 font-semibold tracking-[-0.028em]">
          Değişiklik
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Şartlar gerektiğinde güncellenir; güncel sürüm bu sayfada yayınlanır.
          Yürürlük tarihi: 31 Ekim 2026.
        </p>
      </div>
    </section>
  );
}
