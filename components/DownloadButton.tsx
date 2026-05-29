"use client";

import { Download, Check } from "lucide-react";
import { useAuth } from "./AuthProvider";

// Where the signed bundle will live once notarized + released.
const DOWNLOAD_URL = "https://github.com/muhammadegaa/loqui/releases/latest";

export function DownloadButton({
  size = "md",
  className = "",
}: {
  size?: "md" | "lg";
  className?: string;
}) {
  const { user, promptAuth } = useAuth();
  const signedIn = !!user;

  const onClick = () => {
    if (!signedIn) {
      promptAuth();
      return;
    }
    window.open(DOWNLOAD_URL, "_blank");
  };

  const pad = size === "lg" ? "px-8 py-4 text-[16px]" : "px-7 py-[15px] text-[15.5px]";

  return (
    <button
      onClick={onClick}
      className={`brand-grad inline-flex items-center gap-2.5 rounded-[13px] font-semibold text-[#04121a] shadow-[0_10px_34px_rgba(34,211,238,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(34,211,238,0.45)] ${pad} ${className}`}
    >
      {signedIn ? <Download size={size === "lg" ? 18 : 17} /> : <Check size={size === "lg" ? 18 : 17} />}
      {signedIn ? "Download for Mac" : "Sign up to download"}
    </button>
  );
}
