import os

# ── 1. Sitemap ──
sitemap = """import type { MetadataRoute } from "next";
import { ALL_COURSES } from "@/lib/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://aimastery.vercel.app";
  const courses = ALL_COURSES.map(c => ({
    url: `${base}/courses/${c.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/courses`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/workshop`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...courses,
  ];
}
"""
with open("ar-ai-mastery/app/sitemap.ts", "w", encoding="utf-8") as f:
    f.write(sitemap)
print("sitemap done")

# ── 2. Robots.txt ──
robots = """import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://aimastery.vercel.app";
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/dashboard", "/api/"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
"""
with open("ar-ai-mastery/app/robots.ts", "w", encoding="utf-8") as f:
    f.write(robots)
print("robots done")

# ── 3. Custom 404 page ──
not_found = '''"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" }}>
      <div>
        <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "8rem", color: "var(--brand)", lineHeight: 1, marginBottom: 8, opacity: 0.15 }}>404</div>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2rem", color: "var(--text-h)", marginBottom: 12 }}>Page not found</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: 32, maxWidth: 400 }}>The page you are looking for does not exist or has been moved.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{ padding: "12px 24px", borderRadius: 10, background: "var(--brand)", color: "#fff", textDecoration: "none", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14 }}>Go Home</Link>
          <Link href="/courses" style={{ padding: "12px 24px", borderRadius: 10, border: "1px solid var(--border)", color: "var(--text-body)", textDecoration: "none", fontSize: 14 }}>Browse Courses</Link>
        </div>
      </div>
    </div>
  );
}
'''
with open("ar-ai-mastery/app/not-found.tsx", "w", encoding="utf-8") as f:
    f.write(not_found)
print("404 done")

# ── 4. Global loading page ──
loading = '''export default function Loading() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid var(--border)", borderTopColor: "var(--brand)", animation: "spin 0.8s linear infinite" }} />
        <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Loading...</p>
      </div>
    </div>
  );
}
'''
with open("ar-ai-mastery/app/loading.tsx", "w", encoding="utf-8") as f:
    f.write(loading)
print("loading done")

# ── 5. Global error page ──
error_page = '''"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" }}>
      <div>
        <div style={{ fontSize: "4rem", marginBottom: 16 }}>⚠️</div>
        <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "var(--text-h)", marginBottom: 8 }}>Something went wrong</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>{error.message || "An unexpected error occurred."}</p>
        <button onClick={reset} style={{ padding: "12px 24px", borderRadius: 10, background: "var(--brand)", color: "#fff", border: "none", cursor: "pointer", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14 }}>Try Again</button>
      </div>
    </div>
  );
}
'''
with open("ar-ai-mastery/app/error.tsx", "w", encoding="utf-8") as f:
    f.write(error_page)
print("error page done")
