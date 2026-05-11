import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, MapPin, Trophy } from "lucide-react";
import { MobileWeChatBar } from "@/components/MobileWeChatBar";
import { ProductPosterButton } from "@/components/ProductPosterButton";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WINNERS_2026 } from "@/lib/winners";
import { FEATURED_PRODUCTS, findFeatured } from "@/lib/featured-products";
import { resolveImagePath } from "@/lib/resolve-image";
import {
  buildAwardHistory,
  buildHeroDescription,
  buildProducerBlurb,
  classificationChips,
  CURRENT_EDITION,
  findWinner,
  slugifyProducer,
} from "@/lib/product-detail";
import type { Winner } from "@/types/winner";
import type { FeaturedProduct } from "@/types/featured-product";

type ProductView = {
  source: "featured" | "winner";
  name: string;
  slug: string;
  producer: string;
  producerSlug: string;
  region: string;
  country: string;
  cultivar?: string;
  intensity: string;
  organic: boolean;
  category: "olive-oil" | "balsamic";
  signatureAward: string;
  awardYear: number;
  imagePath?: string;
  description: string;
  descriptionZh?: string;
  producerBlurb: string;
  producerBlurbZh?: string;
  tastingNotes: string[];
  pairings: string[];
  classification: string[];
  rank?: number;
  medal?: Winner["medal"];
  awards?: string[];
  cardAwards?: string[];
  tastingProse?: string;
  hideAwardHistory?: boolean;
  classificationOverride?: { label: string; value: string }[];
  subtitle?: string;
  pricing?: { saleCny: number; originalCny?: number; discountPct?: number };
};

function fromFeatured(p: FeaturedProduct): ProductView {
  const isBalsamic = p.category === "balsamic";
  const isBlend = !p.cultivar || p.cultivar === "Blend" || /[,&]/.test(p.cultivar);
  const classification = isBalsamic
    ? [p.region, p.cultivar, p.intensity, "DOP/IGP"]
    : [p.country, p.cultivar, p.intensity, isBlend ? "Blend" : "Monovarietal"];
  return {
    source: "featured",
    name: p.name,
    slug: p.slug,
    producer: p.producer,
    producerSlug: p.producerSlug,
    region: p.region,
    country: p.country,
    cultivar: p.cultivar,
    intensity: p.intensity,
    organic: p.organic,
    category: p.category,
    signatureAward: p.signatureAward,
    awardYear: p.awardYear,
    imagePath: resolveImagePath(p.imagePath),
    description: p.description,
    descriptionZh: p.descriptionZh,
    producerBlurb: p.producerBlurb,
    producerBlurbZh: p.producerBlurbZh,
    tastingNotes: p.tastingNotes,
    pairings: p.pairings,
    classification,
    awards: p.awards,
    cardAwards: p.cardAwards,
    tastingProse: p.tastingProse,
    hideAwardHistory: p.hideAwardHistory,
    classificationOverride: p.classificationOverride,
    subtitle: p.subtitle,
    pricing: p.pricing,
  };
}

function fromWinner(w: Winner): ProductView {
  return {
    source: "winner",
    name: w.name,
    slug: w.slug,
    producer: w.producer,
    producerSlug: slugifyProducer(w.producer),
    region: w.country,
    country: w.country,
    cultivar: w.cultivar,
    intensity: w.intensity,
    organic: w.organic,
    category: "olive-oil",
    signatureAward: `${CURRENT_EDITION} ${w.medal === "gold" ? "Gold" : w.medal === "silver" ? "Silver" : "Bronze"}`,
    awardYear: CURRENT_EDITION,
    imagePath: `/images/bottles/${w.imageId}.png`,
    description: buildHeroDescription(w),
    producerBlurb: buildProducerBlurb(w),
    tastingNotes: deriveTastingNotes(w),
    pairings: derivePairings(w),
    classification: classificationChips(w),
    rank: w.rank,
    medal: w.medal,
  };
}

