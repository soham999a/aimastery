import os

# ── 1. Subscription billing API ──
os.makedirs("ar-ai-mastery/app/api/subscription", exist_ok=True)
sub_api = '''import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) return NextResponse.json({ error: "Razorpay not configured" }, { status: 503 });

    const Razorpay = (await import("razorpay")).default;
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const { planId, userId, userEmail, userName } = await req.json();

    // Plan IDs - create these in Razorpay dashboard
    const PLAN_IDS: Record<string, string> = {
      basic_monthly: process.env.RAZORPAY_PLAN_BASIC_MONTHLY ?? "plan_basic_monthly",
      pro_monthly: process.env.RAZORPAY_PLAN_PRO_MONTHLY ?? "plan_pro_monthly",
      premium_monthly: process.env.RAZORPAY_PLAN_PREMIUM_MONTHLY ?? "plan_premium_monthly",
    };

    const subscription = await razorpay.subscriptions.create({
      plan_id: PLAN_IDS[planId] ?? planId,
      customer_notify: 1,
      quantity: 1,
      total_count: 12,
      notes: { userId, userEmail, userName },
    });

    return NextResponse.json({ subscriptionId: subscription.id, status: subscription.status });
  } catch (e: any) {
    console.error("Subscription error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
'''
with open("ar-ai-mastery/app/api/subscription/route.ts", "w", encoding="utf-8") as f:
    f.write(sub_api)
print("subscription API done")

# ── 2. Live session notification API ──
os.makedirs("ar-ai-mastery/app/api/notify-session", exist_ok=True)
notify_api = '''import { NextRequest, NextResponse } from "next/server";

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
'''
with open("ar-ai-mastery/app/api/notify-session/route.ts", "w", encoding="utf-8") as f:
    f.write(notify_api)
print("notify session API done")

# ── 3. Coupon validation API ──
os.makedirs("ar-ai-mastery/app/api/coupon", exist_ok=True)
coupon_api = '''import { NextRequest, NextResponse } from "next/server";

// Hardcoded coupons - move to Firestore for production
const COUPONS: Record<string, { discount: number; type: "percent" | "fixed"; maxUses: number; description: string }> = {
  "AIMASTERY20": { discount: 20, type: "percent", maxUses: 1000, description: "20% off for new users" },
  "LAUNCH50": { discount: 50, type: "percent", maxUses: 100, description: "50% launch discount" },
  "FLAT500": { discount: 500, type: "fixed", maxUses: 500, description: "Rs.500 off" },
  "STUDENT30": { discount: 30, type: "percent", maxUses: 2000, description: "30% student discount" },
};

export async function POST(req: NextRequest) {
  try {
    const { code, price } = await req.json();
    const coupon = COUPONS[code?.toUpperCase()];
    if (!coupon) return NextResponse.json({ valid: false, error: "Invalid coupon code" });

    const discountAmount = coupon.type === "percent"
      ? Math.round(price * coupon.discount / 100)
      : Math.min(coupon.discount, price);

    const finalPrice = price - discountAmount;

    return NextResponse.json({
      valid: true,
      code: code.toUpperCase(),
      discount: coupon.discount,
      type: coupon.type,
      discountAmount,
      finalPrice,
      description: coupon.description,
    });
  } catch (e: any) {
    return NextResponse.json({ valid: false, error: e.message }, { status: 500 });
  }
}
'''
with open("ar-ai-mastery/app/api/coupon/route.ts", "w", encoding="utf-8") as f:
    f.write(coupon_api)
print("coupon API done")

# ── 4. PWA manifest ──
manifest = '''{
  "name": "AI Mastery",
  "short_name": "AI Mastery",
  "description": "India's Premier AI & Tech Education Platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#060912",
  "theme_color": "#2563eb",
  "orientation": "portrait",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "categories": ["education", "productivity"],
  "lang": "en-IN"
}
'''
with open("ar-ai-mastery/public/manifest.json", "w", encoding="utf-8") as f:
    f.write(manifest)
print("PWA manifest done")

print("all APIs done")
