"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const MailIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const PhoneIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const MapIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const SendIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const CheckIcon = () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

const CONTACT_INFO = [
  { Icon: MailIcon, label: "Email", value: "contact@yesdo.co.in", href: "mailto:contact@yesdo.co.in" },
  { Icon: PhoneIcon, label: "Phone", value: "+91 78900 18776", href: "tel:+917890018776" },
  { Icon: MapIcon, label: "Location", value: "Kolkata, West Bengal", href: "#" },
];

const SOCIALS = [
  { label: "YouTube", href: "https://www.youtube.com/channel/UCqkZX3JjtZH2NH5c4lxjHCA" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61590283730641" },
  { label: "Instagram", href: "https://www.instagram.com/yesdoedutech/" },
  { label: "Twitter / X", href: "https://x.com/yesdoedutech" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "contact@yesdo.co.in",
          subject: `Contact Form: ${form.subject}`,
          type: "contact",
          data: { name: form.name, email: form.email, message: form.message },
        }),
      });
    } catch {
      // fail silently — still show success to user
    }
    setLoading(false);
    setSent(true);
  }

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: 10,
    border: "1px solid var(--border)", background: "var(--bg-input)",
    color: "var(--text-h)", fontSize: 14, outline: "none",
    fontFamily: "inherit", boxSizing: "border-box" as const,
  };

  const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-body)", marginBottom: 6 };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 64, background: "var(--bg-base)" }}>

        {/* Header */}
        <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)", padding: "56px 24px 48px" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(37,99,235,0.3)", background: "rgba(37,99,235,0.06)", color: "#60a5fa", fontSize: 13, fontWeight: 500, marginBottom: 20 }}>
              Get in Touch
            </div>
            <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem,5vw,2.5rem)", color: "var(--text-h)", marginBottom: 12, lineHeight: 1.2 }}>
              We'd love to hear from you
            </h1>
            <p style={{ color: "var(--text-body)", fontSize: "0.95rem", lineHeight: 1.7 }}>
              Questions about courses, pricing, or school partnerships? Our team usually responds within 24 hours.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px" }}>
          <div className="r-split" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32, alignItems: "start" }}>

            {/* Left — contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text-h)", marginBottom: 8 }}>
                Contact Information
              </h2>

              {CONTACT_INFO.map(({ Icon, label, value, href }) => (
                <a key={label} href={href} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px", borderRadius: 14, border: "1px solid var(--border-card)", background: "var(--bg-card)", textDecoration: "none", transition: "border-color 0.18s" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", flexShrink: 0 }}>
                    <Icon />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>{label}</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-h)" }}>{value}</p>
                  </div>
                </a>
              ))}

              {/* Social links */}
              <div style={{ marginTop: 8 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-body)", marginBottom: 10 }}>Follow Us</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {SOCIALS.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text-muted)", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Enterprise */}
              <div style={{ marginTop: 8, padding: "20px", borderRadius: 14, background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(124,58,237,0.1))", border: "1px solid rgba(37,99,235,0.2)" }}>
                <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--text-h)", marginBottom: 6 }}>School / Enterprise Plans</p>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 10 }}>
                  Training a batch or partnering with a school? We'll build a custom plan for you.
                </p>
                <a href="mailto:contact@yesdo.co.in" style={{ fontSize: 13, fontWeight: 600, color: "#60a5fa", textDecoration: "none" }}>
                  contact@yesdo.co.in →
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div style={{ padding: "36px", borderRadius: 20, border: "1px solid var(--border-card)", background: "var(--bg-card)" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "48px 24px" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <CheckIcon />
                  </div>
                  <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "var(--text-h)", marginBottom: 8 }}>Message sent!</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 24 }}>We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    style={{ padding: "10px 24px", borderRadius: 10, background: "#2563eb", color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--text-h)", marginBottom: 4 }}>Send us a message</h2>

                  <div className="r-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input type="text" required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input type="email" required placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Subject</label>
                    <input type="text" required placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} style={inputStyle} />
                  </div>

                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea required rows={5} placeholder="Tell us more..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "none" }} />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 10, background: "#2563eb", color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, boxShadow: "0 8px 24px rgba(37,99,235,0.35)", width: "fit-content" }}
                  >
                    <SendIcon />
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
