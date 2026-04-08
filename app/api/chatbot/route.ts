import { NextRequest, NextResponse } from "next/server";
import { sendChatMessage, type ChatMessage } from "@/lib/chatbot";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const provider = (process.env.NEXT_PUBLIC_CHATBOT_PROVIDER as "gemini" | "groq") ?? "gemini";
    const response = await sendChatMessage(messages as ChatMessage[], provider);

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error("Chatbot error:", error);
    return NextResponse.json(
      { response: "I'm currently unavailable. Please try again later." },
      { status: 200 } // Return 200 so the UI handles it gracefully
    );
  }
}
