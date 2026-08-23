/* Menü varlıkları — Gemini üretimi (konsept dokümanı Bölüm 5)
 * ------------------------------------------------------------------
 * Bölüm 5'teki prompt setini assets/README.md'deki asset-id'lere eşler
 * ve menu/assets/<id>.png olarak yazar — slot'lar kendiliğinden dolar.
 *
 * Kullanım:
 *   GEMINI_API_KEY=... node tools/gen-assets.js
 *   GEMINI_API_KEY=... node tools/gen-assets.js --only cut-diagram,seal
 *   GEMINI_API_KEY=... node tools/gen-assets.js --model gemini-3-pro-image
 *
 * Eşleme notları:
 * - 5.2.3 tuz jesti → ritual-gold-leaf (Mod A Ritüel dairesi): masada
 *   tamamlanan gösterinin çizgisi tuz serpme jestidir.
 * - 5.2.5 şiş/köz → motif-ember (Ateşten Önce geniş bandı).
 * - 5.2.6 ekmek kesiti → motif-side (Yanında bandı).
 * - 5.3.4 meat sushi → hero-starter (Ateşten Önce hero'su).
 * - cover-portrait 5.3.5'ten TÜREV ama ALTINSIZ: Bölüm 4.1 "altın
 *   yalnızca Ritüel sayfasında" kuralı kapakta altın varak yasaklar;
 *   kapak portresi duman + havada tuz taneleriyle 5.3.1 tabanından üretilir.
 * - 5.2.2 bıçak (motif-knife), 5.2.8 dokular (texture-kraft/leather) ve
 *   5.3.2 siyah ekmekli burger (hero-burger-black) slot'suz yedek varlıklardır.
 */
const fs = require('fs');
const path = require('path');

const KEY = process.env.GEMINI_API_KEY;
const OUT = path.resolve(__dirname, '..', 'menu', 'assets');
const BASE = 'https://generativelanguage.googleapis.com/v1beta';
const DEFAULT_MODEL = 'gemini-3-pro-image';

/* Bölüm 5.1 — stil kilitleri */
const ENG = 'Vintage copperplate engraving illustration, single color etching ' +
  'on dark charcoal background, copper metallic accent, fine crosshatching, ' +
  '19th century butcher trade manual aesthetic, no text, no watermark, ' +
  'isolated composition, high detail';
const PHOTO = 'Ultra realistic food photography, near black background, ' +
  'single hard side light, chiaroscuro, visible smoke, macro texture detail, ' +
  'steel tray and butcher paper props, dark wood surface, moody premium ' +
  'steakhouse aesthetic, 35 degree camera angle, shallow depth of field, ' +
  'no white background, no flat lay';

