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

/** Mexico plans-page hero copy. Country-specific; not used inside the reusable UI. */
export const mexicoPlansHeroContent: CountryPlansHeroContent = {
  eyebrow: "Compare Plans",
  titleTemplate: "Compare eSIM Plans for {countryName}",
  description:
    "Compare travel eSIM plans for {countryName} by price, data, validity, local network, 5G access, hotspot support and speed limits. Use the filters to find an option that fits your trip and phone.",
  browseTemplate:
    "Browse {planCount} plans from {providerCount} providers.",
  pricingTemplate:
    "Plans currently start at {startingPrice}. Plan information updated {lastUpdated}.",
};

/** Mexico how-to-choose guide. Country-specific; not used inside the reusable UI. */
export const mexicoHowToChooseContent: HowToChooseEsimContent = {
  eyebrow: "Buying Guide",
  headingTemplate: "How to Choose an eSIM for {countryName}",
  intro:
    "The right plan depends on how long you will be in {countryName}, where you will travel and how you use your phone. A few days in Mexico City or Cancún has different needs from a route through the Yucatán or Baja California, a mountain road, or a crossing into the United States or Guatemala.",
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
        "The retail mobile networks in {countryName} are Telcel, AT&T and Movistar. Altán is a wholesale network used by other brands, including Bait. International eSIM providers connect through one or more of these local partner networks.",
        "The local partner matters because coverage and performance vary by location. Check the network shown on each plan, especially if your route leaves the big cities or includes a mountain road, rural areas in the south, or the Baja California peninsula.",
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
        "Many travel eSIMs are data only. You can still use WhatsApp, FaceTime, Signal and other internet-based apps, but you may not receive a Mexican phone number or standard voice and SMS service.",
        "If you need a local number for calls, restaurant bookings or other services, filter for plans that clearly include voice and SMS. Confirm the number type and the countries covered before purchasing.",
      ],
    },
  ],
};

