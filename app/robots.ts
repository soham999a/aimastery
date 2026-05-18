import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://yesdo.co.in";
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/dashboard", "/admin", "/api/"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
