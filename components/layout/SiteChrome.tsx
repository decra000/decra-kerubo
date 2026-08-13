"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ContactBubble } from "./ContactBubble";
import { ScrollProgress } from "./ScrollProgress";

/**
 * Entrora is presented as its own property rather than a page of this site,
 * so it carries none of the shared chrome: no navbar, no footer, and not the
 * assistant bubble, which is labelled for someone else entirely. It brings
 * its own header instead.
 */
const STANDALONE = ["/entrora"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const standalone = STANDALONE.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  return (
    <>
      {!standalone && <ScrollProgress />}
      {!standalone && <Navbar />}
      <main>{children}</main>
      {!standalone && <Footer />}
      {!standalone && <ContactBubble />}
    </>
  );
}
