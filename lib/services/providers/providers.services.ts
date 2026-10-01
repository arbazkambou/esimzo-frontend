import { Provider } from "@/lib/types/providers.types";
import { api } from "../api";
import {
  cacheRevalidate,
  cacheTags,
  nextFetchCache,
} from "../cache-keys";

export async function getProviders() {
  return api<Provider[]>(
    "/providers",
    nextFetchCache({
      revalidate: cacheRevalidate.hour,
      tags: [cacheTags.providers],
    }),
  );
}
