import { AdditionalCountryInfo } from "@/lib/types/info.types";
import { api } from "../api";

export async function getAdditionalCountryInfo(slug: string) {
  return api<AdditionalCountryInfo>(`/additional-info/country/${slug}`, {
    next: { revalidate: 3600, tags: ["additional-info"] },
  });
}

export async function getAdditionalRegionInfo(slug: string) {
  return api<AdditionalCountryInfo>(`/additional-info/region/${slug}`, {
    next: { revalidate: 3600, tags: ["additional-info"] },
  });
}

export async function getAdditionalGlobalInfo() {
  return api<AdditionalCountryInfo>("/additional-info/global", {
    next: { revalidate: 3600, tags: ["additional-info"] },
  });
}
