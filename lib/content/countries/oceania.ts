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

/** Oceania plans-page hero copy. Region-specific; not used inside the reusable UI. */
export const oceaniaPlansHeroContent: CountryPlansHeroContent = {
  eyebrow: "Compare Plans",
  titleTemplate: "Compare eSIM Plans for {countryName}",
  description:
    "Compare travel eSIM plans for {countryName} by price, data, validity, local network, 5G access, hotspot support and speed limits. Use the filters to find an option that fits your trip and phone.",
  browseTemplate:
    "Browse {planCount} plans from {providerCount} providers.",
  pricingTemplate:
    "Plans currently start at {startingPrice}. Plan information updated {lastUpdated}.",
};

/** Oceania how-to-choose guide. Region-specific; not used inside the reusable UI. */
export const oceaniaHowToChooseContent: HowToChooseEsimContent = {
  eyebrow: "Buying Guide",
  headingTemplate: "How to Choose an eSIM for {countryName}",
  intro:
    "The right plan depends on how many countries you will fly between, how long you will stay and how you use your phone. A few days in Sydney or Auckland has different needs from a flight to Fiji or French Polynesia, or a stop on a smaller Pacific island.",
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
        "There is no single mobile network for {countryName}. A regional plan connects through a local partner in each country it lists, and that partner changes when you fly to the next one. Australia uses Telstra, Optus and Vodafone. Vodafone is the retail brand of TPG, and in regional areas its service can use shared Optus sites. New Zealand, Fiji and the other countries in this region have their own operators.",
        "Read the country list on the plan. Tasmania is part of Australia. Norfolk Island, Christmas Island and the Cocos (Keeling) Islands are separate destinations. Hawaii is part of the United States, not this list. Guam and the Northern Mariana Islands are in this region, and a United States plan includes them only when the provider names them.",
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

/** Oceania data-needs guide. Region-specific; not used inside the reusable UI. */
export const oceaniaDataNeedsContent: DataNeedsContent = {
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

/** Oceania network coverage guide. Region-specific; not used inside the reusable UI. */
export const oceaniaNetworkCoverageContent: NetworkCoverageContent = {
  eyebrow: "Coverage",
  headingTemplate: "Mobile Networks and eSIM Coverage in {countryName}",
  paragraphs: [
    "A plan for {countryName} does not put you on one network for Australia and the Pacific. It uses a local partner in each country the provider names, and that partner changes at the next airport. There is no single 5G percentage for the region. In Australia, the ACCC's November 2025 report records 5G sites on Telstra, Optus and TPG, whose retail brand is Vodafone. It does not publish one national 5G population figure. Most new Optus and TPG 5G sites were in major cities. That report is Australia, not every island in the region. A travel eSIM only receives the partners and technologies in its agreement.",
    "Sydney, Melbourne and Auckland usually offer more network choice than remote roads and smaller islands. Signal quality can still change away from those cities.",
    "A 5G label is not a coverage promise. A travel eSIM can stay on 4G when the plan, the partner or the phone does not support 5G at that spot. Check the listed countries and partners when you need a connection for navigation.",
  ],
  notice:
    "Tasmania is part of Australia. Norfolk Island, Christmas Island and the Cocos (Keeling) Islands are separate destinations. Guam, the Northern Mariana Islands and the United States Minor Outlying Islands are in this region and are included only when named. Hawaii is part of the United States, not this list.",
};

/** Oceania unlimited-plans guide. Region-specific; not used inside the reusable UI. */
export const oceaniaUnlimitedPlansContent: UnlimitedPlansContent = {
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

/** Oceania eSIM vs local SIM guide. Region-specific; not used inside the reusable UI. */
export const oceaniaEsimVsLocalContent: EsimVsLocalContent = {
  eyebrow: "eSIM vs Local",
  headingTemplate: "eSIM or Local SIM in {countryName}?",
  intro:
    "Both can work well. The better choice depends on whether you are flying between several countries or staying in one place long enough to want a local number.",
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
        "Identity checks differ by country, and some accept a passport",
    },
  ],
  closingParagraphs: [
    "A travel eSIM is useful when the same trip includes more than one country and you do not need a local number in each of them. A local plan may suit a longer stay in one country. In Australia, a local prepaid line needs an identity check. The telco collects a name, date of birth and address, then verifies identity. A passport is an accepted document. Other countries in this region set their own rules. A travel eSIM follows the provider's own checks. Compare the complete package rather than assuming one type is always cheaper.",
  ],
};

/** Oceania single-country vs regional guide. Region-specific; not used inside the reusable UI. */
export const oceaniaCountryVsRegionalContent: CountryVsRegionalContent = {
  eyebrow: "Country vs Regional",
  headingTemplate:
    "Should You Choose a Single-Country eSIM or an {countryName} eSIM?",
  countryOption: {
    titleTemplate: "Single-country eSIM",
    paragraphs: [
      "A plan for one country usually makes sense when the whole trip stays there. A week in Australia may offer more plan choices, or a better price for the data you need, than a regional plan that also covers islands you will not visit.",
    ],
  },
  regionalOption: {
    titleTemplate: "{countryName} eSIM",
    paragraphs: [
      "An {countryName} eSIM can be more convenient when the same trip flies from Australia to New Zealand or onward to Fiji. You keep one eSIM profile active instead of installing a new plan after each flight. It includes a country only when the provider names it.",
    ],
    destinations: [
      "Australia",
      "New Zealand",
      "Fiji",
      "French Polynesia",
      "Samoa",
      "Vanuatu",
    ],
  },
  notice:
    "Always check the included destination list. Tasmania is part of Australia. Norfolk Island, Christmas Island and the Cocos (Keeling) Islands are separate. Guam and the Northern Mariana Islands are in this region, and a United States plan includes them only when named. Hawaii is not in this list. Also verify whether the same data allowance, speed policy and network access apply in every listed country.",
};

/** Oceania phone compatibility guide. Region-specific; not used inside the reusable UI. */
export const oceaniaPhoneCompatibilityContent: PhoneCompatibilityContent = {
  eyebrow: "Compatibility",
  headingTemplate: "Will My Phone Work With an eSIM in {countryName}?",
  paragraphs: [
    "Your phone generally needs to support eSIM and be carrier unlocked. Compatibility can vary by model, country of purchase and device configuration, even when a phone family normally supports eSIM.",
    "Check the exact model in the eSIMzo compatibility checker before purchasing. You can also look in your phone settings for an option to add an eSIM or mobile plan. If your device is locked to a carrier, contact that carrier before traveling.",
  ],
};

/** Oceania traveler tips. Region-specific; not used inside the reusable UI. */
export const oceaniaTravelerTipsContent: TravelerTipsContent = {
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
      title: "New Zealand and Fiji need their own listing.",
      paragraphs: [
        "A plan for Australia stops at the border. New Zealand and Fiji each have to be named if you want data there.",
      ],
    },
    {
      title: "Tasmania is part of Australia.",
      paragraphs: [
        "Norfolk Island, Christmas Island and the Cocos (Keeling) Islands are not. Each of those three has to be named on its own.",
      ],
    },
    {
      title: "Guam is in this region.",
      paragraphs: [
        "Guam and the Northern Mariana Islands are separate destinations here. A United States plan includes them only when the provider names them. Hawaii is not in this list.",
      ],
    },
    {
      title: "Download maps before a remote stretch.",
      paragraphs: [
        "Coverage is thinner away from the largest cities and on smaller islands. Save maps before you leave a city.",
      ],
    },
  ],
};

