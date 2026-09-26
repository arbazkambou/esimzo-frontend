import type {
  CountryPlansHeroContent,
  DataNeedsContent,
  HowToChooseEsimContent,
  NetworkCoverageContent,
  UnlimitedPlansContent,
} from "./types";

/** France plans-page hero copy. Country-specific; not used inside the reusable UI. */
export const francePlansHeroContent: CountryPlansHeroContent = {
  eyebrow: "Compare Plans",
  titleTemplate: "Compare eSIM Plans for {countryName}",
  description:
    "Compare travel eSIM plans for {countryName} by price, data, validity, local network, 5G access, hotspot support and speed limits. Use the filters to find an option that fits your trip and phone.",
  browseTemplate:
    "Browse {planCount} plans from {providerCount} providers.",
  pricingTemplate:
    "Plans currently start at {startingPrice}. Plan information updated {lastUpdated}.",
};

/** France how-to-choose guide. Country-specific; not used inside the reusable UI. */
export const franceHowToChooseContent: HowToChooseEsimContent = {
  eyebrow: "Buying Guide",
  headingTemplate: "How to Choose an eSIM for {countryName}",
  intro:
    "The right plan depends on how long you will be in {countryName}, where you will travel and how you use your phone. A short city break in Paris has different needs from a month that includes rural villages, the Alps and several neighboring countries.",
  criteria: [
    {
      heading: "Match the validity to your full trip",
      paragraphs: [
        "Choose a validity period that covers every day you need mobile data, including your arrival and departure days. Do not assume a plan starts when you land. Some providers begin the validity period when the eSIM is installed, while others start it when the eSIM first connects to a supported network.",
        "Check the activation rule before installing. A low priced plan can become poor value if its validity starts too early or expires before the end of your trip.",
      ],
    },
    {
      heading: "Choose data for the way you travel",
      paragraphs: [
        "Maps, messaging and occasional browsing use far less data than video, cloud backups, video calls or sharing a connection with a laptop. Pick a fixed data allowance if your use is predictable. Consider a larger or unlimited plan if you expect to work remotely, stream often or use hotspot regularly.",
      ],
    },
    {
      heading: "Check the local network partner",
      paragraphs: [
        "{countryName} has four major mainland mobile network operators: Orange, SFR, Bouygues Telecom and Free Mobile. International eSIM providers connect through one or more local partner networks.",
        "The local partner matters because coverage and performance vary by location. Check the network shown on each plan, especially if your route goes beyond major cities or includes long train journeys, mountains or remote rural areas.",
      ],
    },
    {
      heading: "Compare the restrictions, not just the data label",
      paragraphs: [
        "Two plans with the same data allowance can offer very different value. Compare price per GB, hotspot support, 5G access, top up options and any speed cap. For unlimited plans, read the fair use policy and check how much high speed data is included before speeds are reduced.",
      ],
    },
    {
      heading: "Decide whether you need calls and texts",
      paragraphs: [
        "Many travel eSIMs are data only. You can still use WhatsApp, FaceTime, Signal and other internet-based apps, but you may not receive a French phone number or standard voice and SMS service.",
        "If you need a local number for calls, restaurant bookings or other services, filter for plans that clearly include voice and SMS. Confirm the number type and the countries covered before purchasing.",
      ],
    },
  ],
};

/** France data-needs guide. Country-specific; not used inside the reusable UI. */
export const franceDataNeedsContent: DataNeedsContent = {
  eyebrow: "Data Guide",
  headingTemplate: "How Much Data Do You Need in {countryName}?",
  intro:
    "Your actual use depends on app settings, video quality, background activity and how often you connect to WiFi. These broad ranges can help you choose a starting point.",
  columns: {
    travelerType: "Traveler type",
    planningRange: "Suggested planning range",
    typicalUse: "Typical use",
  },
  rows: [
    {
      travelerType: "Light user",
      planningRange: "1 to 3 GB per week",
      typicalUse:
        "Google Maps, WhatsApp, email, web browsing and occasional social media",
    },
    {
      travelerType: "Average traveler",
      planningRange: "5 to 10 GB per week",
      typicalUse:
        "Frequent navigation, social media, music, travel apps and some short video",
    },
    {
      travelerType: "Heavy user",
      planningRange: "15 GB or more per week",
      typicalUse:
        "Video calls, streaming, remote work, frequent uploads and hotspot use",
    },
  ],
  closingParagraphs: [
    "Download offline maps, music and entertainment over WiFi before traveling if you want a smaller plan. Turn off automatic photo backups and app updates on mobile data to prevent background use from consuming your allowance.",
    "An unlimited plan can be convenient, but it is not automatically the fastest option. Compare the high speed allowance, fair use terms, hotspot rules and reduced speed before deciding.",
  ],
};

/** France network coverage guide. Country-specific; not used inside the reusable UI. */
export const franceNetworkCoverageContent: NetworkCoverageContent = {
  eyebrow: "Coverage",
  headingTemplate: "Mobile Networks and eSIM Coverage in {countryName}",
  paragraphs: [
    "The major mobile networks in {countryName} are Orange, SFR, Bouygues Telecom and Free Mobile. {countryName} has active 4G and 5G networks, but a travel eSIM only receives the technologies and networks supported by its provider agreement.",
    "Paris, Lyon, Marseille, Nice, Bordeaux, Toulouse and other large urban areas usually give travelers more network options than remote areas. Signal quality can still change inside buildings, on underground transport, in tunnels, on fast moving trains and in mountainous regions such as the Alps and the Pyrenees.",
    "Do not judge coverage only by a 5G label. A reliable 4G connection may be more useful than inconsistent 5G along a rural route. Check the listed local partner and its current coverage map when connectivity is important for work or navigation.",
  ],
  networks: ["Orange", "SFR", "Bouygues Telecom", "Free Mobile"],
  territories: [
    "Guadeloupe",
    "Martinique",
    "French Guiana",
    "Réunion",
    "Mayotte",
    "French Polynesia",
  ],
  notice:
    "Coverage for mainland {countryName} does not automatically confirm coverage in every French overseas territory. If your itinerary includes Guadeloupe, Martinique, French Guiana, Réunion, Mayotte, French Polynesia or another territory, confirm that destination separately in the provider coverage list.",
};

/** France unlimited-plans guide. Country-specific; not used inside the reusable UI. */
export const franceUnlimitedPlansContent: UnlimitedPlansContent = {
  eyebrow: "Unlimited Plans",
  headingTemplate: "Are Unlimited eSIM Plans Available in {countryName}?",
  introParagraphs: [
    "Unlimited and high data eSIM plans are available for {countryName} when shown in the current comparison results. The word unlimited does not describe every condition of a plan.",
    "One provider may include a daily high speed allowance followed by slower data. Another may apply a fixed speed cap, a fair use threshold or a separate hotspot limit. Some plans allow tethering without a stated cap, while others restrict it or do not support it.",
  ],
  checklistIntro: "Open the plan details and compare these points:",
  checklist: [
    "The amount of data available at full speed",
    "The speed after any daily or total allowance is reached",
    "Whether hotspot and tethering are allowed",
    "Any daily reset time",
    "The network and 5G access",
    "The activation and validity rules",
  ],
  closing:
    "Choose unlimited for the conditions you need, not only for the label.",
};
