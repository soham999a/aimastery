import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin (server-side)
function getAdminDb() {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }
  return getFirestore();
}

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, userId } =
      await req.json();

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ verified: false, error: "Invalid signature" }, { status: 400 });
    }

    // Write enrollment to Firestore if we have admin credentials
    if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY && userId && courseId) {
      try {
        const db = getAdminDb();
        // Add enrollment record
        await db.collection("enrollments").add({
          userId,
          courseId,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          enrolledAt: new Date().toISOString(),
          status: "active",
        });
        // Update user's enrolledCourses array
        const userRef = db.collection("users").doc(userId);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          const current: string[] = userDoc.data()?.enrolledCourses ?? [];
          if (!current.includes(courseId)) {
            await userRef.update({ enrolledCourses: [...current, courseId] });
          }
        }
      } catch (dbErr) {
        // Log but don't fail — payment was valid
        console.error("Firestore write error:", dbErr);
      }
    }

    return NextResponse.json({ verified: true, paymentId: razorpay_payment_id });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ verified: false, error: "Verification failed" }, { status: 500 });
  }
}
