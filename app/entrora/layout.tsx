import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrora Systems, Legal Engineering",
  description:
    "Entrora Systems is a legal engineering practice: regulated AI and software built with the legal reasoning and the technical reasoning in the same pass. AI document systems, legal-tech development, compliant AI products, and AI governance frameworks in Nairobi, Kenya. Publisher of the Lex & Latte newsletter.",
  keywords: [
    "legal engineering",
    "Entrora Systems",
    "regulated AI engineering Kenya",
    "legal tech development Africa",
    "AI governance frameworks Kenya",
    "compliant AI products",
  ],
  alternates: { canonical: "/entrora" },
};

export default function EntroraLayout({ children }: { children: React.ReactNode }) {
  return children;
}
