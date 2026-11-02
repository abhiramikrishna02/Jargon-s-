"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const Menu = (props) => <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...props}><path d="M4 6h16M4 12h16M4 18h16" /></svg>;
const X = (props) => <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...props}><path d="m18 6-12 12M6 6l12 12" /></svg>;
const ArrowRight = ({ size = 24, ...props }) => <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M5 12h14M12 5l7 7-7 7" /></svg>;

/* ───────── CENTRAL CONFIG — edit these when real details exist ───────── */
const CONFIG = {
  purchaseUrl: "", // e.g. "https://your-checkout-link" — empty = CTAs scroll to #buy
  previewUrl: "", // e.g. link to a sample PDF — empty = "See the book preview" scrolls to #inside
  price: "₹299",
  bookImage: "/book.png",
  privacyUrl: "", // add when the page exists
  termsUrl: "",
};
const buyHref = CONFIG.purchaseUrl || "#buy";
const buyProps = CONFIG.purchaseUrl ? { target: "_blank", rel: "noopener noreferrer" } : {};
const previewHref = CONFIG.previewUrl || "#inside";
const previewProps = CONFIG.previewUrl ? { target: "_blank", rel: "noopener noreferrer" } : {};

/* ───────── APPROVED CONTENT ───────── */
const NAV = [
  ["The Book", "#book"],
  ["What's Inside", "#inside"],
  ["Author", "#about"],
  ["FAQ", "#faq"],
];
const JARGON = ["CAC", "MVP", "EBITDA", "Burn rate"];
const CHAPTERS = [
  ["Start", "Business models. Bootstrapping. Pivots."],
  ["Understand your market", "Customer discovery. Validation. Market sizing."],
  ["Build", "MVPs. Product-market fit. Iteration."],
  ["Get attention", "Positioning. Branding. Marketing."],
  ["Make sales", "Funnels. Conversion. Retention."],
  ["Understand the money", "Profit. Cash flow. Unit economics."],
  ["Raise funding", "Valuation. Equity. Dilution."],
  ["Run the business", "KPIs. Systems. Operations."],
];
const INSIDE = [
  "200 business concepts",
  "8 structured chapters · 98 pages",
  "Practical examples, diagrams and calculations",
  "Alphabetical index and clickable navigation",
  "Further-reading links",
];
const FAQ = [
  ["New to business?", "You can start here. No prior business experience is required."],
  ["Is this a course?", "No. It's a digital reference book you can read through or look up as needed."],
  ["What will I receive?", "The complete 98-page PDF containing all 200 terms."],
  ["Will it make me an expert?", "No. It helps you understand the concepts. Expertise takes practice and experience."],
];

/* ───────── icons (restrained line icons) ───────── */
const ICONS = {
  bulb: "M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z",
  coin: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM14.5 9c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 5.5V7M12 17v1.5",
  target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 11.5v1",
  cube: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5",
  megaphone: "M3 11v2a1 1 0 0 0 1 1h3l8 4V6L7 10H4a1 1 0 0 0-1 1zM19 9a4 4 0 0 1 0 6",
  cart: "M3 4h2l2.5 11h10L20 7H6M9 20h.01M17 20h.01",
  pie: "M12 3v9h9A9 9 0 1 1 12 3zM15 3.5A9 9 0 0 1 20.5 9H15V3.5z",
  gear: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2",
};
const CH_ICONS = ["bulb", "target", "cube", "megaphone", "cart", "coin", "pie", "gear"];
const Svg = ({ n, className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}><path d={ICONS[n]} /></svg>
);

