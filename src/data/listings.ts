import konut1 from "@/assets/konut-1.jpg";
import konut2 from "@/assets/konut-2.jpg";
import isyeri from "@/assets/isyeri.jpg";
import toprak from "@/assets/toprak.jpg";
import proje from "@/assets/proje.jpg";
import bina from "@/assets/bina.jpg";
import devremulk from "@/assets/devremulk.jpg";
import tesis from "@/assets/tesis.jpg";

export type CategorySlug =
  | "konut"
  | "is-yeri"
  | "toprak"
  | "konut-projeleri"
  | "komple-bina"
  | "devre-mulk"
  | "turistik-tesis";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
};

export const categories: Category[] = [
  { slug: "konut", name: "Konut", description: "Satılık ve kiralık daire, villa, müstakil ev ilanları." },
  { slug: "is-yeri", name: "İş Yeri", description: "Dükkan, ofis, depo ve fabrika ilanları." },
  { slug: "toprak", name: "Toprak", description: "Arsa, tarla, bağ ve bahçe ilanları." },
  { slug: "konut-projeleri", name: "Konut Projeleri", description: "Yeni ve devam eden konut projeleri." },
  { slug: "komple-bina", name: "Komple Bina", description: "Satılık ve kiralık komple bina ilanları." },
  { slug: "devre-mulk", name: "Devre Mülk", description: "Tatil bölgelerinde devre mülk ve devre tatil ilanları." },
  { slug: "turistik-tesis", name: "Turistik Tesis", description: "Otel, pansiyon ve tatil köyü ilanları." },
];

export type Listing = {
  id: string;
  title: string;
  price: number;
  category: CategorySlug;
  type: "Satılık" | "Kiralık";
  city: string;
  district: string;
  area: number;
  rooms?: string;
  floor?: string;
  buildingAge?: string;
  heating?: string;
  image: string;
  featured?: boolean;
  publishedAt: string;
  description: string;
  seller: { name: string; phone: string; kind: "Sahibinden" | "Emlak Ofisi" };
};

const seller = (name: string, kind: Listing["seller"]["kind"], phone = "0216 606 6000") => ({
  name,
  phone,
  kind,
});