/** Oceania FAQs. Region-specific; not used inside the reusable UI. */
export const oceaniaFaqsContent: CountryFaqsContent = {
  heading: "Frequently Asked Questions",
  faqs: [
    {
      question: "What is the best eSIM for {countryName}?",
      answer:
        "There is no single best eSIM for every trip across {countryName}. The right choice depends on which countries you will enter, how long the trip lasts, how much data you use, and whether you need hotspot or a local number. Compare the current plans by total price, price per GB, validity, the country list and fair use terms. A plan for Australia alone can cost less if you never fly to New Zealand or Fiji.",
    },
    {
      question: "How much does an eSIM for {countryName} cost?",
      answer:
        "{countryName} eSIM prices vary by provider, data allowance, validity and how many countries are included. Current plans on eSIMzo start at {{starting_price}}, but the lowest price is not always the lowest cost per GB or the best match for your route. Check whether speed limits, hotspot restrictions or activation rules affect the value. Live pricing and availability were updated {{last_updated}}.",
    },
    {
      question: "Can tourists use an eSIM in {countryName}?",
      answer:
        "Yes, tourists can use a compatible travel eSIM for the countries an {countryName} plan names. Your phone must support eSIM and normally needs to be carrier unlocked. International travel eSIMs can usually be purchased online before arrival, although account, payment and identity requirements vary by provider. Install according to the provider instructions and check whether data roaming must be enabled on the eSIM line.",
    },
    {
      question: "Which mobile networks does an {countryName} eSIM use?",
      answer:
        "There is no single network for {countryName}. The plan uses a local partner in each country it lists. Australia has Telstra, Optus and Vodafone. Vodafone is the retail brand of TPG, and in regional areas its service can use shared Optus sites. New Zealand, Fiji and the other countries in this region use their own operators. Check the partner named for each stop, because coverage changes when you fly to the next country.",
    },
    {
      question: "Does {countryName} have 5G coverage?",
      answer:
        "Yes, in major cities in some countries, and less so on smaller islands and in remote areas. There is no single 5G percentage for an {countryName} eSIM. Each country measures its own operators, and the plan only uses the partner in its agreement. In Australia, the ACCC's November 2025 report records 5G sites on Telstra, Optus and TPG, and it does not publish one national 5G population figure. That report is Australia, not the region. A 5G phone does not guarantee a 5G connection. The plan must include 5G access. Otherwise the connection uses 4G.",
    },
    {
      question: "Does an {countryName} eSIM include every country?",
      answer:
        "No. It includes only the places the provider names. Australia does not include New Zealand, Fiji, Norfolk Island, Christmas Island or the Cocos (Keeling) Islands unless each one is named. Tasmania is part of Australia. Guam and the Northern Mariana Islands are in this region, and a United States plan includes them only when the provider names them. Hawaii is part of the United States, not this list.",
    },
    {
      question: "Do I need a passport to buy a local SIM in {countryName}?",
      answer:
        "It depends on the country. In Australia, a local prepaid line needs an identity check. The telco collects a name, date of birth and address, then verifies identity. A passport is an accepted document, and a card payment can be another check. Other countries in the region set their own rules. A travel eSIM for {countryName} follows the provider's own checks.",
    },
    {
      question: "Can I keep using WhatsApp with an {countryName} eSIM?",
      answer:
        "Yes. WhatsApp remains linked to your existing account and phone number when you use a travel eSIM for mobile data in {countryName}. You normally do not need to change the number inside WhatsApp. Keep access to your primary number if you may need a verification code, and avoid choosing the option to replace your WhatsApp number unless you genuinely want to change it.",
    },
    {
      question: "When should I install and activate my {countryName} eSIM?",
      answer:
        "Install it before you fly when the provider allows installation without starting the validity period. The airport on the next island is a poor moment to scan a QR code. If validity begins at installation, wait until closer to departure or follow the provider timing. Some plans activate only after the eSIM connects in a country the plan names. Read the activation policy and save the QR code or manual details before you leave.",
    },
    {
      question: "Can I use hotspot with an eSIM in {countryName}?",
      answer:
        "Hotspot use depends on the specific plan. Many {countryName} eSIMs allow tethering, but some unlimited or daily data plans apply a separate hotspot limit or block it. Check the plan details before purchasing if you need to connect a laptop or another phone. Video calls and cloud syncing can use a large amount of data through hotspot.",
    },
  ],
};
