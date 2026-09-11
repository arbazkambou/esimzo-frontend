import { Provider } from "@/lib/types/providers.types";
import { api } from "../api";

export async function getProviders() {
  return api<Provider[]>("/providers", {
    next: { revalidate: 3600, tags: ["providers"] },
  });
}
