import Image from "next/image";
import Link from "next/link";
import type { FeaturedProduct } from "@/types/featured-product";

export interface FeaturedCardData extends FeaturedProduct {
  resolvedImage?: string;
}

type CardVariant = "default" | "floating" | "floatingSm" | "floatingLg";

const FLOATING_SHARED = {
  outerTop: "mt-80 sm:mt-96",
  plinth: "h-40 sm:h-44",
  titlePad: "pt-3",
  imageClass:
    "max-h-full max-w-full object-contain drop-shadow-[0_30px_35px_rgba(0,0,0,0.55)]",
} as const;

const VARIANT_STYLES: Record<
  CardVariant,
  {
    plinth: string;
    imageBox: string;
    titlePad: string;
    outerTop: string;
    imageClass: string;
  }
> = {
  default: {
    outerTop: "mt-24 sm:mt-32",
    plinth: "h-56 sm:h-72",
    imageBox: "h-[320px] sm:h-[432px] -top-10 sm:-top-14 aspect-[3/4] max-w-[85%]",
    titlePad: "pt-14 sm:pt-20",
    imageClass:
      "max-h-[90%] max-w-[90%] object-contain dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.06)]",
  },
  floating: {
    outerTop: "mt-36 sm:mt-48",
    plinth: "h-36 sm:h-40",
    imageBox:
      "h-[440px] sm:h-[580px] -top-32 sm:-top-48 aspect-[4/5] max-w-[100%] left-1/2 -translate-x-1/2",
    titlePad: "pt-28 sm:pt-40",
    imageClass:
      "max-h-full max-w-full object-contain drop-shadow-[0_30px_35px_rgba(0,0,0,0.55)]",
  },
  floatingSm: {
    ...FLOATING_SHARED,
    imageBox:
      "h-[260px] sm:h-[320px] -top-[240px] sm:-top-[310px] aspect-[4/5] max-w-[100%] left-1/2 -translate-x-1/2",
  },
  floatingLg: {
    ...FLOATING_SHARED,
    imageBox:
      "h-[320px] sm:h-[380px] -top-[300px] sm:-top-[370px] aspect-[4/5] max-w-[100%] left-1/2 -translate-x-1/2",
  },
};

