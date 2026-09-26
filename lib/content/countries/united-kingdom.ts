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

/** United Kingdom plans-page hero copy. Country-specific; not used inside the reusable UI. */
export const unitedKingdomPlansHeroContent: CountryPlansHeroContent = {
  eyebrow: "Compare Plans",
  titleTemplate: "Compare eSIM Plans for {countryName}",
  description:
    "Compare travel eSIM plans for {countryName} by price, data, validity, local network, 5G access, hotspot support and speed limits. Use the filters to find an option that fits your trip and phone.",
  browseTemplate:
    "Browse {planCount} plans from {providerCount} providers.",
  pricingTemplate:
    "Plans currently start at {startingPrice}. Plan information updated {lastUpdated}.",
};

/** United Kingdom how-to-choose guide. Country-specific; not used inside the reusable UI. */
export const unitedKingdomHowToChooseContent: HowToChooseEsimContent = {
  eyebrow: "Buying Guide",
  headingTemplate: "How to Choose an eSIM for {countryName}",
  intro:
    "The right plan depends on how long you will be in {countryName}, where you will travel and how you use your phone. A few days in London has different needs from a route through the Scottish Highlands or Welsh uplands, or a crossing into Ireland or France.",
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
        "The main mobile networks in {countryName} are EE, O2, Vodafone and Three. Vodafone and Three are part of VodafoneThree, but Ofcom still reports their coverage separately while the networks are integrated. International eSIM providers connect through one or more of these local partner networks.",
        "The local partner matters because coverage and performance vary by location. Check the network shown on each plan, especially if your route leaves the cities or includes the Highlands, upland Wales, the Scottish islands or a rural rail line.",
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
        "Many travel eSIMs are data only. You can still use WhatsApp, FaceTime, Signal and other internet-based apps, but you may not receive a British phone number or standard voice and SMS service.",
        "If you need a local number for calls, restaurant bookings or other services, filter for plans that clearly include voice and SMS. Confirm the number type and the countries covered before purchasing.",
      ],
    },
  ],
};

