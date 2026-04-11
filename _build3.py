path = "ar-ai-mastery/app/courses/[slug]/learn/page.tsx"

code = '''"use client";
import { useState, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseById } from "@/lib/courses";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";

const PlayIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const CheckIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const LockIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const ArrowLeft = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const ArrowRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

export default function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const course = getCourseById(slug);
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!course) return notFound();

  const allLessons = course.curriculum.flatMap((s, si) =>
    Array.from({ length: s.lessons }, (_, li) => ({
      sectionIndex: si,
      lessonIndex: li,
      id: `${si}-${li}`,
      title: `${s.section} — Part ${li + 1}`,
      duration: "8 min",
      section: s.section,
    }))
  );

  const currentLesson = allLessons.find(l => l.sectionIndex === activeSection && l.lessonIndex === activeLesson);
  const currentIndex = allLessons.findIndex(l => l.sectionIndex === activeSection && l.lessonIndex === activeLesson);
  const totalLessons = allLessons.length;
  const completedCount = completed.size;
  const progress = Math.round((completedCount / totalLessons) * 100);

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

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--bg-base)", overflow: "hidden" }}>

      {/* Sidebar */}
      <aside style={{ width: sidebarOpen ? 320 : 0, flexShrink: 0, background: "var(--bg-surface)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", overflow: "hidden", transition: "width 0.3s ease" }}>
        {/* Header */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
          <Link href={`/courses/${slug}`} style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: 13, marginBottom: 12 }}>
            <ArrowLeft /> Back to course
          </Link>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--text-h)", marginBottom: 8, lineHeight: 1.3 }}>{course.title}</h2>
          <div style={{ height: 6, borderRadius: 3, background: "var(--border)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg,${course.gradientFrom},${course.gradientTo})`, borderRadius: 3, transition: "width 0.4s ease" }} />
          </div>
          <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{completedCount}/{totalLessons} lessons · {progress}%</p>
        </div>

        {/* Lesson list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {course.curriculum.map((section, si) => (
            <div key={si}>
              <div style={{ padding: "10px 20px 6px", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {section.section}
              </div>
              {Array.from({ length: section.lessons }, (_, li) => {
                const lessonId = `${si}-${li}`;
                const isActive = activeSection === si && activeLesson === li;
                const isDone = completed.has(lessonId);
                return (
                  <button key={li} onClick={() => { setActiveSection(si); setActiveLesson(li); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", border: "none", cursor: "pointer", background: isActive ? "rgba(37,99,235,0.1)" : "transparent", borderLeft: isActive ? "3px solid #2563eb" : "3px solid transparent", textAlign: "left", transition: "all 0.15s" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: isDone ? "#2563eb" : isActive ? "rgba(37,99,235,0.15)" : "var(--border)", color: isDone ? "#fff" : isActive ? "#2563eb" : "var(--text-muted)" }}>
                      {isDone ? <CheckIcon /> : <span style={{ fontSize: 10, fontWeight: 700 }}>{li + 1}</span>}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, color: isActive ? "var(--text-h)" : "var(--text-body)", fontWeight: isActive ? 600 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        Part {li + 1}
                      </p>
                      <p style={{ fontSize: 11, color: "var(--text-muted)" }}>8 min</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{ height: 56, borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0, background: "var(--bg-surface)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setSidebarOpen(o => !o)} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid var(--border)", background: "transparent", cursor: "pointer", color: "var(--text-muted)", fontSize: 12 }}>
              {sidebarOpen ? "Hide" : "Show"} lessons
            </button>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
              Lesson {currentIndex + 1} of {totalLessons}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button disabled={currentIndex === 0} onClick={() => { const p = allLessons[currentIndex-1]; if(p){setActiveSection(p.sectionIndex);setActiveLesson(p.lessonIndex);} }} style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "transparent", cursor: currentIndex===0?"not-allowed":"pointer", color: "var(--text-muted)", fontSize: 12, opacity: currentIndex===0?0.4:1, display:"flex",alignItems:"center",gap:4 }}>
              <ArrowLeft /> Prev
            </button>
            <button disabled={currentIndex === totalLessons-1} onClick={() => { const n = allLessons[currentIndex+1]; if(n){setActiveSection(n.sectionIndex);setActiveLesson(n.lessonIndex);} }} style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "transparent", cursor: currentIndex===totalLessons-1?"not-allowed":"pointer", color: "var(--text-muted)", fontSize: 12, opacity: currentIndex===totalLessons-1?0.4:1, display:"flex",alignItems:"center",gap:4 }}>
              Next <ArrowRight />
            </button>
          </div>
        </div>

        {/* Video area */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
          {/* Video player */}
          <div style={{ borderRadius: 16, overflow: "hidden", background: "#000", aspectRatio: "16/9", maxWidth: 900, marginBottom: 28, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg,${course.gradientFrom},${course.gradientTo})`, opacity: 0.3 }} />
            <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", cursor: "pointer", border: "2px solid rgba(255,255,255,0.3)" }}>
                <PlayIcon />
              </div>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>Video lesson coming soon</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 }}>Upload your video to Firebase Storage</p>
            </div>
          </div>

          {/* Lesson info */}
          <div style={{ maxWidth: 900 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>{currentLesson?.section}</p>
                <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "var(--text-h)" }}>{currentLesson?.title}</h1>
              </div>
              <button onClick={markComplete} style={{ padding: "10px 20px", borderRadius: 10, background: completed.has(currentLesson?.id ?? "") ? "rgba(74,222,128,0.15)" : "#2563eb", color: completed.has(currentLesson?.id ?? "") ? "#4ade80" : "#fff", border: completed.has(currentLesson?.id ?? "") ? "1px solid rgba(74,222,128,0.3)" : "none", cursor: "pointer", fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                <CheckIcon />
                {completed.has(currentLesson?.id ?? "") ? "Completed" : "Mark Complete"}
              </button>
            </div>

            <div style={{ padding: 24, borderRadius: 14, border: "1px solid var(--border)", background: "var(--bg-card)", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.95rem", color: "var(--text-h)", marginBottom: 10 }}>About this lesson</h3>
              <p style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.7 }}>
                In this lesson, you will learn the core concepts of {currentLesson?.section}. Follow along with the video and complete the exercises to reinforce your understanding. Mark the lesson as complete when you are done to track your progress.
              </p>
            </div>

            {progress === 100 && (
              <div style={{ padding: 24, borderRadius: 14, border: "1px solid rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.06)", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#4ade80", marginBottom: 4 }}>Course Complete!</h3>
                <p style={{ fontSize: 14, color: "var(--text-muted)" }}>Congratulations! You have completed all lessons. Your certificate is ready.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
'''

with open(path, "w", encoding="utf-8") as f:
    f.write(code)
import os; print("lesson page done", os.path.getsize(path))
