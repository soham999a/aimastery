import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { to, subject, type, data } = await req.json();
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "Email not configured" }, { status: 503 });

    const templates: Record<string, string> = {
      welcome: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 24px;background:#060912;color:#f1f5f9">
        <h1 style="color:#2563eb;font-size:28px;margin-bottom:8px">Welcome to AI Mastery!</h1>
        <p style="color:#94a3b8;font-size:16px;line-height:1.6">Hi ${data?.name ?? "there"},</p>
        <p style="color:#94a3b8;font-size:16px;line-height:1.6">Your account is ready. Start exploring 200+ courses in AI, ML, and more.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/courses" style="display:inline-block;margin-top:24px;padding:12px 28px;background:#2563eb;color:#fff;border-radius:10px;text-decoration:none;font-weight:700">Browse Courses</a>
      </div>`,
      enrollment: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 24px;background:#060912;color:#f1f5f9">
        <h1 style="color:#4ade80;font-size:28px;margin-bottom:8px">Enrollment Confirmed!</h1>
        <p style="color:#94a3b8;font-size:16px;line-height:1.6">You are now enrolled in <strong style="color:#f1f5f9">${data?.courseName}</strong>.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display:inline-block;margin-top:24px;padding:12px 28px;background:#2563eb;color:#fff;border-radius:10px;text-decoration:none;font-weight:700">Go to Dashboard</a>
      </div>`,
      workshop: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 24px;background:#060912;color:#f1f5f9">
        <h1 style="color:#ef4444;font-size:28px;margin-bottom:8px">You are Registered!</h1>
        <p style="color:#94a3b8;font-size:16px;line-height:1.6">Hi ${data?.name ?? "there"}, your spot for the FREE AI Workshop is confirmed.</p>
        <p style="color:#94a3b8;font-size:16px;line-height:1.6">We will send you the workshop link 30 minutes before it starts.</p>
      </div>`,
    };

    const html = templates[type] ?? templates.welcome;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: "AI Mastery <noreply@aimastery.in>", to, subject, html }),
    });

    if (!res.ok) throw new Error(await res.text());
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