function deriveTastingNotes(w: Winner): string[] {
  if (w.intensity === "Robust") return ["Tomato Leaf", "Artichoke", "Wild Herbs", "Black Pepper"];
  if (w.intensity === "Delicate") return ["Apple", "White Flowers", "Green Almond", "Soft Pepper"];
  return ["Cut Grass", "Green Almond", "Apple Skin", "Mild Pepper"];
}

function derivePairings(w: Winner): string[] {
  if (w.intensity === "Robust") return ["Red Meats", "Aged Cheeses", "Bean Soups", "Bruschetta"];
  if (w.intensity === "Delicate") return ["White Fish", "Fresh Cheeses", "Spring Vegetables", "Salads"];
  return ["Grilled Vegetables", "Pasta", "Hard Cheeses", "Roast Chicken"];
}

function startsWithEmoji(s: string): boolean {
  return /^[^\w\s]/u.test(s.trim());
}

export async function generateStaticParams() {
  return [
    ...FEATURED_PRODUCTS.map((p) => ({ producer: p.producerSlug, slug: p.slug })),
    ...WINNERS_2026.map((w) => ({ producer: slugifyProducer(w.producer), slug: w.slug })),
  ];
}

export async function generateMetadata({
  params,
}: PageProps<"/producer/[producer]/brand/[slug]">) {
  const { producer, slug } = await params;
  const view = lookup(producer, slug);
  if (!view) return { title: "Not found · Norenfoods" };
  return {
    title: `${view.name} · ${view.producer} · Norenfoods`,
    description: view.description,
  };
}

function lookup(producer: string, slug: string): ProductView | undefined {
  const featured = findFeatured(producer, slug);
  if (featured) return fromFeatured(featured);
  const winner = findWinner(producer, slug);
  if (winner) return fromWinner(winner);
  return undefined;
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/producer/[producer]/brand/[slug]">) {
  const { producer, slug } = await params;
  const view = lookup(producer, slug);
  if (!view) notFound();

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans pb-16 md:pb-0">
      <SiteHeader />
      <main className="flex-grow">
        <div className="container mx-auto px-4 max-w-6xl pt-8 pb-20">
          <Breadcrumb view={view} />
          <Hero view={view} />
          <AwardHistory view={view} />
          <SimilarBrands view={view} />
        </div>
      </main>
      <SiteFooter />
      <MobileWeChatBar />
    </div>
  );
}

function Breadcrumb({ view }: { view: ProductView }) {
  const parts = [view.country, view.intensity, view.cultivar].filter(Boolean) as string[];
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-xs text-muted-foreground mb-6"
    >
      {parts.map((p, i) => (
        <span key={p} className="flex items-center gap-2">
          <span className="hover:text-foreground transition-colors cursor-default">{p}</span>
          {i < parts.length - 1 && <span className="text-muted-foreground/50">›</span>}
        </span>
      ))}
    </nav>
  );
}

