# İçerik hattı — işletim rehberi

Her sabah 06:30 UTC'de (09:30 İstanbul) bir GitHub Action çalışır, konu
kuyruğundan sıradaki başlığı alır, Claude'a yazdırır, **çalıştırılabilir bir
kalite kapısından** geçirir ve geçtiyse repoya commit'ler. Push, Vercel
deploy'unu tetikler; yeni yazı `sitemap.xml`'e otomatik girer.

Bu doküman hattı **işletmek** içindir: nerede ne var, ne zaman kırılır, nasıl
müdahale edilir.

---

## 1. Parçalar

| Dosya | Rolü |
|---|---|
| `content/blog-topic-backlog.json` | Konu kuyruğu (30 konu). Hat buradan sıradaki `pending` konuyu alır, yayınlayınca `status`'ü `published` yapar. |
| `scripts/generate-blog-post.mjs` | Hattın tamamı: konu seçimi → prompt → API → kalite kapısı → yayın. |
| `scripts/fixtures/mock-post.json` | Kapının birim testi fixture'ı. Gerçek yazı DEĞİL. |
| `public/llms.txt` | **Marka gerçekleri SSOT'u.** Prompt, izinli iddiaları buradan okur. |
| `src/content/blog/generated-posts.json` | Hattın append ettiği yayınlanmış yazılar. Elle büyütme. |
| `src/content/blog/types.ts` | `BlogPost` şekli. Script'teki `OUTPUT_SCHEMA` ile senkron kalmak zorunda. |
| `content/rejected-drafts/` | Kapıdan 2 kez dönen taslaklar (inceleme için). |
| `.github/workflows/daily-blog-post.yml` | Cron + manuel tetikleme. |

---

## 2. Günlük akış

```
konu seç (ilk pending)
   ↓
llms.txt'ten marka gerçeklerini oku  →  system prompt
   ↓
Claude (structured output, json_schema)  →  taslak
   ↓
validatePost()  ──✗──►  aynı prompta "şu sorunlar var" geri bildirimi + 1 retry
   ↓ ✓                        ↓ yine ✗
generated-posts.json'a append   content/rejected-drafts/ + backlog'da needs_review
   ↓                            ↓
commit + push → Vercel deploy   job KIRMIZI (e-posta bildirimi)
   ↓
IndexNow ping (Bing/Yandex)
```

Retry **aynı konuyla** yapılır, yeni konuya atlanmaz: konu kuyruğunu sessizce
tüketmek, bir konunun neden geçemediğini görünmez kılar.

---

## 3. Kalite kapısı — neyi neden eliyor

Kapı `validatePost()` içinde. Kuralların çoğu bu projenin **yasaklarının
çalıştırılabilir hâli**; "prompt'ta rica etmek" yeterli değil çünkü prompt
ihlali sessizce geçer, kapı ihlali kırmızıya boyar.

