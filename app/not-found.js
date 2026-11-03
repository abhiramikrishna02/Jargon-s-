import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Founderverse",
  description: "The page you’re looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-1 items-center justify-center overflow-hidden bg-[#fafaf7] px-5 py-16 text-[#080808]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(8,8,8,.05)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[#a2bd2d]/20 blur-3xl" />
      <section className="w-full max-w-2xl rounded-[28px] border border-[#080808]/10 bg-white/90 p-7 text-center shadow-[0_40px_90px_-55px_rgba(8,8,8,0.5)] backdrop-blur sm:p-12">
        <p className="font-black text-[clamp(5rem,20vw,10rem)] leading-[0.85] tracking-[-0.08em] text-[#080808]">404<span className="text-[#a2bd2d]">.</span></p>
        <h1 className="mt-7 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">This page isn’t here.</h1>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[#141414]/70 sm:text-lg">The link may be outdated, or the address may have been entered incorrectly.</p>
        <Link href="/" className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#a2bd2d] px-7 py-3 text-sm font-bold uppercase tracking-[0.1em] text-[#080808] shadow-[0_14px_36px_-14px_rgba(120,145,20,0.75)] transition hover:-translate-y-0.5 hover:bg-[#080808] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#080808]">
          Back to Founderverse
          <span aria-hidden="true" className="text-lg leading-none">→</span>
        </Link>
      </section>
    </main>
  );
}
