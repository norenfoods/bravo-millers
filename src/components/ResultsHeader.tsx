import { Award, MapPin } from "lucide-react";

export function ResultsHeader({
  edition,
  total,
  title,
}: {
  edition: string;
  total: number;
  title: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 gap-4 px-1.5">
      <div>
        <div className="flex items-center gap-2 mb-2 text-accent font-bold uppercase tracking-widest text-xs">
          <Award className="h-4 w-4" strokeWidth={2} />
          <span>{edition}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-primary flex items-center gap-3">
          {title}
        </h2>
      </div>
      <div className="hidden flex-wrap items-center gap-2">
        <div className="text-xs font-medium text-muted-foreground text-center">
          Showing {total.toLocaleString()} curated selections
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 px-3 sm:px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
        >
          <MapPin className="h-4 w-4" strokeWidth={2} />
          Map View
        </button>
      </div>
    </div>
  );
}
