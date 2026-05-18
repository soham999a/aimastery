import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & ML Courses | YesDo Edutech — Python, Deep Learning, Data Analytics",
  description:
    "Browse YesDo Edutech's full course catalog. Python, Machine Learning, Deep Learning, Data Analytics, Power BI, Microsoft Certification, and more. 100% practical. Based in Kolkata.",
  alternates: { canonical: "/courses" },
  openGraph: {
    title: "AI & ML Courses | YesDo Edutech",
    description: "6+ expert-led courses in AI, ML, Python, Data Analytics, and certifications. 100% practical. Enroll from ₹7,000.",
    type: "website",
    images: [{ url: "/api/og?title=AI+%26+ML+Courses&instructor=YesDo+Edutech&price=7000", width: 1200, height: 630 }],
  },
};