export const listings: Listing[] = [
  {
    id: "1001",
    title: "Atatürk Mahallesi'nde 3+1 geniş balkonlu daire",
    price: 5100000,
    category: "konut",
    type: "Satılık",
    city: "İstanbul",
    district: "Ataşehir",
    area: 145,
    rooms: "3+1",
    floor: "4. Kat",
    buildingAge: "5 yaşında",
    heating: "Doğalgaz (Kombi)",
    image: konut1,
    featured: true,
    publishedAt: "2026-08-08",
    description:
      "Metroya yürüme mesafesinde, güneydoğu cepheli, açık mutfaklı ve geniş balkonlu daire. Site içerisinde otopark, güvenlik ve çocuk oyun alanı bulunmaktadır.",
    seller: seller("Akın Emlak", "Emlak Ofisi"),
  },
  {
    id: "1002",
    title: "Deniz manzaralı 2+1 sıfır daire",
    price: 3750000,
    category: "konut",
    type: "Satılık",
    city: "İzmir",
    district: "Karşıyaka",
    area: 110,
    rooms: "2+1",
    floor: "7. Kat",
    buildingAge: "Sıfır",
    heating: "Merkezi (Pay Ölçer)",
    image: konut2,
    featured: true,
    publishedAt: "2026-08-07",
    description:
      "Körfez manzaralı, asansörlü ve otoparklı binada teslime hazır sıfır daire. Ankastre mutfak ve akıllı ev sistemi dahildir.",
    seller: seller("Yılmaz Gayrimenkul", "Emlak Ofisi"),
  },
  {
    id: "1003",
    title: "Bahçe katı 1+1 eşyalı kiralık daire",
    price: 19000,
    category: "konut",
    type: "Kiralık",
    city: "Ankara",
    district: "Çankaya",
    area: 65,
    rooms: "1+1",
    floor: "Giriş Katı",
    buildingAge: "12 yaşında",
    heating: "Doğalgaz (Kombi)",
    image: konut1,
    publishedAt: "2026-08-06",
    description: "Üniversiteye yakın, tamamen eşyalı, bahçe kullanımlı kiralık daire. Aidat dahildir.",
    seller: seller("Mehmet Kaya", "Sahibinden"),
  },
  {
    id: "1004",
    title: "Yeni yapı sitede 4+1 dubleks",
    price: 8200000,
    category: "konut",
    type: "Satılık",
    city: "Bursa",
    district: "Nilüfer",
    area: 210,
    rooms: "4+1",
    floor: "Dubleks",
    buildingAge: "3 yaşında",
    heating: "Yerden Isıtma",
    image: konut2,
    publishedAt: "2026-08-05",
    description: "Havuzlu site içerisinde, teraslı dubleks daire. Kapalı otopark ve 24 saat güvenlik mevcuttur.",
    seller: seller("Nilüfer Emlak", "Emlak Ofisi"),
  },
  {
    id: "1005",
    title: "Cadde üzeri 90 m² devren dükkan",
    price: 3500000,
    category: "is-yeri",
    type: "Satılık",
    city: "İstanbul",
    district: "Kadıköy",
    area: 90,
    floor: "Zemin Kat",
    buildingAge: "8 yaşında",
    image: isyeri,
    featured: true,
    publishedAt: "2026-08-08",
    description: "Yoğun yaya trafiğine sahip cadde üzerinde, vitrinli, mutfak ve WC'si bulunan dükkan.",
    seller: seller("Selvitepe Gayrimenkul", "Emlak Ofisi"),
  },
  {
    id: "1006",
    title: "Plazada 180 m² kiralık ofis katı",
    price: 75000,
    category: "is-yeri",
    type: "Kiralık",
    city: "İstanbul",
    district: "Şişli",
    area: 180,
    floor: "12. Kat",
    buildingAge: "6 yaşında",
    heating: "Merkezi Klima (VRV)",
    image: isyeri,
    publishedAt: "2026-08-04",
    description: "Metro çıkışına 2 dakika, otoparklı plazada bölünmüş ofis katı. Resepsiyon ve toplantı odası dahil.",
    seller: seller("Metropol Ofis", "Emlak Ofisi"),
  },
  {
    id: "1007",
    title: "Sanayi bölgesinde 600 m² depo",
    price: 4200000,
    category: "is-yeri",
    type: "Satılık",
    city: "Kocaeli",
    district: "Gebze",
    area: 600,
    image: isyeri,
    publishedAt: "2026-08-03",
    description: "Tır giriş çıkışına uygun, yüksek tavanlı ve vinç altyapılı depo/imalathane.",
    seller: seller("Gebze Sanayi Emlak", "Emlak Ofisi"),
  },
  {
    id: "1008",
    title: "Zeytinlik içinde 79.500 m² tarla",
    price: 79500000,
    category: "toprak",
    type: "Satılık",
    city: "Aydın",
    district: "Kuşadası",
    area: 79500,
    image: toprak,
    featured: true,
    publishedAt: "2026-08-08",
    description: "Yola cepheli, tapulu ve tek parsel zeytinlik. Yaklaşık 1.800 adet verimli zeytin ağacı bulunmaktadır.",
    seller: seller("Kuşadası Caferoğlu", "Emlak Ofisi"),
  },
  {
    id: "1009",
    title: "İmarlı 480 m² köşe parsel arsa",
    price: 4250000,
    category: "toprak",
    type: "Satılık",
    city: "Muğla",
    district: "Bodrum",
    area: 480,
    image: toprak,
    publishedAt: "2026-08-02",
    description: "Villa imarlı, elektrik ve su altyapısı hazır, deniz manzaralı köşe parsel.",
    seller: seller("Bodrum Kıyı Emlak", "Emlak Ofisi"),
  },
  {
    id: "1010",
    title: "Yatırıma uygun 12 dönüm bağ",
    price: 3100000,
    category: "toprak",
    type: "Satılık",
    city: "Manisa",
    district: "Akhisar",
    area: 12000,
    image: toprak,
    publishedAt: "2026-07-30",
    description: "Sulama kanalına cepheli, düz arazi. Hisseli değil, müstakil tapuludur.",
    seller: seller("Ali Yıldırım", "Sahibinden"),
  },
  {
    id: "1011",
    title: "Deniz kenarında yeni konut projesi — 1+1 / 3+1",
    price: 18000000,
    category: "konut-projeleri",
    type: "Satılık",
    city: "Aydın",
    district: "Kuşadası",
    area: 95,
    rooms: "1+1, 2+1, 3+1",
    image: proje,
    featured: true,
    publishedAt: "2026-08-09",
    description:
      "Havuzlu, peyzajlı ve güvenlikli proje. 2027 teslim, farklı daire tiplerinde senetli ödeme seçenekleri mevcuttur.",
    seller: seller("Ege Yapı Projeleri", "Emlak Ofisi"),
  },
  {
    id: "1012",
    title: "Şehir merkezinde karma kullanımlı proje",
    price: 9100000,
    category: "konut-projeleri",
    type: "Satılık",
    city: "İstanbul",
    district: "Ümraniye",
    area: 120,
    rooms: "2+1, 3+1",
    image: proje,
    publishedAt: "2026-08-01",
    description: "Zemin katında ticari alanlar bulunan, metroya yakın karma proje. Kaba inşaat tamamlanmıştır.",
    seller: seller("Ermeda Gayrimenkul", "Emlak Ofisi"),
  },
  {
    id: "1013",
    title: "Cadde üzeri 5 katlı komple bina",
    price: 26500000,
    category: "komple-bina",
    type: "Satılık",
    city: "İstanbul",
    district: "Pendik",
    area: 1200,
    buildingAge: "18 yaşında",
    image: bina,
    featured: true,
    publishedAt: "2026-08-07",
    description: "Zemin katı dükkan, üst katları daire olarak kullanılan, kira getirisi yüksek komple bina.",
    seller: seller("Pendik Kurna Emlak", "Emlak Ofisi"),
  },
  {
    id: "1014",
    title: "Öğrenci yurdu olarak kiralanabilir bina",
    price: 350000,
    category: "komple-bina",
    type: "Kiralık",
    city: "Eskişehir",
    district: "Tepebaşı",
    area: 950,
    buildingAge: "10 yaşında",
    image: bina,
    publishedAt: "2026-07-29",
    description: "Asansörlü, 4 katlı ve otoparklı bina. Yurt, kurs merkezi veya ofis kullanımına uygundur.",
    seller: seller("Tepebaşı Emlak", "Emlak Ofisi"),
  },
  {
    id: "1015",
    title: "Denize sıfır tesiste 2 haftalık devre mülk",
    price: 350000,
    category: "devre-mulk",
    type: "Satılık",
    city: "Antalya",
    district: "Alanya",
    area: 60,
    rooms: "1+1",
    image: devremulk,
    featured: true,
    publishedAt: "2026-08-06",
    description: "Temmuz dönemi 2 hafta kullanım hakkı. Havuz, plaj ve restoran hizmetleri tesis bünyesindedir.",
    seller: seller("Alanya Tatil", "Emlak Ofisi"),
  },
  {
    id: "1016",
    title: "Termal tesiste devre mülk hissesi",
    price: 275000,
    category: "devre-mulk",
    type: "Satılık",
    city: "Yalova",
    district: "Termal",
    area: 55,
    rooms: "1+1",
    image: devremulk,
    publishedAt: "2026-07-28",
    description: "Yıl boyu kullanılabilen termal tesiste, tapulu devre mülk hissesi. Aidat düşüktür.",
    seller: seller("Termal Yaşam", "Emlak Ofisi"),
  },
  {
    id: "1017",
    title: "Denize sıfır 42 odalı butik otel",
    price: 79000000,
    category: "turistik-tesis",
    type: "Satılık",
    city: "Muğla",
    district: "Marmaris",
    area: 2400,
    image: tesis,
    featured: true,
    publishedAt: "2026-08-09",
    description: "Faal durumda, restoranı ve havuzu bulunan butik otel. Turizm işletme belgesi mevcuttur.",
    seller: seller("Marmaris Turizm Emlak", "Emlak Ofisi"),
  },
  {
    id: "1018",
    title: "Kapadokya'da 18 odalı taş pansiyon",
    price: 32000000,
    category: "turistik-tesis",
    type: "Satılık",
    city: "Nevşehir",
    district: "Ürgüp",
    area: 900,
    image: tesis,
    publishedAt: "2026-07-27",
    description: "Restore edilmiş taş yapı, teras kahvaltı alanı ve manzaralı odalarıyla işletmeye hazır pansiyon.",
    seller: seller("Ürgüp Emlak", "Emlak Ofisi"),
  },
  {
    id: "1019",
    title: "Sahilde 6 bungalovlu tatil köyü",
    price: 21000000,
    category: "turistik-tesis",
    type: "Satılık",
    city: "Balıkesir",
    district: "Ayvalık",
    area: 3500,
    image: tesis,
    publishedAt: "2026-07-26",
    description: "Zeytinlik içinde, denize 200 metre mesafede bungalov tesisi. Genişlemeye uygun imar durumu.",
    seller: seller("Ayvalık Kıyı", "Emlak Ofisi"),
  },
  {
    id: "1020",
    title: "Site içinde 3+1 kiralık daire",
    price: 32000,
    category: "konut",
    type: "Kiralık",
    city: "İzmir",
    district: "Bornova",
    area: 130,
    rooms: "3+1",
    floor: "2. Kat",
    buildingAge: "9 yaşında",
    heating: "Doğalgaz (Kombi)",
    image: konut1,
    publishedAt: "2026-08-05",
    description: "Ebeveyn banyolu, ferah ve aydınlık daire. Site içinde spor salonu ve yürüyüş parkuru bulunur.",
    seller: seller("Bornova Emlak", "Emlak Ofisi"),
  },
  {
    id: "1021",
    title: "Merkezde 45 m² kiralık ofis",
    price: 17000,
    category: "is-yeri",
    type: "Kiralık",
    city: "Ankara",
    district: "Kızılay",
    area: 45,
    floor: "3. Kat",
    image: isyeri,
    publishedAt: "2026-07-31",
    description: "Metro ve otobüs duraklarına yakın, aidatı düşük, tek odalı ofis.",
    seller: seller("Kızılay Ofis", "Emlak Ofisi"),
  },
  {
    id: "1022",
    title: "Yola cepheli 1.100 m² ticari imarlı arsa",
    price: 5150000,
    category: "toprak",
    type: "Satılık",
    city: "Aydın",
    district: "Söke",
    area: 1100,
    image: toprak,
    publishedAt: "2026-07-25",
    description: "Ana yol üzerinde, akaryakıt veya market yatırımına uygun ticari imarlı arsa.",
    seller: seller("Söke Yatırım", "Emlak Ofisi"),
  },
  {
    id: "1023",
    title: "Villa tipi konut projesinde 4+1 dubleks",
    price: 12500000,
    category: "konut-projeleri",
    type: "Satılık",
    city: "Antalya",
    district: "Döşemealtı",
    area: 240,
    rooms: "4+1",
    image: proje,
    publishedAt: "2026-07-24",
    description: "Müstakil bahçeli villalardan oluşan projede, teslime 6 ay kalan dubleks konut.",
    seller: seller("Döşemealtı Yapı", "Emlak Ofisi"),
  },
  {
    id: "1024",
    title: "Kira garantili 3 katlı iş hanı",
    price: 18500000,
    category: "komple-bina",
    type: "Satılık",
    city: "Konya",
    district: "Selçuklu",
    area: 780,
    buildingAge: "7 yaşında",
    image: bina,
    publishedAt: "2026-07-23",
    description: "Tamamı kiracılı, düzenli getirisi olan iş hanı. Tüm bağımsız bölümler tek tapu altındadır.",
    seller: seller("Selçuklu Gayrimenkul", "Emlak Ofisi"),
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function listingsByCategory(slug: string): Listing[] {
  return listings.filter((l) => l.category === slug);
}

export function categoryCount(slug: string): number {
  return listingsByCategory(slug).length;
}

export function getListing(id: string): Listing | undefined {
  return listings.find((l) => l.id === id);
}

export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("tr-TR").format(value)} TL`;
}

export function formatArea(value: number): string {
  return `${new Intl.NumberFormat("tr-TR").format(value)} m²`;
}
