const Footer = ({ navItems, year, privacyUrl, termsUrl }) => {
  const legalLink = (label, url) => url ? <a href={url} className="hover:text-[#080808]">{label}</a> : null;

  return (
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
            {navItems.map(([label, href]) => <li key={href}><a href={href} className="transition hover:text-[#080808]">{label}</a></li>)}
          </ul>
        </nav>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#141414]/50">Get the book</h2>
          <p className="mt-4 text-sm leading-relaxed text-[#141414]/70">Keep a clear, organised business reference close whenever a new term comes up.</p>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-[#080808]/10 pt-5 text-xs text-[#141414]/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year ?? ""} Jargons. All rights reserved.</p>
        <div className="flex gap-5">{legalLink("Privacy Policy", privacyUrl)}{legalLink("Terms & Conditions", termsUrl)}</div>
      </div>
    </footer>
  );
};

export default Footer;
