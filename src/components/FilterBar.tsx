import { ChevronDown, Search, ShoppingCart } from "lucide-react";

const FILTERS = [
  { label: "Hemisphere" },
  { label: "Country" },
  { label: "Variety" },
  { label: "Intensity" },
];

const TOGGLES = [
  { label: "Organic", checked: false, icon: null },
  { label: "Marketplace", checked: false, icon: ShoppingCart },
];

export function FilterBar() {
  return (
    <div className="w-full bg-card border-b border-border/60 py-3 shadow-sm relative z-30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              strokeWidth={2}
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search brands, producers, cultivars, countries…"
              className="w-full h-9 pl-11 pr-4 bg-card border-0 rounded-lg text-base outline-none transition-all hover:ring-1 hover:ring-border dark:hover:ring-white/15 focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="hidden overflow-hidden transition-all duration-150 ease-in-out">
          <div className="p-2 mt-2 rounded-xl border border-border/80 bg-secondary/50">
            <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
              {FILTERS.map((f) => (
                <FilterPill key={f.label} label={f.label} />
              ))}
              {TOGGLES.map((t) => (
                <ToggleFilterPill key={t.label} label={t.label} icon={t.icon} checked={t.checked} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterPill({ label }: { label: string }) {
  return (
    <div className="sm:flex-1 min-w-[140px]">
      <button
        type="button"
        className="h-9 px-4 w-full flex items-center justify-between gap-2 rounded-lg border bg-card text-sm transition-all duration-150 ease-in-out text-left border-border/50 dark:border-white/15 text-foreground/80 hover:text-foreground hover:border-border"
      >
        <span>{label}</span>
        <ChevronDown className="h-4 w-4 opacity-60" strokeWidth={2} />
      </button>
    </div>
  );
}

function ToggleFilterPill({
  label,
  icon: Icon,
  checked,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }> | null;
  checked: boolean;
}) {
  return (
    <div className="sm:flex-1 min-w-[140px]">
      <button
        type="button"
        className="h-9 px-4 w-full flex items-center justify-between gap-3 rounded-lg border bg-card text-sm transition-all duration-150 ease-in-out text-left border-border/50 dark:border-white/15 text-foreground/80 hover:text-foreground hover:border-border"
      >
        <span className="flex items-center gap-2">
          {Icon ? <Icon className="h-4 w-4" strokeWidth={2} /> : null}
          {label}
        </span>
        <span
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
            checked ? "bg-accent" : "bg-muted"
          }`}
          aria-hidden
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              checked ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </span>
      </button>
    </div>
  );
}
