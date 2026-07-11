import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactBubble } from "@/components/layout/ContactBubble";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

const SITE_URL = "https://decrakerubo.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Decra Kerubo — Technology Lawyer & Product Counsel, Nairobi",
    template: "%s — Decra Kerubo",
  },
  description:
    "Decra Kerubo is a technology lawyer and product counsel based in Nairobi, Kenya, with a dual background in Computer Science (AI) and Law. Regulatory compliance, product counsel, and founder advisory for startups and technology companies across Africa.",
  keywords: [
    "Decra Kerubo",
    "technology lawyer Nairobi",
    "technology lawyer Kenya",
    "technology lawyer Africa",
    "product counsel Kenya",
    "product counsel Africa",
    "technical product counsel",
    "technical product counsel Kenya",
    "technical product counsel Africa",
    "product counsel Nairobi",
    "startup lawyer Kenya",
    "startup lawyer Africa",
    "tech lawyer Nairobi",
    "tech lawyer Kenya",
    "tech policy lawyer Kenya",
    "fintech lawyer Kenya",
    "fintech lawyer Africa",
    "AI lawyer Kenya",
    "AI lawyer Africa",
    "AI regulatory counsel Africa",
    "data protection lawyer Kenya",
    "data protection lawyer Africa",
    "ODPC compliance",
    "ODPC compliance lawyer",
    "Kenya Data Protection Act lawyer",
    "tech regulatory law Africa",
    "regulatory compliance lawyer Kenya",
    "founder legal advisory Nairobi",
    "founder legal advisory Africa",
    "in-house counsel Kenya",
    "outside general counsel Kenya",
    "technology counsel East Africa",
    "product counsel East Africa",
    "legal counsel for startups Africa",
    "AI and law",
    "computer scientist lawyer",
    "lawyer with computer science background",
  ],
  authors: [{ name: "Decra Kerubo", url: SITE_URL }],
  creator: "Decra Kerubo",
  publisher: "Decra Kerubo",
  category: "Legal Services",
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: "Decra Kerubo",
    title: "Decra Kerubo — Technology Lawyer & Product Counsel, Nairobi",
    description:
      "Technology lawyer and product counsel with a dual background in Computer Science (AI) and Law. Regulatory compliance, product counsel, and founder advisory in Nairobi, Kenya.",
    locale: "en_KE",
    images: [
      {
        url: "/decra-hero-wide.jpg",
        width: 1537,
        height: 1023,
        alt: "Decra Kerubo, technology lawyer and product counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Decra Kerubo — Technology Lawyer & Product Counsel, Nairobi",
    description:
      "Technology lawyer and product counsel with a dual background in Computer Science (AI) and Law. Based in Nairobi, Kenya.",
    images: ["/decra-hero-wide.jpg"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Decra Kerubo",
  alternateName: "Decra Kerubo, Technical Product Counsel",
  url: SITE_URL,
  image: `${SITE_URL}/decra-hero-wide.jpg`,
  jobTitle: "Technology Lawyer & Product Counsel",
  description:
    "Technology lawyer and product counsel with a dual degree in Computer Science (AI) and Law, helping founders, startups, and technology companies navigate regulation while building products that scale safely.",
  email: "hello@decrakerubo.com",
  address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  homeLocation: { "@type": "Place", name: "Nairobi, Kenya" },
  workLocation: { "@type": "Place", name: "Nairobi, Kenya" },
  nationality: { "@type": "Country", name: "Kenya" },
  knowsAbout: [
    "Technology Law",
    "Data Protection",
    "Product Counsel",
    "Technical Product Counsel",
    "Startup Advisory",
    "Artificial Intelligence",
    "Fintech Regulation",
    "Tech Policy",
    "Regulatory Compliance",
    "Kenya Data Protection Act",
  ],
  sameAs: [
    "https://www.instagram.com/_little._d._/",
    "https://www.linkedin.com/in/decra/",
  ] as string[],
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Decra Kerubo — Technology Lawyer & Product Counsel",
  image: `${SITE_URL}/decra-hero-wide.jpg`,
  url: SITE_URL,
  email: "hello@decrakerubo.com",
  priceRange: "$$",
  areaServed: [
    { "@type": "Country", name: "Kenya" },
    { "@type": "Country", name: "Nigeria" },
    { "@type": "Country", name: "South Africa" },
    { "@type": "Country", name: "Ghana" },
    { "@type": "Country", name: "Rwanda" },
    { "@type": "Country", name: "Uganda" },
    { "@type": "Country", name: "Tanzania" },
    { "@type": "Continent", name: "Africa" },
  ],
  address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  founder: { "@type": "Person", name: "Decra Kerubo" },
  description:
    "Technology law and product counsel practice serving founders, startups, and technology companies across Kenya and Africa — covering regulatory compliance, data protection, technical product counsel, and founder advisory.",
  serviceType: [
    "Technology Law",
    "Product Counsel",
    "Technical Product Counsel",
    "Startup Legal Advisory",
    "Data Protection Compliance",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Serif+Display:ital@0;1&family=Manjari:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta name="author" content="Decra Kerubo" />
        <meta name="geo.region" content="KE" />
        <meta name="geo.placename" content="Nairobi" />
        <meta name="geo.position" content="-1.286389;36.817223" />
        <meta name="ICBM" content="-1.286389, 36.817223" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }} />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }} />
      </head>
      <body>
        <ThemeProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ContactBubble />
        </ThemeProvider>
      </body>
    </html>
  );
}
