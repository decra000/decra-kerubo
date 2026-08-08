import type { Metadata } from "next";
import { RolePage, type RolePageData } from "@/components/seo/RolePage";

const SITE_URL = "https://decrakerubo.com";
const PATH = "/technical-product-counsel-kenya";

export const metadata: Metadata = {
  title: "Technical Product Counsel in Kenya",
  description:
    "Decra Kerubo is a technical product counsel in Kenya, embedded across the product lifecycle from strategy through governance, safety, risk, and launch, not brought in only when there's a contract to sign.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
};

const data: RolePageData = {
  slug: PATH.slice(1),
  eyebrow: "Technical Product Counsel, Kenya",
  h1: "Counsel embedded in the build, not bolted on at the end.",
  intro:
    "Technical product counsel is a narrower and more integrated role than general legal advisory: it means sitting close enough to the product roadmap that governance, safety, and risk questions get answered while a feature is being designed, not after it ships. Decra Kerubo works this way with founders and product teams across Kenya and East Africa, combining a Computer Science and AI background with legal training to review architecture, not just paperwork.",
  sections: [
    {
      heading: "Product strategy and architecture review",
      body: "Involvement from early roadmap and architecture decisions, feature planning, and go-to-market readiness, so legal and regulatory exposure is considered as part of the build, not discovered after launch.",
    },
    {
      heading: "Governance and safety by design",
      body: "AI governance, data governance, and privacy-by-design and safety-by-design reviews conducted against the actual product, not a generic checklist, plus the internal policy work and ISO readiness that let a growing product scale without accumulating undocumented risk.",
    },
    {
      heading: "Risk, assurance, and launch readiness",
      body: "Product stress testing, AI and privacy impact assessments, and structured risk assessments before a launch, giving a founder or product lead a clear picture of exposure before, not after, it becomes a live problem.",
    },
  ],
  relatedCapabilities: [
    { label: "Product Strategy & Advisory", href: "/services#product-strategy-advisory" },
    { label: "Product Safety & Privacy", href: "/services#product-safety-privacy" },
    { label: "Risk & Assurance", href: "/services#risk-assurance" },
    { label: "All Services", href: "/services" },
  ],
  faqs: [
    {
      q: "How is technical product counsel different from a startup lawyer?",
      a: "Technical product counsel is embedded closer to the build process itself, reviewing product architecture, governance, and safety decisions as they're made, rather than only handling contracts and incorporation paperwork.",
    },
    {
      q: "What stage of company do you work with?",
      a: "Engagements range from early-stage founders shaping their first product architecture to growth-stage teams preparing for a launch, audit, or investment round.",
    },
    {
      q: "Do you work with technical teams directly?",
      a: "Yes. A Computer Science and AI background means reviews and recommendations are pitched to be actionable by engineers, not only by legal or compliance staff.",
    },
  ],
  occupationName: "Technical Product Counsel",
  occupationDescription:
    "Provides integrated technical and legal counsel across the technology product lifecycle, from strategy through governance, safety, risk, and launch readiness.",
};

export default function Page() {
  return <RolePage data={data} />;
}
