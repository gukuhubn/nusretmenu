/* Ürün fotoğrafı işleme hattı — katalog görünümünü kırar
 * ------------------------------------------------------------------
 * dark  : koyu portre — kontrast S-eğrisi, sıcak ton, güçlü vinyet,
 *         parlak stüdyo zemini loş krem-kahveye çeker (Mod D)
 * light : riviera — siyahları kaldırır, krem yıkama, hafif sıcaklık (Mod E)
 *
 * Kullanım:
 *   node tools/photo-treat.js dark  <girdi> <çıktı> [maxW]
 *   node tools/photo-treat.js light <girdi> <çıktı> [maxW]
 */
const { chromium } = require('playwright-core');
const fs = require('fs');

const [, , MODE, SRC, DST, MAXW] = process.argv;
if (!['dark', 'light'].includes(MODE) || !SRC || !DST) {
  console.error('kullanım: node tools/photo-treat.js dark|light <in> <out> [maxW]');
  process.exit(1);
}
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
  const out = await page.evaluate(async ({ b64, mode, maxW }) => {
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
    const cx = w / 2, cy = h / 2, maxR = Math.hypot(cx, cy);
    /* uyarlanabilir güç: parlak stüdyo karesi daha sert bastırılır */
    let sum = 0, n = 0;
    for (let i = 0; i < px.length; i += 40) { sum += (px[i] + px[i + 1] + px[i + 2]) / 3; n++; }
    const avg = sum / n / 255;
    const studio = avg > 0.52;                 /* beyaz zeminli katalog çekimi */
    const GM = studio ? 1.9 : 1.35;
    const MUL = studio ? [0.86, 0.80, 0.66] : [0.94, 0.90, 0.80];
    const VIG = studio ? 0.62 : 0.5;
    const smooth = (a, b, x) => {
      let t = (x - a) / (b - a); t = t < 0 ? 0 : t > 1 ? 1 : t;
      return t * t * (3 - 2 * t);
    };
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        let r = px[i] / 255, g = px[i + 1] / 255, b2 = px[i + 2] / 255;
        if (mode === 'dark') {
          /* parlakları bastır + kontrast + sıcak ton + vinyet */
          r = Math.pow(r, GM) * MUL[0]; g = Math.pow(g, GM) * MUL[1]; b2 = Math.pow(b2, GM) * MUL[2];
          const piv = 0.34, k = 1.22;
          r = piv + (r - piv) * k; g = piv + (g - piv) * k; b2 = piv + (b2 - piv) * k;
          const rr = Math.hypot(x - cx, y - cy) / maxR;
          const vig = 1 - VIG * smooth(0.38, 1.02, rr);
          r *= vig; g *= vig; b2 *= vig;
          /* gölgeleri sayfa tonuna ısıt */
          r += 0.045 * (1 - r); g += 0.028 * (1 - g); b2 += 0.012 * (1 - b2);
        } else {
          /* light: siyahları kaldır, krem yıkama, hafif soluk */
          r = 0.09 + r * 0.88; g = 0.085 + g * 0.87; b2 = 0.07 + b2 * 0.83;
          const mix = 0.14;              /* krem (#F6F1E7) yönünde yıkama */
          r = r * (1 - mix) + 0.965 * mix;
          g = g * (1 - mix) + 0.945 * mix;
          b2 = b2 * (1 - mix) + 0.905 * mix;
          const rr = Math.hypot(x - cx, y - cy) / maxR;
          const vig = 1 - 0.10 * smooth(0.55, 1.05, rr);
          r *= vig; g *= vig; b2 *= vig;
        }
        px[i] = Math.max(0, Math.min(255, Math.round(r * 255)));
        px[i + 1] = Math.max(0, Math.min(255, Math.round(g * 255)));
        px[i + 2] = Math.max(0, Math.min(255, Math.round(b2 * 255)));
      }
    }
    ctx.putImageData(d, 0, 0);
    return c.toDataURL('image/jpeg', 0.9).split(',')[1];
  }, { b64, mode: MODE, maxW: MAXW ? parseInt(MAXW, 10) : 1400 });
  fs.writeFileSync(DST, Buffer.from(out, 'base64'));
  console.log(`✓ ${MODE} → ${DST}`);
  await browser.close();
})();
