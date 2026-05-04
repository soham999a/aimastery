import os

# Update workshop page data for YesDo
path = "ar-ai-mastery/app/workshop/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Update key strings
replacements = [
    ("FREE 3-Hour Live AI Workshop", "School / College Partnership · 2026-27"),
    ("AI Won&apos;t Replace You.", "Empowering Tomorrow&apos;s Leaders"),
    ("A Person Using AI Will.", "with AI & Industry Skills"),
    ("Join 50,000+ professionals in a FREE 3-hour live workshop. Learn practical AI workflows that save you 2+ hours every single day — no coding required.", "A complete, hands-on AI education programme designed exclusively for students. We bring the future into your classroom — no infrastructure needed."),
    ("4.8/5", "4.9/5"),
    ("by 50,000+ professionals", "by students across Kolkata"),
    ("Only 47 seats remaining. Register now before it fills up.", "Limited partnership slots available for 2026-27 academic year."),
    ("Only {seats} seats remaining", "Limited slots for 2026-27"),
    ("Only {seats} seats left!", "Limited partnership slots!"),
    ("REGISTER FREE NOW", "PARTNER WITH US NOW"),
    ("Register Free Now", "Partner With Us"),
    ("50,000+", "1,200+"),
    ("Professionals Trained", "Students Enrolled"),
    ("Registration Fee", "Flagship Fee"),
    ("Rs.0", "Rs.10,000"),
    ("This workshop is for:", "This programme is for:"),
    ("This workshop is NOT for you if...", "This programme is NOT for you if..."),
    ("This workshop IS for you if...", "This programme IS for you if..."),
    ("AI Mastery Tutor", "YesDo Edutech Advisor"),
    ("AI Mastery", "YesDo Edutech"),
]

for old, new in replacements:
    content = content.replace(old, new)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("workshop updated")

# Update sitemap with YesDo domain
sitemap_path = "ar-ai-mastery/public/sitemap.xml"
sitemap = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://yesdo.co.in/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://yesdo.co.in/courses</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://yesdo.co.in/workshop</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://yesdo.co.in/courses/ai-mastery-complete</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://yesdo.co.in/courses/learn-ai-python</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://yesdo.co.in/courses/data-analytics</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://yesdo.co.in/courses/python-fullstack</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://yesdo.co.in/courses/microsoft-certification</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://yesdo.co.in/courses/alteryx-certification</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://yesdo.co.in/contact</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
</urlset>"""
with open(sitemap_path, "w", encoding="utf-8") as f:
    f.write(sitemap)
print("sitemap updated")

# Update robots.txt
robots = """User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /admin
Disallow: /api/

Sitemap: https://yesdo.co.in/sitemap.xml"""
with open("ar-ai-mastery/public/robots.txt", "w", encoding="utf-8") as f:
    f.write(robots)
print("robots updated")

# Update env app name
env_path = "ar-ai-mastery/.env.local"
with open(env_path, "r", encoding="utf-8") as f:
    env = f.read()
env = env.replace("NEXT_PUBLIC_APP_NAME=AI Mastery", "NEXT_PUBLIC_APP_NAME=YesDo Edutech")
env = env.replace("NEXT_PUBLIC_APP_URL=http://localhost:3000", "NEXT_PUBLIC_APP_URL=http://localhost:3000")
with open(env_path, "w", encoding="utf-8") as f:
    f.write(env)
print("env updated")