/* ───────── small pieces ───────── */
const Cta = ({ children, secondary, tone, href = buyHref, className = "", ...rest }) => {
  const look = secondary
    ? "border border-[#080808]/20 bg-white/60 text-[#080808] backdrop-blur hover:border-[#080808] hover:bg-[#080808] hover:text-white"
    : tone === "dark"
      ? "bg-[#a2bd2d] text-[#080808] shadow-[0_14px_36px_-12px_rgba(162,189,45,0.85),inset_0_1px_0_rgba(255,255,255,0.45)] hover:bg-white"
      : tone === "ink"
        ? "bg-[#080808] text-white shadow-[0_18px_40px_-16px_rgba(8,8,8,0.8)] hover:bg-white hover:text-[#080808]"
        : "bg-[#a2bd2d] text-[#080808] shadow-[0_14px_36px_-14px_rgba(120,145,20,0.85),inset_0_1px_0_rgba(255,255,255,0.45)] hover:bg-[#080808] hover:text-white";
  return (
    <a
      href={href}
      {...(href === buyHref ? buyProps : {})}
      {...rest}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.1em] transition duration-300 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#080808] ${look} ${className}`}
    >
      {children}
    </a>
  );
};

/* Arrow in a small circle, used inside buttons */
const Arr = ({ ink }) => (
  <span aria-hidden="true" className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition duration-300 group-hover:translate-x-0.5 ${ink ? "bg-[#a2bd2d] text-[#080808] group-hover:bg-[#080808] group-hover:text-white" : "bg-[#080808] text-[#a2bd2d] group-hover:bg-[#a2bd2d] group-hover:text-[#080808]"}`}>
    <ArrowRight size={14} />
  </span>
);

/* Scroll reveal — IntersectionObserver, disabled by CSS under prefers-reduced-motion */
const R = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`rv ${on ? "in" : ""} ${className}`}>{children}</div>;
};

/* Marker highlight sits BEHIND a single word and stays inside that word's own box, so it can never cover another line */
const Mark = ({ children }) => (
  <span className="relative isolate inline-block">
    <span aria-hidden="true" className="absolute inset-x-[-0.1em] bottom-[0.06em] -z-10 h-[0.42em] bg-[#FFE500]" />
    {children}
  </span>
);
const Em = ({ children }) => (
  <em className="italic underline decoration-[#a2bd2d] [text-decoration-thickness:0.07em] [text-underline-offset:0.16em]">{children}</em>
);

function BookImage({ priority = false, className = "" }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div role="img" aria-label="Founderverse book mockup placeholder" className="flex aspect-[3/4] w-full max-w-[420px] flex-col items-center justify-center border border-dashed border-[#a2bd2d]/60 bg-white p-6 text-center">
        <p className="f-d text-4xl text-[#080808]">BOOK MOCKUP</p>
        <p className="mt-2 text-sm text-[#141414]/70">Add your 3D mockup PNG at <code className="text-[#080808]">public/book.png</code></p>
      </div>
    );
  return (
    <Image
      src={CONFIG.bookImage}
      alt="Founderverse – 200 Industry Jargons Explained, 3D book mockup"
      width={720}
      height={900}
      priority={priority}
      onError={() => setFailed(true)}
      className={`h-auto w-full drop-shadow-[0_30px_36px_rgba(8,8,8,0.4)] ${className}`}
    />
  );
}

/* Keeps the book centered in a tight 4:5 space, with a soft glow (and optional ring) behind it. */
const Stage = ({ children, className = "", imgW = "w-[90%]", ring }) => (
  <div className={`relative mx-auto aspect-[4/5] w-full ${className}`}>
    <div aria-hidden="true" className="absolute inset-[10%] rounded-full bg-[#a2bd2d]/35 blur-3xl" />
    {ring && <div aria-hidden="true" className="absolute inset-[4%] rounded-full border border-[#080808]/10" />}
    {ring && <div aria-hidden="true" className="absolute inset-[16%] rounded-full border border-[#080808]/[0.07]" />}
    <div className="absolute inset-0 grid place-items-center"><div className={imgW}>{children}</div></div>
  </div>
);

/* ───────── layout helpers ───────── */
const Sec = ({ id, alt, dark, className = "", children }) => (
  <section id={id} className={`relative isolate ${dark ? "tex-d overflow-clip bg-[#080808] text-white" : alt ? "tex bg-[#DAE6A6]/25" : "tex bg-white"}`}>
    {dark && <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 -z-10 h-80 w-80 rounded-full bg-[#a2bd2d]/20 blur-3xl" />}
    {dark && <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 -z-10 h-72 w-72 rounded-full bg-[#a2bd2d]/10 blur-3xl" />}
    <div className={`mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16 ${className}`}>{children}</div>
  </section>
);
const H2 = ({ children, className = "", center, light, sm }) => (
  <h2 className={`f-s max-w-4xl ${sm ? "text-[clamp(1.8rem,3.4vw,2.8rem)]" : "text-[clamp(2rem,4.2vw,3.3rem)]"} ${center ? "mx-auto text-center" : ""} ${light ? "text-white" : "text-[#080808]"} ${className}`}>{children}</h2>
);
const H2Dot = ({ children, className = "" }) => (
  <h2 className={`f-s flex max-w-4xl items-start gap-3 text-[clamp(1.8rem,3.2vw,2.7rem)] text-[#080808] ${className}`}><span aria-hidden="true" className="mt-[0.5em] h-2.5 w-2.5 shrink-0 rounded-full bg-[#a2bd2d]" />{children}</h2>
);

const FaqItem = ({ q, a, i }) => {
  const [o, setO] = useState(false);
  return (
    <div className={`overflow-hidden rounded-2xl border transition duration-300 ${o ? "border-[#a2bd2d] bg-[#DAE6A6]/45 shadow-[0_18px_40px_-28px_rgba(8,8,8,0.35)]" : "border-[#080808]/10 bg-white hover:border-[#080808]/30"}`}>
      <h3>
        <button type="button" id={`faq-q-${i}`} aria-expanded={o} aria-controls={`faq-a-${i}`} onClick={() => setO(!o)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[17px] font-semibold leading-snug sm:px-6 sm:text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#080808]">
          {q}
          <span aria-hidden="true" className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#080808]/20 text-xl leading-none transition duration-300 ${o ? "rotate-45 border-[#080808] bg-[#080808] text-white" : "bg-white text-[#080808]"}`}>+</span>
        </button>
      </h3>
      <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className={`grid transition-[grid-template-rows] duration-300 ease-out ${o ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden"><p className="px-5 pb-5 text-[17px] leading-[1.65] text-[#141414]/80 sm:px-6">{a}</p></div>
      </div>
    </div>
  );
};

/* ───────── page ───────── */
const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
    const on = () => { setScrolled(window.scrollY > 24); setSticky(window.scrollY > 700); };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const legal = (label, url) => url ? <a href={url} className="hover:text-[#080808]">{label}</a> : <span title="Add URL in CONFIG">{label}</span>;

  return (
    <div className="relative overflow-x-clip bg-white font-[Inter,DM_Sans,sans-serif] text-[#080808] antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        html{scroll-behavior:smooth}
        .f-d{font-family:Anton,'Barlow Condensed',Impact,sans-serif;letter-spacing:.01em;line-height:1.05;font-weight:400}
        .f-s{font-family:Fraunces,Georgia,'Times New Roman',serif;font-weight:600;letter-spacing:-.02em;line-height:1.1;font-optical-sizing:auto}
        .tex{background-image:radial-gradient(rgba(8,8,8,.05) 1px,transparent 1px);background-size:24px 24px}
        .tex-d{background-image:radial-gradient(rgba(255,255,255,.07) 1px,transparent 1px);background-size:24px 24px}
        section[id]{scroll-margin-top:84px}
        .rv{opacity:0;transform:translateY(16px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}
        .rv.in{opacity:1;transform:none}
        @media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.rv{opacity:1;transform:none;transition:none}*{transition:none!important}}
      `}</style>

      {/* NAVBAR — floating pill */}
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <div className="mx-auto max-w-6xl">
          <nav className={`flex h-14 items-center justify-between rounded-full border pl-5 pr-2 transition duration-300 sm:pl-6 ${scrolled || open ? "border-[#080808]/10 bg-white/80 shadow-[0_14px_40px_-22px_rgba(8,8,8,0.45)] backdrop-blur-xl" : "border-transparent bg-transparent"}`} aria-label="Main">
            <a href="#top" className="f-d text-xl sm:text-2xl">FOUNDERVERSE</a>
            <ul className="hidden items-center gap-7 lg:flex">
              {NAV.map(([l, h]) => (<li key={h}><a href={h} className="text-sm font-medium text-[#141414]/75 transition hover:text-[#080808]">{l}</a></li>))}
              <li><Cta className="!min-h-10 !px-5 !py-2 !text-xs">Get the Book · {CONFIG.price}</Cta></li>
            </ul>
            <button className="grid h-10 w-10 place-items-center rounded-full lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
          </nav>
          {open && (
            <div className="mt-2 rounded-3xl border border-[#080808]/10 bg-white p-5 shadow-[0_24px_60px_-30px_rgba(8,8,8,0.5)] lg:hidden">
              <ul>{NAV.map(([l, h]) => (<li key={h}><a href={h} onClick={() => setOpen(false)} className="block border-b border-[#080808]/10 py-4 text-lg font-medium">{l}</a></li>))}</ul>
              <Cta onClick={() => setOpen(false)} className="mt-5 w-full">Get the Book · {CONFIG.price}</Cta>
            </div>
          )}
        </div>
      </header>

      <main id="top" className="relative">
        {/* 1 · HERO */}
        <section id="book" className="tex relative isolate overflow-hidden bg-white pb-12 pt-24 md:pb-16 md:pt-28">
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-8 -z-10 h-[460px] w-[460px] rounded-full bg-[#a2bd2d]/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[360px] w-[360px] rounded-full bg-[#FFE500]/20 blur-3xl" />
          <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 md:px-8 lg:grid-cols-[.95fr_1.05fr] lg:gap-10">
            <R className="relative">
              <Stage ring className="max-w-[290px] sm:max-w-[380px] lg:max-w-[470px]"><BookImage priority /></Stage>
            </R>
            <R delay={120}>
              <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#080808]/10 bg-white/80 px-4 py-2 text-[11px] font-semibold leading-snug tracking-[0.18em] shadow-[0_10px_30px_-20px_rgba(8,8,8,0.4)] backdrop-blur sm:text-xs"><span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#a2bd2d]" />FOUNDERVERSE · BY HASHIR USMAN</p>
              <h1 className="f-s text-[clamp(2.5rem,5.6vw,4.8rem)]" style={{ lineHeight: 1.03 }}>You want to understand <Mark>business.</Mark></h1>
              <p className="mt-4 text-xl font-semibold leading-snug sm:text-2xl">Start by understanding what everyone is talking about.</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Examples of business jargon">
                {JARGON.map((j) => (<li key={j} className="rounded-full border border-[#080808]/15 bg-white px-3.5 py-1.5 text-sm font-semibold text-[#080808] shadow-[0_6px_16px_-10px_rgba(8,8,8,0.35)]">{j}.</li>))}
              </ul>
              <p className="f-s mt-5 text-xl !leading-snug text-[#080808] sm:text-2xl">Understand the ideas behind the terms.</p>
              <p className="mt-2 max-w-xl text-[17px] leading-[1.65] text-[#141414]/80 sm:text-lg">200 essential business concepts, explained through simple language and practical examples.</p>
              <div className="mt-6 inline-grid grid-cols-3 divide-x divide-[#080808]/10 rounded-2xl border border-[#080808]/10 bg-white/85 py-3 shadow-[0_18px_40px_-28px_rgba(8,8,8,0.45)] backdrop-blur">
                {[["200", "terms"], ["8", "chapters"], ["98", "pages"]].map(([n, l]) => (<div key={l} className="px-5"><p className="f-d inline-block border-b-4 border-[#FFE500] text-3xl sm:text-4xl">{n}</p><p className="mt-1 text-sm text-[#141414]/75">{l}</p></div>))}
              </div>
              <div className="mt-6">
                <Cta>GET THE BOOK — {CONFIG.price} <Arr /></Cta>
              </div>
              <p className="mt-3 text-sm text-[#141414]/75">One-time purchase · Digital PDF</p>
            </R>
          </div>
        </section>

        {/* 2 · STOP LOOKING UP WORDS */}
        <Sec alt>
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_.8fr] lg:gap-12">
            <R>
              <H2>Stop looking up words. <Em>Start connecting ideas.</Em></H2>
              <div className="mt-6 space-y-3 text-[17px] leading-[1.7] text-[#141414]/80 sm:text-[18px]">
                <p>You search for one term. The explanation introduces three more.</p>
                <p><strong className="font-semibold text-[#080808]">200 Industry Jargons Explained</strong> gives you one organised place to start—and a reference to return to.</p>
              </div>
            </R>
            <R delay={120}>
              <Stage className="max-w-[270px] -rotate-3 transition duration-500 hover:rotate-0"><BookImage /></Stage>
            </R>
          </div>
        </Sec>

        {/* 3 · EXAMPLE */}
        <Sec>
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
            <R className="lg:sticky lg:top-28 lg:self-start">
              <H2>Here's what <Em>understanding</Em> looks like.</H2>
              <div className="mt-6 hidden lg:block">
                <Cta secondary href={previewHref} {...previewProps}>SEE THE BOOK PREVIEW</Cta>
              </div>
            </R>
            <R delay={100}>
              <article className="relative overflow-hidden rounded-[28px] border border-[#080808]/10 bg-white shadow-[0_40px_80px_-48px_rgba(8,8,8,0.6)]">
                <div className="relative overflow-hidden bg-[#080808] px-6 py-5 text-white md:px-8 md:py-6">
                  <div aria-hidden="true" className="absolute -right-10 -top-16 h-44 w-44 rounded-full bg-[#a2bd2d]/30 blur-2xl" />
                  <div aria-hidden="true" className="absolute -right-6 -top-10 h-32 w-32 rounded-full border border-white/15" />
                  <h3 className="f-d relative text-4xl sm:text-5xl">CAC</h3>
                  <p className="relative mt-2 text-lg font-semibold text-[#DAE6A6]">Customer Acquisition Cost</p>
                </div>
                <div className="p-6 md:p-8">
                  <p className="f-s text-2xl !leading-snug text-[#080808] sm:text-3xl">₹10,000 spent ÷ 100 customers = <Mark>₹100 CAC</Mark></p>
                  <p className="mt-4 text-[17px] leading-[1.65] text-[#141414]/80">That's what acquiring each customer costs.</p>
                  <p className="mt-3 text-[17px] leading-[1.65] text-[#141414]/80">Now you can ask the useful question:</p>
                  <p className="f-s mt-3 rounded-2xl border border-[#a2bd2d]/40 bg-[#DAE6A6]/55 p-5 text-lg !leading-snug text-[#080808]">“Does that cost make sense for my business?”</p>
                  <p className="mt-5 border-t border-[#080808]/10 pt-4 text-base italic leading-[1.65] text-[#141414]/80">The abbreviation is the starting point. The business thinking is what matters.</p>
                </div>
              </article>
              <div className="mt-6 lg:hidden">
                <Cta secondary href={previewHref} {...previewProps}>SEE THE BOOK PREVIEW</Cta>
              </div>
            </R>
          </div>
        </Sec>

        {/* 4 · CHAPTERS */}
        <Sec id="inside" dark>
          <div className="grid items-end gap-4 lg:grid-cols-[1.2fr_.8fr] lg:gap-12">
            <R><H2 light>The language behind <Em>every part of a business.</Em></H2></R>
            <R delay={100}><p className="f-s text-xl !leading-snug text-[#DAE6A6] sm:text-2xl lg:text-right">One term when you need it. One chapter when you're curious.</p></R>
          </div>
          <R delay={100}>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
              {CHAPTERS.map(([t, d], i) => (
                <li key={t} className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#a2bd2d] hover:bg-[#a2bd2d] hover:shadow-[0_30px_60px_-30px_rgba(162,189,45,0.6)] md:p-6">
                  <div className="flex items-start justify-between">
                    <span className="f-d text-5xl leading-none text-transparent transition-all duration-300 [-webkit-text-stroke:1.5px_rgba(255,255,255,0.4)] group-hover:[-webkit-text-stroke-color:#080808]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-[#DAE6A6] transition duration-300 group-hover:bg-[#080808] group-hover:text-[#a2bd2d]"><Svg n={CH_ICONS[i]} className="w-5" /></span>
                  </div>
                  <h3 className="f-s mt-5 text-xl !leading-tight text-white transition-colors duration-300 group-hover:text-[#080808]">{t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#B8B8B8] transition-colors duration-300 group-hover:text-[#080808]/80">{d}</p>
                </li>
              ))}
            </ol>
          </R>
        </Sec>

        {/* 5 · ABOUT / AUTHOR */}
        <Sec id="about">
          <R>
            <div className="relative overflow-hidden rounded-[28px] border border-[#080808]/10 bg-gradient-to-br from-white via-white to-[#DAE6A6]/40 p-6 shadow-[0_40px_80px_-50px_rgba(8,8,8,0.55)] md:p-10">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#a2bd2d] via-[#FFE500] to-[#a2bd2d]" />
              <div className="relative grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
                <H2 sm>You can Google the terms. <Em>This puts them together.</Em></H2>
                <div className="space-y-3 border-[#080808]/10 text-[17px] leading-[1.7] text-[#141414]/80 sm:text-[18px] lg:border-l lg:pl-10">
                  <p>Clear explanations. Practical examples. A consistent structure.</p>
                  <p>Written by <strong className="font-semibold text-[#080808]">Hashir Usman</strong>, whose work spans venture development, business strategy, brand building and operations.</p>
                  <p className="f-s !leading-snug text-xl text-[#080808] sm:text-2xl">For people who want to understand business—not just recognise the vocabulary.</p>
                </div>
              </div>
            </div>
          </R>
        </Sec>

        {/* 6 · PURCHASE */}
        <Sec id="buy" alt>
          <R>
            <div className="relative grid items-center gap-6 overflow-hidden rounded-[28px] bg-[#080808] p-6 text-white shadow-[0_40px_90px_-40px_rgba(8,8,8,0.75)] md:p-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-12 lg:p-12">
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#a2bd2d]/20 blur-3xl" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full border border-white/10" />
              <Stage className="max-w-[270px]"><BookImage /></Stage>
              <div className="relative">
                <h2 className="f-s text-[clamp(1.9rem,3.8vw,3rem)]">A clearer starting point. <span className="inline-block bg-[#FFE500] px-2 text-[#080808]">{CONFIG.price}</span></h2>
                <p className="mt-3 text-xl font-semibold text-[#DAE6A6]">200 Industry Jargons Explained</p>
                <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {INSIDE.map((t) => (<li key={t} className="flex items-start gap-3 text-[16px] leading-snug text-white"><span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#a2bd2d] text-xs font-bold text-[#080808]">✓</span>{t}</li>))}
                </ul>
                <div className="mt-6 border-t border-white/15 pt-5">
                  <Cta tone="dark" className="w-full sm:w-auto">GET THE COMPLETE BOOK — {CONFIG.price} <Arr /></Cta>
                  <p className="mt-3 text-sm text-[#B8B8B8]">Digital PDF · One-time purchase · No subscription</p>
                </div>
              </div>
            </div>
          </R>
        </Sec>

        {/* 7 · FAQ */}
        <Sec id="faq">
          <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
            <R className="lg:sticky lg:top-28 lg:self-start"><H2Dot>A few things before you buy.</H2Dot></R>
            <R delay={100}><div className="space-y-2.5">{FAQ.map(([q, a], i) => (<FaqItem key={q} q={q} a={a} i={i} />))}</div></R>
          </div>
        </Sec>

        {/* 8 · FINAL CTA */}
        <section className="bg-white px-3 pb-12 sm:px-5 md:pb-16">
          <R>
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#a2bd2d] px-6 py-12 text-center shadow-[0_40px_90px_-50px_rgba(120,145,20,0.9)] md:px-12 md:py-16">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.28),transparent_60%)]" />
              <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-[#080808]/15" />
              <div aria-hidden="true" className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full border border-[#080808]/10" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full border border-[#080808]/15" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-4 h-48 w-48 rounded-full border border-[#080808]/10" />
              <div className="relative">
                <h2 className="f-s mx-auto max-w-4xl text-[clamp(2.1rem,5vw,4rem)]">Understand more of the next business <Mark>conversation.</Mark></h2>
                <div className="mt-7"><Cta tone="ink">GET THE BOOK — {CONFIG.price} <Arr ink /></Cta></div>
              </div>
            </div>
          </R>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#080808]/10 bg-[#fafaf7] px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_.8fr_.8fr] md:gap-12">
          <div>
            <a href="#top" className="f-d text-3xl tracking-wide">JARGONS</a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#141414]/70">A practical guide to understanding the language of business, one clear explanation at a time.</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#141414]/55">Digital PDF · 200 terms · 8 chapters</p>
          </div>
          <nav aria-label="Footer navigation">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#141414]/50">Explore</h2>
            <ul className="mt-4 space-y-3 text-sm text-[#141414]/75">
              {NAV.map(([label, href]) => (<li key={href}><a href={href} className="transition hover:text-[#080808]">{label}</a></li>))}
            </ul>
          </nav>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#141414]/50">Get the book</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#141414]/70">Keep a clear, organised business reference close whenever a new term comes up.</p>
            <Cta className="mt-5 !min-h-11 !px-5 !py-2.5 !text-xs">Get the Book · {CONFIG.price} <Arr /></Cta>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-[#080808]/10 pt-5 text-xs text-[#141414]/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year ?? ""} Jargons. All rights reserved.</p>
          <div className="flex gap-5">{CONFIG.privacyUrl && legal("Privacy Policy", CONFIG.privacyUrl)}{CONFIG.termsUrl && legal("Terms & Conditions", CONFIG.termsUrl)}</div>
        </div>
      </footer>

      {/* FIXED DESKTOP BUY BUTTON */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <Cta className="shadow-[0_16px_40px_-12px_rgba(8,8,8,0.45)]">Get the Book · {CONFIG.price} <Arr /></Cta>
      </div>

      {/* STICKY MOBILE BUY BAR */}
      <div className={`fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-3 rounded-2xl bg-[#080808]/95 px-4 py-3 text-white shadow-[0_20px_50px_-15px_rgba(8,8,8,0.7)] backdrop-blur transition-transform duration-300 md:hidden ${sticky ? "translate-y-0" : "translate-y-[150%]"}`}>
        <div><p className="f-d"><span className="inline-block bg-[#FFE500] px-1.5 text-3xl text-[#080808]">{CONFIG.price}</span></p><p className="mt-1 text-[11px] text-[#B8B8B8]">One-time purchase · Digital PDF</p></div>
        <Cta tone="dark" className="!min-h-11 !px-5 !py-2 !text-xs">Get the Book</Cta>
      </div>
    </div>
  );
};

export default Home;
