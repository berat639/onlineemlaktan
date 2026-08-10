import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, MapPin } from "lucide-react";
import { formatArea, formatPrice, type Listing } from "@/data/listings";
import { cn } from "@/lib/utils";

export function ListingCard({ listing }: { listing: Listing }) {
  const [fav, setFav] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-card-hover">
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <img
          src={listing.image}
          alt={listing.title}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-md bg-card/90 px-2 py-0.5 text-[11px] font-semibold text-foreground">
          {listing.type}
        </span>
        <button
          type="button"
          aria-label={fav ? "Favorilerden çıkar" : "Favorilere ekle"}
          aria-pressed={fav}
          onClick={() => setFav((v) => !v)}
          className="absolute right-2 top-2 rounded-full bg-card/90 p-1.5 text-muted-foreground transition-colors hover:text-brand"
        >
          <Heart className={cn("h-4 w-4", fav && "fill-brand text-brand")} />
        </button>
      </div>

      <div className="space-y-1.5 p-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground">
          <Link to="/ilan/$id" params={{ id: listing.id }} className="after:absolute after:inset-0">
            {listing.title}
          </Link>
        </h3>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {listing.city} / {listing.district}
          <span className="ml-auto tabular-nums">{formatArea(listing.area)}</span>
        </p>
        <p className="pt-1 font-display text-base font-bold text-brand tabular-nums">
          {formatPrice(listing.price)}
        </p>
      </div>
    </article>
  );
}
