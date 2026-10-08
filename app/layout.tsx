import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Decra Kerubo | Technical Product Counsel & AI Engineer in Kenya",
    template: "%s | Decra Kerubo",
  },
  description:
    "Nairobi-based Technical Product Counsel and AI Engineer combining Law and Computer Science (AI) to advise technology teams on product development, AI systems, privacy and governance in Kenya and Africa.",
  authors: [{ name: "Decra Kerubo", url: SITE_URL }],
  creator: "Decra Kerubo",
  publisher: "Decra Kerubo",
    category: "Technology and Product Advisory",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: "Decra Kerubo",
    title: "Decra Kerubo | Technical Product Counsel & AI Engineer in Kenya",
    description:
      "Nairobi-based Technical Product Counsel and AI Engineer combining Law and Computer Science (AI) for technology teams in Kenya and Africa.",
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
    title: "Decra Kerubo | Technical Product Counsel & AI Engineer in Kenya",
    description:
      "Technical Product Counsel and AI Engineer in Nairobi, Kenya. Product, legal and engineering work for technology teams.",
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
  "@id": `${SITE_URL}#decra-kerubo`,
  name: "Decra Kerubo",
  alternateName: "Decra Kerubo, Technical Product Counsel",
  url: SITE_URL,
  image: `${SITE_URL}/decra-hero-wide.jpg`,
  jobTitle: "Technical Product Counsel & AI Engineer",
  description:
    "Nairobi-based Technical Product Counsel and AI Engineer with a Bachelor of Laws and a BSc in Computer Science (Artificial Intelligence). Decra advises on product decisions, AI systems, privacy, governance, technology risk and engineering, with engagement scope agreed for each team.",
  email: "decrakerry@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  homeLocation: { "@type": "Place", name: "Nairobi, Kenya" },
  workLocation: { "@type": "Place", name: "Nairobi, Kenya" },
  nationality: { "@type": "Country", name: "Kenya" },
  knowsAbout: [
    "Technology Law",
    "Product Counsel",
    "Technical Product Counsel",
    "AI Systems Engineering",
    "Artificial Intelligence Engineering",
    "Technology Product Development",
    "Software Architecture",
    "Technology Risk",
    "Product Strategy & Advisory",
    "Product Governance & Standards",
    "AI Governance",
    "Data Governance",
    "Product Safety & Privacy",
    "Privacy by Design",
    "Data Protection",
    "Responsible AI",
    "Risk & Assurance",
    "Intellectual Property",
    "Technology Transactions",
    "Technical Due Diligence",
    "Kenya Data Protection Act",
  ],
  // The two degrees are the whole differentiator against a conventional firm,
  // and they were described in prose but absent from the structured data, so
  // nothing machine-readable connected Decra to either institution.
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "African Leadership University" },
    { "@type": "CollegeOrUniversity", name: "Africa Nazarene University" },
    { "@type": "EducationalOrganization", name: "Kenya School of Law" },
  ],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "BSc Computer Science (Artificial Intelligence)", recognizedBy: { "@type": "CollegeOrUniversity", name: "African Leadership University" } },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "Bachelor of Laws (LLB)", recognizedBy: { "@type": "CollegeOrUniversity", name: "Africa Nazarene University" } },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "certificate", name: "Attorney Licensing Program", recognizedBy: { "@type": "EducationalOrganization", name: "Kenya School of Law" } },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "certificate", name: "AI, Justice, and the Rule of Law", recognizedBy: { "@type": "CollegeOrUniversity", name: "Saïd Business School, University of Oxford" } },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "certificate", name: "IoT", recognizedBy: { "@type": "CollegeOrUniversity", name: "Carnegie Mellon University" } },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "certificate", name: "Information Systems Auditing, Controls & Assurance", recognizedBy: { "@type": "CollegeOrUniversity", name: "The Hong Kong University of Science and Technology" } },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "certificate", name: "Ethical Hacker", recognizedBy: { "@type": "Organization", name: "Cisco" } },
  ],
  sameAs: [
    "https://www.linkedin.com/in/decra/",
  ] as string[],
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}#technical-product-counsel`,
  name: "Technical Product Counsel and AI Engineering",
  image: `${SITE_URL}/decra-hero-wide.jpg`,
  url: SITE_URL,
  provider: { "@id": `${SITE_URL}#decra-kerubo` },
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
  description:
    "Scoped technical product counsel and AI engineering for technology teams in Kenya and Africa. Work may cover product strategy, AI systems, governance, privacy, technology risk, intellectual property, transactions and technical due diligence, as agreed for each engagement. This service does not include court representation or formal legal filings.",
  serviceType: [
    "Product Strategy & Advisory",
    "Product Governance & Standards",
    "Product Safety & Privacy",
    "Risk & Assurance",
    "Intellectual Property",
    "Technology Transactions",
    "Technical Due Diligence",
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get("x-nonce") || undefined;
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
        <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
        <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd).replace(/</g, "\\u003c") }} />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }}
        />
      </head>
      <body>
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
