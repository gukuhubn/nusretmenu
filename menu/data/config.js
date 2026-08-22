/* Kasap Defteri — YAPILANDIRMA
 * ------------------------------------------------------------------
 * Tek dokunulacak yer burası. URL parametreleri geçici olarak ezer:
 *   index.html?mode=A     → Mod A (illüstrasyon), 3 sayfa
 *   index.html?mode=B     → Mod B (karanlık portre), 3 sayfa
 *   index.html?mode=AB    → altı sayfa arka arkaya (karşılaştırma / tam set)
 *   index.html?region=dubai&prices=off
 */
window.KasapConfig = {
  /* 'A' | 'B' | 'AB' */
  mode: 'A',

  /* 'istanbul' | 'dubai' — data/pricing-<region>.js dosyasından okunur */
  region: 'istanbul',

  /* false → fiyat sütunu tamamen gizlenir (fiyatsız baskı) */
  showPrices: true,

  /* assets/ içinde bir varlık ararken denenecek uzantılar, bu sırayla.
   * assets/cut-diagram.png düştüğü an slot kendiliğinden dolar. */
  assetExtensions: ['webp', 'png', 'jpg', 'jpeg', 'svg']
};
