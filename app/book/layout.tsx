import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Book a consultation with Decra Kerubo, technology lawyer and product counsel, for regulatory compliance, product counsel, and founder advisory across Kenya and Africa.",
  keywords: [
    "book technology lawyer Kenya",
    "product counsel consultation Africa",
    "technical product counsel booking",
    "startup lawyer consultation Kenya",
  ],
  alternates: { canonical: "https://decrakerubo.com/book" },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
