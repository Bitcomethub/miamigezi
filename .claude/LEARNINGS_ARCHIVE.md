# miamigezi — Learnings Archive

> Tam vaka anlatıları. Oturum başında **okunmaz**; yalnızca burada anlatılan bir
> semptomla uğraşırken açılır. Standing kurallar `LEARNINGS.md`'de.

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
