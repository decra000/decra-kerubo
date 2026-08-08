import type { Metadata } from "next";
import { RolePage, type RolePageData } from "@/components/seo/RolePage";

const SITE_URL = "https://decrakerubo.com";
const PATH = "/technology-law-researcher-kenya";

export const metadata: Metadata = {
  title: "Technology Law Researcher in Kenya",
  description:
    "Decra Kerubo researches technology harm and regulatory gaps in Kenya and Africa, including The 1000, a living index documenting real cases of technology harm to advocate for better policy.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
};

const data: RolePageData = {
  slug: PATH.slice(1),
  eyebrow: "Technology Law Researcher, Kenya",
  h1: "Research that starts from real cases, not hypotheticals.",
  intro:
    "Most technology policy discussion in Kenya and across Africa happens at a level removed from what's actually going wrong on the ground. Decra Kerubo's research work starts from the opposite direction: documenting specific, real cases of technology harm, then tracing the policy and regulatory gaps that let them happen. The clearest expression of this is The 1000, a living index cataloguing cases across categories including tech coercion, cyberbullying, covert surveillance, and algorithmic manipulation, each paired with the specific policy gap it exposes.",
  sections: [
    {
      heading: "The 1000, Tech Harm Index",
      body: "A structured, ongoing index of real technology harm cases in Kenya and across Africa, spanning categories from child exposure and cyberbullying to algorithmic manipulation and covert surveillance, each entry paired with an identified regulatory or policy gap rather than treated as an isolated incident.",
    },
    {
      heading: "Regulatory and compliance research",
      body: "Close reading of the Kenya Data Protection Act, ODPC guidance, and emerging AI governance frameworks, translated into practical compliance research for companies and, separately, into policy-facing analysis of where current frameworks fall short.",
    },
    {
      heading: "Applied research grounded in engineering",
      body: "Because the research is paired with hands-on software and AI engineering experience, the policy analysis stays grounded in how systems actually behave, rather than in abstractions about how they're assumed to work.",
    },
  ],
  relatedCapabilities: [
    { label: "The 1000, Tech Harm Index", href: "/the-1000" },
    { label: "Product Governance & Standards", href: "/services#product-governance" },
    { label: "Risk & Assurance", href: "/services#risk-assurance" },
    { label: "All Services", href: "/services" },
  ],
  faqs: [
    {
      q: "What is The 1000?",
      a: "The 1000 is a living index documenting real cases of technology harm in Kenya and across Africa, organised by category, each paired with the specific policy gap it reveals, maintained to advocate for better technology regulation.",
    },
    {
      q: "Is this research work connected to your legal practice?",
      a: "Yes. The research directly informs advisory work on AI governance, data protection, and regulatory compliance for clients, and vice versa: patterns seen across client engagements shape what gets documented.",
    },
    {
      q: "Do you publish or speak on this research?",
      a: "The 1000 is published as a public, ongoing index. For speaking, collaboration, or research partnership enquiries, reach out via the contact page.",
    },
  ],
  occupationName: "Technology Law Researcher",
  occupationDescription:
    "Documents and researches technology harm and regulatory gaps in Kenya and Africa, maintaining The 1000, a public tech harm index.",
};

export default function Page() {
  return <RolePage data={data} />;
}
