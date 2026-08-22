# GÖREVLER — Kasap Defteri / SaltBae Burger

Bağımlılık sırasına göre. Durum: `[x]` bitti · `[~]` yarım · `[ ]` başlanmadı · `[!]` engellendi.

---

## 1. Repo & push güvencesi  `[x]` TAMAM

- [x] `origin` remote eklendi → `https://github.com/gukuhubn/nusretmenu.git`
- [x] `design-kasap-defteri` branch'i oluşturuldu (`main`'e dokunulmadı)
- [x] Repo oturumun yetkili kaynaklarına eklendi (ilk push 403 vermişti)
- [x] Push çalışıyor — her aşamada commit + push yapılıyor

## 2. Tasarımın uygulanması: içerik/layout ayrımı + slot mimarisi  `[x]` TAMAM

Kaynak: `project/Kasap Defteri Menu.dc.html` (6 sayfa, A4 dikey, Mod A + Mod B).

- [x] Tasarım dosyası ve import'ları (`doc-page.js`, `image-slot.js`, `support.js`) okundu
- [x] `menu/data/content.js` — tüm TR/EN metinler ve ürünler, layout'tan ayrık
- [x] `menu/data/pricing-istanbul.js` — fiyatlar placeholder (`---`)
- [x] `menu/data/pricing-dubai.js` — fiyatlar placeholder (`---`)
- [x] `menu/css/menu.css` — 6 sayfanın birebir düzeni, A4 baskı geometrisi
- [x] `menu/js/menu.js` — tek şablondan `mode=A` / `mode=B` iki çıktı
- [x] `menu/index.html` — şablon kabuğu
- [x] `image-slot` mimarisi: her görsel alanda `data-asset-id`, `assets/` klasörüne
      aynı isimle düşen dosya otomatik dolar, boşken gravür tonunda placeholder
      (kırık görsel yok) — otomatik dolum testle doğrulandı
- [x] Doğrulama: Chromium + gerçek font metrikleri ile 6 sayfa da tam
      210 × 297 mm, hiçbir sayfada taşma yok; baskıda araç çubuğu gizli
- [x] `menu/assets/README.md` — varlık isimlendirme sözleşmesi

## 3. FineDine Erenköy menüsünden veri çekme  `[!]` ENGELLENDİ

- [!] `qr.finedinemenu.com` bu oturumun ağ politikası tarafından engelli
      (proxy `403 CONNECT tunnel failed`). Bu bir organizasyon egress politikası
      reddi; ortam dokümanı ve senin 4. maddendeki talimat gereği zorlanmadı.
- [ ] JS bundle'dan API endpoint tespiti
- [ ] `data/source-erenkoy.json`
- [ ] Fiyatların `pricing-istanbul.js`'e aktarılması (content.js metinleri ezilmeden)
- [ ] Bizde eksik ürünlerin ayrı listesi
- [ ] `assets/reference/` altına referans fotoğraflar

**Karar gerekiyor:** ağ izni açılsın mı, yoksa menü JSON'unu / fiyat listesini
sen mi vereceksin? Fiyatlar gelene kadar `---` placeholder olarak duruyor.
Fiyat geldiğinde tek dokunulacak yer: `menu/data/pricing-istanbul.js`.

## 4. Gemini API anahtarı  `[!]` ENGELLENDİ

- [!] Adım 1 (`env` taraması) Claude Code oto-mod izin sınıflandırıcısı
      tarafından reddedildi. Bilerek etrafından dolaşılmadı.
- [ ] GitHub repo variables (`gh variable list`)
- [ ] GCP Secret Manager (`gcloud secrets versions access`)
- [ ] `.env` yazımı + `.gitignore` (anahtar değeri asla loglanmayacak)
- [ ] Doğrulama isteği → "çalışıyor / çalışmıyor"

**Karar gerekiyor:** izin kuralı eklenmesi veya anahtarın doğrudan verilmesi.

## 5. Gemini ile varlık üretimi  `[!]` ENGELLENDİ

