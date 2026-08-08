import type { Guide } from './types';

export const plajlar: Guide = {
  slug: 'plajlar',
  number: '05',
  title: "Miami Plajları: Hangi Plaj Kime Göre?",
  navLabel: 'Plajlar',
  question: "Miami'de hangi plaja gitmek gerekir?",
  excerpt:
    "South Beach kalabalık ve canlı, Crandon Park sığ ve sakin, Haulover geniş ve rüzgârlı. Miami'de plaj seçimi manzaradan çok dalga, otopark ve gölge meselesi.",
  keywords: [
    'miami plajları',
    'south beach plaj',
    'miami en iyi plaj',
    'key biscayne plaj',
    'miami plaj otopark',
  ],
  updated: '2026-08-08',
  intro: [
    "Miami'de deniz yıl boyunca girilebilir sıcaklıkta, ama plajlar birbirinden belirgin biçimde farklı. Kalabalık ve hareket isteyenler için South Beach, sığ ve dalgasız su arayan aileler için Key Biscayne tarafı, gölge ve piknik masası isteyenler için ise büyük park plajları uygun.",
    "Aşağıda plajlar karaktere göre sıralanıyor; her birinde otopark, gölge ve dalga durumu ayrı ayrı belirtildi çünkü Miami'de günü asıl belirleyen bunlar.",
  ],
  quickFacts: [
    { label: 'Deniz suyu', value: 'Kışın ~24 °C, yazın ~30 °C' },
    { label: 'En kalabalık', value: 'South Beach, 5.–14. caddeler' },
    { label: 'En sakin su', value: 'Crandon Park, Matheson Hammock' },
    { label: 'En çok gölge', value: 'Crandon, Bill Baggs, Haulover' },
    { label: 'Plajda alkol', value: 'Yasak' },
    { label: 'Bayrak sistemi', value: 'Kırmızı: tehlikeli · Mor: deniz canlısı' },
  ],
  sections: [
    {
      heading: 'South Beach hangi durumda doğru seçim?',
      body: [
        "South Beach, Lummus Park boyunca uzanan geniş kumsalıyla Miami'nin simge plajı. Renkli cankurtaran kulübeleri, palmiyeler ve arkasındaki Ocean Drive silueti buranın fotoğrafını tanıdık kılıyor. Kum geniş, deniz açık ve genellikle hafif dalgalı.",
        "Avantajı erişim: otelden yürüyerek gidebilir, çıkışta restoranlara ulaşabilirsiniz. Dezavantajı kalabalık ve doğal gölgenin neredeyse hiç olmaması. Şezlong ve şemsiye kiralamak günlük ücrete bağlı; kendi şemsiyenizi getirmek en ekonomik yol.",
        "Daha az kalabalık isteyip South Beach'ten kopmak istemiyorsanız 1.–3. caddeler arasındaki güney uç ya da 15. caddenin kuzeyi belirgin biçimde sakinleşir.",
      ],
    },
    {
      heading: 'Aileler için en uygun plajlar hangileri?',
      body: [
        "Key Biscayne'deki Crandon Park, Miami'nin ailelere en uygun plajı: doğal bir resif hattı dalgaları kırdığı için su uzun bir mesafe boyunca sığ ve sakin kalıyor. Gölgelikli piknik alanları, tuvaletler ve otopark düzenli.",
        "Aynı adanın güney ucundaki Bill Baggs Cape Florida Eyalet Parkı, tarihî deniz feneriyle birlikte sakin bir kumsal sunuyor; ağaçlar sayesinde gölge bulmak South Beach'ten çok daha kolay.",
        "Coral Gables tarafındaki Matheson Hammock Park'ta ise deniz suyuyla dolan yapay bir atol havuzu var: dalgasız, sığ ve küçük çocuklar için Miami'deki en güvenli su alanlarından biri. Buna karşılık kum plajı beklemeyin, burası daha çok bir park.",
      ],
      list: [
        'Crandon Park — sığ, dalgasız, gölgeli, piknik alanlı',
        'Bill Baggs Cape Florida — fenerli, ağaçlı, sakin',
        'Matheson Hammock — dalgasız atol havuzu, küçük çocuklar için',
        'Surfside ve Bal Harbour — düzenli, kalabalıksız, oteller yakın',
        'North Beach (Miami Beach) — geniş kum, aile ağırlıklı',
      ],
    },
    {
      heading: 'Kalabalıktan kaçmak isteyenler nereye gitmeli?',
      body: [
        "Miami Beach'in kuzeyi genel olarak güneyinden sakin. Surfside ve Bal Harbour küçük ölçekli ve düzenli; North Beach ise aynı kumsalı çok daha az kalabalıkla sunuyor.",
        "Haulover Park, geniş ve uzun bir plaj; kuzey bölümünde giyimin isteğe bağlı olduğu, işaretlerle ayrılmış ayrı bir kesim bulunuyor. Bu bölüm açıkça levhalarla belirtildiği için yanlışlıkla girme ihtimali düşük, ancak ailece giderken park girişinde yönü teyit etmek işi garantiye alır.",
        "Virginia Key'deki Historic Virginia Key Beach Park, şehrin ayrımcılık dönemine ait tarihiyle birlikte gezilebilen, kalabalıktan uzak bir alan.",
      ],
    },
    {
      heading: 'Plaj güvenliği: bayraklar, akıntı ve deniz canlıları',
      body: [
        "Florida plajlarında renkli bayrak sistemi kullanılıyor ve bu işaretler tavsiye değil uyarı niteliğinde. Cankurtaransız bölgelerde denize girmemek en temel kural; Miami'de akıntı South Beach'te bile beklenmedik şekilde güçlenebiliyor.",
        "Rip current, yani çeken akıntı, kıyıya dik ve hızlı bir su kanalı oluşturur. Kapıldığınızda yapılacak şey kıyıya doğru yüzmeye çalışmak değil, kıyıya paralel yüzerek akıntıdan çıkmaktır.",
        "Kış ve rüzgârlı dönemlerde kıyıya vuran ve mavi balon görünümündeki Portekiz savaş gemisi (Portuguese man o' war) yakıcıdır; kumda ölü görünenler bile sokabilir. Mor bayrak tam olarak bu tür deniz canlısı uyarısı için kullanılır.",
      ],
      table: {
        caption: 'Florida plaj bayrakları',
        columns: ['Bayrak', 'Anlamı'],
        rows: [
          ['Yeşil', 'Sakin deniz, yine de dikkat'],
          ['Sarı', 'Orta akıntı ve dalga'],
          ['Kırmızı', 'Yüksek tehlike'],
          ['Çift kırmızı', 'Deniz kapalı, girmek yasak'],
          ['Mor', 'Tehlikeli deniz canlısı görüldü'],
        ],
        note: 'Bayrak sistemi ulusaldır; uygulama ve cankurtaran saatleri plaja göre değişir. Girişteki kuleyi kontrol edin.',
      },
    },
    {
      heading: 'Otopark, sargassum ve kurallar',
      body: [
        "Miami Beach'te sokak parkı ücretli ve genellikle mobil uygulama üzerinden ödeniyor; yaz ve hafta sonlarında boş yer bulmak zor. Katlı otoparklar daha güvenilir bir seçenek. Key Biscayne ve Matheson Hammock gibi park plajlarında ise araç başına giriş ücreti alınıyor.",
        "İlkbahar sonu ile yaz arasında kıyıya sargassum adı verilen kahverengi deniz yosunu vurabilir. Miktarı yıldan yıla ve haftadan haftaya değişir; belediye ekipleri temizler ama bazı günlerde kokusu ve görüntüsü rahatsız edici olabilir.",
        "Plajlarda alkol tüketimi yasak ve denetleniyor. Miami Beach ayrıca plaj ve parklarda sigara içilmesini yasakladı. Ateş yakmak, çadır kurmak ve bazı plajlarda köpek getirmek de kurallara tabi; levhaları okumakta fayda var.",
      ],
      note: 'Değerli eşyanızı plajda gözetimsiz bırakmayın. Araç içinde görünen çanta, otopark hırsızlıklarının en yaygın sebebi.',
    },
  ],
  faqs: [
    {
      q: "Miami'de deniz hangi aylarda girilir?",
      a: "Pratikte yılın tamamında. Deniz suyu sıcaklığı kışın 24 derece civarına iner, yazın 30 dereceye kadar çıkar. Ocak ve şubatta hava sıcaklığı soğuk cephelerle birlikte düşebildiği için denize girmek serin gelebilir, ancak su sıcaklığı Akdeniz'in yaz ortası değerlerine yakındır. Asıl kısıtlayıcı unsur mevsim değil, o günkü dalga ve akıntı durumudur.",
    },
    {
      q: 'Çocuklu ailelere en uygun Miami plajı hangisi?',
      a: "Key Biscayne'deki Crandon Park en dengeli seçenektir: doğal bir resif dalgaları kırdığı için su uzun mesafe boyunca sığ kalır, gölgelikli piknik alanları ve düzenli tuvaletler vardır. Çok küçük çocuklar için Matheson Hammock Park'ın deniz suyuyla dolan atol havuzu dalgasızdır. Miami Beach tarafında kalmak istiyorsanız Surfside ve North Beach, South Beach'ten belirgin biçimde sakindir.",
    },
    {
      q: 'Miami plajlarında şezlong ücretli mi?',
      a: "Kamuya açık plajlarda kumsala girmek ücretsizdir; şezlong ve şemsiye ise plajda hizmet veren işletmelerden ya da otelinizden kiralanır ve günlük ücreti vardır. Otelinizin plaj hizmeti varsa bu ücret bazen resort fee'ye dahildir, bazen değildir; rezervasyon öncesi sormakta fayda var. Kendi şemsiyenizi getirmek en ekonomik çözümdür, çünkü South Beach'te doğal gölge neredeyse hiç yoktur.",
    },
    {
      q: 'Sargassum yosunu Miami plajlarını ne kadar etkiliyor?',
      a: "Etkisi mevsime ve yıla göre değişir; genellikle ilkbahar sonundan yaz sonuna kadar olan dönemde kıyıya vurur. Bazı haftalar hiç fark edilmez, bazı haftalar kumsalın bir bölümünü kaplar ve kokar. Belediye ekipleri düzenli temizlik yapar. Gitmeden birkaç gün önce güncel plaj fotoğraflarına bakmak, o dönemin durumu hakkında en gerçekçi fikri verir.",
    },
    {
      q: 'Miami plajlarına köpek götürülebilir mi?',
      a: "Çoğu kamuya açık plajda evcil hayvan yasaktır ve para cezası uygulanabilir. Belirli parklarda köpeklere ayrılmış alanlar bulunur; Haulover Park bunlardan biridir. Kurallar plaj ve şehir bazında değiştiği için, gitmeden önce ilgili parkın resmî sayfasından kontrol edin. Rehber köpekler bu kısıtlamanın dışındadır.",
    },
  ],
  related: ['gezilecek-yerler', 'hava-durumu', 'ailece-miami'],
};
