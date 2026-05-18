import type { MetadataRoute } from "next";
import { ALL_COURSES } from "@/lib/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://yesdo.co.in";
  const courses = ALL_COURSES.map(c => ({
    url: `${base}/courses/${c.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [
    { url: base,                      lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${base}/courses`,         lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/workshop`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/about`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`,            lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/contact`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy`,         lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    ...courses,
  ];
}
