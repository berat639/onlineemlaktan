import { useMemo, useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CategorySidebar } from "@/components/CategorySidebar";
import { ListingGrid } from "@/components/ListingGrid";
import { getCategory, listingsByCategory } from "@/data/listings";

export const Route = createFileRoute("/emlak/$kategori")({
  loader: ({ params }) => {
    const category = getCategory(params.kategori);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Kategori bulunamadı" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.category.name} İlanları — Emlak Vitrin`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.category.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.category.description },
        { property: "og:url", content: `/emlak/${params.kategori}` },
      ],
      links: [{ rel: "canonical", href: `/emlak/${params.kategori}` }],
    };
  },
  component: CategoryPage,
});

const selectClass =
  "rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-ring/30";

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const all = listingsByCategory(category.slug);

  const [type, setType] = useState("hepsi");
  const [city, setCity] = useState("hepsi");
  const [rooms, setRooms] = useState("hepsi");
  const [maxPrice, setMaxPrice] = useState("hepsi");
  const [sort, setSort] = useState("yeni");

  const cities = useMemo(() => Array.from(new Set(all.map((l) => l.city))).sort(), [all]);
  const roomOptions = useMemo(
    () => Array.from(new Set(all.map((l) => l.rooms).filter(Boolean) as string[])).sort(),
    [all],
  );

  const filtered = useMemo(() => {
    let out = all.filter((l) => {
      if (type !== "hepsi" && l.type !== type) return false;
      if (city !== "hepsi" && l.city !== city) return false;
      if (rooms !== "hepsi" && l.rooms !== rooms) return false;
      if (maxPrice !== "hepsi" && l.price > Number(maxPrice)) return false;
      return true;
    });
    out = [...out].sort((a, b) => {
      if (sort === "artan") return a.price - b.price;
      if (sort === "azalan") return b.price - a.price;
      return b.publishedAt.localeCompare(a.publishedAt);
    });
    return out;
  }, [all, type, city, rooms, maxPrice, sort]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <CategorySidebar />
          </aside>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">Emlak</p>
              <h1 className="font-display text-2xl font-bold text-foreground">{category.name} İlanları</h1>
              <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-card">
              <select
                aria-label="İlan tipi"
                className={selectClass}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="hepsi">Tümü (Satılık/Kiralık)</option>
                <option value="Satılık">Satılık</option>
                <option value="Kiralık">Kiralık</option>
              </select>

              <select aria-label="Şehir" className={selectClass} value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="hepsi">Tüm şehirler</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              {roomOptions.length > 0 && (
                <select
                  aria-label="Oda sayısı"
                  className={selectClass}
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                >
                  <option value="hepsi">Tüm oda sayıları</option>
                  {roomOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              )}

              <select
                aria-label="Fiyat aralığı"
                className={selectClass}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              >
                <option value="hepsi">Tüm fiyatlar</option>
                <option value="100000">100.000 TL'ye kadar</option>
                <option value="1000000">1.000.000 TL'ye kadar</option>
                <option value="5000000">5.000.000 TL'ye kadar</option>
                <option value="25000000">25.000.000 TL'ye kadar</option>
              </select>

              <select
                aria-label="Sıralama"
                className={`${selectClass} ml-auto`}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="yeni">En yeni ilanlar</option>
                <option value="artan">Fiyat: artan</option>
                <option value="azalan">Fiyat: azalan</option>
              </select>
            </div>

            <p className="text-sm text-muted-foreground">{filtered.length} ilan listeleniyor</p>

            <ListingGrid listings={filtered} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
