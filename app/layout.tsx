import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactBubble } from "@/components/layout/ContactBubble";

export const metadata: Metadata = {
  title: {
    default: "Decra — AI, Law & Entrepreneurial Advisory",
    template: "%s | Decra",
  },
  description:
    "I help startups, NGOs, and ambitious organizations build AI systems, navigate technology law, and make sound legal decisions throughout the entrepreneurial journey.",
  keywords: ["AI Consultant Kenya", "AI Strategy Consultant Africa", "Technology Law Advisor Kenya", "Startup Legal Advisor Kenya", "AI for NGOs Africa", "Entrepreneurial Legal Consultant"],
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
        <link href="https://fonts.googleapis.com/css2?family=Manjari:wght@100;400;700&display=swap" rel="stylesheet" />
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
