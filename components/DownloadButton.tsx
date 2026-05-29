"use client";

import { useState } from "react";
import { Download, Check, Clock, Loader2 } from "lucide-react";
import { useAuth } from "./AuthProvider";

// Flip NEXT_PUBLIC_DOWNLOAD_READY to "true" once R2 + the Firebase service
// account are wired on Vercel. Until then the button shows "coming soon"
// instead of hitting an unconfigured endpoint.
const READY = process.env.NEXT_PUBLIC_DOWNLOAD_READY === "true";

export function DownloadButton({
  size = "md",
  className = "",
}: {
  size?: "md" | "lg";
  className?: string;
}) {
  const { user, promptAuth } = useAuth();
  const signedIn = !!user;
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onClick = async () => {
    if (!signedIn) {
      promptAuth();
      return;
    }
    if (!READY || busy) return;
    setBusy(true);
    setMsg(null);
    try {
      const token = await user!.getIdToken();
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const { url } = await res.json();
        window.location.href = url; // 60s signed URL, downloads from R2
      } else if (res.status === 429) {
        setMsg("Daily limit reached. Try again tomorrow.");
      } else {
        setMsg("Download isn't ready yet.");
      }
    } catch {
      setMsg("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const pad = size === "lg" ? "px-8 py-4 text-[16px]" : "px-7 py-[15px] text-[15.5px]";
  const iconSize = size === "lg" ? 18 : 17;

  let label: string;
  let Icon = Download;
  if (!signedIn) {
    label = "Sign up to download";
    Icon = Check;
  } else if (!READY) {
    label = "Download coming soon";
    Icon = Clock;
  } else if (busy) {
    label = "Preparing your download…";
    Icon = Loader2;
  } else {
    label = "Download for Mac";
    Icon = Download;
  }

  const dimmed = signedIn && !READY;

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onClick}
        disabled={dimmed || busy}
        title="After downloading, right-click the app and choose Open the first time."
        className={`brand-grad inline-flex items-center gap-2.5 rounded-[13px] font-semibold text-[#04121a] shadow-[0_10px_34px_rgba(34,211,238,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(34,211,238,0.45)] ${pad} ${className} ${dimmed ? "cursor-default opacity-70 hover:translate-y-0" : ""}`}
      >
        <Icon size={iconSize} className={busy ? "animate-spin" : ""} />
        {label}
      </button>
      {msg && <span className="text-[12px] text-[var(--color-faint)]">{msg}</span>}
    </div>
  );
}
