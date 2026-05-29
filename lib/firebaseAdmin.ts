import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Server-side Firebase. Reads a service-account JSON from FIREBASE_SERVICE_ACCOUNT
// (paste the whole JSON, or a base64 of it — both work). Used to verify the
// caller's ID token and to log/rate-limit downloads in Firestore.
function loadServiceAccount(): Record<string, string> {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT not set");
  const json = raw.trim().startsWith("{")
    ? raw
    : Buffer.from(raw, "base64").toString("utf8");
  const acct = JSON.parse(json);
  // Vercel env vars collapse real newlines; restore them in the private key.
  if (acct.private_key) acct.private_key = acct.private_key.replace(/\\n/g, "\n");
  return acct;
}

let app: App | undefined;
function adminApp(): App {
  if (!app) {
    app = getApps().length
      ? getApps()[0]
      : initializeApp({ credential: cert(loadServiceAccount() as never) });
  }
  return app;
}

export const adminAuth = () => getAuth(adminApp());
export const adminDb = () => getFirestore(adminApp());
