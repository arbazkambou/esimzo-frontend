import { createHash, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { cacheTags } from "@/lib/services/cache-keys";

const SECRET_HEADER = "x-revalidate-secret";
const allowedTags = new Set<string>(Object.values(cacheTags));

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Request body must be JSON" },
      { status: 400 },
    );
  }

  const keys = isKeysBody(body) ? body.keys : null;
  if (!keys) {
    return NextResponse.json(
      { message: "Body must be { keys: string[] }" },
      { status: 400 },
    );
  }

  const unique = [...new Set(keys)];
  const unknown = unique.filter((key) => !allowedTags.has(key));
  if (unknown.length > 0) {
    return NextResponse.json(
      { message: "Unknown cache keys", keys: unknown },
      { status: 400 },
    );
  }

  for (const key of unique) {
    revalidateTag(key, "max");
  }

  return NextResponse.json({ revalidated: unique });
}

function isAuthorized(request: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  const provided = request.headers.get(SECRET_HEADER);
  if (!expected || !provided) {
    if (!expected) console.error("REVALIDATE_SECRET is not set");
    return false;
  }

  const actualHash = createHash("sha256").update(provided).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(actualHash, expectedHash);
}

function isKeysBody(body: unknown): body is { keys: string[] } {
  if (!body || typeof body !== "object" || !("keys" in body)) return false;
  const keys = body.keys;
  return (
    Array.isArray(keys) &&
    keys.length > 0 &&
    keys.every((key) => typeof key === "string" && key.length > 0)
  );
}
