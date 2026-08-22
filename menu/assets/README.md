# assets/ — varlık sözleşmesi

Menüdeki her görsel alan bir `<image-slot>` yuvasıdır ve bir `data-asset-id`
taşır. Bir dosyayı **aynı isimle** bu klasöre bırakmanız yeterlidir; sayfa
yenilendiğinde yuva kendiliğinden dolar. Kod değişikliği gerekmez.

| `data-asset-id`  | Nerede                     | Kutu           | Brief |
|------------------|----------------------------|----------------|-------|
| `logo-mark`      | Mod A kapak                | 88 × 26 mm, `contain` | **HAZIR** — figürsüz `#saltbae BURGER` kilit logosu, tek renk kemik |
| `logo-burger`    | (yedek / genel kullanım)   | serbest        | **HAZIR** — aynı kilit logo, ayrı asset-id ile |
| `cut-diagram`    | Mod A · Kasabın Seçimi     | tam genişlik × 58 mm | dana kesim diyagramı, gravür (Gemini 5.2.1) |
| `motif-flame`    | Mod A · Burger             | 42 × 42 mm daire | alev gravürü (Gemini 5.2.4) |
| `cover-portrait` | Mod B kapak                | tam genişlik, ≥60 mm | kapak portresi — duman, havada tuz taneleri (Gemini 5.3.5) |
| `hero-steak`     | Mod B · Kasabın Seçimi     | tam genişlik × 62 mm | steak portresi, hero (Gemini 5.3.3) |
| `hero-burger`    | Mod B · Burger             | tam genişlik × 52 mm | hero burger — eriyen cheddar, buhar (Gemini 5.3.1) |
| `seal`           | Mühürlü ürünler (Lokum, Nusret Burger) | 18 mm / 16 mm daire | kasabın işareti mührü — **opsiyonel**, boşken CSS ile çizili mühür kullanılır |

## Logo varlıklarının kaynağı

`logo-mark.svg` ve `logo-burger.svg`, Drive'daki
`SALTBAE LOGOLAR / saltbae_logolar_toplu.pdf` (sayfa 3, kemik/yeşil varyant)
vektör verisinden üretildi. Gövde tek renk kemik (`#e9e1d1`), harf oyukları
**şeffaf** — koyu zeminde zeminin rengini gösterir, beyaz kutu oluşturmaz.

Marka dosyasındaki beş varyantın hepsi **aynı kilit logodur**; `#saltbae` ile
`BURGER` tek parça olarak kaynaşmıştır. Bu yüzden `logo-mark` ve `logo-burger`
şu an aynı artwork'tür. Ayrı bir "BURGER etiketi" veya `BURGER`siz sade
`#saltbae` sürümü gerekiyorsa katmanlı `.ai` dosyasından Illustrator'da
ayrıştırılmalıdır.

**Not:** Kapak kutusu tasarımdaki 36 mm daireden 88 × 26 mm dikdörtgene
açıldı — kilit logo yatay (3,4:1) ve daire onu kırpıyordu. Daireye dönmek
isterseniz `js/menu.js` içindeki `logo-mark` slot çağrısı tek satırdır.

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
