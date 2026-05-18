import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | YesDo Edutech — India's AI & ML Skills Platform",
  description: "Learn about YesDo Edutech — our mission, team, and why we're building India's most practical AI & ML education platform from Kolkata. 1,200+ students trained.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About YesDo Edutech | India's AI & ML Platform",
    description: "Our mission: make practical AI & ML skills accessible to every student and professional in India. Based in Kolkata.",
    type: "website",
  },
};

const TEAM = [
  { name: "Debopriya Ghoshal", role: "Founder & CEO", initials: "DG", grad: ["#1e3a8a", "#2563eb"], bio: "Visionary behind YesDo Edutech. Building India's most practical AI education platform from Kolkata." },
  { name: "YesDo Faculty", role: "AI & Industry Experts", initials: "YF", grad: ["#065f46", "#0891b2"], bio: "Industry practitioners from leading tech companies. Real-world experience, practical curriculum." },
];

const VALUES = [
  { emoji: "🎯", title: "100% Practical", desc: "No theory overload. Every module is hands-on with real tools and real projects." },
  { emoji: "🏆", title: "Learn from the Best", desc: "Our instructors are industry practitioners, not just academics. They've built real AI systems." },
  { emoji: "🤝", title: "Community First", desc: "Lifetime access to our AI professionals network. You grow with your peers." },
  { emoji: "🏫", title: "School Partnerships", desc: "We bring AI education directly to schools and colleges. Zero infrastructure needed." },
  { emoji: "📜", title: "Certified Learning", desc: "Industry-recognized certificates that actually matter to employers." },
  { emoji: "💰", title: "Accessible Pricing", desc: "Premium education at a fraction of market price. EMI from ₹2,000/month." },
];

const STATS = [
  { value: "1,200+", label: "Students Trained" },
  { value: "27", label: "Core AI Modules" },
  { value: "5000+", label: "Learning Minutes" },
  { value: "4.9/5", label: "Average Rating" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 64, background: "var(--bg-base)" }}>

        {/* Hero */}
        <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)", padding: "80px 24px 64px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(37,99,235,0.3)", background: "rgba(37,99,235,0.06)", color: "#60a5fa", fontSize: 13, fontWeight: 500, marginBottom: 20 }}>
              🇮🇳 Made in Kolkata, India
            </div>
            <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2.75rem", color: "var(--text-h)", lineHeight: 1.15, marginBottom: 20 }}>
              We believe every student deserves<br />
              <span style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>world-class AI education</span>
            </h1>
            <p style={{ fontSize: "1.05rem", color: "var(--text-body)", lineHeight: 1.75, maxWidth: 600, margin: "0 auto 32px" }}>
              YesDo Edutech was founded with one mission: make practical AI skills accessible to every student and professional in India — not just those at elite institutions.
            </p>
            <Link href="/courses" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: "#2563eb", color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none", boxShadow: "0 8px 24px rgba(37,99,235,0.35)" }}>
              Explore Our Courses →
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 24px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ textAlign: "center", padding: "28px 16px", borderRadius: 16, border: "1px solid var(--border)", background: "var(--bg-card)" }}>
                <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2rem", color: "var(--text-h)", marginBottom: 6 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 24px" }}>
          <div style={{ borderRadius: 24, padding: "48px 40px", background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #4f46e5 100%)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.07) 0%, transparent 60%)" }} />
            <div style={{ position: "relative" }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Our Mission</p>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "#fff", marginBottom: 16, lineHeight: 1.3 }}>
                "This programme is not for everyone — it's for those who are serious about building their future with AI."
              </h2>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 600 }}>
                We don't promise shortcuts. We promise real skills, real tools, and real outcomes. If you're willing to put in the work, we'll make sure you come out ahead.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 64px" }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "var(--text-h)", marginBottom: 32, textAlign: "center" }}>What we stand for</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {VALUES.map((v) => (
              <div key={v.title} style={{ padding: "24px", borderRadius: 16, border: "1px solid var(--border-card)", background: "var(--bg-card)" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{v.emoji}</div>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text-h)", marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-body)", lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div id="team" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", padding: "64px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "var(--text-h)", marginBottom: 32, textAlign: "center" }}>The team behind YesDo</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              {TEAM.map((m) => (
                <div key={m.name} style={{ padding: "28px", borderRadius: 20, border: "1px solid var(--border-card)", background: "var(--bg-card)", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", flexShrink: 0, background: `linear-gradient(135deg,${m.grad[0]},${m.grad[1]})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 16 }}>
                    {m.initials}
                  </div>
                  <div>
                    <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text-h)", marginBottom: 4 }}>{m.name}</div>
                    <div style={{ fontSize: 12, color: "#2563eb", fontWeight: 600, marginBottom: 8 }}>{m.role}</div>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-body)", lineHeight: 1.6 }}>{m.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications & Community */}
        <div id="certifications" style={{ maxWidth: 900, margin: "0 auto", padding: "64px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            <div style={{ padding: "36px", borderRadius: 20, border: "1px solid rgba(250,204,21,0.2)", background: "rgba(250,204,21,0.04)" }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>📜</div>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "var(--text-h)", marginBottom: 12 }}>Industry Certifications</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-body)", lineHeight: 1.7, marginBottom: 16 }}>
                Complete any course and earn a YesDo Edutech certificate recognized by top companies. Our certificates are backed by real project work, not just attendance.
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {["AI Mastery Certificate", "Data Analytics Certificate", "Python & ML Certificate", "Shareable on LinkedIn"].map((item) => (
                  <li key={item} style={{ fontSize: "0.875rem", color: "var(--text-body)", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#facc15" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div id="community" style={{ padding: "36px", borderRadius: 20, border: "1px solid rgba(37,99,235,0.2)", background: "rgba(37,99,235,0.04)" }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🌐</div>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "var(--text-h)", marginBottom: 12 }}>Live Community Access</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-body)", lineHeight: 1.7, marginBottom: 16 }}>
                Every enrolled student gets lifetime access to our private AI professionals community — live sessions, peer support, job opportunities, and more.
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {["Private WhatsApp/Discord group", "Weekly live Q&A sessions", "Job board & referrals", "Peer project collaboration"].map((item) => (
                  <li key={item} style={{ fontSize: "0.875rem", color: "var(--text-body)", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#60a5fa" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", padding: "64px 24px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "var(--text-h)", marginBottom: 12 }}>Ready to start?</h2>
          <p style={{ color: "var(--text-body)", marginBottom: 28, fontSize: "0.95rem" }}>Join 1,200+ students already building their AI careers.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <Link href="/courses" style={{ padding: "12px 24px", borderRadius: 10, background: "#2563eb", color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none", boxShadow: "0 8px 24px rgba(37,99,235,0.35)" }}>
              Browse Courses
            </Link>
            <Link href="/workshop" style={{ padding: "12px 24px", borderRadius: 10, border: "1px solid rgba(185,28,28,0.3)", background: "rgba(185,28,28,0.06)", color: "#f87171", fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              Join Workshop
            </Link>
            <Link href="/contact" style={{ padding: "12px 24px", borderRadius: 10, border: "1px solid var(--border)", color: "var(--text-body)", fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              Contact Us
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
