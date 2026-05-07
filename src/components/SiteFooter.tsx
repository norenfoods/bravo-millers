import Image from "next/image";
import Link from "next/link";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "Noren Times", href: "/journal" },
      { label: "Education Lab", href: "/learn" },
      { label: "Noren World", href: "/about" },
      { label: "World Ranking", href: "/rankings" },
      { label: "Producer Tools", href: "/tools" },
    ],
  },
  {
    heading: "Results",
    links: [
      { label: "2026 Winners", href: "/" },
      { label: "All Producers", href: "/producers" },
      { label: "Rankings", href: "/rankings" },
      { label: "Marketplace", href: "/market" },
      { label: "Live Results", href: "/live" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Support", href: "/support" },
      { label: "System Status", href: "/status" },
      { label: "Producer Login", href: "/login" },
      { label: "About Noren", href: "/about" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
            <Link href="/" className="inline-flex self-start m-0 p-0">
              <Image
                src="/意园大匠_logo_横版组合_透明底.png"
                alt="Norenfoods"
                width={400}
                height={140}
                className="h-14 w-auto block m-0"
              />
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Bravo Millers is a curated premium olive oil brand launched by
              Norenfoods &mdash; Flos Olei 2025 Best Importer of the Year.
            </p>
          </div>
          <div className="hidden">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Norenfoods. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
