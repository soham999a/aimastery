import Link from "next/link";

const PERKS = [
  { emoji: "💬", title: "Private Community", desc: "Join our WhatsApp & Discord group with 1,200+ AI learners." },
  { emoji: "🎥", title: "Weekly Live Sessions", desc: "Live Q&A with instructors every week. Ask anything." },
  { emoji: "📜", title: "Industry Certificate", desc: "Earn a certificate backed by real project work, shareable on LinkedIn." },
  { emoji: "💼", title: "Job Board", desc: "Exclusive AI job opportunities shared only with our community." },
];

export default function Community() {
  return (
    <section style={{ background: "var(--bg-surface)", padding: "96px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 999, border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.06)", color: "#34d399", fontSize: 13, fontWeight: 500, marginBottom: 16 }}>
            🌐 Community & Certifications
          </div>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2.25rem", fontWeight: 800, color: "var(--text-h)", marginBottom: 12 }}>
            You don't learn alone
          </h2>
          <p style={{ color: "var(--text-body)", maxWidth: 440, margin: "0 auto", fontSize: "0.95rem" }}>
            Every enrolled student gets lifetime access to our community, live sessions, and certification programme.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 48 }}>
          {PERKS.map((p) => (
            <div key={p.title} style={{ padding: "28px 24px", borderRadius: 18, border: "1px solid var(--border-card)", background: "var(--bg-card)" }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{p.emoji}</div>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text-h)", marginBottom: 8 }}>{p.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-body)", lineHeight: 1.65 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ borderRadius: 24, padding: "48px 40px", background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)", position: "relative", overflow: "hidden", textAlign: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />
          <div style={{ position: "relative" }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Flagship Course</p>
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "#fff", marginBottom: 8 }}>
              "Learn from the Best. Build with the Best."
            </h3>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", marginBottom: 28, maxWidth: 500, margin: "0 auto 28px" }}>
              27 modules · 5000+ learning minutes · Industry certificate · Community access · ₹10,000 one-time
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <Link href="/courses/ai-mastery-complete" style={{ padding: "13px 28px", borderRadius: 10, background: "#fff", color: "#065f46", fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 14, textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
                Enroll Now — ₹10,000
              </Link>
              <Link href="/workshop" style={{ padding: "13px 28px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.3)", color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                Join Free Workshop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
