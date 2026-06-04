"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const GOOGLE_FORM = "https://forms.gle/TuoUeCGtoZbmZszd6";

const CheckCircle = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const ChevronDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
const ChevronUp = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>;
const FireIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>;
const CalendarIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const ClockIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const MonitorIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
const MedalIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>;
const ZapIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const StarIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const MonitorBigIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
const GlobeBigIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const PersonTeachIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const ScrollIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
const DocumentIcon = () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
const MicIcon = () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>;
const LinkIcon = () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
const EyeIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const QuoteIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>;

function JoinButton({ label = "JOIN NOW — REGISTER FREE →", size = "md", compact = false }: { label?: string; size?: "sm" | "md" | "lg"; compact?: boolean }) {
  const fontSize = size === "sm" ? 13 : size === "lg" ? 18 : 15;
  const padding = size === "sm" ? "10px 20px" : size === "lg" ? "18px 36px" : "15px 28px";
  return (
    <button onClick={() => window.open(GOOGLE_FORM, "_blank")} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding, borderRadius: 12, background: "linear-gradient(135deg,#dc2626,#ef4444)", color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize, border: "none", cursor: "pointer", boxShadow: "0 8px 32px rgba(220,38,38,0.45)", letterSpacing: "0.02em", width: compact ? "100%" : "auto" }}>
      {label}
    </button>
  );
}

function BenefitCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div style={{ padding: "20px 16px", borderRadius: 14, border: "1px solid rgba(37,99,235,0.2)", background: "rgba(37,99,235,0.04)", textAlign: "center" }}>
      <div style={{ marginBottom: 10 }}>{icon}</div>
      <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, color: "#f1f5f9", marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 12, color: "#64748b" }}>{desc}</div>
    </div>
  );
}

function ToolBadge({ name }: { name: string }) {
  return (
    <div style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 13, color: "#94a3b8", whiteSpace: "nowrap" }}>
      {name}
    </div>
  );
}

function ToastNotification({ name, city }: { name: string; city: string }) {
  return (
    <div style={{ position: "fixed", bottom: 80, right: 20, zIndex: 9999, background: "#0f1629", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 12, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", animation: "slideUp 0.4s ease" }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", flexShrink: 0, boxShadow: "0 0 8px #4ade80" }} />
      <div style={{ fontSize: 12, color: "#94a3b8" }}><strong style={{ color: "#f1f5f9" }}>{name}</strong> from <strong style={{ color: "#f1f5f9" }}>{city}</strong> just registered</div>
    </div>
  );
}

const TOOLS = ["ChatGPT", "Grok", "Google AI Studio", "Hyper", "Get Multi Tools Lab"];

const TESTIMONIALS = [
  { name: "Amit Verma", role: "Data Scientist, TCS", text: "The ML curriculum is incredibly well-structured. I went from basic Python to building and deploying real models. Got placed at TCS within 3 months of completing the course." },
  { name: "Sneha Patel", role: "B.Tech CSE, IIT Kharagpur", text: "Best AI & ML course I have taken. The Deep Learning modules with TensorFlow are gold. My final year project got selected for a national competition because of what I learned here." },
  { name: "Rajesh Kumar", role: "Software Engineer, Infosys", text: "The Python + ML track is exactly what I needed to transition into AI roles. The hands-on projects and live sessions made all the difference. Highly recommend." },
  { name: "Divya Menon", role: "ML Intern, Flipkart", text: "I landed my ML internship at Flipkart directly because of the portfolio I built during this course. The instructors are real practitioners, not just teachers." },
];

const MODULES = [
  { tier: "Beginner", color: "#4ade80", icon: "01", items: ["Python for ML Fundamentals", "Understanding AI & ML Concepts", "Data Analysis with Pandas & NumPy", "Basic Statistics for Machine Learning"] },
  { tier: "Intermediate", color: "#f59e0b", icon: "02", items: ["Machine Learning with Scikit-learn", "Deep Learning with TensorFlow", "Natural Language Processing", "Computer Vision Basics"] },
  { tier: "Advanced", color: "#ef4444", icon: "03", items: ["Transformer Models & Large Language Models", "MLOps & Model Deployment", "AI Agents & Automation", "Production-Ready Portfolio Projects"] },
];

