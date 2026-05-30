"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

const VISIBLE_COUNT = 18;

const TOOLS = [
  { name: "ChatGPT", cat: "AI Chat", color: "#10b981" },
  { name: "Claude", cat: "AI Chat", color: "#7c3aed" },
  { name: "Gemini", cat: "AI Chat", color: "#2563eb" },
  { name: "Perplexity", cat: "Research", color: "#0891b2" },
  { name: "Copilot", cat: "AI Chat", color: "#2563eb" },
  { name: "DeepSeek", cat: "AI Chat", color: "#0ea5e9" },
  { name: "Mistral", cat: "AI Chat", color: "#f97316" },
  { name: "Grok", cat: "AI Chat", color: "#22c55e" },
  { name: "Midjourney", cat: "Image AI", color: "#d97706" },
  { name: "DALL·E 3", cat: "Image AI", color: "#6366f1" },
  { name: "Stable Diffusion", cat: "Image AI", color: "#8b5cf6" },
  { name: "Leonardo AI", cat: "Image AI", color: "#06b6d4" },
  { name: "Adobe Firefly", cat: "Image AI", color: "#ef4444" },
  { name: "Canva AI", cat: "Image AI", color: "#3b82f6" },
  { name: "Ideogram", cat: "Image AI", color: "#f59e0b" },
  { name: "Clipdrop", cat: "Image AI", color: "#ec4899" },
  { name: "Runway", cat: "Video AI", color: "#be185d" },
  { name: "Pika Labs", cat: "Video AI", color: "#a855f7" },
  { name: "Sora", cat: "Video AI", color: "#3b82f6" },
  { name: "HeyGen", cat: "Video AI", color: "#14b8a6" },
  { name: "Synthesia", cat: "Video AI", color: "#8b5cf6" },
  { name: "InVideo AI", cat: "Video AI", color: "#f97316" },
  { name: "Kapwing", cat: "Video AI", color: "#ef4444" },
  { name: "Descript", cat: "Video AI", color: "#6366f1" },
  { name: "ElevenLabs", cat: "Voice AI", color: "#059669" },
  { name: "Murf AI", cat: "Voice AI", color: "#7c3aed" },
  { name: "PlayHT", cat: "Voice AI", color: "#2563eb" },
  { name: "Resemble AI", cat: "Voice AI", color: "#0891b2" },
  { name: "WellSaid Labs", cat: "Voice AI", color: "#d97706" },
  { name: "Whisper", cat: "Voice AI", color: "#10b981" },
  { name: "n8n", cat: "Automation", color: "#f59e0b" },
  { name: "Make", cat: "Automation", color: "#6366f1" },
  { name: "Zapier", cat: "Automation", color: "#ef4444" },
  { name: "Activepieces", cat: "Automation", color: "#3b82f6" },
  { name: "Power Automate", cat: "Automation", color: "#2563eb" },
  { name: "UiPath", cat: "Automation", color: "#8b5cf6" },
  { name: "Power BI", cat: "Analytics", color: "#f59e0b" },
  { name: "Tableau", cat: "Analytics", color: "#3b82f6" },
  { name: "Looker", cat: "Analytics", color: "#6366f1" },
  { name: "Metabase", cat: "Analytics", color: "#14b8a6" },
  { name: "Hex", cat: "Analytics", color: "#2563eb" },
  { name: "Notion AI", cat: "Productivity", color: "#374151" },
  { name: "Motion", cat: "Productivity", color: "#ec4899" },
  { name: "Mem", cat: "Productivity", color: "#8b5cf6" },
  { name: "Reforge", cat: "Productivity", color: "#f97316" },
  { name: "Otter AI", cat: "Productivity", color: "#059669" },
  { name: "Fireflies", cat: "Productivity", color: "#ef4444" },
  { name: "Cursor", cat: "Dev Tools", color: "#2563eb" },
  { name: "GitHub Copilot", cat: "Dev Tools", color: "#22c55e" },
  { name: "Replit Agent", cat: "Dev Tools", color: "#f59e0b" },
  { name: "Bolt.new", cat: "Dev Tools", color: "#6366f1" },
  { name: "Lovable", cat: "Dev Tools", color: "#ec4899" },
  { name: "V0", cat: "Dev Tools", color: "#374151" },
  { name: "Windsurf", cat: "Dev Tools", color: "#06b6d4" },
  { name: "Claude Code", cat: "Dev Tools", color: "#7c3aed" },
  { name: "Aider", cat: "Dev Tools", color: "#14b8a6" },
  { name: "OpenAI API", cat: "Dev Tools", color: "#10b981" },
  { name: "LangChain", cat: "Dev Tools", color: "#0891b2" },
  { name: "LlamaIndex", cat: "Dev Tools", color: "#d97706" },
  { name: "Hugging Face", cat: "Dev Tools", color: "#f97316" },
  { name: "CrewAI", cat: "Dev Tools", color: "#8b5cf6" },
  { name: "AutoGen", cat: "Dev Tools", color: "#2563eb" },
  { name: "Composio", cat: "Dev Tools", color: "#be185d" },
  { name: "Jasper", cat: "Marketing", color: "#2563eb" },
  { name: "Copy.ai", cat: "Marketing", color: "#7c3aed" },
  { name: "Writesonic", cat: "Marketing", color: "#f59e0b" },
  { name: "Rytr", cat: "Marketing", color: "#0891b2" },
  { name: "Surfer SEO", cat: "Marketing", color: "#14b8a6" },
  { name: "Typeface", cat: "Marketing", color: "#6366f1" },
  { name: "Gamma", cat: "Presentation", color: "#10b981" },
  { name: "Beautiful AI", cat: "Presentation", color: "#3b82f6" },
  { name: "Tome", cat: "Presentation", color: "#8b5cf6" },
  { name: "SlidesGPT", cat: "Presentation", color: "#f97316" },
  { name: "Midpage", cat: "Presentation", color: "#ec4899" },
  { name: "Suno AI", cat: "Music AI", color: "#2563eb" },
  { name: "Udio", cat: "Music AI", color: "#7c3aed" },
  { name: "AIVA", cat: "Music AI", color: "#f59e0b" },
  { name: "Boomy", cat: "Music AI", color: "#14b8a6" },
  { name: "Soundraw", cat: "Music AI", color: "#ef4444" },
  { name: "Krisp", cat: "Audio AI", color: "#059669" },
  { name: "Cleanvoice", cat: "Audio AI", color: "#6366f1" },
  { name: "Podcastle", cat: "Audio AI", color: "#8b5cf6" },
  { name: "Adobe Podcast", cat: "Audio AI", color: "#ef4444" },
  { name: "Consensus", cat: "Research", color: "#10b981" },
  { name: "Elicit", cat: "Research", color: "#7c3aed" },
  { name: "Scite", cat: "Research", color: "#2563eb" },
  { name: "ResearchRabbit", cat: "Research", color: "#0891b2" },
  { name: "ChatPDF", cat: "Research", color: "#f59e0b" },
  { name: "Julius AI", cat: "Data Science", color: "#6366f1" },
  { name: "Pandas AI", cat: "Data Science", color: "#14b8a6" },
  { name: "Obviously AI", cat: "Data Science", color: "#06b6d4" },
  { name: "Akkio", cat: "Data Science", color: "#8b5cf6" },
  { name: "Kortical", cat: "Data Science", color: "#f97316" },
  { name: "Phind", cat: "Dev Search", color: "#059669" },
  { name: "Sourcegraph Cody", cat: "Dev Search", color: "#ef4444" },
  { name: "You.com", cat: "Dev Search", color: "#2563eb" },
  { name: "Browse AI", cat: "Web Scraping", color: "#d97706" },
  { name: "Octoparse", cat: "Web Scraping", color: "#6366f1" },
  { name: "Diffbot", cat: "Web Scraping", color: "#8b5cf6" },
  { name: "Apify", cat: "Web Scraping", color: "#3b82f6" },
  { name: "Fathom", cat: "Meeting AI", color: "#2563eb" },
  { name: "Sana", cat: "Learning", color: "#7c3aed" },
  { name: "Doordash AI", cat: "Other", color: "#ef4444" },
];

