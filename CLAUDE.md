# miamigezi — Türkçe Miami seyahat rehberi

MiamiLi Media'nın uydu yayını. Amaç: Türkçe "miami gezilecek yerler / ucuz uçak
bileti / otel tavsiyesi / hava durumu" sorgularında görünmek ve emlak/yatırım
niyeti taşıyan trafiği **bağlamsal** olarak miamili.com'a aktarmak.

**Bu bir uydu sitedir, gizli bir link ağı DEĞİL.** Sahiplik footer künyesinde
açıkça yazılıdır. Aşağıdaki bağlantı disiplini bu ayrımın tamamıdır — bozan
değişiklik, sitenin varlık sebebini ters çevirir.

## Bağlayıcı Kurallar (önce oku)

1. **Oturum protokolü:** başta `.claude/LEARNINGS.md` oku; sonda oturum
   şu eşiklerden birini geçtiyse `extract-approach` uygula: düzeltmeden önce 2+
   başarısız deneme, semptomdan uzak kök neden, gerçek mimari seçim, ya da
   para/auth/geri alınamaz veriye dokunan değişiklik.
2. **Tüm kullanıcıya dönük metin Türkçe.** Diacritics (ı/İ, ş, ğ, ç, ö, ü)
   yayına çıkmadan gözle taranır — ASCII'leşme (`İstanbul→Istanbul`) bu marka
   ailesinde daha önce toplu düzeltme gerektirdi.
3. **MiamiLi bağlantı disiplini** (SEO-kritik, değiştirilemez):
   - Footer'da **tek satır** künye: "Bir MiamiLi Media yayınıdır" + link.
   - İçerik içi linkler **yalnız bağlamsal**: emlak/yatırım/taşınma konusu
     doğal geçtiğinde miamili.com'un İLGİLİ sayfasına. Şu an **10 rehberde 3
     link** var (`ilk-kez`, `oteller`, `ulasim`). Bu bütçe DOLU sayılır — her
     sayfaya link eklemek yasak.
   - **Tıklanabilir** her miamili linki `miamiliUrl()` üzerinden üretilir
     (`src/lib/site.ts`). Elle URL yazma: `utm_source=miamigezi` sessizce düşer
     ve attribution ölür. **İstisna:** kimlik/köken URL'leri (`<link rel=author>`,
     JSON-LD `url`/`sameAs`) UTM ALMAZ — tıklanmazlar ve UTM'li varyant, arama
     motorlarının iki markayı eşleştirdiği varlık sinyalini böler.
   - **Günlük üretilen blog yazıları miamili'den HİÇ bahsetmez** (kalite kapısı
     kuralı #10, sıfır tolerans). Sahiplik zaten footer'da; her yazıya marka
     bahsi sıkıştırmak tam olarak kaçınılan gizli-PBN deseni.
4. **Görsel disiplini (Unsplash — lisans şartı, pazarlık dışı):**
   - Fotoğraflar **repo'ya commit'lenir**, runtime'da Unsplash API'sine
     bağımlılık YOK (`public/images/*.webp`). Hat: `npm run images:fetch`
     (elle, tek seferlik). Kaynak SSOT'u `src/content/images.json`.
   - Her görselin yanında **fotoğrafçı adı + Unsplash profil linki görünür**
     olmak zorunda (`src/components/Photo.tsx`). Künyeyi kaldırmak API
     şartlarının ihlalidir ve hesabın askıya alınmasıyla sonuçlanabilir.
   - İndirilen her fotoğraf için `links.download_location` ucuna istek atılır
     — script bunu yapar, atlanamaz.
   - `alt` metni **Türkçe** ve karede GERÇEKTEN olan şeyi anlatır. Dayanağı
     Unsplash'in kendi açıklamasıdır (`altSource` alanında saklanır, denetim
     izi). Script `alt`'ı uydurmaz, `null` bırakır; elle doldurulur.
   - **`illustrative` (temsilî):** karede ya da Unsplash açıklamasında
     Miami/Florida kanıtı yoksa `true` ve künyede "temsilî" basılır.
     Varsayılan güvenli taraftadır. Uydurma rakam yasağının görsel karşılığı:
     bu site Abu Dabi'deki bir camiyi sessizce "Miami'de cami" diye sunmaz.
5. **Yasaklar (kalite kapısında çalıştırılabilir hâlde):** uydurma fiyat/
   istatistik yok · bilet satışı/affiliate/rezervasyon linki yok · miamili
   içeriğinin kopyası yok. Oynak veriler (fiyat, saat, tarih) ya aralık ya da
   "değişebilir" çerçevesiyle verilir.
6. **İçerik veri olarak yazılır, JSX olarak değil.** Rehber = bir `Guide`
   nesnesi (`src/content/guides/*.ts`), yazı = bir `BlogPost`. Route, JSON-LD,
   sitemap ve footer navigasyonu AYNI diziden türer. Sayfa dosyasına metin
   gömen, dört yerde birden tutarsızlık üretir.
