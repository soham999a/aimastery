import { NextRequest, NextResponse } from "next/server";

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
