"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Infinity as InfinityIcon,
  Mic,
  Shield,
  Sparkles,
  LogOut,
  Coffee,
} from "lucide-react";

// Set NEXT_PUBLIC_BMC_URL (e.g. https://buymeacoffee.com/yourname) to show the
// footer support link. Framed around the real cost it covers: code signing.
const BMC_URL = process.env.NEXT_PUBLIC_BMC_URL || "";

import { LogoMark } from "@/components/Logo";
import { MeshGradient } from "@/components/MeshGradient";
import { ProductScene } from "@/components/ProductScene";
import { HowItWorks, WhyLoqui, FinalCTA } from "@/components/Sections";
import { AuthProvider, useAuth } from "@/components/AuthProvider";
import { DownloadButton } from "@/components/DownloadButton";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
}

function HomeContent() {
  const { user, signOut } = useAuth();
  return (
    <main className="relative">
      <MeshGradient />

      {/* nav */}
      <nav className="relative z-10 mx-auto flex max-w-[1200px] items-center justify-between px-10 py-6">
        <div className="flex items-center gap-3">
          <span className="brand-grad grid h-[31px] w-[31px] place-items-center rounded-[9px] text-[#04121a] shadow-[0_6px_22px_rgba(34,211,238,0.4)]">
            <LogoMark size={22} mono animate={false} />
          </span>
          <span className="text-lg font-semibold tracking-tight">Loqui</span>
        </div>
        <div className="flex items-center gap-7 text-sm text-[var(--color-muted)]">
          <a href="#features" className="transition hover:text-[var(--color-text)]">Features</a>
          <a href="#privacy" className="transition hover:text-[var(--color-text)]">Privacy</a>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="max-w-[160px] truncate text-[13px] text-[var(--color-text)]">
                {user.email}
              </span>
              <button
                onClick={() => signOut()}
                title="Sign out"
                className="grid h-8 w-8 place-items-center rounded-full border border-[var(--color-hair)] bg-white/5 text-[var(--color-muted)] transition hover:text-[var(--color-text)]"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <DownloadButton className="!px-4 !py-2 !text-[13.5px] !shadow-none" />
          )}
        </div>
      </nav>

      {/* hero */}
      <section className="relative z-[2] mx-auto max-w-[1120px] px-10 pb-10 pt-[72px] text-center">
        <motion.div
          variants={rise}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.7, ease, delay: 0.05 }}
          className="mb-[30px] inline-flex items-center gap-[9px] rounded-full border border-[var(--color-hair)] bg-[var(--color-panel)] px-4 py-2 text-[12.5px] text-[var(--color-muted)] backdrop-blur"
        >
          <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-[var(--color-c2)] shadow-[0_0_12px_var(--color-c2)]" />
          Free · Private · 100% on-device
        </motion.div>

        <motion.h1
          variants={rise}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.7, ease, delay: 0.13 }}
          className="mb-6 text-[76px] font-semibold leading-[1.0] tracking-[-0.038em] max-md:text-[48px]"
        >
          Speak. It&rsquo;s{" "}
          <span className="brand-grad-text font-serif italic">written, perfectly.</span>
        </motion.h1>

        <motion.p
          variants={rise}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.7, ease, delay: 0.21 }}
          className="mx-auto mb-9 max-w-[600px] text-[20px] leading-relaxed text-[var(--color-muted)]"
        >
          Hold one key, talk naturally, and Loqui types polished text into any
          app — powered by on-device AI. Your voice never leaves your Mac.
        </motion.p>

        <motion.div
          variants={rise}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.7, ease, delay: 0.29 }}
          className="mb-[18px] flex flex-wrap items-center justify-center gap-[14px]"
        >
          <DownloadButton />
          <a href="#features" className="inline-flex items-center gap-[9px] rounded-[13px] border border-[var(--color-hair)] bg-[var(--color-panel)] px-6 py-[15px] text-[15px] font-medium backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10">
            How it works
          </a>
        </motion.div>

        <motion.div
          variants={rise}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.7, ease, delay: 0.37 }}
          className="font-mono text-[12.5px] text-[var(--color-faint)]"
        >
          🌐 globe key · no subscription · no cloud · runs offline
        </motion.div>
      </section>

      {/* product scene */}
      <ProductScene />

      {/* trust strip */}
      <section
        id="privacy"
        className="relative z-[2] mx-auto mt-16 flex max-w-[980px] flex-wrap justify-center gap-[14px] px-10"
      >
        {[
          { icon: ShieldCheck, b: "On-device.", t: "Audio never leaves your Mac." },
          { icon: Zap, b: "Native & light.", t: "Not Electron. ~0% idle CPU." },
          { icon: InfinityIcon, b: "Free forever.", t: "No subscription, no trial games." },
        ].map((x, i) => (
          <motion.div
            key={i}
            variants={rise}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.08 * i }}
            className="flex items-center gap-3 rounded-[14px] border border-[var(--color-hair)] bg-[var(--color-panel)] px-[19px] py-[15px] text-[13.5px] text-[var(--color-muted)] backdrop-blur transition hover:-translate-y-0.5"
          >
            <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[rgba(34,211,238,0.1)] text-[var(--color-c2)]">
              <x.icon size={16} />
            </span>
            <span>
              <b className="font-semibold text-[var(--color-text)]">{x.b}</b> {x.t}
            </span>
          </motion.div>
        ))}
      </section>

      {/* features */}
      <section
        id="features"
        className="relative z-[2] mx-auto mt-[84px] grid max-w-[1000px] grid-cols-1 gap-[18px] px-10 md:grid-cols-3"
      >
        {[
          { icon: Mic, h: "Talk, don't type", p: "Hold the 🌐 globe key, speak naturally, release. Polished text lands wherever your cursor is — every app, every field." },
          { icon: Shield, h: "Private by design", p: "Whisper runs on your machine. No screenshots, no uploads, no account. It even works on a plane." },
          { icon: Sparkles, h: "Knows the room", p: "Writes casual in Slack, formal in Mail — by reading only the app name, never your screen." },
        ].map((c, i) => (
          <motion.div
            key={i}
            variants={rise}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.08 * i }}
            className="group rounded-[20px] border border-[var(--color-hair)] bg-[var(--color-panel)] p-7 backdrop-blur transition hover:-translate-y-1 hover:border-[rgba(34,211,238,0.3)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
          >
            <span className="brand-grad mb-[18px] grid h-11 w-11 place-items-center rounded-[12px] text-[#04121a] shadow-[0_8px_24px_rgba(34,211,238,0.28)]">
              <c.icon size={21} />
            </span>
            <h3 className="mb-2 text-[16.5px] font-semibold tracking-tight">{c.h}</h3>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">{c.p}</p>
          </motion.div>
        ))}
      </section>

      <HowItWorks />
      <WhyLoqui />
      <FinalCTA />

      <footer className="relative z-[2] px-10 pb-[60px] pt-[84px] text-center font-mono text-[12.5px] text-[var(--color-faint)]">
        // loqui · free &amp; private · made for people who&rsquo;d rather talk
        {BMC_URL && (
          <>
            {" · "}
            <a
              href={BMC_URL}
              target="_blank"
              rel="noreferrer"
              title="Helps cover Apple code-signing"
              className="inline-flex items-center gap-1 align-middle transition hover:text-[var(--color-muted)]"
            >
              <Coffee size={12} /> buy me a coffee
            </a>
          </>
        )}
      </footer>
    </main>
  );
}
