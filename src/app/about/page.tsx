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
      <main className="container mx-auto px-4 max-w-5xl py-10 md:py-16">
        <AboutPosterButton />
      </main>
      <SiteFooter />
    </div>
  );
}
