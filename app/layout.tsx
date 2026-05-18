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
  title: {
    default: "YesDo Edutech | Learn AI & ML from the Best — India's #1 AI Skills Platform",
    template: "%s | YesDo Edutech",
  },
  description:
    "YesDo Edutech — India's premier AI & ML Training platform. Python, Deep Learning, Data Analytics, Power BI, AI Agents. 27-module flagship course, 5000+ learning minutes, 100% practical. School & college workshops. Based in Kolkata.",
  keywords: [
    "YesDo Edutech", "AI courses India", "ML course India", "Machine Learning course Kolkata",
    "AI Mastery", "Kolkata edtech", "AI for students", "Machine Learning", "Deep Learning",
    "Data Analytics", "Python course India", "Power BI", "AI workshop school",
    "AI certification India", "learn AI online", "AI tools course", "prompt engineering",
    "n8n automation", "AI for professionals", "Top 100 AI tools", "AI community India",
    "TensorFlow course", "PyTorch India", "data science course India",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://yesdo.co.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "YesDo Edutech | Learn AI & ML from the Best",
    description: "27-module AI & ML Course. Python, Deep Learning, Power BI. 5000+ learning minutes. 100% Practical. ₹10,000. Kolkata, India.",
    type: "website",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "https://yesdo.co.in",
    siteName: "YesDo Edutech",
    images: [{ url: "/api/og?title=YesDo+Edutech&instructor=AI+%26+ML+Skills&price=10000", width: 1200, height: 630, alt: "YesDo Edutech — AI & ML Courses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YesDo Edutech | Learn AI & ML from the Best",
    description: "India's most practical AI & ML platform. 27 modules, Python, Deep Learning, Power BI. Based in Kolkata.",
    images: ["/api/og?title=YesDo+Edutech&instructor=AI+%26+ML+Skills&price=10000"],
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png" }],
    shortcut: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://yesdo.co.in";

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "YesDo Edutech",
    "url": base,
    "logo": `${base}/logo.png`,
    "description": "India's premier AI & ML Training platform for students and professionals. Based in Kolkata, West Bengal.",
    "address": { "@type": "PostalAddress", "addressLocality": "Kolkata", "addressRegion": "West Bengal", "addressCountry": "IN" },
    "contactPoint": { "@type": "ContactPoint", "telephone": "+91-78900-18776", "contactType": "customer service", "email": "contact@yesdo.co.in" },
    "sameAs": [
      "https://twitter.com/yesdoedutech",
      "https://linkedin.com/company/yesdoedutech",
      "https://youtube.com/@yesdoedutech",
      "https://instagram.com/yesdoedutech",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "YesDo Edutech",
    "url": base,
    "potentialAction": {
      "@type": "SearchAction",
      "target": { "@type": "EntryPoint", "urlTemplate": `${base}/courses?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
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
