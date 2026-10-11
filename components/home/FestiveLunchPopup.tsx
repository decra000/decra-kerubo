"use client";

import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";

type RSVP = { name: string; email: string; phone: string; dietary: string };

const emptyRSVP: RSVP = { name: "", email: "", phone: "", dietary: "" };

export function FestiveLunchPopup() {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyRSVP);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("festive-lunch-seen")) return;
    const timer = window.setTimeout(() => setOpen(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("festive-lunch-seen", "1");
    setOpen(false);
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: "Festive lunch RSVP",
          message: `I'd love to join you for festive lunch with four other friends!\nPhone: ${form.phone.trim()}\nDietary notes: ${form.dietary.trim() || "None shared"}`,
        }),
      });
      if (!response.ok) throw new Error("Please try again in a moment.");
      setSent(true);
      sessionStorage.setItem("festive-lunch-seen", "1");
    } catch {
      setError("Your RSVP didn’t go through. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="presentation"
      onMouseDown={event => { if (event.target === event.currentTarget) dismiss(); }}
      className="festive-lunch-screen"
    >
      <section role="dialog" aria-modal="true" aria-labelledby="festive-lunch-title" className="festive-lunch-dialog">
        <button type="button" onClick={dismiss} aria-label="Close invitation" className="festive-lunch-close"><X size={19} /></button>
        <div className="festive-lunch-frame" aria-hidden="true" />
        <div className="festive-lunch-inner">
          <div className="festive-lunch-copy">
            <p className="festive-lunch-kicker"><span>✦</span> A festive invitation <span>✦</span></p>
            <p className="festive-lunch-eyebrow">DECEMBER · GOOD FOOD · GOOD COMPANY</p>
            <h2 id="festive-lunch-title">A seat at my table<br /><em>would be lovely.</em></h2>
            <p className="festive-lunch-message">Hey, want to have lunch with me this festive season? I’m hosting a cosy afternoon at my place with four other friends. Good food, easy conversation, and no pressure at all. I’d love to see you there.</p>
            <div className="festive-lunch-rule"><span /> <span className="festive-lunch-diamond">◆</span> <span /></div>
            <p className="festive-lunch-note">A small table. A long lunch. Room for you.</p>
          </div>

          <div className="festive-lunch-action">
            <p className="festive-lunch-action-label">THE GATHERING</p>
            <p className="festive-lunch-seat">04 <span>friends invited</span></p>
            <p className="festive-lunch-action-copy">Just a few friends around the table this festive season.</p>

        {sent ? (
          <div role="status" className="festive-lunch-success">
            <p className="festive-lunch-success-title">You’re on the list.</p>
            <p className="festive-lunch-success-copy">I’ll be in touch with the details soon. Can’t wait to see you.</p>
            <button type="button" onClick={dismiss} className="festive-lunch-submit">Close invitation</button>
          </div>
        ) : showForm ? (
          <form onSubmit={submit} className="festive-lunch-form">
            <label>Your name<input required autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
            <label>Email address<input required type="email" autoComplete="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
            <label>Phone number<input required type="tel" autoComplete="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></label>
            <label>Dietary needs <span>(optional)</span><input value={form.dietary} onChange={e => setForm({ ...form, dietary: e.target.value })} /></label>
            {error && <p role="alert" className="festive-lunch-error">{error}</p>}
            <button disabled={sending} type="submit" className="festive-lunch-submit">{sending ? "Sending your RSVP…" : "Send my RSVP"}<span>↗</span></button>
            <button type="button" onClick={() => setShowForm(false)} className="festive-lunch-back">Back to invitation</button>
          </form>
        ) : (
          <div className="festive-lunch-buttons">
            <button type="button" onClick={() => setShowForm(true)} className="festive-lunch-submit">I’d love to come<span>↗</span></button>
            <button type="button" onClick={dismiss} className="festive-lunch-decline">Maybe another time</button>
            <p>Your details are only used to follow up about lunch.</p>
          </div>
        )}
          </div>
        </div>
        <p className="festive-lunch-footer">WITH WARMTH &amp; GOOD COMPANY <span>·</span> NAIROBI</p>
      </section>
      <style>{`
        .festive-lunch-screen { position:fixed; inset:0; z-index:10000; width:100vw; height:100vh; height:100dvh; overflow:auto; background:#050706; color:#eee9dc; }
        .festive-lunch-dialog { position:relative; display:flex; align-items:center; justify-content:center; box-sizing:border-box; min-height:100%; width:100%; padding:clamp(4.5rem,9vh,7rem) clamp(1.25rem,7vw,7.5rem); background:radial-gradient(ellipse at 19% 23%,rgba(62,75,57,.18),transparent 44%),radial-gradient(ellipse at 83% 82%,rgba(105,80,39,.11),transparent 36%),#050706; }
        .festive-lunch-frame { position:absolute; inset:16px; border:1px solid rgba(190,163,105,.38); pointer-events:none; }
        .festive-lunch-frame::after { content:''; position:absolute; inset:6px; border:1px solid rgba(190,163,105,.09); }
        .festive-lunch-close { position:absolute; z-index:2; top:clamp(2rem,5vh,3.5rem); right:clamp(2rem,5vw,5rem); display:grid; place-items:center; width:44px; height:44px; border:1px solid rgba(190,163,105,.45); border-radius:50%; color:#d7c69e; background:transparent; cursor:pointer; transition:background .2s,color .2s; }
        .festive-lunch-close:hover { background:#c2a46a; color:#080a08; }
        .festive-lunch-inner { position:relative; z-index:1; display:grid; grid-template-columns:minmax(0,1.1fr) minmax(310px,.72fr); align-items:center; gap:clamp(3rem,9vw,9rem); width:min(100%,1160px); margin:0 auto; }
        .festive-lunch-copy { max-width:650px; }
        .festive-lunch-kicker,.festive-lunch-eyebrow,.festive-lunch-action-label,.festive-lunch-footer { color:#c2a46a; font:700 .62rem/1.4 var(--font-manjari); letter-spacing:.22em; text-transform:uppercase; }
        .festive-lunch-kicker { display:flex; align-items:center; gap:.7rem; margin:0 0 2.7rem; }
        .festive-lunch-kicker span { font-size:.75rem; }
        .festive-lunch-eyebrow { margin:0 0 1.2rem; color:#8b8c7e; font-size:.55rem; letter-spacing:.19em; }
        .festive-lunch-copy h2 { margin:0; color:#f0ede5; font:400 clamp(2.8rem,6vw,5.6rem)/.99 var(--font-serif); letter-spacing:-.035em; }
        .festive-lunch-copy h2 em { color:#cbb889; font-weight:400; }
        .festive-lunch-message { max-width:34rem; margin:1.7rem 0 0; color:#b7b8ae; font:400 clamp(.9rem,1.2vw,1rem)/1.9 var(--font-sans); }
        .festive-lunch-rule { display:flex; align-items:center; gap:.7rem; width:min(190px,45%); margin:2rem 0 1rem; color:#c2a46a; }
        .festive-lunch-rule span:not(.festive-lunch-diamond) { height:1px; flex:1; background:rgba(194,164,106,.42); }
        .festive-lunch-diamond { font-size:.52rem; }
        .festive-lunch-note { margin:0; color:#d5d0c1; font:italic 1rem/1.6 var(--font-serif); }
        .festive-lunch-action { padding:clamp(1.5rem,3vw,2.5rem); border:1px solid rgba(194,164,106,.28); background:linear-gradient(145deg,rgba(255,255,255,.035),rgba(255,255,255,.008)); box-shadow:0 20px 80px rgba(0,0,0,.2); }
        .festive-lunch-action-label { margin:0 0 1.1rem; color:#9a8a66; font-size:.55rem; }
        .festive-lunch-seat { margin:0; color:#e8e0ce; font:400 clamp(2.2rem,4vw,3.3rem)/1 var(--font-serif); }
        .festive-lunch-seat span { color:#8f8c7d; font:400 .7rem var(--font-sans); }
        .festive-lunch-action-copy { margin:.75rem 0 1.5rem; color:#a9aaa0; font:400 .78rem/1.7 var(--font-sans); }
        .festive-lunch-buttons,.festive-lunch-form { display:grid; gap:.8rem; }
        .festive-lunch-form label { display:grid; gap:.4rem; color:#d4d0c5; font:600 .67rem/1.4 var(--font-sans); }
        .festive-lunch-form label span { display:inline; color:#85877f; font-weight:400; }
        .festive-lunch-form input { box-sizing:border-box; width:100%; min-height:44px; padding:.7rem .8rem; border:1px solid #45463d; border-radius:0; outline-color:#c2a46a; background:#0b0e0c; color:#f2efe6; font:400 .85rem var(--font-sans); }
        .festive-lunch-form input:focus { border-color:#c2a46a; }
        .festive-lunch-submit { display:flex; align-items:center; justify-content:space-between; width:100%; min-height:52px; padding:.9rem 1rem; border:1px solid #c2a46a; background:#c2a46a; color:#11130f; cursor:pointer; font:700 .66rem var(--font-manjari); letter-spacing:.12em; text-transform:uppercase; transition:background .2s,color .2s; }
        .festive-lunch-submit:hover { background:#d2bd8b; }
        .festive-lunch-submit:disabled { opacity:.65; cursor:wait; }
        .festive-lunch-decline,.festive-lunch-back { min-height:42px; border:1px solid rgba(220,216,204,.22); background:transparent; color:#b7b8ae; cursor:pointer; font:600 .62rem var(--font-manjari); letter-spacing:.1em; text-transform:uppercase; }
        .festive-lunch-decline:hover,.festive-lunch-back:hover { border-color:#c2a46a; color:#e8e0ce; }
        .festive-lunch-buttons p { margin:.25rem 0 0; color:#898b82; text-align:center; font:400 .65rem/1.5 var(--font-sans); }
        .festive-lunch-error { margin:0; color:#e58b7e; font:400 .78rem/1.5 var(--font-sans); }
        .festive-lunch-success { padding:1.1rem; border-left:2px solid #c2a46a; background:rgba(194,164,106,.08); }
        .festive-lunch-success-title { margin:0 0 .4rem; color:#e9dfc7; font:400 1.45rem var(--font-serif); }
        .festive-lunch-success-copy { margin:0 0 1rem; color:#b7b8ae; font:400 .82rem/1.7 var(--font-sans); }
        .festive-lunch-footer { position:absolute; bottom:clamp(2rem,5vh,3.5rem); left:50%; transform:translateX(-50%); width:max-content; max-width:calc(100% - 4rem); margin:0; color:#85806f; text-align:center; font-size:.5rem; letter-spacing:.18em; }
        .festive-lunch-footer span { padding:0 .45rem; color:#c2a46a; }
        @media(max-width:760px) {
          .festive-lunch-dialog { align-items:flex-start; padding:6.5rem 1.5rem 5rem; }
          .festive-lunch-frame { inset:9px; }
          .festive-lunch-frame::after { inset:4px; }
          .festive-lunch-close { top:1.5rem; right:1.5rem; width:40px; height:40px; }
          .festive-lunch-inner { grid-template-columns:1fr; gap:2rem; width:min(100%,460px); }
          .festive-lunch-kicker { margin-bottom:1.8rem; }
          .festive-lunch-copy h2 { font-size:clamp(2.7rem,12vw,4.2rem); }
          .festive-lunch-message { margin-top:1rem; font-size:.88rem; }
          .festive-lunch-rule { margin:1.25rem 0 .7rem; }
          .festive-lunch-action { padding:1.2rem; }
          .festive-lunch-seat { font-size:2.3rem; }
          .festive-lunch-action-copy { margin:.5rem 0 1rem; }
          .festive-lunch-footer { bottom:1.5rem; font-size:.44rem; }
        }
        @media(max-height:700px) and (min-width:761px) {
          .festive-lunch-dialog { padding-top:4rem; padding-bottom:4rem; }
          .festive-lunch-kicker { margin-bottom:1.5rem; }
          .festive-lunch-copy h2 { font-size:clamp(2.5rem,5vw,4.5rem); }
          .festive-lunch-message { margin-top:1rem; }
        }
      `}</style>
    </div>
  );
}
