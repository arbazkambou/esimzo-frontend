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

/** United States plans-page hero copy. Country-specific; not used inside the reusable UI. */
export const unitedStatesPlansHeroContent: CountryPlansHeroContent = {
  eyebrow: "Compare Plans",
  titleTemplate: "Compare eSIM Plans for {countryName}",
  description:
    "Compare travel eSIM plans for {countryName} by price, data, validity, local network, 5G access, hotspot support and speed limits. Use the filters to find an option that fits your trip and phone.",
  browseTemplate:
    "Browse {planCount} plans from {providerCount} providers.",
  pricingTemplate:
    "Plans currently start at {startingPrice}. Plan information updated {lastUpdated}.",
};

/** United States how-to-choose guide. Country-specific; not used inside the reusable UI. */
export const unitedStatesHowToChooseContent: HowToChooseEsimContent = {
  eyebrow: "Buying Guide",
  headingTemplate: "How to Choose an eSIM for {countryName}",
  intro:
    "The right plan depends on how long you will be in {countryName}, where you will travel and how you use your phone. A few days in New York or Los Angeles has different needs from a national park road trip, time in Alaska or Hawaii, or a route that continues into Canada or Mexico.",
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
        "The three nationwide mobile networks in {countryName} are Verizon, AT&T and T-Mobile. T-Mobile acquired UScellular's wireless operations in 2025. International eSIM providers connect through one or more of these local partner networks.",
        "The local partner matters because coverage and performance vary by location. Check the network shown on each plan, especially if your route leaves major cities or includes national parks, mountain roads, Alaska, Hawaii or a US territory.",
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
        "Many travel eSIMs are data only. You can still use WhatsApp, FaceTime, Signal and other internet-based apps, but you may not receive an American phone number or standard voice and SMS service.",
        "If you need a local number for calls, restaurant bookings or other services, filter for plans that clearly include voice and SMS. Confirm the number type and the countries covered before purchasing.",
      ],
    },
  ],
};

