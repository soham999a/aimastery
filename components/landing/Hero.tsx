"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

// SVG Icons
const ArrowRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const PlayIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const UsersIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const BookIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const StarIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const CheckIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

const SUBJECTS = ["Artificial Intelligence","Machine Learning","Deep Learning","Computer Vision","Generative AI","Data Science","NLP","Augmented Reality"];
const STATS = [
  { Icon: UsersIcon, value: "50,000+", label: "Students" },
  { Icon: BookIcon, value: "200+", label: "Courses" },
  { Icon: StarIcon, value: "4.9/5", label: "Rating" },
];
const TRUST = ["Google","Microsoft","Amazon","Infosys","TCS","Wipro"];

// Particle network canvas animation
function ParticleCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    });
    canvas.addEventListener("mouseleave", () => { mouse = { x: -9999, y: -9999 }; });

    const COUNT = 80;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dotColor = isDark ? "rgba(99,130,255," : "rgba(37,99,235,";
      const lineColor = isDark ? "rgba(99,130,255," : "rgba(37,99,235,";

      // Update + draw dots
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.x += (dx / dist) * 1.5;
          p.y += (dy / dist) * 1.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor + "0.7)";
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineColor + (1 - d / 130) * 0.35 + ")";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      paddingTop: "4rem",
      background: isDark ? "#060912" : "#f8fafc",
    }}>
      <ParticleCanvas isDark={isDark} />

      {/* Gradient orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "15%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "rgba(37,99,235,0.07)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "rgba(124,58,237,0.06)", filter: "blur(90px)" }} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "6rem 24px" }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px",
          borderRadius: 999,
          border: isDark ? "1px solid rgba(37,99,235,0.4)" : "1px solid rgba(37,99,235,0.25)",
          background: isDark ? "rgba(37,99,235,0.1)" : "rgba(37,99,235,0.06)",
          marginBottom: 28,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 8px #4ade80" }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: isDark ? "#93c5fd" : "#1d4ed8" }}>
            India's Premier AI & Tech Education Platform
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "Poppins, sans-serif", fontWeight: 800,
          fontSize: "3.5rem", lineHeight: 1.1, letterSpacing: "-0.03em",
          color: isDark ? "#ffffff" : "#0f172a",
          margin: "0 auto 20px", maxWidth: 820,
        }}>
          One Platform.<br />
          <span className="gt-blue">Every Subject</span> You Need.
        </h1>

        <p style={{
          fontSize: "1.05rem",
          color: isDark ? "#94a3b8" : "#475569",
          maxWidth: 560, margin: "0 auto 16px", lineHeight: 1.75,
        }}>
          AI Mastery is India's most comprehensive tech education platform — covering AI, Machine Learning, Computer Vision, Generative AI, and beyond.
        </p>

        {/* Subject pills */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, maxWidth: 700, margin: "0 auto 40px" }}>
          {SUBJECTS.map((s) => (
            <span key={s} style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 500,
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
              background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
              color: isDark ? "#cbd5e1" : "#334155",
            }}>
              <CheckIcon /> {s}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 52 }}>
          <Link href="/courses" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "13px 28px", borderRadius: 10, background: "#2563eb",
            color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 700,
            fontSize: 15, textDecoration: "none",
            boxShadow: "0 8px 28px rgba(37,99,235,0.45)",
          }}>
            Explore All Courses <ArrowRight />
          </Link>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "13px 28px", borderRadius: 10,
            border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)",
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)",
            color: isDark ? "#e2e8f0" : "#1e293b",
            fontFamily: "Poppins, sans-serif", fontWeight: 600,
            fontSize: 15, cursor: "pointer",
          }}>
            <span style={{
              width: 30, height: 30, borderRadius: "50%",
              background: isDark ? "rgba(37,99,235,0.2)" : "rgba(37,99,235,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb",
            }}><PlayIcon /></span>
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, maxWidth: 480, margin: "0 auto 48px" }}>
          {STATS.map(({ Icon, value, label }) => (
            <div key={label} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              padding: "18px 8px", borderRadius: 14,
              border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)",
              backdropFilter: "blur(8px)",
            }}>
              <Icon />
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.35rem", color: isDark ? "#fff" : "#0f172a" }}>{value}</span>
              <span style={{ fontSize: 11, color: isDark ? "#64748b" : "#94a3b8", textAlign: "center" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Trust */}
        <p style={{ fontSize: 11, color: isDark ? "#334155" : "#94a3b8", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>
          Learners from top companies
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
          {TRUST.map((c) => (
            <span key={c} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 13, color: isDark ? "#475569" : "#64748b" }}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
