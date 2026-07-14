"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type Capability = {
  id: string;
  number: string;
  label: string;
  body: string;
  detail: string;
  items: string[];
};

export function CapabilityTabs({ capabilities }: { capabilities: Capability[] }) {
  const [activeId, setActiveId] = useState(capabilities[0]?.id ?? "");
  const active = capabilities.find((c) => c.id === activeId) ?? capabilities[0];

  return (
    <div className="cap-tabs-grid">
      {/* ── Left: label list ── */}
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

      {/* ── Right: active capability detail ── */}
      <div key={active.id} className="cap-tab-panel">
        <span className="t-label" style={{ marginBottom: "1rem", display: "block" }}>
          {active.number}
        </span>

        {/* Lede — the headline statement, set larger like a pull-quote */}
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
          {active.body}
        </p>

        {/* Supporting paragraph — the scope of the capability, in prose */}
        <p className="t-body" style={{ marginBottom: "2.5rem", maxWidth: "36rem" }}>
          {active.detail}
        </p>

        <Link href="/book" className="cap-tab-link">
          Book a Consultation <ArrowRight size={13} />
        </Link>
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
        @media(max-width:900px){
          .cap-tabs-grid{ grid-template-columns: 1fr !important; gap: 2rem !important; }
          .cap-tabs-nav{ flex-direction: row !important; flex-wrap: wrap; gap: 0.75rem 1.5rem !important; }
        }
      `}</style>
    </div>
  );
}
