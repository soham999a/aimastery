import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "AI Mastery Course";
  const instructor = searchParams.get("instructor") ?? "Expert Instructor";
  const price = searchParams.get("price") ?? "2999";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 80px", background: "linear-gradient(135deg, #060912 0%, #0f1629 100%)", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#2563eb,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>A</span>
          </div>
          <span style={{ color: "#60a5fa", fontSize: 18, fontWeight: 700 }}>AI Mastery</span>
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 900, color: "#f1f5f9", lineHeight: 1.1, marginBottom: 20, maxWidth: 900 }}>{title}</h1>
        <p style={{ fontSize: 24, color: "#64748b", marginBottom: 32 }}>by {instructor}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ fontSize: 36, fontWeight: 900, color: "#2563eb" }}>Rs.{parseInt(price).toLocaleString()}</span>
          <span style={{ padding: "8px 20px", borderRadius: 999, background: "rgba(37,99,235,0.2)", border: "1px solid rgba(37,99,235,0.4)", color: "#60a5fa", fontSize: 16, fontWeight: 600 }}>Enroll Now</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
