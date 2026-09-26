import type {
  CountryFaqsContent,
  CountryPlansHeroContent,
  CountryVsRegionalContent,
  DataNeedsContent,
  EsimVsLocalContent,
  HowToChooseEsimContent,
  NetworkCoverageContent,
  PhoneCompatibilityContent,
  TravelerTipsContent,
  UnlimitedPlansContent,
} from "./types";

/** North America plans-page hero copy. Region-specific; not used inside the reusable UI. */
export const northAmericaPlansHeroContent: CountryPlansHeroContent = {
  eyebrow: "Compare Plans",
  titleTemplate: "Compare eSIM Plans for {countryName}",
  description:
    "Compare travel eSIM plans for {countryName} by price, data, validity, local network, 5G access, hotspot support and speed limits. Use the filters to find an option that fits your trip and phone.",
  browseTemplate:
    "Browse {planCount} plans from {providerCount} providers.",
  pricingTemplate:
    "Plans currently start at {startingPrice}. Plan information updated {lastUpdated}.",
};

/** North America how-to-choose guide. Region-specific; not used inside the reusable UI. */
export const northAmericaHowToChooseContent: HowToChooseEsimContent = {
  eyebrow: "Buying Guide",
  headingTemplate: "How to Choose an eSIM for {countryName}",
  intro:
    "The right plan depends on how many borders you will cross, how long you will stay and how you use your phone. A few days in New York or Toronto has different needs from a drive across that border, a trip to Alaska or Hawaii, or a stop in Bermuda.",
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
        "There is no single mobile network for {countryName}. A regional plan connects through a local partner in each country it lists, and that partner changes at the border. The United States uses Verizon, AT&T and T-Mobile. T-Mobile acquired UScellular's wireless operations in 2025. Canada uses Bell, Rogers and Telus. Flanker brands in Canada use one of those networks. Bermuda, Greenland, and Saint Pierre and Miquelon have their own operators.",
        "Read the country list on the plan. Mexico is in the Latin America region, not this one. Puerto Rico and the United States Virgin Islands are in the Caribbean region. Alaska and Hawaii are part of the United States, and a plan for the contiguous states can still leave them out.",
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
        "Many travel eSIMs are data only. You can still use WhatsApp, FaceTime, Signal and other internet-based apps, but you may not receive a local phone number or standard voice and SMS service in the country you are visiting.",
        "If you need a local number for calls, restaurant bookings or other services, filter for plans that clearly include voice and SMS. Confirm the number type and the countries covered before purchasing.",
      ],
    },
  ],
};

