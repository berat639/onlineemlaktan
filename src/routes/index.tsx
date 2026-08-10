import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CategorySidebar } from "@/components/CategorySidebar";
import { ListingGrid } from "@/components/ListingGrid";
import { listings } from "@/data/listings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Emlak Vitrin — Satılık ve Kiralık Emlak İlanları" },
      {
        name: "description",
        content:
          "Konut, iş yeri, arsa, konut projeleri, komple bina, devre mülk ve turistik tesis ilanlarını tek sayfada inceleyin.",
      },
      { property: "og:title", content: "Emlak Vitrin — Satılık ve Kiralık Emlak İlanları" },
      {
        property: "og:description",
        content: "Türkiye genelinde emlak ilanları: konut, iş yeri, arsa, proje, bina, devre mülk ve tesis.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const featured = listings.filter((l) => l.featured);
  const rest = listings.filter((l) => !l.featured);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="sr-only">Emlak ilanları</h1>

        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <CategorySidebar />
          </aside>

          <div className="space-y-8">
            <section>
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="font-display text-lg font-bold text-foreground">Vitrin İlanları</h2>
                <span className="text-sm text-muted-foreground">{featured.length} ilan</span>
              </div>
              <ListingGrid listings={featured} />
            </section>

            <section>
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="font-display text-lg font-bold text-foreground">Tüm Emlak İlanları</h2>
                <span className="text-sm text-muted-foreground">{rest.length} ilan</span>
              </div>
              <ListingGrid listings={rest} />
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