| # | Kural | Neden |
|---|---|---|
| 1 | Şekil: intro 1-3 paragraf, 4-7 bölüm, ≥4 FAQ, ≥4 keyword | Şekil bozuksa kalan kontroller anlamsız — erken döner. |
| 2 | **Answer-first**: ilk cümle soru olamaz, ≥8 kelime, konunun sorusuyla ≥2 kök örtüşmesi | AI arama motorları pasajı bağlamsız alıntılar. "Bu yazıda anlatacağız" alıntılanamaz. |
| 3 | Bölümlerin ≥%60'ı soru başlıklı, her bölüm 110-260 kelime, çapraz referans yasak | Her bölüm tek başına alıntılanabilir olmalı. "Yukarıda bahsettiğimiz" alıntıyı kırar. |
| 4 | FAQ: soru '?' ile biter, cevap 25-120 kelime | FAQPage şeması ve tek nefeslik cevap. |
| 6 | ≥30 Türkçe diacritic, `Istanbul` ASCII yazımı yasak | Diacritics bozulması bu marka ailesinde daha önce toplu düzeltme gerektirdi. |
| 7 | **Para tutarı ya aralık ya da çerçeveli** ("yaklaşık", "değişir"…) | *Uydurma fiyat yasağı.* Kesin fiyat iddiası hem yanlış hem eskiyor. |
| 8 | **Oran/yüzde ya aralık, ya çerçeveli, ya kanonik** | *Uydurma istatistik yasağı.* Kanonik liste: sabit, doğrulanabilir sayılar (acil numara vb.). |
| 9 | **Alan adı allowlist'i + ham URL yasağı** | *Affiliate/rezervasyon yasağı — yapısal.* `booking.com` düz metin olarak bile geçemez. Yalnızca resmî kurumlar (travel.state.gov, nhc.noaa.gov, miamidade.gov…) anılabilir. |
| 10 | **Yazıda "miamili" geçemez (sıfır kez)** | Sahiplik footer künyesinde AÇIKÇA yazıyor. Her yazıya marka bahsi sıkıştırmak, tam olarak kaçınılan gizli-PBN deseni. Bağlamsal link bütçesi elle yazılan rehberlerde harcanıyor. |
| 11 | Telefon / e-posta / sokak adresi yasak | Bu sitede yayınlanan telefon veya adres yok; model uydurmasın. |

### Kapıyı değiştirirken

`--self-test` **iki yönlü** çalışır:

- 14 **mutasyon** fixture'ı bozar ve kapının yakalamasını bekler,
- 5 **yanlış-pozitif probu** meşru yazımları (çerçevelenmiş fiyat, aralıklı
  fiyat, kanonik oran, izinli resmî kaynak, çerçevelenmiş oran) kapıya sokar ve
  **geçmesini** bekler.

İkinci grup şart: yalnızca "yakalandı mı" testi yazarsan kapı zamanla o kadar
sıkışır ki hiçbir gerçek makale geçemez ve hat her sabah `needs_review`'a düşer.
Yeni kural eklerken **her iki tarafa da** vaka ekle.

```bash
npm run blog:test    # API'siz, saniyeler sürer — CI'da ilk adım
```

---

## 4. Komutlar

```bash
npm run blog:test        # kalite kapısı birim testi (API yok)
npm run blog:dry         # fixture taslakla tam akış, dosya YAZMAZ (API yok)
npm run blog:generate    # gerçek üretim — OPENROUTER_API_KEY gerekir
```

Bayraklar doğrudan:

```bash
node scripts/generate-blog-post.mjs --dry-run          # API'yi çağırır, yazmaz
node scripts/generate-blog-post.mjs --date 2026-08-10  # tarihi sabitle
node scripts/generate-blog-post.mjs --mock --dry-run   # API'siz kuru çalışma
```

Manuel tetikleme: **Actions → "Günlük blog yazısı" → Run workflow**.
`dry_run` ve `mock` kutuları workflow_dispatch'te açılabilir.

---

## 5. Bakım

**Konu eklerken** (`content/blog-topic-backlog.json`):

1. `slug` ASCII olmalı — URL'e dönüşüyor (`ğ`, `ı`, `ş` yasak).
2. `slug` hiçbir rehber ya da yayınlanmış yazı slug'ıyla ÇAKIŞMAMALI. Script
   bunu kontrol eder ve çakışırsa konuyu atlar; rehber slug'ları da kontrole
   dahildir çünkü `/ucak-bileti` ile `/blog/ucak-bileti` teknik olarak
   çakışmaz ama **kanibalize eder**.
3. `question`, bir rehberin ana sorusunun yeniden ifadesi olmamalı. 10 rehber
   HUB, buradaki konular SPOKE — hub'ın bir alt sorusunu derinleştirir.
4. `angle` alanına modelin uydurmasını istemediğin şeyi AÇIKÇA yaz
   ("FİYAT VE İŞLETME ADI VERME" gibi). Kapı yakalar ama prompt'ta engellemek
   bir retry turu tasarruf ettirir.

