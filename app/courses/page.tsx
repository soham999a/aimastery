"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chatbot/ChatWidget";
import { ALL_COURSES } from "@/lib/courses";
import { Search, Star, Clock, Users, Filter, X } from "lucide-react";
import Link from "next/link";

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];
const CATEGORIES = ["All", "AR", "AI"];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return ALL_COURSES.filter((c) => {
      const matchSearch =
        search === "" ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor.toLowerCase().includes(search.toLowerCase());
      const matchLevel = level === "All" || c.level === level;
      const matchCat = category === "All" || c.category === category;
      return matchSearch && matchLevel && matchCat;
    });
  }, [search, level, category]);

  const hasFilters = level !== "All" || category !== "All" || search !== "";

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16" style={{ background: "#0f1117" }}>
        {/* Header */}
        <div style={{ background: "#0d0f18", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1
              className="font-bold mb-2"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "2rem", color: "#f9fafb" }}
            >
              Course Catalog
            </h1>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              {ALL_COURSES.length} expert-led courses in AR & AI
            </p>

            {/* Search */}
            <div className="relative mt-6 max-w-lg">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "#6b7280" }}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses or instructors..."
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#f9fafb",
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#6b7280" }}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="flex items-center gap-1.5 text-sm" style={{ color: "#6b7280" }}>
              <Filter className="w-4 h-4" /> Filter:
            </span>

            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={
                  level === l
                    ? { background: "#0066ff", color: "#fff", border: "1px solid #0066ff" }
                    : { background: "transparent", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.1)" }
                }
              >
                {l}
              </button>
            ))}

            <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.1)" }} />

            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={
                  category === c
                    ? { background: "#7c3aed", color: "#fff", border: "1px solid #7c3aed" }
                    : { background: "transparent", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.1)" }
                }
              >
                {c}
              </button>
            ))}

            {hasFilters && (
              <button
                onClick={() => { setLevel("All"); setCategory("All"); setSearch(""); }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}
              >
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {/* Results count */}
          <p className="text-sm mb-6" style={{ color: "#6b7280" }}>
            Showing <span style={{ color: "#f9fafb" }}>{filtered.length}</span> courses
          </p>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <p className="font-semibold mb-2" style={{ color: "#f9fafb" }}>No courses found</p>
              <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="group card-hover rounded-2xl overflow-hidden flex flex-col"
                  style={{ border: "1px solid rgba(255,255,255,0.08)", background: "#1a1d27" }}
                >
                  {/* Thumbnail */}
                  <div
                    className="relative h-44 flex items-center justify-center overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${course.gradientFrom}, ${course.gradientTo})` }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{ background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)" }}
                    />
                    <span className="text-5xl relative z-10">{course.emoji}</span>
                    {course.tag && (
                      <span
                        className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(0,0,0,0.4)", color: "#fff", backdropFilter: "blur(8px)" }}
                      >
                        {course.tag}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2.5">
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(0,102,255,0.1)", color: "#60a5fa", border: "1px solid rgba(0,102,255,0.2)" }}
                      >
                        {course.level}
                      </span>
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(124,58,237,0.1)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.2)" }}
                      >
                        {course.category}
                      </span>
                    </div>

                    <h3
                      className="font-semibold text-base mb-1.5 line-clamp-2 leading-snug"
                      style={{ fontFamily: "Poppins, sans-serif", color: "#f9fafb" }}
                    >
                      {course.title}
                    </h3>
                    <p className="text-xs mb-4" style={{ color: "#6b7280" }}>{course.instructor}</p>

                    <div className="flex items-center gap-4 text-xs mb-5" style={{ color: "#6b7280" }}>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span style={{ color: "#d1d5db" }}>{course.rating}</span>
                      </span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{course.students.toLocaleString()}</span>
                    </div>

                    <div
                      className="flex items-center justify-between mt-auto pt-4"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <span className="font-bold text-xl" style={{ fontFamily: "Poppins, sans-serif", color: "#f9fafb" }}>
                        ₹{course.price.toLocaleString()}
                      </span>
                      <span
                        className="text-xs px-4 py-2 rounded-xl font-semibold"
                        style={{ background: "#0066ff", color: "#fff", boxShadow: "0 4px 12px rgba(0,102,255,0.3)" }}
                      >
                        Enroll Now
                      </span>
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
