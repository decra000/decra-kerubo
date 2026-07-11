import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Start a conversation with Decra Kerubo, technology lawyer and product counsel serving startups and technology companies in Kenya and across Africa.",
  keywords: [
    "technology lawyer Kenya consultation",
    "product counsel Africa inquiry",
    "technical product counsel Kenya",
    "startup legal advisory Kenya",
  ],
  alternates: { canonical: "https://decrakerubo.com/start" },
};

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
