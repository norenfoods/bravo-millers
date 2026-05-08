import Image from "next/image";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AboutPosterButton } from "@/components/AboutPosterButton";

export const metadata: Metadata = {
  title: "About · Bravo Millers · Norenfoods",
  description:
    "Shanghai-based importer and distributor of premium Italian extra virgin olive oils and specialty foods. Flos Olei 2025 Importer of the Year.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="container mx-auto px-4 max-w-5xl py-16 md:py-24">
        <header className="text-center">
          <p className="text-xs tracking-[0.3em] text-amber-300/80 font-semibold">
            BRAVO MILLERS · NORENFOODS
          </p>
          <h1 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
            Flos Olei 2025 · Importer of the Year
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed">
            We are a Shanghai-based importer and distributor of premium Italian extra virgin
            olive oils and specialty foods.
          </p>
          <p className="mt-3 text-sm tracking-wide text-amber-300/80 font-medium">
            norenfoods.com
          </p>
          <div className="mt-8 flex items-center justify-center">
            <AboutPosterButton />
          </div>
        </header>

        <section className="mt-14 grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-8 items-start">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-muted/40 shadow-2xl">
            <Image
              src="/images/award-ceremony.jpg"
              alt="Flos Olei 2025 award ceremony"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 60vw, 100vw"
              priority
            />
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-2xl mx-auto w-full max-w-[280px]">
            <Image
              src="/images/flos-olei-certificate.png"
              alt="Flos Olei 2025 Importer of the Year certificate"
              width={520}
              height={720}
              className="w-full h-auto object-contain"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
