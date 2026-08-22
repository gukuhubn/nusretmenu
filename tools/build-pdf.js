/* Kasap Defteri — PDF üretimi
 * ------------------------------------------------------------------
 * Mod A ve Mod B için ayrı birer A4 PDF üretir ve output/ altına yazar.
 *
 * Kullanım:
 *   npm i playwright-core          (bir kez; tarayıcı indirmez)
 *   node tools/build-pdf.js
 *
 * Chromium yolu CHROMIUM_PATH ile verilebilir; verilmezse yaygın
 * konumlar denenir. Sayfa tamamen çevrimdışıdır (fontlar gömülü),
 * bu yüzden üretim ağ gerektirmez.
 */
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'output');
const PAGE = 'file://' + path.join(ROOT, 'menu', 'index.html');

const CANDIDATES = [
  process.env.CHROMIUM_PATH,
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome',
].filter(Boolean);

const MODES = [
  { mode: 'A', file: 'kasap-defteri-mod-a.pdf', name: 'Mod A · İllüstrasyon' },
  { mode: 'B', file: 'kasap-defteri-mod-b.pdf', name: 'Mod B · Karanlık Portre' },
];

(async () => {
  const exe = CANDIDATES.find((p) => fs.existsSync(p));
  if (!exe) throw new Error('Chromium bulunamadı — CHROMIUM_PATH verin.');
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: exe });
  const page = await browser.newPage();
  for (const m of MODES) {
    await page.goto(`${PAGE}?mode=${m.mode}`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    const n = await page.evaluate(() => document.querySelectorAll('.page').length);
    const dest = path.join(OUT, m.file);
    await page.pdf({ path: dest, width: '210mm', height: '297mm',
                     printBackground: true, preferCSSPageSize: true });
    console.log(`${m.name}: ${n} sayfa → output/${m.file}`);
  }
  await browser.close();
})();
