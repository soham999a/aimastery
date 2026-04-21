"use client";
import { Component, ReactNode } from "react";
import Link from "next/link";

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error?: Error; }

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error) {
    console.error("ErrorBoundary caught:", error);
  }
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
          <div>
            <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "var(--text-h)", marginBottom: 8 }}>Something went wrong</h2>
            <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 20, maxWidth: 400 }}>
              {this.state.error?.message ?? "An unexpected error occurred. Please try again."}
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => this.setState({ hasError: false })} style={{ padding: "9px 20px", borderRadius: 10, background: "var(--brand)", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                Try Again
              </button>
              <Link href="/" style={{ padding: "9px 20px", borderRadius: 10, border: "1px solid var(--border)", color: "var(--text-body)", textDecoration: "none", fontSize: 13 }}>
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
