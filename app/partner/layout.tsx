import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner & Collaborate",
  description:
    "Partner with Decra Kerubo, technology lawyer and product counsel, on tech policy research, product strategy & governance, and technical due diligence across Kenya and Africa.",
  keywords: [
    "technology lawyer Kenya partnership",
    "product counsel collaboration Africa",
    "technical product counsel Kenya",
    "tech policy research partner Africa",
  ],
  alternates: { canonical: "/partner" },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
