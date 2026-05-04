"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const LogoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const NAV_LINKS = [
  { label: "Courses", href: "/courses" },
  { label: "Workshop", href: "/workshop" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isDark = !mounted || theme === "dark";

  const navBg = scrolled
    ? isDark ? "rgba(6,9,18,0.92)" : "rgba(248,250,252,0.92)"
    : "transparent";
  const navBorder = scrolled
    ? isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.08)"
    : "1px solid transparent";
  const textColor = isDark ? "#94a3b8" : "#475569";
  const bgColor = isDark ? "#060912" : "#f8fafc";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: navBg, borderBottom: navBorder,
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img
            src="/logo.png"
            alt="YesDo Edutech"
            style={{ width: 40, height: 40, borderRadius: 8, objectFit: "contain" }}
          />
          <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.05rem", color: isDark ? "#f1f5f9" : "#0f172a" }}>
            YesDo <span className="gt-blue">Edutech</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} style={{
              padding: "7px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500,
              color: textColor, textDecoration: "none", transition: "all 0.18s",
            }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = isDark ? "#f1f5f9" : "#0f172a"; el.style.background = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = textColor; el.style.background = "transparent"; }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Theme toggle — premium switch */}
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label="Toggle theme"
              style={{
                width: 52, height: 28, borderRadius: 999, border: "none", cursor: "pointer",
                background: isDark
                  ? "linear-gradient(135deg,#1e3a8a,#2563eb)"
                  : "linear-gradient(135deg,#fbbf24,#f59e0b)",
                position: "relative", transition: "background 0.4s ease",
                boxShadow: isDark
                  ? "0 0 12px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.1)"
                  : "0 0 12px rgba(251,191,36,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
                flexShrink: 0,
              }}
            >
              {/* Sliding circle */}
              <span style={{
                position: "absolute",
                top: 3,
                left: isDark ? 27 : 3,
                width: 22, height: 22, borderRadius: "50%",
                background: "#fff",
                transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
              }}>
                {isDark
                  ? <svg width="12" height="12" viewBox="0 0 24 24" fill="#1e3a8a"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                  : <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="21" x2="12" y2="23" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="12" x2="3" y2="12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/><line x1="21" y1="12" x2="23" y2="12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/></svg>
                }
              </span>
            </button>
          )}

          {/* Auth — desktop */}
          <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {user ? (
              <>
                <Link href="/dashboard" style={{ padding: "7px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500, color: textColor, textDecoration: "none" }}>
                  Dashboard
                </Link>
                <button onClick={logout} style={{
                  padding: "7px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.12)",
                  background: "transparent", color: textColor, cursor: "pointer",
                }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" style={{ padding: "7px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500, color: textColor, textDecoration: "none" }}>
                  Login
                </Link>
                <Link href="/signup" style={{
                  padding: "8px 18px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                  background: "#2563eb", color: "#fff", textDecoration: "none",
                  fontFamily: "Poppins, sans-serif",
                  boxShadow: "0 4px 14px rgba(37,99,235,0.4)",
                  transition: "all 0.18s",
                }}>
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu btn */}
          <button
            className="nav-mobile-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ width: 36, height: 36, borderRadius: 8, display: "none", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", color: textColor, cursor: "pointer" }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          borderTop: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.08)",
          background: bgColor, padding: "12px 24px 20px",
        }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
              display: "block", padding: "10px 12px", borderRadius: 8, fontSize: 14,
              color: textColor, textDecoration: "none",
            }}>
              {l.label}
            </Link>
          ))}
          <div style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)", marginTop: 8, paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} style={{ padding: "10px 12px", fontSize: 14, color: textColor, textDecoration: "none" }}>Dashboard</Link>
                <button onClick={logout} style={{ padding: "10px 12px", fontSize: 14, color: "#ef4444", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} style={{ padding: "10px 12px", fontSize: 14, color: textColor, textDecoration: "none" }}>Login</Link>
                <Link href="/signup" onClick={() => setMenuOpen(false)} style={{
                  padding: "11px 12px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                  background: "#2563eb", color: "#fff", textDecoration: "none", textAlign: "center",
                }}>
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
