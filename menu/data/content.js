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
    wordmarkTop: 'SALTBAE',
    wordmarkMain: 'BURGER',
    docLine: 'SALTBAE BURGER · KASAP DEFTERİ',
    versionLine: 'KONSEPT v1.0'
  },

  /* İki sunum modu. Aynı içerik, iki görsel dil. */
  modes: {
    A: { id: 'A', label: 'MOD A · İLLÜSTRASYON', name: 'Mod A — İllüstrasyon' },
    B: { id: 'B', label: 'MOD B · KARANLIK PORTRE', name: 'Mod B — Karanlık Portre' }
  },

  cover: {
    title: 'Kasap Defteri',
    titleEn: "THE BUTCHER'S LEDGER",
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
      titleLines: ['Kasabın Seçimi'],
      titleEn: "THE BUTCHER'S CUT",
      ledeTr: 'Bir kasabı ustalaştıran, sattığı et değil, kendine ayırdığı ettir. Bu sayfadakiler o etlerdir.',
      ledeEn: 'What makes a butcher a master is not the meat he sells, but the cuts he keeps for himself. These are those cuts.'
    },
    burgers: {
      numeral: 'III',
      /* Mod A'da iki satır, Mod B'de tek satır dizilir. */
      titleLines: ['Steakhouse Ruhu,', 'Burger Formu'],
      titleEn: 'STEAKHOUSE SOUL, BURGER FORM',
      ledeTr: "Her sabah çekilen 180 gram dana, her sabah pişen ekmek. Burger burada bir kısayol değil, steakhouse'un el sıkışmasıdır.",
      ledeEn: "180 grams of beef ground every morning, buns baked every morning. Here the burger is no shortcut. It is the steakhouse's handshake."
    }
  },

  /* Görsel yuvalarının altındaki gravür kayıt satırları. */
  captions: {
    cutDiagram: { left: 'DANA KESİM DİYAGRAMI', right: 'LOKUM VE BONFİLE BÖLGELERİ PİRİNÇ İLE İŞARETLİ' },
    heroSteak:  { left: 'SAYFANIN TABLOSU', right: 'SAYFA BAŞINA TEK HERO FOTOĞRAF' },
    heroBurger: { left: 'JUICY BURGER · SAYFANIN TABLOSU', right: '35° · TEK YÖNLÜ IŞIK · DUMAN' },
    coverB:     { left: 'TEK YÖNLÜ IŞIK · 35°', right: 'ÇELİK TEPSİ · KASAP KAĞIDI · KOYU AHŞAP' }
  },

  /* Kasabın işareti mührü — sayfa başına tek ürün taşır. */
  seal: { line1: 'KASABIN', line2: 'İŞARETİ' },

  items: {
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
