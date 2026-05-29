# Design System — Loqui

Governs both the **macOS app** (SwiftUI) and the **website** (Next.js). Read this before any visual/UI work. Don't deviate without explicit approval.

## Product Context
- **What:** Free, open-source macOS menu-bar dictation. Hold a key, talk, local Whisper transcribes, optional AI polish, text types at the cursor.
- **Who:** Developers & prosumers who want Wispr-Flow-grade dictation without the cloud, subscription, or screen-watching.
- **Memorable thing:** "Private, on-device, and it sounds like a real funded product." Future / tech / AI / elegant / enterprise-grade.

## Aesthetic Direction
- **Direction:** Expressive-premium (Superhuman / Arc tier) on a cool, enterprise canvas. Confident, polished, aspirational.
- **Decoration:** Material depth — multi-stop gradient, glass surfaces, ambient mesh-gradient glow, grain overlay (kills flat banding), soft shadows.
- **Hard rule:** NO purple, pink, violet, or coral. Palette is cool only.

## Color
- **Brand gradient (signature):** `linear-gradient(105deg, #2DD4BF 0%, #22D3EE 45%, #3B82F6 100%)` — teal → cyan → electric blue. Used for the logo, primary CTA, accents, glows.
  - `--c1` teal `#2DD4BF` · `--c2` cyan `#22D3EE` · `--c3` blue `#3B82F6`
- **Canvas:** `--ink #05070B` (cool near-black), `--ink2 #080B11`.
- **Surface (glass):** `rgba(18,24,34,0.6)` + `backdrop-blur`.
- **Hairline:** `rgba(160,200,235,0.12)`.
- **Text:** `--text #EAF1F8`, `--muted #94A3B5`, `--faint #5C6878`.
- **Semantic (app):** recording = brand gradient/cyan pulse, done = `#34C759`, error/warning = `#FF9F0A`.
- **On-gradient ink:** `#04121A` (text/icons sitting on the bright gradient).

## Typography
- **Display/UI:** Geist (app: SF Pro is acceptable as the native system face).
- **Accent:** Instrument Serif, *italic*, inside the brand-gradient text clip — used for the emphasized phrase in headlines (e.g. "*written, perfectly.*").
- **Mono:** Geist Mono (app: SF Mono) for technical chips — language code `EN`, context `casual`, hotkey `⌥Space`, data readouts.
- **Hero scale:** 76px desktop / 48px mobile, weight 600, tracking -0.038em, line-height 1.0.

## Logo
- **Mark:** an audio wave (rounded pill bars) with the brand gradient flowing left→right across it; edge bars fade to ~50% opacity. The **"L" is built from two wave-weight bars** (a tall vertical + a foot, flush corner) sitting in the centre of the wave — reads as part of the wave, completes as an "L".
- **App icon:** the wave glows in gradient on a near-black tile (Finish 1). **Wordmark:** mark + "Loqui" in Geist 600.
- **Animated:** bars spring in (stagger), L assembles last. In-app menu-bar icon: side bars react to mic amplitude, the L holds steady.
- Implemented: `components/Logo.tsx` (`LogoMark`, `Wordmark`).

## Icons
- **App:** SF Symbols 6 (native, animatable — use symbol effects for mic/recording).
- **Web:** Lucide (`lucide-react`, v1.x — note: brand icons like GitHub were removed, use a custom inline SVG for those).

## Spacing & Layout
- Base unit 4px. Comfortable density, generous negative space.
- Max content width ~1120px hero / ~1000px sections.
- Radius: chips/buttons 13px, cards 20px, scenes 24px, pills 999px.

## Motion
- **Approach:** intentional, spring-based. Library: Framer Motion (web), Core Animation/SwiftUI springs (app).
- **Reveal:** opacity 0→1 + y 24→0, `cubic-bezier(0.22,1,0.36,1)`, ~0.7s, staggered 0.08s.
- **Signatures:** mesh-gradient drift (16–22s), logo bar spring-in, reactive waveform (sine + jitter), typewriter product demo, hover lift (-2 to -4px) + glow.
- Respect `prefers-reduced-motion`.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-28 | Expressive-premium (Superhuman/Arc), cool palette, no purple/pink | Founder rejected native-quiet & instrument directions; wanted YC-worthy, future/AI/enterprise |
| 2026-05-28 | Wave-with-L logo, L from two wave bars | Founder wanted the L to read as part of the audio wave, still legible |
| 2026-05-28 | Real Next.js + Tailwind + Framer Motion (not static mockups) | "HD" only becomes real in the built stack |
