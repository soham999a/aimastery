path = "ar-ai-mastery/app/courses/[slug]/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

marker = '"use client";'
idx = content.find(marker)
if idx > 0:
    content = content[idx:]
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("fixed, removed", idx, "chars from start")
else:
    print("already clean")
