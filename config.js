/**
 * ============================================================
 *  CHAKKI & CO. — WEBSITE CONFIGURATION
 * ============================================================
 *  Edit this file to change ALL content, branding, colors,
 *  pricing, images, and links across the entire website.
 *  No need to touch HTML, CSS, or JS files.
 * ============================================================
 */

const SITE_CONFIG = {

  // ──────────────────────────────────────────────
  //  TRACKING PIXELS (Facebook, Google Analytics, etc.)
  //  Set the IDs to enable. Leave empty "" to disable.
  // ──────────────────────────────────────────────
  tracking: {
    facebookPixelId: "",          // e.g. "123456789012345"
    googleAnalyticsId: "G-5RQK838BGZ",
    googleTagManagerId: "",       // e.g. "GTM-XXXXXXX"
    hotjarId: "",                 // e.g. "1234567"
    customHeadScript: "",         // raw <script> HTML to inject in <head>
  },

  // ──────────────────────────────────────────────
  //  BRAND
  // ──────────────────────────────────────────────
  brand: {
    name: "CHAKKI & CO.",
    logoIcon: "⚙",
    tagline: "Fresh Atta On Demand",
    description: "Order fresh wheat and multigrain flour ground on demand from machines installed near your society. Custom blends, subscriptions, and doorstep delivery.",
    year: 2026,
    madeIn: "Made with 🌾 in India",
  },

  // ──────────────────────────────────────────────
  //  COLORS (change these to re-theme the site)
  // ──────────────────────────────────────────────
  colors: {
    primary: "#1B6B5C",
    primaryDark: "#0F4A40",
    primaryLight: "#E8F2F0",
    accent: "#D4A84B",
    accentDark: "#B8923A",
    accentLight: "#FDF6E8",
    surface: "#F7F5F2",
    surfaceWhite: "#FFFFFF",
    text: "#1A1A1A",
    textSecondary: "#5A5A5A",
    textMuted: "#8A8A8A",
    border: "#E8E5E1",
    success: "#2E7D32",
    error: "#C5392B",
  },

  // ──────────────────────────────────────────────
  //  FONTS
  // ──────────────────────────────────────────────
  font: {
    family: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap",
  },

  // ──────────────────────────────────────────────
  //  IMAGES (use URLs or local paths in /images/)
  // ──────────────────────────────────────────────
  images: {
    heroBackground: "",       // leave empty for default gradient
    ogImage: "",              // Open Graph social preview image
    favicon: "",              // favicon URL
  },

  // ──────────────────────────────────────────────
  //  HERO SECTION
  // ──────────────────────────────────────────────
  hero: {
    badge: "🌾 India's Fresh Flour Revolution",
    titleLine1: "Fresh Atta,",
    titleLine2: "On Demand.",
    subtitle: "Custom wheat & multigrain flour, ground fresh from machines installed right in your society. No preservatives. No chemicals. Just pure, fresh atta delivered to your doorstep.",
    ctaPrimary: { text: "Get the App", link: "#download" },
    ctaSecondary: { text: "See How It Works", link: "#how-it-works" },
    floatingEmojis: ["🌾", "⚙", "📦"],
    stats: [
      { value: "100%", label: "Natural & Chemical Free" },
      { value: "2km", label: "Hyper-Local Delivery" },
      { value: "200kg", label: "Daily Capacity / Machine" },
    ],
  },

  // ──────────────────────────────────────────────
  //  PHONE MOCKUP (hero & download sections)
  // ──────────────────────────────────────────────
  phoneMockup: {
    greeting: "Good Morning! 👋",
    products: [
      { icon: "🌾", name: "Fresh Wheat Atta", detail: "₹45/kg · Ground fresh" },
      { icon: "🫘", name: "Multigrain Blend", detail: "₹50/kg · Custom ratios" },
    ],
    orderButton: "Order Now",
    trackingOrder: {
      name: "Multigrain Blend · 5 kg",
      detail: "Wheat 60% · Ragi 20% · Bajra 20%",
    },
  },

  // ──────────────────────────────────────────────
  //  SOCIAL PROOF
  // ──────────────────────────────────────────────
  socialProof: {
    headline: "Trusted by families across residential societies",
    items: [
      { icon: "🏘️", text: "50+ Societies" },
      { icon: "👨‍👩‍👧‍👦", text: "10,000+ Families" },
      { icon: "⭐", text: "4.8 App Rating" },
      { icon: "🌾", text: "50,000+ kg Ground" },
    ],
  },

  // ──────────────────────────────────────────────
  //  HOW IT WORKS
  // ──────────────────────────────────────────────
  howItWorks: {
    tag: "Simple & Fresh",
    title: "How It Works",
    description: "From grain to your kitchen in just a few taps. Fresh flour, ground only when you order.",
    steps: [
      { icon: "📍", title: "Select Your Society", desc: "Find the nearest Chakki & Co. grinding station within your residential society." },
      { icon: "🌾", title: "Choose Your Grain", desc: "Pick single wheat atta or create a custom multigrain blend with your preferred ratios." },
      { icon: "⚙", title: "Ground Fresh", desc: "Your flour is ground on-demand at the society machine. No stock, no stale atta — always fresh." },
      { icon: "🚪", title: "Pickup or Delivery", desc: "Collect from the station or get it delivered to your doorstep. Track your order in real-time." },
    ],
  },

  // ──────────────────────────────────────────────
  //  FEATURES
  // ──────────────────────────────────────────────
  features: {
    tag: "Why Chakki & Co.",
    title: "Fresh. Natural. Convenient.",
    description: "We're bringing back the tradition of fresh-ground flour with the convenience of modern technology.",
    items: [
      { icon: "⚙", title: "Ground When You Order", desc: "No pre-packaged flour. Your atta is milled fresh only when you place an order — preserving nutrition and taste." },
      { icon: "🧪", title: "100% Chemical Free", desc: "No preservatives, no bleaching, no additives. Just pure, natural grain ground into wholesome flour." },
      { icon: "🎛️", title: "Custom Multigrain Blends", desc: "Mix wheat, ragi, bajra, jowar, and more in your own ratio. Create the perfect blend for your family's health." },
      { icon: "📅", title: "Subscribe & Save 5%", desc: "Set up weekly or monthly deliveries with auto-repeat orders. Pause or skip anytime. Save 5% on every order." },
      { icon: "📱", title: "Real-Time Tracking", desc: "Track your order from grinding to delivery. Know exactly when your fresh flour will be ready." },
      { icon: "💳", title: "Easy Payments", desc: "Pay via UPI, cards, wallets, or cash on delivery. Secure payments powered by Razorpay." },
    ],
  },

  // ──────────────────────────────────────────────
  //  PRICING
  // ──────────────────────────────────────────────
  pricing: {
    tag: "Transparent Pricing",
    title: "Simple, Honest Pricing",
    description: "No hidden fees. Pay only for what you grind.",
    note: "Doorstep delivery available at +₹20 per order. Pickup from your society station is always free.",
    currency: "₹",
    plans: [
      {
        name: "Wheat Atta",
        desc: "Single grain, fresh ground",
        price: "₹45",
        unit: "/kg",
        featured: false,
        badge: "",
        buttonText: "Order Now",
        buttonStyle: "primary",
        features: [
          "Ground fresh on order",
          "100% pure wheat",
          "Pickup from society",
          "Min. order: 1 kg",
        ],
      },
      {
        name: "Multigrain Blend",
        desc: "Custom mix, your ratios",
        price: "₹50",
        unit: "/kg",
        featured: true,
        badge: "Most Popular",
        buttonText: "Order Now",
        buttonStyle: "accent",
        features: [
          "Everything in Wheat Atta",
          "Mix up to 5 grains",
          "Custom blend ratios",
          "Health-optimized options",
        ],
      },
      {
        name: "Subscription",
        desc: "Weekly or monthly auto-repeat",
        price: "5%",
        unit: "off",
        featured: false,
        badge: "",
        buttonText: "Subscribe",
        buttonStyle: "primary",
        features: [
          "Any grain or blend",
          "Pause or skip anytime",
          "Auto-repeat orders",
          "Priority grinding slot",
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  //  FOR SOCIETIES
  // ──────────────────────────────────────────────
  societies: {
    tag: "For Residential Societies",
    title: "Bring Fresh Flour to Your Society",
    description: "Partner with Chakki & Co. to install a grinding station in your residential complex. Give your residents access to fresh, chemical-free flour — ground right at their doorstep.",
    ctaText: "Partner With Us",
    benefits: [
      { icon: "🏗️", title: "Zero Investment", desc: "We install and maintain the grinding machine at no cost to the society." },
      { icon: "👷", title: "Dedicated Operator", desc: "A trained operator manages the machine and fulfils all orders." },
      { icon: "📊", title: "200 kg/day Capacity", desc: "Each machine handles up to 200 kg daily, serving hundreds of families." },
      { icon: "🤝", title: "Revenue Sharing", desc: "Societies earn a share from every order placed by their residents." },
    ],
    stats: [
      { icon: "🏘️", number: "50+", label: "Active Societies" },
      { icon: "⚙", number: "60+", label: "Grinding Machines" },
      { icon: "👷", number: "75+", label: "Trained Operators" },
      { icon: "📍", number: "10+", label: "Cities" },
    ],
  },

  // ──────────────────────────────────────────────
  //  TESTIMONIALS
  // ──────────────────────────────────────────────
  testimonials: {
    tag: "What People Say",
    title: "Loved by Families",
    items: [
      {
        stars: 5,
        quote: "The rotis taste so much better with freshly ground atta. My family noticed the difference from day one. We've completely stopped buying packaged flour.",
        name: "Priya Sharma",
        role: "Resident, Green Valley Society",
      },
      {
        stars: 5,
        quote: "The multigrain blend option is fantastic. I can customize the ratio of wheat, ragi, and bajra for my diabetic father. It's been a health game-changer.",
        name: "Rajesh Patel",
        role: "Resident, Sunrise Apartments",
      },
      {
        stars: 5,
        quote: "As a society manager, the partnership was seamless. Chakki & Co. handles everything — installation, operations, and maintenance. Our residents love it.",
        name: "Amit Gupta",
        role: "Secretary, Palm Heights RWA",
      },
    ],
  },

  // ──────────────────────────────────────────────
  //  DOWNLOAD / APP
  // ──────────────────────────────────────────────
  download: {
    title: "Get Fresh Atta<br/>In Minutes",
    description: "Download the Chakki & Co. app and start ordering fresh, chemical-free flour from your society's grinding station. Available on Android and iOS.",
    playStoreUrl: "#",
    appStoreUrl: "#",
    showQR: true,
  },

  // ──────────────────────────────────────────────
  //  CONTACT
  // ──────────────────────────────────────────────
  contact: {
    tag: "Get In Touch",
    title: "Let's Talk",
    description: "Whether you want to bring Chakki & Co. to your society, become an operator, or just have a question — we'd love to hear from you.",
    email: "hello@chakki.co",
    phone: "+91 98XXX XXXXX",
    location: "India",
    formSubjects: [
      { value: "society", label: "Bringing Chakki & Co. to my society" },
      { value: "operator", label: "Becoming an operator" },
      { value: "bulk", label: "Bulk / B2B orders" },
      { value: "franchise", label: "Franchise opportunity" },
      { value: "other", label: "Something else" },
    ],
  },

  // ──────────────────────────────────────────────
  //  SOCIAL LINKS
  // ──────────────────────────────────────────────
  social: {
    instagram: "#",
    twitter: "#",
    facebook: "#",
  },

  // ──────────────────────────────────────────────
  //  NAVIGATION LINKS
  // ──────────────────────────────────────────────
  nav: {
    links: [
      { text: "How It Works", href: "#how-it-works" },
      { text: "Features", href: "#features" },
      { text: "Pricing", href: "#pricing" },
      { text: "For Societies", href: "#societies" },
      { text: "Contact", href: "#contact" },
    ],
    ctaText: "Download App",
    ctaHref: "#download",
  },

  // ──────────────────────────────────────────────
  //  FOOTER LINK COLUMNS
  // ──────────────────────────────────────────────
  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { text: "How It Works", href: "#how-it-works" },
          { text: "Features", href: "#features" },
          { text: "Pricing", href: "#pricing" },
          { text: "Download App", href: "#download" },
        ],
      },
      {
        title: "Company",
        links: [
          { text: "About Us", href: "#" },
          { text: "For Societies", href: "#societies" },
          { text: "Careers", href: "#" },
          { text: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { text: "Terms of Service", href: "#" },
          { text: "Privacy Policy", href: "privacy.html" },
          { text: "Refund Policy", href: "#" },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  //  ORDER TRACKING STEPS (phone mockup)
  // ──────────────────────────────────────────────
  trackingSteps: [
    { label: "Order Received", status: "done" },
    { label: "Grinding Started", status: "active" },
    { label: "Packing", status: "" },
    { label: "Out for Delivery", status: "" },
    { label: "Delivered", status: "" },
  ],
};
