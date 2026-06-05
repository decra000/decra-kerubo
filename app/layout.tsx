import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactBubble } from "@/components/layout/ContactBubble";

export const metadata: Metadata = {
  title: {
    default: "Decra Kerubo — Legal Consulting, The 1000 & AI Engineering",
    template: "%s | Decra",
  },
  description:
    "Legal consulting for startups, NGOs, and entrepreneurs across East Africa. Tech harm research through The 1000. AI engineering through Entrora Systems.",
  keywords: ["Legal Consulting Kenya", "Startup Legal Advisor Kenya", "NGO Legal Advisory Africa", "Tech Law Kenya", "Tax Compliance Kenya", "Company Incorporation Kenya", "AI Engineering Kenya"],
  authors: [{ name: "Decra Kerubo" }],
  creator: "Decra",
  openGraph: {
    type: "website", locale: "en_KE", url: "https://decrakero.com", siteName: "Decra",
    title: "Decra Kerubo — Legal Consulting, The 1000 & AI Engineering",
    description: "Legal consulting for startups, NGOs, and entrepreneurs. Tech harm research. AI engineering.",
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
