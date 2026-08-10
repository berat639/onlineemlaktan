import { Link } from "@tanstack/react-router";
import { Search, Heart, Home } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
            <Home className="h-4 w-4" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-foreground">
            emlak<span className="text-brand">vitrin</span>
          </span>
        </Link>

        <form
          className="order-3 flex w-full items-center gap-2 md:order-none md:w-auto md:flex-1 md:max-w-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Kelime, ilan no veya konum ile ara"
              aria-label="İlan ara"
              className="w-full rounded-full border border-input bg-background py-2 pl-9 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-ring/30"
            />
          </div>
        </form>

        <nav className="ml-auto flex items-center gap-3 text-sm">
          <button
            type="button"
            className="hidden items-center gap-1.5 text-muted-foreground transition-colors hover:text-brand sm:flex"
          >
            <Heart className="h-4 w-4" />
            Favorilerim
          </button>
          <Link
            to="/emlak/$kategori"
            params={{ kategori: "konut" }}
            className="rounded-full bg-brand px-4 py-2 font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            İlanlara Göz At
          </Link>
        </nav>
      </div>
    </header>
  );
}