/** Mexico data-needs guide. Country-specific; not used inside the reusable UI. */
export const mexicoDataNeedsContent: DataNeedsContent = {
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

/** Mexico network coverage guide. Country-specific; not used inside the reusable UI. */
export const mexicoNetworkCoverageContent: NetworkCoverageContent = {
  eyebrow: "Coverage",
  headingTemplate: "Mobile Networks and eSIM Coverage in {countryName}",
  paragraphs: [
    "The retail mobile networks in {countryName} are Telcel, AT&T and Movistar. Altán is a wholesale network used by other brands. For the fourth quarter of 2025, the CRT reported guaranteed 5G coverage for 34.5% of the population on Telcel. A wider reported 5G footprint was 45.6% of the population for AT&T and 44.1% for Telcel. 4G reaches more of the population. A travel eSIM only receives the networks and technologies in its provider agreement.",
    "Mexico City, Guadalajara, Monterrey and Cancún usually offer more network choice than smaller towns and open country. Signal quality can still change inside buildings, on the metro, on mountain roads and in rural areas.",
    "A 5G label is not a coverage promise. A travel eSIM can stay on 4G when the plan, the partner or the phone does not support 5G at that spot. Check the listed partner and its coverage map when you need a connection for navigation.",
  ],
  networks: ["Telcel", "AT&T", "Movistar"],
  notice:
    "Baja California and the Yucatán are part of {countryName}. A plan for {countryName} includes them when the provider's coverage does. The United States is a separate country, including along the northern border.",
};

/** Mexico unlimited-plans guide. Country-specific; not used inside the reusable UI. */
export const mexicoUnlimitedPlansContent: UnlimitedPlansContent = {
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

/** Mexico eSIM vs local SIM guide. Country-specific; not used inside the reusable UI. */
export const mexicoEsimVsLocalContent: EsimVsLocalContent = {
  eyebrow: "eSIM vs Local",
  headingTemplate: "eSIM or Local SIM in {countryName}?",
  intro:
    "Both can work well. The better choice depends on whether you value setup before arrival, a local phone number or access to a particular Mexican operator.",
  columns: {
    travelEsim: "Travel eSIM",
    localSim: "Local SIM or operator eSIM",
  },
  rows: [
    {
      travelEsim: "Can usually be purchased before departure",
      localSim: "Often purchased from a Mexican operator shop or airport dealer",
    },
    {
      travelEsim: "No physical SIM swap is needed",
      localSim: "Physical SIM and eSIM options depend on the operator",
    },
    {
      travelEsim: "Lets you keep your primary SIM installed",
      localSim: "May replace a physical primary SIM in a single slot phone",
    },
    {
      travelEsim: "Makes plans from several providers easier to compare",
      localSim: "May offer local bundles and a Mexican phone number",
    },
    {
      travelEsim: "Many plans are data only",
      localSim: "Voice and SMS options are more common",
    },
    {
      travelEsim:
        "Support and identification requirements depend on the provider",
      localSim:
        "A foreign visitor links a local line to a passport or a temporary CURP",
    },
  ],
  closingParagraphs: [
    "A travel eSIM is useful when you want data ready for arrival and do not need a Mexican number. A local plan may suit a longer stay or a traveler who needs conventional calls, SMS and local service. Official guidelines say a foreign visitor is identified with a passport or a temporary CURP. Compare the complete package rather than assuming one type is always cheaper.",
  ],
};

/** Mexico country vs regional Latin America guide. Country-specific; not used inside the reusable UI. */
export const mexicoCountryVsRegionalContent: CountryVsRegionalContent = {
  eyebrow: "Country vs Regional",
  headingTemplate:
    "Should You Choose a {countryName} eSIM or a Regional Latin America eSIM?",
  countryOption: {
    titleTemplate: "{countryName} eSIM",
    paragraphs: [
      "A {countryName} specific eSIM usually makes sense when most or all of your trip is within {countryName}. Many visits never leave the country. It may provide more plan choices or a better price for the amount of data you need.",
    ],
  },
  regionalOption: {
    titleTemplate: "Regional Latin America eSIM",
    paragraphs: [
      "A regional Latin America eSIM can be more convenient if the same trip includes Guatemala or Belize. You can keep one eSIM profile active while crossing those borders instead of installing a separate plan in each country.",
    ],
    destinations: ["Guatemala", "Belize"],
  },
  notice:
    "Always check the included destination list. The United States is a frequent pairing and is outside a Latin America plan. A plan for {countryName} stops at the border. Other Central American countries are included only when the provider names them. Also verify whether the same data allowance, speed policy and network access apply throughout the region.",
};

/** Mexico phone compatibility guide. Country-specific; not used inside the reusable UI. */
export const mexicoPhoneCompatibilityContent: PhoneCompatibilityContent = {
  eyebrow: "Compatibility",
  headingTemplate: "Will My Phone Work With an eSIM in {countryName}?",
  paragraphs: [
    "Your phone generally needs to support eSIM and be carrier unlocked. Compatibility can vary by model, country of purchase and device configuration, even when a phone family normally supports eSIM.",
    "Check the exact model in the eSIMzo compatibility checker before purchasing. You can also look in your phone settings for an option to add an eSIM or mobile plan. If your device is locked to a carrier, contact that carrier before traveling.",
  ],
};

/** Mexico traveler tips. Country-specific; not used inside the reusable UI. */
export const mexicoTravelerTipsContent: TravelerTipsContent = {
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
      title: "Download maps before a mountain road or a rural route.",
      paragraphs: [
        "Signal can thin out on mountain roads and in rural areas, including in the south. Save maps before you leave a city.",
      ],
    },
    {
      title: "Expect signal changes on the Mexico City metro.",
      paragraphs: [
        "Coverage can change in metro stations. Download the route if you need it offline.",
      ],
    },
    {
      title: "The northern border is the United States.",
      paragraphs: [
        "Data for {countryName} stops at that border. The United States is not part of a Latin America plan unless the provider names it.",
      ],
    },
    {
      title: "Guatemala or Belize needs its own listing.",
      paragraphs: [
        "A crossing south is a new country. Guatemala and Belize have to be named on the plan if you want data there too.",
      ],
    },
  ],
};

