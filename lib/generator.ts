// Intelligent template engine: turns a 2-sentence business description
// into a complete, professional landing page. No API keys, no lorem ipsum.

export type Industry =
  | 'restaurant' | 'fitness' | 'dental' | 'legal' | 'realestate'
  | 'salon' | 'barber' | 'saas' | 'ecommerce' | 'photography' | 'consulting';

export type Tone = 'professional' | 'fun' | 'luxury';

export interface LandingInput {
  businessName: string;
  description: string;
  industry: Industry;
  tone: Tone;
}

export interface Feature { icon: string; title: string; description: string }
export interface Testimonial { name: string; role: string; quote: string; initials: string }
export interface PricingTier { name: string; price: string; period: string; features: string[]; highlighted: boolean; cta: string }

export interface LandingData {
  hero: { badge: string; headline: string; subheadline: string; ctaPrimary: string; ctaSecondary: string };
  stats: { value: string; label: string }[];
  features: Feature[];
  featuresHeadline: string;
  featuresSub: string;
  testimonials: Testimonial[];
  pricing: PricingTier[];
  pricingSub: string;
  cta: { headline: string; subheadline: string; button: string };
  footerTagline: string;
  theme: Theme;
}

export interface Theme {
  primary: string; primaryDark: string; accent: string;
  bg: string; bgSoft: string; card: string; text: string; muted: string;
  fontDisplay: string;
}

export const INDUSTRIES: { value: Industry; label: string }[] = [
  { value: 'restaurant', label: '🍽️ Restaurant' },
  { value: 'fitness', label: '💪 Fitness / Gym' },
  { value: 'dental', label: '🦷 Dental Clinic' },
  { value: 'legal', label: '⚖️ Law Firm' },
  { value: 'realestate', label: '🏠 Real Estate' },
  { value: 'salon', label: '💅 Salon / Spa' },
  { value: 'barber', label: '💈 Barbershop' },
  { value: 'saas', label: '💻 SaaS / Tech' },
  { value: 'ecommerce', label: '🛍️ E-commerce' },
  { value: 'photography', label: '📸 Photography' },
  { value: 'consulting', label: '📊 Consulting' },
];

export const TONES: { value: Tone; label: string; hint: string }[] = [
  { value: 'professional', label: 'Professional', hint: 'Trustworthy, clear, confident' },
  { value: 'fun', label: 'Fun & Bold', hint: 'Playful, energetic, memorable' },
  { value: 'luxury', label: 'Luxury', hint: 'Exclusive, refined, premium' },
];

// ---------- seeded random ----------
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pick<T>(rnd: () => number, arr: T[]): T { return arr[Math.floor(rnd() * arr.length)]; }

// ---------- tone modifiers ----------
const TONE_WORDS: Record<Tone, { adj: string[]; cta: string[]; trust: string[] }> = {
  professional: {
    adj: ['trusted', 'reliable', 'proven', 'leading', 'certified'],
    cta: ['Get started today', 'Book a consultation', 'Talk to our team'],
    trust: ['Licensed & insured', '10+ years of experience', 'Satisfaction guaranteed'],
  },
  fun: {
    adj: ['awesome', 'game-changing', 'next-level', 'unforgettable', 'epic'],
    cta: ["Let's do this!", 'Join the fun', 'Get in on it'],
    trust: ['Loved by hundreds', 'Zero boring stuff', 'Good vibes only'],
  },
  luxury: {
    adj: ['exclusive', 'bespoke', 'refined', 'prestigious', 'exceptional'],
    cta: ['Request a private consultation', 'Experience the difference', 'Reserve your place'],
    trust: ['By appointment only', 'Discreet & confidential', 'White-glove service'],
  },
};

// ---------- industry content banks ----------
interface IndustryBank {
  headlines: string[];          // {name}, {adj}, {desc} placeholders
  subheadlines: string[];
  badge: string[];
  features: { icon: string; title: string; description: string }[];
  featuresHeadline: string;
  stats: { value: string; label: string }[];
  testimonials: { name: string; role: string; quote: string }[];
  pricing: { name: string; price: string; features: string[]; cta: string }[];
  pricingModel: 'subscription' | 'per-service';  // subscription → "/mo", per-service → no period
  pricingSub: string;
  ctaHeadline: string[];
  footerTagline: string[];
  palette: Theme;
}

