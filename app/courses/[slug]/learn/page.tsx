"use client";
import { useState, use, useCallback } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseById } from "@/lib/courses";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const CheckIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const ArrowLeft = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const ArrowRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const AwardIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>;

// YouTube video IDs per course (demo videos - replace with real ones)
const COURSE_VIDEOS: Record<string, string[]> = {
  "ar-fundamentals": ["dQw4w9WgXcQ","dQw4w9WgXcQ","dQw4w9WgXcQ"],
  "ai-ml-bootcamp": ["dQw4w9WgXcQ","dQw4w9WgXcQ","dQw4w9WgXcQ"],
  "generative-ai": ["dQw4w9WgXcQ","dQw4w9WgXcQ","dQw4w9WgXcQ"],
  "unity-ar": ["dQw4w9WgXcQ","dQw4w9WgXcQ"],
  "computer-vision": ["dQw4w9WgXcQ","dQw4w9WgXcQ"],
  "webar-dev": ["dQw4w9WgXcQ","dQw4w9WgXcQ"],
};

async function generateCertificate(userName: string, courseName: string, instructorName: string) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const W = 297, H = 210;

  // Background
  doc.setFillColor(6, 9, 18);
  doc.rect(0, 0, W, H, "F");

  // Border
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(2);
  doc.rect(10, 10, W-20, H-20);
  doc.setLineWidth(0.5);
  doc.rect(12, 12, W-24, H-24);

  // Title
  doc.setTextColor(37, 99, 235);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("AI MASTERY", W/2, 35, { align: "center" });

  doc.setTextColor(241, 245, 249);
  doc.setFontSize(28);
  doc.text("Certificate of Completion", W/2, 55, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(148, 163, 184);
  doc.text("This is to certify that", W/2, 72, { align: "center" });

  // Name
  doc.setFontSize(32);
  doc.setTextColor(241, 245, 249);
  doc.setFont("helvetica", "bold");
  doc.text(userName, W/2, 92, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(148, 163, 184);
  doc.setFont("helvetica", "normal");
  doc.text("has successfully completed the course", W/2, 106, { align: "center" });

  // Course name
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235);
  doc.setFont("helvetica", "bold");
  doc.text(courseName, W/2, 122, { align: "center" });

  // Date and instructor
  const date = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.text(`Issued on ${date}`, 50, 165);
  doc.text(`Instructor: ${instructorName}`, W/2, 165, { align: "center" });
  doc.text("AI Mastery | aimastery.vercel.app", W-50, 165, { align: "right" });

  // Line
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(0.5);
  doc.line(30, 158, W-30, 158);

  doc.save(`${courseName.replace(/\s+/g,"-")}-certificate.pdf`);
}

