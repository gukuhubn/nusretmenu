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

## 5. Gemini ile varlık üretimi  `[ ]` BAŞLANMADI

Görev 4'e bağlı. Tasarımın istediği varlıklar:

- [ ] `logo-mark` — figürsüz logo, kabartma
- [ ] `cut-diagram` — dana kesim diyagramı, gravür (Gemini 5.2.1)
- [ ] `motif-flame` — alev gravürü (Gemini 5.2.4)
- [ ] `cover-portrait` — kapak portresi, duman + havada tuz (Gemini 5.3.5)
- [ ] `hero-steak` — steak portresi (Gemini 5.3.3)
- [ ] `hero-burger` — hero burger, eriyen cheddar + buhar (Gemini 5.3.1)
- [ ] `seal` — kasabın işareti mührü (şu an CSS ile çiziliyor, varlık opsiyonel)
