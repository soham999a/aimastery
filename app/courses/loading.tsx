import { SkeletonCard } from "@/components/ui/Skeleton";
export default function Loading() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", paddingTop: 64 }}>
      <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ height: 32, width: 200, borderRadius: 8, background: "var(--border)", marginBottom: 12 }} />
          <div style={{ height: 16, width: 300, borderRadius: 6, background: "var(--border)" }} />
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
          {Array.from({length:6}).map((_,i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    </div>
  );
}
