import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import WorkshopBanner from "@/components/landing/WorkshopBanner";
import FeaturedCourses from "@/components/landing/FeaturedCourses";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import ChatWidget from "@/components/chatbot/ChatWidget";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <WorkshopBanner />
        <FeaturedCourses />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
      <ChatWidget />
      <WhatsAppButton />
      <ExitIntentPopup />
    </>
  );
}
