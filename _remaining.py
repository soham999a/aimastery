import os

# ── 1. Course Reviews Component ──
os.makedirs("ar-ai-mastery/components/ui", exist_ok=True)
reviews_code = '''"use client";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

interface Review { id: string; userName: string; rating: number; text: string; createdAt: string; }

const StarFilled = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const StarEmpty = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;

function StarRating({ value, onChange, readonly = false }: { value: number; onChange?: (v: number) => void; readonly?: boolean }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ cursor: readonly ? "default" : "pointer", color: "var(--text-muted)" }}
          onClick={() => !readonly && onChange?.(i)}
          onMouseEnter={() => !readonly && setHover(i)}
          onMouseLeave={() => !readonly && setHover(0)}
        >
          {(hover || value) >= i ? <StarFilled /> : <StarEmpty />}
        </span>
      ))}
    </div>
  );
}

export default function CourseReviews({ courseId }: { courseId: string }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getDocs(query(collection(db, "reviews"), where("courseId", "==", courseId), orderBy("createdAt", "desc"), limit(20)))
      .then(snap => setReviews(snap.docs.map(d => ({ id: d.id, ...d.data() } as Review))))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [courseId]);

  async function submitReview() {
    if (!user) return setError("Please log in to leave a review.");
    if (rating === 0) return setError("Please select a rating.");
    if (!text.trim()) return setError("Please write a review.");
    setSubmitting(true); setError("");
    try {
      const review = { courseId, userId: user.uid, userName: user.displayName ?? "Anonymous", rating, text: text.trim(), createdAt: new Date().toISOString() };
      const ref = await addDoc(collection(db, "reviews"), review);
      setReviews(prev => [{ id: ref.id, ...review }, ...prev]);
      setSubmitted(true); setRating(0); setText("");
    } catch { setError("Failed to submit review. Please try again."); }
    finally { setSubmitting(false); }
  }

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--text-h)" }}>
          Student Reviews
        </h2>
        {avgRating && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#facc15" }}>{avgRating}</span>
            <StarRating value={Math.round(parseFloat(avgRating))} readonly />
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>({reviews.length} reviews)</span>
          </div>
        )}
      </div>

      {/* Write review */}
      {!submitted ? (
        <div style={{ padding: 20, borderRadius: 14, border: "1px solid var(--border)", background: "var(--bg-card)", marginBottom: 24 }}>
          <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--text-h)", marginBottom: 12 }}>Write a Review</h3>
          {error && <p style={{ fontSize: 12, color: "#f87171", marginBottom: 10, padding: "8px 12px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>{error}</p>}
          <div style={{ marginBottom: 12 }}>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>Your rating</p>
            <StarRating value={rating} onChange={setRating} />
          </div>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Share your experience with this course..." rows={3} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg-input)", color: "var(--text-h)", fontSize: 13, outline: "none", resize: "none", fontFamily: "inherit", marginBottom: 10 }} />
          <button onClick={submitReview} disabled={submitting} style={{ padding: "9px 20px", borderRadius: 10, background: "var(--brand)", color: "#fff", border: "none", cursor: submitting ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 600, opacity: submitting ? 0.7 : 1 }}>
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      ) : (
        <div style={{ padding: 16, borderRadius: 12, border: "1px solid rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.06)", marginBottom: 24, fontSize: 13, color: "#4ade80", fontWeight: 500 }}>
          Thank you for your review!
        </div>
      )}

      {/* Reviews list */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[1,2,3].map(i => <div key={i} style={{ height: 80, borderRadius: 12, background: "var(--border)", animation: "shimmer 1.5s infinite", backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg,var(--border) 25%,rgba(255,255,255,0.06) 50%,var(--border) 75%)" }} />)}
        </div>
      ) : reviews.length === 0 ? (
        <p style={{ color: "var(--text-muted)", fontSize: 14, textAlign: "center", padding: "32px 0" }}>No reviews yet. Be the first to review this course!</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {reviews.map(r => (
            <div key={r.id} style={{ padding: 18, borderRadius: 14, border: "1px solid var(--border)", background: "var(--bg-card)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700 }}>
                    {r.userName.slice(0,2).toUpperCase()}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-h)" }}>{r.userName}</p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                </div>
                <StarRating value={r.rating} readonly />
              </div>
              <p style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.65 }}>{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
'''
with open("ar-ai-mastery/components/ui/CourseReviews.tsx", "w", encoding="utf-8") as f:
    f.write(reviews_code)
print("reviews component done")

# ── 2. Referral System ──
referral_code = '''"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

function generateReferralCode(uid: string): string {
  return "AIM" + uid.slice(0, 6).toUpperCase();
}

export default function ReferralWidget() {
  const { user } = useAuth();
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    const refCode = generateReferralCode(user.uid);
    setCode(refCode);
    getDoc(doc(db, "users", user.uid)).then(snap => {
      const data = snap.data();
      if (!data?.referralCode) {
        updateDoc(doc(db, "users", user.uid), { referralCode: refCode }).catch(() => {});
      }
      setReferralCount(data?.referralCount ?? 0);
    }).catch(() => {});
  }, [user]);

  if (!user || !code) return null;

  const referralLink = `${typeof window !== "undefined" ? window.location.origin : "https://aimastery.vercel.app"}/signup?ref=${code}`;

  function copy() {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{ padding: 20, borderRadius: 16, border: "1px solid rgba(37,99,235,0.25)", background: "rgba(37,99,235,0.04)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(37,99,235,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        </div>
        <div>
          <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--text-h)", marginBottom: 1 }}>Refer & Earn</h3>
          <p style={{ fontSize: 11, color: "var(--text-muted)" }}>You and your friend both get 20% off</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <input readOnly value={referralLink} style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-input)", color: "var(--text-muted)", fontSize: 11, outline: "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} />
        <button onClick={copy} style={{ padding: "8px 14px", borderRadius: 8, background: copied ? "rgba(74,222,128,0.15)" : "var(--brand)", color: copied ? "#4ade80" : "#fff", border: copied ? "1px solid rgba(74,222,128,0.3)" : "none", cursor: "pointer", fontSize: 12, fontWeight: 600, flexShrink: 0, transition: "all 0.2s" }}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Your code:</span>
        <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 13, color: "var(--brand)", background: "rgba(37,99,235,0.1)", padding: "2px 8px", borderRadius: 6 }}>{code}</span>
        {referralCount > 0 && <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 8 }}>{referralCount} referral{referralCount > 1 ? "s" : ""}</span>}
      </div>
    </div>
  );
}
'''
with open("ar-ai-mastery/components/ui/ReferralWidget.tsx", "w", encoding="utf-8") as f:
    f.write(referral_code)
print("referral widget done")

# ── 3. Error Boundary ──
error_boundary = '''"use client";
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
'''
with open("ar-ai-mastery/components/ui/ErrorBoundary.tsx", "w", encoding="utf-8") as f:
    f.write(error_boundary)
print("error boundary done")

# ── 4. Handle referral code on signup ──
# Update AuthContext to check for referral code in URL
print("all components done")
