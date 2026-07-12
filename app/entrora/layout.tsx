import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrora",
  description:
    "Entrora, a venture by Decra Kerubo, technology lawyer and product counsel based in Nairobi, Kenya.",
  keywords: [
    "Entrora Decra Kerubo",
    "technology lawyer Kenya venture",
    "product counsel Africa",
  ],
  alternates: { canonical: "https://decrakerubo.com/entrora" },
};

export default function EntroraLayout({ children }: { children: React.ReactNode }) {
  return children;
}
