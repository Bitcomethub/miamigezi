import type { Metadata } from 'next';
import { Ledge } from '@/components/Ledge';
import { Photo } from '@/components/Photo';
import { pageImage } from '@/content/images';
import { GUIDES } from '@/content/guides';
import { PUBLISHER, SITE, abs, miamiliUrl } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

const HERO = pageImage('hakkinda');

export const metadata: Metadata = {
  title: 'Hakkında',
  description:
    'miamigezi kimin yayını, içerik nasıl hazırlanıyor ve rakamlar nereden geliyor? Sahiplik, yöntem ve sınırların açık beyanı.',
  alternates: { canonical: '/hakkinda' },
  openGraph: {
    url: abs('/hakkinda'),
    locale: 'tr_TR',
    images: HERO ? [{ url: abs(HERO.src), width: HERO.width, height: HERO.height, alt: HERO.alt }] : undefined,
  },
};

export default function HakkindaPage() {
  return (
    <section className="mx-auto max-w-[78rem] px-5 pt-12 sm:px-8 sm:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: 'Hakkında', path: '/hakkinda' }]),
          ),
        }}
      />

      <header className="rise">
        <p className="font-display text-label font-semibold tracking-[0.22em] text-flamingo-deep uppercase">
          Künye
        </p>
        <h1 className="mt-5 max-w-[16ch] font-display text-h1 font-semibold tracking-[-0.032em] text-balance">
          Bu siteyi kim yayınlıyor?
        </h1>
        <p className="mt-6 max-w-[56ch] text-body text-ink-2">
          {SITE.name}, {PUBLISHER.name} tarafından yayınlanan Türkçe bir Miami
          seyahat rehberidir. Bunu sayfanın altına küçük puntoyla değil, ayrı
          bir başlık altında yazıyoruz — çünkü kimin yayınladığını bilmek,
          okuduğunuz bilgiyi değerlendirmenin parçası.
        </p>
      </header>

      <Photo image={HERO} priority className="mt-10" />

      <Ledge className="mt-12" tone="flamingo" />

      <div className="mt-12 grid gap-x-14 gap-y-12 lg:grid-cols-[1fr_1fr]">
        <div className="prose-mg">
          <h2 className="font-display text-h2 font-semibold tracking-[-0.028em]">
            Sahiplik
          </h2>
          <p className="mt-4 text-body text-ink-2">
            {PUBLISHER.name}, Miami merkezli bir gayrimenkul danışmanlığı
            markası olan{' '}
            <a href={miamiliUrl('/', 'hakkinda-sahiplik')}>miamili.com</a>
            &rsquo;un yayıncısıdır. {SITE.name} aynı çatı altında, ama ayrı bir
            iş olarak yürütülüyor: burada mülk satışı, ilan ya da yatırım
            danışmanlığı yapılmıyor.
          </p>
          <p className="mt-4 text-body text-ink-2">
            Bu sitede miamili.com&rsquo;a giden bağlantılar var; hepsi bağlamsal
            ve sayılabilir kadar az. Emlak ya da taşınma konusu bir rehberde
            doğal olarak geçtiğinde, o konuyu asıl işi olan yere yönlendiriyoruz.
            Her sayfaya zorla link koymuyoruz.
          </p>

          <h2 className="mt-stack font-display text-h2 font-semibold tracking-[-0.028em]">
            Ne satmıyoruz
          </h2>
          <p className="mt-4 text-body text-ink-2">
            Uçak bileti, otel rezervasyonu ya da tur satmıyoruz. Bu sayfalarda
            komisyonlu bağlantı (affiliate) bulunmuyor. Dolayısıyla &laquo;en
            uygun seçenek&raquo; derken bizim kazandığımız bir seçenek yok — bu,
            tavsiyeleri okurken hesaba katmanız gereken en önemli bilgi.
          </p>
        </div>

        <div className="prose-mg">
          <h2 className="font-display text-h2 font-semibold tracking-[-0.028em]">
            Rakamlar nereden geliyor?
          </h2>
          <p className="mt-4 text-body text-ink-2">
            Fiyat, saat, sezon ve kural bilgileri hızla eskiyen bilgilerdir. Bu
            yüzden burada üç kural uygulanıyor: uydurma rakam yazılmaz, oynak
            veriler aralık olarak ve &laquo;değişebilir&raquo; notuyla verilir,
            bağlayıcı olan konularda (vize, gümrük, hava durumu, park kuralları)
            resmî kaynağa yönlendirilir.
          </p>
          <p className="mt-4 text-body text-ink-2">
            Her rehberin altında son güncelleme tarihi yazıyor. Bir bilgi
            eskiyse ya da yanlışsa, düzeltmek için haber vermeniz yeterli.
          </p>

          <h2 className="mt-stack font-display text-h2 font-semibold tracking-[-0.028em]">
            İçerik nasıl hazırlanıyor?
          </h2>
          <p className="mt-4 text-body text-ink-2">
            {GUIDES.length} temel rehber elle yazıldı ve elle güncelleniyor.
            Blog bölümündeki günlük yazılar ise yapay zekâ destekli bir üretim
            hattıyla hazırlanıp yayın öncesi otomatik bir kalite kontrolünden
            geçiyor: kaynaksız iddia, marka gerçekleriyle çelişen ifade ya da
            eksik bölüm içeren taslaklar yayınlanmıyor, insan incelemesine
            düşüyor.
          </p>

          <h2 className="mt-stack font-display text-h2 font-semibold tracking-[-0.028em]">
            Ölçümleme
          </h2>
          <p className="mt-4 text-body text-ink-2">
            Hangi rehberlerin işe yaradığını görmek için Google Analytics
            kullanıyoruz ve bunu ancak siz onay verirseniz çalıştırıyoruz.
            Reklam çerezi yok. Onay vermezseniz site tam olarak aynı şekilde
            çalışır.
          </p>
        </div>
      </div>

      <Ledge className="mt-band" />
      <p className="mt-6 max-w-[62ch] text-small text-mute">
        Bu sitedeki hiçbir içerik hukuki, mali, göçmenlik ya da sağlık
        tavsiyesi değildir. Vize, gümrük ve sigorta gibi bağlayıcı konularda
        yetkili resmî kurumun güncel bilgisi esastır.
      </p>
    </section>
  );
}
