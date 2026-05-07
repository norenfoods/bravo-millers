import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Winners | Official Guide to the World's Best Olive Oils",
  description:
    "Browse all award-winning olive oils from the NYIOOC World Olive Oil Competition. Filter by country, intensity, cultivar, and organic certification.",
  icons: {
    icon: "/seo/favicon.png",
  },
  openGraph: {
    title: "Winners | Official Guide to the World's Best Olive Oils",
    description:
      "Browse all award-winning olive oils from the NYIOOC World Olive Oil Competition. Filter by country, intensity, cultivar, and organic certification.",
    type: "website",
    url: "https://bestoliveoils.org/search",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
