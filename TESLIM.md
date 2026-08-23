# TESLİM — Kasap Defteri / SaltBae Burger

Branch: `claude/konsept-dokumantasyon-gemini-kgko2u` · Repo: `gukuhubn/nusretmenu`
Son güncelleme: Revizyon turu 2 — konsept dokümanı geldi, tüm içerik ve varlıklar tamamlandı

---

## Teslim edilenler

| Ne | Nerede | Durum |
|----|--------|-------|
| Konsept dokümanı v1.0 | `docs/SB_MENU_KONSEPT_PAKETI.md` | repoda |
| Uygulanmış menü (12 sayfa: mod başına 6) | `menu/` | **metinler tam** |
| Mod A PDF | `output/kasap-defteri-mod-a.pdf` | 6 sayfa, varlıklar dolu |
| Mod B PDF | `output/kasap-defteri-mod-b.pdf` | 6 sayfa, varlıklar dolu |
| Gemini menü varlıkları (16 adet) | `menu/assets/*.png` | üretildi |
| Galeri artwork'leri (2 + 6 varyant) | `output/galeri/` | üretildi, seçim yapıldı |
| Erenköy fiyatları | `menu/data/pricing-istanbul.js` | 13 ürün gerçek TL |
| Erenköy ham verisi | `menu/data/source-erenkoy.json` | 10 bölüm · 55 ürün |
| Eksik ürün analizi | `EKSIK_URUNLER.md` | iki yönlü liste |
| Üretim betikleri | `tools/build-pdf.js`, `tools/gen-assets.js`, `tools/gen-galeri.js` | çalışıyor |

## Sayfa yapısı (mod başına)

| # | Bölüm | Ürün | Metin | Fiyat |
|---|-------|------|-------|-------|
| 1 | Kapak | — | tam | — |
| 2 | I · Ateşten Önce | 6 | **tam** | kaynakta yok (`---`) |
| 3 | II · Kasabın Seçimi | 4 | tam | 3/4 işlendi |
| 4 | III · Steakhouse Ruhu, Burger Formu | 7 | tam | 6/7 işlendi |
| 5 | IV · Ritüel (Nusret Special 24K Gold) | 1 | **tam** | 2.900 (çıpa ✓) |
| 6 | V · Yanında (3) + Tatlı Son (1) | 3+1 | **tam** | 3/4 işlendi |

## Bu turda tamamlananlar

- **Konsept dokümanı** `docs/` altına kondu; Bölüm 3 metinleriyle Ateşten
  Önce, Ritüel, Yanında ve Tatlı Son dolduruldu. Taslak EN başlıklar
  dokümandaki karşılıklarıyla değiştirildi (ON THE SIDE, AFTER THE SALT).
- **Kapak revizyonu:** tipografik SALTBAE/BURGER satırları kaldırıldı;
  markayı kapakta yalnız kilit logo taşıyor, %25 küçültüldü
  (88×26 → 66×19,5 mm). Mod B kapağına da aynı logo yuvası eklendi.
  İç sayfalarda logo yok (cari başlık metin olarak kalıyor).
- **Gemini varlıkları (Bölüm 5):** 16 varlık `gemini-3-pro-image` ile
  üretildi, tüm slotlar doldu. Notlar: `seal` metinsiz olarak, `ritual-
  gold-leaf` düz çizgi illüstrasyon olarak ikinci turda yeniden üretildi;
  `cover-portrait` 5.3.5'ten **altınsız** türetildi (Bölüm 4.1: altın
  yalnız Ritüel sayfasında). Slot'suz yedekler: motif-knife,
  hero-burger-black, texture-kraft, texture-leather.
- **Galeri:** 2 natürmort × 3 varyant; seçimler ve gerekçeleri
  `output/galeri/PROMPTLAR.md` içinde.
- **FineDine Erenköy:** ağ izni açıldı; menü API üzerinden çekildi
  (auth: `POST /v2/mobile-menu/auth {slug}` → `GET /v1/entities/<id>/
  flat-list`). 13 ürünün gerçek fiyatı işlendi; eşleşme gerekçeleri hem
  `pricing-istanbul.js` satır içinde hem `EKSIK_URUNLER.md`'de.
- **Doğrulama:** 12 sayfanın tamamı 210 × 297 mm, taşma yok, bekleyen
  metin rozeti kalmadı; PDF çifti yeniden üretildi.

## Açık kalanlar

1. **Fiyatı bulunamayan 9 konsept ürünü** (`---` duruyor): Ateşten Önce'nin
   6 ürünü, Fillet Mignon, Nusret Burger, Baharatlı Patates — Erenköy
   menüsünde karşılıkları yok; ayrıntı `EKSIK_URUNLER.md` bölüm 1.
2. **Dubai fiyatları** hâlâ placeholder — liste verilmedi.
3. **Ayrı BURGER etiketi / Nusret logosu** — marka dosyasında ayrıştırılabilir
   katman yok (revizyon turu 1 notu geçerli).
4. AI fotoğraflar **onay aşaması yer tutucusudur**; nihai baskı öncesi
   profesyonel çekim gerekir (konsept dokümanı 4.3 uygulama notu).

## Yeniden üretim

```bash
node tools/build-pdf.js                      # PDF çifti
GEMINI_API_KEY=... node tools/gen-assets.js  # menü varlıkları
GEMINI_API_KEY=... node tools/gen-galeri.js --model gemini-3-pro-image  # galeri
```
