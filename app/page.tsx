import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import FeaturedCourses from "@/components/landing/FeaturedCourses";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import ChatWidget from "@/components/chatbot/ChatWidget";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <FeaturedCourses />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
