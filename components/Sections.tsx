"use client";

import { motion } from "framer-motion";
import { Check, X, Download } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };

export function HowItWorks() {
  const steps = [
    { k: "01", t: "Hold ⌥Space", d: "Press and hold from anywhere — any app, any text field. No window to open." },
    { k: "02", t: "Speak naturally", d: "Talk like a human. Loqui transcribes on-device with Whisper, in real time." },
    { k: "03", t: "Release", d: "Polished text appears at your cursor — filler stripped, punctuation fixed, tone matched to the app." },
  ];
  return (
    <section className="relative z-[2] mx-auto mt-[120px] max-w-[1000px] px-10">
      <motion.h2
        variants={rise} initial="initial" whileInView="animate" viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="mb-3 text-center text-[40px] font-semibold tracking-tight max-md:text-[30px]"
      >
        Faster than typing. <span className="brand-grad-text font-serif italic">Every time.</span>
      </motion.h2>
      <motion.p
        variants={rise} initial="initial" whileInView="animate" viewport={{ once: true }}
        transition={{ duration: 0.6, ease, delay: 0.08 }}
        className="mx-auto mb-14 max-w-[520px] text-center text-[var(--color-muted)]"
      >
        Three seconds from thought to text. No mode-switching, no cleanup.
      </motion.p>
      <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.k}
            variants={rise} initial="initial" whileInView="animate" viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 * i }}
            className="rounded-[20px] border border-[var(--color-hair)] bg-[var(--color-panel)] p-7 backdrop-blur"
          >
            <div className="brand-grad-text mb-4 font-mono text-[28px] font-semibold">{s.k}</div>
            <h3 className="mb-2 text-[17px] font-semibold tracking-tight">{s.t}</h3>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">{s.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function WhyLoqui() {
  const rows = [
    { cloud: "Sends your audio to the cloud", loqui: "Runs 100% on your Mac" },
    { cloud: "Screenshots your active window", loqui: "Reads only the app name, never your screen" },
    { cloud: "$15/month subscription", loqui: "Free forever, open source" },
    { cloud: "Electron — heavy, ~800MB RAM", loqui: "Native Swift — ~0% idle CPU" },
    { cloud: "Useless without internet", loqui: "Works offline, even on a plane" },
  ];
  return (
    <section className="relative z-[2] mx-auto mt-[120px] max-w-[920px] px-10">
      <motion.h2
        variants={rise} initial="initial" whileInView="animate" viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="mb-12 text-center text-[40px] font-semibold tracking-tight max-md:text-[30px]"
      >
        Everything you like about AI dictation,{" "}
        <span className="brand-grad-text font-serif italic">none of what you don&rsquo;t.</span>
      </motion.h2>
      <motion.div
        variants={rise} initial="initial" whileInView="animate" viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="overflow-hidden rounded-[20px] border border-[var(--color-hair)] bg-[var(--color-panel)] backdrop-blur"
      >
        <div className="grid grid-cols-2 border-b border-[var(--color-hair)] text-sm font-medium">
          <div className="px-6 py-4 text-[var(--color-faint)]">Cloud dictation apps</div>
          <div className="brand-grad-text px-6 py-4 font-semibold">Loqui</div>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-2 border-b border-[var(--color-hair)] last:border-0">
            <div className="flex items-center gap-2.5 px-6 py-4 text-[13.5px] text-[var(--color-muted)]">
              <X size={15} className="shrink-0 text-[var(--color-faint)]" /> {r.cloud}
            </div>
            <div className="flex items-center gap-2.5 px-6 py-4 text-[13.5px] text-[var(--color-text)]">
              <Check size={15} className="shrink-0 text-[var(--color-c1)]" /> {r.loqui}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="relative z-[2] mx-auto mt-[130px] max-w-[920px] px-10">
      <motion.div
        variants={rise} initial="initial" whileInView="animate" viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="relative overflow-hidden rounded-[28px] border border-[var(--color-hair)] px-10 py-20 text-center"
        style={{
          background:
            "radial-gradient(600px 280px at 50% 0%, rgba(34,211,238,0.16), transparent 70%), rgba(8,11,17,0.6)",
        }}
      >
        <h2 className="mb-4 text-[46px] font-semibold leading-tight tracking-tight max-md:text-[32px]">
          Stop typing. <span className="brand-grad-text font-serif italic">Start talking.</span>
        </h2>
        <p className="mx-auto mb-8 max-w-[460px] text-[var(--color-muted)]">
          Free, open source, on-device. Install in one click — your voice never leaves your Mac.
        </p>
        <button className="brand-grad inline-flex items-center gap-2.5 rounded-[14px] px-8 py-4 text-[16px] font-semibold text-[#04121a] shadow-[0_12px_40px_rgba(34,211,238,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_52px_rgba(34,211,238,0.55)]">
          <Download size={18} /> Download for Mac
        </button>
        <div className="mt-5 font-mono text-[12px] text-[var(--color-faint)]">
          macOS 14+ · Apple Silicon &amp; Intel · ~5MB
        </div>
      </motion.div>
    </section>
  );
}
