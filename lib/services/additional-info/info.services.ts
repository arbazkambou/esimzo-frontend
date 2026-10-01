import { AdditionalCountryInfo } from "@/lib/types/info.types";
import { api } from "../api";
import {
  cacheRevalidate,
  cacheTags,
  nextFetchCache,
} from "../cache-keys";

export async function getAdditionalCountryInfo(slug: string) {
  return api<AdditionalCountryInfo>(
    `/additional-info/country/${slug}`,
    nextFetchCache({
      revalidate: cacheRevalidate.twelveHours,
      tags: [cacheTags.additionalInfo],
    }),
  );
}

export async function getAdditionalRegionInfo(slug: string) {
  return api<AdditionalCountryInfo>(
    `/additional-info/region/${slug}`,
    nextFetchCache({
      revalidate: cacheRevalidate.twelveHours,
      tags: [cacheTags.additionalInfo],
    }),
  );
}

export async function getAdditionalGlobalInfo() {
  return api<AdditionalCountryInfo>(
    "/additional-info/global",
    nextFetchCache({
      revalidate: cacheRevalidate.twelveHours,
      tags: [cacheTags.additionalInfo],
    }),
  );
}
