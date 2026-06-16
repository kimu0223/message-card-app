import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  Shippori_Mincho,
  DM_Sans,
  Cormorant_Garamond,
  Caveat,
  JetBrains_Mono,
} from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { brandDisplayName, brandName, brandTagline } from "@/lib/brand";
import "./globals.css";
import "@/styles/lp.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const shipporiMincho = Shippori_Mincho({
  variable: "--font-lp-serif",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  preload: false,
});

const dmSans = DM_Sans({
  variable: "--font-lp-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-lp-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-lp-hand",
  weight: ["400", "600"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-lp-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: brandDisplayName,
  applicationName: brandName,
  description: `${brandTagline} アニメーション付きメッセージカードをAIとテンプレートで簡単作成。URLひとつで相手に届けましょう。`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} ${shipporiMincho.variable} ${dmSans.variable} ${cormorantGaramond.variable} ${caveat.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
      <GoogleAnalytics gaId="G-J7NR1Q4P10" />
    </html>
  );
}
