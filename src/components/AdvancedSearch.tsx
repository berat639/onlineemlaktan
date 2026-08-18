import { useMemo, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { listings, categories } from "@/data/listings";

const inputClass =
  "w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-[13px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-ring/30";

const roomOptions = ["1+0", "1+1", "2+1", "3+1", "4+1", "5+1"];

export function AdvancedSearch() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const activeSlug = useMemo(() => {
    const match = categories.find((c) => pathname === `/emlak/${c.slug}`);
    return match?.slug ?? "konut";
  }, [pathname]);

  const [il, setIl] = useState("");
  const [ilce, setIlce] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [oda, setOda] = useState<string[]>([]);
  const [q, setQ] = useState("");

  const cities = useMemo(() => Array.from(new Set(listings.map((l) => l.city))).sort((a, b) => a.localeCompare(b, "tr")), []);
  const districts = useMemo(
    () =>
      Array.from(new Set(listings.filter((l) => !il || l.city === il).map((l) => l.district))).sort((a, b) =>
        a.localeCompare(b, "tr"),
      ),
    [il],
  );

  const toggleRoom = (r: string) =>
    setOda((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]));

  const reset = () => {
    setIl("");
    setIlce("");
    setMinPrice("");
    setMaxPrice("");
    setMinArea("");
    setMaxArea("");
    setOda([]);
    setQ("");
    navigate({ to: "/emlak/$kategori", params: { kategori: activeSlug }, search: {} });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/emlak/$kategori",
      params: { kategori: activeSlug },
      search: {
        q: q || undefined,
        il: il || undefined,
        ilce: ilce || undefined,
        min: minPrice || undefined,
        max: maxPrice || undefined,
        minM2: minArea || undefined,
        maxM2: maxArea || undefined,
        oda: oda.length ? oda.join(",") : undefined,
      },
    });
  };

  return (
    <form
      onSubmit={submit}
      className="mt-4 rounded-xl border border-border bg-card p-4 shadow-card"
      aria-label="Gelişmiş arama"
    >
      <div className="mb-4 flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-brand" />
        <h2 className="font-display text-base font-bold text-foreground">Gelişmiş Arama</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-foreground">Adres</div>
          <div className="space-y-1">
            <label htmlFor="as-il" className="text-xs text-muted-foreground">
              İl
            </label>
            <select
              id="as-il"
              className={inputClass}
              value={il}
              onChange={(e) => {
                setIl(e.target.value);
                setIlce("");
              }}
            >
              <option value="">Seçiniz</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="as-ilce" className="text-xs text-muted-foreground">
              İlçe
            </label>
            <select id="as-ilce" className={inputClass} value={ilce} onChange={(e) => setIlce(e.target.value)}>
              <option value="">Seçiniz</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold text-foreground">Fiyat (TL)</div>
          <div className="flex items-center gap-2">
            <input
              className={inputClass}
              inputMode="numeric"
              placeholder="Min"
              aria-label="Minimum fiyat"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value.replace(/\D/g, ""))}
            />
            <span className="text-sm text-muted-foreground">–</span>
            <input
              className={inputClass}
              inputMode="numeric"
              placeholder="Max"
              aria-label="Maksimum fiyat"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value.replace(/\D/g, ""))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold text-foreground">m² (Brüt)</div>
          <div className="flex items-center gap-2">
            <input
              className={inputClass}
              inputMode="numeric"
              placeholder="Min"
              aria-label="Minimum metrekare"
              value={minArea}
              onChange={(e) => setMinArea(e.target.value.replace(/\D/g, ""))}
            />
            <span className="text-sm text-muted-foreground">–</span>
            <input
              className={inputClass}
              inputMode="numeric"
              placeholder="Max"
              aria-label="Maksimum metrekare"
              value={maxArea}
              onChange={(e) => setMaxArea(e.target.value.replace(/\D/g, ""))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold text-foreground">Oda Sayısı</div>
          <div className="flex flex-wrap gap-1.5">
            {roomOptions.map((r) => {
              const active = oda.includes(r);
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => toggleRoom(r)}
                  aria-pressed={active}
                  className={
                    active
                      ? "rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground"
                      : "rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-brand hover:text-foreground"
                  }
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="as-q" className="block text-sm font-semibold text-foreground">
            Kelime ile Ara
          </label>
          <input
            id="as-q"
            className={inputClass}
            placeholder="Kelime veya ilan numarası giriniz"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="submit"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            <Search className="h-4 w-4" />
            Ara
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="Filtreleri temizle"
            className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </form>
  );
}
