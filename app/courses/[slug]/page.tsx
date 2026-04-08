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
import {
  Star, Clock, Users, CheckCircle, ChevronDown, ChevronUp,
  Play, Award, Shield, Zap, BookOpen
} from "lucide-react";

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const course = getCourseById(slug);
  const { user } = useAuth();
  const router = useRouter();
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState("");

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
          await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, courseId: course!.id, userId: user.uid }),
          });
          router.push("/dashboard");
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
      <main className="min-h-screen pt-16" style={{ background: "#0f1117" }}>
        {/* Hero */}
        <div style={{ background: "#0d0f18", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(0,102,255,0.15)", color: "#60a5fa", border: "1px solid rgba(0,102,255,0.3)" }}
                >
                  {course.level}
                </span>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.3)" }}
                >
                  {course.category}
                </span>
                {course.tag && (
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(6,182,212,0.15)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.3)" }}
                  >
                    {course.tag}
                  </span>
                )}
              </div>

              <h1
                className="font-bold mb-4 leading-tight"
                style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", color: "#f9fafb" }}
              >
                {course.title}
              </h1>

              <p className="mb-5 leading-relaxed" style={{ color: "#9ca3af", fontSize: "0.95rem" }}>
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-5 text-sm mb-4" style={{ color: "#9ca3af" }}>
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span style={{ color: "#f9fafb", fontWeight: 600 }}>{course.rating}</span>
                  <span>({course.reviews.toLocaleString()} reviews)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {course.students.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
              </div>

              <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Instructor:{" "}
                <span style={{ color: "#f9fafb", fontWeight: 500 }}>{course.instructor}</span>
                {" · "}
                <span style={{ color: "#9ca3af" }}>{course.instructorTitle}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* What you'll learn */}
              <div
                className="p-6 rounded-2xl"
                style={{ border: "1px solid rgba(0,102,255,0.2)", background: "rgba(0,102,255,0.04)" }}
              >
                <h2
                  className="font-bold text-xl mb-5"
                  style={{ fontFamily: "Poppins, sans-serif", color: "#f9fafb" }}
                >
                  What you'll learn
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.outcomes.map((o) => (
                    <div key={o} className="flex items-start gap-2.5 text-sm" style={{ color: "#d1d5db" }}>
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#0066ff" }} />
                      {o}
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div>
                <h2
                  className="font-bold text-xl mb-5"
                  style={{ fontFamily: "Poppins, sans-serif", color: "#f9fafb" }}
                >
                  Course Curriculum
                </h2>
                <div className="space-y-2">
                  {course.curriculum.map((section, i) => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden"
                      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <button
                        onClick={() => setOpenSection(openSection === i ? null : i)}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors"
                        style={{ background: openSection === i ? "rgba(0,102,255,0.08)" : "rgba(255,255,255,0.03)" }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                            style={{ background: "rgba(0,102,255,0.15)", color: "#60a5fa" }}
                          >
                            {i + 1}
                          </div>
                          <span className="font-medium text-sm" style={{ color: "#f9fafb" }}>
                            {section.section}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs" style={{ color: "#6b7280" }}>
                          <span>{section.lessons} lessons · {section.duration}</span>
                          {openSection === i
                            ? <ChevronUp className="w-4 h-4" />
                            : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>
                      {openSection === i && (
                        <div style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                          {Array.from({ length: section.lessons }).map((_, j) => (
                            <div
                              key={j}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm"
                              style={{
                                color: "#9ca3af",
                                borderBottom: j < section.lessons - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                              }}
                            >
                              <Play className="w-3 h-3 shrink-0" style={{ color: "#6b7280" }} />
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
                <h2
                  className="font-bold text-xl mb-5"
                  style={{ fontFamily: "Poppins, sans-serif", color: "#f9fafb" }}
                >
                  Your Instructor
                </h2>
                <div
                  className="p-6 rounded-2xl flex items-start gap-5"
                  style={{ border: "1px solid rgba(255,255,255,0.08)", background: "#1a1d27" }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0"
                    style={{ background: `linear-gradient(135deg, ${course.gradientFrom}, ${course.gradientTo})` }}
                  >
                    {course.instructor.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-0.5" style={{ fontFamily: "Poppins, sans-serif", color: "#f9fafb" }}>
                      {course.instructor}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: "#0066ff" }}>{course.instructorTitle}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{course.instructorBio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Enroll Card */}
            <div className="lg:col-span-1">
              <div
                className="sticky top-20 rounded-2xl p-6"
                style={{ border: "1px solid rgba(255,255,255,0.1)", background: "#1a1d27", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}
              >
                {/* Preview */}
                <div
                  className="h-40 rounded-xl flex items-center justify-center mb-5 overflow-hidden relative"
                  style={{ background: `linear-gradient(135deg, ${course.gradientFrom}, ${course.gradientTo})` }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)" }}
                  />
                  <span className="text-6xl relative z-10">{course.emoji}</span>
                </div>

                <div
                  className="font-bold mb-1"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "2rem", color: "#f9fafb" }}
                >
                  ₹{course.price.toLocaleString()}
                </div>
                <p className="text-xs mb-4" style={{ color: "#6b7280" }}>One-time payment · Lifetime access</p>

                {enrollError && (
                  <p className="text-xs mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                    {enrollError}
                  </p>
                )}

                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all mb-3"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    background: enrolling ? "#0052cc" : "#0066ff",
                    boxShadow: "0 8px 24px rgba(0,102,255,0.35)",
                    opacity: enrolling ? 0.8 : 1,
                  }}
                >
                  {enrolling ? "Processing..." : "Enroll Now"}
                </button>

                <div className="flex items-center justify-center gap-1.5 mb-5 text-xs" style={{ color: "#6b7280" }}>
                  <Shield className="w-3.5 h-3.5" />
                  30-day money-back guarantee
                </div>

                {/* Course details */}
                <div className="space-y-2.5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.25rem" }}>
                  {[
                    { label: "Duration", value: course.duration },
                    { label: "Level", value: course.level },
                    { label: "Students", value: course.students.toLocaleString() },
                    { label: "Certificate", value: "✓ Included", valueColor: "#34d399" },
                    { label: "Access", value: "Lifetime" },
                  ].map(({ label, value, valueColor }) => (
                    <div key={label} className="flex justify-between text-xs">
                      <span style={{ color: "#6b7280" }}>{label}</span>
                      <span style={{ color: valueColor ?? "#f9fafb", fontWeight: 500 }}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Perks */}
                <div className="mt-5 space-y-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.25rem" }}>
                  {[
                    { icon: BookOpen, text: "Full course access" },
                    { icon: Zap, text: "AI tutor support" },
                    { icon: Award, text: "Completion certificate" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs" style={{ color: "#9ca3af" }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: "#0066ff" }} />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
