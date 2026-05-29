"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

const MESSAGE =
  "Hey, just wrapped the new onboarding flow — it's noticeably faster now and the empty states finally feel intentional.";

export function ProductScene() {
  const [typed, setTyped] = useState("");
  const waveRef = useRef<HTMLDivElement>(null);

  // typewriter loop
  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (i <= MESSAGE.length) {
        setTyped(MESSAGE.slice(0, i));
        i++;
        timer = setTimeout(tick, 26);
      } else {
        timer = setTimeout(() => {
          i = 0;
          tick();
        }, 4200);
      }
    };
    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
  }, []);

  // reactive waveform
  useEffect(() => {
    const el = waveRef.current;
    if (!el) return;
    const bars = Array.from(el.children) as HTMLElement[];
    let raf: number;
    const loop = () => {
      const t = Date.now() / 240;
      bars.forEach((b, i) => {
        const base = Math.sin(t + i * 0.6);
        const h = 6 + Math.abs(base) * 16 + Math.random() * 4;
        b.style.height = `${h.toFixed(0)}px`;
      });
      raf = requestAnimationFrame(() => setTimeout(loop, 90) as unknown as number);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-14 max-w-[960px] px-10"
    >
      <div
        className="relative flex min-h-[430px] flex-col items-center overflow-hidden rounded-[24px] border border-[var(--color-hair)] px-10 pt-14"
        style={{
          background:
            "linear-gradient(160deg, rgba(45,212,191,0.16), rgba(34,211,238,0.10) 50%, rgba(59,130,246,0.16)), rgba(8,11,17,0.6)",
          boxShadow:
            "0 50px 130px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
      >
        {/* doc */}
        <div className="relative z-10 w-full max-w-[560px] rounded-t-[14px] border border-[var(--color-hair)] bg-[rgba(5,7,11,0.6)] px-6 py-5 backdrop-blur-md">
          <div className="mb-3 flex items-center gap-2 font-mono text-xs text-[var(--color-faint)]">
            <MessageSquare size={14} className="text-[var(--color-c2)]" />
            To: the team — Slack
          </div>
          <p className="min-h-[48px] text-[15px] leading-relaxed text-[#cbd6e4]">
            {typed}
            <span className="ml-px inline-block h-[17px] w-[2px] translate-y-[3px] animate-pulse bg-[var(--color-c2)] shadow-[0_0_8px_var(--color-c2)]" />
          </p>
        </div>

        {/* pill */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border px-5 py-3 backdrop-blur-2xl"
          style={{
            background: "rgba(24,32,44,0.72)",
            borderColor: "rgba(160,200,235,0.18)",
            boxShadow:
              "0 18px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(34,211,238,0.16), 0 0 44px rgba(34,211,238,0.22)",
          }}
        >
          <div ref={waveRef} className="flex h-[22px] items-end gap-[3.5px]">
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="brand-grad w-[3.5px] rounded-full transition-[height] duration-100"
                style={{ height: 6 }}
              />
            ))}
          </div>
          <span className="text-sm font-medium">Listening</span>
          <span className="rounded-md bg-[rgba(34,211,238,0.12)] px-2 py-1 font-mono text-[11px] tracking-wide text-[var(--color-c2)]">
            EN
          </span>
          <span className="rounded-md bg-[rgba(34,211,238,0.12)] px-2 py-1 font-mono text-[11px] tracking-wide text-[var(--color-c2)]">
            casual
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
