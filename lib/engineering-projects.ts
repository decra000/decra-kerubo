export type EngineeringProject = {
  slug?: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  /** A project can live under more than one tab (e.g. both "research" and "ai"). */
  categories: string[];
  /** Full-width hero treatment at the top of the Engineering grid. */
  featured?: boolean;
  /** Longer copy shown only on the project's own detail page. */
  detail?: string;
  techStack?: string[];
  /** e.g. "Bevisioneers × Mercedes-Benz Fellowship" */
  fellowship?: string;
  chromeUrl?: string;
  repoUrl?: string;
  /** Slug of another project this one is directly tied to (shown as "Related work"). */
  relatedSlug?: string;
  /** Short label for the pairing badge, e.g. "Backed by research" or "Powers a shipped tool". Only shown when relatedSlug is set. */
  pairLabel?: string;
  /**
   * Slug into lib/papers.ts's PAPERS array. When set, this card's "View
   * project" action (and its whole card, for non-featured grid items) opens
   * the real protected paper viewer instead of this project's own detail
   * page — the paper is the single source of truth, not a synthesized copy.
   */
  paperSlug?: string;
};

export const engineeringProjects: EngineeringProject[] = [
  // AI Projects
  {
    categories: ["ai"],
    title: "Legal Chatbot",
    subtitle: "For Entrepreneurs",
    description: "Helps entrepreneurs make the right early stage business legal decisions.",
    image: "/engineering/updatedteresya.png",
  },
  {
    categories: ["ai"],
    slug: "ai-footprint-tracker",
    featured: true,
    title: "AI Footprint Tracker",
    subtitle: "Chrome Extension · AI Decarbonization",
    description:
      "Tracks your Claude, ChatGPT, and Gemini usage in the browser and estimates the energy, water, and carbon footprint of every inference — so you can use AI more responsibly.",
    detail:
      "AI Footprint Tracker is a Manifest V3 Chrome extension that watches your Claude, ChatGPT, and Gemini conversations as you use them and estimates the energy (Wh), water (mL), and carbon (g CO2e) cost of each inference, scaled from the few public per-query figures vendors have disclosed. Every estimate carries an explicit confidence tag — measured, medium, or low — so the numbers are never presented as more precise than they are. Usage syncs to a Supabase project protected by row-level security, with a companion dashboard for tracking trends over time by product. It's the applied, shipped counterpart to my \"Democratization and Decarbonization of AI Solutions\" research below: that paper argues most people have no visibility into what a single AI prompt actually costs the grid, and this extension makes that cost visible in real time.",
    techStack: ["Chrome Extension (MV3)", "JavaScript", "Supabase", "Next.js", "Row-Level Security"],
    fellowship: "Bevisioneers × Mercedes-Benz Fellowship",
    relatedSlug: "ai-decarbonization-research",
    pairLabel: "Backed by research",
    image: "/engineering/chrome.png",
  },
  {
    categories: ["ai"],
    slug: "cybersecurity-detection-tool",
    featured: true,
    title: "Cybersecurity Detection Tool",
    subtitle: "Chrome Extension · For Entrepreneurs",
    description: "A Chrome extension that assists users to flag harmful sites and analyze the safety of text.",
    detail:
      "A Chrome extension that assists users in flagging harmful sites and analyzing the safety of text in real time as they browse. It's the applied counterpart to my \"Harnessing Online Users' Safety Using AI\" research below, which establishes the effectiveness of current social media regulation measures and proposes the real-time detection strategy this extension implements.",
    relatedSlug: "online-safety-research",
    pairLabel: "Backed by research",
    image: "/engineering/pure.png",
  },
  {
    categories: ["research", "ai"],
    slug: "ai-decarbonization-research",
    paperSlug: "democratization-decarbonization-ai",
    featured: true,
    title: "Democratization and Decarbonization of AI Solutions",
    subtitle: "AI, Green-tech, Decarbonization",
    description: "Addresses two crucial challenges: the failure of many AI solutions to reach their intended users due to poor accessibility, and the environmental toll of AI development. Advocates for greener AI and explores edge computing as a key solution.",
    fellowship: "Bevisioneers × Mercedes-Benz Fellowship",
    relatedSlug: "ai-footprint-tracker",
    pairLabel: "Powers a shipped tool",
    image: "/engineering/ai.png",
  },
  {
    categories: ["ai"],
    title: "Metal Detection Tool",
    subtitle: "For Entrepreneurs",
    description: "A web app that helps identify defect types on metals.",
    image: "/engineering/DEFECTS.png",
  },
  {
    categories: ["ai"],
    title: "Business Structuring AI Tool",
    subtitle: "For Entrepreneurs",
    description: "Helps entrepreneurs find the right corporate structure for their business.",
    image: "/engineering/business.png",
  },

  // Apps
  {
    categories: ["apps"],
    title: "FinTech App",
    subtitle: "Mobile App",
    description: "Financial transactions app for customized cross-country transfers.",
    image: "/engineering/finmate.png",
  },
  {
    categories: ["apps"],
    title: "Dietary App",
    subtitle: "Web App",
    description: "A dietary tracking app.",
    image: "/engineering/Ba.png",
  },
  {
    categories: ["apps"],
    title: "Process Optimization with TSP",
    subtitle: "Web App",
    description: "A process optimization decision app built with the Traveling Salesman Problem technique.",
    image: "/engineering/tsp.png",
  },

  // Websites
  {
    categories: ["websites"],
    title: "Fashion E-commerce Site",
    subtitle: "Online Store",
    description: "A modern e-commerce website for selling fashion items.",
    image: "/engineering/fashion.png",
  },

  // Research & Writing
  // Note: "Democratization and Decarbonization of AI Solutions" is cross-listed
  // here under Research & Writing too (see categories above) — it's featured
  // and lives in the AI Projects block since it pairs directly with the AI
  // Footprint Tracker extension.
  {
    categories: ["research", "ai"],
    slug: "online-safety-research",
    paperSlug: "ai-enabled-regulation",
    title: "Harnessing Online Users' Safety Using AI",
    subtitle: "AI, NLP, Real-time Detection",
    description: "Leverages AI to establish the effectiveness of current social media regulation measures and proposes real-time detection strategies, culminating in a Chrome extension for controlling information flow on social media.",
    relatedSlug: "cybersecurity-detection-tool",
    pairLabel: "Powers a shipped tool",
    image: "/engineering/pure.png",
  },
  {
    categories: ["research"],
    paperSlug: "cross-border-data-transfer",
    title: "Analyzing Inefficiencies in Current Cross-Border Data Transfer Laws",
    subtitle: "Legal Frameworks, Data Protection",
    description: "Examines the legal framework governing cross-border data transfers, focusing on key regulations like the GDPR, and proposes recommendations for improving legal efficiencies.",
    image: "/engineering/data.png",
  },
  {
    categories: ["research"],
    paperSlug: "unbiased-hiring-algorithms",
    title: "Unbiased Hiring Algorithms",
    subtitle: "AI, Advanced Algorithms",
    description: "Develops a tool that addresses discriminatory elements in AI hiring processes while maintaining efficiency, for a more equitable and compliant hiring process.",
    image: "/engineering/hiring.png",
  },
];
