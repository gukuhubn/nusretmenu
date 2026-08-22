# assets/ — varlık sözleşmesi

Menüdeki her görsel alan bir `<image-slot>` yuvasıdır ve bir `data-asset-id`
taşır. Bir dosyayı **aynı isimle** bu klasöre bırakmanız yeterlidir; sayfa
yenilendiğinde yuva kendiliğinden dolar. Kod değişikliği gerekmez.

| `data-asset-id`  | Nerede                     | Kutu           | Brief |
|------------------|----------------------------|----------------|-------|
| `logo-mark`      | Mod A kapak                | 36 × 36 mm daire | figürsüz logo, kabartma |
| `cut-diagram`    | Mod A · Kasabın Seçimi     | tam genişlik × 58 mm | dana kesim diyagramı, gravür (Gemini 5.2.1) |
| `motif-flame`    | Mod A · Burger             | 42 × 42 mm daire | alev gravürü (Gemini 5.2.4) |
| `cover-portrait` | Mod B kapak                | tam genişlik, ≥60 mm | kapak portresi — duman, havada tuz taneleri (Gemini 5.3.5) |
| `hero-steak`     | Mod B · Kasabın Seçimi     | tam genişlik × 62 mm | steak portresi, hero (Gemini 5.3.3) |
| `hero-burger`    | Mod B · Burger             | tam genişlik × 52 mm | hero burger — eriyen cheddar, buhar (Gemini 5.3.1) |
| `seal`           | Mühürlü ürünler (Lokum, Nusret Burger) | 18 mm / 16 mm daire | kasabın işareti mührü — **opsiyonel**, boşken CSS ile çizili mühür kullanılır |

## Kabul edilen uzantılar

`webp` → `png` → `jpg` → `jpeg` → `svg` sırasıyla denenir (ilk bulunan kazanır).
Sıra `data/config.js` içindeki `assetExtensions` ile değiştirilebilir.

Örnek: `assets/cut-diagram.png`

## Boş yuva davranışı

Dosya yoksa yuva **boş kalır** ve gravür tonunda kesik çizgili bir placeholder
gösterir — kırık görsel ikonu asla çıkmaz. `src` yalnızca dosya gerçekten
yüklendiğinde atanır.

## reference/

`reference/` klasörü **final varlık değildir**: mevcut envanterin referans
fotoğrafları içindir ve hiçbir menü yuvasına bağlanmaz.

## Baskı çözünürlüğü

A4 300 dpi için hedef genişlikler: tam genişlik görseller ≈ 2150 px,
42 mm daire ≈ 500 px, 36 mm daire ≈ 425 px.