export function FeaturedProductCard({
  product,
  variant = "default",
}: {
  product: FeaturedCardData;
  variant?: CardVariant;
}) {
  const subtitleParts = [product.region, product.cultivar, product.organic ? "Organic" : null].filter(
    Boolean,
  );
  const styles = VARIANT_STYLES[variant];
  const inlinePricing = variant === "floatingSm" || variant === "floatingLg";
  const placeTitleInPlinth = inlinePricing;

  const titleContent = (
    <>
      <h3 className="font-sans text-base font-semibold leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
        {product.name}
      </h3>
      {product.subtitle ? (
        <p className="text-xs text-muted-foreground mt-1">{product.subtitle}</p>
      ) : (
        <p className="lg:hidden text-xs text-muted-foreground mt-1">
          {subtitleParts.join(" · ")}
        </p>
      )}
      {!placeTitleInPlinth && product.cardAwards && product.cardAwards.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
          {product.cardAwards.map((a, i) => (
            <span
              key={a}
              className={`inline-flex items-center gap-1 h-5 px-2 rounded-full border text-[10px] font-medium ${
                i === 0
                  ? "bg-amber-500/15 border-amber-400/50 text-amber-200"
                  : "bg-amber-500/[0.06] border-amber-500/30 text-amber-200/90"
              }`}
            >
              {i === 0 && <span aria-hidden>🏆</span>}
              <span>{a}</span>
            </span>
          ))}
        </div>
      )}
      {inlinePricing && product.pricing && (
        <div className="mt-2 flex items-baseline justify-center gap-2">
          <span className="text-lg font-semibold text-amber-400 tracking-wide">
            ¥{product.pricing.saleCny.toLocaleString("en-US")}
          </span>
          {product.pricing.originalCny != null && (
            <span className="text-sm line-through text-muted-foreground">
              ¥{product.pricing.originalCny.toLocaleString("en-US")}
            </span>
          )}
          {product.pricing.discountPct ? (
            <span className="text-[10px] font-bold text-red-400 tracking-wider">
              -{product.pricing.discountPct}%
            </span>
          ) : null}
        </div>
      )}
    </>
  );

  return (
    <div className="relative">
      <Link
        href={`/producer/${product.producerSlug}/brand/${product.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
      >
        <div className="group relative flex flex-col h-full cursor-pointer overflow-visible">
          <div
            className={`relative ${styles.outerTop} ${styles.plinth} mx-2 bg-white dark:bg-[hsl(222,35%,16%)] rounded-xl shadow-sm flex ${
              placeTitleInPlinth
                ? "flex-col items-stretch justify-end"
                : "items-center justify-center"
            }`}
          >
            {product.pricing && !inlinePricing && (
              <div className="absolute top-2 left-2 z-30 bg-red-600 text-white rounded-md px-2 py-1.5 shadow-lg">
                {product.pricing.discountPct ? (
                  <>
                    <span className="block text-[10px] font-bold leading-none tracking-wide">
                      -{product.pricing.discountPct}%
                    </span>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-sm font-bold leading-none">
                        ¥{product.pricing.saleCny.toLocaleString("en-US")}
                      </span>
                      {product.pricing.originalCny != null && (
                        <span className="text-[10px] line-through opacity-70 leading-none">
                          ¥{product.pricing.originalCny.toLocaleString("en-US")}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <span className="block text-sm font-bold leading-none py-0.5">
                    ¥{product.pricing.saleCny.toLocaleString("en-US")}
                  </span>
                )}
              </div>
            )}
            <div
              className={`${product.cardImageScale ? "overflow-visible" : "overflow-hidden"} bg-transparent flex justify-center absolute w-auto ${styles.imageBox} ${
                placeTitleInPlinth ? "items-end" : "items-center"
              } transition-all duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-8`}
            >
              <div className="absolute inset-0 hidden dark:flex items-center justify-center pointer-events-none">
                <div className="w-[60%] h-[70%] bg-gradient-radial from-white/5 via-white/[0.02] to-transparent rounded-full blur-2xl" />
              </div>
              {product.resolvedImage ? (
                <Image
                  src={product.resolvedImage}
                  alt={product.name}
                  width={459}
                  height={1200}
                  className={`relative z-10 transition-opacity duration-700 ${styles.imageClass}`}
                  sizes="(min-width: 1280px) 300px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  style={
                    product.cardImageScale
                      ? {
                          transform: `scale(${product.cardImageScale})`,
                          transformOrigin: `center ${product.cardImageOriginY ?? "bottom"}`,
                        }
                      : undefined
                  }
                />
              ) : (
                <CardBottlePlaceholder name={product.name} />
              )}
            </div>
            <div
              className={`absolute z-20 ${inlinePricing ? "bottom-2 right-2" : "-top-2 right-4"}`}
            >
              <div className="w-4 h-4 rounded-full flex flex-col items-center justify-center shadow-lg border-2 border-white dark:border-card transition-all duration-500 ease-out group-hover:w-[72px] group-hover:h-[72px] group-hover:rotate-[360deg] group-hover:-top-6 overflow-hidden bg-gradient-to-br from-amber-400 to-amber-500">
                <span className="text-[9px] font-bold text-white uppercase tracking-wider leading-[1.2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300 px-1 text-center">
                  {product.signatureAward}
                </span>
              </div>
            </div>
            {placeTitleInPlinth && (
              <div className="relative z-10 px-3 pb-3 pt-1 text-center w-full">
                {titleContent}
              </div>
            )}
          </div>

          <div className={`flex flex-col flex-grow ${styles.titlePad} pb-4 text-center`}>
            {!placeTitleInPlinth && titleContent}
            {product.crossBorderBadge && (
              <div className="mt-2 flex justify-center">
                <span className="inline-flex items-center h-5 px-2.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-[10px] font-medium tracking-wide">
                  {product.crossBorderBadge}
                </span>
              </div>
            )}
            {(product.statusBadge || product.harvestBadge) && (
              <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
                {product.statusBadge && (
                  <span className="inline-flex items-center h-5 px-2 rounded-full bg-zinc-900 border border-amber-500/40 text-amber-400 text-[9px] font-bold uppercase tracking-[0.12em]">
                    {product.statusBadge}
                  </span>
                )}
                {product.harvestBadge && (
                  <span className="inline-flex items-center h-5 px-2 rounded-full bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-[9px] font-bold uppercase tracking-[0.12em]">
                    {product.harvestBadge}
                  </span>
                )}
              </div>
            )}
            {product.tags && product.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
                {product.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center h-5 px-2 rounded-full border border-border bg-secondary/30 text-foreground/80 text-[10px] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            {product.freshnessTag && <FreshnessHangTag tag={product.freshnessTag} />}
          </div>

          <div className="absolute bottom-0 left-0 right-0 mx-2 bg-[#22345e] rounded-xl px-4 py-4 shadow-2xl opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-10">
            <h4 className="text-white font-bold text-xl mb-1 text-center">{product.name}</h4>
            <p className="text-white/70 text-sm text-center">by {product.producer}</p>
            <p className="text-white/50 text-xs mb-2 text-center">{product.signatureAward}</p>
            <p className="text-white/90 text-xs text-center">{subtitleParts.join(" · ")}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

function FreshnessHangTag({
  tag,
}: {
  tag: { bestBefore: string; storage: string[]; guarantee?: string };
}) {
  return (
    <div className="mt-3 flex justify-center">
      <div className="relative inline-block pt-3">
        <span
          aria-hidden
          className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-3 bg-amber-200/30"
        />
        <div className="relative bg-[#f4e4c1] text-[#3a2812] rounded-md shadow-md px-3 py-2 max-w-[200px] border border-[#3a2812]/10">
          <span
            aria-hidden
            className="absolute left-1/2 -top-[5px] -translate-x-1/2 w-2 h-2 rounded-full bg-background border border-[#3a2812]/30"
          />
          <p className="text-[10px] font-semibold leading-tight tracking-tight">
            {tag.bestBefore}
          </p>
          {tag.storage.map((line, i) => (
            <p key={i} className="text-[9px] leading-tight mt-1 text-[#5a3e1f]">
              {line}
            </p>
          ))}
          {tag.guarantee && (
            <p className="text-[9px] italic leading-tight mt-0.5 text-[#5a3e1f]">
              {tag.guarantee}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function CardBottlePlaceholder({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <div className="relative flex items-end justify-center h-full w-full z-10">
      <div className="relative w-24 h-[80%] flex flex-col items-center">
        <div className="w-5 h-10 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-t-sm" />
        <div className="w-7 h-2.5 bg-zinc-700 -mt-0.5 rounded-sm" />
        <div className="flex-1 w-full bg-gradient-to-b from-amber-950/80 via-amber-900/70 to-amber-950 rounded-b-md border border-amber-900/40 flex items-center justify-center mt-1 shadow-2xl">
          <div className="font-serif text-2xl text-amber-100/90 leading-none">{initials}</div>
        </div>
      </div>
    </div>
  );
}
