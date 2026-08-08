import type { Guide } from './types';

export const havaDurumu: Guide = {
  slug: 'hava-durumu',
  number: '06',
  title: "Miami Hava Durumu ve Aylara Göre Gitme Zamanı",
  navLabel: 'Hava ve Aylar',
  question: "Miami'ye hangi ayda gitmek en iyisi?",
  excerpt:
    "Miami'de mevsim yaz-kış değil, kuru sezon ve yağışlı sezon olarak ayrılıyor. Kasım–nisan arası ılık, kuru ve kalabalık; mayıs–ekim arası sıcak, nemli, ucuz ve kasırga sezonu.",
  keywords: [
    'miami hava durumu',
    'miami ne zaman gidilir',
    'miami kasırga sezonu',
    'miami aylara göre hava',
    'miami en iyi zaman',
  ],
  updated: '2026-08-08',
  intro: [
    "Miami'ye gitmek için en iyi dönem, kalabalık ve fiyatı ne kadar tolere ettiğinize bağlı. Hava açısından en konforlu aylar kasım ile nisan arası: nem düşer, sıcaklık 24–28 derece bandında kalır, yağış seyrekleşir. Aynı dönem otel ve uçak fiyatlarının da en yüksek olduğu dönemdir.",
    "Mayıs ile ekim arası ise sıcak ve nemli; neredeyse her öğleden sonra kısa süreli sağanak olur ve resmî kasırga sezonu bu aralığı kapsar. Buna karşılık fiyatlar belirgin biçimde düşer ve plajlar boşalır.",
  ],
  quickFacts: [
    { label: 'Kuru sezon', value: 'Kasım – Nisan' },
    { label: 'Yağışlı sezon', value: 'Mayıs – Ekim' },
    { label: 'Kasırga sezonu', value: '1 Haziran – 30 Kasım' },
    { label: 'Zirve kasırga riski', value: 'Ağustos ortası – Ekim' },
    { label: 'En serin ay', value: 'Ocak (~24 °C gündüz)' },
    { label: 'En sıcak ay', value: 'Temmuz–Ağustos (~32 °C, yüksek nem)' },
  ],
  sections: [
    {
      heading: 'Miami’de iklim nasıl işler?',
      body: [
        "Miami tropikal-monsun karakterli bir iklime sahip; yani sıcaklık yıl boyunca dar bir bantta gezinirken asıl fark yağış ve nemde ortaya çıkar. Kışın gündüz sıcaklığı 24 derece civarındayken yazın 32 dereceye çıkar, ama hissedilen sıcaklık nem yüzünden çok daha yüksektir.",
        "Yağışlı sezonda tipik gün şöyledir: sabah güneşli, öğleden sonra bir saatliğine şiddetli sağanak ve gök gürültüsü, akşam yeniden açık. Bu yağmurlar günü iptal ettirmez; programı öğleden sonraya iç mekân koyacak şekilde kurmak yeterlidir.",
        "Kışın ise arada kuzeyden gelen soğuk cepheler görülebilir. Bu günlerde gece sıcaklığı 13–15 dereceye kadar iner ve rüzgâr artar; ince bir mont ya da kalın hırka valizde bulunsun.",
      ],
    },
    {
      heading: 'Ay ay ne bekleniyor?',
      body: [
        "Aşağıdaki tablo uzun yıllara ait genel eğilimi gösteriyor; belirli bir yılın değerleri bundan sapabilir. Sıcaklıklar gündüz ortalamasıdır.",
      ],
      table: {
        caption: 'Miami — ay ay hava ve yoğunluk eğilimi',
        columns: ['Ay', 'Gündüz', 'Yağış', 'Yoğunluk'],
        rows: [
          ['Ocak', '~24 °C', 'Az', 'Yüksek'],
          ['Şubat', '~25 °C', 'Az', 'Yüksek'],
          ['Mart', '~26 °C', 'Az', 'Çok yüksek'],
          ['Nisan', '~28 °C', 'Az–orta', 'Orta'],
          ['Mayıs', '~30 °C', 'Artıyor', 'Orta'],
          ['Haziran', '~31 °C', 'Yoğun', 'Orta'],
          ['Temmuz', '~32 °C', 'Yoğun', 'Orta–yüksek'],
          ['Ağustos', '~32 °C', 'Yoğun', 'Düşük'],
          ['Eylül', '~31 °C', 'Yoğun', 'En düşük'],
          ['Ekim', '~29 °C', 'Azalıyor', 'Düşük'],
          ['Kasım', '~27 °C', 'Az', 'Orta'],
          ['Aralık', '~25 °C', 'Az', 'Ay sonu zirve'],
        ],
        note: 'Değerler uzun dönem ortalamalarına dayanan yaklaşık eğilimlerdir; seyahat tarihinize yakın güncel tahmini resmî meteoroloji kaynağından takip edin.',
      },
    },
    {
      heading: 'Kasırga sezonu seyahati riskli mi?',
      body: [
        "Atlantik kasırga sezonu resmen 1 Haziran ile 30 Kasım arasında; istatistiksel olarak en yoğun dönem ağustos ortasından ekim sonuna kadar. Buna rağmen Miami'ye doğrudan isabet eden fırtına her yıl yaşanmaz; sezon boyunca çoğu gün normal geçer.",
        "Riski yönetmenin yolu tarihten kaçınmak değil, hazırlıklı olmak: kasırga kapsamı olan bir seyahat sigortası yaptırmak, esnek iptal koşullu otel seçmek ve Ulusal Kasırga Merkezi'nin (NHC) bültenlerini takip etmek. Fırtınalar birkaç gün önceden tahmin edilebilir, ani baskın yapmaz.",
        "Uyarı yayımlanırsa havayolları genellikle ücretsiz tarih değişikliği sunar ve yerel yönetim tahliye bölgelerini ilan eder. Otelinizin bulunduğu bölgenin tahliye bölgesinde olup olmadığını önceden öğrenmek en pratik hazırlıktır.",
      ],
      note: 'Kasırga sezonu seyahatinde en kritik karar bilet veya otel değil, iptal/erteleme koşullarıdır. Rezervasyon yaparken esnek tarifeyi ek maliyet değil sigorta olarak düşünün.',
    },
    {
      heading: 'Hangi ayda hangi etkinlik var?',
      body: [
        "Miami'nin takvimi fiyatları doğrudan etkiliyor. Büyük bir etkinliğe denk gelen hafta, aynı otelde iki katı fiyat anlamına gelebilir. Aşağıdaki etkinlikler her yıl tekrarlanıyor, ancak tarihleri yıldan yıla kayar — kesin tarih için etkinliğin kendi sitesine bakın.",
      ],
      list: [
        'Şubat — South Beach Wine & Food Festival, Miami Uluslararası Tekne Fuarı',
        'Mart — Miami Open tenis turnuvası, Ultra Music Festival, Calle Ocho sokak festivali, ABD bahar tatili',
        'Mayıs — Formula 1 Miami Grand Prix (Hard Rock Stadium çevresi)',
        'Ekim — Miami Carnival',
        'Aralık — Art Basel Miami Beach (ayın ilk haftası), yılbaşı dönemi',
      ],
      note: 'Etkinlik tarihleri her yıl değişir. Buradaki aylar genel yerleşimi gösterir; bileti veya oteli kesinleştirmeden önce resmî takvimden doğrulayın.',
    },
    {
      heading: 'Ne giymeli, valize ne koymalı?',
      body: [
        "Yıl boyunca ince ve nefes alan kıyafetler işinizi görür. Yazın en büyük sorun sıcaklık değil nem; pamuklu yerine hızlı kuruyan kumaşlar belirgin fark yaratıyor. Yağışlı sezonda hafif bir yağmurluk, şemsiyeden daha kullanışlı çünkü sağanaklara genellikle rüzgâr eşlik ediyor.",
        "Kışın gündüz tişört yeterli olsa da akşam serinliyor; ince bir kat mutlaka bulunsun. Ayrıca restoran, müze ve alışveriş merkezlerinde klima çok güçlü çalıştırılıyor — içeride üşümek Miami'de dışarıda terlemekten daha yaygın bir şikâyet.",
        "Güneş koruması yıl boyunca gerekli. Kışın bile UV indeksi yüksek olabiliyor; şapka, güneş gözlüğü ve yüksek faktörlü koruyucu, mevsimden bağımsız olarak listeye girmeli.",
      ],
    },
  ],
  faqs: [
    {
      q: "Miami'ye gitmek için en iyi ay hangisi?",
      a: "Hava açısından en dengeli dönem kasım, aralık başı, nisan ve mayıs başıdır: nem düşük, sıcaklık 26–29 derece bandında ve yağış seyrektir. Ocak–mart da konforludur ama en kalabalık ve en pahalı dönemdir. Bütçe önceliğinizse eylül ve ekim en ucuz aylardır; karşılığında sıcak, nemli ve kasırga sezonunun zirvesinde bir tatil kabul etmeniz gerekir.",
    },
    {
      q: 'Miami yazın çok mu sıcak?',
      a: "Termometre 32 derece civarında görünse de yüksek nem yüzünden hissedilen sıcaklık 38–40 dereceye çıkabilir. Gün ortasında uzun süre dışarıda kalmak yorucudur; yerel ritim de buna göredir. Sabah erken ve akşamüstü dışarıda, öğleden sonra havuzda, müzede ya da alışveriş merkezinde geçirilen bir program yaz aylarında çok daha rahat çalışır.",
    },
    {
      q: 'Miami’de yağmur tatili bozar mı?',
      a: "Genellikle hayır. Yağışlı sezonda yağmur çoğunlukla öğleden sonra bir ile iki saat süren şiddetli sağanaklar biçiminde gelir ve ardından hava açar; gün boyu süren kapalı havalar nadirdir. Programı esnek tutmak ve öğleden sonraya bir iç mekân alternatifi koymak yeterlidir. Şiddetli fırtına uyarısı varsa tekne ve Everglades turları iptal edilebilir.",
    },
    {
      q: 'Kasırga sezonunda Miami’ye gitmeli miyim?',
      a: "Gidilebilir, ama esnek rezervasyonla. Sezon 1 Haziran–30 Kasım arasıdır ve en riskli dönem ağustos ortası ile ekim sonudur. Miami'ye doğrudan etki eden bir fırtına her yıl olmaz; fiyatlar ise belirgin şekilde düşer. Kasırga kapsamlı seyahat sigortası yaptırın, ücretsiz iptal edilebilen otel seçin ve Ulusal Kasırga Merkezi'nin bültenlerini takip edin.",
    },
    {
      q: 'Miami’de kışın denize girilir mi?',
      a: "Evet. Ocak ve şubatta deniz suyu sıcaklığı 24 derece civarındadır, yani Akdeniz'in yaz ortası sıcaklığına yakındır. Hava sıcaklığı soğuk cephe günlerinde düşüp rüzgâr artabildiği için sudan çıkınca üşüyebilirsiniz. Öğle saatleri en konforlu zamandır; bu dönemde plajlar yazdan çok daha sakindir.",
    },
  ],
  sources: [
    { label: 'ABD Ulusal Kasırga Merkezi (NHC)', url: 'https://www.nhc.noaa.gov' },
    { label: 'ABD Ulusal Meteoroloji Servisi — Miami', url: 'https://www.weather.gov/mfl/' },
  ],
  related: ['plajlar', 'ucak-bileti', 'gezilecek-yerler'],
};
