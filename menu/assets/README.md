# assets/ — varlık sözleşmesi

Menüdeki her görsel alan bir `<image-slot>` yuvasıdır ve bir `data-asset-id`
taşır. Bir dosyayı **aynı isimle** bu klasöre bırakmanız yeterlidir; sayfa
yenilendiğinde yuva kendiliğinden dolar. Kod değişikliği gerekmez.

| `data-asset-id`  | Nerede                     | Kutu           | Brief |
|------------------|----------------------------|----------------|-------|
| `logo-mark`      | Mod A kapak                | 88 × 26 mm, `contain` | **HAZIR** — figürsüz `#saltbae BURGER` kilit logosu, tek renk kemik |
| `logo-burger`    | (yedek / genel kullanım)   | serbest        | **HAZIR** — aynı kilit logo, ayrı asset-id ile |
| `cut-diagram`    | Mod A · Kasabın Seçimi     | tam genişlik × 58 mm | dana kesim diyagramı, gravür (Gemini 5.2.1) |
| `cover-portrait` | Mod B kapak                | tam genişlik, ≥60 mm | kapak portresi — duman, havada tuz taneleri (Gemini 5.3.5) |
| `hero-steak`     | Mod B · Kasabın Seçimi     | tam genişlik × 62 mm | steak portresi, hero (Gemini 5.3.3) |
| `hero-burger`    | Mod B · Burger             | tam genişlik × 52 mm | hero burger — eriyen cheddar, buhar (Gemini 5.3.1) |
| `seal`           | Mühürlü ürünler (Lokum, Nusret Burger, Meat Sushi) | 18 mm / 16 mm daire | ustanın işareti mührü — **opsiyonel**, boşken CSS ile çizili mühür kullanılır |
| `burger-cut`     | Mod A/C · Burger           | 42 mm daire    | burger kesiti gravürü (alev motifinin yerini aldı) |
| `motif-side`     | Mod A/C · Yanında          | tam genişlik × 44 mm | çelik kovada patates gravürü (5.2.6 ekmek kesiti okunmadı, değiştirildi) |
| `corner-knife/-hook/-salt/-laurel` | Mod C · her sayfa, 4 köşe | 22 mm | köşe flourish seti — sol-üst yönelimli, diğer köşeler CSS aynalama; **şeffaf zemin** |
| `divider-vignette-1` | Mod C · kapak           | 64 × 8 mm      | ayraç vinyeti: çapraz bıçak + masat; **şeffaf zemin** |
| `divider-vignette-2` | Mod C · Yanında/Tatlı Son ayracı | 82 × 11 mm | ayraç vinyeti: tuz kabı + defne; **şeffaf zemin** |
| `page-medallion` | Mod C · sayfa altı         | 11 mm daire    | sayfa numarası madalyonu, ortası boş; **şeffaf zemin** |
| `motif-flame`    | Mod C · Burger kolofonu    | 24 mm daire    | alev gravürü; **şeffaf zemin** (kendi çerçevesi kırpıldı) |

| `mini-<ürün-id>` (20 adet) | Mod C · her ürün satırı | 12 mm (ızgarada 10,5 mm) | ürün spot gravürleri; `spiced-fries` → `mini-fries` paylaşır; **şeffaf zemin** |
| `ritual-hero`    | Mod C · Ritüel             | tam genişlik × 62 mm | altın varaklı burger gravür hero (opak panel; altın bu sayfada serbest) |
| `ritual-band`    | Mod C · Ritüel             | 118 × 8 mm     | tezhip tarzı ayraç bandı; **şeffaf zemin** |
| `band-grill`     | Mod C · Burger alt bandı   | tam genişlik × 24 mm | közde ızgara gravürü; **şeffaf zemin** |
| `band-knives`    | Mod C · Ustanın Ayırdığı alt bandı | tam genişlik × 17 mm | bıçak seti bandı; **şeffaf zemin** |
| `band-mezze`     | Mod C · Ateşten Önce alt bandı | tam genişlik × 14 mm | zeytin/limon/tuz kasesi üçlüsü; **şeffaf zemin** |
| `divider-honey`  | Mod C · Yanında→Tatlı Son ayracı | 82 × 11 mm | bal damlası + baklava vinyeti (divider-vignette-2'nin yerine); **şeffaf zemin** |

**Şeffaf zeminli** işaretli varlıklar `tools/alpha-key.js` ile işlenmiştir
(luminance key). `gen-assets.js` bunları yeniden üretirse alpha-key
tekrar çalıştırılmalıdır; aksi halde sayfada opak kutu görünür.

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
