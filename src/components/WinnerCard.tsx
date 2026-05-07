import Image from "next/image";
import Link from "next/link";
import type { Winner } from "@/types/winner";

const MEDAL_GRADIENT: Record<Winner["medal"], string> = {
  gold: "from-amber-400 to-amber-500",
  silver: "from-gray-300 to-gray-400",
  bronze: "from-amber-700 to-amber-800",
};

const MEDAL_LABEL: Record<Winner["medal"], string> = {
  gold: "Gold",
  silver: "Silver",
  bronze: "Bronze",
};

export function WinnerCard({ winner }: { winner: Winner }) {
  const subtitleParts = [winner.country, winner.cultivar, winner.organic ? "Organic" : null].filter(Boolean);
  const fullParts = [
    winner.country,
    winner.organic ? "Organic" : null,
    winner.cultivar,
    winner.intensity,
  ].filter(Boolean);

  return (
    <div className="relative">
      <div>
        <Link
          href={`/producer/${slugify(winner.producer)}/brand/${winner.slug}`}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
        >
          <div className="group relative flex flex-col h-full cursor-pointer overflow-visible">
            {/* Image plinth */}
            <div className="relative mt-24 sm:mt-32 mx-2 h-56 sm:h-72 bg-white dark:bg-[hsl(222,35%,16%)] rounded-xl flex items-center justify-center shadow-sm">
              <div className="absolute top-2 left-2 z-30" />
              <div className="absolute inset-0 rounded-xl pointer-events-none" />
              <div className="overflow-hidden bg-transparent flex items-center justify-center aspect-[3/4] absolute h-[320px] sm:h-[432px] w-auto max-w-[85%] object-contain drop-shadow-2xl transition-all duration-700 ease-out -top-10 sm:-top-14 group-hover:scale-110 group-hover:-translate-y-8">
                <div className="absolute inset-0 hidden dark:flex items-center justify-center pointer-events-none">
                  <div className="w-[60%] h-[70%] bg-gradient-radial from-white/5 via-white/[0.02] to-transparent rounded-full blur-2xl" />
                </div>
                <Image
                  src={`/images/bottles/${winner.imageId}.png`}
                  alt={winner.name}
                  width={459}
                  height={1200}
                  className="relative z-10 max-h-[90%] max-w-[90%] object-contain transition-opacity duration-700 opacity-100 dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.06)]"
                  sizes="(min-width: 1280px) 300px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="absolute -top-2 right-4 z-20">
                <div
                  className={`w-4 h-4 rounded-full flex flex-col items-center justify-center shadow-lg border-2 border-white dark:border-card transition-all duration-500 ease-out group-hover:w-[72px] group-hover:h-[72px] group-hover:rotate-[360deg] group-hover:-top-6 overflow-hidden bg-gradient-to-br ${MEDAL_GRADIENT[winner.medal]}`}
                >
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider leading-[1.3] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                    {MEDAL_LABEL[winner.medal]}
                  </span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider leading-[1.3] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                    Winner
                  </span>
                </div>
              </div>
            </div>

            {/* Title block under the image plinth */}
            <div className="flex flex-col flex-grow pt-14 sm:pt-20 pb-4 text-center">
              <h3 className="font-sans text-base font-semibold leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                {winner.name}
              </h3>
              <p className="lg:hidden text-xs text-muted-foreground mt-1">
                {subtitleParts.join(" · ")}
              </p>
            </div>

            {/* Hover overlay panel */}
            <div className="absolute bottom-0 left-0 right-0 mx-2 bg-[#22345e] rounded-xl px-4 py-4 shadow-2xl opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-10">
              <h4 className="text-white font-bold text-xl mb-1 text-center">
                {winner.name}
              </h4>
              <p className="text-white/70 text-sm text-center">by {winner.producer}</p>
              <p className="text-white/50 text-xs mb-2 text-center">
                #{winner.rank} Worldwide
              </p>
              <p className="text-white/90 text-xs text-center">
                {fullParts.join(" · ")}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
