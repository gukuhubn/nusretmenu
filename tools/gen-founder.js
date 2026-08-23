/* Kurucu illüstrasyon seti — referans görsel destekli Gemini üretimi
 * ------------------------------------------------------------------
 * Model stratejisi:
 *   keşif/varyant  → gemini-3.1-flash-image   (--explore)
 *   finaller       → gemini-3-pro-image + assets/reference/founder/
 *                    fotoğrafları referans olarak (karakter tutarlılığı)
 *
 * Kullanım:
 *   GEMINI_API_KEY=... node tools/gen-founder.js               # tüm finaller
 *   GEMINI_API_KEY=... node tools/gen-founder.js --only founder-salt
 *   GEMINI_API_KEY=... node tools/gen-founder.js --explore founder-salt 2
 *
 * Not: Referans fotoğraflar konsept çalışması içindir; baskı finali için
 * orijinaller marka arşivinden alınacak (bkz. TESLIM.md).
 * ÜRETİMDEN SONRA alpha-key: founder-cutting, founder-counter,
 * founder-standing, founder-glasses, seal, page-medallion (founder-salt
 * opak sahne panelidir, key'lenmez).
 */
const fs = require('fs');
const path = require('path');

const KEY = process.env.GEMINI_API_KEY;
const REF = path.resolve(__dirname, '..', 'menu', 'assets', 'reference', 'founder');
const OUT = path.resolve(__dirname, '..', 'menu', 'assets');
const BASE = 'https://generativelanguage.googleapis.com/v1beta';
const PRO = 'gemini-3-pro-image';
const FLASH = 'gemini-3.1-flash-image';

const ENG = 'Vintage copperplate engraving illustration, fine crosshatching, ' +
  'single copper color line work on dark charcoal background, 19th century ' +
  'trade catalog aesthetic, flat 2D, consistent stroke weight, no photo look, ' +
  'no text, no watermark';

/* Her varlık: kullanılan referans fotoğraflar + sahne tarifi.
 * Referanslar YALNIZ duruş/karakter içindir; çıktı gravürdür. */
const ASSETS = [
  { id: 'founder-salt', ar: '21:9', refs: ['salt-gesture.jpg', 'cutting-warm.jpg'],
    /* Flash keşfinden seçilen kurgu: figür sağda sola dönük, tuz kolundan
     * süzülüyor, solda çelik tepside altın vurgulu burger, ışık huzmesi. */
    prompt: 'Using the attached photographs only as pose and character reference, draw an engraved scene: on the right side of the frame the same chef — hair in a bun, round sunglasses, white t-shirt — facing left, performing his famous salt sprinkle with the right arm raised high from the elbow, salt grains cascading down along his forearm and falling onto a burger on a steel tray at the left side of the frame, a single diagonal beam of light from upper left, luminous gold metallic accent only on the burger, everything else elegant single copper line work with fine crosshatching. ' + ENG },
  { id: 'founder-counter', ar: '21:9', refs: ['counter-pose.jpg'],
    prompt: 'Using the attached photograph only as pose and character reference, draw an engraved scene: the same chef — hair in a bun, sunglasses, white t-shirt — leaning forward on his folded arms over a butcher display counter, large cuts of meat arranged in the glass case below him, shelves of plates behind, wide horizontal composition. ' + ENG },
  { id: 'founder-cutting', ar: '21:9', refs: ['cutting-gold.jpg', 'cutting-window.jpg'],
    prompt: 'Using the attached photographs only as pose and character reference, draw an engraved horizontal band: the same chef — hair in a bun, round sunglasses, white t-shirt, black gloves — bent forward carving a large tomahawk steak on a wooden board with a long knife, thin wisps of steam, side view, wide banner composition with tapering empty space left and right. ' + ENG },
  { id: 'founder-standing', ar: '1:1', refs: ['standing-street.jpg', 'suit-portrait.jpg'],
    prompt: 'Using the attached photographs only as pose and character reference, draw an engraved full-figure portrait: the same man — hair in a bun, round sunglasses, waistcoat over white shirt — standing upright facing the viewer, confident calm stance, arms relaxed, full body from head to shoes, centered, generous empty margin around the figure. ' + ENG },
  { id: 'founder-glasses', ar: '1:1', refs: ['suit-portrait.jpg', 'cutting-warm.jpg'],
    prompt: 'Iconic round wire-frame sunglasses with dark lenses, drawn alone as a small emblem, front view, perfectly symmetric, elegant thin line work, centered with generous empty margin. ' + ENG },
  { id: 'seal', ar: '1:1', refs: ['suit-portrait.jpg'],
    prompt: 'Flat graphic circular stamp seal, rope border ring, at the center a small pair of round wire-frame sunglasses drawn in thin line art (referenced from the photo), letterpress ink texture, single copper color on dark charcoal background, straight frontal view, flat vector style emblem, no letters, no words, no numbers, no text of any kind' },
  { id: 'page-medallion', ar: '1:1', refs: ['suit-portrait.jpg'],
    prompt: 'Small circular ornamental medallion frame for a page number, rope and laurel wreath border, a tiny pair of round wire-frame sunglasses integrated at the top of the wreath, completely empty dark center, letterpress engraving texture, single copper color on dark charcoal background, no text, no letters, no numbers' },
];

const api = async (url, init) => {
  const r = await fetch(url, init);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} — ${(await r.text()).slice(0, 300)}`);
  return r.json();
};

async function render(model, prompt, ar, refs) {
  const parts = [{ text: prompt }];
  for (const f of refs || []) {
    parts.push({ inline_data: { mime_type: 'image/jpeg',
      data: fs.readFileSync(path.join(REF, f)).toString('base64') } });
  }
  const j = await api(`${BASE}/models/${model}:generateContent?key=${KEY}`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts }],
      generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: ar } } }),
  });
  const p = (j.candidates?.[0]?.content?.parts || [])
    .find((x) => x.inlineData?.data || x.inline_data?.data);
  const b64 = p && (p.inlineData?.data || p.inline_data?.data);
  if (!b64) throw new Error('yanıtta görsel yok: ' + JSON.stringify(j).slice(0, 200));
  return Buffer.from(b64, 'base64');
}

(async () => {
  if (!KEY) { console.error('GEMINI_API_KEY tanımlı değil.'); process.exit(1); }
  const argv = process.argv;
  if (argv.includes('--explore')) {
    const id = argv[argv.indexOf('--explore') + 1];
    const n = parseInt(argv[argv.indexOf('--explore') + 2] || '2', 10);
    const a = ASSETS.find((x) => x.id === id);
    if (!a) throw new Error('bilinmeyen id: ' + id);
    for (let i = 1; i <= n; i++) {
      const buf = await render(FLASH, a.prompt, a.ar, a.refs);
      const dest = path.join(OUT, `${id}-explore-v${i}.png`);
      fs.writeFileSync(dest, buf);
      console.log(`✓ keşif ${id} v${i} (${FLASH})`);
    }
    return;
  }
  const only = argv.includes('--only')
    ? argv[argv.indexOf('--only') + 1].split(',') : null;
  const list = only ? ASSETS.filter((a) => only.includes(a.id)) : ASSETS;
  let fail = 0;
  for (const a of list) {
    try {
      const buf = await render(PRO, a.prompt, a.ar, a.refs);
      fs.writeFileSync(path.join(OUT, `${a.id}.png`), buf);
      console.log(`✓ ${a.id} (${PRO}, ${a.refs.length} ref)`);
    } catch (e) { fail++; console.error(`✗ ${a.id}: ${e.message}`); }
  }
  process.exit(fail ? 2 : 0);
})();
