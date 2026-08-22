/* Kasap Defteri — FİYAT KATMANI: İSTANBUL
 * ------------------------------------------------------------------
 * Anahtarlar data/content.js içindeki ürün `id` alanlarıyla birebir eşleşir.
 * Layout'a dokunmadan sadece bu dosya güncellenir.
 *
 * DURUM: tüm değerler placeholder (`---`). Gerçek liste Erenköy şubesinin
 * QR menüsünden gelecek; o çekim şu an ağ politikası nedeniyle engelli
 * (bkz. GOREVLER.md · görev 3). Fiyat geldiğinde `---` yerine yazın.
 *
 * Biçim: sembolsüz sayı dizesi, binlik ayırıcı nokta — '2.400'.
 * Para birimi sembolü tasarım gereği basılmaz.
 */
window.KasapPricing = window.KasapPricing || {};
window.KasapPricing.istanbul = {
  id: 'istanbul',
  label: 'İstanbul',
  source: 'BEKLEMEDE — SaltBae Burger Erenköy QR menüsü',
  prices: {
    /* Kasabın Seçimi */
    'lokum': '---',
    'fillet-mignon': '---',
    'saslik': '---',
    'cheese-steak-sandwich': '---',
    /* Steakhouse Ruhu, Burger Formu */
    'juicy-burger': '---',
    'lokum-burger': '---',
    'nusret-burger': '---',
    'saltbae-special': '---',
    'mushroom-burger': '---',
    'smoked-bbq-burger': '---',
    'avocado-burger': '---'
  }
};
