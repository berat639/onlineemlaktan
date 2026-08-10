import { Link } from "@tanstack/react-router";
import { categories } from "@/data/listings";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">
            emlak<span className="text-brand">vitrin</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Türkiye genelinde konut, iş yeri, arsa ve turistik tesis ilanlarını tek yerde inceleyin.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Emlak Kategorileri</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.slice(0, 4).map((c) => (
              <li key={c.slug}>
                <Link
                  to="/emlak/$kategori"
                  params={{ kategori: c.slug }}
                  className="text-muted-foreground transition-colors hover:text-brand"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Diğer</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.slice(4).map((c) => (
              <li key={c.slug}>
                <Link
                  to="/emlak/$kategori"
                  params={{ kategori: c.slug }}
                  className="text-muted-foreground transition-colors hover:text-brand"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Müşteri Hizmetleri</h3>
          <p className="mt-3 text-lg font-bold text-brand">0216 606 6000</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Hafta içi 09:00 - 18:00 arası destek alabilirsiniz.
          </p>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        Bu site örnek ilan verileriyle hazırlanmış bir vitrin çalışmasıdır.
      </div>
    </footer>
  );
}
