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
  title: "YesDo Edutech | Empowering Tomorrow's Leaders with AI & Industry Skills",
  description:
    "YesDo Edutech is India's premier AI & Industry Skills Training platform for school and college students. 27-module AI Mastery Course, 100% practical, Rs. 10,000 flagship fee. Based in Kolkata.",
  keywords: ["YesDo Edutech", "AI courses India", "AI Mastery", "Kolkata edtech", "AI for students", "Machine Learning", "Data Analytics", "Python", "Power BI"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://yesdo.co.in"),
  openGraph: {
    title: "YesDo Edutech | AI & Industry Skills for Students",
    description: "27-module AI Mastery Course. 100% Practical. Rs. 10,000. Kolkata, India.",
    type: "website",
    images: [{ url: "/api/og?title=YesDo+Edutech&instructor=AI+%26+Industry+Skills&price=10000", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YesDo Edutech",
    description: "Empowering Tomorrow's Leaders with AI & Industry Skills",
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
