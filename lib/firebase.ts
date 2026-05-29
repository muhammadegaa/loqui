import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Lazy, client-only init. Calling getAuth/getFirestore at module load would run
// during Next's static prerender on the server — and a missing key there crashes
// the whole build. These only run when auth is actually used, in the browser.
let app: FirebaseApp | undefined;
function firebaseApp(): FirebaseApp {
  if (!app) app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return app;
}

export const getAuthClient = (): Auth => getAuth(firebaseApp());
export const getDb = (): Firestore => getFirestore(firebaseApp());
