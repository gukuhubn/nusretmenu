/* Bakır duotone işleme — kurucu fotoğraf katmanı
 * ------------------------------------------------------------------
 * Fotoğrafı griye indirger, gölgeleri sayfa zeminine (#221d18),
 * ışıkları bakıra (#d8a05e) eşler; hafif gamma ile gravürle akraba,
 * koyu zemine oturan tonlama üretir.
 *
 * Kullanım:
 *   node tools/duotone.js <girdi.jpg> <çıktı.png> [maxW]
 *
 * Üretilen dosyalar opak PNG'dir; build-pdf optimizasyonu baskıda
 * bunları JPEG q85'e çevirir.
 */
const { chromium } = require('playwright-core');
const fs = require('fs');

const [, , SRC, DST, MAXW] = process.argv;
if (!SRC || !DST) { console.error('kullanım: node tools/duotone.js <in> <out> [maxW]'); process.exit(1); }
const CANDIDATES = [
  process.env.CHROMIUM_PATH,
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome',
].filter(Boolean);

(async () => {
  const exe = CANDIDATES.find((p) => fs.existsSync(p));
  const browser = await chromium.launch({ executablePath: exe });
  const page = await browser.newPage();
  const b64 = fs.readFileSync(SRC).toString('base64');
  const out = await page.evaluate(async ({ b64, maxW }) => {
    const img = new Image();
    img.src = 'data:image/jpeg;base64,' + b64;
    await img.decode();
    const scale = Math.min(1, (maxW || 1400) / img.width);
    const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, w, h);
    const d = ctx.getImageData(0, 0, w, h);
    const px = d.data;
    /* gölge → sayfa zemini, ışık → bakır; orta tonlar sıcak kahve */
    const A = [0x22, 0x1d, 0x18];            /* #221d18 */
    const B = [0xd8, 0xa0, 0x5e];            /* #d8a05e */
    for (let i = 0; i < px.length; i += 4) {
      let t = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
      t = Math.pow(t, 1.08);                 /* gölgeleri hafif derinleştir */
      px[i] = Math.round(A[0] + (B[0] - A[0]) * t);
      px[i + 1] = Math.round(A[1] + (B[1] - A[1]) * t);
      px[i + 2] = Math.round(A[2] + (B[2] - A[2]) * t);
    }
    ctx.putImageData(d, 0, 0);
    return c.toDataURL('image/png').split(',')[1];
  }, { b64, maxW: MAXW ? parseInt(MAXW, 10) : 1400 });
  fs.writeFileSync(DST, Buffer.from(out, 'base64'));
  console.log('✓ duotone →', DST);
  await browser.close();
})();
