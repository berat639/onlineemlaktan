import { ListingCard } from "./ListingCard";
import type { Listing } from "@/data/listings";

export function ListingGrid({ listings }: { listings: Listing[] }) {
  if (listings.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
        Seçtiğiniz kriterlere uygun ilan bulunamadı.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {listings.map((l) => (
        <ListingCard key={l.id} listing={l} />
      ))}
    </div>
  );
}
