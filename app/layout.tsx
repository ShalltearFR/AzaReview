import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import type { Metadata } from "next";
import { CDN2 } from "@/utils/cdn";
import "aos/dist/aos.css";
import { CookiesProvider } from "next-client-cookies/server";
import Snowfall from "react-snowfall";

export const metadata: Metadata = {
  metadataBase: new URL(CDN2),
  title: "Review HSR",
  description:
    "Votre review de compte Honkai : Star Rail, rapidement et simplement",
  openGraph: {
    images: [`/img/homepage/logo_SRE.webp`],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ajout barre de recherche UID dans le moteur de recherche
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Review HSR",
    url: "https://review-hsr.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      name: "Rechercher via l'UID Honaki : Star Rail",
      target: "https://review-hsr.vercel.app/uid/{search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <CookiesProvider>
      <html lang="fr">
        <body className="bg-background">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <Analytics />
          <SpeedInsights />
          {children}
        </body>
      </html>
    </CookiesProvider>
  );
}
