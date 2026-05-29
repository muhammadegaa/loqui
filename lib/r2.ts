import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Cloudflare R2 is S3-compatible. We never expose the bucket publicly — the
// /api/download route mints a short-lived presigned GET URL per authenticated
// request, so there's no shareable static link.
function r2(): S3Client {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("R2 env vars not set");
  }
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export function r2Configured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET
  );
}

/// A presigned GET URL for the release artifact, valid for `expiresIn` seconds.
export async function presignDownload(expiresIn = 60): Promise<string> {
  const Bucket = process.env.R2_BUCKET!;
  const Key = process.env.R2_OBJECT_KEY || "Loqui.dmg";
  return getSignedUrl(r2(), new GetObjectCommand({ Bucket, Key }), { expiresIn });
}
