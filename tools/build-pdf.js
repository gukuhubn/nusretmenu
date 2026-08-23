/* Kasap Defteri — PDF üretimi
 * ------------------------------------------------------------------
 * Her mod için A4 PDF üretir ve output/ altına yazar.
 *
 * Kullanım:
 *   npm i playwright-core          (bir kez; tarayıcı indirmez)
 *   node tools/build-pdf.js        (tüm modlar)
 *   node tools/build-pdf.js C      (yalnız Mod C)
 *
 * Fiyat politikası mod bazlıdır (MODES.prices):
 *   'mask' → tüm fiyatlar '---' basılır (A ve B: fiyatsız prova)
 *   'on'   → data/pricing-<region>.js'teki gerçek değerler basılır (C)
 *
 * BASKI OPTİMİZASYONU (kalıcı adım): varlıklar basılmadan önce
 * output/.assets-opt/ altında ölçek + format optimizasyonundan geçer ve
 * sayfa optimize kopyaların bulunduğu geçici bir yerleşimden yüklenir:
 *   - mini-*  → en fazla 300 px genişlik
 *   - corner-*, page-medallion, seal → en fazla 480 px
 *   - diğer tüm görseller → en fazla 1400 px (tam genişlik ≈ 703 css px'in 2x'i)
 *   - opak görseller → JPEG q85 (<id>.jpg; çözümleyici png yoksa jpg dener)
 *   - şeffaflar → en fazla 1100 px + renk/alfa kuantizasyonlu PNG
 *     (çizgi gravürde görünmez fark, flate boyutunu ciddi düşürür)
 *   - optimize sürüm orijinalden büyükse orijinal korunur
 * Önbellek anahtarı kaynak dosyanın boyut+mtime'ıdır; değişmeyen varlık
 * yeniden işlenmez.
 *
 * Chromium yolu CHROMIUM_PATH ile verilebilir. Sayfa tamamen çevrimdışıdır.
 */
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'output');
const ASSETS = path.join(ROOT, 'menu', 'assets');
const OPT = path.join(OUT, '.assets-opt');          /* optimize görsel önbelleği */
const PACK = path.join(OUT, '.print-pack');         /* geçici baskı yerleşimi */

const CANDIDATES = [
  process.env.CHROMIUM_PATH,
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome',
].filter(Boolean);

const MODES = [
  { mode: 'A', file: 'kasap-defteri-mod-a.pdf', name: 'Mod A · İllüstrasyon', prices: 'mask' },
  { mode: 'B', file: 'kasap-defteri-mod-b.pdf', name: 'Mod B · Karanlık Portre', prices: 'mask' },
  { mode: 'C', file: 'kasap-defteri-mod-c.pdf', name: 'Mod C · Zengin Defter', prices: 'on' },
];

const maxWidthFor = (id) => {
  if (id.startsWith('mini-') || id.startsWith('branch-')) return 300;
  if (id.startsWith('corner-') || ['page-medallion', 'seal', 'founder-standing',
      'founder-glasses', 'ritual-motif'].includes(id)) return 480;
  return 1400;
};

