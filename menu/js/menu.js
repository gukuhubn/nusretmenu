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
  const MODE = ['A', 'B', 'C', 'D', 'E', 'AB', 'ABC'].includes(modeParam) ? modeParam : 'A';
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

  /* Mod C, Mod A iskeletini page--c ile devralır; Mod D, C'nin üstüne
   * page--d ekler (foto ağırlıklı ters çevrim); Mod E bağımsız açık
   * "Riviera" temasıdır. rich() = zengin defter ailesi (C + D). */
  const rich = (m) => m === 'C' || m === 'D';
  const pcls = (mode) =>
    mode === 'B' ? 'page--b'
    : mode === 'E' ? 'page--e'
    : 'page--a' + (mode === 'C' ? ' page--c'
                 : mode === 'D' ? ' page--c page--d' : '');

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
    /* plate: büyük opak panel (foto/plaka). Mod C parlaklık filtresi
     * bunlara UYGULANMAZ — filtre Chromium'da JPEG geçişini bozup paneli
     * kayıpsız PNG olarak rasterize ettiriyor ve PDF'i şişiriyordu. */
    if (opts.plate) cls.push('slot--plate');
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
  const itemRow = (item, mode) => mode === 'E' ? `
    <div class="item item--e">
      <div class="item__body">
        <div class="item__head">
          <div class="item__name">${esc(item.name)}</div>
          <div class="item__gap"></div>
          <div class="item__price">${esc(priceOf(item))}</div>
        </div>
        <div class="item__tr">${esc(item.tr)}</div>
      </div>
    </div>` : `
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
    if (rich(mode) && numbered) {
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
    if (mode === 'E') return '<div class="page__frame"></div>';
    let h = (mode !== 'B' ? '<div class="page__scan"></div>' : '') +
            '<div class="page__frame"></div>';
    if (rich(mode)) {
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

  /* Nusr-Et kör kabartması: renk yok, yalnız kenar ışığı/gölgesi.
   * Kurucu fotoğraflarının üstüne bindirilir (C/D foto sayfaları). */
  const emboss = () =>
    `<div class="emboss">${slot('nusret-emboss', 'kabartma Nusr-Et amblemi',
       { fit: 'contain', tight: true })}</div>`;

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
        ${mode === 'E' ? '' : slot('logo-mark', 'figürsüz kilit logo — kabartma',
               /* Kilit logo markayı kapakta tek başına taşır — tipografik
                * SALTBAE/BURGER satırları kaldırıldı. Kutu logonun oranında
                * (3,4:1), fit=contain ile tam sığar. */
               { shape: 'rect', fit: 'contain',
                 style: a ? 'width:66mm;height:19.5mm;margin-top:10mm'
                          : 'width:66mm;height:19.5mm' })}
        ${mode === 'E'
          ? `<div class="e-cover-art">${slot('e-cover-sprig', 'zeytin dalı — pastel',
               { fit: 'contain', tight: true, plate: true })}</div>`
          : ''}
        <div class="cover-title">${esc(C.cover.title)}</div>
        <div class="cover-title-en">${esc(C.cover.titleEn)}</div>
        <div class="accent-bar"></div>
        ${mode === 'D'
          /* Kurucu açılışı: büyük net yarım figür gravürü */
          ? `<div class="d-cover-founder">${slot('founder-open',
               'usta — yarım figür gravür', { fit: 'contain', tight: true, plate: true })}</div>`
          : ''}
        ${''/* Kapak sade: logo + başlık + manifesto. Vitrin fotoğrafı
             * ayrı tam sayfa olarak manifesto sonrasında basılır. */}
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
          ${mode === 'D'
            ? slot('photo-steaks', 'Lokum — koyu portre foto', { style: 'width:100%;height:58mm', plate: true })
            : a
            ? slot('cut-diagram', 'dana kesim diyagramı — gravür', { style: 'width:100%;height:58mm', plate: true })
            : slot('hero-steak', 'steak portresi — hero', { style: 'width:100%;height:62mm' })}
        </div>
        ${a && mode !== 'D' && mode !== 'E' ? caption(C.captions.cutDiagram) : ''}
        <div class="items">
          ${C.items.steaks.map((it) => itemRow(it, mode)).join('')}
        </div>
        ${mode === 'C'
          /* founder-cutting zayıf kaldı — bıçak seti bandına dönüldü */
          ? fillBand('band-knives', 17, 'bıçak seti bandı')
          : ''}
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
        ${mode === 'D' ? `
        ${sectionHead(sec, 'burgers', mode)}
        <div class="lede lede--wide">${esc(sec.ledeTr)}</div>
        <div class="lede lede--en lede--wide">${esc(sec.ledeEn)}</div>
        <div style="margin:6mm 0 2.5mm">
          ${slot('photo-burgers', 'burger — koyu portre foto', { style: 'width:100%;height:50mm', plate: true })}
        </div>` : mode === 'E' ? `
        ${sectionHead(sec, 'burgers', mode)}
        <div class="lede lede--wide">${esc(sec.ledeTr)}</div>
        <div style="margin:8mm 0 4mm">
          ${slot('e-photo-burgers', 'burger — açık ton foto', { style: 'width:100%;height:52mm', plate: true })}
        </div>` : a ? `
        <div style="display:grid;grid-template-columns:1fr 42mm;gap:10mm;align-items:start">
          <div>
            ${sectionHead(sec, 'burgers', mode)}
            <div class="lede lede--free">${esc(sec.ledeTr)}</div>
            <div class="lede lede--en lede--free">${esc(sec.ledeEn)}</div>
          </div>
          ${slot('burger-cut', 'burger kesiti — gravür', { shape: 'circle', style: 'width:42mm;height:42mm', plate: true })}
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
        ${mode === 'E' ? '' : `<div style="margin:${mode === 'C' ? '5mm' : '8mm'} 0 2.5mm">
          ${mode === 'D'
            ? slot('photo-starters', 'çiğ et başlangıcı — koyu portre foto',
                   { style: 'width:100%;height:40mm', plate: true })
            : a
            /* founder-counter gravürü zayıf kaldı (yüz okunmuyor) —
             * şiş/köz gravürüne dönüldü; C'de kısa kesim. */
            ? slot('motif-ember', 'kor gravürü — ateşten önce',
                   { style: 'width:100%;height:' + (mode === 'C' ? '30mm' : '52mm'),
                     plate: true })
            : slot('hero-starter', 'başlangıç tabağı portresi', { style: 'width:100%;height:56mm' })}
        </div>`}
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
      ${rich(mode)
        /* Tuz jesti çizimi küçülüp üst köşe motifi olur;
         * sahneyi tam genişlik tuz jesti gravürü taşır. */
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
        ${rich(mode) ? `
        ${slot('founder-salt', 'ustanın tuz jesti — gravür hero',
               /* Setin en güçlü varlığı — %15 büyütüldü (62 → 71 mm) */
               { style: 'width:100%;height:71mm;margin-top:6mm', plate: true })}
        <div class="ritual-band">${slot('ritual-band', 'tezhip ayraç bandı',
               { fit: 'contain', tight: true })}</div>`
        : mode === 'E'
        ? slot('e-photo-ritual', 'altın burger — açık ton foto',
               { style: 'width:100%;height:60mm;margin-top:8mm', plate: true })
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
        ${mode === 'E' ? '' : `<div style="margin:7mm 0 2.5mm">
          ${mode === 'D'
            ? slot('photo-sides', 'patates — koyu portre foto', { style: 'width:100%;height:44mm', plate: true })
            : a
            ? slot('motif-side', 'garnitür gravürü', { style: 'width:100%;height:44mm', plate: true })
            : slot('hero-side', 'garnitür portresi', { style: 'width:100%;height:48mm' })}
        </div>`}
        <div class="items">
          ${sides.length ? sides.map((it) => itemRow(it, mode)).join('') : pending('YANINDA', sec.expect)}
        </div>

        ${mode === 'C'
          /* Bal damlası + baklava vinyeti (divider-honey) tuz kabı
           * vinyetinin (divider-vignette-2) yerini aldı. */
          ? vignette('divider-honey', 'divider-vignette--between')
          : mode === 'E'
          ? `<div class="e-divider-art">${slot('e-dessert-sprig', 'bal + baklava — pastel',
               { fit: 'contain', tight: true, plate: true })}</div>`
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

  /* Kapanış — Ustanın Yolu: köken metni + şube listesi.
   * Şube bazlı baskıda content.branches içindeki tek `aktif` bayrağı
   * değişir; aktif şube parlak bakır, mühür ikonlu ve altında
   * "bu defter burada açık" satırıyla basılır. */
  const pageJourney = (mode) => {
    const sec = C.sections.journey;
    /* "Yürüyüş" kurgusu: şubeler açılış sırasına göre iki sıralı
     * serpantin patikada dizilir; kesikli çizgi Erzurum'dan başlar,
     * son şubede biter; iki uçta küçük kurucu büstü. Amblemler 18 mm. */
    const walkNode = (b) => `
      <div class="wnode${b.aktif ? ' wnode--active' : ''}">
        <div class="wnode__icon">${slot('branch-' + b.ikon,
             b.mekan || b.sehir, { fit: 'contain', tight: true })}</div>
        <div class="wnode__city">${esc(b.sehir)}</div>
        ${b.mekan ? `<div class="wnode__venue">${esc(b.mekan)}</div>` : ''}
        ${b.aktif ? `<div class="wnode__here">${esc(sec.hereTr)}<br><em>${esc(sec.hereEn)}</em></div>` : ''}
      </div>`;
    const bustNode = (label) => `
      <div class="wnode wnode--bust">
        <div class="wnode__icon">${slot('founder-bust', 'kurucu büstü',
             { fit: 'contain', tight: true })}</div>
        <div class="wnode__city">${esc(label)}</div>
      </div>`;
    const row1 = C.branches.slice(0, 5).map(walkNode).join('');
    const row2 = C.branches.slice(5).map(walkNode).join('');
    return `
    <section class="page ${pcls(mode)}"
             data-screen-label="Ustanın Yolu · Mod ${mode}">
      ${chrome(mode)}
      <div class="sheet sheet--cover">
        ${runhead(mode, C.brand.docLine)}
        <div style="height:5mm"></div>
        <div class="cover-title">${esc(sec.titleLines[0])}</div>
        <div class="cover-title-en">${esc(sec.titleEn)}</div>
        <div class="accent-bar"></div>
        <div class="ledger-tr" style="margin-top:7mm">${esc(sec.bodyTr)}</div>
        <div class="ledger-en">${esc(sec.bodyEn)}</div>
        <div class="spacer"></div>
        <div class="walk">
          <div class="walk__row">${bustNode('Erzurum')}${row1}</div>
          <div class="walk__turn"></div>
          <div class="walk__row walk__row--back">${row2}${bustNode('Usta')}</div>
        </div>
        <div class="spacer"></div>
        <div class="brandline">
          <div class="brandline__lock">${slot('logo-mark', 'saltbae kilit logo',
               { fit: 'contain', tight: true })}</div>
        </div>
        ${fillBand('band-route', 14, 'Erzurum\u2019dan yola çıkan yol motifi')}
      </div>
      ${footmark(mode, true)}
    </section>`;
  };

  /* Künye — fiziksel defter kimliği: teknik gravür + 3 satır şartname */
  const pageColophon = (mode) => {
    const sec = C.sections.colophon;
    return `
    <section class="page ${pcls(mode)}"
             data-screen-label="Künye · Mod ${mode}">
      ${chrome(mode)}
      <div class="sheet sheet--cover">
        ${runhead(mode, C.brand.docLine)}
        <div class="spacer"></div>
        <div class="cover-title">${esc(sec.titleLines[0])}</div>
        <div class="cover-title-en">${esc(sec.titleEn)}</div>
        <div class="accent-bar"></div>
        <div class="colophon-figure">${slot('colophon-book',
             'defterin fiziksel hali — teknik gravür', { fit: 'contain', tight: true, plate: true })}</div>
        <div class="specs">
          ${sec.specs.map((s) => `
          <div class="spec">
            <div class="spec__tr">${esc(s.tr)}</div>
            <div class="spec__en">${esc(s.en)}</div>
          </div>`).join('')}
        </div>
        <div class="spacer"></div>
      </div>
      ${footmark(mode, true)}
    </section>`;
  };

  /* Vitrin — tam sayfa duotone foto (manifesto sonrası ikinci sayfa).
   * Foto-ağırlıklı sayfa: köşe süslemeleri ve tarama basılmaz. */
  const pageVitrine = (mode) => {
    const sec = C.sections.vitrine;
    return `
    <section class="page ${pcls(mode)} page--photo"
             data-screen-label="Vitrin · Mod ${mode}">
      ${chrome(mode)}
      <div class="backcover-photo">${slot('founder-vitrine-duo',
           'et vitrini — bakır duotone', { fit: 'cover', tight: true, plate: true })}</div>
      ${emboss()}
      <div class="backcover-line">${esc(sec.lineTr)} <em>/ ${esc(sec.lineEn)}</em></div>
    </section>`;
  };

  /* Mod E arka kapak — açık tonlu tek kurucu fotoğrafı */
  const pageBackCoverE = (mode) => {
    const sec = C.sections.backcover;
    return `
    <section class="page ${pcls(mode)} page--photo"
             data-screen-label="Arka Kapak · Mod ${mode}">
      ${chrome(mode)}
      <div class="backcover-photo backcover-photo--light">${slot('founder-light-photo',
           'usta — açık ton fotoğraf', { fit: 'cover', tight: true, plate: true })}</div>
      <div class="backcover-line backcover-line--light">${esc(sec.lineTr)} <em>/ ${esc(sec.lineEn)}</em></div>
    </section>`;
  };

  /* Arka kapak — tam sayfa bakır duotone portre + Nusr-Et marka bloğu
   * + tek satır. Foto-ağırlıklı sayfa: gravür süsleme basılmaz. */
  const pageBackCover = (mode) => {
    const sec = C.sections.backcover;
    const j = C.sections.journey;
    return `
    <section class="page ${pcls(mode)} page--photo"
             data-screen-label="Arka Kapak · Mod ${mode}">
      ${chrome(mode)}
      <div class="backcover-photo">${slot('founder-portrait-duo',
           'defteri tutan el — bakır duotone portre', { fit: 'cover', tight: true, plate: true })}</div>
      ${emboss()}
      <div class="backcover-brand">
        <div class="backcover-brand__line">${esc(j.brandTr)} <em>/ ${esc(j.brandEn)}</em></div>
        <div class="backcover-brand__logo">${slot('nusret-logo', 'Nusr-Et logosu',
             { fit: 'contain', tight: true })}</div>
      </div>
      <div class="backcover-line">${esc(sec.lineTr)} <em>/ ${esc(sec.lineEn)}</em></div>
    </section>`;
  };

  /* Menünün tam yapısı — her mod için aynı sıra.
   * Ustanın Yolu, Künye ve Arka Kapak şimdilik yalnız Mod C'de basılır. */
  const pagesFor = (mode) => {
    cPageNo = 0;
    return pageCover(mode) +
      pageManifesto(mode) +
      /* Vitrin foto sayfası: manifesto sonrası, Ateşten Önce'den önce */
      (rich(mode) ? pageVitrine(mode) : '') +
      pageStarters(mode) +
      pageSteaks(mode) +
      pageBurgers(mode) +
      pageRitual(mode) +
      pageSides(mode) +
      (rich(mode)
        ? pageJourney(mode) + pageColophon(mode) + pageBackCover(mode)
        : mode === 'E' ? pageBackCoverE(mode) : '');
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
        ${link({ mode: 'D' }, 'D · Fotoğraf Defteri', MODE === 'D')}
        ${link({ mode: 'E' }, 'E · Riviera', MODE === 'E')}
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
