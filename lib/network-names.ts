/**
 * Normalize local operator names across eSIM providers so the same carrier
 * does not appear as multiple filter chips (e.g. "EE" vs "EE Limited").
 *
 * Used client-side as a safety net so filter chips stay deduped even if cached plan payloads still have raw provider labels.
 */

/** Strip corporate / legal suffixes that providers append inconsistently. */
const LEGAL_SUFFIX_RE =
  /\b(?:limited|ltd\.?|llc|inc\.?|corp\.?|corporation|gmbh(?:\s*&\s*co\.?\s*ohg)?|s\.?\s*p\.?\s*a\.?|s\.?\s*a\.?|s\.?\s*l\.?|plc|co\.?|company|communications(?:\s+inc\.?)?)\b\.?/gi;

/** Country adjectives / names often glued onto the carrier (when we know the destination). */
const COUNTRY_SUFFIX: Record<string, RegExp> = {
  GB: /\b(?:united\s+kingdom|great\s+britain|britain|england|uk|u\.k\.)\b/gi,
  US: /\b(?:united\s+states(?:\s+of\s+america)?|usa|u\.s\.a\.?|u\.s\.)\b/gi,
  CA: /\b(?:canada|canadian)\b/gi,
  FR: /\b(?:france|french)\b/gi,
  DE: /\b(?:germany|deutschland|german)\b/gi,
  AU: /\b(?:australia|australian)\b/gi,
  JP: /\b(?:japan|japanese)\b/gi,
  IN: /\b(?:india|indian|delhi|andhra\s+pradesh|assam|bihar|mumbai|maharashtra)\b/gi,
  ES: /\b(?:spain|españa|espana|spanish)\b/gi,
  IT: /\b(?:italy|italia|italian)\b/gi,
  NL: /\b(?:netherlands|holland|dutch)\b/gi,
  BE: /\b(?:belgium|belgian)\b/gi,
  CH: /\b(?:switzerland|swiss)\b/gi,
  AT: /\b(?:austria|austrian)\b/gi,
  IE: /\b(?:ireland|irish|eire)\b/gi,
  NZ: /\b(?:new\s+zealand)\b/gi,
  MX: /\b(?:mexico|mexican)\b/gi,
  BR: /\b(?:brazil|brasil|brazilian)\b/gi,
  SG: /\b(?:singapore)\b/gi,
  KR: /\b(?:south\s+korea|korea)\b/gi,
  AE: /\b(?:united\s+arab\s+emirates|uae|dubai|abu\s+dhabi)\b/gi,
  TR: /\b(?:turkey|türkiye|turkiye)\b/gi,
  TH: /\b(?:thailand|thai)\b/gi,
  ID: /\b(?:indonesia|indonesian)\b/gi,
  MY: /\b(?:malaysia|malaysian)\b/gi,
  PH: /\b(?:philippines|philippine)\b/gi,
  VN: /\b(?:vietnam|viet\s+nam|vietnamese)\b/gi,
  PL: /\b(?:poland|polish)\b/gi,
  PT: /\b(?:portugal|portuguese)\b/gi,
  SE: /\b(?:sweden|swedish)\b/gi,
  NO: /\b(?:norway|norwegian)\b/gi,
  DK: /\b(?:denmark|danish)\b/gi,
  FI: /\b(?:finland|finnish)\b/gi,
  CZ: /\b(?:czech(?:\s+republic)?|czechia)\b/gi,
  GR: /\b(?:greece|greek)\b/gi,
  HU: /\b(?:hungary|hungarian)\b/gi,
  RO: /\b(?:romania|romanian)\b/gi,
  ZA: /\b(?:south\s+africa)\b/gi,
  EG: /\b(?:egypt|egyptian)\b/gi,
  SA: /\b(?:saudi\s+arabia|ksa)\b/gi,
  IL: /\b(?:israel|israeli)\b/gi,
  CN: /\b(?:china|chinese|prc)\b/gi,
  HK: /\b(?:hong\s+kong)\b/gi,
  TW: /\b(?:taiwan|taiwanese)\b/gi,
};

/**
 * Canonical display name keyed by a compact alphanumeric fingerprint
 * (lowercase, no punctuation/spaces). Covers major brands across providers.
 */