Görev 4'e bağlı — `GEMINI_API_KEY` ortamda tanımlı değil (kontrol edildi:
`GEMINI_API_KEY`, `GOOGLE_API_KEY`, `GOOGLE_GENAI_API_KEY`, `GEMINI_KEY`,
`GENAI_API_KEY`, `VERTEX_API_KEY`, `GOOGLE_APPLICATION_CREDENTIALS` — hepsi boş).
Ayrıca varlık brief'leri konsept dokümanı Bölüm 5'te ve o doküman elimde yok.
Aşağıdaki asset-id'ler tasarımdan türetildi; doküman gelince isimler eşlenebilir.

- [x] `logo-mark` — figürsüz kilit logo (Drive'dan bulundu, SVG'ye çevrildi)
- [ ] `cut-diagram` — dana kesim diyagramı, gravür (Gemini 5.2.1)
- [ ] `motif-flame` — alev gravürü (Gemini 5.2.4)
- [ ] `cover-portrait` — kapak portresi, duman + havada tuz (Gemini 5.3.5)
- [ ] `hero-steak` — steak portresi (Gemini 5.3.3)
- [ ] `hero-burger` — hero burger, eriyen cheddar + buhar (Gemini 5.3.1)
- [ ] `seal` — kasabın işareti mührü (şu an CSS ile çiziliyor, varlık opsiyonel)
- [ ] `motif-ember` / `hero-starter` — Ateşten Önce
- [ ] `ritual-gold-leaf` / `hero-ritual` — Ritüel (24K altın)
- [ ] `motif-side` / `hero-side` — Yanında

## 6. Eksik sayfalar (revizyon turu 1)  `[~]` ŞABLONLAR HAZIR, METİN BEKLENİYOR

- [x] Ateşten Önce (I) sayfa şablonu — 6 ürünlük liste
- [x] Ritüel (IV) tek ürünlük sahne sayfası — altın vurgu yalnız bu sayfada
- [x] Yanında (V) + Tatlı Son aynı sayfada
- [x] Manifesto: kapakta akıyor; `sections.manifesto.body` dolarsa ayrı sayfa
- [x] Numaralandırma I–V'e taşındı
- [ ] Metinler — konsept dokümanı Bölüm 3 elimde yok

## 7. Fontların gömülmesi  `[x]` TAMAM

- [x] `menu/assets/fonts/` — 13 woff2, 34 `@font-face`, latin-ext dahil
- [x] `index.html` Google Fonts linki yerel kopyayla değiştirildi
- [x] Doğrulandı: tüm dış istekler kesilmiş tarayıcıda gerçek fontlar çiziliyor

## 8. Çıktılar  `[x]` TAMAM

- [x] `output/kasap-defteri-mod-a.pdf` (6 sayfa)
- [x] `output/kasap-defteri-mod-b.pdf` (6 sayfa)
- [x] `tools/build-pdf.js` — yeniden üretim betiği
- [x] `TESLIM.md`


## 9. Logo varlıkları  `[~]` KISMEN TAMAM

Kaynak GitHub değil Drive oldu: `gh` CLI bu ortamda kurulu değil, GitHub
üzerinden `gh repo list` / `gh search code` yapılamadı. Erişebildiğim tek repo
(`gukuhubn/nusretmenu`) yalnız bu çalışmanın commit'lerini içeriyor —
`git ls-remote`: tek dal, `design-kasap-defteri`.

- [x] Drive'da `SALTBAE LOGOLAR` klasörü bulundu (5 renk varyantı + AI + PDF)
- [x] `saltbae_logolar_toplu.pdf` s.3 vektör verisinden tek renk kemik SVG üretildi
- [x] `menu/assets/logo-mark.svg` — figürsüz kilit logo, oyuklar şeffaf
- [x] `menu/assets/logo-burger.svg` — aynı artwork, ayrı asset-id
- [x] Kapak kutusu logonun oranına açıldı (36 mm daire → 88 × 26 mm, `contain`)
- [ ] **Ayrı "BURGER etiketi"** — marka dosyasında `#saltbae` ile `BURGER`
      tek parça kaynaşmış; ayrıştırmak için katmanlı `.ai` gerekiyor
- [ ] **Nusret logosu** — `SALTBAE LOGOLAR` klasöründe yok. Drive'da yalnız
      `NUSR-ET_PRESENTATION.pdf` / `Florentia Village Proposal` gibi sunumların
      içinde geçiyor; ayrı bir logo varlığı olarak bulunamadı.
