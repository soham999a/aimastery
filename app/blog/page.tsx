import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | YesDo Edutech — AI & ML Tips, Tutorials & Industry Insights",
  description: "Read the latest AI & ML tutorials, Python guides, career tips, and industry insights from the YesDo Edutech team. Stay ahead in the AI revolution.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "YesDo Edutech Blog | AI & ML Tutorials",
    description: "Practical AI & ML guides, Python tutorials, career tips, and the Top 100 AI Tools list. Updated regularly.",
    type: "website",
  },
};

const POSTS = [
  {
    slug: "top-100-ai-tools-2026",
    title: "Top 100 AI Tools Every Professional Should Know in 2026",
    excerpt: "From ChatGPT to n8n, we've curated the definitive list of AI tools that are transforming industries. Bookmark this one.",
    category: "AI Tools",
    categoryColor: "#2563eb",
    date: "May 15, 2026",
    readTime: "12 min read",
    icon: "tools",
    featured: true,
  },
  {
    slug: "prompt-engineering-guide",
    title: "The Complete Prompt Engineering Guide for 2026",
    excerpt: "Master the art of talking to AI. Learn the exact prompting techniques that get 10x better results from ChatGPT, Claude, and Gemini.",
    category: "Prompt Engineering",
    categoryColor: "#7c3aed",
    date: "May 10, 2026",
    readTime: "8 min read",
    icon: "edit",
    featured: false,
  },
  {
    slug: "ai-career-india-2026",
    title: "AI Careers in India: What's Hot in 2026",
    excerpt: "The AI job market in India is exploding. Here's what roles are in demand, what skills you need, and how to position yourself.",
    category: "Career",
    categoryColor: "#059669",
    date: "May 5, 2026",
    readTime: "6 min read",
    icon: "briefcase",
    featured: false,
  },
  {
    slug: "n8n-automation-beginners",
    title: "Automate Your Work with n8n — A Beginner's Guide",
    excerpt: "n8n is the most powerful free automation tool you've never heard of. This guide gets you from zero to your first workflow in 30 minutes.",
    category: "Automation",
    categoryColor: "#d97706",
    date: "April 28, 2026",
    readTime: "10 min read",
    icon: "zap",
    featured: false,
  },
  {
    slug: "power-bi-dashboard-tips",
    title: "5 Power BI Dashboard Tips That Will Impress Your Manager",
    excerpt: "Stop making boring dashboards. These five techniques will make your Power BI reports stand out and tell better stories with data.",
    category: "Data Analytics",
    categoryColor: "#0891b2",
    date: "April 20, 2026",
    readTime: "7 min read",
    icon: "bar-chart",
    featured: false,
  },
  {
    slug: "ai-for-school-students",
    title: "How School Students Can Start Learning AI Today",
    excerpt: "You don't need a degree to start with AI. Here's a practical roadmap for school students who want to get ahead of the curve.",
    category: "Students",
    categoryColor: "#be185d",
    date: "April 15, 2026",
    readTime: "5 min read",
    icon: "graduation",
    featured: false,
  },
];

const CATEGORIES = ["All", "AI Tools", "Prompt Engineering", "Career", "Automation", "Data Analytics", "Students"];

function PostIcon({ icon, size = 36, color = "rgba(255,255,255,0.85)" }: { icon: string; size?: number; color?: string }) {
  const s = { width: size, height: size, viewBox: "0 0 24 24", fill: "none" as const, stroke: color, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (icon === "tools") return <svg {...s}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
  if (icon === "edit") return <svg {...s}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
  if (icon === "briefcase") return <svg {...s}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
  if (icon === "zap") return <svg {...s}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
  if (icon === "bar-chart") return <svg {...s}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
  if (icon === "graduation") return <svg {...s}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
  return <svg {...s}><circle cx="12" cy="12" r="10"/></svg>;
}

export default function BlogPage() {
  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 64, background: "var(--bg-base)" }}>

        {/* Header */}
        <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)", padding: "56px 24px 40px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p style={{ color: "#2563eb", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>YesDo Blog</p>
            <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2.25rem", color: "var(--text-h)", marginBottom: 8 }}>
              AI Tips, Tutorials & Insights
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: 24 }}>Stay ahead in the AI revolution. Practical guides from our team.</p>

            {/* Category pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {CATEGORIES.map((cat) => (
                <span key={cat} style={{ padding: "5px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600, border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer", background: cat === "All" ? "var(--bg-card)" : "transparent" }}>
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>

          {/* Featured post */}
          {featured && (
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#d97706", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Featured</p>
              <Link href={`/blog/${featured.slug}`} style={{ display: "block", textDecoration: "none", borderRadius: 24, overflow: "hidden", border: "1px solid var(--border-card)", background: "var(--bg-card)" }}>
                <div style={{ padding: "48px 40px", background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #4f46e5 100%)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.07) 0%, transparent 60%)" }} />
                  <div style={{ position: "relative" }}>
                    <div style={{ marginBottom: 16 }}><PostIcon icon={featured.icon} size={48} /></div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 999, background: "rgba(255,255,255,0.15)", marginLeft: 12, marginBottom: 16 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{featured.category}</span>
                    </div>
                    <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>{featured.title}</h2>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: 1.65, maxWidth: 600, marginBottom: 20 }}>{featured.excerpt}</p>
                    <div style={{ display: "flex", gap: 16, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                      <span>{featured.date}</span>
                      <span>·</span>
                      <span>{featured.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Post grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: "flex", flexDirection: "column", textDecoration: "none", borderRadius: 20, border: "1px solid var(--border-card)", background: "var(--bg-card)", overflow: "hidden", transition: "transform 0.18s, box-shadow 0.18s" }}>
                <div style={{ padding: "28px 24px 0", display: "flex", alignItems: "center", justifyContent: "center", height: 80, background: `${post.categoryColor}18` }}>
                  <PostIcon icon={post.icon} size={36} color={post.categoryColor} /></div>
                <div style={{ padding: "16px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: `${post.categoryColor}18`, color: post.categoryColor, border: `1px solid ${post.categoryColor}30`, marginBottom: 12, width: "fit-content" }}>
                    {post.category}
                  </span>
                  <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--text-h)", lineHeight: 1.45, marginBottom: 10, flex: 1 }}>{post.title}</h3>
                  <p style={{ fontSize: "0.825rem", color: "var(--text-body)", lineHeight: 1.6, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.excerpt}</p>
                  <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--text-muted)", marginTop: "auto" }}>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Top 100 AI Tools CTA */}
          <div style={{ marginTop: 64, borderRadius: 20, padding: "40px 36px", border: "1px solid rgba(37,99,235,0.2)", background: "rgba(37,99,235,0.04)", textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
            </div>
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "var(--text-h)", marginBottom: 8 }}>Top 100 AI Tools — 2026 Edition</h3>
            <p style={{ color: "var(--text-body)", fontSize: "0.9rem", marginBottom: 24, maxWidth: 480, margin: "0 auto 24px" }}>
              Our comprehensive guide to the 100 most powerful AI tools across every industry. Updated monthly.
            </p>
            <Link href="/blog/top-100-ai-tools-2026" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, background: "#2563eb", color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              Read the Full Guide →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
