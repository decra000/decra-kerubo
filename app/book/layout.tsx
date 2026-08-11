import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Book a consultation with Decra Kerubo, technology lawyer and product counsel, for product strategy, governance, safety & privacy, risk & assurance, IP, technology transactions, or technical due diligence across Kenya and Africa.",
  keywords: [
    "book technology lawyer Kenya",
    "product counsel consultation Africa",
    "technical product counsel booking",
    "startup lawyer consultation Kenya",
  ],
  alternates: { canonical: "/book" },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
