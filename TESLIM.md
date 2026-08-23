# TESLİM — Ustanın Defteri / SaltBae Burger

Branch: `claude/konsept-dokumantasyon-gemini-kgko2u` · Repo: `gukuhubn/nusretmenu`
Son güncelleme: Revizyon turu 6 — kurucu katmanı, fiziksel defter kimliği, palet (yalnız Mod C)

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

## Revizyon turu 6 — kurucu katmanı + defter kimliği (yalnız Mod C)

Teslim: `output/kasap-defteri-mod-c.pdf` — **9 sayfa, 4,4 MB** (hedef <10).
Sayfa düzeni: Kapak · Ateşten Önce · Ustanın Ayırdığı · Burger · Ritüel ·
Yanında/Tatlı Son · Ustanın Yolu · Künye · Arka Kapak.
(Not: künye + arka kapak eklenince sayfa sayısı brief'teki "7-8"i bir aştı.)

**0 · Referanslar.** Drive klasöründeki 12 fotoğraf indirildi, Instagram
arayüz öğeleri kırpıldı, içeriğe göre adlandırılıp
`menu/assets/reference/founder/` altına kondu (salt-gesture, cutting-gold,
counter-pose, suit-portrait, standing-street, knife-steel …).
⚠️ **Bu kareler konsept referansıdır** (sosyal medya çıktısı, ekran
çözünürlüğü); baskı finali için orijinal kareler marka arşivinden
alınmalıdır. Ham indirilenler repoya girmez (founder-raw gitignore'da).

**1 · Model stratejisi.** Keşif/varyant `gemini-3.1-flash-image` (tuz jesti
ve ayakta figür kompozisyonları önce flash ile denendi, kurgu seçildi);
tüm finaller `gemini-3-pro-image` + ilgili referans fotoğraflar API'ye
görsel olarak verilerek üretildi (`tools/gen-founder.js`).

**2 · Kurucu illüstrasyon seti** (gravür, bakır çizgi, referanslı):
- `founder-salt` → Ritüel hero'sunun yerine (figür sağda, tuz kolundan
  süzülüyor, solda altın vurgulu burger, ışık huzmesi)
- `founder-counter` → Ateşten Önce açılış bandı
- `founder-cutting` → Ustanın Ayırdığı alt bandı (bıçak seti bandı yerine;
  boğa diyagramı yerinde kaldı)
- `founder-standing` → Ustanın Yolu üst yarı figürü
- `founder-glasses` → imza ikonu; **mühür konsepti değişti**: USTANIN
  İŞARETİ çemberinde bıçağın yerini yuvarlak gözlük aldı (`seal` yeniden
  üretildi), sayfa madalyonunun tepesine de gözlük işlendi.

**3 · Fotoğraf katmanı** (bakır duotone, `tools/duotone.js`):
- Arka kapak: takım elbiseli spot ışıklı portre, tam sayfa + "Defteri
  tutan el. / The hand that keeps the ledger."
- Kapakta manifesto yanı: et vitrini karesi yarım bant (gravür vinyeti
  kapaktan kalktı — sayfa foto-ağırlıklı). Foto sayfalarında köşe
  süslemeleri basılmaz (`page--photo`).

**4 · Palet.** Mod C zemini sıcak kahve-antrasit karışıma alındı
(#26211c yönü) + merkezi ~%7 aydınlık radyal ışık vinyeti; bakır korundu.

**5 · Fiziksel defter kimliği.** Yeni "Künye / Colophon" sayfası:
`colophon-book` teknik gravürü (deri cilt, kabartma gözlük amblemi, bakır
yaldız kenar, bordo kurdele + kılavuz çizgileri) ve 3 satır TR/EN
şartname. Ayrıca fotogerçekçi sunum mockup'ı: `output/mockup/menu-mockup.png`
(baskı malzemesi değildir).

**6 · Şube listesi.** 10 şube (Nişantaşı, Caddebostan, Galataport,
Istanbul Airport, Aqua Florya, Emaar Square, Kanyon, Galata, Mykonos,
DIFC), her biri 10 mm niş simge gravürüyle (Galata Kulesi, İGA kulesi,
yel değirmeni, The Gate, dalga cephe, rıhtım vinci+gemi, kule silueti,
dalga, art nouveau kemer, fener). Emaar vurgusu ve "Bu defter burada
açık" satırı korundu.

**7 · Nusret logosu.** Drive'daki "Nusr-Et Steakhouse Technical
Requirements" PDF'inden çıkarıldı (596×331), tek renk kemik + şeffaf
sürüm üretildi (`nusret-logo.png`); Ustanın Yolu altında saltbae kilit +
"bir Nusr-Et markasıdır / a Nusr-Et brand" + Nusr-Et logosu bloğu.

**8 · Boyut.** Kritik bulgu: Mod C'nin genel `image-slot` parlaklık
filtresi Chromium PDF'inde JPEG geçişini bozup panelleri tam çözünürlük
kayıpsız PNG'ye çeviriyordu (PDF 10,8 MB). Filtre küçük süsleme
yuvalarına daraltıldı (`.slot--plate` muaf), şeffaf PNG'lere 1100 px sınır
+ renk/alfa kuantizasyonu eklendi → **4,4 MB**. Ayrıca büyük dosya notu:
Drive MCP ~5 MB üstü dosyalarda takılıyor; NUSR-ET_PRESENTATION.pdf
(8,2 MB) bu yüzden okunamadı, logo küçük PDF'ten alındı.

## Revizyon turu 5 — yalnız Mod C (A ve B'ye dokunulmadı)

Teslim: `output/kasap-defteri-mod-c.pdf` — 7 sayfa, **7,7 MB** (hedef <15).

1. **Fiyatlar geri.** Mod C PDF'i gerçek Erenköy fiyatlarıyla basılıyor
   (`build-pdf` mod bazlı fiyat politikası: A/B `mask`, C `on`).
   Kaynakta karşılığı olmayan 9 ürüne segment emsaliyle **tahmini** fiyat
   atandı — onaya tabidir:

   | Ürün | Tahmini (TL) | Emsal |
   |---|---|---|
   | Meat Sushi | 1.150 | Dana Carpaccio 1.250 (çiğ et başlangıcı) |
   | Beef Tacos | 850 | Dana Füme 775 üstü |
   | Steak Tartar | 1.100 | çiğ premium, carpaccio bandı |
   | Crispy Baby Squid | 750 | deniz başlangıcı |
   | Burrata | 650 | peynir başlangıcı, salata bandı üstü |
   | Akdeniz Salatası | 550 | salatalar 470–580 |
   | Fillet Mignon | 2.400 | NY 2.300 / Dallas 2.600 arası |
   | Nusret Burger | 850 | Saltbae Burger 825 bandı |
   | Baharatlı Patates | 225 | sade 175, varyantlar 280–300 |

2. **Mini gravürler büyüdü.** 12 → 21 mm (ızgarada 17 mm). Yer, sayfa içi
   boşluklardan kırpıldı, metinden değil: C'de liste araları 7→5 mm,
   cari başlık altı 9→7 mm, Ateşten Önce üst motifi 40→28 mm.
3. **Renk ve kontrast.** C'de bakır #c88a4a (Ritüel altını #e3bd45),
   kemik #f4eedd; metin opaklıkları yükseldi (gövde .85→.94, EN .46→.60);
   gravürlere brightness/saturate filtresi. Yalnız C paleti — A/B değişmedi.
4. **Yeni sayfa: Ustanın Yolu.** Tatlı Son'dan sonra kapanış sayfası
   (yalnız C basıyor): köken metni TR+EN, iki sütun şube listesi
   (`content.js → branches`, şube başına {sehir, mekan, aktif} — şube
   baskısında tek bayrak değişir). Aktif şube (Emaar Square) bold parlak
   bakır + mühür ikonu + "Bu defter burada açık." satırı. Altta
   Erzurum'dan yola çıkan gravür yol bandı (`band-route`).
5. **Baskı optimizasyonu (kalıcı, build-pdf içinde).** Varlıklar basım
   öncesi `output/.assets-opt/` önbelleğinde ölçeklenir: mini 300 px,
   köşe/mühür/madalyon 480 px, geri kalan 1400 px (tam genişliğin ~2x'i);
   opaklar JPEG q85, şeffaflar sıkıştırılmış PNG; kazançsızsa orijinal
   korunur. PDF 16,4 → **7,7 MB**. Doğrulama: optimize pakette boş slot
   yok, 7 sayfa taşmasız.

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
