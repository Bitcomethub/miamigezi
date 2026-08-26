import Image from 'next/image';
import type { SiteImage } from '@/content/images';

// ─────────────────────────────────────────────────────────────────────────
// Photo — sayfa başı fotoğraf bandı ("plaka")
//
// TASARIM: kart DEĞİL. Anti-referans listesinde kart ızgarası var; bu yüzden
// köşe yuvarlaması, gölge ve çerçeve yok — sayfanın geri kalanı gibi keskin.
// Mobilde kenardan kenara taşar (-mx-5), sm'den itibaren kap genişliğine
// oturur; tablolardaki `-mx-5 sm:mx-0` deseninin aynısı.
//
// UNSPLASH ŞARTI (atlanamaz): fotoğrafçı adı + Unsplash profil linki GÖRÜNÜR
// olmak zorunda. Bu yüzden künye şeridi opsiyonel değildir ve görsel
// varken her zaman basılır. Linkler utm_source taşır (script üretiyor).
//
// KONTRAST: künye şeridi fotoğrafın üstünde duruyor ve fotoğraf ne olacağı
// önceden bilinemiyor. bg-ink/80 bu belirsizliği kapatır: en kötü durumda
// (bembeyaz kare) efektif zemin #3b445c olur, beyaz metinle 9.5:1 — 12px
// puntoda bile AA fazlasıyla geçer.
// ─────────────────────────────────────────────────────────────────────────

export function Photo({
  image,
  priority = false,
  className = '',
}: {
  image: SiteImage | undefined;
  /** Hero konumundaki görsel için true — LCP'yi preload ile öne çeker. */
  priority?: boolean;
  className?: string;
}) {
  // Görseli olmayan sayfa (ör. hattın bu sabah ürettiği yeni yazı) sessizce
  // görselsiz render olur. Yer tutucu basmıyoruz: boş kutu, yokluktan kötü.
  if (!image) return null;

  return (
    <figure className={`relative -mx-5 sm:mx-0 ${className}`}>
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-paper-2 sm:aspect-[16/7]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          // Kap: max-w-78rem (1248px) eksi sm:px-8 → 1184px. Altında viewport.
          sizes="(min-width: 80rem) 1184px, 100vw"
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          priority={priority}
          className="object-cover"
        />
      </div>

      {/* figcaption, figure'ın DOĞRUDAN son çocuğu (HTML spec). Görselin
          üstüne bindirmek için konum CSS'ten geliyor, DOM'dan değil.
          Mobilde tam genişlik şerit: en uzun fotoğrafçı adı 393px'te köşe
          çipine sığmıyordu; inset-x-0 taşma ihtimalini tamamen kaldırır. */}
      <figcaption className="absolute inset-x-0 bottom-0 bg-ink/80 px-4 py-2 font-display text-label leading-snug text-paper/85 backdrop-blur-[2px] sm:inset-x-auto sm:right-0">
        {image.illustrative ? (
          <>
            <span
              className="tracking-[0.14em] text-sun uppercase"
              title="Bu kare Miami'de çekilmiş olduğu doğrulanamadı; konuyu anlatmak için kullanılıyor."
            >
              Temsilî
            </span>
            <span aria-hidden="true" className="px-1.5 text-paper/40">
              ·
            </span>
          </>
        ) : null}
        Fotoğraf:{' '}
        <a
          href={image.photographerUrl}
          rel="nofollow noopener"
          className="text-paper underline decoration-paper/40 underline-offset-2 transition-colors hover:decoration-paper"
        >
          {image.photographer}
        </a>
        <span aria-hidden="true" className="px-1.5 text-paper/40">
          ·
        </span>
        <a
          href={image.unsplashUrl}
          rel="nofollow noopener"
          className="text-paper underline decoration-paper/40 underline-offset-2 transition-colors hover:decoration-paper"
        >
          Unsplash
        </a>
      </figcaption>
    </figure>
  );
}
