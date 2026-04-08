// Razorpay integration utilities

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
  };
  theme: { color: string };
  handler: (response: RazorpayPaymentResponse) => void;
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if ((window as any).Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function initiateRazorpayPayment(
  order: RazorpayOrder,
  userDetails: { name: string; email: string },
  onSuccess: (response: RazorpayPaymentResponse) => void
) {
  const loaded = await loadRazorpayScript();
  if (!loaded) throw new Error("Razorpay SDK failed to load");

  const options: RazorpayOptions = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    amount: order.amount,
    currency: order.currency,
    name: "AR AI Mastery",
    description: "Course Enrollment",
    order_id: order.id,
    prefill: userDetails,
    theme: { color: "#0066FF" },
    handler: onSuccess,
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
}
