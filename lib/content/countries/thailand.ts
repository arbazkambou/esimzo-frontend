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

/** Thailand plans-page hero copy. Country-specific; not used inside the reusable UI. */
export const thailandPlansHeroContent: CountryPlansHeroContent = {
  eyebrow: "Compare Plans",
  titleTemplate: "Compare eSIM Plans for {countryName}",
  description:
    "Compare travel eSIM plans for {countryName} by price, data, validity, local network, 5G access, hotspot support and speed limits. Use the filters to find an option that fits your trip and phone.",
  browseTemplate:
    "Browse {planCount} plans from {providerCount} providers.",
  pricingTemplate:
    "Plans currently start at {startingPrice}. Plan information updated {lastUpdated}.",
};

/** Thailand how-to-choose guide. Country-specific; not used inside the reusable UI. */
export const thailandHowToChooseContent: HowToChooseEsimContent = {
  eyebrow: "Buying Guide",
  headingTemplate: "How to Choose an eSIM for {countryName}",
  intro:
    "The right plan depends on how long you will be in {countryName}, where you will travel and how you use your phone. A few days in Bangkok has different needs from a route through Chiang Mai, a beach stay in Phuket, a ferry to a smaller island, or a crossing into Cambodia, Laos or Malaysia.",
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
        "The mobile networks in {countryName} are AIS and True. True also sells service under the dtac brand. dtac is not a separate network. International eSIM providers connect through one or more of these local partner networks.",
        "The local partner matters because coverage and performance vary by location. Check the network shown on each plan, especially if your route leaves Bangkok or includes the northern mountains, a southern island, or a ferry crossing.",
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
        "Many travel eSIMs are data only. You can still use WhatsApp, FaceTime, Signal and other internet-based apps, but you may not receive a Thai phone number or standard voice and SMS service.",
        "If you need a local number for calls, restaurant bookings or other services, filter for plans that clearly include voice and SMS. Confirm the number type and the countries covered before purchasing.",
      ],
    },
  ],
};

