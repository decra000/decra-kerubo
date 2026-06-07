import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactBubble } from "@/components/layout/ContactBubble";

export const metadata: Metadata = {
  title: {
    default: "Decra — Technology Law & Entrepreneurial Advisory",
    template: "%s | Decra",
  },
  description:
    "Technology law and entrepreneurial legal consulting for startups, NGOs, and founders in Kenya and across Africa. Incorporation, tax, compliance, contracts, IP, and international expansion.",
  keywords: ["Technology Law Kenya", "Startup Legal Advisor Kenya", "Entrepreneurial Law Nairobi", "Data Privacy Compliance Kenya", "Incorporation Kenya", "NGO Legal Advisor Africa"],
  authors: [{ name: "Decra Kerubo" }],
  creator: "Decra",
  openGraph: {
    type: "website", locale: "en_KE", url: "https://decrakero.com", siteName: "Decra",
    title: "Decra — AI, Law & Entrepreneurial Advisory",
    description: "Helping startups, NGOs, and growth-focused organizations navigate AI, law, and the entrepreneurial journey.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manjari:wght@100;400;700&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div id="reading-progress" style={{ width: "0%" }} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ContactBubble />
      </body>
    </html>
  );
}
