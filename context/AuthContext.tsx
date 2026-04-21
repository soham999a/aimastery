"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(email: string, password: string, name: string) {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });

    // Check for referral code in sessionStorage (set by signup page)
    const referredBy = typeof window !== "undefined" ? sessionStorage.getItem("referral_code") : null;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      createdAt: new Date().toISOString(),
      enrolledCourses: [],
      subscriptionTier: "free",
      referralCode: "AIM" + user.uid.slice(0, 6).toUpperCase(),
      referralCount: 0,
      ...(referredBy ? { referredBy } : {}),
    });

    // Credit the referrer
    if (referredBy) {
      sessionStorage.removeItem("referral_code");
      // Find user with this referral code and increment their count
      try {
        const { getDocs, query, collection, where, updateDoc, increment } = await import("firebase/firestore");
        const snap = await getDocs(query(collection(db, "users"), where("referralCode", "==", referredBy)));
        if (!snap.empty) {
          await updateDoc(snap.docs[0].ref, { referralCount: (snap.docs[0].data().referralCount ?? 0) + 1 });
        }
      } catch {}
    }
  }

  async function signInWithGoogle() {
    const { user } = await signInWithPopup(auth, googleProvider);
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: new Date().toISOString(),
        enrolledCourses: [],
        subscriptionTier: "free",
      });
    }
  }

  async function logout() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
