import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb, adminInitialized } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 503 });
    }

    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);
    const eventName = event.event;
    const payload = event.payload;

    if (eventName === "payment.captured" || eventName === "payment.paid") {
      const payment = payload.payment.entity;
      const notes = payment.notes || {};
      const courseId = notes.courseId;
      const userId = notes.userId;

      if (courseId && userId && adminInitialized && adminDb) {
        await adminDb.collection("users").doc(userId).update({
          enrolledCourses: FieldValue.arrayUnion(courseId),
        });
      }
    }

    if (eventName === "subscription.activated" || eventName === "subscription.charged") {
      const subscription = payload.subscription.entity;
      const notes = subscription.notes || {};
      const userId = notes.userId;
      const planId = subscription.plan_id;

      let tier = "basic";
      if (planId?.includes("pro")) tier = "pro";
      else if (planId?.includes("premium")) tier = "premium";

      if (userId && adminInitialized && adminDb) {
        await adminDb.collection("users").doc(userId).update({
          subscriptionTier: tier,
          subscriptionId: subscription.id,
          subscriptionStatus: subscription.status,
        });
      }
    }

    if (eventName === "subscription.cancelled" || eventName === "subscription.pending") {
      const subscription = payload.subscription.entity;
      const notes = subscription.notes || {};
      const userId = notes.userId;

      if (userId && adminInitialized && adminDb) {
        await adminDb.collection("users").doc(userId).update({
          subscriptionStatus: subscription.status,
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("Webhook error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
