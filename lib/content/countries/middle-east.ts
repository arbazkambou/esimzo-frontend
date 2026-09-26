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

/** Middle East plans-page hero copy. Region-specific; not used inside the reusable UI. */
export const middleEastPlansHeroContent: CountryPlansHeroContent = {
  eyebrow: "Compare Plans",
  titleTemplate: "Compare eSIM Plans for {countryName}",
  description:
    "Compare travel eSIM plans for {countryName} by price, data, validity, local network, 5G access, hotspot support and speed limits. Use the filters to find an option that fits your trip and phone.",
  browseTemplate:
    "Browse {planCount} plans from {providerCount} providers.",
  pricingTemplate:
    "Plans currently start at {startingPrice}. Plan information updated {lastUpdated}.",
};

/** Middle East how-to-choose guide. Region-specific; not used inside the reusable UI. */
export const middleEastHowToChooseContent: HowToChooseEsimContent = {
  eyebrow: "Buying Guide",
  headingTemplate: "How to Choose an eSIM for {countryName}",
  intro:
    "The right plan depends on how many countries you will enter, how long you will stay and how you use your phone. A few days in Istanbul has different needs from a crossing into Georgia, or a separate stop in Jordan, Armenia or Azerbaijan.",
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
        "There is no single mobile network for {countryName}. A regional plan connects through a local partner in each country it lists, and that partner changes at the border. Turkey uses Turkcell, Vodafone and Türk Telekom. Türk Telekom sells mobile service under the TT Mobil brand. Georgia, Jordan and the other countries in this region have their own operators.",
        "Read the country list on the plan. Greece is in the Balkans region, not this one. Cyprus is in the Europe region. Bahrain, Kuwait, Oman, Qatar, Saudi Arabia and the United Arab Emirates are in the GCC Middle East region. Iran, Iraq, Israel, Lebanon, Palestine, Syria and Yemen are included only when the provider names them.",
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

/** Middle East data-needs guide. Region-specific; not used inside the reusable UI. */
export const middleEastDataNeedsContent: DataNeedsContent = {
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

/** Middle East network coverage guide. Region-specific; not used inside the reusable UI. */
export const middleEastNetworkCoverageContent: NetworkCoverageContent = {
  eyebrow: "Coverage",
  headingTemplate: "Mobile Networks and eSIM Coverage in {countryName}",
  paragraphs: [
    "A plan for {countryName} does not put you on one network for the whole region. It uses a local partner in each country the provider names, and that partner changes at the border. There is no single 5G percentage for the region. In Turkey, Turkcell, Vodafone and Türk Telekom began 5G on 1 April 2026 in the provincial centers of all 81 provinces. Outside those centers the connection may still be 4.5G or 4G. That schedule is one country, not the coverage of every partner in the region. A travel eSIM only receives the partners and technologies in its agreement.",
    "Istanbul, Ankara and other large cities usually offer more network choice than roads outside provincial centers. Signal quality can still change away from those cities.",
    "A 5G label is not a coverage promise. A travel eSIM can stay on 4G when the plan, the partner or the phone does not support 5G at that spot. Check the listed countries and partners when you need a connection for navigation.",
  ],
  notice:
    "Iran, Iraq, Israel, Lebanon, Palestine, Syria and Yemen are included only when the provider names them. Greece is in the Balkans region. Cyprus is in the Europe region. Bahrain, Kuwait, Oman, Qatar, Saudi Arabia and the United Arab Emirates are in the GCC Middle East region, not this one.",
};

/** Middle East unlimited-plans guide. Region-specific; not used inside the reusable UI. */
export const middleEastUnlimitedPlansContent: UnlimitedPlansContent = {
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

/** Middle East eSIM vs local SIM guide. Region-specific; not used inside the reusable UI. */
export const middleEastEsimVsLocalContent: EsimVsLocalContent = {
  eyebrow: "eSIM vs Local",
  headingTemplate: "eSIM or Local SIM in {countryName}?",
  intro:
    "Both can work well. The better choice depends on whether you are visiting more than one country or staying in one place long enough to want a local number.",
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
        "Identity checks differ by country, and some require a passport",
    },
  ],
  closingParagraphs: [
    "A travel eSIM is useful when the same trip includes more than one country and you do not need a local number in each of them. A local plan may suit a longer stay in one country. In Turkey, a foreign visitor registers a local line with a passport or another official identity document. If the phone was brought from abroad and will use a Turkish line, BTK allows 120 days from entry before device registration is required. Other countries in this region set their own rules. A travel eSIM follows the provider's own checks. Compare the complete package rather than assuming one type is always cheaper.",
  ],
};

/** Middle East single-country vs regional guide. Region-specific; not used inside the reusable UI. */
export const middleEastCountryVsRegionalContent: CountryVsRegionalContent = {
  eyebrow: "Country vs Regional",
  headingTemplate:
    "Should You Choose a Single-Country eSIM or a {countryName} eSIM?",
  countryOption: {
    titleTemplate: "Single-country eSIM",
    paragraphs: [
      "A plan for one country usually makes sense when the whole trip stays there. A week in Turkey may offer more plan choices, or a better price for the data you need, than a regional plan that also covers countries you will not visit.",
    ],
  },
  regionalOption: {
    titleTemplate: "{countryName} eSIM",
    paragraphs: [
      "A {countryName} eSIM can be more convenient when the same trip includes more than one country, such as Turkey and Georgia. You keep one eSIM profile active instead of installing a new plan at the border. It includes a country only when the provider names it.",
    ],
    destinations: [
      "Turkey",
      "Georgia",
      "Jordan",
      "Armenia",
      "Azerbaijan",
    ],
  },
  notice:
    "Always check the included destination list. Iran, Iraq, Israel, Lebanon, Palestine, Syria and Yemen are included only when the provider names them. Greece is in the Balkans region. The Gulf countries are in the GCC Middle East region, not this one. Also verify whether the same data allowance, speed policy and network access apply in every listed country.",
};

/** Middle East phone compatibility guide. Region-specific; not used inside the reusable UI. */
export const middleEastPhoneCompatibilityContent: PhoneCompatibilityContent = {
  eyebrow: "Compatibility",
  headingTemplate: "Will My Phone Work With an eSIM in {countryName}?",
  paragraphs: [
    "Your phone generally needs to support eSIM and be carrier unlocked. Compatibility can vary by model, country of purchase and device configuration, even when a phone family normally supports eSIM.",
    "Check the exact model in the eSIMzo compatibility checker before purchasing. You can also look in your phone settings for an option to add an eSIM or mobile plan. If your device is locked to a carrier, contact that carrier before traveling.",
  ],
};

/** Middle East traveler tips. Region-specific; not used inside the reusable UI. */
export const middleEastTravelerTipsContent: TravelerTipsContent = {
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
      title: "Georgia needs its own listing.",
      paragraphs: [
        "A crossing from Turkey into Georgia is a new country. Greece is in the Balkans region, not this one.",
      ],
    },
    {
      title: "The Gulf is a different region.",
      paragraphs: [
        "Bahrain, Kuwait, Oman, Qatar, Saudi Arabia and the United Arab Emirates are in the GCC Middle East region. A {countryName} plan does not include them unless the provider names them separately.",
      ],
    },
    {
      title: "Some countries are included only when named.",
      paragraphs: [
        "Iran, Iraq, Israel, Lebanon, Palestine, Syria and Yemen are on this list. A plan includes them only when the provider names them.",
      ],
    },
    {
      title: "A Turkish local line has its own checks.",
      paragraphs: [
        "A foreign visitor registers that line with a passport or another official identity document. BTK allows 120 days from entry before device registration if the phone was brought from abroad and will use a Turkish line.",
      ],
    },
  ],
};

