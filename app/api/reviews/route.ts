import { NextRequest, NextResponse } from "next/server";

// Reviews are stored in Firestore via client SDK
// This API just validates and returns a success response
// The actual Firestore write happens client-side

export async function GET(req: NextRequest) {
  // Reviews are fetched client-side directly from Firestore
  return NextResponse.json({ message: "Use client-side Firestore for reviews" });
}

export async function POST(req: NextRequest) {
  try {
    const { courseId, userId, rating, text } = await req.json();
    if (!courseId || !userId || !rating) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 });
    }
    // Return success - client handles the actual Firestore write
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
