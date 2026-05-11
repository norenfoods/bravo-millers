import { AboutSection } from "@/components/AboutSection";
import { FeaturedProductCard, type FeaturedCardData } from "@/components/FeaturedProductCard";
import { FilterBar } from "@/components/FilterBar";
import { MobileWeChatBar } from "@/components/MobileWeChatBar";
import { ResultsHeader } from "@/components/ResultsHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WeChatSection } from "@/components/WeChatSection";
import { FEATURED_PRODUCTS } from "@/lib/featured-products";
import { resolveImagePath } from "@/lib/resolve-image";

const VISIBLE_SLUGS = new Set([
  "olio-mimi-coratina",
  "frantoio-galioto-dop",
  "olivia-suprema-evoo",
  "fonte-di-foiano-toscano-igp",
  "fonte-di-foiano-riflessi",
  "fonte-di-foiano-grand-cru",
  "frantoio-romano-ortice-n01",
  "frantoio-romano-racioppella-n03",
  "bonamini-dop-veneto-valpolicella",
  "quattrociocchi-olivastro",
  "quattrociocchi-superbo",
  "mate-viola-tonda",
  "mate-limone",
  "mate-arancia",
  "nonno-salvatore-le-tre-colonne",
  "viola-il-sincero",
  "masoni-becciu-alphabetum",
  "de-carlo-tenuta-torre-di-mossa-dop",
]);

const IGP_SLUGS = new Set([
  "aceto-del-duca",
  "giardini-aceto-balsamico-modena-igp",
]);

const DOP_SLUGS = new Set([
  "giardini-aceto-balsamico-dop-12",
  "giardini-aceto-balsamico-dop-25",
]);

export default function HomePage() {
  const cards = FEATURED_PRODUCTS.map((p) => ({
    ...p,
    resolvedImage: resolveImagePath(p.imagePath),
  }));
  const visible = cards.filter((p) => VISIBLE_SLUGS.has(p.slug));
  const igp = cards.filter((p) => IGP_SLUGS.has(p.slug));
  const dop = cards.filter((p) => DOP_SLUGS.has(p.slug));

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/10 selection:text-primary pb-16 md:pb-0">
      <SiteHeader />
      <main className="flex-grow">
        <FilterBar />
        <div className="bg-gray-200 dark:bg-background">
          <div className="container mx-auto px-4 max-w-7xl py-12">
            <ResultsHeader
              edition="Flos Olei 2025 Best Importer"
              total={visible.length}
              title="Premium Extra Virgin Olive Oils · 精品特级初榨橄榄油"
            />
            <div className="mb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visible.map((p) => (
                  <FeaturedProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <section className="bg-gradient-to-b from-[#1a1208] via-[#0f0a05] to-background border-y border-amber-900/20">
          <div className="container mx-auto px-4 max-w-7xl py-16">
            <BalsamicSubsection
              title="Balsamic Vinegar of Modena IGP"
              subtitle="摩德纳IGP认证黑醋"
              cards={igp}
              variant="floatingSm"
            />
            <div className="my-12 h-px bg-amber-900/20" />
            <BalsamicSubsection
              title="Traditional Balsamic Vinegar of Modena DOP"
              subtitle="摩德纳DOP传统黑醋 · 最高认证"
              cards={dop}
              variant="floatingLg"
            />
          </div>
        </section>
        <AboutSection />
        <WeChatSection />
      </main>
      <SiteFooter />
      <MobileWeChatBar />
    </div>
  );
}

function BalsamicSubsection({
  title,
  subtitle,
  cards,
  variant,
}: {
  title: string;
  subtitle: string;
  cards: FeaturedCardData[];
  variant: "floatingSm" | "floatingLg";
}) {
  return (
    <div>
      <div className="mb-10">
        <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-foreground">
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground tracking-wide">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((p) => (
          <FeaturedProductCard key={p.slug} product={p} variant={variant} />
        ))}
      </div>
    </div>
  );
}
