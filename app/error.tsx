"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" }}>
      <div>
        <div style={{ fontSize: "4rem", marginBottom: 16 }}>⚠️</div>
        <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "var(--text-h)", marginBottom: 8 }}>Something went wrong</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>{error.message || "An unexpected error occurred."}</p>
        <button onClick={reset} style={{ padding: "12px 24px", borderRadius: 10, background: "var(--brand)", color: "#fff", border: "none", cursor: "pointer", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14 }}>Try Again</button>
      </div>
    </div>
  );
}
