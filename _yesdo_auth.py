import os

# Update login page brand
for path in ["ar-ai-mastery/app/(auth)/login/page.tsx", "ar-ai-mastery/app/(auth)/signup/page.tsx"]:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    content = content.replace("AI <span className=\"gt-blue\">Mastery</span>", "YesDo <span className=\"gt-blue\">Edutech</span>")
    content = content.replace("Start your AI learning journey today", "Start your AI & Industry Skills journey today")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"updated {path}")

# Update dashboard brand
dash_path = "ar-ai-mastery/app/(dashboard)/dashboard/page.tsx"
with open(dash_path, "r", encoding="utf-8") as f:
    content = f.read()
content = content.replace("AI Mastery", "YesDo Edutech")
content = content.replace("AI <span", "YesDo <span")
with open(dash_path, "w", encoding="utf-8") as f:
    f.write(content)
print("dashboard updated")

# Update setup-demo page
demo_path = "ar-ai-mastery/app/setup-demo/page.tsx"
with open(demo_path, "r", encoding="utf-8") as f:
    content = f.read()
content = content.replace("AI Mastery", "YesDo Edutech")
with open(demo_path, "w", encoding="utf-8") as f:
    f.write(content)
print("setup-demo updated")

# Update not-found page
nf_path = "ar-ai-mastery/app/not-found.tsx"
with open(nf_path, "r", encoding="utf-8") as f:
    content = f.read()
content = content.replace("AI Mastery", "YesDo Edutech")
with open(nf_path, "w", encoding="utf-8") as f:
    f.write(content)
print("not-found updated")

# Update admin page
admin_path = "ar-ai-mastery/app/admin/page.tsx"
with open(admin_path, "r", encoding="utf-8") as f:
    content = f.read()
content = content.replace("AI Mastery", "YesDo Edutech")
with open(admin_path, "w", encoding="utf-8") as f:
    f.write(content)
print("admin updated")

# Update contact page
contact_path = "ar-ai-mastery/app/contact/page.tsx"
with open(contact_path, "r", encoding="utf-8") as f:
    content = f.read()
content = content.replace("hello@araimastery.com", "contact@yesdo.co.in")
content = content.replace("+91 98765 43210", "+91 78900 18776")
content = content.replace("Bangalore, India", "Kolkata, West Bengal")
content = content.replace("enterprise@araimastery.com", "contact@yesdo.co.in")
content = content.replace("AI Mastery", "YesDo Edutech")
with open(contact_path, "w", encoding="utf-8") as f:
    f.write(content)
print("contact updated")
