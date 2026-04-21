import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { courseId, courseName, sessionTime, meetLink, instructorName } = await req.json();
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "Email not configured" }, { status: 503 });

    // In production: fetch enrolled users from Firestore and email each one
    // For now, return success with the notification data
    const sessionDate = new Date(sessionTime).toLocaleString("en-IN", {
      weekday: "long", day: "numeric", month: "long",
      hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata"
    });

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 24px;background:#060912;color:#f1f5f9">
        <div style="background:linear-gradient(135deg,#dc2626,#b91c1c);padding:20px 24px;border-radius:12px;margin-bottom:24px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <span style="width:10px;height:10px;border-radius:50%;background:#4ade80;display:inline-block;box-shadow:0 0 8px #4ade80"></span>
            <span style="color:#fca5a5;font-size:13px;font-weight:600">LIVE SESSION STARTING SOON</span>
          </div>
          <h1 style="color:#fff;font-size:22px;margin:0">${courseName}</h1>
        </div>
        <p style="color:#94a3b8;font-size:16px;line-height:1.6">Your live session with <strong style="color:#f1f5f9">${instructorName}</strong> starts on:</p>
        <div style="background:#0f1629;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:20px;margin:20px 0;text-align:center">
          <p style="color:#f1f5f9;font-size:20px;font-weight:700;margin:0">${sessionDate} IST</p>
        </div>
        <a href="${meetLink}" style="display:inline-block;padding:14px 28px;background:#dc2626;color:#fff;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin-bottom:16px">
          Join Google Meet Now
        </a>
        <p style="color:#64748b;font-size:13px">Can not attend live? The recording will be available in your Google Classroom within 24 hours.</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "AI Mastery <noreply@aimastery.in>",
        to: ["test@example.com"], // Replace with actual enrolled user emails
        subject: `Live Session Starting Soon: ${courseName}`,
        html,
      }),
    });

    return NextResponse.json({ success: res.ok, sessionDate, meetLink });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
