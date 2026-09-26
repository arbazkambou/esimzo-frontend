import { AdditionalCountryInfo } from "@/lib/types/info.types";
import { api } from "../api";

const twelveHours = 60 * 60 * 12;

export async function getAdditionalCountryInfo(slug: string) {
  return api<AdditionalCountryInfo>(`/additional-info/country/${slug}`, {
    next: { revalidate: twelveHours, tags: ["additional-info"] },
  });
}

export async function getAdditionalRegionInfo(slug: string) {
  return api<AdditionalCountryInfo>(`/additional-info/region/${slug}`, {
    next: { revalidate: twelveHours, tags: ["additional-info"] },
  });
}

export async function getAdditionalGlobalInfo() {
  return api<AdditionalCountryInfo>("/additional-info/global", {
    next: { revalidate: twelveHours, tags: ["additional-info"] },
  });
}
