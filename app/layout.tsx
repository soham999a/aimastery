import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Providers from "@/components/Providers";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "YesDo Edutech | Learn AI from the Best — India's #1 AI Skills Platform",
  description:
    "YesDo Edutech — India's premier AI & Industry Skills Training platform. 27-module AI Mastery Course, 5000+ learning hours, 100% practical, Rs. 10,000 flagship fee. School & college workshops. Based in Kolkata.",
  keywords: [
    "YesDo Edutech", "AI courses India", "AI Mastery", "Kolkata edtech", "AI for students",
    "Machine Learning", "Data Analytics", "Python", "Power BI", "AI workshop school",
    "AI certification India", "learn AI online", "AI tools course", "prompt engineering",
    "n8n automation", "AI for professionals", "Top 100 AI tools", "AI community India",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://yesdo.co.in"),
  openGraph: {
    title: "YesDo Edutech | Learn AI from the Best",
    description: "27-module AI Mastery Course. 5000+ learning hours. 100% Practical. Rs. 10,000. Kolkata, India.",
    type: "website",
    images: [{ url: "/api/og?title=YesDo+Edutech&instructor=AI+%26+Industry+Skills&price=10000", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YesDo Edutech",
    description: "Empowering Tomorrow's Leaders with AI & Industry Skills",
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png" }],
    shortcut: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
        <Providers>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
