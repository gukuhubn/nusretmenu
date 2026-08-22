# TESLİM — Kasap Defteri / SaltBae Burger

Branch: `design-kasap-defteri` · Repo: `gukuhubn/nusretmenu`
Son güncelleme: Revizyon turu 1

---

## Teslim edilenler

| Ne | Nerede | Durum |
|----|--------|-------|
| Uygulanmış menü (12 sayfa: mod başına 6) | `menu/` | çalışıyor |
| Mod A PDF | `output/kasap-defteri-mod-a.pdf` | 6 sayfa |
| Mod B PDF | `output/kasap-defteri-mod-b.pdf` | 6 sayfa |
| PDF üretim betiği | `tools/build-pdf.js` | `node tools/build-pdf.js` |
| Görev listesi | `GOREVLER.md` | güncel |

## Sayfa yapısı (mod başına)

| # | Bölüm | Ürün | Metin durumu |
|---|-------|------|--------------|
| 1 | Kapak (Manifesto Mod A'da kapakta akar) | — | **tam** |
| 2 | I · Ateşten Önce | 6 | **bekleniyor** |
| 3 | II · Kasabın Seçimi | 4 | **tam** |
| 4 | III · Steakhouse Ruhu, Burger Formu | 7 | **tam** |
| 5 | IV · Ritüel (Nusret Special 24K Gold) | 1 | **bekleniyor** |
| 6 | V · Yanında (3) + Tatlı Son (Baklava) | 3 + 1 | **bekleniyor** |

Manifesto ayrı sayfa da olabilir: `content.js → sections.manifesto.body`
doldurulduğu an kapaktan sonra ayrı sayfa olarak basılır, kod değişmez.

Ritüel sayfasında altın vurgu (`#d4af37`) yalnız o sayfada geçerlidir;
defterin geri kalanı pirinç (`#b5824c`) kalır.

## Logo varlıkları

`menu/assets/logo-mark.svg` + `logo-burger.svg` — Drive'daki marka dosyasından
(`SALTBAE LOGOLAR / saltbae_logolar_toplu.pdf`, s.3) vektör olarak çıkarıldı,
tek renk kemik (`#e9e1d1`), harf oyukları şeffaf. Mod A kapağında otomatik doluyor.

Bulunamayanlar: ayrı **BURGER etiketi** (marka dosyasında kilit logoyla tek parça)
ve **Nusret logosu** (logo klasöründe yok, yalnız sunum PDF'lerinin içinde).

**Öneri:** Kapakta artık hem tipografik `SALTBAE / BURGER` satırları hem de
kilit logo var — ikisi aynı şeyi söylüyor. Tipografik satırların kaldırılması
sayfayı sadeleştirir; karar sizin, tek satırlık değişiklik.

## Bu turda tamamlananlar

- **Eksik sayfa şablonları kuruldu** — Ateşten Önce, Ritüel, Yanında + Tatlı Son,
  opsiyonel Manifesto. Numaralandırma I–V'e taşındı.
- **Fontlar gömüldü** — `menu/assets/fonts/` (13 woff2, 34 `@font-face`).
  Sayfa artık **sıfır dış istekle** açılıyor; matbaa teslimi internete bağlı değil.
  Doğrulandı: tüm dış istekler kesilmiş tarayıcıda gerçek Cormorant/Archivo çiziliyor.
- **Logo bulundu ve gömüldü** — Drive'dan vektör çıkarımı, tek renk kemik SVG.
- **PDF çifti** üretildi, `output/` altına kondu.
- Doğrulama: 12 sayfanın tamamı tam 210 × 297 mm, hiçbirinde taşma yok.

## Metin gelince ne yapılacak

Sadece `menu/data/content.js` → `items.starters` / `items.ritual` /
`items.sides` / `items.desserts` dizileri doldurulur ve ilgili
`sections.*.ledeTr/ledeEn` yazılır. Layout'a, CSS'e, şablona dokunulmaz.
Boş kalan bölümler baskıda "ÜRÜN METNİ BEKLENİYOR" rozetiyle görünür —
sessizce boş kalmaz, taslak olduğu belli olur.

Bölüm başlıklarının İngilizce karşılıkları (BEFORE THE FIRE, THE RITUAL,
ALONGSIDE, A SWEET ENDING) **taslak çeviridir**; konsept dokümanındaki
karşılıklarıyla değiştirilmelidir.

## Tamamlanamayanlar

Üçü de bende değil, girdi bekliyor — ayrıntı `GOREVLER.md`'de:

1. **Konsept dokümanı yok.** Bölüm 3 (metinler) ve Bölüm 5 (varlık brief'leri)
   bu workspace'te, GitHub reposunda ve Drive'da bulunamadı.
2. **FineDine hâlâ engelli.** `finedinemenu.com`, `www.`, `api.`, `qr.` —
   dördü de proxy'de `403`. Fiyatlar bu yüzden `---`.
3. **`GEMINI_API_KEY` tanımlı değil.** Ortamda yok; alternatif isimler de yok.
   Varlık üretimi bu yüzden başlamadı, yuvalar placeholder'da.