**Marka gerçeği değişirse** (yayıncı adı, iletişim, konumlandırma): ÖNCE
`public/llms.txt` güncellenir. Prompt oradan okuyor; script'e sabit yazma.

**Yeni yazının görseli** (2026-08'den beri her sayfada bir fotoğraf var):

Hat yazıyı üretir ama **görsel indirmez** — Unsplash anahtarı CI'da yok ve
olması da istenmiyor (her sabah üçüncü parti bir API'ye bağımlı bir adım
eklemek, hattın kırılma yüzeyini büyütür). Yeni yazı o gün **görselsiz**
yayınlanır; bu bilinçli ve sayfayı bozmaz (`Photo`, anahtarı olmayan yazıda
sessizce hiçbir şey basmaz).

Görseli sonradan eklemek için:

1. `scripts/fetch-images.mjs` içindeki `TARGETS` listesine satır ekle:
   `{ key: 'blog:<slug>', query: '<İngilizce arama terimi>' }`
2. `npm run images:fetch` — yalnızca eksikleri indirir, var olanlara dokunmaz.
3. Manifestteki `alt` alanını **Türkçe** doldur (script `null` bırakır) ve
   `illustrative`'i karar ver: karede Miami/Florida kanıtı yoksa `true` kalsın.
4. `npm run images:check` yeşile dönmeli — alt metni boş kayıt kırmızı düşürür.

Günlük workflow `images:check` çalıştırıyor: görselsiz yeni yazı **UYARI**
üretir (kırmızı DEĞİL), ama alt metni eksik bir kayıt job'ı kırar.

**`BlogPost` şekli değişirse**: `src/content/blog/types.ts` ve script'teki
`OUTPUT_SCHEMA` **aynı commit'te** değişir, yoksa hat geçerli JSON üretip
render'da patlar.

---

## 6. Arıza giderme

| Belirti | Sebep | Ne yap |
|---|---|---|
| Job kırmızı, log'da "İNSAN İNCELEMESİ GEREKLİ" | Taslak kapıdan 2 kez döndü | `content/rejected-drafts/<tarih>-<slug>.json` içindeki `problems` listesini oku. Konu `needs_review`'da; düzelttikten sonra `status`'ü `pending` yap. |
| Job kırmızı, "OPENROUTER_API_KEY" hatası | Repo secret eklenmemiş | Settings → Secrets and variables → Actions. |
| "uygun konu kalmadı" | Kuyrukta `pending` konu yok | Backlog'a yeni konu ekle (yukarıdaki 4 kural). |
| Kapı meşru bir yazıyı eliyor | Kural fazla dar | Kuralı gevşetmeden ÖNCE `--self-test`'e yanlış-pozitif probu olarak ekle, sonra kuralı düzelt, test yeşile dönsün. |
| Push çakışması | Aynı anda başka commit | Workflow `git pull --rebase` yapıyor; `concurrency` grubu paralel çalışmayı da engelliyor. Tekrar tetikle. |
| IndexNow HTTP 403 | Anahtar dosyası yayında değil | `https://miamigezi.com/<key>.txt` erişilebilir mi kontrol et (`public/` altında commit'li olmalı). |

---

## 7. Bilinçli sınırlar

- **Hat görsel indirmiyor.** Fotoğraf katmanı var ama hattın dışında: görseller
  elle (`npm run images:fetch`) indirilip repo'ya commit'leniyor. Sebep hem
  kırılma yüzeyi hem de alt metni: Türkçe `alt`, karede gerçekten ne olduğunu
  anlatmak zorunda ve bunu bir script uyduramaz.
- **Yazar adı yok.** Yazılar hattın ürünü; künyede bu açıkça yazılı. Uydurma
  bir yazar kimliği yaratmak E-E-A-T değil, sahtelik olur.
- **Günde tek yazı.** Hacim değil, kuyruğun bitene kadar tutarlı ritim hedefi.
  30 konu ≈ bir ay; kuyruk bitmeden yenilenmeli.
