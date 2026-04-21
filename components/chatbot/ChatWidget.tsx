"use client";
import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string; time?: string };

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const ChatIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
);

const SUGGESTIONS = [
  "What courses do you offer?",
  "How does Google Classroom work?",
  "Tell me about the AI bootcamp",
];

function getTime() {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      content: "Hi! I'm your **AI Mastery** tutor powered by AI. Ask me anything about our courses, Google Classroom, or how to get started.",
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  async function send(text?: string) {
    const message = (text ?? input).trim();
    if (!message || loading) return;
    setShowSuggestions(false);
    const userMsg: Msg = { role: "user", content: message, time: getTime() };
    setMsgs((p) => [...p, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...msgs, userMsg].map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      setMsgs((p) => [...p, { role: "assistant", content: data.response || "Sorry, I could not process that.", time: getTime() }]);
    } catch {
      setMsgs((p) => [...p, { role: "assistant", content: "Connection error. Please try again.", time: getTime() }]);
    } finally {
      setLoading(false);
    }
  }

  // Simple markdown bold renderer
  function renderContent(text: string) {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i} style={{ color: "inherit", fontWeight: 700 }}>{part}</strong> : part
    );
  }

  return (
    <>
      {/* Backdrop blur when open on mobile */}
      {open && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9990, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)" }}
          onClick={() => setOpen(false)}
        />
      )}

      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>

        {/* Chat window */}
        {open && (
          <div
            style={{
              width: 380,
              maxWidth: "calc(100vw - 48px)",
              borderRadius: 24,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
              background: "#0f1629",
              animation: "chatSlideUp 0.3s cubic-bezier(0.22,1,0.36,1)",
              maxHeight: "70vh",
            }}
          >
            <style>{`
              @keyframes chatSlideUp {
                from { opacity: 0; transform: translateY(20px) scale(0.95); }
                to   { opacity: 1; transform: translateY(0) scale(1); }
              }
              @keyframes dotBounce {
                0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
                40% { transform: translateY(-6px); opacity: 1; }
              }
            `}</style>

            {/* Header */}
            <div style={{
              padding: "16px 20px",
              background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #4f46e5 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Avatar */}
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  border: "2px solid rgba(255,255,255,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2"/>
                    <circle cx="12" cy="5" r="2"/>
                    <path d="M12 7v4"/>
                    <line x1="8" y1="16" x2="8" y2="16" strokeWidth="3"/>
                    <line x1="16" y1="16" x2="16" y2="16" strokeWidth="3"/>
                  </svg>
                  {/* Online dot */}
                  <span style={{
                    position: "absolute", bottom: 0, right: 0,
                    width: 10, height: 10, borderRadius: "50%",
                    background: "#4ade80",
                    border: "2px solid #1d4ed8",
                    boxShadow: "0 0 6px #4ade80",
                  }} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <p style={{ color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "Poppins, sans-serif", margin: 0 }}>
                      AI Mastery Tutor
                    </p>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 3,
                      fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 999,
                      background: "rgba(255,255,255,0.2)", color: "#fff",
                    }}>
                      <SparkleIcon /> AI
                    </span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, margin: 0 }}>
                    Powered by Groq · Always online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "rgba(255,255,255,0.12)",
                  border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.8)", transition: "background 0.15s",
                }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: "auto", padding: "16px",
              display: "flex", flexDirection: "column", gap: 12,
              background: "#0f1629",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(37,99,235,0.3) transparent",
            }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end" }}>
                  {m.role === "assistant" && (
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                      background: "linear-gradient(135deg,#1d4ed8,#4f46e5)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="10" rx="2"/>
                        <circle cx="12" cy="5" r="2"/>
                        <path d="M12 7v4"/>
                      </svg>
                    </div>
                  )}
                  <div style={{ maxWidth: "78%", display: "flex", flexDirection: "column", gap: 3, alignItems: m.role === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{
                      padding: "10px 14px",
                      borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      background: m.role === "user"
                        ? "linear-gradient(135deg,#2563eb,#1d4ed8)"
                        : "rgba(255,255,255,0.06)",
                      color: m.role === "user" ? "#fff" : "#e2e8f0",
                      fontSize: 13.5,
                      lineHeight: 1.6,
                      border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                      boxShadow: m.role === "user" ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
                    }}>
                      {renderContent(m.content)}
                    </div>
                    {m.time && (
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", paddingLeft: 4, paddingRight: 4 }}>
                        {m.time}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#1d4ed8,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>
                  </div>
                  <div style={{ padding: "12px 16px", borderRadius: "18px 18px 18px 4px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 5, alignItems: "center" }}>
                    {[0, 1, 2].map((i) => (
                      <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#60a5fa", display: "inline-block", animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {showSuggestions && msgs.length === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
                    Quick questions
                  </p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      style={{
                        padding: "8px 12px", borderRadius: 10, textAlign: "left",
                        background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)",
                        color: "#93c5fd", fontSize: 12.5, cursor: "pointer",
                        transition: "all 0.15s", fontFamily: "inherit",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: "12px 14px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              background: "#0b0f1e",
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexShrink: 0,
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                placeholder="Ask about courses, AI, careers..."
                style={{
                  flex: 1, padding: "10px 14px", borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#f1f5f9", fontSize: 13.5, outline: "none",
                  fontFamily: "inherit", transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(37,99,235,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                style={{
                  width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                  background: input.trim() && !loading
                    ? "linear-gradient(135deg,#2563eb,#1d4ed8)"
                    : "rgba(255,255,255,0.06)",
                  border: "none", cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: input.trim() && !loading ? "#fff" : "rgba(255,255,255,0.25)",
                  transition: "all 0.2s",
                  boxShadow: input.trim() && !loading ? "0 4px 12px rgba(37,99,235,0.4)" : "none",
                }}
              >
                <SendIcon />
              </button>
            </div>
          </div>
        )}

        {/* FAB */}
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            width: 56, height: 56, borderRadius: "50%",
            background: open
              ? "rgba(255,255,255,0.1)"
              : "linear-gradient(135deg,#1e3a8a,#2563eb,#4f46e5)",
            border: open ? "1px solid rgba(255,255,255,0.15)" : "none",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff",
            boxShadow: open
              ? "none"
              : "0 8px 32px rgba(37,99,235,0.55), 0 0 0 1px rgba(37,99,235,0.3)",
            transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
            transform: open ? "scale(0.9) rotate(0deg)" : "scale(1)",
          }}
          aria-label="Open AI tutor"
        >
          {open ? <CloseIcon /> : <ChatIcon />}
        </button>
      </div>
    </>
  );
}
