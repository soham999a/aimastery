import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let adminDbInstance: ReturnType<typeof getFirestore> | null = null;
let adminInitialized = false;

try {
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (clientEmail && privateKey) {
      const app = initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
      });
      adminDbInstance = getFirestore(app);
      adminInitialized = true;
    }
  } else {
    adminDbInstance = getFirestore(getApps()[0]);
    adminInitialized = true;
  }
} catch (e) {
  console.warn("Firebase Admin init failed (server-side Firestore writes disabled):", e);
}

export { adminInitialized };
export const adminDb = adminDbInstance;
