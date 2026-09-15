export type EngineeringProject = {
  slug?: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  /** A project can live under more than one tab (e.g. both "research" and "ai"). */
  categories: string[];
  /** Longer copy shown only on the project's own detail page. */
  detail?: string;
  techStack?: string[];
  /** e.g. "Bevisioneers × Mercedes-Benz Fellowship" */
  fellowship?: string;
  /** Chrome Web Store listing — set once the extension is actually published there. */
  chromeUrl?: string;
  /**
   * Direct .zip download (e.g. /downloads/<slug>.zip) for extensions not yet
   * on the Web Store. Renders a "Download Extension" CTA plus a short
   * "how to install" (Developer Mode / Load unpacked) block on the detail
   * page — a real, if less polished, path to trying the extension today.
   */
  downloadUrl?: string;
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

/**
 * Selected work only: the AI Footprint Tracker, the Cyberbullying Detection
 * Tool, the Legal Chatbot, the cross-border data transfer paper, and the
 * unbiased hiring algorithms paper. The two paired-research entries
 * (ai-decarbonization-research, online-safety-research) stay in the array
 * because /engineering/[slug] still needs them to build each tool's combined
 * research+product page, they just don't get a row of their own in the
 * /engineering list.
 */
export const engineeringProjects: EngineeringProject[] = [
  {
    categories: ["ai"],
    slug: "ai-footprint-tracker",
    title: "AI Footprint Tracker",
    subtitle: "Chrome Extension · AI Decarbonization",
    description:
      "Tracks your Claude, ChatGPT, and Gemini usage in the browser and estimates the energy, water, and carbon footprint of every inference, so you can use AI more responsibly.",
    detail:
      "AI Footprint Tracker is a Manifest V3 Chrome extension that watches your Claude, ChatGPT, and Gemini conversations as you use them and estimates the energy (Wh), water (mL), and carbon (g CO2e) cost of each inference, scaled from the few public per-query figures vendors have disclosed. Every estimate carries an explicit confidence tag, measured, medium, or low, so the numbers are never presented as more precise than they are. Usage syncs to a Supabase project protected by row-level security, with a companion dashboard for tracking trends over time by product. It's the applied, shipped counterpart to my \"Democratization and Decarbonization of AI Solutions\" research below: that paper argues most people have no visibility into what a single AI prompt actually costs the grid, and this extension makes that cost visible in real time.",
    techStack: ["Chrome Extension (MV3)", "JavaScript", "Supabase", "Next.js", "Row-Level Security"],
    fellowship: "Bevisioneers × Mercedes-Benz Fellowship",
    relatedSlug: "ai-decarbonization-research",
    pairLabel: "Backed by research",
    downloadUrl: "/downloads/ai-footprint-tracker.zip",
    image: "/engineering/ai-footprint-dashboard.png",
  },
  {
    categories: ["research", "ai"],
    slug: "ai-decarbonization-research",
    paperSlug: "democratization-decarbonization-ai",
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
    slug: "cyberbullying-detection-tool",
    title: "Cyberbullying Detection Tool",
    subtitle: "Chrome Extension · For Entrepreneurs",
    description: "A Chrome extension that detects cyberbullying and flags harmful content in real time as you browse.",
    detail:
      "A Chrome extension that detects cyberbullying and flags harmful content in real time as people browse social media, inspecting page text and highlighting offensive or unsafe material as it's found. It's the applied counterpart to my published paper, \"Cyberbullying Detection: An Integrated Natural Language Processing and Machine Learning Approach for Cybersafety,\" below.",
    relatedSlug: "online-safety-research",
    pairLabel: "Backed by research",
    image: "/engineering/pure.png",
  },
  {
    categories: ["research", "ai"],
    slug: "online-safety-research",
    paperSlug: "ai-enabled-regulation",
    title: "Cyberbullying Detection: An Integrated Natural Language Processing and Machine Learning Approach for Cybersafety",
    subtitle: "AI, NLP, Real-time Detection",
    description: "Leverages AI to establish the effectiveness of current social media regulation measures and proposes real-time detection strategies, culminating in a Chrome extension for controlling information flow on social media.",
    relatedSlug: "cyberbullying-detection-tool",
    pairLabel: "Powers a shipped tool",
    image: "/engineering/pure.png",
  },
  {
    categories: ["ai"],
    slug: "legal-chatbot",
    title: "Legal Chatbot",
    subtitle: "AI Chatbot · For Entrepreneurs",
    description: "Helps entrepreneurs make the right early stage business legal decisions.",
    detail:
      "An AI chatbot that guides entrepreneurs through early-stage business legal decisions, the questions founders face before they can afford counsel: what structure to incorporate under, what agreements they need in place, and which regulatory obligations apply to what they're building. It turns those first legal calls from guesswork into a guided conversation.",
    image: "/engineering/updatedteresya.png",
  },
  {
    categories: ["research"],
    slug: "cross-border-data-transfer",
    paperSlug: "cross-border-data-transfer",
    title: "Analyzing Inefficiencies in Current Cross-Border Data Transfer Laws",
    subtitle: "Legal Frameworks, Data Protection",
    description: "Examines the legal framework governing cross-border data transfers, focusing on key regulations like the GDPR, and proposes recommendations for improving legal efficiencies.",
    image: "/engineering/data.png",
  },
  {
    categories: ["research"],
    slug: "unbiased-hiring-algorithms",
    paperSlug: "unbiased-hiring-algorithms",
    title: "Unbiased Hiring Algorithms",
    subtitle: "AI, Advanced Algorithms",
    description: "Develops a tool that addresses discriminatory elements in AI hiring processes while maintaining efficiency, for a more equitable and compliant hiring process.",
    image: "/engineering/hiring.png",
  },
];
