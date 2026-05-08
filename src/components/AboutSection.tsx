import Image from "next/image";

const PHOTOS = [
  { src: "/images/award-ceremony.jpg", alt: "Flos Olei 2025 award ceremony" },
  { src: "/images/about-photo-2.jpg", alt: "Norenfoods" },
  { src: "/images/about-photo-3.jpg", alt: "Norenfoods" },
  { src: "/images/about-photo-4.jpg", alt: "Norenfoods" },
];

const STATS = [
  { label: "Founded 2023" },
  { label: "10+ Italian Estates" },
  { label: "Flos Olei #1 China" },
];

export function AboutSection() {
  return (
    <section className="bg-gradient-to-b from-[#0a0d14] via-[#101521] to-[#0a0d14] border-y border-amber-900/30">
      <div className="container mx-auto px-4 max-w-7xl py-20 md:py-24">
        <header className="text-center max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-amber-300/80 font-semibold uppercase">
            Norenfoods · Shanghai
          </p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground">
            About Bravo Millers
          </h2>
          <div className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        </header>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {PHOTOS.map((p) => (
              <div
                key={p.src}
                className="relative aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-amber-400/10 shadow-xl"
                style={{ backgroundColor: "#0f1829" }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 45vw"
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-amber-300 leading-tight">
              Flos Olei 2025 · Importer of the Year
            </h3>
            <p className="mt-5 text-base md:text-[17px] leading-relaxed text-foreground/75">
              Founded in 2023, Norenfoods is Shanghai&apos;s premier importer of award-winning
              Italian extra virgin olive oils and artisan specialty foods. With Noren Italia
              S.R.L. in Tuscany, Italy, we source directly from estates — cutting out middlemen
              to deliver authentic, traceable Italian quality to China. The only China-based
              importer honored by Flos Olei.
            </p>

            <div
              className="mt-8 max-w-md aspect-[1133/850] overflow-hidden rounded-lg shadow-2xl ring-1 ring-amber-400/30"
              style={{ backgroundColor: "#0f1829" }}
            >
              <Image
                src="/images/flos-olei-certificate.png"
                alt="Flos Olei 2025 Importer of the Year certificate"
                width={1133}
                height={850}
                className="w-full h-full object-cover scale-[1.08] origin-center"
                style={{ objectPosition: "center" }}
              />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-3 sm:gap-4">
              <span className="inline-flex items-center h-10 px-5 rounded-full border border-amber-400/40 bg-amber-400/5 text-amber-200 text-sm font-medium tracking-wide">
                {s.label}
              </span>
              {i < STATS.length - 1 && (
                <span aria-hidden className="text-amber-400/40 hidden sm:inline">
                  ·
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
