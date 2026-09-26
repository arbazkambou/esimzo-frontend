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

/** China plans-page hero copy. Country-specific; not used inside the reusable UI. */
export const chinaPlansHeroContent: CountryPlansHeroContent = {
  eyebrow: "Compare Plans",
  titleTemplate: "Compare eSIM Plans for {countryName}",
  description:
    "Compare travel eSIM plans for {countryName} by price, data, validity, local network, 5G access, hotspot support and speed limits. Use the filters to find an option that fits your trip and phone.",
  browseTemplate:
    "Browse {planCount} plans from {providerCount} providers.",
  pricingTemplate:
    "Plans currently start at {startingPrice}. Plan information updated {lastUpdated}.",
};

/** China how-to-choose guide. Country-specific; not used inside the reusable UI. */
export const chinaHowToChooseContent: HowToChooseEsimContent = {
  eyebrow: "Buying Guide",
  headingTemplate: "How to Choose an eSIM for {countryName}",
  intro:
    "The right plan depends on how long you will be in {countryName}, where you will travel and how you use your phone. A few days in Beijing or Shanghai has different needs from a high-speed rail trip, a route on Hainan, or a crossing into Hong Kong or Macau.",
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
        "The mobile networks in {countryName} are China Mobile, China Unicom, China Telecom and China Broadnet. International eSIM providers connect through one or more of these local partner networks.",
        "The local partner matters because coverage and the apps you can open vary by network. Check the partner shown on each plan, especially if your route leaves the largest cities or includes a long rail trip. Some familiar apps may not open on networks in mainland China.",
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
        "Many travel eSIMs are data only. You can still use internet-based calling apps where those apps open, but you may not receive a Chinese phone number or standard voice and SMS service.",
        "If you need a local number for calls, hotel bookings or other services, filter for plans that clearly include voice and SMS. Confirm the number type and the countries covered before purchasing.",
      ],
    },
  ],
};

/** China data-needs guide. Country-specific; not used inside the reusable UI. */
export const chinaDataNeedsContent: DataNeedsContent = {
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
  notice:
    "Some apps that open in other countries, including WhatsApp and Google services, are commonly unavailable on networks in mainland {countryName}. Download maps, tickets and messages before you arrive.",
};

/** China network coverage guide. Country-specific; not used inside the reusable UI. */
export const chinaNetworkCoverageContent: NetworkCoverageContent = {
  eyebrow: "Coverage",
  headingTemplate: "Mobile Networks and eSIM Coverage in {countryName}",
  paragraphs: [
    "The mobile networks in {countryName} are China Mobile, China Unicom, China Telecom and China Broadnet. By the end of 2025, the Ministry of Industry and Information Technology reported 5G service in every township and in more than 95% of administrative villages. That is not a promise for every building or train. A travel eSIM only receives the networks and technologies in its provider agreement.",
    "Beijing, Shanghai, Guangzhou and Shenzhen usually offer more network choice than smaller towns. Signal quality can still change inside buildings, on the metro and on a high-speed train.",
    "A 5G label is not a coverage promise. A travel eSIM can stay on 4G when the plan, the partner or the phone does not support 5G at that spot. Check the listed partner and its coverage map when you need a connection for navigation.",
  ],
  networks: ["China Mobile", "China Unicom", "China Telecom", "China Broadnet"],
  notice:
    "Hainan is part of {countryName}. A plan for {countryName} includes it when the provider's coverage does. Hong Kong, Macau and Taiwan are separate destinations.",
};

