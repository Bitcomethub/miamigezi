import type { BlogPost } from './types';

/**
 * Elle yazılan açılış yazıları. Üretim hattı BU dosyaya dokunmaz —
 * o generated-posts.json’a append eder. İkisi blogData.ts’te birleşir.
 */
export const SEED_POSTS: BlogPost[] = [
  {
    slug: 'miamide-kredi-karti-mi-nakit-mi',
    title: "Miami’de Kredi Kartı mı Nakit mi Kullanmalı?",
    question: "Miami’de ödemeler nasıl yapılıyor, nakit taşımak gerekir mi?",
    excerpt:
      "Miami’de neredeyse her yerde kart geçiyor; nakit yalnızca bahşiş, küçük ventanita alışverişleri ve bazı otoparklar için gerekiyor. Asıl mesele hangi kartı kullandığınız.",
    keywords: [
      'miami kredi kartı',
      'amerikada nakit',
      'miami para birimi',
      'yurt dışı kart kullanımı',
    ],
    publishedAt: '2026-08-06',
    updatedAt: '2026-08-06',
    intro: [
      "Miami’de günlük hayatın neredeyse tamamı kartla dönüyor: restoran, market, taksi, müze bileti ve toplu taşıma kart kabul ediyor. Yanınızda bir miktar küçük banknot bulundurmanın tek gerçek sebebi bahşiş, sokak satıcıları ve bazı eski otopark makineleri.",
      "Buna karşılık \"kart geçiyor\" ile \"kartınız avantajlı\" aynı şey değil. Yurt dışı işlem komisyonu, döviz kuru farkı ve ATM ücretleri, iki haftalık bir tatilde üç haneli dolarlara ulaşabiliyor.",
    ],
    sections: [
      {
        heading: 'Hangi kart türü daha avantajlı?',
        body: [
          "Türkiye’den çıkan kartlarda yurt dışı işlemlerde genellikle bir komisyon uygulanıyor ve bu oran bankadan bankaya değişiyor. Seyahat öncesi kendi bankanızın yurt dışı işlem ücretini öğrenmek, kart seçimini tek başına belirleyebilir.",
          "Doğrudan dolar hesabından harcama yapan kartlar, TL hesaptan otomatik çevrim yapanlara göre genellikle daha öngörülebilir sonuç veriyor; çünkü kur, bankanın kendi çevrim kurundan değil, kendi aldığınız dolardan işliyor.",
          "Kartınızın temassız ödeme desteğinin açık olduğundan emin olun; ABD’de temassız ödeme yaygınlaştı ve bazı toplu taşıma turnikeleri yalnızca bu yöntemi kabul ediyor.",
        ],
      },
      {
        heading: '“Dolar mı, TL mi?” sorusuna nasıl cevap vermeli?',
        body: [
          "Kartla ödeme yaparken POS cihazı veya ATM zaman zaman \"işlemi kendi para biriminizde mi yapmak istersiniz?\" diye sorar. Bu işleme dinamik döviz çevrimi (DCC) deniyor ve neredeyse her zaman aleyhinizedir; çünkü kuru cihazın bağlı olduğu servis belirler ve marj ekler.",
          "Doğru cevap her zaman yerel para birimidir: yani dolar. Böylece çevrimi kendi bankanız yapar ve genellikle daha iyi kur elde edersiniz.",
        ],
      },
      {
        heading: 'Ne kadar nakit taşımalı?',
        body: [
          "Bir haftalık tatil için kişi başı 100–200 dolar civarında küçük banknot pratikte fazlasıyla yeterli oluyor. Bahşişler, ventanita’daki kahve, sokak satıcıları ve bazı park makineleri dışında nakde ihtiyaç duymuyorsunuz.",
          "Bir ve beş dolarlık banknotlar özellikle işe yarıyor: otel görevlisine, vale’ye ya da barda içki başına bırakılan bahşiş genellikle bu kupürlerde veriliyor. Havalimanında bozdurmak yerine Türkiye’den küçük kupür almak daha kolay.",
        ],
      },
    ],
    faqs: [
      {
        q: 'Miami’de ATM’den para çekmek pahalı mı?',
        a: "Genellikle iki ayrı ücret çıkar: ATM’nin kendi işletme ücreti ve kendi bankanızın yurt dışı çekim komisyonu. Toplamda tek bir çekim için birkaç dolarlık sabit maliyet oluşur, bu yüzden az miktarda çok kez çekmek yerine tek seferde daha büyük tutar çekmek mantıklıdır. Banka şubelerine ait ATM’ler, mağaza içindeki bağımsız makinelerden genellikle daha ucuzdur.",
      },
      {
        q: 'Miami’de Türk bankası kartı çalışır mı?',
        a: "Evet, uluslararası ağlara bağlı kartlar sorunsuz çalışır. Seyahat öncesi bankanıza yurt dışı kullanımı bildirmek, güvenlik nedeniyle kartın bloke edilmesini önler. Kartınızın günlük harcama ve çekim limitlerini de kontrol edin; otel ön provizyonu bu limiti beklenmedik şekilde doldurabilir.",
      },
      {
        q: 'Otel neden kartımdan fazladan tutar bloke etti?',
        a: "ABD’de oteller giriş sırasında olası ekstralar için kartınıza bir ön provizyon (hold) koyar. Bu tutar harcanmış değildir, yalnızca bloke edilmiştir ve çıkıştan birkaç iş günü sonra serbest bırakılır. Süre bankanıza göre değişir. Bu yüzden seyahat sırasında kart limitinizde bu tutar kadar boşluk bırakmakta fayda vardır.",
      },
    ],
  },
  {
    slug: 'miamide-internet-ve-esim',
    title: "Miami’de İnternet: eSIM mi, Roaming mi, Yerel Hat mı?",
    question: "Miami’de telefonla internete en ucuz nasıl bağlanılır?",
    excerpt:
      "Kısa tatiller için eSIM neredeyse her zaman en ucuz ve en pratik çözüm. Roaming kolay ama pahalı; yerel fiziksel hat ise ancak uzun kalışlarda mantıklı.",
    keywords: ['miami internet', 'amerika esim', 'abd roaming', 'miami sim kart'],
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    intro: [
      "Bir haftalık Miami tatilinde en mantıklı seçenek eSIM: uçağa binmeden satın alıyorsunuz, indiğinizde otomatik bağlanıyor ve veri paketleri roaming’e göre belirgin biçimde ucuz. Telefonunuzun eSIM desteklemesi ve operatör kilidinin olmaması yeterli.",
      "Roaming, hiçbir ayar yapmak istemeyenler için işe yarar ama en pahalı yöntemdir. Yerel fiziksel hat almak ise ancak bir aydan uzun kalışlarda ya da yerel numaraya ihtiyacınız varsa anlam kazanır.",
    ],
    sections: [
      {
        heading: 'eSIM nasıl çalışıyor?',
        body: [
          "eSIM, fiziksel kart yerine telefona yazılımla yüklenen bir hat. Satın aldığınızda bir QR kod alıyorsunuz; Türkiye’deyken yükleyip Miami’ye indiğinizde etkinleştiriyorsunuz. Kendi Türk hattınız telefonda kalmaya devam ediyor, yani WhatsApp numaranız değişmiyor.",
          "Paketler genellikle veri odaklı: arama ve SMS içermeyebilir. Bu çoğu gezgin için sorun değil, çünkü iletişim zaten internet üzerinden yürüyor. Kapsama alanı, eSIM sağlayıcısının hangi yerel operatörü kullandığına bağlı; Miami şehir merkezinde tüm büyük ağlar güçlü çekiyor.",
        ],
      },
      {
        heading: 'Roaming ne zaman mantıklı?',
        body: [
          "Roaming’in tek gerçek avantajı sıfır kurulum: uçaktan iner inmez telefonunuz çalışır. Türk operatörlerinin ABD için günlük ya da paket bazlı yurt dışı tarifeleri var ve kısa, iki-üç günlük seyahatlerde toplam fark küçük kalabiliyor.",
          "Bir haftadan uzun kalışlarda ise aradaki fark büyüyor. Ayrıca paketi aşan kullanımın birim ücreti çok yüksek olabildiği için, roaming tercih edecekseniz veri limitini telefon ayarlarından sınırlamak iyi bir önlem.",
        ],
      },
      {
        heading: 'Ücretsiz wifi yeterli olur mu?',
        body: [
          "Miami’de otel, kafe, alışveriş merkezi ve havalimanında ücretsiz wifi yaygın. Ancak yalnızca wifi’ye güvenmek, harita ve ulaşım uygulamalarının sokakta çalışmaması demek; Uber çağırmak ya da yön bulmak gerektiğinde bu ciddi bir kısıt.",
          "Halka açık wifi ağlarında bankacılık işlemi yapmaktan kaçının ya da güvenilir bir VPN kullanın. Otel wifi’si genellikle güvenlidir ama açık, şifresiz ağlar için aynı şey söylenemez.",
        ],
      },
    ],
    faqs: [
      {
        q: 'Telefonum eSIM destekliyor mu, nasıl anlarım?',
        a: "Son yılların çoğu amiral gemisi modeli eSIM destekler. Telefonunuzun ayarlar menüsünde hücresel/mobil ağ bölümünde \"eSIM ekle\" ya da \"mobil plan ekle\" seçeneğini görüyorsanız destekliyordur. Ayrıca cihazın operatör kilidi olmamalıdır; Türkiye’den faturalı alınan bazı cihazlarda bu kilit bulunabilir.",
      },
      {
        q: 'ABD’de yerel SIM kart almak mantıklı mı?',
        a: "Bir aydan uzun kalacaksanız ya da yerel bir telefon numarasına ihtiyacınız varsa evet. Ön ödemeli hatlar mağazalardan pasaportla alınabilir ve sınırsız veri paketleri sunar. Kısa tatillerde ise kurulum zahmeti ve mağazaya gitme zorunluluğu, eSIM’e göre avantajı ortadan kaldırır.",
      },
      {
        q: 'Miami’de wifi her yerde var mı?',
        a: "Otel, kafe, restoran, alışveriş merkezi, havalimanı ve birçok kamusal alanda ücretsiz wifi bulunur. Ancak sokakta, plajda, otobüste ve şehirlerarası yolda kesintisiz bağlantı beklemeyin. Harita ve ulaşım uygulamalarını sürekli kullanacaksanız mobil veri planı yapmak gerekir.",
      },
    ],
  },
  {
    slug: 'miamide-guvenlik-nelere-dikkat-etmeli',
    title: "Miami’de Güvenlik: Gerçekte Nelere Dikkat Etmek Gerekiyor?",
    question: "Miami turistler için güvenli bir şehir mi?",
    excerpt:
      "Miami’nin turistik bölgeleri gündüz rahatça gezilir. Asıl riskler şiddet değil; araçtan hırsızlık, plajda gözetimsiz eşya ve gece geç saatte yanlış bölgede kalmak.",
    keywords: ['miami güvenli mi', 'miami güvenlik', 'south beach gece', 'miami turist'],
    publishedAt: '2026-08-08',
    updatedAt: '2026-08-08',
    intro: [
      "Miami’nin turistlerin vakit geçirdiği bölgeleri — South Beach, Brickell, Downtown’ın canlı kısımları, Coral Gables, Coconut Grove — gündüz ve akşam erken saatlerde rahatça gezilebilir. Şehirle ilgili haberlerde öne çıkan olaylar genellikle ziyaretçilerin uğramadığı mahallelerde yaşanıyor.",
      "Gezginlerin gerçekten karşılaştığı sorunlar daha sıradan: park hâlindeki araçtan yapılan hırsızlıklar, plajda gözetimsiz bırakılan çanta ve gece geç saatte yürünen tenha sokaklar.",
    ],
    sections: [
      {
        heading: 'Araç ve otopark güvenliği neden ilk sırada?',
        body: [
          "Miami’de turistleri en çok etkileyen olay türü, park hâlindeki araçtan hırsızlık. Kural basit: araç içinde görünen hiçbir şey bırakmayın. Koltuğun üzerindeki bir sırt çantası, içi boş olsa bile camın kırılması için yeterli sebep sayılıyor.",
          "Bagaja koyacaksanız bunu park ettiğiniz yerde değil, yola çıkmadan önce yapın; park yerinde bagaja bir şey koyduğunuzu görmek de aynı sonucu doğuruyor. Kiralık araçlarda kiralama şirketinin etiketi aracı gözle görünür şekilde işaretleyebiliyor.",
        ],
      },
      {
        heading: 'Gece nerede dikkatli olmalı?',
        body: [
          "South Beach’in Ocean Drive hattı gece geç saatlere kadar canlı ve kalabalıktır; kalabalık kendi başına bir güvenlik unsuru. Buna karşılık aynı bölgenin arka sokakları geç saatte tenhalaşabiliyor. Otelinize dönerken ana caddeleri tercih edin.",
          "Downtown’ın bazı blokları mesai bitiminde tamamen boşalıyor. Wynwood da barların kapanmasından sonra hızla tenhalaşan bir bölge. Bu saatlerde yürümek yerine araç çağırmak en pratik çözüm.",
          "Aşırı alkol, Miami’de turistlerin başına gelen olayların büyük bölümünde ortak etken. Gece hayatı planlıyorsanız dönüş yolunu önceden düşünmek en etkili önlem.",
        ],
      },
      {
        heading: 'Acil durumda ne yapmalı?',
        body: [
          "Acil durumlarda aranacak numara 911; polis, ambulans ve itfaiye tek numara üzerinden yönlendiriliyor. Türkçe konuşan operatör garanti değildir, ancak çeviri hizmeti talep edilebiliyor.",
          "Pasaportunuzun bir fotokopisini ve dijital kopyasını ayrı yerde tutun; kaybolma durumunda konsolosluk işlemleri belirgin biçimde hızlanır. ABD’de sağlık hizmetleri çok pahalı olduğu için kapsamlı seyahat sağlık sigortası, güvenliğin en gözden kaçan parçası.",
        ],
      },
    ],
    faqs: [
      {
        q: 'South Beach gece güvenli mi?',
        a: "Ocean Drive ve Collins Avenue hattı gece geç saatlere kadar kalabalık ve hareketlidir; bu kalabalık kendi başına caydırıcıdır. Ancak arka sokaklar ve plaj tarafı gece tenhalaşır ve karanlıktır. Otelinize dönerken aydınlatılmış ana caddeleri kullanın, gece plajda yürümekten kaçının ve değerli eşyanızı gösterişli biçimde taşımayın.",
      },
      {
        q: 'Miami’de hangi bölgelerden uzak durmalı?',
        a: "Turistlerin programında zaten yer almayan bazı iç mahalleler, özellikle gece, ziyaretçiler için uygun değildir. Pratik kural şudur: navigasyon sizi tanımadığınız bir bölgeden geçiriyorsa araçtan inmeyin ve rota üzerinde durmayın. Otelinizin resepsiyonuna \"yürüyerek nereye kadar gidebilirim\" diye sormak, listeye bakmaktan daha güvenilir bir yöntemdir.",
      },
      {
        q: 'Plajda eşyalarımı nasıl korurum?',
        a: "En güvenli yöntem, plaja yalnızca gerekli olanı götürmektir: bir kart, telefon, havlu ve su. Kalabalık plajlarda gözetimsiz bırakılan çantalar hedef olur. Suya girerken eşyanızı yanınızdaki kişilere emanet edin ya da su geçirmez bir kılıfla yanınızda taşıyın. Aracınızda da hiçbir şey görünür durumda kalmasın.",
      },
    ],
  },
];
