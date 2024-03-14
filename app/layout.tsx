import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import type { Metadata } from "next";
import { CDN2 } from "@/utils/cdn";
import NavBar from "@/components/Front/NavBar";

export const metadata: Metadata = {
  metadataBase: new URL(CDN2),
  title: "Review HSR",
  description:
    "Votre review de compte Honkai : Star Rail, rapidement et simplement",
  openGraph: {
    images: [`/img/homepage/logo_SRE.webp`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="bg-background">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
