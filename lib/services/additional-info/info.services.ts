import { AdditionalCountryInfo } from "@/lib/types/info.types";
import { api } from "../api";

export async function getAdditionalCountryInfo(slug: string) {
  return api<AdditionalCountryInfo>(`/additional-info/country/${slug}`, {
    next: { revalidate: 3600, tags: ["additional-info"] },
  });
}