const ASSETS = [
  /* ---- Mod A · gravür (5.2) ---- */
  { id: 'cut-diagram', ar: '21:9',
    prompt: 'Anatomical beef cut diagram, side profile of a bull, dashed section lines separating primal cuts, tenderloin region highlighted in copper, engraving style. ' + ENG },
  { id: 'motif-knife', ar: '1:1',
    prompt: 'Single butcher knife, worn wooden handle, blade reflecting light, engraving style. ' + ENG },
  { id: 'ritual-gold-leaf', ar: '1:1',
    prompt: 'Minimal continuous line drawing of a hand sprinkling salt from above, salt grains falling in an arc, elegant single line art, copper line on dark background' },
  { id: 'motif-flame', ar: '1:1',
    prompt: 'Stylized open flame over charcoal grill grates, engraving crosshatch shading. ' + ENG },
  { id: 'motif-ember', ar: '21:9',
    prompt: 'Horizontal skewer with meat cubes over embers, engraving style. ' + ENG },
  /* 5.2.6 ekmek kesiti koyu lekeye dönüşüp okunmadı; final rötuş turunda
   * garnitür bandına daha okunur "çelik kovada patates" gravürü seçildi. */
  { id: 'motif-side', ar: '21:9',
    prompt: 'Golden french fries overflowing from a small steel bucket, scattered coarse salt grains, side view, engraving style. ' + ENG },
  { id: 'seal', ar: '1:1',
    prompt: 'Circular butcher stamp seal, rope border, small cleaver icon in center, letterpress texture, single copper color' },
  { id: 'texture-kraft', ar: '1:1',
    prompt: 'Seamless kraft paper texture, subtle grain' },
  { id: 'texture-leather', ar: '1:1',
    prompt: 'Seamless dark leather texture, embossed feel' },
  /* ---- Mod C · Zengin Defter ek gravürleri ----
   * Köşe süslemeleri sol-üst yönelimli üretilir; diğer üç köşe CSS
   * aynalamasıyla (scaleX/scaleY) elde edilir. */
  { id: 'burger-cut', ar: '1:1',
    prompt: 'Cross section view of a gourmet burger with every layer distinctly visible — sesame brioche crown, melting cheddar draping over a thick beef patty, caramelized onions, crisp lettuce, bun heel — engraving style. ' + ENG },
  { id: 'corner-knife', ar: '1:1',
    prompt: 'Ornamental corner flourish for a 19th century butcher trade catalogue page, elegant thin filigree scrollwork forming an L shape hugging the top and left page edges, a small butcher knife woven into the scrollwork, fine copperplate line engraving, single copper color on dark charcoal background, no text, isolated composition' },
  { id: 'corner-hook', ar: '1:1',
    prompt: 'Ornamental corner flourish for a 19th century butcher trade catalogue page, elegant thin filigree scrollwork forming an L shape hugging the top and left page edges, a small butcher meat hook woven into the scrollwork, fine copperplate line engraving, single copper color on dark charcoal background, no text, isolated composition' },
  { id: 'corner-salt', ar: '1:1',
    prompt: 'Ornamental corner flourish for a 19th century butcher trade catalogue page, elegant thin filigree scrollwork forming an L shape hugging the top and left page edges, a few coarse salt crystals scattered along the scrollwork, fine copperplate line engraving, single copper color on dark charcoal background, no text, isolated composition' },
  { id: 'corner-laurel', ar: '1:1',
    prompt: 'Ornamental corner flourish for a 19th century butcher trade catalogue page, elegant thin filigree scrollwork forming an L shape hugging the top and left page edges, a delicate laurel branch woven into the scrollwork, fine copperplate line engraving, single copper color on dark charcoal background, no text, isolated composition' },
  { id: 'divider-vignette-1', ar: '21:9',
    prompt: 'Horizontal ornamental divider vignette for a 19th century trade catalogue, a crossed butcher knife and sharpening steel at the center with symmetric thin scrollwork flourishes extending left and right, tapering to fine points, copperplate engraving, single copper color on dark charcoal background, no text, isolated composition' },
  { id: 'divider-vignette-2', ar: '21:9',
    prompt: 'Horizontal ornamental divider vignette for a 19th century trade catalogue, a small salt cellar spilling coarse grains at the center, flanked by symmetric delicate laurel sprigs tapering to fine points, copperplate engraving, single copper color on dark charcoal background, no text, isolated composition' },
  { id: 'page-medallion', ar: '1:1',
    prompt: 'Small circular ornamental medallion frame for a page number, rope and laurel wreath border with fine scrollwork, completely empty dark center, letterpress engraving texture, single copper color on dark charcoal background, no text, no letters, no numbers' },
  /* ---- Mod B · karanlık portre (5.3) ---- */
  { id: 'hero-burger', ar: '21:9',
    prompt: 'Premium beef burger, 180 gram thick patty, melting cheddar dripping, smoked beef slices, caramelized onion, glossy brioche bun, steam rising. ' + PHOTO },
  { id: 'hero-burger-black', ar: '16:9',
    prompt: 'Gourmet burger on jet black squid ink bun, melting cheddar, smoked beef. ' + PHOTO },
  { id: 'hero-steak', ar: '21:9',
    prompt: 'Seared beef tenderloin medallion sliced to reveal rare pink center, butter glaze, resting on butcher paper over steel tray. ' + PHOTO },
  { id: 'hero-starter', ar: '21:9',
    prompt: 'Three pieces of beef sirloin sushi with avocado and parmesan shavings on dark slate. ' + PHOTO },
  { id: 'hero-ritual', ar: '16:9',
    prompt: 'Burger wrapped in edible gold leaf, dramatic single spotlight, salt grains suspended mid air above. ' + PHOTO },
  { id: 'hero-side', ar: '21:9',
    prompt: 'Golden french fries overflowing from a small steel bucket, coarse salt scattered. ' + PHOTO },
  { id: 'cover-portrait', ar: '16:9',
    prompt: 'Premium beef burger, thick patty, melting cheddar, glossy brioche bun, dense smoke drifting through a single beam of hard side light, coarse salt grains suspended mid air falling from above, no gold. ' + PHOTO },
];

const api = async (url, init) => {
  const r = await fetch(url, init);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} — ${(await r.text()).slice(0, 300)}`);
  return r.json();
};

async function render(model, prompt, ar) {
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: ar } },
  };
  let j;
  try {
    j = await api(`${BASE}/models/${model}:generateContent?key=${KEY}`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (e) {
    /* imageConfig tanımayan modeller için oransız yeniden dene */
    if (!/imageConfig|aspect/i.test(e.message)) throw e;
    delete body.generationConfig.imageConfig;
    j = await api(`${BASE}/models/${model}:generateContent?key=${KEY}`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
  }
  const part = (j.candidates?.[0]?.content?.parts || [])
    .find((p) => p.inlineData?.data || p.inline_data?.data);
  const b64 = part && (part.inlineData?.data || part.inline_data?.data);
  if (!b64) throw new Error('yanıtta görsel yok: ' + JSON.stringify(j).slice(0, 200));
  return Buffer.from(b64, 'base64');
}

(async () => {
  if (!KEY) { console.error('GEMINI_API_KEY tanımlı değil.'); process.exit(1); }
  const argv = process.argv;
  const model = argv.includes('--model') ? argv[argv.indexOf('--model') + 1] : DEFAULT_MODEL;
  const only = argv.includes('--only')
    ? argv[argv.indexOf('--only') + 1].split(',') : null;
  const list = only ? ASSETS.filter((a) => only.includes(a.id)) : ASSETS;
  console.log(`model: ${model} · ${list.length} varlık`);
  fs.mkdirSync(OUT, { recursive: true });
  let fail = 0;
  for (const a of list) {
    const dest = path.join(OUT, `${a.id}.png`);
    try {
      const buf = await render(model, a.prompt, a.ar);
      fs.writeFileSync(dest, buf);
      console.log(`✓ ${a.id} (${a.ar}) → assets/${a.id}.png (${buf.length} bayt)`);
    } catch (e) {
      fail++;
      console.error(`✗ ${a.id}: ${e.message}`);
    }
  }
  console.log(fail ? `\n${fail} varlık üretilemedi.` : '\nTüm varlıklar üretildi.');
  process.exit(fail ? 2 : 0);
})();
