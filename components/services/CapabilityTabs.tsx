"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type Capability = {
  id: string;
  number: string;
  label: string;
  body: string;
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
              className="cap-tab-btn"
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
        <span className="t-label" style={{ marginBottom: "0.75rem", display: "block" }}>{active.number}</span>
        <p className="t-body" style={{ marginBottom: "1.75rem", maxWidth: "38rem" }}>{active.body}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2rem" }}>
          {active.items.map((item) => (
            <span
              key={item}
              style={{
                fontSize: "0.75rem",
                padding: "0.5rem 0.9rem",
                borderRadius: "100px",
                border: "1px solid rgba(14,61,50,0.16)",
                color: "var(--c-forest)",
              }}
            >
              {item}
            </span>
          ))}
        </div>

        <Link href="/book" className="btn-primary">
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
          gap: 1.1rem;
        }
        .cap-tab-btn{
          display:inline-block;
          text-align:left;
          background:none;
          border:none;
          padding:0;
          cursor:pointer;
          width:fit-content;
        }
        .cap-tab-underline{
          display:block;
          height:1px;
          width:0;
          background: var(--c-forest);
          margin-top: 0.35rem;
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
        @media(max-width:900px){
          .cap-tabs-grid{ grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  );
}
