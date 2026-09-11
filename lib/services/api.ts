export type ApiSuccess<T> = { success: true; data: T };
export type ApiError = { success: false; message: string };
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

type SearchParamValue = string | number | boolean;

export type ApiConfig = Omit<RequestInit, "body"> & {
  params?: Record<
    string,
    SearchParamValue | SearchParamValue[] | null | undefined
  >;
  body?: RequestInit["body"] | object;
  /** Opt-in. Do not set on cached RSC fetches — AbortSignal breaks Next.js deduping. */
  timeoutMs?: number;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

export function ok<T>(data: T): ApiSuccess<T> {
  return { success: true, data };
}

export function fail(message: string): ApiError {
  return { success: false, message };
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export async function api<T>(
  endpoint: string,
  {
    params,
    headers: initHeaders,
    body,
    signal,
    timeoutMs,
    ...config
  }: ApiConfig = {},
): Promise<ApiResponse<T>> {
  if (!BASE_URL) {
    return fail("NEXT_PUBLIC_BASE_API is not set");
  }

  const url = new URL(joinUrl(BASE_URL, endpoint));
  applyParams(url, params);

  const headers = new Headers(initHeaders);
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  let requestBody = body as BodyInit | null | undefined;
  if (shouldStringify(body)) {
    requestBody = JSON.stringify(body);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
  }

  const timeoutSignal =
    timeoutMs && timeoutMs > 0 ? AbortSignal.timeout(timeoutMs) : undefined;
  const combinedSignal = combineSignals(
    [timeoutSignal, signal].filter((value): value is AbortSignal => !!value),
  );

  let response: Response;
  try {
    // Next.js data cache requires a string URL, not a URL instance.
    response = await fetch(url.href, {
      ...config,
      headers,
      body: requestBody,
      ...(combinedSignal ? { signal: combinedSignal } : {}),
    });
  } catch (err) {
    if (isAbortError(err)) {
      const timedOut = !!timeoutSignal?.aborted && !signal?.aborted;
      return fail(timedOut ? "Request timed out" : "Request aborted");
    }
    return fail(err instanceof Error ? err.message : "Network error");
  }

  const text = await response.text();
  const json = text ? parseJson(text) : undefined;

  if (!response.ok) {
    return fail(messageFromBody(json, `HTTP Error: ${response.status}`));
  }

  if (json === undefined) {
    if (response.status === 204 || response.status === 205) {
      return ok(undefined as T);
    }
    return fail("Empty response");
  }

  return toResponse<T>(json);
}

function joinUrl(base: string, path: string) {
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

function applyParams(url: URL, params: ApiConfig["params"]) {
  if (!params) return;
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        url.searchParams.append(key, String(item));
      }
    } else {
      url.searchParams.set(key, String(value));
    }
  }
}

function shouldStringify(body: unknown): body is object {
  if (body === null || body === undefined) return false;
  if (typeof body !== "object") return false;
  if (body instanceof FormData) return false;
  if (body instanceof Blob) return false;
  if (body instanceof ArrayBuffer) return false;
  if (ArrayBuffer.isView(body)) return false;
  if (body instanceof URLSearchParams) return false;
  if (typeof ReadableStream !== "undefined" && body instanceof ReadableStream) {
    return false;
  }
  return true;
}

function combineSignals(signals: AbortSignal[]): AbortSignal | undefined {
  if (signals.length === 0) return undefined;
  if (signals.length === 1) return signals[0];

  const controller = new AbortController();
  const onAbort = () => {
    if (!controller.signal.aborted) controller.abort();
  };

  for (const signal of signals) {
    if (signal.aborted) {
      onAbort();
      break;
    }
    signal.addEventListener("abort", onAbort, { once: true });
  }

  return controller.signal;
}

function isAbortError(err: unknown) {
  return (
    (err instanceof DOMException && err.name === "AbortError") ||
    (err instanceof Error && err.name === "AbortError")
  );
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

type ErrorEnvelope = {
  success?: boolean;
  error?: {
    code?: string;
    message?: string;
  };
  message?: string;
};

function messageFromBody(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") return fallback;
  const parsed = body as ErrorEnvelope;
  if (parsed.error?.message) return parsed.error.message;
  if (typeof parsed.message === "string") return parsed.message;
  return fallback;
}

function toResponse<T>(json: unknown): ApiResponse<T> {
  if (!json || typeof json !== "object" || !("success" in json)) {
    return ok(json as T);
  }

  const envelope = json as {
    success: boolean;
    data?: T;
    error?: { message?: string };
  };

  if (envelope.success === false) {
    return fail(envelope.error?.message ?? "Request failed");
  }

  if ("data" in envelope) {
    return ok(envelope.data as T);
  }

  return ok(json as T);
}
