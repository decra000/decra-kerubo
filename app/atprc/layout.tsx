import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "African Tech Product Risk Clinic (ATPRC)",
  description:
    "The African Tech Product Risk Clinic is an initiative offering two free technology startup reviews every quarter, across product architecture, AI risk, data protection, compliance and early-stage product decisions.",
  keywords: [
    "African tech product risk clinic",
    "free startup review Africa",
    "AI risk review startup Kenya",
    "product architecture review",
    "data protection startup review Kenya",
  ],
  alternates: { canonical: "/atprc" },
};

export default function AtprcLayout({ children }: { children: React.ReactNode }) {
  return children;
}