const BANKS: Record<Industry, IndustryBank> = {
  restaurant: {
    headlines: [
      'Dinner, the {adj} way',
      '{name}: taste the {adj} difference',
      'Dinner deserves to be {adj}',
    ],
    subheadlines: [
      '{desc} — crafted with fresh ingredients, served with passion, in the heart of the city.',
      'From our kitchen to your table: {desc}. Reserve your evening with us.',
    ],
    badge: ['Now accepting reservations', 'Chef-curated seasonal menu', 'Rated 4.9 by our guests'],
    features: [
      { icon: '🍳', title: 'Chef-Curated Menu', description: 'Seasonal dishes crafted from locally sourced ingredients, refreshed every month.' },
      { icon: '🍷', title: 'Curated Wine Pairing', description: 'Our sommelier pairs every course with the perfect pour.' },
      { icon: '🎉', title: 'Private Events', description: 'Birthdays, anniversaries, corporate dinners — we host unforgettable nights.' },
      { icon: '🛵', title: 'Fast Delivery', description: 'Your favorites at your door in under 35 minutes, still sizzling.' },
    ],
    featuresHeadline: 'An experience, not just a meal',
    stats: [
      { value: '4.9★', label: 'Average rating' },
      { value: '25k+', label: 'Happy guests' },
      { value: '120+', label: 'Dishes crafted' },
    ],
    testimonials: [
      { name: 'Mariana Torres', role: 'Regular since 2022', quote: 'The best dinner I have had in years. Every plate felt like a small celebration.' },
      { name: 'James Carter', role: 'Food critic', quote: 'A rare gem — bold flavors, flawless service, zero pretension.' },
      { name: 'Lucía Fernández', role: 'Celebrated her wedding here', quote: 'They hosted our reception and guests still talk about the food.' },
    ],
    pricing: [
      { name: 'Lunch', price: '$18', features: ['2-course lunch menu', 'Weekdays 12–3pm', 'Free dessert on Fridays'], cta: 'See lunch menu' },
      { name: 'Dinner', price: '$45', features: ['3-course chef menu', 'Wine pairing available', 'Priority reservations'], cta: 'Reserve a table' },
      { name: 'Private Events', price: 'Custom', features: ['Full venue buyout', 'Custom menu design', 'Dedicated event team'], cta: 'Plan my event' },
    ],
    pricingModel: 'per-service',
    pricingSub: 'Transparent pricing. Pay per visit — no subscriptions.',
    ctaHeadline: ['Your table is waiting', 'Taste what everyone is talking about'],
    footerTagline: ['Good food. Great company.', 'Taste worth remembering.'],
    palette: { primary: '#c2410c', primaryDark: '#9a3412', accent: '#f59e0b', bg: '#fffbeb', bgSoft: '#fef3c7', card: '#ffffff', text: '#1c1917', muted: '#78716c', fontDisplay: 'Georgia, serif' },
  },
  fitness: {
    headlines: [
      'Stronger every rep. {adj} results, guaranteed.',
      'Your {adj} transformation starts at {name}',
      'Stop waiting. Start your {adj} transformation.',
    ],
    subheadlines: [
      '{desc} — expert coaching, real programming, and a community that refuses to let you quit.',
      'No gimmicks. Just {desc}, proven programming, and coaches who actually care.',
    ],
    badge: ['First week free', 'No enrollment fees this month', 'Certified elite coaches'],
    features: [
      { icon: '🏋️', title: 'Personal Coaching', description: '1-on-1 programming built around your body, your goals, your schedule.' },
      { icon: '📊', title: 'Progress Tracking', description: 'Monthly assessments, body scans and strength benchmarks — see every gain.' },
      { icon: '🥗', title: 'Nutrition Plans', description: 'Simple, sustainable meal plans designed by certified nutritionists.' },
      { icon: '👥', title: 'Group Classes', description: 'HIIT, strength, mobility and boxing — 40+ classes a week, all levels.' },
    ],
    featuresHeadline: 'Everything you need to win',
    stats: [
      { value: '2,400+', label: 'Members transformed' },
      { value: '40+', label: 'Weekly classes' },
      { value: '15', label: 'Elite coaches' },
    ],
    testimonials: [
      { name: 'Diego Ramírez', role: 'Lost 18kg in 6 months', quote: 'I tried every gym in the city. This is the first one that actually changed my life.' },
      { name: 'Sofia Mendez', role: 'Member since 2023', quote: 'The coaches know my name, my goals, my limits — and push me past them.' },
      { name: 'Chris Bell', role: 'Competitive lifter', quote: 'Programming is elite. Added 40kg to my total in one year.' },
    ],
    pricing: [
      { name: 'Off-Peak', price: '$29', features: ['Gym floor access', '1 group class / week', 'Locker room'], cta: 'Start training' },
      { name: 'All Access', price: '$59', features: ['24/7 full access', 'Unlimited classes', 'Quarterly assessment', 'Nutrition guide'], cta: 'Go all in' },
      { name: 'Elite', price: '$149', features: ['Everything in All Access', '4 PT sessions / month', 'Custom meal plan', 'Recovery zone access'], cta: 'Train elite' },
    ],
    pricingModel: 'subscription',
    pricingSub: 'No hidden fees. Cancel anytime.',
    ctaHeadline: ['Your first week is on us', 'Your strongest self starts today.'],
    footerTagline: ['Sweat. Repeat. Transform.', 'Strong looks good on you.'],
    palette: { primary: '#dc2626', primaryDark: '#991b1b', accent: '#f97316', bg: '#0c0a09', bgSoft: '#1c1917', card: '#1c1917', text: '#fafaf9', muted: '#a8a29e', fontDisplay: 'Arial Black, sans-serif' },
  },
  dental: {
    headlines: [
      'Great smiles change everything',
      '{name}: {adj} dentistry, zero fear',
      'Love your smile again — the {adj} way',
    ],
    subheadlines: [
      '{desc} — gentle, modern dental care with transparent pricing and zero judgment.',
      'From routine cleanings to full smile makeovers: {desc}, designed around your comfort.',
    ],
    badge: ['Accepting new patients', 'Same-week appointments', 'Painless guarantee'],
    features: [
      { icon: '🦷', title: 'Gentle Cleanings', description: 'Comfort-first cleanings with noise-cancelling headphones and blankets.' },
      { icon: '✨', title: 'Cosmetic Dentistry', description: 'Veneers, whitening and smile design — natural results, never fake.' },
      { icon: '🦾', title: 'Modern Technology', description: 'Digital X-rays with 90% less radiation and same-day crowns.' },
      { icon: '💳', title: 'Transparent Pricing', description: 'Written estimates before any work. Payment plans available.' },
    ],
    featuresHeadline: 'Dental care without the dread',
    stats: [
      { value: '5,000+', label: 'Smiles transformed' },
      { value: '4.9★', label: 'Patient rating' },
      { value: '15 yrs', label: 'Serving the community' },
    ],
    testimonials: [
      { name: 'Ana Paula', role: 'Invisalign patient', quote: 'I used to hide my smile in photos. Six months later I cannot stop smiling.' },
      { name: 'Robert Hayes', role: 'Dental-phobic no more', quote: 'I avoided dentists for a decade. Here I actually fell asleep during a root canal.' },
      { name: 'Carmen Ruiz', role: 'Veneers patient', quote: 'They look so natural that my own mother could not tell.' },
    ],
    pricing: [
      { name: 'Essential', price: '$89', features: ['Cleaning + exam', 'Digital X-rays', 'Treatment plan'], cta: 'Book cleaning' },
      { name: 'Complete', price: '$249', features: ['Everything in Essential', 'Professional whitening', 'Night guard consult'], cta: 'Full checkup' },
      { name: 'Smile Design', price: 'Custom', features: ['Digital smile preview', 'Veneers / Invisalign', 'Dedicated coordinator'], cta: 'Design my smile' },
    ],
    pricingModel: 'per-service',
    pricingSub: 'Transparent pricing. Pay only for what you need.',
    ctaHeadline: ['Book your visit in 60 seconds', 'Your best smile is one visit away'],
    footerTagline: ['Gentle dentistry, honest pricing.', 'Your smile, our masterpiece.'],
    palette: { primary: '#0ea5e9', primaryDark: '#0369a1', accent: '#22d3ee', bg: '#f0f9ff', bgSoft: '#e0f2fe', card: '#ffffff', text: '#0c4a6e', muted: '#64748b', fontDisplay: 'Verdana, sans-serif' },
  },
  legal: {
    headlines: [
      '{adj} defense when it matters most',
      '{name}: {adj} counsel, real results',
      'Your rights deserve {adj} representation',
    ],
    subheadlines: [
      '{desc} — strategic, discreet legal counsel with a track record of winning.',
      'When the stakes are high, you need {desc}. We fight like it is personal — because to you, it is.',
    ],
    badge: ['Free confidential consultation', 'No win, no fee (contingency)', 'Available 24/7 for emergencies'],
    features: [
      { icon: '⚖️', title: 'Litigation', description: 'Aggressive courtroom advocacy backed by meticulous preparation.' },
      { icon: '📝', title: 'Contracts', description: 'Ironclad agreements drafted and reviewed — no loopholes, no surprises.' },
      { icon: '🏢', title: 'Business Law', description: 'Entity formation, compliance and M&A guidance for growing companies.' },
      { icon: '🛡️', title: 'Criminal Defense', description: 'Discreet, relentless defense from investigation through trial.' },
    ],
    featuresHeadline: 'Counsel you can count on',
    stats: [
      { value: '$120M+', label: 'Recovered for clients' },
      { value: '98%', label: 'Cases won' },
      { value: '20 yrs', label: 'In practice' },
    ],
    testimonials: [
      { name: 'M. Thompson', role: 'Business owner', quote: 'They saved my company. Strategic, honest, and absolutely relentless.' },
      { name: 'Elena V.', role: 'Personal injury client', quote: 'I felt heard from day one. The settlement exceeded every expectation.' },
      { name: 'David K.', role: 'Startup founder', quote: 'Our go-to firm for everything from formation to acquisition.' },
    ],
    pricing: [
      { name: 'Consultation', price: 'Free', features: ['30-min case review', 'Honest assessment', 'No obligation'], cta: 'Book free consult' },
      { name: 'Essential', price: '$250/hr', features: ['Contracts & review', 'Demand letters', 'Email + phone support'], cta: 'Retain us' },
      { name: 'Full Counsel', price: 'Custom', features: ['Dedicated attorney', 'Litigation & trial', 'Priority 24/7 line'], cta: 'Get protected' },
    ],
    pricingModel: 'per-service',
    pricingSub: 'Clear rates, agreed upfront. No surprises.',
    ctaHeadline: ['Your first consultation is free', '{adj} counsel starts with a conversation'],
    footerTagline: ['Justice, delivered.', 'We fight. You win.'],
    palette: { primary: '#1e3a8a', primaryDark: '#172554', accent: '#b45309', bg: '#eff6ff', bgSoft: '#dbeafe', card: '#ffffff', text: '#1e293b', muted: '#64748b', fontDisplay: 'Georgia, serif' },
  },
  realestate: {
    headlines: [
      'Find home. The {adj} way.',
      '{name}: where {adj} listings live',
      'Your dream home is {adj} and waiting',
    ],
    subheadlines: [
      '{desc} — curated properties, honest guidance, and negotiation that protects your money.',
      'Buying or selling? {desc} — we make every move with your best interest first.',
    ],
    badge: ['New listings weekly', 'Off-market access', 'Top 1% local agents'],
    features: [
      { icon: '🔑', title: 'Curated Listings', description: 'Hand-vetted properties — no bait listings, no surprises at closing.' },
      { icon: '💰', title: 'Smart Negotiation', description: 'Our agents save buyers an average of 4.2% below asking.' },
      { icon: '📸', title: 'Premium Marketing', description: 'Pro photography, drone tours and staging that sells 2x faster.' },
      { icon: '🤝', title: 'End-to-End Support', description: 'From pre-approval to keys in hand — one team, zero stress.' },
    ],
    featuresHeadline: 'Move with confidence',
    stats: [
      { value: '$480M+', label: 'In closed sales' },
      { value: '1,200+', label: 'Families moved' },
      { value: '12 days', label: 'Avg. time on market' },
    ],
    testimonials: [
      { name: 'The Alvarez Family', role: 'First-time buyers', quote: 'They found us an off-market gem and negotiated $18k under asking.' },
      { name: 'Sarah Mitchell', role: 'Sold in 9 days', quote: 'The staging and photos were unreal. We had 6 offers over asking.' },
      { name: 'Kenji T.', role: 'Investor', quote: 'My third purchase with them. Flawless every single time.' },
    ],
    pricing: [
      { name: 'Buyer', price: 'Free', features: ['Curated home search', 'Tour scheduling', 'Offer negotiation'], cta: 'Start searching' },
      { name: 'Seller', price: '3%', features: ['Pro photo + drone', 'Staging consult', 'Multi-channel marketing'], cta: 'Get valuation' },
      { name: 'Investor', price: 'Custom', features: ['Off-market pipeline', 'ROI analysis', 'Portfolio strategy'], cta: 'Talk strategy' },
    ],
    pricingModel: 'per-service',
    pricingSub: 'Free for buyers. Sellers pay at closing — nothing upfront.',
    ctaHeadline: ['Your next chapter starts here', 'Let us find your {adj} home'],
    footerTagline: ['Home is where we take you.', 'Keys to your future.'],
    palette: { primary: '#047857', primaryDark: '#065f46', accent: '#d97706', bg: '#ecfdf5', bgSoft: '#d1fae5', card: '#ffffff', text: '#064e3b', muted: '#64748b', fontDisplay: 'Georgia, serif' },
  },
  salon: {
    headlines: [
      'Your {adj} glow-up starts here',
      '{name}: where every visit feels special',
      'Look stunning. Feel unstoppable.',
    ],
    subheadlines: [
      '{desc} — expert stylists, premium products, and an hour that is entirely yours.',
      'Hair, nails, skin: {desc}. Walk in stressed, walk out radiant.',
    ],
    badge: ['Book online in seconds', 'Premium product lines', 'Master stylists'],
    features: [
      { icon: '💇', title: 'Hair Artistry', description: 'Cuts, color, balayage and keratin by certified master stylists.' },
      { icon: '💅', title: 'Nails & Spa', description: 'Manicures, pedicures and nail art that last for weeks.' },
      { icon: '✨', title: 'Skin & Facials', description: 'Deep-cleansing facials and glow treatments with medical-grade products.' },
      { icon: '👰', title: 'Bridal Packages', description: 'Full bridal party styling — trials, day-of team, champagne included.' },
    ],
    featuresHeadline: 'Your chair is waiting',
    stats: [
      { value: '8,000+', label: 'Transformations' },
      { value: '4.9★', label: 'Client rating' },
      { value: '12', label: 'Master stylists' },
    ],
    testimonials: [
      { name: 'Valentina R.', role: 'Balayage client', quote: 'I showed one Pinterest photo and she nailed it perfectly. I cried happy tears.' },
      { name: 'Jasmine L.', role: 'Bride 2025', quote: 'My entire bridal party looked flawless. Worth every penny.' },
      { name: 'Paula G.', role: 'Monthly regular', quote: 'My self-care ritual. I leave feeling like the best version of me.' },
    ],
    pricing: [
      { name: 'Refresh', price: '$45', features: ['Cut + style', 'Deep conditioning', 'Product consult'], cta: 'Book refresh' },
      { name: 'Signature', price: '$120', features: ['Full color / balayage', 'Treatment + style', 'Take-home kit'], cta: 'Go signature' },
      { name: 'Bridal', price: 'Custom', features: ['Trial session', 'Day-of glam team', 'Bridal party rates'], cta: 'Plan my day' },
    ],
    pricingModel: 'per-service',
    pricingSub: 'Pay per visit. No memberships, no fine print.',
    ctaHeadline: ['Book your glow-up', 'Your chair is waiting this weekend'],
    footerTagline: ['Beauty, perfected.', 'You deserve this chair.'],
    palette: { primary: '#db2777', primaryDark: '#9d174d', accent: '#f59e0b', bg: '#fdf2f8', bgSoft: '#fce7f3', card: '#ffffff', text: '#500f28', muted: '#9d7c8c', fontDisplay: 'Georgia, serif' },
  },
  barber: {
    headlines: [
      'Sharp looks. {adj} service. Zero waiting.',
      '{name}: where every cut is {adj}',
      'Walk in scruffy. Walk out sharp.',
    ],
    subheadlines: [
      '{desc} — precision cuts, straight-razor shaves and beard sculpting by master barbers.',
      'Classic craft, modern style: {desc}. Book your chair in 30 seconds.',
    ],
    badge: ['Walk-ins welcome', 'Master barbers', 'Book online in seconds'],
    features: [
      { icon: '💈', title: 'Precision Cuts', description: 'Classic tapers, skin fades and scissor work — tailored to your head shape and style.' },
      { icon: '🪒', title: 'Straight-Razor Shaves', description: 'Hot towel, rich lather, a single blade. The closest, smoothest shave of your life.' },
      { icon: '🧔', title: 'Beard Sculpting', description: 'Shape, line-up and hot-towel conditioning — turn the beard into the main feature.' },
      { icon: '🔥', title: 'Hot Towel Finish', description: 'Every service ends with a hot towel and a style — walk out ready for anything.' },
    ],
    featuresHeadline: 'The chair is waiting',
    stats: [
      { value: '12k+', label: 'Cuts delivered' },
      { value: '4.9★', label: 'Client rating' },
      { value: '8', label: 'Master barbers' },
    ],
    testimonials: [
      { name: 'Marcus Webb', role: 'Client since 2021', quote: 'Best fade in the city, no contest. I do not trust anyone else with my hair anymore.' },
      { name: 'Diego Fuentes', role: 'Straight-razor convert', quote: 'The hot towel shave is something every man should try once. Then every week.' },
      { name: 'James Okafor', role: 'Beard client', quote: 'They turned my patchy mess into a beard that gets compliments from strangers.' },
    ],
    pricing: [
      { name: 'Classic Cut', price: '$25', features: ['Precision cut', 'Wash + style', 'Hot towel finish'], cta: 'Book a cut' },
      { name: 'Cut + Beard', price: '$45', features: ['Everything in Classic', 'Beard sculpt + line-up', 'Beard oil treatment'], cta: 'Book the combo' },
      { name: 'The Full Works', price: '$65', features: ['Cut + beard', 'Straight-razor shave', 'Facial + style consult'], cta: 'Go full works' },
    ],
    pricingModel: 'per-service',
    pricingSub: 'Pay per visit. No memberships, no fine print.',
    ctaHeadline: ['Your chair is ready', 'Walk out sharp tonight.'],
    footerTagline: ['Stay sharp.', 'A cut above the rest.'],
    palette: { primary: '#b45309', primaryDark: '#92400e', accent: '#f59e0b', bg: '#1c1917', bgSoft: '#292524', card: '#292524', text: '#fafaf9', muted: '#a8a29e', fontDisplay: 'Georgia, serif' },
  },
  saas: {
    headlines: [
      'Ship {adj} software, faster',
      '{name}: the {adj} way to {verb}',
      'Your workflow, {adj} and automated',
    ],
    subheadlines: [
      '{desc} — the platform teams choose when spreadsheets stop scaling.',
      '{desc}. Set up in minutes, loved by teams worldwide.',
    ],
    badge: ['Free 14-day trial', 'No credit card required', 'SOC 2 certified'],
    features: [
      { icon: '⚡', title: 'Blazing Fast', description: 'Sub-second responses at any scale. Built on modern edge infrastructure.' },
      { icon: '🔌', title: '60+ Integrations', description: 'Connect your stack in one click — Slack, Stripe, Salesforce and more.' },
      { icon: '📊', title: 'Real-time Analytics', description: 'Dashboards that update live. Know what is happening, when it happens.' },
      { icon: '🔒', title: 'Enterprise Security', description: 'SOC 2 Type II, SSO/SAML, audit logs and granular permissions.' },
    ],
    featuresHeadline: 'Built for teams that ship',
    stats: [
      { value: '12k+', label: 'Teams onboard' },
      { value: '99.99%', label: 'Uptime SLA' },
      { value: '4.8★', label: 'On G2' },
    ],
    testimonials: [
      { name: 'Alex Rivera', role: 'CTO, Nexora', quote: 'We replaced four tools in a week. Our velocity doubled.' },
      { name: 'Priya Sharma', role: 'Head of Ops', quote: 'The first software our whole team actually enjoys using.' },
      { name: 'Tom Becker', role: 'Founder, Loopwise', quote: 'Setup took 11 minutes. ROI was visible by Friday.' },
    ],
    pricing: [
      { name: 'Starter', price: '$19', features: ['Up to 5 users', 'Core features', 'Community support'], cta: 'Start free trial' },
      { name: 'Growth', price: '$49', features: ['Unlimited users', 'All integrations', 'Priority support', 'Advanced analytics'], cta: 'Scale with us' },
      { name: 'Enterprise', price: 'Custom', features: ['SSO/SAML', 'Dedicated CSM', 'Custom SLA', 'Onboarding team'], cta: 'Talk to sales' },
    ],
    pricingModel: 'subscription',
    pricingSub: 'No hidden fees. Cancel anytime.',
    ctaHeadline: ['Start your free trial today', 'Join 12,000+ {adj} teams'],
    footerTagline: ['Software that ships.', 'Built for builders.'],
    palette: { primary: '#7c3aed', primaryDark: '#5b21b6', accent: '#06b6d4', bg: '#faf5ff', bgSoft: '#f3e8ff', card: '#ffffff', text: '#1e1b4b', muted: '#6b7280', fontDisplay: 'Inter, system-ui, sans-serif' },
  },
  ecommerce: {
    headlines: [
      '{adj} products, delivered to your door',
      'Shop {name} — {adj} finds daily',
      'Your new favorite store is {adj}',
    ],
    subheadlines: [
      '{desc} — curated quality, honest prices, and shipping so fast you will double-check the tracking.',
      '{desc}. Free returns, always. Because shopping should feel good.',
    ],
    badge: ['Free shipping over $50', '30-day returns', 'New drops weekly'],
    features: [
      { icon: '🚚', title: 'Fast Free Shipping', description: 'Free 2-day shipping on orders over $50. Tracked door to door.' },
      { icon: '↩️', title: 'Easy Returns', description: '30 days, no questions, prepaid label in every box.' },
      { icon: '⭐', title: 'Curated Quality', description: 'Every product is tested by our team before it earns a listing.' },
      { icon: '💬', title: 'Real Human Support', description: 'Chat with a person in under 2 minutes, 7 days a week.' },
    ],
    featuresHeadline: 'Shopping, upgraded',
    stats: [
      { value: '50k+', label: 'Orders shipped' },
      { value: '4.8★', label: 'Store rating' },
      { value: '2 days', label: 'Avg. delivery' },
    ],
    testimonials: [
      { name: 'Emily R.', role: 'Verified buyer', quote: 'Ordered Monday, wearing it Wednesday. Quality exceeded the photos.' },
      { name: 'Marcus D.', role: 'Repeat customer', quote: 'My third order this month. The curation here is unmatched.' },
      { name: 'Aisha K.', role: 'Verified buyer', quote: 'Return was painless — refund hit before the box even arrived back.' },
    ],
    pricing: [
      { name: 'Insider', price: 'Free', features: ['Early access to drops', 'Birthday discount', 'Order tracking'], cta: 'Join free' },
      { name: 'Plus', price: '$9', features: ['Free shipping, no minimum', '10% off everything', 'Exclusive drops'], cta: 'Go Plus' },
      { name: 'VIP', price: '$29', features: ['Everything in Plus', '20% off everything', 'Personal shopper', 'Free express upgrades'], cta: 'Go VIP' },
    ],
    pricingModel: 'subscription',
    pricingSub: 'Memberships that pay for themselves. Cancel anytime.',
    ctaHeadline: ['Start shopping smarter', 'Your cart deserves {adj}'],
    footerTagline: ['Curated. Delivered. Loved.', 'Shop happy.'],
    palette: { primary: '#ea580c', primaryDark: '#9a3412', accent: '#84cc16', bg: '#fff7ed', bgSoft: '#ffedd5', card: '#ffffff', text: '#431407', muted: '#78716c', fontDisplay: 'Inter, system-ui, sans-serif' },
  },
  photography: {
    headlines: [
      '{adj} moments, kept forever',
      '{name}: photography with soul',
      'Your story deserves beautiful images',
    ],
    subheadlines: [
      '{desc} — candid, emotional photography with zero awkward posing.',
      '{desc}. We capture the moments you will want to relive forever.',
    ],
    badge: ['Booking 2026 dates', '500+ shoots delivered', 'Featured in 12 publications'],
    features: [
      { icon: '📸', title: 'Editorial Style', description: 'Magazine-quality images with a candid, documentary soul.' },
      { icon: '🎞️', title: 'Full Gallery', description: '300+ hand-edited photos delivered in a private online gallery.' },
      { icon: '🖼️', title: 'Fine Art Prints', description: 'Museum-grade prints and albums crafted to last generations.' },
      { icon: '✈️', title: 'Destination Ready', description: 'We travel worldwide — your adventure, our cameras.' },
    ],
    featuresHeadline: 'Photography with soul',
    stats: [
      { value: '500+', label: 'Shoots delivered' },
      { value: '40+', label: 'Countries traveled' },
      { value: '12', label: 'Editorial features' },
    ],
    testimonials: [
      { name: 'Rachel & Sam', role: 'Wedding 2025', quote: 'We forgot the cameras were there. The photos made us cry.' },
      { name: 'Daniel O.', role: 'Brand shoot', quote: 'Our campaign imagery tripled engagement. Unreal eye.' },
      { name: 'The Nguyen Family', role: 'Annual portraits', quote: 'Three years running. The albums are our most treasured possessions.' },
    ],
    pricing: [
      { name: 'Portrait', price: '$299', features: ['1-hour session', '50 edited photos', 'Online gallery'], cta: 'Book portrait' },
      { name: 'Event', price: '$899', features: ['Half-day coverage', '300 edited photos', 'Print release'], cta: 'Book event' },
      { name: 'Wedding', price: '$2,499', features: ['Full-day coverage', 'Two photographers', 'Fine art album'], cta: 'Check my date' },
    ],
    pricingModel: 'per-service',
    pricingSub: 'One honest price per session. No upsells, ever.',
    ctaHeadline: ['Let us tell your story', 'Dates fill fast — reserve yours'],
    footerTagline: ['Captured forever.', 'Light, emotion, art.'],
    palette: { primary: '#0f766e', primaryDark: '#134e4a', accent: '#f59e0b', bg: '#f0fdfa', bgSoft: '#ccfbf1', card: '#ffffff', text: '#134e4a', muted: '#64748b', fontDisplay: 'Georgia, serif' },
  },
  consulting: {
    headlines: [
      '{adj} strategy for real growth',
      '{name}: clarity that drives {adj} results',
      'Stop guessing. Start growing — the {adj} way.',
    ],
    subheadlines: [
      '{desc} — senior consultants who have done it before, not juniors learning on your budget.',
      '{desc}. We embed with your team and leave you stronger than we found you.',
    ],
    badge: ['Free discovery call', 'Senior-only team', 'ROI in 90 days'],
    features: [
      { icon: '🎯', title: 'Strategy Sprints', description: 'Two-week deep dives that end with an actionable roadmap, not a deck.' },
      { icon: '📈', title: 'Growth Systems', description: 'Repeatable playbooks for acquisition, retention and revenue.' },
      { icon: '👥', title: 'Team Enablement', description: 'We train your people so the wins continue after we leave.' },
      { icon: '🔍', title: 'Honest Audits', description: 'Brutally honest assessments of what is broken — and how to fix it.' },
    ],
    featuresHeadline: 'Consulting that actually consults',
    stats: [
      { value: '3.2x', label: 'Avg. ROI' },
      { value: '180+', label: 'Engagements' },
      { value: '92%', label: 'Repeat clients' },
    ],
    testimonials: [
      { name: 'Jonathan Pierce', role: 'CEO, Hartwell & Co', quote: 'They found $2M in waste in three weeks. Paid for themselves 40 times over.' },
      { name: 'Dr. Amara O.', role: 'Founder, Medilink', quote: 'Finally, consultants who execute instead of theorizing.' },
      { name: 'Lisa Chang', role: 'COO, Brightline', quote: 'Our team still runs their playbooks two years later.' },
    ],
    pricing: [
      { name: 'Audit', price: '$2,500', features: ['2-week assessment', 'Findings report', 'Roadmap session'], cta: 'Start audit' },
      { name: 'Sprint', price: '$8,000', features: ['6-week engagement', 'Embedded consultant', 'Playbook delivery'], cta: 'Book sprint' },
      { name: 'Partner', price: 'Custom', features: ['Quarterly retainer', 'On-call advisors', 'Board-level reporting'], cta: 'Become partner' },
    ],
    pricingModel: 'per-service',
    pricingSub: 'Fixed-scope pricing. You know the cost before we start.',
    ctaHeadline: ['Let us find your leverage', 'One call. {adj} clarity.'],
    footerTagline: ['Strategy, executed.', 'Growth is a system.'],
    palette: { primary: '#334155', primaryDark: '#0f172a', accent: '#0ea5e9', bg: '#f8fafc', bgSoft: '#e2e8f0', card: '#ffffff', text: '#0f172a', muted: '#64748b', fontDisplay: 'Georgia, serif' },
  },
};