export default function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const course = getCourseById(slug);
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [genCert, setGenCert] = useState(false);

  if (!course) return notFound();

  const allLessons = course.curriculum.flatMap((s, si) =>
    Array.from({ length: s.lessons }, (_, li) => ({
      sectionIndex: si, lessonIndex: li,
      id: `${si}-${li}`, title: `${s.section} — Part ${li + 1}`,
      duration: "8 min", section: s.section,
      videoId: (COURSE_VIDEOS[slug] ?? [])[li] ?? null,
    }))
  );

  const currentLesson = allLessons.find(l => l.sectionIndex === activeSection && l.lessonIndex === activeLesson);
  const currentIndex = allLessons.findIndex(l => l.sectionIndex === activeSection && l.lessonIndex === activeLesson);
  const totalLessons = allLessons.length;
  const completedCount = completed.size;
  const progress = Math.round((completedCount / totalLessons) * 100);
  const isComplete = progress === 100;

  async function markComplete() {
    if (!currentLesson) return;
    const newCompleted = new Set(completed);
    newCompleted.add(currentLesson.id);
    setCompleted(newCompleted);
    if (user) {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          [`progress.${course!.id}.completed`]: Array.from(newCompleted),
          [`progress.${course!.id}.lastLesson`]: currentLesson.id,
        });
      } catch {}
    }
    if (currentIndex < allLessons.length - 1) {
      const next = allLessons[currentIndex + 1];
      setActiveSection(next.sectionIndex);
      setActiveLesson(next.lessonIndex);
    }
  }

  async function handleCertificate() {
    setGenCert(true);
    try {
      await generateCertificate(
        user?.displayName ?? "Student",
        course!.title,
        course!.instructor
      );
    } finally { setGenCert(false); }
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--bg-base)", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{ width: sidebarOpen ? 300 : 0, flexShrink: 0, background: "var(--bg-surface)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", overflow: "hidden", transition: "width 0.3s ease" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
          <Link href={`/courses/${slug}`} style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: 13, marginBottom: 12 }}>
            <ArrowLeft /> Back to course
          </Link>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "var(--text-h)", marginBottom: 8, lineHeight: 1.3 }}>{course.title}</h2>
          <div style={{ height: 5, borderRadius: 3, background: "var(--border)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg,${course.gradientFrom},${course.gradientTo})`, borderRadius: 3, transition: "width 0.4s ease" }} />
          </div>
          <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{completedCount}/{totalLessons} · {progress}%</p>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {course.curriculum.map((section, si) => (
            <div key={si}>
              <div style={{ padding: "10px 20px 4px", fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{section.section}</div>
              {Array.from({ length: section.lessons }, (_, li) => {
                const lessonId = `${si}-${li}`;
                const isActive = activeSection === si && activeLesson === li;
                const isDone = completed.has(lessonId);
                return (
                  <button key={li} onClick={() => { setActiveSection(si); setActiveLesson(li); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 20px", border: "none", cursor: "pointer", background: isActive ? "rgba(37,99,235,0.1)" : "transparent", borderLeft: isActive ? "3px solid #2563eb" : "3px solid transparent", textAlign: "left", transition: "all 0.15s" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: isDone ? "#2563eb" : isActive ? "rgba(37,99,235,0.15)" : "var(--border)", color: isDone ? "#fff" : isActive ? "#2563eb" : "var(--text-muted)", fontSize: 9, fontWeight: 700 }}>
                      {isDone ? <CheckIcon /> : li + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12, color: isActive ? "var(--text-h)" : "var(--text-body)", fontWeight: isActive ? 600 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Part {li + 1}</p>
                      <p style={{ fontSize: 10, color: "var(--text-muted)" }}>8 min</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{ height: 52, borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0, background: "var(--bg-surface)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setSidebarOpen(o => !o)} style={{ padding: "5px 10px", borderRadius: 7, border: "1px solid var(--border)", background: "transparent", cursor: "pointer", color: "var(--text-muted)", fontSize: 12 }}>
              {sidebarOpen ? "Hide" : "Show"} lessons
            </button>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Lesson {currentIndex + 1} / {totalLessons}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isComplete && (
              <button onClick={handleCertificate} disabled={genCert} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                <AwardIcon /> {genCert ? "Generating..." : "Get Certificate"}
              </button>
            )}
            <button disabled={currentIndex === 0} onClick={() => { const p = allLessons[currentIndex-1]; if(p){setActiveSection(p.sectionIndex);setActiveLesson(p.lessonIndex);} }} style={{ padding: "5px 10px", borderRadius: 7, border: "1px solid var(--border)", background: "transparent", cursor: currentIndex===0?"not-allowed":"pointer", color: "var(--text-muted)", fontSize: 12, opacity: currentIndex===0?0.4:1, display:"flex",alignItems:"center",gap:4 }}>
              <ArrowLeft /> Prev
            </button>
            <button disabled={currentIndex === totalLessons-1} onClick={() => { const n = allLessons[currentIndex+1]; if(n){setActiveSection(n.sectionIndex);setActiveLesson(n.lessonIndex);} }} style={{ padding: "5px 10px", borderRadius: 7, border: "1px solid var(--border)", background: "transparent", cursor: currentIndex===totalLessons-1?"not-allowed":"pointer", color: "var(--text-muted)", fontSize: 12, opacity: currentIndex===totalLessons-1?0.4:1, display:"flex",alignItems:"center",gap:4 }}>
              Next <ArrowRight />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px" }}>
          {/* Video */}
          <div style={{ borderRadius: 14, overflow: "hidden", background: "#000", maxWidth: 860, marginBottom: 24, aspectRatio: "16/9", position: "relative" }}>
            {currentLesson?.videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${currentLesson.videoId}?rel=0&modestbranding=1`}
                style={{ width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg,${course.gradientFrom},${course.gradientTo})`, flexDirection: "column", gap: 12 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.3)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>Video lesson</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Add YouTube video ID to COURSE_VIDEOS</p>
              </div>
            )}
          </div>

          {/* Lesson info */}
          <div style={{ maxWidth: 860 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{currentLesson?.section}</p>
                <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "var(--text-h)" }}>{currentLesson?.title}</h1>
              </div>
              <button onClick={markComplete} style={{ padding: "9px 18px", borderRadius: 10, background: completed.has(currentLesson?.id ?? "") ? "rgba(74,222,128,0.12)" : "#2563eb", color: completed.has(currentLesson?.id ?? "") ? "#4ade80" : "#fff", border: completed.has(currentLesson?.id ?? "") ? "1px solid rgba(74,222,128,0.3)" : "none", cursor: "pointer", fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                <CheckIcon />
                {completed.has(currentLesson?.id ?? "") ? "Completed" : "Mark Complete"}
              </button>
            </div>

            <div style={{ padding: 20, borderRadius: 12, border: "1px solid var(--border)", background: "var(--bg-card)", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--text-h)", marginBottom: 8 }}>About this lesson</h3>
              <p style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.7 }}>
                In this lesson, you will learn the core concepts of {currentLesson?.section}. Follow along with the video and complete the exercises to reinforce your understanding.
              </p>
            </div>

            {isComplete && (
              <div style={{ padding: 24, borderRadius: 14, border: "1px solid rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.06)", textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#4ade80", marginBottom: 4 }}>Course Complete!</h3>
                <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 16 }}>Congratulations! Download your certificate now.</p>
                <button onClick={handleCertificate} disabled={genCert} style={{ padding: "10px 24px", borderRadius: 10, background: "#4ade80", color: "#052e16", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <AwardIcon /> {genCert ? "Generating..." : "Download Certificate"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
