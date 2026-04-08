import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Providers from "@/components/Providers";
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
  keywords: ["AI", "Machine Learning", "Deep Learning", "Computer Vision", "Generative AI", "Online Courses", "EdTech India"],
  openGraph: {
    title: "AI Mastery",
    description: "India's Premier Tech Education Platform",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
