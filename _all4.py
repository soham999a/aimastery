import os

# ── Admin dashboard ──
os.makedirs("ar-ai-mastery/app/admin", exist_ok=True)
admin_code = '''"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ADMIN_EMAILS = ["admin@aimastery.in", "soham@aimastery.in"];

interface Lead { id: string; name: string; email: string; phone?: string; registeredAt: string; source?: string; }
interface User { id: string; name: string; email: string; createdAt: string; subscriptionTier: string; enrolledCourses: string[]; }

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"overview"|"leads"|"users">("overview");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !ADMIN_EMAILS.includes(user.email ?? ""))) {
      router.replace("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || !ADMIN_EMAILS.includes(user.email ?? "")) return;
    async function fetchData() {
      setFetching(true);
      try {
        const [leadsSnap, usersSnap] = await Promise.all([
          getDocs(query(collection(db, "workshop_leads"), orderBy("registeredAt", "desc"), limit(100))),
          getDocs(query(collection(db, "users"), orderBy("createdAt", "desc"), limit(100))),
        ]);
        setLeads(leadsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Lead)));
        setUsers(usersSnap.docs.map(d => ({ id: d.id, ...d.data() } as User)));
      } catch (e) { console.error(e); }
      finally { setFetching(false); }
    }
    fetchData();
  }, [user]);

  if (loading || fetching) return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid var(--border)", borderTopColor: "var(--brand)", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (!user || !ADMIN_EMAILS.includes(user.email ?? "")) return null;

  const totalRevenue = users.filter(u => u.subscriptionTier !== "free").length * 2499;
  const enrolledCount = users.reduce((s, u) => s + (u.enrolledCourses?.length ?? 0), 0);

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "leads", label: `Workshop Leads (${leads.length})` },
    { id: "users", label: `Users (${users.length})` },
  ] as const;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", padding: "0" }}>
      {/* Header */}
      <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: 13 }}>← Back to site</Link>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--text-h)" }}>Admin Dashboard</h1>
        </div>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{user.email}</span>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 28, borderBottom: "1px solid var(--border)", paddingBottom: 0 }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)} style={{ padding: "10px 18px", border: "none", cursor: "pointer", background: "transparent", color: tab === item.id ? "var(--brand)" : "var(--text-muted)", fontWeight: tab === item.id ? 600 : 400, fontSize: 14, borderBottom: tab === item.id ? "2px solid var(--brand)" : "2px solid transparent", marginBottom: -1, transition: "all 0.15s" }}>
              {item.label}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 32 }}>
              {[
                { label: "Total Users", value: users.length, color: "#2563eb" },
                { label: "Workshop Leads", value: leads.length, color: "#ef4444" },
                { label: "Total Enrollments", value: enrolledCount, color: "#7c3aed" },
                { label: "Est. Revenue", value: `Rs.${totalRevenue.toLocaleString()}`, color: "#10b981" },
              ].map(s => (
                <div key={s.label} style={{ padding: "24px 20px", borderRadius: 16, border: "1px solid var(--border)", background: "var(--bg-card)", textAlign: "center" }}>
                  <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2rem", color: s.color, marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: 20, borderRadius: 14, border: "1px solid var(--border)", background: "var(--bg-card)" }}>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.95rem", color: "var(--text-h)", marginBottom: 12 }}>Recent Workshop Registrations</h3>
              {leads.slice(0, 5).map(l => (
                <div key={l.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--divider)", fontSize: 13 }}>
                  <span style={{ color: "var(--text-h)", fontWeight: 500 }}>{l.name}</span>
                  <span style={{ color: "var(--text-muted)" }}>{l.email}</span>
                  <span style={{ color: "var(--text-faint)" }}>{new Date(l.registeredAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "leads" && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Name","Email","Phone","Registered","Source"].map(h => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: "var(--text-muted)", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map(l => (
                  <tr key={l.id} style={{ borderBottom: "1px solid var(--divider)" }}>
                    <td style={{ padding: "12px", color: "var(--text-h)", fontWeight: 500 }}>{l.name}</td>
                    <td style={{ padding: "12px", color: "var(--text-body)" }}>{l.email}</td>
                    <td style={{ padding: "12px", color: "var(--text-muted)" }}>{l.phone ?? "—"}</td>
                    <td style={{ padding: "12px", color: "var(--text-muted)" }}>{new Date(l.registeredAt).toLocaleDateString()}</td>
                    <td style={{ padding: "12px", color: "var(--text-muted)" }}>{l.source ?? "direct"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "users" && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Name","Email","Plan","Courses","Joined"].map(h => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: "var(--text-muted)", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: "1px solid var(--divider)" }}>
                    <td style={{ padding: "12px", color: "var(--text-h)", fontWeight: 500 }}>{u.name}</td>
                    <td style={{ padding: "12px", color: "var(--text-body)" }}>{u.email}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: u.subscriptionTier === "free" ? "rgba(100,116,139,0.15)" : "rgba(37,99,235,0.15)", color: u.subscriptionTier === "free" ? "#94a3b8" : "#60a5fa", fontWeight: 600, textTransform: "capitalize" }}>{u.subscriptionTier}</span>
                    </td>
                    <td style={{ padding: "12px", color: "var(--text-muted)" }}>{u.enrolledCourses?.length ?? 0}</td>
                    <td style={{ padding: "12px", color: "var(--text-muted)" }}>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
'''
with open("ar-ai-mastery/app/admin/page.tsx", "w", encoding="utf-8") as f:
    f.write(admin_code)
print("admin dashboard done")

# ── Course reviews API ──
os.makedirs("ar-ai-mastery/app/api/reviews", exist_ok=True)
reviews_api = '''import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getDb() {
  if (!getApps().length) {
    const { cert } = require("firebase-admin/app");
    initializeApp({ credential: cert({ projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, clientEmail: process.env.FIREBASE_CLIENT_EMAIL, privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\\\n/g,"\\n") }) });
  }
  return getFirestore();
}

export async function GET(req: NextRequest) {
  const courseId = req.nextUrl.searchParams.get("courseId");
  if (!courseId) return NextResponse.json({ reviews: [] });
  try {
    const db = getDb();
    const snap = await db.collection("reviews").where("courseId","==",courseId).orderBy("createdAt","desc").limit(20).get();
    const reviews = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ reviews });
  } catch { return NextResponse.json({ reviews: [] }); }
}

export async function POST(req: NextRequest) {
  try {
    const { courseId, userId, userName, rating, text } = await req.json();
    if (!courseId || !userId || !rating) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    const db = getDb();
    const ref = await db.collection("reviews").add({ courseId, userId, userName: userName ?? "Anonymous", rating, text: text ?? "", createdAt: new Date().toISOString() });
    return NextResponse.json({ id: ref.id, success: true });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
'''
with open("ar-ai-mastery/app/api/reviews/route.ts", "w", encoding="utf-8") as f:
    f.write(reviews_api)
print("reviews API done")
