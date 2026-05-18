"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const seen = sessionStorage.getItem("exit_popup_seen");
    if (seen) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) {
        setShow(true);
        sessionStorage.setItem("exit_popup_seen", "1");
      }
    };

    // Show after 36 seconds
    const timer = setTimeout(() => {
      if (!dismissed) {
        setShow(true);
        sessionStorage.setItem("exit_popup_seen", "1");
      }
    }, 36000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, [dismissed]);

  if (!show) return null;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={() => { setShow(false); setDismissed(true); }}
    >
      <div
        style={{ maxWidth: 480, width: "100%", borderRadius: 24, background: "var(--bg-card)", border: "1px solid var(--border)", padding: "40px 36px", textAlign: "center", position: "relative" }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => { setShow(false); setDismissed(true); }}
          style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 22, lineHeight: 1 }}
        >×</button>

        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 28 }}>
          🤖
        </div>

        <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "var(--text-h)", marginBottom: 10 }}>
          Wait — Before You Go!
        </h2>

        <p style={{ color: "var(--text-body)", fontSize: 15, marginBottom: 6, lineHeight: 1.65 }}>
          The AI & ML job market is growing <span style={{ color: "#4ade80", fontWeight: 700 }}>40% every year</span>. Don't get left behind.
        </p>

        <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 28, lineHeight: 1.6 }}>
          Join 1,200+ students already building real AI skills with Python, Deep Learning, Power BI, and more — at India's most practical AI platform.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link
            href="/courses"
            onClick={() => { setShow(false); setDismissed(true); }}
            style={{ display: "block", padding: "13px", borderRadius: 12, background: "#2563eb", color: "#fff", textDecoration: "none", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, boxShadow: "0 8px 24px rgba(37,99,235,0.35)" }}
          >
            Explore Our Courses →
          </Link>
          <Link
            href="/workshop"
            onClick={() => { setShow(false); setDismissed(true); }}
            style={{ display: "block", padding: "11px", borderRadius: 12, border: "1px solid rgba(185,28,28,0.35)", color: "#f87171", textDecoration: "none", fontSize: 13, fontWeight: 600 }}
          >
            Join the Free Workshop Instead
          </Link>
          <button
            onClick={() => { setShow(false); setDismissed(true); }}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 12, padding: "4px" }}
          >
            No thanks, I'll figure it out myself
          </button>
        </div>
      </div>
    </div>
  );
}
