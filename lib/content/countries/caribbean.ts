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

/** Caribbean plans-page hero copy. Region-specific; not used inside the reusable UI. */
export const caribbeanPlansHeroContent: CountryPlansHeroContent = {
  eyebrow: "Compare Plans",
  titleTemplate: "Compare eSIM Plans for {countryName}",
  description:
    "Compare travel eSIM plans for {countryName} by price, data, validity, local network, 5G access, hotspot support and speed limits. Use the filters to find an option that fits your trip and phone.",
  browseTemplate:
    "Browse {planCount} plans from {providerCount} providers.",
  pricingTemplate:
    "Plans currently start at {startingPrice}. Plan information updated {lastUpdated}.",
};

/** Caribbean how-to-choose guide. Region-specific; not used inside the reusable UI. */
export const caribbeanHowToChooseContent: HowToChooseEsimContent = {
  eyebrow: "Buying Guide",
  headingTemplate: "How to Choose an eSIM for {countryName}",
  intro:
    "The right plan depends on how many islands you will fly between, how long you will stay and how you use your phone. A few days in Jamaica has different needs from an island hop that also includes the Bahamas or the Dominican Republic, or a stop in Puerto Rico.",
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
        "There is no single mobile network for {countryName}. A regional plan connects through a local partner on each island it lists, and that partner changes when you fly to the next one. Jamaica uses Digicel and Flow. Flow is the brand of Cable and Wireless Jamaica and Columbus Communications. The Dominican Republic uses Claro, Altice and Viva. Other islands have their own operators.",
        "Read the island list on the plan. Saint Martin and Sint Maarten are two listings on one island, so a plan can include one side and leave the other out. Puerto Rico and the United States Virgin Islands are in this region. A United States plan includes them only when the provider names them.",
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

/** Caribbean data-needs guide. Region-specific; not used inside the reusable UI. */
export const caribbeanDataNeedsContent: DataNeedsContent = {
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

/** Caribbean network coverage guide. Region-specific; not used inside the reusable UI. */
export const caribbeanNetworkCoverageContent: NetworkCoverageContent = {
  eyebrow: "Coverage",
  headingTemplate: "Mobile Networks and eSIM Coverage in {countryName}",
  paragraphs: [
    "A plan for {countryName} does not put you on one network for every island. It uses a local partner on each island the provider names, and that partner changes at the next airport. 5G is offered in some cities and resort areas and is thinner or absent on smaller islands. There is no single 5G percentage for the whole region, because each island measures its own networks. A travel eSIM only receives the partners and technologies in its agreement.",
    "Kingston, Montego Bay, Nassau and Santo Domingo usually offer more network choice than a small cay or a stretch of coast between towns. Signal quality can still change inside resort buildings and on the water.",
    "A 5G label is not a coverage promise. A travel eSIM can stay on 4G when the plan, the partner or the phone does not support 5G at that spot. Check the listed islands and partners when you need a connection for navigation.",
  ],
  notice:
    "Saint Martin and Sint Maarten are separate listings on one island. The British Virgin Islands and the United States Virgin Islands are also separate. Puerto Rico is in this region, and a United States plan includes it only when the provider names it. Cuba is included only when named. Dominica is not the Dominican Republic. Mexico is in the Latin America region, not this one.",
};

/** Caribbean unlimited-plans guide. Region-specific; not used inside the reusable UI. */
export const caribbeanUnlimitedPlansContent: UnlimitedPlansContent = {
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

/** Caribbean eSIM vs local SIM guide. Region-specific; not used inside the reusable UI. */
export const caribbeanEsimVsLocalContent: EsimVsLocalContent = {
  eyebrow: "eSIM vs Local",
  headingTemplate: "eSIM or Local SIM in {countryName}?",
  intro:
    "Both can work well. The better choice depends on whether you are flying between several islands or staying on one island long enough to want a local number.",
  columns: {
    travelEsim: "Travel eSIM",
    localSim: "Local SIM or operator eSIM",
  },
  rows: [
    {
      travelEsim: "Can usually be purchased before departure",
      localSim: "Bought on the island where you want a local line",
    },
    {
      travelEsim: "One profile can cover every island the plan names",
      localSim: "A local line usually stops being a local plan when you leave that island",
    },
    {
      travelEsim: "Lets you keep your primary SIM installed",
      localSim: "May replace a physical primary SIM in a single slot phone",
    },
    {
      travelEsim: "Makes plans from several providers easier to compare",
      localSim: "May offer a phone number on that one island",
    },
    {
      travelEsim: "Many plans are data only",
      localSim: "Voice and SMS options are more common",
    },
    {
      travelEsim:
        "Support and identification requirements depend on the provider",
      localSim:
        "Identity checks differ by island, and some require a photo ID",
    },
  ],
  closingParagraphs: [
    "A travel eSIM is useful when the same trip includes more than one island and you do not need a local number on each of them. A local plan may suit a longer stay on one island. Digicel Jamaica asks for a valid government-issued photo ID to register a SIM-to-Go line, and that registration has to be finished within seven days. Other islands set their own rules. A travel eSIM follows the provider's own checks. Compare the complete package rather than assuming one type is always cheaper.",
  ],
};

/** Caribbean single-country vs regional guide. Region-specific; not used inside the reusable UI. */
export const caribbeanCountryVsRegionalContent: CountryVsRegionalContent = {
  eyebrow: "Country vs Regional",
  headingTemplate:
    "Should You Choose a Single-Country eSIM or a {countryName} eSIM?",
  countryOption: {
    titleTemplate: "Single-country eSIM",
    paragraphs: [
      "A plan for one island usually makes sense when the whole trip stays there. A week in Jamaica, the Bahamas or the Dominican Republic may offer more plan choices, or a better price for the data you need, than a regional plan that also covers islands you will not visit.",
    ],
  },
  regionalOption: {
    titleTemplate: "{countryName} eSIM",
    paragraphs: [
      "A {countryName} eSIM can be more convenient when the same trip flies between islands. You keep one eSIM profile active instead of installing a new plan after each flight. It includes an island only when the provider names it.",
    ],
    destinations: [
      "Jamaica",
      "Bahamas",
      "Dominican Republic",
      "Puerto Rico",
      "Barbados",
      "Aruba",
    ],
  },
  notice:
    "Always check the included destination list. Saint Martin and Sint Maarten are separate, and so are the British Virgin Islands and the United States Virgin Islands. Guadeloupe, Martinique and Saint Barthélemy are not included by a France plan. Caribbean Netherlands is a separate listing from Aruba and Curaçao. Cuba is included only when named. Mexico is in the Latin America region, not this one. Also verify whether the same data allowance, speed policy and network access apply on every listed island.",
};

/** Caribbean phone compatibility guide. Region-specific; not used inside the reusable UI. */
export const caribbeanPhoneCompatibilityContent: PhoneCompatibilityContent = {
  eyebrow: "Compatibility",
  headingTemplate: "Will My Phone Work With an eSIM in {countryName}?",
  paragraphs: [
    "Your phone generally needs to support eSIM and be carrier unlocked. Compatibility can vary by model, country of purchase and device configuration, even when a phone family normally supports eSIM.",
    "Check the exact model in the eSIMzo compatibility checker before purchasing. You can also look in your phone settings for an option to add an eSIM or mobile plan. If your device is locked to a carrier, contact that carrier before traveling.",
  ],
};

/** Caribbean traveler tips. Region-specific; not used inside the reusable UI. */
export const caribbeanTravelerTipsContent: TravelerTipsContent = {
  eyebrow: "Traveler Tips",
  headingTemplate: "Mobile Connectivity Tips for {countryName}",
  tips: [
    {
      title: "Install before departure, but check the start rule.",
      paragraphs: [
        "Installation at home gives you reliable WiFi and time to solve setup issues before an island flight. Wait if the provider starts validity at installation.",
      ],
    },
    {
      title: "Protect your primary SIM from roaming charges.",
      paragraphs: [
        "Keep it active if you need your usual number for calls or verification texts, but turn off mobile data switching and data roaming for that line.",
      ],
    },
    {
      title: "Check the next island before you fly.",
      paragraphs: [
        "A plan does not follow you from one airport to the next. Jamaica, the Bahamas and the Dominican Republic each have to be named if you want data there.",
      ],
    },
    {
      title: "Saint Martin and Sint Maarten are two listings.",
      paragraphs: [
        "They share one island. The French side and the Dutch side are separate destinations, and a plan can include only one of them.",
      ],
    },
    {
      title: "Puerto Rico is not included by a United States label.",
      paragraphs: [
        "Puerto Rico and the United States Virgin Islands are in this region. A United States plan includes them only when the provider names them. The British Virgin Islands are a different listing.",
      ],
    },
    {
      title: "Dominica is not the Dominican Republic.",
      paragraphs: [
        "They are separate destinations. Cuba is on this list and is included only when the provider names it.",
      ],
    },
  ],
};

/** Caribbean FAQs. Region-specific; not used inside the reusable UI. */
export const caribbeanFaqsContent: CountryFaqsContent = {
  heading: "Frequently Asked Questions",
  faqs: [
    {
      question: "What is the best eSIM for {countryName}?",
      answer:
        "There is no single best eSIM for every trip across {countryName}. The right choice depends on which islands you will enter, how long the trip lasts, how much data you use, and whether you need hotspot or a local number. Compare the current plans by total price, price per GB, validity, the island list and fair use terms. A plan for Jamaica alone can cost less if you never leave that island. An island hop needs every stop named on the plan.",
    },
    {
      question: "How much does an eSIM for {countryName} cost?",
      answer:
        "{countryName} eSIM prices vary by provider, data allowance, validity and how many islands are included. Current plans on eSIMzo start at {{starting_price}}, but the lowest price is not always the lowest cost per GB or the best match for your route. Check whether speed limits, hotspot restrictions or activation rules affect the value. Live pricing and availability were updated {{last_updated}}.",
    },
    {
      question: "Can tourists use an eSIM in {countryName}?",
      answer:
        "Yes, tourists can use a compatible travel eSIM for the islands a {countryName} plan names. Your phone must support eSIM and normally needs to be carrier unlocked. International travel eSIMs can usually be purchased online before arrival, although account, payment and identity requirements vary by provider. Install according to the provider instructions and check whether data roaming must be enabled on the eSIM line.",
    },
    {
      question: "Which mobile networks does a {countryName} eSIM use?",
      answer:
        "There is no single network for {countryName}. The plan uses a local partner on each island it lists. Those partners are different: Jamaica has Digicel and Flow, while the Dominican Republic has Claro, Altice and Viva. Flow is the brand used by Cable and Wireless Jamaica and Columbus Communications. Other islands use their own operators. Check the partner named for each stop, because coverage changes when you fly to the next island.",
    },
    {
      question: "Does {countryName} have 5G coverage?",
      answer:
        "Yes, in some cities and resort areas, and less so on smaller islands. There is no single 5G percentage for a {countryName} eSIM, because each island measures its own operators and the plan only uses the partner in its agreement. A 5G phone does not guarantee a 5G connection. The plan must include 5G access, the partner must offer it where you are, and your device must support the bands. Otherwise the connection uses 4G.",
    },
    {
      question: "Does a {countryName} eSIM include every island?",
      answer:
        "No. It includes only the islands the provider names. A flight from Jamaica to the Bahamas needs both names on the plan. Saint Martin and Sint Maarten are two listings on one island, and a plan can include one side only. Puerto Rico and the United States Virgin Islands are in this region, and a United States plan includes them only when the provider names them. Cuba is included only when named. Mexico is in the Latin America region, not this one.",
    },
    {
      question: "Do I need a passport to buy a local SIM in {countryName}?",
      answer:
        "It depends on the island. Digicel Jamaica asks for a valid government-issued photo ID to register a SIM-to-Go line, and that registration has to be finished within seven days. A foreign visitor often uses a passport for that check. Other islands and operators set their own rules. A travel eSIM for {countryName} follows the provider's own checks, which can be different from buying a local line after you arrive.",
    },
    {
      question: "Can I keep using WhatsApp with a {countryName} eSIM?",
      answer:
        "Yes. WhatsApp remains linked to your existing account and phone number when you use a travel eSIM for mobile data in {countryName}. You normally do not need to change the number inside WhatsApp. Keep access to your primary number if you may need a verification code, and avoid choosing the option to replace your WhatsApp number unless you genuinely want to change it.",
    },
    {
      question: "When should I install and activate my {countryName} eSIM?",
      answer:
        "Install it before you fly when the provider allows installation without starting the validity period. The airport on the next island is a poor moment to scan a QR code. If validity begins at installation, wait until closer to departure or follow the provider timing. Some plans activate only after the eSIM connects on an island the plan names. Read the activation policy and save the QR code or manual details before you leave.",
    },
    {
      question: "Can I use hotspot with an eSIM in {countryName}?",
      answer:
        "Hotspot use depends on the specific plan. Many {countryName} eSIMs allow tethering, but some unlimited or daily data plans apply a separate hotspot limit or block it. Check the plan details before purchasing if you need to connect a laptop, tablet or another phone at a resort or on a boat. Video calls, cloud syncing and software updates can use a large amount of data through hotspot.",
    },
  ],
};
