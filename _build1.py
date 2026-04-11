import os

# ── 1. Skeleton loader component ──
os.makedirs("ar-ai-mastery/components/ui", exist_ok=True)
skeleton = '''"use client";
export function Skeleton({ width = "100%", height = 20, radius = 8, style = {} }: { width?: string | number; height?: number; radius?: number; style?: React.CSSProperties }) {
  return (
    <div style={{ width, height, borderRadius: radius, background: "linear-gradient(90deg, var(--border) 25%, rgba(255,255,255,0.06) 50%, var(--border) 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", ...style }} />
  );
}
export function SkeletonCard() {
  return (
    <div style={{ padding: 20, borderRadius: 16, border: "1px solid var(--border)", background: "var(--bg-card)", display: "flex", flexDirection: "column", gap: 12 }}>
      <Skeleton height={160} radius={12} />
      <Skeleton width="60%" height={14} />
      <Skeleton width="40%" height={12} />
      <div style={{ display: "flex", gap: 8 }}>
        <Skeleton width={60} height={10} />
        <Skeleton width={60} height={10} />
        <Skeleton width={60} height={10} />
      </div>
    </div>
  );
}
'''
with open("ar-ai-mastery/components/ui/Skeleton.tsx", "w", encoding="utf-8") as f:
    f.write(skeleton)
print("skeleton done")
