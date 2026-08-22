# Galeri konsept görselleri — prompt kaydı

Üretim **beklemede**: `GEMINI_API_KEY` ortamda tanımlı değil.
Ağ tarafı hazır — `generativelanguage.googleapis.com` erişilebilir durumda
(anahtarsız çağrı Google'ın kendi `403 "unregistered caller"` yanıtını
döndürüyor, proxy engeli değil). Anahtar tanımlanır tanımlanmaz:

```bash
GEMINI_API_KEY=... node tools/gen-galeri.js
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
