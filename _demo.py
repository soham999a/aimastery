import os

# ── Setup Demo API Route ──
demo_api = '''import { NextResponse } from "next/server";
import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const DEMO_EMAIL = "demo@aimastery.in";
const DEMO_PASSWORD = "Demo@2025";
const DEMO_NAME = "Demo User";
const ALL_COURSE_IDS = ["ar-fundamentals","ai-ml-bootcamp","generative-ai","unity-ar","computer-vision","webar-dev"];

function getAdminApp() {
  if (getApps().length) return getApp();
  return initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\\\n/g, "\\n"),
    }),
  });
}

export async function POST() {
  try {
    const app = getAdminApp();
    const adminAuth = getAuth(app);
    const db = getFirestore(app);

    let uid: string;

    // Try to get existing demo user
    try {
      const existing = await adminAuth.getUserByEmail(DEMO_EMAIL);
      uid = existing.uid;
      // Update password in case it changed
      await adminAuth.updateUser(uid, { password: DEMO_PASSWORD, displayName: DEMO_NAME });
    } catch {
      // Create new demo user
      const newUser = await adminAuth.createUser({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
        displayName: DEMO_NAME,
        emailVerified: true,
      });
      uid = newUser.uid;
    }

    // Write/update Firestore document with all courses enrolled
    await db.collection("users").doc(uid).set({
      uid,
      name: DEMO_NAME,
      email: DEMO_EMAIL,
      createdAt: new Date().toISOString(),
      enrolledCourses: ALL_COURSE_IDS,
      subscriptionTier: "pro",
      referralCode: "AIMDEMO",
      referralCount: 0,
      isDemo: true,
      progress: {
        "ar-fundamentals": { completed: ["0-0","0-1","0-2","1-0","1-1","1-2","2-0","2-1"], lastLesson: "2-1" },
        "ai-ml-bootcamp": { completed: ["0-0","0-1","0-2","0-3","1-0","1-1"], lastLesson: "1-1" },
        "generative-ai": { completed: ["0-0","0-1","0-2"], lastLesson: "0-2" },
      },
    }, { merge: true });

    return NextResponse.json({
      success: true,
      message: "Demo account ready",
      credentials: { email: DEMO_EMAIL, password: DEMO_PASSWORD },
    });
  } catch (error: any) {
    console.error("Setup demo error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
    note: "POST to this endpoint to create/reset the demo account",
  });
}
'''
with open("ar-ai-mastery/app/api/setup-demo/route.ts", "w", encoding="utf-8") as f:
    f.write(demo_api)
print("demo API done")