// verbs for saas headline {verb}
const SAAS_VERBS = ['automate work', 'close deals', 'ship product', 'grow revenue', 'delight customers'];

function fill(template: string, name: string, adj: string, desc: string, rnd: () => number): string {
  // NOTE: {name} is ALWAYS used literally — never modified, conjugated, or altered.
  // Templates are written to be grammatically correct without post-processing.
  return template
    .replaceAll('{name}', name)
    .replaceAll('{adj}', adj)
    .replaceAll('{desc}', desc.length > 120 ? desc.slice(0, 117) + '...' : desc)
    .replaceAll('{verb}', pick(rnd, SAAS_VERBS));
}

function initials(name: string): string {
  return name.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

export function generateLanding(input: LandingInput, seed?: number): LandingData {
  const rnd = mulberry32(seed ?? Math.floor(Math.random() * 1e9));
  const bank = BANKS[input.industry];
  const tone = TONE_WORDS[input.tone];
  const name = input.businessName.trim() || 'Your Business';
  const desc = input.description.trim() || 'an amazing experience';
  const adj = pick(rnd, tone.adj);

  const features = [...bank.features].sort(() => rnd() - 0.5).slice(0, 4);
  const testimonials = [...bank.testimonials].sort(() => rnd() - 0.5).slice(0, 3)
    .map(t => ({ ...t, initials: initials(t.name) }));
  const tiers = bank.pricing.map((p, i) => ({
    ...p,
    price: p.price,
    period: (p.price === 'Free' || p.price === 'Custom' || bank.pricingModel === 'per-service') ? '' : '/mo',
    highlighted: i === 1,
  }));

  return {
    hero: {
      badge: pick(rnd, bank.badge),
      headline: fill(pick(rnd, bank.headlines), name, adj, desc, rnd),
      subheadline: fill(pick(rnd, bank.subheadlines), name, adj, desc, rnd),
      ctaPrimary: pick(rnd, tone.cta),
      ctaSecondary: 'Learn more',
    },
    stats: bank.stats,
    features,
    featuresHeadline: bank.featuresHeadline,
    featuresSub: `${tone.trust[Math.floor(rnd() * tone.trust.length)]} · ${name}`,
    testimonials,
    pricing: tiers,
    pricingSub: bank.pricingSub,
    cta: {
      headline: fill(pick(rnd, bank.ctaHeadline), name, adj, desc, rnd),
      subheadline: `Join thousands who chose ${name}. ${pick(rnd, tone.trust)}.`,
      button: pick(rnd, tone.cta),
    },
    footerTagline: pick(rnd, bank.footerTagline),
    theme: bank.palette,
  };
}

// ---------- standalone HTML export ----------
export function landingToHTML(input: LandingInput, data: LandingData): string {
  const t = data.theme;
  const esc = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(input.businessName)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:${t.fontDisplay};background:${t.bg};color:${t.text};line-height:1.6}
.wrap{max-width:1100px;margin:0 auto;padding:0 24px}
nav{display:flex;justify-content:space-between;align-items:center;padding:20px 0}
.logo{font-size:24px;font-weight:800;color:${t.primary}}
.btn{display:inline-block;background:${t.primary};color:#fff;padding:14px 32px;border-radius:999px;text-decoration:none;font-weight:700;transition:transform .2s}
.btn:hover{transform:translateY(-2px);background:${t.primaryDark}}
.btn-ghost{background:transparent;color:${t.primary};border:2px solid ${t.primary}}
.hero{text-align:center;padding:80px 0 60px}
.badge{display:inline-block;background:${t.bgSoft};color:${t.primaryDark};padding:8px 20px;border-radius:999px;font-size:14px;font-weight:600;margin-bottom:24px}
h1{font-size:clamp(2.2rem,5vw,3.8rem);line-height:1.15;margin-bottom:20px}
.sub{font-size:1.2rem;color:${t.muted};max-width:640px;margin:0 auto 36px}
.cta-row{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
.stats{display:flex;justify-content:center;gap:48px;padding:40px 0;flex-wrap:wrap}
.stat{text-align:center}.stat b{font-size:2rem;color:${t.primary};display:block}.stat span{color:${t.muted};font-size:.9rem}
section{padding:70px 0}
h2{text-align:center;font-size:2.2rem;margin-bottom:12px}
.sec-sub{text-align:center;color:${t.muted};margin-bottom:48px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px}
.card{background:${t.card};border-radius:20px;padding:32px;box-shadow:0 10px 40px rgba(0,0,0,.08)}
.card .icon{font-size:2.4rem;margin-bottom:16px}
.card h3{margin-bottom:10px;font-size:1.2rem}
.card p{color:${t.muted};font-size:.95rem}
.testi{font-style:italic;margin-bottom:16px}
.who{display:flex;align-items:center;gap:12px}
.avatar{width:44px;height:44px;border-radius:50%;background:${t.primary};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700}
.who b{display:block;font-style:normal}.who span{color:${t.muted};font-size:.85rem;font-style:normal}
.price-card{border:2px solid ${t.bgSoft};text-align:center;position:relative}
.price-card.hl{border-color:${t.primary};transform:scale(1.04)}
.price{font-size:2.6rem;font-weight:800;color:${t.primary};margin:12px 0}
.feat-list{list-style:none;text-align:left;margin:20px 0}
.feat-list li{padding:8px 0;color:${t.muted}}.feat-list li:before{content:"✓ ";color:${t.primary};font-weight:700}
.cta-final{background:${t.primary};color:#fff;border-radius:28px;text-align:center;padding:70px 30px;margin:40px 0}
.cta-final h2{color:#fff}.cta-final p{opacity:.85;margin:16px 0 32px}
.cta-final .btn{background:#fff;color:${t.primary}}
footer{text-align:center;padding:40px 0;color:${t.muted};font-size:.9rem}
</style>
</head>
<body>
<div class="wrap">
<nav><div class="logo">${esc(input.businessName)}</div><a class="btn" href="#">${esc(data.hero.ctaPrimary)}</a></nav>
<div class="hero">
<div class="badge">${esc(data.hero.badge)}</div>
<h1>${esc(data.hero.headline)}</h1>
<p class="sub">${esc(data.hero.subheadline)}</p>
<div class="cta-row"><a class="btn" href="#">${esc(data.hero.ctaPrimary)}</a><a class="btn btn-ghost" href="#">${esc(data.hero.ctaSecondary)}</a></div>
</div>
<div class="stats">${data.stats.map(s => `<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join('')}</div>
<section><h2>${esc(data.featuresHeadline)}</h2><p class="sec-sub">${esc(data.featuresSub)}</p>
<div class="grid">${data.features.map(f => `<div class="card"><div class="icon">${f.icon}</div><h3>${esc(f.title)}</h3><p>${esc(f.description)}</p></div>`).join('')}</div></section>
<section><h2>Loved by our customers</h2><p class="sec-sub">Real stories, real results</p>
<div class="grid">${data.testimonials.map(x => `<div class="card"><p class="testi">"${esc(x.quote)}"</p><div class="who"><div class="avatar">${x.initials}</div><div><b>${esc(x.name)}</b><span>${esc(x.role)}</span></div></div></div>`).join('')}</div></section>
<section><h2>Simple, honest pricing</h2><p class="sec-sub">${esc(data.pricingSub)}</p>
<div class="grid">${data.pricing.map(p => `<div class="card price-card${p.highlighted ? ' hl' : ''}"><h3>${esc(p.name)}</h3><div class="price">${esc(p.price)}<span style="font-size:1rem;color:${t.muted}">${esc(p.period)}</span></div><ul class="feat-list">${p.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul><a class="btn" href="#">${esc(p.cta)}</a></div>`).join('')}</div></section>
<div class="cta-final"><h2>${esc(data.cta.headline)}</h2><p>${esc(data.cta.subheadline)}</p><a class="btn" href="#">${esc(data.cta.button)}</a></div>
<footer><div class="logo" style="margin-bottom:8px">${esc(input.businessName)}</div><p>${esc(data.footerTagline)}</p><p style="margin-top:12px">© 2026 ${esc(input.businessName)}. All rights reserved.</p></footer>
</div>
</body>
</html>`;
}
