import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bravo Millers · Premium Italian Olive Oils · Shanghai",
  description: "ITALIAN EXTRA VIRGIN OLIVE OIL PRODUCED WITH GREEN OLIVES ONLY",
  icons: {
    icon: "/seo/favicon.png",
  },
  openGraph: {
    title: "Bravo Millers · Premium Italian Olive Oils · Shanghai",
    description: "ITALIAN EXTRA VIRGIN OLIVE OIL PRODUCED WITH GREEN OLIVES ONLY",
    type: "website",
    url: "https://bestoliveoils.org/search",
    images: [
      {
        url: "/images/bottles/意园大匠_logo_竖版组合_白底.png",
        alt: "Bravo Millers",
      },
    ],
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
