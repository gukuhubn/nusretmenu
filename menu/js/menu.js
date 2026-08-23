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
  const MODE = ['A', 'B', 'C', 'AB', 'ABC'].includes(modeParam) ? modeParam : 'A';
  const REGION = qs.get('region') || CFG.region || 'istanbul';
  const SHOW_PRICES = qs.get('prices')
    ? !['off', '0', 'false', 'no'].includes(qs.get('prices').toLowerCase())
    : CFG.showPrices !== false;
  /* prices=mask: fiyat sütunu durur ama her değer '---' basılır.
   * PDF çıktısı bununla üretilir; pricing dosyaları repoda kalır. */
  const PRICE_MASK = (qs.get('prices') || '').toLowerCase() === 'mask';

  const priceTable = (PRICING[REGION] || {}).prices || {};

  /* ---------- Küçük yardımcılar ---------- */
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const priceOf = (item) => {
    if (!SHOW_PRICES) return '';
    if (PRICE_MASK) return '---';
    return priceTable[item.id] || '---';
  };

  /* Mod C, Mod A sayfa iskeletini page--c işaretiyle devralır. */
  const pcls = (mode) =>
    mode === 'B' ? 'page--b' : 'page--a' + (mode === 'C' ? ' page--c' : '');

  /* Görsel yuvası. `assetId` hem kalıcılık anahtarı hem de assets/
   * klasöründeki dosya adıdır: assets/cut-diagram.png düştüğü an dolar. */
  let slotSeq = 0;
  const slot = (assetId, caption, opts = {}) => {
    const shape = opts.shape || 'rect';
    const fit = opts.fit || 'cover';
    const cls = ['slot'];
    if (shape === 'circle') cls.push('slot--circle');
    if (opts.tight) cls.push('slot--tight');
    if (opts.vignette) cls.push('slot--vignette');
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
                    shape="${esc(shape)}" fit="${esc(fit)}"
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

  /* Metni henüz gelmemiş bölümler için görünür bekleme durumu.
   * Konsept dokümanı Bölüm 3 geldiğinde data/content.js dolar ve bu blok
   * kendiliğinden kaybolur — layout değişmez. */
  const pending = (label, n) => `
    <div class="pending">
      <div class="pending__rule"></div>
      <div class="pending__text">${esc(label)} · ${n} ÜRÜN METNİ BEKLENİYOR</div>
      <div class="pending__hint">data/content.js → items</div>
      <div class="pending__rule"></div>
    </div>`;

  /* Mod C'de her ürün adı yanında ~12 mm spot gravür taşır (mini-<id>);
   * baharatlı patates kova minisini sade patatesle paylaşır. */
  const MINI_ALIAS = { 'spiced-fries': 'mini-fries' };
  const itemRow = (item, mode) => `
    <div class="item">
      ${mode === 'C'
        ? `<div class="mini">${slot(MINI_ALIAS[item.id] || 'mini-' + item.id,
             item.name + ' — spot gravür', { fit: 'contain', tight: true })}</div>`
        : ''}
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

  /* Mod C gövde sayfaları numaralanır: madalyon gravürü + rakam.
   * Kapak numarasız kalır (footmark 'numbered' almadan çağrılır). */
  let cPageNo = 0;
  const footmark = (mode, numbered) => {
    if (mode === 'C' && numbered) {
      return `<div class="footmark footmark--medal"><div class="footmark__rule"></div>
        <div class="medal">${slot('page-medallion', 'sayfa madalyonu',
          { shape: 'circle', fit: 'contain', tight: true })}
          <span class="medal__num">${++cPageNo}</span></div>
        <div class="footmark__rule"></div></div>`;
    }
    return `<div class="footmark"><div class="footmark__rule"></div>` +
      `<div class="footmark__dot"></div><div class="footmark__rule"></div></div>`;
  };

  const caption = (c) =>
    `<div class="caption"><span>${esc(c.left)}</span><span>${esc(c.right)}</span></div>`;

  /* Mod C bölüm ayracı vinyeti (gravür varlığı, ortalı ince bant) */
  const vignette = (assetId, extra) =>
    `<div class="divider-vignette${extra ? ' ' + extra : ''}">${
      slot(assetId, 'bölüm ayracı vinyeti', { fit: 'contain', tight: true })}</div>`;

  /* Mod C alt boşluk dolgusu: sayfa dibine itilen geniş gravür bandı.
   * margin-top:auto akışı bozmadan bandı sheet tabanına yaslar. */
  const fillBand = (assetId, h, cap) =>
    `<div class="fill-band" style="height:${h}mm">${
      slot(assetId, cap, { fit: 'contain', tight: true })}</div>`;

  const chrome = (mode) => {
    let h = (mode !== 'B' ? '<div class="page__scan"></div>' : '') +
            '<div class="page__frame"></div>';
    if (mode === 'C') {
      /* Köşe süslemeleri sol-üst yönelimli üretildi; kalan üç köşe CSS
       * aynalamasıyla döner. Her köşenin motifi farklı: bıçak, çengel,
       * tuz, defne. */
      h += `
        <div class="corner corner--tl">${slot('corner-knife', 'köşe — bıçak', { fit: 'contain', tight: true })}</div>
        <div class="corner corner--tr">${slot('corner-hook', 'köşe — çengel', { fit: 'contain', tight: true })}</div>
        <div class="corner corner--bl">${slot('corner-salt', 'köşe — tuz', { fit: 'contain', tight: true })}</div>
        <div class="corner corner--br">${slot('corner-laurel', 'köşe — defne', { fit: 'contain', tight: true })}</div>`;
    }
    return h;
  };

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
    const a = mode !== 'B';
    return `
    <section class="page ${pcls(mode)} ${a ? '' : 'page--cover-b'}"
             data-screen-label="Kapak · Mod ${mode}">
      ${chrome(mode)}
      <div class="sheet sheet--cover">
        ${runhead(mode, C.brand.versionLine)}
        ${a ? '<div class="spacer"></div>' : '<div style="height:11mm"></div>'}
        ${slot('logo-mark', 'figürsüz kilit logo — kabartma',
               /* Kilit logo markayı kapakta tek başına taşır — tipografik
                * SALTBAE/BURGER satırları kaldırıldı. Kutu logonun oranında
                * (3,4:1), fit=contain ile tam sığar. */
               { shape: 'rect', fit: 'contain',
                 style: a ? 'width:66mm;height:19.5mm;margin-top:10mm'
                          : 'width:66mm;height:19.5mm' })}
        <div class="cover-title">${esc(C.cover.title)}</div>
        <div class="cover-title-en">${esc(C.cover.titleEn)}</div>
        <div class="accent-bar"></div>
        ${mode === 'C' ? vignette('divider-vignette-1', 'divider-vignette--cover') : ''}
        ${a ? `
        <div class="spacer spacer--wide"></div>
        <div class="ledger-tr">${esc(C.cover.ledgerTr)}</div>
        <div class="ledger-en">${esc(C.cover.ledgerEn)}</div>
        <div class="cover-tail"></div>` : `
        <div class="moto-tr">${esc(C.cover.motoTr)}</div>
        <div class="moto-en">${esc(C.cover.motoEn)}</div>
        ${slot('cover-portrait', 'kapak portresi — duman, havada tuz taneleri',
               { shape: 'rect', style: '' }).replace('class="slot"', 'class="slot cover-portrait"')}`}
      </div>
      ${a ? footmark(mode) : ''}
    </section>`;
  };

  /* Ustanın Ayırdığı. Mod A/C kesim diyagramı, Mod B steak portresi. */
  const pageSteaks = (mode) => {
    const a = mode !== 'B';
    const sec = C.sections.steaks;
    return `
    <section class="page ${pcls(mode)}"
             data-screen-label="Ustanın Ayırdığı · Mod ${mode}">
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
        ${a ? caption(C.captions.cutDiagram) : ''}
        <div class="items">
          ${C.items.steaks.map((it) => itemRow(it, mode)).join('')}
        </div>
        ${mode === 'C' ? fillBand('band-knives', 17, 'bıçak seti bandı') : ''}
      </div>
      ${footmark(mode, true)}
    </section>`;
  };

  /* Steakhouse Ruhu, Burger Formu. Mod A/C burger kesiti gravürü yanında
   * iki satırlık başlık (C'de ayrıca alev kolofonu); Mod B hero burger. */
  const pageBurgers = (mode) => {
    const a = mode !== 'B';
    const sec = C.sections.burgers;
    return `
    <section class="page ${pcls(mode)}"
             data-screen-label="Burger · Mod ${mode}">
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
          ${slot('burger-cut', 'burger kesiti — gravür', { shape: 'circle', style: 'width:42mm;height:42mm' })}
        </div>` : `
        ${sectionHead(sec, 'burgers', mode)}
        <div class="lede lede--wide">${esc(sec.ledeTr)}</div>
        <div class="lede lede--en lede--wide">${esc(sec.ledeEn)}</div>
        <div style="margin:7mm 0 2.5mm">
          ${slot('hero-burger', 'hero burger portresi — eriyen cheddar, buhar',
                 { style: 'width:100%;height:52mm' })}
        </div>`}
        ${mode === 'C' ? '<div class="vfill"></div>' : ''}
        <div class="items items--grid">
          ${C.items.burgers.map((it) => itemRow(it, mode)).join('')}
        </div>
        ${mode === 'C'
          /* Ürün bloğu vfill çiftiyle dikey ortalanır; alt bantta közde
           * ızgara gravürü sayfayı kapatır (alev kolofonunun yerini aldı —
           * ateş teması banda taşındı). */
          ? '<div class="vfill"></div>' + fillBand('band-grill', 24, 'közde ızgara bandı')
          : ''}
      </div>
      ${footmark(mode, true)}
    </section>`;
  };

  /* Manifesto — yalnızca content.sections.manifesto.body doldurulmuşsa
   * ayrı sayfa olarak basılır; boşsa manifesto Mod A kapağında akar. */
  const pageManifesto = (mode) => {
    const sec = C.sections.manifesto;
    if (!sec.body) return '';
    return `
    <section class="page ${pcls(mode)}" data-screen-label="Manifesto · Mod ${mode}">
      ${chrome(mode)}
      <div class="sheet sheet--cover">
        ${runhead(mode, C.brand.docLine)}
        <div class="spacer"></div>
        <div class="cover-title">${esc(sec.titleLines[0])}</div>
        <div class="cover-title-en">${esc(sec.titleEn)}</div>
        <div class="accent-bar"></div>
        <div class="ledger-tr" style="margin-top:10mm">${esc(sec.body)}</div>
        ${sec.bodyEn ? `<div class="ledger-en">${esc(sec.bodyEn)}</div>` : ''}
        <div class="spacer spacer--wide"></div>
      </div>
      ${footmark(mode, true)}
    </section>`;
  };

  /* I — Ateşten Önce (6 ürün) */
  const pageStarters = (mode) => {
    const a = mode !== 'B';
    const sec = C.sections.starters;
    const items = C.items.starters || [];
    return `
    <section class="page ${pcls(mode)}"
             data-screen-label="Ateşten Önce · Mod ${mode}">
      ${chrome(mode)}
      <div class="sheet sheet--body">
        ${runhead(mode, C.brand.docLine)}
        ${sectionHead(sec, 'starters', mode)}
        ${sec.ledeTr ? `<div class="lede">${esc(sec.ledeTr)}</div>` : ''}
        ${sec.ledeEn ? `<div class="lede lede--en">${esc(sec.ledeEn)}</div>` : ''}
        <div style="margin:8mm 0 2.5mm">
          ${a
            /* C'de üst motif kısalır: mini gravürler + mezze bandına yer açar */
            ? slot('motif-ember', 'kor gravürü — ateşten önce',
                   { style: 'width:100%;height:' + (mode === 'C' ? '40mm' : '52mm') })
            : slot('hero-starter', 'başlangıç tabağı portresi', { style: 'width:100%;height:56mm' })}
        </div>
        <div class="items">
          ${items.length ? items.map((it) => itemRow(it, mode)).join('') : pending('ATEŞTEN ÖNCE', sec.expect)}
        </div>
        ${mode === 'C' ? fillBand('band-mezze', 14, 'zeytin · limon · tuz vinyeti') : ''}
      </div>
      ${footmark(mode, true)}
    </section>`;
  };

  /* IV — Ritüel: tek ürünlük sahne sayfası. Altın vurgu yalnız burada. */
  const pageRitual = (mode) => {
    const a = mode !== 'B';
    const sec = C.sections.ritual;
    const item = (C.items.ritual || [])[0];
    return `
    <section class="page ${pcls(mode)} page--ritual"
             data-screen-label="Ritüel · Mod ${mode}">
      ${chrome(mode)}
      ${mode === 'C'
        /* Tuz jesti çizimi C'de küçülüp üst köşe motifi olur;
         * sahneyi tam genişlik altın gravür hero taşır. */
        ? `<div class="ritual-corner-motif">${slot('ritual-motif', 'tuz jesti motifi',
             { fit: 'contain', tight: true })}</div>`
        : ''}
      <div class="sheet sheet--cover">
        ${runhead(mode, C.brand.docLine)}
        <div class="spacer"></div>
        <div class="sec sec--ritual">
          <div class="sec__num">${esc(sec.numeral)}</div>
          <div>
            <div class="sec__title">${sec.titleLines.map(esc).join(' ')}</div>
            <div class="sec__title-en">${esc(sec.titleEn)}</div>
          </div>
        </div>
        ${sec.ledeTr ? `<div class="lede lede--center">${esc(sec.ledeTr)}</div>` : ''}
        ${sec.ledeEn ? `<div class="lede lede--en lede--center">${esc(sec.ledeEn)}</div>` : ''}
        ${mode === 'C' ? `
        ${slot('ritual-hero', 'altın varaklı burger — gravür hero',
               { style: 'width:100%;height:62mm;margin-top:7mm' })}
        <div class="ritual-band">${slot('ritual-band', 'tezhip ayraç bandı',
               { fit: 'contain', tight: true })}</div>`
        : a
          ? slot('ritual-gold-leaf', 'tuz jesti — çizgi gravür',
                 /* Çizimin koyu zemini sayfa zemininden ayrışmasın diye
                  * kenarları yumuşak vinyetle eritilir (slot--vignette). */
                 { shape: 'circle', vignette: true,
                   style: 'width:64mm;height:64mm;margin-top:7mm' })
          : slot('hero-ritual', '24K altın kaplama sahne portresi',
                 { style: 'width:100%;height:86mm;margin-top:9mm' })}
        ${item ? `
        <div class="ritual-item">
          <div class="ritual-item__name">${esc(item.name)}</div>
          <div class="ritual-item__price">${esc(priceOf(item))}</div>
          <div class="ritual-item__tr">${esc(item.tr)}</div>
          <div class="ritual-item__en">${esc(item.en)}</div>
        </div>` : pending('RİTÜEL · NUSRET SPECIAL 24K GOLD', sec.expect)}
        <div class="spacer spacer--wide"></div>
      </div>
      ${footmark(mode, true)}
    </section>`;
  };

  /* V — Yanında (3 ürün) + Tatlı Son (Baklava) aynı sayfada */
  const pageSides = (mode) => {
    const a = mode !== 'B';
    const sec = C.sections.sides;
    const des = C.sections.dessert;
    const sides = C.items.sides || [];
    const desserts = C.items.desserts || [];
    return `
    <section class="page ${pcls(mode)}"
             data-screen-label="Yanında + Tatlı Son · Mod ${mode}">
      ${chrome(mode)}
      <div class="sheet sheet--body">
        ${runhead(mode, C.brand.docLine)}
        ${sectionHead(sec, 'sides', mode)}
        ${sec.ledeTr ? `<div class="lede">${esc(sec.ledeTr)}</div>` : ''}
        <div style="margin:7mm 0 2.5mm">
          ${a
            ? slot('motif-side', 'garnitür gravürü', { style: 'width:100%;height:44mm' })
            : slot('hero-side', 'garnitür portresi', { style: 'width:100%;height:48mm' })}
        </div>
        <div class="items">
          ${sides.length ? sides.map((it) => itemRow(it, mode)).join('') : pending('YANINDA', sec.expect)}
        </div>

        ${mode === 'C'
          /* Bal damlası + baklava vinyeti (divider-honey) tuz kabı
           * vinyetinin (divider-vignette-2) yerini aldı. */
          ? vignette('divider-honey', 'divider-vignette--between')
          : '<div class="section-divider"></div>'}

        <div class="sec sec--dessert">
          <div class="sec__num"></div>
          <div>
            <div class="sec__title">${des.titleLines.map(esc).join(' ')}</div>
            <div class="sec__title-en">${esc(des.titleEn)}</div>
          </div>
        </div>
        ${des.ledeTr ? `<div class="lede">${esc(des.ledeTr)}</div>` : ''}
        ${des.ledeEn ? `<div class="lede lede--en">${esc(des.ledeEn)}</div>` : ''}
        <div class="items items--dessert">
          ${desserts.length ? desserts.map((it) => itemRow(it, mode)).join('') : pending('TATLI SON · BAKLAVA', des.expect)}
        </div>
      </div>
      ${footmark(mode, true)}
    </section>`;
  };

  /* Menünün tam yapısı — her mod için aynı sıra. */
  const pagesFor = (mode) => {
    cPageNo = 0;
    return pageCover(mode) +
      pageManifesto(mode) +
      pageStarters(mode) +
      pageSteaks(mode) +
      pageBurgers(mode) +
      pageRitual(mode) +
      pageSides(mode);
  };

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
        ${link({ mode: 'C' }, 'C · Zengin Defter', MODE === 'C')}
        ${link({ mode: 'ABC' }, 'Üç mod', MODE === 'ABC')}
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
  mount.innerHTML = MODE === 'AB' ? pagesFor('A') + pagesFor('B')
    : MODE === 'ABC' ? pagesFor('A') + pagesFor('B') + pagesFor('C')
    : pagesFor(MODE);
  document.body.insertAdjacentHTML('afterbegin', toolbar());
  document.querySelector('[data-act="print"]')
    .addEventListener('click', () => window.print());
  resolveAssets(mount);

  const modeName = C.modes[MODE] ? C.modes[MODE].name
    : MODE === 'AB' ? 'Mod A + Mod B' : 'Mod A + B + C';
  document.title = `${C.cover.title} — ${modeName}`;
})();
