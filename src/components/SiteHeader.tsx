import Image from "next/image";
import Link from "next/link";
import { Bookmark, Globe, Menu } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 w-full z-50 transition-all duration-300 bg-background border-b border-border h-20 md:h-24 flex items-center">
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-center relative w-full">
        <Link href="/" className="flex items-center group absolute left-4 gap-0">
          <Image
            src="/images/bravo-logo.png"
            alt="Noren"
            width={3334}
            height={3334}
            className="h-20 w-auto block m-0"
            priority
          />
        </Link>
        <Link
          href="/search"
          className="hidden md:block text-sm font-normal text-muted-foreground tracking-widest cursor-pointer"
        >
          The World&rsquo;s Best Extra Virgin Olive Oils
        </Link>
        <div className="flex items-center gap-2 absolute right-4">
          <HeaderIconLink href="/my-lists" label="My Lists" hideOnMobile>
            <Bookmark className="h-5 w-5" strokeWidth={2} />
          </HeaderIconLink>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1 h-9 px-3 rounded-md text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
            title="Change language"
          >
            <Globe className="h-5 w-5" strokeWidth={2} />
            <span className="text-xs font-semibold tracking-wider">EN</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center h-9 w-9 rounded-md text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}

function HeaderIconLink({
  href,
  label,
  children,
  hideOnMobile,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  hideOnMobile?: boolean;
}) {
  return (
    <div className={`group relative ${hideOnMobile ? "hidden sm:flex" : ""}`}>
      <Link
        href={href}
        aria-label={label}
        className="inline-flex items-center justify-center h-9 w-9 rounded-md text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
      >
        {children}
      </Link>
    </div>
  );
}