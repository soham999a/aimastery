import { NextRequest, NextResponse } from "next/server";

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
