import type { Metadata } from 'next';
import { Ledge } from '@/components/Ledge';
import { PUBLISHER, SITE, abs } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Gizlilik',
  description:
    'miamigezi hangi veriyi topluyor, hangisini toplamıyor, çerezleri nasıl kullanıyor ve silme talebini nasıl iletiyorsunuz? Kısa ve açık gizlilik beyanı.',
  alternates: { canonical: '/gizlilik' },
  openGraph: { url: abs('/gizlilik'), locale: 'tr_TR' },
};

export default function GizlilikPage() {
  return (
    <section className="mx-auto max-w-[78rem] px-5 pt-12 sm:px-8 sm:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: 'Gizlilik', path: '/gizlilik' }])),
        }}
      />

      <header className="rise">
        <p className="font-display text-label font-semibold tracking-[0.22em] text-flamingo-deep uppercase">
          Gizlilik
        </p>
        <h1 className="mt-5 max-w-[18ch] font-display text-h1 font-semibold tracking-[-0.032em] text-balance">
          Hangi veriyi topluyoruz?
        </h1>
        <p className="mt-6 max-w-[56ch] text-body text-ink-2">
          {SITE.name}, {PUBLISHER.name} tarafından yayınlanır. Bu sayfa
          hangi verinin işlendiğini, hangisinin işlenmediğini ve silme talebini
          nasıl iletebileceğinizi anlatır.
        </p>
      </header>

      <Ledge className="mt-10" tone="flamingo" />

      <div className="prose-mg mt-12">
        <h2 className="font-display text-h2 font-semibold tracking-[-0.028em]">
          Hesap açmanız gerekmiyor
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Sitede üyelik, giriş ya da yorum yazma yok. Bu yüzden adınız,
          e-postanız veya telefonunuz bizde bir hesap altında tutulmuyor.
          Rehberleri okumak için hiçbir bilgi vermeniz gerekmiyor.
        </p>

        <h2 className="mt-stack font-display text-h2 font-semibold tracking-[-0.028em]">
          Ölçümleme yalnız onay verirseniz çalışır
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Hangi rehberin okunduğunu görmek için Google Analytics kullanıyoruz.
          Çerez onayı vermezseniz ölçümleme çalışmaz ve site aynı şekilde
          çalışmaya devam eder. Reklam çerezi, kişiselleştirilmiş reklam ve
          profilleme yok.
        </p>

        <h2 className="mt-stack font-display text-h2 font-semibold tracking-[-0.028em]">
          Sunucu kayıtları
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Sayfaların sunulması sırasında barındırma sağlayıcısı teknik kayıt
          tutar: istek zamanı, sayfa adresi, tarayıcı bilgisi ve IP adresi.
          Bu kayıtlar sitenin çalışması ve kötüye kullanımın önlenmesi için
          tutulur, pazarlama amacıyla kullanılmaz.
        </p>

        <h2 className="mt-stack font-display text-h2 font-semibold tracking-[-0.028em]">
          Bağlantılar ve üçüncü taraflar
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Sitede {PUBLISHER.name} tarafından yayınlanan diğer yayınlara
          bağlantılar bulunur. Bu bağlantılar kaynak gösterme amaçlıdır;
          tıkladığınızda o sitenin kendi gizlilik kuralları geçerli olur. Uçak
          bileti, otel ya da tur satmıyoruz ve komisyonlu bağlantı
          kullanmıyoruz.
        </p>

        <h2 className="mt-stack font-display text-h2 font-semibold tracking-[-0.028em]">
          Silme ve düzeltme talebi
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Hakkınızda işlenen bir veri olduğunu düşünüyorsanız ya da bir bilginin
          yanlış olduğunu fark ettiyseniz, hangi sayfa ve hangi ifade olduğunu
          yazarak bildirin. Talebi aldıktan sonra kaydı inceler, gerekiyorsa
          siler ve sonucu size bildiririz. İletişim için{' '}
          <a href="https://miamili.com" rel="noopener">
            miamili.com
          </a>{' '}
          üzerindeki iletişim kanalını kullanabilirsiniz.
        </p>

        <p className="mt-stack text-body text-ink-2">
          Bu beyan {SITE.name} için geçerlidir. Yürürlük tarihi: 31 Ekim 2026.
        </p>
      </div>
    </section>
  );
}