/** Mexico FAQs. Country-specific; not used inside the reusable UI. */
export const mexicoFaqsContent: CountryFaqsContent = {
  heading: "Frequently Asked Questions",
  faqs: [
    {
      question: "What is the best eSIM for {countryName}?",
      answer:
        "There is no single best eSIM for every trip to {countryName}. The right choice depends on your trip length, data use, route, required network, hotspot needs and whether you need calls or SMS. Compare the current plans by total price, price per GB, validity, local network, 5G access and fair use terms. A smaller fixed data plan may offer better value than an unlimited plan for light use.",
    },
    {
      question: "How much does an eSIM for {countryName} cost?",
      answer:
        "{countryName} eSIM prices vary by provider, data allowance, validity and included features. Current plans on eSIMzo start at {{starting_price}}, but the lowest price is not always the lowest cost per GB or the best match for your trip. Check whether taxes, speed limits, hotspot restrictions or activation rules affect the value. Live pricing and availability were updated {{last_updated}}.",
    },
    {
      question: "Can tourists use an eSIM in {countryName}?",
      answer:
        "Yes, tourists can use a compatible travel eSIM in {countryName}. Your phone must support eSIM and normally needs to be carrier unlocked. International travel eSIMs can usually be purchased online before arrival, although account, payment and identity requirements vary by provider. Install according to the provider instructions and check whether data roaming must be enabled on the eSIM line.",
    },
    {
      question: "Which mobile networks operate in {countryName}?",
      answer:
        "The retail mobile networks in {countryName} are Telcel, AT&T and Movistar. Altán is a wholesale network used by other brands, including Bait. Travel eSIM providers use agreements with one or more of these networks. Check the partner named on the plan, because coverage and 5G access change by location and device, especially outside the largest cities.",
    },
    {
      question: "Does {countryName} have 5G coverage?",
      answer:
        "Yes, in parts of the country. For the fourth quarter of 2025, the CRT reported guaranteed 5G coverage for 34.5% of the population on Telcel. A wider reported 5G footprint was 45.6% of the population for AT&T and 44.1% for Telcel. 4G covers much more of the population. A 5G phone does not guarantee that a travel eSIM will connect to 5G. The plan must include 5G access, the partner must offer it where you are, and your device must support the bands. Otherwise the connection uses 4G.",
    },
    {
      question: "Does an eSIM for {countryName} work in the United States?",
      answer:
        "A plan for {countryName} stops at the border. It does not automatically include the United States, Guatemala or Belize. Baja California and the Yucatán are part of {countryName}, so they are included when the provider's coverage includes them. Check the list before a drive north or a crossing south.",
    },
    {
      question: "Do I need a passport to buy a local SIM in {countryName}?",
      answer:
        "Yes, if you buy a local line as a foreign visitor. Official guidelines say that visitor is identified with a passport or a temporary CURP. The provider records the name, country, document number and the phone number linked to that line. An international travel eSIM follows that provider's own checks, which can be different.",
    },
    {
      question: "Can I keep using WhatsApp with a {countryName} eSIM?",
      answer:
        "Yes. WhatsApp remains linked to your existing account and phone number when you use a travel eSIM for mobile data. You normally do not need to change the number inside WhatsApp. Keep access to your primary number if you may need a verification code, and avoid choosing the option to replace your WhatsApp number unless you genuinely want to change it.",
    },
    {
      question: "When should I install and activate my {countryName} eSIM?",
      answer:
        "Install it before departure when the provider allows installation without starting the validity period. This gives you time to complete setup over reliable WiFi. If validity begins at installation, wait until closer to departure or follow the provider timing. Some plans activate only after connecting in {countryName}. Read the activation policy and save the QR code or manual details before traveling.",
    },
    {
      question: "Can I use hotspot with an eSIM in {countryName}?",
      answer:
        "Hotspot use depends on the specific plan. Many {countryName} eSIMs allow tethering, but some unlimited or daily data plans apply a separate hotspot limit or block it. Check the plan details before purchasing if you need to connect a laptop, tablet or another phone. Also remember that video calls, cloud syncing and software updates can consume a large amount of data through hotspot.",
    },
  ],
};
