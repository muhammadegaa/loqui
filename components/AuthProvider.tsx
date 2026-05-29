"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuthClient, getDb } from "@/lib/firebase";
import { AuthModal } from "./AuthModal";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  signInGoogle: () => Promise<void>;
  signInEmail: (email: string, pw: string) => Promise<void>;
  signUpEmail: (email: string, pw: string) => Promise<void>;
  signOut: () => Promise<void>;
  promptAuth: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

// Record the signup so we have a list of users (Firestore: users/{uid}).
async function recordUser(user: User, provider: string) {
  await setDoc(
    doc(getDb(), "users", user.uid),
    {
      email: user.email,
      displayName: user.displayName ?? null,
      provider,
      lastSeen: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => onAuthStateChanged(getAuthClient(), (u) => {
    setUser(u);
    setLoading(false);
  }), []);

  const promptAuth = () => setModalOpen(true);

  const signInGoogle = async () => {
    const res = await signInWithPopup(getAuthClient(), new GoogleAuthProvider());
    await recordUser(res.user, "google");
  };
  const signInEmail = async (email: string, pw: string) => {
    const res = await signInWithEmailAndPassword(getAuthClient(), email, pw);
    await recordUser(res.user, "email");
  };
  const signUpEmail = async (email: string, pw: string) => {
    const res = await createUserWithEmailAndPassword(getAuthClient(), email, pw);
    await recordUser(res.user, "email");
  };
  const signOut = () => fbSignOut(getAuthClient());

  return (
    <Ctx.Provider value={{ user, loading, signInGoogle, signInEmail, signUpEmail, signOut, promptAuth }}>
      {children}
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
