"use client";
import Link from "next/link";

const LINKS = [
  ["/#about", "About"],
  ["/#collaborate", "Partners"],
  ["/#services", "Services"],
  ["/engineering", "Research"],
  ["/?engage=tech-development#collaborate", "Request a Build"],
];

const SOCIALS = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/decra/",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <p className="site-footer-kicker">TECHNOLOGY · LAW · PRODUCT</p>
        <Link className="site-footer-email" href="mailto:decrakerry@gmail.com">Start a conversation <span aria-hidden="true">↗</span></Link>
      </div>

      <div className="site-footer-bottom">
        <div className="site-footer-meta">
          <span>© {new Date().getFullYear()} Decra Kerubo</span>
          <span>Nairobi, Kenya</span>
        </div>
        <nav className="site-footer-links" aria-label="Footer navigation">
          {LINKS.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="site-footer-socials">
          {SOCIALS.map(({ label, url, icon }) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>{icon}<span>{label}</span></a>
          ))}
        </div>
      </div>

      <style>{`
        .site-footer{overflow:hidden;background:#050606;color:#eeeae0;border-top:1px solid rgba(238,234,224,.22)}
        .site-footer-top{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;padding:1.6rem var(--space-x);border-bottom:1px solid rgba(238,234,224,.18)}
        .site-footer-kicker{margin:0;color:#9c9279;font:700 .58rem/1.5 var(--font-manjari);letter-spacing:.2em;text-transform:uppercase}
        .site-footer-email{display:flex;align-items:center;gap:.6rem;color:#eeeae0;font:500 .72rem/1.4 var(--font-sans);text-decoration:none;transition:color .2s}
        .site-footer-email:hover{color:#c2a46a}
        .site-footer-email span{color:#c2a46a;font-size:1rem}
        .site-footer-bottom{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:2rem;padding:1.6rem var(--space-x) 1.9rem;border-top:1px solid rgba(238,234,224,.18)}
        .site-footer-meta{display:flex;flex-direction:column;gap:.35rem;color:rgba(238,234,224,.53);font:400 .65rem/1.5 var(--font-sans)}
        .site-footer-links{display:flex;justify-content:center;flex-wrap:wrap;gap:clamp(.8rem,2vw,1.8rem)}
        .site-footer-links a,.site-footer-socials{color:rgba(238,234,224,.72);font:500 .6rem/1.5 var(--font-manjari);letter-spacing:.09em;text-transform:uppercase}
        .site-footer-links a{text-decoration:none;transition:color .2s}
        .site-footer-links a:hover,.site-footer-socials a:hover{color:#c2a46a}
        .site-footer-socials{display:flex;align-items:center;justify-content:flex-end;gap:1rem}
        .site-footer-socials a{display:flex;align-items:center;gap:.55rem;color:rgba(238,234,224,.72);line-height:0;text-decoration:none;transition:color .2s}
        @media(max-width:860px){.site-footer-bottom{grid-template-columns:1fr auto}.site-footer-links{grid-column:1/-1;grid-row:2;justify-content:flex-start;padding-top:1rem;border-top:1px solid rgba(238,234,224,.1)}.site-footer-socials{grid-column:2;grid-row:1}}
        @media(max-width:560px){.site-footer-top{align-items:flex-start;flex-direction:column;padding-block:1.25rem}.site-footer-bottom{grid-template-columns:1fr;gap:1.25rem;padding-block:1.2rem 1.5rem}.site-footer-meta{flex-direction:row;justify-content:space-between}.site-footer-links{grid-column:1;grid-row:2;justify-content:flex-start;gap:.8rem 1.1rem;padding-top:1rem}.site-footer-socials{grid-column:1;grid-row:3;justify-content:flex-start}}
        @media(prefers-reduced-motion:reduce){.site-footer a{transition:none}}
      `}</style>
    </footer>
  );
}