/** Middle East FAQs. Region-specific; not used inside the reusable UI. */
export const middleEastFaqsContent: CountryFaqsContent = {
  heading: "Frequently Asked Questions",
  faqs: [
    {
      question: "What is the best eSIM for {countryName}?",
      answer:
        "There is no single best eSIM for every trip across {countryName}. The right choice depends on which countries you will enter, how long the trip lasts, how much data you use, and whether you need hotspot or a local number. Compare the current plans by total price, price per GB, validity, the country list and fair use terms. A plan for Turkey alone can cost less if you never cross into Georgia.",
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
        "There is no single network for {countryName}. The plan uses a local partner in each country it lists. In Turkey those partners are Turkcell, Vodafone and Türk Telekom. Türk Telekom sells mobile service under the TT Mobil brand. Georgia, Jordan and the other countries in this region use their own operators. Check the partner named for each stop, because coverage changes at the border.",
    },
    {
      question: "Does {countryName} have 5G coverage?",
      answer:
        "Yes, in some cities, and less so outside them. There is no single 5G percentage for {countryName}. Each country measures its own operators, and the plan only uses the partner in its agreement. In Turkey, Turkcell, Vodafone and Türk Telekom began 5G on 1 April 2026 in the provincial centers of all 81 provinces. Outside those centers the connection may still be 4.5G or 4G. That schedule is one country, not the region. A 5G phone does not guarantee a 5G connection. The plan must include 5G access. Otherwise the connection uses 4G or 4.5G.",
    },
    {
      question: "Does a {countryName} eSIM include every country?",
      answer:
        "No. It includes only the countries the provider names. Turkey, Georgia, Jordan, Armenia and Azerbaijan are in this region, and a plan can omit any of them. Iran, Iraq, Israel, Lebanon, Palestine, Syria and Yemen are included only when named. Greece is in the Balkans region, not this one. Bahrain, Kuwait, Oman, Qatar, Saudi Arabia and the United Arab Emirates are in the GCC Middle East region, not this one.",
    },
    {
      question: "Do I need a passport to buy a local SIM in {countryName}?",
      answer:
        "It depends on the country. In Turkey, a foreign visitor registers a local line with a passport or another official identity document. If the phone was brought from abroad and will use a Turkish line, BTK allows 120 days from entry before device registration is required. Other countries in this region set their own rules. A travel eSIM for {countryName} follows the provider's own checks.",
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
        "Hotspot use depends on the specific plan. Many {countryName} eSIMs allow tethering, but some unlimited or daily data plans apply a separate hotspot limit or block it. Check the plan details before purchasing if you need to connect a laptop or another phone. Video calls and cloud syncing can use a large amount of data through hotspot.",
    },
  ],
};
