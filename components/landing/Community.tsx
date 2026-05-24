import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

const CERT_FEATURES = [
  "Industry-recognized certificate on completion",
  "Shareable on LinkedIn with one click",
  "Backed by real project work — not just attendance",
  "PDF download, yours forever",
];

const COMMUNITY_STATS = [
  { value: "1,200+", label: "Active Members" },
  { value: "Weekly", label: "Live Q&A Sessions" },
  { value: "24/7", label: "Peer Support" },
  { value: "Lifetime", label: "Access" },
];

const COMMUNITY_POSTS = [
  { name: "Rahul M.", initials: "RM", grad: ["#1e3a8a", "#2563eb"], tier: "pro", text: "Just completed the AI Mastery course and downloaded my certificate! The n8n automation module was 🔥 — already saved 3 hours/day at work.", time: "2h ago" },
  { name: "Sneha K.", initials: "SK", grad: ["#065f46", "#0891b2"], tier: "free", text: "The community here is incredible. Got help with my Power BI dashboard within 10 minutes of posting. Thank you everyone!", time: "5h ago" },
  { name: "Arjun D.", initials: "AD", grad: ["#7c3aed", "#be185d"], tier: "pro", text: "Week 3 of the Data Analytics track. The SQL + Python combo is exactly what I needed for my internship. Highly recommend.", time: "1d ago" },
];

export default function Community() {
  return (
    <section style={{ background: "var(--bg-base)", padding: "96px 0" }}>
      <div className="container">

        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 999, border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.06)", color: "#34d399", fontSize: 13, fontWeight: 500, marginBottom: 16 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Certificates & Community
          </div>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2.25rem", fontWeight: 800, color: "var(--text-h)", marginBottom: 12 }}>
            You don't just learn — you <span style={{ background: "linear-gradient(135deg,#10b981,#2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>get certified</span>
          </h2>
          <p style={{ color: "var(--text-body)", maxWidth: 480, margin: "0 auto", fontSize: "0.95rem" }}>
            Every course comes with an industry certificate and lifetime access to our AI professionals community.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>

          {/* LEFT — Certificate preview */}
          <FadeIn direction="left">
            <div>
              {/* Certificate card */}
              <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(37,99,235,0.25)", background: "var(--bg-card)", marginBottom: 24, boxShadow: "0 0 40px rgba(37,99,235,0.1)" }}>
                {/* Certificate visual */}
                <div style={{ background: "linear-gradient(135deg, #060912 0%, #0f1629 100%)", padding: "32px 28px", borderBottom: "2px solid #2563eb", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 20%, rgba(37,99,235,0.12) 0%, transparent 60%)" }} />
                  <div style={{ position: "relative" }}>
                    {/* Top border decoration */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#2563eb", letterSpacing: "0.15em", textTransform: "uppercase" }}>YesDo Edutech</div>
                      <div style={{ display: "flex", gap: 4 }}>
                        {[...Array(3)].map((_, i) => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i === 1 ? "#2563eb" : "rgba(37,99,235,0.3)" }} />)}
                      </div>
                    </div>
                    <p style={{ fontSize: 11, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Certificate of Completion</p>
                    <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#f1f5f9", marginBottom: 4 }}>AI Mastery Complete Course</h3>
                    <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 16 }}>Awarded to <span style={{ color: "#f1f5f9", fontWeight: 600 }}>Your Name</span></p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontSize: 10, color: "#475569", marginBottom: 2 }}>Issued by</p>
                        <p style={{ fontSize: 12, color: "#60a5fa", fontWeight: 600 }}>YesDo Edutech Pvt Ltd</p>
                      </div>
                      <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#1e3a8a,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Features */}
                <div style={{ padding: "20px 24px" }}>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {CERT_FEATURES.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--text-body)" }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(16,185,129,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href="/courses/ai-mastery-complete" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: "#2563eb", color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none", boxShadow: "0 8px 24px rgba(37,99,235,0.35)" }}>
                Enroll & Get Certified →
              </Link>
            </div>
          </FadeIn>

          {/* RIGHT — Community */}
          <FadeIn direction="right">
            <div>
              {/* Community stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {COMMUNITY_STATS.map((s) => (
                  <div key={s.label} style={{ padding: "18px 16px", borderRadius: 14, border: "1px solid var(--border-card)", background: "var(--bg-card)", textAlign: "center" }}>
                    <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "var(--text-h)", marginBottom: 4 }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Live community feed */}
              <div style={{ borderRadius: 20, border: "1px solid var(--border-card)", background: "var(--bg-card)", overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
                    <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--text-h)" }}>Community Feed</span>
                  </div>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", background: "var(--bg-surface)", padding: "3px 10px", borderRadius: 999, border: "1px solid var(--border)" }}>Live</span>
                </div>

                <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
                  {COMMUNITY_POSTS.map((post, i) => (
                    <FadeIn key={post.name} delay={i * 0.1} direction="none">
                      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${post.grad[0]},${post.grad[1]})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                          {post.initials}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-h)" }}>{post.name}</span>
                            {post.tier === "pro" && (
                              <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", color: "#60a5fa", fontWeight: 700 }}>PRO</span>
                            )}
                            <span style={{ fontSize: 11, color: "var(--text-faint)", marginLeft: "auto" }}>{post.time}</span>
                          </div>
                          <p style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.55 }}>{post.text}</p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                <div style={{ padding: "14px 20px", borderTop: "1px solid var(--border)", background: "var(--bg-surface)" }}>
                  <Link href="/signup" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px", borderRadius: 10, background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", color: "#60a5fa", fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 13, textDecoration: "none" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Join 1,200+ members — it's free
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: 64, borderRadius: 24, padding: "48px 40px", background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)", position: "relative", overflow: "hidden", textAlign: "center" }}>
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
