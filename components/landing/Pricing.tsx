"use client";

import { useState } from "react";
import Link from "next/link";
import { ALL_COURSES } from "@/lib/courses";
import PaymentModal from "@/components/ui/PaymentModal";

const StarIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const ClockIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const UsersIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const CrownIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><line x1="5" y1="20" x2="19" y2="20"/></svg>;
const XIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

const COURSE_IDS = ["ai-mastery-complete", "data-analytics", "learn-ai-python"];

// School/Workshop enroll modal
function SchoolModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", school: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Save lead to email API
    try {
      await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "contact@yesdo.co.in",
          subject: `School Partnership Enquiry — ${form.school}`,
          type: "contact",
          data: { name: form.name, email: form.email, message: `Phone: ${form.phone}\nSchool/Org: ${form.school}` },
        }),
      });
    } catch { /* fail silently */ }
    setLoading(false);
    setSent(true);
    // Auto-download brochure
    const a = document.createElement("a");
    a.href = "/yesdo-school-brochure.pdf";
    a.download = "YesDo-Edutech-School-Partnership-Brochure.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const inp = { width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg-input)", color: "var(--text-h)", fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div style={{ maxWidth: 480, width: "100%", borderRadius: 24, background: "var(--bg-card)", border: "1px solid var(--border)", padding: "36px 32px", position: "relative" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><XIcon /></button>

        {sent ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "var(--text-h)", marginBottom: 8 }}>
              Your brochure is downloading!
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 20 }}>
              Our team will also reach out within 24 hours. If the download didn't start automatically, click below.
            </p>
            <a
              href="/yesdo-school-brochure.pdf"
              download="YesDo-Edutech-School-Partnership-Brochure.pdf"
              style={{ display: "inline-block", padding: "11px 24px", borderRadius: 10, background: "#b91c1c", color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
            >
              📄 Download Brochure
            </a>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 999, background: "rgba(185,28,28,0.1)", border: "1px solid rgba(185,28,28,0.3)", color: "#f87171", fontSize: 12, fontWeight: 600, marginBottom: 12 }}>🏫 School / Workshop Partnership</div>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "var(--text-h)", marginBottom: 6 }}>Get Our Brochure & Enrol</h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>Fill in your details and the brochure will download automatically. Our team will also reach out within 24 hours.</p>
            </div>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input required placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inp} />
              <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inp} />
              <input required type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inp} />
              <input required placeholder="School / College / Organisation Name" value={form.school} onChange={e => setForm({ ...form, school: e.target.value })} style={inp} />
              <button type="submit" disabled={loading} style={{ padding: "13px", borderRadius: 10, background: "#b91c1c", color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: 4 }}>
                {loading ? "Sending..." : "Get Brochure & Enrol →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Pricing() {
  const [modalPlan, setModalPlan] = useState<{ name: string; price: number } | null>(null);
  const [showSchoolModal, setShowSchoolModal] = useState(false);

  const courses = COURSE_IDS.map((id) => ALL_COURSES.find((c) => c.id === id)!).filter(Boolean);

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
          <p style={{ color: "var(--text-body)", maxWidth: 480, margin: "0 auto", fontSize: "0.95rem" }}>
            Premium quality education at a fraction of market price. Easy EMI from ₹2,000/month. All prices + GST.
          </p>
        </div>

        {/* Course cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {courses.map((course) => (
            <div key={course.id} style={{ display: "flex", flexDirection: "column", borderRadius: 20, overflow: "hidden", border: course.isFlagship ? "2px solid #2563eb" : "1px solid var(--border-card)", background: "var(--bg-card)", position: "relative", boxShadow: course.isFlagship ? "0 0 32px rgba(37,99,235,0.18)" : "none" }}>

              {course.isFlagship && (
                <div style={{ position: "absolute", top: 12, right: 12, zIndex: 2, display: "flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 999, background: "#2563eb", color: "#fff", fontSize: 11, fontWeight: 700, boxShadow: "0 4px 12px rgba(37,99,235,0.4)" }}>
                  ⚡ Best in the Market
                </div>
              )}

              <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", background: `linear-gradient(135deg,${course.gradientFrom},${course.gradientTo})` }}>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 40%,rgba(255,255,255,0.12) 0%,transparent 65%)" }} />
                <span style={{ fontSize: 52, position: "relative", zIndex: 1 }}>{course.emoji}</span>
                {course.tag && (
                  <span style={{ position: "absolute", top: 12, left: 12, fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: "rgba(0,0,0,0.4)", color: "#fff", backdropFilter: "blur(8px)" }}>
                    {course.tag}
                  </span>
                )}
              </div>

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

          {/* School / Workshop card — opens brochure+enroll modal */}
          <div
            onClick={() => setShowSchoolModal(true)}
            style={{ display: "flex", flexDirection: "column", borderRadius: 20, overflow: "hidden", border: "1px solid var(--border-card)", background: "var(--bg-card)", cursor: "pointer" }}
          >
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
              <div style={{ display: "block", textAlign: "center", padding: "11px", borderRadius: 10, border: "1px solid rgba(185,28,28,0.4)", color: "#f87171", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 13 }}>
                Get Brochure & Enrol →
              </div>
            </div>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-faint)", marginTop: 32 }}>
          All plans include a 30-day money-back guarantee. Prices shown are exclusive of GST (18%). EMI available via Razorpay.
        </p>
      </div>

      {modalPlan && (
        <PaymentModal isOpen={!!modalPlan} onClose={() => setModalPlan(null)} courseName={modalPlan.name} price={modalPlan.price} />
      )}
      {showSchoolModal && <SchoolModal onClose={() => setShowSchoolModal(false)} />}
    </section>
  );
}
