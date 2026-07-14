"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

export type Capability = {
  id: string;
  number: string;
  label: string;
  body: string;
  items: string[];
};

export function CapabilityAccordion({ capabilities }: { capabilities: Capability[] }) {
  const [openId, setOpenId] = useState<string | null>(capabilities[0]?.id ?? null);

  return (
    <div>
      {capabilities.map((c) => {
        const isOpen = openId === c.id;
        return (
          <div
            key={c.id}
            id={c.id}
            style={{ scrollMarginTop: "6rem", borderBottom: "1px solid var(--c-border)" }}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : c.id)}
              aria-expanded={isOpen}
              aria-controls={`${c.id}-panel`}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                padding: "1.75rem 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span className="t-label" style={{ minWidth: "2.25rem", flexShrink: 0 }}>{c.number}</span>
              <h2
                className="t-display t-display-md"
                style={{ margin: 0, flex: 1, color: isOpen ? "var(--c-forest)" : "inherit" }}
              >
                {c.label}
              </h2>
              <Plus
                size={20}
                style={{
                  flexShrink: 0,
                  color: "var(--c-forest)",
                  transition: "transform 0.25s ease",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              />
            </button>

            <div
              id={`${c.id}-panel`}
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.3s ease",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <div
                  className="capability-panel-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 3fr",
                    gap: "4rem",
                    paddingBottom: "2.75rem",
                    paddingLeft: "3.75rem",
                  }}
                >
                  <div>
                    <p className="t-body" style={{ marginBottom: "1.5rem" }}>{c.body}</p>
                    <Link href="/book" className="btn-primary">
                      Book a Consultation <ArrowRight size={13} />
                    </Link>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignContent: "flex-start" }}>
                    {c.items.map((item) => (
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
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        @media(max-width:768px){
          .capability-panel-grid{grid-template-columns:1fr !important; gap:1.25rem !important; padding-left:0 !important;}
        }
      `}</style>
    </div>
  );
}
