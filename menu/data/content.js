/* Kasap Defteri — İÇERİK (TR/EN)
 * ------------------------------------------------------------------
 * Bu dosya SADECE metin ve ürün verisi tutar. Layout'a ait hiçbir şey
 * burada yoktur; düzen css/menu.css + js/menu.js tarafından üretilir.
 * Fiyatlar burada DEĞİLDİR — data/pricing-*.js dosyalarına bakınız.
 *
 * Ürün `id` alanı fiyat modülleriyle eşleşme anahtarıdır. Bir ürünün
 * id'sini değiştirirseniz pricing dosyalarında da değiştirin.
 */
window.KasapContent = {

  brand: {
    /* Kapakta marka tipografik satırla değil kilit logoyla taşınır;
     * wordmark alanları bu revizyonda kaldırıldı. */
    docLine: 'SALTBAE BURGER · USTANIN DEFTERİ',
    versionLine: 'KONSEPT v1.0'
  },

  /* Üç sunum modu. Aynı içerik; C, A'nın süslemeli türevidir. */
  modes: {
    A: { id: 'A', label: 'MOD A · İLLÜSTRASYON', name: 'Mod A — İllüstrasyon' },
    B: { id: 'B', label: 'MOD B · KARANLIK PORTRE', name: 'Mod B — Karanlık Portre' },
    C: { id: 'C', label: 'MOD C · ZENGİN DEFTER', name: 'Mod C — Zengin Defter' }
  },

  cover: {
    title: 'Ustanın Defteri',
    titleEn: "THE MASTER'S LEDGER",
    /* Mod A kapağı: uzun defter girişi */
    ledgerTr: 'Bu defter bir kasap çırağının elinde başladı. Bıçağı tanımayı, eti dinlemeyi, ateşe saygı duymayı öğrendiği yıllarda tutuldu. Bugün aynı defter dünyanın sofralarında açılıyor. Her sayfada aynı söz geçerli: Et ciddiye alınır, gerisi şölendir.',
    ledgerEn: "This ledger began in the hands of a butcher's apprentice. It was kept through the years of learning the knife, listening to the meat, respecting the fire. Today the same ledger opens at tables around the world. One rule holds on every page: The meat is taken seriously. Everything else is celebration.",
    /* Mod B kapağı: tek cümlelik vecize */
    motoTr: 'Et ciddiye alınır, gerisi şölendir.',
    motoEn: 'The meat is taken seriously. Everything else is celebration.'
  },

  sections: {
    steaks: {
      numeral: 'II',
      titleLines: ['Ustanın Ayırdığı'],
      titleEn: "THE MASTER'S CUT",
      ledeTr: 'Bir ustayı usta yapan, sattığı et değil, kendine ayırdığı ettir. Bu sayfadakiler o etlerdir.',
      ledeEn: 'What makes a master is not the meat he sells, but the cuts he keeps for himself. These are those cuts.'
    },
    /* Manifesto: varsayılan olarak Mod A kapağında akar (cover.ledgerTr).
     * `body` doldurulursa AYRI bir manifesto sayfası olarak da basılır. */
    manifesto: {
      numeral: '',
      titleLines: ['Manifesto'],
      titleEn: 'MANIFESTO',
      body: null,      /* ← konsept dokümanı Bölüm 3 */
      bodyEn: null
    },

    /* I — Ateşten Önce (6 ürün) */
    starters: {
      numeral: 'I',
      titleLines: ['Ateşten Önce'],
      titleEn: 'BEFORE THE FIRE',
      ledeTr: 'Usta ateşi yakmadan önce elini alıştırır. Bu sayfa o hazırlığın sayfasıdır.',
      ledeEn: 'Before lighting the fire, the master warms up his hands. This page belongs to that preparation.',
      expect: 6
    },

    burgers: {
      numeral: 'III',
      /* Mod A'da iki satır, Mod B'de tek satır dizilir. */
      titleLines: ['Steakhouse Ruhu,', 'Burger Formu'],
      titleEn: 'STEAKHOUSE SOUL, BURGER FORM',
      ledeTr: "Her sabah çekilen 180 gram dana, her sabah pişen ekmek. Burger burada bir kısayol değil, steakhouse'un el sıkışmasıdır.",
      ledeEn: "180 grams of beef ground every morning, buns baked every morning. Here the burger is no shortcut. It is the steakhouse's handshake."
    },

    /* IV — Ritüel: tek ürünlük sahne sayfası (Nusret Special 24K Gold).
     * Altın vurgu SADECE bu sayfada kullanılır. */
    ritual: {
      numeral: 'IV',
      titleLines: ['Ritüel'],
      titleEn: 'THE RITUAL',
      ledeTr: 'Bazı sayfalar okunmaz, izlenir.',
      ledeEn: 'Some pages are not read. They are watched.',
      expect: 1
    },

    /* V — Yanında (3 ürün) + Tatlı Son (Baklava) aynı sayfada */
    sides: {
      numeral: 'V',
      titleLines: ['Yanında'],
      titleEn: 'ON THE SIDE',
      ledeTr: '',      /* Bölüm 3.5'te bölüm girişi yok — bilinçli boş */
      ledeEn: '',
      expect: 3
    },
    dessert: {
      titleLines: ['Tatlı Son'],
      titleEn: 'AFTER THE SALT',
      ledeTr: 'Tuzdan sonra bal gelir. Defter böyle kapanır.',
      ledeEn: 'After the salt comes the honey. This is how the ledger closes.',
      expect: 1
    },

    /* Kapanış sayfası (şimdilik yalnız Mod C basıyor) */
    journey: {
      titleLines: ['Ustanın Yolu'],
      titleEn: "THE MASTER'S JOURNEY",
      bodyTr: "Bu defter Erzurum'da bir kasap dükkanında açıldı. Bugün üç kıtada, aynı özenle tutuluyor. Her şube aynı deftere yazar: et ciddiye alınır, gerisi şölendir.",
      bodyEn: "This ledger was opened in a butcher's shop in Erzurum. Today it is kept, with the same care, on three continents. Every house writes in the same ledger: the meat is taken seriously, everything else is celebration.",
      /* Aktif şubenin altında basılan satır */
      hereTr: 'Bu defter burada açık.',
      hereEn: 'This ledger is open here.'
    }
  },

  /* Şube listesi — kapanış sayfasının alt yarısı. Şube bazlı baskıda
   * yalnız `aktif` bayrağı taşınır; sıra ve içerik ortaktır. */
  branches: [
    { sehir: 'İstanbul', mekan: 'Emaar Square', aktif: true },
    { sehir: 'İstanbul', mekan: 'Galataport', aktif: false },
    { sehir: 'İstanbul', mekan: 'Erenköy', aktif: false },
    { sehir: 'Dubai', mekan: 'Mall of the Emirates', aktif: false },
    { sehir: 'Riyad', mekan: '', aktif: false },
    { sehir: 'Doha', mekan: '', aktif: false },
    { sehir: 'New York', mekan: '', aktif: false },
    { sehir: 'Londra', mekan: '', aktif: false }
  ],

  /* Görsel yuvasının altındaki gravür kayıt satırı (yalnız Mod A/C kesim
   * diyagramında; Mod B'nin teknik etiket şeritleri final rötuşta kalktı). */
  captions: {
    cutDiagram: { left: 'DANA KESİM DİYAGRAMI', right: 'LOKUM VE BONFİLE BÖLGELERİ PİRİNÇ İLE İŞARETLİ' }
  },

  /* Ustanın işareti mührü — sayfa başına tek ürün taşır. */
  seal: { line1: 'USTANIN', line2: 'İŞARETİ' },

  items: {
    /* Her ürün: { id, name, seal, tr, en } — id fiyat modülünün anahtarıdır. */
    starters: [
      { id: 'meat-sushi', name: 'MEAT SUSHI', seal: true,
        tr: 'Çiğ etin en zarif hali. Dana bonfile, avokado ve parmesan; ustanın en beklenmedik imzası.',
        en: "Raw meat at its most elegant. Beef sirloin, avocado, parmesan; the master's most unexpected signature." },
      { id: 'beef-tacos', name: 'BEEF TACOS', seal: false,
        tr: 'On iki saat yavaş pişen kaburga, üç lokmalık sabırsızlık için.',
        en: 'Twelve hours of slow cooked ribs, folded into three impatient bites.' },
      { id: 'steak-tartar', name: 'STEAK TARTAR', seal: false,
        tr: 'Defterin en eski tarifi. Bıçakla çekilir, makineye emanet edilmez.',
        en: 'The oldest recipe in the ledger. Cut by knife, never trusted to a machine.' },
      { id: 'crispy-baby-squid', name: 'CRISPY BABY SQUID', seal: false,
        tr: 'Ateşin denize uzandığı tek an. Tartar sos ve közlenmiş limonla.',
        en: 'The one moment the fire reaches for the sea. With tartare sauce and grilled lemon.' },
      { id: 'burrata', name: 'BURRATA', seal: false,
        tr: 'Etin gölgesinde dinlenen süt. Fesleğen pesto ve çeri domates.',
        en: 'Milk resting in the shadow of the meat. Basil pesto and cherry tomatoes.' },
      { id: 'mediterranean-greens', name: 'AKDENİZ SALATASI', seal: false,
        tr: 'Nar, ceviz, keçi peyniri ve yeşil elma; bıçağın dokunmadığı sayfa.',
        en: 'Pomegranate, walnut, goat cheese, green apple; the one page the knife never touched.' }
    ],
    ritual: [
      { id: 'nusret-special-24k', name: 'NUSRET SPECIAL BURGER · 24K GOLD', seal: false,
        tr: 'Yenilebilir 24 ayar altına sarılı premium köfte, dana füme, çıtır soğan ve cheddar. Masada tamamlanan gösteriyle servis edilir. Defterin mührü.',
        en: 'A premium patty wrapped in edible 24 karat gold, with smoked beef, crispy onions and cheddar. Finished tableside, as a ceremony. The seal of the ledger.' }
    ],
    sides: [
      { id: 'fries', name: 'PATATES KIZARTMASI', seal: false,
        tr: 'Çelik kovada, kızgın ve bol. Endüstriyel lüksün en dürüst hali.',
        en: 'In a steel bucket, hot and generous. Industrial luxury at its most honest.' },
      { id: 'spiced-fries', name: 'BAHARATLI PATATES', seal: false,
        tr: 'Aynı kova, daha cesur bir el.',
        en: 'The same bucket, a bolder hand.' },
      { id: 'onion-crisps', name: 'ÇITIR SOĞAN', seal: false,
        tr: 'Sesiyle servis edilir; incelik gerisini anlatır.',
        en: 'Served with its own sound; the thinness tells the rest.' }
    ],
    desserts: [
      { id: 'baklava', name: 'BAKLAVA', seal: false,
        tr: 'Kırk kat sabır, bir kat şerbet.',
        en: 'Forty layers of patience, one layer of syrup.' }
    ],

    steaks: [
      { id: 'lokum', name: 'LOKUM', seal: true,
        tr: 'Adını yumuşaklığından alır. Bonfilenin kalbi, ateşte mühürlenir, tereyağıyla dinlendirilir.',
        en: 'Named after Turkish delight for its tenderness. The heart of the tenderloin, seared and rested in butter.' },
      { id: 'fillet-mignon', name: 'FILLET MIGNON', seal: false,
        tr: 'Defterin en sessiz sayfası. Az söz, çok et.',
        en: 'The quietest page in the ledger. Few words, much meat.' },
      { id: 'saslik', name: 'SASLIK', seal: false,
        tr: 'Şişte olgunlaşan kesimler, közün üstünde sabırla döner.',
        en: 'Skewered cuts, turning patiently over the embers.' },
      { id: 'cheese-steak-sandwich', name: 'CHEESE STEAK SANDWICH', seal: false,
        tr: "Steakhouse'un sokağa selamı. İnce kesim bonfile, eriyen peynir, sıcak ekmek.",
        en: "The steakhouse's nod to the street. Thin cut tenderloin, melting cheese, warm bread." }
    ],
    /* Sıra korunmalı: 2 sütunlu ızgarada sağ üst bölge (altın üçgen)
     * en yüksek marjlı iki ürüne denk gelir. */
    burgers: [
      { id: 'juicy-burger', name: 'JUICY BURGER', seal: false,
        tr: 'İsmi iddia değil, tarif. Dana füme, cheddar ve karamelize soğanla; peçeteye güvenmeyin.',
        en: 'The name is not a claim, it is a description. Smoked beef, cheddar, caramelized onion; do not trust the napkin.' },
      { id: 'lokum-burger', name: 'LOKUM BURGER', seal: false,
        tr: 'Köfte yerine marine bonfile. Kurallara aykırı, deftere sadık.',
        en: 'Marinated tenderloin instead of a patty. Against the rules, true to the ledger.' },
      { id: 'nusret-burger', name: 'NUSRET BURGER', seal: true,
        tr: 'Ustanın adını taşıyan tek burger. Sadeliği, kendine güvenidir.',
        en: "The only burger carrying the master's name. Its simplicity is its confidence." },
      { id: 'saltbae-special', name: 'SALTBAE SPECIAL', seal: false,
        tr: 'Mürekkep karası ekmeğiyle defterin en koyu sayfası. Dana füme ve karamelize soğanla.',
        en: 'The darkest page of the ledger, on its ink black bun. With smoked beef and caramelized onion.' },
      { id: 'mushroom-burger', name: 'MUSHROOM BURGER', seal: false,
        tr: 'Kestane, istiridye ve kültür mantarı; ormanın ete verdiği üç imza.',
        en: 'Chestnut, oyster and button mushrooms; three signatures the forest lends the meat.' },
      { id: 'smoked-bbq-burger', name: 'SMOKED BBQ BURGER', seal: false,
        tr: 'Berbekü, dana füme ve hibiskus tozu. Duman burada malzeme değil, mürekkeptir.',
        en: 'Barbecue, smoked beef and hibiscus dust. Here the smoke is not an ingredient, it is the ink.' },
      { id: 'avocado-burger', name: 'AVOCADO BURGER', seal: false,
        tr: 'Defterin yeşil sayfası. Ağırlığı etten, ferahlığı avokadodan.',
        en: 'The green page of the ledger. Its weight from the meat, its freshness from the avocado.' }
    ]
  }
};
