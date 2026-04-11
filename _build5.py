import os

# ── sitemap.xml ──
sitemap = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://aimastery.vercel.app/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://aimastery.vercel.app/courses</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://aimastery.vercel.app/workshop</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://aimastery.vercel.app/courses/ar-fundamentals</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://aimastery.vercel.app/courses/ai-ml-bootcamp</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://aimastery.vercel.app/courses/generative-ai</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://aimastery.vercel.app/courses/unity-ar</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://aimastery.vercel.app/courses/computer-vision</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://aimastery.vercel.app/courses/webar-dev</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://aimastery.vercel.app/contact</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
</urlset>"""
with open("ar-ai-mastery/public/sitemap.xml", "w", encoding="utf-8") as f:
    f.write(sitemap)
print("sitemap done")

# ── robots.txt ──
robots = """User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /api/

Sitemap: https://aimastery.vercel.app/sitemap.xml"""
with open("ar-ai-mastery/public/robots.txt", "w", encoding="utf-8") as f:
    f.write(robots)
print("robots done")

# ── 404 not-found page ──
not_found = '''"use client";
import Link from "next/link";
export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" }}>
      <div>
        <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "8rem", color: "var(--brand)", lineHeight: 1, marginBottom: 8, opacity: 0.3 }}>404</div>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2rem", color: "var(--text-h)", marginBottom: 12 }}>Page not found</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: 32, maxWidth: 400 }}>The page you are looking for does not exist or has been moved.</p>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 10, background: "var(--brand)", color: "#fff", textDecoration: "none", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14 }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
'''
with open("ar-ai-mastery/app/not-found.tsx", "w", encoding="utf-8") as f:
    f.write(not_found)
print("404 done")

# ── Loading skeleton for courses page ──
loading_courses = '''import { SkeletonCard } from "@/components/ui/Skeleton";
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
'''
with open("ar-ai-mastery/app/courses/loading.tsx", "w", encoding="utf-8") as f:
    f.write(loading_courses)
print("courses loading done")

# ── Loading skeleton for dashboard ──
loading_dash = '''export default function Loading() {
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
'''
with open("ar-ai-mastery/app/(dashboard)/dashboard/loading.tsx", "w", encoding="utf-8") as f:
    f.write(loading_dash)
print("dashboard loading done")
