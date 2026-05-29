"use client";

import { ShieldQuestion } from "lucide-react";

// Honest explainer for the Gatekeeper warning on un-notarized downloads.
// Reframes the scary "Apple could not verify…" dialog as a known, benign step.
export function FirstLaunchHelp() {
  return (
    <details className="group mx-auto max-w-[520px] rounded-[14px] border border-[var(--color-hair)] bg-[var(--color-panel)] px-5 py-4 text-left backdrop-blur">
      <summary className="flex cursor-pointer list-none items-center gap-2.5 text-[13.5px] font-medium text-[var(--color-muted)] transition hover:text-[var(--color-text)]">
        <ShieldQuestion size={16} className="text-[var(--color-c2)]" />
        First time you open it, macOS shows a warning. Here&rsquo;s why.
      </summary>
      <div className="mt-3 space-y-3 text-[13px] leading-relaxed text-[var(--color-muted)]">
        <p>
          macOS will say it &ldquo;could not verify Loqui is free of malware.&rdquo; That&rsquo;s
          not because anything&rsquo;s wrong, it&rsquo;s because Loqui isn&rsquo;t notarized yet
          (that needs a paid Apple developer account, which we&rsquo;ll add once more people are
          using it). The app is the same either way.
        </p>
        <p className="font-medium text-[var(--color-text)]">To open it the first time:</p>
        <ol className="ml-4 list-decimal space-y-1">
          <li>Open the DMG and drag Loqui into Applications.</li>
          <li>Try to open it once (you&rsquo;ll get the warning). Click <b>Done</b>, not Move to Bin.</li>
          <li>
            Open <b>System Settings → Privacy &amp; Security</b>, scroll down, and click
            <b> Open Anyway</b> next to the Loqui message.
          </li>
        </ol>
        <p className="font-mono text-[12px] text-[var(--color-faint)]">
          Prefer the terminal? xattr -dr com.apple.quarantine /Applications/Loqui.app
        </p>
      </div>
    </details>
  );
}