/** Tüm png varlıklarını optimize edip OPT altına yazar. */
async function optimizeAssets(page) {
  fs.mkdirSync(OPT, { recursive: true });
  const files = fs.readdirSync(ASSETS).filter((f) => f.endsWith('.png'));
  let done = 0, kept = 0;
  for (const f of files) {
    const id = f.replace(/\.png$/, '');
    const src = path.join(ASSETS, f);
    const st = fs.statSync(src);
    const key = `${st.size}-${Math.round(st.mtimeMs)}`;
    const metaP = path.join(OPT, `${id}.key`);
    const outPng = path.join(OPT, `${id}.png`);
    const outJpg = path.join(OPT, `${id}.jpg`);
    if (fs.existsSync(metaP) && fs.readFileSync(metaP, 'utf8') === key &&
        (fs.existsSync(outPng) || fs.existsSync(outJpg))) { done++; continue; }
    const b64 = fs.readFileSync(src).toString('base64');
    const r = await page.evaluate(async ({ b64, maxW }) => {
      const img = new Image();
      img.src = 'data:image/png;base64,' + b64;   /* içerik koklanır (jpeg de olabilir) */
      await img.decode();
      /* önce alfa tespiti (orijinal boyutta örnekleme) */
      const probe = document.createElement('canvas');
      probe.width = Math.min(img.width, 256);
      probe.height = Math.min(img.height, 256);
      const pctx = probe.getContext('2d');
      pctx.drawImage(img, 0, 0, probe.width, probe.height);
      const pd = pctx.getImageData(0, 0, probe.width, probe.height).data;
      let alpha = false;
      for (let i = 3; i < pd.length; i += 16) { if (pd[i] < 250) { alpha = true; break; } }
      /* şeffaflar PDF'e ham flate girer: piksel sınırı daha sıkı */
      const cap = alpha ? Math.min(maxW, 1100) : maxW;
      const scale = Math.min(1, cap / img.width);
      const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, w, h);
      if (alpha) {
        /* kuantizasyon: rgb 5 bit, alfa 4 bit — flate çok daha iyi sıkışır */
        const d2 = ctx.getImageData(0, 0, w, h);
        const px = d2.data;
        for (let i = 0; i < px.length; i += 4) {
          px[i] = px[i] & 0xF8; px[i + 1] = px[i + 1] & 0xF8; px[i + 2] = px[i + 2] & 0xF8;
          px[i + 3] = px[i + 3] < 12 ? 0 : (px[i + 3] & 0xF0) | 0x0F;
        }
        ctx.putImageData(d2, 0, 0);
      }
      const url = alpha ? c.toDataURL('image/png') : c.toDataURL('image/jpeg', 0.85);
      return { b64: url.split(',')[1], alpha, scaled: scale < 1 };
    }, { b64, maxW: maxWidthFor(id) });
    const buf = Buffer.from(r.b64, 'base64');
    fs.rmSync(outPng, { force: true }); fs.rmSync(outJpg, { force: true });
    if (!r.scaled && buf.length >= st.size) {          /* kazanç yoksa orijinal kalır */
      fs.copyFileSync(src, outPng); kept++;
    } else {
      fs.writeFileSync(r.alpha ? outPng : outJpg, buf);
    }
    fs.writeFileSync(metaP, key);
    done++;
  }
  console.log(`varlık optimizasyonu: ${done} dosya (${kept} orijinal korundu)`);
}

/** menu/'nün optimize varlıklı geçici kopyasını kurar, index yolunu döndürür. */
function buildPrintPack() {
  fs.rmSync(PACK, { recursive: true, force: true });
  fs.mkdirSync(path.join(PACK, 'assets'), { recursive: true });
  const M = path.join(ROOT, 'menu');
  for (const e of ['index.html', 'css', 'js', 'data']) {
    fs.symlinkSync(path.join(M, e), path.join(PACK, e));
  }
  fs.symlinkSync(path.join(ASSETS, 'fonts'), path.join(PACK, 'assets', 'fonts'));
  for (const f of fs.readdirSync(ASSETS)) {
    if (f === 'fonts' || f === 'reference' || f === 'README.md') continue;
    if (f.endsWith('.svg')) {                          /* vektörler olduğu gibi */
      fs.symlinkSync(path.join(ASSETS, f), path.join(PACK, 'assets', f));
    }
  }
  for (const f of fs.readdirSync(OPT)) {
    if (f.endsWith('.png') || f.endsWith('.jpg')) {
      fs.copyFileSync(path.join(OPT, f), path.join(PACK, 'assets', f));
    }
  }
  return path.join(PACK, 'index.html');
}

(async () => {
  /* İsteğe bağlı mod filtresi: `node tools/build-pdf.js C` yalnız Mod C basar. */
  const only = process.argv.slice(2).map((s) => s.toUpperCase());
  const modes = only.length ? MODES.filter((m) => only.includes(m.mode)) : MODES;
  const exe = CANDIDATES.find((p) => fs.existsSync(p));
  if (!exe) throw new Error('Chromium bulunamadı — CHROMIUM_PATH verin.');
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: exe });
  const page = await browser.newPage();

  await page.goto('about:blank');
  await optimizeAssets(page);
  const indexPath = buildPrintPack();
  const PAGE = 'file://' + indexPath;

  for (const m of modes) {
    await page.goto(`${PAGE}?mode=${m.mode}&prices=${m.prices}`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    /* tüm görsel yuvaları dolana kadar bekle — büyük foto geç çözülebilir */
    await page.waitForFunction(() =>
      ![...document.querySelectorAll('image-slot[data-asset-id]')]
        .some((s) => !s.hasAttribute('data-filled')), { timeout: 10000 })
      .catch(() => console.warn(`${m.mode}: bazı yuvalar dolmadı (varlık eksik olabilir)`));
    await page.waitForTimeout(400);
    const n = await page.evaluate(() => document.querySelectorAll('.page').length);
    const dest = path.join(OUT, m.file);
    await page.pdf({ path: dest, width: '210mm', height: '297mm',
                     printBackground: true, preferCSSPageSize: true });
    const mb = (fs.statSync(dest).size / 1048576).toFixed(1);
    console.log(`${m.name}: ${n} sayfa → output/${m.file} (${mb} MB)`);
  }
  await browser.close();
  fs.rmSync(PACK, { recursive: true, force: true });
})();
