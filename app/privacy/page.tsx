import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms | YesDo Edutech",
  description: "YesDo Edutech's privacy policy and terms of service. Learn how we collect, use, and protect your data.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: false },
};

const SECTIONS = [
  {
    id: "privacy",
    title: "Privacy Policy",
    content: [
      {
        heading: "Information We Collect",
        text: "We collect information you provide directly to us, such as your name, email address, phone number, and payment information when you register for courses or contact us. We also collect usage data to improve our platform.",
      },
      {
        heading: "How We Use Your Information",
        text: "We use your information to provide and improve our services, process payments, send course updates and notifications, respond to your inquiries, and send marketing communications (which you can opt out of at any time).",
      },
      {
        heading: "Data Security",
        text: "We implement industry-standard security measures to protect your personal information. Payment data is processed securely through Razorpay and is never stored on our servers.",
      },
      {
        heading: "Cookies",
        text: "We use cookies to improve your experience on our platform, remember your preferences, and analyze site traffic. You can control cookie settings through your browser.",
      },
      {
        heading: "Third-Party Services",
        text: "We use trusted third-party services including Firebase (authentication), Razorpay (payments), Resend (email), and Vercel Analytics. These services have their own privacy policies.",
      },
      {
        heading: "Your Rights",
        text: "You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at contact@yesdo.co.in. We will respond within 30 days.",
      },
    ],
  },
  {
    id: "terms",
    title: "Terms of Service",
    content: [
      {
        heading: "Acceptance of Terms",
        text: "By accessing or using YesDo Edutech's platform, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.",
      },
      {
        heading: "Course Access",
        text: "Upon successful payment, you receive access to the purchased course content. Access is personal and non-transferable. Sharing login credentials is prohibited.",
      },
      {
        heading: "Refund Policy",
        text: "We offer a 30-day money-back guarantee on all courses. If you're not satisfied, contact us within 30 days of purchase for a full refund. No questions asked.",
      },
      {
        heading: "Intellectual Property",
        text: "All course content, materials, and resources are the intellectual property of YesDo Edutech. You may not reproduce, distribute, or create derivative works without written permission.",
      },
      {
        heading: "Code of Conduct",
        text: "Students are expected to maintain respectful conduct in all community spaces. Harassment, spam, or inappropriate behavior will result in immediate removal from the platform.",
      },
      {
        heading: "Limitation of Liability",
        text: "YesDo Edutech is not liable for any indirect, incidental, or consequential damages arising from your use of our platform. Our total liability is limited to the amount you paid for the course.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 64, background: "var(--bg-base)" }}>

        <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)", padding: "56px 24px 40px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2.25rem", color: "var(--text-h)", marginBottom: 8 }}>
              Privacy Policy & Terms
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Last updated: May 2026 · YesDo Edutech Pvt Ltd, Kolkata, West Bengal</p>
          </div>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
          {/* Quick nav */}
          <div style={{ display: "flex", gap: 12, marginBottom: 48 }}>
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} style={{ padding: "8px 18px", borderRadius: 8, border: "1px solid var(--border)", color: "var(--text-body)", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                {s.title}
              </a>
            ))}
          </div>

          {SECTIONS.map((section) => (
            <div key={section.id} id={section.id} style={{ marginBottom: 64 }}>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "var(--text-h)", marginBottom: 32, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
                {section.title}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {section.content.map((item) => (
                  <div key={item.heading}>
                    <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text-h)", marginBottom: 8 }}>{item.heading}</h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-body)", lineHeight: 1.75 }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ padding: "28px", borderRadius: 16, border: "1px solid var(--border)", background: "var(--bg-card)", textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--text-body)", marginBottom: 8 }}>Questions about our policies?</p>
            <a href="mailto:contact@yesdo.co.in" style={{ color: "#2563eb", fontWeight: 600, fontSize: "0.9rem" }}>contact@yesdo.co.in</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
