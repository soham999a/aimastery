"use client";

import { useState } from "react";
import Link from "next/link";
import { ALL_COURSES } from "@/lib/courses";
import PaymentModal from "@/components/ui/PaymentModal";

const StarIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const ClockIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const UsersIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const CrownIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><line x1="5" y1="20" x2="19" y2="20"/></svg>;
const SchoolIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const ZapIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;

type Audience = "students" | "professionals";

const STUDENT_IDS = ["ai-mastery-complete", "data-analytics", "learn-ai-python"];
const PRO_IDS = ["ai-mastery-complete", "python-fullstack", "microsoft-certification", "alteryx-certification"];

export default function Pricing() {
  const [audience, setAudience] = useState<Audience>("students");
  const [modalPlan, setModalPlan] = useState<{ name: string; price: number } | null>(null);

  const ids = audience === "students" ? STUDENT_IDS : PRO_IDS;
  const courses = ids.map((id) => ALL_COURSES.find((c) => c.id === id)!).filter(Boolean);

  return (
    <section id="pricing" style={{ background: "var(--bg-surface)", padding: "96px 0" }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 999, border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.06)", color: "#a78bfa", fontSize: 13, fontWeight: 500, marginBottom: 16 }}>
            <CrownIcon /> Pricing Plans
          </div>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2.25rem", fontWeight: 800, color: "var(--text-h)", marginBottom: 12 }}>
            Invest in your <span style={{ background: "linear-gradient(135deg,#7c3aed,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>future</span>
          </h2>
          <p style={{ color: "var(--text-body)", maxWidth: 480, margin: "0 auto 32px", fontSize: "0.95rem" }}>
            Premium quality education at a fraction of market price. Easy EMI from ₹2,000/month. All prices + GST.
          </p>

          {/* Students / Professionals toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: 5, borderRadius: 12, background: "var(--bg-input)", border: "1px solid var(--border)" }}>
            {([
              { key: "students" as Audience, label: "Students", Icon: SchoolIcon },
              { key: "professionals" as Audience, label: "Professionals", Icon: ZapIcon },
            ]).map(({ key, label, Icon }) => {
              const active = audience === key;
              return (
                <button key={key} onClick={() => setAudience(key)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 20px", borderRadius: 9, fontSize: 14, fontWeight: 600, background: active ? "var(--bg-card)" : "transparent", color: active ? "var(--text-h)" : "var(--text-muted)", border: "none", cursor: "pointer", boxShadow: active ? "0 1px 6px rgba(0,0,0,0.15)" : "none", transition: "all 0.2s" }}>
                  <Icon /> {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Course cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {courses.map((course) => (
            <div key={course.id} style={{ display: "flex", flexDirection: "column", borderRadius: 20, overflow: "hidden", border: course.isFlagship ? "2px solid #2563eb" : "1px solid var(--border-card)", background: "var(--bg-card)", position: "relative", boxShadow: course.isFlagship ? "0 0 32px rgba(37,99,235,0.18)" : "none" }}>

              {/* Flagship badge */}
              {course.isFlagship && (
                <div style={{ position: "absolute", top: 12, right: 12, zIndex: 2, display: "flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 999, background: "#2563eb", color: "#fff", fontSize: 11, fontWeight: 700, boxShadow: "0 4px 12px rgba(37,99,235,0.4)" }}>
                  ⚡ Most Popular
                </div>
              )}

              {/* Thumbnail */}
              <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", background: `linear-gradient(135deg,${course.gradientFrom},${course.gradientTo})` }}>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 40%,rgba(255,255,255,0.12) 0%,transparent 65%)" }} />
                <span style={{ fontSize: 52, position: "relative", zIndex: 1 }}>{course.emoji}</span>
                {course.tag && (
                  <span style={{ position: "absolute", top: 12, left: 12, fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: "rgba(0,0,0,0.4)", color: "#fff", backdropFilter: "blur(8px)" }}>
                    {course.tag}
                  </span>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "rgba(37,99,235,0.1)", color: "#2563eb", border: "1px solid rgba(37,99,235,0.2)" }}>{course.level}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "rgba(124,58,237,0.1)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.2)" }}>{course.category}</span>
                </div>

                <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--text-h)", marginBottom: 4, lineHeight: 1.4 }}>{course.title}</h3>
                <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>{course.instructor}</p>

                <div style={{ display: "flex", gap: 14, fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><StarIcon /><span style={{ color: "var(--text-body)", fontWeight: 600 }}>{course.rating}</span></span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><ClockIcon />{course.duration}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><UsersIcon />{course.students.toLocaleString()}</span>
                </div>

                {/* Price + EMI */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "var(--text-h)" }}>₹{course.price.toLocaleString()}</span>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>+ GST</span>
                    {course.originalPrice && (
                      <span style={{ fontSize: 12, color: "var(--text-faint)", textDecoration: "line-through" }}>₹{course.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                    or ₹{Math.ceil(course.price / 5).toLocaleString()}/mo × 5 EMI
                  </p>
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                  <button
                    onClick={() => setModalPlan({ name: course.title, price: course.price })}
                    style={{ flex: 1, padding: "11px", borderRadius: 10, background: course.isFlagship ? "#2563eb" : "transparent", color: course.isFlagship ? "#fff" : "var(--text-body)", border: course.isFlagship ? "none" : "1px solid var(--border)", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer", boxShadow: course.isFlagship ? "0 4px 14px rgba(37,99,235,0.35)" : "none" }}
                  >
                    Enroll Now
                  </button>
                  <Link href={`/courses/${course.id}`} style={{ padding: "11px 14px", borderRadius: 10, border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* School / Workshop card */}
          <div style={{ display: "flex", flexDirection: "column", borderRadius: 20, overflow: "hidden", border: "1px solid var(--border-card)", background: "var(--bg-card)" }}>
            <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#7f1d1d,#b91c1c)", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 40%,rgba(255,255,255,0.1) 0%,transparent 65%)" }} />
              <span style={{ fontSize: 52, position: "relative", zIndex: 1 }}>🏫</span>
              <span style={{ position: "absolute", top: 12, left: 12, fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: "rgba(0,0,0,0.4)", color: "#fca5a5", backdropFilter: "blur(8px)" }}>Partnership</span>
            </div>
            <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--text-h)", marginBottom: 4 }}>School / Workshop</h3>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>YesDo Edutech Faculty</p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 7, marginBottom: 16, flex: 1 }}>
                {["Custom batch scheduling", "Zero infrastructure needed", "Expert instructors provided", "After-school / weekend batches"].map((f) => (
                  <li key={f} style={{ fontSize: 12, color: "var(--text-body)", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: "#f87171", fontSize: 10 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "var(--text-h)" }}>Custom</span>
                <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Special introductory rates</p>
              </div>
              <Link href="/contact" style={{ display: "block", textAlign: "center", padding: "11px", borderRadius: 10, border: "1px solid rgba(185,28,28,0.4)", color: "#f87171", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                Partner With Us
              </Link>
            </div>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-faint)", marginTop: 32 }}>
          All plans include a 30-day money-back guarantee. Prices shown are exclusive of GST (18%). EMI available via Razorpay.
        </p>
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
