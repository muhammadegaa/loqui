// Upload a built Loqui.zip to the R2 release bucket.
// Usage (from loqui-landing/):  node scripts/upload-release.mjs ../wispr-clone/dist/Loqui.zip
// Reads R2 creds from .env.local.
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  try {
    const txt = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of txt.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && process.env[m[1]] === undefined) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    /* no .env.local — rely on the shell env */
  }
}
loadEnvLocal();

const file = process.argv[2];
if (!file) {
  console.error("usage: node scripts/upload-release.mjs <path-to-Loqui.zip>");
  process.exit(1);
}

const {
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET,
  R2_OBJECT_KEY = "Loqui.dmg",
} = process.env;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET) {
  console.error("Missing R2_* env vars (set them in .env.local).");
  process.exit(1);
}

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
});

const Body = readFileSync(resolve(file));
await s3.send(
  new PutObjectCommand({ Bucket: R2_BUCKET, Key: R2_OBJECT_KEY, Body, ContentType: "application/x-apple-diskimage" })
);
console.log(`uploaded ${file} → r2://${R2_BUCKET}/${R2_OBJECT_KEY} (${(Body.length / 1e6).toFixed(1)} MB)`);
