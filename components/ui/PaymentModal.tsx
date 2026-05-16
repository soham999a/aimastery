"use client";

import { useEffect } from "react";
import Image from "next/image";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  price: number;
}

const WHATSAPP_NUMBER = "924287465";

export default function PaymentModal({ isOpen, onClose, courseName, price }: PaymentModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const whatsappMsg = encodeURIComponent(
    `Hi! I've completed the payment of ₹${price.toLocaleString()} for "${courseName}". Please find my payment screenshot attached. 📸`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

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

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            {/* PhonePe logo pill */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 999, padding: "6px 14px",
              backdropFilter: "blur(4px)",
            }}>
              <svg width="18" height="18" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#fff"/>
                <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#5b21b6">₱</text>
              </svg>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>PhonePe</span>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: "3px 10px",
              borderRadius: 999, background: "rgba(255,255,255,0.2)",
              color: "#fff", letterSpacing: "0.05em",
            }}>ACCEPTED HERE</span>
          </div>

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

        {/* Body */}
        <div style={{ padding: "24px" }}>

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
            {/* Glow */}
            <div style={{
              position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)",
              width: 200, height: 200,
              background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 14, fontWeight: 500 }}>
              Scan & Pay Using PhonePe App
            </p>

            {/* QR Image */}
            <div style={{
              borderRadius: 12, overflow: "hidden",
              border: "3px solid rgba(124,58,237,0.25)",
              boxShadow: "0 8px 32px rgba(124,58,237,0.2)",
              background: "#fff",
              padding: 8,
            }}>
              <Image
                src="/phonepe-qr.png"
                alt="PhonePe QR Code - Scan to pay"
                width={200}
                height={200}
                style={{ display: "block", borderRadius: 8 }}
              />
            </div>

            <div style={{ marginTop: 14, textAlign: "center" }}>
              <p style={{
                fontFamily: "Poppins, sans-serif", fontWeight: 700,
                fontSize: "0.95rem", color: "var(--text-h)", letterSpacing: "0.05em",
              }}>
                SOMNATH BANERJEE
              </p>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                UPI · PhonePe
              </p>
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
            {/* WhatsApp icon */}
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
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}
