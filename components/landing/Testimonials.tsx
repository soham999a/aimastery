import FadeIn from "@/components/ui/FadeIn";

const StarIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const QuoteIcon = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="rgba(37,99,235,0.2)"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>;
const StarSm = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "ML Engineer", company: "TCS", initials: "PS", grad: ["#1d4ed8","#0891b2"], rating: 5, text: "AI Mastery completely transformed my career. The structured curriculum and AI tutor helped me land a job within 2 months of completing the course." },
  { name: "Marcus Johnson", role: "AI Developer", company: "Infosys", initials: "MJ", grad: ["#6d28d9","#be185d"], rating: 5, text: "The most comprehensive ML bootcamp I've taken. Real projects, expert feedback, and a community that actually helps. Worth every rupee." },
  { name: "Aisha Patel", role: "Product Manager", company: "Razorpay", initials: "AP", grad: ["#065f46","#0e7490"], rating: 5, text: "As a non-technical PM, I needed to understand AI deeply. The beginner-friendly approach made complex topics accessible without oversimplifying." },
  { name: "David Kim", role: "CTO", company: "AR Ventures", initials: "DK", grad: ["#92400e","#b91c1c"], rating: 5, text: "We enrolled our entire engineering team. The Enterprise plan's custom curriculum and admin dashboard made team-wide upskilling seamless." },
];

const STATS = [
  { value: "50,000+", label: "Active Learners" },
  { value: "94%", label: "Completion Rate" },
  { value: "4.9 / 5", label: "Average Rating" },
  { value: "87%", label: "Career Advancement" },
];

export default function Testimonials() {
  return (
    <section style={{ background: "var(--bg-base)", padding: "96px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 999, border: "1px solid rgba(250,204,21,0.3)", background: "rgba(250,204,21,0.05)", color: "#fbbf24", fontSize: 13, fontWeight: 500, marginBottom: 16 }}>
            <StarSm /> Student Stories
          </div>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2.25rem", fontWeight: 800, color: "var(--text-h)", marginBottom: 12 }}>
            Trusted by <span className="gt-blue">50,000+</span> learners
          </h2>
          <p style={{ color: "var(--text-body)", maxWidth: 440, margin: "0 auto", fontSize: "0.95rem" }}>Real outcomes from real students across India and beyond.</p>
        </div>

        {/* Stats */}
        <div className="stats-4col" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 52 }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center", padding: "22px 12px", borderRadius: 16, border: "1px solid var(--border)", background: "var(--stat-bg)" }}>
              <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "var(--text-h)", marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1} direction="up">
              <div className="card" style={{ padding: 26, borderRadius: 18, display: "flex", flexDirection: "column", border: "1px solid var(--border-card)", background: "var(--bg-card)", height: "100%" }}>
                <QuoteIcon />
                <div style={{ display: "flex", gap: 2, margin: "14px 0 12px" }}>
                  {Array.from({ length: t.rating }).map((_, i) => <StarIcon key={i} />)}
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-body)", lineHeight: 1.7, flex: 1, marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid var(--divider)" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", flexShrink: 0, background: `linear-gradient(135deg,${t.grad[0]},${t.grad[1]})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700 }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-h)" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
