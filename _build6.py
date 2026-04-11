workshop_banner = '''"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

function useCountdown() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      const diff = Math.max(0, midnight.getTime() - now.getTime());
      setTime({ h: Math.floor(diff/3600000), m: Math.floor((diff%3600000)/60000), s: Math.floor((diff%60000)/1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function pad(n: number) { return String(n).padStart(2, "0"); }

export default function WorkshopBanner() {
  const time = useCountdown();
  return (
    <section style={{ padding: "0 0 0", background: "var(--bg-base)" }}>
      <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div style={{ borderRadius: 24, background: "linear-gradient(135deg,#7f1d1d 0%,#991b1b 40%,#b91c1c 100%)", padding: "40px 48px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 50%,rgba(255,255,255,0.06) 0%,transparent 60%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 999, background: "rgba(255,255,255,0.12)", marginBottom: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 6px #4ade80" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#fca5a5" }}>FREE Live Workshop</span>
            </div>
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#fff", marginBottom: 6 }}>
              Join 50,000+ Professionals — Learn AI in 3 Hours
            </h3>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>No coding required. Practical AI workflows you can use from day one.</p>
          </div>
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Ends in:</span>
              {[pad(time.h)+"h", pad(time.m)+"m", pad(time.s)+"s"].map((t, i) => (
                <div key={i} style={{ background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: "6px 10px", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", minWidth: 44, textAlign: "center" }}>{t}</div>
              ))}
            </div>
            <Link href="/workshop" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: "#fff", color: "#b91c1c", fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 14, textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
              Register Free Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
'''
with open("ar-ai-mastery/components/landing/WorkshopBanner.tsx", "w", encoding="utf-8") as f:
    f.write(workshop_banner)
print("workshop banner done")
