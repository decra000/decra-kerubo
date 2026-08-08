import type { Metadata } from "next";
import { RolePage, type RolePageData } from "@/components/seo/RolePage";

const SITE_URL = "https://decrakerubo.com";
const PATH = "/ai-engineer-kenya";

export const metadata: Metadata = {
  title: "AI Engineer in Kenya",
  description:
    "Decra Kerubo is an AI and software engineer in Kenya building production systems, from legal-practice-management platforms to AI-driven applications, with a Computer Science background focused on AI/ML.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
};

const data: RolePageData = {
  slug: PATH.slice(1),
  eyebrow: "AI Engineer, Kenya",
  h1: "Building the systems, not just advising on them.",
  intro:
    "Alongside her legal practice, Decra Kerubo works as a hands-on software and AI engineer, holding a Computer Science background with a focus on AI/ML. She has served as the sole engineer and builder on the Oringe Waswa Legal Practice Management System (a full workflow engine covering matters, deadlines, and role-based access) and on her own legal-technology platform at decrakerubo.com, and has previously worked with legal-technology teams including Entrora Systems and Esheria Technologies.",
  sections: [
    {
      heading: "Legal practice management systems",
      body: "Design and build of the Oringe Waswa LPMS, including a full matter workflow engine (activity types, work items, domain events, and trigger rules), role-based access control, multi-office branch support, and the architecture decision records that keep a growing system coherent as it scales.",
    },
    {
      heading: "AI-driven applications",
      body: "Applied AI tooling built directly into product, including AI-assisted admin tooling with tool-calling and structured confirmation flows, AI-driven intake chatbots, and provider integrations across different model backends, built to be production-reliable, not demo-only.",
    },
    {
      heading: "Full-stack web engineering",
      body: "End-to-end builds on Next.js, Supabase, and TypeScript, spanning authentication and permission systems, editorial and approval workflows, universal CRUD engines with revision history, and the design-token-driven frontend systems that make a product feel intentional rather than templated.",
    },
  ],
  relatedCapabilities: [
    { label: "Selected Engineering Builds", href: "/engineering" },
    { label: "Product Governance & Standards", href: "/services#product-governance" },
    { label: "Technical Due Diligence", href: "/services#technical-due-diligence" },
    { label: "All Services", href: "/services" },
  ],
  faqs: [
    {
      q: "Do you build software yourself, or only advise on it?",
      a: "Both. Decra is a hands-on engineer, having built systems including the Oringe Waswa Legal Practice Management System and her own legal-technology platform, in addition to advising other technical teams.",
    },
    {
      q: "What's your engineering background?",
      a: "A Computer Science degree with a focus on AI/ML, paired with production experience across Next.js, Supabase, TypeScript, and applied AI tooling.",
    },
    {
      q: "Where can I see examples of what you've built?",
      a: "A selection of engineering builds, including AI tools, apps, and applied research, is available on the Engineering page.",
    },
  ],
  occupationName: "AI/Software Engineer",
  occupationDescription:
    "Builds production software and AI-driven systems, including legal practice management platforms and applied AI tooling.",
};

export default function Page() {
  return <RolePage data={data} />;
}
