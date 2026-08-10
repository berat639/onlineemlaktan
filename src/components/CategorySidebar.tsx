import { Link, useRouterState } from "@tanstack/react-router";
import { categories, categoryCount, listings } from "@/data/listings";
import { cn } from "@/lib/utils";

export function CategorySidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav aria-label="Emlak kategorileri" className="rounded-xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-base font-bold text-foreground">Emlak</h2>
        <span className="text-xs text-muted-foreground">({listings.length})</span>
      </div>

      <ul className="mt-3 space-y-0.5">
        {categories.map((c) => {
          const active = pathname === `/emlak/${c.slug}`;
          return (
            <li key={c.slug}>
              <Link
                to="/emlak/$kategori"
                params={{ kategori: c.slug }}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-brand-soft font-semibold text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <span>{c.name}</span>
                <span className="text-xs tabular-nums">({categoryCount(c.slug)})</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
