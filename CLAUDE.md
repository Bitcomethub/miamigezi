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
4. **Yasaklar (kalite kapısında çalıştırılabilir hâlde):** uydurma fiyat/
   istatistik yok · bilet satışı/affiliate/rezervasyon linki yok · miamili
   içeriğinin kopyası yok. Oynak veriler (fiyat, saat, tarih) ya aralık ya da
   "değişebilir" çerçevesiyle verilir.
5. **İçerik veri olarak yazılır, JSX olarak değil.** Rehber = bir `Guide`
   nesnesi (`src/content/guides/*.ts`), yazı = bir `BlogPost`. Route, JSON-LD,
   sitemap ve footer navigasyonu AYNI diziden türer. Sayfa dosyasına metin
   gömen, dört yerde birden tutarsızlık üretir.
6. **Her şey statik.** `output` prerender; runtime yok, veritabanı yok, backend
   yok, API route yok. Bir özellik sunucu gerektiriyorsa önce "gerçekten
   gerekiyor mu" sorusu sorulur.
7. **`new Date()` ile tarih üretme.** Vercel sunucusu UTC; build ile
   ziyaretçinin günü kayabiliyor. ISO string dilimlenir (`iso.slice(0,10)`),
   footer yılı sabit (`const year = 2026`).
8. **Analytics yalnızca env + onay varsa RENDER edilir** (gizlenmez —
   yüklenmez). `NEXT_PUBLIC_GA4_MEASUREMENT_ID` boşsa GA hiç yoktur.
9. **GA4 property'si miamili'den AYRI.** Aynı property, iki sitenin trafiğini
   birleştirir ve "uydu gerçekten trafik getiriyor mu" sorusunu ölçülemez kılar
   — projenin bütün amacı bu ölçüm.
10. **Doküman gerçekliği:** mimari değiştiren oturum bu dosyayı AYNI oturumda
    günceller.

## Mimari

| Katman | Ne |
|---|---|
| Framework | Next.js 16 App Router (Turbopack), React 19, TypeScript 5 |
| Stil | Tailwind CSS v4 (`@theme` — tokenlar `src/app/globals.css`'te) |
| Render | Tamamı statik: `generateStaticParams()` + `dynamicParams = false` |
| Hosting | Vercel (proje: `miamigezi`) — repo kökü app kökü, alt dizin YOK |
| İçerik | Repo içi TypeScript/JSON (CMS yok, backend yok) |
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
- Görsel yok — bilinçli. Stok fotoğraf özgünlük katmıyor, LCP'yi bozuyor.

## Ortam değişkenleri

Tam liste + açıklamalar: `.env.example`.

- `NEXT_PUBLIC_GA4_MEASUREMENT_ID` — tarayıcıya gider, gizli değil. **Build
  anında gömülür**: Vercel'e ekledikten sonra yeniden deploy edilmeden
  ölçümleme başlamaz.
- `ANTHROPIC_API_KEY` — GitHub repo secret (Actions). Tarayıcıya GİTMEZ.
- `BLOG_MODEL` (ops.) — üretim modelini geçici olarak değiştirir.

## Geliştirme

```bash
npm run dev     # localhost:3000
npm run build   # 21 statik sayfa üretmeli
npm run lint
```

Deploy: `main` push → Vercel otomatik.
