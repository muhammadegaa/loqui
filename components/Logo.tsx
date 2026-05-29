"use client";

import { motion } from "framer-motion";

type Bar = { x: number; y: number; h: number; w?: number; o?: number };

// Wave bars (left → right). The "L" is two wave-weight bars at the centre:
// a tall vertical + a foot, flush corner. Gradient flows across the whole wave.
const WAVE: Bar[] = [
  { x: 4, y: 38, h: 12, o: 0.5 },
  { x: 15, y: 30, h: 20, o: 0.72 },
  { x: 26, y: 22, h: 28, o: 0.9 },
  { x: 37, y: 27, h: 23 },
  { x: 48, y: 19, h: 31 },
  // right side
  { x: 92, y: 19, h: 31 },
  { x: 103, y: 27, h: 23 },
  { x: 114, y: 22, h: 28, o: 0.9 },
  { x: 125, y: 30, h: 20, o: 0.72 },
];

export function LogoMark({
  size = 44,
  animate = true,
  mono = false,
}: {
  size?: number;
  animate?: boolean;
  mono?: boolean;
}) {
  const fill = mono ? "currentColor" : "url(#loqui-grad)";
  const reduce = !animate;

  return (
    <svg
      width={size}
      height={(size * 60) / 138}
      viewBox="0 0 138 60"
      fill={fill}
      role="img"
      aria-label="Loqui"
      style={{ overflow: "visible" }}
    >
      {!mono && (
        <defs>
          <linearGradient id="loqui-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2DD4BF" />
            <stop offset="0.5" stopColor="#22D3EE" />
            <stop offset="1" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      )}

      {WAVE.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          width={b.w ?? 6}
          rx={3}
          opacity={b.o ?? 1}
          initial={reduce ? false : { scaleY: 0.2, opacity: 0 }}
          animate={{ scaleY: 1, opacity: b.o ?? 1 }}
          transition={{ delay: 0.04 * i, type: "spring", stiffness: 260, damping: 20 }}
          style={{ transformOrigin: `${b.x + 3}px 50px` }}
          y={b.y}
          height={b.h}
        />
      ))}

      {/* L — vertical bar */}
      <motion.rect
        x={62}
        y={8}
        width={6}
        height={42}
        rx={3}
        initial={reduce ? false : { scaleY: 0.2, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ delay: 0.24, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformOrigin: "65px 50px" }}
      />
      {/* L — foot bar */}
      <motion.rect
        x={62}
        y={44}
        width={24}
        height={6}
        rx={3}
        initial={reduce ? false : { scaleX: 0.1, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.34, type: "spring", stiffness: 260, damping: 22 }}
        style={{ transformOrigin: "62px 47px" }}
      />
    </svg>
  );
}

export function Wordmark({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <LogoMark size={size * 1.6} />
      <span
        className="font-semibold tracking-tight"
        style={{ fontSize: size }}
      >
        Loqui
      </span>
    </div>
  );
}
