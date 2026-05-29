"use client";

import { Download, Check, Clock } from "lucide-react";
import { useAuth } from "./AuthProvider";

// Set NEXT_PUBLIC_DOWNLOAD_URL to the hosted notarized DMG once it exists.
// Until then the button shows "Download coming soon" instead of a dead link —
// the source repo is private, so GitHub release assets aren't publicly downloadable.
const DOWNLOAD_URL = process.env.NEXT_PUBLIC_DOWNLOAD_URL || "";

export function DownloadButton({
  size = "md",
  className = "",
}: {
  size?: "md" | "lg";
  className?: string;
}) {
  const { user, promptAuth } = useAuth();
  const signedIn = !!user;
  const ready = DOWNLOAD_URL.length > 0;

  const onClick = () => {
    if (!signedIn) {
      promptAuth();
      return;
    }
    if (ready) window.open(DOWNLOAD_URL, "_blank");
  };

  const pad = size === "lg" ? "px-8 py-4 text-[16px]" : "px-7 py-[15px] text-[15.5px]";
  const iconSize = size === "lg" ? 18 : 17;

  let label: string;
  let Icon = Download;
  if (!signedIn) {
    label = "Sign up to download";
    Icon = Check;
  } else if (ready) {
    label = "Download for Mac";
    Icon = Download;
  } else {
    label = "Download coming soon";
    Icon = Clock;
  }

  const dimmed = signedIn && !ready;

  return (
    <button
      onClick={onClick}
      disabled={dimmed}
      className={`brand-grad inline-flex items-center gap-2.5 rounded-[13px] font-semibold text-[#04121a] shadow-[0_10px_34px_rgba(34,211,238,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(34,211,238,0.45)] ${pad} ${className} ${dimmed ? "cursor-default opacity-70 hover:translate-y-0" : ""}`}
    >
      <Icon size={iconSize} />
      {label}
    </button>
  );
}
