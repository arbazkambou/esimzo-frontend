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

/** South America plans-page hero copy. Region-specific; not used inside the reusable UI. */
export const southAmericaPlansHeroContent: CountryPlansHeroContent = {
  eyebrow: "Compare Plans",
  titleTemplate: "Compare eSIM Plans for {countryName}",
  description:
    "Compare travel eSIM plans for {countryName} by price, data, validity, local network, 5G access, hotspot support and speed limits. Use the filters to find an option that fits your trip and phone.",
  browseTemplate:
    "Browse {planCount} plans from {providerCount} providers.",
  pricingTemplate:
    "Plans currently start at {startingPrice}. Plan information updated {lastUpdated}.",
};

/** South America how-to-choose guide. Region-specific; not used inside the reusable UI. */
export const southAmericaHowToChooseContent: HowToChooseEsimContent = {
  eyebrow: "Buying Guide",
  headingTemplate: "How to Choose an eSIM for {countryName}",
  intro:
    "The right plan depends on how many borders you will cross, how long you will stay and how you use your phone. A few days in Rio de Janeiro or Buenos Aires has different needs from the falls where Brazil, Argentina and Paraguay meet, or a route through the Andes between Chile and Argentina.",
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
        "There is no single mobile network for {countryName}. A regional plan connects through a local partner in each country it lists, and that partner changes at the border. In Brazil the main networks are Vivo, Claro and TIM. Argentina, Chile, Peru and the other countries in this region have their own operators.",
        "Read the country list on the plan. Mexico and Central America are in the Latin America region, not this one. The Falkland Islands are a separate destination, not part of Argentina. French Guiana is a separate destination, and a France plan does not include it unless the provider names it.",
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

/** South America data-needs guide. Region-specific; not used inside the reusable UI. */
export const southAmericaDataNeedsContent: DataNeedsContent = {
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

/** South America network coverage guide. Region-specific; not used inside the reusable UI. */
export const southAmericaNetworkCoverageContent: NetworkCoverageContent = {
  eyebrow: "Coverage",
  headingTemplate: "Mobile Networks and eSIM Coverage in {countryName}",
  paragraphs: [
    "A plan for {countryName} does not put you on one network for the whole continent. It uses a local partner in each country the provider names, and that partner changes at the border. There is no single 5G percentage for the region, because each country measures its own operators. In Brazil the main networks are Vivo, Claro and TIM, and 5G still depends on the city and the partner. A travel eSIM only receives the partners and technologies in its agreement.",
    "São Paulo, Rio de Janeiro, Buenos Aires and Santiago usually offer more network choice than roads outside those cities. Signal quality can still change in the Andes and away from the largest cities.",
    "A 5G label is not a coverage promise. A travel eSIM can stay on 4G when the plan, the partner or the phone does not support 5G at that spot. Check the listed countries and partners when you need a connection for navigation.",
  ],
  notice:
    "Mexico and Central America are in the Latin America region, not this one. The Falkland Islands are a separate destination, not part of Argentina. French Guiana, Guyana and Suriname are separate destinations. A France plan does not include French Guiana unless the provider names it.",
};

/** South America unlimited-plans guide. Region-specific; not used inside the reusable UI. */
export const southAmericaUnlimitedPlansContent: UnlimitedPlansContent = {
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

/** South America eSIM vs local SIM guide. Region-specific; not used inside the reusable UI. */
export const southAmericaEsimVsLocalContent: EsimVsLocalContent = {
  eyebrow: "eSIM vs Local",
  headingTemplate: "eSIM or Local SIM in {countryName}?",
  intro:
    "Both can work well. The better choice depends on whether you are crossing several borders or staying in one country long enough to want a local number.",
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
    "A travel eSIM is useful when the same trip crosses more than one country and you do not need a local number in each of them. A local plan may suit a longer stay in one country. Brazil, Argentina, Chile and the other countries in this region do not share one rule for a local line. A travel eSIM follows the provider's own checks. Compare the complete package rather than assuming one type is always cheaper.",
  ],
};

/** South America single-country vs regional guide. Region-specific; not used inside the reusable UI. */
export const southAmericaCountryVsRegionalContent: CountryVsRegionalContent = {
  eyebrow: "Country vs Regional",
  headingTemplate:
    "Should You Choose a Single-Country eSIM or a {countryName} eSIM?",
  countryOption: {
    titleTemplate: "Single-country eSIM",
    paragraphs: [
      "A plan for one country usually makes sense when the whole trip stays there. A week in Brazil or Argentina may offer more plan choices, or a better price for the data you need, than a regional plan that also covers countries you will not visit.",
    ],
  },
  regionalOption: {
    titleTemplate: "{countryName} eSIM",
    paragraphs: [
      "A {countryName} eSIM can be more convenient when the same trip crosses a border. The falls where Brazil, Argentina and Paraguay meet need each of those countries named. You keep one eSIM profile active instead of installing a new plan at each border. It includes a country only when the provider names it.",
    ],
    destinations: [
      "Brazil",
      "Argentina",
      "Chile",
      "Peru",
      "Colombia",
      "Ecuador",
    ],
  },
  notice:
    "Always check the included destination list. Mexico and Central America are in the Latin America region, not this one. The Falkland Islands are not part of Argentina. French Guiana is not included by a France plan unless the provider names it. Bolivia, Guyana, Paraguay, Suriname, Uruguay and Venezuela are included only when named. Also verify whether the same data allowance, speed policy and network access apply in every listed country.",
};

/** South America phone compatibility guide. Region-specific; not used inside the reusable UI. */
export const southAmericaPhoneCompatibilityContent: PhoneCompatibilityContent =
  {
    eyebrow: "Compatibility",
    headingTemplate: "Will My Phone Work With an eSIM in {countryName}?",
    paragraphs: [
      "Your phone generally needs to support eSIM and be carrier unlocked. Compatibility can vary by model, country of purchase and device configuration, even when a phone family normally supports eSIM.",
      "Check the exact model in the eSIMzo compatibility checker before purchasing. You can also look in your phone settings for an option to add an eSIM or mobile plan. If your device is locked to a carrier, contact that carrier before traveling.",
    ],
  };

/** South America traveler tips. Region-specific; not used inside the reusable UI. */
export const southAmericaTravelerTipsContent: TravelerTipsContent = {
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
      title: "Name each country at the falls.",
      paragraphs: [
        "Brazil, Argentina and Paraguay meet there. A plan for one of them stops at the border unless the next country is named.",
      ],
    },
    {
      title: "Chile and Argentina are separate.",
      paragraphs: [
        "A crossing in the Andes needs both countries on the plan. Download maps before a mountain road.",
      ],
    },
    {
      title: "Brazil is in this region, not Latin America.",
      paragraphs: [
        "Mexico and Central America are the Latin America region. A {countryName} plan does not include them unless the provider names them separately.",
      ],
    },
    {
      title: "The Falkland Islands and French Guiana are separate.",
      paragraphs: [
        "The Falkland Islands are not part of Argentina. French Guiana is not included by a France plan unless the provider names it. Guyana and Suriname are separate destinations too.",
      ],
    },
  ],
};

