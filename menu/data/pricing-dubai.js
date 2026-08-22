/* Kasap Defteri — FİYAT KATMANI: DUBAI
 * ------------------------------------------------------------------
 * Anahtarlar data/content.js içindeki ürün `id` alanlarıyla birebir eşleşir.
 * Layout'a dokunmadan sadece bu dosya güncellenir.
 *
 * DURUM: tüm değerler placeholder (`---`). Dubai fiyat listesi henüz
 * verilmedi (bkz. GOREVLER.md · görev 3). Fiyat geldiğinde `---` yerine yazın.
 *
 * Biçim: sembolsüz sayı dizesi, binlik ayırıcı nokta — '2.400'.
 * Para birimi sembolü tasarım gereği basılmaz.
 */
window.KasapPricing = window.KasapPricing || {};
window.KasapPricing.dubai = {
  id: 'dubai',
  label: 'Dubai',
  source: 'BEKLEMEDE — Dubai fiyat listesi',
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
