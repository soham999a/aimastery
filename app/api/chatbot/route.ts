import { NextRequest, NextResponse } from "next/server";
import { sendChatMessage, type ChatMessage } from "@/lib/chatbot";

// Simple in-memory rate limiter — 20 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 20) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ response: "Too many requests. Please wait a moment before sending another message." }, { status: 429 });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    // Limit message history to last 10 to prevent token abuse
    const trimmedMessages = messages.slice(-10);

    const provider = (process.env.NEXT_PUBLIC_CHATBOT_PROVIDER as "gemini" | "groq") ?? "groq";
    const response = await sendChatMessage(trimmedMessages as ChatMessage[], provider);

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error("Chatbot error:", error);
    return NextResponse.json(
      { response: "I'm currently unavailable. Please try again later." },
      { status: 200 }
    );
  }
}
