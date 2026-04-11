export default function Loading() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-base)" }}>
      <div style={{ width: 240, background: "var(--bg-surface)", borderRight: "1px solid var(--border)" }} />
      <div style={{ flex: 1, padding: "32px" }}>
        <div style={{ height: 120, borderRadius: 20, background: "var(--bg-card)", marginBottom: 24, animation: "shimmer 1.5s infinite", backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg,var(--border) 25%,rgba(255,255,255,0.06) 50%,var(--border) 75%)" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
          {Array.from({length:4}).map((_,i) => (
            <div key={i} style={{ height: 100, borderRadius: 16, background: "var(--bg-card)", animation: "shimmer 1.5s infinite", backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg,var(--border) 25%,rgba(255,255,255,0.06) 50%,var(--border) 75%)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