/** United States data-needs guide. Country-specific; not used inside the reusable UI. */
export const unitedStatesDataNeedsContent: DataNeedsContent = {
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

/** United States network coverage guide. Country-specific; not used inside the reusable UI. */
export const unitedStatesNetworkCoverageContent: NetworkCoverageContent = {
  eyebrow: "Coverage",
  headingTemplate: "Mobile Networks and eSIM Coverage in {countryName}",
  paragraphs: [
    "The nationwide mobile networks in {countryName} are Verizon, AT&T and T-Mobile. T-Mobile acquired UScellular's wireless operations in 2025. A travel eSIM connects through one or more of these partners, and it only receives the networks and technologies in its provider agreement.",
    "New York, Los Angeles, Chicago, Miami, San Francisco and other large cities usually offer more network choice than rural highways and public lands. Signal quality can still change inside buildings, in subway stations, in tunnels and in mountain or desert country such as the Rockies, the Sierra Nevada and the Southwest.",
    "A 5G label is not a coverage promise. Verizon, AT&T and T-Mobile all operate 5G, but a travel eSIM can still fall back to 4G when the plan, the partner or the phone does not support 5G at that spot. In national parks and on long rural drives, a steady 4G connection can be more useful than inconsistent 5G. Check the listed partner and its coverage map when you need a connection for navigation.",
  ],
  networks: ["Verizon", "AT&T", "T-Mobile"],
  territories: [
    "Puerto Rico",
    "U.S. Virgin Islands",
    "Guam",
    "American Samoa",
    "Northern Mariana Islands",
  ],
  notice:
    "Alaska and Hawaii are states, and Puerto Rico, the U.S. Virgin Islands, Guam, American Samoa and the Northern Mariana Islands are US territories. A plan described as covering the contiguous states does not automatically include them. Confirm each place on your route in the provider coverage list.",
};

/** United States unlimited-plans guide. Country-specific; not used inside the reusable UI. */
export const unitedStatesUnlimitedPlansContent: UnlimitedPlansContent = {
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

/** United States eSIM vs local SIM guide. Country-specific; not used inside the reusable UI. */
export const unitedStatesEsimVsLocalContent: EsimVsLocalContent = {
  eyebrow: "eSIM vs Local",
  headingTemplate: "eSIM or Local SIM in {countryName}?",
  intro:
    "Both can work well. The better choice depends on whether you value setup before arrival, a local phone number or access to a particular American operator.",
  columns: {
    travelEsim: "Travel eSIM",
    localSim: "Local SIM or operator eSIM",
  },
  rows: [
    {
      travelEsim: "Can usually be purchased before departure",
      localSim: "Often purchased directly from an American operator or retailer",
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
      localSim: "May offer local bundles and an American phone number",
    },
    {
      travelEsim: "Many plans are data only",
      localSim: "Voice and SMS options are more common",
    },
    {
      travelEsim:
        "Support and identification requirements depend on the provider",
      localSim:
        "Purchase and identification requirements depend on the operator and sales channel",
    },
  ],
  closingParagraphs: [
    "A travel eSIM is useful when you want data ready for arrival and do not need an American number. A local plan may suit a longer stay or a traveler who needs conventional calls, SMS and local service. Prepaid plans from American operators typically do not require a credit check. Compare the complete package rather than assuming one type is always cheaper.",
  ],
};

/** United States country vs regional North America guide. Country-specific; not used inside the reusable UI. */
export const unitedStatesCountryVsRegionalContent: CountryVsRegionalContent = {
  eyebrow: "Country vs Regional",
  headingTemplate:
    "Should You Choose a {countryName} eSIM or a Regional North America eSIM?",
  countryOption: {
    titleTemplate: "{countryName} eSIM",
    paragraphs: [
      "A {countryName} specific eSIM usually makes sense when most or all of your trip is within {countryName}. It may provide more plan choices or a better price for the amount of data you need.",
    ],
  },
  regionalOption: {
    titleTemplate: "Regional North America eSIM",
    paragraphs: [
      "A regional North America eSIM can be more convenient if the same trip includes Canada or Mexico. You can keep one eSIM profile active while crossing borders instead of installing a separate plan in each country.",
    ],
    destinations: ["Canada", "Mexico"],
  },
  notice:
    "Always check the included destination list. A plan marketed for North America may not include Caribbean islands or countries in Central America beyond Mexico. Alaska, Hawaii, Puerto Rico and other US territories are part of {countryName}, but a travel plan does not always name them with the contiguous states. Also verify whether the same data allowance, speed policy and network access apply throughout the region.",
};

/** United States phone compatibility guide. Country-specific; not used inside the reusable UI. */
export const unitedStatesPhoneCompatibilityContent: PhoneCompatibilityContent =
  {
    eyebrow: "Compatibility",
    headingTemplate: "Will My Phone Work With an eSIM in {countryName}?",
    paragraphs: [
      "Your phone generally needs to support eSIM and be carrier unlocked. Compatibility can vary by model, country of purchase and device configuration, even when a phone family normally supports eSIM.",
      "Check the exact model in the eSIMzo compatibility checker before purchasing. You can also look in your phone settings for an option to add an eSIM or mobile plan. If your device is locked to a carrier, contact that carrier before traveling.",
    ],
  };

/** United States traveler tips. Country-specific; not used inside the reusable UI. */
export const unitedStatesTravelerTipsContent: TravelerTipsContent = {
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
      title: "Download offline maps before a park or a long drive.",
      paragraphs: [
        "Coverage can thin out in the Rockies, the Sierra Nevada, the desert Southwest and many national parks. Save maps, tickets and lodging details before you leave a city.",
      ],
    },
    {
      title: "Expect the signal to change underground.",
      paragraphs: [
        "Subway stations and tunnels in cities such as New York can interrupt a mobile signal. Keep tickets and directions available offline.",
      ],
    },
    {
      title: "Confirm Alaska, Hawaii and US territories by name.",
      paragraphs: [
        "A plan for the contiguous states may not include Alaska, Hawaii, Puerto Rico or more distant territories such as Guam. Check each destination in the provider list.",
      ],
    },
    {
      title: "Treat Canada and Mexico as separate destinations.",
      paragraphs: [
        "Data for {countryName} does not automatically continue after you cross into Canada or Mexico. If the trip includes either country, that country has to be on the plan.",
      ],
    },
  ],
};

/** United States FAQs. Country-specific; not used inside the reusable UI. */
export const unitedStatesFaqsContent: CountryFaqsContent = {
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
        "The three nationwide mobile networks in {countryName} are Verizon, AT&T and T-Mobile. T-Mobile acquired UScellular's wireless operations in 2025. Travel eSIM providers use agreements with one or more of these networks. The partner can change coverage and 5G access, especially outside major cities, so check the network named in the plan details.",
    },
    {
      question: "Does {countryName} have 5G coverage?",
      answer:
        "Yes. Verizon, AT&T and T-Mobile operate 5G networks in {countryName}. Service is generally easier to find in large cities than on rural highways, in mountain ranges or inside national parks. A 5G phone does not guarantee that every travel eSIM will connect to 5G. The plan must include 5G access, the partner network must offer it where you are, and your device must support the relevant bands. Otherwise the connection may use 4G.",
    },
    {
      question:
        "Does an eSIM for {countryName} include Alaska, Hawaii and Puerto Rico?",
      answer:
        "It includes them only when the provider names them. Alaska and Hawaii are states. Puerto Rico and the U.S. Virgin Islands are US territories, and Guam, American Samoa and the Northern Mariana Islands are separate Pacific territories. A plan described as covering the contiguous states can leave these places out. Check each name in the coverage list before you buy.",
    },
    {
      question:
        "Can a {countryName} travel eSIM include calls, SMS or a phone number?",
      answer:
        "Some {countryName} eSIM plans include voice, SMS or a phone number, but many travel plans are data only. Use the plan filters and read the details to confirm what is included. If a number is provided, check whether it is American or from another country and whether incoming and outgoing calls and texts are supported. Internet calling apps work with a data only plan.",
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
