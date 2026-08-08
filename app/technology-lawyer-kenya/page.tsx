import type { Metadata } from "next";
import { RolePage, type RolePageData } from "@/components/seo/RolePage";

const SITE_URL = "https://decrakerubo.com";
const PATH = "/technology-lawyer-kenya";

export const metadata: Metadata = {
  title: "Technology Lawyer in Kenya",
  description:
    "Decra Kerubo is a technology lawyer in Kenya advising founders and technology companies on data protection, AI regulation, IP, and technology transactions, with a dual background in Computer Science and Law.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
};

const data: RolePageData = {
  slug: PATH.slice(1),
  eyebrow: "Technology Lawyer, Kenya",
  h1: "A technology lawyer who reads the codebase, not just the contract.",
  intro:
    "Most technology law in Kenya is practised at arm's length from the product itself, drafted after decisions are already made. Decra Kerubo works the other way: a Bachelor of Laws paired with a Computer Science background in AI means the legal advice is grounded in how the system actually works, not just what the terms say. That matters most in three areas: the Kenya Data Protection Act and ODPC compliance, AI-specific regulatory and governance questions, and the technology transactions, IP, and licensing work that keeps a growing product legally sound.",
  sections: [
    {
      heading: "Data protection and ODPC compliance",
      body: "Kenyan data protection law has real teeth, and the Office of the Data Protection Commissioner increasingly expects technical fluency, not just policy documents. Work here includes data protection impact assessments, privacy-by-design reviews conducted against the actual data flows in a system, registration and compliance support, and translating the Kenya Data Protection Act into practices an engineering team can actually implement.",
    },
    {
      heading: "AI and technology regulation",
      body: "As AI systems move from experimentation into production across Kenyan and African markets, the regulatory picture is still forming. Advisory here covers AI governance frameworks, AI risk and impact assessments, and helping technical teams anticipate regulatory exposure before it becomes a compliance problem, drawing on hands-on experience building and evaluating AI-driven systems, not just reading about them.",
    },
    {
      heading: "IP, licensing, and technology transactions",
      body: "Software licensing, open-source compliance, SaaS and platform agreements, and vendor and commercial technology contracts, structured by someone who has also built and shipped the kind of software these agreements govern. That background shortens the distance between a clause and what it actually means for an engineering roadmap.",
    },
  ],
  relatedCapabilities: [
    { label: "Product Governance & Standards", href: "/services#product-governance" },
    { label: "Intellectual Property", href: "/services#intellectual-property" },
    { label: "Technology Transactions", href: "/services#technology-transactions" },
    { label: "All Services", href: "/services" },
  ],
  faqs: [
    {
      q: "What does a technology lawyer in Kenya actually do differently from a general commercial lawyer?",
      a: "A technology lawyer works at the intersection of software, data, and regulation, advising on questions like AI governance, data protection compliance, and technology transactions that require understanding how a product is actually built, not only what a contract says.",
    },
    {
      q: "Do you handle Kenya Data Protection Act compliance specifically?",
      a: "Yes. This includes data protection impact assessments, ODPC-facing compliance work, and privacy-by-design reviews conducted against real system architecture.",
    },
    {
      q: "Are you a practising advocate?",
      a: "Decra holds a Bachelor of Laws and advises at a strategic and technical level. For formal legal representation or court filings, referrals are made to practising advocates within her network.",
    },
  ],
  occupationName: "Technology Lawyer",
  occupationDescription:
    "Advises technology companies and founders in Kenya on data protection, AI regulation, intellectual property, and technology transactions.",
};

export default function Page() {
  return <RolePage data={data} />;
}
