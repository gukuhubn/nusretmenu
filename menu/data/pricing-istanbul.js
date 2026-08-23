/* Kasap Defteri — FİYAT KATMANI: İSTANBUL
 * ------------------------------------------------------------------
 * Anahtarlar data/content.js içindeki ürün `id` alanlarıyla birebir eşleşir.
 * Layout'a dokunmadan sadece bu dosya güncellenir.
 *
 * KAYNAK: SaltBae Burger Erenköy FineDine QR menüsü (2026-08-22 çekimi,
 * ham veri: data/source-erenkoy.json). Eşleşme gerekçeleri: EKSIK_URUNLER.md.
 * TAHMİNİ işaretli 9 fiyat kaynakta yoktur; segment emsaliyle atanmıştır
 * (liste TESLIM.md'de) ve onaya tabidir.
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
    'meat-sushi': '1.150',            /* TAHMİNİ — çiğ et başlangıcı, Dana Carpaccio (1.250) emsal */
    'beef-tacos': '850',              /* TAHMİNİ — kaburga bazlı başlangıç, Dana Füme (775) üstü */
    'steak-tartar': '1.100',          /* TAHMİNİ — çiğ premium, carpaccio bandı */
    'crispy-baby-squid': '750',       /* TAHMİNİ — deniz başlangıcı */
    'burrata': '650',                 /* TAHMİNİ — peynir başlangıcı, salata bandı üstü */
    'mediterranean-greens': '550',    /* TAHMİNİ — salata bandı (470–580) */
    /* Kasabın Seçimi */
    'lokum': '2.100',                 /* ← Lokum */
    'fillet-mignon': '2.400',         /* TAHMİNİ — et hattı NY 2.300 / Dallas 2.600 arası */
    'saslik': '1.950',                /* ← Şaşlık */
    'cheese-steak-sandwich': '1.000', /* ← Steak Sandwich */
    /* Steakhouse Ruhu, Burger Formu */
    'juicy-burger': '795',            /* ← Juicy Burger */
    'lokum-burger': '1.050',          /* ← Lokum Burger */
    'nusret-burger': '850',           /* TAHMİNİ — sade imza burger, Saltbae Burger (825) bandı */
    'saltbae-special': '825',         /* ← Saltbae Burger (siyah ekmek) */
    'mushroom-burger': '875',         /* ← Triple Mushroom Burger */
    'smoked-bbq-burger': '825',       /* ← BarbeQ Burger (hibiskus tozu) */
    'avocado-burger': '795',          /* ← Avokado Burger */
    /* Ritüel */
    'nusret-special-24k': '2.900',    /* ← Gold Burger (yenilebilir altın) */
    /* Yanında */
    'fries': '175',                   /* ← Patates Kızartması */
    'spiced-fries': '225',            /* TAHMİNİ — sade 175 ile varyantlar (280–300) arası */
    'onion-crisps': '240',            /* ← Çıtır Yaprak Soğan */
    /* Tatlı Son */
    'baklava': '525'                  /* ← Havuç Dilim Baklava */
  }
};