const CANONICAL_BY_KEY: Record<string, string> = {
  // UK
  ee: "EE",
  eelimited: "EE",
  o2: "O2",
  virgin: "O2",
  virginmedia: "O2",
  virginmediao2: "O2",
  three: "Three",
  "3": "Three",
  "3uk": "Three",
  "3unitedkingdom": "Three",
  vodafone: "Vodafone",
  vodafoneuk: "Vodafone",
  bt: "BT",
  truphone: "Truphone",
  jt: "JT",
  giffgaff: "giffgaff",
  lebara: "Lebara",
  lycamobile: "Lycamobile",
  sky: "Sky",
  skyuk: "Sky",
  tesco: "Tesco Mobile",
  tescomobile: "Tesco Mobile",
  idmobile: "iD Mobile",
  smarty: "Smarty",

  // US / CA
  att: "AT&T",
  verizon: "Verizon",
  tmobile: "T-Mobile",
  tmobileusa: "T-Mobile",
  uscellular: "US Cellular",
  unitedstatescellularcorporation: "US Cellular",
  uniontelephone: "Union Telephone",
  boostmobile: "Boost Mobile",
  rogers: "Rogers",
  rogerswireless: "Rogers",
  rogerscommunicationscanada: "Rogers",
  fido: "Rogers",
  bell: "Bell",
  bellmobility: "Bell",
  telus: "TELUS",
  teluscommunications: "TELUS",
  sasktel: "SaskTel",
  freedommobile: "Freedom Mobile",
  videotron: "Videotron",
  eastlink: "Eastlink",
  icewireless: "Ice Wireless",

  // EU majors
  orange: "Orange",
  orangefr: "Orange",
  orangefrance: "Orange",
  orangespain: "Orange",
  sfr: "SFR",
  bouygues: "Bouygues",
  bouyguestelecom: "Bouygues",
  free: "Free",
  freemobile: "Free",
  telekom: "Telekom",
  telekomdeutschland: "Telekom",
  deutschetelekom: "Telekom",
  eplus: "E-Plus",
  telefonica: "Telefónica",
  telefonicao2: "O2",
  o2telefonica: "O2",
  o2germany: "O2",
  movistar: "Movistar",
  tme: "Movistar",
  tim: "TIM",
  timitaly: "TIM",
  iliad: "Iliad",
  iliaditalia: "Iliad",
  iliaditaliaspa: "Iliad",
  windtre: "WindTre",
  proximus: "Proximus",
  base: "BASE",
  kpn: "KPN",
  vodafoned2: "Vodafone",
  vodafoned2gmbh: "Vodafone",
  vodafonegermany: "Vodafone",
  vodafoneitalia: "Vodafone",
  digi: "Digi",
  digispain: "Digi",
  yoigo: "Yoigo",
  fastweb: "Fastweb",

  // AU / JP / Asia
  telstra: "Telstra",
  optus: "Optus",
  softbank: "SoftBank",
  softbankcorp: "SoftBank",
  docomo: "NTT Docomo",
  nttdocomo: "NTT Docomo",
  nttdocomoin: "NTT Docomo",
  kddi: "KDDI",
  au: "au",
  rakuten: "Rakuten",
  rakutenmobile: "Rakuten",
  jio: "Jio",
  reliancejio: "Jio",
  jioindia: "Jio",
  jioindiadelhi: "Jio",
  jioandhrapradesh: "Jio",
  jioindiaassam: "Jio",
  jioindiabihar: "Jio",
  airtel: "Airtel",
  bharti: "Airtel",
  bhartiairtel: "Airtel",
  vi: "Vi",
  viindia: "Vi",
  vodafoneidea: "Vi",
  vodafoneidealimited: "Vi",
  idea: "Vi",
  ideacellular: "Vi",
  bsnl: "BSNL",
  loopmobile: "Loop Mobile",
  digicel: "Digicel",
};

/** Longest keys first so "vodafoneidea" wins over "vi". */
const CANONICAL_KEYS_LONGEST_FIRST = Object.keys(CANONICAL_BY_KEY).sort(
  (a, b) => b.length - a.length,
);

function fingerprint(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function collapseSpaces(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function stripLegalSuffixes(value: string): string {
  let next = value;
  for (let i = 0; i < 2; i++) {
    next = collapseSpaces(next.replace(LEGAL_SUFFIX_RE, " "));
  }
  return next.replace(/[,\-–—]+$/g, "").trim();
}

function stripCountrySuffix(value: string, countryCode?: string): string {
  if (!countryCode) return value;
  const re = COUNTRY_SUFFIX[countryCode.toUpperCase()];
  if (!re) return value;
  return collapseSpaces(value.replace(re, " "));
}

function titleCaseWords(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      if (/^[A-Z0-9]{2,4}$/.test(word)) return word;
      if (/^[A-Z]&\w/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function lookupCanonical(key: string): string | undefined {
  if (!key) return undefined;
  if (CANONICAL_BY_KEY[key]) return CANONICAL_BY_KEY[key];

  for (const brandKey of CANONICAL_KEYS_LONGEST_FIRST) {
    // Exact short keys only (avoid "vi" eating "virgin")
    if (brandKey.length <= 2) {
      if (key === brandKey) return CANONICAL_BY_KEY[brandKey];
      continue;
    }
    if (key === brandKey || key.startsWith(brandKey)) {
      return CANONICAL_BY_KEY[brandKey];
    }
  }
  return undefined;
}

/**
 * Map a raw coverage network label to a stable display name.
 */
export function normalizeNetworkName(
  raw: string,
  countryCode?: string,
): string {
  if (!raw?.trim()) return "";

  let name = collapseSpaces(
    raw
      .normalize("NFKC")
      .replace(/[\u2019']/g, "'")
      .replace(/[‐‑‒–—]/g, "-"),
  );

  const direct = lookupCanonical(fingerprint(name));
  if (direct) return direct;

  name = stripLegalSuffixes(name);
  name = stripCountrySuffix(name, countryCode);

  const cleaned = lookupCanonical(fingerprint(name));
  if (cleaned) return cleaned;

  const key = fingerprint(name);
  if (key === "3") return "Three";

  if (
    /^[A-Z0-9&.\-\s]+$/.test(name) &&
    name === name.toUpperCase() &&
    name.length <= 6
  ) {
    return name;
  }

  return titleCaseWords(name);
}

/** Dedupe + normalize a list of raw network labels. */
export function normalizeNetworkNames(
  names: Iterable<string>,
  countryCode?: string,
): string[] {
  const out = new Set<string>();
  for (const raw of names) {
    const normalized = normalizeNetworkName(raw, countryCode);
    if (normalized) out.add(normalized);
  }
  return [...out].sort((a, b) => a.localeCompare(b));
}
