import type { Guide } from './types';

export const alisveris: Guide = {
  slug: 'alisveris',
  number: '09',
  title: "Miami’de Alışveriş: Outlet, AVM ve Vergi Gerçeği",
  navLabel: 'Alışveriş',
  question: "Miami’de alışveriş için nereye gidilir, vergi iadesi var mı?",
  excerpt:
    "Miami alışveriş için güçlü bir şehir: büyük outlet merkezleri, lüks pasajlar ve mahalle butikleri bir arada. Ama ABD’de turistlere satış vergisi iadesi yok — bütçeyi buna göre kurmak gerekiyor.",
  keywords: [
    'miami alışveriş',
    'miami outlet',
    'sawgrass mills',
    'aventura mall',
    'amerika vergi iadesi',
  ],
  updated: '2026-08-08',
  intro: [
    "Miami’de alışveriş üç ayrı kulvarda ilerliyor: indirim odaklı outlet merkezleri, tam fiyatlı büyük alışveriş merkezleri ve lüks markaların toplandığı pasajlar. Hangisine gideceğiniz aradığınız markadan çok aradığınız fiyat aralığına bağlı.",
    "Bir uyarıyla başlamak gerekiyor: Avrupa’daki gibi turistlere satış vergisi iadesi (tax free) ABD’de uygulanmıyor. Kasada ödediğiniz vergi geri alınamaz; bu yüzden bütçeyi etiket fiyatının üzerine yaklaşık %7 ekleyerek hesaplayın.",
  ],
  quickFacts: [
    { label: 'Satış vergisi', value: 'Miami-Dade %7, etikete dahil değil' },
    { label: 'Turist vergi iadesi', value: 'Yok' },
    { label: 'En büyük outlet', value: 'Sawgrass Mills (Sunrise, ~45 dk)' },
    { label: 'En büyük AVM', value: 'Aventura Mall' },
    { label: 'Lüks', value: 'Bal Harbour Shops, Design District' },
    { label: 'Elektrik', value: '120V — cihaz uyumunu kontrol edin' },
  ],
  sections: [
    {
      heading: 'Outlet mi, alışveriş merkezi mi?',
      body: [
        "Outlet merkezleri, markaların geçmiş sezon ve outlet’e özel üretim ürünlerini indirimli sattığı yerler. Broward ilçesindeki Sawgrass Mills, Miami’den araçla yaklaşık 45 dakika ve ABD’nin en büyük outlet komplekslerinden biri; içinde hem uygun fiyatlı zincirler hem de lüks markaların indirim mağazaları var.",
        "Miami sınırları içindeki Dolphin Mall, Sawgrass’a göre daha küçük ama havalimanına yakın ve dönüş gününde uğramak için pratik. Ürün çeşidi daha dar, ancak yol süresi çok daha kısa.",
        "Tam fiyatlı alışveriş merkezleri tarafında Aventura Mall öne çıkıyor: hem ölçek hem marka çeşitliliği bakımından bölgenin en kapsamlısı. Dadeland Mall güneyde, Brickell City Centre ise şehir merkezinde daha kompakt bir alternatif.",
      ],
      note: 'Outlet’teki “indirimli” etiketin karşılaştırma fiyatı her zaman gerçek perakende fiyatı olmayabilir. Aradığınız ürünün normal fiyatını telefonunuzdan kontrol etmek en güvenilir yöntem.',
    },
    {
      heading: 'Lüks alışveriş nerede yapılır?',
      body: [
        "Bal Harbour Shops, açık hava düzeninde ve bahçeli bir lüks pasaj; Miami Beach’in kuzeyinde ve mimarisiyle de gezilesi. Marka yelpazesi dar ama üst segmentte yoğunlaşmış durumda.",
        "Design District ise bir alışveriş merkezinden çok bir semt: sokakları lüks markaların mimari olarak tasarlanmış mağazaları, heykeller ve meydanlarla dolu. Alışveriş yapmasanız bile yürümeye değer.",
        "Coral Gables’taki Miracle Mile, zincir markalar yerine butikler, kuyumcular ve gelinlik mağazalarıyla farklı bir karaktere sahip; ağaçlıklı caddesi ve restoranlarıyla daha yavaş bir alışveriş deneyimi sunuyor.",
      ],
    },
    {
      heading: 'Vergi ve fiyat: hesap nasıl tutuluyor?',
      body: [
        "ABD’de etiket fiyatı vergisiz gösterilir; kasada Miami-Dade için %7 satış vergisi eklenir. Avrupa’daki gibi havalimanında turistlere vergi iadesi uygulanan bir sistem ABD genelinde bulunmuyor, Florida’da da yok. Bu, Türkiye’den gelen ziyaretçilerin en sık yanıldığı konu.",
        "Florida zaman zaman belirli ürün gruplarında vergisiz alışveriş dönemleri ilan ediyor (örneğin okul dönemi başında kırtasiye ve giyim için). Bu dönemler her yıl yasayla ayrıca belirleniyor; tarihiniz denk gelirse eyaletin resmî gelir idaresi sayfasından kontrol edin.",
      ],
      table: {
        caption: 'Alışveriş bölgeleri karşılaştırması',
        columns: ['Yer', 'Karakter', 'Merkeze uzaklık'],
        rows: [
          ['Sawgrass Mills', 'Dev outlet, geniş marka', '~45 dk araç'],
          ['Dolphin Mall', 'Outlet, havalimanına yakın', '~25 dk araç'],
          ['Aventura Mall', 'Tam fiyat, en kapsamlı', '~30 dk araç'],
          ['Dadeland Mall', 'Tam fiyat, güney', '~25 dk araç'],
          ['Brickell City Centre', 'Kompakt, şehir içi', 'Merkez'],
          ['Bal Harbour Shops', 'Lüks, açık hava', '~25 dk araç'],
          ['Design District', 'Lüks + mimari', '~15 dk araç'],
          ['Lincoln Road', 'Zincir + kafe, yaya', 'South Beach içi'],
        ],
        note: 'Süreler trafiksiz koşullara göredir; hafta sonu ve tatil dönemlerinde belirgin biçimde uzar.',
      },
    },
    {
      heading: 'Elektronik ve teknik ürünlerde nelere dikkat etmeli?',
      body: [
        "ABD şebeke gerilimi 120 volt ve fiş tipi farklı (Type A/B). Telefon, dizüstü ve kamera şarj cihazlarının hemen tamamı çift voltajlı olduğu için yalnızca fiş adaptörü yeterli; ancak saç kurutma makinesi, ütü ve küçük ev aleti gibi ısıtıcı cihazlar Türkiye’de çalışmaz.",
        "Garanti konusu genellikle atlanıyor: ABD’den alınan elektronik ürünlerin garantisi çoğu markada bölgeseldir ve Türkiye’de geçerli olmayabilir. Arıza durumunda servis maliyeti, alırken kazandığınız farkı silebilir.",
        "Klavye düzeni, dil desteği ve mobil şebeke bantları da kontrol edilmesi gereken başlıklar. Özellikle telefonlarda bazı modellerin ABD sürümleri farklı donanım taşıyabiliyor.",
      ],
    },
    {
      heading: 'Dönüşte gümrük ve bagaj',
      body: [
        "Türkiye’ye dönüşte yolcu beraberi eşya için kişisel kullanım muafiyeti bulunuyor ve bu sınırın üzerindeki ürünler için vergi doğuyor. Muafiyet tutarları ve kapsamı zaman zaman güncelleniyor; alışverişe çıkmadan önce Ticaret Bakanlığı’nın güncel yolcu beraberi eşya bilgisine bakmak en doğrusu.",
        "Havayolu bagaj limitleri de bütçenin parçası: fazla bagaj ücreti, kazandığınız indirimi kolayca götürebilir. Alışveriş yapacağınızı biliyorsanız gidişte hafif gitmek ya da dönüş için ek bagaj hakkı satın almak genellikle daha ucuz.",
        "Faturaları saklayın. Hem gümrükte beyan gerekirse hem de ürün iadesi ve garanti başvurusunda fatura tek geçerli belgedir. Çoğu ABD mağazası fişle iade kabul eder, ancak süre sınırı vardır.",
      ],
      note: 'Gümrük muafiyet tutarları ve uygulama değişebilir. Buradaki bilgi genel çerçevedir; bağlayıcı kaynak Ticaret Bakanlığı’nın güncel duyurularıdır.',
    },
  ],
  faqs: [
    {
      q: "Amerika’da turistlere vergi iadesi var mı?",
      a: "Hayır. Avrupa’daki tax free sisteminin ABD genelinde bir karşılığı yok ve Florida’da da uygulanmıyor. Kasada ödediğiniz satış vergisi geri alınamaz. Bu yüzden bütçenizi etiket fiyatı üzerinden değil, Miami-Dade’de yaklaşık %7 vergi eklenmiş tutar üzerinden hesaplayın. Louisiana gibi çok sınırlı sayıda eyalette özel uygulamalar bulunur, Florida bunlardan biri değildir.",
    },
    {
      q: 'Sawgrass Mills mi Dolphin Mall mı?',
      a: "Marka çeşitliliği ve indirim derinliği arıyorsanız Sawgrass Mills daha güçlüdür; karşılığında Miami’den yaklaşık 45 dakika sürer ve bir tam gün ister. Dolphin Mall daha küçüktür ama havalimanına yakın olduğu için dönüş gününde uçuş öncesi birkaç saat için idealdir. Zamanınız kısıtlıysa Dolphin, alışveriş asıl amacınızsa Sawgrass mantıklıdır.",
    },
    {
      q: 'Miami’de alışveriş merkezleri kaçta açılıyor?',
      a: "Büyük alışveriş merkezleri genellikle sabah 10.00–11.00 arasında açılıp akşam 20.00–21.30 arasında kapanır; pazar günleri açılış geç, kapanış erken olur. Tatil dönemlerinde saatler uzatılır. Restoranlar ve sinemalar merkez kapansa da açık kalabilir. Uzun yol gideceğiniz bir merkeze gitmeden önce güncel saatleri kontrol etmek en güvenlisidir.",
    },
    {
      q: 'ABD’den elektronik almak mantıklı mı?',
      a: "Fiyat avantajı olabilir, ancak üç şeyi hesaba katın: kasada eklenen satış vergisi, garantinin Türkiye’de geçerli olmama ihtimali ve 120 voltluk şebekeye uygun ısıtıcı cihazların Türkiye’de çalışmayacağı gerçeği. Telefon, dizüstü ve kamera gibi çift voltajlı ürünlerde yalnızca fiş adaptörü yeterlidir. Garanti kapsamını mağazadan yazılı olarak teyit etmek en güvenli yaklaşımdır.",
    },
    {
      q: 'Miami’de indirim dönemleri ne zaman?',
      a: "En büyük indirimler kasım sonundaki Şükran Günü haftası ve onu izleyen Black Friday–Cyber Monday döneminde, ardından da yılbaşı sonrası ocak ayında görülür. Yaz sonu ve sezon geçişlerinde de belirgin indirimler olur. Florida ayrıca bazı yıllarda belirli ürün gruplarında vergisiz alışveriş dönemleri ilan eder; tarihleri her yıl değiştiği için eyaletin resmî sayfasından kontrol etmek gerekir.",
    },
  ],
  related: ['yeme-icme', 'gezilecek-yerler', 'ilk-kez'],
};
