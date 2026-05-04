import os, re

# Footer - replace logo div with img
footer_path = "ar-ai-mastery/components/layout/Footer.tsx"
with open(footer_path, "r", encoding="utf-8") as f:
    content = f.read()

# Find and replace the logo section in footer
old = '''            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
              }}>
                <LogoIcon />
              </div>'''
new = '''            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 16 }}>
              <img src="/logo.png" alt="YesDo Edutech" style={{ width: 40, height: 40, borderRadius: 8, objectFit: "contain" }} />'''

if old in content:
    content = content.replace(old, new)
    print("footer logo replaced")
else:
    # Try simpler replacement
    content = content.replace(
        '<LogoIcon />',
        '<img src="/logo.png" alt="YesDo Edutech" style={{ width: 36, height: 36, borderRadius: 8, objectFit: "contain" }} />'
    )
    print("footer LogoIcon replaced")

with open(footer_path, "w", encoding="utf-8") as f:
    f.write(content)

# Login page - replace logo
login_path = "ar-ai-mastery/app/(auth)/login/page.tsx"
with open(login_path, "r", encoding="utf-8") as f:
    content = f.read()
content = content.replace(
    '<LogoIcon />',
    '<img src="/logo.png" alt="YesDo Edutech" style={{ width: 42, height: 42, borderRadius: 10, objectFit: "contain" }} />'
)
# Remove the gradient div wrapper around logo
content = content.replace(
    '''style={{ width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #2563eb, #06b6d4)", boxShadow: "0 4px 16px rgba(37,99,235,0.4)" }}>
                <img src="/logo.png" alt="YesDo Edutech" style={{ width: 42, height: 42, borderRadius: 10, objectFit: "contain" }} />
              </div>''',
    '''style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src="/logo.png" alt="YesDo Edutech" style={{ width: 48, height: 48, borderRadius: 10, objectFit: "contain" }} />
              </div>'''
)
with open(login_path, "w", encoding="utf-8") as f:
    f.write(content)
print("login logo updated")

# Signup page - same
signup_path = "ar-ai-mastery/app/(auth)/signup/page.tsx"
with open(signup_path, "r", encoding="utf-8") as f:
    content = f.read()
content = content.replace(
    '<LogoIcon />',
    '<img src="/logo.png" alt="YesDo Edutech" style={{ width: 42, height: 42, borderRadius: 10, objectFit: "contain" }} />'
)
with open(signup_path, "w", encoding="utf-8") as f:
    f.write(content)
print("signup logo updated")

# Dashboard sidebar logo
dash_path = "ar-ai-mastery/app/(dashboard)/dashboard/page.tsx"
with open(dash_path, "r", encoding="utf-8") as f:
    content = f.read()
# Replace the star SVG logo in sidebar with the real logo
old_logo = """<svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='#fff' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>"""
new_logo = """<img src='/logo.png' alt='YesDo Edutech' style={{width:24,height:24,objectFit:'contain'}}/>"""
content = content.replace(old_logo, new_logo)
# Also update the sidebar logo container
content = content.replace(
    "background:'linear-gradient(135deg,#2563eb,#7c3aed)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0",
    "background:'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0"
)
with open(dash_path, "w", encoding="utf-8") as f:
    f.write(content)
print("dashboard logo updated")

# Also copy logo.png as favicon.png for better browser support
import shutil
shutil.copy("ar-ai-mastery/public/logo.png", "ar-ai-mastery/public/favicon.png")
print("favicon.png created")
