/** Words and data for the home page sections. */
const ICONS = "/assets/home";
const WF = "/assets/wf";

/** Where "Rated ... on Trustpilot" links to. */
export const TRUSTPILOT_PAGE = "https://uk.trustpilot.com/review/www.outfoxthemarket.co.uk";

export type Review = {
  title: string;
  body: string;
  name: string;
  when: string;
};

// Sample reviews from the design. Swap for real Trustpilot reviews (or Trustpilot's carousel widget) before launch.
export const REVIEWS: Review[] = [
  {
    title: "Sorted in under ten minutes",
    body: "Switching was genuinely effortless. The quote was clear, no hidden fees, and my first bill was exactly what I was told it would be.",
    name: "Saleh A.",
    when: "3 days ago",
  },
  {
    title: "Knowledgeable and friendly",
    body: "I called with a meter question and got a real person who actually knew their stuff. Sorted it on the first call.",
    name: "Mohammed R.",
    when: "11 hours ago",
  },
  {
    title: "Cheaper than my old supplier",
    body: "Same energy, same home, noticeably smaller direct debit. Wish I had moved across sooner, honestly.",
    name: "Hannah W.",
    when: "1 week ago",
  },
  {
    title: "Clear, prompt answers",
    body: "Every question I had over email came back quickly and in plain English. No call-centre script nonsense.",
    name: "E. Williams",
    when: "2 days ago",
  },
  {
    title: "The app makes it easy",
    body: "Submitting meter readings and checking my balance takes seconds. I always know where I stand.",
    name: "Daniel K.",
    when: "5 days ago",
  },
  {
    title: "Below the cap, as promised",
    body: "They said it would beat the price cap and it did. Lovely to deal with a supplier that just does what it says.",
    name: "Priya N.",
    when: "2 weeks ago",
  },
  {
    title: "No fuss, no jargon",
    body: "The whole switch happened in the background. I barely had to lift a finger and nothing went wrong.",
    name: "Tom B.",
    when: "4 days ago",
  },
  {
    title: "Smaller bills, same warm home",
    body: "We have not changed a thing about how we live, and yet the monthly payment dropped. Brilliant.",
    name: "Aisha M.",
    when: "3 days ago",
  },
  {
    title: "Felt looked after",
    body: "When my usage spiked over winter they got in touch first to talk it through. That kind of care is rare.",
    name: "George F.",
    when: "1 month ago",
  },
  {
    title: "Honest from the start",
    body: "No teaser rate that creeps up later. The price I signed up for is the price I am paying. Refreshing.",
    name: "Lucy D.",
    when: "6 days ago",
  },
  {
    title: "Switched my parents over too",
    body: "It was so painless I moved my mum and dad across the same afternoon. Both saving now.",
    name: "Raj P.",
    when: "2 weeks ago",
  },
  {
    title: "Quick to fix a billing query",
    body: "A reading came through wrong and it was corrected within a day, no chasing required. Properly impressed.",
    name: "Nadia K.",
    when: "1 day ago",
  },
];

export type Fuel = "electricity" | "gas";

export type Tariff = {
  name: string;
  fuels: Fuel[];
  price: string;
  saving: string;
};

export const TARIFFS: Tariff[] = [
  {
    name: "1-year Fixed Dual Fuel",
    fuels: ["electricity", "gas"],
    price: "£134.82",
    saving: "3% cheaper than price cap, or £45/year*",
  },
  {
    name: "1-year Fixed Electricity",
    fuels: ["electricity"],
    price: "£67.50",
    saving: "6% cheaper than price cap, or £51/year*",
  },
];

export const TARIFF_FOOTNOTE =
  "*Prices are based on Ofgem’s national Typical Domestic Consumption Values for medium energy use (2,700 kWh electricity and 11,500 kWh gas per year). Illustrative figures - your personalized quote is confirmed before you switch.";

/** `icon` is the path of an icon file in public/assets/wf (exported from the design). */
export type Feature = {
  icon: string;
  title: string;
  body: string;
};

/** Each price cap card has a 300 x 180 illustration (a file in public/assets/home), a title and a line of text. */
export type PriceCapTile = Omit<Feature, "icon"> & { image: string };