/** North America data-needs guide. Region-specific; not used inside the reusable UI. */
export const northAmericaDataNeedsContent: DataNeedsContent = {
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

/** North America network coverage guide. Region-specific; not used inside the reusable UI. */
export const northAmericaNetworkCoverageContent: NetworkCoverageContent = {
  eyebrow: "Coverage",
  headingTemplate: "Mobile Networks and eSIM Coverage in {countryName}",
  paragraphs: [
    "A plan for {countryName} does not put you on one network for the United States and Canada. It uses a local partner in each country the provider names, and that partner changes at the border. There is no single 5G percentage for the region. In Canada, the CRTC reports that 5G is available to 94% of the population. Rural and First Nations reserve coverage lags that average, and Yukon, the Northwest Territories and Nunavut still have no reported 5G. That figure is Canada, not the United States. A travel eSIM only receives the partners and technologies in its agreement.",
    "New York, Los Angeles, Toronto and Vancouver usually offer more network choice than national parks, mountain roads and long rural highways. In those places a steady 4G connection can matter more than a 5G label.",
    "A 5G label is not a coverage promise. A travel eSIM can stay on 4G when the plan, the partner or the phone does not support 5G at that spot. Check the listed countries and partners when you need a connection for navigation.",
  ],
  notice:
    "This region is the United States, Canada, Bermuda, Greenland, and Saint Pierre and Miquelon. Mexico is in the Latin America region. Puerto Rico and the United States Virgin Islands are in the Caribbean region. Alaska and Hawaii are part of the United States, and a contiguous-states plan can leave them out. Greenland is in this region, not on the Europe list.",
};

/** North America unlimited-plans guide. Region-specific; not used inside the reusable UI. */
export const northAmericaUnlimitedPlansContent: UnlimitedPlansContent = {
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

/** North America eSIM vs local SIM guide. Region-specific; not used inside the reusable UI. */
export const northAmericaEsimVsLocalContent: EsimVsLocalContent = {
  eyebrow: "eSIM vs Local",
  headingTemplate: "eSIM or Local SIM in {countryName}?",
  intro:
    "Both can work well. The better choice depends on whether you are crossing the border between the United States and Canada or staying in one country long enough to want a local number.",
  columns: {
    travelEsim: "Travel eSIM",
    localSim: "Local SIM or operator eSIM",
  },
  rows: [
    {
      travelEsim: "Can usually be purchased before departure",
      localSim: "Bought in the country where you want a local line",
    },
    {
      travelEsim: "One profile can cover every country the plan names",
      localSim: "A local line usually stops being a local plan at that country's border",
    },
    {
      travelEsim: "Lets you keep your primary SIM installed",
      localSim: "May replace a physical primary SIM in a single slot phone",
    },
    {
      travelEsim: "Makes plans from several providers easier to compare",
      localSim: "May offer a phone number in that one country",
    },
    {
      travelEsim: "Many plans are data only",
      localSim: "Voice and SMS options are more common",
    },
    {
      travelEsim:
        "Support and identification requirements depend on the provider",
      localSim:
        "Identity checks differ by country, and some ask for identification",
    },
  ],
  closingParagraphs: [
    "A travel eSIM is useful when the same trip includes more than one country and you do not need a local number in each of them. A local plan may suit a longer stay in one country. The United States, Canada, Bermuda, Greenland, and Saint Pierre and Miquelon do not share one rule for a local line. A travel eSIM follows the provider's own checks. Compare the complete package rather than assuming one type is always cheaper.",
  ],
};

/** North America single-country vs regional guide. Region-specific; not used inside the reusable UI. */
export const northAmericaCountryVsRegionalContent: CountryVsRegionalContent = {
  eyebrow: "Country vs Regional",
  headingTemplate:
    "Should You Choose a Single-Country eSIM or a {countryName} eSIM?",
  countryOption: {
    titleTemplate: "Single-country eSIM",
    paragraphs: [
      "A plan for one country usually makes sense when the whole trip stays there. A week in the United States or Canada may offer more plan choices, or a better price for the data you need, than a regional plan that also covers places you will not visit.",
    ],
  },
  regionalOption: {
    titleTemplate: "{countryName} eSIM",
    paragraphs: [
      "A {countryName} eSIM can be more convenient when the same trip crosses the border between the United States and Canada. You keep one eSIM profile active instead of installing a new plan at the border. It includes a country only when the provider names it.",
    ],
    destinations: [
      "United States",
      "Canada",
      "Bermuda",
      "Greenland",
      "Saint Pierre and Miquelon",
    ],
  },
  notice:
    "Always check the included destination list. Mexico is in the Latin America region, not this one. Puerto Rico and the United States Virgin Islands are in the Caribbean region. Alaska and Hawaii are part of the United States, and a plan can still leave them out. Saint Pierre and Miquelon is not part of Canada. Also verify whether the same data allowance, speed policy and network access apply in every listed country.",
};

/** North America phone compatibility guide. Region-specific; not used inside the reusable UI. */
export const northAmericaPhoneCompatibilityContent: PhoneCompatibilityContent =
  {
    eyebrow: "Compatibility",
    headingTemplate: "Will My Phone Work With an eSIM in {countryName}?",
    paragraphs: [
      "Your phone generally needs to support eSIM and be carrier unlocked. Compatibility can vary by model, country of purchase and device configuration, even when a phone family normally supports eSIM.",
      "Check the exact model in the eSIMzo compatibility checker before purchasing. You can also look in your phone settings for an option to add an eSIM or mobile plan. If your device is locked to a carrier, contact that carrier before traveling.",
    ],
  };

/** North America traveler tips. Region-specific; not used inside the reusable UI. */
export const northAmericaTravelerTipsContent: TravelerTipsContent = {
  eyebrow: "Traveler Tips",
  headingTemplate: "Mobile Connectivity Tips for {countryName}",
  tips: [
    {
      title: "Install before departure, but check the start rule.",
      paragraphs: [
        "Installation at home gives you reliable WiFi and time to solve setup issues. Wait if the provider starts validity at installation.",
      ],
    },
    {
      title: "Protect your primary SIM from roaming charges.",
      paragraphs: [
        "Keep it active if you need your usual number for calls or verification texts, but turn off mobile data switching and data roaming for that line.",
      ],
    },
    {
      title: "The border does not carry the plan over.",
      paragraphs: [
        "The United States and Canada each have to be named. Alaska is part of the United States, so a Canada-only plan stops before Alaska.",
      ],
    },
    {
      title: "Mexico is not in this region.",
      paragraphs: [
        "Mexico is in the Latin America region. A {countryName} plan does not include it unless the provider names Mexico separately.",
      ],
    },
    {
      title: "Alaska, Hawaii and Puerto Rico need a separate check.",
      paragraphs: [
        "Alaska and Hawaii are part of the United States, and a contiguous-states plan can leave them out. Puerto Rico is in the Caribbean region.",
      ],
    },
    {
      title: "Bermuda, Greenland, and Saint Pierre and Miquelon are separate.",
      paragraphs: [
        "All three are in this region and are included only when named. Saint Pierre and Miquelon is not part of Canada. Greenland is not on the Europe list.",
      ],
    },
  ],
};

/** North America FAQs. Region-specific; not used inside the reusable UI. */
export const northAmericaFaqsContent: CountryFaqsContent = {
  heading: "Frequently Asked Questions",
  faqs: [
    {
      question: "What is the best eSIM for {countryName}?",
      answer:
        "There is no single best eSIM for every trip across {countryName}. The right choice depends on which countries you will enter, how long the trip lasts, how much data you use, and whether you need hotspot or a local number. Compare the current plans by total price, price per GB, validity, the country list and fair use terms. A plan for the United States alone can cost less if you never cross into Canada.",
    },
    {
      question: "How much does an eSIM for {countryName} cost?",
      answer:
        "{countryName} eSIM prices vary by provider, data allowance, validity and how many countries are included. Current plans on eSIMzo start at {{starting_price}}, but the lowest price is not always the lowest cost per GB or the best match for your route. Check whether speed limits, hotspot restrictions or activation rules affect the value. Live pricing and availability were updated {{last_updated}}.",
    },
    {
      question: "Can tourists use an eSIM in {countryName}?",
      answer:
        "Yes, tourists can use a compatible travel eSIM for the countries a {countryName} plan names. Your phone must support eSIM and normally needs to be carrier unlocked. International travel eSIMs can usually be purchased online before arrival, although account, payment and identity requirements vary by provider. Install according to the provider instructions and check whether data roaming must be enabled on the eSIM line.",
    },
    {
      question: "Which mobile networks does a {countryName} eSIM use?",
      answer:
        "There is no single network for {countryName}. The plan uses a local partner in each country it lists. The United States has Verizon, AT&T and T-Mobile. T-Mobile acquired UScellular's wireless operations in 2025. Canada has Bell, Rogers and Telus. Bermuda, Greenland, and Saint Pierre and Miquelon use their own operators. Check the partner named for each stop, because coverage changes at the border.",
    },
    {
      question: "Does {countryName} have 5G coverage?",
      answer:
        "Yes, in many cities, and less so on rural roads. There is no single 5G percentage for {countryName}. Each country measures its own operators, and the plan only uses the partner in its agreement. In Canada, the CRTC reports that 5G is available to 94% of the population, and the Territories still have no reported 5G. That figure is Canada, not the United States, Bermuda or Greenland. A 5G phone does not guarantee a 5G connection. The plan must include 5G access. Otherwise the connection uses 4G.",
    },
    {
      question: "Does a {countryName} eSIM include every country?",
      answer:
        "No. It includes only the places the provider names. This region is the United States, Canada, Bermuda, Greenland, and Saint Pierre and Miquelon. A plan can omit any of them. Mexico is in the Latin America region, not this one. Puerto Rico and the United States Virgin Islands are in the Caribbean region. Alaska and Hawaii are part of the United States, and a plan can still leave them out.",
    },
    {
      question: "Do I need a passport to buy a local SIM in {countryName}?",
      answer:
        "It depends on the country. The United States, Canada, Bermuda, Greenland, and Saint Pierre and Miquelon do not share one rule for a local line. A travel eSIM for {countryName} follows the provider's own checks, which can be different from buying a local line after you arrive. Read that step before you count on a shop at the airport to finish the setup.",
    },
    {
      question: "Can I keep using WhatsApp with a {countryName} eSIM?",
      answer:
        "Yes. WhatsApp remains linked to your existing account and phone number when you use a travel eSIM for mobile data in {countryName}. You normally do not need to change the number inside WhatsApp. Keep access to your primary number if you may need a verification code, and avoid choosing the option to replace your WhatsApp number unless you genuinely want to change it.",
    },
    {
      question: "When should I install and activate my {countryName} eSIM?",
      answer:
        "Install it before departure when the provider allows installation without starting the validity period. A border crossing is a poor moment to scan a QR code. If validity begins at installation, wait until closer to departure or follow the provider timing. Some plans activate only after the eSIM connects in a country the plan names. Read the activation policy and save the QR code or manual details before you leave.",
    },
    {
      question: "Can I use hotspot with an eSIM in {countryName}?",
      answer:
        "Hotspot use depends on the specific plan. Many {countryName} eSIMs allow tethering, but some unlimited or daily data plans apply a separate hotspot limit or block it. Check the plan details before purchasing if you need to connect a laptop or another phone on a long drive. Video calls and cloud syncing can use a large amount of data through hotspot.",
    },
  ],
};
