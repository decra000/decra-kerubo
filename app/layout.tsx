import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactBubble } from "@/components/layout/ContactBubble";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

export const metadata: Metadata = {
  title: { default: "Decra Kerubo", template: "%s — Decra" },
  description: "Technology law consulting, startup advisory, and AI engineering. Nairobi, Kenya.",
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
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }} />
      </head>
      <body>
        <ThemeProvider>
          <div id="rp" style={{ width: "0%" }} />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ContactBubble />
        </ThemeProvider>
      </body>
    </html>
  );
}
