"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

export type Capability = {
  id: string;
  number: string;
  label: string;
  body: string;
  detail: string;
  items: string[];
};

function CapabilityDetail({ c }: { c: Capability }) {
  return (
    <>
      <span className="t-label" style={{ marginBottom: "1rem", display: "block" }}>
        {c.number}
      </span>
      <p
        className="t-display"
        style={{
          fontSize: "clamp(1.15rem, 1.8vw, 1.5rem)",
          fontWeight: 400,
          lineHeight: 1.4,
          color: "var(--c-ink)",
          marginBottom: "1.5rem",
          maxWidth: "36rem",
        }}
      >
        {c.body}
      </p>
      <p className="t-body" style={{ marginBottom: "2.5rem", maxWidth: "36rem" }}>
        {c.detail}
      </p>
      <Link href="/book" className="cap-tab-link">
        Book a Consultation <ArrowRight size={13} />
      </Link>
    </>
  );
}

export function CapabilityTabs({ capabilities }: { capabilities: Capability[] }) {
  const [activeId, setActiveId] = useState(capabilities[0]?.id ?? "");
  const active = capabilities.find((c) => c.id === activeId) ?? capabilities[0];

  // Mobile reuses activeId as "which item is expanded", collapsible (tapping
  // the open one closes it) since there's no separate detail panel to fall
  // back to, unlike desktop where a tab is always active.
  const [mobileOpenId, setMobileOpenId] = useState("");

  return (
    <>
    {/* ── Desktop: label column + shared detail panel on the right ── */}
    <div className="cap-tabs-grid cap-tabs-desktop">
      <div className="cap-tabs-nav">
        {capabilities.map((c) => {
          const isActive = c.id === active.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              aria-current={isActive}
              className={`cap-tab-btn ${isActive ? "is-active" : ""}`}
            >
              <span
                className="t-display t-display-md cap-tab-label"
                style={{
                  margin: 0,
                  color: isActive ? "var(--c-forest)" : "var(--c-ink-muted)",
                  transition: "color 0.25s ease",
                }}
              >
                {c.label}
              </span>
              <span className={`cap-tab-underline ${isActive ? "is-active" : ""}`} />
            </button>
          );
        })}
      </div>

      <div key={active.id} className="cap-tab-panel">
        <CapabilityDetail c={active} />
      </div>
    </div>

    {/* ── Mobile: accordion, each item's detail unfolds directly beneath
        itself instead of in a shared panel far below the list ── */}
    <div className="cap-tabs-mobile">
      {capabilities.map((c) => {
        const isOpen = c.id === mobileOpenId;
        return (
          <div key={c.id} className="cap-accordion-item">
            <button
              type="button"
              onClick={() => setMobileOpenId(isOpen ? "" : c.id)}
              aria-expanded={isOpen}
              className="cap-accordion-header"
            >
              <span
                className="t-display t-display-md"
                style={{ margin: 0, color: isOpen ? "var(--c-forest)" : "var(--c-ink)" }}
              >
                {c.label}
              </span>
              <Plus size={16} className="cap-accordion-icon" style={{ transform: isOpen ? "rotate(45deg)" : "none" }} />
            </button>
            <div className="cap-accordion-panel" style={{ maxHeight: isOpen ? "40rem" : "0px", opacity: isOpen ? 1 : 0 }}>
              <div style={{ paddingTop: "1.25rem", paddingBottom: "1.75rem" }}>
                <CapabilityDetail c={c} />
              </div>
            </div>
          </div>
        );
      })}
    </div>

      <style>{`
        .cap-tabs-grid{
          display:grid;
          grid-template-columns: 2fr 3fr;
          gap: 4rem;
          padding: 3rem 0;
        }
        .cap-tabs-nav{
          display:flex;
          flex-direction:column;
          gap: 1.6rem;
        }
        .cap-tab-btn{
          display:inline-block;
          text-align:left;
          background:none;
          border:none;
          padding:0;
          cursor:pointer;
          width:fit-content;
          opacity: 0.72;
          transition: opacity 0.25s ease;
        }
        .cap-tab-btn.is-active{
          opacity: 1;
        }
        .cap-tab-btn:hover{
          opacity: 1;
        }
        .cap-tab-underline{
          display:block;
          height:1px;
          width:0;
          background: var(--c-forest);
          margin-top: 0.4rem;
          transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .cap-tab-underline.is-active{
          width:100%;
        }
        .cap-tab-panel{
          animation: cap-panel-fade 0.35s ease;
        }
        @keyframes cap-panel-fade{
          from{ opacity:0; transform: translateY(6px); }
          to{ opacity:1; transform: translateY(0); }
        }
        .cap-tab-link{
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-manjari);
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--c-forest);
          text-decoration: none;
          padding-bottom: 0.3rem;
          border-bottom: 1px solid var(--c-border-strong);
          transition: border-color 0.2s ease, gap 0.2s ease;
        }
        .cap-tab-link:hover{
          border-color: var(--c-forest);
          gap: 0.7rem;
        }

        .cap-tabs-mobile{ display: none; }

        @media(max-width:900px){
          .cap-tabs-desktop{ display: none !important; }
          .cap-tabs-mobile{ display: block; padding: 1rem 0; }
        }

        .cap-accordion-item{
          border-bottom: 1px solid var(--c-border);
        }
        .cap-accordion-item:first-child{
          border-top: 1px solid var(--c-border);
        }
        .cap-accordion-header{
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          padding: 1.15rem 0;
          text-align: left;
        }
        .cap-accordion-icon{
          flex: none;
          color: var(--c-ink-muted);
          transition: transform 0.25s ease, color 0.25s ease;
        }
        .cap-accordion-header[aria-expanded="true"] .cap-accordion-icon{
          color: var(--c-forest);
        }
        .cap-accordion-panel{
          overflow: hidden;
          transition: max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease;
        }
      `}</style>
    </>
  );
}
