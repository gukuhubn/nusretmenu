/* Kasap Defteri — ŞABLON
 * ==================================================================
 * Tek şablon, iki çıktı: mode=A (illüstrasyon yuvaları) ve mode=B
 * (hero fotoğraf yuvaları). Sayfa iskeleti burada kurulur; metin
 * data/content.js'ten, fiyat data/pricing-<region>.js'ten gelir.
 * Hiçbir metin bu dosyada gömülü değildir.
 */
(() => {
  'use strict';

  const C = window.KasapContent;
  const CFG = window.KasapConfig;
  const PRICING = window.KasapPricing || {};

  /* ---------- Yapılandırma: URL parametreleri config'i geçici ezer ---------- */
  const qs = new URLSearchParams(location.search);
  const modeParam = (qs.get('mode') || CFG.mode || 'A').toUpperCase();
  const MODE = ['A', 'B', 'AB'].includes(modeParam) ? modeParam : 'A';
  const REGION = qs.get('region') || CFG.region || 'istanbul';
  const SHOW_PRICES = qs.get('prices')
    ? !['off', '0', 'false', 'no'].includes(qs.get('prices').toLowerCase())
    : CFG.showPrices !== false;

  const priceTable = (PRICING[REGION] || {}).prices || {};

  /* ---------- Küçük yardımcılar ---------- */
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const priceOf = (item) => (SHOW_PRICES ? (priceTable[item.id] || '---') : '');

  /* Görsel yuvası. `assetId` hem kalıcılık anahtarı hem de assets/
   * klasöründeki dosya adıdır: assets/cut-diagram.png düştüğü an dolar. */
  let slotSeq = 0;
  const slot = (assetId, caption, opts = {}) => {
    const shape = opts.shape || 'rect';
    const cls = ['slot'];
    if (shape === 'circle') cls.push('slot--circle');
    if (opts.tight) cls.push('slot--tight');
    const style = opts.style ? ` style="${esc(opts.style)}"` : '';
    const id = `slot-${assetId}-${++slotSeq}`;
    return `
      <div class="${cls.join(' ')}"${style}>
        <div class="slot__ph" aria-hidden="true">
          <svg class="slot__ph-mark" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="1.1">
            <path d="M3 17l5.5-6.5 4 4.5 3.5-4L21 17z"/>
            <circle cx="8" cy="7.5" r="1.6"/>
            <rect x="1.5" y="3.5" width="21" height="17" rx="1"/>
          </svg>
          <div class="slot__ph-cap">${esc(caption)}</div>
          <div class="slot__ph-id">${esc(assetId)}</div>
        </div>
        <image-slot id="${esc(id)}" data-asset-id="${esc(assetId)}"
                    shape="${esc(shape)}" fit="cover"
                    placeholder="${esc(caption)}"></image-slot>
      </div>`;
  };

  const sealMark = () => `
    <div class="seal">
      <div class="seal__inner">
        <div class="seal__line">${esc(C.seal.line1)}</div>
        <div class="seal__line">${esc(C.seal.line2)}</div>
      </div>
      ${slot('seal', `${C.seal.line1} ${C.seal.line2}`, { shape: 'circle', tight: true })}
    </div>`;

  const itemRow = (item) => `
    <div class="item">
      <div class="item__body">
        <div class="item__head">
          <div class="item__name">${esc(item.name)}</div>
          <div class="item__gap"></div>
          <div class="item__price">${esc(priceOf(item))}</div>
        </div>
        <div class="item__tr">${esc(item.tr)}</div>
        <div class="item__en">${esc(item.en)}</div>
      </div>
      ${item.seal ? sealMark() : ''}
    </div>`;

  const runhead = (mode, right) =>
    `<div class="runhead"><span>${esc(C.modes[mode].label)}</span><span>${esc(right)}</span></div>`;

  const footmark = () =>
    `<div class="footmark"><div class="footmark__rule"></div>` +
    `<div class="footmark__dot"></div><div class="footmark__rule"></div></div>`;

  const caption = (c) =>
    `<div class="caption"><span>${esc(c.left)}</span><span>${esc(c.right)}</span></div>`;

  const chrome = (mode) =>
    (mode === 'A' ? '<div class="page__scan"></div>' : '') + '<div class="page__frame"></div>';

  const sectionHead = (sec, kind, mode) => `
    <div class="sec sec--${kind}">
      <div class="sec__num">${esc(sec.numeral)}</div>
      <div>
        <div class="sec__title">${sec.titleLines.map(esc).join(mode === 'A' ? '<br>' : ' ')}</div>
        <div class="sec__title-en">${esc(sec.titleEn)}</div>
      </div>
    </div>`;

  /* ================= SAYFALAR ================= */

  /* 01 / 04 — Kapak. Mod A uzun defter girişi + logo yuvası;
   * Mod B kısa vecize + tam genişlik portre yuvası. */
  const pageCover = (mode) => {
    const a = mode === 'A';
    return `
    <section class="page page--${mode.toLowerCase()} ${a ? '' : 'page--cover-b'}"
             data-screen-label="${a ? '01 · Mod A — Kapak' : '04 · Mod B — Kapak'}">
      ${chrome(mode)}
      <div class="sheet sheet--cover">
        ${runhead(mode, C.brand.versionLine)}
        ${a ? '<div class="spacer"></div>' : '<div style="height:11mm"></div>'}
        <div class="wordmark">${esc(C.brand.wordmarkTop)}</div>
        <div class="wordmark-main">${esc(C.brand.wordmarkMain)}</div>
        ${a ? slot('logo-mark', 'figürsüz logo — kabartma',
                   { shape: 'circle', style: 'width:36mm;height:36mm;margin-top:10mm' }) : ''}
        <div class="cover-title">${esc(C.cover.title)}</div>
        <div class="cover-title-en">${esc(C.cover.titleEn)}</div>
        <div class="accent-bar"></div>
        ${a ? `
        <div class="spacer spacer--wide"></div>
        <div class="ledger-tr">${esc(C.cover.ledgerTr)}</div>
        <div class="ledger-en">${esc(C.cover.ledgerEn)}</div>
        <div class="cover-tail"></div>` : `
        <div class="moto-tr">${esc(C.cover.motoTr)}</div>
        <div class="moto-en">${esc(C.cover.motoEn)}</div>
        ${slot('cover-portrait', 'kapak portresi — duman, havada tuz taneleri',
               { shape: 'rect', style: '' }).replace('class="slot"', 'class="slot cover-portrait"')}
        ${caption(C.captions.coverB)}`}
      </div>
      ${a ? footmark() : ''}
    </section>`;
  };

  /* 02 / 05 — Kasabın Seçimi. Mod A kesim diyagramı, Mod B steak portresi. */
  const pageSteaks = (mode) => {
    const a = mode === 'A';
    const sec = C.sections.steaks;
    return `
    <section class="page page--${mode.toLowerCase()}"
             data-screen-label="${a ? '02 · Mod A — Kasabın Seçimi' : '05 · Mod B — Kasabın Seçimi'}">
      ${chrome(mode)}
      <div class="sheet sheet--body">
        ${runhead(mode, C.brand.docLine)}
        ${sectionHead(sec, 'steaks', mode)}
        <div class="lede">${esc(sec.ledeTr)}</div>
        <div class="lede lede--en">${esc(sec.ledeEn)}</div>
        <div style="margin:8mm 0 2.5mm">
          ${a
            ? slot('cut-diagram', 'dana kesim diyagramı — gravür', { style: 'width:100%;height:58mm' })
            : slot('hero-steak', 'steak portresi — hero', { style: 'width:100%;height:62mm' })}
        </div>
        ${caption(a ? C.captions.cutDiagram : C.captions.heroSteak)}
        <div class="items">
          ${C.items.steaks.map(itemRow).join('')}
        </div>
      </div>
      ${footmark()}
    </section>`;
  };

  /* 03 / 06 — Steakhouse Ruhu, Burger Formu. Mod A alev motifi yanında
   * iki satırlık başlık; Mod B tam genişlik hero burger. */
  const pageBurgers = (mode) => {
    const a = mode === 'A';
    const sec = C.sections.burgers;
    return `
    <section class="page page--${mode.toLowerCase()}"
             data-screen-label="${a ? '03 · Mod A — Burger' : '06 · Mod B — Burger'}">
      ${chrome(mode)}
      <div class="sheet sheet--body">
        ${runhead(mode, C.brand.docLine)}
        ${a ? `
        <div style="display:grid;grid-template-columns:1fr 42mm;gap:10mm;align-items:start">
          <div>
            ${sectionHead(sec, 'burgers', mode)}
            <div class="lede lede--free">${esc(sec.ledeTr)}</div>
            <div class="lede lede--en lede--free">${esc(sec.ledeEn)}</div>
          </div>
          ${slot('motif-flame', 'alev gravürü', { shape: 'circle', style: 'width:42mm;height:42mm' })}
        </div>` : `
        ${sectionHead(sec, 'burgers', mode)}
        <div class="lede lede--wide">${esc(sec.ledeTr)}</div>
        <div class="lede lede--en lede--wide">${esc(sec.ledeEn)}</div>
        <div style="margin:7mm 0 2.5mm">
          ${slot('hero-burger', 'hero burger portresi — eriyen cheddar, buhar',
                 { style: 'width:100%;height:52mm' })}
        </div>
        ${caption(C.captions.heroBurger)}`}
        <div class="items items--grid">
          ${C.items.burgers.map(itemRow).join('')}
        </div>
      </div>
      ${footmark()}
    </section>`;
  };

  const pagesFor = (mode) => pageCover(mode) + pageSteaks(mode) + pageBurgers(mode);

  /* ================= ARAÇ ÇUBUĞU (yalnız ekran) ================= */
  const link = (params, label, active) => {
    const u = new URLSearchParams(qs);
    Object.entries(params).forEach(([k, v]) => u.set(k, v));
    return `<a href="?${u.toString()}"${active ? ' aria-current="true"' : ''}>${esc(label)}</a>`;
  };

  const toolbar = () => `
    <div class="toolbar">
      <div class="toolbar__group">
        <span class="toolbar__label">MOD</span>
        ${link({ mode: 'A' }, 'A · İllüstrasyon', MODE === 'A')}
        ${link({ mode: 'B' }, 'B · Karanlık Portre', MODE === 'B')}
        ${link({ mode: 'AB' }, 'Altı sayfa', MODE === 'AB')}
      </div>
      <div class="toolbar__group">
        <span class="toolbar__label">FİYAT</span>
        ${link({ region: 'istanbul' }, 'İstanbul', REGION === 'istanbul')}
        ${link({ region: 'dubai' }, 'Dubai', REGION === 'dubai')}
        ${link({ prices: SHOW_PRICES ? 'off' : 'on' }, SHOW_PRICES ? 'Fiyatları gizle' : 'Fiyatları göster', false)}
      </div>
      <div class="toolbar__group">
        <button type="button" data-act="print">Yazdır / PDF</button>
      </div>
      <span class="toolbar__note">Varsayılanlar data/config.js içinde. Bu çubuk baskıya girmez.</span>
    </div>`;

  /* ================= VARLIK ÇÖZÜMLEME =================
   * assets/<data-asset-id>.<uzantı> sırayla denenir; ancak gerçekten
   * yüklenen dosya slot'a atanır. Bulunamazsa slot boş kalır ve gravür
   * placeholder görünür — kırık görsel asla çıkmaz. */
  const resolveAssets = (root) => {
    const slots = [...root.querySelectorAll('image-slot[data-asset-id]')];
    const byId = new Map();
    slots.forEach((el) => {
      const id = el.getAttribute('data-asset-id');
      if (!byId.has(id)) byId.set(id, []);
      byId.get(id).push(el);
    });
    byId.forEach((els, id) => {
      const exts = CFG.assetExtensions || ['png', 'jpg'];
      const tryNext = (i) => {
        if (i >= exts.length) return;                 /* varlık yok — placeholder kalır */
        const url = `assets/${id}.${exts[i]}`;
        const probe = new Image();
        probe.onload = () => els.forEach((el) => el.setAttribute('src', url));
        probe.onerror = () => tryNext(i + 1);
        probe.src = url;
      };
      tryNext(0);
    });
  };

  /* ================= KURULUM ================= */
  const mount = document.getElementById('deck');
  mount.innerHTML = (MODE === 'AB' ? pagesFor('A') + pagesFor('B') : pagesFor(MODE));
  document.body.insertAdjacentHTML('afterbegin', toolbar());
  document.querySelector('[data-act="print"]')
    .addEventListener('click', () => window.print());
  resolveAssets(mount);

  const modeName = MODE === 'AB' ? 'Mod A + Mod B' : C.modes[MODE].name;
  document.title = `${C.cover.title} — ${modeName}`;
})();
