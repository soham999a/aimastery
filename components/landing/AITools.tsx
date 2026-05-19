import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

const TOOLS = [
  { name: "ChatGPT", cat: "AI Chat", color: "#10b981" },
  { name: "Claude", cat: "AI Chat", color: "#7c3aed" },
  { name: "Gemini", cat: "AI Chat", color: "#2563eb" },
  { name: "Midjourney", cat: "Image AI", color: "#d97706" },
  { name: "n8n", cat: "Automation", color: "#f59e0b" },
  { name: "Make", cat: "Automation", color: "#6366f1" },
  { name: "Power BI", cat: "Analytics", color: "#f59e0b" },
  { name: "Perplexity", cat: "Research", color: "#0891b2" },
  { name: "Runway", cat: "Video AI", color: "#be185d" },
  { name: "ElevenLabs", cat: "Voice AI", color: "#059669" },
  { name: "Notion AI", cat: "Productivity", color: "#374151" },
  { name: "Cursor", cat: "Dev Tools", color: "#2563eb" },
];

export default function AITools() {
  return (
    <section style={{ background: "var(--bg-base)", padding: "96px 0" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ color: "#2563eb", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Top Industry AI</p>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2.25rem", fontWeight: 800, color: "var(--text-h)", lineHeight: 1.2 }}>
              100 AI Tools You'll <span style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Master</span>
            </h2>
            <p style={{ color: "var(--text-body)", marginTop: 8, fontSize: "0.9rem", maxWidth: 480 }}>
              Our curriculum covers the top 100 AI tools used by industry professionals. From automation to analytics to generative AI.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
          {TOOLS.map((tool, i) => (
            <FadeIn key={tool.name} delay={i * 0.04} direction="up">
              <div style={{ padding: "18px 16px", borderRadius: 14, border: "1px solid var(--border-card)", background: "var(--bg-card)", display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: tool.color }} />
                <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--text-h)" }}>{tool.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500 }}>{tool.cat}</div>
              </div>
            </FadeIn>
          ))}
          {/* Placeholder for remaining 88 */}
          <FadeIn delay={0.5} direction="up">
            <div style={{ padding: "18px 16px", borderRadius: 14, border: "1px dashed var(--border)", background: "transparent", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, minHeight: 88 }}>
              <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "var(--text-faint)" }}>+88</div>
              <div style={{ fontSize: 11, color: "var(--text-faint)", textAlign: "center" }}>more tools</div>
            </div>
          </FadeIn>
        </div>

        <div style={{ marginTop: 40, padding: "24px 28px", borderRadius: 16, background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text-h)", marginBottom: 4 }}>Learn all 100 tools in our AI Mastery Complete Course</p>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>27 modules · 5000+ learning minutes · Industry certificate</p>
          </div>
          <Link href="/courses/ai-mastery-complete" style={{ padding: "11px 22px", borderRadius: 10, background: "#2563eb", color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 4px 14px rgba(37,99,235,0.35)" }}>
            Enroll — ₹10,000
          </Link>
        </div>
      </div>
    </section>
  );
}
