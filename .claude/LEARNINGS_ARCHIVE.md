# miamigezi — Learnings Archive

> Tam vaka anlatıları. Oturum başında **okunmaz**; yalnızca burada anlatılan bir
> semptomla uğraşırken açılır. Standing kurallar `LEARNINGS.md`'de.

---

## 2026-08-26 — 393px iframe harness'i, gerçek viewport'ta görünen yatay kırpmayı ÜRETMİYOR
- **Problem:** Fotoğraf katmanı eklendikten sonra 393px ekran görüntüsünde blog
  başlık altı `question` paragrafı kelime ortasından kesiliyordu ("...yer **bul**mak").
  Bu projenin standart sondası — public/'a konan iframe harness'i — aynı sayfa için
  `scrollWidth == clientWidth`, taşma **0** diyordu. İki ölçüm birbirini yalanlıyordu.
- **Eliminated:** "yeni Photo bileşeni taşırıyor" → elendi, tüm elemanları tarayan
  sonda Photo içinde 0 taşan eleman buldu · "webfont swap yarışı, screenshot fallback
  fontla çekiliyor" → elendi, `--virtual-time-budget=90000` +
  `--run-all-compositor-stages-before-draw` ile birebir aynı kırpma · "elemanın
  kutusu taşıyor" → elendi, `getBoundingClientRect().right` viewport içindeydi;
  taşan şey kutunun İÇİNDEKİ satır kutusuydu, rect bunu göstermez.
- **Chosen:** İddia, ölçümün alındığı KATMANDA doğrulandı: aynı sayfa gerçek
  393px top-level viewport'ta (`chrome --headless --window-size=393,X --screenshot`)
  çekildi ve 460px/560px ile karşılaştırıldı. 460px'te aynı satır tamamen sığıyor,
  393px'te kesiliyor → taşma gerçek. Ardından `main` build'i ayrı portta ayağa
  kaldırılıp aynı kare çekildi: **birebir aynı kırpma** → bu PR'ın regresyonu değil.
- **Evidence:** iframe sondası: `maks yatay taşma=0, künye>görsel=0` (22 sayfa,
  iki genişlik). Pozitif kontrol koşusu (bilerek enjekte edilen taşma) `1607px`
  yakaladı — yani sonda ölü değildi, sadece BU taşma sınıfına kör. Gerçek viewport
  393/460/560 şerit karşılaştırması + main vs branch crop'ları kırpmayı gösterdi.
- **Rule:** iframe harness'i **eleman kutusu** taşmasını ölçer, satır kutusunu değil.
  Metin kırpması iddiası için ya `scrollWidth > clientWidth` taraması yapılır ya da
  ölçüm gerçek top-level viewport'ta tekrarlanır. Bir sondanın pozitif kontrolü
  geçmesi, o sondanın HER taşma sınıfını gördüğü anlamına GELMEZ. "Bu benim
  regresyonum mu" sorusu her zaman aynı kareyi `main`'de çekerek yanıtlanır.

## 2026-08-26 — Görsel metadata'sını içerik tipine gömmek, günlük hattı sessizce kırar
- **Problem:** 22 sayfaya fotoğraf ekleniyor. Görsel bilgisi (src, boyut, alt,
  fotoğrafçı, blur) nereye yazılacak? Doğal yer `Guide` ve `BlogPost` tipleri —
  proje zaten "içerik veri olarak yazılır" kuralını işletiyor.
- **Eliminated:** `BlogPost`/`Guide` tipine `image` alanı eklemek → **çalışırdı**,
  ama blog yazıları her sabah `scripts/generate-blog-post.mjs` tarafından üretiliyor.
  Alan zorunlu olsaydı `OUTPUT_SCHEMA` da değişmek zorunda kalırdı ve model,
  indirmediği bir fotoğrafın metadata'sını UYDURURDU. Opsiyonel yapmak da çözmüyor:
  tip opsiyonel olsa bile hattın ürettiği her yazı görselsiz kalır ve bunu kimse
  fark etmez · Görselleri hattın kendisine indirtmek → her sabah üçüncü parti bir
  API'ye bağımlı bir adım demek; kota/kesinti hattı kırar, üstelik Türkçe `alt`
  metnini yine bir model uydurmuş olurdu.
- **Chosen:** Slug ile eşleşen AYRI manifest (`src/content/images.json` +
  `src/content/images.ts` okuma arayüzü). `getImage()` anahtar yoksa `undefined`
  döner, `Photo` bileşeni hiçbir şey basmaz. Hattın bugün ürettiği yazı görselsiz
  ama sorunsuz yayınlanır; görsel sonradan elle eklenir.
