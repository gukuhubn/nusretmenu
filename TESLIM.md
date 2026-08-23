# TESLİM — Ustanın Defteri / SaltBae Burger

Branch: `claude/konsept-dokumantasyon-gemini-kgko2u` · Repo: `gukuhubn/nusretmenu`
Son güncelleme: Revizyon turu 4 — final cila (yalnız Mod C)

---

## Teslim edilenler

| Ne | Nerede | Durum |
|----|--------|-------|
| Konsept dokümanı v1.0 | `docs/SB_MENU_KONSEPT_PAKETI.md` | repoda |
| Uygulanmış menü (18 sayfa: mod başına 6) | `menu/` | **metinler tam** |
| Mod A PDF (İllüstrasyon) | `output/kasap-defteri-mod-a.pdf` | 6 sayfa |
| Mod B PDF (Karanlık Portre) | `output/kasap-defteri-mod-b.pdf` | 6 sayfa |
| Mod C PDF (Zengin Defter) | `output/kasap-defteri-mod-c.pdf` | 6 sayfa |
| Gemini menü varlıkları (25 adet) | `menu/assets/*.png` | üretildi |
| Galeri artwork'leri (2 + 6 varyant) | `output/galeri/` | üretildi, seçim yapıldı |
| Erenköy fiyatları | `menu/data/pricing-istanbul.js` | 13 ürün gerçek TL (baskıya girmez) |
| Erenköy ham verisi | `menu/data/source-erenkoy.json` | 10 bölüm · 55 ürün |
| Eksik ürün analizi | `EKSIK_URUNLER.md` | iki yönlü liste |
| Üretim betikleri | `tools/build-pdf.js`, `tools/gen-assets.js`, `tools/alpha-key.js`, `tools/gen-galeri.js` | çalışıyor |

## Revizyon turu 4 — final cila (yalnız Mod C; A ve B'ye dokunulmadı)

Teslim: `output/kasap-defteri-mod-c.pdf` (bu turda yalnız bu PDF yenilendi).

1. **Ürün mini gravürleri.** 20 spot gravür (`mini-<ürün-id>`), her ürün
   adının önünde ~12 mm; satır ikonunun (CSS cleaver) yerini aldı.
   Baharatlı Patates kova minisini sade patatesle paylaşır. Tek bakır
   çizgi, tutarlı kontur — seri kontak föyüyle denetlendi; standart dışı
   kalan 3 mini (mushroom: zemin ışıması, nusret: köftesiz, baklava:
   okunmayan blok) 1 turda yeniden üretildi. Hepsi alpha-key'li.
2. **Ritüel sahnesi.** Tuz jesti küçülüp sağ üst köşe motifi oldu
   (`ritual-motif` — A'nın vinyetli halini bozmamak için ayrı şeffaf
   türev, sert eşikle key'lendi). Merkezde tam genişlik `ritual-hero`:
   altın varaklı burger, çelik tepsi, dökülen tuz, tek ışık hüzmesi
   (ilk çıktıda model markası metni, ikinci çıktıda bej zemin —
   2. yeniden üretimde koyu zemin vurgusuyla oturdu). Altında tezhip
   tarzı `ritual-band`.
3. **Boşluk dolgusu.** Burger sayfası ürün bloğu dikey ortalandı + alt
   banda `band-grill` (közde ızgara; alev kolofonunun yerini aldı, ateş
   teması banda taşındı). Ustanın Ayırdığı altına `band-knives`,
   Ateşten Önce altına `band-mezze` (üst motif C'de 52→40 mm kısaldı,
   yer açmak için), Yanında→Tatlı Son ayracı `divider-honey` (bal +
   baklava; tuz kabı vinyetinin yerine).
4. **İncelik standardı.** Tüm yeni varlıklar kontak föyünde denetlendi:
   çizgi kalınlığı, düz 2B, gravür taraması, temiz kenar. 4 varlık
   yeniden üretildi (en fazla 2 tur kuralı içinde).
5. **Düzeltmeler.** Üst köşe flourish'leri %30 küçültülüp içeri alındı
   (22→15,4 mm); drop cap kopukluğu giderildi — float yerine satır içi
   büyük ilk harf, kelime bitişik akıyor.
6. **Metin revizyonları.** Meat Sushi, Çıtır Soğan ve Baharatlı Patates
   metinleri TR+EN güncellendi.

## Revizyon turu 3

**A · İsim revizyonu.** Menü çıktısında konsept adı "Ustanın Defteri /
The Master's Ledger" oldu (kapak, cari başlıklar, sekme başlığı). Bölüm II
"Ustanın Ayırdığı / The Master's Cut"; mühür "USTANIN İŞARETİ". Gövde
metinlerindeki kasap→usta dönüşümü yapıldı; **manifesto dokunulmadı** —
"kasap çırağı / butcher's apprentice" köken hikayesi olarak duruyor.
(Repo/dosya adlarındaki "kasap-defteri" teknik kimlik olarak korundu.)

**B · Final rötuş.**
1. PDF'lerde tüm fiyatlar `---` basılıyor (`?prices=mask`, build-pdf
   varsayılanı). Pricing dosyaları repoda; ekranda gerçek fiyat görünür.
2. Mod B foto altı teknik etiket şeritleri kaldırıldı (SAYFANIN TABLOSU,
   35°/IŞIK/DUMAN, ÇELİK TEPSİ vb.). Mod A kesim diyagramı kaydı duruyor.
3. Ritüel tuz jesti çizimi yumuşak vinyete alındı (radyal maske) ve
   Ritüel bölüm girişi ("Bazı sayfalar okunmaz, izlenir") sayfaya basıldı.
4. `motif-side` değiştirildi: ekmek kesiti okunmuyordu → "çelik kovada
   patates" gravürü yeniden üretildi.
5. `burger-cut` (katmanları görünür burger kesiti gravürü) üretildi;
   Mod A burger sayfasında alev motifinin yerini aldı.

**C · Mod C "Zengin Defter"** (`?mode=C`, Mod A iskeleti + süsleme katmanı):
- 4 köşe flourish (bıçak/çengel/tuz/defne; sol-üst üretim + CSS aynalama)
- Çift çizgili çerçeve, ürün adlarında minik satır (cleaver) ikonu,
  bölüm açılışlarında drop cap
- Ayraç vinyetleri (kapakta çapraz bıçak; Yanında→Tatlı Son geçişinde
  tuz kabı + defne), sayfa numarası madalyonu (gövde sayfaları 1–5)
- Burger sayfasında burger kesiti + sağ altta alev kolofonu birlikte
- Süsleme PNG'lerinin koyu zeminleri `tools/alpha-key.js` ile gerçek
  şeffaflığa çevrildi (luminance key) — yeniden üretimde tekrar çalıştırın.
- Doğrulama: 18 sayfanın tamamı 210×297 mm, taşma yok; süslemeler mutlak
  konumlu, metin akışına dokunmuyor.

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
node tools/build-pdf.js                      # üç modun PDF'i (fiyatlar maskeli)
GEMINI_API_KEY=... node tools/gen-assets.js  # menü varlıkları
node tools/alpha-key.js                      # süsleme zeminlerini şeffaflaştır (gen-assets sonrası ŞART)
GEMINI_API_KEY=... node tools/gen-galeri.js --model gemini-3-pro-image  # galeri
```
