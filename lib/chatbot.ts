// AR AI Mastery - Chatbot Integration
// Supports Gemini and Groq — switch via NEXT_PUBLIC_CHATBOT_PROVIDER env var

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `You are an expert AI tutor for AI Mastery, a professional education platform covering Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, Generative AI, Data Science, and more.

Your role:
- Answer technical questions about AI, ML, and related subjects clearly and accurately
- Recommend courses based on the user's skill level and goals
- Guide users through the learning platform
- Help with enrollment and pricing questions
- Be professional, encouraging, and concise

Platform courses include: AI/ML Bootcamp, Generative AI, Computer Vision, Deep Learning, AR Fundamentals, WebAR Development, and more.

Always stay on-topic. If asked about unrelated topics, politely redirect to AI/tech learning.`;

export async function sendChatMessage(
  messages: ChatMessage[],
  provider: "gemini" | "groq" = "gemini"
): Promise<string> {
  if (provider === "groq") {
    return sendGroqMessage(messages);
  }
  return sendGeminiMessage(messages);
}

async function sendGeminiMessage(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not configured");

  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const chat = model.startChat({
    history,
    systemInstruction: SYSTEM_PROMPT,
  });

  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.content);
  return result.response.text();
}

async function sendGroqMessage(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY not configured");

  const Groq = (await import("groq-sdk")).default;
  const groq = new Groq({ apiKey });

  const completion = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ],
    max_tokens: 1024,
  });

  return completion.choices[0]?.message?.content ?? "Sorry, I couldn't process that.";
}
