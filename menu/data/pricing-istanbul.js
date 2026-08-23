/* Kasap Defteri — FİYAT KATMANI: İSTANBUL
 * ------------------------------------------------------------------
 * Anahtarlar data/content.js içindeki ürün `id` alanlarıyla birebir eşleşir.
 * Layout'a dokunmadan sadece bu dosya güncellenir.
 *
 * KAYNAK: SaltBae Burger Erenköy FineDine QR menüsü (2026-08-22 çekimi,
 * ham veri: data/source-erenkoy.json). Eşleşme gerekçeleri ve kaynakta
 * karşılığı olmayan ürünler: EKSIK_URUNLER.md. `---` = kaynakta fiyat yok.
 *
 * Biçim: sembolsüz sayı dizesi, binlik ayırıcı nokta — '2.400'.
 * Para birimi sembolü tasarım gereği basılmaz.
 */
window.KasapPricing = window.KasapPricing || {};
window.KasapPricing.istanbul = {
  id: 'istanbul',
  label: 'İstanbul',
  source: 'SaltBae Burger Erenköy QR menüsü · FineDine · 2026-08-22',
  prices: {
    /* Ateşten Önce — kaynakta karşılığı yok (bkz. EKSIK_URUNLER.md) */
    'meat-sushi': '---',
    'beef-tacos': '---',
    'steak-tartar': '---',
    'crispy-baby-squid': '---',
    'burrata': '---',
    'mediterranean-greens': '---',
    /* Kasabın Seçimi */
    'lokum': '2.100',                 /* ← Lokum */
    'fillet-mignon': '---',           /* kaynakta yok */
    'saslik': '1.950',                /* ← Şaşlık */
    'cheese-steak-sandwich': '1.000', /* ← Steak Sandwich */
    /* Steakhouse Ruhu, Burger Formu */
    'juicy-burger': '795',            /* ← Juicy Burger */
    'lokum-burger': '1.050',          /* ← Lokum Burger */
    'nusret-burger': '---',           /* kaynakta yok */
    'saltbae-special': '825',         /* ← Saltbae Burger (siyah ekmek) */
    'mushroom-burger': '875',         /* ← Triple Mushroom Burger */
    'smoked-bbq-burger': '825',       /* ← BarbeQ Burger (hibiskus tozu) */
    'avocado-burger': '795',          /* ← Avokado Burger */
    /* Ritüel */
    'nusret-special-24k': '2.900',    /* ← Gold Burger (yenilebilir altın) */
    /* Yanında */
    'fries': '175',                   /* ← Patates Kızartması */
    'spiced-fries': '---',            /* kaynakta yok */
    'onion-crisps': '240',            /* ← Çıtır Yaprak Soğan */
    /* Tatlı Son */
    'baklava': '525'                  /* ← Havuç Dilim Baklava */
  }
};
