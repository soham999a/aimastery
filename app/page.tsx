import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import WorkshopBanner from "@/components/landing/WorkshopBanner";
import FeaturedCourses from "@/components/landing/FeaturedCourses";
import AITools from "@/components/landing/AITools";
import Testimonials from "@/components/landing/Testimonials";
import Community from "@/components/landing/Community";
import Pricing from "@/components/landing/Pricing";
import ChatWidget from "@/components/chatbot/ChatWidget";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "YesDo Edutech AI & ML Courses",
  "description": "India's most practical AI & ML courses — Python, Deep Learning, Data Analytics, Power BI, and more.",
  "itemListElement": [
    {
      "@type": "Course",
      "position": 1,
      "name": "AI Mastery Flagship Course — Beginner to Advanced",
      "description": "27-module flagship AI & ML course. Python, Deep Learning, AI Tools, Automation, Power BI. 100% practical.",
      "provider": { "@type": "Organization", "name": "YesDo Edutech", "sameAs": "https://yesdo.co.in" },
      "offers": { "@type": "Offer", "price": "10000", "priceCurrency": "INR", "availability": "https://schema.org/InStock" },
      "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "inLanguage": "en" },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <WorkshopBanner />
        <FeaturedCourses />
        <AITools />
        <Testimonials />
        <Community />
        <Pricing />
      </main>
      <Footer />
      <ChatWidget />
      <WhatsAppButton />
      <ExitIntentPopup />
    </>
  );
}
