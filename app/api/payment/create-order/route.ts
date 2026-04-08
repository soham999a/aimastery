import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = "INR", courseId, courseName } = await req.json();

    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects paise
      currency,
      notes: { courseId, courseName },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Razorpay order error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
