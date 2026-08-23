/* Süsleme gravürlerinde koyu zemini gerçek şeffaflığa çevirir.
 * ------------------------------------------------------------------
 * Gemini çıktıları opak koyu zeminlidir; köşe süslemeleri, ayraç
 * vinyetleri ve madalyon sayfa üstüne bindiğinden zeminin şeffaf olması
 * gerekir. Luminance key: t0 altı tam şeffaf, t1 üstü tam opak,
 * arası smoothstep. motif-flame ayrıca kendi ince çerçevesinden
 * arındırılır (%9 kenar kırpma).
 *
 * gen-assets.js bu varlıkları yeniden ürettikten SONRA çalıştırın:
 *   node tools/alpha-key.js
 *   node tools/alpha-key.js --only mini-fries,band-grill
 *
 * DİKKAT: zaten işlenmiş bir dosyayı ikinci kez işlemek zararsızdır,
 * ama motif-flame gibi kırpmalı girdiler her turda yeniden kırpılır —
 * yalnız yeniden üretilen id'leri --only ile verin.
 */
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const ASSETS = path.resolve(__dirname, '..', 'menu', 'assets');
const FILES = [
  { id: 'corner-knife' }, { id: 'corner-hook' },
  { id: 'corner-salt' }, { id: 'corner-laurel' },
  { id: 'divider-vignette-1' }, { id: 'divider-vignette-2' },
  { id: 'page-medallion' },
  { id: 'motif-flame', crop: 0.09 },
  /* Final cila: ürün mini gravürleri */
  ...['meat-sushi', 'beef-tacos', 'steak-tartar', 'crispy-baby-squid',
      'burrata', 'mediterranean-greens', 'lokum', 'fillet-mignon',
      'saslik', 'cheese-steak-sandwich', 'juicy-burger', 'lokum-burger',
      'nusret-burger', 'saltbae-special', 'mushroom-burger',
      'smoked-bbq-burger', 'avocado-burger', 'fries', 'onion-crisps',
      'baklava'].map((s) => ({ id: 'mini-' + s })),
  /* Final cila: dolgu bantları ve tezhip ayracı (ritual-hero opak kalır) */
  { id: 'ritual-band' }, { id: 'band-grill' }, { id: 'band-knives' },
  { id: 'band-mezze' }, { id: 'divider-honey' }, { id: 'band-route' },
  /* ritual-gold-leaf'in C köşe motifi için şeffaf türevi; kaynak dosya
   * (Mod A vinyetli kullanım) olduğu gibi kalır. Türev yoksa üretimden
   * önce kopyalanmalıdır: cp ritual-gold-leaf.png ritual-motif.png */
  /* Kaynakta yumuşak gri ışıma var; standart eşik onu sızdırır —
   * daha sert eşikle yalnız bakır çizgi kalır. */
  { id: 'ritual-motif', t0: 95, t1: 150 },
];
const CANDIDATES = [
  process.env.CHROMIUM_PATH,
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome',
].filter(Boolean);

(async () => {
  const argv = process.argv;
  const only = argv.includes('--only')
    ? argv[argv.indexOf('--only') + 1].split(',') : null;
  const list = only ? FILES.filter((f) => only.includes(f.id)) : FILES;
  const exe = CANDIDATES.find((p) => fs.existsSync(p));
  if (!exe) throw new Error('Chromium bulunamadı — CHROMIUM_PATH verin.');
  const browser = await chromium.launch({ executablePath: exe });
  const page = await browser.newPage();
  for (const f of list) {
    const p = path.join(ASSETS, `${f.id}.png`);
    if (!fs.existsSync(p)) { console.log(`- ${f.id}: dosya yok, atlandı`); continue; }
    const b64 = fs.readFileSync(p).toString('base64');
    const out = await page.evaluate(async ({ b64, crop, t0: T0, t1: T1 }) => {
      const img = new Image();
      img.src = 'data:image/png;base64,' + b64;   /* tarayıcı gerçek formatı koklar */
      await img.decode();
      const mx = crop ? Math.round(img.width * crop) : 0;
      const my = crop ? Math.round(img.height * crop) : 0;
      const w = img.width - 2 * mx, h = img.height - 2 * my;
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, mx, my, w, h, 0, 0, w, h);
      const d = ctx.getImageData(0, 0, w, h);
      const px = d.data;
      const t0 = T0 || 58, t1 = T1 || 115;
      for (let i = 0; i < px.length; i += 4) {
        const lum = Math.max(px[i], px[i + 1], px[i + 2]);
        let a = (lum - t0) / (t1 - t0);
        a = a < 0 ? 0 : a > 1 ? 1 : a;
        a = a * a * (3 - 2 * a);
        px[i + 3] = Math.round(a * 255);
      }
      ctx.putImageData(d, 0, 0);
      return c.toDataURL('image/png').split(',')[1];
    }, { b64, crop: f.crop, t0: f.t0, t1: f.t1 });
    fs.writeFileSync(p, Buffer.from(out, 'base64'));
    console.log(`✓ ${f.id}${f.crop ? ' (kırpıldı + keyed)' : ' (keyed)'}`);
  }
  await browser.close();
})();