const FAQS = [
  { q: "Is this workshop really free?", a: "Yes, 100% free. No hidden charges. We believe in giving value first. You only pay if you choose to enroll in our advanced courses after the workshop." },
  { q: "Do I need any technical background?", a: "Absolutely not. This workshop is designed for non-technical professionals. If you can use a smartphone, you can follow along." },
  { q: "How long is the workshop?", a: "The live workshop is 3 hours. We cover AI tools, practical workflows, and a live Q&A session. Recordings are available for 48 hours after." },
  { q: "What AI tools will be covered?", a: "ChatGPT, Gemini, Claude, Midjourney, Perplexity, Notion AI, and 10+ more. All tools have free tiers so you can start immediately." },
  { q: "Will I get a certificate?", a: "Yes! All attendees who complete the workshop receive a verified digital certificate they can share on LinkedIn." },
  { q: "What is the batch date and time?", a: "The workshop starts on 7th June, Sunday at 6:00 PM. The session is fully online and the recording will be available for 48 hours." },
];

function useCountdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const target = new Date("2026-06-07T18:00:00+05:30");
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, target.getTime() - now.getTime());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useLiveCounter() {
  const [count, setCount] = useState(47);
  useEffect(() => {
    const tick = () => setCount(prev => Math.max(20, prev + Math.floor(Math.random() * 5 - 2)));
    const id = setInterval(tick, 8000);
    return () => clearInterval(id);
  }, []);
  return count;
}

function useToast() {
  const [toast, setToast] = useState<{ name: string; city: string } | null>(null);
  const people = [
    { name: "Ravi K.", city: "Kolkata" }, { name: "Sneha M.", city: "Mumbai" },
    { name: "Arun P.", city: "Delhi" }, { name: "Priya S.", city: "Bangalore" },
    { name: "Rahul V.", city: "Pune" }, { name: "Anita D.", city: "Chennai" },
    { name: "Vikram J.", city: "Hyderabad" }, { name: "Neha G.", city: "Kolkata" },
  ];
  useEffect(() => {
    const show = () => {
      setToast(people[Math.floor(Math.random() * people.length)]);
      setTimeout(() => setToast(null), 5000);
    };
    const id = setInterval(show, 14000);
    return () => clearInterval(id);
  }, []);
  return toast;
}

function pad(n: number) { return String(n).padStart(2, "0"); }

