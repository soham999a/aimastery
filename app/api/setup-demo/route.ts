import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    email: "demo@aimastery.in",
    password: "Demo@2025",
    setup_url: "/setup-demo",
    note: "Visit /setup-demo to create the demo account via browser",
  });
}

export async function POST() {
  return NextResponse.json({
    message: "Please visit /setup-demo in your browser to create the demo account",
    setup_url: "/setup-demo",
  });
}
