# Add shimmer animation to globals.css
path = "ar-ai-mastery/app/globals.css"
with open(path, "r", encoding="utf-8") as f:
    css = f.read()

if "shimmer" not in css:
    addition = """
/* Shimmer animation for skeletons */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .dashboard-layout { flex-direction: column !important; }
  .dashboard-sidebar { width: 100% !important; height: auto !important; position: relative !important; flex-direction: row !important; flex-wrap: wrap !important; padding: 12px !important; }
  .dashboard-main { margin-left: 0 !important; }
  .hide-mobile { display: none !important; }
  .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
  .course-grid { grid-template-columns: 1fr !important; }
}

/* Button micro-interactions */
.btn-primary {
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 12px 32px rgba(37,99,235,0.45); }
.btn-primary:active { transform: translateY(0); }

/* Card micro-interactions */
.card { transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease; }
.card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(37,99,235,0.12); border-color: rgba(37,99,235,0.3) !important; }
"""
    with open(path, "a", encoding="utf-8") as f:
        f.write(addition)
    print("globals updated")
else:
    print("already has shimmer")
