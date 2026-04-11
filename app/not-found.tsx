"use client";
import Link from "next/link";
export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" }}>
      <div>
        <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "8rem", color: "var(--brand)", lineHeight: 1, marginBottom: 8, opacity: 0.3 }}>404</div>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2rem", color: "var(--text-h)", marginBottom: 12 }}>Page not found</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: 32, maxWidth: 400 }}>The page you are looking for does not exist or has been moved.</p>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 10, background: "var(--brand)", color: "#fff", textDecoration: "none", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14 }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
