import type { Metadata } from "next";
import { RolePage, type RolePageData } from "@/components/seo/RolePage";

const SITE_URL = "https://decrakerubo.com";
const PATH = "/startup-advisor-kenya";

export const metadata: Metadata = {
  title: "Startup Advisor in Kenya",
  description:
    "Decra Kerubo advises early-stage founders in Kenya on incorporation, product strategy, technical due diligence, and investment readiness, combining legal training with hands-on software engineering experience.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
};

const data: RolePageData = {
  slug: PATH.slice(1),
  eyebrow: "Startup Advisor, Kenya",
  h1: "Advisory built for the founder who is also the engineer.",
  intro:
    "A lot of startup advisory in Kenya splits cleanly into legal on one side and technical on the other, which leaves founders translating between two advisors who don't talk to each other. Decra Kerubo closes that gap directly: dual training in Computer Science (AI) and Law, plus experience as a sole engineer building production systems, means the same person can review your architecture, your incorporation documents, and your investment readiness in one conversation.",
  sections: [
    {
      heading: "Incorporation and early structuring",
      body: "Startup incorporation, founder agreements, and the early legal scaffolding that's easy to get wrong under time pressure, handled alongside product and go-to-market planning so legal structure doesn't lag behind what's actually being built.",
    },
    {
      heading: "Product and go-to-market readiness",
      body: "Feature and roadmap advisory, product architecture reviews, and go-to-market readiness assessments, drawing on direct experience building and shipping software products, not just advising on them from the outside.",
    },
    {
      heading: "Technical due diligence and investment readiness",
      body: "Technology, product, AI, and IP due diligence, plus the investment readiness work that gives founders a clear-eyed view of what an investor or acquirer will actually find when they look under the hood, before that review happens under pressure.",
    },
  ],
  relatedCapabilities: [
    { label: "Product Strategy & Advisory", href: "/services#product-strategy-advisory" },
    { label: "Technical Due Diligence", href: "/services#technical-due-diligence" },
    { label: "Technology Transactions", href: "/services#technology-transactions" },
    { label: "All Services", href: "/services" },
  ],
  faqs: [
    {
      q: "What kind of startups do you advise?",
      a: "Primarily technology and AI-driven startups in Kenya and East Africa, from early-stage founders structuring their company through growth-stage teams preparing for investment or acquisition due diligence.",
    },
    {
      q: "Can you review our technical architecture, not just our contracts?",
      a: "Yes. Product and architecture reviews are a core part of the advisory work, informed by hands-on experience building production software, including as the sole engineer on legal-technology platforms.",
    },
    {
      q: "How does an engagement usually start?",
      a: "Most engagements start with a discovery call to identify the right starting point, whether that's incorporation, a product review, or investment readiness preparation.",
    },
  ],
  occupationName: "Startup Advisor",
  occupationDescription:
    "Advises early and growth-stage technology founders in Kenya on incorporation, product strategy, and technical due diligence.",
};

export default function Page() {
  return <RolePage data={data} />;
}
