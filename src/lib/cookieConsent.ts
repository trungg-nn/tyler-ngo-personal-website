export type CookieConsent = "accepted" | "rejected" | null;

type ConsentRecord = {
  status: Exclude<CookieConsent, null>;
  updatedAt: number;
};

const CONSENT_KEY = "cookieConsent.v2";
const LEGACY_KEY = "cookieConsent";
const CONSENT_TTL_DAYS = 180;
const GA_ID = "G-9M0217S7L9";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __gaLoaded?: boolean;
  }
}

const now = () => Date.now();

const isExpired = (updatedAt: number) => {
  const ttl = CONSENT_TTL_DAYS * 24 * 60 * 60 * 1000;
  return now() - updatedAt > ttl;
};

const readConsentRecord = (): ConsentRecord | null => {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(CONSENT_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as ConsentRecord;
      if ((parsed.status === "accepted" || parsed.status === "rejected") && typeof parsed.updatedAt === "number") {
        if (isExpired(parsed.updatedAt)) {
          localStorage.removeItem(CONSENT_KEY);
          return null;
        }
        return parsed;
      }
    } catch {
      localStorage.removeItem(CONSENT_KEY);
    }
  }

  const legacy = localStorage.getItem(LEGACY_KEY);
  if (legacy === "accepted" || legacy === "rejected") {
    const migrated: ConsentRecord = { status: legacy, updatedAt: now() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(migrated));
    localStorage.removeItem(LEGACY_KEY);
    return migrated;
  }

  return null;
};

const writeConsentRecord = (status: Exclude<CookieConsent, null>) => {
  if (typeof window === "undefined") return;
  const record: ConsentRecord = { status, updatedAt: now() };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
};

export const getCookieConsent = (): CookieConsent => readConsentRecord()?.status ?? null;

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

  writeConsentRecord(value);
  ensureGtag();

  if (value === "accepted") {
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

  const consent = getCookieConsent();
  if (consent === "accepted") {
    applyCookieConsent("accepted");
  }
  if (consent === "rejected") {
    applyCookieConsent("rejected");
  }
};