/** South America FAQs. Region-specific; not used inside the reusable UI. */
export const southAmericaFaqsContent: CountryFaqsContent = {
  heading: "Frequently Asked Questions",
  faqs: [
    {
      question: "What is the best eSIM for {countryName}?",
      answer:
        "There is no single best eSIM for every trip across {countryName}. The right choice depends on which countries you will enter, how long the trip lasts, how much data you use, and whether you need hotspot or a local number. Compare the current plans by total price, price per GB, validity, the country list and fair use terms. A plan for Brazil alone can cost less if you never cross into Argentina or Paraguay.",
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
        "There is no single network for {countryName}. The plan uses a local partner in each country it lists. In Brazil those partners include Vivo, Claro and TIM. Argentina, Chile, Peru and the other countries in this region use their own operators. Check the partner named for each stop, because coverage changes at the border.",
    },
    {
      question: "Does {countryName} have 5G coverage?",
      answer:
        "Yes, in many large cities, and less so outside them. There is no single 5G percentage for {countryName}. Each country measures its own operators, and the plan only uses the partner in its agreement. In Brazil the main networks are Vivo, Claro and TIM, and 5G still depends on the city and the partner. A 5G phone does not guarantee a 5G connection. The plan must include 5G access and the partner must offer it where you are. Otherwise the connection uses 4G.",
    },
    {
      question: "Does a {countryName} eSIM include every country?",
      answer:
        "No. It includes only the countries the provider names. Brazil, Argentina, Chile, Peru, Colombia and Ecuador are in this region, and a plan can omit any of them. Mexico, Guatemala and the other Central American countries are in the Latin America region, not this one. The Falkland Islands are a separate destination, not part of Argentina. French Guiana is a separate destination, not included by a France plan.",
    },
    {
      question: "Do I need a passport to buy a local SIM in {countryName}?",
      answer:
        "It depends on the country. Brazil, Argentina, Chile, Peru and the other countries in this region do not share one rule for a local line. A travel eSIM for {countryName} follows the provider's own checks, which can be different from buying a local line after you arrive. Read that step before you count on a shop at the airport to finish the setup.",
    },
    {
      question: "Can I keep using WhatsApp with a {countryName} eSIM?",
      answer:
        "Yes. WhatsApp remains linked to your existing account and phone number when you use a travel eSIM for mobile data in {countryName}. You normally do not need to change the number inside WhatsApp. Keep access to your primary number if you may need a verification code, and avoid choosing the option to replace your WhatsApp number unless you genuinely want to change it.",
    },
    {
      question: "When should I install and activate my {countryName} eSIM?",
      answer:
        "Install it before departure when the provider allows installation without starting the validity period. A land border is a poor moment to scan a QR code. If validity begins at installation, wait until closer to departure or follow the provider timing. Some plans activate only after the eSIM connects in a country the plan names. Read the activation policy and save the QR code or manual details before you leave.",
    },
    {
      question: "Can I use hotspot with an eSIM in {countryName}?",
      answer:
        "Hotspot use depends on the specific plan. Many {countryName} eSIMs allow tethering, but some unlimited or daily data plans apply a separate hotspot limit or block it. Check the plan details before purchasing if you need to connect a laptop or another phone on a long drive. Video calls and cloud syncing can use a large amount of data through hotspot.",
    },
  ],
};
