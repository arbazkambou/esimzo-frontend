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

/** Global plans-page hero copy. Global-specific; not used inside the reusable UI. */
export const globalPlansHeroContent: CountryPlansHeroContent = {
  eyebrow: "Compare Plans",
  titleTemplate: "Compare eSIM Plans for {countryName}",
  description:
    "Compare travel eSIM plans for {countryName} by price, data, validity, local network, 5G access, hotspot support and speed limits. Use the filters to find an option that fits your trip and phone.",
  browseTemplate:
    "Browse {planCount} plans from {providerCount} providers.",
  pricingTemplate:
    "Plans currently start at {startingPrice}. Plan information updated {lastUpdated}.",
};

/** Global how-to-choose guide. Global-specific; not used inside the reusable UI. */
export const globalHowToChooseContent: HowToChooseEsimContent = {
  eyebrow: "Buying Guide",
  headingTemplate: "How to Choose an eSIM for {countryName}",
  intro:
    "The right plan depends on how many countries you will cross, how long you will be away and how you use your phone. A trip that stays inside one region has different needs from a route that also includes countries outside that region.",
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
        "There is no single mobile network for a {countryName} plan. It connects through a local partner in each country it lists, and that partner changes when you cross a border. Two plans can name different partners for the same country.",
        "Read the country list on the plan. A plan appears in this comparison when it covers 70 or more countries. That is not the same as every country, and two {countryName} plans can list different countries.",
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

/** Global data-needs guide. Global-specific; not used inside the reusable UI. */
export const globalDataNeedsContent: DataNeedsContent = {
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

/** Global network coverage guide. Global-specific; not used inside the reusable UI. */
export const globalNetworkCoverageContent: NetworkCoverageContent = {
  eyebrow: "Coverage",
  headingTemplate: "Mobile Networks and eSIM Coverage in {countryName}",
  paragraphs: [
    "A {countryName} plan does not put you on one network for every country. It uses a local partner in each country the provider names, and that partner changes at the next border. There is no single 5G percentage for these plans, because each country measures its own operators. A travel eSIM only receives the partners and technologies in its agreement.",
    "Large cities usually offer more network choice than roads and smaller towns. Signal quality can still change inside buildings, on underground transport and away from those cities.",
    "A 5G label is not a coverage promise. A travel eSIM can stay on 4G when the plan, the partner or the phone does not support 5G at that spot. Check the listed countries and partners when you need a connection for navigation.",
  ],
  notice:
    "A plan is listed here when it covers 70 or more countries. The countries are the ones named on that plan. Two {countryName} plans can list different countries. A regional plan can fit better when the whole trip stays inside one region.",
};

/** Global unlimited-plans guide. Global-specific; not used inside the reusable UI. */
export const globalUnlimitedPlansContent: UnlimitedPlansContent = {
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

/** Global eSIM vs local SIM guide. Global-specific; not used inside the reusable UI. */
export const globalEsimVsLocalContent: EsimVsLocalContent = {
  eyebrow: "eSIM vs Local",
  headingTemplate: "eSIM or Local SIM in {countryName}?",
  intro:
    "Both can work well. The better choice depends on whether you are crossing many countries or staying in one place long enough to want a local number.",
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
      localSim: "A local line usually stops being a local plan when you leave that country",
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
    "A travel eSIM is useful when the same trip includes many countries and you do not need a local number in each of them. A local plan may suit a longer stay in one country. The countries on a {countryName} plan do not share one rule for a local line. A travel eSIM follows the provider's own checks. Compare the complete package rather than assuming one type is always cheaper.",
  ],
};

/** Global regional vs global guide. Global-specific; not used inside the reusable UI. */
export const globalCountryVsRegionalContent: CountryVsRegionalContent = {
  eyebrow: "Regional vs Global",
  headingTemplate:
    "Should You Choose a Regional eSIM or a {countryName} eSIM?",
  countryOption: {
    titleTemplate: "Regional eSIM",
    paragraphs: [
      "A regional plan usually makes sense when the whole trip stays inside one region, such as Europe, Asia or Latin America. It may offer more plan choices, or a better price for the data you need, than a {countryName} plan that also covers countries you will not visit.",
    ],
  },
  regionalOption: {
    titleTemplate: "{countryName} eSIM",
    paragraphs: [
      "A {countryName} eSIM can be more convenient when the same trip crosses more than one region. You keep one eSIM profile active instead of installing a new plan at each border. It includes a country only when the provider names it.",
    ],
  },
  notice:
    "Always check the included destination list. A plan is listed in this comparison when it covers 70 or more countries. Two {countryName} plans can name different countries. A country is not included just because a regional plan covers it. Also verify whether the same data allowance, speed policy and network access apply in every listed country.",
};

/** Global phone compatibility guide. Global-specific; not used inside the reusable UI. */
export const globalPhoneCompatibilityContent: PhoneCompatibilityContent = {
  eyebrow: "Compatibility",
  headingTemplate: "Will My Phone Work With an eSIM in {countryName}?",
  paragraphs: [
    "Your phone generally needs to support eSIM and be carrier unlocked. Compatibility can vary by model, country of purchase and device configuration, even when a phone family normally supports eSIM.",
    "Check the exact model in the eSIMzo compatibility checker before purchasing. You can also look in your phone settings for an option to add an eSIM or mobile plan. If your device is locked to a carrier, contact that carrier before traveling.",
  ],
};

/** Global traveler tips. Global-specific; not used inside the reusable UI. */
export const globalTravelerTipsContent: TravelerTipsContent = {
  eyebrow: "Traveler Tips",
  headingTemplate: "Mobile Connectivity Tips for {countryName}",
  tips: [
    {
      title: "Install before departure, but check the start rule.",
      paragraphs: [
        "Installation at home gives you reliable WiFi and time to solve setup issues before a long flight. Wait if the provider starts validity at installation.",
      ],
    },
    {
      title: "Protect your primary SIM from roaming charges.",
      paragraphs: [
        "Keep it active if you need your usual number for calls or verification texts, but turn off mobile data switching and data roaming for that line.",
      ],
    },
    {
      title: "Read the country list, not the word global.",
      paragraphs: [
        "A plan is listed here when it covers 70 or more countries. That minimum is not every country, and the next plan can name a different set.",
      ],
    },
    {
      title: "Stay with a region if the trip never leaves it.",
      paragraphs: [
        "A Europe, Asia or Latin America plan can be enough when every stop is inside that region. A {countryName} plan adds countries you may not visit.",
      ],
    },
    {
      title: "Expect the partner to change at the border.",
      paragraphs: [
        "There is no single network for a {countryName} plan. Coverage follows the local partner named for each country on that plan.",
      ],
    },
  ],
};

/** Global FAQs. Global-specific; not used inside the reusable UI. */
export const globalFaqsContent: CountryFaqsContent = {
  heading: "Frequently Asked Questions",
  faqs: [
    {
      question: "What is the best eSIM for {countryName}?",
      answer:
        "There is no single best eSIM for every trip that needs a {countryName} plan. The right choice depends on which countries you will enter, how long the trip lasts, how much data you use, and whether you need hotspot or calls and texts. Compare the current plans by total price, price per GB, validity, the country list and fair use terms. A regional plan can cost less if your trip stays inside one region.",
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
        "There is no single network for a {countryName} eSIM. The plan uses a local partner in each country it lists, and that partner changes when you cross into the next country. Two plans can name different partners for the same country. Check the partner shown for each stop on your route, because coverage follows that partner, not a worldwide network.",
    },
    {
      question: "Does {countryName} have 5G coverage?",
      answer:
        "5G exists in many countries, but there is no single 5G percentage for a {countryName} plan. Each country measures its own operators, and the plan only uses the partner in its agreement. A 5G phone does not guarantee a 5G connection. The plan must include 5G access, and the partner must offer it where you are. Otherwise the connection uses 4G. The same city can be 5G on one plan and 4G on another.",
    },
    {
      question: "Does a {countryName} eSIM include every country?",
      answer:
        "No. A plan appears in this comparison when it covers 70 or more countries, and the countries are the ones the provider names. Two {countryName} plans can list different countries. A country that is missing from the list is not included, even if a regional plan for Europe, Asia or another region covers it. Read the country list on the plan before you buy.",
    },
    {
      question: "Do I need a passport to buy a local SIM in {countryName}?",
      answer:
        "It depends on the country. The countries a {countryName} plan can name do not share one rule for a local line. A travel eSIM for {countryName} follows the provider's own checks, which can be different from buying a local line after you arrive. Read that step before you count on a shop at the airport to finish the setup.",
    },
    {
      question: "Can I keep using WhatsApp with a {countryName} eSIM?",
      answer:
        "Yes. WhatsApp remains linked to your existing account and phone number when you use a {countryName} eSIM for mobile data. You normally do not need to change the number inside WhatsApp. Keep access to your primary number if you may need a verification code, and avoid choosing the option to replace your WhatsApp number unless you genuinely want to change it.",
    },
    {
      question: "When should I install and activate my {countryName} eSIM?",
      answer:
        "Install it before you fly when the provider allows installation without starting the validity period. The airport after a long flight is a poor moment to scan a QR code. If validity begins at installation, wait until closer to departure or follow the provider timing. Some plans activate only after the eSIM connects in a country the plan names. Read the activation policy and save the QR code or manual details before you leave.",
    },
    {
      question: "Can I use hotspot with an eSIM in {countryName}?",
      answer:
        "Hotspot use depends on the specific plan. Many {countryName} eSIMs allow tethering, but some unlimited or daily data plans apply a separate hotspot limit or block it. Check the plan details before purchasing if you need to connect a laptop or another phone. Video calls and cloud syncing can use a large amount of data through hotspot.",
    },
  ],
};
