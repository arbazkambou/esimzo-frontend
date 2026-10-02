import type {
  CityLeaderRow,
  CityNetworkBar,
  CityNetworkCard,
  CityNetworksViewModel,
  CitySourceTab,
  CountryCityNetworks,
} from "@/lib/city-networks/types";
import { normalizeNetworkName } from "@/lib/network-names";

const UPDATED_LABEL = "October 2026";
const UPDATED_DATETIME = "2026-10-01";

function formatMbps(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function classifySource(source: string): CitySourceTab {
  const s = source.toLowerCase();
  if (s.includes("user") || s.includes("speedgeo") || s.includes("speed test")) {
    return "user";
  }
  return "analytics";
}

function cleanHighlightValue(value: string): string {
  return value
    .replace(/\u00c2\u00b7/g, "·")
    .replace(/A·/g, "·")
    .replace(/\s*·\s*/g, " · ")
    .trim();
}

function networkCtaName(raw: string): string {
  return normalizeNetworkName(raw) || raw;
}

function buildBars(
  speeds: Record<string, number>,
  fastest: string,
): CityNetworkBar[] {
  const entries = Object.entries(speeds).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, v]) => v), 0);
  return entries.map(([name, mbps]) => ({
    name,
    mbps,
    percent: max > 0 ? Math.round((mbps / max) * 100) : 0,
    isFastest: name === fastest,
  }));
}

function buildLeaders(cards: CityNetworkCard[]): CityLeaderRow[] {
  if (cards.length === 0) return [];
  const wins = new Map<string, number>();
  for (const card of cards) {
    wins.set(card.fastest, (wins.get(card.fastest) ?? 0) + 1);
  }
  const total = cards.length;
  return [...wins.entries()]
    .map(([name, count]) => ({
      name,
      wins: count,
      total,
      percent: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.wins - a.wins || a.name.localeCompare(b.name));
}

function collectSources(
  data: CountryCityNetworks,
): { label: string; url: string }[] {
  const seen = new Set<string>();
  const sources: { label: string; url: string }[] = [];
  for (const city of data.cities) {
    const label = city.source?.trim();
    const url = city.source_url?.trim();
    if (!label || !url) continue;
    const key = `${label}::${url}`;
    if (seen.has(key)) continue;
    seen.add(key);
    sources.push({ label, url });
  }
  return sources;
}

export function deriveCityNetworksViewModel(
  data: CountryCityNetworks,
): CityNetworksViewModel {
  const cards: CityNetworkCard[] = data.cities.map((city) => {
    const sourceTab = classifySource(city.source);
    const badgeLabel = city.close_race
      ? "Close race"
      : city.lead_pct > 0
        ? `+${city.lead_pct}% lead`
        : "Fastest";

    const comparisonText =
      city.runner_up && Number.isFinite(city.runner_up_mbps)
        ? city.close_race
          ? `Neck-and-neck with ${city.runner_up} (${formatMbps(city.runner_up_mbps)} Mbps)`
          : `${city.lead_pct}% faster than ${city.runner_up} (${formatMbps(city.runner_up_mbps)} Mbps)`
        : "Top download speed in this area";

    const highlights = Object.entries(city.highlights ?? {}).map(
      ([label, value]) => ({
        label,
        value: cleanHighlightValue(value),
      }),
    );

    const ctaNetwork = networkCtaName(city.fastest);

    return {
      id: city.anchor,
      city: city.city,
      anchor: city.anchor,
      source: city.source,
      sourceTab,
      fastest: city.fastest,
      downloadMbps: city.download_mbps,
      runnerUp: city.runner_up,
      runnerUpMbps: city.runner_up_mbps,
      leadPct: city.lead_pct,
      closeRace: city.close_race,
      badgeLabel,
      comparisonText,
      bars: buildBars(city.all_networks_download_mbps ?? {}, city.fastest),
      highlights,
      period: city.period,
      sourceUrl: city.source_url,
      ctaHref: `?network=${encodeURIComponent(ctaNetwork)}#plans`,
      ctaLabel: `eSIMs on ${city.fastest}`,
    };
  });

  const analyticsCards = cards.filter((c) => c.sourceTab === "analytics");
  const userCards = cards.filter((c) => c.sourceTab === "user");
  const primaryCards =
    analyticsCards.length > 0 ? analyticsCards : userCards;
  const leaders = buildLeaders(primaryCards);
  const leader =
    data.leader || leaders[0]?.name || primaryCards[0]?.fastest || "—";

  const citiesLabel =
    data.cities_compared ||
    (analyticsCards.length > 0 ? analyticsCards.length : cards.length);

  const tipNetwork = networkCtaName(leader);
  const isUsStates = data.slug === "united-states";
  const placeKind = isUsStates ? ("state" as const) : ("city" as const);
  const placeLabelSingular = isUsStates ? "state" : "city";
  const placeLabelPlural = isUsStates ? "states" : "cities";
  const areaPhrase = isUsStates
    ? `${citiesLabel} states`
    : `${citiesLabel} cities and regions`;

  return {
    country: data.country,
    slug: data.slug,
    updatedLabel: UPDATED_LABEL,
    updatedDatetime: UPDATED_DATETIME,
    placeKind,
    placeLabelSingular,
    placeLabelPlural,
    heading: `Best mobile network by ${placeLabelSingular} in ${data.country} (2026)`,
    eyebrow: `Speeds by ${placeLabelSingular}`,
    intro: `${data.primary_source} compared download speeds across ${areaPhrase} in ${data.country}. Use this to pick an eSIM on the network that performs best where you’ll spend most of your time.`,
    leader,
    primarySource: data.primary_source,
    metaDescriptionSuggestion: data.meta_description_suggestion,
    leaders,
    citiesCompared: citiesLabel,
    cards,
    hasAnalytics: analyticsCards.length > 0,
    hasUserTests: userCards.length > 0,
    faq: (data.faq ?? []).map((item) => ({
      question: item.q,
      answer: item.a,
    })),
    tip: {
      title: isUsStates
        ? `${leader} is the safest pick for a multi-state trip.`
        : `${leader} is the safest pick for a multi-city trip.`,
      text: isUsStates
        ? `${leader} was fastest in the most places we compared in ${data.country}. If your route covers several states, starting with ${leader} is the lower-risk choice.`
        : `${leader} was fastest in the most places we compared in ${data.country}. If your route covers several cities, starting with ${leader} is the lower-risk choice.`,
      ctaLabel: `See eSIMs on ${leader}`,
      ctaHref: `?network=${encodeURIComponent(tipNetwork)}#plans`,
      secondaryLabel: `Compare all ${data.country} eSIM plans`,
      secondaryHref: "#plans",
    },
    sources: collectSources(data),
    footerDisclaimer:
      "Download speeds are averages in Mbps from independent network reports or user speed tests. Results vary by neighbourhood, device, and plan. Updated October 2026.",
  };
}

export { formatMbps, classifySource };
