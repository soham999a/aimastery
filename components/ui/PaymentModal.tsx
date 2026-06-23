"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { initiateRazorpayPayment, type RazorpayPaymentResponse } from "@/lib/razorpay";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  price: number;
  courseId?: string;
}

const WHATSAPP_NUMBER = "924287465";

export default function PaymentModal({ isOpen, onClose, courseName, price, courseId }: PaymentModalProps) {
  const { user } = useAuth();
  const [tab, setTab] = useState<"qr" | "razorpay">("qr");
  const [rzpState, setRzpState] = useState<"idle" | "loading" | "processing" | "success" | "error">("idle");
  const [rzpError, setRzpError] = useState("");

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setTab("qr");
      setRzpState("idle");
      setRzpError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const whatsappMsg = encodeURIComponent(
    `Hi! I've completed the payment of ₹${price.toLocaleString()} for "${courseName}". Please find my payment screenshot attached.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  async function handleRazorpayPayment() {
    if (!user) {
      setRzpError("Please sign in to enroll. Close this modal and log in first.");
      setRzpState("error");
      return;
    }
    if (!courseId) {
      setRzpError("Course ID missing. Please contact support.");
      setRzpState("error");
      return;
    }
    setRzpState("loading");
    setRzpError("");

    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price,
          currency: "INR",
          courseId,
          courseName,
          userId: user.uid,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create order");
      }

      const order = await res.json();
      setRzpState("processing");

      await initiateRazorpayPayment(
        order,
        { name: user.displayName || "Student", email: user.email || "" },
        async (response: RazorpayPaymentResponse) => {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId,
              userId: user.uid,
            }),
          });

          const data = await verifyRes.json();

          if (!data.verified) {
            setRzpError("Payment verification failed. Please contact support.");
            setRzpState("error");
            return;
          }

          // Enroll user
          if (courseId) {
            await updateDoc(doc(db, "users", user.uid), {
              enrolledCourses: arrayUnion(courseId),
            });
          }

          // Send enrollment confirmation email
          fetch("/api/email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: user.email,
              subject: `Enrolled: ${courseName}`,
              type: "enrollment",
              data: { courseName, name: user.displayName },
            }),
          }).catch(() => {});

          setRzpState("success");
        }
      );
    } catch (err: any) {
      setRzpError(err.message || "Something went wrong. Please try again.");
      setRzpState("error");
    }
  }

  const tabStyle = (t: "qr" | "razorpay") => ({
    flex: 1,
    padding: "12px 16px",
    border: "none",
    background: tab === t ? "var(--bg-card)" : "transparent",
    color: tab === t ? "var(--text-h)" : "var(--text-muted)",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    borderRadius: 12,
    transition: "all 0.15s",
  });

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 460,
          borderRadius: 24,
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
          overflow: "hidden",
          animation: "slideUp 0.25s ease",
        }}
      >
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #4f46e5 100%)",
          padding: "24px 24px 20px",
          position: "relative",
        }}>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute", top: 16, right: 16,
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 18, lineHeight: 1,
            }}
          >
            ×
          </button>

          <h2 style={{
            fontFamily: "Poppins, sans-serif", fontWeight: 800,
            fontSize: "1.25rem", color: "#fff", marginBottom: 4,
          }}>
            Complete Your Payment
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
            {courseName} · <span style={{ fontWeight: 700, color: "#fff" }}>₹{price.toLocaleString()}</span>
          </p>
        </div>

        {/* Tabs */}
        <div style={{ padding: "16px 16px 0", display: "flex", gap: 8 }}>
          <button onClick={() => setTab("qr")} style={tabStyle("qr")}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
              UPI / QR
            </span>
          </button>
          <button onClick={() => setTab("razorpay")} style={tabStyle("razorpay")}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              Card / Net Banking / UPI
            </span>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          {tab === "qr" ? (
            <>
              {/* Steps */}
              <div style={{ display: "flex", gap: 0, marginBottom: 20 }}>
                {[
                  { n: "1", label: "Scan & Pay" },
                  { n: "2", label: "Screenshot" },
                  { n: "3", label: "Send on WhatsApp" },
                ].map((step, i) => (
                  <div key={step.n} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                    {i < 2 && (
                      <div style={{
                        position: "absolute", top: 14, left: "50%", width: "100%",
                        height: 2, background: "linear-gradient(90deg, #7c3aed, #4f46e5)",
                        opacity: 0.3,
                      }} />
                    )}
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                      color: "#fff", fontSize: 12, fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 6, position: "relative", zIndex: 1,
                      boxShadow: "0 4px 12px rgba(124,58,237,0.4)",
                    }}>
                      {step.n}
                    </div>
                    <span style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center", fontWeight: 500 }}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* QR Card */}
              <div style={{
                borderRadius: 16,
                border: "2px solid rgba(124,58,237,0.2)",
                background: "rgba(124,58,237,0.04)",
                padding: "20px",
                display: "flex", flexDirection: "column", alignItems: "center",
                marginBottom: 20,
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)",
                  width: 200, height: 200,
                  background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />

                <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 14, fontWeight: 500 }}>
                  Scan & Pay Using Any UPI App
                </p>

                <div style={{
                  borderRadius: 12, overflow: "hidden",
                  border: "3px solid rgba(124,58,237,0.25)",
                  boxShadow: "0 8px 32px rgba(124,58,237,0.2)",
                  background: "#fff",
                  padding: 8,
                }}>
                  <img
                    src="/Yesdo%20Qr.png"
                    alt="QR Code - Scan to pay"
                    width={200}
                    height={200}
                    style={{ display: "block", borderRadius: 8, width: 200, height: 200, objectFit: "contain" }}
                  />
                </div>
              </div>

              {/* Amount reminder */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 16px", borderRadius: 12,
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
                marginBottom: 16,
              }}>
                <span style={{ fontSize: 13, color: "var(--text-body)" }}>Amount to pay</span>
                <span style={{
                  fontFamily: "Poppins, sans-serif", fontWeight: 800,
                  fontSize: "1.1rem", color: "#10b981",
                }}>
                  ₹{price.toLocaleString()}
                </span>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  width: "100%", padding: "14px",
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #25d366, #128c7e)",
                  color: "#fff", textDecoration: "none",
                  fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14,
                  boxShadow: "0 8px 24px rgba(37,211,102,0.35)",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 32px rgba(37,211,102,0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(37,211,102,0.35)";
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Send Screenshot on WhatsApp
              </a>

              <p style={{
                textAlign: "center", fontSize: 11,
                color: "var(--text-faint)", marginTop: 12,
              }}>
                After payment, send your screenshot to activate your course access within 2 hours.
              </p>
            </>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16,
                  background: "linear-gradient(135deg, #0d9488, #2563eb)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff",
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                </div>

                <p style={{ fontSize: 14, color: "var(--text-muted)", textAlign: "center", lineHeight: 1.6 }}>
                  Pay securely with Razorpay. All major payment methods accepted — Credit/Debit Cards, Net Banking, UPI, and Wallets.
                </p>
              </div>

              {/* Amount reminder */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 16px", borderRadius: 12,
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
                margin: "20px 0",
              }}>
                <span style={{ fontSize: 13, color: "var(--text-body)" }}>Amount to pay</span>
                <span style={{
                  fontFamily: "Poppins, sans-serif", fontWeight: 800,
                  fontSize: "1.1rem", color: "#10b981",
                }}>
                  ₹{price.toLocaleString()}
                </span>
              </div>

              {rzpState === "success" ? (
                <div style={{ textAlign: "center", padding: "12px 0" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "rgba(16,185,129,0.1)",
                    border: "2px solid rgba(16,185,129,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 12px",
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 16, color: "var(--text-h)", marginBottom: 4 }}>
                    Payment Successful!
                  </p>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
                    You are now enrolled. Start learning right away.
                  </p>
                  <button
                    onClick={onClose}
                    style={{
                      padding: "11px 28px", borderRadius: 10,
                      background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                      color: "#fff", border: "none", cursor: "pointer",
                      fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 13,
                    }}
                  >
                    Continue
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleRazorpayPayment}
                    disabled={rzpState === "loading" || rzpState === "processing" || !courseId || !user}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      width: "100%", padding: "14px",
                      borderRadius: 12,
                      background: rzpState === "loading" || rzpState === "processing" || !courseId || !user
                        ? "var(--border)" : "linear-gradient(135deg, #0d9488, #2563eb)",
                      color: "#fff", border: "none", cursor: rzpState === "loading" || rzpState === "processing" || !courseId || !user ? "not-allowed" : "pointer",
                      fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14,
                      boxShadow: rzpState === "loading" || rzpState === "processing" || !courseId || !user
                        ? "none" : "0 8px 24px rgba(13,148,136,0.35)",
                      transition: "opacity 0.15s",
                      opacity: rzpState === "loading" || rzpState === "processing" || !courseId || !user ? 0.6 : 1,
                    }}
                  >
                    {rzpState === "loading" && (
                      <span style={{ display: "inline-block", width: 18, height: 18, borderRadius: "50%", border: "2px solid #fff", borderTopColor: "transparent", animation: "spin 0.6s linear infinite" }} />
                    )}
                    {rzpState === "processing" && (
                      <span style={{ display: "inline-block", width: 18, height: 18, borderRadius: "50%", border: "2px solid #fff", borderTopColor: "transparent", animation: "spin 0.6s linear infinite" }} />
                    )}
                    {rzpState === "loading" ? "Creating Order..." : rzpState === "processing" ? "Processing..." : "Pay with Razorpay"}
                  </button>

                  {rzpError && (
                    <p style={{
                      textAlign: "center", fontSize: 12, color: "#ef4444",
                      marginTop: 12, padding: "8px 12px", borderRadius: 8,
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.2)",
                    }}>
                      {rzpError}
                    </p>
                  )}

                  <p style={{
                    textAlign: "center", fontSize: 11,
                    color: "var(--text-faint)", marginTop: 12,
                  }}>
                    Secured by Razorpay · Your payment info is encrypted
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>
    </div>
  );
}
