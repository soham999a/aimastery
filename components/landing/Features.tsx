import FadeIn from "@/components/ui/FadeIn";

const icons: Record<string, () => JSX.Element> = {
  Cpu:    () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  Globe:  () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Award:  () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  Users:  () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Zap:    () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Shield: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
};

const FEATURES = [
  { key: "Cpu",    title: "27-Module AI Curriculum",        description: "The most comprehensive AI programme for students — from AI Foundation to building your own AI Employee. 100% practical.", accent: "#3b82f6" },
  { key: "Globe",  title: "100% Online & Flexible",         description: "Works on any laptop, tablet, or smartphone. No labs, no servers, no installation required. Fits any school schedule.", accent: "#8b5cf6" },
  { key: "Award",  title: "Industry-Recognised Certificates", description: "Earn certificates valued by top companies. Microsoft, Alteryx, and YesDo certifications included with courses.", accent: "#f59e0b" },
  { key: "Users",  title: "Live Sessions by Experts",       description: "Curriculum designed and taught by professionals from leading tech companies. Live Q&A, recordings, and assessments.", accent: "#10b981" },
  { key: "Zap",    title: "Earn While You Learn",           description: "The 'Make Money Using AI' module teaches students to monetise skills through freelancing, automation, and digital products.", accent: "#06b6d4" },
  { key: "Shield", title: "Affordable with EMI",            description: "Premium quality education at a fraction of market price. Rs. 10,000 vs Rs. 30,000–1,00,000+ market rate. Easy EMI available.", accent: "#ef4444" },
];

const ZapSm = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;

export default function Features() {
  return (
    <section style={{ background: "var(--bg-base)", padding: "96px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 999, border: "1px solid rgba(37,99,235,0.3)", background: "rgba(37,99,235,0.06)", color: "#60a5fa", fontSize: 13, fontWeight: 500, marginBottom: 16 }}>
            <ZapSm /> Our Differentiators
          </div>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2.25rem", fontWeight: 800, color: "var(--text-h)", marginBottom: 12 }}>
            What Makes YesDo <span className="gt-blue">Unique</span>
          </h2>
          <p style={{ color: "var(--text-body)", maxWidth: 460, margin: "0 auto", fontSize: "0.95rem", lineHeight: 1.7 }}>
            We don't just teach tools — we build career-ready problem solvers.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
          {FEATURES.map((f, i) => {
            const Icon = icons[f.key];
            return (
              <FadeIn key={f.title} delay={i * 0.08} direction="up">
                <div className="card" style={{ padding: 28, borderRadius: 18, border: "1px solid var(--border)", background: "var(--bg-card)", height: "100%" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--icon-bg)", marginBottom: 18, color: f.accent }}>
                    <Icon />
                  </div>
                  <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1rem", color: "var(--text-h)", marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ color: "var(--text-body)", fontSize: "0.875rem", lineHeight: 1.7 }}>{f.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
