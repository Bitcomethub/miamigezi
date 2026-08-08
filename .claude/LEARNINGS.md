# miamigezi — Standing Rules

> Compact, her oturumda okunur. **Sadece STANDING kural** (always/never, sert
> kısıt, tekrar eden tuzak sınıfı) — vaka anlatısı `LEARNINGS_ARCHIVE.md`'ye.
> Sert üst sınır ~12.000 karakter; dolmak üzereyse önce buda, sonra ekle.

## Bağlantı disiplini (SEO — pazarlık dışı)

- İçerik içi miamili linki bütçesi **DOLU**: 10 rehberde 3 link
  (`ilk-kez`, `oteller`, `ulasim`). Yeni link eklemek, uydu siteyi gizli link
  ağı görünümüne sokar. Eklemek gerekiyorsa varolanı taşı.
- MiamiLi'ye giden **her** URL `miamiliUrl()`'den (`src/lib/site.ts`) üretilir.
  Elle yazılan URL'de `utm_source=miamigezi` er ya da geç düşer ve
  attribution — projenin tek başarı ölçütü — sessizce ölür.
- **Günlük üretilen yazılar miamili'den sıfır kez bahseder.** Kapı kuralı #10
  bunu zorlar. Sahiplik footer künyesinde açık; yazı içi marka bahsi PBN deseni.

## Kalite kapısı (scripts/generate-blog-post.mjs)

- Kural eklerken **iki yönlü** vaka yaz: yakalanması gereken mutasyon + geçmesi
  gereken meşru yazım. Yalnızca mutasyon testi yazılırsa kapı sürekli sıkışır,
  hiçbir gerçek makale geçemez ve hat her sabah `needs_review`'a düşer.
- Metin taramaları `JSON.stringify(post)` üzerinde YAPILMAZ — alan alan,
  cümle cümle taranır. Stringify, kaçış karakterleri ve alan adları yüzünden
  yanlış pozitif üretir (miamili'de bu bug yaşandı).
- Türkçe metinde regex kurarken **sonda `\b` kullanma**: `(dolar|usd)\b`,
  "185 dolardır"ı yakalamaz — ek geldiğinde sınır oluşmaz. Bu, "uydurma fiyat
  yasağı" kuralının tamamını sessizce devre dışı bırakmıştı.
- Normalize edilmiş metinle karşılaştırılan sabit listeler (STOPWORDS vb.)
  **normalize edilerek** kurulur. Diacritic'li yazılıp ASCII'ye karşı
  karşılaştırılan liste hiçbir zaman eşleşmez ve sessizce ölü kalır.
- Backlog slug'ları **ASCII** olmak zorunda (URL'e dönüşüyor). `ğ`, `ı`, `ş`
  içeren slug fark edilmeden geçer, sonra rotayı bozar.

## İçerik & doğruluk

- Oynak veri (fiyat, saat, tarih, ücret) **ya aralık ya çerçeveli** yazılır.
  Kesin rakam iddiası hem doğrulanamaz hem birkaç ayda eskir.
- Türkçe diacritics yayına çıkmadan gözle taranır; özellikle `İstanbul`'un
  ASCII'leşmesi. Bu marka ailesinde bir kez toplu düzeltme gerektirdi.
- Uydurma telefon/adres/işletme adı yasak — bu sitede yayınlanan bir telefon
  ya da fiziksel adres YOK, model boşluğu doldurmaya çalışır.

## Mimari

- Tarihler **`new Date()` ile üretilmez**. Vercel sunucusu UTC; build ile
  ziyaretçinin günü kayar. ISO string dilimlenir, footer yılı sabit.
- İçerik veri olarak yazılır (`Guide` / `BlogPost`), sayfa JSX'ine gömülmez.
  Route + JSON-LD + sitemap + footer navigasyonu aynı diziden türüyor; metni
  sayfaya gömen dört yerde tutarsızlık üretir.
- Guide `slug`'ı URL + JSON-LD `@id` + `related` referansı olarak üç yerde
  birden kullanılıyor — yeniden adlandırma serbest değil.
- `src/content/blog/types.ts` ile script'teki `OUTPUT_SCHEMA` **aynı commit'te**
  değişir; yoksa hat geçerli JSON üretir, render patlar.
- Analytics env + onay yoksa **render edilmez** (gizlenmez). `NEXT_PUBLIC_*`
  build anında gömülür: Vercel'e ekleyip yeniden deploy etmeden etkisi yok.
- `create-next-app`'in `.gitignore`'ındaki `.env*` glob'u `.env.example`'ı da
  yutar — `!.env.example` negation'ı olmadan şablon repoya hiç girmez.
