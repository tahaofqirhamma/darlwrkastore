import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Playfair_Display, Amiri } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "دار ورقة البسطيلة | Feuilles de Bastilla Marocaines Artisanales",
  description:
    "دار ورقة البسطيلة – ورقة البسطيلة المغربية الأصيلة. Feuilles de bastilla artisanales faites à la main, Livraison partout au Maroc.",
  keywords: [
    "دار ورقة البسطيلة",
    "ورقة البسطيلة",
    "ورقة البسطيلة مغربية",
    "feuilles de bastilla",
    "feuilles de bastilla marocaines",
    "achat feuilles de bastilla",
    "livraison bastilla",
    "warqa maroc",
    "pâte à bastilla",
    "bastilla artisanale",
    "ورقة جاهزة للبسطيلة",
  ],
  authors: [{ name: "دار ورقة البسطيلة" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://darlwrka.ma/",
    title: "دار ورقة البسطيلة | Feuilles de Bastilla Marocaines",
    description:
      "Découvrez les feuilles de bastilla artisanales de دار ورقة البسطيلة – fines, traditionnelles et prêtes à l’emploi. Livraison rapide au Maroc.",
    siteName: "دار ورقة البسطيلة",

    locale: "fr_MA",
  },
  twitter: {
    card: "summary_large_image",
    title: "دار ورقة البسطيلة | Feuilles de Bastilla Marocaines",
    description:
      "Feuilles de bastilla artisanales marocaines — tradition, goût et qualité. Commandez dès maintenant sur دار ورقة البسطيلة.",
    images: ["https://darlwrka.ma/assets/og-banner.jpg"],
  },
  alternates: {
    canonical: "https://darlwrka.ma/",
  },
  icons: {
    icon: "/favicon.png",
  },
  metadataBase: new URL("https://darlwrka.ma"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} ${amiri.variable}`}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
