import os

# ── 3. WhatsApp button component ──
wa_code = '''"use client";
export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi%2C%20I%20am%20interested%20in%20AI%20Mastery%20courses"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{ position: "fixed", bottom: 90, right: 24, zIndex: 9998, width: 48, height: 48, borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(37,211,102,0.45)", transition: "transform 0.2s" }}
      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}
'''
os.makedirs("ar-ai-mastery/components/ui", exist_ok=True)
with open("ar-ai-mastery/components/ui/WhatsAppButton.tsx", "w", encoding="utf-8") as f:
    f.write(wa_code)
print("WhatsApp button done")

# ── 4. Exit intent popup ──
exit_popup = '''"use client";
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
'''
with open("ar-ai-mastery/components/ui/ExitIntentPopup.tsx", "w", encoding="utf-8") as f:
    f.write(exit_popup)
print("exit intent popup done")