/** Thailand data-needs guide. Country-specific; not used inside the reusable UI. */
export const thailandDataNeedsContent: DataNeedsContent = {
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

/** Thailand network coverage guide. Country-specific; not used inside the reusable UI. */
export const thailandNetworkCoverageContent: NetworkCoverageContent = {
  eyebrow: "Coverage",
  headingTemplate: "Mobile Networks and eSIM Coverage in {countryName}",
  paragraphs: [
    "The mobile networks in {countryName} are AIS and True. True also sells service under the dtac brand. AIS reports that its own 5G network covers more than 95% of the population. True reports 5G in key areas of all 77 provinces, and more than 99% of the population in Bangkok and the Eastern Economic Corridor. Those are each operator's figures, not a combined national total. A travel eSIM only receives the networks and technologies in its provider agreement.",
    "Bangkok, Chiang Mai, Phuket and Pattaya usually offer more network choice than smaller towns and open country. Signal quality can still change inside buildings, on the BTS and MRT, on ferries and on smaller islands.",
    "A 5G label is not a coverage promise. A travel eSIM can stay on 4G when the plan, the partner or the phone does not support 5G at that spot. Check the listed partner and its coverage map when you need a connection for navigation.",
  ],
  networks: ["AIS", "True"],
  notice:
    "Phuket, Koh Samui, Koh Phi Phi and the other islands are part of {countryName}. A plan for {countryName} includes them when the provider's coverage does. Signal can still be weaker on a smaller island or during a ferry crossing.",
};

/** Thailand unlimited-plans guide. Country-specific; not used inside the reusable UI. */
export const thailandUnlimitedPlansContent: UnlimitedPlansContent = {
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

/** Thailand eSIM vs local SIM guide. Country-specific; not used inside the reusable UI. */
export const thailandEsimVsLocalContent: EsimVsLocalContent = {
  eyebrow: "eSIM vs Local",
  headingTemplate: "eSIM or Local SIM in {countryName}?",
  intro:
    "Both can work well. The better choice depends on whether you value setup before arrival, a local phone number or access to a particular Thai operator.",
  columns: {
    travelEsim: "Travel eSIM",
    localSim: "Local SIM or operator eSIM",
  },
  rows: [
    {
      travelEsim: "Can usually be purchased before departure",
      localSim: "Often purchased from a Thai operator shop or airport dealer",
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
      localSim: "May offer local bundles and a Thai phone number",
    },
    {
      travelEsim: "Many plans are data only",
      localSim: "Voice and SMS options are more common",
    },
    {
      travelEsim:
        "Support and identification requirements depend on the provider",
      localSim:
        "A visitor registers a local line in person with a passport",
    },
  ],
  closingParagraphs: [
    "A travel eSIM is useful when you want data ready for arrival and do not need a Thai number. A local plan may suit a longer stay or a traveler who needs conventional calls, SMS and local service. NBTC rules require that registration in person with a passport. A person who is not a Thai national is limited to three SIMs with each provider, and a product sold as a tourist SIM is limited to 60 days. Compare the complete package rather than assuming one type is always cheaper.",
  ],
};

/** Thailand country vs regional Asia guide. Country-specific; not used inside the reusable UI. */
export const thailandCountryVsRegionalContent: CountryVsRegionalContent = {
  eyebrow: "Country vs Regional",
  headingTemplate:
    "Should You Choose a {countryName} eSIM or a Regional Asia eSIM?",
  countryOption: {
    titleTemplate: "{countryName} eSIM",
    paragraphs: [
      "A {countryName} specific eSIM usually makes sense when most or all of your trip is within {countryName}. Many visits never leave the country. It may provide more plan choices or a better price for the amount of data you need.",
    ],
  },
  regionalOption: {
    titleTemplate: "Regional Asia eSIM",
    paragraphs: [
      "A regional Asia eSIM can be more convenient if the same trip includes Cambodia, Laos or Malaysia. You can keep one eSIM profile active while crossing those borders instead of installing a separate plan in each country.",
    ],
    destinations: ["Cambodia", "Laos", "Malaysia"],
  },
  notice:
    "Always check the included destination list. A plan for {countryName} stops at the border. Myanmar is a neighboring country. Vietnam and Singapore are frequent pairings. A plan for {countryName} includes those countries only when the provider names them. Also verify whether the same data allowance, speed policy and network access apply throughout the region.",
};

/** Thailand phone compatibility guide. Country-specific; not used inside the reusable UI. */
export const thailandPhoneCompatibilityContent: PhoneCompatibilityContent = {
  eyebrow: "Compatibility",
  headingTemplate: "Will My Phone Work With an eSIM in {countryName}?",
  paragraphs: [
    "Your phone generally needs to support eSIM and be carrier unlocked. Compatibility can vary by model, country of purchase and device configuration, even when a phone family normally supports eSIM.",
    "Check the exact model in the eSIMzo compatibility checker before purchasing. You can also look in your phone settings for an option to add an eSIM or mobile plan. If your device is locked to a carrier, contact that carrier before traveling.",
  ],
};

/** Thailand traveler tips. Country-specific; not used inside the reusable UI. */
export const thailandTravelerTipsContent: TravelerTipsContent = {
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
      title: "Download maps before the north or a smaller island.",
      paragraphs: [
        "Signal can thin out on mountain roads in the north and on smaller islands. Save maps and ferry tickets before you leave a city.",
      ],
    },
    {
      title: "Expect signal changes on the BTS, MRT, and ferries.",
      paragraphs: [
        "Coverage can change in Bangkok's elevated and underground stations and during a sea crossing. Download the route if you need it offline.",
      ],
    },
    {
      title: "The islands are part of {countryName}.",
      paragraphs: [
        "Phuket, Koh Samui, Koh Phi Phi and the other islands are part of {countryName}. A plan covers them when the provider's coverage does. Check before a ferry to a smaller island.",
      ],
    },
    {
      title: "Cambodia, Laos, or Malaysia needs its own listing.",
      paragraphs: [
        "Data for {countryName} stops at the border. Cambodia, Laos, Malaysia, Myanmar, Vietnam and Singapore have to be named if you want data there too.",
      ],
    },
  ],
};

/** Thailand FAQs. Country-specific; not used inside the reusable UI. */
export const thailandFaqsContent: CountryFaqsContent = {
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
        "The mobile networks in {countryName} are AIS and True. True also sells service under the dtac brand, so dtac is not a separate network. Travel eSIM providers use agreements with one or more of these networks. Check the partner named on the plan, because coverage and 5G access change by location and device, especially outside Bangkok and on smaller islands.",
    },
    {
      question: "Does {countryName} have 5G coverage?",
      answer:
        "Yes. AIS reports that its own 5G network covers more than 95% of the population. True reports 5G in key areas of all 77 provinces, and more than 99% of the population in Bangkok and the Eastern Economic Corridor. Those are each operator's figures, not a combined national total. A 5G phone does not guarantee that a travel eSIM will connect to 5G. The plan must include 5G access, the partner must offer it where you are, and your device must support the bands. On a smaller island or a mountain road the connection may still use 4G.",
    },
    {
      question: "Does an eSIM for {countryName} work on the islands and across the border?",
      answer:
        "A plan for {countryName} stops at the border. It does not automatically include Cambodia, Laos, Malaysia, Myanmar, Vietnam or Singapore. Phuket, Koh Samui and the other islands are part of {countryName}, so they are included when the provider's coverage includes them. Check the list before a ferry or a border crossing.",
    },
    {
      question: "Do I need a passport to buy a local SIM in {countryName}?",
      answer:
        "Yes, if you buy a local line from a Thai provider. NBTC rules require a visitor to register that line in person with a passport, with a limit of three SIMs for each provider. A product sold as a tourist SIM is limited to 60 days. An international travel eSIM follows that provider's own checks, which can be different.",
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
