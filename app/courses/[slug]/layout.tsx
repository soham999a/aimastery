import type { Metadata } from "next";
import { getCourseById } from "@/lib/courses";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseById(slug);
  if (!course) return { title: "Course Not Found | AI Mastery" };
  return {
    title: `${course.title} | AI Mastery`,
    description: course.description,
    keywords: [course.title, course.instructor, course.category, "AI course", "online learning", "India"],
    openGraph: {
      title: course.title,
      description: course.description,
      type: "website",
      images: [{ url: `/api/og?title=${encodeURIComponent(course.title)}&instructor=${encodeURIComponent(course.instructor)}&price=${course.price}`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: course.title, description: course.description },
  };
}

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
