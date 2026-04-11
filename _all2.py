import os

# ── 2. URL state for course search ──
courses_page = '''"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chatbot/ChatWidget";
import { ALL_COURSES } from "@/lib/courses";
import Link from "next/link";

const StarIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const ClockIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const UsersIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const SearchIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const XIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

const LEVELS = ["All","Beginner","Intermediate","Advanced"];
const CATEGORIES = ["All","AR","AI"];

export default function CoursesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [level, setLevel] = useState(searchParams.get("level") ?? "All");
  const [category, setCategory] = useState(searchParams.get("cat") ?? "All");

  // Sync URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (level !== "All") params.set("level", level);
    if (category !== "All") params.set("cat", category);
    const qs = params.toString();
    router.replace(qs ? `/courses?${qs}` : "/courses", { scroll: false });
  }, [search, level, category, router]);

  const filtered = useMemo(() => ALL_COURSES.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchLevel = level === "All" || c.level === level;
    const matchCat = category === "All" || c.category === category;
    return matchSearch && matchLevel && matchCat;
  }), [search, level, category]);

  const hasFilters = level !== "All" || category !== "All" || search !== "";

  const filterBtn = (active: boolean, onClick: () => void, label: string, color = "#2563eb") => (
    <button key={label} onClick={onClick} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s", background: active ? color : "transparent", color: active ? "#fff" : "var(--text-muted)", border: active ? `1px solid ${color}` : "1px solid var(--border)" }}>
      {label}
    </button>
  );

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 64, background: "var(--bg-base)" }}>
        <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
            <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2rem", color: "var(--text-h)", marginBottom: 4 }}>Course Catalog</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: 20 }}>{ALL_COURSES.length} expert-led courses in AI & tech</p>
            <div style={{ position: "relative", maxWidth: 520 }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}><SearchIcon /></span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search courses or instructors..."
                style={{ width: "100%", padding: "11px 40px 11px 42px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--bg-input)", color: "var(--text-h)", fontSize: 14, outline: "none", fontFamily: "inherit" }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
                  <XIcon />
                </button>
              )}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)", marginRight: 4 }}>Level:</span>
            {LEVELS.map(l => filterBtn(level === l, () => setLevel(l), l))}
            <div style={{ width: 1, height: 16, background: "var(--border)", margin: "0 4px" }} />
            <span style={{ fontSize: 12, color: "var(--text-muted)", marginRight: 4 }}>Category:</span>
            {CATEGORIES.map(c => filterBtn(category === c, () => setCategory(c), c, "#7c3aed"))}
            {hasFilters && (
              <button onClick={() => { setLevel("All"); setCategory("All"); setSearch(""); }} style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)" }}>
                <XIcon /> Clear
              </button>
            )}
          </div>

          <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
            Showing <span style={{ color: "var(--text-h)", fontWeight: 600 }}>{filtered.length}</span> courses
          </p>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 24px" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.1rem", color: "var(--text-h)", marginBottom: 6 }}>No courses found</p>
              <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 22 }}>
              {filtered.map(course => (
                <Link key={course.id} href={`/courses/${course.id}`} className="card" style={{ display: "flex", flexDirection: "column", borderRadius: 20, overflow: "hidden", border: "1px solid var(--border-card)", background: "var(--bg-card)", textDecoration: "none" }}>
                  <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", background: `linear-gradient(135deg,${course.gradientFrom},${course.gradientTo})` }}>
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 40%,rgba(255,255,255,0.1) 0%,transparent 65%)" }} />
                    <span style={{ fontSize: 48, position: "relative", zIndex: 1 }}>{course.emoji}</span>
                    {course.tag && (
                      <span style={{ position: "absolute", top: 10, left: 10, fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: "rgba(0,0,0,0.4)", color: "#fff", backdropFilter: "blur(8px)" }}>{course.tag}</span>
                    )}
                  </div>
                  <div style={{ padding: 18, display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "rgba(37,99,235,0.1)", color: "#2563eb", border: "1px solid rgba(37,99,235,0.2)" }}>{course.level}</span>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "rgba(124,58,237,0.1)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.2)" }}>{course.category}</span>
                    </div>
                    <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--text-h)", marginBottom: 4, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{course.title}</h3>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 12 }}>{course.instructor}</p>
                    <div style={{ display: "flex", gap: 12, fontSize: 11, color: "var(--text-muted)", marginBottom: 14 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}><StarIcon /><span style={{ color: "var(--text-body)", fontWeight: 500 }}>{course.rating}</span></span>
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}><ClockIcon />{course.duration}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}><UsersIcon />{course.students.toLocaleString()}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 12, borderTop: "1px solid var(--divider)" }}>
                      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--text-h)" }}>Rs.{course.price.toLocaleString()}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "7px 14px", borderRadius: 8, background: "#2563eb", color: "#fff" }}>Enroll Now</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
'''
with open("ar-ai-mastery/app/courses/page.tsx", "w", encoding="utf-8") as f:
    f.write(courses_page)
print("courses page with URL state done")
