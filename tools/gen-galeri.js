/* Galeri konsept görselleri — Gemini üretimi
 * ------------------------------------------------------------------
 * İki artwork, her biri için 3 varyant. Tüm varyantlar saklanır;
 * seçilen kare output/galeri/ köküne kopyalanır.
 *
 * Kullanım:
 *   GEMINI_API_KEY=... node tools/gen-galeri.js
 *   GEMINI_API_KEY=... node tools/gen-galeri.js --model gemini-3-pro-image-preview
 *
 * Model adı verilmezse hesabın erişebildiği görsel üretim modelleri
 * listelenip ilki seçilir — böylece model adı tahmin edilmez.
 */
const fs = require('fs');
const path = require('path');

const KEY = process.env.GEMINI_API_KEY;
const OUT = path.resolve(__dirname, '..', 'output', 'galeri');
const VAR = path.join(OUT, 'varyantlar');
const VARIANTS = 3;
const BASE = 'https://generativelanguage.googleapis.com/v1beta';

/* Ortak stil kilidi — her iki prompta aynen eklenir. */
const STYLE = '17th century Dutch Golden Age still life oil painting, dramatic ' +
  'chiaroscuro, single light source from upper left, near black background, ' +
  'visible oil paint texture and brushwork, rich amber and umber tones, ' +
  'museum quality, no text, no frame, no watermark';

const WORKS = [
  { id: 'galeri-kapak',
    subject: 'Raw beef tenderloin on crumpled butcher paper, a large knife beside it, ' +
             'scattered coarse salt crystals, composition centered like a Pieter Aertsen ' +
             'butcher still life' },
  { id: 'galeri-salon2',
    subject: 'Seared beef tenderloin medallion glistening with melted butter, sprig of ' +
             'rosemary, dark pewter plate, steam barely visible' },
];

const api = async (url, init) => {
  const r = await fetch(url, init);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} — ${(await r.text()).slice(0, 300)}`);
  return r.json();
};

/** Hesabın erişebildiği görsel üretebilen modeli bul. */
async function pickModel(explicit) {
  if (explicit) return explicit;
  const { models = [] } = await api(`${BASE}/models?key=${KEY}`);
  const cand = models.filter((m) => {
    const n = (m.name || '').toLowerCase();
    const methods = m.supportedGenerationMethods || [];
    return (n.includes('image') || n.includes('imagen')) &&
           (methods.includes('generateContent') || methods.includes('predict'));
  });
  if (!cand.length) {
    throw new Error('Bu anahtarla görsel üretebilen model bulunamadı. ' +
      'Erişilebilen modeller: ' + models.map((m) => m.name).join(', '));
  }
  console.log('kullanılabilir görsel modelleri:', cand.map((m) => m.name).join(', '));
  return cand[0].name.replace(/^models\//, '');
}

/** Tek kare üret, PNG baytlarını döndür. imagen → :predict, diğerleri → generateContent. */
async function render(model, prompt) {
  if (model.includes('imagen')) {
    const j = await api(`${BASE}/models/${model}:predict?key=${KEY}`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ instances: [{ prompt }],
        parameters: { sampleCount: 1, aspectRatio: '4:3' } }),
    });
    const b64 = j.predictions?.[0]?.bytesBase64Encoded;
    if (!b64) throw new Error('yanıtta görsel yok: ' + JSON.stringify(j).slice(0, 200));
    return Buffer.from(b64, 'base64');
  }
  const j = await api(`${BASE}/models/${model}:generateContent?key=${KEY}`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE'] },
    }),
  });
  const part = (j.candidates?.[0]?.content?.parts || [])
    .find((p) => p.inlineData?.data || p.inline_data?.data);
  const b64 = part && (part.inlineData?.data || part.inline_data?.data);
  if (!b64) throw new Error('yanıtta görsel yok: ' + JSON.stringify(j).slice(0, 200));
  return Buffer.from(b64, 'base64');
}

(async () => {
  if (!KEY) {
    console.error('GEMINI_API_KEY tanımlı değil — üretim yapılamaz.');
    process.exit(1);
  }
  const explicit = process.argv.includes('--model')
    ? process.argv[process.argv.indexOf('--model') + 1] : null;
  const model = await pickModel(explicit);
  console.log('model:', model);
  fs.mkdirSync(VAR, { recursive: true });

  for (const w of WORKS) {
    const prompt = `${w.subject}. ${STYLE}`;
    for (let i = 1; i <= VARIANTS; i++) {
      const dest = path.join(VAR, `${w.id}-v${i}.png`);
      try {
        const buf = await render(model, prompt);
        fs.writeFileSync(dest, buf);
        console.log(`✓ ${w.id} varyant ${i} → varyantlar/${path.basename(dest)} (${buf.length} bayt)`);
      } catch (e) {
        console.error(`✗ ${w.id} varyant ${i}: ${e.message}`);
      }
    }
  }
  console.log('\nTüm varyantlar output/galeri/varyantlar/ altında.');
  console.log('Seçim: en resimsel kare output/galeri/<id>.png olarak kopyalanır.');
})();
