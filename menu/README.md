# Kasap Defteri — SaltBae Burger

`project/Kasap Defteri Menu.dc.html` tasarımının uygulanmış hâli.
A4 dikey, baskıya hazır, bağımlılıksız. Derleme adımı yoktur:
`menu/index.html` dosyasını tarayıcıda açmanız yeterlidir.

## Tek şablon, iki çıktı

| URL | Çıktı |
|-----|-------|
| `index.html?mode=A`  | **Mod A · İllüstrasyon** — kapak + Kasabın Seçimi + Burger (3 sayfa) |
| `index.html?mode=B`  | **Mod B · Karanlık Portre** — kapak + Kasabın Seçimi + Burger (3 sayfa) |
| `index.html?mode=AB` | Altı sayfa arka arkaya (karşılaştırma / tam set) |

Ek parametreler: `?region=istanbul|dubai`, `?prices=off`.
Ekrandaki araç çubuğu bunları tıklamayla değiştirir ve **baskıya girmez**.

Varsayılanlar `data/config.js` içindedir — URL parametresi vermezseniz o geçerlidir.

## Dosya düzeni

```
index.html              şablon kabuğu (yapı yok, sadece yükleme sırası)
css/menu.css            tüm düzen — 6 sayfanın birebir geometrisi + baskı kuralları
js/menu.js              şablon: içerik + fiyat → sayfa; mod anahtarı burada
js/image-slot.js        tasarım bundle'ından, değiştirilmedi
data/config.js          mod, bölge, fiyat görünürlüğü, varlık uzantıları
data/content.js         TÜM metinler ve ürünler (TR/EN) — layout'tan ayrık
data/pricing-istanbul.js  fiyat katmanı · İstanbul
data/pricing-dubai.js     fiyat katmanı · Dubai
assets/                 görsel varlıklar (bkz. assets/README.md)
```

**İçerik/layout ayrımı:** metin değiştirmek için `data/content.js`, fiyat
değiştirmek için `data/pricing-*.js` yeterlidir. Bu dosyalarda hiçbir düzen
bilgisi, `js/menu.js` ve `css/menu.css` içinde ise hiçbir metin yoktur.
Ürünlerin `id` alanı iki katmanı birbirine bağlar.

## Fiyatlar

Şu an tümü `---` placeholder. Gerçek liste geldiğinde yalnızca ilgili
`data/pricing-*.js` dosyasındaki değerler yazılır; layout'a dokunulmaz.
Fiyat sembolsüz basılır (tasarım kararı).

## Görseller

Her görsel alan bir `<image-slot>` yuvasıdır ve `data-asset-id` taşır.
`assets/` klasörüne **aynı isimle** bir dosya bırakın, yuva kendiliğinden
dolar — kod değişikliği gerekmez. Yuva boşken gravür tonunda kesik çizgili
bir placeholder görünür; kırık görsel ikonu hiçbir zaman çıkmaz.
Varlık listesi ve baskı çözünürlükleri: `assets/README.md`.

Yuvalar ayrıca sürükle-bırak kabul eder (tasarım aracındaki davranış korundu).

## Baskı / PDF

Araç çubuğundaki **Yazdır / PDF** düğmesi ya da tarayıcıdan yazdır.
`@page { size: 210mm 297mm; margin: 0 }` pinlenmiştir: her sayfa tam taşma
tek yaprak olarak çıkar, kenar boşluğu tasarımın kendi iç payındadır.
Yazdırma penceresinde ölçek **%100 / "Gerçek boyut"** ve arka plan grafikleri
açık olmalıdır.

Doğrulandı: altı sayfa da tam olarak 210 × 297 mm kutuya oturuyor, hiçbir
sayfada taşma yok (Cormorant Garamond + Archivo gerçek metrikleriyle).

## Yazı tipleri

Cormorant Garamond + Archivo, Google Fonts üzerinden yüklenir; bu yüzden ilk
açılışta internet gerekir. Tamamen çevrimdışı/matbaa teslimi için fontları
yerelleştirmek isterseniz söyleyin, `assets/fonts/` altına gömerim.
