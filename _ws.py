import os

path = 'ar-ai-mastery/app/workshop/page.tsx'

# Read current content
with open(path, 'r', encoding='utf-8') as f:
    current = f.read()

# Check if already complete
if 'export default function WorkshopPage' in current:
    print('already has main component, size:', os.path.getsize(path))
else:
    print('needs completion, size:', os.path.getsize(path))
    print('last 200 chars:', repr(current[-200:]))
