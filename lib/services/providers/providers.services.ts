import { Provider } from "@/lib/types/providers.types";
import { api } from "../api";
import { cacheRevalidate, cacheTags } from "../cache-keys";

export async function getProviders() {
  return api<Provider[]>("/providers", {
    next: { revalidate: cacheRevalidate.hour, tags: [cacheTags.providers] },
  });
}
