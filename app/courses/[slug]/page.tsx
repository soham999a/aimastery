"use client";

import { useState } from "react";
import { use } from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chatbot/ChatWidget";
import { getCourseById } from "@/lib/courses";
import { initiateRazorpayPayment } from "@/lib/razorpay";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, updateDoc, arrayUnion, addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import CourseReviews from "@/components/ui/CourseReviews";

const StarIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const UsersIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const ClockIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const CheckIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const PlayIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const ChevronDownIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
const ChevronUpIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>;
const ShieldIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const BookIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const ZapIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const AwardIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>;

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const course = getCourseById(slug);
  const { user } = useAuth();
  const router = useRouter();
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState("");
  const [enrolled, setEnrolled] = useState(false);

  if (!course) return notFound();

  async function handleEnroll() {
    if (!user) return router.push("/signup");
    setEnrolling(true);
    setEnrollError("");
    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: course!.price, courseId: course!.id, courseName: course!.title }),
      });
      const order = await res.json();
      await initiateRazorpayPayment(
        order,
        { name: user.displayName ?? "", email: user.email ?? "" },
        async (response) => {
          // Verify payment
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, courseId: course!.id, userId: user!.uid }),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.verified) {
            // Write enrollment to Firestore
            await updateDoc(doc(db, "users", user!.uid), {
              enrolledCourses: arrayUnion(course!.id),
            });
            // Write enrollment record
            await addDoc(collection(db, "enrollments"), {
              userId: user!.uid,
              courseId: course!.id,
              courseName: course!.title,
              paymentId: response.razorpay_payment_id,
              enrolledAt: new Date().toISOString(),
              status: "active",
            });
            setEnrolled(true);
            // Send enrollment email
            fetch("/api/email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                to: user!.email,
                subject: `You are enrolled in ${course!.title}!`,
                type: "enrollment",
                data: { courseName: course!.title, name: user!.displayName },
              }),
            }).catch(() => {});
            router.push(`/courses/${course!.id}/classroom`);
          } else {
            setEnrollError("Payment verification failed. Contact support.");
          }
        }
      );
    } catch {
      setEnrollError("Payment failed. Please try again.");
    } finally {
      setEnrolling(false);
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 64, background: "var(--bg-base)" }}>
        {/* Hero banner */}
        <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
            <div style={{ maxWidth: 720 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: "rgba(37,99,235,0.15)", color: "#60a5fa", border: "1px solid rgba(37,99,235,0.3)" }}>
                  {course.level}
                </span>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.3)" }}>
                  {course.category}
                </span>
                {course.tag && (
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: "rgba(6,182,212,0.15)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.3)" }}>
                    {course.tag}
                  </span>
                )}
              </div>

              <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2rem", color: "var(--text-h)", marginBottom: 16, lineHeight: 1.2 }}>
                {course.title}
              </h1>

              <p style={{ color: "var(--text-body)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 20 }}>
                {course.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, fontSize: 14, color: "var(--text-muted)", marginBottom: 12 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <StarIcon />
                  <span style={{ color: "var(--text-h)", fontWeight: 600 }}>{course.rating}</span>
                  <span>({course.reviews.toLocaleString()} reviews)</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <UsersIcon />
                  {course.students.toLocaleString()} students
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <ClockIcon />
                  {course.duration}
                </span>
              </div>

              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                Instructor: <span style={{ color: "var(--text-h)", fontWeight: 500 }}>{course.instructor}</span>
                {" · "}
                <span>{course.instructorTitle}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>

            {/* Left: main content */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32, minWidth: 0 }}>

              {/* What you'll learn */}
              <div style={{ padding: 24, borderRadius: 16, border: "1px solid rgba(37,99,235,0.2)", background: "rgba(37,99,235,0.04)" }}>
                <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--text-h)", marginBottom: 20 }}>
                  What you'll learn
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {course.outcomes.map((o) => (
                    <div key={o} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--text-body)" }}>
                      <span style={{ flexShrink: 0, marginTop: 2 }}><CheckIcon /></span>
                      {o}
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div>
                <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--text-h)", marginBottom: 16 }}>
                  Course Curriculum
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {course.curriculum.map((section, i) => (
                    <div key={i} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" }}>
                      <button
                        onClick={() => setOpenSection(openSection === i ? null : i)}
                        style={{
                          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "14px 16px", textAlign: "left", border: "none", cursor: "pointer",
                          background: openSection === i ? "rgba(37,99,235,0.08)" : "var(--bg-card)",
                          transition: "background 0.15s",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(37,99,235,0.15)", color: "#60a5fa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                            {i + 1}
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-h)" }}>{section.section}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "var(--text-muted)", flexShrink: 0 }}>
                          <span>{section.lessons} lessons · {section.duration}</span>
                          {openSection === i ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </div>
                      </button>
                      {openSection === i && (
                        <div style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}>
                          {Array.from({ length: section.lessons }).map((_, j) => (
                            <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", fontSize: 13, color: "var(--text-muted)", borderBottom: j < section.lessons - 1 ? "1px solid var(--border)" : "none" }}>
                              <span style={{ color: "var(--text-faint)", flexShrink: 0 }}><PlayIcon /></span>
                              Lesson {j + 1}: {section.section} — Part {j + 1}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div>
                <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--text-h)", marginBottom: 16 }}>
                  Your Instructor
                </h2>
                <div style={{ padding: 24, borderRadius: 16, border: "1px solid var(--border)", background: "var(--bg-card)", display: "flex", alignItems: "flex-start", gap: 20 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 16, flexShrink: 0, background: `linear-gradient(135deg, ${course.gradientFrom}, ${course.gradientTo})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, fontWeight: 700 }}>
                    {course.instructor.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1rem", color: "var(--text-h)", marginBottom: 4 }}>{course.instructor}</h3>
                    <p style={{ fontSize: 13, color: "#2563eb", marginBottom: 10 }}>{course.instructorTitle}</p>
                    <p style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.65 }}>{course.instructorBio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: enroll card */}
            <div style={{ position: "sticky", top: 80 }}>
              <div style={{ borderRadius: 20, border: "1px solid var(--border)", background: "var(--bg-card)", boxShadow: "0 24px 64px rgba(0,0,0,0.2)", overflow: "hidden" }}>
                {/* Thumbnail */}
                <div style={{ height: 160, background: `linear-gradient(135deg, ${course.gradientFrom}, ${course.gradientTo})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)" }} />
                  <div style={{ color: "rgba(255,255,255,0.3)", transform: "scale(3)" }}>
                    <BookIcon />
                  </div>
                </div>

                <div style={{ padding: 24 }}>
                  <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "2rem", color: "var(--text-h)", marginBottom: 4 }}>
                    ₹{course.price.toLocaleString()}
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>One-time payment · Lifetime access</p>

                  {enrollError && (
                    <div style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", fontSize: 12, marginBottom: 12 }}>
                      {enrollError}
                    </div>
                  )}

                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    style={{ width: "100%", padding: "13px", borderRadius: 12, background: "#2563eb", color: "#fff", border: "none", cursor: enrolling ? "not-allowed" : "pointer", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 10, boxShadow: "0 8px 24px rgba(37,99,235,0.35)", opacity: enrolling ? 0.75 : 1, transition: "opacity 0.2s" }}
                  >
                    {enrolling ? "Processing..." : "Enroll Now"}
                  </button>
                  <Link href={`/courses/${course.id}/learn`} style={{ display: "block", textAlign: "center", padding: "11px", borderRadius: 12, border: "1px solid var(--border)", color: "var(--text-body)", textDecoration: "none", fontSize: 13, fontWeight: 500, marginBottom: 10 }}>
                    Preview Course
                  </Link>
                  <Link href={`/courses/${course.id}/classroom`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px", borderRadius: 12, border: "1px solid rgba(26,115,232,0.4)", background: "rgba(26,115,232,0.06)", color: "#1a73e8", textDecoration: "none", fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
                    <svg width="14" height="14" viewBox="0 0 48 48" fill="none"><path d="M24 12L36 18V30L24 36L12 30V18L24 12Z" stroke="#1a73e8" strokeWidth="2.5" fill="none"/><circle cx="24" cy="24" r="4" fill="#1a73e8"/></svg>
                    Open Google Classroom
                  </Link>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>
                    <ShieldIcon /> 30-day money-back guarantee
                  </div>

                  {/* Details */}
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { label: "Duration", value: course.duration },
                      { label: "Level", value: course.level },
                      { label: "Students", value: course.students.toLocaleString() },
                      { label: "Certificate", value: "Included", color: "#34d399" },
                      { label: "Access", value: "Lifetime" },
                    ].map(({ label, value, color }) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                        <span style={{ color: "var(--text-muted)" }}>{label}</span>
                        <span style={{ color: color ?? "var(--text-h)", fontWeight: 500 }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Perks */}
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, marginTop: 4, display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { Icon: BookIcon, text: "Full course access" },
                      { Icon: ZapIcon, text: "AI tutor support" },
                      { Icon: AwardIcon, text: "Completion certificate" },
                    ].map(({ Icon, text }) => (
                      <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-body)" }}>
                        <span style={{ color: "#2563eb" }}><Icon /></span>
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews section - full width below the grid */}
          </div>

          {/* Reviews */}
          <div style={{ marginTop: 40, paddingTop: 40, borderTop: "1px solid var(--border)" }}>
            <CourseReviews courseId={course.id} />
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
