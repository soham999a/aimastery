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
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LINKS = {
  Platform: [
    { label: "Courses", href: "/courses" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Certifications", href: "/about#certifications" },
    { label: "Community", href: "/about#community" },
    { label: "Blog", href: "/blog" },
    { label: "Workshop", href: "/workshop" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/privacy#terms" },
    { label: "Contact", href: "/contact" },
  ],
};

const SOCIALS = [
  { label: "X (Twitter)", Icon: TwitterIcon, href: "https://twitter.com/yesdoedutech" },
  { label: "LinkedIn", Icon: LinkedInIcon, href: "https://linkedin.com/company/yesdoedutech" },
  { label: "YouTube", Icon: YouTubeIcon, href: "https://youtube.com/@yesdoedutech" },
  { label: "Instagram", Icon: InstagramIcon, href: "https://instagram.com/yesdoedutech" },
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
                  Join 1,200+ students building AI careers with YesDo Edutech.
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
              <img src="/logo.png" alt="YesDo Edutech" style={{ width: 40, height: 40, borderRadius: 8, objectFit: "contain" }} />
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#f1f5f9" }}>
                YesDo <span className="gt-blue">Edutech</span>
              </span>
            </Link>
            <p style={{ fontSize: "0.875rem", color: "var(--text-body)", lineHeight: 1.7, maxWidth: 280, marginBottom: 24 }}>
              India's premier AI & Industry Skills Training platform for school and college students. Based in Kolkata, West Bengal. contact@yesdo.co.in | +91 78900 18776
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
          <p style={{ fontSize: 12, color: "var(--text-faint)" }}>© 2026 YesDo Edutech Pvt Ltd. All rights reserved.</p>
          <p style={{ fontSize: 12, color: "var(--text-faint)" }}>Empowering India's next generation with AI & Industry Skills.</p>
        </div>
      </div>
    </footer>
  );
}
