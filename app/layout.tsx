import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* Loaded through next/font so the URLs pick up `basePath` automatically —
   the page is served from a subpath on GitHub Pages. */
const alpina = localFont({
  src: [
    { path: "./fonts/GT-Alpina-Standard-Bold-Trial.otf", weight: "700", style: "normal" },
    { path: "./fonts/GT-Alpina-Standard-Medium-Italic-Trial.otf", weight: "500", style: "italic" },
  ],
  variable: "--font-alpina",
  display: "block",
});

const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-Semibold.otf", weight: "600", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "block",
});

export const metadata: Metadata = {
  title: "Zariya Recruit — AI-Powered Hiring for Modern HR Teams",
  description:
    "You're tired of sitting through a thousand candidate interviews only to find those few gems. We help you find them. Much faster.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${alpina.variable} ${generalSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
