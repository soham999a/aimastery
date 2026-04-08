import Link from "next/link";

const LogoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const YouTubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const LINKS = {
  Platform: [
    { label: "Courses", href: "/courses" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Certifications", href: "#" },
    { label: "Community", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Contact", href: "/contact" },
  ],
};

const SOCIALS = [
  { label: "X (Twitter)", Icon: TwitterIcon, href: "#" },
  { label: "LinkedIn", Icon: LinkedInIcon, href: "#" },
  { label: "YouTube", Icon: YouTubeIcon, href: "#" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}>      {/* CTA Banner */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container" style={{ padding: "64px 24px" }}>
          <div style={{
            position: "relative", borderRadius: 24, padding: "48px 40px", overflow: "hidden",
            background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #4f46e5 100%)",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 75% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)" }} />
            <div style={{ position: "relative", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
              <div>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "#fff", marginBottom: 8 }}>
                  Ready to start your journey?
                </h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem" }}>
                  Join 50,000+ learners building careers in AR & AI.
                </p>
              </div>
              <Link href="/signup" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "13px 24px", borderRadius: 10, background: "#fff",
                color: "#1d4ed8", fontFamily: "Poppins, sans-serif", fontWeight: 700,
                fontSize: 14, textDecoration: "none", flexShrink: 0,
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              }}>
                Get Started Free <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container" style={{ padding: "56px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
              }}>
                <LogoIcon />
              </div>
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#f1f5f9" }}>
                AI <span className="gt-blue">Mastery</span>
              </span>
            </Link>
            <p style={{ fontSize: "0.875rem", color: "var(--text-body)", lineHeight: 1.7, maxWidth: 280, marginBottom: 24 }}>
              India's most comprehensive platform for AR, AI, and emerging tech education. From beginners to enterprise teams.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {SOCIALS.map(({ label, Icon, href }) => (
                <a key={label} href={href} aria-label={label} style={{
                  width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)",
                  color: "#475569", textDecoration: "none", transition: "all 0.18s",
                }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <h4 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "var(--text-h)", marginBottom: 18 }}>
                {section}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} style={{ fontSize: "0.875rem", color: "var(--text-muted)", textDecoration: "none" }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <p style={{ fontSize: 12, color: "var(--text-faint)" }}>© 2025 AI Mastery. All rights reserved.</p>
          <p style={{ fontSize: 12, color: "var(--text-faint)" }}>Made in India for the world.</p>
        </div>
      </div>
    </footer>
  );
}