/** China unlimited-plans guide. Country-specific; not used inside the reusable UI. */
export const chinaUnlimitedPlansContent: UnlimitedPlansContent = {
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

/** China eSIM vs local SIM guide. Country-specific; not used inside the reusable UI. */
export const chinaEsimVsLocalContent: EsimVsLocalContent = {
  eyebrow: "eSIM vs Local",
  headingTemplate: "eSIM or Local SIM in {countryName}?",
  intro:
    "Both can work well. The better choice depends on whether you value setup before arrival, a local phone number or access to a particular Chinese operator.",
  columns: {
    travelEsim: "Travel eSIM",
    localSim: "Local SIM or operator eSIM",
  },
  rows: [
    {
      travelEsim: "Can usually be purchased before departure",
      localSim: "Bought in person at an operator's own service hall",
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
      localSim: "May offer local bundles and a Chinese phone number",
    },
    {
      travelEsim: "Many plans are data only",
      localSim: "Voice and SMS options are more common",
    },
    {
      travelEsim:
        "Support and identification requirements depend on the provider",
      localSim:
        "A foreign visitor registers in person with a passport",
    },
  ],
  closingParagraphs: [
    "A travel eSIM is useful when you want data ready for arrival and do not need a Chinese number. A local plan may suit a longer stay or a traveler who needs conventional calls, SMS and local service. A foreign visitor registers that line in person with a passport or a foreign permanent resident ID card. One person may hold no more than five active SIMs with the same operator. Compare the complete package rather than assuming one type is always cheaper.",
  ],
};

/** China country vs regional Asia guide. Country-specific; not used inside the reusable UI. */
export const chinaCountryVsRegionalContent: CountryVsRegionalContent = {
  eyebrow: "Country vs Regional",
  headingTemplate:
    "Should You Choose a {countryName} eSIM or a Regional Asia eSIM?",
  countryOption: {
    titleTemplate: "{countryName} eSIM",
    paragraphs: [
      "A {countryName} specific eSIM usually makes sense when most or all of your trip is within mainland {countryName}. Many visits never leave the mainland. It may provide more plan choices or a better price for the amount of data you need.",
    ],
  },
  regionalOption: {
    titleTemplate: "Regional Asia eSIM",
    paragraphs: [
      "A regional Asia eSIM can be more convenient if the same trip includes Hong Kong or Macau. You can keep one eSIM profile active across those destinations instead of installing a separate plan in each place.",
    ],
    destinations: ["Hong Kong", "Macau"],
  },
  notice:
    "Always check the included destination list. A plan for {countryName} does not include Hong Kong or Macau. Taiwan is a separate destination. Also verify whether the same data allowance, speed policy and network access apply throughout the region.",
};

/** China phone compatibility guide. Country-specific; not used inside the reusable UI. */
export const chinaPhoneCompatibilityContent: PhoneCompatibilityContent = {
  eyebrow: "Compatibility",
  headingTemplate: "Will My Phone Work With an eSIM in {countryName}?",
  paragraphs: [
    "Your phone generally needs to support eSIM and be carrier unlocked. Compatibility can vary by model, country of purchase and device configuration, even when a phone family normally supports eSIM.",
    "Check the exact model in the eSIMzo compatibility checker before purchasing. You can also look in your phone settings for an option to add an eSIM or mobile plan. If your device is locked to a carrier, contact that carrier before traveling.",
  ],
};

/** China traveler tips. Country-specific; not used inside the reusable UI. */
export const chinaTravelerTipsContent: TravelerTipsContent = {
  eyebrow: "Traveler Tips",
  headingTemplate: "Mobile Connectivity Tips for {countryName}",
  tips: [
    {
      title: "Install before departure, but check the start rule.",
      paragraphs: [
        "Installation at home gives you reliable WiFi and time to solve setup issues. Wait if the provider starts validity at installation. Finish setup before arrival, because some apps may not open after you land.",
      ],
    },
    {
      title: "Protect your primary SIM from roaming charges.",
      paragraphs: [
        "Keep it active if you need your usual number for calls or verification texts, but turn off mobile data switching and data roaming for that line.",
      ],
    },
    {
      title: "Download maps and tickets before a long rail trip.",
      paragraphs: [
        "Save the route and your tickets before you board a high-speed train. Signal can change in stations and on the train.",
      ],
    },
    {
      title: "Expect signal changes on the metro.",
      paragraphs: [
        "Coverage can change in metro stations in Beijing and Shanghai. Download the route if you need it offline.",
      ],
    },
    {
      title: "Some familiar apps may not open.",
      paragraphs: [
        "WhatsApp and Google services are commonly unavailable on networks in mainland {countryName}. Download what you need before you land.",
      ],
    },
    {
      title: "Hong Kong or Macau needs its own listing.",
      paragraphs: [
        "A crossing is a new destination. Hong Kong and Macau have to be named on the plan if you want data there too.",
      ],
    },
  ],
};

/** China FAQs. Country-specific; not used inside the reusable UI. */
export const chinaFaqsContent: CountryFaqsContent = {
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
        "The mobile networks in {countryName} are China Mobile, China Unicom, China Telecom and China Broadnet. Travel eSIM providers use agreements with one or more of these networks. Check the partner named on the plan, because coverage and the apps you can open change by network and location. Some familiar apps may not open on networks in mainland {countryName}.",
    },
    {
      question: "Does {countryName} have 5G coverage?",
      answer:
        "Yes. By the end of 2025, the Ministry of Industry and Information Technology reported 5G service in every township and in more than 95% of administrative villages. That is not a promise for every building or train. A 5G phone does not guarantee that a travel eSIM will connect to 5G. The plan must include 5G access, the partner must offer it where you are, and your device must support the bands. Otherwise the connection uses 4G.",
    },
    {
      question: "Does an eSIM for {countryName} work in Hong Kong?",
      answer:
        "A plan for {countryName} stops at the border. It does not automatically include Hong Kong, Macau or Taiwan. Hainan is part of {countryName}, so it is included when the provider's coverage includes it. Check the list before a crossing or a flight onward.",
    },
    {
      question: "Do I need a passport to buy a local SIM in {countryName}?",
      answer:
        "Yes, if you buy a local line as a foreign visitor. You register in person with a passport or a foreign permanent resident ID card, at an operator's own service hall. One person may hold no more than five active SIMs with the same operator. An international travel eSIM follows that provider's own checks, which can be different.",
    },
    {
      question: "Can I keep using WhatsApp with a {countryName} eSIM?",
      answer:
        "Your WhatsApp account stays linked to your existing number, but WhatsApp is commonly unavailable on networks in mainland {countryName}. A travel eSIM that uses a local partner can have the same limit, so messages may not send. Download what you need before arrival. Hong Kong and Macau are separate destinations, and a mainland plan does not include them.",
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
