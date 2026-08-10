import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Phone, MapPin, Ruler, Building2, Flame, Layers } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ListingGrid } from "@/components/ListingGrid";
import { formatArea, formatPrice, getCategory, getListing, listingsByCategory } from "@/data/listings";

export const Route = createFileRoute("/ilan/$id")({
  loader: ({ params }) => {
    const listing = getListing(params.id);
    if (!listing) throw notFound();
    return { listing };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "İlan bulunamadı" }, { name: "robots", content: "noindex" }] };
    }
    const l = loaderData.listing;
    const title = `${l.title} — ${formatPrice(l.price)}`;
    const description = `${l.city} / ${l.district} · ${formatArea(l.area)}${l.rooms ? ` · ${l.rooms}` : ""} · ${l.type} ilan.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/ilan/${params.id}` },
      ],
      links: [{ rel: "canonical", href: `/ilan/${params.id}` }],
    };
  },
  component: ListingDetail,
});

function ListingDetail() {
  const { listing } = Route.useLoaderData();
  const category = getCategory(listing.category);
  const similar = listingsByCategory(listing.category)
    .filter((l) => l.id !== listing.id)
    .slice(0, 4);

  const specs = [
    { icon: Ruler, label: "Alan", value: formatArea(listing.area) },
    listing.rooms ? { icon: Layers, label: "Oda Sayısı", value: listing.rooms } : null,
    listing.floor ? { icon: Building2, label: "Bulunduğu Kat", value: listing.floor } : null,
    listing.buildingAge ? { icon: Building2, label: "Bina Yaşı", value: listing.buildingAge } : null,
    listing.heating ? { icon: Flame, label: "Isıtma", value: listing.heating } : null,
  ].filter(Boolean) as { icon: typeof Ruler; label: string; value: string }[];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-6">
        <nav aria-label="Site haritası" className="mb-4 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-brand">
            Emlak
          </Link>
          {category && (
            <>
              {" / "}
              <Link
                to="/emlak/$kategori"
                params={{ kategori: category.slug }}
                className="hover:text-brand"
              >
                {category.name}
              </Link>
            </>
          )}
          {" / "}
          <span>İlan no: {listing.id}</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
              <img
                src={listing.image}
                alt={listing.title}
                width={800}
                height={600}
                className="aspect-16/10 w-full object-cover"
              />
              <div className="grid grid-cols-4 gap-2 p-2">
                {[0, 1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={listing.image}
                    alt={`${listing.title} görsel ${i + 1}`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="aspect-4/3 w-full rounded-md object-cover opacity-90"
                  />
                ))}
              </div>
            </div>

            <section className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h2 className="font-display text-lg font-bold text-foreground">İlan Özellikleri</h2>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {specs.map((s) => (
                  <div key={s.label} className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2">
                    <s.icon className="h-4 w-4 text-brand" />
                    <div>
                      <dt className="text-xs text-muted-foreground">{s.label}</dt>
                      <dd className="text-sm font-medium text-foreground">{s.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </section>

            <section className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h2 className="font-display text-lg font-bold text-foreground">Açıklama</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{listing.description}</p>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <span className="inline-block rounded-md bg-brand-soft px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                {listing.type}
              </span>
              <h1 className="mt-2 font-display text-xl font-bold leading-snug text-foreground">{listing.title}</h1>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {listing.city} / {listing.district}
              </p>
              <p className="mt-4 font-display text-3xl font-extrabold text-brand tabular-nums">
                {formatPrice(listing.price)}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <p className="text-xs text-muted-foreground">{listing.seller.kind}</p>
              <p className="text-base font-semibold text-foreground">{listing.seller.name}</p>
              <a
                href={`tel:${listing.seller.phone.replace(/\s/g, "")}`}
                className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
              >
                <Phone className="h-4 w-4" />
                {listing.seller.phone}
              </a>
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 font-display text-lg font-bold text-foreground">Benzer İlanlar</h2>
            <ListingGrid listings={similar} />
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