export default function WorkshopPage() {
  const time = useCountdown();
  const liveCount = useLiveCounter();
  const toast = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  const timerBox = (val: string, label: string) => (
    <div style={{ textAlign: "center", minWidth: 40 }}>
      <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#fff", lineHeight: 1 }}>{val}</div>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{label}</div>
    </div>
  );

  const sep = <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "rgba(255,255,255,0.5)", alignSelf: "flex-start", marginTop: 4 }}>:</div>;

  return (
    <div style={{ background: "#060912", minHeight: "100vh", color: "#f1f5f9", fontFamily: "Inter, sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* ── Sticky Urgency Bar ── */}
      <div className="r-sticky-workshop" style={{ position: "sticky", top: 0, zIndex: 100, background: "linear-gradient(90deg,#dc2626,#b91c1c)", padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap", width: "100%" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#fff", display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}><FireIcon /> Limited Seats!</span>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, flexShrink: 0 }}>|</span>
        <span style={{ fontSize: 12, color: "#fff", display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}><EyeIcon /> <span style={{ fontWeight: 700 }}>{liveCount}</span> viewing now</span>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, flexShrink: 0 }}>|</span>
        <span style={{ fontSize: 12, color: "#fff", whiteSpace: "nowrap" }}>Workshop in:</span>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          {time.d > 0 && <><span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#fff" }}>{time.d}</span><span style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", marginRight: 6 }}>d</span></>}
          {timerBox(pad(time.h), "hr")}{sep}
          {timerBox(pad(time.m), "min")}{sep}
          {timerBox(pad(time.s), "sec")}
        </div>
      </div>

      {/* ── Hero ── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 25% 30%, rgba(220,38,38,0.08) 0%, transparent 60%), radial-gradient(ellipse at 75% 70%, rgba(37,99,235,0.06) 0%, transparent 50%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px", position: "relative", zIndex: 1 }}>
          <div className="r-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, background: "rgba(220,38,38,0.2)", border: "1px solid rgba(220,38,38,0.4)", marginBottom: 16 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 8px #4ade80" }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fca5a5", letterSpacing: "0.04em" }}>FREE LIVE & INTERACTIVE ONLINE WORKSHOP</span>
              </div>
              <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1rem", color: "#60a5fa", marginBottom: 4, letterSpacing: "0.03em" }}>Learn. Explore. Apply. Stay Ahead.</p>
              <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: 20 }}>
                Master <span style={{ background: "linear-gradient(135deg,#ef4444,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>AI Tools</span>
              </h1>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#cbd5e1" }}>
                  <span style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(37,99,235,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><CalendarIcon /></span>
                  <span><span style={{ color: "#94a3b8" }}>Date:</span> <strong style={{ color: "#f1f5f9" }}>7th June, Sunday</strong></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#cbd5e1" }}>
                  <span style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(37,99,235,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><ClockIcon /></span>
                  <span><span style={{ color: "#94a3b8" }}>Time:</span> <strong style={{ color: "#f1f5f9" }}>6:00 PM</strong></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#cbd5e1" }}>
                  <span style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(37,99,235,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><MonitorIcon /></span>
                  <span><span style={{ color: "#94a3b8" }}>Platform:</span> <strong style={{ color: "#f1f5f9" }}>Online</strong></span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", marginBottom: 24 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#2563eb,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18, fontFamily: "Poppins, sans-serif", fontWeight: 800, color: "#fff" }}>DG</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, color: "#f1f5f9" }}>Debapriya Ghosal</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>All India Rank Holder</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.2)" }}>
                  <MedalIcon />
                  <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 11, color: "#60a5fa", whiteSpace: "nowrap" }}>Microsoft Certified</span>
                </div>
              </div>
              <JoinButton size="lg" label="JOIN NOW — REGISTER FREE →" />
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ width: "100%", maxWidth: 500, borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
                <Image src="/workshop-banner.png" alt="AI & ML Workshop Banner" width={500} height={312} style={{ width: "100%", height: "auto", display: "block" }} priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What You'll Get ── */}
      <section style={{ padding: "48px 24px", background: "#0a0d1a" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#f1f5f9", textAlign: "center", marginBottom: 24 }}>
            What You&apos;ll <span style={{ color: "#60a5fa" }}>Get</span>
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            <BenefitCard icon={<MonitorBigIcon />} title="Hands-on Practice" desc="Live coding & real tools" />
            <BenefitCard icon={<GlobeBigIcon />} title="Real-World Use Cases" desc="Industry scenarios" />
            <BenefitCard icon={<PersonTeachIcon />} title="Expert Guidance" desc="Learn from the best" />
            <BenefitCard icon={<ScrollIcon />} title="Certificate" desc="Verified participation" />
          </div>
          <p style={{ textAlign: "center", fontSize: 13, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            127+ students registered in the last 24 hours
          </p>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2rem", textAlign: "center", marginBottom: 8, color: "#f1f5f9" }}>
            What Our <span style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Students Say</span>
          </h2>
          <p style={{ textAlign: "center", color: "#64748b", fontSize: 14, marginBottom: 40 }}>Real results from real learners</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ padding: 28, borderRadius: 18, border: "1px solid rgba(37,99,235,0.15)", background: "rgba(37,99,235,0.03)", position: "relative" }}>
                <div style={{ position: "absolute", top: 16, right: 20, opacity: 0.15 }}><QuoteIcon /></div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#2563eb,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 16, color: "#fff", flexShrink: 0 }}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, color: "#f1f5f9" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>{t.role}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                  {[1,2,3,4,5].map(s => <StarIcon key={s} />)}
                </div>
                <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, fontStyle: "italic" }}>"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools Covered ── */}
      <section style={{ padding: "48px 24px", background: "#0a0d1a" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.7rem", marginBottom: 8, color: "#f1f5f9" }}>
            Explore Top <span style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>AI Tools</span>
          </h2>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 28 }}>Master the most in-demand AI platforms in 2026</p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12 }}>
            {TOOLS.map(t => <ToolBadge key={t} name={t} />)}
          </div>
        </div>
      </section>

      {/* ── Placement Guidance ── */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 999, background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80", fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
              100% Placement Guidance
            </div>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.7rem", color: "#f1f5f9" }}>
              We Don&apos;t Just Teach — We <span style={{ background: "linear-gradient(135deg,#4ade80,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Build Careers</span>
            </h2>
          </div>
          <div className="r-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            <div style={{ padding: "28px 24px", borderRadius: 16, border: "1px solid rgba(74,222,128,0.15)", background: "rgba(74,222,128,0.03)", textAlign: "center" }}>
              <div style={{ marginBottom: 12 }}><DocumentIcon /></div>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 15, color: "#f1f5f9" }}>Resume & LinkedIn Optimization</h3>
            </div>
            <div style={{ padding: "28px 24px", borderRadius: 16, border: "1px solid rgba(74,222,128,0.15)", background: "rgba(74,222,128,0.03)", textAlign: "center" }}>
              <div style={{ marginBottom: 12 }}><MicIcon /></div>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 15, color: "#f1f5f9" }}>Interview Preparation</h3>
            </div>
            <div style={{ padding: "28px 24px", borderRadius: 16, border: "1px solid rgba(74,222,128,0.15)", background: "rgba(74,222,128,0.03)", textAlign: "center" }}>
              <div style={{ marginBottom: 12 }}><LinkIcon /></div>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 15, color: "#f1f5f9" }}>Job Referrals & Career Support</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof + Stats ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "24px 24px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 20 }}>
          <span style={{ fontSize: 12, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginRight: 8 }}>Trusted by professionals from</span>
          {["Google","Microsoft","Amazon","TCS","Infosys","Wipro","Flipkart","Zomato"].map(c => (
            <span key={c} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, color: "#334155", padding: "4px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)" }}>{c}</span>
          ))}
        </div>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
          {[
            { value: "1,200+", label: "Students Enrolled", color: "#2563eb" },
            { value: "4.8 / 5", label: "Average Rating", color: "#f59e0b" },
            { value: "₹0", label: "Workshop Fee", color: "#4ade80" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center", padding: "20px 16px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "#0f1629" }}>
              <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "2rem", color: s.color, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "#64748b" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Curriculum (Tiered) ── */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2rem", color: "#f1f5f9", marginBottom: 8 }}>
              What You Will <span style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Learn</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: 15 }}>A complete journey from fundamentals to production-ready AI</p>
          </div>
          <div className="r-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {MODULES.map((m, i) => (
              <div key={i} style={{ padding: 28, borderRadius: 18, border: `1px solid ${m.color}25`, background: `rgba(0,0,0,0.2)` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${m.color}20`, border: `1px solid ${m.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 13, color: m.color }}>{m.icon}</div>
                  <div>
                    <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 15, color: m.color }}>{m.tier}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>Module</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {m.items.map((item, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#94a3b8" }}>
                      <CheckCircle />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Is This For You? ── */}
      <section style={{ padding: "64px 24px", background: "#0a0d1a" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2rem", textAlign: "center", marginBottom: 40, color: "#f1f5f9" }}>
            Is This Workshop <span style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Right For You?</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
            <div style={{ padding: 28, borderRadius: 18, border: "1px solid rgba(74,222,128,0.25)", background: "rgba(74,222,128,0.04)" }}>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#4ade80", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(74,222,128,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}><CheckCircle /></span>
                This programme IS for you if...
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["Students who want to break into AI & ML careers","Professionals looking to upskill with real ML tools","Developers who want to add AI/ML to their skillset","Entrepreneurs who want to build AI-powered products","Anyone serious about learning Python, ML & Deep Learning","School & college students preparing for the AI job market"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#94a3b8" }}>
                    <span style={{ flexShrink: 0, marginTop: 1 }}><CheckCircle /></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: 28, borderRadius: 18, border: "1px solid rgba(248,113,113,0.2)", background: "rgba(248,113,113,0.03)" }}>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#f87171", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(248,113,113,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}><CheckCircle /></span>
                This programme is NOT for you if...
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["People looking for a quick shortcut with no effort","Those who already work as senior ML engineers daily","People not willing to practice and build real projects"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#94a3b8" }}>
                    <span style={{ flexShrink: 0, marginTop: 1 }}><CheckCircle /></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2rem", textAlign: "center", color: "#f1f5f9", marginBottom: 8 }}>Frequently Asked Questions</h2>
          <p style={{ textAlign: "center", color: "#64748b", fontSize: 14, marginBottom: 36 }}>Got questions? We have answers.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQS.map((faq,i)=>(
              <div key={i} style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", background: openFaq===i ? "rgba(37,99,235,0.08)" : "#0f1629", border:"none", cursor:"pointer", textAlign:"left", gap:12 }}>
                  <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 15, color: "#f1f5f9" }}>{faq.q}</span>
                  <span style={{ flexShrink: 0, color: "#64748b" }}>{openFaq===i ? <ChevronUp/> : <ChevronDown/>}</span>
                </button>
                {openFaq===i && (
                  <div style={{ padding:"0 20px 18px", background:"rgba(37,99,235,0.04)", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                    <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, paddingTop: 14 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA + Risk Reversal ── */}
      <section style={{ padding:"80px 24px", background:"linear-gradient(135deg,#0f1629 0%,#1e1b4b 50%,#0f1629 100%)", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:1, maxWidth:600, margin:"0 auto" }}>
          <h2 style={{ fontFamily:"Poppins, sans-serif", fontWeight:900, fontSize:"clamp(1.6rem,4vw,2.5rem)", color:"#f1f5f9", marginBottom:12 }}>
            Do Not Get Left Behind.
          </h2>
          <p style={{ color:"#94a3b8", fontSize:16, marginBottom:32, lineHeight:1.6 }}>
            The professionals who master AI today will lead their industries tomorrow. Register now — it is completely free.
          </p>
          <div style={{ maxWidth:400, margin:"0 auto 16px" }}>
            <JoinButton size="lg" compact />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap", fontSize: 12, color: "#64748b" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> No credit card required</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> 100% free & secure</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Lifetime access</span>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <div style={{ padding:"20px 24px", borderTop:"1px solid rgba(255,255,255,0.06)", textAlign:"center", paddingBottom:80 }}>
        <p style={{ fontSize:12, color:"#334155" }}>
          2025 YesDo Edutech Private Limited. All rights reserved.
          <span style={{ margin: "0 8px" }}>|</span>
          <a href="tel:7890016776" style={{ color:"#64748b", textDecoration:"none" }}>7890016776</a>
          <span style={{ margin: "0 8px" }}>|</span>
          <a href="https://yesdo.co.in" target="_blank" rel="noopener noreferrer" style={{ color:"#60a5fa", textDecoration:"none" }}>yesdo.co.in</a>
          <span style={{ margin: "0 8px" }}>|</span>
          <a href="/" style={{ color:"#2563eb", textDecoration:"none" }}>Home</a>
        </p>
      </div>

      {/* ── Sticky bottom bar ── */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:99, background:"linear-gradient(90deg,#dc2626,#b91c1c)", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"center", gap:16, flexWrap:"wrap", boxShadow:"0 -4px 24px rgba(220,38,38,0.4)" }}>
        <span style={{ fontSize:14, fontWeight:600, color:"#fff" }}>Limited seats — 2026-27!</span>
        <JoinButton size="sm" label="JOIN NOW — REGISTER FREE" />
      </div>

      {/* ── Toast notifications ── */}
      {toast && <ToastNotification name={toast.name} city={toast.city} />}
    </div>
  );
}
