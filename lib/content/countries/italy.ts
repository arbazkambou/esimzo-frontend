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

/** Italy plans-page hero copy. Country-specific; not used inside the reusable UI. */
export const italyPlansHeroContent: CountryPlansHeroContent = {
  eyebrow: "Compare Plans",
  titleTemplate: "Compare eSIM Plans for {countryName}",
  description:
    "Compare travel eSIM plans for {countryName} by price, data, validity, local network, 5G access, hotspot support and speed limits. Use the filters to find an option that fits your trip and phone.",
  browseTemplate:
    "Browse {planCount} plans from {providerCount} providers.",
  pricingTemplate:
    "Plans currently start at {startingPrice}. Plan information updated {lastUpdated}.",
};

/** Italy how-to-choose guide. Country-specific; not used inside the reusable UI. */
export const italyHowToChooseContent: HowToChooseEsimContent = {
  eyebrow: "Buying Guide",
  headingTemplate: "How to Choose an eSIM for {countryName}",
  intro:
    "The right plan depends on how long you will be in {countryName}, where you will travel and how you use your phone. A few days in Rome or Milan has different needs from a route through Florence and Venice, a trip into the Alps or along the Amalfi coast, or a ferry to Sicily or Sardinia.",
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
        "The mobile networks in {countryName} are TIM, Vodafone, WindTre and Iliad. AGCOM reports Fastweb and Vodafone together as Fastweb+Vodafone. Other brands resell one of these networks. International eSIM providers connect through one or more of these local partner networks.",
        "The local partner matters because coverage and performance vary by location. Check the network shown on each plan, especially if your route leaves the big cities or includes the Alps, the Amalfi coast, or a smaller island.",
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
        "Many travel eSIMs are data only. You can still use WhatsApp, FaceTime, Signal and other internet-based apps, but you may not receive an Italian phone number or standard voice and SMS service.",
        "If you need a local number for calls, restaurant bookings or other services, filter for plans that clearly include voice and SMS. Confirm the number type and the countries covered before purchasing.",
      ],
    },
  ],
};

