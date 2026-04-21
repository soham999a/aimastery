import os

# Replace the admin API with a client-side setup page
os.makedirs("ar-ai-mastery/app/setup-demo", exist_ok=True)

setup_page = '''"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Link from "next/link";

const DEMO_EMAIL = "demo@aimastery.in";
const DEMO_PASSWORD = "Demo@2025";
const ALL_COURSES = ["ar-fundamentals","ai-ml-bootcamp","generative-ai","unity-ar","computer-vision","webar-dev"];

export default function SetupDemoPage() {
  const [status, setStatus] = useState<"idle"|"running"|"done"|"error">("idle");
  const [message, setMessage] = useState("");

  async function setup() {
    setStatus("running");
    setMessage("Creating demo account...");
    try {
      let uid: string;

      // Try to sign in first (account might already exist)
      try {
        const cred = await signInWithEmailAndPassword(auth, DEMO_EMAIL, DEMO_PASSWORD);
        uid = cred.user.uid;
        setMessage("Demo account exists, updating Firestore...");
      } catch {
        // Create new account
        setMessage("Creating new demo user...");
        const cred = await createUserWithEmailAndPassword(auth, DEMO_EMAIL, DEMO_PASSWORD);
        await updateProfile(cred.user, { displayName: "Demo User" });
        uid = cred.user.uid;
      }

      // Write full demo data to Firestore
      setMessage("Setting up demo data...");
      await setDoc(doc(db, "users", uid), {
        uid,
        name: "Demo User",
        email: DEMO_EMAIL,
        createdAt: new Date().toISOString(),
        enrolledCourses: ALL_COURSES,
        subscriptionTier: "pro",
        referralCode: "AIMDEMO",
        referralCount: 12,
        isDemo: true,
        progress: {
          "ar-fundamentals": { completed: ["0-0","0-1","0-2","1-0","1-1","1-2","2-0","2-1","2-2"], lastLesson: "2-2" },
          "ai-ml-bootcamp": { completed: ["0-0","0-1","0-2","0-3","1-0","1-1","1-2"], lastLesson: "1-2" },
          "generative-ai": { completed: ["0-0","0-1","0-2","0-3"], lastLesson: "0-3" },
          "unity-ar": { completed: ["0-0","0-1"], lastLesson: "0-1" },
          "computer-vision": { completed: ["0-0"], lastLesson: "0-0" },
          "webar-dev": { completed: [], lastLesson: null },
        },
      }, { merge: true });

      setStatus("done");
      setMessage("Demo account ready!");
    } catch (e: any) {
      setStatus("error");
      setMessage(e.message ?? "Setup failed");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 480, width: "100%", padding: 40, borderRadius: 24, border: "1px solid var(--border)", background: "var(--bg-card)", textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        </div>

        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "var(--text-h)", marginBottom: 8 }}>
          Setup Demo Account
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>
          This creates a demo account with full access to all courses, classroom, and dashboard features.
        </p>

        {status === "idle" && (
          <button onClick={setup} style={{ width: "100%", padding: "14px", borderRadius: 12, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 15, boxShadow: "0 8px 24px rgba(37,99,235,0.35)" }}>
            Create Demo Account
          </button>
        )}

        {status === "running" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid var(--border)", borderTopColor: "var(--brand)", animation: "spin 0.8s linear infinite" }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            <p style={{ color: "var(--text-muted)", fontSize: 14 }}>{message}</p>
          </div>
        )}

        {status === "done" && (
          <div>
            <div style={{ padding: 20, borderRadius: 14, border: "1px solid rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.06)", marginBottom: 20 }}>
              <p style={{ color: "#4ade80", fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Demo account ready!</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--text-muted)" }}>Email</span>
                  <span style={{ fontFamily: "monospace", color: "var(--text-h)", fontWeight: 600 }}>{DEMO_EMAIL}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--text-muted)" }}>Password</span>
                  <span style={{ fontFamily: "monospace", color: "var(--text-h)", fontWeight: 600 }}>{DEMO_PASSWORD}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--text-muted)" }}>Plan</span>
                  <span style={{ color: "#60a5fa", fontWeight: 600 }}>Pro (all courses)</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Link href="/login" style={{ flex: 1, padding: "12px", borderRadius: 10, background: "#2563eb", color: "#fff", textDecoration: "none", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, textAlign: "center", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}>
                Go to Login
              </Link>
              <Link href="/dashboard" style={{ flex: 1, padding: "12px", borderRadius: 10, border: "1px solid var(--border)", color: "var(--text-body)", textDecoration: "none", fontSize: 14, textAlign: "center" }}>
                View Dashboard
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div>
            <div style={{ padding: 16, borderRadius: 12, border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.06)", marginBottom: 16 }}>
              <p style={{ color: "#f87171", fontSize: 13 }}>{message}</p>
            </div>
            <button onClick={() => setStatus("idle")} style={{ padding: "10px 24px", borderRadius: 10, background: "var(--brand)", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
              Try Again
            </button>
          </div>
        )}

        <p style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 20 }}>
          This page is for setup only. Remove it before going to production.
        </p>
      </div>
    </div>
  );
}
'''
with open("ar-ai-mastery/app/setup-demo/page.tsx", "w", encoding="utf-8") as f:
    f.write(setup_page)
print("setup demo page done")

# Also update the API route to be simpler (no firebase-admin)
simple_api = '''import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    email: "demo@aimastery.in",
    password: "Demo@2025",
    setup_url: "/setup-demo",
    note: "Visit /setup-demo to create the demo account via browser",
  });
}

export async function POST() {
  return NextResponse.json({
    message: "Please visit /setup-demo in your browser to create the demo account",
    setup_url: "/setup-demo",
  });
}
'''
with open("ar-ai-mastery/app/api/setup-demo/route.ts", "w", encoding="utf-8") as f:
    f.write(simple_api)
print("api route simplified")
