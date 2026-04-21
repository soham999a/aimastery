"use client";
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
