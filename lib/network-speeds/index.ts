export type {
  CountryNetworkSpeeds,
  NetworkSpeedFaq,
  NetworkSpeedOperator,
  NetworkSpeedsViewModel,
} from "@/lib/network-speeds/types";
export { getNetworkSpeedsBySlug, hasNetworkSpeeds } from "@/lib/network-speeds/get-network-speeds";
export {
  deriveNetworkSpeedsViewModel,
  formatLatency,
  formatMbps,
  latencyTier,
} from "@/lib/network-speeds/derive-view-model";
