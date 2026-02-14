export type CookieConsent = "accepted" | "rejected" | null;

const CONSENT_KEY = "cookieConsent";
const GA_ID = "G-9M0217S7L9";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __gaLoaded?: boolean;
  }
}

export const getCookieConsent = (): CookieConsent => {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CONSENT_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
};

export const hasAnalyticsConsent = (): boolean => getCookieConsent() === "accepted";

const ensureGtag = () => {
  if (!window.dataLayer) window.dataLayer = [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
};

const loadGaScript = () => {
  if (window.__gaLoaded) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  window.__gaLoaded = true;
};

export const applyCookieConsent = (value: Exclude<CookieConsent, null>) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(CONSENT_KEY, value);
  ensureGtag();

  const granted = value === "accepted";
  if (granted) {
    loadGaScript();
    window.gtag?.("js", new Date());
    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag?.("config", GA_ID, { anonymize_ip: true });
  } else {
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
};

export const initCookieConsent = () => {
  if (typeof window === "undefined") return;
  ensureGtag();
  window.gtag?.("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  if (getCookieConsent() === "accepted") {
    applyCookieConsent("accepted");
  }
};
