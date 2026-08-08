import type { Metadata } from "next";
import { RolePage, type RolePageData } from "@/components/seo/RolePage";

const SITE_URL = "https://decrakerubo.com";
const PATH = "/tech-writer-kenya";

export const metadata: Metadata = {
  title: "Technology Writer in Kenya",
  description:
    "Decra Kerubo writes on technology law, AI governance, and technology harm in Kenya and Africa, including The 1000, a documented index of real technology harm cases used to advocate for better policy.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
};

const data: RolePageData = {
  slug: PATH.slice(1),
  eyebrow: "Technology Writer, Kenya",
  h1: "Writing that comes out of the practice, not around it.",
  intro:
    "The writing work sits directly downstream of the legal and engineering practice rather than beside it: documenting real technology harm cases, unpacking what a specific regulatory gap actually means for a founder or engineering team, and translating dense compliance frameworks like the Kenya Data Protection Act into language a product team can act on. It's technical writing in the literal sense, written by someone who reads the code as closely as the statute.",
  sections: [
    {
      heading: "The 1000, Tech Harm Index",
      body: "An ongoing, case-by-case written record of technology harm in Kenya and across Africa, each entry naming the specific policy gap it exposes, built as a public resource rather than an internal note.",
    },
    {
      heading: "Regulatory and compliance writing",
      body: "Breaking down the Kenya Data Protection Act, ODPC guidance, and emerging AI governance frameworks into writing that's usable by the people actually building the product, not only by other lawyers.",
    },
    {
      heading: "Product and technical writing",
      body: "Documentation and written analysis produced alongside client and personal engineering work, including architecture decision records and technical due diligence writeups, where clarity of writing is treated as part of the deliverable, not an afterthought.",
    },
  ],
  relatedCapabilities: [
    { label: "The 1000, Tech Harm Index", href: "/the-1000" },
    { label: "Selected Engineering Builds", href: "/engineering" },
    { label: "Product Governance & Standards", href: "/services#product-governance" },
    { label: "All Services", href: "/services" },
  ],
  faqs: [
    {
      q: "What kind of writing do you do?",
      a: "Primarily technology law and policy writing, including The 1000 tech harm index, regulatory and compliance breakdowns, and technical documentation produced alongside client and personal engineering work.",
    },
    {
      q: "Do you write for publications or only your own site?",
      a: "Writing is currently published on decrakerubo.com. For guest writing, interviews, or research collaboration, reach out via the contact page.",
    },
    {
      q: "Is the writing aimed at lawyers or at technical teams?",
      a: "Both, deliberately. The goal is writing that a founder, an engineer, and a lawyer can each read and act on without needing the others to translate it first.",
    },
  ],
  occupationName: "Technology Writer",
  occupationDescription:
    "Writes on technology law, AI governance, and documented technology harm in Kenya and Africa.",
};

export default function Page() {
  return <RolePage data={data} />;
}
