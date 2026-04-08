"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, MessageSquare, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react";

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "hello@araimastery.com", href: "mailto:hello@araimastery.com" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: MapPin, label: "Location", value: "Bangalore, India", href: "#" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate send
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16" style={{ background: "#0f1117" }}>
        {/* Header */}
        <div style={{ background: "#0d0f18", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{ border: "1px solid rgba(0,102,255,0.3)", background: "rgba(0,102,255,0.06)", color: "#60a5fa" }}
            >
              <MessageSquare className="w-4 h-4" />
              Get in Touch
            </div>
            <h1
              className="font-bold mb-4"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#f9fafb" }}
            >
              We'd love to <span className="gradient-text-ai">hear from you</span>
            </h1>
            <p style={{ color: "#6b7280", maxWidth: 480, margin: "0 auto", fontSize: "1rem" }}>
              Whether you have a question about courses, pricing, or enterprise plans — our team is ready to help.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-5">
              <h2 className="font-semibold text-lg mb-6" style={{ fontFamily: "Poppins, sans-serif", color: "#f9fafb" }}>
                Contact Information
              </h2>
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 rounded-2xl card-hover"
                  style={{ border: "1px solid rgba(255,255,255,0.08)", background: "#1a1d27" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(0,102,255,0.1)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "#0066ff" }} />
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "#6b7280" }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: "#f9fafb" }}>{value}</p>
                  </div>
                </a>
              ))}

              {/* Enterprise CTA */}
              <div
                className="p-5 rounded-2xl mt-6"
                style={{ background: "linear-gradient(135deg, rgba(0,102,255,0.15), rgba(124,58,237,0.15))", border: "1px solid rgba(0,102,255,0.2)" }}
              >
                <h3 className="font-semibold text-sm mb-2" style={{ fontFamily: "Poppins, sans-serif", color: "#f9fafb" }}>
                  Enterprise Plans
                </h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "#9ca3af" }}>
                  Training 10+ people? Get custom pricing, dedicated support, and a tailored curriculum.
                </p>
                <p className="text-xs font-medium" style={{ color: "#60a5fa" }}>
                  enterprise@araimastery.com
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div
                className="p-8 rounded-2xl"
                style={{ border: "1px solid rgba(255,255,255,0.08)", background: "#1a1d27" }}
              >
                {sent ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "#10b981" }} />
                    <h3 className="font-bold text-xl mb-2" style={{ fontFamily: "Poppins, sans-serif", color: "#f9fafb" }}>
                      Message sent!
                    </h3>
                    <p style={{ color: "#6b7280" }}>We'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                      className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold"
                      style={{ background: "#0066ff", color: "#fff" }}
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { key: "name", label: "Full Name", placeholder: "Your name", type: "text" },
                        { key: "email", label: "Email", placeholder: "you@example.com", type: "email" },
                      ].map(({ key, label, placeholder, type }) => (
                        <div key={key}>
                          <label className="block text-sm font-medium mb-1.5" style={{ color: "#d1d5db" }}>{label}</label>
                          <input
                            type={type}
                            required
                            placeholder={placeholder}
                            value={form[key as keyof typeof form]}
                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f9fafb" }}
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: "#d1d5db" }}>Subject</label>
                      <input
                        type="text"
                        required
                        placeholder="How can we help?"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f9fafb" }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: "#d1d5db" }}>Message</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tell us more..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f9fafb" }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        background: "#0066ff",
                        boxShadow: "0 8px 24px rgba(0,102,255,0.3)",
                        opacity: loading ? 0.7 : 1,
                      }}
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
