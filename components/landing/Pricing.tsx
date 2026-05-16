"use client";

import { useState } from "react";
import Link from "next/link";
import PaymentModal from "@/components/ui/PaymentModal";

const CheckIcon = ({ color = "#2563eb" }: { color?: string }) => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const ZapIcon = ({ color = "currentColor" }: { color?: string }) => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const CrownIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><line x1="5" y1="20" x2="19" y2="20"/></svg>;

const PLANS = [
  { name: "Flagship",    price: { monthly: 10000, annual: 10000 }, description: "AI Mastery Complete Course — 27 modules",    features: ["27 Core AI Modules", "100% Practical learning", "Google Classroom access", "Live sessions with experts", "Certification included", "Bonus: SQL, Python, Power BI, Excel", "Easy EMI options available"],                                                                                                cta: "Enroll Now",    href: "/courses/ai-mastery-complete",   highlight: true  },
  { name: "Data Track",  price: { monthly: 7500,  annual: 7500  }, description: "Data Analytics + Business Analytics",        features: ["Excel, SQL, Python, Power BI", "Business KPIs & dashboards", "7-module curriculum", "Certification prep", "Live Q&A sessions", "Project-based learning"],                                                                                                                                              cta: "Enroll Now",    href: "/courses/data-analytics",        highlight: false },
  { name: "AI Python",   price: { monthly: 8000,  annual: 8000  }, description: "Learn AI using Python",                      features: ["Python, ML, Deep Learning", "NLP & Computer Vision", "Real-world AI projects", "Deployed model portfolio", "Live sessions", "Certification prep"],                                                                                                                                                    cta: "Enroll Now",    href: "/courses/learn-ai-python",       highlight: false },
  { name: "Enterprise",  price: { monthly: null,  annual: null  }, description: "School / College Partnership",                features: ["Custom batch scheduling", "Zero infrastructure needed", "Expert instructors provided", "After-school / weekend batches", "Priority scheduling", "Special introductory rates"],                                                                                                                         cta: "Partner With Us", href: "/contact",                     highlight: false },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [modalPlan, setModalPlan] = useState<{ name: string; price: number } | null>(null);

  return (
    <section id="pricing" style={{ background: "var(--bg-surface)", padding: "96px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 999, border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.06)", color: "#a78bfa", fontSize: 13, fontWeight: 500, marginBottom: 16 }}>
            <CrownIcon /> Pricing Plans
          </div>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2.25rem", fontWeight: 800, color: "var(--text-h)", marginBottom: 12 }}>
            Invest in your <span className="gt-purple">future</span>
          </h2>
          <p style={{ color: "var(--text-body)", maxWidth: 440, margin: "0 auto 32px", fontSize: "0.95rem" }}>Premium quality education at a fraction of market price. Save up to 70% vs competitors. Easy EMI available.</p>

          {/* Toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: 5, borderRadius: 12, background: "var(--bg-input)", border: "1px solid var(--border)" }}>
            {(["Monthly","Annual"] as const).map((label) => {
              const active = label === "Annual" ? annual : !annual;
              return (
                <button key={label} onClick={() => setAnnual(label === "Annual")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 20px", borderRadius: 9, fontSize: 14, fontWeight: 600, background: active ? "var(--bg-card)" : "transparent", color: active ? "var(--text-h)" : "var(--text-muted)", border: "none", cursor: "pointer", boxShadow: active ? "0 1px 6px rgba(0,0,0,0.15)" : "none", transition: "all 0.2s" }}>
                  {label}
                  {label === "Annual" && <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: "rgba(16,185,129,0.15)", color: "#10b981" }}>Save 20%</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 20, alignItems: "start" }}>
          {PLANS.map((plan) => {
            const price = annual ? plan.price.annual : plan.price.monthly;
            return (
              <div key={plan.name} style={{ position: "relative", borderRadius: 20, padding: 26, display: "flex", flexDirection: "column", ...(plan.highlight ? { background: "linear-gradient(160deg,#1e40af 0%,#1d4ed8 100%)", boxShadow: "0 24px 60px rgba(37,99,235,0.35)", transform: "scale(1.03)" } : { border: "1px solid var(--border-card)", background: "var(--bg-card)" }) }}>
                {plan.highlight && (
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, background: "#fff", color: "#1d4ed8", fontSize: 12, fontWeight: 700, boxShadow: "0 4px 14px rgba(0,0,0,0.2)" }}>
                      <ZapIcon color="#1d4ed8" /> Most Popular
                    </span>
                  </div>
                )}

                <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: plan.highlight ? "#fff" : "var(--text-h)", marginBottom: 4 }}>{plan.name}</h3>
                <p style={{ fontSize: 13, color: plan.highlight ? "rgba(255,255,255,0.65)" : "var(--text-muted)", marginBottom: 20 }}>{plan.description}</p>

                <div style={{ marginBottom: 24 }}>
                  {price !== null ? (
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2.4rem", color: plan.highlight ? "#fff" : "var(--text-h)", lineHeight: 1 }}>₹{price!.toLocaleString()}</span>
                      <span style={{ fontSize: 13, color: plan.highlight ? "rgba(255,255,255,0.55)" : "var(--text-muted)", marginBottom: 4 }}>/mo</span>
                    </div>
                  ) : (
                    <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2rem", color: "var(--text-h)" }}>Custom</span>
                  )}
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.875rem" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", background: plan.highlight ? "rgba(255,255,255,0.18)" : "rgba(37,99,235,0.1)" }}>
                        <CheckIcon color={plan.highlight ? "#fff" : "#2563eb"} />
                      </div>
                      <span style={{ color: plan.highlight ? "rgba(255,255,255,0.82)" : "var(--text-body)" }}>{f}</span>
                    </li>
                  ))}
                </ul>

                {price !== null ? (
                  <button
                    onClick={() => setModalPlan({ name: plan.name, price: price! })}
                    style={{ width: "100%", display: "block", textAlign: "center", padding: "12px", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "Poppins, sans-serif", transition: "all 0.18s", cursor: "pointer", border: "none", ...(plan.highlight ? { background: "#fff", color: "#1d4ed8" } : { border: "1px solid var(--border)", color: "var(--text-body)", background: "transparent" }) }}
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <Link href={plan.href} style={{ display: "block", textAlign: "center", padding: "12px", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none", fontFamily: "Poppins, sans-serif", transition: "all 0.18s", border: "1px solid var(--border)", color: "var(--text-body)", background: "transparent" }}>
                    {plan.cta}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-faint)", marginTop: 32 }}>All plans include a 30-day money-back guarantee. No questions asked.</p>
      </div>

      {modalPlan && (
        <PaymentModal
          isOpen={!!modalPlan}
          onClose={() => setModalPlan(null)}
          courseName={modalPlan.name}
          price={modalPlan.price}
        />
      )}
    </section>
  );
}