- **Evidence:** `npm run build` 27 statik sayfa ✓, `blog:test` 14/5 ✓ (hat şeması
  hiç değişmedi). `images:check` yeni yazıyı "UYARI eksik hedef" olarak raporluyor,
  job'ı kırmıyor; buna karşılık boş `alt` bilerek yazıldığında exit 1.
- **Rule:** Otomatik bir hattın YAZDIĞI veri şekline, hattın üretemeyeceği hiçbir
  alan eklenmez. İnsan kararı gerektiren metadata (burada Türkçe `alt` ve "bu kare
  gerçekten Miami mi") slug ile eşleşen ayrı bir manifeste konur ve okuma tarafı
  eksikliğe **sessiz düşüşle** dayanacak şekilde yazılır.

## 2026-08-22 — Krem/bej kapısı: "sıcak" tek eşikle ölçülürse paletin kendi aksanlarını yer
- **Problem:** "Krem/bej yasak" kuralı CLAUDE.md'de yazılıydı ama çalıştırılabilir
  değildi; denetim gözle yapılıyordu. Kapı yazılırken asıl zorluk şu: krem/bej ile
  paletin meşru `sunset` (#ff8a3d) / `sun` (#ffc53d) aksanları İKİSİ DE sıcaktır
  (R>B). Naif bir "sıcak = yasak" testi paleti de yakalar.
- **Eliminated:** (a) Yalnız yasak-hex listesi → listede olmayan yeni bir krem
  (#efe6d9) sessizce geçer; kapı ilk yeni tonda işlevsizleşir. (b) Tek eşikli bant
  (R>B) → `sun`/`sunset` her koşuda ihlal verir, kapı bir hafta içinde devre dışı
  bırakılır. (c) Açıklık/lightness eşiği ile ayırmak → #C9B89E (bej, L~%73) ile
  #ffc53d (sun) açıklıkta çakışıyor, ayrım vermiyor. (d) Named CSS renk taraması
  (`tan`, `linen`) eklemek → Türkçe içerikte `tan` bir kelime; yanlış pozitif üretir.
- **Chosen:** İki eşikli bant — `|R-G| ≤ 30` (nötr: kanallar birbirine yakın) VE
  `R-B ≤ 90` (düşük chroma). Ayrım hue değil CHROMA: #C9B89E R-B=43 (bej) ·
  #ffc53d R-B=194 (doygun aksan). Katı `G > B` karşılaştırması saf griyi ve beyazı
  bedavaya eler (#ffffff'te 255>255 yanlış). Yasak-hex listesi 2. katman olarak
  KALDI — bandın zaten yakaladığı 6 tonu adıyla raporlasın diye (hata mesajı netliği).
- **Evidence:** `--self-test` iki yönlü: 14 krem/bej yakalandı, paletin 14 gerçek
  rengi + anchor'lar (`#icerik`, `#article`) dahil 19 vaka geçti. Canlı ağaçta
  kanıt: globals.css'e #F2EDE7 + layout.tsx'e (listede OLMAYAN) #efe6d9 enjekte
  edildi → `npm run check:renk` exit 1, iki katman da ateşledi; geri alındıktan
  sonra exit 0, `git diff -- src` boş. Render tarafı: 6 rotada headless Chrome ile
  computed style — tüm efektif yüzeyler #ffffff/#0a1633/#0c3d49/#f5f8fc/#fdecf3,
  0 bant ihlali; pozitif kontrol olarak enjekte edilen #F2EDE7 ve
  rgba(201,184,158,.85)→#d1c3ad yakalandı (sondanın ölü olmadığı kanıtı).
- **Rule:** Bir renk ailesini yasaklayan kapı hue ile değil CHROMA ile kurulur ve
  iki eşik ister; tek eşiğe indirgeyen "sadeleştirme" paletin meşru aksanlarını
  yakalar ve kapıyı kullanılamaz hâle getirir.

## 2026-08-09 — Spec'ten gelen marka renkleri küçük metinde AA'yı geçmiyor (Ocean Drive Sunset geçişi)
- **Problem:** Yeni palet spec'i hex olarak verildi (#F5317F pembe, #0FB5BA turkuaz)
  ama beyaz zeminde 3.73:1 / 2.52:1 — küçük metin AA (4.5:1) ve focus ring (3:1)
  gereksinimlerini taban renkler sağlamıyor.
- **Eliminated:** (a) Taban rengi koyulaştırmak → marka canlılığı ("Miami pembesi")
  ölür, spec ihlali. (b) Eski token adlarını (`coral`) tutup değerleri değiştirmek →
  ad-değer yalanı; CLAUDE.md/dokümantasyon tokene adıyla atıf yapıyor, gelecek oturum
  yanılır. (c) Focus ring'te çift ton (outline + beyaz shadow) → fazladan karmaşıklık,
  tek renkle çözülebiliyorken.
- **Chosen:** Kontrast-katmanlı aile deseni (eski coral mimarisi korunarak):
  taban = yalnız büyük metin/dekor, `-quiet` (5.33) süs rakamı, `-deep` (6.21) küçük
  metin/link; focus ring için `lagoon-deep` #0A7379 — beyazda 5.61, lacivertte 3.18,
  tek renkle iki zeminde ≥3:1. Adlar dürüstçe yenilendi (`flamingo`), sed + grep-sıfır
  doğrulamasıyla.
- **Evidence:** scratchpad/contrast.mjs tüm çiftleri ölçtü; Lighthouse a11y 100 (4 sayfa),
  393px iframe harness 16/16 sayfada sıfır taşma; footer'da miras alınan `/45`, `/40`
  opaklıkları da AA altında çıktı (4.45 / 3.77) → `/56`, `/52` yapıldı.
- **Rule:** Spec hex'i = marka katmanı; metin katmanı ondan türetilir, o değildir.
  Palet değişiminde her aksan için (taban / quiet / deep) üçlüsünü kontrast script'iyle
  türet, focus ring'i açık VE koyu zeminde ayrı ayrı ölç.

## 2026-08-08 — Mobilde nav'ın ilk üç bağlantısı yok: `justify-end` + `overflow-x` tuzağı

- **Problem:** Lighthouse `/ucak-bileti` mobilde `target-size` düşürdü ve çakışan
  öğe olarak logoyu gösterdi. Tuhaflık: çakıştığı söylenen nav bağlantıları
  geometrik olarak logonun ÜSTÜNDEydi — oysa nav, logonun sağındaki ayrı bir
  flex öğesi. Gerçek arıza dokunma hedefi değildi: 393px'te bağlantılar -262px'e
  kadar uzanıyordu, yani "Gezilecek Yerler", "Plajlar" ve "Nerede Kalınır"
  kırpılmış ve **erişilemez** hâldeydi. Sekiz bağlantının üçü telefonda yoktu.
- **Elenen:** *Dokunma hedeflerini daha da büyütmek* → semptomu adresliyor,
  bağlantılar yine ekran dışında kalırdı. *Mobilde hamburger menüye geçmek* →
  çalışırdı ama state + focus tuzağı + Escape getirir; başlangıçtaki "ray"
  kararının gerekçesi hâlâ geçerliydi, kusur karardaydı değil uygulamadaydı.
  *`overflow-x: scroll`'a çevirmek* → hiçbir şeyi değiştirmez: sorun kaydırma
  görünürlüğü değil, tarayıcının taşmayı HİÇ raporlamaması.
- **Seçilen:** hizalamayı auto margin'e devretmek (`ml-auto w-max`,
  `justify-end` YOK). `justify-content: flex-end` + taşma birleşiminde fazlalık
  BAŞLANGIÇ tarafından çıkar ve spec gereği o alan kaydırılamaz — `scrollWidth`
  taşmayı saymaz bile. Auto margin ise boş alan kalmadığında 0'a düşer: hizalama
  sessizce devre dışı kalır, taşma sağa (kaydırılabilir yöne) gider. Masaüstünde
  sağa dayalı görünüm birebir korunur.
- **Kanıt:** 393px'te puppeteer probu — önce `scrollWidth === clientWidth === 193`,
  `scrollLeft` aralığı `0→0` (ray kaydırılamıyor), bağlantılar `-262…373`.
  Sonra `scrollWidth 635 > clientWidth 193`, `scrollLeft 0→442`, sekiz bağlantı
  da pozitif koordinatta, logoyla çakışma yok. Lighthouse a11y 96 → 100.
- **Kural:** Yatay kaydırılan bir rayı ASLA `justify-content: flex-end` ile
  hizalama — auto margin kullan. Ve kırpılmış öğeler ekran görüntüsünde
  görünmez: bir rayın gerçekten kaydırılabildiği ancak `scrollWidth`/`clientWidth`
  ve öğe koordinatları ÖLÇÜLEREK doğrulanır.

---

## 2026-08-08 — "Sıfır tutarsızlık" diyen ölçüm, kodlama katmanını atlıyordu

- **Problem:** Ekran görüntülerinde kesme işaretinin iki biçimi karışık
  görünüyordu (`Miami’de` vs `Miami'de`). Doğrulamak için yayındaki HTML'de
  `[[:alpha:]]'[[:alpha:]]` arandı: her sayfada **0** çıktı. Ölçüme göre
  tutarsızlık yoktu — ama vardı.
- **Elenen:** *Ekran görüntüsü yanılgısı sanmak* → gözü haklıydı; ölçüm
  yanlıştı. *Kaynak kodda saymak* → 301 "düz" eşleşmenin çoğu KOD YORUMU
  (`crawler'ları`, `subset'inde`), kullanıcıya dönük metin değil; kaynak bu soru
  için ayırt edici değil.
- **Seçilen:** görünür metni sunucudan gelen HTML'den çıkarıp **entity
  biçimlerini de** saymak. React, JSX metnindeki düz kesme işaretini `&#x27;`
  olarak kaçırır; ham `'` karakteri HTML'de hiç bulunmaz. Gerçek oran:
  `/ucak-bileti` 27 düz'e karşı 2 eğri, `/gezilecek-yerler` 33'e 3.
- **Kanıt:** aynı sayfada `ham düz=0` ama `&#x27;=27`. İlk grep bu yüzden
  sessizce boş dönüyordu.
- **Kural:** Render edilmiş çıktıda metin ararken, aradığın karakterin o
  katmanda hangi biçime dönüştüğünü önce doğrula (HTML entity, unicode kaçışı,
  normalizasyon). "0 eşleşme" bir sonuç değil, çoğu zaman ölü bir aramadır —
  aramanın kendisini pozitif bir kontrol vakasıyla sına.

---

## 2026-08-08 — Kalite kapısı: prompt'ta rica etmek yasak koymak değildir

**Bağlam.** Brief üç yasak koyuyordu: uydurma fiyat/istatistik yok, bilet
satışı/affiliate yok, miamili içeriğini kopyalama yok. Bunları model prompt'una
yazmak en kolay yol; ama prompt ihlali **sessizce** yayınlanır — kimse fark
etmez, çünkü çıktı geçerli JSON ve akıcı Türkçedir.

**Karar.** Üç yasak da `validatePost()` içinde çalıştırılabilir kurala çevrildi:

- *Uydurma fiyat* → para tutarı ya sayısal aralık (`120-180`) ya da hedge
  ifadesiyle ("yaklaşık", "değişir", "sezona göre") çerçevelenmiş olmak zorunda.
- *Uydurma istatistik* → aynısı yüzde/oran için, artı kanonik sayı allowlist'i
  (acil numara gibi sabit, doğrulanabilir değerler).
- *Affiliate/rezervasyon* → **alan adı allowlist'i**. `booking.com` düz metin
  olarak bile geçemez; yalnızca resmî kurumlar (travel.state.gov, nhc.noaa.gov,
  miamidade.gov…) anılabilir. Ayrıca ham `https?://` tamamen yasak — blog
  renderer'ı paragrafları linkleştirmiyor zaten, yani yapıştırılan bir URL ölü
  metin olarak render olurdu. Yasaklamak affiliate linki **yapısal olarak
  imkânsız** kılıyor.
- *Marka disiplini* → günlük yazılarda "miamili" **sıfır** kez geçebilir.
  Gerekçe: brief'in link bütçesi ("10 sayfada 3-4 bağlamsal link yeter") elle
  yazılan rehberlerde zaten harcanmış durumda; her günlük yazıya marka bahsi
  sıkıştırmak tam olarak brief'in reddettiği gizli-PBN deseni. Sahiplik her
  sayfada footer künyesinde açıkça duruyor.

**Sonuç.** Kapı 11 kural grubu; hepsi `--self-test` ile API'siz doğrulanıyor ve
CI'ın ilk adımı. Kapı bozulmuşsa API'ye tek istek gitmeden job kırmızıya döner.

---

## 2026-08-08 — Kapının kendisi nasıl bozulur: tek yönlü test tuzağı

**Belirti (öngörülen, miamili deneyiminden).** Mutasyon testleri ("bu bozuk
girdi yakalanmalı") yazmak sezgisel ve tatmin edici. Ama her yeni kural kapıyı
biraz daha daraltır ve **hiçbir test bunu fark etmez** — çünkü tüm testler
"yakalandı mı" diye soruyor. Kapı bir noktada meşru yazımları da elemeye başlar,
hat her sabah `needs_review`'a düşer ve kimse nedenini bilmez.

**Çözüm.** `--self-test` iki listeyi birden çalıştırır:

- 14 **mutasyon**: fixture bozulur, kapı yakalamalı.
- 5 **yanlış-pozitif probu**: meşru yazımlar (çerçevelenmiş fiyat, aralıklı
  fiyat, kanonik oran, izinli resmî kaynak, çerçevelenmiş oran) kapıya sokulur
  ve **geçmeli**.

Probların ekleme noktaları özellikle seçildi: `sections[0].body[0]` (kelime
bütçesi taşmasın diye üst sınırdan uzak) ve `faqs[0..1].a` (25-120 kelime
aralığında kalacak şekilde kısa tutuldu). Yeni kural eklerken her iki tarafa da
vaka eklenmeli.

---

## 2026-08-08 — Türkçe metinde regex: iki sessiz ölü kural

Fixture'ı yazarken iki kural, "çalışıyor" görünürken hiçbir şey yapmıyordu.

**1. `MONEY` regex'inin sonundaki `\b`.** Kural şöyle yazılmıştı:

```js
/(\$\s?\d[\d.,]*)|(\b\d[\d.,]*\s*(dolar|USD|usd)\b)/i
```

"185 dolardır" cümlesinde `dolar` ile `d` arasında kelime sınırı **yoktur**, bu
yüzden eşleşme olmaz. Türkçe ek alan her para ifadesi ("dolardan", "doları",
"dolarlık") kuralı atlatıyordu — yani *uydurma fiyat yasağının tamamı* pratikte
kapalıydı. Sondaki `\b` kaldırıldı.

**2. STOPWORDS seti normalize edilmeden kurulmuştu** (bu bug miamili'den miras
alındı). Set diacritic'li yazılmış (`'nasıl'`, `'için'`), karşılaştırma ise
ASCII'ye normalize edilmiş kelimelerle yapılıyordu (`nasil`, `icin`) — hiçbiri
hiçbir zaman eşleşmedi. Sonuç: answer-first örtüşme kontrolü, dolgu kelimeleri
"anlamlı kök" sayıyordu ve neredeyse her intro'yu geçiriyordu. `normalizeWord`
tanımı setin ÜSTÜNE taşındı, set `new Set([...].map(normalizeWord))` ile kuruldu.

**Genel ders.** Normalize edilmiş metinle karşılaştırılan her sabit liste,
**aynı normalizasyondan geçirilerek** kurulmalı. Bu sınıf hata hiç hata
vermez — sadece kuralı sessizce devre dışı bırakır.

---

## 2026-08-08 — Fixture'ın kelime bütçesi: kapı kendi test verisini reddetti

İlk fixture beş bölümün hepsinde 89-107 kelimeydi; kapının alt sınırı 110.
Temiz fixture kapıdan geçemedi, yani `--self-test` daha ilk adımda düştü.

Bu aslında **iyi haber**: kapı gerçekten çalışıyordu. Ama şunu gösterdi —
fixture, kuralların *sınırında* değil *ortasında* durmalı. Her bölüm üçüncü bir
paragrafla ~140-160 kelimeye çıkarıldı; hem 110 alt sınırından hem de 260 üst
sınırından uzak, böylece yanlış-pozitif probları (~10 kelime ekliyor) fixture'ı
sınırın dışına itmiyor.

Ayrıca fixture, backlog'un **ilk konusuna** (`visa-appointment`) bağlı: intro'nun
ilk cümlesi o konunun sorusuyla ≥2 kök örtüşmek zorunda ("vizesi" → `vizes`,
"alınır" → `alini`). Backlog'un ilk konusu değişirse fixture da güncellenmeli —
bu bağımlılık fixture'ın `_readme` alanına yazıldı.

---

## 2026-08-08 — Backlog: hub-and-spoke, rakip değil

30 konuluk kuyruk yazılırken belirgin risk, konuların 10 temel rehberi
**kanibalize etmesiydi** ("miami gezilecek yerler" rehberi varken "miami'de ne
yapılır" yazısı aynı sorguyu hedefler ve ikisi birbirini gömer).

Kural: 10 rehber **HUB**, backlog konuları **SPOKE**. Her konu bir hub'ın tek
bir alt sorusunu derinleştirir; hiçbirinin `question` alanı bir rehberin ana
sorusunun yeniden ifadesi değildir. Script ayrıca slug çakışmasını rehber
slug'larına karşı da kontrol eder — `/ucak-bileti` ile `/blog/ucak-bileti`
teknik olarak çakışmaz ama SEO'da birbirini yer.

Her konunun `angle` alanına, modelin uydurmasını istemediğimiz şey AÇIKÇA
yazıldı ("RANDEVU BEKLEME SÜRESİ İÇİN SAYI VERME", "RESTORAN ADI VE ADRES
UYDURMA"). Kapı bunları zaten yakalıyor; prompt'ta engellemek bir retry turu
tasarruf ettiriyor.
