# Galeri konsept görselleri — prompt kaydı

Üretim **tamamlandı** (2026-08-22): `gemini-3-pro-image` modeliyle
iki artwork × 3 varyant üretildi. Yeniden üretim:

```bash
GEMINI_API_KEY=... node tools/gen-galeri.js --model gemini-3-pro-image
```

Betik model adını tahmin etmez: anahtarın erişebildiği görsel üretim
modellerini listeler ve ilkini kullanır (`--model <ad>` ile sabitlenebilir).

## Ortak stil kilidi

Her iki prompta aynen eklenir:

> 17th century Dutch Golden Age still life oil painting, dramatic chiaroscuro,
> single light source from upper left, near black background, visible oil paint
> texture and brushwork, rich amber and umber tones, museum quality, no text,
> no frame, no watermark

## 1 · `galeri-kapak.png`

> Raw beef tenderloin on crumpled butcher paper, a large knife beside it,
> scattered coarse salt crystals, composition centered like a Pieter Aertsen
> butcher still life

## 2 · `galeri-salon2.png`

> Seared beef tenderloin medallion glistening with melted butter, sprig of
> rosemary, dark pewter plate, steam barely visible

## Varyant ve seçim akışı

Her prompt için **3 varyant** üretilir ve hepsi
`output/galeri/varyantlar/<id>-v1..v3.png` altında **saklanır**.
Seçilen kare — fotoğraf gibi değil, yağlıboya gibi duran, fırça dokusu
görünen, kontrastı sert olan — `output/galeri/<id>.png` olarak kopyalanır.
Seçilmeyenler silinmez.

Seçim üretimden sonra yapılır: kareler görülmeden hangisinin daha resimsel
olduğuna karar verilemez.

## Seçim kaydı (2026-08-22)

- `galeri-kapak.png` ← **v2**. Gerekçe: v1'in sağ alt köşesinde model
  uydurması bir ressam imzası var (elenme sebebi); v3'te tuz yığını
  fotoğrafik duruyor. v2 imzasız, tek ışık huzmesi ve zemin fırça dokusuyla
  en yağlıboya duran kare.
- `galeri-salon2.png` ← **v2**. Gerekçe: perde draperisi ve ışık huzmesiyle
  eski usta kompozisyonuna en yakın kare; fırça dokusu fon ve masada
  belirgin. v1 daha yakın plan ama fon düz; v3'te ışık aşırı altın sarısı.
- Elenen varyantlar silinmedi: `varyantlar/<id>-v1..v3.png`.
