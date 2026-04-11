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

    // Also show after 45 seconds
    const timer = setTimeout(() => {
      if (!dismissed) {
        setShow(true);
        sessionStorage.setItem("exit_popup_seen", "1");
      }
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, [dismissed]);

  if (!show) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} onClick={() => { setShow(false); setDismissed(true); }}>
      <div style={{ maxWidth: 480, width: "100%", borderRadius: 24, background: "var(--bg-card)", border: "1px solid var(--border)", padding: "40px 36px", textAlign: "center", position: "relative" }} onClick={e => e.stopPropagation()}>
        <button onClick={() => { setShow(false); setDismissed(true); }} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 20, lineHeight: 1 }}>×</button>

        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 28 }}>🎁</div>

        <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "var(--text-h)", marginBottom: 8 }}>
          Wait! Before You Go...
        </h2>
        <p style={{ color: "var(--text-body)", fontSize: 15, marginBottom: 8, lineHeight: 1.6 }}>
          Get <span style={{ color: "#4ade80", fontWeight: 700 }}>20% OFF</span> your first course + access to our FREE AI Workshop
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 28 }}>Use code <span style={{ fontFamily: "monospace", background: "rgba(37,99,235,0.15)", color: "#60a5fa", padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>AIMASTERY20</span> at checkout</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/courses" onClick={() => { setShow(false); setDismissed(true); }} style={{ display: "block", padding: "13px", borderRadius: 12, background: "#2563eb", color: "#fff", textDecoration: "none", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, boxShadow: "0 8px 24px rgba(37,99,235,0.35)" }}>
            Claim 20% Discount →
          </Link>
          <Link href="/workshop" onClick={() => { setShow(false); setDismissed(true); }} style={{ display: "block", padding: "11px", borderRadius: 12, border: "1px solid var(--border)", color: "var(--text-body)", textDecoration: "none", fontSize: 13 }}>
            Join Free Workshop Instead
          </Link>
          <button onClick={() => { setShow(false); setDismissed(true); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 12, padding: "4px" }}>
            No thanks, I don&apos;t want a discount
          </button>
        </div>
      </div>
    </div>
  );
}
