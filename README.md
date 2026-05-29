# Loqui

Free, open-source voice dictation for macOS. Hold one key, talk naturally, and Loqui types polished text into any app — powered by on-device AI.

**Your voice never leaves your Mac.** Local Whisper transcription, optional AI polish (bring your own key, or run fully offline with Ollama), no subscription, no cloud.

## Why Loqui

- **On-device.** Audio is transcribed locally with Whisper. No uploads, no screenshots.
- **Native & light.** Real Swift, not Electron — ~0% idle CPU.
- **Free forever.** Open source. No trial games, no tiering.
- **Knows the room.** Writes casual in Slack, formal in Mail — by reading only the app name, never your screen.
- **Multilingual.** English plus many languages, picked explicitly (no misfiring auto-detect).

## This repo

The Loqui landing site — Next.js, Tailwind, Framer Motion. The macOS app lives separately.

```bash
bun install
cp .env.example .env.local   # add your Firebase web config
bun run dev
```

## License

MIT
