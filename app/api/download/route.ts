import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { presignDownload, r2Configured } from "@/lib/r2";

// firebase-admin needs the Node runtime (not edge), and this must never be
// statically cached — every call is a per-user, per-request signed URL.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_PER_WINDOW = 15; // generous for real re-downloads; caps bulk abuse

export async function POST(req: NextRequest) {
  if (!r2Configured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  // 1. Must be a signed-in user.
  const header = req.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  let uid: string;
  let email: string | undefined;
  try {
    const decoded = await adminAuth().verifyIdToken(token);
    uid = decoded.uid;
    email = decoded.email;
  } catch {
    return NextResponse.json({ error: "invalid_token" }, { status: 401 });
  }

  // 2. Per-user rolling rate limit (stops one account minting links in bulk).
  const ref = adminDb().collection("users").doc(uid);
  try {
    const allowed = await adminDb().runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const now = Date.now();
      const data = snap.exists ? snap.data()! : {};
      const windowStart: number = data.dlWindowStart ?? 0;
      let count: number = data.dlCount ?? 0;
      if (now - windowStart > WINDOW_MS) {
        count = 0;
        tx.set(ref, { dlWindowStart: now }, { merge: true });
      }
      if (count >= MAX_PER_WINDOW) return false;
      tx.set(
        ref,
        {
          email: email ?? null,
          dlCount: count + 1,
          dlTotal: (data.dlTotal ?? 0) + 1,
          lastDownloadAt: now,
        },
        { merge: true }
      );
      return true;
    });
    if (!allowed) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
  } catch {
    // If the counter write fails, don't hard-block a legit download.
  }

  // 3. Mint a short-lived signed URL. No static/shareable link exists.
  const url = await presignDownload(60);
  return NextResponse.json({ url });
}
