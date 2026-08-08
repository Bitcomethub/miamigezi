'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

// ─────────────────────────────────────────────────────────────────────────
// GA4 + kendi onay kapımız (KVKK/GDPR)
//
// KURAL: onay kapısı GÖRÜNÜRLÜĞÜ değil RENDER'ı kontrol eder. `hidden` ile
// saklanan bir <Script> yine de yüklenir ve çerez yazar. Bu yüzden gtag
// JSX'i yalnızca `consent === 'granted'` iken AĞACA GİRER.
//
// Ölçüm kimliği env'den okunur (NEXT_PUBLIC_GA4_MEASUREMENT_ID). Değişken
// BUILD anında gömülür: Vercel'e eklendikten sonra yeniden deploy edilmezse
// mevcut sürümlerde ölçüm çalışmaz.
// ─────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'mg-consent-v1';
const GA_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

type Consent = 'unknown' | 'granted' | 'denied';

export function Analytics() {
  // Sunucu ve ilk client render'ı 'unknown' — localStorage okuması effect'te,
  // aksi hâlde hydration uyuşmazlığı olur.
  const [consent, setConsent] = useState<Consent>('unknown');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'granted' || stored === 'denied') setConsent(stored);
    } catch {
      // localStorage engelliyse (private mode / 3rd-party kısıtı) onay
      // sorulmamış sayılır; ölçüm yapılmaz, banner her oturumda görünür.
    }
  }, []);

  function decide(value: Exclude<Consent, 'unknown'>) {
    setConsent(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* yazılamıyorsa karar yalnızca bu oturum için geçerli */
    }
  }

  const showBanner = mounted && consent === 'unknown' && Boolean(GA_ID);

  return (
    <>
      {consent === 'granted' && GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {showBanner ? (
        <div
          role="dialog"
          aria-labelledby="consent-title"
          aria-describedby="consent-desc"
          className="fixed inset-x-3 bottom-3 z-50 border border-ink/15 bg-paper-2 px-5 py-4 shadow-[0_10px_40px_-12px_rgb(10_22_51/0.4)] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-sm"
        >
          <h2
            id="consent-title"
            className="font-display text-small font-semibold tracking-tight"
          >
            Ölçümleme çerezleri
          </h2>
          <p id="consent-desc" className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-2">
            Hangi rehberlerin işe yaradığını görmek için Google Analytics kullanmak
            istiyoruz. Reklam çerezi yok. Reddederseniz site aynı şekilde çalışır.
          </p>
          <div className="mt-3.5 flex gap-2">
            <button
              type="button"
              onClick={() => decide('granted')}
              // Sitenin tek gerçek CTA'sı — gün batımı gradyanı burada.
              // Lacivert metin gradyanın her durağında AA: pembe 4.79, turuncu 7.62.
              className="cursor-pointer bg-gradient-to-r from-flamingo to-sunset px-4 py-2 font-display text-[0.8125rem] font-semibold text-ink transition-[filter] duration-200 hover:brightness-[1.06]"
            >
              Kabul et
            </button>
            <button
              type="button"
              onClick={() => decide('denied')}
              className="cursor-pointer px-3 py-2 font-display text-[0.8125rem] font-medium text-ink-2 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink"
            >
              Reddet
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
