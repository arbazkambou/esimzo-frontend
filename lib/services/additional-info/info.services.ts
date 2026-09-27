import { AdditionalCountryInfo } from "@/lib/types/info.types";
import { api } from "../api";
import { cacheRevalidate, cacheTags } from "../cache-keys";

export async function getAdditionalCountryInfo(slug: string) {
  return api<AdditionalCountryInfo>(`/additional-info/country/${slug}`, {
    next: {
      revalidate: cacheRevalidate.twelveHours,
      tags: [cacheTags.additionalInfo],
    },
  });
}

export async function getAdditionalRegionInfo(slug: string) {
  return api<AdditionalCountryInfo>(`/additional-info/region/${slug}`, {
    next: {
      revalidate: cacheRevalidate.twelveHours,
      tags: [cacheTags.additionalInfo],
    },
  });
}

export async function getAdditionalGlobalInfo() {
  return api<AdditionalCountryInfo>("/additional-info/global", {
    next: {
      revalidate: cacheRevalidate.twelveHours,
      tags: [cacheTags.additionalInfo],
    },
  });
}
