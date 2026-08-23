# EKSİK ÜRÜNLER — Konsept menü ↔ Erenköy gerçek menüsü

Kaynak: SaltBae Burger Erenköy FineDine QR menüsü, 2026-08-22 çekimi
(ham veri: `menu/data/source-erenkoy.json`, 10 bölüm · 55 ürün).
Fiyat işleme: `menu/data/pricing-istanbul.js`.

---

## 1. Konseptte var, Erenköy menüsünde YOK (fiyat kaynağı bulunamadı)

Bu ürünler konsept dokümanı Bölüm 3'ten geliyor; Erenköy listesinde
karşılıkları olmadığından fiyatları `---` kaldı. Ya başka şubenin
listesinden fiyatlanmalı ya da lansman ürünü olarak fiyat kararı verilmeli.

| Konsept ürünü | Bölüm | Not |
|---|---|---|
| Meat Sushi | Ateşten Önce | Erenköy'de çiğ et başlangıcı olarak yalnız Dana Carpaccio (1.250) var |
| Beef Tacos | Ateşten Önce | karşılığı yok |
| Steak Tartar | Ateşten Önce | karşılığı yok |
| Crispy Baby Squid | Ateşten Önce | karşılığı yok |
| Burrata | Ateşten Önce | karşılığı yok |
| Akdeniz Salatası | Ateşten Önce | Erenköy salataları (Bahçe 470, Avokado 580, Tulum Peynirli 500) içerik olarak farklı |
| Fillet Mignon | Kasabın Seçimi | Erenköy et hattı: New York 2.300, Dallas 2.600, Antrikot 2.200 — fillet mignon yok |
| Nusret Burger | Burger | ustanın adını taşıyan sade burger Erenköy'de yok (Saltbae Burger, siyah ekmeğiyle Saltbae Special'a eşlendi) |
| Baharatlı Patates | Yanında | Erenköy varyantları farklı: Trüflü & Parmesanlı 280, Dana Füme ve Cheddarlı 300 |

## 2. Erenköy menüsünde var, konsept menüde YOK

Konsept "Kasap Defteri" mimarisine alınmamış gerçek ürünler. Menü
mimarisi revizyonunda değerlendirilmek üzere:

| Erenköy ürünü | Fiyat (TL) | Erenköy bölümü |
|---|---|---|
| Woww Menü - Magnum Devils | 1.150 | Özel Menüler |
| Woww Menü - Baklava | 1.375 | Özel Menüler |
| Keko Shake Menü | 1.150 | Özel Menüler |
| Relax Menü | — | Özel Menüler |
| Bonfile Salata Menü | 1.100 | Özel Menüler |
| Köfteli Salata Menü | 925 | Özel Menüler |
| Dana Carpaccio | 1.250 | Başlangıçlar |
| Dana Füme | 775 | Başlangıçlar |
| Tulum Peynirli Salata | 500 | Salatalar |
| Avokado Salatası | 580 | Salatalar |
| Bahçe Salatası | 470 | Salatalar |
| Bonfile Salata | 1.050 | Salatalar |
| Köfteli Salata | 850 | Salatalar |
| Smoked Burger | 850 | Burgerler |
| Vejetaryen Burger | 550 | Burgerler |
| Asado Burger | 1.050 | Burgerler |
| New York Steak | 2.300 | Et |
| Dallas Steak | 2.600 | Et |
| Dana Antrikot | 2.200 | Et |
| Parmak Köfte / Cevapi | 775 | Et |
| Boşnak Köfte | 800 | Et |
| Gold New York Steak | 6.500 | Altın Ziyafet |
| Gold Dallas Steak | 7.000 | Altın Ziyafet |
| Gold Baklava | 1.400 | Altın Ziyafet |
| Mozzarella Çubukları | 300 | Yan Lezzetler |
| Patates Kızartması - Trüflü & Parmesanlı | 280 | Yan Lezzetler |
| Patates Kızartması - Dana Füme ve Cheddarlı | 300 | Yan Lezzetler |
| Soslar (9 çeşit) | 45–65 | Soslar |
| Magnum Devils | 375 | Tatlı |
| Sütlü Dondurma | 300 | Tatlı |
| Milkshake'ler (4 çeşit) | 475–820 | Milkshake |

## 3. Eşleşme gerekçeleri (fiyatı işlenenler)

| Konsept id | Erenköy ürünü | Gerekçe |
|---|---|---|
| lokum | Lokum (2.100) | birebir |
| saslik | Şaşlık (1.950) | birebir |
| cheese-steak-sandwich | Steak Sandwich (1.000) | sotelenmiş bonfile + cheddar + ekmek |
| juicy-burger | Juicy Burger (795) | birebir (dana füme, cheddar, karamelize soğan) |
| lokum-burger | Lokum Burger (1.050) | birebir (marine bonfile) |
| saltbae-special | Saltbae Burger (825) | siyah ekmek + dana füme + karamelize soğan — konseptin "mürekkep karası ekmek" tarifiyle birebir |
| mushroom-burger | Triple Mushroom Burger (875) | kestane + kültür + istiridye mantarı — konseptteki üç mantar |
| smoked-bbq-burger | BarbeQ Burger (825) | barbekü sos + dana füme + hibiskus tozu — konsept tarifinin aynısı |
| avocado-burger | Avokado Burger (795) | birebir |
| nusret-special-24k | Gold Burger (2.900) | yenilebilir altın yaprak + dana füme + çıtır soğan + cheddar — konsept tarifiyle birebir |
| fries | Patates Kızartması (175) | birebir |
| onion-crisps | Çıtır Yaprak Soğan (240) | birebir |
| baklava | Havuç Dilim Baklava (525) | menüdeki tek altınsız baklava |

Not: Çıpa kuralı sağlanıyor — Gold Burger (2.900) işlenen listenin en
yüksek fiyatlı ürünü ve Ritüel sayfasında tek başına duruyor. (Erenköy'ün
Gold New York/Dallas steak'leri konsept menü mimarisinde yer almıyor;
alınırlarsa çıpa ürün yeniden değerlendirilmeli.)
