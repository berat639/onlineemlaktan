# Emlak İlan Vitrini (satariz.com yapısı, modern arayüz)

Sadece Emlak kategorisine odaklanan, tamamen Türkçe bir ilan vitrini. Bu ilk sürüm demo verilerle çalışır — üyelik, ilan verme ve veritabanı yok.

## Kategoriler

Sol menüde tek üst kategori (Emlak) ve alt kategoriler:
Konut, İş Yeri, Toprak, Konut Projeleri, Komple Bina, Devre Mülk, Turistik Tesis. Her alt kategorinin yanında ilan adedi görünür.

## Sayfalar

- **Ana sayfa (/)** — üst arama çubuğu, sol kategori menüsü, "Vitrin İlanları" başlıklı ilan kartı grid'i (fotoğraf, başlık, fiyat, konum, favori kalbi, ilan tipi rozeti), altta kategori bağlantılı footer.
- **Kategori sayfası (/emlak/$kategori)** — seçilen alt kategorinin ilanları; il/ilçe, fiyat aralığı, oda sayısı, m², satılık/kiralık filtreleri ve sıralama (en yeni / fiyat artan-azalan).
- **İlan detayı (/ilan/$id)** — fotoğraf galerisi, fiyat, başlık, açıklama, özellik tablosu (m², oda, bina yaşı, kat, ısıtma vb.), ilan sahibi kartı ve iletişim butonu, benzer ilanlar.

## Görsel yön

satariz.com'un düzen mantığı korunur (sol kategori sütunu + yoğun ilan grid'i), ama daha modern: net tipografi hiyerarşisi, yumuşak kart gölgeleri, sıcak turuncu vurgu + nötr yüzeyler, ferah boşluklar. Renk/gölge/radius değerleri `src/styles.css` içinde semantik token olarak tanımlanır; bileşenlerde sabit renk sınıfı kullanılmaz. Mobilde kategori menüsü açılır panele dönüşür.

## Teknik notlar

- Demo veri `src/data/listings.ts` içinde tiplenmiş sabit dizi; kategori sayımları buradan türetilir.
- Rotalar: `src/routes/index.tsx` (placeholder yerine), `src/routes/emlak.$kategori.tsx`, `src/routes/ilan.$id.tsx`; her rotada kendine özgü `head()` meta (başlık, açıklama, og).
- Ortak bileşenler: `SiteHeader`, `CategorySidebar`, `ListingCard`, `ListingGrid`, `FilterBar`, `SiteFooter`.
- Favori kalbi yalnızca yerel bileşen durumu (kalıcı değil).
- İlan görselleri için birkaç adet üretilmiş emlak fotoğrafı `src/assets` altında kullanılır.

## Sonraki adım (opsiyonel)

İleride Lovable Cloud ile üyelik, gerçek ilan verme ve kalıcı favoriler eklenebilir.
