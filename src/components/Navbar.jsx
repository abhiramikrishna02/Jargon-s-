const Navbar = ({ navItems, price, buyHref, buyProps, scrolled, visible, open, setOpen }) => (
  <header className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-300 sm:px-5 ${visible || open ? "translate-y-0" : "-translate-y-full"}`}>
    <div className="mx-auto max-w-6xl">
      <nav className={`flex h-14 items-center justify-between rounded-full border pl-5 pr-2 transition duration-300 sm:pl-6 ${scrolled || open ? "border-[#080808]/10 bg-white/80 shadow-[0_14px_40px_-22px_rgba(8,8,8,0.45)] backdrop-blur-xl" : "border-transparent bg-transparent"}`} aria-label="Main">
        <a href="#top" className="f-d text-xl sm:text-2xl">FOUNDERVERSE</a>
        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map(([label, href]) => <li key={href}><a href={href} className="text-sm font-medium text-[#141414]/75 transition hover:text-[#080808]">{label}</a></li>)}
          <li><a href={buyHref} {...buyProps} className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#a2bd2d] px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#080808] transition hover:-translate-y-0.5 hover:bg-white">Get the Book · {price}</a></li>
        </ul>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-full lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m18 6-12 12M6 6l12 12" /></svg> : <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>}
        </button>
      </nav>
      {open && (
        <div className="mt-2 rounded-3xl border border-[#080808]/10 bg-white p-5 shadow-[0_24px_60px_-30px_rgba(8,8,8,0.5)] lg:hidden">
          <ul>{navItems.map(([label, href]) => <li key={href}><a href={href} onClick={() => setOpen(false)} className="block border-b border-[#080808]/10 py-4 text-lg font-medium">{label}</a></li>)}</ul>
          <a href={buyHref} {...buyProps} onClick={() => setOpen(false)} className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#a2bd2d] px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#080808] transition hover:bg-[#080808] hover:text-white">Get the Book · {price}</a>
        </div>
      )}
    </div>
  </header>
);

export default Navbar;
