import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zariya Recruit — AI-Powered Hiring for Modern HR Teams",
  description:
    "You're tired of sitting through a thousand candidate interviews only to find those few gems. We help you find them. Much faster.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
