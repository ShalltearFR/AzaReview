import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Footer from "@/components/Front/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review HSR",
  description: "...",
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
