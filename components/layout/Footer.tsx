"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";

const LINKS = [
  ["/#about", "About"],
  ["/#collaborate", "Partners"],
  ["/#services", "Services"],
  ["/engineering", "Research"],
];

const SOCIALS = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/decra/",
  },
];

export function Footer() {
  const [buildOpen, setBuildOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!buildOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setBuildOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [buildOpen]);

  async function submitBuildRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");
    const fields = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          engagement: "tech-development",
          name: String(fields.get("name") || "").trim(),
          email: String(fields.get("email") || "").trim(),
          org: String(fields.get("organization") || "").trim(),
          timeline: String(fields.get("timeline") || "").trim(),
          summary: String(fields.get("project") || "").trim(),
        }),
      });
      if (!response.ok) throw new Error("Your request couldn’t be sent. Please try again.");
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Your request couldn’t be sent. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <footer className="site-footer">
      <div className="site-footer-bottom">
        <div className="site-footer-meta">
          <span>© Decra Kerubo</span>
        </div>
        <nav className="site-footer-links" aria-label="Footer navigation">
          {LINKS.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
          <button type="button" onClick={() => { setSubmitted(false); setError(""); setBuildOpen(true); }}>Build</button>
        </nav>
        <div className="site-footer-socials">
          {SOCIALS.map(({ label, url }) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>{label}</a>
          ))}
        </div>
      </div>

      {buildOpen && (
        <div className="build-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setBuildOpen(false); }}>
          <section className="build-modal" role="dialog" aria-modal="true" aria-labelledby="build-modal-title">
            <header className="build-modal-header">
              <div><p>PRODUCT &amp; ENGINEERING</p><h2 id="build-modal-title">Request a tech product build</h2></div>
              <button className="build-modal-close" type="button" onClick={() => setBuildOpen(false)} aria-label="Close form"><X size={20} /></button>
            </header>
            {submitted ? (
              <div className="build-modal-success" role="status"><span>REQUEST RECEIVED</span><h3>Thank you. I’ll be in touch.</h3><p>Your details are with me. Expect a follow-up by email within 48 hours.</p></div>
            ) : (
              <form className="build-modal-form" onSubmit={submitBuildRequest}>
                <p className="build-modal-intro">Tell me a little about yourself and the product you have in mind.</p>
                <div className="build-modal-fields">
                  <label>Your name<input name="name" required maxLength={120} autoComplete="name" placeholder="Name" /></label>
                  <label>Email address<input name="email" required type="email" maxLength={254} autoComplete="email" placeholder="you@example.com" /></label>
                  <label>Company or project <span>(optional)</span><input name="organization" maxLength={160} autoComplete="organization" placeholder="What should I call it?" /></label>
                  <label>When are you hoping to start? <span>(optional)</span><input name="timeline" maxLength={120} placeholder="e.g. This quarter" /></label>
                  <label className="build-modal-project">What would you like to build?<textarea name="project" required maxLength={4000} rows={4} placeholder="Tell me about the product, who it is for, and what you need." /></label>
                </div>
                {error && <p className="build-modal-error" role="alert">{error}</p>}
                <button className="build-modal-submit" type="submit" disabled={sending}>{sending ? "Sending request…" : "Send build request"}<ArrowRight size={15} /></button>
                <p className="build-modal-privacy">Your details are only used to follow up about this project.</p>
              </form>
            )}
          </section>
        </div>
      )}

      <style>{`
        .site-footer{overflow:hidden;background:#050606;color:#eeeae0;border-top:1px solid rgba(238,234,224,.22)}
        .site-footer-bottom{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:2rem;padding:1.6rem var(--space-x) 1.9rem;border-top:1px solid rgba(238,234,224,.18)}
        .site-footer-meta{display:flex;flex-direction:column;gap:.35rem;color:rgba(238,234,224,.53);font:400 .65rem/1.5 var(--font-sans)}
        .site-footer-links{display:flex;justify-content:center;flex-wrap:wrap;gap:clamp(.8rem,2vw,1.8rem)}
        .site-footer-links a,.site-footer-links button,.site-footer-socials{color:rgba(238,234,224,.72);font:500 .6rem/1.5 var(--font-manjari);letter-spacing:.09em;text-transform:uppercase}
        .site-footer-links a,.site-footer-links button{text-decoration:none;transition:color .2s}
        .site-footer-links button{padding:0;border:0;background:none;cursor:pointer}
        .site-footer-links a:hover,.site-footer-links button:hover,.site-footer-socials a:hover{color:var(--c-accent)}
        .site-footer-socials{display:flex;align-items:center;justify-content:flex-end;gap:1rem}
        .site-footer-socials a{display:flex;align-items:center;gap:.55rem;color:rgba(238,234,224,.72);line-height:0;text-decoration:none;transition:color .2s}
        .build-modal-backdrop{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;overflow-y:auto;padding:1.5rem;background:rgba(0,0,0,.76);backdrop-filter:blur(5px)}
        .build-modal{width:min(100%,700px);max-height:min(90vh,850px);overflow:auto;background:#f4f2ed;color:#161715;box-shadow:0 28px 90px rgba(0,0,0,.42)}
        .build-modal-header{display:flex;align-items:flex-start;justify-content:space-between;gap:2rem;padding:1.5rem clamp(1.25rem,4vw,2.2rem);border-bottom:1px solid rgba(22,23,21,.14)}
        .build-modal-header p,.build-modal-success>span{margin:0 0 .65rem;color:#52766a;font:700 .58rem/1.4 var(--font-manjari);letter-spacing:.22em;text-transform:uppercase}
        .build-modal-header h2{margin:0;font:400 clamp(1.5rem,4vw,2.2rem)/1.15 var(--font-serif)}
        .build-modal-close{display:grid;place-items:center;flex:0 0 2.5rem;width:2.5rem;height:2.5rem;border:1px solid rgba(22,23,21,.2);background:transparent;color:inherit;cursor:pointer}
        .build-modal-form{display:grid;gap:1.1rem;padding:1.5rem clamp(1.25rem,4vw,2.2rem) 2rem}
        .build-modal-intro{margin:0;color:#666861;font:400 .85rem/1.6 var(--font-sans)}
        .build-modal-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}
        .build-modal-fields label{display:grid;align-content:start;gap:.4rem;color:#161715;font:600 .7rem/1.4 var(--font-sans)}
        .build-modal-fields label span{color:#777970;font-weight:400}
        .build-modal-fields input,.build-modal-fields textarea{box-sizing:border-box;width:100%;padding:.8rem .85rem;border:1px solid rgba(22,23,21,.2);outline-color:#52766a;background:#fbfaf7;color:#161715;font:400 .82rem/1.5 var(--font-sans)}
        .build-modal-fields textarea{resize:vertical;min-height:112px}
        .build-modal-project{grid-column:1/-1}
        .build-modal-submit{display:flex;align-items:center;justify-content:space-between;gap:1rem;width:100%;padding:1rem 1.1rem;border:0;background:#315f51;color:#fff;cursor:pointer;font:700 .65rem var(--font-manjari);letter-spacing:.16em;text-transform:uppercase}
        .build-modal-submit:disabled{opacity:.6;cursor:wait}
        .build-modal-privacy{margin:0;color:#777970;font:400 .68rem/1.5 var(--font-sans)}
        .build-modal-error{margin:0;color:#a33131;font:400 .78rem/1.5 var(--font-sans)}
        .build-modal-success{padding:clamp(2rem,6vw,4rem)}
        .build-modal-success h3{margin:1rem 0 .6rem;font:400 1.8rem var(--font-serif)}
        .build-modal-success p{margin:0;color:#666861;font:400 .85rem/1.7 var(--font-sans)}
        @media(max-width:860px){.site-footer-bottom{grid-template-columns:1fr auto}.site-footer-links{grid-column:1/-1;grid-row:2;justify-content:flex-start;padding-top:1rem;border-top:1px solid rgba(238,234,224,.1)}.site-footer-socials{grid-column:2;grid-row:1}}
        @media(max-width:560px){.site-footer-bottom{grid-template-columns:1fr;gap:1.25rem;padding-block:1.2rem 1.5rem}.site-footer-meta{flex-direction:row;justify-content:space-between}.site-footer-links{grid-column:1;grid-row:2;justify-content:flex-start;gap:.8rem 1.1rem;padding-top:1rem}.site-footer-socials{grid-column:1;grid-row:3;justify-content:flex-start}.build-modal-fields{grid-template-columns:1fr}.build-modal-project{grid-column:auto}}
        @media(prefers-reduced-motion:reduce){.site-footer a{transition:none}}
      `}</style>
    </footer>
  );
}
