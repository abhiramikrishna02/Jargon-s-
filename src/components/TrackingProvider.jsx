"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { isMetaPixelAllowed } from "../lib/meta-pixel-environment.mjs";

const PIXEL_ID = "2085787219477225";
const CONSENT_KEY = "founderverse_optional_tracking_consent";
// Set this to the exact production hostname(s), comma separated, in Vercel's
// Production environment. An empty or missing value keeps Pixel tracking off.
const PRODUCTION_HOSTNAME_ALLOWLIST = process.env.NEXT_PUBLIC_META_PIXEL_ALLOWED_HOSTNAMES || "";
const TrackingContext = createContext(null);

function getUtmParameters() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
      .map((key) => [key, params.get(key)])
      .filter(([, value]) => value),
  );
}

function initializePixel() {
  if (typeof window === "undefined") return;
  if (!isMetaPixelAllowed(window.location.hostname, PRODUCTION_HOSTNAME_ALLOWLIST)) return;

  const existing = window.fbq;
  if (existing?.__founderverseInitialized) return;

  if (existing) {
    const installedPixels = typeof existing.getState === "function"
      ? existing.getState()?.pixels ?? []
      : [];
    if (!installedPixels.some((pixel) => pixel.id === PIXEL_ID)) existing("init", PIXEL_ID);
    existing.__founderverseInitialized = true;
  } else {
    const fbq = function (...args) {
      if (fbq.callMethod) fbq.callMethod.apply(fbq, args);
      else fbq.queue.push(args);
    };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.__founderverseInitialized = true;
    window.fbq = fbq;
    window._fbq = fbq;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
    fbq("init", PIXEL_ID);
  }
}

export function useTracking() {
  const context = useContext(TrackingContext);
  if (!context) throw new Error("useTracking must be used inside TrackingProvider");
  return context;
}

export function TrackingProvider({ children }) {
  const pathname = usePathname();
  const [consent, setConsent] = useState("unknown");
  const [ready, setReady] = useState(false);
  const [utmParameters, setUtmParameters] = useState({});
  const lastPageView = useRef(null);

  useEffect(() => {
    try {
      const savedConsent = window.sessionStorage.getItem(CONSENT_KEY);
      if (savedConsent === "granted" || savedConsent === "denied") {
        setConsent(savedConsent);
        if (savedConsent === "granted") setUtmParameters(getUtmParameters());
      }
    } catch {
      // If storage is unavailable, ask again next load and keep optional tracking off by default.
    }
    setReady(true);
  }, []);

  const chooseConsent = useCallback((choice) => {
    setConsent(choice);
    setUtmParameters(choice === "granted" ? getUtmParameters() : {});
    try {
      window.sessionStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // Consent still applies for this page view if browser storage is unavailable.
    }
  }, []);

  const track = useCallback((eventName, parameters = {}, custom = false) => {
    if (consent !== "granted") return;
    if (typeof window === "undefined" || !isMetaPixelAllowed(window.location.hostname, PRODUCTION_HOSTNAME_ALLOWLIST)) return;
    initializePixel();
    const fbq = window.fbq;
    if (typeof fbq !== "function") return;
    const enrichedParameters = { ...parameters, ...utmParameters };
    fbq(custom ? "trackCustom" : "track", eventName, enrichedParameters);
  }, [consent, utmParameters]);

  useEffect(() => {
    if (consent !== "granted" || !pathname || lastPageView.current === pathname) return;
    if (!isMetaPixelAllowed(window.location.hostname, PRODUCTION_HOSTNAME_ALLOWLIST)) return;
    initializePixel();
    window.fbq("track", "PageView", utmParameters);
    lastPageView.current = pathname;
  }, [consent, pathname, utmParameters]);

  const contextValue = { consent, track };

  return (
    <TrackingContext.Provider value={contextValue}>
      {children}
      {ready && consent === "unknown" && <ConsentNotice onChoice={chooseConsent} />}
      {ready && consent !== "unknown" && <ConsentPreferences onChange={() => {
        setConsent("unknown");
        setUtmParameters({});
        try {
          window.sessionStorage.removeItem(CONSENT_KEY);
        } catch {
          // The next choice still applies to this visit when storage is unavailable.
        }
      }} />}
    </TrackingContext.Provider>
  );
}

function ConsentNotice({ onChoice }) {
  return (
    <aside aria-label="Privacy choices" className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border border-[#080808]/15 bg-white p-5 text-[#080808] shadow-[0_24px_70px_-28px_rgba(8,8,8,0.5)] sm:inset-x-5 sm:bottom-5">
      <p className="text-sm font-bold">Optional tracking — wording pending owner approval</p>
      <p className="mt-2 text-sm leading-relaxed text-[#141414]/75">
        Provisional copy: Allow optional analytics and advertising tracking to help us understand visits and interest in the ebook. If you allow it, Meta Pixel may collect information about your activity on this website. You can change this choice during this visit.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => onChoice("granted")} className="min-h-10 rounded-full bg-[#080808] px-5 text-sm font-semibold text-white">Allow optional tracking</button>
        <button type="button" onClick={() => onChoice("denied")} className="min-h-10 rounded-full border border-[#080808]/20 px-5 text-sm font-semibold">Reject optional tracking</button>
      </div>
    </aside>
  );
}

function ConsentPreferences({ onChange }) {
  return (
    <button type="button" onClick={onChange} className="fixed bottom-3 left-3 z-[55] rounded-full border border-[#080808]/15 bg-white px-4 py-2 text-xs font-semibold text-[#080808] shadow-lg sm:bottom-5 sm:left-5">
      Privacy choices
    </button>
  );
}
