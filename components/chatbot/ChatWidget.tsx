"use client";
import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };

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

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I am your AI Mastery tutor. Ask me anything about AI, ML, or our courses." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Msg = { role: "user", content: text };
    setMsgs((p) => [...p, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...msgs, userMsg] }),
      });
      const data = await res.json();
      setMsgs((p) => [...p, { role: "assistant", content: data.response || "Sorry, could not process that." }]);
    } catch {
      setMsgs((p) => [...p, { role: "assistant", content: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
      {open && (
        <div style={{ width: 360, borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.4)", display: "flex", flexDirection: "column", border: "1px solid var(--border)", background: "var(--bg-card)" }}>
          {/* Header */}
          <div style={{ padding: "14px 16px", background: "linear-gradient(135deg,#1e3a8a,#2563eb)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/>
                </svg>
              </div>
              <div>
                <p style={{ color: "#fff", fontSize: 14, fontWeight: 600, margin: 0 }}>AI Mastery Tutor</p>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                  <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.8)", display: "flex", padding: 4 }}>
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div style={{ overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10, maxHeight: 320, background: "var(--bg-card)" }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "9px 13px",
                  borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  background: m.role === "user" ? "#2563eb" : "var(--bg-surface)",
                  color: m.role === "user" ? "#fff" : "var(--text-body)",
                  fontSize: 13, lineHeight: 1.55,
                  border: m.role === "user" ? "none" : "1px solid var(--border)",
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 4, padding: "10px 14px", borderRadius: "14px 14px 14px 4px", background: "var(--bg-surface)", border: "1px solid var(--border)", width: "fit-content" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--text-muted)", display: "inline-block" }} />
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--text-muted)", display: "inline-block" }} />
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--text-muted)", display: "inline-block" }} />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px", borderTop: "1px solid var(--border)", display: "flex", gap: 8, background: "var(--bg-card)" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about AI, ML, courses..."
              style={{ flex: 1, padding: "9px 13px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg-input)", color: "var(--text-h)", fontSize: 13, outline: "none", fontFamily: "inherit" }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              style={{ width: 38, height: 38, borderRadius: 10, background: input.trim() && !loading ? "#2563eb" : "var(--border)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0, transition: "background 0.2s" }}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,#1e3a8a,#2563eb)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 8px 24px rgba(37,99,235,0.45)", transition: "transform 0.2s" }}
        aria-label="Open AI tutor"
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>
    </div>
  );
}
