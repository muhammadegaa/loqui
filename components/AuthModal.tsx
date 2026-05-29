"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Loader2 } from "lucide-react";
import { useAuth } from "./AuthProvider";

export function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { signInGoogle, signInEmail, signUpEmail } = useAuth();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const run = async (fn: () => Promise<void>) => {
    setErr(null);
    setBusy(true);
    try {
      await fn();
      onClose();
    } catch (e) {
      setErr(friendly(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.95, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="relative w-full max-w-[400px] rounded-[20px] border border-[var(--color-hair)] bg-[var(--color-ink2)] p-7"
            style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.6)" }}
          >
            <button onClick={onClose} className="absolute right-5 top-5 text-[var(--color-faint)] transition hover:text-[var(--color-text)]">
              <X size={18} />
            </button>

            <h2 className="mb-1.5 text-[22px] font-semibold tracking-tight">
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h2>
            <p className="mb-6 text-[13.5px] text-[var(--color-muted)]">
              {mode === "signup"
                ? "Create an account to download Loqui."
                : "Sign in to get the download."}
            </p>

            <button
              onClick={() => run(signInGoogle)}
              disabled={busy}
              className="mb-3 flex w-full items-center justify-center gap-2.5 rounded-[11px] border border-[var(--color-hair)] bg-white/5 py-3 text-[14px] font-medium transition hover:bg-white/10 disabled:opacity-50"
            >
              <GoogleG /> Continue with Google
            </button>

            <div className="my-4 flex items-center gap-3 text-[11px] text-[var(--color-faint)]">
              <div className="h-px flex-1 bg-[var(--color-hair)]" /> or <div className="h-px flex-1 bg-[var(--color-hair)]" />
            </div>

            <div className="space-y-2.5">
              <input
                type="email" placeholder="you@email.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[11px] border border-[var(--color-hair)] bg-black/30 px-4 py-3 text-[14px] outline-none placeholder:text-[var(--color-faint)] focus:border-[var(--color-c2)]"
              />
              <input
                type="password" placeholder="Password" value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full rounded-[11px] border border-[var(--color-hair)] bg-black/30 px-4 py-3 text-[14px] outline-none placeholder:text-[var(--color-faint)] focus:border-[var(--color-c2)]"
              />
            </div>

            {err && <p className="mt-3 text-[12.5px] text-[#FF9F0A]">{err}</p>}

            <button
              onClick={() => run(() => (mode === "signup" ? signUpEmail(email, pw) : signInEmail(email, pw)))}
              disabled={busy || !email || pw.length < 6}
              className="brand-grad mt-4 flex w-full items-center justify-center gap-2 rounded-[11px] py-3 text-[14.5px] font-semibold text-[#04121a] transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
            >
              {busy ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
              {mode === "signup" ? "Sign up with email" : "Sign in"}
            </button>

            <p className="mt-5 text-center text-[13px] text-[var(--color-muted)]">
              {mode === "signup" ? "Already have an account?" : "New here?"}{" "}
              <button
                onClick={() => { setErr(null); setMode(mode === "signup" ? "login" : "signup"); }}
                className="brand-grad-text font-semibold"
              >
                {mode === "signup" ? "Sign in" : "Create one"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GoogleG() {
  return (
    <svg width="17" height="17" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.5 0 10.4-2.1 14.1-5.5l-6.5-5.5c-2 1.5-4.7 2.5-7.6 2.5-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.5l6.5 5.5c-.5.4 7-5 7-15 0-1.3-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

function friendly(e: unknown): string {
  const code = (e as { code?: string })?.code ?? "";
  if (code.includes("email-already-in-use")) return "That email already has an account — try signing in.";
  if (code.includes("invalid-credential") || code.includes("wrong-password")) return "Wrong email or password.";
  if (code.includes("weak-password")) return "Password should be at least 6 characters.";
  if (code.includes("popup-closed")) return "Google sign-in was cancelled.";
  if (code.includes("invalid-email")) return "That doesn't look like a valid email.";
  return "Something went wrong. Please try again.";
}
