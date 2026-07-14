import type { Metadata } from "next";
import { EngineeringGrid, type EngineeringProject } from "@/components/engineering/EngineeringGrid";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "Selected engineering builds from Decra Kerubo, AI tools, apps, websites, and applied research at the intersection of technology and law.",
  alternates: { canonical: "https://decrakerubo.com/engineering" },
};

const projects: EngineeringProject[] = [
  // AI Projects
  {
    category: "ai",
    title: "Legal Chatbot",
    subtitle: "For Entrepreneurs",
    description: "Helps entrepreneurs make the right early stage business legal decisions.",
    image: "/engineering/updatedteresya.png",
  },
  {
    category: "ai",
    title: "Inference Tracking Tool",
    subtitle: "For Entrepreneurs",
    description: "A Chrome extension to track a user's inferences and estimate their carbon footprint and energy consumption.",
    image: "/engineering/chrome.png",
    research: "Democratization and Decarbonization of AI Solutions",
  },
  {
    category: "ai",
    title: "Cybersecurity Detection Tool",
    subtitle: "For Entrepreneurs",
    description: "A Chrome extension that assists users to flag harmful sites and analyze the safety of text.",
    image: "/engineering/pure.png",
    research: "Harnessing Online Users' Safety Using AI",
  },
  {
    category: "ai",
    title: "Metal Detection Tool",
    subtitle: "For Entrepreneurs",
    description: "A web app that helps identify defect types on metals.",
    image: "/engineering/DEFECTS.png",
  },
  {
    category: "ai",
    title: "Business Structuring AI Tool",
    subtitle: "For Entrepreneurs",
    description: "Helps entrepreneurs find the right corporate structure for their business.",
    image: "/engineering/business.png",
  },

  // Apps
  {
    category: "apps",
    title: "FinTech App",
    subtitle: "Mobile App",
    description: "Financial transactions app for customized cross-country transfers.",
    image: "/engineering/finmate.png",
  },
  {
    category: "apps",
    title: "Dietary App",
    subtitle: "Web App",
    description: "A dietary tracking app.",
    image: "/engineering/Ba.png",
  },
  {
    category: "apps",
    title: "Process Optimization with TSP",
    subtitle: "Web App",
    description: "A process optimization decision app built with the Traveling Salesman Problem technique.",
    image: "/engineering/tsp.png",
  },

  // Websites
  {
    category: "websites",
    title: "Fashion E-commerce Site",
    subtitle: "Online Store",
    description: "A modern e-commerce website for selling fashion items.",
    image: "/engineering/fashion.png",
  },

  // Research & Writing
  {
    category: "research",
    title: "Analyzing Inefficiencies in Current Cross-Border Data Transfer Laws",
    subtitle: "Legal Frameworks, Data Protection",
    description: "Examines the legal framework governing cross-border data transfers, focusing on key regulations like the GDPR, and proposes recommendations for improving legal efficiencies.",
    image: "/engineering/data.png",
  },
  {
    category: "research",
    title: "Unbiased Hiring Algorithms",
    subtitle: "AI, Advanced Algorithms",
    description: "Develops a tool that addresses discriminatory elements in AI hiring processes while maintaining efficiency, for a more equitable and compliant hiring process.",
    image: "/engineering/hiring.png",
  },
];

export default function EngineeringPage() {
  return (
    <div style={{ background: "var(--c-bg)", paddingTop: "6rem" }}>

      {/* ── Header ── */}
      <section className="section page-x" style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="inner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">Engineering</span>
          </div>
          <h1 className="t-display t-display-xl" style={{ marginBottom: "1.25rem" }}>Selected builds.</h1>
          <p className="t-body" style={{ maxWidth: "34rem" }}>
            AI tools, apps, and websites built directly and in collaboration with teams, across industries, frameworks, and languages, several of them grown out of my own research.
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="section page-x">
        <div className="inner">
          <EngineeringGrid projects={projects} />
        </div>
      </section>
    </div>
  );
}
