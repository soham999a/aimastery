"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

function generateReferralCode(uid: string): string {
  return "AIM" + uid.slice(0, 6).toUpperCase();
}

export default function ReferralWidget() {
  const { user } = useAuth();
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    const refCode = generateReferralCode(user.uid);
    setCode(refCode);
    getDoc(doc(db, "users", user.uid)).then(snap => {
      const data = snap.data();
      if (!data?.referralCode) {
        updateDoc(doc(db, "users", user.uid), { referralCode: refCode }).catch(() => {});
      }
      setReferralCount(data?.referralCount ?? 0);
    }).catch(() => {});
  }, [user]);

  if (!user || !code) return null;

  const referralLink = `${typeof window !== "undefined" ? window.location.origin : "https://aimastery.vercel.app"}/signup?ref=${code}`;

  function copy() {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{ padding: 20, borderRadius: 16, border: "1px solid rgba(37,99,235,0.25)", background: "rgba(37,99,235,0.04)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(37,99,235,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        </div>
        <div>
          <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--text-h)", marginBottom: 1 }}>Refer & Earn</h3>
          <p style={{ fontSize: 11, color: "var(--text-muted)" }}>You and your friend both get 20% off</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <input readOnly value={referralLink} style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-input)", color: "var(--text-muted)", fontSize: 11, outline: "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} />
        <button onClick={copy} style={{ padding: "8px 14px", borderRadius: 8, background: copied ? "rgba(74,222,128,0.15)" : "var(--brand)", color: copied ? "#4ade80" : "#fff", border: copied ? "1px solid rgba(74,222,128,0.3)" : "none", cursor: "pointer", fontSize: 12, fontWeight: 600, flexShrink: 0, transition: "all 0.2s" }}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Your code:</span>
        <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 13, color: "var(--brand)", background: "rgba(37,99,235,0.1)", padding: "2px 8px", borderRadius: 6 }}>{code}</span>
        {referralCount > 0 && <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 8 }}>{referralCount} referral{referralCount > 1 ? "s" : ""}</span>}
      </div>
    </div>
  );
}
