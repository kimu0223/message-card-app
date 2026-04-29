import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  Zen_Old_Mincho,
  Zen_Kaku_Gothic_New,
  DM_Serif_Display,
  Caveat,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const zenOldMincho = Zen_Old_Mincho({
  variable: "--font-lp-serif",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  preload: false,
});

const zenKakuGothic = Zen_Kaku_Gothic_New({
  variable: "--font-lp-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  preload: false,
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-lp-display",
  weight: ["400"],
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
  title: "CardMagic — 心ふるえる、一通の手紙を。",
  description: "アニメーション付きメッセージカードをAIとテンプレートで簡単作成。URLひとつで相手に届けましょう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} ${zenOldMincho.variable} ${zenKakuGothic.variable} ${dmSerifDisplay.variable} ${caveat.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
