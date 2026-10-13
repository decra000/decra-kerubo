export const ATPRC_DIVISIONS = [
  { id: "architecture", label: "Product architecture & system design", blurb: "How the product is built, and whether it will hold as it grows." },
  { id: "ai-risk", label: "AI and technology risk", blurb: "Model behaviour, misuse, reliance and accountability in AI-enabled features." },
  { id: "data-protection", label: "Data protection", blurb: "What personal data you collect, why, where it goes and how it is handled." },
  { id: "compliance", label: "Regulatory & industry compliance questions", blurb: "Which rules apply to your product and sector, and what they ask of you." },
  { id: "early-stage", label: "Early-stage product decisions", blurb: "Choices made before launch that are expensive to reverse later." },
] as const;

export const ATPRC_STAGES = ["Idea / pre-build", "Building an MVP", "Launched, early users", "Growing / scaling"] as const;
