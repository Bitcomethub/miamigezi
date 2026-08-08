import type { Guide } from './types';

export const ilkKez: Guide = {
  slug: 'ilk-kez',
  number: '01',
  title: "İlk Kez Miami'ye Gidenler İçin Rehber: Vize, Bütçe ve Pratik Bilgiler",
  navLabel: 'İlk Kez Gidenler',
  question: "Miami'ye ilk kez giden bir Türk gezginin önceden bilmesi gerekenler neler?",
  excerpt:
    "Miami'ye ilk seyahatte en kritik üç konu vize, bütçe ve mesafe. Türk vatandaşları ESTA kullanamaz, B1/B2 vizesi almak zorundadır; şehir beklenenden çok daha dağınıktır ve sağlık sigortası pazarlık konusu değildir.",
  keywords: [
    'miami ilk kez',
    'miami gezi rehberi',
    'miami vize',
    'miamiye nasıl gidilir',
    'miami seyahat tavsiyeleri',
  ],
  updated: '2026-08-08',
  intro: [
    "Miami'ye ilk kez gidecek bir Türk gezginin önce halletmesi gereken üç şey var: ABD vizesi, sağlık sigortası ve şehir içinde nasıl hareket edeceğine dair bir plan. Türkiye Vize Muafiyet Programı'nda olmadığı için ESTA başvurusu yapılamaz; turistik seyahat için B1/B2 vizesi gerekir ve randevu süreleri dönemsel olarak aylar bulabilir.",
    "Geri kalan her şey — hangi semtte kalınacağı, hangi ay gidileceği, ne kadar bütçe ayrılacağı — bu üçünün üstüne kurulur. Aşağıdaki maddeler, ilk seyahatte en sık yapılan planlama hatalarını sırayla kapatıyor.",
  ],
  quickFacts: [
    { label: 'Vize', value: 'B1/B2 gerekli · ESTA yok' },
    { label: 'Saat farkı', value: "Türkiye'den 7–8 saat geri" },
    { label: 'Para birimi', value: 'ABD doları · kart her yerde geçer' },
    { label: 'Elektrik', value: '120V / 60Hz · Tip A-B fiş' },
    { label: 'Acil durum', value: '911' },
    { label: 'Dil', value: 'İngilizce + İspanyolca' },
  ],
  sections: [
    {
      heading: 'Türk vatandaşları Miami için hangi vizeyi alır?',
      body: [
        "Turistik seyahat için gereken belge B1/B2 vizesidir. Türkiye, ABD'nin Vize Muafiyet Programı'nda (Visa Waiver Program) yer almadığı için ESTA başvurusu Türk pasaportuyla yapılamaz — internette karşınıza çıkan \"ESTA ile 90 gün\" içerikleri başka ülkelerin vatandaşları içindir.",
        "Süreç DS-160 formunun doldurulmasıyla başlar, vize ücretinin yatırılmasıyla devam eder ve konsolosluk mülakatıyla biter. Randevu bekleme süresi dönemsel olarak çok değişkendir; bu yüzden bilet ve otel rezervasyonunu vize onaylanmadan önce yapmak, iptal koşullarını kabul etmek anlamına gelir.",
        "Vize verildiğinde pasaportunuza basılan tarih ülkede kalabileceğiniz süreyi değil, giriş yapabileceğiniz son tarihi gösterir. Ne kadar kalabileceğinize sınır kapısındaki memur karar verir ve bu bilgi elektronik I-94 kaydına işlenir; kaydı ABD'ye vardıktan sonra i94.cbp.dhs.gov adresinden kontrol edebilirsiniz.",
      ],
      note: 'Vize ücretleri, form içerikleri ve randevu koşulları değişebilir. Güncel bilgi için her zaman ABD Büyükelçiliği ve konsoloslukların resmî sitesine bakın.',
    },
    {
      heading: "Miami'ye ne zaman gitmek en mantıklısı?",
      body: [
        "Hava açısından en rahat dönem kasım ile nisan arasıdır: nem düşer, öğleden sonra sağanakları seyrekleşir, gündüz sıcaklığı 24–28 °C bandında kalır. Bu aynı zamanda fiyatların en yüksek olduğu dönemdir; aralık sonu ve mart özellikle pahalıdır.",
        "Mayıs–ekim arası yağışlı sezondur. Sıcaklık 32–33 °C'ye, hissedilen sıcaklık nem yüzünden çok daha yukarı çıkar; buna karşılık öğleden sonra yağmurları genellikle kısa sürer ve gün tamamen kapanmaz. Otel fiyatları belirgin şekilde düşer.",
        "1 Haziran–30 Kasım arası resmî kasırga sezonudur ve riskin yoğunlaştığı dönem ağustos–ekimdir. Miami'ye her yıl kasırga vurmaz, ama bu aylarda seyahat sigortasının iptal/erteleme kapsamını okumadan bilet almayın.",
      ],
    },
    {
      heading: "Miami'de ne kadar bütçe gerekir?",
      body: [
        "Miami, ABD'nin pahalı şehirlerinden biridir ve maliyetin büyük kısmı konaklama ile ulaşımdan gelir. Aşağıdaki aralıklar kişi başı günlük harcamayı, uçak bileti hariç kabaca çerçeveler; sezona ve semte göre ciddi biçimde oynar.",
      ],
      table: {
        caption: 'Kişi başı yaklaşık günlük bütçe (uçak bileti hariç)',
        columns: ['Kalem', 'Ekonomik', 'Orta', 'Rahat'],
        rows: [
          ['Konaklama (çift kişilik oda)', '$120–180', '$200–350', '$400+'],
          ['Yemek', '$40–60', '$70–120', '$150+'],
          ['Şehir içi ulaşım', '$5–15', '$25–45', '$60+'],
          ['Aktivite / müze / tur', '$0–20', '$30–60', '$80+'],
        ],
        note: 'Rakamlar 2026 başı itibarıyla tipik aralıklardır ve sezona göre değişir. Otel fiyatlarına vergi (%13–14 civarı) ve varsa günlük "resort fee" dahil değildir.',
      },
    },
    {
      heading: 'Miami dolaşmak için araba şart mı?',
      body: [
        "Sadece South Beach ve çevresinde kalacaksanız araba gereksizdir; bölge yürünebilir, ücretsiz tramvay hattı vardır ve otoparklar pahalıdır. Buna karşılık Wynwood, Little Havana, Coral Gables ve Key Biscayne gibi yerleri aynı gün içinde birleştirecekseniz araba ya da yoğun Uber kullanımı kaçınılmaz olur.",
        "Miami tek bir merkez etrafında kurulmuş bir şehir değil; birbirinden köprülerle ayrılmış, arada uzun mesafeler olan bir semtler dizisidir. İki nokta arası harita üzerinde yakın görünse bile köprü ve trafik yüzünden 40 dakika sürebilir.",
        "Pratik çözüm çoğu gezgin için karma bir plan: şehirde kaldığınız günlerde toplu taşıma ve uygulama üzerinden araç, Everglades ya da Florida Keys gibi şehir dışı günlerde bir ya da iki günlüğüne kiralık araba.",
      ],
    },
    {
      heading: 'Sağlık sigortası ve ilaç konusunda neye dikkat etmeli?',
      body: [
        "ABD'de kamu sağlık sistemi yok; sigortasız bir acil servis ziyareti binlerce dolara ulaşabilir. Seyahat sağlık sigortası, ABD seyahatlerinde tercih değil zorunluluk gibi düşünülmeli ve poliçenin ABD'yi kapsadığından, teminat üst limitinden emin olunmalı.",
        "Düzenli kullandığınız reçeteli ilaçları yanınızda, orijinal kutusunda ve mümkünse İngilizce reçete/rapor kopyasıyla taşıyın. ABD'de birçok ilaç reçetesiz satılmaz ve Türkiye'deki muadili farklı isimle bulunur; etken madde adını not almak işinizi kolaylaştırır.",
        "Musluk suyu içilebilir. Yaz aylarında asıl risk güneş ve nem: öğle saatlerinde uzun süre açıkta kalmak, alışkın olmayan gezginlerde ciddi güneş çarpmasına yol açabiliyor.",
      ],
    },
    {
      heading: 'Bahşiş, vergi ve ödeme konusunda bilinmesi gerekenler neler?',
      body: [
        "Restoranlarda bahşiş hesabın %18–20'si kadardır ve fiyatın parçası sayılır — servis ücreti değil, çalışanın gelirinin ana kalemidir. Miami Beach'te birçok mekân 6 kişiden kalabalık masalara (bazen her masaya) otomatik servis ücreti ekler; hesabı ödemeden önce \"gratuity\" satırını kontrol edin, iki kez bahşiş bırakmayın.",
        "Etiket fiyatlarına vergi dahil değildir. Miami-Dade'de perakende satış vergisi toplam %7'dir ve kasada eklenir. Turistlere KDV iadesi yoktur; Avrupa'daki \"tax free\" mantığı ABD'de işlemez.",
        "Kart hemen her yerde geçer, temassız ödeme yaygındır. Yine de bahşiş, valet ve küçük büfeler için 40–60 dolarlık ufaklık taşımak işe yarar.",
      ],
    },
    {
      heading: 'Telefon, internet ve saat farkı nasıl yönetilir?',
      body: [
        "Miami, Doğu Saat Dilimi'ndedir (EST/EDT). Türkiye ile fark kışın 8, yaz saati uygulamasının sürdüğü mart–kasım arasında 7 saattir; Miami her zaman Türkiye'den geridedir. Türkiye'de öğlen 12:00 ise Miami'de sabahın 4'ü ya da 5'idir.",
        "Veri için üç seçenek var: Türk operatörünüzün yurt dışı paketi, yerel bir eSIM ya da havalimanından alınan ön ödemeli hat. eSIM destekleyen bir telefonunuz varsa, uçağa binmeden satın alıp indiğiniz anda aktifleştirmek en pratik yöntem.",
        "Elektrik 120V/60Hz ve fişler Tip A/B. Telefon, tablet ve laptop şarj adaptörlerinin neredeyse tamamı 100–240V çalışır; yalnızca fiş adaptörü yeterlidir. Saç kurutma makinesi, ütü gibi ısıtıcı cihazları Türkiye'den götürmeyin.",
      ],
    },
  ],
  faqs: [
    {
      q: "Türk vatandaşları Miami'ye ESTA ile gidebilir mi?",
      a: "Hayır. Türkiye ABD Vize Muafiyet Programı'nda yer almadığı için Türk pasaportu sahipleri ESTA başvurusu yapamaz. Turistik seyahat için konsolosluk mülakatı gerektiren B1/B2 vizesi alınması gerekir. Vize randevusu bekleme süreleri dönemsel olarak uzayabildiği için planlamaya erken başlamak önemlidir.",
    },
    {
      q: "Miami'ye gitmek için en ucuz aylar hangileri?",
      a: "Genellikle eylül, ekim ve aralık ayının ilk yarısı en uygun fiyatlı dönemdir; mayıs–ağustos arası da kış aylarına göre ucuzdur. En pahalı dönemler aralık sonu–ocak başı tatil haftası, mart (bahar tatili ve büyük etkinlikler) ve şubattır. Fiyatlar yıldan yıla değiştiği için birkaç tarih birden karşılaştırmakta fayda var.",
    },
    {
      q: 'Miami güvenli bir şehir mi?',
      a: "Turistlerin vakit geçirdiği South Beach, Brickell, Coral Gables, Coconut Grove ve Wynwood gibi bölgeler gündüz ve akşam saatlerinde genel olarak rahattır. Her büyük şehirde olduğu gibi gece geç saatte tenha sokaklardan, araç içinde görünür eşya bırakmaktan ve plajda eşyayı gözetimsiz koymaktan kaçınmak gerekir. Şehrin bazı bölgeleri turistik değildir; navigasyonun önerdiği kestirme yollara körü körüne uymayın.",
    },
    {
      q: 'Miami kaç gün için yeterli?',
      a: "Sadece şehir ve plajlar için 4–5 tam gün rahat bir tempo sağlar. Everglades, Florida Keys ya da Key West gibi çevre rotalar eklenecekse 7–8 güne çıkmak gerekir. Uzun uçuş ve saat farkı nedeniyle ilk günü hafif planlamak, son günü de havalimanı trafiğine pay bırakarak kurgulamak işe yarar.",
    },
    {
      q: 'Miami’de İngilizce bilmeden idare edilebilir mi?',
      a: "Kısmen. Miami, ABD'nin İspanyolca'nın en yaygın konuşulduğu şehirlerinden biridir ve turistik noktalarda çalışanların çoğu iki dillidir. Temel İngilizce ya da İspanyolca kelimeler günlük işleri halletmeye yeter; havalimanı, sağlık ve resmî işlemler için çeviri uygulaması bulundurmak faydalı olur.",
    },
  ],
  sources: [
    { label: 'ABD Gümrük ve Sınır Koruma — I-94 kaydı', url: 'https://i94.cbp.dhs.gov' },
    { label: 'ABD Dışişleri Bakanlığı — vize bilgileri', url: 'https://travel.state.gov' },
  ],
  related: ['ucak-bileti', 'oteller', 'ulasim'],
  miamili: {
    path: '/rapor',
    label: 'MiamiLi Türk Yatırımcı Raporu',
    context:
      "Miami'ye tatilden çok yaşamak ya da yatırım yapmak için bakıyorsanız, Türk alıcıların Güney Florida'daki konumunu veriyle anlatan",
  },
};
