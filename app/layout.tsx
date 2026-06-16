import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactBubble } from "@/components/layout/ContactBubble";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

export const metadata: Metadata = {
  title: { default: "Decra Kerubo — Legal & Technology Advisory", template: "%s | Decra" },
  description: "Technology law and entrepreneurial legal consulting for startups, NGOs, and founders in Kenya and across Africa.",
  authors: [{ name: "Decra Kerubo" }],
  openGraph: { type: "website", locale: "en_KE", url: "https://decrakerubo.com", siteName: "Decra Kerubo" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var t = localStorage.getItem('theme') || 'dark';
              document.documentElement.setAttribute('data-theme', t);
            } catch(e) {}
          })();
        ` }} />
      </head>
      <body>
        <ThemeProvider>
          <div id="reading-progress" style={{ width: "0%" }} />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ContactBubble />
        </ThemeProvider>
      </body>
    </html>
  );
}