function Hero({ view }: { view: ProductView }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-8 lg:gap-12">
      <BottlePanel view={view} />
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground">
            {view.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">By {view.producer}</p>
          <div className="mt-3">
            <ProductPosterButton
              name={view.name}
              subtitle={view.subtitle}
              imagePath={view.imagePath}
              awards={view.cardAwards ?? view.awards?.slice(0, 3) ?? []}
              pricing={view.pricing}
              producerSlug={view.producerSlug}
              brandSlug={view.slug}
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full border border-accent/40 bg-accent/10 text-accent text-xs font-medium">
              <Award className="h-3 w-3" />
              {view.signatureAward}
            </span>
            <span className="inline-flex items-center h-7 px-3 rounded-full border border-border bg-muted/40 text-foreground/80 text-xs font-medium">
              {view.region}
            </span>
            {view.organic && (
              <span className="inline-flex items-center h-7 px-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                Organic
              </span>
            )}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-foreground/80 max-w-prose">
            {view.description}
          </p>
          {view.descriptionZh && (
            <p className="mt-3 text-sm leading-relaxed text-foreground/70 max-w-prose">
              {view.descriptionZh}
            </p>
          )}
          {view.tastingProse && (
            <div className="mt-4 max-w-prose">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Tasting Notes
              </h4>
              <p className="text-sm leading-relaxed text-foreground/80 italic">
                {view.tastingProse}
              </p>
            </div>
          )}
        </div>

        <ClassificationCard view={view} />

        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">
            About {view.producer}
          </h3>
          <p className="text-sm leading-relaxed text-foreground/80 max-w-prose">
            {view.producerBlurb}
          </p>
          {view.producerBlurbZh && (
            <p className="mt-3 text-sm leading-relaxed text-foreground/70 max-w-prose">
              {view.producerBlurbZh}
            </p>
          )}
          <div className="mt-5 flex flex-col items-start gap-4">
            <button
              type="button"
              className="inline-flex items-center justify-center h-9 px-5 rounded-full border border-border bg-secondary/40 hover:bg-secondary text-sm font-medium text-foreground transition-colors"
            >
              Producer Profile
            </button>
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <MapPin className="h-3.5 w-3.5" />
              Where to find {view.name} near you
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function BottlePanel({ view }: { view: ProductView }) {
  return (
    <div className="relative">
      <div className="relative aspect-[4/5] rounded-2xl bg-card border border-border/60 overflow-hidden shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-2/3 h-3/4 bg-gradient-radial from-white/[0.04] via-white/[0.02] to-transparent rounded-full blur-3xl" />
        </div>
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg">
            <div className="flex flex-col items-center leading-none">
              <Trophy className="h-3.5 w-3.5 text-white/90" />
              <span className="text-[8px] font-bold text-white tracking-wider mt-0.5">
                {view.awardYear}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-6">
          {view.imagePath ? (
            <Image
              src={view.imagePath}
              alt={view.name}
              width={600}
              height={1200}
              priority
              className="relative max-h-full w-auto object-contain drop-shadow-2xl"
            />
          ) : (
            <BottlePlaceholder name={view.name} />
          )}
        </div>
      </div>
    </div>
  );
}

function BottlePlaceholder({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <div className="relative flex items-end justify-center h-full w-full">
      <div className="relative w-32 h-[80%] flex flex-col items-center">
        <div className="w-6 h-12 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-t-sm" />
        <div className="w-9 h-3 bg-zinc-700 -mt-0.5 rounded-sm" />
        <div className="flex-1 w-full bg-gradient-to-b from-amber-950/80 via-amber-900/70 to-amber-950 rounded-b-md border border-amber-900/40 flex items-center justify-center mt-1 shadow-2xl">
          <div className="text-center">
            <div className="font-serif text-3xl text-amber-100/90 leading-none">{initials}</div>
            <div className="mt-2 text-[9px] uppercase tracking-[0.2em] text-amber-100/50">
              Modena
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClassificationCard({ view }: { view: ProductView }) {
  const filteredClassification = view.classification.filter(Boolean) as string[];
  const chipColors = [
    "bg-blue-500/15 border-blue-400/30 text-blue-300",
    "bg-purple-500/15 border-purple-400/30 text-purple-300",
    "bg-amber-500/15 border-amber-400/30 text-amber-300",
    "bg-rose-500/15 border-rose-400/30 text-rose-300",
  ];
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-5 flex flex-col gap-5">
      <div>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
          Classification
        </h3>
        {view.classificationOverride && view.classificationOverride.length > 0 ? (
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            {view.classificationOverride.map((row) => (
              <Fragment key={row.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground self-center">
                  {row.label}
                </dt>
                <dd className="text-xs text-foreground/90">{row.value}</dd>
              </Fragment>
            ))}
          </dl>
        ) : (
          <div className="flex flex-wrap gap-2">
            {filteredClassification.map((c, i) => (
              <span
                key={c + i}
                className={`inline-flex items-center h-7 px-3 rounded-full border text-xs font-medium uppercase tracking-wider ${chipColors[i % chipColors.length]}`}
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
          Tasting Sensations
        </h4>
        <div className="flex flex-wrap gap-2">
          {view.tastingNotes.map((t) => (
            <span
              key={t}
              className="inline-flex items-center h-7 px-3 rounded-full border border-border bg-secondary/30 text-xs text-foreground/80"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
          Pairing Suggestions
        </h4>
        <div className="flex flex-wrap gap-2">
          {view.pairings.map((p) => (
            <span
              key={p}
              className="inline-flex items-center h-7 px-3 rounded-full border border-border bg-secondary/30 text-xs text-foreground/80"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {view.awards && view.awards.length > 0 && (
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
            Awards
          </h4>
          <ul className="flex flex-col gap-2">
            {view.awards.map((a) => (
              <li
                key={a}
                className="flex items-start gap-2.5 rounded-md border border-amber-500/20 bg-amber-500/[0.04] px-3 py-2 text-xs text-foreground/90 leading-snug"
              >
                {!startsWithEmoji(a) && (
                  <Award className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                )}
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function AwardHistory({ view }: { view: ProductView }) {
  if (view.hideAwardHistory) return null;
  if (view.awards && view.awards.length > 0) {
    return (
      <section className="mt-16">
        <h2 className="text-base font-semibold text-foreground mb-4">Award History</h2>
        <div className="flex flex-wrap gap-2">
          {view.awards.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-amber-500/40 bg-amber-500/[0.04] text-sm text-foreground/90"
            >
              {!startsWithEmoji(a) && <Award className="h-3.5 w-3.5 text-amber-400" />}
              <span className="font-medium">{a}</span>
            </span>
          ))}
        </div>
      </section>
    );
  }
  const awards =
    view.source === "winner"
      ? buildAwardHistory({ slug: view.slug, medal: view.medal ?? "gold" } as Winner)
      : buildFeaturedAwardHistory(view);
  return (
    <section className="mt-16">
      <h2 className="text-base font-semibold text-foreground mb-4">Award History</h2>
      <div className="flex flex-wrap gap-2">
        {awards.map((a) => (
          <span
            key={a.year}
            className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-amber-500/40 bg-amber-500/[0.04] text-sm text-foreground/90"
          >
            <Award className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-medium">{a.year}</span>
            <span className="text-foreground/70">{a.tier}</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function buildFeaturedAwardHistory(
  view: ProductView,
): { year: number; tier: string }[] {
  const tiers = ["Gold", "Gold", "Silver", "Gold", "Silver", "Best in Class"];
  const out: { year: number; tier: string }[] = [];
  for (let i = 0; i < 5; i++) {
    out.push({ year: view.awardYear - i, tier: tiers[i % tiers.length] });
  }
  return out;
}

function SimilarBrands({ view }: { view: ProductView }) {
  const pool = FEATURED_PRODUCTS.filter((p) => p.slug !== view.slug);
  const sameProducer = pool.filter((p) => p.producerSlug === view.producerSlug);
  const others = pool.filter((p) => p.producerSlug !== view.producerSlug);
  const picks = [...sameProducer, ...others].slice(0, 4).map((p) => ({
    ...p,
    resolvedImage: resolveImagePath(p.imagePath),
  }));
  if (picks.length === 0) return null;
  return (
    <section className="mt-16">
      <h2 className="text-base font-semibold text-foreground mb-4">Similar Brands</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {picks.map((p) => (
          <Link
            key={p.slug}
            href={`/producer/${p.producerSlug}/brand/${p.slug}`}
            className="group rounded-xl border border-border/60 bg-card/40 hover:border-border transition-colors overflow-hidden"
          >
            <div className="relative aspect-[4/5] bg-card flex items-center justify-center p-4">
              {p.resolvedImage ? (
                <Image
                  src={p.resolvedImage}
                  alt={p.name}
                  width={300}
                  height={500}
                  className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <BottlePlaceholder name={p.name} />
              )}
            </div>
            <div className="p-3 text-center border-t border-border/60">
              <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">By {p.producer}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