export const PRICE_CAP_FEATURES: PriceCapTile[] = [
  {
    image: "/assets/home/price-cap-drops.png",
    title: "Price drops when the cap drops",
    body: "If the price cap drops, your unit rates will drop too.",
  },
  {
    image: "/assets/home/price-cap-12-months.png",
    title: "Save for 12 months",
    body: "Benefit from below-cap rates for 12 months from the day you sign up.",
  },
  {
    image: "/assets/home/price-cap-below-cap.png",
    title: "Always below the price cap",
    body: "Unit rates guaranteed to be at least 5% cheaper than the price cap.",
  },
];
export const EV_FEATURES: Feature[] = [
  {
    icon: `${WF}/ev-tag.svg`,
    title: "Discounted overnight rate",
    body: "Charge between midnight and 5am when electricity costs less.",
  },
  {
    icon: `${WF}/ev-sparkle.svg`,
    title: "Smarter energy use",
    body: "Use more of your electricity overnight, when demand on the grid is lower.",
  },
];

/** Each "why" card shows a wide illustration (724 x 256) instead of an icon. */
export type WhyFeature = Omit<Feature, "icon"> & { image: string };

export const WHY_OUTFOX_FEATURES: WhyFeature[] = [
  {
    image: `${ICONS}/why-lower-prices.png`,
    title: "Unbeatable prices - always",
    body: "Why pay more for your energy? Enjoy the best prices with complete transparency and reduce your monthly costs.",
  },
  {
    image: `${ICONS}/why-excellent-service.png`,
    title: "Rated excellent for service",
    body: "Having the best prices does not mean you have to compromise on the quality of service. We're rated Excellent for a reason.",
  },
  {
    image: `${ICONS}/why-real-support.png`,
    title: "Real people, real support",
    body: "Say goodbye to robotic replies. Our UK-based support team is friendly, fast, and always ready to help when you need us most.",
  },
];

export type Certification = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// Sizes are the logo's drawn size in the design, so each one keeps its own shape.
export const CERTIFICATIONS: Certification[] = [
  { src: `${ICONS}/cert-bsi-27001.png`, alt: "BSI ISO/IEC 27001 Information Security Management certified", width: 204, height: 103 },
  { src: `${ICONS}/cert-scope.png`, alt: "Scope – Equality for disabled people", width: 162, height: 102 },
  { src: `${ICONS}/cert-vulnerability.png`, alt: "Vulnerability Commitment member 2026", width: 103, height: 103 },
  { src: `${ICONS}/cert-energy-switch.png`, alt: "Energy Switch Guarantee", width: 204, height: 60 },
  { src: `${ICONS}/cert-bsi-ukas.png`, alt: "BSI and UKAS management systems certified", width: 175, height: 103 },
];

export type Step = {
  title: string;
  body: string;
};

export const STEPS: Step[] = [
  {
    title: "Get your quote",
    body: "Pop in your postcode and in a few clicks we’ll show you exactly how much you could save - no guesswork, no jargon.",
  },
  {
    title: "Choose your tariff",
    body: "Compare our range side by side and pick the plan that suits your home best, with the price you sign up for locked in.",
  },
  {
    title: "Start your switch",
    body: "Leave the rest to us. Your new tariff begins within five working days - no downtime, no engineer visit, no fuss.",
  },
  {
    title: "Start saving",
    body: "That’s it. You’re now paying less for the same energy, every single month, with friendly UK support behind you.",
  },
];

export type OpeningHours = {
  days: string;
  hours: string;
  open: boolean;
};

export const OPENING_HOURS: OpeningHours[] = [
  { days: "Mon–Fri", hours: "8:30am–5:00pm", open: true },
  { days: "Saturday", hours: "9:00am–2:00pm", open: true },
  { days: "Sunday", hours: "Closed", open: false },
];

export const PHONE = { label: "0800 103 2702", href: "tel:08001032702" };

// From Outfox's help centre article "Is there an Outfox Energy app?".
export const APP_STORE_URL = "https://apps.apple.com/gb/app/outfox-energy/id1525216425";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.redfishuk.otm.app";

