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
  title: "AI Mastery | India's Premier Tech Education Platform",
  description:
    "AI Mastery is India's most comprehensive platform for AI, Machine Learning, Computer Vision, Generative AI, and emerging tech. Learn from industry experts, build real projects, earn certifications.",
  keywords: ["AI", "Machine Learning", "Deep Learning", "Computer Vision", "Generative AI", "Online Courses", "EdTech India", "AI courses India"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://aimastery.vercel.app"),
  openGraph: {
    title: "AI Mastery | India's Premier Tech Education Platform",
    description: "India's most comprehensive AI & tech education platform. 200+ courses, 50,000+ students.",
    type: "website",
    images: [{ url: "/api/og?title=AI+Mastery&instructor=Expert+Instructors&price=0", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Mastery",
    description: "India's Premier AI & Tech Education Platform",
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