/** Italy data-needs guide. Country-specific; not used inside the reusable UI. */
export const italyDataNeedsContent: DataNeedsContent = {
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

/** Italy network coverage guide. Country-specific; not used inside the reusable UI. */
export const italyNetworkCoverageContent: NetworkCoverageContent = {
  eyebrow: "Coverage",
  headingTemplate: "Mobile Networks and eSIM Coverage in {countryName}",
  paragraphs: [
    "The mobile networks in {countryName} are TIM, Vodafone, WindTre and Iliad. AGCOM reports Fastweb and Vodafone together as Fastweb+Vodafone. For 2024, AGCOM reported overall 5G coverage for 99.5% of the population. That figure combines the networks. It is not the coverage of each one. A travel eSIM only receives the networks and technologies in its provider agreement.",
    "Rome, Milan, Naples, Turin, Florence and Bologna usually offer more network choice than smaller towns and open country. Signal quality can still change inside buildings, on the metro, in rail tunnels, in the Alps and on smaller islands.",
    "A 5G label is not a coverage promise. A travel eSIM can stay on 4G when the plan, the partner or the phone does not support 5G at that spot. Check the listed partner and its coverage map when you need a connection for navigation.",
  ],
  networks: ["TIM", "Vodafone", "WindTre", "Iliad"],
  notice:
    "Sicily and Sardinia are part of {countryName}. A plan for {countryName} includes them when the provider's coverage does. Smaller islands can still have weaker signal. San Marino and Vatican City are not part of {countryName}.",
};

/** Italy unlimited-plans guide. Country-specific; not used inside the reusable UI. */
export const italyUnlimitedPlansContent: UnlimitedPlansContent = {
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

/** Italy eSIM vs local SIM guide. Country-specific; not used inside the reusable UI. */
export const italyEsimVsLocalContent: EsimVsLocalContent = {
  eyebrow: "eSIM vs Local",
  headingTemplate: "eSIM or Local SIM in {countryName}?",
  intro:
    "Both can work well. The better choice depends on whether you value setup before arrival, a local phone number or access to a particular Italian operator.",
  columns: {
    travelEsim: "Travel eSIM",
    localSim: "Local SIM or operator eSIM",
  },
  rows: [
    {
      travelEsim: "Can usually be purchased before departure",
      localSim: "Often purchased directly from an Italian operator or retailer",
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
      localSim: "May offer local bundles and an Italian phone number",
    },
    {
      travelEsim: "Many plans are data only",
      localSim: "Voice and SMS options are more common",
    },
    {
      travelEsim:
        "Support and identification requirements depend on the provider",
      localSim:
        "A local line is registered to an identity document before it is activated",
    },
  ],
  closingParagraphs: [
    "A travel eSIM is useful when you want data ready for arrival and do not need an Italian number. A local plan may suit a longer stay or a traveler who needs conventional calls, SMS and local service. An Italian provider must identify the customer before that line is activated. A visitor from outside the European Union is identified with a passport or another valid travel document. Compare the complete package rather than assuming one type is always cheaper.",
  ],
};

/** Italy country vs regional Europe guide. Country-specific; not used inside the reusable UI. */
export const italyCountryVsRegionalContent: CountryVsRegionalContent = {
  eyebrow: "Country vs Regional",
  headingTemplate:
    "Should You Choose a {countryName} eSIM or a Regional Europe eSIM?",
  countryOption: {
    titleTemplate: "{countryName} eSIM",
    paragraphs: [
      "A {countryName} specific eSIM usually makes sense when most or all of your trip is within {countryName}. It may provide more plan choices or a better price for the amount of data you need.",
    ],
  },
  regionalOption: {
    titleTemplate: "Regional Europe eSIM",
    paragraphs: [
      "A regional Europe eSIM can be more convenient if the same trip includes France, Switzerland or Austria. You can keep one eSIM profile active while crossing those borders instead of installing a separate plan in each country.",
    ],
    destinations: ["France", "Switzerland", "Austria"],
  },
  notice:
    "Always check the included destination list. Switzerland is not in the European Union, so a plan marketed for Europe includes it only when the provider names it. San Marino and Vatican City are not part of {countryName}. Slovenia is a neighboring country. A plan for {countryName} includes those places only when they are named. Also verify whether the same data allowance, speed policy and network access apply throughout the region.",
};

/** Italy phone compatibility guide. Country-specific; not used inside the reusable UI. */
export const italyPhoneCompatibilityContent: PhoneCompatibilityContent = {
  eyebrow: "Compatibility",
  headingTemplate: "Will My Phone Work With an eSIM in {countryName}?",
  paragraphs: [
    "Your phone generally needs to support eSIM and be carrier unlocked. Compatibility can vary by model, country of purchase and device configuration, even when a phone family normally supports eSIM.",
    "Check the exact model in the eSIMzo compatibility checker before purchasing. You can also look in your phone settings for an option to add an eSIM or mobile plan. If your device is locked to a carrier, contact that carrier before traveling.",
  ],
};

/** Italy traveler tips. Country-specific; not used inside the reusable UI. */
export const italyTravelerTipsContent: TravelerTipsContent = {
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
      title: "Download maps before the Alps or a smaller island.",
      paragraphs: [
        "Signal can thin out in the Alps, on mountain roads and on smaller islands. Save maps and tickets before you leave a city.",
      ],
    },
    {
      title: "Expect signal changes on the metro and on trains.",
      paragraphs: [
        "Coverage can change in metro stations and in rail tunnels. Download the route before a long ride if you need it offline.",
      ],
    },
    {
      title: "Sicily and Sardinia are part of {countryName}.",
      paragraphs: [
        "A plan for {countryName} includes Sicily and Sardinia when the provider's coverage does. Check before a ferry, especially if the route continues to a smaller island.",
      ],
    },
    {
      title: "San Marino, Vatican City, and a border crossing need a listing.",
      paragraphs: [
        "Data for {countryName} stops at the border. San Marino, Vatican City, France, Switzerland, Austria and Slovenia have to be named if you want data there too.",
      ],
    },
  ],
};

/** Italy FAQs. Country-specific; not used inside the reusable UI. */
export const italyFaqsContent: CountryFaqsContent = {
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
        "The mobile networks in {countryName} are TIM, Vodafone, WindTre and Iliad. AGCOM reports Fastweb and Vodafone together as Fastweb+Vodafone. Other brands resell one of these networks. Travel eSIM providers use agreements with one or more of them. Check the partner named on the plan, because coverage and 5G access change by location and device, especially outside the largest cities.",
    },
    {
      question: "Does {countryName} have 5G coverage?",
      answer:
        "Yes. AGCOM reported that overall 5G coverage in 2024 reached 99.5% of the population. That national figure combines the networks. It is not the coverage of TIM, Vodafone, WindTre or Iliad on its own. A 5G phone does not guarantee that a travel eSIM will connect to 5G. The plan must include 5G access, the partner must offer it where you are, and your device must support the bands. In the Alps, on smaller islands and in some rural areas the connection may still use 4G.",
    },
    {
      question: "Does an eSIM for {countryName} work in Sicily or San Marino?",
      answer:
        "A plan for {countryName} stops at the border. It does not automatically include France, Switzerland, Austria, Slovenia, San Marino or Vatican City. Sicily and Sardinia are part of {countryName}, so they are included when the provider's coverage of {countryName} includes them. Check the coverage list before a ferry or a border crossing.",
    },
    {
      question: "Do I need a passport to buy a local SIM in {countryName}?",
      answer:
        "Yes, if you buy a local line from an Italian provider. The provider must identify the customer before the line is activated, including when the line is an eSIM. A visitor from outside the European Union is identified with a passport or another valid travel document. An international travel eSIM follows that provider's own checks, which can be different.",
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