/** United Kingdom data-needs guide. Country-specific; not used inside the reusable UI. */
export const unitedKingdomDataNeedsContent: DataNeedsContent = {
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

/** United Kingdom network coverage guide. Country-specific; not used inside the reusable UI. */
export const unitedKingdomNetworkCoverageContent: NetworkCoverageContent = {
  eyebrow: "Coverage",
  headingTemplate: "Mobile Networks and eSIM Coverage in {countryName}",
  paragraphs: [
    "The main mobile networks in {countryName} are EE, O2, Vodafone and Three. Vodafone and Three are part of VodafoneThree, and Ofcom still measures them separately until the networks are fully integrated. A travel eSIM connects through one or more of these partners, and it only receives the networks and technologies in its provider agreement.",
    "London, Manchester, Birmingham, Edinburgh, Glasgow, Cardiff and Belfast usually offer more network choice than rural and upland areas. Signal quality can still change inside buildings, on the London Underground, in rail tunnels and on roads through the Scottish Highlands, the Scottish islands or upland Wales.",
    "A 5G label is not a coverage promise. Ofcom's January 2026 update, at its high confidence level, found outdoor 5G coverage outside premises ranging from 76% to 94% depending on the operator. A travel eSIM can still fall back to 4G. Ofcom also states that 3G from these operators is now switched off, so a phone needs 4G or 5G. Check the listed partner and its coverage map when you need a connection for navigation.",
  ],
  networks: ["EE", "O2", "Vodafone", "Three"],
  territories: ["Jersey", "Guernsey", "Isle of Man", "Gibraltar"],
  notice:
    "Jersey, Guernsey and the Isle of Man are Crown Dependencies, not part of {countryName}, and Gibraltar is a British Overseas Territory. Mobile service there is licensed separately. A plan for {countryName} includes these places only when the provider names them.",
};

/** United Kingdom unlimited-plans guide. Country-specific; not used inside the reusable UI. */
export const unitedKingdomUnlimitedPlansContent: UnlimitedPlansContent = {
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

/** United Kingdom eSIM vs local SIM guide. Country-specific; not used inside the reusable UI. */
export const unitedKingdomEsimVsLocalContent: EsimVsLocalContent = {
  eyebrow: "eSIM vs Local",
  headingTemplate: "eSIM or Local SIM in {countryName}?",
  intro:
    "Both can work well. The better choice depends on whether you value setup before arrival, a local phone number or access to a particular British operator.",
  columns: {
    travelEsim: "Travel eSIM",
    localSim: "Local SIM or operator eSIM",
  },
  rows: [
    {
      travelEsim: "Can usually be purchased before departure",
      localSim: "Often purchased directly from a British operator or retailer",
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
      localSim: "May offer local bundles and a British phone number",
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
    "A travel eSIM is useful when you want data ready for arrival and do not need a British number. A local plan may suit a longer stay or a traveler who needs conventional calls, SMS and local service. Compare the complete package rather than assuming one type is always cheaper.",
  ],
};

/** United Kingdom country vs regional Europe guide. Country-specific; not used inside the reusable UI. */
export const unitedKingdomCountryVsRegionalContent: CountryVsRegionalContent =
  {
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
        "A regional Europe eSIM can be more convenient if the same trip includes Ireland, France, Belgium, the Netherlands or Spain. You can keep one eSIM profile active while crossing borders instead of installing a separate plan in each country.",
      ],
      destinations: ["Ireland", "France", "Belgium", "Netherlands", "Spain"],
    },
    notice:
      "Always check the included destination list. {countryName} is not a member of the European Union, so a plan marketed for Europe may leave it out or apply different terms. Ireland is in the European Union. The Channel Islands and the Isle of Man are not part of {countryName}. Also verify whether the same data allowance, speed policy and network access apply throughout the region.",
  };

/** United Kingdom phone compatibility guide. Country-specific; not used inside the reusable UI. */
export const unitedKingdomPhoneCompatibilityContent: PhoneCompatibilityContent =
  {
    eyebrow: "Compatibility",
    headingTemplate: "Will My Phone Work With an eSIM in {countryName}?",
    paragraphs: [
      "Your phone generally needs to support eSIM and be carrier unlocked. Compatibility can vary by model, country of purchase and device configuration, even when a phone family normally supports eSIM.",
      "Check the exact model in the eSIMzo compatibility checker before purchasing. You can also look in your phone settings for an option to add an eSIM or mobile plan. If your device is locked to a carrier, contact that carrier before traveling.",
    ],
  };

/** United Kingdom traveler tips. Country-specific; not used inside the reusable UI. */
export const unitedKingdomTravelerTipsContent: TravelerTipsContent = {
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
      title: "Download maps before the Highlands or an island ferry.",
      paragraphs: [
        "Coverage is less predictable in the Scottish Highlands, on the Scottish islands and in upland Wales than in London or Manchester. Save maps and tickets before you leave a town.",
      ],
    },
    {
      title: "Expect the signal to change underground.",
      paragraphs: [
        "The London Underground and rail tunnels can interrupt a mobile signal. Keep tickets and directions available offline.",
      ],
    },
    {
      title: "Confirm the Crown Dependencies by name.",
      paragraphs: [
        "Jersey, Guernsey, the Isle of Man and Gibraltar are not part of {countryName}. A plan covers them only when the provider lists each one.",
      ],
    },
    {
      title: "Treat the Irish border as a new destination.",
      paragraphs: [
        "Data for {countryName} does not automatically continue in Ireland, including on a short crossing from Northern Ireland. France is a separate destination too. The other country has to be on the plan.",
      ],
    },
  ],
};

/** United Kingdom FAQs. Country-specific; not used inside the reusable UI. */
export const unitedKingdomFaqsContent: CountryFaqsContent = {
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
        "The main mobile networks in {countryName} are EE, O2, Vodafone and Three. Vodafone and Three belong to VodafoneThree, but Ofcom still measures their coverage separately while the networks are integrated. Travel eSIM providers use agreements with one or more of these networks. Check the partner named on the plan, because coverage and 5G access change by location and device.",
    },
    {
      question: "Does {countryName} have 5G coverage?",
      answer:
        "Yes. EE, O2, Vodafone and Three operate 5G in {countryName}. Ofcom's January 2026 update, at its high confidence level, put outdoor 5G coverage outside premises at 76% to 94%, depending on the operator. A 5G phone does not guarantee that every travel eSIM will connect to 5G. The plan must include 5G access, the partner network must offer it where you are, and your device must support the relevant bands. Otherwise the connection may use 4G.",
    },
    {
      question:
        "Does an eSIM for {countryName} work in the Channel Islands or the Isle of Man?",
      answer:
        "No. Jersey, Guernsey and the Isle of Man are Crown Dependencies, not part of {countryName}, and mobile services there are licensed separately. Gibraltar is a British Overseas Territory and is also outside {countryName}. A travel eSIM includes these places only when the provider names them. Check each one in the coverage list before you buy.",
    },
    {
      question:
        "Can a {countryName} travel eSIM include calls, SMS or a phone number?",
      answer:
        "Some {countryName} eSIM plans include voice, SMS or a phone number, but many travel plans are data only. Use the plan filters and read the details to confirm what is included. If a number is provided, check whether it is British or from another country and whether incoming and outgoing calls and texts are supported. Internet calling apps work with a data only plan.",
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
