# Download setup (auth-gated, per-user signed URLs)

How the download works: a logged-in user clicks Download → `/api/download` verifies
their Firebase ID token, logs + rate-limits the request in Firestore, and returns a
60-second presigned Cloudflare R2 URL. There is no static, shareable link.

This is a one-time setup. You need a (free) Cloudflare account; everything else uses
your existing Firebase + Vercel.

## 1. Cloudflare R2

1. Create a free Cloudflare account, open **R2**, create a bucket named **`loqui-releases`** (keep it private — do NOT enable public access).
2. R2 → **Manage API Tokens** → Create a token with **Object Read & Write** on that bucket. Save the **Access Key ID** and **Secret Access Key**.
3. Note your **Account ID** (shown on the R2 overview page).

## 2. Firebase service account

Firebase Console → Project Settings → **Service accounts** → **Generate new private key**.
This downloads a JSON file. You'll paste its contents into one env var.

## 3. Vercel env vars

Project → Settings → Environment Variables. Add:

| Name | Value |
|---|---|
| `R2_ACCOUNT_ID` | from step 1.3 |
| `R2_ACCESS_KEY_ID` | from step 1.2 |
| `R2_SECRET_ACCESS_KEY` | from step 1.2 |
| `R2_BUCKET` | `loqui-releases` |
| `FIREBASE_SERVICE_ACCOUNT` | the entire JSON from step 2 (paste as-is) |
| `NEXT_PUBLIC_DOWNLOAD_READY` | `true` |

Then redeploy.

## 4. Build + upload a release

From the app repo, build and zip:

```bash
cd ../wispr-clone
bash release.sh          # builds, signs, and writes dist/Loqui.dmg
```

Then upload it to R2 (put the same R2_* values in `loqui-landing/.env.local` first):

```bash
cd ../loqui-landing
node scripts/upload-release.mjs ../wispr-clone/dist/Loqui.dmg
```

Re-run both whenever you ship a new build.

## Notes

- **Gatekeeper:** the build isn't notarized, so the first launch needs **right-click → Open**. The download button says so on hover; mention it in release notes too.
- **Rate limit:** 15 downloads per user per 24h (`MAX_PER_WINDOW` in `app/api/download/route.ts`). Stops one account minting links in bulk; generous for real re-downloads.
- **Abuse reality:** this gates *who can fetch* and attributes every download, but a free `.app` can still be copied off someone's disk. Real "only-this-user-can-run-it" enforcement would need an in-app license check, which we deliberately skipped (it breaks the no-account/private positioning).
