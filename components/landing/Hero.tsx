"use client";

import Link from "next/link";

const ArrowRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const PlayIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const UsersIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const BookIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const StarIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const CheckIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

const SUBJECTS = ["Artificial Intelligence","Machine Learning","Deep Learning","Computer Vision","Generative AI","Data Science","NLP","Augmented Reality"];
const STATS = [{ Icon: UsersIcon, value: "50,000+", label: "Students" },{ Icon: BookIcon, value: "200+", label: "Courses" },{ Icon: StarIcon, value: "4.9/5", label: "Rating" }];
const TRUST = ["Google","Microsoft","Amazon","Infosys","TCS","Wipro"];

export default function Hero() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: "4rem", background: "var(--bg-base)" }}>
      {/* BG */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "15%", left: "5%", width: 480, height: 480, borderRadius: "50%", background: "rgba(37,99,235,0.08)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "rgba(124,58,237,0.07)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(37,99,235,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.04) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
      </div>

      <div className="container" style={{ position: "relative", textAlign: "center", padding: "6rem 24px" }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 999, border: "1px solid rgba(37,99,235,0.3)", background: "rgba(37,99,235,0.07)", marginBottom: 28 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: "#60a5fa" }}>India's Premier AI & Tech Education Platform</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "3.5rem", lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--text-h)", marginBottom: 20, maxWidth: 820, margin: "0 auto 20px" }}>
          One Platform.<br /><span className="gt-blue">Every Subject</span> You Need.
        </h1>

        <p style={{ fontSize: "1.05rem", color: "var(--text-body)", maxWidth: 560, margin: "0 auto 16px", lineHeight: 1.75 }}>
          AI Mastery is India's most comprehensive tech education platform — covering AI, Machine Learning, Computer Vision, Generative AI, and beyond.
        </p>

        {/* Subject pills */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, maxWidth: 700, margin: "0 auto 40px" }}>
          {SUBJECTS.map((s) => (
            <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 500, border: "1px solid var(--pill-border)", background: "var(--pill-bg)", color: "var(--pill-text)" }}>
              <CheckIcon /> {s}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 52 }}>
          <Link href="/courses" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 10, background: "#2563eb", color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 8px 28px rgba(37,99,235,0.4)" }}>
            Explore All Courses <ArrowRight />
          </Link>
          <button style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 28px", borderRadius: 10, border: "1px solid var(--btn-ghost-border)", background: "var(--btn-ghost-bg)", color: "var(--btn-ghost-text)", fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 15, cursor: "pointer" }}>
            <span style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(37,99,235,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#60a5fa" }}><PlayIcon /></span>
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, maxWidth: 480, margin: "0 auto 48px" }}>
          {STATS.map(({ Icon, value, label }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "18px 8px", borderRadius: 14, border: "1px solid var(--border)", background: "var(--stat-bg)" }}>
              <Icon />
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.35rem", color: "var(--text-h)" }}>{value}</span>
              <span style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Trust */}
        <p style={{ fontSize: 11, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>Learners from top companies</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
          {TRUST.map((c) => <span key={c} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 13, color: "var(--text-faint)" }}>{c}</span>)}
        </div>
      </div>
    </section>
  );
}