export default function AITools() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? TOOLS : TOOLS.slice(0, VISIBLE_COUNT);
  const hiddenCount = TOOLS.length - VISIBLE_COUNT;

  return (
    <section style={{ background: "var(--bg-base)", padding: "96px 0" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ color: "#2563eb", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Top Industry AI</p>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2.25rem", fontWeight: 800, color: "var(--text-h)", lineHeight: 1.2 }}>
              100+ AI Tools You'll <span style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Master</span>
            </h2>
            <p style={{ color: "var(--text-body)", marginTop: 8, fontSize: "0.9rem", maxWidth: 480 }}>
              Our curriculum covers the top 100+ AI tools used by industry professionals. From automation to analytics to generative AI.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
          {visible.map((tool, i) => (
            <FadeIn key={tool.name} delay={i * 0.04} direction="up">
              <div style={{ padding: "18px 16px", borderRadius: 14, border: "1px solid var(--border-card)", background: "var(--bg-card)", display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: tool.color }} />
                <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--text-h)" }}>{tool.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500 }}>{tool.cat}</div>
              </div>
            </FadeIn>
          ))}

          {!showAll && (
            <div
              onClick={() => setShowAll(true)}
              style={{ padding: "18px 16px", borderRadius: 14, border: "1px dashed var(--border)", background: "transparent", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, minHeight: 88, cursor: "pointer" }}
            >
              <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "var(--text-faint)" }}>+{hiddenCount}</div>
              <div style={{ fontSize: 11, color: "var(--text-faint)", textAlign: "center" }}>more tools</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 40, padding: "24px 28px", borderRadius: 16, background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text-h)", marginBottom: 4 }}>Master all 100+ tools in our AI Mastery Complete Course</p>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>27 modules · 5000+ learning minutes · 100+ AI tools · Industry certificate</p>
          </div>
          <Link href="/courses/ai-mastery-complete" style={{ padding: "11px 22px", borderRadius: 10, background: "#2563eb", color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 4px 14px rgba(37,99,235,0.35)" }}>
            Enroll — ₹10,000
          </Link>
        </div>
      </div>
    </section>
  );
}
