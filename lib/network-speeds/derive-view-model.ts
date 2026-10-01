import type {
  CountryNetworkSpeeds,
  LatencyTier,
  NetworkSpeedsSource,
  NetworkSpeedsTableRow,
  NetworkSpeedsViewModel,
} from "@/lib/network-speeds/types";

const UPDATED_LABEL = "October 2026";
const UPDATED_DATETIME = "2026-10-01";

function formatMbps(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function formatLatency(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "—";
  return String(Math.round(value));
}

export function latencyTier(ms: number | null): LatencyTier {
  if (ms == null || !Number.isFinite(ms)) return "Not reported";
  if (ms < 30) return "Excellent";
  if (ms < 50) return "Good";
  if (ms < 100) return "Fair";
  return "Slow";
}

function joinList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function buildIntro(data: CountryNetworkSpeeds): string {
  const names = data.operators.map((o) => o.name);
  const list = joinList(names);
  const fastestOp = data.operators.find((o) => o.name === data.fastest);
  const latencyOp = data.operators.find(
    (o) => o.name === data.lowest_latency,
  );
  const latencyMs =
    latencyOp?.latency_ms ??
    data.operators
      .map((o) => o.latency_ms)
      .filter((v): v is number => v != null && Number.isFinite(v))
      .sort((a, b) => a - b)[0];

  const fastestPart = `${data.fastest} is the fastest, averaging ${formatMbps(data.fastest_dl)} Mbps download`;
  const latencyPart =
    data.lowest_latency && latencyMs != null
      ? ` while ${data.lowest_latency} has the lowest latency at ${formatLatency(latencyMs)} ms`
      : "";

  return `${data.country} has ${data.networks} main mobile network${data.networks === 1 ? "" : "s"}${list ? `: ${list}` : ""}. ${fastestPart}${latencyPart}. Your ${data.country} eSIM connects to one of these local networks, so check which one a plan uses before you buy.`;
}

function buildNote(data: CountryNetworkSpeeds): string {
  const base =
    "Nationwide averages; your speed depends on location, device and plan.";
  if (!data.not_measured?.length) return base;
  return `Not yet measured: ${joinList(data.not_measured)}. ${base}`;
}

function collectSources(data: CountryNetworkSpeeds): NetworkSpeedsSource[] {
  const seen = new Set<string>();
  const sources: NetworkSpeedsSource[] = [];

  for (const op of data.operators) {
    const label = op.source?.trim();
    const url = op.source_url?.trim();
    if (!label || !url) continue;
    const key = `${label}::${url}`;
    if (seen.has(key)) continue;
    seen.add(key);
    sources.push({ label, url });
  }

  for (const op of data.operators) {
    const label = op.latency_source?.trim();
    if (!label || label === op.source) continue;
    // Prefer matching latency source URLs already collected; if none, skip URL-less labels
    const existing = sources.find(
      (s) => s.label.toLowerCase() === label.toLowerCase(),
    );
    if (existing) continue;

    // Look for a URL belonging to another operator with this latency source name in source field
    const withUrl = data.operators.find(
      (o) =>
        o.source?.trim().toLowerCase() === label.toLowerCase() &&
        o.source_url?.trim(),
    );
    if (withUrl?.source_url) {
      sources.push({ label, url: withUrl.source_url.trim() });
    }
  }

  return sources;
}

export function deriveNetworkSpeedsViewModel(
  data: CountryNetworkSpeeds,
): NetworkSpeedsViewModel {
  const operators = [...data.operators].sort(
    (a, b) => b.download_mbps - a.download_mbps,
  );
  const maxDownload = Math.max(
    ...operators.map((o) => o.download_mbps),
    data.fastest_dl,
    0,
  );

  const avgDownload =
    operators.length > 0
      ? operators.reduce((sum, o) => sum + o.download_mbps, 0) /
        operators.length
      : 0;
  const latencyValues = operators
    .map((o) => o.latency_ms)
    .filter((v): v is number => v != null && Number.isFinite(v));
  const avgLatency =
    latencyValues.length > 0
      ? latencyValues.reduce((sum, v) => sum + v, 0) / latencyValues.length
      : null;

  const lowestLatencyOp =
    operators
      .filter((o) => o.latency_ms != null && Number.isFinite(o.latency_ms))
      .sort((a, b) => (a.latency_ms ?? Infinity) - (b.latency_ms ?? Infinity))[0] ??
    null;

  const fastestName = data.fastest || operators[0]?.name || "—";
  const lowestLatencyName =
    data.lowest_latency || lowestLatencyOp?.name || "—";

  const rows: NetworkSpeedsTableRow[] = operators.map((op, index) => {
    const isFastest = op.name === fastestName || index === 0;
    const isLowestLatency = op.name === lowestLatencyName;
    let badge: NetworkSpeedsTableRow["badge"] = null;
    if (isFastest) badge = "Fastest download";
    else if (isLowestLatency) badge = "Lowest latency";

    return {
      rank: index + 1,
      name: op.name,
      formerly: op.formerly ?? [],
      downloadMbps: op.download_mbps,
      uploadMbps: op.upload_mbps,
      latencyMs: op.latency_ms,
      latencyTier: latencyTier(op.latency_ms),
      bestFor: op.best_for,
      barPercent:
        maxDownload > 0
          ? Math.max(0, Math.min(100, Math.round((op.download_mbps / maxDownload) * 100)))
          : 0,
      badge,
      ctaHref: `?network=${encodeURIComponent(op.name)}#plans`,
      ctaLabel: `eSIMs on ${op.name}`,
    };
  });

  const fastestRow = rows.find((r) => r.name === fastestName) ?? rows[0];
  const latencyRow =
    rows.find((r) => r.name === lowestLatencyName) ??
    rows.find((r) => r.latencyMs != null) ??
    null;

  return {
    country: data.country,
    slug: data.slug,
    updatedLabel: UPDATED_LABEL,
    updatedDatetime: UPDATED_DATETIME,
    heading: `Mobile network speeds in ${data.country} (2026)`,
    intro: buildIntro(data),
    tableHeading: `${data.country} mobile networks compared`,
    tableCaption: `Average download speed, upload speed and latency of mobile networks in ${data.country}`,
    note: buildNote(data),
    footerDisclaimer:
      "Download and upload are average speeds in Mbps; latency is response time in ms (lower is better). Figures come from the newest independent report for each network (MedUX latency is best-case ping), or from speed tests run by everyday users in the last 12 months. Updated October 2026.",
    verdicts: [
      {
        id: "fastest",
        label: "Fastest download",
        name: fastestName,
        value: `${formatMbps(data.fastest_dl)} Mbps`,
        dot: "primary",
      },
      {
        id: "latency",
        label: "Lowest latency",
        name: lowestLatencyName,
        value:
          latencyRow?.latencyMs != null
            ? `${formatLatency(latencyRow.latencyMs)} ms`
            : "—",
        dot: "navy",
      },
      {
        id: "allround",
        label: "Best all-round",
        name: fastestName,
        value: fastestRow
          ? `${formatMbps(fastestRow.downloadMbps)} Mbps${
              fastestRow.latencyMs != null
                ? ` · ${formatLatency(fastestRow.latencyMs)} ms`
                : " · —"
            }`
          : "—",
        dot: "navy",
      },
      {
        id: "average",
        label: "Country average",
        name: `${formatMbps(avgDownload)} Mbps`,
        value:
          avgLatency != null
            ? `${formatLatency(avgLatency)} ms ping`
            : "Latency varies",
        dot: "muted",
      },
    ],
    rows,
    faq: (data.faq ?? []).map((item) => ({
      question: item.q,
      answer: item.a,
    })),
    tip: {
      title: `In ${data.country}, the network matters more than the data allowance.`,
      text: "Two plans with the same data can feel very different. Match the network to how you’ll use your phone:",
      uses: [
        { label: "Streaming & downloads", network: fastestName },
        {
          label: "Video calls & gaming",
          network: lowestLatencyName,
        },
        { label: "Best all-round", network: fastestName },
      ],
      ctaLabel: `Compare ${data.country} eSIM plans`,
      ctaHref: "#plans",
    },
    sources: collectSources(data),
    metaDescriptionSuggestion: data.meta_description_suggestion,
  };
}

export { formatMbps, formatLatency };
