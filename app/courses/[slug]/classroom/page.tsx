"use client";
import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseById } from "@/lib/courses";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/layout/Navbar";

const ExternalIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const VideoIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>;
const CalendarIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const BookIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const UsersIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const CheckIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const LockIcon = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;

function useCountdown(targetDate: string) {
  const [diff, setDiff] = useState(0);
  useEffect(() => {
    const tick = () => setDiff(Math.max(0, new Date(targetDate).getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s, isLive: diff === 0 };
}

function pad(n: number) { return String(n).padStart(2, "0"); }

export default function ClassroomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const course = getCourseById(slug);
  const { user, loading } = useAuth();
  const [enrolled, setEnrolled] = useState<boolean | null>(null);
  const countdown = useCountdown(course?.nextLiveSession ?? new Date().toISOString());

  useEffect(() => {
    if (!user || !course) return;
    getDoc(doc(db, "users", user.uid)).then(snap => {
      const data = snap.data();
      const courses: string[] = data?.enrolledCourses ?? [];
      setEnrolled(courses.includes(course.id));
    }).catch(() => setEnrolled(false));
  }, [user, course]);

  if (!course) return notFound();

  const isLoading = loading || enrolled === null;

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 64, background: "var(--bg-base)" }}>
        {/* Header */}
        <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)", padding: "40px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Link href={`/courses/${slug}`} style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: 13 }}>
                {course.title}
              </Link>
              <span style={{ color: "var(--text-faint)" }}>/</span>
              <span style={{ color: "var(--text-muted)", fontSize: 13 }}>Google Classroom</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg,${course.gradientFrom},${course.gradientTo})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <BookIcon />
              </div>
              <div>
                <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "var(--text-h)", marginBottom: 4 }}>{course.title}</h1>
                <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Google Classroom Hub · {course.instructor}</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid var(--border)", borderTopColor: "var(--brand)", animation: "spin 0.8s linear infinite" }} />
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          ) : !user ? (
            /* Not logged in */
            <div style={{ textAlign: "center", padding: "80px 24px" }}>
              <div style={{ color: "var(--text-muted)", marginBottom: 20 }}><LockIcon /></div>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "var(--text-h)", marginBottom: 8 }}>Login Required</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>Please log in to access the classroom.</p>
              <Link href="/login" style={{ padding: "12px 28px", borderRadius: 10, background: "var(--brand)", color: "#fff", textDecoration: "none", fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>Login</Link>
            </div>
          ) : !enrolled ? (
            /* Not enrolled */
            <div style={{ textAlign: "center", padding: "80px 24px" }}>
              <div style={{ color: "var(--text-muted)", marginBottom: 20 }}><LockIcon /></div>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "var(--text-h)", marginBottom: 8 }}>Enroll to Access Classroom</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: 8 }}>You need to enroll in this course to access the Google Classroom.</p>
              <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 28 }}>After enrollment, you will get instant access to all course materials, live sessions, and assignments.</p>
              <Link href={`/courses/${slug}`} style={{ padding: "12px 28px", borderRadius: 10, background: "var(--brand)", color: "#fff", textDecoration: "none", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 15, boxShadow: "0 8px 24px rgba(37,99,235,0.35)" }}>
                Enroll Now — Rs.{course.price.toLocaleString()}
              </Link>
            </div>
          ) : (
            /* Enrolled — show full classroom */
            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Google Classroom CTA */}
                <div style={{ padding: 28, borderRadius: 20, background: "linear-gradient(135deg,#1a73e8,#0d47a1)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 50%,rgba(255,255,255,0.08) 0%,transparent 60%)", pointerEvents: "none" }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                        <rect width="48" height="48" rx="8" fill="white" fillOpacity="0.15"/>
                        <path d="M24 12L36 18V30L24 36L12 30V18L24 12Z" stroke="white" strokeWidth="2" fill="none"/>
                        <circle cx="24" cy="24" r="4" fill="white"/>
                      </svg>
                      <div>
                        <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: 2 }}>Google Classroom</h2>
                        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Your course hub for videos, assignments & live sessions</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <a href={course.classroomLink} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: "#fff", color: "#1a73e8", textDecoration: "none", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
                        Open Google Classroom <ExternalIcon />
                      </a>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>Class Code:</span>
                        <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 15, color: "#fff", letterSpacing: "0.1em" }}>{course.classroomCode}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What you get */}
                <div style={{ padding: 24, borderRadius: 16, border: "1px solid var(--border)", background: "var(--bg-card)" }}>
                  <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1rem", color: "var(--text-h)", marginBottom: 16 }}>What is in your Classroom</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      "All course video lessons uploaded by instructor",
                      "Live session recordings (available after each session)",
                      "Assignments and projects with deadlines",
                      "Course materials, PDFs, and resources",
                      "Direct messaging with instructor",
                      "Peer discussion and Q&A",
                      "Grade tracking and feedback",
                    ].map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--text-body)" }}>
                        <span style={{ flexShrink: 0, marginTop: 1 }}><CheckIcon /></span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* How to join */}
                <div style={{ padding: 24, borderRadius: 16, border: "1px solid var(--border)", background: "var(--bg-card)" }}>
                  <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1rem", color: "var(--text-h)", marginBottom: 16 }}>How to Join</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                      { step: "1", title: "Click Open Google Classroom above", desc: "You will be redirected to classroom.google.com" },
                      { step: "2", title: "Sign in with your Google account", desc: "Use the same Gmail you registered with" },
                      { step: "3", title: "Enter the class code if prompted", desc: `Class code: ${course.classroomCode}` },
                      { step: "4", title: "Start learning!", desc: "Access all videos, assignments, and live sessions" },
                    ].map(s => (
                      <div key={s.step} style={{ display: "flex", gap: 14 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(37,99,235,0.15)", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.step}</div>
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-h)", marginBottom: 2 }}>{s.title}</p>
                          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Next live session */}
                {course.nextLiveSession && (
                  <div style={{ padding: 20, borderRadius: 16, border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.04)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                      <span style={{ color: "#ef4444" }}><VideoIcon /></span>
                      <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.95rem", color: "var(--text-h)" }}>Next Live Session</h3>
                    </div>
                    {countdown.isLive ? (
                      <div style={{ textAlign: "center", marginBottom: 14 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 999, background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}>
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block", boxShadow: "0 0 8px #ef4444" }} />
                          <span style={{ color: "#ef4444", fontWeight: 700, fontSize: 14 }}>LIVE NOW</span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10 }}>
                          {new Date(course.nextLiveSession).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 14 }}>
                          {[{ v: pad(countdown.d), l: "Days" }, { v: pad(countdown.h), l: "Hrs" }, { v: pad(countdown.m), l: "Min" }, { v: pad(countdown.s), l: "Sec" }].map(t => (
                            <div key={t.l} style={{ textAlign: "center", padding: "8px 4px", borderRadius: 8, background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
                              <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--text-h)" }}>{t.v}</div>
                              <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{t.l}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {course.liveSessionLink && (
                      <a href={course.liveSessionLink} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px", borderRadius: 10, background: "#ef4444", color: "#fff", textDecoration: "none", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 13 }}>
                        <VideoIcon /> Join Google Meet
                      </a>
                    )}
                  </div>
                )}

                {/* Quick links */}
                <div style={{ padding: 20, borderRadius: 16, border: "1px solid var(--border)", background: "var(--bg-card)" }}>
                  <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.95rem", color: "var(--text-h)", marginBottom: 14 }}>Quick Links</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { label: "Open Classroom", href: course.classroomLink, color: "#1a73e8" },
                      { label: "Watch Lessons", href: `/courses/${slug}/learn`, color: "var(--brand)" },
                      { label: "Course Details", href: `/courses/${slug}`, color: "var(--text-muted)" },
                      { label: "Dashboard", href: "/dashboard", color: "var(--text-muted)" },
                    ].map(link => (
                      <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg-surface)", textDecoration: "none", fontSize: 13, color: link.color, fontWeight: 500, transition: "border-color 0.15s" }}>
                        {link.label}
                        <ExternalIcon />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Support */}
                <div style={{ padding: 16, borderRadius: 14, border: "1px solid var(--border)", background: "var(--bg-card)", textAlign: "center" }}>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>Need help joining?</p>
                  <Link href="/contact" style={{ fontSize: 13, color: "var(--brand)", textDecoration: "none", fontWeight: 600 }}>Contact Support</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
