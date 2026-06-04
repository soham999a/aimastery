import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

const StarIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const ClockIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const UsersIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const ArrowRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

const COURSES = [
  { id: "ai-mastery-complete", title: "AI Mastery Flagship Course — 27 Modules", instructor: "YesDo Edutech Faculty", level: "Beginner to Advanced", duration: "27 modules", students: 1200, rating: 4.9, price: 10000, tag: "Flagship", tagColor: "#d97706" },
];

export default function FeaturedCourses() {
  return (
    <section style={{ background: "var(--bg-surface)", padding: "96px 0" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ color: "#2563eb", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Featured Courses</p>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.5rem,5vw,2.25rem)", fontWeight: 800, color: "var(--text-h)", lineHeight: 1.2 }}>
              Start with the <span className="gt-blue">best</span>
            </h2>
            <p style={{ color: "var(--text-body)", marginTop: 8, fontSize: "0.9rem" }}>Curated by industry experts. Practical, project-based learning.</p>
          </div>
          <Link href="/courses" style={{ display: "flex", alignItems: "center", gap: 6, color: "#2563eb", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
            View all courses <ArrowRight />
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          {COURSES.map((course, i) => (
            <FadeIn key={course.id} delay={i * 0.1} direction="up">
              <Link href={`/courses/${course.id}`} className="card" style={{ display: "flex", flexDirection: "column", borderRadius: 20, overflow: "hidden", border: "1px solid var(--border-card)", background: "var(--bg-card)", textDecoration: "none", height: "100%" }}>
                <div style={{ height: 180, position: "relative", overflow: "hidden", background: "#0a0f1e" }}>
                  <img
                    src="/AI%20mastery%20flagship%20course%20banner.png"
                    alt="AI Mastery Flagship Course"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <span style={{ position: "absolute", top: 12, left: 12, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, background: "rgba(0,0,0,0.4)", color: course.tagColor, backdropFilter: "blur(8px)", border: `1px solid ${course.tagColor}40` }}>
                    {course.tag}
                  </span>
                </div>

                <div style={{ padding: 22, display: "flex", flexDirection: "column", flex: 1 }}>
                  <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: "rgba(37,99,235,0.1)", color: "#2563eb", border: "1px solid rgba(37,99,235,0.2)", marginBottom: 12, width: "fit-content" }}>
                    {course.level}
                  </span>
                  <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.95rem", color: "var(--text-h)", marginBottom: 6, lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {course.title}
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>{course.instructor}</p>

                  <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--text-muted)", marginBottom: 18 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><StarIcon /><span style={{ color: "var(--text-body)", fontWeight: 500 }}>{course.rating}</span></span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><ClockIcon />{course.duration}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><UsersIcon />{course.students.toLocaleString()}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--divider)" }}>
                    <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "var(--text-h)" }}>₹{course.price.toLocaleString()}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, padding: "8px 18px", borderRadius: 8, background: "#2563eb", color: "#fff", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}>Enroll Now</span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