7. **Her şey statik.** `output` prerender; runtime yok, veritabanı yok, backend
   yok, API route yok. Bir özellik sunucu gerektiriyorsa önce "gerçekten
   gerekiyor mu" sorusu sorulur.
8. **`new Date()` ile tarih üretme.** Vercel sunucusu UTC; build ile
   ziyaretçinin günü kayabiliyor. ISO string dilimlenir (`iso.slice(0,10)`),
   footer yılı sabit (`const year = 2026`).
9. **Analytics yalnızca env + onay varsa RENDER edilir** (gizlenmez —
   yüklenmez). `NEXT_PUBLIC_GA4_MEASUREMENT_ID` boşsa GA hiç yoktur.
10. **GA4 property'si miamili'den AYRI.** Aynı property, iki sitenin trafiğini
   birleştirir ve "uydu gerçekten trafik getiriyor mu" sorusunu ölçülemez kılar
   — projenin bütün amacı bu ölçüm.
11. **Doküman gerçekliği:** mimari değiştiren oturum bu dosyayı AYNI oturumda
    günceller.

## Mimari

| Katman | Ne |
|---|---|
| Framework | Next.js 16 App Router (Turbopack), React 19, TypeScript 5 |
| Stil | Tailwind CSS v4 (`@theme` — tokenlar `src/app/globals.css`'te) |
| Render | Tamamı statik: `generateStaticParams()` + `dynamicParams = false` |
| Hosting | Vercel (proje: `miamigezi`) — repo kökü app kökü, alt dizin YOK |
| İçerik | Repo içi TypeScript/JSON (CMS yok, backend yok) |
| Görsel | `public/images/*.webp` (commit'li) + `next/image`, Unsplash künyeli |
| Ölçümleme | GA4, onay-kapılı (`src/components/Analytics.tsx`) |

### Route haritası

| Route | Kaynak |
|---|---|
| `/` | `src/app/page.tsx` — `GUIDES`'tan türeyen içindekiler |
| `/[slug]` | 10 rehber · `src/content/guides/*.ts` |
| `/blog` + `/blog/[slug]` | `src/lib/blogData.ts` = `seed.ts` + `generated-posts.json` |
| `/hakkinda` | Sahiplik/şeffaflık beyanı — künye linkinin hedefi |
| `/sitemap.xml`, `/robots.txt` | `GUIDES` + `ALL_POSTS`'tan türer |

### İçerik SSOT'ları

- `src/content/guides/index.ts` → `GUIDES` (10 rehber, elle yazılmış).
  `slug` üç yerde birden kullanılır: URL, JSON-LD `@id`, `related` referansları.
  **Yeniden adlandırmak yayında olan bir URL'i kırar.**
- `src/lib/blogData.ts` → `ALL_POSTS`. `seed.ts` (elle) +
  `generated-posts.json` (hat yazar — **elle büyütme**).
- `public/llms.txt` → **marka gerçekleri SSOT'u.** İçerik hattı izinli
  iddiaları buradan okur. Yayıncı/iletişim/konumlandırma değişirse ÖNCE burası.
- `src/lib/site.ts` → `SITE`, `PUBLISHER`, `miamiliUrl()`, `abs()`.
- `src/content/images.json` → **görsel SSOT'u.** `scripts/fetch-images.mjs`'in
  yazma alanı; ELLE BÜYÜTME. Tek istisna `alt` ve `illustrative` alanlarıdır
  (insan kararı, script üzerine yazmaz). Okuma arayüzü: `src/content/images.ts`
  (`guideImage()` / `postImage()` / `pageImage()`). Anahtarı olmayan sayfa
  görselsiz render olur — hattın bu sabah ürettiği yazı bu yüzden patlamaz.

## İçerik hattı (günlük otomatik yazı)

`.github/workflows/daily-blog-post.yml` (06:30 UTC) → `scripts/generate-blog-post.mjs`
→ Claude (structured output) → **kalite kapısı** → commit/push → Vercel deploy
→ IndexNow ping. İşletim rehberi: **`docs/blog-pipeline.md`** (hatta dokunmadan
önce oku).

```bash
npm run blog:test      # kalite kapısı birim testi — API'siz, CI'ın ilk adımı
npm run blog:dry       # fixture taslakla tam akış, dosya yazmaz — API'siz
npm run blog:generate  # gerçek üretim (ANTHROPIC_API_KEY gerekir)
```

Kapı iki yönlü test edilir: 14 mutasyon **yakalanmalı**, 5 meşru yazım
**geçmeli**. Yeni kural eklerken her iki tarafa da vaka ekle — yalnızca
"yakalandı mı" testi yazılırsa kapı zamanla hiçbir yazıyı geçirmez hâle gelir
ve hat her sabah `needs_review`'a düşer.

**BLOKER:** `ANTHROPIC_API_KEY` GitHub repo secret'ı eklenmeden hat çalışmaz
(bilinçli olarak sessizce atlamak yerine kırmızı düşer).

`src/content/blog/types.ts` şekli değişirse script'teki `OUTPUT_SCHEMA` **aynı
commit'te** değişir.

## Tasarım sistemi

Yön: **"Ocean Drive Sunset"** — Deco editoryal iskelet üstünde turizm enerjisi
(güneş + deniz). Beyaz zemin, lacivert mürekkep, Miami pembesi + okyanus
turkuazı, az dozda gün batımı turuncusu/sarısı. **Krem/bej yasak** — ikincil
yüzeyler soğuk. Anti-referans: stok palmiye görseli, kart ızgarası, neon
mor-mavi "Miami Vice" gradyanı.

- Fontlar: display **Archivo** (variable, `wdth`), gövde **Literata**.
  Tokenlar `globals.css`'te `@theme` altında.
- Renk: `--color-paper` (#fff) / `-paper-2` (soğuk #f5f8fc), `--color-ink`
  (#0a1633), `--color-flamingo` (#f5317f, + `-deep`/`-quiet`/`-wash`),
  `--color-lagoon` (#0fb5ba, + `-deep`/`-ink`), `--color-sunset`/`-sun`.
  Kanal ayrımı: pembe = marka/bağlantı, turkuaz = veri/bilgi + focus ring,
  turuncu-sarı = yalnız gradyan ve koyu zemin süsü. Taban pembe/turkuaz küçük
  metinde AA'yı GEÇMEZ (3.73 / 2.52) — küçük punto daima `-deep` varyant.
- Pembe→turuncu gradyan yalnız üç yerde: header şeridi (3px), hero ufuk
  çizgisi, consent CTA'sı. Üstüne metin konacaksa lacivert (her stopta ≥4.5:1).
- İmza öğeler: `fluted` (dikey yiv dokusu), `Ledge` / `Sunburst` (art-deco
  ayraç; `tone`: ink/flamingo/lagoon), `tabular` (rakam hizası), `rise`
  (giriş animasyonu).
- **Fotoğraf katmanı** (2026-08): her sayfada TEK geniş "plaka" — başlıktan
  sonra, içerikten önce. Kart DEĞİL: köşe yuvarlaması/gölge/çerçeve yok,
  sayfanın geri kalanı gibi keskin; mobilde kenardan kenara taşar
  (`-mx-5 sm:mx-0`, tablolardaki desenin aynısı), oran `3/2 → sm:16/7`.
  Liste/ızgara küçük resmi YOK — kart ızgarası anti-referans olmayı sürdürüyor.
  Künye şeridi mobilde tam genişlik bar, `sm:`'den itibaren köşe çipi
  (`bg-ink/80`: en kötü fotoğrafta bile beyaz metinle ≥9:1).
- **Krem/bej yasağı çalıştırılabilir:** `npm run check:renk`
  (`scripts/check-renk.mjs`) src'deki renk literallerini tarar; bilinen krem
  hex'lerini VE listede olmayan yeni sıcak nötrleri (R≈G>B, düşük chroma)
  yakalar, ihlalde exit 1. Bant İKİ eşiklidir (`|R-G|` ve `R-B`): tek eşiğe
  indirgenirse paletin meşru sıcak aksanlarını (`sunset`, `sun`) da yer ve
  kapı kullanılamaz hâle gelir. `--self-test` iki yönlüdür — kural eklerken
  hem yakalanması gereken vakayı hem geçmesi gereken palet rengini ekle.

## Ortam değişkenleri

Tam liste + açıklamalar: `.env.example`.

- `NEXT_PUBLIC_GA4_MEASUREMENT_ID` — tarayıcıya gider, gizli değil. **Build
  anında gömülür**: Vercel'e ekledikten sonra yeniden deploy edilmeden
  ölçümleme başlamaz.
- `ANTHROPIC_API_KEY` — GitHub repo secret (Actions). Tarayıcıya GİTMEZ.
- `BLOG_MODEL` (ops.) — üretim modelini geçici olarak değiştirir.
- `UNSPLASH_ACCESS_KEY` — YALNIZCA yerel, tek seferlik görsel indirme
  (`npm run images:fetch`). Ne tarayıcıya ne CI'a gider: fotoğraflar repo'da
  hazır, canlıda API çağrısı yok. Demo uygulama kotası **50 istek/saat**,
  hedef başına 2 istek — script devam edebilir (resumable).

## Geliştirme

```bash
npm run dev        # localhost:3000
npm run build      # tüm sayfalar statik üretilmeli (sayı blog arttıkça büyür)
npm run lint
npm run check:renk # krem/bej koruma kapısı — src'de sıcak nötr var mı
npm run images:check  # görsel hedef/içerik eşleşmesi + eksik alt metni (API'siz)
npm run images:fetch  # Unsplash'ten eksik görselleri indir (UNSPLASH_ACCESS_KEY)
```

Deploy: `main` push → Vercel otomatik.
